function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React from 'react';
import Utils from '../utils/utils';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7PhotoBrowser =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7PhotoBrowser, _React$Component);

  function F7PhotoBrowser(props, context) {
    _classCallCheck(this, F7PhotoBrowser);

    return _possibleConstructorReturn(this, _getPrototypeOf(F7PhotoBrowser).call(this, props, context));
  }

  _createClass(F7PhotoBrowser, [{
    key: "open",
    value: function open(index) {
      return this.f7PhotoBrowser.open(index);
    }
  }, {
    key: "close",
    value: function close() {
      return this.f7PhotoBrowser.close();
    }
  }, {
    key: "expositionToggle",
    value: function expositionToggle() {
      return this.f7PhotoBrowser.expositionToggle();
    }
  }, {
    key: "expositionEnable",
    value: function expositionEnable() {
      return this.f7PhotoBrowser.expositionEnable();
    }
  }, {
    key: "expositionDisable",
    value: function expositionDisable() {
      return this.f7PhotoBrowser.expositionDisable();
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      if (!self.props.init) return;
      self.$f7ready(function (f7) {
        var params;
        if (typeof self.props.params !== 'undefined') params = self.props.params;else params = Object.assign({}, self.props);
        Object.keys(params).forEach(function (param) {
          if (typeof params[param] === 'undefined' || params[param] === '') delete params[param];
        });
        params = Utils.extend({}, params, {
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
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      if (self.f7PhotoBrowser && self.f7PhotoBrowser.destroy) self.f7PhotoBrowser.destroy();
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this = this;

      __reactComponentWatch(this, 'props.photos', prevProps, prevState, function (newValue) {
        var self = _this;
        var pb = self.f7PhotoBrowser;
        if (!pb) return;
        self.f7PhotoBrowser.params.photos = newValue;

        if (pb.opened && pb.swiper) {
          pb.swiper.update();
        }
      });
    }
  }]);

  return F7PhotoBrowser;
}(React.Component);

__reactComponentSetProps(F7PhotoBrowser, {
  id: [String, Number],
  className: String,
  style: Object,
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
  pageBackLinkText: {
    type: String,
    default: undefined
  },
  popupCloseLinkText: {
    type: String,
    default: undefined
  },
  navbarOfText: {
    type: String,
    default: undefined
  },
  navbarShowCount: {
    type: Boolean,
    default: undefined
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

F7PhotoBrowser.displayName = 'f7-photo-browser';
export default F7PhotoBrowser;