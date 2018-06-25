'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _reactComponentWatch = require('../runtime-helpers/react-component-watch.js');

var _reactComponentWatch2 = _interopRequireDefault(_reactComponentWatch);

var _reactComponentDispatchEvent = require('../runtime-helpers/react-component-dispatch-event.js');

var _reactComponentDispatchEvent2 = _interopRequireDefault(_reactComponentDispatchEvent);

var _reactComponentSetProps = require('../runtime-helpers/react-component-set-props.js');

var _reactComponentSetProps2 = _interopRequireDefault(_reactComponentSetProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var F7PhotoBrowser = function (_React$Component) {
  _inherits(F7PhotoBrowser, _React$Component);

  function F7PhotoBrowser(props, context) {
    _classCallCheck(this, F7PhotoBrowser);

    return _possibleConstructorReturn(this, (F7PhotoBrowser.__proto__ || Object.getPrototypeOf(F7PhotoBrowser)).call(this, props, context));
  }

  _createClass(F7PhotoBrowser, [{
    key: 'open',
    value: function open(index) {
      return this.f7PhotoBrowser.open(index);
    }
  }, {
    key: 'close',
    value: function close() {
      return this.f7PhotoBrowser.close();
    }
  }, {
    key: 'expositionToggle',
    value: function expositionToggle() {
      return this.f7PhotoBrowser.expositionToggle();
    }
  }, {
    key: 'expositionEnable',
    value: function expositionEnable() {
      return this.f7PhotoBrowser.expositionEnable();
    }
  }, {
    key: 'expositionDisable',
    value: function expositionDisable() {
      return this.f7PhotoBrowser.expositionDisable();
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      if (!self.props.init) return;
      self.$f7ready(function (f7) {
        var params = void 0;
        if (typeof self.props.params !== 'undefined') params = self.props.params;else params = Object.assign({}, self.props);
        Object.keys(params).forEach(function (param) {
          if (typeof params[param] === 'undefined' || params[param] === '') delete params[param];
        });
        params = _utils2.default.extend({}, params, {
          on: {
            open: function open() {
              self.dispatchEvent('photobrowser:open photoBrowserOpen');
            },
            close: function close() {
              self.dispatchEvent('photobrowser:close photoBrowserClose');
            },
            opened: function opened() {
              self.dispatchEvent('photobrowser:opened photoBrowserOpened');
            },
            closed: function closed() {
              self.dispatchEvent('photobrowser:closed photoBrowserClosed');
            },
            swipeToClose: function swipeToClose() {
              self.dispatchEvent('photobrowser:swipetoclose photoBrowserSwipeToClose');
            }
          }
        });
        self.f7PhotoBrowser = f7.photoBrowser.create(params);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7PhotoBrowser && self.f7PhotoBrowser.destroy) self.f7PhotoBrowser.destroy();
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(events) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return _reactComponentDispatchEvent2.default.apply(undefined, [this, events].concat(args));
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      (0, _reactComponentWatch2.default)(this, 'props.photos', prevProps, prevState, function (newValue) {
        var self = _this2;
        var pb = self.f7PhotoBrowser;
        if (!pb) return;
        self.f7PhotoBrowser.photos = newValue;

        if (pb.opened && pb.swiper) {
          pb.swiper.update();
        }
      });
    }
  }]);

  return F7PhotoBrowser;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7PhotoBrowser, {
  id: [String, Number],
  init: {
    type: Boolean,
    default: true
  },
  params: Object,
  photos: Array,
  exposition: {
    type: Boolean,
    default: true
  },
  expositionHideCaptions: {
    type: Boolean,
    default: false
  },
  type: {
    type: String
  },
  navbar: {
    type: Boolean,
    default: true
  },
  toolbar: {
    type: Boolean,
    default: true
  },
  theme: {
    type: String
  },
  captionsTheme: {
    type: String
  },
  iconsColor: {
    type: String
  },
  swipeToClose: {
    type: Boolean,
    default: true
  },
  backLinkText: {
    type: String
  },
  navbarOfText: {
    type: String
  },
  swiper: {
    type: Object
  },
  url: {
    type: String
  },
  routableModals: {
    type: Boolean,
    default: true
  },
  virtualSlides: {
    type: Boolean,
    default: true
  },
  view: [String, Object],
  renderNavbar: Function,
  renderToolbar: Function,
  renderCaption: Function,
  renderObject: Function,
  renderLazyPhoto: Function,
  renderPhoto: Function,
  renderPage: Function,
  renderPopup: Function,
  renderStandalone: Function
});

exports.default = F7PhotoBrowser;