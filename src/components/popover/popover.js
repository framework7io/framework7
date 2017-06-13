import $ from 'dom7';
import Utils from '../../utils/utils';
import Popover from './popover-class';

export default {
  name: 'popover',
  create() {
    const app = this;
    Utils.extend(app, {
      popover: {
        create(params) {
          return new Popover(app, params);
        },
        open(popoverEl, animate) {
          const $popoverEl = $(popoverEl);
          let popover = $popoverEl[0].f7Modal;
          if (!popover) popover = new Popover(app, { el: $popoverEl });
          return popover.open(animate);
        },
        close(popoverEl = '.popover.modal-in', animate) {
          const $popoverEl = $(popoverEl);
          if ($popoverEl.length === 0) return undefined;
          let popover = $popoverEl[0].f7Modal;
          if (!popover) popover = new Popover(app, { el: $popoverEl });
          return popover.close(animate);
        },
      },
    });
  },
  clicks: {
    '.popover-open': function openPopover($clickedEl, data = {}) {
      const app = this;
      app.popover.open(data.popover, data.animate);
    },
    '.popover-close': function closePopover($clickedEl, data = {}) {
      const app = this;
      app.popover.close(data.popover, data.animate);
    },
    '.popover-backdrop': function closePopover() {
      const app = this;
      if (!app.params.modals.popoverCloseByOutsideClick) return;
      app.popover.close();
    },
  },
};
