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
    $('html').addClass(`with-modal-${modal.type}`);
    modal.$el.trigger(`open ${modal.type}:open`, modal);
    modal.emit('modalOpen modal:open', modal);
    modal.emit(`${modal.type}Open ${modal.type}:open`, modal);
  }
  onOpened() {
    const modal = this;
    modal.$el.trigger(`opened ${modal.type}:opened`, modal);
    modal.emit('modalOpened modal:opened', modal);
    modal.emit(`${modal.type}Opened ${modal.type}:opened`, modal);
  }
  onClose() {
    const modal = this;
    openedModals.splice(openedModals.indexOf(modal), 1);
    $('html').removeClass(`with-modal-${modal.type}`);
    modal.$el.trigger(`close ${modal.type}:close`, modal);
    modal.emit('modalClose modal:close', modal);
    modal.emit(`${modal.type}Close ${modal.type}:close`, modal);
  }
  onClosed() {
    const modal = this;
    modal.$el.removeClass('modal-out');
    modal.$el.hide();
    modal.$el.trigger(`closed ${modal.type}:closed`, modal);
    modal.emit('modalClosed modal:closed', modal);
    modal.emit(`${modal.type}Closed ${modal.type}:closed`, modal);
  }
  open(animate = true) {
    const modal = this;
    const app = modal.app;
    const $el = modal.$el;
    const $overlayEl = modal.$overlayEl;
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
      modal.once(`${type}:closed`, () => {
        if (wasInDom) {
          $modalParentEl.append(modal);
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
    modal.onOpen();
    Utils.nextTick(() => {
      // Overlay
      if ($overlayEl) {
        $overlayEl[animate ? 'removeClass' : 'addClass']('not-animated');
        $overlayEl.addClass('overlay-in');
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
      } else {
        $el.removeClass('modal-out').addClass('modal-in not-animated');
        modal.onOpened();
      }
    });

    return modal;
  }
  close(animate = true) {
    const modal = this;
    const $el = modal.$el;
    const $overlayEl = modal.$overlayEl;

    if (!$el || !$el.hasClass('modal-in')) {
      return modal;
    }

    // Emit close
    modal.onClose();

    // Overlay
    if ($overlayEl) {
      $overlayEl[animate ? 'removeClass' : 'addClass']('not-animated');
      $overlayEl.removeClass('overlay-in');
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
    } else {
      $el
        .addClass('not-animated')
        .removeClass('modal-in')
        .addClass('modal-out');
      modal.onClosed();
    }

    if (modal.type === 'dialog') {
      clearDialogsQueue();
    }

    return modal;
  }
  destroy() {
    let modal = this;
    Utils.deleteProps(modal);
    modal = null;
  }
}

export default Modal;
