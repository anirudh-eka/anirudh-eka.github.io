var electronicSonnec = {
	init: function() {
		var self = this;
		$("nav").toggle();
		
		var audio = document.getElementsByTagName("audio")[0]
		var video = document.getElementsByTagName("video")[0]
		var movie = Transit.getScenes(".stanza-one")
	    audio.play();
	    window.setTimeout(function(){movie.play(0, function(){
	    	audio.pause();
	    	video.play();
	    })}, 0);
	}
}