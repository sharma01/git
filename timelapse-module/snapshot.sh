#!/bin/sh
while :;
folder=./screenshots/
sleeptime=5
do uvccapture -v -m -d/dev/video0 -o$folder"$(date +%s)".jpg;
sleep $sleeptime;
done
