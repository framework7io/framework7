import { Device } from '../../utils/device';
import Framework7 from '../../components/app/app-class';

namespace DeviceModule {

}

declare module '../../components/app/app-class' {
  interface Framework7Class {
    /** Object with properties about device */
    device: Device
  }
  interface Framework7Params {
  }
  interface Framework7AppEvents {
  }
}

export default DeviceModule;