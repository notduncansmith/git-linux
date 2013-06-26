function parseDiff(fileArray) {
	var fileSelectHtml = ""
    , diffHtml = "";
	fileArray.forEach(function(file) {
    var fileNameLine = file.lines[0].split(' ')[0];
    fileSelectHtml +=  '<div class="' + file.type + '"></div><div class="filePath">' + fileNameLine.substring(fileNameLine.indexOf('\/'),fileNameLine.length) + '</div>'
    diffHtml += '<ul class="fileLines">';
    file.lines.forEach(function(line) {
      diffHtml += ('<li class="fileLine">' + line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '</li>');
    });
    diffHtml += "</ul>";
	});
  return {
    diff : diffHtml,
    fileSelect : fileSelectHtml
  };
}