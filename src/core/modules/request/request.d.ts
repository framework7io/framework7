import { Request } from '../../shared/request.js';
import Framework7, { Framework7Plugin } from '../../components/app/app-class.js';

export namespace Request {
  interface AppMethods {
    /** Object with properties about supported features */
    request: Request;
  }
  interface AppParams {}
  interface AppEvents {}
}

declare const RequestModule: Framework7Plugin;

export default RequestModule;
