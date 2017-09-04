import $ from 'dom7';
import Utils from '../../utils/utils';
import Modal from '../modal/modal-class';

class Toast extends Modal {
  constructor(app, params) {
    const extendedParams = Utils.extend({
      message: undefined,
      position: app.params.modals.toastPosition,
      closeButton: app.params.modals.toastCloseButton,
      closeButtonColor: app.params.modals.toastCloseButtonColor,
      closeButtonText: app.params.modals.toastCloseButtonText,
      closeTimeout: app.params.modals.toastCloseTimeout,
      cssClass: undefined,
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    super(app, extendedParams);

    const toast = this;

    toast.params = extendedParams;

    const { message, position, closeButton, closeButtonColor, closeButtonText, closeTimeout, cssClass } = toast.params;

    let $el;
    if (!toast.params.el) {
      // Find Element
      const toastHtml = `
        <div class="toast toast-${position} ${cssClass || ''}">
          <div class="toast-content">
            <div class="toast-message">${message}</div>
            ${closeButton ? `
            <a class="toast-button ${app.theme === 'md' ? 'button' : 'link'} ${closeButtonColor ? `color-${closeButtonColor}` : ''}">${closeButtonText}</a>
            `.trim() : ''}
          </div>
        </div>
      `.trim();

      $el = $(toastHtml);
    } else {
      $el = $(toast.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return toast.destroy();
    }

    Utils.extend(toast, {
      app,
      $el,
      el: $el[0],
      type: 'toast',
    });

    $el[0].f7Modal = toast;

    if (closeButton) {
      $el.find('.toast-button').on('click', () => {
        toast.emit({ events: 'closeButtonClick', data: [toast], parents: [] });
        toast.emit('toastCloseButtonClick', toast);
        toast.close();
      });

      toast.on('beforeDestroy', () => {
        $el.find('.toast-button').off('click');
      });
    }

    let timeoutId;
    toast.on('open', () => {
      const openedToast = app.toast.get('.toast.modal-in');
      if (openedToast && openedToast.el && openedToast.el !== toast.el) {
        openedToast.close();
      }
      if (closeTimeout) {
        timeoutId = Utils.nextTick(() => {
          toast.close();
        }, closeTimeout);
      }
    });
    toast.on('close', () => {
      window.clearTimeout(timeoutId);
    });

    return toast;
  }
}
export default Toast;
