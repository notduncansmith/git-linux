var options = {
  collections: [
    [
      {
        id: "mcsharps",
        userName: "mcsharps",
        firstName: "Madison",
        lastName: "Sharps",
        bio: "Muzak iz my lyfe"
      },
      {
        id: "notduncansmith",
        userName: "notduncansmith",
        firstName: "Duncan",
        lastName: "Smith",
        bio: "Designer, hacker, father"
      }
    ],
    [
      {
      id: "abc",
      author: "mcsharps",
      content: "Dude I love music so much"
      },
      {
        id: "def",
        author: "notduncansmith",
        content: "My kid is cuter than yours"
      }
    ]
  ],
  onKeyUp: true,
  beforeUpdate: function(updatedModel, updatedProp, newValue){
    console.log("About to set " + updatedModel.id + "'s " + updatedProp + " to " + newValue)
  }
}