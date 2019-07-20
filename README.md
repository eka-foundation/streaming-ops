# streaming-ops
Scripts and tools for streaming backend

* __video_catalogue__ is a utility for displaying archived stream recordings. This should be copied to apache content folder at the same level where recording folder resides
* __post_recording_hook.py__ is a python script that will be invoked by the nginx rtmp module as __exec_record_done__ event.

`exec_record_done /usr/bin/nice -n 10 /usr/bin/python /opt/nginx/rtmp/post_recording_hook.py $path /library/streaming/recordings/$basename.mp4;`

