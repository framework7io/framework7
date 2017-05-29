import $ from 'dom7';
import Utils from '../../utils/utils';
import Modal from '../modal/modal-class';

class Popup extends Modal {
  constructor(app, params) {
    const extendedParams = Utils.extend({
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    super(app, extendedParams);

    const popup = this;

    popup.params = extendedParams;

    // Find Element
    let $el;
    if (!popup.params.el) {
      $el = $(popup.params.html);
    } else {
      $el = $(popup.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return popup.destroy();
    }

    let $overlayEl = app.root.children('.popup-overlay');
    if ($overlayEl.length === 0) {
      $overlayEl = $('<div class="popup-overlay"></div>');
      app.root.append($overlayEl);
    }

    Utils.extend(popup, {
      app,
      $el,
      el: $el[0],
      $overlayEl,
      overlayEl: $overlayEl[0],
      type: 'popup',
    });

    $el[0].f7Modal = popup;

    return popup;
  }
}
export default Popup;
