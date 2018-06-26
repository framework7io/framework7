'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _popoverClass = require('./popover-class');

var _popoverClass2 = _interopRequireDefault(_popoverClass);

var _modalMethods = require('../../utils/modal-methods');

var _modalMethods2 = _interopRequireDefault(_modalMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'popover',
  params: {
    popover: {
      closeByBackdropClick: true,
      closeByOutsideClick: false,
      backdrop: true
    }
  },
  static: {
    Popover: _popoverClass2.default
  },
  create: function create() {
    var app = this;
    app.popover = _utils2.default.extend((0, _modalMethods2.default)({
      app: app,
      constructor: _popoverClass2.default,
      defaultSelector: '.popover.modal-in'
    }), {
      open: function open(popoverEl, targetEl, animate) {
        var $popoverEl = (0, _dom2.default)(popoverEl);
        var popover = $popoverEl[0].f7Modal;
        if (!popover) popover = new _popoverClass2.default(app, { el: $popoverEl, targetEl: targetEl });
        return popover.open(targetEl, animate);
      }
    });
  },

  clicks: {
    '.popover-open': function openPopover($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      app.popover.open(data.popover, $clickedEl, data.animate);
    },
    '.popover-close': function closePopover($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      app.popover.close(data.popover, data.animate);
    }
  }
};