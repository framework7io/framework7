import $ from 'dom7';
import Utils from '../../utils/utils';
import Use from '../../utils/use';
import Events from '../../modules/events/events';
import Router from '../../modules/router/router';


class View {
  constructor(appInstance, el, viewParams = {}) {
    const app = appInstance;
    const $el = $(el);
    const view = this;

    const defaults = {
      name: undefined,
      main: false,
      routes: [],
      routesAdd: [],
      linksView: undefined,
    };

    // Default View params
    view.params = Utils.extend(defaults, app.params.view, viewParams);

    // Router Params
    view.params.router = Utils.extend({}, app.params.router, view.params.router);

    // Routes
    if (view.params.routes.length > 0) {
      view.routes = view.params.routes;
    } else {
      view.routes = [].concat(app.routes, view.params.routesAdd);
    }

    // Selector
    let selector;
    if (typeof el === 'string') selector = el;
    else {
      // Supposed to be HTMLElement or Dom7
      selector = ($el.attr('id') ? `#${$el.attr('id')}` : '') + ($el.attr('class') ? `.${$el.attr('class').replace(/ /g, '.').replace('.active', '')}` : '');
    }

    // DynamicNavbar
    let $navbarEl;
    if (app.theme === 'ios' && view.params.router.iosDynamicNavbar) {
      $navbarEl = $el.children('.navbar').eq(0);
      if ($navbarEl.length === 0) {
        $navbarEl = $('<div class="navbar"></div>');
        $el.prepend($navbarEl);
      }
    }

    // View Props
    Utils.extend(view, {
      app,
      $el,
      el: $el[0],
      name: view.params.name,
      main: view.params.main || $el.hasClass(app.params.view.viewMainClass),
      $navbarEl,
      navbarEl: $navbarEl ? $navbarEl[0] : undefined,
      selector,
      history: [],
    });

    $el[0].f7View = view;

    // Install Modules
    view.useInstanceModules({
      events: {
        parents: [app],
      },
      router: {
        app,
        view,
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

    view.index = app.views.indexOf(view);

    // Init View
    if (app.initialized) {
      view.init();
    } else {
      app.on('init', view.init);
    }

    return view;
  }
  destroy() {
    let view = this;
    const app = view.app;
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
    view.$el.removeAttr('data-page');
    view.$el[0].f7View = null;
    delete view.$el[0].f7View;

    app.views.splice(app.views.indexOf(view), 1);

    // Destroy Router
    view.router.destroy();

    view.emit('viewDestroy view:destroy', view);

    // Delete props & methods
    Object.keys(view).forEach((viewProp) => {
      view[viewProp] = null;
      delete view[viewProp];
    });

    view = null;
  }
  init() {
    const view = this;
    view.router.init();
  }
}

// Use Events and Router
Use(View).use(Events).use(Router);


export default View;
