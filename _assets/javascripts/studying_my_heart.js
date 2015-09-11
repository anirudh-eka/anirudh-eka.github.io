var studyingMyHeart = {
	init: function() {
		var self = this;
		// $("#canvas-container").css("overflow-y", "hidden");
		// $("body").css("overflow-y", "hidden");
		$(".theater-controls .play").on('click', function() {
			$(".theater-controls").addClass("theater-is-playing");
			// $("#canvas-container").css("overflow-y", "auto");
			// $("body").css("overflow-y", "auto");
			self.play();
		});
	},
	play: function() {
		$("nav").toggle();
		var scrollToSpaceTheme = $(".space-theme").offset().top + 100;
		var endOfContainer = $("#canvas-container").height

		$(".scroll-to-space").on("fx:fade-in-end", function(){ 
			$("#canvas-container").animate({scrollTop: scrollToSpaceTheme}, 1300, function() {
    			$("#canvas-container").animate({scrollTop: 1500}, 32000, 'linear')
  			});
		});

		// autoscroll
		// var container = $('.parallax');
		// container.animate({scrollTop: 2600}, 200000);
		init();
	}
}