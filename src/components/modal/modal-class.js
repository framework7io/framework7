import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

const openedModals = [];
const dialogsQueue = [];
function clearDialogsQueue() {
  if (dialogsQueue.length === 0) return;
  const dialog = dialogsQueue.shift();
  dialog.open();
}
class Modal extends Framework7Class {
  constructor(app, params) {
    super(params, [app]);

    const modal = this;

    const defaults = {};

    // Extend defaults with modules params
    modal.useInstanceModulesParams(defaults);

    modal.params = Utils.extend(defaults, params);

    // Install Modules
    modal.useInstanceModules();

    return this;
  }
  onOpen() {
    const modal = this;
    openedModals.push(modal);
    $('html').addClass(`with-modal-${modal.type.toLowerCase()}`);
    modal.$el.trigger(`modal:open ${modal.type.toLowerCase()}:open`, modal);
    modal.emit(`modalOpen ${modal.type}Open`, modal);
  }
  onOpened() {
    const modal = this;
    modal.$el.trigger(`modal:opened ${modal.type.toLowerCase()}:opened`, modal);
    modal.emit(`modalOpened ${modal.type}Opened`, modal);
  }
  onClose() {
    const modal = this;
    openedModals.splice(openedModals.indexOf(modal), 1);
    $('html').removeClass(`with-modal-${modal.type.toLowerCase()}`);
    modal.$el.trigger(`modal:close ${modal.type.toLowerCase()}:close`, modal);
    modal.emit(`modalClose ${modal.type}Close`, modal);
  }
  onClosed() {
    const modal = this;
    modal.$el.removeClass('modal-out');
    modal.$el.hide();
    modal.$el.trigger(`modal:closed ${modal.type.toLowerCase()}:closed`, modal);
    modal.emit(`modalClosed ${modal.type}Closed`, modal);
  }
  open(animate = true) {
    const modal = this;
    const app = modal.app;
    const $el = modal.$el;
    const $backdropEl = modal.$backdropEl;
    const type = modal.type;

    if (!$el || $el.hasClass('modal-in')) {
      return modal;
    }

    if (type === 'dialog' && app.params.modals.queueDialogs) {
      let pushToQueue;
      if ($('.dialog.modal-in').length > 0) {
        pushToQueue = true;
      } else if (openedModals.length > 0) {
        openedModals.forEach((openedModal) => {
          if (openedModal.type === 'dialog') pushToQueue = true;
        });
      }
      if (pushToQueue) {
        dialogsQueue.push(modal);
        return modal;
      }
    }

    const $modalParentEl = $el.parent();
    const wasInDom = $el.parents(document).length > 0;
    if (app.params.modals.moveToRoot && !$modalParentEl.is(app.root)) {
      app.root.append($el);
      modal.once(`${type}Closed`, () => {
        if (wasInDom) {
          $modalParentEl.append($el);
        } else {
          $el.remove();
        }
      });
    }
    // Show Modal
    $el.show();

    // Set Dialog offset
    if (type === 'dialog') {
      $el.css({
        marginTop: `${-Math.round($el.outerHeight() / 2)}px`,
      });
    }

    // Emit open
    /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
    modal._clientLeft = $el[0].clientLeft;

    // Backdrop
    if ($backdropEl) {
      $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');
      $backdropEl.addClass('backdrop-in');
    }
    // Modal
    if (animate) {
      $el
        .transitionEnd(() => {
          if ($el.hasClass('modal-out')) {
            modal.onClosed();
          } else {
            modal.onOpened();
          }
        })
        .removeClass('modal-out not-animated')
        .addClass('modal-in');
      modal.onOpen();
    } else {
      $el.removeClass('modal-out').addClass('modal-in not-animated');
      modal.onOpen();
      modal.onOpened();
    }

    return modal;
  }
  close(animate = true) {
    const modal = this;
    const $el = modal.$el;
    const $backdropEl = modal.$backdropEl;

    if (!$el || !$el.hasClass('modal-in')) {
      return modal;
    }

    // backdrop
    if ($backdropEl) {
      $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');
      $backdropEl.removeClass('backdrop-in');
    }

    // Modal
    $el[animate ? 'removeClass' : 'addClass']('not-animated');
    if (animate) {
      $el
        .transitionEnd(() => {
          if ($el.hasClass('modal-out')) {
            modal.onClosed();
          } else {
            modal.onOpened();
          }
        })
        .removeClass('modal-in')
        .addClass('modal-out');
      // Emit close
      modal.onClose();
    } else {
      $el
        .addClass('not-animated')
        .removeClass('modal-in')
        .addClass('modal-out');
      // Emit close
      modal.onClose();
      modal.onClosed();
    }

    if (modal.type === 'dialog') {
      clearDialogsQueue();
    }

    return modal;
  }
  destroy() {
    let modal = this;
    modal.emit('modalBeforeDestroy', modal);
    if (modal.$el) {
      modal.$el.trigger(`modal:beforedestroy ${modal.type.toLowerCase()}:beforedestroy`, modal);
    }
    Utils.deleteProps(modal);
    modal = null;
  }
}

export default Modal;
