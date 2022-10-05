/* eslint indent: ["off"] */
import { getWindow, getDocument } from 'ssr-window';
import { getDevice } from '../../shared/get-device.js';
import { extend, nextTick } from '../../shared/utils.js';
import Modal from '../modal/modal-class.js';
import $ from '../../shared/dom7.js';
/** @jsx $jsx */
import $jsx from '../../shared/$jsx.js';

class Actions extends Modal {
  constructor(app, params) {
    const extendedParams = extend({ on: {} }, app.params.actions, params);

    // Extends with open/close Modal methods;
    super(app, extendedParams);

    const actions = this;

    const device = getDevice();
    const window = getWindow();
    const document = getDocument();

    actions.params = extendedParams;

    // Buttons
    let groups;
    if (actions.params.buttons) {
      groups = actions.params.buttons;
      if (!Array.isArray(groups[0])) groups = [groups];
    }
    actions.groups = groups;

    // Find Element
    let $el;
    if (actions.params.el) {
      $el = $(actions.params.el).eq(0);
    } else if (actions.params.content) {
      $el = $(actions.params.content)
        .filter((node) => node.nodeType === 1)
        .eq(0);
    } else if (actions.params.buttons) {
      if (actions.params.convertToPopover) {
        actions.popoverHtml = actions.renderPopover();
      }
      actions.actionsHtml = actions.render();
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el && $el.length === 0 && !(actions.actionsHtml || actions.popoverHtml)) {
      return actions.destroy();
    }

    // Backdrop
    let $backdropEl;
    if (actions.params.backdrop && actions.params.backdropEl) {
      $backdropEl = $(actions.params.backdropEl);
    } else if (actions.params.backdrop) {
      if (actions.params.backdropUnique) {
        $backdropEl = $('<div class="popup-backdrop popup-backdrop-unique"></div>');
        actions.$containerEl.append($backdropEl);
      } else {
        $backdropEl = actions.$containerEl.children('.actions-backdrop');
      }
      if ($backdropEl.length === 0) {
        $backdropEl = $('<div class="actions-backdrop"></div>');
        actions.$containerEl.append($backdropEl);
      }
    }

    const originalOpen = actions.open;
    const originalClose = actions.close;

    let popover;
    function buttonOnClick(e) {
      const $buttonEl = $(this);
      let buttonIndex;
      let groupIndex;
      if ($buttonEl.hasClass('list-button') || $buttonEl.hasClass('item-link')) {
        buttonIndex = $buttonEl.parents('li').index();
        groupIndex = $buttonEl.parents('.list').index();
      } else {
        buttonIndex = $buttonEl.index();
        groupIndex = $buttonEl.parents('.actions-group').index();
      }
      if (typeof groups !== 'undefined') {
        const button = groups[groupIndex][buttonIndex];
        if (button.onClick) button.onClick(actions, e);
        if (actions.params.onClick) actions.params.onClick(actions, e);
        if (button.close !== false) actions.close();
      }
    }
    actions.open = function open(animate) {
      let convertToPopover = false;
      const { targetEl, targetX, targetY, targetWidth, targetHeight } = actions.params;
      if (
        actions.params.convertToPopover &&
        (targetEl || (targetX !== undefined && targetY !== undefined))
      ) {
        // Popover
        if (
          actions.params.forceToPopover ||
          (device.ios && device.ipad) ||
          app.width >= 768 ||
          device.desktop
        ) {
          convertToPopover = true;
        }
      }
      if (convertToPopover && actions.popoverHtml) {
        popover = app.popover.create({
          containerEl: actions.params.containerEl,
          content: actions.popoverHtml,
          backdrop: actions.params.backdrop,
          targetEl,
          targetX,
          targetY,
          targetWidth,
          targetHeight,
          on: {
            open() {
              if (!actions.$el) {
                actions.$el = popover.$el;
              }
              actions.$el.trigger(`modal:open ${actions.type.toLowerCase()}:open`);
              actions.emit(`local::open modalOpen ${actions.type}Open`, actions);
            },
            opened() {
              if (!actions.$el) {
                actions.$el = popover.$el;
              }
              actions.$el.trigger(`modal:opened ${actions.type.toLowerCase()}:opened`);
              actions.emit(`local::opened modalOpened ${actions.type}Opened`, actions);
            },
            close() {
              if (!actions.$el) {
                actions.$el = popover.$el;
              }
              actions.$el.trigger(`modal:close ${actions.type.toLowerCase()}:close`);
              actions.emit(`local::close modalClose ${actions.type}Close`, actions);
            },
            closed() {
              if (!actions.$el) {
                actions.$el = popover.$el;
              }
              actions.$el.trigger(`modal:closed ${actions.type.toLowerCase()}:closed`);
              actions.emit(`local::closed modalClosed ${actions.type}Closed`, actions);
            },
          },
        });
        popover.open(animate);
        popover.once('popoverOpened', () => {
          popover.$el.find('.list-button, .item-link').each((buttonEl) => {
            $(buttonEl).on('click', buttonOnClick);
          });
        });
        popover.once('popoverClosed', () => {
          popover.$el.find('.list-button, .item-link').each((buttonEl) => {
            $(buttonEl).off('click', buttonOnClick);
          });
          nextTick(() => {
            popover.destroy();
            popover = undefined;
          });
        });
      } else {
        actions.$el = actions.actionsHtml ? $(actions.actionsHtml) : actions.$el;
        actions.$el[0].f7Modal = actions;
        if (actions.groups) {
          actions.$el.find('.actions-button').each((buttonEl) => {
            $(buttonEl).on('click', buttonOnClick);
          });
          actions.once('actionsClosed', () => {
            actions.$el.find('.actions-button').each((buttonEl) => {
              $(buttonEl).off('click', buttonOnClick);
            });
          });
        }
        actions.el = actions.$el[0];
        originalOpen.call(actions, animate);
      }
      return actions;
    };

    actions.close = function close(animate) {
      if (popover) {
        popover.close(animate);
      } else {
        originalClose.call(actions, animate);
      }
      return actions;
    };

    extend(actions, {
      app,
      $el,
      el: $el ? $el[0] : undefined,
      $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'actions',
    });

    function handleClick(e) {
      const target = e.target;
      const $target = $(target);
      const keyboardOpened =
        !device.desktop &&
        device.cordova &&
        ((window.Keyboard && window.Keyboard.isVisible) ||
          (window.cordova.plugins &&
            window.cordova.plugins.Keyboard &&
            window.cordova.plugins.Keyboard.isVisible));
      if (keyboardOpened) return;
      if ($target.closest(actions.el).length === 0) {
        if (
          actions.params.closeByBackdropClick &&
          actions.params.backdrop &&
          actions.backdropEl &&
          actions.backdropEl === target
        ) {
          actions.close();
        } else if (actions.params.closeByOutsideClick) {
          actions.close();
        }
      }
    }

    function onKeyDown(e) {
      const keyCode = e.keyCode;
      if (keyCode === 27 && actions.params.closeOnEscape) {
        actions.close();
      }
    }

    if (actions.params.closeOnEscape) {
      actions.on('open', () => {
        $(document).on('keydown', onKeyDown);
      });
      actions.on('close', () => {
        $(document).off('keydown', onKeyDown);
      });
    }

    actions.on('opened', () => {
      if (actions.params.closeByBackdropClick || actions.params.closeByOutsideClick) {
        app.on('click', handleClick);
      }
    });
    actions.on('close', () => {
      if (actions.params.closeByBackdropClick || actions.params.closeByOutsideClick) {
        app.off('click', handleClick);
      }
    });

    if ($el) {
      $el[0].f7Modal = actions;
    }

    return actions;
  }

