import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class Calendar extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);
    const calendar = this;
    calendar.params = Utils.extend({

    }, params);
    return calendar;
  }
}

export default Calendar;
