#!/usr/local/bin/node
/*
** shell-server.js returns json response with the stdout and stderr of a shell command
**
**
** @Author: Nestor Urquiza
** @Date: 09/29/2011
**
*/
 
/*
* Dependencies
*/
var http = require('http'),
    url = require('url'),
    exec = require('child_process').exec;
 
/*
* Server Config
*/
var host = "appjs",
    port = "8088",
    thisServerUrl = "http://" + host + ":" + port;
 
/*
* Main
*/
http.createServer(function (req, res) {
  req.addListener('end', function () {
         
  });
  var parsedUrl = url.parse(req.url, true);
  var cmd = parsedUrl.query['cmd'];
  
  res.writeHead(200, {'Content-Type': 'text/plain'});
 
  if( cmd ) {
    var child = exec(cmd, function (error, stdout, stderr) {
   var result = '{"stdout":' + stdout + ',"stderr":"' + stderr + '","cmd":"' + cmd + '"}';
   res.end(result + '\n');
    });
  } else {
 var result = '{"stdout":"' + '' + '","stderr":"' + 'cmd is mandatory' + '","cmd":"' + cmd + '"}';
 res.end(result + '\n');
  }  
   
}).listen(port, host);
console.log('Server running at ' + thisServerUrl );