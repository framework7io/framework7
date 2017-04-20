function Device() {
  const html = document.querySelector('html');
  const ua = window.navigator.userAgent;

  const device = {
    ios: false,
    android: false,
    androidChrome: false,
    desktop: false,
    windows: false,
    iphone: false,
    ipod: false,
    ipad: false,
  };

  const windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/);
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);


  // Windows
  if (windows) {
    device.os = 'windows';
    device.osVersion = windows[2];
    device.windows = true;
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

  // Desktop
  device.desktop = !(device.os || device.android || device.webView);

  // Webview
  device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

  // Minimal UI
  if (device.os && device.os === 'ios') {
    const osVersionArr = device.osVersion.split('.');
    const metaViewport = document.querySelector('meta[name="viewport"]');
    device.minimalUi =
      !device.webView &&
      (ipod || iphone) &&
      (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
      metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
  }

  // Check for status bar and fullscreen app mode
  device.needsStatusBar = function needsStatusBar() {
    if (device.webView && (window.innerWidth * window.innerHeight === window.screen.width * window.screen.height)) {
      return true;
    }
    return false;
  };
  device.statusBar = device.needsStatusBar();

  // Classes
  const classNames = [];

  // Pixel Ratio
  device.pixelRatio = window.devicePixelRatio || 1;
  classNames.push(`device-pixel-ratio-${Math.floor(device.pixelRatio)}`);
  if (device.pixelRatio >= 2) {
    classNames.push('device-retina');
  }

  // OS classes
  if (device.os) {
    classNames.push(`device-${device.os}`, `device-${device.os}-${device.osVersion.split('.')[0]}`, `device-${device.os}-${device.osVersion.replace(/\./g, '-')}`);
    if (device.os === 'ios') {
      const major = parseInt(device.osVersion.split('.')[0], 10);
      for (let i = major - 1; i >= 6; i -= 1) {
        classNames.push(`device-ios-gt-${i}`);
      }
    }
  } else if (device.desktop) {
    classNames.push('device-desktop');
  }
  // Status bar classes
  if (device.statusBar) {
    classNames.push('with-statusbar-overlay');
  } else {
    html.classList.remove('with-statusbar-overlay');
  }

  // Add html classes
  classNames.forEach((className) => {
    html.classList.add(className);
  });

  // Export object
  return device;
}

export default {
  name: 'device',
  proto: {
    device: Device(),
  },
};
