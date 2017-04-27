import Picker from '../classes/picker-class';

export default {
  name: 'picker',
  class: {
    Picker,
  },
  instance: {
    picker(params) {
      return new Picker(params);
    },
  },
};
