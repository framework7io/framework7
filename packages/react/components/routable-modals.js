'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _f = require('../utils/f7');

var _f2 = _interopRequireDefault(_f);

var _events = require('../utils/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var F7RoutableModals = function (_React$Component) {
  _inherits(F7RoutableModals, _React$Component);

  function F7RoutableModals(props, context) {
    _classCallCheck(this, F7RoutableModals);

    var _this = _possibleConstructorReturn(this, (F7RoutableModals.__proto__ || Object.getPrototypeOf(F7RoutableModals)).call(this, props, context));

    _this.__reactRefs = {};

    _this.state = function () {
      return {
        modals: []
      };
    }();
    return _this;
  }

  _createClass(F7RoutableModals, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        className: 'framework7-modals'
      }, this.state.modals.map(function (modal) {
        var ModalComponent = modal.component;
        {
          return _react2.default.createElement(ModalComponent, Object.assign({
            key: modal.id
          }, modal.props));
        }
      }));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      self.setState({
        modals: []
      });
      self.routerData = {
        el: el,
        component: self
      };
      _f2.default.routers.modals = self.routerData;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      if (!self.routerData) return;
      _f2.default.routers.modals = null;
      self.routerData = null;
      delete self.routerData;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var self = this;
      if (!self.routerData) return;
      _events2.default.emit('modalsRouterDidUpdate', self.routerData);
    }
  }, {
    key: 'refs',
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7RoutableModals;
}(_react2.default.Component);

exports.default = F7RoutableModals;