import { document } from 'ssr-window';
import Device from '../../utils/device';

export default {
  name: 'device',
  proto: {
    device: Device,
  },
  static: {
    device: Device,
  },
  on: {
    init() {
      const classNames = [];
      const html = document.querySelector('html');
      const metaStatusbar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
      if (!html) return;
      if (Device.standalone && Device.ios && metaStatusbar && metaStatusbar.content === 'black-translucent') {
        classNames.push('device-full-viewport');
      }

      // Pixel Ratio
      classNames.push(`device-pixel-ratio-${Math.floor(Device.pixelRatio)}`);
      if (Device.pixelRatio >= 2) {
        classNames.push('device-retina');
      }
      // OS classes
      if (Device.os) {
        classNames.push(
          `device-${Device.os}`,
          `device-${Device.os}-${Device.osVersion.split('.')[0]}`,
          `device-${Device.os}-${Device.osVersion.replace(/\./g, '-')}`
        );
        if (Device.os === 'ios') {
          const major = parseInt(Device.osVersion.split('.')[0], 10);
          for (let i = major - 1; i >= 6; i -= 1) {
            classNames.push(`device-ios-gt-${i}`);
          }
          if (Device.iphoneX) {
            classNames.push('device-iphone-x');
          }
        }
      } else if (Device.desktop) {
        classNames.push('device-desktop');
        if (Device.macos) classNames.push('device-macos');
        else if (Device.windows) classNames.push('device-windows');
      }
      if (Device.cordova || Device.phonegap) {
        classNames.push('device-cordova');
      }

      // Add html classes
      classNames.forEach((className) => {
        html.classList.add(className);
      });
    },
  },
};
