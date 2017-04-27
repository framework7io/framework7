import Picker from '../classes/picker-class';

export default {
  name: 'picker',
  static: {
    Picker,
  },
  instance: {
    picker(params) {
      return new Picker(this, params);
    },
  },
};
