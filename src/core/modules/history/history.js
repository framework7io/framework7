import History from '../../shared/history.js';

export default {
  name: 'history',
  static: {
    history: History,
  },
  on: {
    init() {
      History.init(this);
    },
  },
};
