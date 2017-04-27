import Utils from '../utils/utils';
import Use from '../utils/use';
import Events from '../modules/events';

class Picker {
  constructor(params = {}) {
    const picker = this;
    picker.params = Utils.extend({

    }, params);
    return picker;
  }
}

Use(Picker).use(Events);

export default Picker;
