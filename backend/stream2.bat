ffmpeg -i "rtsp://admin:Admin12345@192.168.1.108/cam/realmonitor?channel=1&subtype=0" ^
    -c:v libx264 -preset ultrafast -tune zerolatency -maxrate 2000k -bufsize 2000k ^
    -vf "scale=1280:720" -hls_time 1.5 -hls_list_size 3 -hls_flags delete_segments+split_by_time ^
    -f hls public/Camera2/stream2.m3u8
