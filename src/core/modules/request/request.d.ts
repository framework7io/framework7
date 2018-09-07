import { Request } from '../../utils/request';
import Framework7, { Framework7Plugin } from '../../components/app/app-class';

export namespace Request {
  interface AppMethods {
    /** Object with properties about supported features */
    request: Request
  }
  interface AppParams {

  }
  interface AppEvents {

  }
}

declare const RequestModule: Framework7Plugin;

export default RequestModule;