/*
const ViewLiveFeed = (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Live Camera Feed</title>
            <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
            <style>
                video {
                    width: 640px;
                    height: 360px;
                }
                canvas {
                    display: none; /* Hide canvas if not needed 
                }
            </style>
        </head>
        <body>
            <h1>Live RTSP Stream</h1>
            <video id="video" controls autoplay muted playsinline style="width: 100%; max-width: 720px;"></video>
            <canvas id="canvasOutput"></canvas>
            <script>
                document.addEventListener('DOMContentLoaded', () => {
                    console.log("DOM fully loaded and parsed");

                    // Load OpenCV.js dynamically
                    function loadOpenCv() {
                        return new Promise((resolve, reject) => {
                            const script = document.createElement('script');
                            script.src = './opencv.js'; // Path to your opencv.js file
                            script.onload = () => resolve();
                            script.onerror = () => reject(new Error("Failed to load OpenCV.js"));
                            document.head.appendChild(script);
                        });
                    }

                    loadOpenCv()
                        .then(() => {
                            console.log("OpenCV.js is ready");
                            const video = document.getElementById('video');
                            const canvas = document.getElementById('canvasOutput');

                            if (!video) {
                                console.error("Video element not found!");
                                return;
                            }

                            const videoWidth = 640;
                            const videoHeight = 360;

                            video.width = videoWidth;
                            video.height = videoHeight;

                            if (!canvas) {
                                console.error("Canvas element not found!");
                                return;
                            }

                            canvas.width = videoWidth;
                            canvas.height = videoHeight;

                            // Initialize HLS.js
                            if (Hls.isSupported()) {
                                const hls = new Hls({
                                    liveSyncDurationCount: 5,
                                    maxBufferLength: 4,
                                    liveMaxLatencyDurationCount: 6
                                });
                                hls.loadSource('/stream.m3u8'); // Adjust this to your stream source
                                hls.attachMedia(video);
                                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                                    video.play();
                                });
                            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                                video.src = '/stream.m3u8'; // Adjust this to your stream source
                                video.addEventListener('loadedmetadata', () => {
                                    video.play();
                                });
                            }

                            cv.onRuntimeInitialized = () => {
                                processVideo(video, canvas, videoWidth, videoHeight);
                            };

                            function processVideo(video, canvas, videoWidth, videoHeight) {
                                const cap = new cv.VideoCapture(video);
                                let frame = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC4);
                                let hsvFrame = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC3);
                                let yellowMask = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC1);
                                let redMask = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC1);
                                let greenMask = new cv.Mat(videoHeight, videoWidth, cv.CV_8UC1);

                                let lowerYellow = new cv.Mat(hsvFrame.rows, hsvFrame.cols, cv.CV_8UC3, new cv.Scalar(20, 100, 100));
                                let upperYellow = new cv.Mat(hsvFrame.rows, hsvFrame.cols, cv.CV_8UC3, new cv.Scalar(30, 255, 255));

                                let lowerRed1 = new cv.Mat(hsvFrame.rows, hsvFrame.cols, cv.CV_8UC3, new cv.Scalar(160, 50, 50));
                                let upperRed1 = new cv.Mat(hsvFrame.rows, hsvFrame.cols, cv.CV_8UC3, new cv.Scalar(190, 255, 255));

                                let lowerGreen1 = new cv.Mat(hsvFrame.rows, hsvFrame.cols, cv.CV_8UC3, new cv.Scalar(35, 52, 72));
                                let upperGreen1 = new cv.Mat(hsvFrame.rows, hsvFrame.cols, cv.CV_8UC3, new cv.Scalar(85, 255, 255));

                                function processFrame() {
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

                                    detectAndLabelColor(frame, yellowMask, "yellow", new cv.Scalar(0, 255, 0, 255));
                                    detectAndLabelColor(frame, redMask, "red", new cv.Scalar(0, 0, 255, 255));
                                    detectAndLabelColor(frame, greenMask, "green", new cv.Scalar(0, 255, 0, 255));

                                    cv.imshow(canvas, frame);
                                    requestAnimationFrame(processFrame);
                                }

                                function detectAndLabelColor(frame, mask, label, color) {
                                    let contours = new cv.MatVector();
                                    let hierarchy = new cv.Mat();
                                    let mergedRects = [];

                                    cv.findContours(mask, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

                                    for (let i = 0; i < contours.size(); ++i) {
                                        let cnt = contours.get(i);
                                        let rect = cv.boundingRect(cnt);
                                        mergedRects.push(rect);
                                    }

                                    mergedRects = mergeRects(mergedRects);

                                    for (let i = 0; i < mergedRects.length; ++i) {
                                        let rect = mergedRects[i];
                                        cv.rectangle(frame, new cv.Point(rect.x, rect.y), new cv.Point(rect.x + rect.width, rect.y + rect.height), color, 2);
                                        let font = cv.FONT_HERSHEY_SIMPLEX;
                                        let scale = 0.6;
                                        let thickness = 1;
                                        cv.putText(frame, label, new cv.Point(rect.x, rect.y - 10), font, scale, color, thickness);
                                    }

                                    contours.delete();
                                    hierarchy.delete();
                                }

                                function mergeRects(rects) {
                                    let merged = [];

                                    while (rects.length > 0) {
                                        let rect = rects.pop();
                                        let found = false;

                                        for (let i = 0; i < merged.length; i++) {
                                            if (isOverlappingOrClose(rect, merged[i])) {
                                                merged[i] = mergeTwoRects(rect, merged[i]);
                                                found = true;
                                                break;
                                            }
                                        }

                                        if (!found) {
                                            merged.push(rect);
                                        }
                                    }

                                    return merged;
                                }

                                function isOverlappingOrClose(rect1, rect2) {
                                    let delta = 10;

                                    return (
                                        rect1.x < rect2.x + rect2.width + delta &&
                                        rect1.x + rect1.width + delta > rect2.x &&
                                        rect1.y < rect2.y + rect2.height + delta &&
                                        rect1.y + rect1.height + delta > rect2.y
                                    );
                                }

                                function mergeTwoRects(rect1, rect2) {
                                    let x = Math.min(rect1.x, rect2.x);
                                    let y = Math.min(rect1.y, rect2.y);
                                    let width = Math.max(rect1.x + rect1.width, rect2.x + rect2.width) - x;
                                    let height = Math.max(rect1.y + rect1.height, rect2.y + rect2.height) - y;

                                    return new cv.Rect(x, y, width, height);
                                }

                                requestAnimationFrame(processFrame);
                            }
                        })
                        .catch((error) => {
                            console.error(error.message);
                        });
                });
            </script>
        </body>
        </html>
    `);
};

module.exports = { ViewLiveFeed };
*/
