import Support from '../../utils/support';
import Framework7 from '../../components/app/app-class';

namespace SupportModule {

}

declare module '../../components/app/app-class' {
  interface Framework7Class {
    /** Object with properties about supported features */
    support: Support
  }
  interface Framework7Params {
  }
  interface Framework7AppEvents {
  }
}

export default SupportModule;