import $ from 'dom7';
import Utils from '../../utils/utils';
import Use from '../../utils/use';
import Events from '../../modules/events/events';

class Modal {
  constructor(app) {
    const modal = this;
    modal.useInstanceModules({
      events: {
        parents: [app],
      },
    });
    return this;
  }
  open(animate = true) {
    const modal = this;
    const app = modal.app;
    const html = modal.html;
    const $overlayEl = modal.$overlayEl;
    const type = modal.type;
    let $el = modal.$el;

    if (!$el && html) {
      $el = $(html);
      app.root.append($el);
    }

    const $modalParentEl = $el.parent();
    if (app.params.modals.moveToRoot && !$modalParentEl.is(app.root)) {
      app.root.append($el);
      modal.once(`${type}:closed`, () => {
        $modalParentEl.append(modal);
      });
    }

    if (type === 'dialog') {
      $el.show();
      $el.css({
        marginTop: `${-Math.round($el.outerHeight() / 2)}px`,
      });
    }

    // Make sure that styles are applied, trigger relayout;
    const clientLeft = $el[0].clientLeft;

    $el.trigger(`open ${type}:open`);
    modal.emit(`${type}Open ${type}:open`);

    // Overlay
    $overlayEl[animate ? 'removeClass' : 'addClass']('not-animated');
    $overlayEl.addClass('overlay-in');
    if (animate) {
      $el.removeClass('modal-out not-animated').addClass('modal-in').transitionEnd(() => {
        if ($el.hasClass('modal-out')) {
          $el.trigger(`closed ${type}:closed`);
          modal.emit(`${type}Closed ${type}:closed`);
        } else {
          $el.trigger(`opened ${type}:opened`);
          modal.emit(`${type}Opened ${type}:opened`);
        }
      });
    } else {
      $el.removeClass('modal-out').addClass('modal-in not-animated');
      $el.trigger(`opened ${type}:opened`);
      modal.emit(`${type}Opened ${type}:opened`);
    }

    return modal;
    // const $el = modal.$el;

    // Animated
    // $el[animate ? 'removeClass' : 'addClass']('no-animation');

    // Type
    // const isDialog = $el.hasClass('dialog');
    // const isPopover = $el.hasClass('popover');
    // const isPopup = $el.hasClass('popup');
    // const isLoginScreen = $el.hasClass('login-screen');
    // const isPickerModal = $el.hasClass('picker-modal');
    // const isActions = $el.hasClass('actions-modal');

    // Modal Event Prefix
    // let type = 'dialog';
    // if (isPopover) type = 'popover';
    // if (isPopup) type = 'popup';
    // if (isLoginScreen) type = 'loginscreen';
    // if (isPickerModal) type = 'picker';
    // if (isActions) type = 'actions';

    // if ($('.modal.modal-in:not(.modal-out)').length && app.params.modal.stackDialogs && isDialog) {
    //   app.modalStack.push(() => {
    //     app.openModal($el);
    //   });
    //   return;
    // }

    // do nothing if this modal already shown
    // if ($el.data('f7-modal-shown') === true) {
    //   return;
    // }
    // $el.data('f7-modal-shown', true);

    // Move modal
    // const modalParent = modal.parent();
    // if (app.params.modalsMoveToRoot && !modalParent.is(app.root)) {
    //   app.root.append(modal);
    //   $el.once(`${type}:closed`, () => {
    //     modalParent.append(modal);
    //   });
    // }

    // modal.once(`${type}:close`, () => {
    //   $el.removeData('f7-modal-shown');
    // });

    // if (isDialog) {
    //   $el.show();
    //   $el.css({
    //     marginTop: `${-Math.round($el.outerHeight() / 2)}px`,
    //   });
    // }

    // let overlay;
    // if (!isLoginScreen && !isPickerModal) {
    //   if ($('.modal-overlay').length === 0 && !isPopup) {
    //     app.root.append('<div class="modal-overlay"></div>');
    //   }
    //   if ($('.popup-overlay').length === 0 && isPopup) {
    //     app.root.append('<div class="popup-overlay"></div>');
    //   }
    //   overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
    // }
    // if (app.params.material && isPickerModal) {
    //   if ($el.hasClass('picker-calendar')) {
    //     if ($('.picker-modal-overlay').length === 0 && !isPopup) {
    //       app.root.append('<div class="picker-modal-overlay"></div>');
    //     }
    //     overlay = $('.picker-modal-overlay');
    //   }
    // }
    // if (overlay) {
    //   overlay[animated ? 'removeClass' : 'addClass']('not-animated');
    // }

    // // Make sure that styles are applied, trigger relayout;
    // const clientLeft = modal[0].clientLeft;

    // // Trugger open event
    // $el.trigger(`open ${type}:open`);

    // // Picker modal body class
    // if (isPickerModal) {
    //   $('body').addClass('with-picker-modal');
    // }

    // // Init Pages and Navbars in modal
    // if ($el.find(`.${app.params.viewClass}`).length > 0) {
    //   $el.find('.page').each(function () {
    //     app.initPageWithCallback(this);
    //   });
    //   $el.find('.navbar').each(function () {
    //     app.initNavbarWithCallback(this);
    //   });
    // }

    // // Classes for transition in
    // if (!isLoginScreen && !isPickerModal) overlay.addClass('modal-overlay-visible');
    // if (app.params.material && isPickerModal && overlay) overlay.addClass('modal-overlay-visible');

    // if (animated) {
    //   $el.removeClass('modal-out').addClass('modal-in').transitionEnd((e) => {
    //     if (modal.hasClass('modal-out')) $el.trigger(`closed ${type}:closed`);
    //     else modal.trigger(`opened ${type}:opened`);
    //   });
    // } else {
    //   $el.removeClass('modal-out').addClass('modal-in');
    //   $el.trigger(`opened ${type}:opened`);
    // }
    // return true;
  }
  close() {
    const overlay = this;
  }
}

Use(Modal).use(Events);

export default Modal;
