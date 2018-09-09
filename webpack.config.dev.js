process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = Object.assign(require('./webpack.config'), {
  mode: process.env.NODE_ENV,
  devtool: 'source-map'
});
