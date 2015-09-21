var studyingMyHeart = {
	init: function() {
		var self = this;
		$(".theater-controls .play").on('click', function() {
			$(".theater-controls").addClass("theater-is-playing");
			self.play();
		});
	},
	play: function() {
		$("nav").toggle();
		var scrollToSpaceTheme = $(".space-theme").offset().top + 100;
		var endOfContainer = $("#canvas-container").height

		$(".scroll-to-space").on("fx:fade-in-end", function(){ 
			window.setTimeout(function(){
				console.log("hi")
				$("#canvas-container").animate({scrollTop: scrollToSpaceTheme}, 1300, function() {
    				$("#canvas-container").animate({scrollTop: 1500}, 32000, 'linear')
  				});
			}, 800)
		});

		var audio = document.getElementsByTagName("audio")[0]
		movie = Transit.getScenes(".scene")
	    audio.play();
	    window.setTimeout(function(){movie.play(0, function(){
	    	audio.pause();
	    })}, 1500);
		
	}
}