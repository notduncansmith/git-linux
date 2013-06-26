module.exports = function() {

function parseGitLog(text, delimiter) {
  var commits = text.split(delimiter);
  var commitList = [];
    
  commitList.push(commits.map(function(commit) {
    var commitLines = commit.split('\n').filter(function(line){
      return line.trim().length > 0;
    })
    return {
      commitHash : commitLines[0].split(' ')[1].trim(),
      author : commitLines[1].split(": ")[1].trim(),
      date : commitLines[2].split(": ")[1].trim(),
      message: commitLines[3].trim()
    }
  }));
  return commitList;
}

function parseGitRemotes(text) {
  var remotes = text.split('\n')
    , remoteList = [];

  remoteList.push(remotes.map(function(remote){
    var splitRemote = remote.split(' ');
    return {
      name : splitRemote[0],
      url : splitRemote[1],
      type : splitRemote[2].replace("(","").replace(")","")
    }
  }));
  return remoteList;
}

function parseGitBranch(text) {
  var branches = text.split('\n');
  var branchList = [];
  
  branchList.push(branches.map(function(branch) {
    var splitBranch = remote.split(' ');
    return {
      name : splitBranch[0] == "*" ? splitBranch[1] : remote.trim(),
      active : splitBranch[0] == "*"
    }
  }));
  return branchList;
}

function parseGitDiff(text) {
  var modifiedFiles = text.split('diff --git').map(function(file){
    return file.trim();
  }).filter(function(trimmedFile) {
    return trimmedFile.length > 0;
  }).map(function(file) {
    var lines = file.split('\n')
                    .filter(function(line) {
                      return line.trim().length > 0;
                    }).map(function(line) {
                      return line.trim();
                    });
    var type = "";                    
    switch(lines[1].split(' ')[0])
    {
      case "index":
        type = "edit";
        break;
      case "deleted":
        type = "deleted";
        break;
      case "created":
        type = "added";
        break;
    } 
    return {
      type : type,
      lines : lines
    }
  })
  // var fileList = [];
  
  // modifiedFiles.forEach(function(file) {
    
  // })
  return modifiedFiles;
};

return {
  parseGitDiff: parseGitDiff
}

}