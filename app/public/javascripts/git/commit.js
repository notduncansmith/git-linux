
$(document).ready(function(){

  $("#diff").click(function(e){
    e.preventDefault();
    $.ajax({
      url: '/diff',
      success: function(data){
        console.log(data)
        var html = parseDiff(data);
        $('#fileSelect').html(html.fileSelect);
        // $('#diffBox').html(html.diff);
        styleDiffs();
        $('#fileSelect').show();
        $('#diffBox').show();
        $('#commitButton').show();
        $('#commitMessage').show();
      }
    })
  })

  function styleDiffs() {
    $('.fileLine').each(function(index,item) {                
      var trimmed = $(item).text().trim();
      if(trimmed[0] == "+") {
        $(item).addClass('added');
      } else if(trimmed[0] == '-') {
        $(item).addClass('deleted');
      }
    })
  }

  $('#commitButton').on('click', function() {
    $.ajax({
      url: '/commit',
      data: { toCommit: $('#hdnFilesToCommit').val(),
              commitMessage : $('#commitMessage').val()},
      success: function() {
        console.log('files committed');
        $('.activeFile').hide();
      },
      error: function(){
        console.log('commit error')
      }
    })
  });

  $(document).on('click','.filePath',function(){
    var self = this;
    $('#hdnFilesToCommit').val($(this).text());
    $.ajax({
      url: '/diff?path=' + encodeURIComponent($(this).text()),
      type: 'GET',
      success: function(diffResult) {
        $('.activeFile').removeClass('activeFile');
        $(self).addClass('activeFile');
        var html = parseDiff(diffResult);
        $('#diffBox').html(html.diff);
        styleDiffs();
      },
      error: function(err) {
        alert('error');
      }
    });          
  });
})