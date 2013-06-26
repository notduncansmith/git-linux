var app = require('appjs')
  , router = app.router
  , git = require('./lib/git.js');

app.serveFilesFrom('./public');
require('./lib/repositories')
require('./lib/controllers')(router, git);
require('./lib/window')(app);