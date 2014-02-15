//= require vendor/jquery

$.fn.exists = function () {
    return this.length !== 0;
}

$(document).ready(function(){
    $window = $(window);
    
    $('#banner').each(function(){
      var $bgobj = $(this); // assigning the object
      $window.scroll(function() {
          var yPos = ($window.scrollTop() / 3); 
           
          // Put together our final background position
          var coords = '50% '+ yPos + 'px';

          // Move the background
          $bgobj.css({ backgroundPosition: coords });
      }); 
    });

    $('#blog').on('click', function() {
      $('html').animate({scrollTop: $('#blog').offset().top}, 600, function(){
        window.location.hash = 'blog';
      });
    });

    $window.on('scroll', function(){
      if ($window.scrollTop() == 0) {
        window.location.hash = '';
      }

      if ($('#blog').exists() && $window.scrollTop() >= $('#blog').offset().top) {
        window.location.hash = 'blog';
      }
    });
});