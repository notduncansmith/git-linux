var exec = require('child_process').exec;

module.exports = function(cmd, options, callback) {

  if(!options) options = {};
  if(arguments.length === 2) {
    callback = options;
  }  

  var commandText = options.shell ? cmd : 'git ' + cmd;

	exec('git ' + cmd, {cwd: options.cwd || process.cwd()}, callback);
}