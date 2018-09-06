import { Utils } from '../../utils/utils';
import Framework7 from '../../components/app/app-class';

namespace UtilsModule {

}

declare module '../../components/app/app-class' {
  interface Framework7Class {
    /** Object with set of helper methods */
    utils: Utils
  }
  interface Framework7Params {
  }
  interface Framework7AppEvents {
  }
}

export default UtilsModule;