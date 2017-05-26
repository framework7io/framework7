import $ from 'dom7';
import Utils from '../../utils/utils';
import Popup from './popup-class';

export default {
  name: 'popup',
  create() {
    const app = this;
    Utils.extend(app, {
      popup: {
        create(params) {
          return new Popup(app, params);
        },
        open(dialogEl, animate) {
          return new Popup(app, {
            el: $(dialogEl),
          }).open(animate);
        },
        close(dialogEl = '.dialog.modal-in', animate) {
          return new Popup(app, {
            el: $(dialogEl),
          }).close(animate);
        },
      },
    });
  },
};
