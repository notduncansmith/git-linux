module.exports = function(Datastore) {

  var repoDb = new Datastore('./db/repos.db')
    , userDb = new Datastore('./db/user.db');

  return {
    repoRepo: require('./repos')(repoDb),
    userRepo: require('./user')(userDb)
  }
}