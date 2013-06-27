module.exports = function(router, git, repos) {
var repoRepo = repos.repoRepo
  , parseHelper = require('../parsers')


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

}