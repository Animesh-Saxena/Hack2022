import sys
import subprocess

# implement pip as a subprocess:
# subprocess.check_call([sys.executable, '-m', 'pip', 'install',
# 'youtube_transcript_api'])

from youtube_transcript_api import YouTubeTranscriptApi

captions = YouTubeTranscriptApi.get_transcript(sys.argv[1])
print(" ".join(i['text'] for i in captions))
