import Framework7 from '../../components/app/app-class';

namespace ClicksModule {

}

declare module '../../components/app/app-class' {
  interface Framework7Class {

  }
  interface Framework7Params {
    /** Object with clicks-module related parameters */
    clicks: {
      /** CSS selector for links that should be treated as external and shouldn't be handled by Framework7. For example such '.external' value will match to links like <a href="somepage.html" class="external"> (with class "external") (default '.external') */
      externalLinks : string
    }
  }
  interface Framework7AppEvents {

  }
}

export default ClicksModule;