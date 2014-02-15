---
layout: post
title:  "Reblog From DBC: Discovering Recursion"
date:   2014-01-21 08:53:44
categories: programmer
tags: dev bootcamp
share: discuss
---

This is a reblog from my [Dev Bootcamp blog](http://poetprogrammer.tumblr.com/):

Today was intense, but fun! Brick, our instructor, introduced us to recursion using the movie, Inception, as an example. It follows a recursive method of entering dream within dream within dream and then subsequently waking up from each inner dream until the viewer believe she is in reality. Or is she? Dun. Dun. Dun!

Because I’m a nerd, I basically reduced the movie into a recursion in ruby.

Spoiler Alert

Ok, just run this ruby program and you’ve basically watched the movie:

{% highlight ruby %}
def inception_recursion(num)
    if num == 1
        puts "Oh my god..."
        puts "Ken Watanabe is here too!"
        return
    end

    puts "I'm in a dream!"
    inception_recursion(num-1)
    puts "ah, I just woke up"
    puts
    puts "Or...Did...I?"
end

puts inception_recursion(3)
{% endhighlight %}
