module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      require('karma-webpack'),
      require('karma-sourcemap-loader'),
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-spec-reporter'),
      require('karma-coverage-istanbul-reporter')
    ],
    client: {
      clearContext: false
    },
    coverageIstanbulReporter: {
      dir: 'coverage',
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    files: [
      './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
      './src/**/*.spec.js'
    ],
    preprocessors: {
      'src/**/*.js': [ 'webpack', 'sourcemap' ]
    },
    webpack: require('./webpack.config.test'),
    browsers: ['PhantomJS'],
    reporters: ['spec']
  });
};
