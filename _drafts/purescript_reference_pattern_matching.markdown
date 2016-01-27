---
layout: post
title:  "Purescript Reference: Pattern Matching"
categories: [general, programmer, poet]
tags: [functional programming, frontend, reference]
share: discuss
--- 

This a reference guide for how Purescript pattern matching. Almost all of it was distilled from [PureScript by Example](https://leanpub.com/purescript/read) by Phil Freeman the original developer of the Purescript compiler. I highly recommend reading it for in depth stuff. This is just for reference. 

<span style="display: none;"><!--more--></span>

Simple Patterns
-----------------------
There are many types of simple patterns. 
variable patterns  are ones that bind arguments to a name like so:

{% highlight haskell %}

	add x y = x + y
{% endhighlight %}

wild card patterns matches any argument like a variable pattern, but does not bind a name to it

{% highlight haskell %}

	avoidArgument _ = "blah blah"
{% endhighlight %}

literal patterns match to specific values for example here are some Int, String, and Boolean literals:

{% highlight haskell %}

	addOneWithFour 1 4 = 1 + 4 
	reply "hi" = "why are you talking to me?"
	toString true = "true"
{% endhighlight %}
	
Guards
-----------
Purescript supports guards like Haskell. Here is an example for the Euclidean algorithm:
{% highlight haskell %}

	gcd :: Int -> Int -> Int
	gcd n 0 = n
	gcd 0 n = n
	gcd n m | n > m =gcd(n-m)m
		      | otherwise = gcd n (m - n)
{% endhighlight %}

Array Patterns
----------------------
In Purescript, you can apply some of the same patterns you can do on a Haskell list. The purescript Array is based on the JS Array, except it only take entries of a single type. PS also has a linked list that can be found in Data.List, which is like the Haskell List. This one is much more efficient. Anyway I digress! Here is some ways you can pattern match on an Array:

{% highlight haskell %}

	isEmpty :: forall a. Array a -> Boolean
	isEmpty [] = true
	isEmpty _ = false
	
	takeFive :: Array Int -> Int
	takeFive [1, 2, a, b, _] = a * b
	takeFive _ = 0

{% endhighlight %}

*NOTE: Purescript does not support pattern matching with cons (:) operator on Data.Array! This is due to poor performance. :(  You can use Cons for pattern matching on Data.List using 'Cons'*

Record Patterns
-----------------------
Record patterns are used to match records. Recall a record is a light weight data structure, like so:
algorithm:

{% highlight haskell %}
	
	type Person = {firstName :: String, lastName :: String}

{% endhighlight %}

We can use record patterns to match records, like so:

{% highlight haskell %}

	type Person = {firstName :: String, lastName :: String}
	
	showPerson :: Person -> String
	showPerson { firstName: "Anirudh", lastName: y} =  "Anirudh, the baddest"
	showPerson { firstName: x, lastName: y} =  y ++ ", " ++ x

{% endhighlight %}

*Note: If we don't want to explicitly create a 'Person' type, we can also define `showPerson` as such*

{% highlight haskell %}

	showPerson :: { firstName :: String, lastName :: String }  -> String
	showPerson { firstName: "Anirudh", lastName: y } =  "Anirudh, the baddest"
	showPerson { firstName: x, lastName: y } =  y ++ ", " ++ x

{% endhighlight %}

Row Polymorphism
----------------------------
Row polymorphism is the idea that a function can take a record with a variable number of rows, as long as the explicitly defined rows are matched. To give row polymorphism in the example above:

{% highlight haskell %}

	showPerson :: forall r. {firstName :: String, lastName :: String | r } -> String
	showPerson { firstName: "Anirudh", lastName: y} =  "Anirudh, the baddest"
	showPerson { firstName: x, lastName: y} =  y ++ ", " ++ x

{% endhighlight %}

Now you can do this:

{% highlight haskell %}

	> showPerson { firstName: "Anirudh", lastName: "Dhullipalla", nickname: "rudy"}
	"Anirudh, the baddest"

{% endhighlight %}

But not this: 

{% highlight haskell %}

	> showPerson { firstName: "Anirudh"}
	Error found: ...
	
{% endhighlight %}

Nested Patterns
-----------------------
Nested Patterns are exactly what you think. Array and Record patterns use them, but you can make them deep, like so:

{% highlight haskell %}

	type Address = { street :: String, city :: String }
	
	type Person = { name :: String, address :: Address }
	
	livesInLA :: Person -> Boolean
	livesInLA { address: { city: "Los Angeles" } } = true 
	livesInLA _ = false

{% endhighlight %}

Named Patterns
-----------------------
You can bring additional names into scope with nested patterns by naming the array itself:

{% highlight haskell %}

	sortPair :: Array Int -> Array Int 
	sortPair arr@[x, y]
		| x <= y = arr
		| otherwise = [y, x]

{% endhighlight %}

Here we have named the Array itself as well as pieces of its content. 

Algebraic Datatypes
-----------------------------
(I promise this is related to pattern matching...)

Algebraic Datatypes offers the ability to maintain modularity while extending the functionality of an abstraction. It's helpful to understand it's benefit by comparing it with OO. Imagine we are working with shapes and we wanted to represent some common functionality all shapes will have. In an OO language we might do this:

{% highlight java %}

	interface Shape {
		area() 
	} 
	
	class Circle : Shape {
		area() {
			...
		}	
	}
	
	class Rectangle : Shape {
		area() {
			...
		}	
	}

{% endhighlight %}

Now imagine we decided that shapes should support perimeter. If we add `perimeter()` to `Shape` then we would be forced to modify all of the classes that implement `Shape`. This in a way breaks modularity.

With algebraic data types, we:
 
1. capture the various types of shapes in the datatype definition (use the `data` keyword to define a datatype):

	{% highlight haskell %}

		data Shape = Circle Point Number | Rectangle Point Number Number

	{% endhighlight %}

2. and then add functionality to each of the shapes using pattern matching:

{% highlight haskell %}
	
	area :: Shape -> Number
	area (Circle Point Number) = Number * Number * Pi
	area (Rectangle Point Number Number) = Number * Number

{% endhighlight %}

Notice you have access to the data you used to construct the shape with pattern matching. Neat, huh? It makes you think about what a concrete representation of an abstract idea really is. Really, what makes concrete representations of a single type different is the data needed to make them and their name.

### Data / Type Related Keywords:

**data** - what directly follows the data keyword, is the name of the Algebraic Data Type and after the '=' is the constructors for that type. 

**type** - It defines a type synonym. For example:

{% highlight haskell %}

	type Person = {firstName :: String, lastName :: String}

{% endhighlight %}

This says that Person is equivalent to the record type, which is denoted by the `{}` (basically a strongly typed representation of the JS object). 

Note that that is different from: 

{% highlight haskell %}

	data Person = Person {firstName :: String, lastName :: String}

{% endhighlight %}

which defines a new Algebraic Datatype, `Person`, that has one constructor by the same name that takes a record (`{firstName :: String, lastName :: String}`) as an argument.

**newtype** - gives a new name to an existing type. A new type must define only one constructor and that constructor must take only one argument, the type that you want to make a new name for. For example:

{% highlight haskell %}

	newtype Monster = Monster Person

{% endhighlight %}

Here the ADT, `Monster` has a constructor by the same name that takes a `Person` as argument.