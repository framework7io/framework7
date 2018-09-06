import { Request } from '../../utils/request';
import Framework7 from '../../components/app/app-class';

namespace RequestModule {

}

declare module '../../components/app/app-class' {
  interface Framework7Class {
    /** Request library to work with XHR requests */
    request: Request
  }
  interface Framework7Params {
  }
  interface Framework7AppEvents {
  }
}

export default RequestModule;