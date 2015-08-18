//= require vendor/jquery
//= require_tree .

$(document).ready(function(){
  $("#read-more-arrow").on("click", function(e){
    e.preventDefault();
    var scrollTo = $("#posts").offset().top
    $("html").animate({scrollTop:scrollTo}, 1000);
  });
});