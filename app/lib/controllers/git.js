module.exports = function(router, git, repos) {
var repoRepo = repos.repoRepo;

router.get('/log', function(req, res, next){    
  git('log -z', res);
});

router.get('/repo/get', function(req, res, next){    
  console.log(req)
  var repoId = req.params.repoId
    , get = repoRepo.get;

  get(repoId, res);
});

router.post('/repo/new', function(req, res, next){    
  var repoName = req.post.split("=")[1]
    , repo = { name: repoName }
    , save = repoRepo.save;

  save(repo, res);
});

router.get('/remotes', function(req, res, next){    
  git('remote -v', res);
});

}