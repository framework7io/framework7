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

var _badge = require('./badge');

var _badge2 = _interopRequireDefault(_badge);

var _reactComponentDispatchEvent = require('../runtime-helpers/react-component-dispatch-event.js');

var _reactComponentDispatchEvent2 = _interopRequireDefault(_reactComponentDispatchEvent);

var _reactComponentSlots = require('../runtime-helpers/react-component-slots.js');

var _reactComponentSlots2 = _interopRequireDefault(_reactComponentSlots);

var _reactComponentSetProps = require('../runtime-helpers/react-component-set-props.js');

var _reactComponentSetProps2 = _interopRequireDefault(_reactComponentSetProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var F7ListItemContent = function (_React$Component) {
  _inherits(F7ListItemContent, _React$Component);

  function F7ListItemContent(props, context) {
    _classCallCheck(this, F7ListItemContent);

    var _this = _possibleConstructorReturn(this, (F7ListItemContent.__proto__ || Object.getPrototypeOf(F7ListItemContent)).call(this, props, context));

    _this.__reactRefs = {};

    _this.state = function () {
      return {
        hasInput: false,
        hasInlineLabel: false,
        hasInputInfo: false,
        hasInputErrorMessage: false
      };
    }();
    return _this;
  }

  _createClass(F7ListItemContent, [{
    key: 'checkHasInputState',
    value: function checkHasInputState() {
      var self = this;
      var props = self.props;
      var itemInput = props.itemInput,
          inlineLabel = props.inlineLabel,
          itemInputWithInfo = props.itemInputWithInfo;

      var hasInput = itemInput || self.state.hasInput;
      var hasInlineLabel = inlineLabel || self.state.hasInlineLabel;
      var hasInputInfo = itemInputWithInfo || self.state.hasInputInfo;
      var hasInputErrorMessage = self.state.hasInputErrorMessage;

      if (hasInput && !self.state.hasInput) {
        self.hasInputSet = true;
        self.setState({
          hasInput: hasInput
        });
      } else if (!hasInput) {
        self.hasInputSet = false;
      }

      if (hasInputInfo && !self.state.hasInputInfo) {
        self.hasInputInfoSet = true;
        self.setState({
          hasInputInfo: hasInputInfo
        });
      } else if (!hasInputInfo) {
        self.hasInputInfoSet = false;
      }

      if (hasInputErrorMessage && !self.state.hasInputErrorMessage) {
        self.hasInputErrorMessageSet = true;
        self.setState({
          hasInputErrorMessage: hasInputErrorMessage
        });
      } else if (!hasInputInfo) {
        self.hasInputErrorMessageSet = false;
      }

      if (hasInlineLabel && !self.state.hasInlineLabel) {
        self.hasInlineLabelSet = true;
        self.setState({
          hasInlineLabel: hasInlineLabel
        });
      } else if (!hasInlineLabel) {
        self.hasInlineLabelSet = false;
      }
    }
  }, {
    key: 'onClick',
    value: function onClick(event) {
      this.dispatchEvent('click', event);
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      this.dispatchEvent('change', event);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var id = props.id,
          className = props.className,
          style = props.style,
          radio = props.radio,
          checkbox = props.checkbox,
          value = props.value,
          name = props.name,
          checked = props.checked,
          readonly = props.readonly,
          disabled = props.disabled,
          required = props.required,
          media = props.media,
          header = props.header,
          footer = props.footer,
          title = props.title,
          subtitle = props.subtitle,
          text = props.text,
          after = props.after,
          badge = props.badge,
          mediaList = props.mediaList,
          mediaItem = props.mediaItem,
          badgeColor = props.badgeColor,
          itemInput = props.itemInput,
          inlineLabel = props.inlineLabel,
          itemInputWithInfo = props.itemInputWithInfo;

      var hasInput = itemInput || self.state.hasInput;
      var hasInlineLabel = inlineLabel || self.state.hasInlineLabel;
      var hasInputInfo = itemInputWithInfo || self.state.hasInputInfo;
      var hasInputErrorMessage = self.state.hasInputErrorMessage;
      var slotsContentStart = [];
      var slotsContent = [];
      var slotsContentEnd = [];
      var slotsInnerStart = [];
      var slotsInner = [];
      var slotsInnerEnd = [];
      var slotsAfterStart = [];
      var slotsAfter = [];
      var slotsAfterEnd = [];
      var slotsMedia = [];
      var slotsBeforeTitle = [];
      var slotsTitle = [];
      var slotsAfterTitle = [];
      var slotsSubtitle = [];
      var slotsText = [];
      var slotsHeader = [];
      var slotsFooter = [];
      var titleEl = void 0;
      var afterWrapEl = void 0;
      var afterEl = void 0;
      var badgeEl = void 0;
      var innerEl = void 0;
      var titleRowEl = void 0;
      var subtitleEl = void 0;
      var textEl = void 0;
      var mediaEl = void 0;
      var inputEl = void 0;
      var inputIconEl = void 0;
      var headerEl = void 0;
      var footerEl = void 0;
      var slots = self.slots.default;
      var flattenSlots = [];

      if (slots && slots.length) {
        slots.forEach(function (slot) {
          if (Array.isArray(slot)) flattenSlots.push.apply(flattenSlots, _toConsumableArray(slot));else flattenSlots.push(slot);
        });
      }

      flattenSlots.forEach(function (child) {
        if (typeof child === 'undefined') return;
        {
          var tag = child.type && child.type.name;

          if (tag === 'F7Input') {
            hasInput = true;
            if (child.props && child.props.info) hasInputInfo = true;
            if (child.props && child.props.errorMessage && child.props.errorMessageForce) hasInputErrorMessage = true;
          }

          if (tag === 'F7Label') {
            if (child.props && child.props.inline) hasInlineLabel = true;
          }
        }
        var slotName = void 0;
        slotName = child.props ? child.props.slot : undefined;
        if (!slotName || slotName === 'inner') slotsInner.push(child);
        if (slotName === 'content-start') slotsContentStart.push(child);
        if (slotName === 'content') slotsContent.push(child);
        if (slotName === 'content-end') slotsContentEnd.push(child);
        if (slotName === 'after-start') slotsAfterStart.push(child);
        if (slotName === 'after') slotsAfter.push(child);
        if (slotName === 'after-end') slotsAfterEnd.push(child);
        if (slotName === 'media') slotsMedia.push(child);
        if (slotName === 'inner-start') slotsInnerStart.push(child);
        if (slotName === 'inner-end') slotsInnerEnd.push(child);
        if (slotName === 'before-title') slotsBeforeTitle.push(child);
        if (slotName === 'title') slotsTitle.push(child);
        if (slotName === 'after-title') slotsAfterTitle.push(child);
        if (slotName === 'subtitle') slotsSubtitle.push(child);
        if (slotName === 'text') slotsText.push(child);
        if (slotName === 'header') slotsHeader.push(child);
        if (slotName === 'footer') slotsFooter.push(child);
      });

      if (radio || checkbox) {
        {
          inputEl = _react2.default.createElement('input', {
            value: value,
            name: name,
            checked: checked,
            readOnly: readonly,
            disabled: disabled,
            required: required,
            type: radio ? 'radio' : 'checkbox',
            onChange: self.onChange.bind(self)
          });
        }
        inputIconEl = _react2.default.createElement('i', {
          className: 'icon icon-' + (radio ? 'radio' : 'checkbox')
        });
      }

      if (media || slotsMedia.length) {
        var mediaImgEl = void 0;

        if (media) {
          mediaImgEl = _react2.default.createElement('img', {
            src: media
          });
        }

        mediaEl = _react2.default.createElement('div', {
          className: 'item-media'
        }, mediaImgEl, slotsMedia);
      }

      var isMedia = mediaItem || mediaList;

      if (header || slotsHeader.length) {
        headerEl = _react2.default.createElement('div', {
          className: 'item-header'
        }, header, slotsHeader);
      }

      if (footer || slotsFooter.length) {
        footerEl = _react2.default.createElement('div', {
          className: 'item-footer'
        }, footer, slotsFooter);
      }

      if (title || slotsTitle.length || !isMedia && headerEl || !isMedia && footerEl) {
        titleEl = _react2.default.createElement('div', {
          className: 'item-title'
        }, !isMedia && headerEl, title, slotsTitle, !isMedia && footerEl);
      }

      if (subtitle || slotsSubtitle.length) {
        subtitleEl = _react2.default.createElement('div', {
          className: 'item-subtitle'
        }, subtitle, slotsSubtitle);
      }

      if (text || slotsText.length) {
        textEl = _react2.default.createElement('div', {
          className: 'item-text'
        }, text, slotsText);
      }

      if (after || badge || slotsAfter.length) {
        if (after) {
          afterEl = _react2.default.createElement('span', null, after);
        }

        if (badge) {
          badgeEl = _react2.default.createElement(_badge2.default, {
            color: badgeColor
          }, badge);
        }

        afterWrapEl = _react2.default.createElement('div', {
          className: 'item-after'
        }, slotsAfterStart, afterEl, badgeEl, slotsAfter, slotsAfterEnd);
      }

      if (isMedia) {
        titleRowEl = _react2.default.createElement('div', {
          className: 'item-title-row'
        }, slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl);
        innerEl = _react2.default.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['innerEl'] = __reactNode;
          },
          className: 'item-inner'
        }, slotsInnerStart, headerEl, titleRowEl, subtitleEl, textEl, slotsInner, footerEl, slotsInnerEnd);
      } else {
        innerEl = _react2.default.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['innerEl'] = __reactNode;
          },
          className: 'item-inner'
        }, slotsInnerStart, slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl, slotsInner, slotsInnerEnd);
      }

      var ItemContentTag = checkbox || radio ? 'label' : 'div';
      var classes = _utils2.default.classNames(className, 'item-content', {
        'item-checkbox': checkbox,
        'item-radio': radio,
        'item-input': hasInput,
        'inline-label': hasInlineLabel,
        'item-input-with-info': hasInputInfo,
        'item-input-with-error-message': hasInputErrorMessage,
        'item-input-invalid': hasInputErrorMessage
      }, _mixins2.default.colorClasses(props));
      return _react2.default.createElement(ItemContentTag, {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes,
        onClick: self.onClick.bind(self)
      }, slotsContentStart, inputEl, inputIconEl, mediaEl, innerEl, slotsContent, slotsContentEnd);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var self = this;
      var innerEl = self.refs.innerEl;
      if (!innerEl) return;
      var $innerEl = self.$$(innerEl);
      var $labelEl = $innerEl.children('.item-title.item-label');
      var $inputEl = $innerEl.children('.item-input-wrap');
      var hasInlineLabel = $labelEl.hasClass('item-label-inline');
      var hasInput = $inputEl.length > 0;
      var hasInputInfo = $inputEl.children('.item-input-info').length > 0;
      var hasInputErrorMessage = $inputEl.children('.item-input-error-message').length > 0;

      if (hasInlineLabel !== self.state.hasInlineLabel) {
        self.setState({
          hasInlineLabel: hasInlineLabel
        });
      }

      if (hasInput !== self.state.hasInput) {
        self.setState({
          hasInput: hasInput
        });
      }

      if (hasInputInfo !== self.state.hasInputInfo) {
        self.setState({
          hasInputInfo: hasInputInfo
        });
      }

      if (!self.hasInputErrorMessageSet && hasInputErrorMessage !== self.state.hasInputErrorMessage) {
        self.setState({
          hasInputErrorMessage: hasInputErrorMessage
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var innerEl = self.refs.innerEl;
      if (!innerEl) return;
      var $innerEl = self.$$(innerEl);
      var $labelEl = $innerEl.children('.item-title.item-label');
      var $inputEl = $innerEl.children('.item-input-wrap');
      var hasInlineLabel = $labelEl.hasClass('item-label-inline');
      var hasInput = $inputEl.length > 0;
      var hasInputInfo = $inputEl.children('.item-input-info').length > 0;
      var hasInputErrorMessage = $inputEl.children('.item-input-error-message').length > 0;

      if (!self.hasInlineLabelSet && hasInlineLabel !== self.state.hasInlineLabel) {
        self.setState({
          hasInlineLabel: hasInlineLabel
        });
      }

      if (!self.hasInputSet && hasInput !== self.state.hasInput) {
        self.setState({
          hasInput: hasInput
        });
      }

      if (!self.hasInputInfoSet && hasInputInfo !== self.state.hasInputInfo) {
        self.setState({
          hasInputInfo: hasInputInfo
        });
      }

      if (!self.hasInputErrorMessageSet && hasInputErrorMessage !== self.state.hasInputErrorMessage) {
        self.setState({
          hasInputErrorMessage: hasInputErrorMessage
        });
      }
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate() {
      this.checkHasInputState();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.checkHasInputState();
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
    key: 'slots',
    get: function get() {
      return (0, _reactComponentSlots2.default)(this.props);
    }
  }, {
    key: 'refs',
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7ListItemContent;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7ListItemContent, Object.assign({
  id: [String, Number],
  title: [String, Number],
  text: [String, Number],
  media: String,
  subtitle: [String, Number],
  header: [String, Number],
  footer: [String, Number],
  after: [String, Number],
  badge: [String, Number],
  badgeColor: String,
  mediaList: Boolean,
  mediaItem: Boolean,
  itemInput: Boolean,
  itemInputWithInfo: Boolean,
  inlineLabel: Boolean,
  checkbox: Boolean,
  checked: Boolean,
  radio: Boolean,
  name: String,
  value: [String, Number, Array],
  readonly: Boolean,
  required: Boolean,
  disabled: Boolean
}, _mixins2.default.colorProps));

exports.default = F7ListItemContent;