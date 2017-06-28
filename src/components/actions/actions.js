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
          const $actionsEl = $(actionsEl);
          let actions = $actionsEl[0].f7Modal;
          if (!actions) actions = new Actions(app, { el: $actionsEl });
          return actions.open(animate);
        },
        close(actionsEl = '.actions-modal.modal-in', animate) {
          const $actionsEl = $(actionsEl);
          if ($actionsEl.length === 0) return undefined;
          let actions = $actionsEl[0].f7Modal;
          if (!actions) actions = new Actions(app, { el: $actionsEl });
          return actions.close(animate);
        },
        get(actionsEl = '.actions-modal.modal-in') {
          const $actionsEl = $(actionsEl);
          if ($actionsEl.length === 0) return undefined;
          return $actionsEl[0].f7Modal;
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
      if (!app.params.modals.actionsCloseByBackdropClick) return;
      app.actions.close();
    },
  },
};
