//= require vendor/jquery

$(document).ready(function(){
    $('#banner').each(function(){
        var $bgobj = $(this); // assigning the object
        $window = $(window);
        $window.scroll(function() {
            var yPos = ($window.scrollTop() / 3); 
             
            // Put together our final background position
            var coords = '50% '+ yPos + 'px';
 
            // Move the background
            $bgobj.css({ backgroundPosition: coords });
        }); 
    });    
});