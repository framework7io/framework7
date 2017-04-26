import View from '../classes/view';

export default {
  name: 'view',
  params: {
    viewClass: 'view',
    viewMainClass: 'view-main',
    viewsClass: 'views',
  },
  class: {
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

