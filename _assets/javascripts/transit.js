// frames in css must all have an -end version to say the ending state
var movie = {};
var init = function() {
	movie = Transit.getClass("scene")
	playMovie(0)
}

var reset = function() {
	movie.rewindToFirstFrame();
}

var playMovie = function(index) {
	var scene = movie[index];
	if(scene == undefined){
		return;
	}

	scene.nextFrame()

	var pauseTime = 100;
	// if((index + 1) % 4 == 0 ) { pauseTime = 1300}
	window.setTimeout(function(){playMovie(index + 1)}, pauseTime)
}

Transit = {
	getClass: function(className) {
		var els = document.getElementsByClassName(className)		
		var scenes = {}
		scenes.length = 0;

		for (var i = 0; i < els.length; i++) {
			var scene = els[i];
			scene.frames = [];
			scene.nextFrame = function() {
				var startFrames = this.className.split(" ");
				for (var i = 0; i < startFrames.length; i++) {
					var endFrame = startFrames[i] + "-end"
					var re = new RegExp("(^|\\s)"+endFrame+"(\\s|$)")

					if(this.className.match(re) == null){
						this.frames.push(endFrame);
						this.className += (" " + endFrame);	
					}
				};
			}
			scene.rewindToFirstFrame = function(){
				var lastFrameName = this.frames.pop()
				if (lastFrameName == undefined) { return; }
				var re = new RegExp("(^|\\s)"+lastFrameName+"(\\s|$)")
				this.className = this.className.replace(re, "");
				this.rewindToFirstFrame();
			}
			scenes[i] = scene;
			scenes.length += 1;
		}
		
		scenes.nextFrame = function() {
			// map nextFrame on all classes
			for (var key in this) {
			    if (this.hasOwnProperty(key) && this[key].nextFrame != undefined) {
			        this[key].nextFrame();
			    }
			}
		}

		scenes.rewindToFirstFrame = function() {
			// map rewind on all classes
			for (var key in this) {
			    if (this.hasOwnProperty(key) && this[key].rewindToFirstFrame != undefined) {
			        this[key].rewindToFirstFrame();
			    }
			}
		}

		return scenes;
	}
}