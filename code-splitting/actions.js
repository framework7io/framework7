
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

  /* eslint indent: ["off"] */

  var Actions = (function (Modal$$1) {
    function Actions(app, params) {
      var extendedParams = Utils.extend(
        { on: {} },
        app.params.actions,
        params
      );

      // Extends with open/close Modal methods;
      Modal$$1.call(this, app, extendedParams);

      var actions = this;

      actions.params = extendedParams;

      // Buttons
      var groups;
      if (actions.params.buttons) {
        groups = actions.params.buttons;
        if (!Array.isArray(groups[0])) { groups = [groups]; }
      }
      actions.groups = groups;

      // Find Element
      var $el;
      if (actions.params.el) {
        $el = $(actions.params.el);
      } else if (actions.params.content) {
        $el = $(actions.params.content);
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
      var $backdropEl;
      if (actions.params.backdrop) {
        $backdropEl = app.root.children('.actions-backdrop');
        if ($backdropEl.length === 0) {
          $backdropEl = $('<div class="actions-backdrop"></div>');
          app.root.append($backdropEl);
        }
      }

      var originalOpen = actions.open;
      var originalClose = actions.close;

      var popover;
      function buttonOnClick(e) {
        var buttonEl = this;
        var buttonIndex;
        var groupIndex;
        if ($(buttonEl).hasClass('item-link')) {
          buttonIndex = $(buttonEl).parents('li').index();
          groupIndex = $(buttonEl).parents('.list').index();
        } else {
          buttonIndex = $(buttonEl).index();
          groupIndex = $(buttonEl).parents('.actions-group').index();
        }
        if (typeof groups !== 'undefined') {
          var button = groups[groupIndex][buttonIndex];
          if (button.onClick) { button.onClick(actions, e); }
          if (actions.params.onClick) { actions.params.onClick(actions, e); }
          if (button.close !== false) { actions.close(); }
        }
      }
      actions.open = function open(animate) {
        var convertToPopover = false;
        var ref = actions.params;
        var targetEl = ref.targetEl;
        var targetX = ref.targetX;
        var targetY = ref.targetY;
        var targetWidth = ref.targetWidth;
        var targetHeight = ref.targetHeight;
        if (actions.params.convertToPopover && (targetEl || (targetX !== undefined && targetY !== undefined))) {
          // Popover
          if (
            actions.params.forceToPopover
            || (app.device.ios && app.device.ipad)
            || app.width >= 768
          ) {
            convertToPopover = true;
          }
        }
        if (convertToPopover && actions.popoverHtml) {
          popover = app.popover.create({
            content: actions.popoverHtml,
            backdrop: actions.params.backdrop,
            targetEl: targetEl,
            targetX: targetX,
            targetY: targetY,
            targetWidth: targetWidth,
            targetHeight: targetHeight,
          });
          popover.open(animate);
          popover.once('popoverOpened', function () {
            popover.$el.find('.item-link').each(function (groupIndex, buttonEl) {
              $(buttonEl).on('click', buttonOnClick);
            });
          });
          popover.once('popoverClosed', function () {
            popover.$el.find('.item-link').each(function (groupIndex, buttonEl) {
              $(buttonEl).off('click', buttonOnClick);
            });
            Utils.nextTick(function () {
              popover.destroy();
              popover = undefined;
            });
          });
        } else {
          actions.$el = actions.actionsHtml ? $(actions.actionsHtml) : actions.$el;
          actions.$el[0].f7Modal = actions;
          if (actions.groups) {
            actions.$el.find('.actions-button').each(function (groupIndex, buttonEl) {
              $(buttonEl).on('click', buttonOnClick);
            });
            actions.once('actionsClosed', function () {
              actions.$el.find('.actions-button').each(function (groupIndex, buttonEl) {
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

      Utils.extend(actions, {
        app: app,
        $el: $el,
        el: $el ? $el[0] : undefined,
        $backdropEl: $backdropEl,
        backdropEl: $backdropEl && $backdropEl[0],
        type: 'actions',
      });

      function handleClick(e) {
        var target = e.target;
        var $target = $(target);
        if ($target.closest(actions.el).length === 0) {
          if (
            actions.params.closeByBackdropClick
            && actions.params.backdrop
            && actions.backdropEl
            && actions.backdropEl === target
          ) {
            actions.close();
          } else if (actions.params.closeByOutsideClick) {
            actions.close();
          }
        }
      }

      actions.on('opened', function () {
        if (actions.params.closeByBackdropClick || actions.params.closeByOutsideClick) {
          app.on('click', handleClick);
        }
      });
      actions.on('close', function () {
        if (actions.params.closeByBackdropClick || actions.params.closeByOutsideClick) {
          app.off('click', handleClick);
        }
      });

      if ($el) {
        $el[0].f7Modal = actions;
      }

      return actions;
    }

    if ( Modal$$1 ) Actions.__proto__ = Modal$$1;
    Actions.prototype = Object.create( Modal$$1 && Modal$$1.prototype );
    Actions.prototype.constructor = Actions;

    Actions.prototype.render = function render () {
      var actions = this;
      if (actions.params.render) { return actions.params.render.call(actions, actions); }
      var groups = actions.groups;
      return ("\n      <div class=\"actions-modal" + (actions.params.grid ? ' actions-grid' : '') + "\">\n        " + (groups.map(function (group) { return ("<div class=\"actions-group\">\n            " + (group.map(function (button) {
                var buttonClasses = [("actions-" + (button.label ? 'label' : 'button'))];
                var color = button.color;
                var bg = button.bg;
                var bold = button.bold;
                var disabled = button.disabled;
                var label = button.label;
                var text = button.text;
                var icon = button.icon;
                if (color) { buttonClasses.push(("color-" + color)); }
                if (bg) { buttonClasses.push(("bg-color-" + bg)); }
                if (bold) { buttonClasses.push('actions-button-bold'); }
                if (disabled) { buttonClasses.push('disabled'); }
                if (label) {
                  return ("<div class=\"" + (buttonClasses.join(' ')) + "\">" + text + "</div>");
                }
                return ("\n                <div class=\"" + (buttonClasses.join(' ')) + "\">\n                  " + (icon ? ("<div class=\"actions-button-media\">" + icon + "</div>") : '') + "\n                  <div class=\"actions-button-text\">" + text + "</div>\n                </div>").trim();
              }).join('')) + "\n          </div>"); }).join('')) + "\n      </div>\n    ").trim();
    };

    Actions.prototype.renderPopover = function renderPopover () {
      var actions = this;
      if (actions.params.renderPopover) { return actions.params.renderPopover.call(actions, actions); }
      var groups = actions.groups;
      return ("\n      <div class=\"popover popover-from-actions\">\n        <div class=\"popover-inner\">\n          " + (groups.map(function (group) { return ("\n            <div class=\"list\">\n              <ul>\n                " + (group.map(function (button) {
                    var itemClasses = [];
                    var color = button.color;
                    var bg = button.bg;
                    var bold = button.bold;
                    var disabled = button.disabled;
                    var label = button.label;
                    var text = button.text;
                    var icon = button.icon;
                    if (color) { itemClasses.push(("color-" + color)); }
                    if (bg) { itemClasses.push(("bg-color-" + bg)); }
                    if (bold) { itemClasses.push('popover-from-actions-bold'); }
                    if (disabled) { itemClasses.push('disabled'); }
                    if (label) {
                      itemClasses.push('popover-from-actions-label');
                      return ("<li class=\"" + (itemClasses.join(' ')) + "\">" + text + "</li>");
                    }
                    itemClasses.push('item-link');
                    if (icon) {
                      itemClasses.push('item-content');
                      return ("\n                      <li>\n                        <a class=\"" + (itemClasses.join(' ')) + "\">\n                          <div class=\"item-media\">\n                            " + icon + "\n                          </div>\n                          <div class=\"item-inner\">\n                            <div class=\"item-title\">\n                              " + text + "\n                            </div>\n                          </div>\n                        </a>\n                      </li>\n                    ");
                    }
                    itemClasses.push('list-button');
                    return ("\n                    <li>\n                      <a href=\"#\" class=\"list-button " + (itemClasses.join(' ')) + "\">" + text + "</a>\n                    </li>\n                  ");
                  }).join('')) + "\n              </ul>\n            </div>\n          "); }).join('')) + "\n        </div>\n      </div>\n    ").trim();
    };

    return Actions;
  }(Modal));

  var actions = {
    name: 'actions',
    params: {
      actions: {
        convertToPopover: true,
        forceToPopover: false,
        closeByBackdropClick: true,
        render: null,
        renderPopover: null,
        backdrop: true,
      },
    },
    static: {
      Actions: Actions,
    },
    create: function create() {
      var app = this;
      app.actions = ModalMethods({
        app: app,
        constructor: Actions,
        defaultSelector: '.actions-modal.modal-in',
      });
    },
    clicks: {
      '.actions-open': function openActions($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        app.actions.open(data.actions, data.animate);
      },
      '.actions-close': function closeActions($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        app.actions.close(data.actions, data.animate);
      },
    },
  };

  return actions;
}
framework7ComponentLoader.componentName = 'actions';

