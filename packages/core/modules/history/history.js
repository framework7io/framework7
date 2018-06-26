'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _history = require('../../utils/history');

var _history2 = _interopRequireDefault(_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'history',
  static: {
    history: _history2.default
  },
  on: {
    init: function init() {
      _history2.default.init(this);
    }
  }
};