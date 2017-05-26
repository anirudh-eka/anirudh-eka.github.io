import $ from 'jquery';

const readMore = {
  init: function(){
    $("#read-more-arrow").on("click", function(e){
      console.log("arrow clicked")
      e.preventDefault();
      var scrollTo = $("#posts").offset().top
      console.log(scrollTo);
      $("html,body").animate({scrollTop:scrollTo}, 1000);
    });
  }
};

export default readMore;
