import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class Picker extends Framework7Class {
  constructor(app, params = {}) {
    super(params);
    const picker = this;
    picker.params = Utils.extend({

    }, params);
    return picker;
  }
}

export default Picker;
