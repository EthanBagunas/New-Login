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
  width: 'max-content',
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
  flexDirection: 'column', // Align children vertically
  alignItems: 'center', // Center the video and canvas
}));

const FeedPopup = () => {
  const { auth } = useAuth();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isOpenCVLoaded, setIsOpenCVLoaded] = useState(false);

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
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const videoWidth = 640;
      const videoHeight = 360;
      video.width = videoWidth;
      video.height = videoHeight;
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      const ctx = canvas.getContext('2d');

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource('http://localhost:7000/stream.m3u8');
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'http://localhost:7000/stream.m3u8';
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
      }

      const processFrame = () => {
        if (video.paused || video.ended) return;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Create an empty array to hold green pixels
        let greenPixels = [];

        // Loop through the pixel data
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];     // Red channel
          const g = data[i + 1]; // Green channel
          const b = data[i + 2]; // Blue channel

          // Convert RGB to HSV
          const [h, s, v] = rgbToHsv(r, g, b);

          // Define lower and upper green thresholds in HSV
          const lowerGreen = { h: 35, s: 52, v: 72 }; // Lower threshold
          const upperGreen = { h: 85, s: 255, v: 255 }; // Upper threshold

          // Check if the pixel falls within the green range
          if (
            h >= lowerGreen.h && h <= upperGreen.h &&
            s >= lowerGreen.s && s <= upperGreen.s &&
            v >= lowerGreen.v && v <= upperGreen.v
          ) {
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

          ctx.strokeStyle = 'red'; // Set bounding box color
          ctx.lineWidth = 2; // Set line width
          ctx.strokeRect(xMin, yMin, xMax - xMin, yMax - yMin); // Draw bounding box

          // Draw "Color Green" label beside the bounding box
          ctx.fillStyle = 'red';
          ctx.font = '16px Arial';
          ctx.fillText('Color Yellow', xMax + 5, yMin + 20); // Adjust position as needed
        }

        requestAnimationFrame(processFrame);
      };

      // Function to convert RGB to HSV
      const rgbToHsv = (r, g, b) => {
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, v = max;

        const d = max - min;
        s = max === 0 ? 0 : d / max;

        if (max === min) {
          h = 0; // Achromatic
        } else {
          switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }

        return [h * 360, s * 255, v * 255]; // Scale h to [0, 360] and s, v to [0, 255]
      };

      video.addEventListener('play', processFrame);
    }
  }, [videoRef, canvasRef, isOpenCVLoaded]);

  return (
    <PopupBody>
      <h1>Backup Feed with OpenCV</h1>
      {isOpenCVLoaded ? (
        <p>OpenCV is loaded successfully!</p>
      ) : (
        <p>Loading OpenCV...</p>
      )}
      <video ref={videoRef} controls style={{ width: '500px', marginTop: '8px' }} /><br></br>
      <h1>WITH FILTER</h1>
      <canvas ref={canvasRef} style={{ width: '500px', marginTop: '20px', display: 'block' }} />
    </PopupBody>
  );
};

export default FeedPopup;
