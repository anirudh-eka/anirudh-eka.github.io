---
---

Hexo Themes support [lodash]() out of the box! Lodash is a library that
offers functions inspired by the functional paradigm. However, if you
try to use Hexo variable that you would expect to be lists, like
`site.pages` you will be unpleasently suprised. 

A quick inspection of the keys `site.pages` will reveal there to be only
2 keys: `length` and `data`. No List/Array! It appears that the methods that
ship with the pages object like `site.pages.first()` or
`site.pages.each()`, use the `data` value in there implementation. This
means if you want to just work on a list using something like lodash,
you need to use `data` yourself.

For example, I wanted to use lodash's [`_.find(collection, predicate)`](https://lodash.com/docs#find) function on `site.pages`. This is how I did it:

```
_.find(site.pages.data, function(p){return p.title = "hellodash"})._content

```
