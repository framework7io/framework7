import $ from 'dom7';
import Utils from '../../utils/utils';
import Actions from './actions-class';

export default {
  name: 'actions',
  create() {
    const app = this;
    Utils.extend(app, {
      actions: {
        create(params) {
          return new Actions(app, params);
        },
        open(actionsEl, animate) {
          return new Actions(app, {
            el: $(actionsEl),
          }).open(animate);
        },
        close(actionsEl = '.actions-modal.modal-in', animate) {
          const $actionsEl = $(actionsEl);
          if ($actionsEl.length && $actionsEl[0].f7Modal) {
            return $actionsEl[0].f7Modal.close(animate);
          }
          return undefined;
        },
      },
    });
  },
  clicks: {
    '.actions-open': function openActions($clickedEl, data = {}) {
      const app = this;
      app.actions.open(data.actions, data.animate);
    },
    '.actions-close': function closeActions($clickedEl, data = {}) {
      const app = this;
      app.actions.close(data.actions, data.animate);
    },
    '.actions-backdrop': function closeActions() {
      const app = this;
      if (!app.params.modals.actionsCloseByOutsideClick) return;
      app.actions.close();
    },
  },
};
