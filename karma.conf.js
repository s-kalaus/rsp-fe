module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-jasmine'),
      require('karma-phantomjs-launcher')
    ],
    files: [
      {
        pattern: 'src/**/*.spec.js',
        watched: false
      }
    ],
    preprocessors: {
        'src/**/*.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: require('./webpack.config.test'),
    browsers: ['PhantomJS'],
    reporters: ['progress']
  });
};
