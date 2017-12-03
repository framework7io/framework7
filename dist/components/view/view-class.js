import $ from 'dom7';
import Utils from '../../utils/utils';
import Router from '../../modules/router/router';
import Framework7Class from '../../utils/class';

class View extends Framework7Class {
  constructor(appInstance, el, viewParams = {}) {
    super(viewParams, [appInstance]);

    const app = appInstance;
    const $el = $(el);
    const view = this;

    const defaults = {
      routes: [],
      routesAdd: [],
    };

    // Default View params
    view.params = Utils.extend(defaults, app.params.view, viewParams);

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
    if (app.theme === 'ios' && view.params.iosDynamicNavbar && view.params.iosSeparateDynamicNavbar) {
      $navbarEl = $el.children('.navbar').eq(0);
      if ($navbarEl.length === 0) {
        $navbarEl = $('<div class="navbar"></div>');
      }
    }

    // View Props
    Utils.extend(false, view, {
      app,
      $el,
      el: $el[0],
      name: view.params.name,
      main: view.params.main || $el.hasClass('view-main'),
      $navbarEl,
      navbarEl: $navbarEl ? $navbarEl[0] : undefined,
      selector,
      history: [],
      scrollHistory: {},
    });

    // Save in DOM
    $el[0].f7View = view;

    // Install Modules
    view.useModules();

    // Add to app
    app.views.push(view);
    if (view.main) {
      app.views.main = view;
    }
    if (view.name) {
      app.views[view.name] = view;
    }

    // Index
    view.index = app.views.indexOf(view);

    // View ID
    let viewId;
    if (view.name) {
      viewId = `view_${view.name}`;
    } else if (view.main) {
      viewId = 'view_main';
    } else {
      viewId = `view_${view.index}`;
    }
    view.id = viewId;

    // Init View
    if (app.initialized) {
      view.init();
    } else {
      app.on('init', () => {
        view.init();
      });
    }

    return view;
  }
  destroy() {
    let view = this;
    const app = view.app;

    view.$el.trigger('view:beforedestroy', view);
    view.emit('local::beforeDestroy viewBeforeDestroy', view);

    if (view.main) {
      app.views.main = null;
      delete app.views.main;
    } else if (view.name) {
      app.views[view.name] = null;
      delete app.views[view.name];
    }
    view.$el[0].f7View = null;
    delete view.$el[0].f7View;

    app.views.splice(app.views.indexOf(view), 1);

    // Destroy Router
    if (view.params.router && view.router) {
      view.router.destroy();
    }

    view.emit('local::destroy viewDestroy', view);

    // Delete props & methods
    Object.keys(view).forEach((viewProp) => {
      view[viewProp] = null;
      delete view[viewProp];
    });

    view = null;
  }
  init() {
    const view = this;
    if (view.params.router) {
      view.router.init();
    }
  }
}

// Use Router
View.use(Router);


export default View;
