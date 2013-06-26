function parseDiff(fileArray) {
	var fileSelectHtml = ""
    , diffHtml = "";
	diffText.forEach(function(file) {
    var fileNameLine = file.lines[0];
    fileSelectHtml +=  '<div class="' + file.type + '"></div><div class="filePath">' + fileNameLine.substring(fileNameLine.indexOf('\/'),fileNameLine.length -1) + '</div>'
    diffHtml += '<ul class="fileLines">';
    file.lines.forEach(function(line) {
      diffHtml += '<li class="fileLine">' + line + '</li>';
    });
    diffHtml += "</ul>";
	});
  return {
    diff : diffHtml,
    fileSelect : fileSelectHtml
  };
}