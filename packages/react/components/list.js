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

var F7List = function (_React$Component) {
  _inherits(F7List, _React$Component);

  function F7List(props, context) {
    _classCallCheck(this, F7List);

    var _this = _possibleConstructorReturn(this, (F7List.__proto__ || Object.getPrototypeOf(F7List)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7List, [{
    key: 'onSortableEnable',
    value: function onSortableEnable(event) {
      this.dispatchEvent('sortable:enable sortableEnable', event);
    }
  }, {
    key: 'onSortableDisable',
    value: function onSortableDisable(event) {
      this.dispatchEvent('sortable:disable sortableDisable', event);
    }
  }, {
    key: 'onSortableSort',
    value: function onSortableSort(event) {
      this.dispatchEvent('sortable:sort sortableSort', event, event.detail);
    }
  }, {
    key: 'onTabShow',
    value: function onTabShow(e) {
      this.dispatchEvent('tab:show tabShow', e);
    }
  }, {
    key: 'onTabHide',
    value: function onTabHide(e) {
      this.dispatchEvent('tab:hide tabHide', e);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var props = self.props;
      var id = props.id,
          style = props.style,
          form = props.form;
      var _self$slots = self.slots,
          slotsList = _self$slots.list,
          slotsDefault = _self$slots.default;

      var rootChildrenBeforeList = [];
      var rootChildrenAfterList = [];
      var ulChildren = slotsList || [];
      var flattenSlots = _utils2.default.flattenArray(slotsDefault);
      var wasUlChild = false;
      flattenSlots.forEach(function (child) {
        if (typeof child === 'undefined') return;
        var tag = void 0;
        {
          tag = child.type && child.type.name;

          if (!tag && typeof child.type === 'string') {
            tag = child.type;
          }
        }

        if (!tag && 'react' === 'react' || tag && !(tag === 'li' || tag === 'F7ListItem' || tag === 'F7ListButton' || tag.indexOf('list-item') >= 0 || tag.indexOf('list-button') >= 0)) {
          if (wasUlChild) rootChildrenAfterList.push(child);else rootChildrenBeforeList.push(child);
        } else if (tag) {
          wasUlChild = true;
          ulChildren.push(child);
        }
      });
      var ListTag = form ? 'form' : 'div';

      if (ulChildren.length > 0) {
        return _react2.default.createElement(ListTag, {
          id: id,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          style: style,
          className: self.classes
        }, self.slots['before-list'], rootChildrenBeforeList, _react2.default.createElement('ul', null, ulChildren), self.slots['after-list'], rootChildrenAfterList);
      } else {
        return _react2.default.createElement(ListTag, {
          id: id,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          style: style,
          className: self.classes
        }, self.slots['before-list'], rootChildrenBeforeList, self.slots['after-list'], rootChildrenAfterList);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      var _self$props = self.props,
          virtualList = _self$props.virtualList,
          virtualListParams = _self$props.virtualListParams;


      if (el) {
        self.onSortableEnableBound = self.onSortableEnable.bind(self);
        self.onSortableDisableBound = self.onSortableDisable.bind(self);
        self.onSortableSortBound = self.onSortableSort.bind(self);
        self.onTabShowBound = self.onTabShow.bind(self);
        self.onTabHideBound = self.onTabHide.bind(self);
        el.addEventListener('sortable:enable', self.onSortableEnableBound);
        el.addEventListener('sortable:disable', self.onSortableDisableBound);
        el.addEventListener('sortable:sort', self.onSortableSortBound);
        el.addEventListener('tab:show', self.onTabShowBound);
        el.addEventListener('tab:hide', self.onTabHideBound);
      }

      if (!virtualList) return;
      self.$f7ready(function (f7) {
        var $$ = self.$$;
        var $el = $$(el);
        var templateScript = $el.find('script');
        var template = templateScript.html();

        if (!template && templateScript.length > 0) {
          template = templateScript[0].outerHTML;
          template = /\<script type="text\/template7"\>(.*)<\/script>/.exec(template)[1];
        }

        var vlParams = virtualListParams || {};
        if (!template && !vlParams.renderItem && !vlParams.itemTemplate && !vlParams.renderExternal) return;
        if (template) template = self.$t7.compile(template);
        self.f7VirtualList = f7.virtualList.create(_utils2.default.extend({
          el: el,
          itemTemplate: template,
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      var el = self.refs.el;

      if (el) {
        el.removeEventListener('sortable:enable', self.onSortableEnableBound);
        el.removeEventListener('sortable:disable', self.onSortableDisableBound);
        el.removeEventListener('sortable:sort', self.onSortableSortBound);
        el.removeEventListener('tab:show', self.onTabShowBound);
        el.removeEventListener('tab:hide', self.onTabHideBound);
      }

      if (!(self.virtualList && self.f7VirtualList)) return;
      if (self.f7VirtualList.destroy) self.f7VirtualList.destroy();
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
      var inset = props.inset,
          tabletInset = props.tabletInset,
          mediaList = props.mediaList,
          simpleList = props.simpleList,
          linksList = props.linksList,
          sortable = props.sortable,
          accordionList = props.accordionList,
          contactsList = props.contactsList,
          virtualList = props.virtualList,
          sortableEnabled = props.sortableEnabled,
          tab = props.tab,
          tabActive = props.tabActive,
          noHairlines = props.noHairlines,
          noHairlinesIos = props.noHairlinesIos,
          noHairlinesMd = props.noHairlinesMd,
          noHairlinesBetween = props.noHairlinesBetween,
          noHairlinesBetweenIos = props.noHairlinesBetweenIos,
          noHairlinesBetweenMd = props.noHairlinesBetweenMd,
          formStoreData = props.formStoreData,
          inlineLabels = props.inlineLabels,
          className = props.className;

      return _utils2.default.classNames(className, 'list', {
        inset: inset,
        'tablet-inset': tabletInset,
        'media-list': mediaList,
        'simple-list': simpleList,
        'links-list': linksList,
        sortable: sortable,
        'accordion-list': accordionList,
        'contacts-list': contactsList,
        'virtual-list': virtualList,
        'sortable-enabled': sortableEnabled,
        tab: tab,
        'tab-active': tabActive,
        'no-hairlines': noHairlines,
        'no-hairlines-between': noHairlinesBetween,
        'no-hairlines-md': noHairlinesMd,
        'no-hairlines-between-md': noHairlinesBetweenMd,
        'no-hairlines-ios': noHairlinesIos,
        'no-hairlines-between-ios': noHairlinesBetweenIos,
        'form-store-data': formStoreData,
        'inline-labels': inlineLabels
      }, _mixins2.default.colorClasses(props));
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

  return F7List;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7List, Object.assign({
  id: [String, Number],
  inset: Boolean,
  tabletInset: Boolean,
  mediaList: Boolean,
  sortable: Boolean,
  sortableEnabled: Boolean,
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
  tab: Boolean,
  tabActive: Boolean,
  form: Boolean,
  formStoreData: Boolean,
  inlineLabels: Boolean,
  virtualList: Boolean,
  virtualListParams: Object
}, _mixins2.default.colorProps));

exports.default = F7List;