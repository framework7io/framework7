'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _mixins = require('../utils/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _reactComponentSlots = require('../runtime-helpers/react-component-slots.js');

var _reactComponentSlots2 = _interopRequireDefault(_reactComponentSlots);

var _reactComponentSetProps = require('../runtime-helpers/react-component-set-props.js');

var _reactComponentSetProps2 = _interopRequireDefault(_reactComponentSetProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var F7CardFooter = function (_React$Component) {
  _inherits(F7CardFooter, _React$Component);

  function F7CardFooter(props, context) {
    _classCallCheck(this, F7CardFooter);

    return _possibleConstructorReturn(this, (F7CardFooter.__proto__ || Object.getPrototypeOf(F7CardFooter)).call(this, props, context));
  }

  _createClass(F7CardFooter, [{
    key: 'render',
    value: function render() {
      var props = this.props;
      var className = props.className,
          id = props.id,
          style = props.style;

      var classes = _utils2.default.classNames(className, 'card-footer', _mixins2.default.colorClasses(props));
      return _react2.default.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    }
  }, {
    key: 'slots',
    get: function get() {
      return (0, _reactComponentSlots2.default)(this.props);
    }
  }]);

  return F7CardFooter;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7CardFooter, Object.assign({
  id: [String, Number]
}, _mixins2.default.colorProps));

exports.default = F7CardFooter;