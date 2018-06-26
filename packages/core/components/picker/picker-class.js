'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _ssrWindow = require('ssr-window');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

var _pickerColumn = require('./picker-column');

var _pickerColumn2 = _interopRequireDefault(_pickerColumn);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Picker = function (_Framework7Class) {
  _inherits(Picker, _Framework7Class);

  function Picker(app) {
    var _ret2;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Picker);

    var _this = _possibleConstructorReturn(this, (Picker.__proto__ || Object.getPrototypeOf(Picker)).call(this, params, [app]));

    var picker = _this;
    picker.params = _utils2.default.extend({}, app.params.picker, params);

    var $containerEl = void 0;
    if (picker.params.containerEl) {
      var _ret;

      $containerEl = (0, _dom2.default)(picker.params.containerEl);
      if ($containerEl.length === 0) return _ret = picker, _possibleConstructorReturn(_this, _ret);
    }

    var $inputEl = void 0;
    if (picker.params.inputEl) {
      $inputEl = (0, _dom2.default)(picker.params.inputEl);
    }

    var view = void 0;
    if ($inputEl) {
      view = $inputEl.parents('.view').length && $inputEl.parents('.view')[0].f7View;
    }
    if (!view) view = app.views.main;

    _utils2.default.extend(picker, {
      app: app,
      $containerEl: $containerEl,
      containerEl: $containerEl && $containerEl[0],
      inline: $containerEl && $containerEl.length > 0,
      needsOriginFix: app.device.ios || _ssrWindow.window.navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && _ssrWindow.window.navigator.userAgent.toLowerCase().indexOf('chrome') < 0 && !app.device.android,
      cols: [],
      $inputEl: $inputEl,
      inputEl: $inputEl && $inputEl[0],
      initialized: false,
      opened: false,
      url: picker.params.url,
      view: view
    });

    function onResize() {
      picker.resizeCols();
    }
    function onInputClick() {
      picker.open();
    }
    function onInputFocus(e) {
      e.preventDefault();
    }
    function onHtmlClick(e) {
      var $targetEl = (0, _dom2.default)(e.target);
      if (picker.isPopover()) return;
      if (!picker.opened) return;
      if ($targetEl.closest('[class*="backdrop"]').length) return;
      if ($inputEl && $inputEl.length > 0) {
        if ($targetEl[0] !== $inputEl[0] && $targetEl.closest('.sheet-modal').length === 0) {
          picker.close();
        }
      } else if ((0, _dom2.default)(e.target).closest('.sheet-modal').length === 0) {
        picker.close();
      }
    }

    // Events
    _utils2.default.extend(picker, {
      attachResizeEvent: function attachResizeEvent() {
        app.on('resize', onResize);
      },
      detachResizeEvent: function detachResizeEvent() {
        app.off('resize', onResize);
      },
      attachInputEvents: function attachInputEvents() {
        picker.$inputEl.on('click', onInputClick);
        if (picker.params.inputReadOnly) {
          picker.$inputEl.on('focus mousedown', onInputFocus);
        }
      },
      detachInputEvents: function detachInputEvents() {
        picker.$inputEl.off('click', onInputClick);
        if (picker.params.inputReadOnly) {
          picker.$inputEl.off('focus mousedown', onInputFocus);
        }
      },
      attachHtmlEvents: function attachHtmlEvents() {
        app.on('click', onHtmlClick);
      },
      detachHtmlEvents: function detachHtmlEvents() {
        app.off('click', onHtmlClick);
      }
    });

    picker.init();

    return _ret2 = picker, _possibleConstructorReturn(_this, _ret2);
  }

  _createClass(Picker, [{
    key: 'initInput',
    value: function initInput() {
      var picker = this;
      if (!picker.$inputEl) return;
      if (picker.params.inputReadOnly) picker.$inputEl.prop('readOnly', true);
    }
  }, {
    key: 'resizeCols',
    value: function resizeCols() {
      var picker = this;
      if (!picker.opened) return;
      for (var i = 0; i < picker.cols.length; i += 1) {
        if (!picker.cols[i].divider) {
          picker.cols[i].calcSize();
          picker.cols[i].setValue(picker.cols[i].value, 0, false);
        }
      }
    }
  }, {
    key: 'isPopover',
    value: function isPopover() {
      var picker = this;
      var app = picker.app,
          modal = picker.modal,
          params = picker.params;

      if (params.openIn === 'sheet') return false;
      if (modal && modal.type !== 'popover') return false;

      if (!picker.inline && picker.inputEl) {
        if (params.openIn === 'popover') return true;
        if (app.device.ios) {
          return !!app.device.ipad;
        }if (app.width >= 768) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'formatValue',
    value: function formatValue() {
      var picker = this;
      var value = picker.value,
          displayValue = picker.displayValue;

      if (picker.params.formatValue) {
        return picker.params.formatValue.call(picker, value, displayValue);
      }
      return value.join(' ');
    }
  }, {
    key: 'setValue',
    value: function setValue(values, transition) {
      var picker = this;
      var valueIndex = 0;
      if (picker.cols.length === 0) {
        picker.value = values;
        picker.updateValue(values);
        return;
      }
      for (var i = 0; i < picker.cols.length; i += 1) {
        if (picker.cols[i] && !picker.cols[i].divider) {
          picker.cols[i].setValue(values[valueIndex], transition);
          valueIndex += 1;
        }
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var picker = this;
      return picker.value;
    }
  }, {
    key: 'updateValue',
    value: function updateValue(forceValues) {
      var picker = this;
      var newValue = forceValues || [];
      var newDisplayValue = [];
      var column = void 0;
      if (picker.cols.length === 0) {
        var noDividerColumns = picker.params.cols.filter(function (c) {
          return !c.divider;
        });
        for (var i = 0; i < noDividerColumns.length; i += 1) {
          column = noDividerColumns[i];
          if (column.displayValues !== undefined && column.values !== undefined && column.values.indexOf(newValue[i]) !== -1) {
            newDisplayValue.push(column.displayValues[column.values.indexOf(newValue[i])]);
          } else {
            newDisplayValue.push(newValue[i]);
          }
        }
      } else {
        for (var _i = 0; _i < picker.cols.length; _i += 1) {
          if (!picker.cols[_i].divider) {
            newValue.push(picker.cols[_i].value);
            newDisplayValue.push(picker.cols[_i].displayValue);
          }
        }
      }

      if (newValue.indexOf(undefined) >= 0) {
        return;
      }
      picker.value = newValue;
      picker.displayValue = newDisplayValue;
      picker.emit('local::change pickerChange', picker, picker.value, picker.displayValue);
      if (picker.inputEl) {
        picker.$inputEl.val(picker.formatValue());
        picker.$inputEl.trigger('change');
      }
    }
  }, {
    key: 'initColumn',
    value: function initColumn(colEl, updateItems) {
      var picker = this;
      _pickerColumn2.default.call(picker, colEl, updateItems);
    }
    // eslint-disable-next-line

  }, {
    key: 'destroyColumn',
    value: function destroyColumn(colEl) {
      var picker = this;
      var $colEl = (0, _dom2.default)(colEl);
      var index = $colEl.index();
      if (picker.cols[index] && picker.cols[index].destroy) {
        picker.cols[index].destroy();
      }
    }
  }, {
    key: 'renderToolbar',
    value: function renderToolbar() {
      var picker = this;
      if (picker.params.renderToolbar) return picker.params.renderToolbar.call(picker, picker);
      return ('\n      <div class="toolbar no-shadow">\n        <div class="toolbar-inner">\n          <div class="left"></div>\n          <div class="right">\n            <a href="#" class="link sheet-close popover-close">' + picker.params.toolbarCloseText + '</a>\n          </div>\n        </div>\n      </div>\n    ').trim();
    }
    // eslint-disable-next-line

  }, {
    key: 'renderColumn',
    value: function renderColumn(col, onlyItems) {
      var colClasses = 'picker-column ' + (col.textAlign ? 'picker-column-' + col.textAlign : '') + ' ' + (col.cssClass || '');
      var columnHtml = void 0;
      var columnItemsHtml = void 0;

      if (col.divider) {
        columnHtml = '\n        <div class="' + colClasses + ' picker-column-divider">' + col.content + '</div>\n      ';
      } else {
        columnItemsHtml = col.values.map(function (value, index) {
          return '\n        <div class="picker-item" data-picker-value="' + value + '">\n          <span>' + (col.displayValues ? col.displayValues[index] : value) + '</span>\n        </div>\n      ';
        }).join('');
        columnHtml = '\n        <div class="' + colClasses + '">\n          <div class="picker-items">' + columnItemsHtml + '</div>\n        </div>\n      ';
      }

      return onlyItems ? columnItemsHtml.trim() : columnHtml.trim();
    }
  }, {
    key: 'renderInline',
    value: function renderInline() {
      var picker = this;
      var _picker$params = picker.params,
          rotateEffect = _picker$params.rotateEffect,
          cssClass = _picker$params.cssClass,
          toolbar = _picker$params.toolbar;

      var inlineHtml = ('\n      <div class="picker picker-inline ' + (rotateEffect ? 'picker-3d' : '') + ' ' + (cssClass || '') + '">\n        ' + (toolbar ? picker.renderToolbar() : '') + '\n        <div class="picker-columns">\n          ' + picker.cols.map(function (col) {
        return picker.renderColumn(col);
      }).join('') + '\n          <div class="picker-center-highlight"></div>\n        </div>\n      </div>\n    ').trim();

      return inlineHtml;
    }
  }, {
    key: 'renderSheet',
    value: function renderSheet() {
      var picker = this;
      var _picker$params2 = picker.params,
          rotateEffect = _picker$params2.rotateEffect,
          cssClass = _picker$params2.cssClass,
          toolbar = _picker$params2.toolbar;

      var sheetHtml = ('\n      <div class="sheet-modal picker picker-sheet ' + (rotateEffect ? 'picker-3d' : '') + ' ' + (cssClass || '') + '">\n        ' + (toolbar ? picker.renderToolbar() : '') + '\n        <div class="sheet-modal-inner picker-columns">\n          ' + picker.cols.map(function (col) {
        return picker.renderColumn(col);
      }).join('') + '\n          <div class="picker-center-highlight"></div>\n        </div>\n      </div>\n    ').trim();

      return sheetHtml;
    }
  }, {
    key: 'renderPopover',
    value: function renderPopover() {
      var picker = this;
      var _picker$params3 = picker.params,
          rotateEffect = _picker$params3.rotateEffect,
          cssClass = _picker$params3.cssClass,
          toolbar = _picker$params3.toolbar;

      var popoverHtml = ('\n      <div class="popover picker-popover">\n        <div class="popover-inner">\n          <div class="picker ' + (rotateEffect ? 'picker-3d' : '') + ' ' + (cssClass || '') + '">\n            ' + (toolbar ? picker.renderToolbar() : '') + '\n            <div class="picker-columns">\n              ' + picker.cols.map(function (col) {
        return picker.renderColumn(col);
      }).join('') + '\n              <div class="picker-center-highlight"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ').trim();

      return popoverHtml;
    }
  }, {
    key: 'render',
    value: function render() {
      var picker = this;
      if (picker.params.render) return picker.params.render.call(picker);
      if (!picker.inline) {
        if (picker.isPopover()) return picker.renderPopover();
        return picker.renderSheet();
      }
      return picker.renderInline();
    }
  }, {
    key: 'onOpen',
    value: function onOpen() {
      var picker = this;
      var initialized = picker.initialized,
          $el = picker.$el,
          app = picker.app,
          $inputEl = picker.$inputEl,
          inline = picker.inline,
          value = picker.value,
          params = picker.params;

      picker.opened = true;

      // Init main events
      picker.attachResizeEvent();

      // Init cols
      $el.find('.picker-column').each(function (index, colEl) {
        var updateItems = true;
        if (!initialized && params.value || initialized && value) {
          updateItems = false;
        }
        picker.initColumn(colEl, updateItems);
      });

      // Set value
      if (!initialized) {
        if (value) picker.setValue(value, 0);else if (params.value) {
          picker.setValue(params.value, 0);
        }
      } else if (value) {
        picker.setValue(value, 0);
      }

      // Extra focus
      if (!inline && $inputEl.length && app.theme === 'md') {
        $inputEl.trigger('focus');
      }

      picker.initialized = true;

      // Trigger events
      if ($el) {
        $el.trigger('picker:open', picker);
      }
      if ($inputEl) {
        $inputEl.trigger('picker:open', picker);
      }
      picker.emit('local::open pickerOpen', picker);
    }
  }, {
    key: 'onOpened',
    value: function onOpened() {
      var picker = this;

      if (picker.$el) {
        picker.$el.trigger('picker:opened', picker);
      }
      if (picker.$inputEl) {
        picker.$inputEl.trigger('picker:opened', picker);
      }
      picker.emit('local::opened pickerOpened', picker);
    }
  }, {
    key: 'onClose',
    value: function onClose() {
      var picker = this;
      var app = picker.app;

      // Detach events
      picker.detachResizeEvent();

      picker.cols.forEach(function (col) {
        if (col.destroy) col.destroy();
      });
      if (picker.$inputEl && app.theme === 'md') {
        picker.$inputEl.trigger('blur');
      }

      if (picker.$el) {
        picker.$el.trigger('picker:close', picker);
      }
      if (picker.$inputEl) {
        picker.$inputEl.trigger('picker:close', picker);
      }
      picker.emit('local::close pickerClose', picker);
    }
  }, {
    key: 'onClosed',
    value: function onClosed() {
      var picker = this;
      picker.opened = false;

      if (!picker.inline) {
        _utils2.default.nextTick(function () {
          if (picker.modal && picker.modal.el && picker.modal.destroy) {
            if (!picker.params.routableModals) {
              picker.modal.destroy();
            }
          }
          delete picker.modal;
        });
      }

      if (picker.$el) {
        picker.$el.trigger('picker:closed', picker);
      }
      if (picker.$inputEl) {
        picker.$inputEl.trigger('picker:closed', picker);
      }
      picker.emit('local::closed pickerClosed', picker);
    }
  }, {
    key: 'open',
    value: function open() {
      var picker = this;
      var app = picker.app,
          opened = picker.opened,
          inline = picker.inline,
          $inputEl = picker.$inputEl;

      if (opened) return;
      if (picker.cols.length === 0 && picker.params.cols.length) {
        picker.params.cols.forEach(function (col) {
          picker.cols.push(col);
        });
      }
      if (inline) {
        picker.$el = (0, _dom2.default)(picker.render());
        picker.$el[0].f7Picker = picker;
        picker.$containerEl.append(picker.$el);
        picker.onOpen();
        picker.onOpened();
        return;
      }
      var isPopover = picker.isPopover();
      var modalType = isPopover ? 'popover' : 'sheet';
      var modalParams = {
        targetEl: $inputEl,
        scrollToEl: picker.params.scrollToInput ? $inputEl : undefined,
        content: picker.render(),
        backdrop: isPopover,
        on: {
          open: function open() {
            var modal = this;
            picker.modal = modal;
            picker.$el = isPopover ? modal.$el.find('.picker') : modal.$el;
            picker.$el[0].f7Picker = picker;
            picker.onOpen();
          },
          opened: function opened() {
            picker.onOpened();
          },
          close: function close() {
            picker.onClose();
          },
          closed: function closed() {
            picker.onClosed();
          }
        }
      };
      if (picker.params.routableModals) {
        picker.view.router.navigate({
          url: picker.url,
          route: _defineProperty({
            path: picker.url
          }, modalType, modalParams)
        });
      } else {
        picker.modal = app[modalType].create(modalParams);
        picker.modal.open();
      }
    }
  }, {
    key: 'close',
    value: function close() {
      var picker = this;
      var opened = picker.opened,
          inline = picker.inline;

      if (!opened) return;
      if (inline) {
        picker.onClose();
        picker.onClosed();
        return;
      }
      if (picker.params.routableModals) {
        picker.view.router.back();
      } else {
        picker.modal.close();
      }
    }
  }, {
    key: 'init',
    value: function init() {
      var picker = this;

      picker.initInput();

      if (picker.inline) {
        picker.open();
        picker.emit('local::init pickerInit', picker);
        return;
      }

      if (!picker.initialized && picker.params.value) {
        picker.setValue(picker.params.value);
      }

      // Attach input Events
      if (picker.$inputEl) {
        picker.attachInputEvents();
      }
      if (picker.params.closeByOutsideClick) {
        picker.attachHtmlEvents();
      }
      picker.emit('local::init pickerInit', picker);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var picker = this;
      if (picker.destroyed) return;
      var $el = picker.$el;

      picker.emit('local::beforeDestroy pickerBeforeDestroy', picker);
      if ($el) $el.trigger('picker:beforedestroy', picker);

      picker.close();

      // Detach Events
      if (picker.$inputEl) {
        picker.detachInputEvents();
      }
      if (picker.params.closeByOutsideClick) {
        picker.detachHtmlEvents();
      }

      if ($el && $el.length) delete picker.$el[0].f7Picker;
      _utils2.default.deleteProps(picker);
      picker.destroyed = true;
    }
  }]);

  return Picker;
}(_class2.default);

exports.default = Picker;