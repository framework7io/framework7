import $ from 'dom7';
import Use from '../../utils/use';
import Events from '../../modules/events/events';

const dialogsQueue = [];
function clearDialogsQueue() {
  if (dialogsQueue.length === 0) return;
  const dialog = dialogsQueue.shift();
  dialog.open();
}
class Modal {
  constructor(app, params) {
    const modal = this;
    modal.params = params;
    modal.useInstanceModules({
      events: {
        parents: [app],
      },
    });
    return this;
  }
  onOpen() {
    const modal = this;
    modal.$el.trigger(`open ${modal.type}:open`);
    modal.emit(`${modal.type}Open ${modal.type}:open`);
  }
  onOpened() {
    const modal = this;
    modal.$el.trigger(`opened ${modal.type}:opened`);
    modal.emit(`${modal.type}Opened ${modal.type}:opened`);
  }
  onClose() {
    const modal = this;
    modal.$el.trigger(`close ${modal.type}:close`);
    modal.emit(`${modal.type}Close ${modal.type}:close`);
  }
  onClosed() {
    const modal = this;
    modal.$el.trigger(`closed ${modal.type}:closed`);
    modal.emit(`${modal.type}Closed ${modal.type}:closed`);
    modal.$el.removeClass('modal-out');
    modal.$el.hide();
    if (modal.type === 'dialog') {
      modal.$el.remove();
    }
  }
  open(animate = true) {
    const modal = this;
    const app = modal.app;
    const $el = modal.$el;
    const $overlayEl = modal.$overlayEl;
    const type = modal.type;

    if (type === 'dialog' && $('.dialog.modal-in').length > 0 && app.params.modals.queueDialogs) {
      dialogsQueue.push(modal);
      return modal;
    }

    const $modalParentEl = $el.parent();
    if (app.params.modals.moveToRoot && !$modalParentEl.is(app.root)) {
      app.root.append($el);
      if (type !== 'dialog') {
        modal.once(`${type}:closed`, () => {
          $modalParentEl.append(modal);
        });
      }
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

    // Overlay
    $overlayEl[animate ? 'removeClass' : 'addClass']('not-animated');
    $overlayEl.addClass('overlay-in');

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

    return modal;
  }
  close(animate = true) {
    const modal = this;
    const $el = modal.$el;
    const $overlayEl = modal.$overlayEl;

    // Emit close
    modal.onClose();

    // Overlay
    $overlayEl[animate ? 'removeClass' : 'addClass']('not-animated');
    $overlayEl.removeClass('overlay-in');

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
  }
}

Use(Modal).use(Events);

export default Modal;
