import View from './view-class';

export default {
  name: 'view',
  params: {
    view: {
      viewClass: 'view',
      viewMainClass: 'view-main',
      viewsClass: 'views',
    },
  },
  static: {
    View,
  },
  instance: {
    views: [],
    addView(el, params) {
      const app = this;
      return new View(app, el, params);
    },
  },
};

