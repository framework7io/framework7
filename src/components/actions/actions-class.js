import $ from 'dom7';
import Utils from '../../utils/utils';
import Modal from '../modal/modal-class';

class Actions extends Modal {
  constructor(app, params) {
    const extendedParams = Utils.extend({
      toPopover: app.params.modals.actionsToPopover,
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    super(app, extendedParams);

    const actions = this;

    actions.params = extendedParams;

    // Buttons
    let groups;
    if (actions.params.buttons) {
      groups = actions.params.buttons;
      if (!Array.isArray(groups[0])) groups = [groups];
    }

    // Find Element
    let $el;
    if (actions.params.el) {
      $el = $(actions.params.el);
    } else if (actions.params.html) {
      $el = $(actions.params.html);
    } else if (actions.params.buttons) {
      if (actions.params.toPopover) {
        actions.popoverHtml = `
          <div class="popover popover-from-actions">
            <div class="popover-inner">
              ${groups.map(group => `
                <div class="list">
                  <ul>
                    ${group.map((button) => {
                      const itemClasses = [];
                      if (button.color) itemClasses.push(`color-${button.color}`);
                      if (button.bg) itemClasses.push(`bg-${button.bg}`);
                      if (button.bold) itemClasses.push('popover-from-actions-bold');
                      if (button.disabled) itemClasses.push('disabled');
                      if (button.label) {
                        itemClasses.push('popover-from-actions-label');
                        return `<li class="${itemClasses.join(' ')}">${button.text}</li>`;
                      }
                      itemClasses.push('item-link');
                      itemClasses.push('list-button');
                      return `
                        <li>
                          <a href="#" class="${itemClasses.join(' ')}">${button.text}</a>
                        </li>
                      `;
                    }).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
      actions.actionsHtml = `
        <div class="actions-modal">
          ${groups.map(group =>
            `<div class="actions-group">
              ${group.map((button) => {
                const buttonClasses = [`actions-${button.label ? 'label' : 'button'}`];
                if (button.color) buttonClasses.push(`color-${button.color}`);
                if (button.bg) buttonClasses.push(`bg-${button.color}`);
                if (button.bold) buttonClasses.push('actions-button-bold');
                if (button.disabled) buttonClasses.push('disabled');
                return `<div class="${buttonClasses.join(' ')}">${button.text}</div>`;
              }).join('')}
            </div>`).join('')}
        </div>
      `;
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el && $el.length === 0 && !(actions.actionsHtml || actions.popoverHtml)) {
      return actions.destroy();
    }

    // Overlay
    let $overlayEl = app.root.children('.actions-overlay');
    if ($overlayEl.length === 0) {
      $overlayEl = $('<div class="actions-overlay"></div>');
      app.root.append($overlayEl);
    }

    const originalOpen = actions.open;
    const originalClose = actions.close;

    let popover;
    function buttonOnClick(e) {
      const buttonEl = this;
      const buttonIndex = $(buttonEl).index();
      const groupIndex = $(buttonEl).parents('.actions-group').index();
      const button = groups[groupIndex][buttonIndex];
      if (button.onClick) button.onClick(actions, e);
      if (actions.params.onClick) actions.params.onClick(actions, e);
      if (button.close !== false) actions.close();
    }
    actions.open = function open(animate) {
      let convertToPopover = false;
      if (actions.params.toPopover) {
        // Popover
        if (app.device.ios && app.device.ipad) {
          convertToPopover = true;
        } else if (app.width >= 768) {
          convertToPopover = true;
        }
      }
      if (convertToPopover) {
        popover = app.popover.create({
          html: actions.popoverHtml,
          targetEl: actions.params.targetEl,
        });
        popover.open(animate);
      } else {
        actions.$el = $(actions.actionsHtml);
        actions.$el[0].f7Modal = actions;
        actions.$el.find('.actions-button').each((groupIndex, buttonEl) => {
          $(buttonEl).on('click', buttonOnClick);
        });
        actions.once('closed', () => {
          actions.$el.find('.actions-button').each((groupIndex, buttonEl) => {
            $(buttonEl).off('click', buttonOnClick);
          });
        });
        originalOpen.call(actions, animate);
      }
    };

    actions.close = function close(animate) {
      if (popover) {
        popover.close(animate).once('popoverClose', () => {
          popover.destroy();
          popover = undefined;
        });
      } else {
        originalClose.call(actions, animate);
      }
    };

    Utils.extend(actions, {
      app,
      $el,
      el: $el ? $el[0] : undefined,
      $overlayEl,
      overlayEl: $overlayEl[0],
      type: 'actions',
    });

    if ($el) {
      $el[0].f7Modal = actions;
    }

    return actions;
  }
}

export default Actions;
