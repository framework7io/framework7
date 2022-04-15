import $ from '../../shared/dom7.js';
import { extend } from '../../shared/utils.js';
import Router from '../../modules/router/router.js';
import Framework7Class from '../../shared/class.js';
import resizableView from './resizable-view.js';

class View extends Framework7Class {
  constructor(app, el, viewParams = {}) {
    super(viewParams, [app]);

    const view = this;

    const ssr = view.params.routerId;

    const defaults = {
      routes: [],
      routesAdd: [],
    };

    if (!ssr) {
      const $el = $(el);
      if (!$el.length) {
        let message = "Framework7: can't create a View instance because ";
        message +=
          typeof el === 'string'
            ? `the selector "${el}" didn't match any element`
            : 'el must be an HTMLElement or Dom7 object';

        throw new Error(message);
      }
    }

    // Default View params
    view.params = extend({ el }, defaults, app.params.view, viewParams);

    // Routes
    if (view.params.routes.length > 0) {
      view.routes = view.params.routes;
    } else {
      view.routes = [].concat(app.routes, view.params.routesAdd);
    }

    // View Props
    extend(false, view, {
      app,
      name: view.params.name,
      main: view.params.main,
      history: [],
      scrollHistory: {},
    });

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

    if (!view.params.init) {
      return view;
    }
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

    view.$el.trigger('view:beforedestroy');
    view.emit('local::beforeDestroy viewBeforeDestroy', view);

    app.off('resize', view.checkMasterDetailBreakpoint);

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

  checkMasterDetailBreakpoint(force) {
    const view = this;
    const app = view.app;
    const wasMasterDetail = view.$el.hasClass('view-master-detail');
    const isMasterDetail =
      app.width >= view.params.masterDetailBreakpoint && view.$el.children('.page-master').length;
    if ((typeof force === 'undefined' && isMasterDetail) || force === true) {
      view.$el.addClass('view-master-detail');
      if (!wasMasterDetail) {
        view.emit('local::masterDetailBreakpoint viewMasterDetailBreakpoint', view);
        view.$el.trigger('view:masterDetailBreakpoint');
      }
    } else {
      view.$el.removeClass('view-master-detail');
      if (wasMasterDetail) {
        view.emit('local::masterDetailBreakpoint viewMasterDetailBreakpoint', view);
        view.$el.trigger('view:masterDetailBreakpoint');
      }
    }
  }

  initMasterDetail() {
    const view = this;
    const app = view.app;
    view.checkMasterDetailBreakpoint = view.checkMasterDetailBreakpoint.bind(view);
    view.checkMasterDetailBreakpoint();
    if (view.params.masterDetailResizable) {
      resizableView(view);
    }
    app.on('resize', view.checkMasterDetailBreakpoint);
  }

  mount(viewEl) {
    const view = this;
    const app = view.app;
    const el = view.params.el || viewEl;
    const $el = $(el);

    // Selector
    let selector;
    if (typeof el === 'string') selector = el;
    else {
      // Supposed to be HTMLElement or Dom7
      selector =
        ($el.attr('id') ? `#${$el.attr('id')}` : '') +
        ($el.attr('class')
          ? `.${$el.attr('class').replace(/ /g, '.').replace('.active', '')}`
          : '');
    }

    // DynamicNavbar
    let $navbarsEl;
    if (app.theme === 'ios' && view.params.iosDynamicNavbar) {
      $navbarsEl = $el.children('.navbars').eq(0);
      if ($navbarsEl.length === 0) {
        $navbarsEl = $('<div class="navbars"></div>');
      }
    }

    extend(view, {
      $el,
      el: $el[0],
      main: view.main || $el.hasClass('view-main'),
      $navbarsEl,
      navbarsEl: $navbarsEl ? $navbarsEl[0] : undefined,
      selector,
    });

    if (view.main) {
      app.views.main = view;
    }

    // Save in DOM
    if ($el && $el[0]) {
      $el[0].f7View = view;
    }

    view.emit('local::mount viewMount', view);
  }

  init(viewEl) {
    const view = this;
    view.mount(viewEl);
    if (view.params.router) {
      if (view.params.masterDetailBreakpoint > 0) {
        view.initMasterDetail();
      }
      if (
        view.params.initRouterOnTabShow &&
        view.$el.hasClass('tab') &&
        !view.$el.hasClass('tab-active')
      ) {
        view.$el.once('tab:show', () => {
          view.router.init();
        });
      } else {
        view.router.init();
      }

      view.$el.trigger('view:init');
      view.emit('local::init viewInit', view);
    }
  }
}

// Use Router
View.use(Router);

export default View;
