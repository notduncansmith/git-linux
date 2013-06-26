var user = {
  id: "current", 
  userName: "mcsharps", 
  firstName: "Madison", 
  lastName: "Sharps", 
  bio: "Muzak iz my lyfe",
  color: "#eee",
  test: {
    post: {
      title: "This is a POST",
      content: "And this is that post's content. Wee."
    }
  },
  invertColor: function(){
    return function(text, render){
      var color = render(text).substring(1);

      var reqHex = "";
      for(var i=0;i<6;i++){
          reqHex = reqHex + (15-parseInt(color[i],16)).toString(16);
      }
      if(color.length === 6)
        return "#" + reqHex
      else
        return ("#" + reqHex).substring(0,4);
      
      color = color.substring(1);           // remove #
      color = parseInt(color, 16);          // convert to integer
      color = 0xFFFFFF ^ color;             // invert three bytes
      color = color.toString(16);           // convert to hex
      color = ("000000" + color).slice(-6); // pad with leading zeros
      color = "#" + color;                  // prepend #
      return color;
    }
  }
};


var options = {
  models: [
      user
  ], 
  onKeyUp: true, 
  beforeUpdate: function(updatedModel, updatedProp, newValue){
    console.log("About to set " + updatedModel.id + "'s " + updatedProp + " to " + newValue)
  }
}