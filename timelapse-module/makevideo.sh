#!/bin/sh
#!/usr/bin/expect -f
TIME_STAMP="$(date +%s)"
SCREENSHOTS_DIR=./screenshots


TEMP_DIR=./temp_$TIME_STAMP
echo $TEMP_DIR

mkdir $TEMP_DIR
mv $SCREENSHOTS_DIR/*.jpg $TEMP_DIR/
mogrify -resize 800x800  $TEMP_DIR/*.jpg
convert $TEMP_DIR/*.jpg -delay 10 $TEMP_DIR/%05d.jpg
ffmpeg -r 6 -i $TEMP_DIR/%05d.jpg $TEMP_DIR/output_$TIME_STAMP.mp4
#scp $TEMP_DIR/output_$TIME_STAMP.mp4 d@dixit-thareja:/home/d/Projects-Comfnet
spawn scp $TEMP_DIR/output_$TIME_STAMP.mp4 d@dixit-thareja:/home/d/Projects-Comfnet
set pass "1234"
expect {
        password: {
        send "$pass\r" ; exp_continue
        }
        eof exit
}
rm -R $TEMP_DIR