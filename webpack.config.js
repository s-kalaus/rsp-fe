const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/scripts/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: true,
      template: 'src/index.html'
    }),
    new CopyWebpackPlugin([
        {from:'src/images', to: 'images'}
    ]),
    new webpack.DefinePlugin({
        ENV: JSON.stringify(require(path.join(__dirname, 'config', process.env.NODE_ENV)))
    })
  ]
};
