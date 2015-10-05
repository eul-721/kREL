$(document).ready(function() {
  $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });

  $('.map-link').click(function(e){
    $(this).parent("li").addClass("active");
    $('.map-link').not(this).parent("li").removeClass("active");
     $(this).blur();
  })
});
