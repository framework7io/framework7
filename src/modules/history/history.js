import History from '../../utils/history';

export default {
  name: 'history',
  on: {
    init() {
      History.init(this);
    },
  },
};
