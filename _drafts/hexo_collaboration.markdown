---
layout: post
title:  "How to clone an existing Hexo site?"
tags: [code, static site, blogging platform]
---

[Hexo]("http://www.hexo.io") is a cool new static site generator that seems to be solving some of the pain points I've faced with [Jekyll]("http://jekyllrb.com/"). However, I noticed the documentation is unclear on how to pull down an existing Hexo site via git and contribute to it. Here is what worked for me.

<span style='display: none;'><!--more--></span>

## How to clone

Install the Hexo CLI (you will need [npm](https://www.npmjs.com/)) in Terminal:

```
$ npm install -g hexo-cli
```

Make a folder to house the source code locally, and initialize Hexo:

```
$ mkdir cool-hexo-blog
$ cd cool-hexo-blog
$ hexo init
```
Set origin remote repository to this github repo and pull:

```
$ git remote set-url origin https://github.com/anirudh-eka/cool-hexo-blog.git
$ git pull
```

Install dependancies:

```
$ npm install
```

Run the server to check it out locally!

```
$ hexo server
```

## How to push & pull

Pushing and pulling to remote `origin` repo is exactly the same as any other repo. Remember, you will need privelages to push to the repo!
