import Popup from './popup-class.js';
import ModalMethods from '../../shared/modal-methods.js';

export default {
  name: 'popup',
  params: {
    popup: {
      backdrop: true,
      backdropEl: undefined,
      backdropUnique: false,
      closeByBackdropClick: true,
      closeOnEscape: false,
      swipeToClose: false,
      swipeHandler: null,
      push: false,
      containerEl: null,
    },
  },
  static: {
    Popup,
  },
  create() {
    const app = this;
    app.popup = ModalMethods({
      app,
      constructor: Popup,
      defaultSelector: '.popup.modal-in',
      parentSelector: '.popup',
    });
  },
  clicks: {
    '.popup-open': function openPopup($clickedEl, data = {}) {
      const app = this;
      app.popup.open(data.popup, data.animate, $clickedEl);
    },
    '.popup-close': function closePopup($clickedEl, data = {}) {
      const app = this;
      app.popup.close(data.popup, data.animate, $clickedEl);
    },
  },
};
