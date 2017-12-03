import $ from 'dom7';
import Utils from '../../utils/utils';
import Modal from '../modal/modal-class';

class Toast extends Modal {
  constructor(app, params) {
    const extendedParams = Utils.extend({
      on: {},
    }, app.params.toast, params);

    // Extends with open/close Modal methods;
    super(app, extendedParams);

    const toast = this;

    toast.app = app;

    toast.params = extendedParams;

    const { closeButton, closeTimeout } = toast.params;

    let $el;
    if (!toast.params.el) {
      // Find Element
      const toastHtml = toast.render();

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
      $el,
      el: $el[0],
      type: 'toast',
    });

    $el[0].f7Modal = toast;

    if (closeButton) {
      $el.find('.toast-button').on('click', () => {
        toast.emit('local::closeButtonClick toastCloseButtonClick', toast);
        toast.close();
      });

      toast.on('beforeDestroy', () => {
        $el.find('.toast-button').off('click');
      });
    }

    let timeoutId;
    toast.on('open', () => {
      $('.toast.modal-in').each((index, openedEl) => {
        const toastInstance = app.toast.get(openedEl);
        if (openedEl !== toast.el && toastInstance) {
          toastInstance.close();
        }
      });
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
  render() {
    const toast = this;
    const app = toast.app;
    if (toast.params.render) return toast.params.render.call(toast, toast);
    const { position, cssClass, icon, text, closeButton, closeButtonColor, closeButtonText } = toast.params;
    return `
      <div class="toast toast-${position} ${cssClass || ''} ${icon ? 'toast-with-icon' : ''}">
        <div class="toast-content">
          ${icon ? `<div class="toast-icon">${icon}</div>` : ''}
          <div class="toast-text">${text}</div>
          ${closeButton && !icon ? `
          <a class="toast-button ${app.theme === 'md' ? 'button' : 'link'} ${closeButtonColor ? `color-${closeButtonColor}` : ''}">${closeButtonText}</a>
          `.trim() : ''}
        </div>
      </div>
    `.trim();
  }
}
export default Toast;
