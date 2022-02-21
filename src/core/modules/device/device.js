import { getDocument } from 'ssr-window';
import { getDevice } from '../../shared/get-device.js';

export default {
  name: 'device',
  static: {
    getDevice,
  },
  on: {
    init() {
      const document = getDocument();
      const device = getDevice();
      const classNames = [];
      const html = document.querySelector('html');
      const metaStatusbar = document.querySelector(
        'meta[name="apple-mobile-web-app-status-bar-style"]',
      );
      if (!html) return;
      if (
        device.standalone &&
        device.ios &&
        metaStatusbar &&
        metaStatusbar.content === 'black-translucent'
      ) {
        classNames.push('device-full-viewport');
      }

      // Pixel Ratio
      classNames.push(`device-pixel-ratio-${Math.floor(device.pixelRatio)}`);
      // OS classes
      if (device.os && !device.desktop) {
        classNames.push(`device-${device.os}`);
      } else if (device.desktop) {
        classNames.push('device-desktop');
        if (device.os) {
          classNames.push(`device-${device.os}`);
        }
      }
      if (device.cordova) {
        classNames.push('device-cordova');
      }
      if (device.capacitor) {
        classNames.push('device-capacitor');
      }

      // Add html classes
      classNames.forEach((className) => {
        html.classList.add(className);
      });
    },
  },
};
