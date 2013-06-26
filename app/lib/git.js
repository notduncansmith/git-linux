var exec = require('child_process').exec;

module.exports = function(cmd, res, notGit, cwd) {
  var cmdString = notGit ? cmd : 'git ' + cmd;
  
  exec(cmdString, {cwd: cwd || process.cwd()}, function (error, stdout, stderr) {
    var result = {
      stdout: stdout,
      stderr: stderr,
      cmd: cmd
    };
    console.log(result.stdout)
    res.send(result);
  }); 
}