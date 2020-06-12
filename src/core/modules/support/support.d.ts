import { Support } from '../../utils/support';
import Framework7, { Framework7Plugin } from '../../components/app/app-class';

export namespace Support {
  interface AppMethods {
    /** Object with properties about supported features */
    support: Support
  }
  interface AppParams {

  }
  interface AppEvents {

  }
}

declare const SupportModule: Framework7Plugin;

export default SupportModule;