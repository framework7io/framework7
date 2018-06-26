'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modalClass = require('./modal-class');

var _modalClass2 = _interopRequireDefault(_modalClass);

var _customModalClass = require('./custom-modal-class');

var _customModalClass2 = _interopRequireDefault(_customModalClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'modal',
  static: {
    Modal: _modalClass2.default,
    CustomModal: _customModalClass2.default
  },
  create: function create() {
    var app = this;
    app.customModal = {
      create: function create(params) {
        return new _customModalClass2.default(app, params);
      }
    };
  },

  params: {
    modal: {
      moveToRoot: true,
      queueDialogs: true
    }
  }
};