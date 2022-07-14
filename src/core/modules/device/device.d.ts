import { Device } from '../../shared/get-device.js';
import Framework7, { Framework7Plugin } from '../../components/app/app-class.js';

export namespace Device {
  interface AppMethods {
    /** Object with properties about device */
    device: Device;
  }
  interface AppParams {}
  interface AppEvents {}
}
declare const DeviceModule: Framework7Plugin;

export default DeviceModule;
