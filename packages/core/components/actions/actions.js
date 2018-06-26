'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actionsClass = require('./actions-class');

var _actionsClass2 = _interopRequireDefault(_actionsClass);

var _modalMethods = require('../../utils/modal-methods');

var _modalMethods2 = _interopRequireDefault(_modalMethods);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'actions',
  params: {
    actions: {
      convertToPopover: true,
      forceToPopover: false,
      closeByBackdropClick: true,
      render: null,
      renderPopover: null,
      backdrop: true
    }
  },
  static: {
    Actions: _actionsClass2.default
  },
  create: function create() {
    var app = this;
    app.actions = (0, _modalMethods2.default)({
      app: app,
      constructor: _actionsClass2.default,
      defaultSelector: '.actions-modal.modal-in'
    });
  },

  clicks: {
    '.actions-open': function openActions($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      app.actions.open(data.actions, data.animate);
    },
    '.actions-close': function closeActions($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      app.actions.close(data.actions, data.animate);
    }
  }
};