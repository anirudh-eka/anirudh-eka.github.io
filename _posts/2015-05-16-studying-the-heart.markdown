---
layout: post
title:  "Studying The Heart"
tags: [reminders, rhyme]
share: discuss
---
<style type="text/css">
	.fade-in {
		opacity: 0;
		/*transition: opacity .1s ease-in-out;*/
	}

	.fade-in-end {
		opacity: 1;
	}

	.pulse-end {
		display: inline-block;
		animation-name: pulse;
  		animation-duration: 0.5s; 
  		animation-timing-function: ease-out; 
  		animation-delay: 0;
  		animation-direction: alternate;
  		animation-iteration-count: 2;
  		animation-fill-mode: none;
  		animation-play-state: running; 
	}
	.pulse {
		display: inline-block;
		transition: transform .1s ease-in-out, color .1s ease-in-out;
	}

	.pulse:hover {
		transform: scale(1.2);
		color: red;
	}

	@keyframes pulse {
	  0% {
	  }
	  100% {
	  	transform: scale(1.2);
	    color: red;
	  }
	}
</style>

<script type="text/javascript">
		var els = {};
		var init = function() {
			els = Transit.getClass("fade-in")
			fadeInEls(0)
		}
		var fadeInEls = function(index) {
			if(els[index] == undefined){
				return;
			}

			els[index].changeTo("fade-in-end") 
			runOtherFX(els[index])

			var pauseTime = 170;
			if((index + 1) % 4 == 0 ) { pauseTime = 1300}
			window.setTimeout(function(){fadeInEls(index + 1)}, pauseTime)
		}

		var runOtherFX = function(el) {
			if (el.className.match(/(^|\s)pulse(\s|$)/) != null){
				el.changeTo("pulse-end");
			}
		}

		Transit = {
			getClass: function(className) {
				var els = document.getElementsByClassName(className)
				var newObj = {}
				for (var i = 0; i < els.length; i++) {
    				newObj[i] = els[i];
    				newObj[i].changeTo = function(endClass) {
    					var re = new RegExp("(^|\\s)"+endClass+"(\\s|$)")
    					if(this.className.match(re) == null){
    						this.className += (" " + endClass);	
    					}
					}
				}
				
				newObj.changeTo = function(endClass) {
					// map changeTo on all classes
					for (var key in this) {
					    if (this.hasOwnProperty(key) && this[key].changeTo != undefined) {
					        this[key].changeTo(endClass);
					    }
					}
				}

				return newObj
			}
		}
</script>

<span class="fade-in">I'm</span><span class="fade-in"> studying</span><span class="fade-in"> my </span><span class="pulse fade-in">heart</span>  <br/>
<span class="fade-in">I'm</span><span class="fade-in"> digesting</span><span class="fade-in"> my </span><span class="fade-in">name</span>

I'm taking borders apart <br/>
<span class="fade-in">putting my pride to shame</span>

<span class="hithere">I've been a shell of myself</span> <br/>
but it's the season of change

Aint no reason for doubt, <br/>
this is when a moth meets its flames
<span style="display: none;"><!--more--></span>

when a perfectionist dies <br/>
so the perfection remains

like this universe was beautiful <br/>
before I ever came 

I've got nothin to claim <br/>
not even the place where I stay

because if you give a fish <br/>
a bowl you take its ocean away

if they asked what I've learned <br/> 
tell em its as simple as this

anger is just fear <br/>
clenched in a fist

Learning to let go <br/>
is what it means to resist

I've learned, to have the mind of an elder <br/>
with the heart of a child

I live in a cage, <br/>
but I was born to be wild

And Freedom, ain't nothin, but <br/>
staring down fear with a smile

All the while, to love myself fully <br/>
and not just for the positive things

For When I grew wings,  <br/>
they said they were proud. 

They adorned them in jewels so heavy  <br/>
I could never leave the ground. 

That's why I'd rather be a pidgin than a peacock,  <br/> 
A feather too many, is too heavy for me

Don't sweeten my air with sugar,  <br/>
because I like it when I can breath

a feather could be a tether <br/>
just as much as it is a key

It's better to give it to someone with lesser <br/> 
than letting it hold me down by my greed

Cuz the fruits that I eat, <br/>
are the product of someone else's hard work

I've learned, that the guilt of privilege hurts, <br/>
ignorance is the most painful of losses

But it doesn't compare to the pain <br/>
the cost of that privilege causes

Compassion can build solidarity <br/>
pity is a narrow way to feel tall

If you grow like a red wood,  <br/>
you may scrape the sun for a moment, <br/>
but you are destined to fall

But, if you grow like a banyan tree, <br/>
in every leaf in the forest <br/>
you feel the light through us all 

I've learned, the furthest you can travel <br/>
is to the corners of your mind

Genius is not something you have, <br/>
But it is something that you find

But most of all, I've learned, <br/>
I was never a poet <br/>
in all that I've written

I've just been trying to interpret <br/>
the metaphor that we live in

So to all I've been given, <br/>
Since my journey's begun

Every stroke of my pen <br/>
Every breath in my lung

Is a thank you <br/>
in the voice of the dumb
