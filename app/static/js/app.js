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


  checkAnimate();
});