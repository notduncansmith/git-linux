module.exports = function(router, git) {

router.get('/log', function(req, res, next){    
  git('log -z', res);
});

router.get('/allRepos', function(req, res, next){    
  git('locate -br "\\.git$" | rev | cut -c 6- | rev', res, true);
});

}