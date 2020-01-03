import $ from 'dom7';
import Utils from '../../utils/utils';
import View from './view-class';

function getCurrentView(app) {
  const $popoverView = $('.popover.modal-in .view');
  const $popupView = $('.popup.modal-in .view');
  const $panelView = $('.panel.panel-in .view');
  let $viewsEl = $('.views');
  if ($viewsEl.length === 0) $viewsEl = app.root;
  // Find active view as tab
  let $viewEl = $viewsEl.children('.view');
  // Propably in tabs or split view
  if ($viewEl.length > 1) {
    if ($viewEl.hasClass('tab')) {
      // Tabs
      $viewEl = $viewsEl.children('.view.tab-active');
    } else {
      // Split View, leave appView intact
    }
  }
  if ($popoverView.length > 0 && $popoverView[0].f7View) return $popoverView[0].f7View;
  if ($popupView.length > 0 && $popupView[0].f7View) return $popupView[0].f7View;
  if ($panelView.length > 0 && $panelView[0].f7View) return $panelView[0].f7View;
  if ($viewEl.length > 0) {
    if ($viewEl.length === 1 && $viewEl[0].f7View) return $viewEl[0].f7View;
    if ($viewEl.length > 1) {
      return app.views.main;
    }
  }
  return undefined;
}

export default {
  name: 'view',
  params: {
    view: {
      name: undefined,
      main: false,
      router: true,
      linksView: null,
      stackPages: false,
      xhrCache: true,
      xhrCacheIgnore: [],
      xhrCacheIgnoreGetParameters: false,
      xhrCacheDuration: 1000 * 60 * 10, // Ten minutes
      componentCache: true,
      preloadPreviousPage: true,
      allowDuplicateUrls: false,
      reloadPages: false,
      reloadDetail: false,
      masterDetailBreakpoint: 0,
      removeElements: true,
      removeElementsWithTimeout: false,
      removeElementsTimeout: 0,
      restoreScrollTopOnBack: true,
      unloadTabContent: true,
      passRouteQueryToRequest: true,
      passRouteParamsToRequest: false,
      loadInitialPage: true,
      // Swipe Back
      iosSwipeBack: true,
      iosSwipeBackAnimateShadow: true,
      iosSwipeBackAnimateOpacity: true,
      iosSwipeBackActiveArea: 30,
      iosSwipeBackThreshold: 0,
      mdSwipeBack: false,
      mdSwipeBackAnimateShadow: true,
      mdSwipeBackAnimateOpacity: false,
      mdSwipeBackActiveArea: 30,
      mdSwipeBackThreshold: 0,
      auroraSwipeBack: false,
      auroraSwipeBackAnimateShadow: false,
      auroraSwipeBackAnimateOpacity: true,
      auroraSwipeBackActiveArea: 30,
      auroraSwipeBackThreshold: 0,
      // Push State
      pushState: false,
      pushStateRoot: undefined,
      pushStateAnimate: true,
      pushStateAnimateOnLoad: false,
      pushStateSeparator: '#!',
      pushStateOnLoad: true,
      // Animate Pages
      animate: true,
      // iOS Dynamic Navbar
      iosDynamicNavbar: true,
      // Animate iOS Navbar Back Icon
      iosAnimateNavbarBackIcon: true,
      // Delays
      iosPageLoadDelay: 0,
      mdPageLoadDelay: 0,
      auroraPageLoadDelay: 0,
      // Routes hooks
      routesBeforeEnter: null,
      routesBeforeLeave: null,
    },
  },
  static: {
    View,
  },
  create() {
    const app = this;
    Utils.extend(app, {
      views: Utils.extend([], {
        create(el, params) {
          return new View(app, el, params);
        },
        get(viewEl) {
          const $viewEl = $(viewEl);
          if ($viewEl.length && $viewEl[0].f7View) return $viewEl[0].f7View;
          return undefined;
        },
      }),
    });
    Object.defineProperty(app.views, 'current', {
      enumerable: true,
      configurable: true,
      get() {
        return getCurrentView(app);
      },
    });
    // Alias
    app.view = app.views;
  },
  on: {
    init() {
      const app = this;
      $('.view-init').each((index, viewEl) => {
        if (viewEl.f7View) return;
        const viewParams = $(viewEl).dataset();
        app.views.create(viewEl, viewParams);
      });
    },
    modalOpen(modal) {
      const app = this;
      modal.$el.find('.view-init').each((index, viewEl) => {
        if (viewEl.f7View) return;
        const viewParams = $(viewEl).dataset();
        app.views.create(viewEl, viewParams);
      });
    },
    modalBeforeDestroy(modal) {
      if (!modal || !modal.$el) return;
      modal.$el.find('.view-init').each((index, viewEl) => {
        const view = viewEl.f7View;
        if (!view) return;
        view.destroy();
      });
    },
  },
  vnode: {
    'view-init': {
      insert(vnode) {
        const app = this;
        const viewEl = vnode.elm;
        if (viewEl.f7View) return;
        const viewParams = $(viewEl).dataset();
        app.views.create(viewEl, viewParams);
      },
      destroy(vnode) {
        const viewEl = vnode.elm;
        const view = viewEl.f7View;
        if (!view) return;
        view.destroy();
      },
    },
  },
};
