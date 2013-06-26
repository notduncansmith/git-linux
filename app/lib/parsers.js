module.exports = function() {

function parseGitLog(delimiter) {
  var commits = text.split(delimiter);
  var commitList = [];
  var commitStart = 
  commits.forEach(function(commit) {
    var commitLines = commit.split('\n').filter(function(line){
      return line.trim().length > 0;
    })
    commitList.push({
      commitHash : commitLines[0].split(' ')[1].trim(),
      author : commitLines[1].split(": ")[1].trim(),
      date : commitLines[2].split(": ")[1].trim(),
      message: commitLines[3].trim()
    });
  })
  return commitList;
};

}