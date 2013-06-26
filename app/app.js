var app = require('appjs')
  , url = require('url')
  , exec = require('child_process').exec;

app.serveFilesFrom('./public');


app.router.get('/git', function(req, res, next){
  var parsedUrl = url.parse(req.url, true);
  var cmd = parsedUrl.query['cmd'];
  
 
  if( cmd ) {
    var child = exec(cmd, function (error, stdout, stderr) {
      var result = {
        stdout: escape(stdout), 
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

app.router.post('/', function(request, response, next){
  response.send('Hey! How are you ' + request.post.replace('firstname=',''));
});

//require('./lib/controllers')
require('./lib/window')(app)