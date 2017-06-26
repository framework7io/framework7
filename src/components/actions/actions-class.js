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
    } else if (actions.params.content) {
      $el = $(actions.params.content);
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
                      if (button.icon) {
                        itemClasses.push('item-content');
                        return `
                          <li>
                            <a class="${itemClasses.join(' ')}">
                              <div class="item-media">
                                ${button.icon}
                              </div>
                              <div class="item-inner">
                                <div class="item-title">
                                  ${button.text}
                                </div>
                              </div>
                            </a>
                          </li>
                        `;
                      }
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
        <div class="actions-modal${actions.params.grid ? ' actions-grid' : ''}">
          ${groups.map(group =>
            `<div class="actions-group">
              ${group.map((button) => {
                const buttonClasses = [`actions-${button.label ? 'label' : 'button'}`];
                if (button.color) buttonClasses.push(`color-${button.color}`);
                if (button.bg) buttonClasses.push(`bg-${button.color}`);
                if (button.bold) buttonClasses.push('actions-button-bold');
                if (button.disabled) buttonClasses.push('disabled');
                if (button.label) {
                  return `<div class="${buttonClasses.join(' ')}">${button.text}</div>`;
                }
                return `<div class="${buttonClasses.join(' ')}">${button.icon ? `<div class="actions-button-media">${button.icon}</div>` : ''}<div class="actions-button-text">${button.text}</div></div>`;
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

    // Backdrop
    let $backdropEl = app.root.children('.actions-backdrop');
    if ($backdropEl.length === 0) {
      $backdropEl = $('<div class="actions-backdrop"></div>');
      app.root.append($backdropEl);
    }

    const originalOpen = actions.open;
    const originalClose = actions.close;

    let popover;
    function buttonOnClick(e) {
      const buttonEl = this;
      let buttonIndex;
      let groupIndex;
      if ($(buttonEl).hasClass('item-link')) {
        buttonIndex = $(buttonEl).parents('li').index();
        groupIndex = $(buttonEl).parents('.list').index();
      } else {
        buttonIndex = $(buttonEl).index();
        groupIndex = $(buttonEl).parents('.actions-group').index();
      }
      const button = groups[groupIndex][buttonIndex];
      if (button.onClick) button.onClick(actions, e);
      if (actions.params.onClick) actions.params.onClick(actions, e);
      if (button.close !== false) actions.close();
    }
    actions.open = function open(animate) {
      let convertToPopover = false;
      if (actions.params.toPopover && actions.params.targetEl) {
        // Popover
        if (app.device.ios && app.device.ipad) {
          convertToPopover = true;
        } else if (app.width >= 768) {
          convertToPopover = true;
        }
      }
      if (convertToPopover) {
        popover = app.popover.create({
          content: actions.popoverHtml,
          targetEl: actions.params.targetEl,
        });
        popover.open(animate);
        popover.once('popoverOpened', () => {
          popover.$el.find('.item-link').each((groupIndex, buttonEl) => {
            $(buttonEl).on('click', buttonOnClick);
          });
        });
        popover.once('popoverClosed', () => {
          popover.$el.find('.item-link').each((groupIndex, buttonEl) => {
            $(buttonEl).on('click', buttonOnClick);
          });
        });
      } else {
        actions.$el = $(actions.actionsHtml);
        actions.$el[0].f7Modal = actions;
        actions.$el.find('.actions-button').each((groupIndex, buttonEl) => {
          $(buttonEl).on('click', buttonOnClick);
        });
        actions.once('actionsClosed', () => {
          actions.$el.find('.list-button').each((groupIndex, buttonEl) => {
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
      $backdropEl,
      backdropEl: $backdropEl[0],
      type: 'actions',
    });

    if ($el) {
      $el[0].f7Modal = actions;
    }

    return actions;
  }
}

export default Actions;
