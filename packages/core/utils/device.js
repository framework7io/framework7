'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ssrWindow = require('ssr-window');

var Device = function Device() {
  var platform = _ssrWindow.window.navigator.platform;
  var ua = _ssrWindow.window.navigator.userAgent;

  var device = {
    ios: false,
    android: false,
    androidChrome: false,
    desktop: false,
    windowsPhone: false,
    iphone: false,
    iphoneX: false,
    ipod: false,
    ipad: false,
    edge: false,
    ie: false,
    macos: false,
    windows: false,
    cordova: !!(_ssrWindow.window.cordova || _ssrWindow.window.phonegap),
    phonegap: !!(_ssrWindow.window.cordova || _ssrWindow.window.phonegap)
  };

  var windowsPhone = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  var iphoneX = iphone && _ssrWindow.window.screen.width === 375 && _ssrWindow.window.screen.height === 812;
  var ie = ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
  var edge = ua.indexOf('Edge/') >= 0;
  var macos = platform === 'MacIntel';
  var windows = platform === 'Win32';

  device.ie = ie;
  device.edge = edge;

  // Windows
  if (windowsPhone) {
    device.os = 'windows';
    device.osVersion = windows[2];
    device.windowsPhone = true;
  }
  // Android
  if (android && !windows) {
    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }
  // iOS
  if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, '.');
    device.iphone = true;
    device.iphoneX = iphoneX;
  }
  if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, '.');
    device.ipad = true;
  }
  if (ipod) {
    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    device.iphone = true;
  }
  // iOS 8+ changed UA
  if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
      device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
    }
  }

  // Webview
  device.webView = (iphone || ipad || ipod) && (ua.match(/.*AppleWebKit(?!.*Safari)/i) || _ssrWindow.window.navigator.standalone);
  device.webview = device.webView;

  // Desktop
  device.desktop = !(device.os || device.android || device.webView);
  if (device.desktop) {
    device.macos = macos;
    device.windows = windows;
  }

  // Minimal UI
  if (device.os && device.os === 'ios') {
    var osVersionArr = device.osVersion.split('.');
    var metaViewport = _ssrWindow.document.querySelector('meta[name="viewport"]');
    device.minimalUi = !device.webView && (ipod || iphone) && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) && metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
  }

  // Check for status bar and fullscreen app mode
  device.needsStatusbarOverlay = function needsStatusbarOverlay() {
    if ((device.webView || device.android && device.cordova) && _ssrWindow.window.innerWidth * _ssrWindow.window.innerHeight === _ssrWindow.window.screen.width * _ssrWindow.window.screen.height) {
      if (device.iphoneX && (_ssrWindow.window.orientation === 90 || _ssrWindow.window.orientation === -90)) {
        return false;
      }
      return true;
    }
    return false;
  };
  device.statusbar = device.needsStatusbarOverlay();

  // Pixel Ratio
  device.pixelRatio = _ssrWindow.window.devicePixelRatio || 1;

  // Export object
  return device;
}();

exports.default = Device;