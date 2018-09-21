import { d as win, c as doc } from './chunk-537afb9a.js';

var Device = (function Device() {
  var platform = win.navigator.platform;
  var ua = win.navigator.userAgent;

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
    firefox: false,
    macos: false,
    windows: false,
    cordova: !!(win.cordova || win.phonegap),
    phonegap: !!(win.cordova || win.phonegap),
  };

  var screnWidth = win.screen.width;
  var screnHeight = win.screen.height;

  var windowsPhone = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  var iphoneX = iphone && (
    (screnWidth === 375 && screnHeight === 812) // X/XS
    || (screnWidth === 414 && screnHeight === 896) // XR / XS Max
  );
  var ie = ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
  var edge = ua.indexOf('Edge/') >= 0;
  var firefox = ua.indexOf('Gecko/') >= 0 && ua.indexOf('Firefox/') >= 0;
  var macos = platform === 'MacIntel';
  var windows = platform === 'Win32';

  device.ie = ie;
  device.edge = edge;
  device.firefox = firefox;

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
  device.webView = !!((iphone || ipad || ipod) && (ua.match(/.*AppleWebKit(?!.*Safari)/i) || win.navigator.standalone));
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
    var metaViewport = doc.querySelector('meta[name="viewport"]');
    device.minimalUi = !device.webView
      && (ipod || iphone)
      && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7)
      && metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
  }

  // Check for status bar and fullscreen app mode
  device.needsStatusbarOverlay = function needsStatusbarOverlay() {
    if ((device.webView || (device.android && device.cordova)) && (win.innerWidth * win.innerHeight === win.screen.width * win.screen.height)) {
      if (device.iphoneX && (win.orientation === 90 || win.orientation === -90)) {
        return false;
      }
      return true;
    }
    return false;
  };
  device.statusbar = device.needsStatusbarOverlay();

  // Pixel Ratio
  device.pixelRatio = win.devicePixelRatio || 1;

  // Export object
  return device;
}());

export { Device as a };
