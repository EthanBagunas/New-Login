var db = require('../../config/dbconnections');
const { exec } = require('child_process'); // Make sure to include this
const path = require('path'); // Include path module



const startCameraStreams = async (req, res) => {
    const [cameras] = await pool.query('SELECT * FROM settings'); // Fetch all settings including camera info
    cameras.forEach(camera => {
        const outputDir = path.join(__dirname, 'public', camera.folder_name); // e.g., 'Camera1' or 'Camera2'
        const rtspUrl = camera.rtsp_url; // Assuming your table has an rtsp_url column

        // Start FFmpeg process for each camera
        const ffmpegCommand = `ffmpeg -i "${rtspUrl}" -c:v libx264 -preset ultrafast -tune zerolatency -maxrate 2000k -bufsize 2000k -vf "scale=1280:720" -hls_time 1.5 -hls_list_size 3 -hls_flags delete_segments+split_by_time -f hls ${outputDir}/stream.m3u8`;
        
        exec(ffmpegCommand, (err, stdout, stderr) => {
            if (err) {
                console.error(`Error starting FFmpeg for ${camera.folder_name}: ${err.message}`);
                return;
            }
            console.log(`FFmpeg started for ${camera.folder_name}`);
            if (stderr) {
                console.error(`FFmpeg stderr for ${camera.folder_name}: ${stderr}`);
            }
        });
    });
};

module.exports = { startCameraStreams };
