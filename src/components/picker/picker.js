import Picker from './picker-class';

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
