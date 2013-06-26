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

router.get('/diff', function(req, res, next){
  var parse = require('../parsers')();

  var diff = "diff --git a/app/app.js b/app/app.js \n\
index f07de71..5d50dc6 100644 \n\
--- a/app/app.js \n\
+++ b/app/app.js \n\
@@ -1,8 +1,9 @@ \n\
 var app = require('appjs') \n\
   , router = app.router \n\
-  , git = require('./lib/git.js'); \n\
+  , git = require('./lib/git.js') \n\
+  , nedb = require('nedb'); \n\
  \n\
 app.serveFilesFrom('./public'); \n\
-require('./lib/repositories') \n\
+require('./lib/repositories')(nedb) \n\
 require('./lib/controllers')(router, git); \n\
 require('./lib/window')(app); \n\
\ No newline at end of file \n\
diff --git a/app/lib/controllers/git.js b/app/lib/controllers/git.js \n\
index fe657aa..60c450a 100644 \n\
--- a/app/lib/controllers/git.js \n\
+++ b/app/lib/controllers/git.js \n\
@@ -1,3 +1,5 @@ \n\
+var repoRepo = require('../repositories'); \n\
+ \n\
 module.exports = function(router, git) { \n\
  \n\
 router.get('/log', function(req, res, next){     \n\
@@ -5,7 +7,17 @@ router.get('/log', function(req, res, next){ \n\
 }); \n\
  \n\
 router.get('/allRepos', function(req, res, next){     \n\
-  git('locate -br \"\\.git$\" | rev | cut -c 6- | rev', res, true); \n\
+  //Hit the db \n\
+}); \n\
+ \n\
+router.post('/newRepo', function(req, res, next){     \n\
+  var repoName = req.post.split(\"=\")[1]; \n\
+  var newRepo = { name: repoName }; \n\
+ \n\
+}); \n\
+ \n\
+router.get('/remotes', function(req, res, next){     \n\
+  git('remote -v', res); \n\
 }); \n\
  \n\
 } \n\
\ No newline at end of file \n\
diff --git a/app/lib/git.js b/app/lib/git.js \n\
index 5866ed0..340444a 100644 \n\
--- a/app/lib/git.js \n\
+++ b/app/lib/git.js \n\
@@ -9,7 +9,7 @@ module.exports = function(cmd, res, notGit, cwd) { \n\
       stderr: stderr, \n\
       cmd: cmd \n\
     }; \n\
-    console.log(result.stdout) \n\
+     \n\
     res.send(result); \n\
   });  \n\
 } \n\
\ No newline at end of file \n\
diff --git a/app/lib/repositories/index.js b/app/lib/repositories/index.js \n\
index 8391c05..fbee2d9 100644 \n\
--- a/app/lib/repositories/index.js \n\
+++ b/app/lib/repositories/index.js \n\
@@ -1,3 +1,7 @@ \n\
-module.exports = function(router, git) { \n\
-  require('./repo')(router, git) \n\
+module.exports.repoRepository = function(Datastore) { \n\
+  var repos = new Datastore({filename: '../../db/repos.db'}) \n\
+    , user = new Datastore({filename: '../../db/user.db'}); \n\
+ \n\
+  require('./repos')(repos); \n\
+  require('./user')(user) \n\
 } \n\
\ No newline at end of file \n\
diff --git a/app/lib/repositories/repo.js b/app/lib/repositories/repo.js \n\
deleted file mode 100644 \n\
index 2395590..0000000 \n\
--- a/app/lib/repositories/repo.js \n\
+++ /dev/null \n\
@@ -1,3 +0,0 @@ \n\
-module.exports = function() { \n\
-   \n\
-} \n\
\ No newline at end of file \n\
diff --git a/app/lib/window.js b/app/lib/window.js \n\
index cfb66ff..5d27518 100644 \n\
--- a/app/lib/window.js \n\
+++ b/app/lib/window.js \n\
@@ -86,7 +86,6 @@ window.on('ready', function(){ \n\
   console.log(\"Window Ready\"); \n\
   window.process = process; \n\
   window.module = module; \n\
-  window.frame.openDevTools(); \n\
    \n\
   function F12(e){ return e.keyIdentifier === 'F12' } \n\
   function Command_Option_J(e){ return e.keyCode === 74 && e.metaKey && e.altKey } \n\
diff --git a/app/package.json b/app/package.json \n\
index 32daa60..2a7a3d6 100644 \n\
--- a/app/package.json \n\
+++ b/app/package.json \n\
@@ -1,13 +1,12 @@ \n\
 { \n\
-    \"name\": \"Git-Linux\", \n\
-    \"version\": \"0.0.0\", \n\
-    \"author\": \"Duncan Smith\", \n\
-    \"email\": \"duncan.smith@whiteboard-it.com\", \n\
-    \"main\": \"./app.js\", \n\
-    \"dependencies\":  \n\
-    { \n\
-        \"appjs\": \">0.0.0\", \n\
-        \"mime\": \">0.0.0\" \n\
-    } \n\
+  \"name\": \"Git-Linux\", \n\
+  \"version\": \"0.0.0\", \n\
+  \"author\": \"Duncan Smith\", \n\
+  \"email\": \"duncan.smith@whiteboard-it.com\", \n\
+  \"main\": \"./app.js\", \n\
+  \"dependencies\": { \n\
+    \"appjs\": \">0.0.0\", \n\
+    \"mime\": \">0.0.0\", \n\
+    \"nedb\": \"~0.7.11\" \n\
+  } \n\
 } \n\
- \n\
diff --git a/app/public/index.html b/app/public/index.html \n\
index 18bd45c..33a4d13 100644 \n\
--- a/app/public/index.html \n\
+++ b/app/public/index.html \n\
@@ -6,8 +6,16 @@ \n\
   </head> \n\
   <body> \n\
   <a href=\"/log\" class=\"git\">Log</a> \n\
-  <br> \n\
   <a href=\"/allRepos\" class=\"git\">All Repos</a> \n\
+  <a href=\"/remotes\" class=\"git\">Show Remotes</a> \n\
+  <form action=\"/newRepo\" method=\"POST\"> \n\
+    <fieldset> \n\
+      <legend>New Repo</legend> \n\
+      <input type=\"text\" name=\"repoName\"> \n\
+      <input type=\"submit\"> \n\
+    </fieldset> \n\
+  </form> \n\
+ \n\
  \n\
   <div class=\"output\"></div> \n\
   </body> \n\
@@ -17,7 +25,6 @@ \n\
       $(document).ready(function(){ \n\
         $(\".git\").click(function(e){ \n\
           e.preventDefault(); \n\
- \n\
           $.ajax({ \n\
             url: $(this).attr('href'), \n\
             type: 'GET', \n\
diff --git a/app/public/stylesheets/style.css b/app/public/stylesheets/style.css \n\
index f2aace2..21cc511 100644 \n\
--- a/app/public/stylesheets/style.css \n\
+++ b/app/public/stylesheets/style.css \n\
@@ -1,3 +1,8 @@ \n\
 .error { \n\
   color: red; \n\
+} \n\
+ \n\
+.git { \n\
+  display: block; \n\
+  font-size: 16px; \n\
 } \n\
\ No newline at end of file";
var parsed = parse.parseGitDiff(diff);
res.send(parsed)
})

}