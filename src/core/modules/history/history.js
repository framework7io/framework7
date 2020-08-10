import History from '../../shared/history';

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
