import Utils from '../../utils/utils';
import Toast from './toast-class';
import ModalMethods from '../../utils/modal-methods';

export default {
  name: 'toast',
  static: {
    Toast,
  },
  create() {
    const app = this;
    app.toast = Utils.extend({},
      ModalMethods({
        app,
        constructor: Toast,
        defaultSelector: '.toast.modal-in',
      })
    );
  },
};
