import View from './view-class';

export default {
  name: 'view',
  params: {
    view: {},
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

