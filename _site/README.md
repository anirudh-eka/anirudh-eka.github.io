# Toomanynames

## How to run

The js is built using [webpack]("https://webpack.js.org"). You can
explore more about the setup in `webpack.config.js`. In a nutshell the
entry point is `_assets/javascripts/app/index.js`. All other js files
are also in the same directory `_assets/javascripts/app/`. 

`webpack` will output this to `_assets/javascripts/bundle.js` when you
run:

```
$ webpack
```

at the project root. You will need to do this everytime you modify the
js files in the `app` directory. (You don't need to restart the Jekyll
server.)

It appears that webpack by default supports
[ES6/ES2015]("http://es6-features.org/"), which is
cool (need to double check this). This means you'll be able to write
all your js files (in the `app` folder) in ES6! 

