'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _modalClass = require('../modal/modal-class');

var _modalClass2 = _interopRequireDefault(_modalClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint indent: ["off"] */


var Actions = function (_Modal) {
  _inherits(Actions, _Modal);

  function Actions(app, params) {
    var _ret3;

    _classCallCheck(this, Actions);

    var extendedParams = _utils2.default.extend({ on: {} }, app.params.actions, params);

    // Extends with open/close Modal methods;

    var _this = _possibleConstructorReturn(this, (Actions.__proto__ || Object.getPrototypeOf(Actions)).call(this, app, extendedParams));

    var actions = _this;

    actions.params = extendedParams;

    // Buttons
    var groups = void 0;
    if (actions.params.buttons) {
      groups = actions.params.buttons;
      if (!Array.isArray(groups[0])) groups = [groups];
    }
    actions.groups = groups;

    // Find Element
    var $el = void 0;
    if (actions.params.el) {
      $el = (0, _dom2.default)(actions.params.el);
    } else if (actions.params.content) {
      $el = (0, _dom2.default)(actions.params.content);
    } else if (actions.params.buttons) {
      if (actions.params.convertToPopover) {
        actions.popoverHtml = actions.renderPopover();
      }
      actions.actionsHtml = actions.render();
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      var _ret;

      return _ret = $el[0].f7Modal, _possibleConstructorReturn(_this, _ret);
    }

    if ($el && $el.length === 0 && !(actions.actionsHtml || actions.popoverHtml)) {
      var _ret2;

      return _ret2 = actions.destroy(), _possibleConstructorReturn(_this, _ret2);
    }

    // Backdrop
    var $backdropEl = void 0;
    if (actions.params.backdrop) {
      $backdropEl = app.root.children('.actions-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = (0, _dom2.default)('<div class="actions-backdrop"></div>');
        app.root.append($backdropEl);
      }
    }

    var originalOpen = actions.open;
    var originalClose = actions.close;

    var popover = void 0;
    function buttonOnClick(e) {
      var buttonEl = this;
      var buttonIndex = void 0;
      var groupIndex = void 0;
      if ((0, _dom2.default)(buttonEl).hasClass('item-link')) {
        buttonIndex = (0, _dom2.default)(buttonEl).parents('li').index();
        groupIndex = (0, _dom2.default)(buttonEl).parents('.list').index();
      } else {
        buttonIndex = (0, _dom2.default)(buttonEl).index();
        groupIndex = (0, _dom2.default)(buttonEl).parents('.actions-group').index();
      }
      if (typeof groups !== 'undefined') {
        var button = groups[groupIndex][buttonIndex];
        if (button.onClick) button.onClick(actions, e);
        if (actions.params.onClick) actions.params.onClick(actions, e);
        if (button.close !== false) actions.close();
      }
    }
    actions.open = function open(animate) {
      var convertToPopover = false;
      var _actions$params = actions.params,
          targetEl = _actions$params.targetEl,
          targetX = _actions$params.targetX,
          targetY = _actions$params.targetY,
          targetWidth = _actions$params.targetWidth,
          targetHeight = _actions$params.targetHeight;

      if (actions.params.convertToPopover && (targetEl || targetX !== undefined && targetY !== undefined)) {
        // Popover
        if (actions.params.forceToPopover || app.device.ios && app.device.ipad || app.width >= 768) {
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
          targetHeight: targetHeight
        });
        popover.open(animate);
        popover.once('popoverOpened', function () {
          popover.$el.find('.item-link').each(function (groupIndex, buttonEl) {
            (0, _dom2.default)(buttonEl).on('click', buttonOnClick);
          });
        });
        popover.once('popoverClosed', function () {
          popover.$el.find('.item-link').each(function (groupIndex, buttonEl) {
            (0, _dom2.default)(buttonEl).off('click', buttonOnClick);
          });
          _utils2.default.nextTick(function () {
            popover.destroy();
            popover = undefined;
          });
        });
      } else {
        actions.$el = actions.actionsHtml ? (0, _dom2.default)(actions.actionsHtml) : actions.$el;
        actions.$el[0].f7Modal = actions;
        if (actions.groups) {
          actions.$el.find('.actions-button').each(function (groupIndex, buttonEl) {
            (0, _dom2.default)(buttonEl).on('click', buttonOnClick);
          });
          actions.once('actionsClosed', function () {
            actions.$el.find('.actions-button').each(function (groupIndex, buttonEl) {
              (0, _dom2.default)(buttonEl).off('click', buttonOnClick);
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

    _utils2.default.extend(actions, {
      app: app,
      $el: $el,
      el: $el ? $el[0] : undefined,
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'actions'
    });

    function handleClick(e) {
      var target = e.target;
      var $target = (0, _dom2.default)(target);
      if ($target.closest(actions.el).length === 0) {
        if (actions.params.closeByBackdropClick && actions.params.backdrop && actions.backdropEl && actions.backdropEl === target) {
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

    return _ret3 = actions, _possibleConstructorReturn(_this, _ret3);
  }

  _createClass(Actions, [{
    key: 'render',
    value: function render() {
      var actions = this;
      if (actions.params.render) return actions.params.render.call(actions, actions);
      var groups = actions.groups;

      return ('\n      <div class="actions-modal' + (actions.params.grid ? ' actions-grid' : '') + '">\n        ' + groups.map(function (group) {
        return '<div class="actions-group">\n            ' + group.map(function (button) {
          var buttonClasses = ['actions-' + (button.label ? 'label' : 'button')];
          var color = button.color,
              bg = button.bg,
              bold = button.bold,
              disabled = button.disabled,
              label = button.label,
              text = button.text,
              icon = button.icon;

          if (color) buttonClasses.push('color-' + color);
          if (bg) buttonClasses.push('bg-color-' + bg);
          if (bold) buttonClasses.push('actions-button-bold');
          if (disabled) buttonClasses.push('disabled');
          if (label) {
            return '<div class="' + buttonClasses.join(' ') + '">' + text + '</div>';
          }
          return ('\n                <div class="' + buttonClasses.join(' ') + '">\n                  ' + (icon ? '<div class="actions-button-media">' + icon + '</div>' : '') + '\n                  <div class="actions-button-text">' + text + '</div>\n                </div>').trim();
        }).join('') + '\n          </div>';
      }).join('') + '\n      </div>\n    ').trim();
    }
  }, {
    key: 'renderPopover',
    value: function renderPopover() {
      var actions = this;
      if (actions.params.renderPopover) return actions.params.renderPopover.call(actions, actions);
      var groups = actions.groups;

      return ('\n      <div class="popover popover-from-actions">\n        <div class="popover-inner">\n          ' + groups.map(function (group) {
        return '\n            <div class="list">\n              <ul>\n                ' + group.map(function (button) {
          var itemClasses = [];
          var color = button.color,
              bg = button.bg,
              bold = button.bold,
              disabled = button.disabled,
              label = button.label,
              text = button.text,
              icon = button.icon;

          if (color) itemClasses.push('color-' + color);
          if (bg) itemClasses.push('bg-color-' + bg);
          if (bold) itemClasses.push('popover-from-actions-bold');
          if (disabled) itemClasses.push('disabled');
          if (label) {
            itemClasses.push('popover-from-actions-label');
            return '<li class="' + itemClasses.join(' ') + '">' + text + '</li>';
          }
          itemClasses.push('item-link');
          if (icon) {
            itemClasses.push('item-content');
            return '\n                      <li>\n                        <a class="' + itemClasses.join(' ') + '">\n                          <div class="item-media">\n                            ' + icon + '\n                          </div>\n                          <div class="item-inner">\n                            <div class="item-title">\n                              ' + text + '\n                            </div>\n                          </div>\n                        </a>\n                      </li>\n                    ';
          }
          itemClasses.push('list-button');
          return '\n                    <li>\n                      <a href="#" class="list-button ' + itemClasses.join(' ') + '">' + text + '</a>\n                    </li>\n                  ';
        }).join('') + '\n              </ul>\n            </div>\n          ';
      }).join('') + '\n        </div>\n      </div>\n    ').trim();
    }
  }]);

  return Actions;
}(_modalClass2.default);

exports.default = Actions;