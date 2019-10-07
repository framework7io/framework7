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
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

var F7List =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7List, _React$Component);

  function F7List(props, context) {
    var _this;

    _classCallCheck(this, F7List);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7List).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onSortableEnable', 'onSortableDisable', 'onSortableSort', 'onTabShow', 'onTabHide', 'onSubmit']);
    })();

    return _this;
  }

  _createClass(F7List, [{
    key: "onSubmit",
    value: function onSubmit(event) {
      this.dispatchEvent('submit', event);
    }
  }, {
    key: "onSortableEnable",
    value: function onSortableEnable(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('sortable:enable sortableEnable');
    }
  }, {
    key: "onSortableDisable",
    value: function onSortableDisable(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('sortable:disable sortableDisable');
    }
  }, {
    key: "onSortableSort",
    value: function onSortableSort(el, sortData, listEl) {
      if (this.eventTargetEl !== listEl) return;
      this.dispatchEvent('sortable:sort sortableSort', sortData);
    }
  }, {
    key: "onTabShow",
    value: function onTabShow(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tab:show tabShow');
    }
  }, {
    key: "onTabHide",
    value: function onTabHide(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tab:hide tabHide');
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var id = props.id,
          style = props.style,
          form = props.form,
          sortableMoveElements = props.sortableMoveElements;
      var _self$slots = self.slots,
          slotsList = _self$slots.list,
          slotsDefault = _self$slots.default;
      var rootChildrenBeforeList = [];
      var rootChildrenAfterList = [];
      var ulChildren = slotsList || [];
      var flattenSlots = Utils.flattenArray(slotsDefault);
      var wasUlChild = false;
      flattenSlots.forEach(function (child) {
        if (typeof child === 'undefined') return;
        var tag;
        {
          tag = child.type && (child.type.displayName || child.type.name);

          if (!tag && typeof child.type === 'string') {
            tag = child.type;
          }
        }

        if (!tag && 'react' === 'react' || tag && !(tag === 'li' || tag === 'F7ListItem' || tag === 'F7ListButton' || tag === 'F7ListInput' || tag.indexOf('list-item') >= 0 || tag.indexOf('list-button') >= 0 || tag.indexOf('list-input') >= 0 || tag.indexOf('f7-list-item') >= 0 || tag.indexOf('f7-list-button') >= 0 || tag.indexOf('f7-list-input') >= 0)) {
          if (wasUlChild) rootChildrenAfterList.push(child);else rootChildrenBeforeList.push(child);
        } else if (tag) {
          wasUlChild = true;
          ulChildren.push(child);
        }
      });
      var ListTag = form ? 'form' : 'div';

      if (ulChildren.length > 0) {
        return React.createElement(ListTag, {
          id: id,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          style: style,
          className: self.classes,
          'data-sortable-move-elements': typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined
        }, self.slots['before-list'], rootChildrenBeforeList, React.createElement('ul', null, ulChildren), self.slots['after-list'], rootChildrenAfterList);
      } else {
        return React.createElement(ListTag, {
          id: id,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          style: style,
          className: self.classes,
          'data-sortable-move-elements': typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined
        }, self.slots['before-list'], rootChildrenBeforeList, self.slots['after-list'], rootChildrenAfterList);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      var el = self.refs.el;
      var f7 = self.$f7;
      if (!el || !f7) return;
      f7.off('sortableEnable', self.onSortableEnable);
      f7.off('sortableDisable', self.onSortableDisable);
      f7.off('sortableSort', self.onSortableSort);
      f7.off('tabShow', self.onTabShow);
      f7.off('tabHide', self.onTabHide);
      el.removeEventListener('submit', self.onSubmit);
      self.eventTargetEl = null;
      delete self.eventTargetEl;
      if (!(self.virtualList && self.f7VirtualList)) return;
      if (self.f7VirtualList.destroy) self.f7VirtualList.destroy();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      var _self$props = self.props,
          virtualList = _self$props.virtualList,
          virtualListParams = _self$props.virtualListParams,
          form = _self$props.form;
      self.$f7ready(function (f7) {
        self.eventTargetEl = el;
        f7.on('sortableEnable', self.onSortableEnable);
        f7.on('sortableDisable', self.onSortableDisable);
        f7.on('sortableSort', self.onSortableSort);
        f7.on('tabShow', self.onTabShow);
        f7.on('tabHide', self.onTabHide);

        if (form) {
          el.addEventListener('submit', self.onSubmit);
        }

        if (!virtualList) return;
        var vlParams = virtualListParams || {};
        if (!vlParams.renderItem && !vlParams.itemTemplate && !vlParams.renderExternal) return;
        self.f7VirtualList = f7.virtualList.create(Utils.extend({
          el: el,
          on: {
            itemBeforeInsert: function itemBeforeInsert(itemEl, item) {
              var vl = this;
              self.dispatchEvent('virtual:itembeforeinsert virtualItemBeforeInsert', vl, itemEl, item);
            },
            beforeClear: function beforeClear(fragment) {
              var vl = this;
              self.dispatchEvent('virtual:beforeclear virtualBeforeClear', vl, fragment);
            },
            itemsBeforeInsert: function itemsBeforeInsert(fragment) {
              var vl = this;
              self.dispatchEvent('virtual:itemsbeforeinsert virtualItemsBeforeInsert', vl, fragment);
            },
            itemsAfterInsert: function itemsAfterInsert(fragment) {
              var vl = this;
              self.dispatchEvent('virtual:itemsafterinsert virtualItemsAfterInsert', vl, fragment);
            }
          }
        }, vlParams));
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
    key: "classes",
    get: function get() {
      var self = this;
      var props = self.props;
      var inset = props.inset,
          xsmallInset = props.xsmallInset,
          smallInset = props.smallInset,
          mediumInset = props.mediumInset,
          largeInset = props.largeInset,
          xlargeInset = props.xlargeInset,
          mediaList = props.mediaList,
          simpleList = props.simpleList,
          linksList = props.linksList,
          sortable = props.sortable,
          sortableTapHold = props.sortableTapHold,
          sortableEnabled = props.sortableEnabled,
          accordionList = props.accordionList,
          contactsList = props.contactsList,
          virtualList = props.virtualList,
          tab = props.tab,
          tabActive = props.tabActive,
          noHairlines = props.noHairlines,
          noHairlinesIos = props.noHairlinesIos,
          noHairlinesMd = props.noHairlinesMd,
          noHairlinesAurora = props.noHairlinesAurora,
          noHairlinesBetween = props.noHairlinesBetween,
          noHairlinesBetweenIos = props.noHairlinesBetweenIos,
          noHairlinesBetweenMd = props.noHairlinesBetweenMd,
          noHairlinesBetweenAurora = props.noHairlinesBetweenAurora,
          formStoreData = props.formStoreData,
          inlineLabels = props.inlineLabels,
          className = props.className,
          noChevron = props.noChevron,
          chevronCenter = props.chevronCenter;
      return Utils.classNames(className, 'list', {
        inset: inset,
        'xsmall-inset': xsmallInset,
        'small-inset': smallInset,
        'medium-inset': mediumInset,
        'large-inset': largeInset,
        'xlarge-inset': xlargeInset,
        'media-list': mediaList,
        'simple-list': simpleList,
        'links-list': linksList,
        sortable: sortable,
        'sortable-tap-hold': sortableTapHold,
        'sortable-enabled': sortableEnabled,
        'accordion-list': accordionList,
        'contacts-list': contactsList,
        'virtual-list': virtualList,
        tab: tab,
        'tab-active': tabActive,
        'no-hairlines': noHairlines,
        'no-hairlines-md': noHairlinesMd,
        'no-hairlines-ios': noHairlinesIos,
        'no-hairlines-aurora': noHairlinesAurora,
        'no-hairlines-between': noHairlinesBetween,
        'no-hairlines-between-md': noHairlinesBetweenMd,
        'no-hairlines-between-ios': noHairlinesBetweenIos,
        'no-hairlines-between-aurora': noHairlinesBetweenAurora,
        'form-store-data': formStoreData,
        'inline-labels': inlineLabels,
        'no-chevron': noChevron,
        'chevron-center': chevronCenter
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

  return F7List;
}(React.Component);

__reactComponentSetProps(F7List, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  inset: Boolean,
  xsmallInset: Boolean,
  smallInset: Boolean,
  mediumInset: Boolean,
  largeInset: Boolean,
  xlargeInset: Boolean,
  mediaList: Boolean,
  sortable: Boolean,
  sortableTapHold: Boolean,
  sortableEnabled: Boolean,
  sortableMoveElements: {
    type: Boolean,
    default: undefined
  },
  accordionList: Boolean,
  contactsList: Boolean,
  simpleList: Boolean,
  linksList: Boolean,
  noHairlines: Boolean,
  noHairlinesBetween: Boolean,
  noHairlinesMd: Boolean,
  noHairlinesBetweenMd: Boolean,
  noHairlinesIos: Boolean,
  noHairlinesBetweenIos: Boolean,
  noHairlinesAurora: Boolean,
  noHairlinesBetweenAurora: Boolean,
  noChevron: Boolean,
  chevronCenter: Boolean,
  tab: Boolean,
  tabActive: Boolean,
  form: Boolean,
  formStoreData: Boolean,
  inlineLabels: Boolean,
  virtualList: Boolean,
  virtualListParams: Object
}, Mixins.colorProps));

F7List.displayName = 'f7-list';
export default F7List;