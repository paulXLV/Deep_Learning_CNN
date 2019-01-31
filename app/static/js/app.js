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

    if( file == ''){
      $("#fileAlert").removeClass('hide');
    }else{
      $.ajax({
          type: 'POST',
          url: '/getfile',
          data: form_data,
          contentType: false,
          dataType: 'json',
          cache: false,
          processData: false,
          success: function(data) {
              console.log('Success!');
              console.log(data);
              $("#imageUploaded").html('<img src="/static/images/uploads/'+data[0].filepath+'" />');
              $("#predictionInfo").html('<div><label>Predicted Animal :</label> '+data[1].prediction.animal+'</div><div><label>Prediction Accuracy :</label> '+data[1].prediction.accuracy+'</div>');
          },
      });
    }
  });
  checkAnimate();
});
