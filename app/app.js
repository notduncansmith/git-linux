var app = require('appjs');

app.serveFilesFrom('./public');

require('./lib/window')(app)
//require('./lib/controllers')
