module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'requirejs', 'chai', 'sinon', 'sinon-chai'],
    files: [
      'test-main.js',
      'src/vendor/glMatrix.js',
      'src/typedefs.js',
      {pattern: 'src/*.js', included: false},
      {pattern: 'spec/**/*.js', included: false},
    ],
    exclude: [
    ],
    preprocessors: {
        'src/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    coverageReporter: {
        type : 'html',
        dir : 'coverage/'
    }
  });
};
