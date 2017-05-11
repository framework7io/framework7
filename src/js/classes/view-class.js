import $ from 'dom7';
import Use from '../utils/use';
import Events from '../modules/events';
import Router from '../modules/router';
import Utils from '../utils/utils';

class View {
  constructor(appInstance, el, viewParams = {}) {
    const app = appInstance;
    const $el = $(el);
    let view = this;

    const defaults = {
      name: undefined,
      main: false,
      routes: [],
      linksView: undefined,
    };

    // Default View params
    view.params = Utils.extend(defaults, app.params.view, viewParams);

    // Router Params
    view.params.router = Utils.extend({}, app.params.router, view.params.router);
    view.params.routes = [].concat(app.params.routes, view.params.routes);

    // Selector
    let selector;
    if (typeof el === 'string') selector = el;
    else {
      // Supposed to be HTMLElement or Dom7
      selector = ($el.attr('id') ? `#${$el.attr('id')}` : '') + ($el.attr('class') ? `.${$el.attr('class').replace(/ /g, '.').replace('.active', '')}` : '');
    }

    // View Props
    Utils.extend(view, {
      app,
      $el,
      el: $el[0],
      name: view.params.name,
      main: view.params.main || $el.hasClass(app.params.viewMainClass),
      $pagesEl: $el.find('.pages'),
      pagesEl: $el.find('.pages')[0],
      selector,
      history: [],
      cache: {
        content: {},
        context: {},
        pages: {},
      },
    });

    $el[0].f7View = view;

    // Install Modules
    view.useInstanceModules({
      events: {
        parents: [app],
      },
      router: {
        app,
      },
    });

    // Add to app
    app.views.push(view);
    if (view.main) {
      app.mainView = view;
      app.views.main = view;
    } else if (view.name) {
      app[`${view.name}View`] = view;
      app.views[view.name] = view;
    }

    // Destroy
    view.destroy = function destroy() {
      if (view.main) {
        app.mainView = null;
        delete app.mainView;
        app.views.main = null;
        delete app.views.main;
      } else if (view.name) {
        app[`${view.name}View`] = null;
        delete app[`${view.name}View`];
        app.views[view.name] = null;
        delete app.views[view.name];
      }
      $el.removeAttr('data-page');
      $el[0].f7View = null;
      delete $el[0].f7View;

      app.views.splice(app.views.indexOf(view), 1);

      // Delete props & methods
      Object.keys(view).forEach((viewProp) => {
        view[viewProp] = null;
        delete view[viewProp];
      });
      view = null;
    };

    // Init View
    if (app.initialized) {
      view.init();
    } else {
      app.on('init', view.init);
    }

    return view;
  }
  init() {
    const view = this;
    view.router.init();
  }
}

// Use Events and Router
Use(View).use(Events).use(Router);


export default View;
