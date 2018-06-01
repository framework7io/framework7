import $ from 'dom7';
import Utils from '../../utils/utils';
import Modal from '../modal/modal-class';

class CustomModal extends Modal {
  constructor(app, params) {
    const extendedParams = Utils.extend({
      backdrop: true,
      closeByBackdropClick: true,
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    super(app, extendedParams);

    const customModal = this;

    customModal.params = extendedParams;

    // Find Element
    let $el;
    if (!customModal.params.el) {
      $el = $(customModal.params.content);
    } else {
      $el = $(customModal.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return customModal.destroy();
    }
    let $backdropEl;
    if (customModal.params.backdrop) {
      $backdropEl = app.root.children('.custom-modal-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = $('<div class="custom-modal-backdrop"></div>');
        app.root.append($backdropEl);
      }
    }

    function handleClick(e) {
      if (!customModal || customModal.destroyed) return;
      if ($backdropEl && e.target === $backdropEl[0]) {
        customModal.close();
      }
    }

    customModal.on('customModalOpened', () => {
      if (customModal.params.closeByBackdropClick && customModal.params.backdrop) {
        app.on('click', handleClick);
      }
    });
    customModal.on('customModalClose', () => {
      if (customModal.params.closeByBackdropClick && customModal.params.backdrop) {
        app.off('click', handleClick);
      }
    });

    Utils.extend(customModal, {
      app,
      $el,
      el: $el[0],
      $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'customModal',
    });

    $el[0].f7Modal = customModal;

    return customModal;
  }
}
export default CustomModal;
