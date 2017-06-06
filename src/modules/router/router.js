import Router from './router-class';

export default {
  name: 'router',
  params: {
    router: {
      stackPages: false,
      xhrCache: true,
      xhrCacheIgnore: [],
      xhrCacheIgnoreGetParameters: false,
      xhrCacheDuration: 1000 * 60 * 10, // Ten minutes
      preloadPreviousPage: true,
      uniqueHistory: false,
      uniqueHistoryIgnoreGetParameters: false,
      allowDuplicateUrls: false,
      reloadPages: false,
      removeWithTimeout: false,
      // Swipe Back
      swipeBackPage: true,
      swipeBackPageAnimateShadow: true,
      swipeBackPageAnimateOpacity: true,
      swipeBackPageActiveArea: 30,
      swipeBackPageThreshold: 0,
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
      iosSeparateDynamicNavbar: true,
      // Animate iOS Navbar Back Icon
      iosAnimateNavbarBackIcon: true,
      // MD Theme delay
      materialPageLoadDelay: 0,
    },
  },
  static: {
    Router,
  },
  instance: {
    cache: {
      xhr: [],
      templates: [],
      components: [],
    },
  },
  create(params) {
    const instance = this;
    const { app, view } = params;
    if (view) {
      // View Router
      instance.router = new Router(app, view);
    } else {
      // App Router
      instance.router = new Router(app);
    }
  },
};

