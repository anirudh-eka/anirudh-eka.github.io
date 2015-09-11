var studyingMyHeart = {
	init: function() {
		var self = this;
		$("#canvas-container").css("overflow-y", "hidden");
		$("body").css("overflow-y", "hidden");
		$(".theater-controls .play").on('click', function() {
			$(".theater-controls").addClass("theater-is-playing");
			// $("#canvas-container").css("overflow-y", "auto");
			// $("body").css("overflow-y", "auto");
			self.play();
		});
	},
	play: function() {
		$("nav").toggle();
		var scrollToSpaceEnd = $(".scroll-to-space-end").offset().top - 100;

		$(".scroll-to-space").on("fx:fade-in-end", function(){ 
			$("#canvas-container").animate({scrollTop: scrollToSpaceEnd}, 1300);
		});

		// autoscroll
		// var container = $('.parallax');
		// container.animate({scrollTop: 2600}, 200000);
		init();
	}
}