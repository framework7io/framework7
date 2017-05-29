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
  clicks: {
    '.popup-open': function openPopup($clickedEl, data = {}) {
      const app = this;
      app.popup.open(data.popup, data.animate);
    },
    '.popup-close, .popup-overlay': function closePopup($clickedEl, data = {}) {
      const app = this;
      app.popup.close(data.popup, data.animate);
    },
  },
};
