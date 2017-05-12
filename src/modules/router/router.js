import Router from './router-class';

export default {
  name: 'router',
  params: {
    router: {
      dynamicNavbar: false,
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
      // MD Theme delay
      materialPageLoadDelay: 0,
      // Push State
      pushState: false,
      pushStateRoot: undefined,
      pushStateNoAnimation: false,
      pushStateSeparator: '#!',
      pushStateOnLoad: true,
      // Animate Pages
      animatePages: true,
      // Animate Nav Back Icon
      animateNavbarBackIcon: true,
    },
  },
  static: {
    Router,
  },
  instance: {
    xhrCache: [],
  },
  create(params) {
    const instance = this;
    if (params.app) {
      // View Router
      instance.router = new Router(params.app, instance);
    } else {
      // App Router
      instance.router = new Router(instance);
    }
  },
};

