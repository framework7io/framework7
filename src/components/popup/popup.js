import $ from 'dom7';
import Utils from '../../utils/utils';
import Popup from './popup-class';

export default {
  name: 'popup',
  static: {
    Popup,
  },
  create() {
    const app = this;
    Utils.extend(app, {
      popup: {
        create(params) {
          return new Popup(app, params);
        },
        open(popupEl, animate) {
          return new Popup(app, {
            el: $(popupEl),
          }).open(animate);
        },
        close(popupEl = '.popup.modal-in', animate) {
          return new Popup(app, {
            el: $(popupEl),
          }).close(animate);
        },
      },
    });
  },
};
