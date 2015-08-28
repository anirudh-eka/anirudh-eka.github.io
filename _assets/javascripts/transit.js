var els = {};
var init = function() {
	els = Transit.getClass("fade-in")
	fadeInEls(0)
}

var reset = function() {
	els.rewindToFirstFrame();
}

var fadeInEls = function(index) {
	if(els[index] == undefined){
		return;
	}

	els[index].nextFrame("fade-in-end")
	runOtherFX(els[index])

	var pauseTime = 200;
	if((index + 1) % 4 == 0 ) { pauseTime = 1300}
	window.setTimeout(function(){fadeInEls(index + 1)}, pauseTime)
}

var runOtherFX = function(el) {
	if (el.className.match(/(^|\s)pulse(\s|$)/) != null){
		el.nextFrame("pulse-end");
	}
}

Transit = {
	getClass: function(className) {
		var els = document.getElementsByClassName(className)		
		var scenes = {}
		scenes.length = 0;

		for (var i = 0; i < els.length; i++) {
			var scene = els[i];
			scene.frames = [];
			scene.nextFrame = function(fameName) {
				var re = new RegExp("(^|\\s)"+fameName+"(\\s|$)")
				if(this.className.match(re) == null){
					this.frames.push(fameName);
					this.className += (" " + fameName);	
				}
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
		
		scenes.nextFrame = function(frameName) {
			// map nextFrame on all classes
			for (var key in this) {
			    if (this.hasOwnProperty(key) && this[key].nextFrame != undefined) {
			        this[key].nextFrame(frameName);
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