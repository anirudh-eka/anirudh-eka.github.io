---
layout: post
title:  "Maps Are Folds"
categories: [programmer]
tags: haskell code functional
share: discuss
---

To kill time as I waited for my flight in the Yangon international airport, where all great revelations happen, I was working on a coding challenge in Haskell when I stumbled on this discovery.

<span style="display: none;"><!--more--></span>

The problem I was working on required me to filter a list into a sublist based on a function that goes through each item of a list and says if it belongs or doesn't, by returning True or False). The method signiture should look like this:  

{% highlight haskell %}
(a -> Bool) -> [a] -> [a]
{% endhighlight %}

(Much later I recognized Prelude, the Haskell standard library, already has a function with this signiture called `filter`. Sometimes it pays to be dull.) 

To define the function, let's call it `filter'`, the first thing I asked myself was "is this function that takes in a list a map or a fold?" 

What is a map?
--------------
At a high level, maps take a list and return a list of the same length with each item transformed by a function:

{% highlight haskell %}
-- given f and [a, b, c] -map-> returns [f a, f b, f c]
-- given +1 and [1, 2, 3] -map-> returns [2, 3, 4]
{% endhighlight %}

What is a fold?
---------------
Folds take a list, and return a single value after going through each element in a list:

{% highlight haskell %}
-- given f, a starting value for the aggregation x, 
-- and [a, b, c] -fold-> return f c (f b (f a x)) 
{% endhighlight %}

The method signiture for foldl is:

{% highlight haskell %}
foldl :: (b -> a -> b) -> b -> [a] -> b
{% endhighlight %}

The simplest example of a fold I immediately think of is adding each number in a list of numbers, starting the total sum at 0. It would look like this:

{% highlight haskell %}
sum ns = foldl (+) 0 ns 
{% endhighlight %}

To reduce a list is to fold it
------------------------------

Given a list, map returns a list of the same length and fold returns a single value, but the function we're defining is supposed to return something that's in-between-- a list that's smaller than the original, it could be as small as an empty list, but not a single value. Then I glanced at the method signiture of foldl, again:

{% highlight haskell %}
foldl :: (b -> a -> b) -> b -> [a] -> b
{% endhighlight %}

Nothing here stopped `b` from being a list! `b` is just an aggregator. What if we were building a list, instead of say, a number, in our `sum` example? We could just call `foldl` like this:

{% highlight haskell %}
foldl (\bs a -> bs ++ [a]) [] [1, 2, 3]
-- => [1, 2, 3]
{% endhighlight %}

Or if we wanted to filter the list so that it doesn't have 2's in it:

{% highlight haskell %}
foldl (\bs a -> if a /= 2 then bs ++ [a] else bs) [] [1, 2, 3]
-- => [1, 3]	
{% endhighlight %}

We expressed filter, in terms of fold. Well I did, and you watched if you got this far... Here's a named definition
of filter using a fold:

{% highlight haskell %}
filter' :: (a -> Bool) -> [a] -> [a]
filter' f as = foldl (\bs -> (\a -> if f a then bs ++ [a] else bs)) [] as
{% endhighlight %}

Maps are Folds
--------------

But if we back up a little, we performed a fold that builds a list of the same size as the input list (printed again below):

{% highlight haskell %}
foldl (\bs a -> bs ++ [a]) [] [1, 2, 3]
-- => [1, 2, 3]	
{% endhighlight %}

It's not too much more work to perform any function, `f`, on the item before adding it to the list. That means we go through each item of the list and create another list with the result of calling `f` with each item. This is the definition of a map! So here is a map defined using a fold:

{% highlight haskell %}
map'' :: (a -> b) -> [a] -> [b]
map'' f as = foldl (\bs a -> bs ++ [f a]) [] as
{% endhighlight %}

Moral of the story: Folds are flexible
--------------------------------------

This was a revelation to me because when I think of fold-ing something, I think of a piece of paper folded into something smaller. But this metaphor limited my understanding of the flexibility of fold (no pun intended) in Haskell. All a fold really does is it goes through a list passing to a given function each item and another value, the aggregator, that becomes the return value when the last item has been processed.

A map is just a subset of a fold with a starting value of `[]` and a function that adds each item to the list after it is passed to a function given by the caller of map.