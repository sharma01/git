var express = require('express');
var app = express();


var exec = require('child_process').exec;

var printpath = function(callback)
{
        exec("pwd", function (error, stdout, stderr) {
          if (error !== null) {
            callback(error,null,null);
              return;
          }
        callback(null,stdout,stderr)
        });

};

printpath(function(error, stdout, stderr){

console.log('stdout: ' + stdout);
console.log('stderr: ' + stderr);
console.log('err: ' + error);
});

var startcapturing = function(callback)
{
        exec("./start.sh start", function (error, stdout, stderr) {
          if (error !== null) {
            callback(error,null);
              return;
          }
        callback(null,stdout)
        });

};

var stopcapturing = function(callback)
{
        exec("./start.sh stop", function (error, stdout, stderr) {
          if (error !== null) {
            callback(error,null);
              return;
          }
        callback(null,stdout)
        });

};


app.get('/startscript', function(req, res) {
    
      startcapturing(function(err, result)
     {
      if(err!==null)
        {
          res.send("Starting Script" + result);    
        }
          else
          {
          res.send("Error:" + err);
          }
      
        });           
    });


app.get('/stopscript', function(req, res) {
    
      stopcapturing(function(err, result)
     {
      if(err!==null)
        {
          res.send("Stopping Script" + result);    
        }
          else
          {
          res.send("Error:" + err);
          }
      
        });           
    });


app.listen(8023);
