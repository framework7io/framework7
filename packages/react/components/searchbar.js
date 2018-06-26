'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

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

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var F7Searchbar = function (_React$Component) {
  _inherits(F7Searchbar, _React$Component);

  function F7Searchbar(props, context) {
    _classCallCheck(this, F7Searchbar);

    var _this = _possibleConstructorReturn(this, (F7Searchbar.__proto__ || Object.getPrototypeOf(F7Searchbar)).call(this, props, context));

    _this.__reactRefs = {};
    return _this;
  }

  _createClass(F7Searchbar, [{
    key: 'search',
    value: function search(query) {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.search(query);
    }
  }, {
    key: 'enable',
    value: function enable() {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.enable();
    }
  }, {
    key: 'disable',
    value: function disable() {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.disable();
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      if (!this.f7Searchbar) return undefined;
      return this.toggle.disable();
    }
  }, {
    key: 'clear',
    value: function clear() {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.clear();
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
    key: 'onFocus',
    value: function onFocus(event) {
      this.dispatchEvent('focus', event);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(event) {
      this.dispatchEvent('blur', event);
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(event) {
      this.dispatchEvent('submit', event);
    }
  }, {
    key: 'onClearButtonClick',
    value: function onClearButtonClick(event) {
      this.dispatchEvent('click:clear clickClear', event);
    }
  }, {
    key: 'onDisableButtonClick',
    value: function onDisableButtonClick(event) {
      this.dispatchEvent('click:disable clickDisable', event);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var self = this;
      var clearEl = void 0;
      var disableEl = void 0;
      var props = self.props;
      var placeholder = props.placeholder,
          clearButton = props.clearButton,
          disableButton = props.disableButton,
          disableButtonText = props.disableButtonText,
          form = props.form,
          noShadow = props.noShadow,
          noHairline = props.noHairline,
          expandable = props.expandable,
          className = props.className,
          style = props.style,
          id = props.id;

      if (clearButton) {
        clearEl = _react2.default.createElement('span', {
          className: 'input-clear-button',
          onClick: self.onClearButtonClick.bind(self)
        });
      }

      if (disableButton) {
        disableEl = _react2.default.createElement('span', {
          className: 'searchbar-disable-button',
          onClick: self.onDisableButtonClick.bind(self)
        }, disableButtonText);
      }

      var SearchbarTag = form ? 'form' : 'div';
      var classes = _utils2.default.classNames(className, 'searchbar', {
        'no-shadow': noShadow,
        'no-hairline': noHairline,
        'searchbar-expandable': expandable
      }, _mixins2.default.colorClasses(props));
      return _react2.default.createElement(SearchbarTag, {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['before-inner'], _react2.default.createElement('div', {
        className: 'searchbar-inner'
      }, this.slots['inner-start'], _react2.default.createElement('div', {
        className: 'searchbar-input-wrap'
      }, this.slots['input-wrap-start'], _react2.default.createElement('input', {
        placeholder: placeholder,
        type: 'search',
        onInput: self.onInput.bind(self),
        onChange: self.onChange.bind(self),
        onFocus: self.onFocus.bind(self),
        onBlur: self.onBlur.bind(self)
      }), _react2.default.createElement('i', {
        className: 'searchbar-icon'
      }), clearEl, this.slots['input-wrap-end']), disableEl, this.slots['inner-end'], this.slots['default']), this.slots['after-inner']);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var self = this;
      var _self$props = self.props,
          init = _self$props.init,
          searchContainer = _self$props.searchContainer,
          searchIn = _self$props.searchIn,
          searchItem = _self$props.searchItem,
          hideOnEnableEl = _self$props.hideOnEnableEl,
          hideOnSearchEl = _self$props.hideOnSearchEl,
          foundEl = _self$props.foundEl,
          notFoundEl = _self$props.notFoundEl,
          backdrop = _self$props.backdrop,
          backdropEl = _self$props.backdropEl,
          disableButton = _self$props.disableButton,
          ignore = _self$props.ignore,
          customSearch = _self$props.customSearch,
          removeDiacritics = _self$props.removeDiacritics,
          hideDividers = _self$props.hideDividers,
          hideGroups = _self$props.hideGroups,
          form = _self$props.form;

      if (!init) return;
      var el = self.refs.el;

      if (form && el) {
        self.onSubmitBound = self.onSubmit.bind(self);
        el.addEventListener('submit', self.onSubmitBound, false);
      }

      self.$f7ready(function () {
        var params = _utils2.default.noUndefinedProps({
          el: self.refs.el,
          searchContainer: searchContainer,
          searchIn: searchIn,
          searchItem: searchItem,
          hideOnEnableEl: hideOnEnableEl,
          hideOnSearchEl: hideOnSearchEl,
          foundEl: foundEl,
          notFoundEl: notFoundEl,
          backdrop: backdrop,
          backdropEl: backdropEl,
          disableButton: disableButton,
          ignore: ignore,
          customSearch: customSearch,
          removeDiacritics: removeDiacritics,
          hideDividers: hideDividers,
          hideGroups: hideGroups,
          on: {
            search: function search(searchbar, query, previousQuery) {
              self.dispatchEvent('searchbar:search searchbarSearch', searchbar, query, previousQuery);
            },
            clear: function clear(searchbar, previousQuery) {
              self.dispatchEvent('searchbar:clear searchbarClear', searchbar, previousQuery);
            },
            enable: function enable(searchbar) {
              self.dispatchEvent('searchbar:enable searchbarEnable', searchbar);
            },
            disable: function disable(searchbar) {
              self.dispatchEvent('searchbar:disable searchbarDisable', searchbar);
            }
          }
        });
        Object.keys(params).forEach(function (key) {
          if (params[key] === '') {
            delete params[key];
          }
        });
        self.f7Searchbar = self.$f7.searchbar.create(params);
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var self = this;

      if (self.props.form && self.refs.el) {
        self.refs.el.removeEventListener('submit', self.onSubmitBound, false);
      }

      if (self.f7Searchbar && self.f7Searchbar.destroy) self.f7Searchbar.destroy();
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

  return F7Searchbar;
}(_react2.default.Component);

(0, _reactComponentSetProps2.default)(F7Searchbar, Object.assign({
  id: [String, Number],
  noShadow: Boolean,
  noHairline: Boolean,
  form: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: 'Search'
  },
  disableButton: {
    type: Boolean,
    default: true
  },
  disableButtonText: {
    type: String,
    default: 'Cancel'
  },
  clearButton: {
    type: Boolean,
    default: true
  },
  expandable: Boolean,
  searchContainer: [String, Object],
  searchIn: {
    type: String,
    default: '.item-title'
  },
  searchItem: {
    type: String,
    default: 'li'
  },
  foundEl: {
    type: [String, Object],
    default: '.searchbar-found'
  },
  notFoundEl: {
    type: [String, Object],
    default: '.searchbar-not-found'
  },
  backdrop: {
    type: Boolean,
    default: true
  },
  backdropEl: [String, Object],
  hideOnEnableEl: {
    type: [String, Object],
    default: '.searchbar-hide-on-enable'
  },
  hideOnSearchEl: {
    type: [String, Object],
    default: '.searchbar-hide-on-search'
  },
  ignore: {
    type: String,
    default: '.searchbar-ignore'
  },
  customSearch: {
    type: Boolean,
    default: false
  },
  removeDiacritics: {
    type: Boolean,
    default: false
  },
  hideDividers: {
    type: Boolean,
    default: true
  },
  hideGroups: {
    type: Boolean,
    default: true
  },
  init: {
    type: Boolean,
    default: true
  }
}, _mixins2.default.colorProps));

exports.default = F7Searchbar;