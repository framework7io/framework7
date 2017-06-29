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

