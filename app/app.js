var app = require('appjs')
  , router = app.router
  , git = require('./lib/git.js')
  , Datastore = require('nedb')
  , repos = require('./lib/repositories')(Datastore);
  
app.serveFilesFrom('./public');

require('./lib/controllers')(router, git, repos);
require('./lib/window')(app);

//router.use(require('./lib/middleware/handleErrors.js'));