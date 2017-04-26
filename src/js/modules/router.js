import Router from '../classes/router';

export default {
  name: 'router',
  params: {
    routes: [],
    cache: true,
    cacheIgnore: [],
    cacheIgnoreGetParameters: false,
    cacheDuration: 1000 * 60 * 10, // Ten minutes
    preloadPreviousPage: true,
    uniqueHistory: false,
    uniqueHistoryIgnoreGetParameters: false,
    dynamicPageUrl: 'content-{{index}}',
    allowDuplicateUrls: false,
    router: true,
    routerRemoveTimeout: false,
    routerRemoveWithTimeout: false,
    // Push State
    pushState: false,
    pushStateRoot: undefined,
    pushStateNoAnimation: false,
    pushStateSeparator: '#!/',
    pushStateOnLoad: true,
    // Animate Pages
    animatePages: true,
  },
  class: {
    Router,
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

