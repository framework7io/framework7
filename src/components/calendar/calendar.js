import Calendar from './calendar-class';

export default {
  name: 'calendar',
  static: {
    Calendar,
  },
  instance: {
    calendar(params) {
      return new Calendar(this, params);
    },
  },
};
