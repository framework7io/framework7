import { Device } from '../../utils/device';
import Framework7, { Framework7Plugin } from '../../components/app/app-class';

export namespace Device {
  interface AppMethods {
    /** Object with properties about device */
    device: Device
  }
  interface AppParams {

  }
  interface AppEvents {

  }
}
declare const DeviceModule: Framework7Plugin;

export default DeviceModule;