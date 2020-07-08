import { extend } from '../../utils/utils';
import Toast from './toast-class';
import ModalMethods from '../../utils/modal-methods';

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
    },
  },
};
