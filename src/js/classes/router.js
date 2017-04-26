import Use from '../utils/use';
import Events from '../modules/events';

class Router {
  constructor(app, view) {
    const router = this;

    router.useInstanceModules({
      events: {
        parents: [typeof view === 'undefined' ? app : view],
      },
    });

    router.navigate = function navigate(url) {

    };
    /*
    Router load, back params:
      reloadAll: Boolean,
      reloadCurrent: Boolean
      reloadPrevious: Boolean,
      component: Object,
      effect: String,
      animate: Boolean,
      content: String,
      template: String/Function,
      templateContext: Object,
      templateContextName: String,
      name: String, // page name
      pushState: Boolean,
      ignoreCache: Boolean,
      force: Boolean,
      element: HTMLElement,
      query: Object,
      url: String, //to load via Ajax

      url
      content
      component
      name
      element
      template
    */
    router.load = function load(params) {

    };
    router.back = function back(params) {

    };

    return router;
  }
}

// Use Events
Use(Router).use(Events);

export default Router;
