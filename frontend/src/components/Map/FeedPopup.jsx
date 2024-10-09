import React, { useEffect, useRef } from 'react';
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
}));

const FeedPopup = () => {
  const { auth } = useAuth();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const frameRef = useRef();
  const hsvFrameRef = useRef();
  const yellowMaskRef = useRef();
  const redMaskRef = useRef();
  const greenMaskRef = useRef();

  useEffect(() => {
    const loadOpenCV = async () => {
      try {
        const response = await axios.get('/opencv.js', {
          headers: {
            'Authorization': `Bearer ${auth?.accessToken}`, // Pass the access token for authorization
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
            if (cv) {
              cv.onRuntimeInitialized = resolve; // Ensure OpenCV is fully loaded
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

    const processVideo = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (!video || !canvas) return;

      // Set video and canvas dimensions
      const videoWidth = 640;
      const videoHeight = 360;
      video.width = videoWidth;
      video.height = videoHeight;
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      // Initialize HLS.js
      let hls;
      if (Hls.isSupported()) {
        hls = new Hls({
          liveSyncDurationCount: 5,
          maxBufferLength: 4,
          liveMaxLatencyDurationCount: 6,
        });
        hls.loadSource('http://localhost:7000/stream.m3u8'); // Point to your video stream
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

      // Wait for OpenCV to be ready
      await loadOpenCV();

      // Initialize matrices for color detection
      const cap = new cv.VideoCapture(video);
      const frame = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
      const hsvFrame = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC3);
      const yellowMask = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC1);
      const redMask = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC1);
      const greenMask = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC1);

      // Define color ranges
      const lowerYellow = new cv.Mat(hsvFrame.rows, hsvFrame.cols, cv.CV_8UC3, new cv.Scalar(20, 100, 100));
      const upperYellow = new cv.Mat(hsvFrame.rows, hsvFrame.cols, cv.CV_8UC3, new cv.Scalar(30, 255, 255));
      
      const lowerRed1 = new cv.Mat(hsvFrame.rows, hsvFrame.cols, cv.CV_8UC3, new cv.Scalar(160, 50, 50));
      const upperRed1 = new cv.Mat(hsvFrame.rows, hsvFrame.cols, cv.CV_8UC3, new cv.Scalar(190, 255, 255));

      const lowerGreen1 = new cv.Mat(hsvFrame.rows, hsvFrame.cols, cv.CV_8UC3, new cv.Scalar(35, 52, 72));
      const upperGreen1 = new cv.Mat(hsvFrame.rows, hsvFrame.cols, cv.CV_8UC3, new cv.Scalar(85, 255, 255));

      const processFrame = () => {
        if (video.paused || video.ended) {
          frame.delete();
          hsvFrame.delete();
          yellowMask.delete();
          redMask.delete();
          greenMask.delete();
          lowerYellow.delete();
          upperYellow.delete();
          lowerRed1.delete();
          upperRed1.delete();
          lowerGreen1.delete();
          upperGreen1.delete();
          return;
        }

        cap.read(frame);
        cv.cvtColor(frame, hsvFrame, cv.COLOR_RGBA2RGB);
        cv.cvtColor(hsvFrame, hsvFrame, cv.COLOR_RGB2HSV);

        cv.inRange(hsvFrame, lowerYellow, upperYellow, yellowMask);
        cv.inRange(hsvFrame, lowerRed1, upperRed1, redMask);
        cv.inRange(hsvFrame, lowerGreen1, upperGreen1, greenMask);

        detectAndLabelColor(frame, yellowMask, 'yellow', new cv.Scalar(0, 255, 0, 255));
        detectAndLabelColor(frame, redMask, 'red', new cv.Scalar(0, 0, 255, 255));
        detectAndLabelColor(frame, greenMask, 'green', new cv.Scalar(0, 255, 0, 255));

        cv.imshow(canvas, frame);
        requestAnimationFrame(processFrame);
      };

      const detectAndLabelColor = (frame, mask, label, color) => {
        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(mask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

        for (let i = 0; i < contours.size(); ++i) {
          const rect = cv.boundingRect(contours.get(i));
          cv.rectangle(frame, new cv.Point(rect.x, rect.y), new cv.Point(rect.x + rect.width, rect.y + rect.height), color, 2);
          cv.putText(frame, label, new cv.Point(rect.x, rect.y - 10), cv.FONT_HERSHEY_SIMPLEX, 0.6, color, 2);
        }

        contours.delete();
        hierarchy.delete();
      };

      requestAnimationFrame(processFrame);
    };

    processVideo().catch(console.error);

    return () => {
      const video = videoRef.current;
      if (video) video.pause();

        // Clean up OpenCV resources
        const matrices = [
          frameRef.current,
          hsvFrameRef.current,
          yellowMaskRef.current,
          redMaskRef.current,
          greenMaskRef.current,
          // Add any other matrices created
        ];
  
        matrices.forEach((mat) => {
          if (mat) mat.delete();
        });
    };
  }, [auth]);

  return (
    <PopupBody>
      <h1>Backup Feed with OpenCV Processing</h1>
      <video ref={videoRef} controls style={{ width: '500px', marginTop: '8px' }} />
      <canvas ref={canvasRef} style={{ display: 'block', marginTop: '8px' }}></canvas>
    </PopupBody>
  );
};

export default FeedPopup;
