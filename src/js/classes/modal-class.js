import $ from 'dom7';
import Utils from '../utils/utils';
import Use from '../utils/use';
import Events from '../modules/events';

class Modal {
  constructor(app, el) {
    const modal = this;
    modal.params = Utils.extend({

    }, params);
    Utils.extend(modal, {

    });
    modal.$el = $(el);
    modal.el = el[0];
    return modal;
  }
  open(animated = true) {
    const modal = this;
    const $el = modal.$el;

    // Animated
    $el[animated ? 'removeClass' : 'addClass']('no-animation');

    // Type
    const isDialog = $el.hasClass('dialog');
    const isPopover = $el.hasClass('popover');
    const isPopup = $el.hasClass('popup');
    const isLoginScreen = $el.hasClass('login-screen');
    const isPickerModal = $el.hasClass('picker-modal');
    const isActions = $el.hasClass('actions-modal');

    // Modal Event Prefix
    let type = 'dialog';
    if (isPopover) type = 'popover';
    if (isPopup) type = 'popup';
    if (isLoginScreen) type = 'loginscreen';
    if (isPickerModal) type = 'picker';
    if (isActions) type = 'actions';

    if ($('.modal.modal-in:not(.modal-out)').length && app.params.modalStack && isDialog) {
      app.modalStack.push(() => {
        app.openModal($el);
      });
      return;
    }

    // do nothing if this modal already shown
    if ($el.data('f7-modal-shown') === true) {
      return;
    }
    $el.data('f7-modal-shown', true);

    // Move modal
    const modalParent = modal.parent();
    if (app.params.modalsMoveToRoot && !modalParent.is(app.root)) {
      app.root.append(modal);
      $el.once(`${type}:closed`, () => {
        modalParent.append(modal);
      });
    }

    modal.once(`${type}:close`, () => {
      $el.removeData('f7-modal-shown');
    });

    if (isDialog) {
      $el.show();
      $el.css({
        marginTop: `${-Math.round($el.outerHeight() / 2)}px`,
      });
    }

    let overlay;
    if (!isLoginScreen && !isPickerModal) {
      if ($('.modal-overlay').length === 0 && !isPopup) {
        app.root.append('<div class="modal-overlay"></div>');
      }
      if ($('.popup-overlay').length === 0 && isPopup) {
        app.root.append('<div class="popup-overlay"></div>');
      }
      overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
    }
    if (app.params.material && isPickerModal) {
      if ($el.hasClass('picker-calendar')) {
        if ($('.picker-modal-overlay').length === 0 && !isPopup) {
          app.root.append('<div class="picker-modal-overlay"></div>');
        }
        overlay = $('.picker-modal-overlay');
      }
    }
    if (overlay) {
      overlay[animated ? 'removeClass' : 'addClass']('not-animated');
    }

    // Make sure that styles are applied, trigger relayout;
    const clientLeft = modal[0].clientLeft;

    // Trugger open event
    $el.trigger(`open ${type}:open`);

    // Picker modal body class
    if (isPickerModal) {
      $('body').addClass('with-picker-modal');
    }

    // Init Pages and Navbars in modal
    if ($el.find(`.${app.params.viewClass}`).length > 0) {
      $el.find('.page').each(function () {
        app.initPageWithCallback(this);
      });
      $el.find('.navbar').each(function () {
        app.initNavbarWithCallback(this);
      });
    }

    // Classes for transition in
    if (!isLoginScreen && !isPickerModal) overlay.addClass('modal-overlay-visible');
    if (app.params.material && isPickerModal && overlay) overlay.addClass('modal-overlay-visible');

    if (animated) {
      $el.removeClass('modal-out').addClass('modal-in').transitionEnd((e) => {
        if (modal.hasClass('modal-out')) $el.trigger(`closed ${type}:closed`);
        else modal.trigger(`opened ${type}:opened`);
      });
    } else {
      $el.removeClass('modal-out').addClass('modal-in');
      $el.trigger(`opened ${type}:opened`);
    }
    return true;
  }
  close() {
    const overlay = this;
  }
}

Use(Modal).use(Events);

export default Modal;
