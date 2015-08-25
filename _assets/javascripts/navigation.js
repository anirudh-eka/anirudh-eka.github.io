$(document).ready(function(){
  var nav_top = $("nav.sticky").offset().top
  $(window).on("scroll", function(){
  	if( topOfTheWindowIsPassedHeader() ){
  		$("nav.sticky").addClass("scrolled-to-top");
  	} else {
  		$("nav.sticky").removeClass("scrolled-to-top");
  	}
  });

  var topOfTheWindowIsPassedHeader = function() {
    return $(window).scrollTop() > nav_top
  }
});