var studyingMyHeart = {
	init: function(imgPath) {
	},
	play: function() {
		$("nav").toggle();
		var scrollToSpaceEnd = $(".scroll-to-space-end").offset().top;

		$(".scroll-to-space").on("fx:fade-in-end", function(){ 
			$("#canvas-container").animate({scrollTop: scrollToSpaceEnd}, 2000);
		});

		// autoscroll
		// var container = $('.parallax');
		// container.animate({scrollTop: 2600}, 200000);
		init();
	}
}