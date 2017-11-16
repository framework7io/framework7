import $ from 'dom7';
import Utils from '../../utils/utils';
import Popover from './popover-class';
import ModalMethods from '../../utils/modal-methods';

export default {
  name: 'popover',
  params: {
    popover: {
      closeByBackdropClick: true,
      closeByOutsideClick: true,
      backdrop: true,
    },
  },
  static: {
    Popover,
  },
  create() {
    const app = this;
    app.popover = Utils.extend(
      ModalMethods({
        app,
        constructor: Popover,
        defaultSelector: '.popover.modal-in',
      }),
      {
        open(popoverEl, targetEl, animate) {
          const $popoverEl = $(popoverEl);
          let popover = $popoverEl[0].f7Modal;
          if (!popover) popover = new Popover(app, { el: $popoverEl, targetEl });
          return popover.open(targetEl, animate);
        },
      }
    );
  },
  clicks: {
    '.popover-open': function openPopover($clickedEl, data = {}) {
      const app = this;
      app.popover.open(data.popover, $clickedEl, data.animate);
    },
    '.popover-close': function closePopover($clickedEl, data = {}) {
      const app = this;
      app.popover.close(data.popover, data.animate);
    },
    '.popover-backdrop': function closePopover() {
      const app = this;
      if (!app.params.popover.closeByBackdropClick) return;
      app.popover.close();
    },
  },
};
