import { UtilsObject } from '../../utils/utils';
import Framework7, { Framework7Plugin } from '../../components/app/app-class';

export namespace Utils {
  interface AppMethods {
    /** Object with set of helper methods */
    utils: UtilsObject;
  }
  interface AppParams {}
  interface AppEvents {}
}

declare const UtilsModule: Framework7Plugin;

export default UtilsModule;
