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
import F7Icon from './icon';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7TreeviewItem =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7TreeviewItem, _React$Component);

  function F7TreeviewItem(props, context) {
    var _this;

    _classCallCheck(this, F7TreeviewItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7TreeviewItem).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onClick', 'onOpen', 'onClose', 'onLoadChildren']);
    })();

    return _this;
  }

  _createClass(F7TreeviewItem, [{
    key: "onClick",
    value: function onClick(event) {
      this.dispatchEvent('click', event);
    }
  }, {
    key: "onOpen",
    value: function onOpen(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('treeview:open treeviewOpen', el);
    }
  }, {
    key: "onClose",
    value: function onClose(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('treeview:close treeviewClose', el);
    }
  }, {
    key: "onLoadChildren",
    value: function onLoadChildren(el, done) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('treeview:loadchildren treeviewLoadChildren', el, done);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var id = props.id,
          style = props.style,
          toggle = props.toggle,
          label = props.label,
          icon = props.icon,
          iconMaterial = props.iconMaterial,
          iconF7 = props.iconF7,
          iconMd = props.iconMd,
          iconIos = props.iconIos,
          iconAurora = props.iconAurora,
          iconSize = props.iconSize,
          iconColor = props.iconColor,
          link = props.link;
      var slots = self.slots;
      var hasChildren = slots.default && slots.default.length || slots.children && slots.children.length || slots['children-start'] && slots['children-start'].length;
      var needToggle = typeof toggle === 'undefined' ? hasChildren : toggle;
      var iconEl;

      if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
        iconEl = React.createElement(F7Icon, {
          material: iconMaterial,
          f7: iconF7,
          icon: icon,
          md: iconMd,
          ios: iconIos,
          aurora: iconAurora,
          color: iconColor,
          size: iconSize
        });
      }

      var TreeviewRootTag = link || link === '' ? 'a' : 'div';
      return React.createElement('div', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes
      }, React.createElement(TreeviewRootTag, Object.assign({
        ref: function ref(__reactNode) {
          _this2.__reactRefs['rootEl'] = __reactNode;
        },
        className: self.itemRootClasses
      }, self.itemRootAttrs), this.slots['root-start'], needToggle && React.createElement('div', {
        className: 'treeview-toggle'
      }), React.createElement('div', {
        className: 'treeview-item-content'
      }, this.slots['content-start'], iconEl, this.slots['media'], React.createElement('div', {
        className: 'treeview-item-label'
      }, this.slots['label-start'], label, this.slots['label']), this.slots['content'], this.slots['content-end']), this.slots['root'], this.slots['root-end']), hasChildren && React.createElement('div', {
        className: 'treeview-item-children'
      }, this.slots['children-start'], this.slots['default'], this.slots['children']));
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      var _self$refs = self.refs,
          el = _self$refs.el,
          rootEl = _self$refs.rootEl;
      rootEl.removeEventListener('click', self.onClick);
      if (!el || self.$f7) return;
      self.$f7.off('treeviewOpen', self.onOpen);
      self.$f7.off('treeviewClose', self.onClose);
      self.$f7.off('treeviewLoadChildren', self.onLoadChildren);
      self.eventTargetEl = null;
      delete self.eventTargetEl;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var _self$refs2 = self.refs,
          el = _self$refs2.el,
          rootEl = _self$refs2.rootEl;
      rootEl.addEventListener('click', self.onClick);
      if (!el) return;
      self.eventTargetEl = el;
      self.$f7ready(function (f7) {
        f7.on('treeviewOpen', self.onOpen);
        f7.on('treeviewClose', self.onClose);
        f7.on('treeviewLoadChildren', self.onLoadChildren);
      });
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
    key: "itemRootAttrs",
    get: function get() {
      var self = this;
      var props = self.props;
      var link = props.link;
      var href = link;
      if (link === true) href = '#';
      if (link === false) href = undefined;
      return Utils.extend({
        href: href
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    }
  }, {
    key: "itemRootClasses",
    get: function get() {
      var self = this;
      var props = self.props;
      var selectable = props.selectable,
          selected = props.selected,
          itemToggle = props.itemToggle;
      return Utils.classNames('treeview-item-root', {
        'treeview-item-selectable': selectable,
        'treeview-item-selected': selected,
        'treeview-item-toggle': itemToggle
      }, Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
    }
  }, {
    key: "classes",
    get: function get() {
      var self = this;
      var props = self.props;
      var className = props.className,
          opened = props.opened,
          loadChildren = props.loadChildren;
      return Utils.classNames(className, 'treeview-item', {
        'treeview-item-opened': opened,
        'treeview-load-children': loadChildren
      }, Mixins.colorClasses(props));
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

  return F7TreeviewItem;
}(React.Component);

__reactComponentSetProps(F7TreeviewItem, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  toggle: {
    type: Boolean,
    default: undefined
  },
  itemToggle: Boolean,
  selectable: Boolean,
  selected: Boolean,
  opened: Boolean,
  label: String,
  loadChildren: Boolean,
  link: {
    type: [Boolean, String],
    default: undefined
  }
}, Mixins.colorProps, {}, Mixins.linkActionsProps, {}, Mixins.linkRouterProps, {}, Mixins.linkIconProps));

F7TreeviewItem.displayName = 'f7-treeview-item';
export default F7TreeviewItem;