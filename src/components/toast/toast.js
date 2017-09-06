import $ from 'dom7';
import Utils from '../../utils/utils';
import Toast from './toast-class';

export default {
  name: 'toast',
  static: {
    Toast,
  },
  create() {
    const app = this;
    Utils.extend(app, {
      toast: {
        create(params) {
          return new Toast(app, params);
        },
        open(toastEl, animate) {
          const $toastEl = $(toastEl);
          let toast = $toastEl[0].f7Modal;
          if (!toast) toast = new Toast(app, { el: $toastEl });
          return toast.open(animate);
        },
        close(toastEl = '.toast.modal-in', animate) {
          const $toastEl = $(toastEl);
          if ($toastEl.length === 0) return undefined;
          let toast = $toastEl[0].f7Modal;
          if (!toast) toast = new Toast(app, { el: $toastEl });
          return toast.close(animate);
        },
        get(toastEl = '.toast.modal-in') {
          if ((toastEl instanceof Toast)) return toastEl;
          const $toastEl = $(toastEl);
          if ($toastEl.length === 0) return undefined;
          return $toastEl[0].f7Modal;
        },
        destroy(toastEl) {
          const toast = app.toast.get(toastEl);
          if (toast && toast.destroy) return toast.destroy();
          return undefined;
        },
      },
    });
  },
};
