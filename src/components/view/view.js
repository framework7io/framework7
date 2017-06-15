import Utils from '../../utils/utils';
import View from './view-class';

export default {
  name: 'view',
  params: {
    view: {},
  },
  static: {
    View,
  },
  create() {
    const app = this;
    const views = Utils.extend([], {
      add(el, params) {
        return new View(app, el, params);
      },
      current() {

      },
    });
    Utils.extend(app, { views });
  },
};

