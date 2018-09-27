import Popup from './popup-class';
import ModalMethods from '../../utils/modal-methods';

export default {
  name: 'popup',
  params: {
    popup: {
      backdrop: true,
      closeByBackdropClick: true,
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
  },
};
