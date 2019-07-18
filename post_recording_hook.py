import subprocess
import os
import sys

args = sys.argv[1:]

file_path = args[0]
out_path = args[1]
thumb_dir=args[2]

#  Transcode into mp4
retcode = subprocess.call([
  '/usr/bin/ffmpeg',
  '-hwaccel', 'vaapi',  '-hwaccel_device', '/dev/dri/renderD128', '-hwaccel_output_format', 'vaapi', '-i',  file_path, '-max_muxing_queue_size',  '9999', '-c:a', 'copy', '-c:v', 'h264_vaapi', '-qp', '24', '-movflags', '+faststart',  out_path
])
assert(retcode == 0)

# Generate thumbnail from high source quality mp4
if  '_src_' in out_path:
  thumb_path = os.path.join(thumb_dir,  os.path.basename(out_path) + '.png')
  retcode = subprocess.call([
      '/usr/bin/ffmpeg',
      '-y',
      '-ss', '00:05',
      '-i', out_path,
      '-frames', '1',
      '-filter:v',
      'scale=-1:187',
      '-f', 'image2',
      thumb_path
    ])
  assert(retcode==0)

# Upload mp4 metadata and thumbnail to wordpress VOD page

#  Remove original flv
retcode = subprocess.call([
  '/bin/rm', '-rf', file_path
])
assert(retcode==0)