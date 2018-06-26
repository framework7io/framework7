'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _popupClass = require('./popup-class');

var _popupClass2 = _interopRequireDefault(_popupClass);

var _modalMethods = require('../../utils/modal-methods');

var _modalMethods2 = _interopRequireDefault(_modalMethods);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'popup',
  params: {
    popup: {
      backdrop: true,
      closeByBackdropClick: true
    }
  },
  static: {
    Popup: _popupClass2.default
  },
  create: function create() {
    var app = this;
    app.popup = (0, _modalMethods2.default)({
      app: app,
      constructor: _popupClass2.default,
      defaultSelector: '.popup.modal-in'
    });
  },

  clicks: {
    '.popup-open': function openPopup($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      app.popup.open(data.popup, data.animate);
    },
    '.popup-close': function closePopup($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      app.popup.close(data.popup, data.animate);
    }
  }
};