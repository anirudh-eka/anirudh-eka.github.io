$(document).ready(function(){

  $(window).on("scroll", function(){
  	if( topOfTheWindowIsPassedHeader() ){
  		$("nav").addClass("scrolled-to-top");
  	} else {
  		$("nav").removeClass("scrolled-to-top");
  	}
  });

  var topOfTheWindowIsPassedHeader = function() {
  	return $(this).scrollTop() > $("#simple-home #title-container").height();
  }
});