//= require vendor/jquery

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

    $('#home-body h1').on('click', function() {
      $('html').animate({scrollTop: ($('#banner').height()+10)}, 600);
    });
});