function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
import F7Badge from './badge';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7ListItemContent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7ListItemContent, _React$Component);

  function F7ListItemContent(props, context) {
    var _this;

    _classCallCheck(this, F7ListItemContent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7ListItemContent).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), 'onClick onChange'.split(' '));
    })();

    return _this;
  }

  _createClass(F7ListItemContent, [{
    key: "onClick",
    value: function onClick(event) {
      this.dispatchEvent('click', event);
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      this.dispatchEvent('change', event);
    }
  }, {
    key: "render",
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
          defaultChecked = props.defaultChecked,
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
          badgeColor = props.badgeColor;
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
      var titleEl;
      var afterWrapEl;
      var afterEl;
      var badgeEl;
      var innerEl;
      var titleRowEl;
      var subtitleEl;
      var textEl;
      var mediaEl;
      var inputEl;
      var inputIconEl;
      var headerEl;
      var footerEl;
      var slots = self.slots.default;
      var flattenSlots = [];

      if (slots && slots.length) {
        slots.forEach(function (slot) {
          if (Array.isArray(slot)) flattenSlots.push.apply(flattenSlots, _toConsumableArray(slot));else flattenSlots.push(slot);
        });
      }

      flattenSlots.forEach(function (child) {
        if (typeof child === 'undefined') return;
        var slotName;
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
          inputEl = React.createElement('input', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['inputEl'] = __reactNode;
            },
            value: value,
            name: name,
            checked: checked,
            defaultChecked: defaultChecked,
            readOnly: readonly,
            disabled: disabled,
            required: required,
            type: radio ? 'radio' : 'checkbox',
            onChange: this.onChange
          });
        }
        inputIconEl = React.createElement('i', {
          className: "icon icon-".concat(radio ? 'radio' : 'checkbox')
        });
      }

      if (media || slotsMedia.length) {
        var mediaImgEl;

        if (media) {
          mediaImgEl = React.createElement('img', {
            src: media
          });
        }

        mediaEl = React.createElement('div', {
          className: 'item-media'
        }, mediaImgEl, slotsMedia);
      }

      var isMedia = mediaItem || mediaList;

      if (header || slotsHeader.length) {
        headerEl = React.createElement('div', {
          className: 'item-header'
        }, header, slotsHeader);
      }

      if (footer || slotsFooter.length) {
        footerEl = React.createElement('div', {
          className: 'item-footer'
        }, footer, slotsFooter);
      }

      if (title || slotsTitle.length || !isMedia && headerEl || !isMedia && footerEl) {
        titleEl = React.createElement('div', {
          className: 'item-title'
        }, !isMedia && headerEl, title, slotsTitle, !isMedia && footerEl);
      }

      if (subtitle || slotsSubtitle.length) {
        subtitleEl = React.createElement('div', {
          className: 'item-subtitle'
        }, subtitle, slotsSubtitle);
      }

      if (text || slotsText.length) {
        textEl = React.createElement('div', {
          className: 'item-text'
        }, text, slotsText);
      }

      if (after || badge || slotsAfter.length) {
        if (after) {
          afterEl = React.createElement('span', null, after);
        }

        if (badge) {
          badgeEl = React.createElement(F7Badge, {
            color: badgeColor
          }, badge);
        }

        afterWrapEl = React.createElement('div', {
          className: 'item-after'
        }, slotsAfterStart, afterEl, badgeEl, slotsAfter, slotsAfterEnd);
      }

      if (isMedia) {
        titleRowEl = React.createElement('div', {
          className: 'item-title-row'
        }, slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl);
        innerEl = React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['innerEl'] = __reactNode;
          },
          className: 'item-inner'
        }, slotsInnerStart, headerEl, titleRowEl, subtitleEl, textEl, slotsInner, footerEl, slotsInnerEnd);
      } else {
        innerEl = React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['innerEl'] = __reactNode;
          },
          className: 'item-inner'
        }, slotsInnerStart, slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl, slotsInner, slotsInnerEnd);
      }

      var ItemContentTag = checkbox || radio ? 'label' : 'div';
      var classes = Utils.classNames(className, 'item-content', {
        'item-checkbox': checkbox,
        'item-radio': radio
      }, Mixins.colorClasses(props));
      return React.createElement(ItemContentTag, {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, slotsContentStart, inputEl, inputIconEl, mediaEl, innerEl, slotsContent, slotsContentEnd);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      var el = self.refs.el;
      el.removeEventListener('click', self.onClick);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var self = this;
      var inputEl = self.refs.inputEl;
      var indeterminate = self.props.indeterminate;

      if (inputEl) {
        inputEl.indeterminate = indeterminate;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var _self$refs = self.refs,
          el = _self$refs.el,
          inputEl = _self$refs.inputEl;
      var indeterminate = self.props.indeterminate;

      if (indeterminate && inputEl) {
        inputEl.indeterminate = true;
      }

      el.addEventListener('click', self.onClick);
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
    key: "slots",
    get: function get() {
      return __reactComponentSlots(this.props);
    }
  }, {
    key: "refs",
    get: function get() {
      return this.__reactRefs;
    },
    set: function set(refs) {}
  }]);

  return F7ListItemContent;
}(React.Component);

__reactComponentSetProps(F7ListItemContent, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
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
  checkbox: Boolean,
  checked: Boolean,
  defaultChecked: Boolean,
  indeterminate: Boolean,
  radio: Boolean,
  name: String,
  value: [String, Number, Array],
  readonly: Boolean,
  required: Boolean,
  disabled: Boolean
}, Mixins.colorProps));

F7ListItemContent.displayName = 'f7-list-item-content';
export default F7ListItemContent;