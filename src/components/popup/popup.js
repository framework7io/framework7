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
          const $popupEl = $(popupEl);
          let popup = $popupEl[0].f7Modal;
          if (!popup) popup = new Popup(app, { el: $popupEl });
          return popup.open(animate);
        },
        close(popupEl = '.popup.modal-in', animate) {
          const $popupEl = $(popupEl);
          if ($popupEl.length === 0) return undefined;
          let popup = $popupEl[0].f7Modal;
          if (!popup) popup = new Popup(app, { el: $popupEl });
          return popup.close(animate);
        },
        get(popupEl = '.popup.modal-in') {
          const $popupEl = $(popupEl);
          if ($popupEl.length === 0) return undefined;
          return $popupEl[0].f7Modal;
        },
      },
    });
  },
  clicks: {
    '.popup-open': function openPopup($clickedEl, data = {}) {
      const app = this;
      app.popup.open(data.popup, data.animate);
    },
    '.popup-close': function closePopup($clickedEl, data = {}) {
      const app = this;
      app.popup.close(data.popup, data.animate);
    },
    '.popup-backdrop': function closePopup() {
      const app = this;
      if (!app.params.modals.popupCloseByBackdropClick) return;
      app.popup.close();
    },
  },
};
