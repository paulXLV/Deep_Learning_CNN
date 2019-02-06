jQuery(document).ready( function($){
  // navigation toggle
  $('.sidebar-nav .tab').click( function(){
    if($(this).parent().hasClass('active')){
      $(this).parent().removeClass('active');
    }else{
      $(this).parent().addClass('active');
    }
  });

  // Check if element is scrolled into view
  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }
  function checkAnimate(){
    $('.animated').each(function() {
      if (isScrolledIntoView(this) === true) {
        $(this).removeClass('hide');
      }
    });
  }
  // If element is scrolled into view, fade it in
  $(window).scroll(function() {
    checkAnimate();
  });

  $("#submit").on("click", function(a){
    $("#fileAlert").addClass('hide');
    a.preventDefault();
    a.stopImmediatePropagation();
    var form_data = new FormData($('#upload-file')[0]);
    var file=$("#imageFile").val();

    $("#imageUploaded").html('');
    $("#predictionInfo").html('');
    if( file == ''){
      $("#fileAlert").removeClass('hide');
    }else{
      $("#overlay").removeClass('hide');
      $.ajax({
          type: 'POST',
          url: '/getfile',
          data: form_data,
          contentType: false,
          dataType: 'json',
          cache: false,
          processData: false,
          success: function(data) {
              $('#imageFile').val('');
              $("#overlay").addClass('hide');
              $("#imageUploaded").html('<img src="'+data[0].filepath+'" />');
              $("#predictionInfo").append('<div><label>Predicted Animal :</label> '+data[1].prediction.animal+'</div>');
              $("#predictionInfo").append('<div><label>Prediction Accuracy :</label> '+data[1].prediction.accuracy+'</div>');
              var scorelist=data[1].prediction.score_list;
              var scorelist1=data[1].prediction.score_list_outline;
              $("#predictionInfo").append('<h4>Prediction Percentages</h4>');
              scorelist.forEach(function(a,b){
                $("#predictionInfo").append('<div><label>'+a[0]+'</label> : <span>'+a[1]+'</span></div>');
              });
              $("#predictionInfo").append('<hr /><div><label>Prediction Animal (Outline) :</label> '+data[1].prediction.animal_outline+'</div>');
              $("#predictionInfo").append('<div><label>Prediction Accuracy (Outline) :</label> '+data[1].prediction.accuracy_outline+'</div>');
              $("#predictionInfo").append('<h4>Prediction Percentages</h4>');
              scorelist1.forEach(function(a,b){
                $("#predictionInfo").append('<div><label>'+a[0]+'</label> : <span>'+a[1]+'</span></div>');
              });
          },
          fail: function(err){
               $("#overlay").addClass('hide');
               $("#predictionInfo").html("<div>Error</div>");
          }

      });
    }
    
  });
  checkAnimate();
});
