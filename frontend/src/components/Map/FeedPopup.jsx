import React, { useEffect, useRef, useState } from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import Hls from 'hls.js';

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const PopupBody = styled('div')(({ theme }) => ({
  padding: '12px 16px',
  margin: '8px',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]}`,
  backgroundColor: `${theme.palette.mode === 'dark' ? grey[900] : '#fff'}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0px 4px 8px rgb(0 0 0 / 0.7)'
    : '0px 4px 8px rgb(0 0 0 / 0.1)',
  fontFamily: "'IBM Plex Sans', sans-serif",
  fontWeight: 500,
  fontSize: '0.875rem',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const FeedPopup = ({ devicename, onClose }) => {
  const { auth } = useAuth();
  const canvasRef = useRef(null);
  const [isOpenCVLoaded, setIsOpenCVLoaded] = useState(false);
  const [streamUrl, setStreamUrl] = useState('');

  useEffect(() => {
    const loadOpenCV = async () => {
      try {
        const response = await axios.get('/opencv.js', {
          headers: {
            'Authorization': `Bearer ${auth?.accessToken}`,
          },
          responseType: 'blob'
        });

        if (response.status !== 200) {
          throw new Error(`Failed to load OpenCV: ${response.status}`);
        }

        const script = document.createElement('script');
        const url = URL.createObjectURL(response.data);
        script.src = url;
        script.async = true;

        return new Promise((resolve, reject) => {
          script.onload = () => {
            if (window.cv) {
              window.cv.onRuntimeInitialized = () => {
                setIsOpenCVLoaded(true);
                resolve();
              };
            } else {
              reject(new Error('OpenCV is not defined'));
            }
          };
          script.onerror = reject;
          document.head.appendChild(script);
        });
      } catch (error) {
        console.error('Error loading OpenCV:', error);
        throw error;
      }
    };

    loadOpenCV().catch(console.error);
  }, [auth]);

  useEffect(() => {
    const baseUrl = 'http://localhost:7000';
    switch (devicename) {
      case 'DEV001':
        setStreamUrl(`${baseUrl}/Camera1/stream.m3u8`);
        break;
      case 'DEV002':
        setStreamUrl(`${baseUrl}/Camera2/stream2.m3u8`);
        break;
      default:
        console.error('Unknown device name');
        break;
    }
  }, [devicename]);


  useEffect(() => {
    const canvas = canvasRef.current;
    const video = document.createElement('video'); // Create video element for streaming
    const ctx = canvas.getContext('2d');
    const videoWidth = 640;
    const videoHeight = 360;
    canvas.width = videoWidth;
    canvas.height = videoHeight;

    

    if (Hls.isSupported() && streamUrl) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl') && streamUrl) {
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }

    const processFrame = () => {
      if (video.paused || video.ended) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let greenPixels = [];
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const [h, s, v] = rgbToHsv(r, g, b);
        const lowerGreen = { h: 35, s: 52, v: 72 };
        const upperGreen = { h: 85, s: 255, v: 255 };

        if (h >= lowerGreen.h && h <= upperGreen.h && s >= lowerGreen.s && s <= upperGreen.s && v >= lowerGreen.v) {
          const x = (i / 4) % canvas.width;
          const y = Math.floor((i / 4) / canvas.width);
          greenPixels.push({ x, y });
        }
      }

      if (greenPixels.length > 0) {
        const xMin = Math.min(...greenPixels.map(p => p.x));
        const xMax = Math.max(...greenPixels.map(p => p.x));
        const yMin = Math.min(...greenPixels.map(p => p.y));
        const yMax = Math.max(...greenPixels.map(p => p.y));

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin);
        ctx.fillStyle = 'red';
        ctx.font = '16px Arial';
        ctx.fillText('Color Yellow', xMax + 5, yMin + 20);
      }

      requestAnimationFrame(processFrame);
    };

    const rgbToHsv = (r, g, b) => {
      r /= 255, g /= 255, b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, v = max;
      const d = max - min;
      s = max === 0 ? 0 : d / max;

      if (max === min) {
        h = 0;
      } else {
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return [h * 360, s * 255, v * 255];
    };

    video.addEventListener('play', processFrame);

    // Cleanup on unmount
    return () => {
      video.pause();
      video.src = '';
      video.load();
    };
  }, [isOpenCVLoaded,streamUrl, canvasRef]);

  return (
    <PopupBody>
      <h1>Backup Feed with OpenCV</h1>
      {isOpenCVLoaded ? (
        <p>OpenCV is loaded successfully!</p>
      ) : (
        <p>Loading OpenCV...</p>
      )}
      <h1>{devicename}</h1>
      <canvas ref={canvasRef} style={{ width: '500px', height: 'auto', marginTop: '20px' }} />
    </PopupBody>
  );
};

export default FeedPopup;
