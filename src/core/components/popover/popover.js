import $ from '../../shared/dom7';
import { extend } from '../../shared/utils';
import Popover from './popover-class';
import ModalMethods from '../../shared/modal-methods';

export default {
  name: 'popover',
  params: {
    popover: {
      backdrop: true,
      backdropEl: undefined,
      closeByBackdropClick: true,
      closeByOutsideClick: true,
      closeOnEscape: false,
      containerEl: null,
    },
  },
  static: {
    Popover,
  },
  create() {
    const app = this;
    app.popover = extend(
      ModalMethods({
        app,
        constructor: Popover,
        defaultSelector: '.popover.modal-in',
      }),
      {
        open(popoverEl, targetEl, animate) {
          let $popoverEl = $(popoverEl);
          if ($popoverEl.length > 1) {
            // check if same popover in other page
            const $targetPage = $(targetEl).parents('.page');
            if ($targetPage.length) {
              $popoverEl.each((el) => {
                const $el = $(el);
                if ($el.parents($targetPage)[0] === $targetPage[0]) {
                  $popoverEl = $el;
                }
              });
            }
          }
          if ($popoverEl.length > 1) {
            $popoverEl = $popoverEl.eq($popoverEl.length - 1);
          }
          let popover = $popoverEl[0].f7Modal;
          const data = $popoverEl.dataset();
          if (!popover) {
            popover = new Popover(
              app,
              Object.assign(
                {
                  el: $popoverEl,
                  targetEl,
                },
                data,
              ),
            );
          }
          return popover.open(targetEl, animate);
        },
      },
    );
  },
  clicks: {
    '.popover-open': function openPopover($clickedEl, data = {}) {
      const app = this;
      app.popover.open(data.popover, $clickedEl, data.animate);
    },
    '.popover-close': function closePopover($clickedEl, data = {}) {
      const app = this;
      app.popover.close(data.popover, data.animate, $clickedEl);
    },
  },
};
