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

});


var quotes = (function() {
  var allQuotes = [
  {author: "stic.man of Dead Prez", text: "By the struggle, I was never broken, I was broken open. I tapped into a source that was omnipotent"},
  {author: "Korra from Avatar: Legend of Korra", text: "I know I was in a pretty dark place when I was poisoned, but I needed to go through that. I needed to understand what true suffering was; so I could become more compassionate to others."},
  {author: "Alice Walker", text: "If art doesn't make us better, then what on earth is it for." }
  ]
  var getNewQuote = function(currentQuote, callbacks) {
    var newQuote = allQuotes[Math.floor(Math.random()*allQuotes.length)]
    console.log(currentQuote != newQuote.text)
    
    if (newQuote.text != currentQuote) {
      callbacks.success(newQuote, callbacks.complete);
    } else {
      getNewQuote(currentQuote, callbacks);
    }
  }

  var replaceQuote = function(quote, callback) {
    $("#quote-text").text(quote.text)
    $("#quote-author").text(quote.author)
    $("#quote").fadeIn(500, function() {
      callback();
    }); 
  }

  var setup = function() {
    var loop = function(){
      $("#quote").fadeOut(500, function() {
          console.log("loop")
          var quote = getNewQuote($("#quote-text").text(), {success: replaceQuote, 
                                                            complete: function() {
                                                              setTimeout(loop, 35000)
                                                            }
                                                          });
      });
    } 
    loop();
  }

  return { 
    init : setup
  }
})();

if (window.location.pathname === "/about/") {
  quotes.init();  
}
