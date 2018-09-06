import Framework7 from '../../components/app/app-class';

namespace ClicksModule {
  interface AppMethods {

  }
  interface AppParams {
    /** Object with clicks-module related parameters */
    clicks: {
      /** CSS selector for links that should be treated as external and shouldn't be handled by Framework7. For example such '.external' value will match to links like <a href="somepage.html" class="external"> (with class "external") (default '.external') */
      externalLinks : string
    }
  }
  interface AppEvents {

  }
}

export default ClicksModule;