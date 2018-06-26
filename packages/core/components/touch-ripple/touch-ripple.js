'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _touchRippleClass = require('./touch-ripple-class');

var _touchRippleClass2 = _interopRequireDefault(_touchRippleClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'touch-ripple',
  static: {
    TouchRipple: _touchRippleClass2.default
  },
  create: function create() {
    var app = this;
    app.touchRipple = {
      create: function create() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return new (Function.prototype.bind.apply(_touchRippleClass2.default, [null].concat(args)))();
      }
    };
  }
};