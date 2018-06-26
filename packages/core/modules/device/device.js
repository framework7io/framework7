'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ssrWindow = require('ssr-window');

var _device = require('../../utils/device');

var _device2 = _interopRequireDefault(_device);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'device',
  proto: {
    device: _device2.default
  },
  static: {
    device: _device2.default
  },
  on: {
    init: function init() {
      var classNames = [];
      var html = _ssrWindow.document.querySelector('html');
      if (!html) return;
      // Pixel Ratio
      classNames.push('device-pixel-ratio-' + Math.floor(_device2.default.pixelRatio));
      if (_device2.default.pixelRatio >= 2) {
        classNames.push('device-retina');
      }
      // OS classes
      if (_device2.default.os) {
        classNames.push('device-' + _device2.default.os, 'device-' + _device2.default.os + '-' + _device2.default.osVersion.split('.')[0], 'device-' + _device2.default.os + '-' + _device2.default.osVersion.replace(/\./g, '-'));
        if (_device2.default.os === 'ios') {
          var major = parseInt(_device2.default.osVersion.split('.')[0], 10);
          for (var i = major - 1; i >= 6; i -= 1) {
            classNames.push('device-ios-gt-' + i);
          }
          if (_device2.default.iphoneX) {
            classNames.push('device-iphone-x');
          }
        }
      } else if (_device2.default.desktop) {
        classNames.push('device-desktop');
      }
      if (_device2.default.cordova || _device2.default.phonegap) {
        classNames.push('device-cordova');
      }

      // Add html classes
      classNames.forEach(function (className) {
        html.classList.add(className);
      });
    }
  }
};