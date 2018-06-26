'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _listItemContent = require('./list-item-content');

var _listItemContent2 = _interopRequireDefault(_listItemContent);

var _mixins = require('../utils/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _reactComponentWatch = require('../runtime-helpers/react-component-watch.js');

var _reactComponentWatch2 = _interopRequireDefault(_reactComponentWatch);

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

var F7ListItem = function (_React$Component) {
  _inherits(F7ListItem, _React$Component);

  function F7ListItem(props, context) {
    _classCallCheck(this, F7ListItem);

    var _this = _possibleConstructorReturn(this, (F7ListItem.__proto__ || Object.getPrototypeOf(F7ListItem)).call(this, props, context));

    _this.__reactRefs = {};

    _this.state = function () {
      return {
        isMedia: props.mediaItem || props.mediaList,
        isSortable: props.sortable,
        isSimple: false
      };
    }();

    (function () {
      var self = _this;
      self.onClickBound = self.onClick.bind(self);
      self.onChangeBound = self.onChange.bind(self);
      self.onSwipeoutOpenBound = self.onSwipeoutOpen.bind(self);
      self.onSwipeoutOpenedBound = self.onSwipeoutOpened.bind(self);
      self.onSwipeoutCloseBound = self.onSwipeoutClose.bind(self);
      self.onSwipeoutClosedBound = self.onSwipeoutClosed.bind(self);
      self.onSwipeoutDeleteBound = self.onSwipeoutDelete.bind(self);
      self.onSwipeoutDeletedBound = self.onSwipeoutDeleted.bind(self);
      self.onSwipeoutBound = self.onSwipeout.bind(self);
      self.onAccOpenBound = self.onAccOpen.bind(self);
      self.onAccOpenedBound = self.onAccOpened.bind(self);
      self.onAccCloseBound = self.onAccClose.bind(self);
      self.onAccClosedBound = self.onAccClosed.bind(self);
    })();
    return _this;
  }

  _createClass(F7ListItem, [{
    key: 'onClick',
    value: function onClick(event) {
      var self = this;

      if (self.props.smartSelect && self.f7SmartSelect) {
        self.f7SmartSelect.open();
      }

      if (event.target.tagName.toLowerCase() !== 'input') {
        self.dispatchEvent('click', event);
      }
    }
  }, {
    key: 'onSwipeoutDeleted',
    value: function onSwipeoutDeleted(event) {
      this.dispatchEvent('swipeout:deleted swipeoutDeleted', event);
    }
  }, {
    key: 'onSwipeoutDelete',
    value: function onSwipeoutDelete(event) {
      this.dispatchEvent('swipeout:delete swipeoutDelete', event);
    }
  }, {
    key: 'onSwipeoutClose',
    value: function onSwipeoutClose(event) {
      this.dispatchEvent('swipeout:close swipeoutClose', event);
    }
  }, {
    key: 'onSwipeoutClosed',
    value: function onSwipeoutClosed(event) {
      this.dispatchEvent('swipeout:closed swipeoutClosed', event);
    }
  }, {
    key: 'onSwipeoutOpen',
    value: function onSwipeoutOpen(event) {
      this.dispatchEvent('swipeout:open swipeoutOpen', event);
    }
  }, {
    key: 'onSwipeoutOpened',
    value: function onSwipeoutOpened(event) {
      this.dispatchEvent('swipeout:opened swipeoutOpened', event);
    }
  }, {
    key: 'onSwipeout',
    value: function onSwipeout(event) {
      this.dispatchEvent('swipeout', event);
    }
  }, {
    key: 'onAccClose',
    value: function onAccClose(event) {
      this.dispatchEvent('accordion:close accordionClose', event);
    }
  }, {
    key: 'onAccClosed',
    value: function onAccClosed(event) {
      this.dispatchEvent('accordion:closed accordionClosed', event);
    }
  }, {
    key: 'onAccOpen',
    value: function onAccOpen(event) {
      this.dispatchEvent('accordion:open accordionOpen', event);
    }
  }, {
    key: 'onAccOpened',
    value: function onAccOpened(event) {
      this.dispatchEvent('accordion:opened accordionOpened', event);
    }
  }, {
    key: 'onChange',
    value: function onChange(event) {
      this.dispatchEvent('change', event);
    }
  }, {
    key: 'onInput',
    value: function onInput(event) {
      this.dispatchEvent('input', event);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var linkEl = void 0;
      var itemContentEl = void 0;
      var props = self.props;
      var id = props.id,
          style = props.style,
          className = props.className,
          title = props.title,
          text = props.text,
          media = props.media,
          subtitle = props.subtitle,
          header = props.header,
          footer = props.footer,
          link = props.link,
          href = props.href,
          target = props.target,
          noFastclick = props.noFastclick,
          noFastClick = props.noFastClick,
          after = props.after,
          badge = props.badge,
          badgeColor = props.badgeColor,
          mediaItem = props.mediaItem,
          mediaList = props.mediaList,
          divider = props.divider,
          groupTitle = props.groupTitle,
          swipeout = props.swipeout,
          accordionItem = props.accordionItem,
          accordionItemOpened = props.accordionItemOpened,
          smartSelect = props.smartSelect,
          checkbox = props.checkbox,
          radio = props.radio,
          checked = props.checked,
          name = props.name,
          value = props.value,
          readonly = props.readonly,
          required = props.required,
          disabled = props.disabled,
          itemInput = props.itemInput,
          itemInputWithInfo = props.itemInputWithInfo,
          inlineLabel = props.inlineLabel,
          sortable = props.sortable;

      var isMedia = mediaItem || mediaList || self.state.isMedia;
      var isSortable = sortable || self.state.isSortable;
      var isSimple = self.state.isSimple;

      if (!isSimple) {
        var needsEvents = !(link || href || accordionItem || smartSelect);
        itemContentEl = _react2.default.createElement(_listItemContent2.default, {
          title: title,
          text: text,
          media: media,
          subtitle: subtitle,
          after: after,
          header: header,
          footer: footer,
          badge: badge,
          badgeColor: badgeColor,
          mediaList: isMedia,
          accordionItem: accordionItem,
          checkbox: checkbox,
          checked: checked,
          radio: radio,
          name: name,
          value: value,
          readonly: readonly,
          required: required,
          disabled: disabled,
          itemInput: itemInput,
          itemInputWithInfo: itemInputWithInfo,
          inlineLabel: inlineLabel,
          onClick: needsEvents ? self.onClickBound : null,
          onChange: needsEvents ? self.onChangeBound : null
        }, this.slots['content-start'], this.slots['content'], this.slots['content-end'], this.slots['media'], this.slots['inner-start'], this.slots['inner'], this.slots['inner-end'], this.slots['after-start'], this.slots['after'], this.slots['after-end'], this.slots['header'], this.slots['footer'], this.slots['before-title'], this.slots['title'], this.slots['after-title'], this.slots['subtitle'], this.slots['text'], swipeout || accordionItem ? null : self.slots.default);

        if (link || href || accordionItem || smartSelect) {
          var linkAttrs = _utils2.default.extend({
            href: link === true || accordionItem || smartSelect ? '#' : link || href,
            target: target
          }, _mixins2.default.linkRouterAttrs(props), _mixins2.default.linkActionsAttrs(props));
          var linkClasses = _utils2.default.classNames({
            'item-link': true,
            'no-fastclick': noFastclick || noFastClick,
            'smart-select': smartSelect
          }, _mixins2.default.linkRouterClasses(props), _mixins2.default.linkActionsClasses(props));
          linkEl = _react2.default.createElement('a', Object.assign({
            className: linkClasses,
            onClick: self.onClick.bind(self)
          }, linkAttrs), itemContentEl);
        }
      }

      var liClasses = _utils2.default.classNames(className, {
        'item-divider': divider,
        'list-group-title': groupTitle,
        'media-item': isMedia,
        swipeout: swipeout,
        'accordion-item': accordionItem,
        'accordion-item-opened': accordionItemOpened
      }, _mixins2.default.colorClasses(props));

      if (divider || groupTitle) {
        return _react2.default.createElement('li', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: liClasses
        }, _react2.default.createElement('span', null, this.slots['default'], !this.slots.default && title));
      } else if (isSimple) {
        return _react2.default.createElement('li', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: liClasses
        }, title, this.slots['default']);
      }

      var linkItemEl = link || href || smartSelect || accordionItem ? linkEl : itemContentEl;
      return _react2.default.createElement('li', {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: liClasses
      }, this.slots['root-start'], swipeout ? _react2.default.createElement('div', {
        className: 'swipeout-content'
      }, linkItemEl) : linkItemEl, isSortable && _react2.default.createElement('div', {
        className: 'sortable-handler'
      }), (swipeout || accordionItem) && self.slots.default, this.slots['root'], this.slots['root-end']);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;
      var el = self.refs.el;
      var _self$props = self.props,
          swipeout = _self$props.swipeout,
          accordionItem = _self$props.accordionItem,
          smartSelect = _self$props.smartSelect;


      if (el) {
        if (swipeout) {
          el.removeEventListener('swipeout:open', self.onSwipeoutOpenBound);
          el.removeEventListener('swipeout:opened', self.onSwipeoutOpenedBound);
          el.removeEventListener('swipeout:close', self.onSwipeoutCloseBound);
          el.removeEventListener('swipeout:closed', self.onSwipeoutClosedBound);
          el.removeEventListener('swipeout:delete', self.onSwipeoutDeleteBound);
          el.removeEventListener('swipeout:deleted', self.onSwipeoutDeletedBound);
          el.removeEventListener('swipeout', self.onSwipeoutBound);
        }

        if (accordionItem) {
          el.removeEventListener('accordion:open', self.onAccOpenBound);
          el.removeEventListener('accordion:opened', self.onAccOpenedBound);
          el.removeEventListener('accordion:close', self.onAccCloseBound);
          el.removeEventListener('accordion:closed', self.onAccClosedBound);
        }
      }

      if (smartSelect && self.f7SmartSelect) {
        self.f7SmartSelect.destroy();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      (0, _reactComponentWatch2.default)(this, 'props.swipeoutOpened', prevProps, prevState, function (opened) {
        var self = _this3;
        if (!self.props.swipeout) return;
        var el = self.refs.el;

        if (opened) {
          self.$f7.swipeout.open(el);
        } else {
          self.$f7.swipeout.close(el);
        }
      });

      var self = this;
      var $listEl = self.$listEl;

      if (!$listEl || $listEl && $listEl.length === 0) return;
      var isMedia = $listEl.hasClass('media-list');
      var isSimple = $listEl.hasClass('simple-list');
      var isSortable = $listEl.hasClass('sortable');

      if (isMedia !== self.state.isMedia) {
        self.setState({
          isMedia: isMedia
        });
      }

      if (isSimple !== self.state.isSimple) {
        self.setState({
          isSimple: isSimple
        });
      }

      if (isSortable !== self.state.isSortable) {
        self.setState({
          isSortable: isSortable
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var el = self.refs.el;
      if (!el) return;
      self.$listEl = self.$$(el).parents('.list, .list-group').eq(0);

      if (self.$listEl.length) {
        self.setState({
          isMedia: self.$listEl.hasClass('media-list'),
          isSimple: self.$listEl.hasClass('simple-list'),
          isSortable: self.$listEl.hasClass('sortable')
        });
      }

      var _self$props2 = self.props,
          swipeout = _self$props2.swipeout,
          swipeoutOpened = _self$props2.swipeoutOpened,
          accordionItem = _self$props2.accordionItem,
          smartSelect = _self$props2.smartSelect,
          smartSelectParams = _self$props2.smartSelectParams;


      if (swipeout) {
        el.addEventListener('swipeout:open', self.onSwipeoutOpenBound);
        el.addEventListener('swipeout:opened', self.onSwipeoutOpenedBound);
        el.addEventListener('swipeout:close', self.onSwipeoutCloseBound);
        el.addEventListener('swipeout:closed', self.onSwipeoutClosedBound);
        el.addEventListener('swipeout:delete', self.onSwipeoutDeleteBound);
        el.addEventListener('swipeout:deleted', self.onSwipeoutDeletedBound);
        el.addEventListener('swipeout', self.onSwipeoutBound);
      }

      if (accordionItem) {
        el.addEventListener('accordion:open', self.onAccOpenBound);
        el.addEventListener('accordion:opened', self.onAccOpenedBound);
        el.addEventListener('accordion:close', self.onAccCloseBound);
        el.addEventListener('accordion:closed', self.onAccClosedBound);
      }

      self.$f7ready(function (f7) {
        if (smartSelect) {
          var ssParams = _utils2.default.extend({
            el: el.querySelector('a.smart-select')
          }, smartSelectParams || {});
          self.f7SmartSelect = f7.smartSelect.create(ssParams);
        }

        if (swipeoutOpened) {
          f7.swipeout.open(el);
        }
      });
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

  return F7ListItem;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7ListItem, Object.assign({
  id: [String, Number],
  title: [String, Number],
  text: [String, Number],
  media: String,
  subtitle: [String, Number],
  header: [String, Number],
  footer: [String, Number],
  link: [Boolean, String],
  target: String,
  noFastclick: Boolean,
  noFastClick: Boolean,
  after: [String, Number],
  badge: [String, Number],
  badgeColor: String,
  mediaItem: Boolean,
  mediaList: Boolean,
  divider: Boolean,
  groupTitle: Boolean,
  swipeout: Boolean,
  swipeoutOpened: Boolean,
  sortable: Boolean,
  accordionItem: Boolean,
  accordionItemOpened: Boolean,
  smartSelect: Boolean,
  smartSelectParams: Object,
  checkbox: Boolean,
  radio: Boolean,
  checked: Boolean,
  name: String,
  value: [String, Number, Array],
  readonly: Boolean,
  required: Boolean,
  disabled: Boolean,
  itemInput: Boolean,
  itemInputWithInfo: Boolean,
  inlineLabel: Boolean
}, _mixins2.default.colorProps, _mixins2.default.linkRouterProps, _mixins2.default.linkActionsProps));

exports.default = F7ListItem;