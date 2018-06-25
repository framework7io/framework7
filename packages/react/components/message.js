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

var _reactComponentDispatchEvent = require('../runtime-helpers/react-component-dispatch-event.js');

var _reactComponentDispatchEvent2 = _interopRequireDefault(_reactComponentDispatchEvent);

var _reactComponentSlots = require('../runtime-helpers/react-component-slots.js');

var _reactComponentSlots2 = _interopRequireDefault(_reactComponentSlots);

var _reactComponentSetProps = require('../runtime-helpers/react-component-set-props.js');

var _reactComponentSetProps2 = _interopRequireDefault(_reactComponentSetProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var F7Message = function (_React$Component) {
  _inherits(F7Message, _React$Component);

  function F7Message(props, context) {
    _classCallCheck(this, F7Message);

    var _this = _possibleConstructorReturn(this, (F7Message.__proto__ || Object.getPrototypeOf(F7Message)).call(this, props, context));

    (function () {
      _this.onClickBound = _this.onClick.bind(_this);
      _this.onNameClickBound = _this.onNameClick.bind(_this);
      _this.onTextClickBound = _this.onTextClick.bind(_this);
      _this.onAvatarClickBound = _this.onAvatarClick.bind(_this);
      _this.onHeaderClickBound = _this.onHeaderClick.bind(_this);
      _this.onFooterClickBound = _this.onFooterClick.bind(_this);
      _this.onBubbleClickBound = _this.onBubbleClick.bind(_this);
    })();
    return _this;
  }

  _createClass(F7Message, [{
    key: 'onClick',
    value: function onClick(event) {
      this.dispatchEvent('click', event);
    }
  }, {
    key: 'onNameClick',
    value: function onNameClick(event) {
      this.dispatchEvent('click:name clickName', event);
    }
  }, {
    key: 'onTextClick',
    value: function onTextClick(event) {
      this.dispatchEvent('click:text clickText', event);
    }
  }, {
    key: 'onAvatarClick',
    value: function onAvatarClick(event) {
      this.dispatchEvent('click:avatar clickAvatar', event);
    }
  }, {
    key: 'onHeaderClick',
    value: function onHeaderClick(event) {
      this.dispatchEvent('click:header clickHeader', event);
    }
  }, {
    key: 'onFooterClick',
    value: function onFooterClick(event) {
      this.dispatchEvent('click:footer clickFooter', event);
    }
  }, {
    key: 'onBubbleClick',
    value: function onBubbleClick(event) {
      this.dispatchEvent('click:bubble clickBubble', event);
    }
  }, {
    key: 'render',
    value: function render() {
      var self = this;
      var props = self.props;
      var text = props.text,
          name = props.name,
          avatar = props.avatar,
          image = props.image,
          header = props.header,
          footer = props.footer,
          textHeader = props.textHeader,
          textFooter = props.textFooter,
          typing = props.typing,
          id = props.id,
          style = props.style;
      var _self$slots = self.slots,
          slotsStart = _self$slots.start,
          slotsEnd = _self$slots.end,
          slotsDefault = _self$slots.default,
          slotsContentStart = _self$slots['content-start'],
          slotsContentEnd = _self$slots['content-end'],
          slotsAvatar = _self$slots.avatar,
          slotsName = _self$slots.name,
          slotsHeader = _self$slots.header,
          slotsFooter = _self$slots.footer,
          slotsImage = _self$slots.image,
          slotsText = _self$slots.text,
          slotsTextHeader = _self$slots['text-header'],
          slotsTextFooter = _self$slots['text-footer'],
          slotsBubbleStart = _self$slots['bubble-start'],
          slotsBubbleEnd = _self$slots['bubble-end'];

      return _react2.default.createElement('div', {
        id: id,
        style: style,
        className: self.classes,
        onClick: self.onClickBound
      }, slotsStart, (avatar || slotsAvatar) && _react2.default.createElement('div', {
        className: 'message-avatar',
        style: {
          backgroundImage: avatar && 'url(' + avatar + ')'
        },
        onClick: self.onAvatarClickBound
      }, slotsAvatar), _react2.default.createElement('div', {
        className: 'message-content'
      }, slotsContentStart, (slotsName || name) && _react2.default.createElement('div', {
        className: 'message-name',
        onClick: self.onNameClickBound
      }, slotsName || name), (slotsHeader || header) && _react2.default.createElement('div', {
        className: 'message-header',
        onClick: self.onHeaderClickBound
      }, slotsHeader || header), _react2.default.createElement('div', {
        className: 'message-bubble',
        onClick: self.onBubbleClickBound
      }, slotsBubbleStart, (slotsImage || image) && _react2.default.createElement('div', {
        className: 'message-image'
      }, slotsImage || _react2.default.createElement('img', {
        src: image
      })), (slotsTextHeader || textHeader) && _react2.default.createElement('div', {
        className: 'message-text-header'
      }, slotsTextHeader || textHeader), (slotsText || text || typing) && _react2.default.createElement('div', {
        className: 'message-text',
        onClick: self.onTextClickBound
      }, slotsText || text, typing && _react2.default.createElement('div', {
        className: 'message-typing-indicator'
      }, _react2.default.createElement('div', null), _react2.default.createElement('div', null), _react2.default.createElement('div', null))), (slotsTextFooter || textFooter) && _react2.default.createElement('div', {
        className: 'message-text-footer'
      }, slotsTextFooter || textFooter), slotsBubbleEnd, slotsDefault), (slotsFooter || footer) && _react2.default.createElement('div', {
        className: 'message-footer',
        onClick: self.onFooterClickBound
      }, slotsFooter || footer), slotsContentEnd), slotsEnd);
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
    key: 'classes',
    get: function get() {
      var self = this;
      var props = self.props;
      var type = props.type,
          typing = props.typing,
          first = props.first,
          last = props.last,
          tail = props.tail,
          sameName = props.sameName,
          sameHeader = props.sameHeader,
          sameFooter = props.sameFooter,
          sameAvatar = props.sameAvatar,
          className = props.className;

      return _utils2.default.classNames(className, 'message', {
        'message-sent': type === 'sent',
        'message-received': type === 'received',
        'message-typing': typing,
        'message-first': first,
        'message-last': last,
        'message-tail': tail,
        'message-same-name': sameName,
        'message-same-header': sameHeader,
        'message-same-footer': sameFooter,
        'message-same-avatar': sameAvatar
      }, _mixins2.default.colorClasses(props));
    }
  }, {
    key: 'slots',
    get: function get() {
      return (0, _reactComponentSlots2.default)(this.props);
    }
  }]);

  return F7Message;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Message, Object.assign({
  id: [String, Number],
  text: String,
  name: String,
  avatar: String,
  type: {
    type: String,
    default: 'sent'
  },
  image: String,
  header: String,
  footer: String,
  textHeader: String,
  textFooter: String,
  first: Boolean,
  last: Boolean,
  tail: Boolean,
  sameName: Boolean,
  sameHeader: Boolean,
  sameFooter: Boolean,
  sameAvatar: Boolean,
  typing: Boolean
}, _mixins2.default.colorProps));

exports.default = F7Message;