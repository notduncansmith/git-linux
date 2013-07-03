module.exports = function(router, git, repos) {
var repoRepo = repos.repoRepo
  , parseHelper = require('../parsers')

//Here ya go. Thought of a better way to deal with callbacks.
//Just didn't feel right to be passing the response across files like that.
//Now we can pass custom callbacks to git(), too
function respond(res) {
  return function(err, stdout, stderr) { 
    var result = {
      stdout: stdout,
      stderr: stderr
    };
    res.send(result);
  }
}

router.get('/log', function(req, res, next){    
  git('log -z', respond(res));
});

router.get('/repo/get', function(req, res, next){    
  console.log(req)
  var repoId = req.params.repoId
    , get = repoRepo.get;

  get(repoId, respond(res));
});

router.post('/repo/new', function(req, res, next){    
  var repoName = req.post.split("=")[1]
    , repo = { name: repoName }
    , save = repoRepo.save;

  save(repo, res);
});

router.get('/remotes', function(req, res, next){    
  git('remote -v', respond(res));
});


router.get('/diff', function(req,res) {
  var path = req.params.path || ""
    , multi = path && path.length > 0;  

  git(('diff '+ decodeURIComponent(path)).trim(), {cwd: '/home/phillip/working/git-linux'}, function(err, out) {
    console.log(err || out);
    var parsed = parseHelper.parseGitDiff(out, multi);
    res.send(parsed);
  });
});

router.get('/commit', function(req, res) {
  var filesToCommit = req.params.toCommit.split(';');


  git('add ' + decodeURIComponent(filesToCommit).trim(), {cwd: '/home/phillip/working/git-linux'}, function(err, out) {
    
  });

  git('commit "' + req.params.commitMessage + '"', {cwd: '/home/phillip/working/git-linux'}, function(err, out) {
    res.send(out);
  });
});

}