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

var F7Searchbar =
/*#__PURE__*/
function (_React$Component) {
  _inherits(F7Searchbar, _React$Component);

  function F7Searchbar(props, context) {
    var _this;

    _classCallCheck(this, F7Searchbar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(F7Searchbar).call(this, props, context));
    _this.__reactRefs = {};

    (function () {
      Utils.bindMethods(_assertThisInitialized(_this), ['onSubmit', 'onClearButtonClick', 'onDisableButtonClick', 'onInput', 'onChange', 'onFocus', 'onBlur']);
    })();

    return _this;
  }

  _createClass(F7Searchbar, [{
    key: "search",
    value: function search(query) {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.search(query);
    }
  }, {
    key: "enable",
    value: function enable() {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.enable();
    }
  }, {
    key: "disable",
    value: function disable() {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.disable();
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (!this.f7Searchbar) return undefined;
      return this.toggle.disable();
    }
  }, {
    key: "clear",
    value: function clear() {
      if (!this.f7Searchbar) return undefined;
      return this.f7Searchbar.clear();
    }
  }, {
    key: "onChange",
    value: function onChange(event) {
      this.dispatchEvent('change', event);
    }
  }, {
    key: "onInput",
    value: function onInput(event) {
      this.dispatchEvent('input', event);
    }
  }, {
    key: "onFocus",
    value: function onFocus(event) {
      this.dispatchEvent('focus', event);
    }
  }, {
    key: "onBlur",
    value: function onBlur(event) {
      this.dispatchEvent('blur', event);
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(event) {
      this.dispatchEvent('submit', event);
    }
  }, {
    key: "onClearButtonClick",
    value: function onClearButtonClick(event) {
      this.dispatchEvent('click:clear clickClear', event);
    }
  }, {
    key: "onDisableButtonClick",
    value: function onDisableButtonClick(event) {
      this.dispatchEvent('click:disable clickDisable', event);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var self = this;
      var clearEl;
      var disableEl;
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
          id = props.id,
          value = props.value,
          inline = props.inline;

      if (clearButton) {
        clearEl = React.createElement('span', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['clearEl'] = __reactNode;
          },
          className: 'input-clear-button'
        });
      }

      if (disableButton) {
        disableEl = React.createElement('span', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['disableEl'] = __reactNode;
          },
          className: 'searchbar-disable-button'
        }, disableButtonText);
      }

      var SearchbarTag = form ? 'form' : 'div';
      var classes = Utils.classNames(className, 'searchbar', {
        'searchbar-inline': inline,
        'no-shadow': noShadow,
        'no-hairline': noHairline,
        'searchbar-expandable': expandable
      }, Mixins.colorClasses(props));
      var inputEl;
      {
        inputEl = React.createElement('input', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['inputEl'] = __reactNode;
          },
          value: value,
          placeholder: placeholder,
          type: 'search',
          onInput: self.onInput,
          onChange: self.onChange.bind(self),
          onFocus: self.onFocus,
          onBlur: self.onBlur
        });
      }
      return React.createElement(SearchbarTag, {
        ref: function ref(__reactNode) {
          _this2.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['before-inner'], React.createElement('div', {
        className: 'searchbar-inner'
      }, this.slots['inner-start'], React.createElement('div', {
        className: 'searchbar-input-wrap'
      }, this.slots['input-wrap-start'], inputEl, React.createElement('i', {
        className: 'searchbar-icon'
      }), clearEl, this.slots['input-wrap-end']), disableEl, this.slots['inner-end'], this.slots['default']), this.slots['after-inner']);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var self = this;
      var _self$refs = self.refs,
          el = _self$refs.el,
          clearEl = _self$refs.clearEl,
          disableEl = _self$refs.disableEl;

      if (self.props.form && el) {
        el.removeEventListener('submit', self.onSubmit, false);
      }

      if (clearEl) {
        clearEl.removeEventListener('click', self.onClearButtonClick);
      }

      if (disableEl) {
        disableEl.removeEventListener('click', self.onDisableButtonClick);
      }

      if (self.f7Searchbar && self.f7Searchbar.destroy) self.f7Searchbar.destroy();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var self = this;
      var _self$props = self.props,
          init = _self$props.init,
          inputEvents = _self$props.inputEvents,
          searchContainer = _self$props.searchContainer,
          searchIn = _self$props.searchIn,
          searchItem = _self$props.searchItem,
          searchGroup = _self$props.searchGroup,
          searchGroupTitle = _self$props.searchGroupTitle,
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
          form = _self$props.form,
          expandable = _self$props.expandable,
          inline = _self$props.inline;
      var _self$refs2 = self.refs,
          el = _self$refs2.el,
          clearEl = _self$refs2.clearEl,
          disableEl = _self$refs2.disableEl;

      if (form && el) {
        el.addEventListener('submit', self.onSubmit, false);
      }

      if (clearEl) {
        clearEl.addEventListener('click', self.onClearButtonClick);
      }

      if (disableEl) {
        disableEl.addEventListener('click', self.onDisableButtonClick);
      }

      if (!init) return;
      self.$f7ready(function () {
        var params = Utils.noUndefinedProps({
          el: self.refs.el,
          inputEvents: inputEvents,
          searchContainer: searchContainer,
          searchIn: searchIn,
          searchItem: searchItem,
          searchGroup: searchGroup,
          searchGroupTitle: searchGroupTitle,
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
          expandable: expandable,
          inline: inline,
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

  return F7Searchbar;
}(React.Component);

__reactComponentSetProps(F7Searchbar, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
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
  value: [String, Number, Array],
  inputEvents: {
    type: String,
    default: 'change input compositionend'
  },
  expandable: Boolean,
  inline: Boolean,
  searchContainer: [String, Object],
  searchIn: {
    type: String,
    default: '.item-title'
  },
  searchItem: {
    type: String,
    default: 'li'
  },
  searchGroup: {
    type: String,
    default: '.list-group'
  },
  searchGroupTitle: {
    type: String,
    default: '.item-divider, .list-group-title'
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
    default: undefined
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
}, Mixins.colorProps));

F7Searchbar.displayName = 'f7-searchbar';
export default F7Searchbar;