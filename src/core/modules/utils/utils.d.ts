import { Utils } from '../../shared/utils.js';
import Framework7, { Framework7Plugin } from '../../components/app/app-class.js';

export namespace Utils {
  interface AppMethods {
    /** Object with set of helper methods */
    utils: Utils;
  }
  interface AppParams {}
  interface AppEvents {}
}

declare const UtilsModule: Framework7Plugin;

export default UtilsModule;
