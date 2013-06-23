var posts = [{id: "abc", author: "mcsharps", title: "Music", content: "Dude I love music so much"}, {id: "def", title: "I, Hipster", author: "mcsharps", content: "My music is more hipster than yours"}]

var options = {
  collections: [
    [
      {
        id: "current", 
        userName: "mcsharps", 
        firstName: "Madison", 
        lastName: "Sharps", 
        bio: "Muzak iz my lyfe", 
        posts: posts
      }
    ],
    posts
  ], 
  onKeyUp: true, 
  beforeUpdate: function(updatedModel, updatedProp, newValue){
    console.log("About to set " + updatedModel.id + "'s " + updatedProp + " to " + newValue)
  }
}
