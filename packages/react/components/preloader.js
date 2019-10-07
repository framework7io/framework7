function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7Preloader =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Preloader, _React$Component);

  function F7Preloader(props, context) {
    var _this;

    _classCallCheck(this, F7Preloader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Preloader).call(this, props, context));

    _this.state = function () {
      var self = _assertThisInitialized(_this);

      var $f7 = self.$f7;

      if (!$f7) {
        self.$f7ready(function () {
          self.setState({
            _theme: self.$theme
          });
        });
      }

      return {
        _theme: $f7 ? self.$theme : null
      };
    }();

    return _this;
  }

  _createClass(F7Preloader, [{
    key: "render",
    value: function render() {
      var self = this;
      var sizeComputed = self.sizeComputed,
          props = self.props;
      var id = props.id,
          style = props.style,
          className = props.className;
      var theme = self.state._theme;
      var preloaderStyle = {};

      if (sizeComputed) {
        preloaderStyle.width = "".concat(sizeComputed, "px");
        preloaderStyle.height = "".concat(sizeComputed, "px");
        preloaderStyle['--f7-preloader-size'] = "".concat(sizeComputed, "px");
      }

      if (style) Utils.extend(preloaderStyle, style || {});
      var innerEl;

      if (theme && theme.md) {
        innerEl = React.createElement('span', {
          className: 'preloader-inner'
        }, React.createElement('span', {
          className: 'preloader-inner-gap'
        }), React.createElement('span', {
          className: 'preloader-inner-left'
        }, React.createElement('span', {
          className: 'preloader-inner-half-circle'
        })), React.createElement('span', {
          className: 'preloader-inner-right'
        }, React.createElement('span', {
          className: 'preloader-inner-half-circle'
        })));
      } else if (theme && theme.ios) {
        innerEl = React.createElement('span', {
          className: 'preloader-inner'
        }, React.createElement('span', {
          className: 'preloader-inner-line'
        }), React.createElement('span', {
          className: 'preloader-inner-line'
        }), React.createElement('span', {
          className: 'preloader-inner-line'
        }), React.createElement('span', {
          className: 'preloader-inner-line'
        }), React.createElement('span', {
          className: 'preloader-inner-line'
        }), React.createElement('span', {
          className: 'preloader-inner-line'
        }), React.createElement('span', {
          className: 'preloader-inner-line'
        }), React.createElement('span', {
          className: 'preloader-inner-line'
        }), React.createElement('span', {
          className: 'preloader-inner-line'
        }), React.createElement('span', {
          className: 'preloader-inner-line'
        }), React.createElement('span', {
          className: 'preloader-inner-line'
        }), React.createElement('span', {
          className: 'preloader-inner-line'
        }));
      } else if (theme && theme.aurora) {
        innerEl = React.createElement('span', {
          className: 'preloader-inner'
        }, React.createElement('span', {
          className: 'preloader-inner-circle'
        }));
      }

      var classes = Utils.classNames(className, 'preloader', Mixins.colorClasses(props));
      return React.createElement('span', {
        id: id,
        style: preloaderStyle,
        className: classes
      }, innerEl);
    }
  }, {
    key: "sizeComputed",
    get: function get() {
      var s = this.props.size;

      if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
        s = s.replace('px', '');
      }

      return s;
    }
  }]);

  return F7Preloader;
}(React.Component);

__reactComponentSetProps(F7Preloader, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  size: [Number, String]
}, Mixins.colorProps));

F7Preloader.displayName = 'f7-preloader';
export default F7Preloader;