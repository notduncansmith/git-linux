module.exports = function(db) {
  return {


    save: function (repo, res) {
      db.loadDatabase(function (error){
        db.insert(repo, function (err, newDoc) { 
          if(err || error){
            res.send(err || error)
          } else {
            res.send(newDoc)
          }
        });
      });
    },
    get: function (repoId, res) {
      db.loadDatabase(function (error){
        db.findOne({ _id: repoId }, function (err, doc) {
          if(err || error){
            res.send(err || error)
          } else {
            res.send(doc)
          }
        });
      });
    }



  }
}