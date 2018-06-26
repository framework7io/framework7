'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _toastClass = require('./toast-class');

var _toastClass2 = _interopRequireDefault(_toastClass);

var _modalMethods = require('../../utils/modal-methods');

var _modalMethods2 = _interopRequireDefault(_modalMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'toast',
  static: {
    Toast: _toastClass2.default
  },
  create: function create() {
    var app = this;
    app.toast = _utils2.default.extend({}, (0, _modalMethods2.default)({
      app: app,
      constructor: _toastClass2.default,
      defaultSelector: '.toast.modal-in'
    }), {
      // Shortcuts
      show: function show(params) {
        _utils2.default.extend(params, {
          destroyOnClose: true
        });
        return new _toastClass2.default(app, params).open();
      }
    });
  },

  params: {
    toast: {
      icon: null,
      text: null,
      position: 'bottom',
      closeButton: false,
      closeButtonColor: null,
      closeButtonText: 'Ok',
      closeTimeout: null,
      cssClass: null,
      render: null
    }
  }
};