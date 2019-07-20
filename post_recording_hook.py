import subprocess
import os
import sys

args = sys.argv[1:]

file_path = args[0]
out_path = args[1]

#  Transcode into mp4
retcode = subprocess.call([
  '/usr/bin/ffmpeg',
  '-hwaccel', 'vaapi',  '-hwaccel_device', '/dev/dri/renderD128', '-hwaccel_output_format', 'vaapi', '-i',  file_path, '-max_muxing_queue_size',  '9999', '-c:a', 'copy', '-c:v', 'h264_vaapi', '-qp', '24', '-movflags', '+faststart',  out_path
])
assert(retcode == 0)

#  Remove original flv
retcode = subprocess.call([
  '/bin/rm', '-rf', file_path
])
assert(retcode==0)

