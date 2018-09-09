const path = require('path');
const webpack = require('webpack');

const config = require('./webpack.config');

const rules = config.module.rules;

rules.push({
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          query: {
              esModules: true
          }
        },
        enforce: 'post',
        exclude: /.spec.js/,
        include: path.resolve('src/')
      }
    ]
  });

module.exports = Object.assign(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: null,
  output: {},
  module: {
    rules
  },
  plugins: [
    new webpack.DefinePlugin({
        ENV: JSON.stringify(require(path.join(__dirname, 'config', 'test')))
    })
  ]
});
