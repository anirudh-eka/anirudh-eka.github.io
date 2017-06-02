var path = require('path');

module.exports = {
  entry: './_assets/javascripts/app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '_assets/javascripts')
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
