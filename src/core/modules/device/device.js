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
      // OS classes
      if (Device.os && !Device.desktop) {
        classNames.push(
          `device-${Device.os}`,
        );
      } else if (Device.desktop) {
        classNames.push('device-desktop');
        if (Device.os) {
          classNames.push(`device-${Device.os}`);
        }
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
