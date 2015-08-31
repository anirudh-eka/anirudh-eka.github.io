// frames in css must all have an -end version to say the ending state
var movie = {};
var audio = document.getElementsByTagName("audio")[0]
var init = function() {
	movie = Transit.getClass("scene")
	audio.play();
    window.setTimeout(function(){movie.play(200, function(){
    	audio.pause();
    })}, 1500);
}

var reset = function() {
	audio.pause();
	audio.currentTime = 0;
	movie.rewindToFirstFrame();
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
			// make all scenes go to next frame 
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

		scenes.play = function(defaultStepTime, callback) {
			// makes each scene go to next frame in order with a pause time
			var self = this;
			var _play = function(index, defaultStepTime){
				var scene = self[index];
				if(scene == undefined){
					callback();
					return;
				}

				scene.nextFrame()

				var stepTime = scene.dataset.sceneStep ? scene.dataset.sceneStep : defaultStepTime
				window.setTimeout(function(){_play(index + 1)}, stepTime)
			}
			_play(0, defaultStepTime);
		}

		return scenes;
	}
}