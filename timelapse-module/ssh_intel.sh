#!/usr/bin/expect -f
set timeout -1
spawn scp /home/pi/timelapse/temp_1437344898/output_1437344898.mp4 d@dixit-thareja:/home/d/Projects-Comfnet
set pass "1234"
expect {
        password: {
        send "$pass\r" ; exp_continue
        }
        eof exit
}