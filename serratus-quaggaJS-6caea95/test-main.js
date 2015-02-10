var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  baseUrl: '/base',

  paths: {
    'array_helper': 'src/array_helper',
    'cv_utils': 'src/cv_utils',
    'typedefs': 'src/typedefs',
    'glMatrixAddon': 'src/glMatrixAddon',
    'cluster': 'src/cluster',
    'camera_access': 'src/camera_access',
    'events': 'src/events',
    'html_utils': 'src/html_utils'
  },
  deps: allTestFiles,
  callback: window.__karma__.start
});
