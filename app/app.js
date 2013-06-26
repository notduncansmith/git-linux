var app = require('appjs')
  , url = require('url')
  , exec = require('child_process').exec
  , router = app.router;

app.serveFilesFrom('./public');

require('./lib/controllers')(router, url, exec)
require('./lib/window')(app)