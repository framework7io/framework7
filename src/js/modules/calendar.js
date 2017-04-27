import Calendar from '../classes/calendar-class';

export default {
  name: 'calendar',
  class: {
    Calendar,
  },
  instance: {
    calendar(params) {
      return new Calendar(params);
    },
  },
};
