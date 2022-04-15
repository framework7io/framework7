import { extend } from '../../shared/utils.js';
import Toast from './toast-class.js';
import ModalMethods from '../../shared/modal-methods.js';

export default {
  name: 'toast',
  static: {
    Toast,
  },
  create() {
    const app = this;
    app.toast = extend(
      {},
      ModalMethods({
        app,
        constructor: Toast,
        defaultSelector: '.toast.modal-in',
      }),
      {
        // Shortcuts
        show(params) {
          extend(params, {
            destroyOnClose: true,
          });
          return new Toast(app, params).open();
        },
      },
    );
  },
  params: {
    toast: {
      icon: null,
      text: null,
      position: 'bottom',
      horizontalPosition: 'left',
      closeButton: false,
      closeButtonColor: null,
      closeButtonText: 'Ok',
      closeTimeout: null,
      cssClass: null,
      render: null,
      containerEl: null,
    },
  },
};
