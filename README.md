LIVE:

MP4Box -dash 10000 -dash-ctx context.txt -profile live -mpd-refresh 6 -dynamic aac.mp4 -out 
aac_dash.mpd

OFFLINE:
MP4Box -add audio.aac aac.mp4
MP4Box -dash 1000 aac.mp4