  render() {
    const actions = this;
    if (actions.params.render) return actions.params.render.call(actions, actions);
    const { groups } = actions;
    const cssClass = actions.params.cssClass;
    return (
      <div class={`actions-modal${actions.params.grid ? ' actions-grid' : ''} ${cssClass || ''}`}>
        {groups.map((group) => (
          <div class="actions-group">
            {group.map((button) => {
              const buttonClasses = [`actions-${button.label ? 'label' : 'button'}`];
              const { color, bg, strong, disabled, label, text, icon } = button;
              if (color) buttonClasses.push(`color-${color}`);
              if (bg) buttonClasses.push(`bg-color-${bg}`);
              if (strong) buttonClasses.push('actions-button-strong');
              if (disabled) buttonClasses.push('disabled');
              if (label) {
                return <div class={buttonClasses.join(' ')}>{text}</div>;
              }
              return (
                <div class={buttonClasses.join(' ')}>
                  {icon && <div class="actions-button-media">{icon}</div>}
                  <div class="actions-button-text">{text}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  renderPopover() {
    const actions = this;
    if (actions.params.renderPopover) return actions.params.renderPopover.call(actions, actions);
    const { groups } = actions;
    const cssClass = actions.params.cssClass;
    return (
      <div class={`popover popover-from-actions ${cssClass || ''}`}>
        <div class="popover-inner">
          {groups.map((group) => (
            <div class="list">
              <ul>
                {group.map((button) => {
                  const itemClasses = [];
                  const { color, bg, strong, disabled, label, text, icon } = button;
                  if (color) itemClasses.push(`color-${color}`);
                  if (bg) itemClasses.push(`bg-color-${bg}`);
                  if (strong) itemClasses.push('popover-from-actions-strong');
                  if (disabled) itemClasses.push('disabled');
                  if (label) {
                    itemClasses.push('popover-from-actions-label');
                    return `<li class="${itemClasses.join(' ')}">${text}</li>`;
                  }
                  if (icon) {
                    itemClasses.push('item-link item-content');
                    return (
                      <li>
                        <a class={itemClasses.join(' ')}>
                          <div class="item-media">{icon}</div>
                          <div class="item-inner">
                            <div class="item-title">{text}</div>
                          </div>
                        </a>
                      </li>
                    );
                  }
                  itemClasses.push('list-button');
                  return (
                    <li>
                      <a class={itemClasses.join(' ')}>{text}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Actions;
