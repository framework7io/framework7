import Router from './router-class';

export default {
  name: 'router',
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
  create() {
    const instance = this;
    if (instance.app) {
      // View Router
      instance.router = new Router(instance.app, instance);
    } else {
      // App Router
      instance.router = new Router(instance);
    }
  },
};

