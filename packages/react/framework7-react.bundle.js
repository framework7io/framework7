/**
 * Framework7 React 5.0.5
 * Build full featured iOS & Android apps using Framework7 & React
 * http://framework7.io/react/
 *
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: October 16, 2019
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = global || self, global.Framework7React = factory(global.React));
}(this, function (React) { 'use strict';

  React = React && React.hasOwnProperty('default') ? React['default'] : React;

  var Utils = {
    noUndefinedProps: function noUndefinedProps(obj) {
      var o = {};
      Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] !== 'undefined') { o[key] = obj[key]; }
      });
      return o;
    },
    isTrueProp: function isTrueProp(val) {
      return val === true || val === '';
    },
    isStringProp: function isStringProp(val) {
      return typeof val === 'string' && val !== '';
    },
    isObject: function isObject(o) {
      return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
    },
    now: function now() {
      return Date.now();
    },
    extend: function extend() {
      var assign, assign$1;

      var args = [], len$1 = arguments.length;
      while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];
      var deep = true;
      var to;
      var from;
      if (typeof args[0] === 'boolean') {
        (assign = args, deep = assign[0], to = assign[1]);
        args.splice(0, 2);
        from = args;
      } else {
        (assign$1 = args, to = assign$1[0]);
        args.splice(0, 1);
        from = args;
      }
      for (var i = 0; i < from.length; i += 1) {
        var nextSource = args[i];
        if (nextSource !== undefined && nextSource !== null) {
          var keysArray = Object.keys(Object(nextSource));
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              if (!deep) {
                to[nextKey] = nextSource[nextKey];
              } else if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                to[nextKey] = {};
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }
      return to;
    },
    flattenArray: function flattenArray() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var arr = [];
      args.forEach(function (arg) {
        if (Array.isArray(arg)) { arr.push.apply(arr, Utils.flattenArray.apply(Utils, arg)); }
        else { arr.push(arg); }
      });
      return arr;
    },
    classNames: function classNames() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var classes = [];
      args.forEach(function (arg) {
        if (typeof arg === 'object' && arg.constructor === Object) {
          Object.keys(arg).forEach(function (key) {
            if (arg[key]) { classes.push(key); }
          });
        } else if (arg) { classes.push(arg); }
      });
      var uniqueClasses = [];
      classes.forEach(function (c) {
        if (uniqueClasses.indexOf(c) < 0) { uniqueClasses.push(c); }
      });
      return uniqueClasses.join(' ');
    },
    bindMethods: function bindMethods(context, methods) {
      if ( methods === void 0 ) methods = [];

      for (var i = 0; i < methods.length; i += 1) {
        if (context[methods[i]]) { context[methods[i]] = context[methods[i]].bind(context); }
      }
    },
  };

  var Mixins = {
    colorProps: {
      color: String,
      colorTheme: String,
      textColor: String,
      bgColor: String,
      borderColor: String,
      rippleColor: String,
      themeDark: Boolean,
    },
    colorClasses: function colorClasses(props) {
      var obj;

      var color = props.color;
      var colorTheme = props.colorTheme;
      var textColor = props.textColor;
      var bgColor = props.bgColor;
      var borderColor = props.borderColor;
      var rippleColor = props.rippleColor;
      var themeDark = props.themeDark;

      return ( obj = {
        'theme-dark': themeDark
      }, obj[("color-" + color)] = color, obj[("color-theme-" + colorTheme)] = colorTheme, obj[("text-color-" + textColor)] = textColor, obj[("bg-color-" + bgColor)] = bgColor, obj[("border-color-" + borderColor)] = borderColor, obj[("ripple-color-" + rippleColor)] = rippleColor, obj );
    },
    linkIconProps: {
      icon: String,
      iconMaterial: String,
      iconF7: String,
      iconIos: String,
      iconMd: String,
      iconAurora: String,
      iconColor: String,
      iconSize: [String, Number],
    },
    linkRouterProps: {
      back: Boolean,
      external: Boolean,
      force: Boolean,
      animate: {
        type: Boolean,
        default: undefined,
      },
      ignoreCache: Boolean,
      reloadCurrent: Boolean,
      reloadAll: Boolean,
      reloadPrevious: Boolean,
      reloadDetail: {
        type: Boolean,
        default: undefined,
      },
      routeTabId: String,
      view: String,
      routeProps: Object,
      preventRouter: Boolean,
      transition: String,
    },
    linkRouterAttrs: function linkRouterAttrs(props) {
      var force = props.force;
      var reloadCurrent = props.reloadCurrent;
      var reloadPrevious = props.reloadPrevious;
      var reloadAll = props.reloadAll;
      var reloadDetail = props.reloadDetail;
      var animate = props.animate;
      var ignoreCache = props.ignoreCache;
      var routeTabId = props.routeTabId;
      var view = props.view;
      var transition = props.transition;

      var dataAnimate;
      if ('animate' in props && typeof animate !== 'undefined') {
        dataAnimate = animate.toString();
      }

      var dataReloadDetail;
      if ('reloadDetail' in props && typeof reloadDetail !== 'undefined') {
        dataReloadDetail = reloadDetail.toString();
      }

      return {
        'data-force': force || undefined,
        'data-reload-current': reloadCurrent || undefined,
        'data-reload-all': reloadAll || undefined,
        'data-reload-previous': reloadPrevious || undefined,
        'data-reload-detail': dataReloadDetail,
        'data-animate': dataAnimate,
        'data-ignore-cache': ignoreCache || undefined,
        'data-route-tab-id': routeTabId || undefined,
        'data-view': Utils.isStringProp(view) ? view : undefined,
        'data-transition': Utils.isStringProp(transition) ? transition : undefined,
      };
    },
    linkRouterClasses: function linkRouterClasses(props) {
      var back = props.back;
      var linkBack = props.linkBack;
      var external = props.external;
      var preventRouter = props.preventRouter;

      return {
        back: back || linkBack,
        external: external,
        'prevent-router': preventRouter,
      };
    },
    linkActionsProps: {
      searchbarEnable: [Boolean, String],
      searchbarDisable: [Boolean, String],

      searchbarClear: [Boolean, String],
      searchbarToggle: [Boolean, String],

      // Panel
      panelOpen: [Boolean, String],
      panelClose: [Boolean, String],
      panelToggle: [Boolean, String],

      // Popup
      popupOpen: [Boolean, String],
      popupClose: [Boolean, String],

      // Actions
      actionsOpen: [Boolean, String],
      actionsClose: [Boolean, String],

      // Popover
      popoverOpen: [Boolean, String],
      popoverClose: [Boolean, String],

      // Login Screen
      loginScreenOpen: [Boolean, String],
      loginScreenClose: [Boolean, String],

      // Picker
      sheetOpen: [Boolean, String],
      sheetClose: [Boolean, String],

      // Sortable
      sortableEnable: [Boolean, String],
      sortableDisable: [Boolean, String],
      sortableToggle: [Boolean, String],

      // Card
      cardOpen: [Boolean, String],
      cardPreventOpen: [Boolean, String],
      cardClose: [Boolean, String],

      // Menu
      menuClose: {
        type: [Boolean, String],
        default: undefined,
      },
    },
    linkActionsAttrs: function linkActionsAttrs(props) {
      var searchbarEnable = props.searchbarEnable;
      var searchbarDisable = props.searchbarDisable;
      var searchbarClear = props.searchbarClear;
      var searchbarToggle = props.searchbarToggle;
      var panelOpen = props.panelOpen;
      var panelClose = props.panelClose;
      var panelToggle = props.panelToggle;
      var popupOpen = props.popupOpen;
      var popupClose = props.popupClose;
      var actionsOpen = props.actionsOpen;
      var actionsClose = props.actionsClose;
      var popoverOpen = props.popoverOpen;
      var popoverClose = props.popoverClose;
      var loginScreenOpen = props.loginScreenOpen;
      var loginScreenClose = props.loginScreenClose;
      var sheetOpen = props.sheetOpen;
      var sheetClose = props.sheetClose;
      var sortableEnable = props.sortableEnable;
      var sortableDisable = props.sortableDisable;
      var sortableToggle = props.sortableToggle;
      var cardOpen = props.cardOpen;
      var cardClose = props.cardClose;

      return {
        'data-searchbar': (Utils.isStringProp(searchbarEnable) && searchbarEnable)
                          || (Utils.isStringProp(searchbarDisable) && searchbarDisable)
                          || (Utils.isStringProp(searchbarClear) && searchbarClear)
                          || (Utils.isStringProp(searchbarToggle) && searchbarToggle) || undefined,
        'data-panel': (Utils.isStringProp(panelOpen) && panelOpen)
                      || (Utils.isStringProp(panelClose) && panelClose)
                      || (Utils.isStringProp(panelToggle) && panelToggle) || undefined,
        'data-popup': (Utils.isStringProp(popupOpen) && popupOpen)
                      || (Utils.isStringProp(popupClose) && popupClose) || undefined,
        'data-actions': (Utils.isStringProp(actionsOpen) && actionsOpen)
                      || (Utils.isStringProp(actionsClose) && actionsClose) || undefined,
        'data-popover': (Utils.isStringProp(popoverOpen) && popoverOpen)
                        || (Utils.isStringProp(popoverClose) && popoverClose) || undefined,
        'data-sheet': (Utils.isStringProp(sheetOpen) && sheetOpen)
                      || (Utils.isStringProp(sheetClose) && sheetClose) || undefined,
        'data-login-screen': (Utils.isStringProp(loginScreenOpen) && loginScreenOpen)
                             || (Utils.isStringProp(loginScreenClose) && loginScreenClose) || undefined,
        'data-sortable': (Utils.isStringProp(sortableEnable) && sortableEnable)
                         || (Utils.isStringProp(sortableDisable) && sortableDisable)
                         || (Utils.isStringProp(sortableToggle) && sortableToggle) || undefined,
        'data-card': (Utils.isStringProp(cardOpen) && cardOpen)
                      || (Utils.isStringProp(cardClose) && cardClose) || undefined,
      };
    },
    linkActionsClasses: function linkActionsClasses(props) {
      var searchbarEnable = props.searchbarEnable;
      var searchbarDisable = props.searchbarDisable;
      var searchbarClear = props.searchbarClear;
      var searchbarToggle = props.searchbarToggle;
      var panelOpen = props.panelOpen;
      var panelClose = props.panelClose;
      var panelToggle = props.panelToggle;
      var popupOpen = props.popupOpen;
      var popupClose = props.popupClose;
      var actionsClose = props.actionsClose;
      var actionsOpen = props.actionsOpen;
      var popoverOpen = props.popoverOpen;
      var popoverClose = props.popoverClose;
      var loginScreenOpen = props.loginScreenOpen;
      var loginScreenClose = props.loginScreenClose;
      var sheetOpen = props.sheetOpen;
      var sheetClose = props.sheetClose;
      var sortableEnable = props.sortableEnable;
      var sortableDisable = props.sortableDisable;
      var sortableToggle = props.sortableToggle;
      var cardOpen = props.cardOpen;
      var cardPreventOpen = props.cardPreventOpen;
      var cardClose = props.cardClose;
      var menuClose = props.menuClose;

      return {
        'searchbar-enable': searchbarEnable || searchbarEnable === '',
        'searchbar-disable': searchbarDisable || searchbarDisable === '',
        'searchbar-clear': searchbarClear || searchbarClear === '',
        'searchbar-toggle': searchbarToggle || searchbarToggle === '',
        'panel-close': panelClose || panelClose === '',
        'panel-open': panelOpen || panelOpen === '',
        'panel-toggle': panelToggle || panelToggle === '',
        'popup-close': popupClose || popupClose === '',
        'popup-open': popupOpen || popupOpen === '',
        'actions-close': actionsClose || actionsClose === '',
        'actions-open': actionsOpen || actionsOpen === '',
        'popover-close': popoverClose || popoverClose === '',
        'popover-open': popoverOpen || popoverOpen === '',
        'sheet-close': sheetClose || sheetClose === '',
        'sheet-open': sheetOpen || sheetOpen === '',
        'login-screen-close': loginScreenClose || loginScreenClose === '',
        'login-screen-open': loginScreenOpen || loginScreenOpen === '',
        'sortable-enable': sortableEnable || sortableEnable === '',
        'sortable-disable': sortableDisable || sortableDisable === '',
        'sortable-toggle': sortableToggle || sortableToggle === '',
        'card-close': cardClose || cardClose === '',
        'card-open': cardOpen || cardOpen === '',
        'card-prevent-open': cardPreventOpen || cardPreventOpen === '',
        'menu-close': menuClose || menuClose === '',
      };
    },
  };

  function __reactComponentSlots (props) {
    var slots = {};
    if (!props) { return slots; }
    var children = props.children;

    if (!children || children.length === 0) {
      return slots;
    }

    function addChildToSlot(name, child) {
      if (!slots[name]) { slots[name] = []; }
      slots[name].push(child);
    }

    if (Array.isArray(children)) {
      children.forEach(function (child) {
        if (!child) { return; }
        var slotName = (child.props && child.props.slot) || 'default';
        addChildToSlot(slotName, child);
      });
    } else {
      var slotName = 'default';
      if (children.props && children.props.slot) { slotName = children.props.slot; }
      addChildToSlot(slotName, children);
    }

    return slots;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  var ReactPropTypesSecret_1 = ReactPropTypesSecret;

  function emptyFunction() {}
  function emptyFunctionWithReset() {}
  emptyFunctionWithReset.resetWarningCache = emptyFunction;

  var factoryWithThrowingShims = function() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret_1) {
        // It is still safe when called from React.
        return;
      }
      var err = new Error(
        'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
        'Use PropTypes.checkPropTypes() to call them. ' +
        'Read more at http://fb.me/use-check-prop-types'
      );
      err.name = 'Invariant Violation';
      throw err;
    }  shim.isRequired = shim;
    function getShim() {
      return shim;
    }  // Important!
    // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
    var ReactPropTypes = {
      array: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,

      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,

      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };

    ReactPropTypes.PropTypes = ReactPropTypes;

    return ReactPropTypes;
  };

  var propTypes = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    module.exports = factoryWithThrowingShims();
  }
  });

  function __reactComponentSetProps (component, props) {
    var propType = function (type) {
      if (type === String) { return propTypes.string; }
      if (type === Boolean) { return propTypes.bool; }
      if (type === Function) { return propTypes.func; }
      if (type === Number) { return propTypes.number; }
      if (type === Object) { return propTypes.object; }
      if (type === Array) { return propTypes.array; }
      if (type === Symbol) { return propTypes.symbol; }
      if (type.constructor === Function || type === Date) { return propTypes.instanceOf(type); }
      return propTypes.any;
    };

    component.propTypes = {};

    Object.keys(props).forEach(function (propName) {
      var prop = props[propName];
      var required = typeof prop.required !== 'undefined';
      var type = prop.type || prop;

      if (Array.isArray(type)) {
        if (required) {
          component.propTypes[propName] = propTypes.oneOfType(type.map(propType)).required;
        } else {
          component.propTypes[propName] = propTypes.oneOfType(type.map(propType));
        }
      } else if (required) {
        component.propTypes[propName] = propType(type).required;
      } else {
        component.propTypes[propName] = propType(type);
      }

      if (
        (typeof prop.default !== 'undefined')
        || (('default' in prop) && prop.default === undefined)
      ) {
        var hasFunctionType = prop.type === Function
          || (Array.isArray(prop.type) && prop.type.indexOf(Function) >= 0);
        if (!component.defaultProps) { component.defaultProps = {}; }
        if (typeof prop.default === 'function' && !hasFunctionType) {
          component.defaultProps[propName] = prop.default();
        } else {
          component.defaultProps[propName] = prop.default;
        }
      }
    });
  }

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf(subClass, superClass); } }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  var F7AccordionContent =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(F7AccordionContent, _React$Component);

    function F7AccordionContent(props, context) {
      _classCallCheck(this, F7AccordionContent);

      return _possibleConstructorReturn(this, _getPrototypeOf(F7AccordionContent).call(this, props, context));
    }

    _createClass(F7AccordionContent, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'accordion-item-content', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7AccordionContent;
  }(React.Component);

  __reactComponentSetProps(F7AccordionContent, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7AccordionContent.displayName = 'f7-accordion-content';

  function __reactComponentDispatchEvent (component, events) {
    var args = [], len = arguments.length - 2;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 2 ];

    var self = component;

    if (!events || !events.trim().length || typeof events !== 'string') { return; }

    events.trim().split(' ').forEach(function (event) {
      var ref;

      var eventName = (event || '').trim();
      if (!eventName) { return; }
      eventName = eventName.charAt(0).toUpperCase() + eventName.slice(1);

      var propName = "on" + eventName;

      if (self.props[propName]) { (ref = self.props)[propName].apply(ref, args); }
    });
  }

  function _typeof$1(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1(self, call) { if (call && (_typeof$1(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1(self); }

  function _getPrototypeOf$1(o) { _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1(o); }

  function _assertThisInitialized$1(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1(subClass, superClass); } }

  function _setPrototypeOf$1(o, p) { _setPrototypeOf$1 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1(o, p); }

  var F7AccordionItem =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1(F7AccordionItem, _React$Component);

    function F7AccordionItem(props, context) {
      var _this;

      _classCallCheck$1(this, F7AccordionItem);

      _this = _possibleConstructorReturn$1(this, _getPrototypeOf$1(F7AccordionItem).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$1(_this), 'onBeforeOpen onOpen onOpened onBeforeClose onClose onClosed'.split(' '));
      })();

      return _this;
    }

    _createClass$1(F7AccordionItem, [{
      key: "onBeforeOpen",
      value: function onBeforeOpen(el, prevent) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordionBeforeOpen accordion:beforeopen', prevent);
      }
    }, {
      key: "onOpen",
      value: function onOpen(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordionOpen accordion:open');
      }
    }, {
      key: "onOpened",
      value: function onOpened(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordionOpened accordion:opened');
      }
    }, {
      key: "onBeforeClose",
      value: function onBeforeClose(el, prevent) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordionBeforeClose accordion:beforeclose', prevent);
      }
    }, {
      key: "onClose",
      value: function onClose(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordionClose accordion:close');
      }
    }, {
      key: "onClosed",
      value: function onClosed(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordionClosed accordion:closed');
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            opened = props.opened;
        var classes = Utils.classNames(className, 'accordion-item', {
          'accordion-item-opened': opened
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          }
        }, this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        var el = self.refs.el;
        if (!el || !self.$f7) { return; }
        var f7 = self.$f7;
        f7.off('accordionBeforeOpen', self.onBeforeOpen);
        f7.off('accordionOpen', self.onOpen);
        f7.off('accordionOpened', self.onOpened);
        f7.off('accordionBeforeClose', self.onBeforeClose);
        f7.off('accordionClose', self.onClose);
        f7.off('accordionClosed', self.onClosed);
        delete this.eventTargetEl;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        if (!el) { return; }
        self.eventTargetEl = el;
        self.$f7ready(function (f7) {
          f7.on('accordionBeforeOpen', self.onBeforeOpen);
          f7.on('accordionOpen', self.onOpen);
          f7.on('accordionOpened', self.onOpened);
          f7.on('accordionBeforeClose', self.onBeforeClose);
          f7.on('accordionClose', self.onClose);
          f7.on('accordionClosed', self.onClosed);
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7AccordionItem;
  }(React.Component);

  __reactComponentSetProps(F7AccordionItem, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    opened: Boolean
  }, Mixins.colorProps));

  F7AccordionItem.displayName = 'f7-accordion-item';

  function _typeof$2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$2 = function _typeof(obj) { return typeof obj; }; } else { _typeof$2 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$2(obj); }

  function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$2(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$2(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$2(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$2(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$2(self, call) { if (call && (_typeof$2(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$2(self); }

  function _assertThisInitialized$2(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$2(o) { _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$2(o); }

  function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$2(subClass, superClass); } }

  function _setPrototypeOf$2(o, p) { _setPrototypeOf$2 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$2(o, p); }

  var F7AccordionToggle =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$2(F7AccordionToggle, _React$Component);

    function F7AccordionToggle(props, context) {
      _classCallCheck$2(this, F7AccordionToggle);

      return _possibleConstructorReturn$2(this, _getPrototypeOf$2(F7AccordionToggle).call(this, props, context));
    }

    _createClass$2(F7AccordionToggle, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'accordion-item-toggle', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7AccordionToggle;
  }(React.Component);

  __reactComponentSetProps(F7AccordionToggle, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7AccordionToggle.displayName = 'f7-accordion-toggle';

  function _typeof$3(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$3 = function _typeof(obj) { return typeof obj; }; } else { _typeof$3 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$3(obj); }

  function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$3(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$3(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$3(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$3(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$3(self, call) { if (call && (_typeof$3(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$3(self); }

  function _assertThisInitialized$3(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$3(o) { _getPrototypeOf$3 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$3(o); }

  function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$3(subClass, superClass); } }

  function _setPrototypeOf$3(o, p) { _setPrototypeOf$3 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$3(o, p); }

  var F7Accordion =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$3(F7Accordion, _React$Component);

    function F7Accordion(props, context) {
      _classCallCheck$3(this, F7Accordion);

      return _possibleConstructorReturn$3(this, _getPrototypeOf$3(F7Accordion).call(this, props, context));
    }

    _createClass$3(F7Accordion, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'accordion-list', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7Accordion;
  }(React.Component);

  __reactComponentSetProps(F7Accordion, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7Accordion.displayName = 'f7-accordion';

  function _typeof$4(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$4 = function _typeof(obj) { return typeof obj; }; } else { _typeof$4 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$4(obj); }

  function _classCallCheck$4(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$4(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$4(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$4(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$4(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$4(self, call) { if (call && (_typeof$4(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$4(self); }

  function _getPrototypeOf$4(o) { _getPrototypeOf$4 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$4(o); }

  function _assertThisInitialized$4(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$4(subClass, superClass); } }

  function _setPrototypeOf$4(o, p) { _setPrototypeOf$4 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$4(o, p); }

  var F7ActionsButton =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$4(F7ActionsButton, _React$Component);

    function F7ActionsButton(props, context) {
      var _this;

      _classCallCheck$4(this, F7ActionsButton);

      _this = _possibleConstructorReturn$4(this, _getPrototypeOf$4(F7ActionsButton).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$4(_this), ['onClick']);
      })();

      return _this;
    }

    _createClass$4(F7ActionsButton, [{
      key: "onClick",
      value: function onClick(event) {
        var self = this;
        var $$ = self.$$;
        var el = self.refs.el;

        if (self.props.close && self.$f7 && el) {
          self.$f7.actions.close($$(el).parents('.actions-modal'));
        }

        self.dispatchEvent('click', event);
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
            bold = props.bold;
        var mediaEl;

        if (self.slots.media && self.slots.media.length) {
          mediaEl = React.createElement('div', {
            className: 'actions-button-media'
          }, this.slots['media']);
        }

        var classes = Utils.classNames(className, {
          'actions-button': true,
          'actions-button-bold': bold
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          }
        }, mediaEl, React.createElement('div', {
          className: 'actions-button-text'
        }, this.slots['default']));
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.refs.el.removeEventListener('click', this.onClick);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.refs.el.addEventListener('click', this.onClick);
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7ActionsButton;
  }(React.Component);

  __reactComponentSetProps(F7ActionsButton, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    bold: Boolean,
    close: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps));

  F7ActionsButton.displayName = 'f7-actions-button';

  function _typeof$5(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$5 = function _typeof(obj) { return typeof obj; }; } else { _typeof$5 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$5(obj); }

  function _classCallCheck$5(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$5(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$5(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$5(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$5(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$5(self, call) { if (call && (_typeof$5(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$5(self); }

  function _assertThisInitialized$5(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$5(o) { _getPrototypeOf$5 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$5(o); }

  function _inherits$5(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$5(subClass, superClass); } }

  function _setPrototypeOf$5(o, p) { _setPrototypeOf$5 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$5(o, p); }

  var F7ActionsGroup =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$5(F7ActionsGroup, _React$Component);

    function F7ActionsGroup(props, context) {
      _classCallCheck$5(this, F7ActionsGroup);

      return _possibleConstructorReturn$5(this, _getPrototypeOf$5(F7ActionsGroup).call(this, props, context));
    }

    _createClass$5(F7ActionsGroup, [{
      key: "render",
      value: function render() {
        var self = this;
        var props = self.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'actions-group', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7ActionsGroup;
  }(React.Component);

  __reactComponentSetProps(F7ActionsGroup, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7ActionsGroup.displayName = 'f7-actions-group';

  function _typeof$6(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$6 = function _typeof(obj) { return typeof obj; }; } else { _typeof$6 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$6(obj); }

  function _classCallCheck$6(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$6(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$6(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$6(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$6(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$6(self, call) { if (call && (_typeof$6(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$6(self); }

  function _getPrototypeOf$6(o) { _getPrototypeOf$6 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$6(o); }

  function _assertThisInitialized$6(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$6(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$6(subClass, superClass); } }

  function _setPrototypeOf$6(o, p) { _setPrototypeOf$6 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$6(o, p); }

  var F7ActionsLabel =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$6(F7ActionsLabel, _React$Component);

    function F7ActionsLabel(props, context) {
      var _this;

      _classCallCheck$6(this, F7ActionsLabel);

      _this = _possibleConstructorReturn$6(this, _getPrototypeOf$6(F7ActionsLabel).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$6(_this), ['onClick']);
      })();

      return _this;
    }

    _createClass$6(F7ActionsLabel, [{
      key: "onClick",
      value: function onClick(event) {
        this.dispatchEvent('click', event);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            bold = props.bold;
        var classes = Utils.classNames(className, 'actions-label', {
          'actions-button-bold': bold
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          }
        }, this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.refs.el.removeEventListener('click', this.onClick);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.refs.el.addEventListener('click', this.onClick);
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7ActionsLabel;
  }(React.Component);

  __reactComponentSetProps(F7ActionsLabel, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    bold: Boolean
  }, Mixins.colorProps));

  F7ActionsLabel.displayName = 'f7-actions-label';

  function __reactComponentWatch (component, watchFor, prevProps, prevState, callback) {
    if (!callback) { return; }

    var newValue;
    var oldValue;

    if (watchFor.indexOf('props') === 0) {
      newValue = component.props;
      oldValue = prevProps;
    } else if (watchFor.indexOf('state') === 0) {
      newValue = component.state;
      oldValue = prevState;
    }
    // state and props has 5 letters
    watchFor.slice(5).split('.').filter(function (part) { return part; }).forEach(function (part) {
      if (typeof newValue !== 'undefined' && newValue !== null) {
        newValue = newValue[part];
      }
      if (typeof oldValue !== 'undefined' && oldValue !== null) {
        oldValue = oldValue[part];
      }
    });

    if (oldValue === newValue) { return; }

    if (callback) { callback(newValue, oldValue); }
  }

  function _typeof$7(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$7 = function _typeof(obj) { return typeof obj; }; } else { _typeof$7 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$7(obj); }

  function _classCallCheck$7(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$7(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$7(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$7(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$7(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$7(self, call) { if (call && (_typeof$7(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$7(self); }

  function _getPrototypeOf$7(o) { _getPrototypeOf$7 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$7(o); }

  function _assertThisInitialized$7(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$7(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$7(subClass, superClass); } }

  function _setPrototypeOf$7(o, p) { _setPrototypeOf$7 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$7(o, p); }

  var F7Actions =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$7(F7Actions, _React$Component);

    function F7Actions(props, context) {
      var _this;

      _classCallCheck$7(this, F7Actions);

      _this = _possibleConstructorReturn$7(this, _getPrototypeOf$7(F7Actions).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$7(_this), ['onOpen', 'onOpened', 'onClose', 'onClosed']);
      })();

      return _this;
    }

    _createClass$7(F7Actions, [{
      key: "onOpen",
      value: function onOpen(instance) {
        this.dispatchEvent('actions:open actionsOpen', instance);
      }
    }, {
      key: "onOpened",
      value: function onOpened(instance) {
        this.dispatchEvent('actions:opened actionsOpened', instance);
      }
    }, {
      key: "onClose",
      value: function onClose(instance) {
        this.dispatchEvent('actions:close actionsClose', instance);
      }
    }, {
      key: "onClosed",
      value: function onClosed(instance) {
        this.dispatchEvent('actions:closed actionsClosed', instance);
      }
    }, {
      key: "open",
      value: function open(animate) {
        var self = this;
        if (!self.f7Actions) { return undefined; }
        return self.f7Actions.open(animate);
      }
    }, {
      key: "close",
      value: function close(animate) {
        var self = this;
        if (!self.f7Actions) { return undefined; }
        return self.f7Actions.close(animate);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            grid = props.grid;
        var classes = Utils.classNames(className, 'actions-modal', {
          'actions-grid': grid
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        if (self.f7Actions) { self.f7Actions.destroy(); }
        delete self.f7Actions;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        if (!el) { return; }
        var props = self.props;
        var grid = props.grid,
            target = props.target,
            convertToPopover = props.convertToPopover,
            forceToPopover = props.forceToPopover,
            opened = props.opened,
            closeByBackdropClick = props.closeByBackdropClick,
            closeByOutsideClick = props.closeByOutsideClick,
            closeOnEscape = props.closeOnEscape,
            backdrop = props.backdrop,
            backdropEl = props.backdropEl;
        var actionsParams = {
          el: el,
          grid: grid,
          on: {
            open: self.onOpen,
            opened: self.onOpened,
            close: self.onClose,
            closed: self.onClosed
          }
        };
        if (target) { actionsParams.targetEl = target; }
        {
          if ('convertToPopover' in props) { actionsParams.convertToPopover = convertToPopover; }
          if ('forceToPopover' in props) { actionsParams.forceToPopover = forceToPopover; }
          if ('backdrop' in props) { actionsParams.backdrop = backdrop; }
          if ('backdropEl' in props) { actionsParams.backdropEl = backdropEl; }
          if ('closeByBackdropClick' in props) { actionsParams.closeByBackdropClick = closeByBackdropClick; }
          if ('closeByOutsideClick' in props) { actionsParams.closeByOutsideClick = closeByOutsideClick; }
          if ('closeOnEscape' in props) { actionsParams.closeOnEscape = closeOnEscape; }
        }
        self.$f7ready(function () {
          self.f7Actions = self.$f7.actions.create(actionsParams);

          if (opened) {
            self.f7Actions.open(false);
          }
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.opened', prevProps, prevState, function (opened) {
          var self = _this3;
          if (!self.f7Actions) { return; }

          if (opened) {
            self.f7Actions.open();
          } else {
            self.f7Actions.close();
          }
        });
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

    return F7Actions;
  }(React.Component);

  __reactComponentSetProps(F7Actions, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    opened: Boolean,
    grid: Boolean,
    convertToPopover: Boolean,
    forceToPopover: Boolean,
    target: [String, Object],
    backdrop: Boolean,
    backdropEl: [String, Object, window.HTMLElement],
    closeByBackdropClick: Boolean,
    closeByOutsideClick: Boolean,
    closeOnEscape: Boolean
  }, Mixins.colorProps));

  F7Actions.displayName = 'f7-actions';

  var f7 = {
    instance: null,
    Framework7: null,
    events: null,
    init: function init(rootEl, params, routes) {
      if ( params === void 0 ) params = {};

      var events = f7.events;
      var Framework7 = f7.Framework7;
      var f7Params = Utils.extend({}, params, {
        root: rootEl,
      });
      if (routes && routes.length && !f7Params.routes) { f7Params.routes = routes; }

      var instance = new Framework7(f7Params);
      if (instance.initialized) {
        f7.instance = instance;
        events.emit('ready', f7.instance);
      } else {
        instance.on('init', function () {
          f7.instance = instance;
          events.emit('ready', f7.instance);
        });
      }
    },
    ready: function ready(callback) {
      if (!callback) { return; }
      if (f7.instance) { callback(f7.instance); }
      else {
        f7.events.once('ready', callback);
      }
    },
    routers: {
      views: [],
      tabs: [],
      modals: null,
    },
  };

  function _typeof$8(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$8 = function _typeof(obj) { return typeof obj; }; } else { _typeof$8 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$8(obj); }

  function _classCallCheck$8(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$8(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$8(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$8(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$8(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$8(self, call) { if (call && (_typeof$8(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$8(self); }

  function _assertThisInitialized$8(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$8(o) { _getPrototypeOf$8 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$8(o); }

  function _inherits$8(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$8(subClass, superClass); } }

  function _setPrototypeOf$8(o, p) { _setPrototypeOf$8 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$8(o, p); }

  var F7RoutableModals =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$8(F7RoutableModals, _React$Component);

    function F7RoutableModals(props, context) {
      var _this;

      _classCallCheck$8(this, F7RoutableModals);

      _this = _possibleConstructorReturn$8(this, _getPrototypeOf$8(F7RoutableModals).call(this, props, context));
      _this.__reactRefs = {};

      _this.state = function () {
        return {
          modals: []
        };
      }();

      return _this;
    }

    _createClass$8(F7RoutableModals, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          className: 'framework7-modals'
        }, this.state.modals.map(function (modal) {
          var ModalComponent = modal.component;
          {
            return React.createElement(ModalComponent, Object.assign({
              key: modal.id
            }, modal.props));
          }
        }));
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        self.routerData = {
          modals: self.state.modals,
          el: el,
          component: self,
          setModals: function setModals(modals) {
            self.setState({
              modals: modals
            });
          }
        };
        f7.routers.modals = self.routerData;
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        if (!self.routerData) { return; }
        f7.routers.modals = null;
        self.routerData = null;
        delete self.routerData;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var self = this;
        if (!self.routerData) { return; }
        f7.events.emit('modalsRouterDidUpdate', self.routerData);
      }
    }, {
      key: "refs",
      get: function get() {
        return this.__reactRefs;
      },
      set: function set(refs) {}
    }]);

    return F7RoutableModals;
  }(React.Component);

  F7RoutableModals.displayName = 'f7-routable-modals';

  function _typeof$9(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$9 = function _typeof(obj) { return typeof obj; }; } else { _typeof$9 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$9(obj); }

  function _classCallCheck$9(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$9(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$9(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$9(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$9(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$9(self, call) { if (call && (_typeof$9(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$9(self); }

  function _assertThisInitialized$9(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$9(o) { _getPrototypeOf$9 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$9(o); }

  function _inherits$9(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$9(subClass, superClass); } }

  function _setPrototypeOf$9(o, p) { _setPrototypeOf$9 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$9(o, p); }

  var F7App =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$9(F7App, _React$Component);

    function F7App(props, context) {
      var _this;

      _classCallCheck$9(this, F7App);

      _this = _possibleConstructorReturn$9(this, _getPrototypeOf$9(F7App).call(this, props, context));
      _this.__reactRefs = {};
      return _this;
    }

    _createClass$9(F7App, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var id = props.id,
            style = props.style,
            className = props.className;
        var classes = Utils.classNames(className, 'framework7-root', Mixins.colorClasses(props));
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id || 'framework7-root',
          style: style,
          className: classes
        }, this.slots['default'], React.createElement(F7RoutableModals, null));
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var _self$props = self.props,
            _self$props$params = _self$props.params,
            params = _self$props$params === void 0 ? {} : _self$props$params,
            routes = _self$props.routes;
        var el = self.refs.el;
        var parentEl = el.parentNode;

        if (parentEl && parentEl !== document.body && parentEl.parentNode === document.body) {
          parentEl.style.height = '100%';
        }

        f7.init(el, params, routes);
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

    return F7App;
  }(React.Component);

  __reactComponentSetProps(F7App, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    params: Object,
    routes: Array
  }, Mixins.colorProps));

  F7App.displayName = 'f7-app';

  function _typeof$a(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$a = function _typeof(obj) { return typeof obj; }; } else { _typeof$a = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$a(obj); }

  function _classCallCheck$a(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$a(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$a(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$a(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$a(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$a(self, call) { if (call && (_typeof$a(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$a(self); }

  function _assertThisInitialized$a(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$a(o) { _getPrototypeOf$a = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$a(o); }

  function _inherits$a(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$a(subClass, superClass); } }

  function _setPrototypeOf$a(o, p) { _setPrototypeOf$a = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$a(o, p); }

  var F7Appbar =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$a(F7Appbar, _React$Component);

    function F7Appbar(props, context) {
      var _this;

      _classCallCheck$a(this, F7Appbar);

      _this = _possibleConstructorReturn$a(this, _getPrototypeOf$a(F7Appbar).call(this, props, context));
      _this.__reactRefs = {};
      return _this;
    }

    _createClass$a(F7Appbar, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var inner = props.inner,
            innerClass = props.innerClass,
            innerClassName = props.innerClassName,
            className = props.className,
            id = props.id,
            style = props.style,
            noShadow = props.noShadow,
            noHairline = props.noHairline;
        var innerEl;

        if (inner) {
          innerEl = React.createElement('div', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['inner'] = __reactNode;
            },
            className: Utils.classNames('appbar-inner', innerClass, innerClassName)
          }, this.slots['default']);
        }

        var classes = Utils.classNames(className, 'appbar', {
          'no-shadow': noShadow,
          'no-hairline': noHairline
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes
        }, this.slots['before-inner'], innerEl || self.slots.default, this.slots['after-inner']);
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

    return F7Appbar;
  }(React.Component);

  __reactComponentSetProps(F7Appbar, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    noShadow: Boolean,
    noHairline: Boolean,
    inner: {
      type: Boolean,
      default: true
    },
    innerClass: String,
    innerClassName: String
  }, Mixins.colorProps));

  F7Appbar.displayName = 'f7-appbar';

  function _typeof$b(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$b = function _typeof(obj) { return typeof obj; }; } else { _typeof$b = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$b(obj); }

  function _classCallCheck$b(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$b(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$b(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$b(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$b(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$b(self, call) { if (call && (_typeof$b(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$b(self); }

  function _assertThisInitialized$b(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$b(o) { _getPrototypeOf$b = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$b(o); }

  function _inherits$b(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$b(subClass, superClass); } }

  function _setPrototypeOf$b(o, p) { _setPrototypeOf$b = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$b(o, p); }

  var F7Badge =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$b(F7Badge, _React$Component);

    function F7Badge(props, context) {
      _classCallCheck$b(this, F7Badge);

      return _possibleConstructorReturn$b(this, _getPrototypeOf$b(F7Badge).call(this, props, context));
    }

    _createClass$b(F7Badge, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'badge', Mixins.colorClasses(props));
        return React.createElement('span', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7Badge;
  }(React.Component);

  __reactComponentSetProps(F7Badge, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7Badge.displayName = 'f7-badge';

  function _typeof$c(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$c = function _typeof(obj) { return typeof obj; }; } else { _typeof$c = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$c(obj); }

  function _classCallCheck$c(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$c(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$c(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$c(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$c(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$c(self, call) { if (call && (_typeof$c(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$c(self); }

  function _assertThisInitialized$c(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$c(o) { _getPrototypeOf$c = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$c(o); }

  function _inherits$c(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$c(subClass, superClass); } }

  function _setPrototypeOf$c(o, p) { _setPrototypeOf$c = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$c(o, p); }

  var F7BlockFooter =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$c(F7BlockFooter, _React$Component);

    function F7BlockFooter(props, context) {
      _classCallCheck$c(this, F7BlockFooter);

      return _possibleConstructorReturn$c(this, _getPrototypeOf$c(F7BlockFooter).call(this, props, context));
    }

    _createClass$c(F7BlockFooter, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'block-footer', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7BlockFooter;
  }(React.Component);

  __reactComponentSetProps(F7BlockFooter, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7BlockFooter.displayName = 'f7-block-footer';

  function _typeof$d(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$d = function _typeof(obj) { return typeof obj; }; } else { _typeof$d = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$d(obj); }

  function _classCallCheck$d(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$d(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$d(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$d(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$d(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$d(self, call) { if (call && (_typeof$d(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$d(self); }

  function _assertThisInitialized$d(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$d(o) { _getPrototypeOf$d = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$d(o); }

  function _inherits$d(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$d(subClass, superClass); } }

  function _setPrototypeOf$d(o, p) { _setPrototypeOf$d = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$d(o, p); }

  var F7BlockHeader =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$d(F7BlockHeader, _React$Component);

    function F7BlockHeader(props, context) {
      _classCallCheck$d(this, F7BlockHeader);

      return _possibleConstructorReturn$d(this, _getPrototypeOf$d(F7BlockHeader).call(this, props, context));
    }

    _createClass$d(F7BlockHeader, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'block-header', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7BlockHeader;
  }(React.Component);

  __reactComponentSetProps(F7BlockHeader, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7BlockHeader.displayName = 'f7-block-header';

  function _typeof$e(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$e = function _typeof(obj) { return typeof obj; }; } else { _typeof$e = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$e(obj); }

  function _classCallCheck$e(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$e(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$e(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$e(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$e(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$e(self, call) { if (call && (_typeof$e(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$e(self); }

  function _assertThisInitialized$e(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$e(o) { _getPrototypeOf$e = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$e(o); }

  function _inherits$e(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$e(subClass, superClass); } }

  function _setPrototypeOf$e(o, p) { _setPrototypeOf$e = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$e(o, p); }

  var F7BlockTitle =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$e(F7BlockTitle, _React$Component);

    function F7BlockTitle(props, context) {
      _classCallCheck$e(this, F7BlockTitle);

      return _possibleConstructorReturn$e(this, _getPrototypeOf$e(F7BlockTitle).call(this, props, context));
    }

    _createClass$e(F7BlockTitle, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            large = props.large,
            medium = props.medium;
        var classes = Utils.classNames(className, 'block-title', {
          'block-title-large': large,
          'block-title-medium': medium
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7BlockTitle;
  }(React.Component);

  __reactComponentSetProps(F7BlockTitle, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    large: Boolean,
    medium: Boolean
  }, Mixins.colorProps));

  F7BlockTitle.displayName = 'f7-block-title';

  function _typeof$f(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$f = function _typeof(obj) { return typeof obj; }; } else { _typeof$f = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$f(obj); }

  function _classCallCheck$f(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$f(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$f(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$f(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$f(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$f(self, call) { if (call && (_typeof$f(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$f(self); }

  function _getPrototypeOf$f(o) { _getPrototypeOf$f = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$f(o); }

  function _assertThisInitialized$f(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$f(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$f(subClass, superClass); } }

  function _setPrototypeOf$f(o, p) { _setPrototypeOf$f = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$f(o, p); }

  var F7Block =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$f(F7Block, _React$Component);

    function F7Block(props, context) {
      var _this;

      _classCallCheck$f(this, F7Block);

      _this = _possibleConstructorReturn$f(this, _getPrototypeOf$f(F7Block).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$f(_this), ['onTabShow', 'onTabHide']);
      })();

      return _this;
    }

    _createClass$f(F7Block, [{
      key: "onTabShow",
      value: function onTabShow(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('tabShow tab:show');
      }
    }, {
      key: "onTabHide",
      value: function onTabHide(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('tabHide tab:hide');
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var className = props.className,
            inset = props.inset,
            xsmallInset = props.xsmallInset,
            smallInset = props.smallInset,
            mediumInset = props.mediumInset,
            largeInset = props.largeInset,
            xlargeInset = props.xlargeInset,
            strong = props.strong,
            accordionList = props.accordionList,
            tabs = props.tabs,
            tab = props.tab,
            tabActive = props.tabActive,
            noHairlines = props.noHairlines,
            noHairlinesIos = props.noHairlinesIos,
            noHairlinesMd = props.noHairlinesMd,
            noHairlinesAurora = props.noHairlinesAurora,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'block', {
          inset: inset,
          'xsmall-inset': xsmallInset,
          'small-inset': smallInset,
          'medium-inset': mediumInset,
          'large-inset': largeInset,
          'xlarge-inset': xlargeInset,
          'block-strong': strong,
          'accordion-list': accordionList,
          tabs: tabs,
          tab: tab,
          'tab-active': tabActive,
          'no-hairlines': noHairlines,
          'no-hairlines-md': noHairlinesMd,
          'no-hairlines-ios': noHairlinesIos,
          'no-hairlines-aurora': noHairlinesAurora
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          }
        }, this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var el = this.refs.el;
        if (!el || !this.$f7) { return; }
        this.$f7.off('tabShow', this.onTabShow);
        this.$f7.off('tabHide', this.onTabHide);
        delete this.eventTargetEl;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        if (!el) { return; }
        self.eventTargetEl = el;
        self.$f7ready(function (f7) {
          f7.on('tabShow', self.onTabShow);
          f7.on('tabHide', self.onTabHide);
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7Block;
  }(React.Component);

  __reactComponentSetProps(F7Block, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    inset: Boolean,
    xsmallInset: Boolean,
    smallInset: Boolean,
    mediumInset: Boolean,
    largeInset: Boolean,
    xlargeInset: Boolean,
    strong: Boolean,
    tabs: Boolean,
    tab: Boolean,
    tabActive: Boolean,
    accordionList: Boolean,
    noHairlines: Boolean,
    noHairlinesMd: Boolean,
    noHairlinesIos: Boolean,
    noHairlinesAurora: Boolean
  }, Mixins.colorProps));

  F7Block.displayName = 'f7-block';

  function _typeof$g(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$g = function _typeof(obj) { return typeof obj; }; } else { _typeof$g = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$g(obj); }

  function _classCallCheck$g(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$g(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$g(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$g(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$g(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$g(self, call) { if (call && (_typeof$g(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$g(self); }

  function _getPrototypeOf$g(o) { _getPrototypeOf$g = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$g(o); }

  function _assertThisInitialized$g(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$g(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$g(subClass, superClass); } }

  function _setPrototypeOf$g(o, p) { _setPrototypeOf$g = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$g(o, p); }

  var F7Icon =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$g(F7Icon, _React$Component);

    function F7Icon(props, context) {
      var _this;

      _classCallCheck$g(this, F7Icon);

      _this = _possibleConstructorReturn$g(this, _getPrototypeOf$g(F7Icon).call(this, props, context));
      _this.__reactRefs = {};

      _this.state = function () {
        var self = _assertThisInitialized$g(_this);

        var $f7 = self.$f7;

        if (!$f7) {
          self.$f7ready(function () {
            self.setState({
              _theme: self.$theme
            });
          });
        }

        return {
          _theme: $f7 ? self.$theme : null
        };
      }();

      return _this;
    }

    _createClass$g(F7Icon, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var id = props.id,
            style = props.style;
        var size = props.size;

        if (typeof size === 'number' || parseFloat(size) === size * 1) {
          size = "".concat(size, "px");
        }

        return React.createElement('i', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: Utils.extend({
            fontSize: size,
            width: size,
            height: size
          }, style),
          className: self.classes
        }, self.iconTextComputed, this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;

        if (self.f7Tooltip && self.f7Tooltip.destroy) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        if (!el) { return; }
        var tooltip = self.props.tooltip;
        if (!tooltip) { return; }
        self.$f7ready(function (f7) {
          self.f7Tooltip = f7.tooltip.create({
            targetEl: el,
            text: tooltip
          });
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
          var self = _this3;

          if (!newText && self.f7Tooltip) {
            self.f7Tooltip.destroy();
            self.f7Tooltip = null;
            delete self.f7Tooltip;
            return;
          }

          if (newText && !self.f7Tooltip && self.$f7) {
            self.f7Tooltip = self.$f7.tooltip.create({
              targetEl: self.refs.el,
              text: newText
            });
            return;
          }

          if (!newText || !self.f7Tooltip) { return; }
          self.f7Tooltip.setText(newText);
        });
      }
    }, {
      key: "iconTextComputed",
      get: function get() {
        var self = this;
        var _self$props = self.props,
            material = _self$props.material,
            f7 = _self$props.f7,
            md = _self$props.md,
            ios = _self$props.ios,
            aurora = _self$props.aurora;
        var theme = self.state._theme;
        var text = material || f7;

        if (md && theme && theme.md && (md.indexOf('material:') >= 0 || md.indexOf('f7:') >= 0)) {
          text = md.split(':')[1];
        } else if (ios && theme && theme.ios && (ios.indexOf('material:') >= 0 || ios.indexOf('f7:') >= 0)) {
          text = ios.split(':')[1];
        } else if (aurora && theme && theme.aurora && (aurora.indexOf('material:') >= 0 || aurora.indexOf('f7:') >= 0)) {
          text = aurora.split(':')[1];
        }

        return text;
      }
    }, {
      key: "classes",
      get: function get() {
        var classes = {
          icon: true
        };
        var self = this;
        var props = self.props;
        var theme = self.state._theme;
        var material = props.material,
            f7 = props.f7,
            icon = props.icon,
            md = props.md,
            ios = props.ios,
            aurora = props.aurora,
            className = props.className;
        var themeIcon;
        if (theme && theme.ios) { themeIcon = ios; }else if (theme && theme.md) { themeIcon = md; }else if (theme && theme.aurora) { themeIcon = aurora; }

        if (themeIcon) {
          var parts = themeIcon.split(':');
          var prop = parts[0];
          var value = parts[1];

          if (prop === 'material' || prop === 'f7') {
            classes['material-icons'] = prop === 'material';
            classes['f7-icons'] = prop === 'f7';
          }

          if (prop === 'icon') {
            classes[value] = true;
          }
        } else {
          classes = {
            icon: true,
            'material-icons': material,
            'f7-icons': f7
          };
          if (icon) { classes[icon] = true; }
        }

        return Utils.classNames(className, classes, Mixins.colorClasses(props));
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

    return F7Icon;
  }(React.Component);

  __reactComponentSetProps(F7Icon, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    material: String,
    f7: String,
    icon: String,
    ios: String,
    aurora: String,
    md: String,
    tooltip: String,
    size: [String, Number]
  }, Mixins.colorProps));

  F7Icon.displayName = 'f7-icon';

  function _typeof$h(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$h = function _typeof(obj) { return typeof obj; }; } else { _typeof$h = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$h(obj); }

  function _classCallCheck$h(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$h(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$h(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$h(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$h(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$h(self, call) { if (call && (_typeof$h(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$h(self); }

  function _getPrototypeOf$h(o) { _getPrototypeOf$h = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$h(o); }

  function _assertThisInitialized$h(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$h(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$h(subClass, superClass); } }

  function _setPrototypeOf$h(o, p) { _setPrototypeOf$h = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$h(o, p); }

  var F7Button =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$h(F7Button, _React$Component);

    function F7Button(props, context) {
      var _this;

      _classCallCheck$h(this, F7Button);

      _this = _possibleConstructorReturn$h(this, _getPrototypeOf$h(F7Button).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$h(_this), ['onClick']);
      })();

      return _this;
    }

    _createClass$h(F7Button, [{
      key: "onClick",
      value: function onClick(event) {
        this.dispatchEvent('click', event);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var iconEl;
        var textEl;
        var props = self.props;
        var text = props.text,
            icon = props.icon,
            iconMaterial = props.iconMaterial,
            iconF7 = props.iconF7,
            iconMd = props.iconMd,
            iconIos = props.iconIos,
            iconAurora = props.iconAurora,
            iconColor = props.iconColor,
            iconSize = props.iconSize,
            id = props.id,
            style = props.style,
            type = props.type;

        if (text) {
          textEl = React.createElement('span', null, text);
        }

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

        var ButtonTag = type === 'submit' || type === 'reset' || type === 'button' ? 'button' : 'a';
        return React.createElement(ButtonTag, Object.assign({
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: self.classes
        }, self.attrs), iconEl, textEl, this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        var el = self.refs.el;
        el.removeEventListener('click', self.onClick);
        delete el.f7RouteProps;

        if (self.f7Tooltip && self.f7Tooltip.destroy) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
          var self = _this3;

          if (!newText && self.f7Tooltip) {
            self.f7Tooltip.destroy();
            self.f7Tooltip = null;
            delete self.f7Tooltip;
            return;
          }

          if (newText && !self.f7Tooltip && self.$f7) {
            self.f7Tooltip = self.$f7.tooltip.create({
              targetEl: self.refs.el,
              text: newText
            });
            return;
          }

          if (!newText || !self.f7Tooltip) { return; }
          self.f7Tooltip.setText(newText);
        });

        var self = this;
        var el = self.refs.el;
        var routeProps = self.props.routeProps;

        if (routeProps) {
          el.f7RouteProps = routeProps;
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        el.addEventListener('click', self.onClick);
        var _self$props = self.props,
            tooltip = _self$props.tooltip,
            routeProps = _self$props.routeProps;

        if (routeProps) {
          el.f7RouteProps = routeProps;
        }

        if (!tooltip) { return; }
        self.$f7ready(function (f7) {
          self.f7Tooltip = f7.tooltip.create({
            targetEl: el,
            text: tooltip
          });
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "attrs",
      get: function get() {
        var self = this;
        var props = self.props;
        var href = props.href,
            target = props.target,
            tabLink = props.tabLink,
            type = props.type;
        var hrefComputed = href;
        if (href === true) { hrefComputed = '#'; }
        if (href === false) { hrefComputed = undefined; }
        return Utils.extend({
          href: hrefComputed,
          target: target,
          type: type,
          'data-tab': Utils.isStringProp(tabLink) && tabLink || undefined
        }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
      }
    }, {
      key: "classes",
      get: function get() {
        var self = this;
        var props = self.props;
        var tabLink = props.tabLink,
            tabLinkActive = props.tabLinkActive,
            round = props.round,
            roundIos = props.roundIos,
            roundAurora = props.roundAurora,
            roundMd = props.roundMd,
            fill = props.fill,
            fillIos = props.fillIos,
            fillAurora = props.fillAurora,
            fillMd = props.fillMd,
            large = props.large,
            largeIos = props.largeIos,
            largeAurora = props.largeAurora,
            largeMd = props.largeMd,
            small = props.small,
            smallIos = props.smallIos,
            smallAurora = props.smallAurora,
            smallMd = props.smallMd,
            raised = props.raised,
            raisedIos = props.raisedIos,
            raisedAurora = props.raisedAurora,
            raisedMd = props.raisedMd,
            active = props.active,
            outline = props.outline,
            outlineIos = props.outlineIos,
            outlineAurora = props.outlineAurora,
            outlineMd = props.outlineMd,
            disabled = props.disabled,
            className = props.className;
        return Utils.classNames(className, 'button', {
          'tab-link': tabLink || tabLink === '',
          'tab-link-active': tabLinkActive,
          'button-round': round,
          'button-round-ios': roundIos,
          'button-round-aurora': roundAurora,
          'button-round-md': roundMd,
          'button-fill': fill,
          'button-fill-ios': fillIos,
          'button-fill-aurora': fillAurora,
          'button-fill-md': fillMd,
          'button-large': large,
          'button-large-ios': largeIos,
          'button-large-aurora': largeAurora,
          'button-large-md': largeMd,
          'button-small': small,
          'button-small-ios': smallIos,
          'button-small-aurora': smallAurora,
          'button-small-md': smallMd,
          'button-raised': raised,
          'button-raised-ios': raisedIos,
          'button-raised-aurora': raisedAurora,
          'button-raised-md': raisedMd,
          'button-active': active,
          'button-outline': outline,
          'button-outline-ios': outlineIos,
          'button-outline-aurora': outlineAurora,
          'button-outline-md': outlineMd,
          disabled: disabled
        }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
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

    return F7Button;
  }(React.Component);

  __reactComponentSetProps(F7Button, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    text: String,
    tabLink: [Boolean, String],
    tabLinkActive: Boolean,
    type: String,
    href: {
      type: [String, Boolean],
      default: '#'
    },
    target: String,
    round: Boolean,
    roundMd: Boolean,
    roundIos: Boolean,
    roundAurora: Boolean,
    fill: Boolean,
    fillMd: Boolean,
    fillIos: Boolean,
    fillAurora: Boolean,
    large: Boolean,
    largeMd: Boolean,
    largeIos: Boolean,
    largeAurora: Boolean,
    small: Boolean,
    smallMd: Boolean,
    smallIos: Boolean,
    smallAurora: Boolean,
    raised: Boolean,
    raisedMd: Boolean,
    raisedIos: Boolean,
    raisedAurora: Boolean,
    outline: Boolean,
    outlineMd: Boolean,
    outlineIos: Boolean,
    outlineAurora: Boolean,
    active: Boolean,
    disabled: Boolean,
    tooltip: String
  }, Mixins.colorProps, {}, Mixins.linkIconProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps));

  F7Button.displayName = 'f7-button';

  function _typeof$i(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$i = function _typeof(obj) { return typeof obj; }; } else { _typeof$i = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$i(obj); }

  function _classCallCheck$i(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$i(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$i(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$i(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$i(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$i(self, call) { if (call && (_typeof$i(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$i(self); }

  function _assertThisInitialized$i(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$i(o) { _getPrototypeOf$i = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$i(o); }

  function _inherits$i(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$i(subClass, superClass); } }

  function _setPrototypeOf$i(o, p) { _setPrototypeOf$i = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$i(o, p); }

  var F7CardContent =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$i(F7CardContent, _React$Component);

    function F7CardContent(props, context) {
      _classCallCheck$i(this, F7CardContent);

      return _possibleConstructorReturn$i(this, _getPrototypeOf$i(F7CardContent).call(this, props, context));
    }

    _createClass$i(F7CardContent, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var id = props.id,
            className = props.className,
            style = props.style,
            padding = props.padding;
        var classes = Utils.classNames(className, 'card-content', {
          'card-content-padding': padding
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7CardContent;
  }(React.Component);

  __reactComponentSetProps(F7CardContent, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    padding: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps));

  F7CardContent.displayName = 'f7-card-content';

  function _typeof$j(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$j = function _typeof(obj) { return typeof obj; }; } else { _typeof$j = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$j(obj); }

  function _classCallCheck$j(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$j(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$j(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$j(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$j(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$j(self, call) { if (call && (_typeof$j(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$j(self); }

  function _assertThisInitialized$j(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$j(o) { _getPrototypeOf$j = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$j(o); }

  function _inherits$j(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$j(subClass, superClass); } }

  function _setPrototypeOf$j(o, p) { _setPrototypeOf$j = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$j(o, p); }

  var F7CardFooter =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$j(F7CardFooter, _React$Component);

    function F7CardFooter(props, context) {
      _classCallCheck$j(this, F7CardFooter);

      return _possibleConstructorReturn$j(this, _getPrototypeOf$j(F7CardFooter).call(this, props, context));
    }

    _createClass$j(F7CardFooter, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'card-footer', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7CardFooter;
  }(React.Component);

  __reactComponentSetProps(F7CardFooter, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7CardFooter.displayName = 'f7-card-footer';

  function _typeof$k(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$k = function _typeof(obj) { return typeof obj; }; } else { _typeof$k = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$k(obj); }

  function _classCallCheck$k(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$k(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$k(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$k(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$k(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$k(self, call) { if (call && (_typeof$k(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$k(self); }

  function _assertThisInitialized$k(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$k(o) { _getPrototypeOf$k = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$k(o); }

  function _inherits$k(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$k(subClass, superClass); } }

  function _setPrototypeOf$k(o, p) { _setPrototypeOf$k = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$k(o, p); }

  var F7CardHeader =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$k(F7CardHeader, _React$Component);

    function F7CardHeader(props, context) {
      _classCallCheck$k(this, F7CardHeader);

      return _possibleConstructorReturn$k(this, _getPrototypeOf$k(F7CardHeader).call(this, props, context));
    }

    _createClass$k(F7CardHeader, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'card-header', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7CardHeader;
  }(React.Component);

  __reactComponentSetProps(F7CardHeader, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7CardHeader.displayName = 'f7-card-header';

  function _typeof$l(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$l = function _typeof(obj) { return typeof obj; }; } else { _typeof$l = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$l(obj); }

  function _classCallCheck$l(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$l(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$l(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$l(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$l(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$l(self, call) { if (call && (_typeof$l(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$l(self); }

  function _getPrototypeOf$l(o) { _getPrototypeOf$l = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$l(o); }

  function _assertThisInitialized$l(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$l(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$l(subClass, superClass); } }

  function _setPrototypeOf$l(o, p) { _setPrototypeOf$l = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$l(o, p); }

  var F7Card =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$l(F7Card, _React$Component);

    function F7Card(props, context) {
      var _this;

      _classCallCheck$l(this, F7Card);

      _this = _possibleConstructorReturn$l(this, _getPrototypeOf$l(F7Card).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$l(_this), 'onBeforeOpen onOpen onOpened onClose onClosed'.split(' '));
      })();

      return _this;
    }

    _createClass$l(F7Card, [{
      key: "open",
      value: function open() {
        var self = this;
        if (!self.refs.el) { return; }
        self.$f7.card.open(self.refs.el);
      }
    }, {
      key: "close",
      value: function close() {
        var self = this;
        if (!self.refs.el) { return; }
        self.$f7.card.close(self.refs.el);
      }
    }, {
      key: "onBeforeOpen",
      value: function onBeforeOpen(el, prevent) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('cardBeforeOpen card:beforeopen', el, prevent);
      }
    }, {
      key: "onOpen",
      value: function onOpen(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('cardOpen card:open', el);
      }
    }, {
      key: "onOpened",
      value: function onOpened(el, pageEl) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('cardOpened card:opened', el, pageEl);
      }
    }, {
      key: "onClose",
      value: function onClose(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('cardClose card:close', el);
      }
    }, {
      key: "onClosed",
      value: function onClosed(el, pageEl) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('cardClosed card:closed', el, pageEl);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            title = props.title,
            content = props.content,
            footer = props.footer,
            padding = props.padding,
            outline = props.outline,
            expandable = props.expandable,
            expandableAnimateWidth = props.expandableAnimateWidth,
            animate = props.animate,
            hideNavbarOnOpen = props.hideNavbarOnOpen,
            hideToolbarOnOpen = props.hideToolbarOnOpen,
            hideStatusbarOnOpen = props.hideStatusbarOnOpen,
            swipeToClose = props.swipeToClose,
            closeByBackdropClick = props.closeByBackdropClick,
            backdrop = props.backdrop,
            backdropEl = props.backdropEl,
            noShadow = props.noShadow,
            noBorder = props.noBorder;
        var headerEl;
        var contentEl;
        var footerEl;
        var classes = Utils.classNames(className, 'card', {
          'card-outline': outline,
          'card-expandable': expandable,
          'card-expandable-animate-width': expandableAnimateWidth,
          'no-shadow': noShadow,
          'no-border': noBorder
        }, Mixins.colorClasses(props));

        if (title || self.slots && self.slots.header) {
          headerEl = React.createElement(F7CardHeader, null, title, this.slots['header']);
        }

        if (content || self.slots && self.slots.content) {
          contentEl = React.createElement(F7CardContent, {
            padding: padding
          }, content, this.slots['content']);
        }

        if (footer || self.slots && self.slots.footer) {
          footerEl = React.createElement(F7CardFooter, null, footer, this.slots['footer']);
        }

        return React.createElement('div', {
          id: id,
          style: style,
          className: classes,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          'data-animate': typeof animate === 'undefined' ? animate : animate.toString(),
          'data-hide-navbar-on-open': typeof hideNavbarOnOpen === 'undefined' ? hideNavbarOnOpen : hideNavbarOnOpen.toString(),
          'data-hide-toolbar-on-open': typeof hideToolbarOnOpen === 'undefined' ? hideToolbarOnOpen : hideToolbarOnOpen.toString(),
          'data-hide-statusbar-on-open': typeof hideStatusbarOnOpen === 'undefined' ? hideStatusbarOnOpen : hideStatusbarOnOpen.toString(),
          'data-swipe-to-close': typeof swipeToClose === 'undefined' ? swipeToClose : swipeToClose.toString(),
          'data-close-by-backdrop-click': typeof closeByBackdropClick === 'undefined' ? closeByBackdropClick : closeByBackdropClick.toString(),
          'data-backdrop': typeof backdrop === 'undefined' ? backdrop : backdrop.toString(),
          'data-backdrop-el': backdropEl
        }, headerEl, contentEl, footerEl, this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        if (!self.props.expandable) { return; }
        var el = self.refs.el;
        if (!el || !self.$f7) { return; }
        self.$f7.off('cardBeforeOpen', self.onBeforeOpen);
        self.$f7.off('cardOpen', self.onOpen);
        self.$f7.off('cardOpened', self.onOpened);
        self.$f7.off('cardClose', self.onClose);
        self.$f7.off('cardClosed', self.onClosed);
        self.eventTargetEl = null;
        delete self.eventTargetEl;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        if (!self.props.expandable) { return; }
        var el = self.refs.el;
        if (!el) { return; }
        self.eventTargetEl = el;
        self.$f7ready(function (f7) {
          f7.on('cardBeforeOpen', self.onBeforeOpen);
          f7.on('cardOpen', self.onOpen);
          f7.on('cardOpened', self.onOpened);
          f7.on('cardClose', self.onClose);
          f7.on('cardClosed', self.onClosed);

          if (self.props.expandable && self.props.expandableOpened) {
            self.$f7.card.open(el, false);
          }
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.expandableOpened', prevProps, prevState, function (expandableOpened) {
          var self = _this3;

          if (expandableOpened) {
            self.open();
          } else {
            self.close();
          }
        });
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

    return F7Card;
  }(React.Component);

  __reactComponentSetProps(F7Card, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    title: [String, Number],
    content: [String, Number],
    footer: [String, Number],
    outline: Boolean,
    expandable: Boolean,
    expandableAnimateWidth: Boolean,
    expandableOpened: Boolean,
    animate: {
      type: Boolean,
      default: undefined
    },
    hideNavbarOnOpen: {
      type: Boolean,
      default: undefined
    },
    hideToolbarOnOpen: {
      type: Boolean,
      default: undefined
    },
    hideStatusbarOnOpen: {
      type: Boolean,
      default: undefined
    },
    swipeToClose: {
      type: Boolean,
      default: undefined
    },
    closeByBackdropClick: {
      type: Boolean,
      default: undefined
    },
    backdrop: {
      type: Boolean,
      default: undefined
    },
    backdropEl: {
      type: String,
      default: undefined
    },
    noShadow: Boolean,
    noBorder: Boolean,
    padding: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps));

  F7Card.displayName = 'f7-card';

  function _typeof$m(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$m = function _typeof(obj) { return typeof obj; }; } else { _typeof$m = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$m(obj); }

  function _classCallCheck$m(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$m(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$m(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$m(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$m(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$m(self, call) { if (call && (_typeof$m(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$m(self); }

  function _getPrototypeOf$m(o) { _getPrototypeOf$m = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$m(o); }

  function _assertThisInitialized$m(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$m(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$m(subClass, superClass); } }

  function _setPrototypeOf$m(o, p) { _setPrototypeOf$m = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$m(o, p); }

  var F7Checkbox =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$m(F7Checkbox, _React$Component);

    function F7Checkbox(props, context) {
      var _this;

      _classCallCheck$m(this, F7Checkbox);

      _this = _possibleConstructorReturn$m(this, _getPrototypeOf$m(F7Checkbox).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$m(_this), ['onChange']);
      })();

      return _this;
    }

    _createClass$m(F7Checkbox, [{
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
        var name = props.name,
            value = props.value,
            disabled = props.disabled,
            readonly = props.readonly,
            checked = props.checked,
            defaultChecked = props.defaultChecked,
            id = props.id,
            style = props.style;
        var inputEl;
        {
          inputEl = React.createElement('input', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['inputEl'] = __reactNode;
            },
            type: 'checkbox',
            name: name,
            value: value,
            disabled: disabled,
            readOnly: readonly,
            checked: checked,
            defaultChecked: defaultChecked,
            onChange: self.onChange
          });
        }
        var iconEl = React.createElement('i', {
          className: 'icon-checkbox'
        });
        return React.createElement('label', {
          id: id,
          style: style,
          className: self.classes
        }, inputEl, iconEl, this.slots['default']);
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
        var inputEl = self.refs.inputEl;
        var indeterminate = self.props.indeterminate;

        if (indeterminate && inputEl) {
          inputEl.indeterminate = true;
        }
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "classes",
      get: function get() {
        var self = this;
        var props = self.props;
        var className = props.className,
            disabled = props.disabled;
        return Utils.classNames(className, {
          checkbox: true,
          disabled: disabled
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

    return F7Checkbox;
  }(React.Component);

  __reactComponentSetProps(F7Checkbox, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    checked: Boolean,
    indeterminate: Boolean,
    name: [Number, String],
    value: [Number, String, Boolean],
    disabled: Boolean,
    readonly: Boolean,
    defaultChecked: Boolean
  }, Mixins.colorProps));

  F7Checkbox.displayName = 'f7-checkbox';

  function _typeof$n(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$n = function _typeof(obj) { return typeof obj; }; } else { _typeof$n = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$n(obj); }

  function _classCallCheck$n(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$n(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$n(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$n(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$n(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$n(self, call) { if (call && (_typeof$n(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$n(self); }

  function _getPrototypeOf$n(o) { _getPrototypeOf$n = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$n(o); }

  function _assertThisInitialized$n(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$n(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$n(subClass, superClass); } }

  function _setPrototypeOf$n(o, p) { _setPrototypeOf$n = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$n(o, p); }

  var F7Chip =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$n(F7Chip, _React$Component);

    function F7Chip(props, context) {
      var _this;

      _classCallCheck$n(this, F7Chip);

      _this = _possibleConstructorReturn$n(this, _getPrototypeOf$n(F7Chip).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$n(_this), ['onClick', 'onDeleteClick']);
      })();

      return _this;
    }

    _createClass$n(F7Chip, [{
      key: "onClick",
      value: function onClick(event) {
        this.dispatchEvent('click', event);
      }
    }, {
      key: "onDeleteClick",
      value: function onDeleteClick(event) {
        this.dispatchEvent('delete', event);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var media = props.media,
            text = props.text,
            deleteable = props.deleteable,
            className = props.className,
            id = props.id,
            style = props.style,
            mediaTextColor = props.mediaTextColor,
            mediaBgColor = props.mediaBgColor,
            outline = props.outline;
        var mediaEl;
        var labelEl;
        var deleteEl;

        if (media || self.slots && self.slots.media) {
          var mediaClasses = Utils.classNames('chip-media', mediaTextColor && "text-color-".concat(mediaTextColor), mediaBgColor && "bg-color-".concat(mediaBgColor));
          mediaEl = React.createElement('div', {
            className: mediaClasses
          }, media || this.slots['media']);
        }

        if (text || self.slots && self.slots.text) {
          labelEl = React.createElement('div', {
            className: 'chip-label'
          }, text, this.slots['text']);
        }

        if (deleteable) {
          deleteEl = React.createElement('a', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['deleteEl'] = __reactNode;
            },
            className: 'chip-delete'
          });
        }

        var classes = Utils.classNames(className, 'chip', {
          'chip-outline': outline
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes
        }, mediaEl, labelEl, deleteEl);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.refs.el.removeEventListener('click', this.onClick);

        if (this.refs.deleteEl) {
          this.refs.deleteEl.removeEventListener('click', this.onDeleteClick);
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.refs.el.addEventListener('click', this.onClick);

        if (this.refs.deleteEl) {
          this.refs.deleteEl.addEventListener('click', this.onDeleteClick);
        }
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7Chip;
  }(React.Component);

  __reactComponentSetProps(F7Chip, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    media: String,
    text: [String, Number],
    deleteable: Boolean,
    mediaBgColor: String,
    mediaTextColor: String,
    outline: Boolean
  }, Mixins.colorProps));

  F7Chip.displayName = 'f7-chip';

  function _typeof$o(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$o = function _typeof(obj) { return typeof obj; }; } else { _typeof$o = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$o(obj); }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _classCallCheck$o(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$o(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$o(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$o(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$o(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$o(self, call) { if (call && (_typeof$o(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$o(self); }

  function _getPrototypeOf$o(o) { _getPrototypeOf$o = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$o(o); }

  function _assertThisInitialized$o(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$o(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$o(subClass, superClass); } }

  function _setPrototypeOf$o(o, p) { _setPrototypeOf$o = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$o(o, p); }

  var F7Col =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$o(F7Col, _React$Component);

    function F7Col(props, context) {
      var _this;

      _classCallCheck$o(this, F7Col);

      _this = _possibleConstructorReturn$o(this, _getPrototypeOf$o(F7Col).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$o(_this), ['onClick']);
      })();

      return _this;
    }

    _createClass$o(F7Col, [{
      key: "onClick",
      value: function onClick(event) {
        this.dispatchEvent('click', event);
      }
    }, {
      key: "render",
      value: function render() {
        var _Utils$classNames,
            _this2 = this;

        var self = this;
        var props = self.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            tag = props.tag,
            width = props.width,
            xsmall = props.xsmall,
            small = props.small,
            medium = props.medium,
            large = props.large,
            xlarge = props.xlarge;
        var ColTag = tag;
        var classes = Utils.classNames(className, (_Utils$classNames = {
          col: width === 'auto'
        }, _defineProperty(_Utils$classNames, "col-".concat(width), width !== 'auto'), _defineProperty(_Utils$classNames, "xsmall-".concat(xsmall), xsmall), _defineProperty(_Utils$classNames, "small-".concat(small), small), _defineProperty(_Utils$classNames, "medium-".concat(medium), medium), _defineProperty(_Utils$classNames, "large-".concat(large), large), _defineProperty(_Utils$classNames, "xlarge-".concat(xlarge), xlarge), _Utils$classNames), Mixins.colorClasses(props));
        return React.createElement(ColTag, {
          id: id,
          style: style,
          className: classes,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          }
        }, this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.refs.el.removeEventListener('click', this.onClick);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.refs.el.addEventListener('click', this.onClick);
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7Col;
  }(React.Component);

  __reactComponentSetProps(F7Col, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    tag: {
      type: String,
      default: 'div'
    },
    width: {
      type: [Number, String],
      default: 'auto'
    },
    xsmall: {
      type: [Number, String]
    },
    small: {
      type: [Number, String]
    },
    medium: {
      type: [Number, String]
    },
    large: {
      type: [Number, String]
    },
    xlarge: {
      type: [Number, String]
    }
  }, Mixins.colorProps));

  F7Col.displayName = 'f7-col';

  function _typeof$p(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$p = function _typeof(obj) { return typeof obj; }; } else { _typeof$p = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$p(obj); }

  function _classCallCheck$p(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$p(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$p(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$p(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$p(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$p(self, call) { if (call && (_typeof$p(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$p(self); }

  function _getPrototypeOf$p(o) { _getPrototypeOf$p = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$p(o); }

  function _assertThisInitialized$p(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$p(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$p(subClass, superClass); } }

  function _setPrototypeOf$p(o, p) { _setPrototypeOf$p = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$p(o, p); }

  var F7FabButton =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$p(F7FabButton, _React$Component);

    function F7FabButton(props, context) {
      var _this;

      _classCallCheck$p(this, F7FabButton);

      _this = _possibleConstructorReturn$p(this, _getPrototypeOf$p(F7FabButton).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$p(_this), ['onClick']);
      })();

      return _this;
    }

    _createClass$p(F7FabButton, [{
      key: "onClick",
      value: function onClick(event) {
        this.dispatchEvent('click', event);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            fabClose = props.fabClose,
            label = props.label,
            target = props.target;
        var classes = Utils.classNames(className, {
          'fab-close': fabClose,
          'fab-label-button': label
        }, Mixins.colorClasses(props));
        var labelEl;

        if (label) {
          labelEl = React.createElement('span', {
            className: 'fab-label'
          }, label);
        }

        return React.createElement('a', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          target: target,
          className: classes
        }, this.slots['default'], labelEl);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        self.refs.el.removeEventListener('click', self.onClick);

        if (self.f7Tooltip && self.f7Tooltip.destroy) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        self.refs.el.addEventListener('click', self.onClick);
        var tooltip = self.props.tooltip;
        if (!tooltip) { return; }
        self.$f7ready(function (f7) {
          self.f7Tooltip = f7.tooltip.create({
            targetEl: self.refs.el,
            text: tooltip
          });
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
          var self = _this3;

          if (!newText && self.f7Tooltip) {
            self.f7Tooltip.destroy();
            self.f7Tooltip = null;
            delete self.f7Tooltip;
            return;
          }

          if (newText && !self.f7Tooltip && self.$f7) {
            self.f7Tooltip = self.$f7.tooltip.create({
              targetEl: self.refs.el,
              text: newText
            });
            return;
          }

          if (!newText || !self.f7Tooltip) { return; }
          self.f7Tooltip.setText(newText);
        });
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

    return F7FabButton;
  }(React.Component);

  __reactComponentSetProps(F7FabButton, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    fabClose: Boolean,
    label: String,
    target: String,
    tooltip: String
  }, Mixins.colorProps));

  F7FabButton.displayName = 'f7-fab-button';

  function _typeof$q(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$q = function _typeof(obj) { return typeof obj; }; } else { _typeof$q = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$q(obj); }

  function _classCallCheck$q(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$q(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$q(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$q(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$q(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$q(self, call) { if (call && (_typeof$q(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$q(self); }

  function _assertThisInitialized$q(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$q(o) { _getPrototypeOf$q = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$q(o); }

  function _inherits$q(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$q(subClass, superClass); } }

  function _setPrototypeOf$q(o, p) { _setPrototypeOf$q = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$q(o, p); }

  var F7FabButtons =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$q(F7FabButtons, _React$Component);

    function F7FabButtons(props, context) {
      _classCallCheck$q(this, F7FabButtons);

      return _possibleConstructorReturn$q(this, _getPrototypeOf$q(F7FabButtons).call(this, props, context));
    }

    _createClass$q(F7FabButtons, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            position = props.position;
        var classes = Utils.classNames(className, 'fab-buttons', "fab-buttons-".concat(position), Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7FabButtons;
  }(React.Component);

  __reactComponentSetProps(F7FabButtons, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    position: {
      type: String,
      default: 'top'
    }
  }, Mixins.colorProps));

  F7FabButtons.displayName = 'f7-fab-buttons';

  function _typeof$r(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$r = function _typeof(obj) { return typeof obj; }; } else { _typeof$r = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$r(obj); }

  function _classCallCheck$r(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$r(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$r(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$r(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$r(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$r(self, call) { if (call && (_typeof$r(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$r(self); }

  function _getPrototypeOf$r(o) { _getPrototypeOf$r = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$r(o); }

  function _assertThisInitialized$r(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$r(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$r(subClass, superClass); } }

  function _setPrototypeOf$r(o, p) { _setPrototypeOf$r = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$r(o, p); }

  var F7Fab =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$r(F7Fab, _React$Component);

    function F7Fab(props, context) {
      var _this;

      _classCallCheck$r(this, F7Fab);

      _this = _possibleConstructorReturn$r(this, _getPrototypeOf$r(F7Fab).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$r(_this), ['onClick']);
      })();

      return _this;
    }

    _createClass$r(F7Fab, [{
      key: "onClick",
      value: function onClick(event) {
        var self = this;
        self.dispatchEvent('click', event);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            morphTo = props.morphTo,
            initialHref = props.href,
            position = props.position,
            text = props.text,
            target = props.target;
        var href = initialHref;
        if (href === true) { href = '#'; }
        if (href === false) { href = undefined; }
        var linkChildren = [];
        var rootChildren = [];
        var _self$slots = self.slots,
            linkSlots = _self$slots.link,
            defaultSlots = _self$slots.default,
            rootSlots = _self$slots.root,
            textSlots = _self$slots.text;

        if (defaultSlots) {
          for (var i = 0; i < defaultSlots.length; i += 1) {
            var child = defaultSlots[i];
            var isRoot = void 0;
            {
              var tag = child.type && (child.type.displayName || child.type.name);
              if (tag === 'F7FabButtons' || tag === 'f7-fab-buttons') { isRoot = true; }
            }
            if (isRoot) { rootChildren.push(child); }else { linkChildren.push(child); }
          }
        }

        var textEl;

        if (text || textSlots && textSlots.length) {
          textEl = React.createElement('div', {
            className: 'fab-text'
          }, text || textSlots);
        }

        var linkEl;

        if (linkChildren.length || linkSlots && linkSlots.length) {
          linkEl = React.createElement('a', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['linkEl'] = __reactNode;
            },
            target: target,
            href: href,
            key: 'f7-fab-link'
          }, linkChildren, textEl, linkSlots);
        }

        var classes = Utils.classNames(className, 'fab', "fab-".concat(position), {
          'fab-morph': morphTo,
          'fab-extended': typeof textEl !== 'undefined'
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes,
          'data-morph-to': morphTo
        }, linkEl, rootChildren, rootSlots);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;

        if (self.refs.linkEl) {
          self.refs.linkEl.removeEventListener('click', self.onClick);
        }

        if (self.f7Tooltip && self.f7Tooltip.destroy) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;

        if (self.refs.linkEl) {
          self.refs.linkEl.addEventListener('click', self.onClick);
        }

        var tooltip = self.props.tooltip;
        if (!tooltip) { return; }
        self.$f7ready(function (f7) {
          self.f7Tooltip = f7.tooltip.create({
            targetEl: self.refs.el,
            text: tooltip
          });
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
          var self = _this3;

          if (!newText && self.f7Tooltip) {
            self.f7Tooltip.destroy();
            self.f7Tooltip = null;
            delete self.f7Tooltip;
            return;
          }

          if (newText && !self.f7Tooltip && self.$f7) {
            self.f7Tooltip = self.$f7.tooltip.create({
              targetEl: self.refs.el,
              text: newText
            });
            return;
          }

          if (!newText || !self.f7Tooltip) { return; }
          self.f7Tooltip.setText(newText);
        });
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

    return F7Fab;
  }(React.Component);

  __reactComponentSetProps(F7Fab, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    morphTo: String,
    href: [Boolean, String],
    target: String,
    text: String,
    position: {
      type: String,
      default: 'right-bottom'
    },
    tooltip: String
  }, Mixins.colorProps));

  F7Fab.displayName = 'f7-fab';

  function _typeof$s(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$s = function _typeof(obj) { return typeof obj; }; } else { _typeof$s = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$s(obj); }

  function _classCallCheck$s(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$s(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$s(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$s(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$s(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$s(self, call) { if (call && (_typeof$s(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$s(self); }

  function _assertThisInitialized$s(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$s(o) { _getPrototypeOf$s = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$s(o); }

  function _inherits$s(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$s(subClass, superClass); } }

  function _setPrototypeOf$s(o, p) { _setPrototypeOf$s = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$s(o, p); }

  var F7Gauge =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$s(F7Gauge, _React$Component);

    function F7Gauge(props, context) {
      _classCallCheck$s(this, F7Gauge);

      return _possibleConstructorReturn$s(this, _getPrototypeOf$s(F7Gauge).call(this, props, context));
    }

    _createClass$s(F7Gauge, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            type = props.type,
            value = props.value,
            size = props.size,
            bgColor = props.bgColor,
            borderBgColor = props.borderBgColor,
            borderColor = props.borderColor,
            borderWidth = props.borderWidth,
            valueText = props.valueText,
            valueTextColor = props.valueTextColor,
            valueFontSize = props.valueFontSize,
            valueFontWeight = props.valueFontWeight,
            labelText = props.labelText,
            labelTextColor = props.labelTextColor,
            labelFontSize = props.labelFontSize,
            labelFontWeight = props.labelFontWeight;
        var classes = Utils.classNames(className, 'gauge');
        var semiCircle = type === 'semicircle';
        var radius = size / 2 - borderWidth / 2;
        var length = 2 * Math.PI * radius;
        var progress = Math.max(Math.min(value, 1), 0);
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, React.createElement('svg', {
          className: 'gauge-svg',
          width: "".concat(size, "px"),
          height: "".concat(semiCircle ? size / 2 : size, "px"),
          viewBox: "0 0 ".concat(size, " ").concat(semiCircle ? size / 2 : size)
        }, semiCircle && React.createElement('path', {
          className: 'gauge-back-semi',
          d: "M".concat(size - borderWidth / 2, ",").concat(size / 2, " a1,1 0 0,0 -").concat(size - borderWidth, ",0"),
          stroke: borderBgColor,
          strokeWidth: borderWidth,
          fill: bgColor || 'none'
        }), semiCircle && React.createElement('path', {
          className: 'gauge-front-semi',
          d: "M".concat(size - borderWidth / 2, ",").concat(size / 2, " a1,1 0 0,0 -").concat(size - borderWidth, ",0"),
          stroke: borderColor,
          strokeWidth: borderWidth,
          strokeDasharray: length / 2,
          strokeDashoffset: length / 2 * (1 + progress),
          fill: borderBgColor ? 'none' : bgColor || 'none'
        }), !semiCircle && borderBgColor && React.createElement('circle', {
          className: 'gauge-back-circle',
          stroke: borderBgColor,
          strokeWidth: borderWidth,
          fill: bgColor || 'none',
          cx: size / 2,
          cy: size / 2,
          r: radius
        }), !semiCircle && React.createElement('circle', {
          className: 'gauge-front-circle',
          transform: "rotate(-90 ".concat(size / 2, " ").concat(size / 2, ")"),
          stroke: borderColor,
          strokeWidth: borderWidth,
          strokeDasharray: length,
          strokeDashoffset: length * (1 - progress),
          fill: borderBgColor ? 'none' : bgColor || 'none',
          cx: size / 2,
          cy: size / 2,
          r: radius
        }), valueText && React.createElement('text', {
          className: 'gauge-value-text',
          x: '50%',
          y: semiCircle ? '100%' : '50%',
          fontWeight: valueFontWeight,
          fontSize: valueFontSize,
          fill: valueTextColor,
          dy: semiCircle ? labelText ? -labelFontSize - 15 : -5 : 0,
          textAnchor: 'middle',
          dominantBaseline: !semiCircle ? 'middle' : null
        }, valueText), labelText && React.createElement('text', {
          className: 'gauge-label-text',
          x: '50%',
          y: semiCircle ? '100%' : '50%',
          fontWeight: labelFontWeight,
          fontSize: labelFontSize,
          fill: labelTextColor,
          dy: semiCircle ? -5 : valueText ? valueFontSize / 2 + 10 : 0,
          textAnchor: 'middle',
          dominantBaseline: !semiCircle ? 'middle' : null
        }, labelText)));
      }
    }]);

    return F7Gauge;
  }(React.Component);

  __reactComponentSetProps(F7Gauge, {
    id: [String, Number],
    className: String,
    style: Object,
    type: {
      type: String,
      default: 'circle'
    },
    value: {
      type: [Number, String],
      default: 0
    },
    size: {
      type: [Number, String],
      default: 200
    },
    bgColor: {
      type: String,
      default: 'transparent'
    },
    borderBgColor: {
      type: String,
      default: '#eeeeee'
    },
    borderColor: {
      type: String,
      default: '#000000'
    },
    borderWidth: {
      type: [Number, String],
      default: 10
    },
    valueText: [Number, String],
    valueTextColor: {
      type: String,
      default: '#000000'
    },
    valueFontSize: {
      type: [Number, String],
      default: 31
    },
    valueFontWeight: {
      type: [Number, String],
      default: 500
    },
    labelText: String,
    labelTextColor: {
      type: String,
      default: '#888888'
    },
    labelFontSize: {
      type: [Number, String],
      default: 14
    },
    labelFontWeight: {
      type: [Number, String],
      default: 400
    }
  });

  F7Gauge.displayName = 'f7-gauge';

  function _typeof$t(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$t = function _typeof(obj) { return typeof obj; }; } else { _typeof$t = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$t(obj); }

  function _classCallCheck$t(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$t(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$t(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$t(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$t(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$t(self, call) { if (call && (_typeof$t(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$t(self); }

  function _getPrototypeOf$t(o) { _getPrototypeOf$t = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$t(o); }

  function _assertThisInitialized$t(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$t(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$t(subClass, superClass); } }

  function _setPrototypeOf$t(o, p) { _setPrototypeOf$t = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$t(o, p); }

  var F7Toggle =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$t(F7Toggle, _React$Component);

    function F7Toggle(props, context) {
      var _this;

      _classCallCheck$t(this, F7Toggle);

      _this = _possibleConstructorReturn$t(this, _getPrototypeOf$t(F7Toggle).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$t(_this), ['onChange']);
      })();

      return _this;
    }

    _createClass$t(F7Toggle, [{
      key: "toggle",
      value: function toggle() {
        var self = this;
        if (self.f7Toggle && self.f7Toggle.toggle) { self.f7Toggle.toggle(); }
      }
    }, {
      key: "onChange",
      value: function onChange(event) {
        var self = this;
        self.dispatchEvent('change', event);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var className = props.className,
            disabled = props.disabled,
            id = props.id,
            style = props.style,
            name = props.name,
            readonly = props.readonly,
            checked = props.checked,
            defaultChecked = props.defaultChecked,
            value = props.value;
        var labelClasses = Utils.classNames('toggle', className, {
          disabled: disabled
        }, Mixins.colorClasses(props));
        var inputEl;
        {
          inputEl = React.createElement('input', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['inputEl'] = __reactNode;
            },
            type: 'checkbox',
            name: name,
            disabled: disabled,
            readOnly: readonly,
            checked: checked,
            defaultChecked: defaultChecked,
            value: value,
            onChange: self.onChange
          });
        }
        return React.createElement('label', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: labelClasses
        }, inputEl, React.createElement('span', {
          className: 'toggle-icon'
        }));
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        if (self.f7Toggle && self.f7Toggle.destroy && self.f7Toggle.$el) { self.f7Toggle.destroy(); }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        if (!self.props.init) { return; }
        self.$f7ready(function (f7) {
          self.f7Toggle = f7.toggle.create({
            el: self.refs.el,
            on: {
              change: function change(toggle) {
                var checked = toggle.checked;
                self.dispatchEvent('toggle:change toggleChange', checked);
              }
            }
          });
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.checked', prevProps, prevState, function (newValue) {
          var self = _this3;
          if (!self.f7Toggle) { return; }
          self.f7Toggle.checked = newValue;
        });
      }
    }, {
      key: "refs",
      get: function get() {
        return this.__reactRefs;
      },
      set: function set(refs) {}
    }]);

    return F7Toggle;
  }(React.Component);

  __reactComponentSetProps(F7Toggle, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    init: {
      type: Boolean,
      default: true
    },
    checked: Boolean,
    defaultChecked: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    name: String,
    value: [String, Number, Array]
  }, Mixins.colorProps));

  F7Toggle.displayName = 'f7-toggle';

  function _typeof$u(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$u = function _typeof(obj) { return typeof obj; }; } else { _typeof$u = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$u(obj); }

  function _classCallCheck$u(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$u(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$u(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$u(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$u(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$u(self, call) { if (call && (_typeof$u(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$u(self); }

  function _assertThisInitialized$u(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$u(o) { _getPrototypeOf$u = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$u(o); }

  function _inherits$u(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$u(subClass, superClass); } }

  function _setPrototypeOf$u(o, p) { _setPrototypeOf$u = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$u(o, p); }

  var F7Range =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$u(F7Range, _React$Component);

    function F7Range(props, context) {
      var _this;

      _classCallCheck$u(this, F7Range);

      _this = _possibleConstructorReturn$u(this, _getPrototypeOf$u(F7Range).call(this, props, context));
      _this.__reactRefs = {};
      return _this;
    }

    _createClass$u(F7Range, [{
      key: "setValue",
      value: function setValue(newValue) {
        var self = this;
        if (self.f7Range && self.f7Range.setValue) { self.f7Range.setValue(newValue); }
      }
    }, {
      key: "getValue",
      value: function getValue() {
        var self = this;

        if (self.f7Range && self.f7Range.getValue) {
          return self.f7Range.getValue();
        }

        return undefined;
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var _self$props = self.props,
            id = _self$props.id,
            disabled = _self$props.disabled,
            className = _self$props.className,
            style = _self$props.style,
            input = _self$props.input,
            inputId = _self$props.inputId,
            name = _self$props.name,
            vertical = _self$props.vertical,
            verticalReversed = _self$props.verticalReversed;
        var classes = Utils.classNames(className, 'range-slider', {
          'range-slider-horizontal': !vertical,
          'range-slider-vertical': vertical,
          'range-slider-vertical-reversed': vertical && verticalReversed,
          disabled: disabled
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes
        }, input && React.createElement('input', {
          type: 'range',
          name: name,
          id: inputId
        }), this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        if (self.f7Range && self.f7Range.destroy) { self.f7Range.destroy(); }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        self.$f7ready(function (f7) {
          if (!self.props.init) { return; }
          var props = self.props;
          var value = props.value,
              min = props.min,
              max = props.max,
              step = props.step,
              label = props.label,
              dual = props.dual,
              draggableBar = props.draggableBar,
              vertical = props.vertical,
              verticalReversed = props.verticalReversed,
              formatLabel = props.formatLabel,
              scale = props.scale,
              scaleSteps = props.scaleSteps,
              scaleSubSteps = props.scaleSubSteps,
              formatScaleLabel = props.formatScaleLabel,
              limitKnobPosition = props.limitKnobPosition;
          self.f7Range = f7.range.create(Utils.noUndefinedProps({
            el: self.refs.el,
            value: value,
            min: min,
            max: max,
            step: step,
            label: label,
            dual: dual,
            draggableBar: draggableBar,
            vertical: vertical,
            verticalReversed: verticalReversed,
            formatLabel: formatLabel,
            scale: scale,
            scaleSteps: scaleSteps,
            scaleSubSteps: scaleSubSteps,
            formatScaleLabel: formatScaleLabel,
            limitKnobPosition: limitKnobPosition,
            on: {
              change: function change(range, val) {
                self.dispatchEvent('range:change rangeChange', val);
              },
              changed: function changed(range, val) {
                self.dispatchEvent('range:changed rangeChanged', val);
              }
            }
          }));
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.value', prevProps, prevState, function (newValue) {
          var self = _this3;
          if (!self.f7Range) { return; }
          self.f7Range.setValue(newValue);
        });
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

    return F7Range;
  }(React.Component);

  __reactComponentSetProps(F7Range, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    init: {
      type: Boolean,
      default: true
    },
    value: {
      type: [Number, Array, String],
      default: 0
    },
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    step: {
      type: [Number, String],
      default: 1
    },
    label: {
      type: Boolean,
      default: false
    },
    dual: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    verticalReversed: {
      type: Boolean,
      default: false
    },
    draggableBar: {
      type: Boolean,
      default: true
    },
    formatLabel: Function,
    scale: {
      type: Boolean,
      default: false
    },
    scaleSteps: {
      type: Number,
      default: 5
    },
    scaleSubSteps: {
      type: Number,
      default: 0
    },
    formatScaleLabel: Function,
    limitKnobPosition: {
      type: Boolean,
      default: undefined
    },
    name: String,
    input: Boolean,
    inputId: String,
    disabled: Boolean
  }, Mixins.colorProps));

  F7Range.displayName = 'f7-range';

  function _typeof$v(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$v = function _typeof(obj) { return typeof obj; }; } else { _typeof$v = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$v(obj); }

  function _classCallCheck$v(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$v(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$v(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$v(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$v(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$v(self, call) { if (call && (_typeof$v(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$v(self); }

  function _getPrototypeOf$v(o) { _getPrototypeOf$v = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$v(o); }

  function _assertThisInitialized$v(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$v(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$v(subClass, superClass); } }

  function _setPrototypeOf$v(o, p) { _setPrototypeOf$v = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$v(o, p); }

  var F7TextEditor =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$v(F7TextEditor, _React$Component);

    function F7TextEditor(props, context) {
      var _this;

      _classCallCheck$v(this, F7TextEditor);

      _this = _possibleConstructorReturn$v(this, _getPrototypeOf$v(F7TextEditor).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$v(_this), 'onChange onInput onFocus onBlur onButtonClick onKeyboardOpen onKeyboardClose onPopoverOpen onPopoverClose'.split(' '));
      })();

      return _this;
    }

    _createClass$v(F7TextEditor, [{
      key: "onChange",
      value: function onChange(editor, value) {
        this.dispatchEvent('texteditor:change textEditorChange', value);
      }
    }, {
      key: "onInput",
      value: function onInput() {
        this.dispatchEvent('texteditor:change textEditorChange');
      }
    }, {
      key: "onFocus",
      value: function onFocus() {
        this.dispatchEvent('texteditor:focus textEditorFocus');
      }
    }, {
      key: "onBlur",
      value: function onBlur() {
        this.dispatchEvent('texteditor:blur textEditorBlur');
      }
    }, {
      key: "onButtonClick",
      value: function onButtonClick(editor, button) {
        this.dispatchEvent('texteditor:buttonclick textEditorButtonClick', button);
      }
    }, {
      key: "onKeyboardOpen",
      value: function onKeyboardOpen() {
        this.dispatchEvent('texteditor:keyboardopen textEditorKeyboardOpen');
      }
    }, {
      key: "onKeyboardClose",
      value: function onKeyboardClose() {
        this.dispatchEvent('texteditor:keyboardclose textEditorKeyboardClose');
      }
    }, {
      key: "onPopoverOpen",
      value: function onPopoverOpen() {
        this.dispatchEvent('texteditor:popoveropen textEditorPopoverOpen');
      }
    }, {
      key: "onPopoverClose",
      value: function onPopoverClose() {
        this.dispatchEvent('texteditor:popoverclose textEditorPopoverClose');
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            resizable = props.resizable;
        var classes = Utils.classNames(className, 'text-editor', resizable && 'text-editor-resizable', Mixins.colorClasses(props));
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes
        }, this.slots['root-start'], React.createElement('div', {
          className: 'text-editor-content',
          contentEditable: true
        }, this.slots['default']), this.slots['root-end'], this.slots['root']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.f7TextEditor && this.f7TextEditor.destroy) {
          this.f7TextEditor.destroy();
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this3 = this;

        var props = this.props;
        var mode = props.mode,
            value = props.value,
            palceholder = props.palceholder,
            buttons = props.buttons,
            customButtons = props.customButtons,
            dividers = props.dividers,
            imageUrlText = props.imageUrlText,
            linkUrlText = props.linkUrlText,
            placeholder = props.placeholder,
            clearFormattingOnPaste = props.clearFormattingOnPaste;
        var params = Utils.noUndefinedProps({
          el: this.refs.el,
          mode: mode,
          value: value,
          palceholder: palceholder,
          buttons: buttons,
          customButtons: customButtons,
          dividers: dividers,
          imageUrlText: imageUrlText,
          linkUrlText: linkUrlText,
          placeholder: placeholder,
          clearFormattingOnPaste: clearFormattingOnPaste,
          on: {
            change: this.onChange,
            input: this.onInput,
            focus: this.onFocus,
            blur: this.onBlur,
            buttonClick: this.onButtonClick,
            keyboardOpen: this.onKeyboardOpen,
            keyboardClose: this.onKeyboardClose,
            popoverOpen: this.onPopoverOpen,
            popoverClose: this.onPopoverClose
          }
        });
        this.$f7ready(function (f7) {
          _this3.f7TextEditor = f7.textEditor.create(params);
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this4 = this;

        __reactComponentWatch(this, 'props.value', prevProps, prevState, function () {
          if (_this4.f7TextEditor) {
            _this4.f7TextEditor.setValue(_this4.props.value);
          }
        });
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

    return F7TextEditor;
  }(React.Component);

  __reactComponentSetProps(F7TextEditor, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps, {
    mode: {
      type: String,
      default: undefined
    },
    value: {
      type: String,
      default: undefined
    },
    buttons: Array,
    customButtons: Object,
    dividers: {
      type: Boolean,
      default: undefined
    },
    imageUrlText: {
      type: String,
      default: undefined
    },
    linkUrlText: {
      type: String,
      default: undefined
    },
    placeholder: {
      type: String,
      default: undefined
    },
    clearFormattingOnPaste: {
      type: Boolean,
      default: undefined
    },
    resizable: {
      type: Boolean,
      default: false
    }
  }));

  F7TextEditor.displayName = 'f7-text-editor';

  function _typeof$w(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$w = function _typeof(obj) { return typeof obj; }; } else { _typeof$w = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$w(obj); }

  function _classCallCheck$w(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$w(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$w(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$w(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$w(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$w(self, call) { if (call && (_typeof$w(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$w(self); }

  function _getPrototypeOf$w(o) { _getPrototypeOf$w = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$w(o); }

  function _assertThisInitialized$w(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$w(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$w(subClass, superClass); } }

  function _setPrototypeOf$w(o, p) { _setPrototypeOf$w = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$w(o, p); }

  var F7Input =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$w(F7Input, _React$Component);

    function F7Input(props, context) {
      var _this;

      _classCallCheck$w(this, F7Input);

      _this = _possibleConstructorReturn$w(this, _getPrototypeOf$w(F7Input).call(this, props, context));
      _this.__reactRefs = {};

      _this.state = function () {
        return {
          inputFocused: false,
          inputInvalid: false
        };
      }();

      (function () {
        Utils.bindMethods(_assertThisInitialized$w(_this), 'onFocus onBlur onInput onChange onTextareaResize onInputNotEmpty onInputEmpty onInputClear'.split(' '));
      })();

      return _this;
    }

    _createClass$w(F7Input, [{
      key: "domValue",
      value: function domValue() {
        var self = this;
        var inputEl = self.refs.inputEl;
        if (!inputEl) { return undefined; }
        return inputEl.value;
      }
    }, {
      key: "inputHasValue",
      value: function inputHasValue() {
        var self = this;
        var _self$props = self.props,
            value = _self$props.value,
            type = _self$props.type;

        if (type === 'datepicker' && Array.isArray(value) && value.length === 0) {
          return false;
        }

        var domValue = self.domValue();
        return typeof value === 'undefined' ? domValue || domValue === 0 : value || value === 0;
      }
    }, {
      key: "validateInput",
      value: function validateInput(inputEl) {
        var self = this;
        var f7 = self.$f7;
        if (!f7 || !inputEl) { return; }
        var validity = inputEl.validity;
        if (!validity) { return; }

        if (!validity.valid) {
          if (self.state.inputInvalid !== true) {
            self.setState({
              inputInvalid: true
            });
          }
        } else if (self.state.inputInvalid !== false) {
          self.setState({
            inputInvalid: false
          });
        }
      }
    }, {
      key: "onTextareaResize",
      value: function onTextareaResize(event) {
        this.dispatchEvent('textarea:resize textareaResize', event);
      }
    }, {
      key: "onInputNotEmpty",
      value: function onInputNotEmpty(event) {
        this.dispatchEvent('input:notempty inputNotEmpty', event);
      }
    }, {
      key: "onInputEmpty",
      value: function onInputEmpty(event) {
        this.dispatchEvent('input:empty inputEmpty', event);
      }
    }, {
      key: "onInputClear",
      value: function onInputClear(event) {
        this.dispatchEvent('input:clear inputClear', event);
      }
    }, {
      key: "onInput",
      value: function onInput() {
        var arguments$1 = arguments;

        var self = this;
        var _self$props2 = self.props,
            validate = _self$props2.validate,
            validateOnBlur = _self$props2.validateOnBlur;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments$1[_key];
        }

        self.dispatchEvent.apply(self, ['input'].concat(args));

        if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && self.refs && self.refs.inputEl) {
          self.validateInput(self.refs.inputEl);
        }
      }
    }, {
      key: "onFocus",
      value: function onFocus() {
        var arguments$1 = arguments;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments$1[_key2];
        }

        this.dispatchEvent.apply(this, ['focus'].concat(args));
        this.setState({
          inputFocused: true
        });
      }
    }, {
      key: "onBlur",
      value: function onBlur() {
        var arguments$1 = arguments;

        var self = this;
        var _self$props3 = self.props,
            validate = _self$props3.validate,
            validateOnBlur = _self$props3.validateOnBlur;

        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments$1[_key3];
        }

        self.dispatchEvent.apply(self, ['blur'].concat(args));

        if ((validate || validate === '' || validateOnBlur || validateOnBlur === '') && self.refs && self.refs.inputEl) {
          self.validateInput(self.refs.inputEl);
        }

        self.setState({
          inputFocused: false
        });
      }
    }, {
      key: "onChange",
      value: function onChange() {
        var arguments$1 = arguments;

        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments$1[_key4];
        }

        this.dispatchEvent.apply(this, ['change'].concat(args));

        if (this.props.type === 'texteditor') {
          this.dispatchEvent('texteditor:change textEditorChange', args[1]);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var type = props.type,
            name = props.name,
            value = props.value,
            defaultValue = props.defaultValue,
            placeholder = props.placeholder,
            id = props.id,
            inputId = props.inputId,
            size = props.size,
            accept = props.accept,
            autocomplete = props.autocomplete,
            autocorrect = props.autocorrect,
            autocapitalize = props.autocapitalize,
            spellcheck = props.spellcheck,
            autofocus = props.autofocus,
            autosave = props.autosave,
            checked = props.checked,
            disabled = props.disabled,
            max = props.max,
            min = props.min,
            step = props.step,
            maxlength = props.maxlength,
            minlength = props.minlength,
            multiple = props.multiple,
            readonly = props.readonly,
            required = props.required,
            inputStyle = props.inputStyle,
            pattern = props.pattern,
            validate = props.validate,
            validateOnBlur = props.validateOnBlur,
            tabindex = props.tabindex,
            resizable = props.resizable,
            clearButton = props.clearButton,
            errorMessage = props.errorMessage,
            errorMessageForce = props.errorMessageForce,
            info = props.info,
            wrap = props.wrap,
            dropdown = props.dropdown,
            style = props.style,
            className = props.className,
            noStoreData = props.noStoreData,
            noFormStoreData = props.noFormStoreData,
            ignoreStoreData = props.ignoreStoreData,
            outline = props.outline,
            textEditorParams = props.textEditorParams;
        var domValue = self.domValue();
        var inputHasValue = self.inputHasValue();
        var inputEl;

        var createInput = function createInput(InputTag, children) {
          var needsValue = type !== 'file' && type !== 'datepicker' && type !== 'colorpicker';
          var needsType = InputTag === 'input';
          var inputType = type;

          if (inputType === 'datepicker' || inputType === 'colorpicker') {
            inputType = 'text';
          }

          var inputClassName = Utils.classNames(!wrap && className, {
            resizable: inputType === 'textarea' && resizable,
            'no-store-data': noFormStoreData || noStoreData || ignoreStoreData,
            'input-invalid': errorMessage && errorMessageForce || self.state.inputInvalid,
            'input-with-value': inputHasValue,
            'input-focused': self.state.inputFocused
          });
          var input;
          var inputValue;

          if (needsValue) {
            if (typeof value !== 'undefined') { inputValue = value; }else { inputValue = domValue; }
          }

          var valueProps = {};

          if (type !== 'datepicker' && type !== 'colorpicker') {
            if ('value' in props) { valueProps.value = inputValue; }
            if ('defaultValue' in props) { valueProps.defaultValue = defaultValue; }
          }

          {
            input = React.createElement(InputTag, Object.assign({
              ref: function ref(__reactNode) {
                _this2.__reactRefs['inputEl'] = __reactNode;
              },
              style: inputStyle,
              name: name,
              type: needsType ? inputType : undefined,
              placeholder: placeholder,
              id: inputId,
              size: size,
              accept: accept,
              autoComplete: autocomplete,
              autoCorrect: autocorrect,
              autoCapitalize: autocapitalize,
              spellCheck: spellcheck,
              autoFocus: autofocus,
              autoSave: autosave,
              checked: checked,
              disabled: disabled,
              max: max,
              maxLength: maxlength,
              min: min,
              minLength: minlength,
              step: step,
              multiple: multiple,
              readOnly: readonly,
              required: required,
              pattern: pattern,
              validate: typeof validate === 'string' && validate.length ? validate : undefined,
              'data-validate': validate === true || validate === '' || validateOnBlur === true || validateOnBlur === '' ? true : undefined,
              'data-validate-on-blur': validateOnBlur === true || validateOnBlur === '' ? true : undefined,
              tabIndex: tabindex,
              'data-error-message': errorMessageForce ? undefined : errorMessage,
              className: inputClassName,
              onFocus: self.onFocus,
              onBlur: self.onBlur,
              onInput: self.onInput,
              onChange: self.onChange
            }, valueProps), children);
          }
          return input;
        };

        var _self$slots = self.slots,
            slotsDefault = _self$slots.default,
            slotsInfo = _self$slots.info;

        if (type === 'select' || type === 'textarea' || type === 'file') {
          if (type === 'select') {
            inputEl = createInput('select', slotsDefault);
          } else if (type === 'file') {
            inputEl = createInput('input');
          } else {
            inputEl = createInput('textarea');
          }
        } else if (slotsDefault && slotsDefault.length > 0 || !type) {
          inputEl = slotsDefault;
        } else if (type === 'toggle') {
          inputEl = React.createElement(F7Toggle, {
            checked: checked,
            readonly: readonly,
            name: name,
            value: value,
            disabled: disabled,
            id: inputId,
            onChange: self.onChange
          });
        } else if (type === 'range') {
          inputEl = React.createElement(F7Range, {
            value: value,
            disabled: disabled,
            min: min,
            max: max,
            step: step,
            name: name,
            id: inputId,
            input: true,
            onRangeChange: self.onChange
          });
        } else if (type === 'texteditor') {
          inputEl = React.createElement(F7TextEditor, Object.assign({
            value: value,
            resizable: resizable,
            placeholder: placeholder,
            onTextEditorFocus: self.onFocus,
            onTextEditorBlur: self.onBlur,
            onTextEditorInput: self.onInput,
            onTextEditorChange: self.onChange
          }, textEditorParams));
        } else {
          inputEl = createInput('input');
        }

        if (wrap) {
          var wrapClasses = Utils.classNames(className, 'input', {
            'input-outline': outline,
            'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown
          }, Mixins.colorClasses(props));
          return React.createElement('div', {
            id: id,
            ref: function ref(__reactNode) {
              _this2.__reactRefs['wrapEl'] = __reactNode;
            },
            className: wrapClasses,
            style: style
          }, inputEl, errorMessage && errorMessageForce && React.createElement('div', {
            className: 'input-error-message'
          }, errorMessage), clearButton && React.createElement('span', {
            className: 'input-clear-button'
          }), (info || slotsInfo && slotsInfo.length) && React.createElement('div', {
            className: 'input-info'
          }, info, this.slots['info']));
        }

        return inputEl;
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        var _self$props4 = self.props,
            type = _self$props4.type,
            resizable = _self$props4.resizable,
            clearButton = _self$props4.clearButton;
        if (type === 'range' || type === 'toggle') { return; }
        var inputEl = self.refs.inputEl;
        if (!inputEl) { return; }
        inputEl.removeEventListener('input:notempty', self.onInputNotEmpty, false);

        if (type === 'textarea' && resizable) {
          inputEl.removeEventListener('textarea:resize', self.onTextareaResize, false);
        }

        if (clearButton) {
          inputEl.removeEventListener('input:empty', self.onInputEmpty, false);
          inputEl.removeEventListener('input:clear', self.onInputClear, false);
        }

        if (self.f7Calendar && self.f7Calendar.destroy) {
          self.f7Calendar.destroy();
        }

        if (self.f7ColorPicker && self.f7ColorPicker.destroy) {
          self.f7ColorPicker.destroy();
        }

        delete self.f7Calendar;
        delete self.f7ColorPicker;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.value', prevProps, prevState, function () {
          var self = _this3;
          var type = self.props.type;
          if (type === 'range' || type === 'toggle') { return; }
          if (!self.$f7) { return; }
          self.updateInputOnDidUpdate = true;

          if (self.f7Calendar) {
            self.f7Calendar.setValue(self.props.value);
          }

          if (self.f7ColorPicker) {
            self.f7ColorPicker.setValue(self.props.value);
          }
        });

        var self = this;
        var _self$props5 = self.props,
            validate = _self$props5.validate,
            validateOnBlur = _self$props5.validateOnBlur,
            resizable = _self$props5.resizable;
        var f7 = self.$f7;
        if (!f7) { return; }

        if (self.updateInputOnDidUpdate) {
          var inputEl = self.refs.inputEl;
          if (!inputEl) { return; }
          self.updateInputOnDidUpdate = false;
          f7.input.checkEmptyState(inputEl);

          if (validate && !validateOnBlur) {
            self.validateInput(inputEl);
          }

          if (resizable) {
            f7.input.resizeTextarea(inputEl);
          }
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        self.$f7ready(function (f7) {
          var _self$props6 = self.props,
              validate = _self$props6.validate,
              validateOnBlur = _self$props6.validateOnBlur,
              resizable = _self$props6.resizable,
              type = _self$props6.type,
              clearButton = _self$props6.clearButton,
              value = _self$props6.value,
              defaultValue = _self$props6.defaultValue,
              calendarParams = _self$props6.calendarParams,
              colorPickerParams = _self$props6.colorPickerParams;
          if (type === 'range' || type === 'toggle') { return; }
          var inputEl = self.refs.inputEl;
          if (!inputEl) { return; }
          inputEl.addEventListener('input:notempty', self.onInputNotEmpty, false);

          if (type === 'textarea' && resizable) {
            inputEl.addEventListener('textarea:resize', self.onTextareaResize, false);
          }

          if (clearButton) {
            inputEl.addEventListener('input:empty', self.onInputEmpty, false);
            inputEl.addEventListener('input:clear', self.onInputClear, false);
          }

          if (type === 'datepicker') {
            self.f7Calendar = f7.calendar.create(Object.assign({
              inputEl: inputEl,
              value: value,
              on: {
                change: function change(calendar, calendarValue) {
                  self.dispatchEvent('calendar:change calendarChange', calendarValue);
                }
              }
            }, calendarParams || {}));
          }

          if (type === 'colorpicker') {
            self.f7ColorPicker = f7.colorPicker.create(Object.assign({
              inputEl: inputEl,
              value: value,
              on: {
                change: function change(colorPicker, colorPickerValue) {
                  self.dispatchEvent('colorpicker:change colorPickerChange', colorPickerValue);
                }
              }
            }, colorPickerParams || {}));
          }

          f7.input.checkEmptyState(inputEl);

          if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && (typeof value !== 'undefined' && value !== null && value !== '' || typeof defaultValue !== 'undefined' && defaultValue !== null && defaultValue !== '')) {
            setTimeout(function () {
              self.validateInput(inputEl);
            }, 0);
          }

          if (resizable) {
            f7.input.resizeTextarea(inputEl);
          }
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          args[_key5 - 1] = arguments$1[_key5];
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

    return F7Input;
  }(React.Component);

  __reactComponentSetProps(F7Input, Object.assign({
    type: String,
    name: String,
    value: [String, Number, Array, Date, Object],
    defaultValue: [String, Number, Array],
    placeholder: String,
    id: [String, Number],
    className: String,
    style: Object,
    inputId: [String, Number],
    size: [String, Number],
    accept: [String, Number],
    autocomplete: [String],
    autocorrect: [String],
    autocapitalize: [String],
    spellcheck: [String],
    autofocus: Boolean,
    autosave: String,
    checked: Boolean,
    disabled: Boolean,
    max: [String, Number],
    min: [String, Number],
    step: [String, Number],
    maxlength: [String, Number],
    minlength: [String, Number],
    multiple: Boolean,
    readonly: Boolean,
    required: Boolean,
    inputStyle: Object,
    pattern: String,
    validate: [Boolean, String],
    validateOnBlur: Boolean,
    tabindex: [String, Number],
    resizable: Boolean,
    clearButton: Boolean,
    noFormStoreData: Boolean,
    noStoreData: Boolean,
    ignoreStoreData: Boolean,
    errorMessage: String,
    errorMessageForce: Boolean,
    info: String,
    outline: Boolean,
    wrap: {
      type: Boolean,
      default: true
    },
    dropdown: {
      type: [String, Boolean],
      default: 'auto'
    },
    calendarParams: Object,
    colorPickerParams: Object,
    textEditorParams: Object
  }, Mixins.colorProps));

  F7Input.displayName = 'f7-input';

  function _typeof$x(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$x = function _typeof(obj) { return typeof obj; }; } else { _typeof$x = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$x(obj); }

  function _classCallCheck$x(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$x(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$x(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$x(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$x(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$x(self, call) { if (call && (_typeof$x(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$x(self); }

  function _getPrototypeOf$x(o) { _getPrototypeOf$x = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$x(o); }

  function _assertThisInitialized$x(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$x(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$x(subClass, superClass); } }

  function _setPrototypeOf$x(o, p) { _setPrototypeOf$x = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$x(o, p); }

  var F7Link =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$x(F7Link, _React$Component);

    function F7Link(props, context) {
      var _this;

      _classCallCheck$x(this, F7Link);

      _this = _possibleConstructorReturn$x(this, _getPrototypeOf$x(F7Link).call(this, props, context));
      _this.__reactRefs = {};

      _this.state = function () {
        return {
          isTabbarLabel: props.tabbarLabel
        };
      }();

      (function () {
        Utils.bindMethods(_assertThisInitialized$x(_this), ['onClick']);
      })();

      return _this;
    }

    _createClass$x(F7Link, [{
      key: "onClick",
      value: function onClick(event) {
        this.dispatchEvent('click', event);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var text = props.text,
            badge = props.badge,
            badgeColor = props.badgeColor,
            iconOnly = props.iconOnly,
            iconBadge = props.iconBadge,
            icon = props.icon,
            iconColor = props.iconColor,
            iconSize = props.iconSize,
            iconMaterial = props.iconMaterial,
            iconF7 = props.iconF7,
            iconMd = props.iconMd,
            iconIos = props.iconIos,
            iconAurora = props.iconAurora,
            id = props.id,
            style = props.style;
        var defaultSlots = self.slots.default;
        var iconEl;
        var textEl;
        var badgeEl;
        var iconBadgeEl;

        if (text) {
          if (badge) { badgeEl = React.createElement(F7Badge, {
            color: badgeColor
          }, badge); }
          textEl = React.createElement('span', {
            className: self.state.isTabbarLabel ? 'tabbar-label' : ''
          }, text, badgeEl);
        }

        if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
          if (iconBadge) {
            iconBadgeEl = React.createElement(F7Badge, {
              color: badgeColor
            }, iconBadge);
          }

          iconEl = React.createElement(F7Icon, {
            material: iconMaterial,
            f7: iconF7,
            icon: icon,
            md: iconMd,
            ios: iconIos,
            aurora: iconAurora,
            color: iconColor,
            size: iconSize
          }, iconBadgeEl);
        }

        if (iconOnly || !text && defaultSlots && defaultSlots.length === 0 || !text && !defaultSlots) {
          self.iconOnlyComputed = true;
        } else {
          self.iconOnlyComputed = false;
        }

        return React.createElement('a', Object.assign({
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: self.classes
        }, self.attrs), iconEl, textEl, defaultSlots);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        var el = self.refs.el;
        el.removeEventListener('click', self.onClick);
        delete el.f7RouteProps;

        if (self.f7SmartSelect && self.f7SmartSelect.destroy) {
          self.f7SmartSelect.destroy();
        }

        if (self.f7Tooltip && self.f7Tooltip.destroy) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
          var self = _this3;

          if (!newText && self.f7Tooltip) {
            self.f7Tooltip.destroy();
            self.f7Tooltip = null;
            delete self.f7Tooltip;
            return;
          }

          if (newText && !self.f7Tooltip && self.$f7) {
            self.f7Tooltip = self.$f7.tooltip.create({
              targetEl: self.refs.el,
              text: newText
            });
            return;
          }

          if (!newText || !self.f7Tooltip) { return; }
          self.f7Tooltip.setText(newText);
        });

        var self = this;
        var el = self.refs.el;
        var routeProps = self.props.routeProps;

        if (routeProps) {
          el.f7RouteProps = routeProps;
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        el.addEventListener('click', self.onClick);
        var _self$props = self.props,
            tabbarLabel = _self$props.tabbarLabel,
            tabLink = _self$props.tabLink,
            tooltip = _self$props.tooltip,
            smartSelect = _self$props.smartSelect,
            smartSelectParams = _self$props.smartSelectParams,
            routeProps = _self$props.routeProps;
        var isTabbarLabel = false;

        if (tabbarLabel || (tabLink || tabLink === '') && self.$$(el).parents('.tabbar-labels').length) {
          isTabbarLabel = true;
        }

        self.setState({
          isTabbarLabel: isTabbarLabel
        });
        if (routeProps) { el.f7RouteProps = routeProps; }
        self.$f7ready(function (f7) {
          if (smartSelect) {
            var ssParams = Utils.extend({
              el: el
            }, smartSelectParams || {});
            self.f7SmartSelect = f7.smartSelect.create(ssParams);
          }

          if (tooltip) {
            self.f7Tooltip = f7.tooltip.create({
              targetEl: el,
              text: tooltip
            });
          }
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "attrs",
      get: function get() {
        var self = this;
        var props = self.props;
        var href = props.href,
            target = props.target,
            tabLink = props.tabLink;
        var hrefComputed = href;
        if (href === true) { hrefComputed = '#'; }
        if (href === false) { hrefComputed = undefined; }
        return Utils.extend({
          href: hrefComputed,
          target: target,
          'data-tab': Utils.isStringProp(tabLink) && tabLink || undefined
        }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
      }
    }, {
      key: "classes",
      get: function get() {
        var self = this;
        var props = self.props;
        var tabLink = props.tabLink,
            tabLinkActive = props.tabLinkActive,
            noLinkClass = props.noLinkClass,
            smartSelect = props.smartSelect,
            className = props.className;
        return Utils.classNames(className, {
          link: !(noLinkClass || self.state.isTabbarLabel),
          'icon-only': self.iconOnlyComputed,
          'tab-link': tabLink || tabLink === '',
          'tab-link-active': tabLinkActive,
          'smart-select': smartSelect
        }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
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

    return F7Link;
  }(React.Component);

  __reactComponentSetProps(F7Link, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    noLinkClass: Boolean,
    text: String,
    tabLink: [Boolean, String],
    tabLinkActive: Boolean,
    tabbarLabel: Boolean,
    iconOnly: Boolean,
    badge: [String, Number],
    badgeColor: [String],
    iconBadge: [String, Number],
    href: {
      type: [String, Boolean],
      default: '#'
    },
    target: String,
    tooltip: String,
    smartSelect: Boolean,
    smartSelectParams: Object
  }, Mixins.colorProps, {}, Mixins.linkIconProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps));

  F7Link.displayName = 'f7-link';

  function _typeof$y(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$y = function _typeof(obj) { return typeof obj; }; } else { _typeof$y = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$y(obj); }

  function _classCallCheck$y(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$y(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$y(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$y(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$y(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$y(self, call) { if (call && (_typeof$y(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$y(self); }

  function _getPrototypeOf$y(o) { _getPrototypeOf$y = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$y(o); }

  function _assertThisInitialized$y(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$y(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$y(subClass, superClass); } }

  function _setPrototypeOf$y(o, p) { _setPrototypeOf$y = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$y(o, p); }

  var F7ListButton =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$y(F7ListButton, _React$Component);

    function F7ListButton(props, context) {
      var _this;

      _classCallCheck$y(this, F7ListButton);

      _this = _possibleConstructorReturn$y(this, _getPrototypeOf$y(F7ListButton).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$y(_this), ['onClick']);
      })();

      return _this;
    }

    _createClass$y(F7ListButton, [{
      key: "onClick",
      value: function onClick(event) {
        this.dispatchEvent('click', event);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            title = props.title,
            text = props.text;
        return React.createElement('li', {
          id: id,
          style: style,
          className: className
        }, React.createElement('a', Object.assign({
          className: self.classes
        }, self.attrs, {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['linkEl'] = __reactNode;
          }
        }), this.slots['default'], !this.slots.default && (title || text)));
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        var linkEl = self.refs.linkEl;
        linkEl.removeEventListener('click', this.onClick);
        delete linkEl.f7RouteProps;

        if (self.f7Tooltip && self.f7Tooltip.destroy) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
          var self = _this3;

          if (!newText && self.f7Tooltip) {
            self.f7Tooltip.destroy();
            self.f7Tooltip = null;
            delete self.f7Tooltip;
            return;
          }

          if (newText && !self.f7Tooltip && self.$f7) {
            self.f7Tooltip = self.$f7.tooltip.create({
              targetEl: self.refs.el,
              text: newText
            });
            return;
          }

          if (!newText || !self.f7Tooltip) { return; }
          self.f7Tooltip.setText(newText);
        });

        var self = this;
        var linkEl = self.refs.linkEl;
        var routeProps = self.props.routeProps;

        if (routeProps) {
          linkEl.f7RouteProps = routeProps;
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var linkEl = self.refs.linkEl;
        var _self$props = self.props,
            routeProps = _self$props.routeProps,
            tooltip = _self$props.tooltip;

        if (routeProps) {
          linkEl.f7RouteProps = routeProps;
        }

        linkEl.addEventListener('click', self.onClick);
        self.$f7ready(function (f7) {
          if (tooltip) {
            self.f7Tooltip = f7.tooltip.create({
              targetEl: linkEl,
              text: tooltip
            });
          }
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "attrs",
      get: function get() {
        var self = this;
        var props = self.props;
        var link = props.link,
            href = props.href,
            target = props.target,
            tabLink = props.tabLink;
        return Utils.extend({
          href: typeof link === 'boolean' && typeof href === 'boolean' ? '#' : link || href,
          target: target,
          'data-tab': Utils.isStringProp(tabLink) && tabLink
        }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
      }
    }, {
      key: "classes",
      get: function get() {
        var self = this;
        var props = self.props;
        var tabLink = props.tabLink,
            tabLinkActive = props.tabLinkActive;
        return Utils.classNames({
          'list-button': true,
          'tab-link': tabLink || tabLink === '',
          'tab-link-active': tabLinkActive
        }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
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

    return F7ListButton;
  }(React.Component);

  __reactComponentSetProps(F7ListButton, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    title: [String, Number],
    text: [String, Number],
    tabLink: [Boolean, String],
    tabLinkActive: Boolean,
    link: [Boolean, String],
    href: [Boolean, String],
    target: String,
    tooltip: String
  }, Mixins.colorProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps));

  F7ListButton.displayName = 'f7-list-button';

  function _typeof$z(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$z = function _typeof(obj) { return typeof obj; }; } else { _typeof$z = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$z(obj); }

  function _classCallCheck$z(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$z(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$z(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$z(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$z(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$z(self, call) { if (call && (_typeof$z(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$z(self); }

  function _assertThisInitialized$z(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$z(o) { _getPrototypeOf$z = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$z(o); }

  function _inherits$z(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$z(subClass, superClass); } }

  function _setPrototypeOf$z(o, p) { _setPrototypeOf$z = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$z(o, p); }

  var F7ListGroup =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$z(F7ListGroup, _React$Component);

    function F7ListGroup(props, context) {
      _classCallCheck$z(this, F7ListGroup);

      return _possibleConstructorReturn$z(this, _getPrototypeOf$z(F7ListGroup).call(this, props, context));
    }

    _createClass$z(F7ListGroup, [{
      key: "render",
      value: function render() {
        var self = this;
        var props = self.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            mediaList = props.mediaList,
            sortable = props.sortable,
            sortableTapHold = props.sortableTapHold,
            sortableMoveElements = props.sortableMoveElements;
        var classes = Utils.classNames(className, 'list-group', {
          'media-list': mediaList,
          sortable: sortable,
          'sortable-tap-hold': sortableTapHold
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes,
          'data-sortable-move-elements': typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined
        }, React.createElement('ul', null, this.slots['default']));
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7ListGroup;
  }(React.Component);

  __reactComponentSetProps(F7ListGroup, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    mediaList: Boolean,
    sortable: Boolean,
    sortableTapHold: Boolean,
    sortableMoveElements: {
      type: Boolean,
      default: undefined
    }
  }, Mixins.colorProps));

  F7ListGroup.displayName = 'f7-list-group';

  function _typeof$A(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$A = function _typeof(obj) { return typeof obj; }; } else { _typeof$A = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$A(obj); }

  function _classCallCheck$A(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$A(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$A(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$A(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$A(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$A(self, call) { if (call && (_typeof$A(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$A(self); }

  function _assertThisInitialized$A(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$A(o) { _getPrototypeOf$A = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$A(o); }

  function _inherits$A(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$A(subClass, superClass); } }

  function _setPrototypeOf$A(o, p) { _setPrototypeOf$A = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$A(o, p); }

  var F7ListIndex =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$A(F7ListIndex, _React$Component);

    function F7ListIndex(props, context) {
      var _this;

      _classCallCheck$A(this, F7ListIndex);

      _this = _possibleConstructorReturn$A(this, _getPrototypeOf$A(F7ListIndex).call(this, props, context));
      _this.__reactRefs = {};
      return _this;
    }

    _createClass$A(F7ListIndex, [{
      key: "update",
      value: function update() {
        if (!this.f7ListIndex) { return; }
        this.f7ListIndex.update();
      }
    }, {
      key: "scrollListToIndex",
      value: function scrollListToIndex(indexContent) {
        if (!this.f7ListIndex) { return; }
        this.f7ListIndex.scrollListToIndex(indexContent);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'list-index', Mixins.colorClasses(props));
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        if (!self.props.init) { return; }
        self.$f7ready(function (f7) {
          var el = self.refs.el;
          var _self$props = self.props,
              listEl = _self$props.listEl,
              indexes = _self$props.indexes,
              iosItemHeight = _self$props.iosItemHeight,
              mdItemHeight = _self$props.mdItemHeight,
              auroraItemHeight = _self$props.auroraItemHeight,
              scrollList = _self$props.scrollList,
              label = _self$props.label;
          self.f7ListIndex = f7.listIndex.create({
            el: el,
            listEl: listEl,
            indexes: indexes,
            iosItemHeight: iosItemHeight,
            mdItemHeight: mdItemHeight,
            auroraItemHeight: auroraItemHeight,
            scrollList: scrollList,
            label: label,
            on: {
              select: function select(index, itemContent, itemIndex) {
                self.dispatchEvent('listindex:select listIndexSelect', itemContent, itemIndex);
              }
            }
          });
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (!this.props.init) { return; }

        if (this.f7ListIndex && this.f7ListIndex.destroy) {
          this.f7ListIndex.destroy();
        }
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.indexes', prevProps, prevState, function () {
          if (!_this3.f7ListIndex) { return; }
          _this3.f7ListIndex.params.indexes = _this3.props.indexes;

          _this3.update();
        });
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

    return F7ListIndex;
  }(React.Component);

  __reactComponentSetProps(F7ListIndex, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    init: {
      type: Boolean,
      default: true
    },
    listEl: [String, Object],
    indexes: {
      type: [String, Array],
      default: 'auto'
    },
    scrollList: {
      type: Boolean,
      default: true
    },
    label: {
      type: Boolean,
      default: false
    },
    iosItemHeight: {
      type: Number,
      default: 14
    },
    mdItemHeight: {
      type: Number,
      default: 14
    },
    auroraItemHeight: {
      type: Number,
      default: 14
    }
  }, Mixins.colorProps));

  F7ListIndex.displayName = 'f7-list-index';

  function _typeof$B(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$B = function _typeof(obj) { return typeof obj; }; } else { _typeof$B = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$B(obj); }

  function _classCallCheck$B(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$B(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$B(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$B(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$B(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$B(self, call) { if (call && (_typeof$B(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$B(self); }

  function _getPrototypeOf$B(o) { _getPrototypeOf$B = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$B(o); }

  function _assertThisInitialized$B(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$B(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$B(subClass, superClass); } }

  function _setPrototypeOf$B(o, p) { _setPrototypeOf$B = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$B(o, p); }

  var F7ListInput =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$B(F7ListInput, _React$Component);

    function F7ListInput(props, context) {
      var _this;

      _classCallCheck$B(this, F7ListInput);

      _this = _possibleConstructorReturn$B(this, _getPrototypeOf$B(F7ListInput).call(this, props, context));
      _this.__reactRefs = {};

      _this.state = function () {
        return {
          isSortable: props.sortable,
          inputFocused: false,
          inputInvalid: false
        };
      }();

      (function () {
        Utils.bindMethods(_assertThisInitialized$B(_this), 'onChange onInput onFocus onBlur onTextareaResize onInputNotEmpty onInputEmpty onInputClear'.split(' '));
      })();

      return _this;
    }

    _createClass$B(F7ListInput, [{
      key: "domValue",
      value: function domValue() {
        var self = this;
        var inputEl = self.refs.inputEl;
        if (!inputEl) { return undefined; }
        return inputEl.value;
      }
    }, {
      key: "inputHasValue",
      value: function inputHasValue() {
        var self = this;
        var _self$props = self.props,
            value = _self$props.value,
            type = _self$props.type;

        if (type === 'datepicker' && Array.isArray(value) && value.length === 0) {
          return false;
        }

        var domValue = self.domValue();
        return typeof value === 'undefined' ? domValue || domValue === 0 : value || value === 0;
      }
    }, {
      key: "validateInput",
      value: function validateInput(inputEl) {
        var self = this;
        var f7 = self.$f7;
        if (!f7 || !inputEl) { return; }
        var validity = inputEl.validity;
        if (!validity) { return; }

        if (!validity.valid) {
          if (self.state.inputInvalid !== true) {
            self.setState({
              inputInvalid: true
            });
          }
        } else if (self.state.inputInvalid !== false) {
          self.setState({
            inputInvalid: false
          });
        }
      }
    }, {
      key: "onTextareaResize",
      value: function onTextareaResize(event) {
        this.dispatchEvent('textarea:resize textareaResize', event);
      }
    }, {
      key: "onInputNotEmpty",
      value: function onInputNotEmpty(event) {
        this.dispatchEvent('input:notempty inputNotEmpty', event);
      }
    }, {
      key: "onInputEmpty",
      value: function onInputEmpty(event) {
        this.dispatchEvent('input:empty inputEmpty', event);
      }
    }, {
      key: "onInputClear",
      value: function onInputClear(event) {
        this.dispatchEvent('input:clear inputClear', event);
      }
    }, {
      key: "onInput",
      value: function onInput() {
        var arguments$1 = arguments;

        var self = this;
        var _self$props2 = self.props,
            validate = _self$props2.validate,
            validateOnBlur = _self$props2.validateOnBlur;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments$1[_key];
        }

        self.dispatchEvent.apply(self, ['input'].concat(args));

        if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && self.refs && self.refs.inputEl) {
          self.validateInput(self.refs.inputEl);
        }
      }
    }, {
      key: "onFocus",
      value: function onFocus() {
        var arguments$1 = arguments;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments$1[_key2];
        }

        this.dispatchEvent.apply(this, ['focus'].concat(args));
        this.setState({
          inputFocused: true
        });
      }
    }, {
      key: "onBlur",
      value: function onBlur() {
        var arguments$1 = arguments;

        var self = this;
        var _self$props3 = self.props,
            validate = _self$props3.validate,
            validateOnBlur = _self$props3.validateOnBlur;

        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments$1[_key3];
        }

        self.dispatchEvent.apply(self, ['blur'].concat(args));

        if ((validate || validate === '' || validateOnBlur || validateOnBlur === '') && self.refs && self.refs.inputEl) {
          self.validateInput(self.refs.inputEl);
        }

        self.setState({
          inputFocused: false
        });
      }
    }, {
      key: "onChange",
      value: function onChange() {
        var arguments$1 = arguments;

        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments$1[_key4];
        }

        this.dispatchEvent.apply(this, ['change'].concat(args));

        if (this.props.type === 'texteditor') {
          this.dispatchEvent('texteditor:change textEditorChange', args[0]);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var _self$state = self.state,
            inputFocused = _self$state.inputFocused,
            inputInvalid = _self$state.inputInvalid;
        var props = self.props;
        var id = props.id,
            style = props.style,
            className = props.className,
            sortable = props.sortable,
            media = props.media,
            dropdown = props.dropdown,
            renderInput = props.input,
            wrap = props.wrap,
            type = props.type,
            name = props.name,
            value = props.value,
            defaultValue = props.defaultValue,
            readonly = props.readonly,
            required = props.required,
            disabled = props.disabled,
            placeholder = props.placeholder,
            inputId = props.inputId,
            size = props.size,
            accept = props.accept,
            autocomplete = props.autocomplete,
            autocorrect = props.autocorrect,
            autocapitalize = props.autocapitalize,
            spellcheck = props.spellcheck,
            autofocus = props.autofocus,
            autosave = props.autosave,
            max = props.max,
            min = props.min,
            step = props.step,
            maxlength = props.maxlength,
            minlength = props.minlength,
            multiple = props.multiple,
            inputStyle = props.inputStyle,
            pattern = props.pattern,
            validate = props.validate,
            validateOnBlur = props.validateOnBlur,
            tabindex = props.tabindex,
            resizable = props.resizable,
            clearButton = props.clearButton,
            noFormStoreData = props.noFormStoreData,
            noStoreData = props.noStoreData,
            ignoreStoreData = props.ignoreStoreData,
            errorMessage = props.errorMessage,
            errorMessageForce = props.errorMessageForce,
            info = props.info,
            outline = props.outline,
            label = props.label,
            inlineLabel = props.inlineLabel,
            floatingLabel = props.floatingLabel,
            textEditorParams = props.textEditorParams;
        var domValue = self.domValue();
        var inputHasValue = self.inputHasValue();
        var isSortable = sortable || self.state.isSortable;

        var createInput = function createInput(InputTag, children) {
          var needsValue = type !== 'file' && type !== 'datepicker' && type !== 'colorpicker';
          var needsType = InputTag === 'input';
          var inputType = type;

          if (inputType === 'datepicker' || inputType === 'colorpicker') {
            inputType = 'text';
          }

          var inputClassName = Utils.classNames({
            resizable: inputType === 'textarea' && resizable,
            'no-store-data': noFormStoreData || noStoreData || ignoreStoreData,
            'input-invalid': errorMessage && errorMessageForce || inputInvalid,
            'input-with-value': inputHasValue,
            'input-focused': inputFocused
          });
          var input;
          var inputValue;

          if (needsValue) {
            if (typeof value !== 'undefined') { inputValue = value; }else { inputValue = domValue; }
          }

          var valueProps = {};

          if (type !== 'datepicker' && type !== 'colorpicker') {
            if ('value' in props) { valueProps.value = inputValue; }
            if ('defaultValue' in props) { valueProps.defaultValue = defaultValue; }
          }

          {
            input = React.createElement(InputTag, Object.assign({
              ref: function ref(__reactNode) {
                _this2.__reactRefs['inputEl'] = __reactNode;
              },
              style: inputStyle,
              name: name,
              type: needsType ? inputType : undefined,
              placeholder: placeholder,
              id: inputId,
              size: size,
              accept: accept,
              autoComplete: autocomplete,
              autoCorrect: autocorrect,
              autoCapitalize: autocapitalize,
              spellCheck: spellcheck,
              autoFocus: autofocus,
              autoSave: autosave,
              disabled: disabled,
              max: max,
              maxLength: maxlength,
              min: min,
              minLength: minlength,
              step: step,
              multiple: multiple,
              readOnly: readonly,
              required: required,
              pattern: pattern,
              validate: typeof validate === 'string' && validate.length ? validate : undefined,
              'data-validate': validate === true || validate === '' || validateOnBlur === true || validateOnBlur === '' ? true : undefined,
              'data-validate-on-blur': validateOnBlur === true || validateOnBlur === '' ? true : undefined,
              tabIndex: tabindex,
              'data-error-message': errorMessageForce ? undefined : errorMessage,
              className: inputClassName,
              onFocus: self.onFocus,
              onBlur: self.onBlur,
              onInput: self.onInput,
              onChange: self.onChange
            }, valueProps), children);
          }
          return input;
        };

        var inputEl;

        if (renderInput) {
          if (type === 'select' || type === 'textarea' || type === 'file') {
            if (type === 'select') {
              inputEl = createInput('select', self.slots.default);
            } else if (type === 'file') {
              inputEl = createInput('input');
            } else {
              inputEl = createInput('textarea');
            }
          } else if (type === 'texteditor') {
            inputEl = React.createElement(F7TextEditor, Object.assign({
              value: value,
              resizable: resizable,
              placeholder: placeholder,
              onTextEditorFocus: self.onFocus,
              onTextEditorBlur: self.onBlur,
              onTextEditorInput: self.onInput,
              onTextEditorChange: self.onChange
            }, textEditorParams));
          } else {
            inputEl = createInput('input');
          }
        }

        var hasErrorMessage = !!errorMessage || self.slots['error-message'] && self.slots['error-message'].length;
        var ItemContent = React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['itemContentEl'] = __reactNode;
          },
          className: Utils.classNames('item-content item-input', !wrap && className, !wrap && {
            disabled: disabled
          }, !wrap && Mixins.colorClasses(props), {
            'inline-label': inlineLabel,
            'item-input-outline': outline,
            'item-input-focused': inputFocused,
            'item-input-with-info': !!info || self.slots.info && self.slots.info.length,
            'item-input-with-value': inputHasValue,
            'item-input-with-error-message': hasErrorMessage && errorMessageForce || inputInvalid,
            'item-input-invalid': hasErrorMessage && errorMessageForce || inputInvalid
          })
        }, this.slots['content-start'], (media || self.slots.media) && React.createElement('div', {
          className: 'item-media'
        }, media && React.createElement('img', {
          src: media
        }), this.slots['media']), React.createElement('div', {
          className: 'item-inner'
        }, this.slots['inner-start'], (label || self.slots.label) && React.createElement('div', {
          className: Utils.classNames('item-title item-label', {
            'item-floating-label': floatingLabel
          })
        }, label, this.slots['label']), React.createElement('div', {
          className: Utils.classNames('item-input-wrap', {
            'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown
          })
        }, inputEl, this.slots['input'], hasErrorMessage && errorMessageForce && React.createElement('div', {
          className: 'item-input-error-message'
        }, errorMessage, this.slots['error-message']), clearButton && React.createElement('span', {
          className: 'input-clear-button'
        }), (info || self.slots.info) && React.createElement('div', {
          className: 'item-input-info'
        }, info, this.slots['info'])), this.slots['inner'], this.slots['inner-end']), this.slots['content'], this.slots['content-end']);

        if (!wrap) {
          return ItemContent;
        }

        return React.createElement('li', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: Utils.classNames(className, {
            disabled: disabled
          }, Mixins.colorClasses(props))
        }, this.slots['root-start'], ItemContent, isSortable && React.createElement('div', {
          className: 'sortable-handler'
        }), this.slots['root'], this.slots['root-end']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        var inputEl = self.refs.inputEl;
        if (!inputEl) { return; }
        inputEl.removeEventListener('input:notempty', self.onInputNotEmpty, false);
        inputEl.removeEventListener('textarea:resize', self.onTextareaResize, false);
        inputEl.removeEventListener('input:empty', self.onInputEmpty, false);
        inputEl.removeEventListener('input:clear', self.onInputClear, false);

        if (self.f7Calendar && self.f7Calendar.destroy) {
          self.f7Calendar.destroy();
        }

        if (self.f7ColorPicker && self.f7ColorPicker.destroy) {
          self.f7ColorPicker.destroy();
        }

        delete self.f7Calendar;
        delete self.f7ColorPicker;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.value', prevProps, prevState, function () {
          var self = _this3;
          if (!self.$f7) { return; }
          self.updateInputOnDidUpdate = true;

          if (self.f7Calendar) {
            self.f7Calendar.setValue(self.props.value);
          }

          if (self.f7ColorPicker) {
            self.f7ColorPicker.setValue(self.props.value);
          }
        });

        var self = this;
        var $listEl = self.$listEl;
        if (!$listEl || $listEl && $listEl.length === 0) { return; }
        var isSortable = $listEl.hasClass('sortable');

        if (isSortable !== self.state.isSortable) {
          self.setState({
            isSortable: isSortable
          });
        }

        var _self$props4 = self.props,
            validate = _self$props4.validate,
            validateOnBlur = _self$props4.validateOnBlur,
            resizable = _self$props4.resizable,
            type = _self$props4.type;
        var f7 = self.$f7;
        if (!f7) { return; }

        if (self.updateInputOnDidUpdate) {
          var inputEl = self.refs.inputEl;
          if (!inputEl) { return; }
          self.updateInputOnDidUpdate = false;

          if (validate && !validateOnBlur) {
            self.validateInput(inputEl);
          }

          if (type === 'textarea' && resizable) {
            f7.input.resizeTextarea(inputEl);
          }
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        var itemContentEl = self.refs.itemContentEl;
        if (!el && !itemContentEl) { return; }
        self.$f7ready(function (f7) {
          var _self$props5 = self.props,
              validate = _self$props5.validate,
              validateOnBlur = _self$props5.validateOnBlur,
              resizable = _self$props5.resizable,
              value = _self$props5.value,
              defaultValue = _self$props5.defaultValue,
              type = _self$props5.type,
              calendarParams = _self$props5.calendarParams,
              colorPickerParams = _self$props5.colorPickerParams;
          var inputEl = self.refs.inputEl;
          if (!inputEl) { return; }
          inputEl.addEventListener('input:notempty', self.onInputNotEmpty, false);
          inputEl.addEventListener('textarea:resize', self.onTextareaResize, false);
          inputEl.addEventListener('input:empty', self.onInputEmpty, false);
          inputEl.addEventListener('input:clear', self.onInputClear, false);

          if (type === 'datepicker') {
            self.f7Calendar = f7.calendar.create(Object.assign({
              inputEl: inputEl,
              value: value,
              on: {
                change: function change(calendar, calendarValue) {
                  self.dispatchEvent('calendar:change calendarChange', calendarValue);
                }
              }
            }, calendarParams || {}));
          }

          if (type === 'colorpicker') {
            self.f7ColorPicker = f7.colorPicker.create(Object.assign({
              inputEl: inputEl,
              value: value,
              on: {
                change: function change(colorPicker, colorPickerValue) {
                  self.dispatchEvent('colorpicker:change colorPickerChange', colorPickerValue);
                }
              }
            }, colorPickerParams || {}));
          }

          if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && (typeof value !== 'undefined' && value !== null && value !== '' || typeof defaultValue !== 'undefined' && defaultValue !== null && defaultValue !== '')) {
            setTimeout(function () {
              self.validateInput(inputEl);
            }, 0);
          }

          if (type === 'textarea' && resizable) {
            f7.input.resizeTextarea(inputEl);
          }
        });
        self.$listEl = self.$$(el || itemContentEl).parents('.list, .list-group').eq(0);

        if (self.$listEl.length) {
          self.setState({
            isSortable: self.$listEl.hasClass('sortable')
          });
        }
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
          args[_key5 - 1] = arguments$1[_key5];
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

    return F7ListInput;
  }(React.Component);

  __reactComponentSetProps(F7ListInput, Object.assign({
    id: [String, Number],
    style: Object,
    className: String,
    sortable: {
      type: Boolean,
      default: undefined
    },
    media: String,
    dropdown: {
      type: [String, Boolean],
      default: 'auto'
    },
    wrap: {
      type: Boolean,
      default: true
    },
    input: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    value: [String, Number, Array, Date, Object],
    defaultValue: [String, Number, Array],
    readonly: Boolean,
    required: Boolean,
    disabled: Boolean,
    placeholder: String,
    inputId: [String, Number],
    size: [String, Number],
    accept: [String, Number],
    autocomplete: [String],
    autocorrect: [String],
    autocapitalize: [String],
    spellcheck: [String],
    autofocus: Boolean,
    autosave: String,
    max: [String, Number],
    min: [String, Number],
    step: [String, Number],
    maxlength: [String, Number],
    minlength: [String, Number],
    multiple: Boolean,
    inputStyle: Object,
    pattern: String,
    validate: [Boolean, String],
    validateOnBlur: Boolean,
    tabindex: [String, Number],
    resizable: Boolean,
    clearButton: Boolean,
    noFormStoreData: Boolean,
    noStoreData: Boolean,
    ignoreStoreData: Boolean,
    errorMessage: String,
    errorMessageForce: Boolean,
    info: String,
    outline: Boolean,
    label: [String, Number],
    inlineLabel: Boolean,
    floatingLabel: Boolean,
    calendarParams: Object,
    colorPickerParams: Object,
    textEditorParams: Object
  }, Mixins.colorProps));

  F7ListInput.displayName = 'f7-list-input';

  function _typeof$C(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$C = function _typeof(obj) { return typeof obj; }; } else { _typeof$C = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$C(obj); }

  function _classCallCheck$C(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$C(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$C(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$C(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$C(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$C(self, call) { if (call && (_typeof$C(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$C(self); }

  function _assertThisInitialized$C(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$C(o) { _getPrototypeOf$C = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$C(o); }

  function _inherits$C(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$C(subClass, superClass); } }

  function _setPrototypeOf$C(o, p) { _setPrototypeOf$C = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$C(o, p); }

  var F7ListItemCell =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$C(F7ListItemCell, _React$Component);

    function F7ListItemCell(props, context) {
      _classCallCheck$C(this, F7ListItemCell);

      return _possibleConstructorReturn$C(this, _getPrototypeOf$C(F7ListItemCell).call(this, props, context));
    }

    _createClass$C(F7ListItemCell, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'item-cell', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7ListItemCell;
  }(React.Component);

  __reactComponentSetProps(F7ListItemCell, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7ListItemCell.displayName = 'f7-list-item-cell';

  function _typeof$D(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$D = function _typeof(obj) { return typeof obj; }; } else { _typeof$D = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$D(obj); }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

  function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") { return Array.from(iter); } }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

  function _classCallCheck$D(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$D(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$D(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$D(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$D(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$D(self, call) { if (call && (_typeof$D(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$D(self); }

  function _getPrototypeOf$D(o) { _getPrototypeOf$D = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$D(o); }

  function _assertThisInitialized$D(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$D(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$D(subClass, superClass); } }

  function _setPrototypeOf$D(o, p) { _setPrototypeOf$D = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$D(o, p); }

  var F7ListItemContent =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$D(F7ListItemContent, _React$Component);

    function F7ListItemContent(props, context) {
      var _this;

      _classCallCheck$D(this, F7ListItemContent);

      _this = _possibleConstructorReturn$D(this, _getPrototypeOf$D(F7ListItemContent).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$D(_this), 'onClick onChange'.split(' '));
      })();

      return _this;
    }

    _createClass$D(F7ListItemContent, [{
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
            if (Array.isArray(slot)) { flattenSlots.push.apply(flattenSlots, _toConsumableArray(slot)); }else { flattenSlots.push(slot); }
          });
        }

        flattenSlots.forEach(function (child) {
          if (typeof child === 'undefined') { return; }
          var slotName;
          slotName = child.props ? child.props.slot : undefined;
          if (!slotName || slotName === 'inner') { slotsInner.push(child); }
          if (slotName === 'content-start') { slotsContentStart.push(child); }
          if (slotName === 'content') { slotsContent.push(child); }
          if (slotName === 'content-end') { slotsContentEnd.push(child); }
          if (slotName === 'after-start') { slotsAfterStart.push(child); }
          if (slotName === 'after') { slotsAfter.push(child); }
          if (slotName === 'after-end') { slotsAfterEnd.push(child); }
          if (slotName === 'media') { slotsMedia.push(child); }
          if (slotName === 'inner-start') { slotsInnerStart.push(child); }
          if (slotName === 'inner-end') { slotsInnerEnd.push(child); }
          if (slotName === 'before-title') { slotsBeforeTitle.push(child); }
          if (slotName === 'title') { slotsTitle.push(child); }
          if (slotName === 'after-title') { slotsAfterTitle.push(child); }
          if (slotName === 'subtitle') { slotsSubtitle.push(child); }
          if (slotName === 'text') { slotsText.push(child); }
          if (slotName === 'header') { slotsHeader.push(child); }
          if (slotName === 'footer') { slotsFooter.push(child); }
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
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

  function _typeof$E(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$E = function _typeof(obj) { return typeof obj; }; } else { _typeof$E = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$E(obj); }

  function _classCallCheck$E(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$E(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$E(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$E(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$E(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$E(self, call) { if (call && (_typeof$E(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$E(self); }

  function _assertThisInitialized$E(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$E(o) { _getPrototypeOf$E = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$E(o); }

  function _inherits$E(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$E(subClass, superClass); } }

  function _setPrototypeOf$E(o, p) { _setPrototypeOf$E = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$E(o, p); }

  var F7ListItemRow =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$E(F7ListItemRow, _React$Component);

    function F7ListItemRow(props, context) {
      _classCallCheck$E(this, F7ListItemRow);

      return _possibleConstructorReturn$E(this, _getPrototypeOf$E(F7ListItemRow).call(this, props, context));
    }

    _createClass$E(F7ListItemRow, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'item-row', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7ListItemRow;
  }(React.Component);

  __reactComponentSetProps(F7ListItemRow, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7ListItemRow.displayName = 'f7-list-item-row';

  function _typeof$F(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$F = function _typeof(obj) { return typeof obj; }; } else { _typeof$F = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$F(obj); }

  function _classCallCheck$F(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$F(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$F(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$F(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$F(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$F(self, call) { if (call && (_typeof$F(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$F(self); }

  function _getPrototypeOf$F(o) { _getPrototypeOf$F = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$F(o); }

  function _assertThisInitialized$F(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$F(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$F(subClass, superClass); } }

  function _setPrototypeOf$F(o, p) { _setPrototypeOf$F = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$F(o, p); }

  var F7ListItem =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$F(F7ListItem, _React$Component);

    function F7ListItem(props, context) {
      var _this;

      _classCallCheck$F(this, F7ListItem);

      _this = _possibleConstructorReturn$F(this, _getPrototypeOf$F(F7ListItem).call(this, props, context));
      _this.__reactRefs = {};

      _this.state = function () {
        return {
          isMedia: props.mediaItem || props.mediaList,
          isSortable: props.sortable,
          isSimple: false
        };
      }();

      (function () {
        Utils.bindMethods(_assertThisInitialized$F(_this), ['onClick', 'onChange', 'onSwipeoutOpen', 'onSwipeoutOpened', 'onSwipeoutClose', 'onSwipeoutClosed', 'onSwipeoutDelete', 'onSwipeoutDeleted', 'onSwipeoutOverswipeEnter', 'onSwipeoutOverswipeExit', 'onSwipeout', 'onAccBeforeOpen', 'onAccOpen', 'onAccOpened', 'onAccBeforeClose', 'onAccClose', 'onAccClosed']);
      })();

      return _this;
    }

    _createClass$F(F7ListItem, [{
      key: "onClick",
      value: function onClick(event) {
        var self = this;

        if (event.target.tagName.toLowerCase() !== 'input') {
          self.dispatchEvent('click', event);
        }
      }
    }, {
      key: "onSwipeoutOverswipeEnter",
      value: function onSwipeoutOverswipeEnter(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:overswipeenter swipeoutOverswipeEnter');
      }
    }, {
      key: "onSwipeoutOverswipeExit",
      value: function onSwipeoutOverswipeExit(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:overswipeexit swipeoutOverswipeExit');
      }
    }, {
      key: "onSwipeoutDeleted",
      value: function onSwipeoutDeleted(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:deleted swipeoutDeleted');
      }
    }, {
      key: "onSwipeoutDelete",
      value: function onSwipeoutDelete(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:delete swipeoutDelete');
      }
    }, {
      key: "onSwipeoutClose",
      value: function onSwipeoutClose(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:close swipeoutClose');
      }
    }, {
      key: "onSwipeoutClosed",
      value: function onSwipeoutClosed(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:closed swipeoutClosed');
      }
    }, {
      key: "onSwipeoutOpen",
      value: function onSwipeoutOpen(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:open swipeoutOpen');
      }
    }, {
      key: "onSwipeoutOpened",
      value: function onSwipeoutOpened(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:opened swipeoutOpened');
      }
    }, {
      key: "onSwipeout",
      value: function onSwipeout(el, progress) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout', progress);
      }
    }, {
      key: "onAccBeforeClose",
      value: function onAccBeforeClose(el, prevent) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordion:beforeclose accordionBeforeClose', prevent);
      }
    }, {
      key: "onAccClose",
      value: function onAccClose(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordion:close accordionClose');
      }
    }, {
      key: "onAccClosed",
      value: function onAccClosed(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordion:closed accordionClosed');
      }
    }, {
      key: "onAccBeforeOpen",
      value: function onAccBeforeOpen(el, prevent) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordion:beforeopen accordionBeforeOpen', prevent);
      }
    }, {
      key: "onAccOpen",
      value: function onAccOpen(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordion:open accordionOpen');
      }
    }, {
      key: "onAccOpened",
      value: function onAccOpened(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordion:opened accordionOpened');
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
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var linkEl;
        var itemContentEl;
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
            defaultChecked = props.defaultChecked,
            indeterminate = props.indeterminate,
            name = props.name,
            value = props.value,
            readonly = props.readonly,
            required = props.required,
            disabled = props.disabled,
            sortable = props.sortable,
            noChevron = props.noChevron,
            chevronCenter = props.chevronCenter,
            virtualListIndex = props.virtualListIndex;
        var isMedia = mediaItem || mediaList || self.state.isMedia;
        var isSortable = sortable || self.state.isSortable;
        var isSimple = self.state.isSimple;

        if (!isSimple) {
          var needsEvents = !(link || href || accordionItem || smartSelect);
          itemContentEl = React.createElement(F7ListItemContent, {
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
            defaultChecked: defaultChecked,
            indeterminate: indeterminate,
            radio: radio,
            name: name,
            value: value,
            readonly: readonly,
            required: required,
            disabled: disabled,
            onClick: needsEvents ? self.onClick : null,
            onChange: needsEvents ? self.onChange : null
          }, this.slots['content-start'], this.slots['content'], this.slots['content-end'], this.slots['media'], this.slots['inner-start'], this.slots['inner'], this.slots['inner-end'], this.slots['after-start'], this.slots['after'], this.slots['after-end'], this.slots['header'], this.slots['footer'], this.slots['before-title'], this.slots['title'], this.slots['after-title'], this.slots['subtitle'], this.slots['text'], swipeout || accordionItem ? null : self.slots.default);

          if (link || href || accordionItem || smartSelect) {
            var linkAttrs = Object.assign({
              href: link === true ? '' : link || href,
              target: target
            }, Mixins.linkRouterAttrs(props), {}, Mixins.linkActionsAttrs(props));
            var linkClasses = Utils.classNames({
              'item-link': true,
              'smart-select': smartSelect
            }, Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
            linkEl = React.createElement('a', Object.assign({
              ref: function ref(__reactNode) {
                _this2.__reactRefs['linkEl'] = __reactNode;
              },
              className: linkClasses
            }, linkAttrs), itemContentEl);
          }
        }

        var liClasses = Utils.classNames(className, {
          'item-divider': divider,
          'list-group-title': groupTitle,
          'media-item': isMedia,
          swipeout: swipeout,
          'accordion-item': accordionItem,
          'accordion-item-opened': accordionItemOpened,
          disabled: disabled && !(radio || checkbox),
          'no-chevron': noChevron,
          'chevron-center': chevronCenter,
          'disallow-sorting': sortable === false
        }, Mixins.colorClasses(props));

        if (divider || groupTitle) {
          return React.createElement('li', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['el'] = __reactNode;
            },
            id: id,
            style: style,
            className: liClasses,
            'data-virtual-list-index': virtualListIndex
          }, React.createElement('span', null, this.slots['default'], !this.slots.default && title));
        }

        if (isSimple) {
          return React.createElement('li', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['el'] = __reactNode;
            },
            id: id,
            style: style,
            className: liClasses,
            'data-virtual-list-index': virtualListIndex
          }, title, this.slots['default']);
        }

        var linkItemEl = link || href || smartSelect || accordionItem ? linkEl : itemContentEl;
        return React.createElement('li', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: liClasses,
          'data-virtual-list-index': virtualListIndex
        }, this.slots['root-start'], swipeout ? React.createElement('div', {
          className: 'swipeout-content'
        }, linkItemEl) : linkItemEl, isSortable && sortable !== false && React.createElement('div', {
          className: 'sortable-handler'
        }), (swipeout || accordionItem) && self.slots.default, this.slots['root'], this.slots['root-end']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        var linkEl = self.refs.linkEl;
        var _self$props = self.props,
            link = _self$props.link,
            href = _self$props.href,
            smartSelect = _self$props.smartSelect,
            swipeout = _self$props.swipeout,
            accordionItem = _self$props.accordionItem;
        var needsEvents = !(link || href || accordionItem || smartSelect);

        if (linkEl) {
          if (!needsEvents) {
            linkEl.removeEventListener('click', self.onClick);
          }

          delete linkEl.f7RouteProps;
        }

        if (self.$f7) {
          var f7 = self.$f7;

          if (swipeout) {
            f7.off('swipeoutOpen', self.onSwipeoutOpen);
            f7.off('swipeoutOpened', self.onSwipeoutOpened);
            f7.off('swipeoutClose', self.onSwipeoutClose);
            f7.off('swipeoutClosed', self.onSwipeoutClosed);
            f7.off('swipeoutDelete', self.onSwipeoutDelete);
            f7.off('swipeoutDeleted', self.onSwipeoutDeleted);
            f7.off('swipeoutOverswipeEnter', self.onSwipeoutOverswipeEnter);
            f7.off('swipeoutOverswipeExit', self.onSwipeoutOverswipeExit);
            f7.off('swipeout', self.onSwipeout);
          }

          if (accordionItem) {
            f7.off('accordionBeforeOpen', self.onAccBeforeOpen);
            f7.off('accordionOpen', self.onAccOpen);
            f7.off('accordionOpened', self.onAccOpened);
            f7.off('accordionBeforeClose', self.onAccBeforeClose);
            f7.off('accordionClose', self.onAccClose);
            f7.off('accordionClosed', self.onAccClosed);
          }
        }

        if (smartSelect && self.f7SmartSelect) {
          self.f7SmartSelect.destroy();
        }

        if (self.f7Tooltip && self.f7Tooltip.destroy) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
        }

        self.eventTargetEl = null;
        delete self.eventTargetEl;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
          var self = _this3;

          if (!newText && self.f7Tooltip) {
            self.f7Tooltip.destroy();
            self.f7Tooltip = null;
            delete self.f7Tooltip;
            return;
          }

          if (newText && !self.f7Tooltip && self.$f7) {
            self.f7Tooltip = self.$f7.tooltip.create({
              targetEl: self.refs.el,
              text: newText
            });
            return;
          }

          if (!newText || !self.f7Tooltip) { return; }
          self.f7Tooltip.setText(newText);
        });

        __reactComponentWatch(this, 'props.swipeoutOpened', prevProps, prevState, function (opened) {
          var self = _this3;
          if (!self.props.swipeout) { return; }
          var el = self.refs.el;

          if (opened) {
            self.$f7.swipeout.open(el);
          } else {
            self.$f7.swipeout.close(el);
          }
        });

        var self = this;
        var $listEl = self.$listEl;
        var linkEl = self.refs.linkEl;
        var routeProps = self.props.routeProps;

        if (linkEl && routeProps) {
          linkEl.f7RouteProps = routeProps;
        }

        if (!$listEl || $listEl && $listEl.length === 0) { return; }
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
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var _self$refs = self.refs,
            el = _self$refs.el,
            linkEl = _self$refs.linkEl;
        if (!el) { return; }
        var _self$props2 = self.props,
            link = _self$props2.link,
            href = _self$props2.href,
            smartSelect = _self$props2.smartSelect,
            swipeout = _self$props2.swipeout,
            swipeoutOpened = _self$props2.swipeoutOpened,
            accordionItem = _self$props2.accordionItem,
            smartSelectParams = _self$props2.smartSelectParams,
            routeProps = _self$props2.routeProps,
            tooltip = _self$props2.tooltip;
        var needsEvents = !(link || href || accordionItem || smartSelect);

        if (!needsEvents && linkEl) {
          linkEl.addEventListener('click', self.onClick);
        }

        if (linkEl && routeProps) {
          linkEl.f7RouteProps = routeProps;
        }

        self.$listEl = self.$$(el).parents('.list, .list-group').eq(0);

        if (self.$listEl.length) {
          self.setState({
            isMedia: self.$listEl.hasClass('media-list'),
            isSimple: self.$listEl.hasClass('simple-list'),
            isSortable: self.$listEl.hasClass('sortable')
          });
        }

        self.$f7ready(function (f7) {
          self.eventTargetEl = el;

          if (swipeout) {
            f7.on('swipeoutOpen', self.onSwipeoutOpen);
            f7.on('swipeoutOpened', self.onSwipeoutOpened);
            f7.on('swipeoutClose', self.onSwipeoutClose);
            f7.on('swipeoutClosed', self.onSwipeoutClosed);
            f7.on('swipeoutDelete', self.onSwipeoutDelete);
            f7.on('swipeoutDeleted', self.onSwipeoutDeleted);
            f7.on('swipeoutOverswipeEnter', self.onSwipeoutOverswipeEnter);
            f7.on('swipeoutOverswipeExit', self.onSwipeoutOverswipeExit);
            f7.on('swipeout', self.onSwipeout);
          }

          if (accordionItem) {
            f7.on('accordionBeforeOpen', self.onAccBeforeOpen);
            f7.on('accordionOpen', self.onAccOpen);
            f7.on('accordionOpened', self.onAccOpened);
            f7.on('accordionBeforeClose', self.onAccBeforeClose);
            f7.on('accordionClose', self.onAccClose);
            f7.on('accordionClosed', self.onAccClosed);
          }

          if (smartSelect) {
            var ssParams = Utils.extend({
              el: el.querySelector('a.smart-select')
            }, smartSelectParams || {});
            self.f7SmartSelect = f7.smartSelect.create(ssParams);
          }

          if (swipeoutOpened) {
            f7.swipeout.open(el);
          }

          if (tooltip) {
            self.f7Tooltip = f7.tooltip.create({
              targetEl: el,
              text: tooltip
            });
          }
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7ListItem;
  }(React.Component);

  __reactComponentSetProps(F7ListItem, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    title: [String, Number],
    text: [String, Number],
    media: String,
    subtitle: [String, Number],
    header: [String, Number],
    footer: [String, Number],
    tooltip: String,
    link: [Boolean, String],
    target: String,
    after: [String, Number],
    badge: [String, Number],
    badgeColor: String,
    mediaItem: Boolean,
    mediaList: Boolean,
    divider: Boolean,
    groupTitle: Boolean,
    swipeout: Boolean,
    swipeoutOpened: Boolean,
    sortable: {
      type: Boolean,
      default: undefined
    },
    accordionItem: Boolean,
    accordionItemOpened: Boolean,
    smartSelect: Boolean,
    smartSelectParams: Object,
    noChevron: Boolean,
    chevronCenter: Boolean,
    checkbox: Boolean,
    radio: Boolean,
    checked: Boolean,
    defaultChecked: Boolean,
    indeterminate: Boolean,
    name: String,
    value: [String, Number, Array],
    readonly: Boolean,
    required: Boolean,
    disabled: Boolean,
    virtualListIndex: Number
  }, Mixins.colorProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps));

  F7ListItem.displayName = 'f7-list-item';

  function _typeof$G(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$G = function _typeof(obj) { return typeof obj; }; } else { _typeof$G = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$G(obj); }

  function _classCallCheck$G(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$G(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$G(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$G(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$G(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$G(self, call) { if (call && (_typeof$G(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$G(self); }

  function _getPrototypeOf$G(o) { _getPrototypeOf$G = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$G(o); }

  function _assertThisInitialized$G(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$G(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$G(subClass, superClass); } }

  function _setPrototypeOf$G(o, p) { _setPrototypeOf$G = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$G(o, p); }

  var F7List =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$G(F7List, _React$Component);

    function F7List(props, context) {
      var _this;

      _classCallCheck$G(this, F7List);

      _this = _possibleConstructorReturn$G(this, _getPrototypeOf$G(F7List).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$G(_this), ['onSortableEnable', 'onSortableDisable', 'onSortableSort', 'onTabShow', 'onTabHide', 'onSubmit']);
      })();

      return _this;
    }

    _createClass$G(F7List, [{
      key: "onSubmit",
      value: function onSubmit(event) {
        this.dispatchEvent('submit', event);
      }
    }, {
      key: "onSortableEnable",
      value: function onSortableEnable(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('sortable:enable sortableEnable');
      }
    }, {
      key: "onSortableDisable",
      value: function onSortableDisable(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('sortable:disable sortableDisable');
      }
    }, {
      key: "onSortableSort",
      value: function onSortableSort(el, sortData, listEl) {
        if (this.eventTargetEl !== listEl) { return; }
        this.dispatchEvent('sortable:sort sortableSort', sortData);
      }
    }, {
      key: "onTabShow",
      value: function onTabShow(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('tab:show tabShow');
      }
    }, {
      key: "onTabHide",
      value: function onTabHide(el) {
        if (this.eventTargetEl !== el) { return; }
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
          if (typeof child === 'undefined') { return; }
          var tag;
          {
            tag = child.type && (child.type.displayName || child.type.name);

            if (!tag && typeof child.type === 'string') {
              tag = child.type;
            }
          }

          if (!tag && 'react' === 'react' || tag && !(tag === 'li' || tag === 'F7ListItem' || tag === 'F7ListButton' || tag === 'F7ListInput' || tag.indexOf('list-item') >= 0 || tag.indexOf('list-button') >= 0 || tag.indexOf('list-input') >= 0 || tag.indexOf('f7-list-item') >= 0 || tag.indexOf('f7-list-button') >= 0 || tag.indexOf('f7-list-input') >= 0)) {
            if (wasUlChild) { rootChildrenAfterList.push(child); }else { rootChildrenBeforeList.push(child); }
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
        if (!el || !f7) { return; }
        f7.off('sortableEnable', self.onSortableEnable);
        f7.off('sortableDisable', self.onSortableDisable);
        f7.off('sortableSort', self.onSortableSort);
        f7.off('tabShow', self.onTabShow);
        f7.off('tabHide', self.onTabHide);
        el.removeEventListener('submit', self.onSubmit);
        self.eventTargetEl = null;
        delete self.eventTargetEl;
        if (!(self.virtualList && self.f7VirtualList)) { return; }
        if (self.f7VirtualList.destroy) { self.f7VirtualList.destroy(); }
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

          if (!virtualList) { return; }
          var vlParams = virtualListParams || {};
          if (!vlParams.renderItem && !vlParams.itemTemplate && !vlParams.renderExternal) { return; }
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
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

  function _typeof$H(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$H = function _typeof(obj) { return typeof obj; }; } else { _typeof$H = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$H(obj); }

  function _classCallCheck$H(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$H(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$H(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$H(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$H(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$H(self, call) { if (call && (_typeof$H(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$H(self); }

  function _assertThisInitialized$H(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$H(o) { _getPrototypeOf$H = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$H(o); }

  function _inherits$H(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$H(subClass, superClass); } }

  function _setPrototypeOf$H(o, p) { _setPrototypeOf$H = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$H(o, p); }

  var F7LoginScreenTitle =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$H(F7LoginScreenTitle, _React$Component);

    function F7LoginScreenTitle(props, context) {
      _classCallCheck$H(this, F7LoginScreenTitle);

      return _possibleConstructorReturn$H(this, _getPrototypeOf$H(F7LoginScreenTitle).call(this, props, context));
    }

    _createClass$H(F7LoginScreenTitle, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'login-screen-title', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7LoginScreenTitle;
  }(React.Component);

  __reactComponentSetProps(F7LoginScreenTitle, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7LoginScreenTitle.displayName = 'f7-login-screen-title';

  function _typeof$I(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$I = function _typeof(obj) { return typeof obj; }; } else { _typeof$I = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$I(obj); }

  function _classCallCheck$I(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$I(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$I(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$I(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$I(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$I(self, call) { if (call && (_typeof$I(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$I(self); }

  function _getPrototypeOf$I(o) { _getPrototypeOf$I = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$I(o); }

  function _assertThisInitialized$I(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$I(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$I(subClass, superClass); } }

  function _setPrototypeOf$I(o, p) { _setPrototypeOf$I = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$I(o, p); }

  var F7LoginScreen =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$I(F7LoginScreen, _React$Component);

    function F7LoginScreen(props, context) {
      var _this;

      _classCallCheck$I(this, F7LoginScreen);

      _this = _possibleConstructorReturn$I(this, _getPrototypeOf$I(F7LoginScreen).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$I(_this), ['onOpen', 'onOpened', 'onClose', 'onClosed']);
      })();

      return _this;
    }

    _createClass$I(F7LoginScreen, [{
      key: "onOpen",
      value: function onOpen(instance) {
        this.dispatchEvent('loginscreen:open loginScreenOpen', instance);
      }
    }, {
      key: "onOpened",
      value: function onOpened(instance) {
        this.dispatchEvent('loginscreen:opened loginScreenOpened', instance);
      }
    }, {
      key: "onClose",
      value: function onClose(instance) {
        this.dispatchEvent('loginscreen:close loginScreenClose', instance);
      }
    }, {
      key: "onClosed",
      value: function onClosed(instance) {
        this.dispatchEvent('loginscreen:closed loginScreenClosed', instance);
      }
    }, {
      key: "open",
      value: function open(animate) {
        var self = this;
        if (!self.f7LoginScreen) { return undefined; }
        return self.f7LoginScreen.open(animate);
      }
    }, {
      key: "close",
      value: function close(animate) {
        var self = this;
        if (!self.f7LoginScreen) { return undefined; }
        return self.f7LoginScreen.close(animate);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'login-screen', Mixins.colorClasses(props));
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        if (self.f7LoginScreen) { self.f7LoginScreen.destroy(); }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        if (!el) { return; }
        self.$f7ready(function () {
          self.f7LoginScreen = self.$f7.loginScreen.create({
            el: el,
            on: {
              open: self.onOpen,
              opened: self.onOpened,
              close: self.onClose,
              closed: self.onClosed
            }
          });

          if (self.props.opened) {
            self.f7LoginScreen.open(false);
          }
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.opened', prevProps, prevState, function (opened) {
          var self = _this3;
          if (!self.f7LoginScreen) { return; }

          if (opened) {
            self.f7LoginScreen.open();
          } else {
            self.f7LoginScreen.close();
          }
        });
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

    return F7LoginScreen;
  }(React.Component);

  __reactComponentSetProps(F7LoginScreen, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    opened: Boolean
  }, Mixins.colorProps));

  F7LoginScreen.displayName = 'f7-login-screen';

  function _typeof$J(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$J = function _typeof(obj) { return typeof obj; }; } else { _typeof$J = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$J(obj); }

  function _classCallCheck$J(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$J(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$J(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$J(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$J(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$J(self, call) { if (call && (_typeof$J(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$J(self); }

  function _getPrototypeOf$J(o) { _getPrototypeOf$J = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$J(o); }

  function _assertThisInitialized$J(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$J(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$J(subClass, superClass); } }

  function _setPrototypeOf$J(o, p) { _setPrototypeOf$J = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$J(o, p); }

  var F7MenuDropdownItem =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$J(F7MenuDropdownItem, _React$Component);

    function F7MenuDropdownItem(props, context) {
      var _this;

      _classCallCheck$J(this, F7MenuDropdownItem);

      _this = _possibleConstructorReturn$J(this, _getPrototypeOf$J(F7MenuDropdownItem).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$J(_this), ['onClick']);
      })();

      return _this;
    }

    _createClass$J(F7MenuDropdownItem, [{
      key: "onClick",
      value: function onClick(event) {
        this.dispatchEvent('click', event);
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
            link = props.link,
            href = props.href,
            text = props.text,
            divider = props.divider,
            menuClose = props.menuClose;
        var isLink = link || href || href === '';
        var Tag = isLink ? 'a' : 'div';
        var classes = Utils.classNames({
          'menu-dropdown-link': isLink && !divider,
          'menu-dropdown-item': !isLink && !divider,
          'menu-dropdown-divider': divider
        }, className, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props), {
          'menu-close': typeof menuClose === 'undefined'
        });
        return React.createElement(Tag, Object.assign({
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          className: classes,
          id: id,
          style: style
        }, self.attrs), text, this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        var el = self.refs.el;
        if (!el) { return; }
        el.removeEventListener('click', self.onClick);
        delete el.f7RouteProps;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var self = this;
        var el = self.refs.el;
        if (!el) { return; }
        var routeProps = self.props.routeProps;
        if (routeProps) { el.f7RouteProps = routeProps; }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        if (!el) { return; }
        el.addEventListener('click', self.onClick);
        var routeProps = self.props.routeProps;
        if (routeProps) { el.f7RouteProps = routeProps; }
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "attrs",
      get: function get() {
        var self = this;
        var props = self.props;
        var link = props.link,
            href = props.href,
            target = props.target;
        var hrefComputed = href;
        if (typeof hrefComputed === 'undefined' && link) { hrefComputed = '#'; }
        return Utils.extend({
          href: hrefComputed,
          target: target
        }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
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

    return F7MenuDropdownItem;
  }(React.Component);

  __reactComponentSetProps(F7MenuDropdownItem, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    text: String,
    link: Boolean,
    href: String,
    target: String,
    divider: Boolean
  }, Mixins.colorProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps));

  F7MenuDropdownItem.displayName = 'f7-menu-dropdown-item';

  function _typeof$K(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$K = function _typeof(obj) { return typeof obj; }; } else { _typeof$K = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$K(obj); }

  function _classCallCheck$K(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$K(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$K(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$K(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$K(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$K(self, call) { if (call && (_typeof$K(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$K(self); }

  function _assertThisInitialized$K(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$K(o) { _getPrototypeOf$K = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$K(o); }

  function _inherits$K(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$K(subClass, superClass); } }

  function _setPrototypeOf$K(o, p) { _setPrototypeOf$K = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$K(o, p); }

  var F7MenuDropdown =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$K(F7MenuDropdown, _React$Component);

    function F7MenuDropdown(props, context) {
      _classCallCheck$K(this, F7MenuDropdown);

      return _possibleConstructorReturn$K(this, _getPrototypeOf$K(F7MenuDropdown).call(this, props, context));
    }

    _createClass$K(F7MenuDropdown, [{
      key: "render",
      value: function render() {
        var self = this;
        var props = self.props;
        var id = props.id,
            className = props.className,
            style = props.style,
            contentHeight = props.contentHeight,
            position = props.position,
            left = props.left,
            center = props.center,
            right = props.right;
        var positionComputed = position || 'left';
        if (left) { positionComputed = 'left'; }
        if (center) { positionComputed = 'center'; }
        if (right) { positionComputed = 'right'; }
        var classes = Utils.classNames('menu-dropdown', "menu-dropdown-".concat(positionComputed), Mixins.colorClasses(props), className);
        return React.createElement('div', {
          className: classes,
          id: id,
          style: style
        }, React.createElement('div', {
          className: 'menu-dropdown-content',
          style: {
            height: contentHeight
          }
        }, this.slots['default']));
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7MenuDropdown;
  }(React.Component);

  __reactComponentSetProps(F7MenuDropdown, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    contentHeight: String,
    position: String,
    left: Boolean,
    center: Boolean,
    right: Boolean
  }, Mixins.colorProps));

  F7MenuDropdown.displayName = 'f7-menu-dropdown';

  function _typeof$L(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$L = function _typeof(obj) { return typeof obj; }; } else { _typeof$L = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$L(obj); }

  function _classCallCheck$L(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$L(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$L(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$L(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$L(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$L(self, call) { if (call && (_typeof$L(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$L(self); }

  function _getPrototypeOf$L(o) { _getPrototypeOf$L = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$L(o); }

  function _assertThisInitialized$L(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$L(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$L(subClass, superClass); } }

  function _setPrototypeOf$L(o, p) { _setPrototypeOf$L = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$L(o, p); }

  var F7MenuItem =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$L(F7MenuItem, _React$Component);

    function F7MenuItem(props, context) {
      var _this;

      _classCallCheck$L(this, F7MenuItem);

      _this = _possibleConstructorReturn$L(this, _getPrototypeOf$L(F7MenuItem).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$L(_this), ['onClick', 'onOpened', 'onClosed']);
      })();

      return _this;
    }

    _createClass$L(F7MenuItem, [{
      key: "onClick",
      value: function onClick(e) {
        this.dispatchEvent('click', e);
      }
    }, {
      key: "onOpened",
      value: function onOpened(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('menuOpened menu:opened', el);
      }
    }, {
      key: "onClosed",
      value: function onClosed(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('menuClosed menu:closed', el);
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
            link = props.link,
            href = props.href,
            text = props.text,
            dropdown = props.dropdown,
            iconOnly = props.iconOnly,
            icon = props.icon,
            iconColor = props.iconColor,
            iconSize = props.iconSize,
            iconMaterial = props.iconMaterial,
            iconF7 = props.iconF7,
            iconMd = props.iconMd,
            iconIos = props.iconIos,
            iconAurora = props.iconAurora;
        var slots = self.slots;
        var iconEl;
        var iconOnlyComputed;

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

        if (iconOnly || !text && slots.text && slots.text.length === 0 || !text && !slots.text) {
          iconOnlyComputed = true;
        } else {
          iconOnlyComputed = false;
        }

        var isLink = link || href || href === '';
        var Tag = isLink ? 'a' : 'div';
        var isDropdown = dropdown || dropdown === '';
        var classes = Utils.classNames({
          'menu-item': true,
          'menu-item-dropdown': isDropdown,
          'icon-only': iconOnlyComputed
        }, className, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
        return React.createElement(Tag, Object.assign({
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          className: classes,
          id: id,
          style: style
        }, self.attrs), (text || slots.text && slots.text.length || iconEl) && React.createElement('div', {
          className: 'menu-item-content'
        }, text, iconEl, this.slots['text']), this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        var el = self.refs.el;
        if (!el || !self.$f7) { return; }
        el.removeEventListener('click', self.onClick);
        self.$f7.off('menuOpened', self.onOpened);
        self.$f7.off('menuClosed', self.onOpened);
        self.eventTargetEl = null;
        delete el.f7RouteProps;
        delete self.eventTargetEl;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var self = this;
        var el = self.refs.el;
        if (!el) { return; }
        var routeProps = self.props.routeProps;
        if (routeProps) { el.f7RouteProps = routeProps; }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        if (!el) { return; }
        self.eventTargetEl = el;
        el.addEventListener('click', self.onClick);
        var routeProps = self.props.routeProps;
        if (routeProps) { el.f7RouteProps = routeProps; }
        self.$f7ready(function (f7) {
          f7.on('menuOpened', self.onOpened);
          f7.on('menuClosed', self.onClosed);
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "attrs",
      get: function get() {
        var self = this;
        var props = self.props;
        var href = props.href,
            link = props.link,
            target = props.target;
        var hrefComputed = href;
        if (typeof hrefComputed === 'undefined' && link) { hrefComputed = '#'; }
        return Utils.extend({
          href: hrefComputed,
          target: target
        }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
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

    return F7MenuItem;
  }(React.Component);

  __reactComponentSetProps(F7MenuItem, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    text: String,
    iconOnly: Boolean,
    href: String,
    link: Boolean,
    target: String,
    dropdown: Boolean
  }, Mixins.colorProps, {}, Mixins.linkIconProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps));

  F7MenuItem.displayName = 'f7-menu-item';

  function _typeof$M(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$M = function _typeof(obj) { return typeof obj; }; } else { _typeof$M = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$M(obj); }

  function _classCallCheck$M(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$M(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$M(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$M(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$M(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$M(self, call) { if (call && (_typeof$M(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$M(self); }

  function _assertThisInitialized$M(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$M(o) { _getPrototypeOf$M = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$M(o); }

  function _inherits$M(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$M(subClass, superClass); } }

  function _setPrototypeOf$M(o, p) { _setPrototypeOf$M = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$M(o, p); }

  var F7Menu =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$M(F7Menu, _React$Component);

    function F7Menu(props, context) {
      _classCallCheck$M(this, F7Menu);

      return _possibleConstructorReturn$M(this, _getPrototypeOf$M(F7Menu).call(this, props, context));
    }

    _createClass$M(F7Menu, [{
      key: "render",
      value: function render() {
        var self = this;
        var props = self.props;
        var id = props.id,
            className = props.className,
            style = props.style;
        return React.createElement('div', {
          className: Utils.classNames('menu', Mixins.colorClasses(props), className),
          id: id,
          style: style
        }, React.createElement('div', {
          className: 'menu-inner'
        }, this.slots['default']));
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7Menu;
  }(React.Component);

  __reactComponentSetProps(F7Menu, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7Menu.displayName = 'f7-menu';

  function _typeof$N(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$N = function _typeof(obj) { return typeof obj; }; } else { _typeof$N = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$N(obj); }

  function _classCallCheck$N(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$N(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$N(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$N(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$N(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$N(self, call) { if (call && (_typeof$N(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$N(self); }

  function _getPrototypeOf$N(o) { _getPrototypeOf$N = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$N(o); }

  function _assertThisInitialized$N(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$N(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$N(subClass, superClass); } }

  function _setPrototypeOf$N(o, p) { _setPrototypeOf$N = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$N(o, p); }

  var F7Message =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$N(F7Message, _React$Component);

    function F7Message(props, context) {
      var _this;

      _classCallCheck$N(this, F7Message);

      _this = _possibleConstructorReturn$N(this, _getPrototypeOf$N(F7Message).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$N(_this), ['onClick', 'onNameClick', 'onTextClick', 'onAvatarClick', 'onHeaderClick', 'onFooterClick', 'onBubbleClick']);
      })();

      return _this;
    }

    _createClass$N(F7Message, [{
      key: "onClick",
      value: function onClick(event) {
        this.dispatchEvent('click', event);
      }
    }, {
      key: "onNameClick",
      value: function onNameClick(event) {
        this.dispatchEvent('click:name clickName', event);
      }
    }, {
      key: "onTextClick",
      value: function onTextClick(event) {
        this.dispatchEvent('click:text clickText', event);
      }
    }, {
      key: "onAvatarClick",
      value: function onAvatarClick(event) {
        this.dispatchEvent('click:avatar clickAvatar', event);
      }
    }, {
      key: "onHeaderClick",
      value: function onHeaderClick(event) {
        this.dispatchEvent('click:header clickHeader', event);
      }
    }, {
      key: "onFooterClick",
      value: function onFooterClick(event) {
        this.dispatchEvent('click:footer clickFooter', event);
      }
    }, {
      key: "onBubbleClick",
      value: function onBubbleClick(event) {
        this.dispatchEvent('click:bubble clickBubble', event);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

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
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: self.classes
        }, slotsStart, (avatar || slotsAvatar) && React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['avatarEl'] = __reactNode;
          },
          className: 'message-avatar',
          style: {
            backgroundImage: avatar && "url(".concat(avatar, ")")
          }
        }, slotsAvatar), React.createElement('div', {
          className: 'message-content'
        }, slotsContentStart, (slotsName || name) && React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['nameEl'] = __reactNode;
          },
          className: 'message-name'
        }, slotsName || name), (slotsHeader || header) && React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['headerEl'] = __reactNode;
          },
          className: 'message-header'
        }, slotsHeader || header), React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['bubbleEl'] = __reactNode;
          },
          className: 'message-bubble'
        }, slotsBubbleStart, (slotsImage || image) && React.createElement('div', {
          className: 'message-image'
        }, slotsImage || React.createElement('img', {
          src: image
        })), (slotsTextHeader || textHeader) && React.createElement('div', {
          className: 'message-text-header'
        }, slotsTextHeader || textHeader), (slotsText || text || typing) && React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['textEl'] = __reactNode;
          },
          className: 'message-text'
        }, slotsText || text, typing && React.createElement('div', {
          className: 'message-typing-indicator'
        }, React.createElement('div', null), React.createElement('div', null), React.createElement('div', null))), (slotsTextFooter || textFooter) && React.createElement('div', {
          className: 'message-text-footer'
        }, slotsTextFooter || textFooter), slotsBubbleEnd, slotsDefault), (slotsFooter || footer) && React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['footerEl'] = __reactNode;
          },
          className: 'message-footer'
        }, slotsFooter || footer), slotsContentEnd), slotsEnd);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var _this$refs = this.refs,
            el = _this$refs.el,
            nameEl = _this$refs.nameEl,
            textEl = _this$refs.textEl,
            avatarEl = _this$refs.avatarEl,
            headerEl = _this$refs.headerEl,
            footerEl = _this$refs.footerEl,
            bubbleEl = _this$refs.bubbleEl;
        el.removeEventListener('click', this.onClick);
        if (nameEl) { nameEl.removeEventListener('click', this.onNameClick); }
        if (textEl) { textEl.removeEventListener('click', this.onTextClick); }
        if (avatarEl) { avatarEl.removeEventListener('click', this.onAvatarClick); }
        if (headerEl) { headerEl.removeEventListener('click', this.onHeaderClick); }
        if (footerEl) { footerEl.removeEventListener('click', this.onFooterClick); }
        if (bubbleEl) { bubbleEl.removeEventListener('click', this.onBubbleClick); }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this$refs2 = this.refs,
            el = _this$refs2.el,
            nameEl = _this$refs2.nameEl,
            textEl = _this$refs2.textEl,
            avatarEl = _this$refs2.avatarEl,
            headerEl = _this$refs2.headerEl,
            footerEl = _this$refs2.footerEl,
            bubbleEl = _this$refs2.bubbleEl;
        el.addEventListener('click', this.onClick);
        if (nameEl) { nameEl.addEventListener('click', this.onNameClick); }
        if (textEl) { textEl.addEventListener('click', this.onTextClick); }
        if (avatarEl) { avatarEl.addEventListener('click', this.onAvatarClick); }
        if (headerEl) { headerEl.addEventListener('click', this.onHeaderClick); }
        if (footerEl) { footerEl.addEventListener('click', this.onFooterClick); }
        if (bubbleEl) { bubbleEl.addEventListener('click', this.onBubbleClick); }
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "classes",
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
        return Utils.classNames(className, 'message', {
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

    return F7Message;
  }(React.Component);

  __reactComponentSetProps(F7Message, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
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
  }, Mixins.colorProps));

  F7Message.displayName = 'f7-message';

  function _typeof$O(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$O = function _typeof(obj) { return typeof obj; }; } else { _typeof$O = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$O(obj); }

  function _classCallCheck$O(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$O(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$O(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$O(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$O(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$O(self, call) { if (call && (_typeof$O(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$O(self); }

  function _getPrototypeOf$O(o) { _getPrototypeOf$O = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$O(o); }

  function _assertThisInitialized$O(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$O(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$O(subClass, superClass); } }

  function _setPrototypeOf$O(o, p) { _setPrototypeOf$O = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$O(o, p); }

  var F7MessagebarAttachment =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$O(F7MessagebarAttachment, _React$Component);

    function F7MessagebarAttachment(props, context) {
      var _this;

      _classCallCheck$O(this, F7MessagebarAttachment);

      _this = _possibleConstructorReturn$O(this, _getPrototypeOf$O(F7MessagebarAttachment).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$O(_this), ['onClick', 'onDeleteClick']);
      })();

      return _this;
    }

    _createClass$O(F7MessagebarAttachment, [{
      key: "onClick",
      value: function onClick(event) {
        this.dispatchEvent('attachment:click attachmentClick', event);
      }
    }, {
      key: "onDeleteClick",
      value: function onDeleteClick(event) {
        this.dispatchEvent('attachment:delete attachmentDelete', event);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var deletable = props.deletable,
            image = props.image,
            className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'messagebar-attachment', Mixins.colorClasses(props));
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes
        }, image && React.createElement('img', {
          src: image
        }), deletable && React.createElement('span', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['deleteEl'] = __reactNode;
          },
          className: 'messagebar-attachment-delete'
        }), this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.refs.el.removeEventListener('click', this.onClick);

        if (this.refs.deleteEl) {
          this.refs.deleteEl.removeEventListener('click', this.onDeleteClick);
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.refs.el.addEventListener('click', this.onClick);

        if (this.refs.deleteEl) {
          this.refs.deleteEl.addEventListener('click', this.onDeleteClick);
        }
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7MessagebarAttachment;
  }(React.Component);

  __reactComponentSetProps(F7MessagebarAttachment, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    image: String,
    deletable: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps));

  F7MessagebarAttachment.displayName = 'f7-messagebar-attachment';

  function _typeof$P(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$P = function _typeof(obj) { return typeof obj; }; } else { _typeof$P = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$P(obj); }

  function _classCallCheck$P(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$P(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$P(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$P(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$P(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$P(self, call) { if (call && (_typeof$P(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$P(self); }

  function _assertThisInitialized$P(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$P(o) { _getPrototypeOf$P = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$P(o); }

  function _inherits$P(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$P(subClass, superClass); } }

  function _setPrototypeOf$P(o, p) { _setPrototypeOf$P = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$P(o, p); }

  var F7MessagebarAttachments =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$P(F7MessagebarAttachments, _React$Component);

    function F7MessagebarAttachments(props, context) {
      _classCallCheck$P(this, F7MessagebarAttachments);

      return _possibleConstructorReturn$P(this, _getPrototypeOf$P(F7MessagebarAttachments).call(this, props, context));
    }

    _createClass$P(F7MessagebarAttachments, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'messagebar-attachments', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7MessagebarAttachments;
  }(React.Component);

  __reactComponentSetProps(F7MessagebarAttachments, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7MessagebarAttachments.displayName = 'f7-messagebar-attachments';

  function _typeof$Q(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$Q = function _typeof(obj) { return typeof obj; }; } else { _typeof$Q = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$Q(obj); }

  function _classCallCheck$Q(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$Q(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$Q(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$Q(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$Q(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$Q(self, call) { if (call && (_typeof$Q(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$Q(self); }

  function _getPrototypeOf$Q(o) { _getPrototypeOf$Q = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$Q(o); }

  function _assertThisInitialized$Q(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$Q(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$Q(subClass, superClass); } }

  function _setPrototypeOf$Q(o, p) { _setPrototypeOf$Q = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$Q(o, p); }

  var F7MessagebarSheetImage =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$Q(F7MessagebarSheetImage, _React$Component);

    function F7MessagebarSheetImage(props, context) {
      var _this;

      _classCallCheck$Q(this, F7MessagebarSheetImage);

      _this = _possibleConstructorReturn$Q(this, _getPrototypeOf$Q(F7MessagebarSheetImage).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$Q(_this), ['onChange']);
      })();

      return _this;
    }

    _createClass$Q(F7MessagebarSheetImage, [{
      key: "onChange",
      value: function onChange(event) {
        if (this.props.checked) { this.dispatchEvent('checked', event); }else { this.dispatchEvent('unchecked', event); }
        this.dispatchEvent('change', event);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var image = props.image,
            checked = props.checked,
            id = props.id,
            className = props.className,
            style = props.style;
        var classes = Utils.classNames(className, 'messagebar-sheet-image', 'checkbox', Mixins.colorClasses(props));
        var styles = Utils.extend({
          backgroundImage: image && "url(".concat(image, ")")
        }, style || {});
        var inputEl;
        {
          inputEl = React.createElement('input', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['inputEl'] = __reactNode;
            },
            type: 'checkbox',
            checked: checked,
            onChange: self.onChange
          });
        }
        return React.createElement('label', {
          id: id,
          className: classes,
          style: styles
        }, inputEl, React.createElement('i', {
          className: 'icon icon-checkbox'
        }), this.slots['default']);
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7MessagebarSheetImage;
  }(React.Component);

  __reactComponentSetProps(F7MessagebarSheetImage, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    image: String,
    checked: Boolean
  }, Mixins.colorProps));

  F7MessagebarSheetImage.displayName = 'f7-messagebar-sheet-image';

  function _typeof$R(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$R = function _typeof(obj) { return typeof obj; }; } else { _typeof$R = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$R(obj); }

  function _classCallCheck$R(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$R(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$R(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$R(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$R(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$R(self, call) { if (call && (_typeof$R(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$R(self); }

  function _assertThisInitialized$R(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$R(o) { _getPrototypeOf$R = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$R(o); }

  function _inherits$R(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$R(subClass, superClass); } }

  function _setPrototypeOf$R(o, p) { _setPrototypeOf$R = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$R(o, p); }

  var F7MessagebarSheetItem =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$R(F7MessagebarSheetItem, _React$Component);

    function F7MessagebarSheetItem(props, context) {
      _classCallCheck$R(this, F7MessagebarSheetItem);

      return _possibleConstructorReturn$R(this, _getPrototypeOf$R(F7MessagebarSheetItem).call(this, props, context));
    }

    _createClass$R(F7MessagebarSheetItem, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'messagebar-sheet-item', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7MessagebarSheetItem;
  }(React.Component);

  __reactComponentSetProps(F7MessagebarSheetItem, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7MessagebarSheetItem.displayName = 'f7-messagebar-sheet-item';

  function _typeof$S(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$S = function _typeof(obj) { return typeof obj; }; } else { _typeof$S = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$S(obj); }

  function _classCallCheck$S(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$S(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$S(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$S(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$S(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$S(self, call) { if (call && (_typeof$S(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$S(self); }

  function _assertThisInitialized$S(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$S(o) { _getPrototypeOf$S = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$S(o); }

  function _inherits$S(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$S(subClass, superClass); } }

  function _setPrototypeOf$S(o, p) { _setPrototypeOf$S = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$S(o, p); }

  var F7MessagebarSheet =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$S(F7MessagebarSheet, _React$Component);

    function F7MessagebarSheet(props, context) {
      _classCallCheck$S(this, F7MessagebarSheet);

      return _possibleConstructorReturn$S(this, _getPrototypeOf$S(F7MessagebarSheet).call(this, props, context));
    }

    _createClass$S(F7MessagebarSheet, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'messagebar-sheet', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7MessagebarSheet;
  }(React.Component);

  __reactComponentSetProps(F7MessagebarSheet, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7MessagebarSheet.displayName = 'f7-messagebar-sheet';

  function _typeof$T(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$T = function _typeof(obj) { return typeof obj; }; } else { _typeof$T = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$T(obj); }

  function _classCallCheck$T(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$T(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$T(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$T(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$T(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$T(self, call) { if (call && (_typeof$T(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$T(self); }

  function _getPrototypeOf$T(o) { _getPrototypeOf$T = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$T(o); }

  function _assertThisInitialized$T(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$T(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$T(subClass, superClass); } }

  function _setPrototypeOf$T(o, p) { _setPrototypeOf$T = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$T(o, p); }

  var F7Messagebar =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$T(F7Messagebar, _React$Component);

    function F7Messagebar(props, context) {
      var _this;

      _classCallCheck$T(this, F7Messagebar);

      _this = _possibleConstructorReturn$T(this, _getPrototypeOf$T(F7Messagebar).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$T(_this), ['onChange', 'onInput', 'onFocus', 'onBlur', 'onClick', 'onAttachmentDelete', 'onAttachmentClick,', 'onResizePage']);
      })();

      return _this;
    }

    _createClass$T(F7Messagebar, [{
      key: "clear",
      value: function clear() {
        var _this$f7Messagebar;

        if (!this.f7Messagebar) { return undefined; }
        return (_this$f7Messagebar = this.f7Messagebar).clear.apply(_this$f7Messagebar, arguments);
      }
    }, {
      key: "getValue",
      value: function getValue() {
        var _this$f7Messagebar2;

        if (!this.f7Messagebar) { return undefined; }
        return (_this$f7Messagebar2 = this.f7Messagebar).getValue.apply(_this$f7Messagebar2, arguments);
      }
    }, {
      key: "setValue",
      value: function setValue() {
        var _this$f7Messagebar3;

        if (!this.f7Messagebar) { return undefined; }
        return (_this$f7Messagebar3 = this.f7Messagebar).setValue.apply(_this$f7Messagebar3, arguments);
      }
    }, {
      key: "setPlaceholder",
      value: function setPlaceholder() {
        var _this$f7Messagebar4;

        if (!this.f7Messagebar) { return undefined; }
        return (_this$f7Messagebar4 = this.f7Messagebar).setPlaceholder.apply(_this$f7Messagebar4, arguments);
      }
    }, {
      key: "resize",
      value: function resize() {
        var _this$f7Messagebar5;

        if (!this.f7Messagebar) { return undefined; }
        return (_this$f7Messagebar5 = this.f7Messagebar).resizePage.apply(_this$f7Messagebar5, arguments);
      }
    }, {
      key: "focus",
      value: function focus() {
        var _this$f7Messagebar6;

        if (!this.f7Messagebar) { return undefined; }
        return (_this$f7Messagebar6 = this.f7Messagebar).focus.apply(_this$f7Messagebar6, arguments);
      }
    }, {
      key: "blur",
      value: function blur() {
        var _this$f7Messagebar7;

        if (!this.f7Messagebar) { return undefined; }
        return (_this$f7Messagebar7 = this.f7Messagebar).blur.apply(_this$f7Messagebar7, arguments);
      }
    }, {
      key: "attachmentsShow",
      value: function attachmentsShow() {
        var _this$f7Messagebar8;

        if (!this.f7Messagebar) { return undefined; }
        return (_this$f7Messagebar8 = this.f7Messagebar).attachmentsShow.apply(_this$f7Messagebar8, arguments);
      }
    }, {
      key: "attachmentsHide",
      value: function attachmentsHide() {
        var _this$f7Messagebar9;

        if (!this.f7Messagebar) { return undefined; }
        return (_this$f7Messagebar9 = this.f7Messagebar).attachmentsHide.apply(_this$f7Messagebar9, arguments);
      }
    }, {
      key: "attachmentsToggle",
      value: function attachmentsToggle() {
        var _this$f7Messagebar10;

        if (!this.f7Messagebar) { return undefined; }
        return (_this$f7Messagebar10 = this.f7Messagebar).attachmentsToggle.apply(_this$f7Messagebar10, arguments);
      }
    }, {
      key: "sheetShow",
      value: function sheetShow() {
        var _this$f7Messagebar11;

        if (!this.f7Messagebar) { return undefined; }
        return (_this$f7Messagebar11 = this.f7Messagebar).sheetShow.apply(_this$f7Messagebar11, arguments);
      }
    }, {
      key: "sheetHide",
      value: function sheetHide() {
        var _this$f7Messagebar12;

        if (!this.f7Messagebar) { return undefined; }
        return (_this$f7Messagebar12 = this.f7Messagebar).sheetHide.apply(_this$f7Messagebar12, arguments);
      }
    }, {
      key: "sheetToggle",
      value: function sheetToggle() {
        var _this$f7Messagebar13;

        if (!this.f7Messagebar) { return undefined; }
        return (_this$f7Messagebar13 = this.f7Messagebar).sheetToggle.apply(_this$f7Messagebar13, arguments);
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
      key: "onClick",
      value: function onClick(event) {
        var self = this;
        var value;
        {
          value = self.refs.area.refs.inputEl.value;
        }
        var clear = self.f7Messagebar ? function () {
          self.f7Messagebar.clear();
        } : function () {};
        this.dispatchEvent('submit', value, clear);
        this.dispatchEvent('send', value, clear);
        this.dispatchEvent('click', event);
      }
    }, {
      key: "onAttachmentDelete",
      value: function onAttachmentDelete(instance, attachmentEl, attachmentElIndex) {
        this.dispatchEvent('messagebar:attachmentdelete messagebarAttachmentDelete', instance, attachmentEl, attachmentElIndex);
      }
    }, {
      key: "onAttachmentClick",
      value: function onAttachmentClick(instance, attachmentEl, attachmentElIndex) {
        this.dispatchEvent('messagebar:attachmentclick messagebarAttachmentClick', instance, attachmentEl, attachmentElIndex);
      }
    }, {
      key: "onResizePage",
      value: function onResizePage(instance) {
        this.dispatchEvent('messagebar:resizepage messagebarResizePage', instance);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var _self$props = self.props,
            placeholder = _self$props.placeholder,
            disabled = _self$props.disabled,
            name = _self$props.name,
            readonly = _self$props.readonly,
            resizable = _self$props.resizable,
            value = _self$props.value,
            sendLink = _self$props.sendLink,
            id = _self$props.id,
            style = _self$props.style;
        var _self$slots = self.slots,
            slotsDefault = _self$slots.default,
            slotsBeforeInner = _self$slots['before-inner'],
            slotsAfterInner = _self$slots['after-inner'],
            slotsSendLink = _self$slots['send-link'],
            slotsInnerStart = _self$slots['inner-start'],
            slotsInnerEnd = _self$slots['inner-end'],
            slotsBeforeArea = _self$slots['before-area'],
            slotsAfterArea = _self$slots['after-area'];
        var innerEndEls = [];
        var messagebarAttachmentsEl;
        var messagebarSheetEl;

        if (slotsDefault) {
          slotsDefault.forEach(function (child) {
            if (typeof child === 'undefined') { return; }
            var tag;
            tag = child.type && (child.type.displayName || child.type.name);

            if (tag && (tag.indexOf('messagebar-attachments') >= 0 || tag === 'F7MessagebarAttachments' || tag === 'f7-messagebar-attachments')) {
              messagebarAttachmentsEl = child;
            } else if (tag && (tag.indexOf('messagebar-sheet') >= 0 || tag === 'F7MessagebarSheet' || tag === 'f7-messagebar-sheet')) {
              messagebarSheetEl = child;
            } else {
              innerEndEls.push(child);
            }
          });
        }

        var valueProps = {};
        if ('value' in self.props) { valueProps.value = value; }
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: self.classes
        }, slotsBeforeInner, React.createElement('div', {
          className: 'toolbar-inner'
        }, slotsInnerStart, React.createElement('div', {
          className: 'messagebar-area'
        }, slotsBeforeArea, messagebarAttachmentsEl, React.createElement(F7Input, Object.assign({
          ref: function ref(__reactNode) {
            _this2.__reactRefs['area'] = __reactNode;
          },
          type: 'textarea',
          wrap: false,
          placeholder: placeholder,
          disabled: disabled,
          name: name,
          readonly: readonly,
          resizable: resizable,
          onInput: self.onInput,
          onChange: self.onChange,
          onFocus: self.onFocus,
          onBlur: self.onBlur
        }, valueProps)), slotsAfterArea), (sendLink && sendLink.length > 0 || slotsSendLink) && React.createElement(F7Link, {
          onClick: self.onClick
        }, slotsSendLink || sendLink), slotsInnerEnd, innerEndEls), slotsAfterInner, messagebarSheetEl);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        if (self.f7Messagebar && self.f7Messagebar.destroy) { self.f7Messagebar.destroy(); }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.sheetVisible', prevProps, prevState, function () {
          var self = _this3;
          if (!self.props.resizable || !self.f7Messagebar) { return; }
          self.updateSheetVisible = true;
        });

        __reactComponentWatch(this, 'props.attachmentsVisible', prevProps, prevState, function () {
          var self = _this3;
          if (!self.props.resizable || !self.f7Messagebar) { return; }
          self.updateAttachmentsVisible = true;
        });

        var self = this;
        if (!self.f7Messagebar) { return; }
        var _self$props2 = self.props,
            sheetVisible = _self$props2.sheetVisible,
            attachmentsVisible = _self$props2.attachmentsVisible;

        if (self.updateSheetVisible) {
          self.updateSheetVisible = false;
          self.f7Messagebar.sheetVisible = sheetVisible;
          self.f7Messagebar.resizePage();
        }

        if (self.updateAttachmentsVisible) {
          self.updateAttachmentsVisible = false;
          self.f7Messagebar.attachmentsVisible = attachmentsVisible;
          self.f7Messagebar.resizePage();
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var _self$props3 = self.props,
            init = _self$props3.init,
            top = _self$props3.top,
            resizePage = _self$props3.resizePage,
            bottomOffset = _self$props3.bottomOffset,
            topOffset = _self$props3.topOffset,
            maxHeight = _self$props3.maxHeight;
        if (!init) { return; }
        var el = self.refs.el;
        if (!el) { return; }
        var params = Utils.noUndefinedProps({
          el: el,
          top: top,
          resizePage: resizePage,
          bottomOffset: bottomOffset,
          topOffset: topOffset,
          maxHeight: maxHeight,
          on: {
            attachmentDelete: self.onAttachmentDelete,
            attachmentClick: self.onAttachmentClick,
            resizePage: self.onResizePage
          }
        });
        self.$f7ready(function () {
          self.f7Messagebar = self.$f7.messagebar.create(params);
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "classes",
      get: function get() {
        var self = this;
        var props = self.props;
        var className = props.className,
            attachmentsVisible = props.attachmentsVisible,
            sheetVisible = props.sheetVisible;
        return Utils.classNames(className, 'toolbar', 'messagebar', {
          'messagebar-attachments-visible': attachmentsVisible,
          'messagebar-sheet-visible': sheetVisible
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

    return F7Messagebar;
  }(React.Component);

  __reactComponentSetProps(F7Messagebar, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    sheetVisible: Boolean,
    attachmentsVisible: Boolean,
    top: Boolean,
    resizable: {
      type: Boolean,
      default: true
    },
    bottomOffset: {
      type: Number,
      default: 0
    },
    topOffset: {
      type: Number,
      default: 0
    },
    maxHeight: Number,
    resizePage: {
      type: Boolean,
      default: true
    },
    sendLink: String,
    value: [String, Number, Array],
    disabled: Boolean,
    readonly: Boolean,
    textareaId: [Number, String],
    name: String,
    placeholder: {
      type: String,
      default: 'Message'
    },
    init: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps));

  F7Messagebar.displayName = 'f7-messagebar';

  function _typeof$U(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$U = function _typeof(obj) { return typeof obj; }; } else { _typeof$U = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$U(obj); }

  function _classCallCheck$U(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$U(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$U(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$U(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$U(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$U(self, call) { if (call && (_typeof$U(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$U(self); }

  function _assertThisInitialized$U(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$U(o) { _getPrototypeOf$U = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$U(o); }

  function _inherits$U(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$U(subClass, superClass); } }

  function _setPrototypeOf$U(o, p) { _setPrototypeOf$U = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$U(o, p); }

  var F7MessagesTitle =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$U(F7MessagesTitle, _React$Component);

    function F7MessagesTitle(props, context) {
      _classCallCheck$U(this, F7MessagesTitle);

      return _possibleConstructorReturn$U(this, _getPrototypeOf$U(F7MessagesTitle).call(this, props, context));
    }

    _createClass$U(F7MessagesTitle, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'messages-title', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7MessagesTitle;
  }(React.Component);

  __reactComponentSetProps(F7MessagesTitle, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7MessagesTitle.displayName = 'f7-messages-title';

  function _typeof$V(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$V = function _typeof(obj) { return typeof obj; }; } else { _typeof$V = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$V(obj); }

  function _classCallCheck$V(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$V(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$V(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$V(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$V(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$V(self, call) { if (call && (_typeof$V(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$V(self); }

  function _assertThisInitialized$V(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$V(o) { _getPrototypeOf$V = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$V(o); }

  function _inherits$V(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$V(subClass, superClass); } }

  function _setPrototypeOf$V(o, p) { _setPrototypeOf$V = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$V(o, p); }

  var F7Messages =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$V(F7Messages, _React$Component);

    function F7Messages(props, context) {
      var _this;

      _classCallCheck$V(this, F7Messages);

      _this = _possibleConstructorReturn$V(this, _getPrototypeOf$V(F7Messages).call(this, props, context));
      _this.__reactRefs = {};
      return _this;
    }

    _createClass$V(F7Messages, [{
      key: "renderMessages",
      value: function renderMessages(messagesToRender, method) {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.renderMessages(messagesToRender, method);
      }
    }, {
      key: "layout",
      value: function layout() {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.layout();
      }
    }, {
      key: "scroll",
      value: function scroll(duration, scrollTop) {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.scroll(duration, scrollTop);
      }
    }, {
      key: "clear",
      value: function clear() {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.clear();
      }
    }, {
      key: "removeMessage",
      value: function removeMessage(messageToRemove, layout) {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.removeMessage(messageToRemove, layout);
      }
    }, {
      key: "removeMessages",
      value: function removeMessages(messagesToRemove, layout) {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.removeMessages(messagesToRemove, layout);
      }
    }, {
      key: "addMessage",
      value: function addMessage() {
        var _this$f7Messages;

        if (!this.f7Messages) { return undefined; }
        return (_this$f7Messages = this.f7Messages).addMessage.apply(_this$f7Messages, arguments);
      }
    }, {
      key: "addMessages",
      value: function addMessages() {
        var _this$f7Messages2;

        if (!this.f7Messages) { return undefined; }
        return (_this$f7Messages2 = this.f7Messages).addMessages.apply(_this$f7Messages2, arguments);
      }
    }, {
      key: "showTyping",
      value: function showTyping(message) {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.showTyping(message);
      }
    }, {
      key: "hideTyping",
      value: function hideTyping() {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.hideTyping();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.destroy();
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var id = props.id,
            style = props.style,
            className = props.className;
        var classes = Utils.classNames(className, 'messages', Mixins.colorClasses(props));
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (this.f7Messages && this.f7Messages.destroy) { this.f7Messages.destroy(); }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var _self$props = self.props,
            init = _self$props.init,
            autoLayout = _self$props.autoLayout,
            messages = _self$props.messages,
            newMessagesFirst = _self$props.newMessagesFirst,
            scrollMessages = _self$props.scrollMessages,
            scrollMessagesOnEdge = _self$props.scrollMessagesOnEdge,
            firstMessageRule = _self$props.firstMessageRule,
            lastMessageRule = _self$props.lastMessageRule,
            tailMessageRule = _self$props.tailMessageRule,
            sameNameMessageRule = _self$props.sameNameMessageRule,
            sameHeaderMessageRule = _self$props.sameHeaderMessageRule,
            sameFooterMessageRule = _self$props.sameFooterMessageRule,
            sameAvatarMessageRule = _self$props.sameAvatarMessageRule,
            customClassMessageRule = _self$props.customClassMessageRule,
            renderMessage = _self$props.renderMessage;
        if (!init) { return; }
        self.$f7ready(function (f7) {
          self.f7Messages = f7.messages.create(Utils.noUndefinedProps({
            el: self.refs.el,
            autoLayout: autoLayout,
            messages: messages,
            newMessagesFirst: newMessagesFirst,
            scrollMessages: scrollMessages,
            scrollMessagesOnEdge: scrollMessagesOnEdge,
            firstMessageRule: firstMessageRule,
            lastMessageRule: lastMessageRule,
            tailMessageRule: tailMessageRule,
            sameNameMessageRule: sameNameMessageRule,
            sameHeaderMessageRule: sameHeaderMessageRule,
            sameFooterMessageRule: sameFooterMessageRule,
            sameAvatarMessageRule: sameAvatarMessageRule,
            customClassMessageRule: customClassMessageRule,
            renderMessage: renderMessage
          }));
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var self = this;
        var _self$props2 = self.props,
            init = _self$props2.init,
            autoLayout = _self$props2.autoLayout,
            scrollMessages = _self$props2.scrollMessages;
        if (!init) { return; }
        var el = self.refs.el;
        if (!el) { return; }
        var children = el.children;
        if (!children) { return; }

        for (var i = 0; i < children.length; i += 1) {
          if (!children[i].classList.contains('message-appeared')) {
            children[i].classList.add('message-appear-from-bottom');
          }
        }

        if (self.f7Messages && self.f7Messages.layout && autoLayout) {
          self.f7Messages.layout();
        }

        if (self.f7Messages && self.f7Messages.scroll && scrollMessages) {
          self.f7Messages.scroll();
        }
      }
    }, {
      key: "componentWillUpdate",
      value: function componentWillUpdate() {
        var self = this;
        if (!self.props.init) { return; }
        var el = self.refs.el;
        if (!el) { return; }
        var children = el.children;
        if (!children) { return; }

        for (var i = 0; i < children.length; i += 1) {
          children[i].classList.add('message-appeared');
        }
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

    return F7Messages;
  }(React.Component);

  __reactComponentSetProps(F7Messages, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    autoLayout: {
      type: Boolean,
      default: false
    },
    messages: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    newMessagesFirst: {
      type: Boolean,
      default: false
    },
    scrollMessages: {
      type: Boolean,
      default: true
    },
    scrollMessagesOnEdge: {
      type: Boolean,
      default: true
    },
    firstMessageRule: Function,
    lastMessageRule: Function,
    tailMessageRule: Function,
    sameNameMessageRule: Function,
    sameHeaderMessageRule: Function,
    sameFooterMessageRule: Function,
    sameAvatarMessageRule: Function,
    customClassMessageRule: Function,
    renderMessage: Function,
    init: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps));

  F7Messages.displayName = 'f7-messages';

  function _typeof$W(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$W = function _typeof(obj) { return typeof obj; }; } else { _typeof$W = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$W(obj); }

  function _toConsumableArray$1(arr) { return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _nonIterableSpread$1(); }

  function _nonIterableSpread$1() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

  function _iterableToArray$1(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") { return Array.from(iter); } }

  function _arrayWithoutHoles$1(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

  function _classCallCheck$W(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$W(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$W(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$W(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$W(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$W(self, call) { if (call && (_typeof$W(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$W(self); }

  function _getPrototypeOf$W(o) { _getPrototypeOf$W = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$W(o); }

  function _assertThisInitialized$W(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$W(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$W(subClass, superClass); } }

  function _setPrototypeOf$W(o, p) { _setPrototypeOf$W = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$W(o, p); }

  var F7NavLeft =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$W(F7NavLeft, _React$Component);

    function F7NavLeft(props, context) {
      var _this;

      _classCallCheck$W(this, F7NavLeft);

      _this = _possibleConstructorReturn$W(this, _getPrototypeOf$W(F7NavLeft).call(this, props, context));

      (function () {
        Utils.bindMethods(_assertThisInitialized$W(_this), ['onBackClick']);
      })();

      return _this;
    }

    _createClass$W(F7NavLeft, [{
      key: "onBackClick",
      value: function onBackClick(event) {
        this.dispatchEvent('back-click backClick click:back clickBack', event);
      }
    }, {
      key: "render",
      value: function render() {
        var props = this.props;
        var backLink = props.backLink,
            backLinkUrl = props.backLinkUrl,
            backLinkForce = props.backLinkForce,
            backLinkShowText = props.backLinkShowText,
            sliding = props.sliding,
            className = props.className,
            style = props.style,
            id = props.id;
        var linkEl;
        var needBackLinkText = backLinkShowText;
        if (typeof needBackLinkText === 'undefined') { needBackLinkText = !this.$theme.md; }

        if (backLink) {
          var text = backLink !== true && needBackLinkText ? backLink : undefined;
          linkEl = React.createElement(F7Link, {
            href: backLinkUrl || '#',
            back: true,
            icon: 'icon-back',
            force: backLinkForce || undefined,
            className: !text ? 'icon-only' : undefined,
            text: text,
            onClick: this.onBackClick
          });
        }

        var classes = Utils.classNames(className, 'left', {
          sliding: sliding
        }, Mixins.colorClasses(props));
        var children = [];
        var slots = this.slots;

        if (slots && Object.keys(slots).length) {
          Object.keys(slots).forEach(function (key) {
            children.push.apply(children, _toConsumableArray$1(slots[key]));
          });
        }

        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, linkEl, children);
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7NavLeft;
  }(React.Component);

  __reactComponentSetProps(F7NavLeft, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
    backLinkShowText: {
      type: Boolean,
      default: undefined
    },
    sliding: Boolean
  }, Mixins.colorProps));

  F7NavLeft.displayName = 'f7-nav-left';

  function _typeof$X(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$X = function _typeof(obj) { return typeof obj; }; } else { _typeof$X = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$X(obj); }

  function _toConsumableArray$2(arr) { return _arrayWithoutHoles$2(arr) || _iterableToArray$2(arr) || _nonIterableSpread$2(); }

  function _nonIterableSpread$2() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

  function _iterableToArray$2(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") { return Array.from(iter); } }

  function _arrayWithoutHoles$2(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

  function _classCallCheck$X(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$X(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$X(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$X(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$X(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$X(self, call) { if (call && (_typeof$X(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$X(self); }

  function _assertThisInitialized$X(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$X(o) { _getPrototypeOf$X = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$X(o); }

  function _inherits$X(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$X(subClass, superClass); } }

  function _setPrototypeOf$X(o, p) { _setPrototypeOf$X = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$X(o, p); }

  var F7NavRight =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$X(F7NavRight, _React$Component);

    function F7NavRight(props, context) {
      _classCallCheck$X(this, F7NavRight);

      return _possibleConstructorReturn$X(this, _getPrototypeOf$X(F7NavRight).call(this, props, context));
    }

    _createClass$X(F7NavRight, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            sliding = props.sliding;
        var classes = Utils.classNames(className, 'right', {
          sliding: sliding
        }, Mixins.colorClasses(props));
        var children = [];
        var slots = this.slots;

        if (slots && Object.keys(slots).length) {
          Object.keys(slots).forEach(function (key) {
            children.push.apply(children, _toConsumableArray$2(slots[key]));
          });
        }

        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, children);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7NavRight;
  }(React.Component);

  __reactComponentSetProps(F7NavRight, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    sliding: Boolean
  }, Mixins.colorProps));

  F7NavRight.displayName = 'f7-nav-right';

  function _typeof$Y(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$Y = function _typeof(obj) { return typeof obj; }; } else { _typeof$Y = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$Y(obj); }

  function _toConsumableArray$3(arr) { return _arrayWithoutHoles$3(arr) || _iterableToArray$3(arr) || _nonIterableSpread$3(); }

  function _nonIterableSpread$3() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

  function _iterableToArray$3(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") { return Array.from(iter); } }

  function _arrayWithoutHoles$3(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

  function _classCallCheck$Y(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$Y(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$Y(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$Y(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$Y(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$Y(self, call) { if (call && (_typeof$Y(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$Y(self); }

  function _assertThisInitialized$Y(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$Y(o) { _getPrototypeOf$Y = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$Y(o); }

  function _inherits$Y(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$Y(subClass, superClass); } }

  function _setPrototypeOf$Y(o, p) { _setPrototypeOf$Y = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$Y(o, p); }

  var F7NavTitle =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$Y(F7NavTitle, _React$Component);

    function F7NavTitle(props, context) {
      _classCallCheck$Y(this, F7NavTitle);

      return _possibleConstructorReturn$Y(this, _getPrototypeOf$Y(F7NavTitle).call(this, props, context));
    }

    _createClass$Y(F7NavTitle, [{
      key: "render",
      value: function render() {
        var self = this;
        var props = self.props;
        var id = props.id,
            style = props.style,
            className = props.className;
        var classes = Utils.classNames(className, 'title-large', Mixins.colorClasses(props));
        var children = [];
        var slots = self.slots;

        if (slots && Object.keys(slots).length) {
          Object.keys(slots).forEach(function (key) {
            children.push.apply(children, _toConsumableArray$3(slots[key]));
          });
        }

        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, React.createElement('div', {
          className: 'title-large-text'
        }, children));
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7NavTitle;
  }(React.Component);

  __reactComponentSetProps(F7NavTitle, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7NavTitle.displayName = 'f7-nav-title';

  function _typeof$Z(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$Z = function _typeof(obj) { return typeof obj; }; } else { _typeof$Z = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$Z(obj); }

  function _toConsumableArray$4(arr) { return _arrayWithoutHoles$4(arr) || _iterableToArray$4(arr) || _nonIterableSpread$4(); }

  function _nonIterableSpread$4() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

  function _iterableToArray$4(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") { return Array.from(iter); } }

  function _arrayWithoutHoles$4(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

  function _classCallCheck$Z(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$Z(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$Z(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$Z(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$Z(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$Z(self, call) { if (call && (_typeof$Z(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$Z(self); }

  function _assertThisInitialized$Z(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$Z(o) { _getPrototypeOf$Z = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$Z(o); }

  function _inherits$Z(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$Z(subClass, superClass); } }

  function _setPrototypeOf$Z(o, p) { _setPrototypeOf$Z = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$Z(o, p); }

  var F7NavTitle$1 =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$Z(F7NavTitle, _React$Component);

    function F7NavTitle(props, context) {
      _classCallCheck$Z(this, F7NavTitle);

      return _possibleConstructorReturn$Z(this, _getPrototypeOf$Z(F7NavTitle).call(this, props, context));
    }

    _createClass$Z(F7NavTitle, [{
      key: "render",
      value: function render() {
        var self = this;
        var props = self.props;
        var title = props.title,
            subtitle = props.subtitle,
            id = props.id,
            style = props.style,
            sliding = props.sliding,
            className = props.className;
        var subtitleEl;

        if (subtitle) {
          subtitleEl = React.createElement('span', {
            className: 'subtitle'
          }, subtitle);
        }

        var classes = Utils.classNames(className, 'title', {
          sliding: sliding
        }, Mixins.colorClasses(props));
        var children;
        var slots = self.slots;

        if (slots && Object.keys(slots).length) {
          children = [];
          Object.keys(slots).forEach(function (key) {
            var _children;

            (_children = children).push.apply(_children, _toConsumableArray$4(slots[key]));
          });
        }

        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, children, !children && title, !children && subtitleEl);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7NavTitle;
  }(React.Component);

  __reactComponentSetProps(F7NavTitle$1, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    title: String,
    subtitle: String,
    sliding: Boolean
  }, Mixins.colorProps));

  F7NavTitle$1.displayName = 'f7-nav-title';

  function _typeof$_(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$_ = function _typeof(obj) { return typeof obj; }; } else { _typeof$_ = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$_(obj); }

  function _classCallCheck$_(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$_(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$_(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$_(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$_(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$_(self, call) { if (call && (_typeof$_(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$_(self); }

  function _getPrototypeOf$_(o) { _getPrototypeOf$_ = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$_(o); }

  function _assertThisInitialized$_(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$_(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$_(subClass, superClass); } }

  function _setPrototypeOf$_(o, p) { _setPrototypeOf$_ = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$_(o, p); }

  var F7Navbar =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$_(F7Navbar, _React$Component);

    function F7Navbar(props, context) {
      var _this;

      _classCallCheck$_(this, F7Navbar);

      _this = _possibleConstructorReturn$_(this, _getPrototypeOf$_(F7Navbar).call(this, props, context));
      _this.__reactRefs = {};

      _this.state = function () {
        var self = _assertThisInitialized$_(_this);

        var $f7 = self.$f7;

        if (!$f7) {
          self.$f7ready(function () {
            self.setState({
              _theme: self.$theme
            });
          });
        }

        return {
          _theme: $f7 ? self.$theme : null
        };
      }();

      (function () {
        Utils.bindMethods(_assertThisInitialized$_(_this), ['onBackClick', 'onHide', 'onShow', 'onExpand', 'onCollapse']);
      })();

      return _this;
    }

    _createClass$_(F7Navbar, [{
      key: "onHide",
      value: function onHide(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.dispatchEvent('navbar:hide navbarHide');
      }
    }, {
      key: "onShow",
      value: function onShow(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.dispatchEvent('navbar:show navbarShow');
      }
    }, {
      key: "onExpand",
      value: function onExpand(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.dispatchEvent('navbar:expand navbarExpand');
      }
    }, {
      key: "onCollapse",
      value: function onCollapse(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.dispatchEvent('navbar:collapse navbarCollapse');
      }
    }, {
      key: "hide",
      value: function hide(animate) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.navbar.hide(self.refs.el, animate);
      }
    }, {
      key: "show",
      value: function show(animate) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.navbar.show(self.refs.el, animate);
      }
    }, {
      key: "size",
      value: function size() {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.navbar.size(self.refs.el);
      }
    }, {
      key: "onBackClick",
      value: function onBackClick(event) {
        this.dispatchEvent('back-click backClick click:back clickBack', event);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var backLink = props.backLink,
            backLinkUrl = props.backLinkUrl,
            backLinkForce = props.backLinkForce,
            backLinkShowText = props.backLinkShowText,
            sliding = props.sliding,
            title = props.title,
            subtitle = props.subtitle,
            innerClass = props.innerClass,
            innerClassName = props.innerClassName,
            className = props.className,
            id = props.id,
            style = props.style,
            hidden = props.hidden,
            noShadow = props.noShadow,
            noHairline = props.noHairline,
            large = props.large,
            largeTransparent = props.largeTransparent,
            titleLarge = props.titleLarge;
        var theme = self.state.theme;
        var leftEl;
        var titleEl;
        var rightEl;
        var titleLargeEl;
        var addLeftTitleClass = theme && theme.ios && self.$f7 && !self.$f7.params.navbar.iosCenterTitle;
        var addCenterTitleClass = theme && theme.md && self.$f7 && self.$f7.params.navbar.mdCenterTitle || theme && theme.aurora && self.$f7 && self.$f7.params.navbar.auroraCenterTitle;
        var slots = self.slots;
        var classes = Utils.classNames(className, 'navbar', {
          'navbar-hidden': hidden,
          'navbar-large': large,
          'navbar-large-transparent': largeTransparent
        }, Mixins.colorClasses(props));

        if (backLink || slots['nav-left'] || slots.left) {
          leftEl = React.createElement(F7NavLeft, {
            backLink: backLink,
            backLinkUrl: backLinkUrl,
            backLinkForce: backLinkForce,
            backLinkShowText: backLinkShowText,
            onBackClick: self.onBackClick
          }, slots['nav-left'], slots.left);
        }

        if (title || subtitle || slots.title) {
          titleEl = React.createElement(F7NavTitle$1, {
            title: title,
            subtitle: subtitle
          }, slots.title);
        }

        if (slots['nav-right'] || slots.right) {
          rightEl = React.createElement(F7NavRight, null, slots['nav-right'], slots.right);
        }

        var largeTitle = titleLarge;
        if (!largeTitle && large && title) { largeTitle = title; }

        if (largeTitle || slots['title-large']) {
          titleLargeEl = React.createElement('div', {
            className: 'title-large'
          }, React.createElement('div', {
            className: 'title-large-text'
          }, largeTitle || '', this.slots['title-large']));
        }

        var innerEl = React.createElement('div', {
          className: Utils.classNames('navbar-inner', innerClass, innerClassName, {
            sliding: sliding,
            'no-shadow': noShadow,
            'no-hairline': noHairline,
            'navbar-inner-left-title': addLeftTitleClass,
            'navbar-inner-centered-title': addCenterTitleClass
          })
        }, leftEl, titleEl, rightEl, titleLargeEl, this.slots['default']);
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes
        }, React.createElement('div', {
          className: 'navbar-bg'
        }), this.slots['before-inner'], innerEl, this.slots['after-inner']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        var el = self.refs.el;
        if (!el || !self.$f7) { return; }
        var f7 = self.$f7;
        f7.off('navbarShow', self.onShow);
        f7.off('navbarHide', self.onHide);
        f7.off('navbarCollapse', self.onCollapse);
        f7.off('navbarExpand', self.onExpand);
        self.eventTargetEl = null;
        delete self.eventTargetEl;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var self = this;
        if (!self.$f7) { return; }
        var el = self.refs.el;
        self.$f7.navbar.size(el);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        if (!el) { return; }
        self.$f7ready(function (f7) {
          self.eventTargetEl = el;
          f7.on('navbarShow', self.onShow);
          f7.on('navbarHide', self.onHide);
          f7.on('navbarCollapse', self.onCollapse);
          f7.on('navbarExpand', self.onExpand);
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7Navbar;
  }(React.Component);

  __reactComponentSetProps(F7Navbar, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
    backLinkShowText: {
      type: Boolean,
      default: undefined
    },
    sliding: {
      type: Boolean,
      default: true
    },
    title: String,
    subtitle: String,
    hidden: Boolean,
    noShadow: Boolean,
    noHairline: Boolean,
    innerClass: String,
    innerClassName: String,
    large: Boolean,
    largeTransparent: Boolean,
    titleLarge: String
  }, Mixins.colorProps));

  F7Navbar.displayName = 'f7-navbar';

  function _typeof$$(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$$ = function _typeof(obj) { return typeof obj; }; } else { _typeof$$ = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$$(obj); }

  function _classCallCheck$$(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$$(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$$(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$$(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$$(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$$(self, call) { if (call && (_typeof$$(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$$(self); }

  function _getPrototypeOf$$(o) { _getPrototypeOf$$ = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$$(o); }

  function _assertThisInitialized$$(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$$(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$$(subClass, superClass); } }

  function _setPrototypeOf$$(o, p) { _setPrototypeOf$$ = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$$(o, p); }

  var F7Preloader =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$$(F7Preloader, _React$Component);

    function F7Preloader(props, context) {
      var _this;

      _classCallCheck$$(this, F7Preloader);

      _this = _possibleConstructorReturn$$(this, _getPrototypeOf$$(F7Preloader).call(this, props, context));

      _this.state = function () {
        var self = _assertThisInitialized$$(_this);

        var $f7 = self.$f7;

        if (!$f7) {
          self.$f7ready(function () {
            self.setState({
              _theme: self.$theme
            });
          });
        }

        return {
          _theme: $f7 ? self.$theme : null
        };
      }();

      return _this;
    }

    _createClass$$(F7Preloader, [{
      key: "render",
      value: function render() {
        var self = this;
        var sizeComputed = self.sizeComputed,
            props = self.props;
        var id = props.id,
            style = props.style,
            className = props.className;
        var theme = self.state._theme;
        var preloaderStyle = {};

        if (sizeComputed) {
          preloaderStyle.width = "".concat(sizeComputed, "px");
          preloaderStyle.height = "".concat(sizeComputed, "px");
          preloaderStyle['--f7-preloader-size'] = "".concat(sizeComputed, "px");
        }

        if (style) { Utils.extend(preloaderStyle, style || {}); }
        var innerEl;

        if (theme && theme.md) {
          innerEl = React.createElement('span', {
            className: 'preloader-inner'
          }, React.createElement('span', {
            className: 'preloader-inner-gap'
          }), React.createElement('span', {
            className: 'preloader-inner-left'
          }, React.createElement('span', {
            className: 'preloader-inner-half-circle'
          })), React.createElement('span', {
            className: 'preloader-inner-right'
          }, React.createElement('span', {
            className: 'preloader-inner-half-circle'
          })));
        } else if (theme && theme.ios) {
          innerEl = React.createElement('span', {
            className: 'preloader-inner'
          }, React.createElement('span', {
            className: 'preloader-inner-line'
          }), React.createElement('span', {
            className: 'preloader-inner-line'
          }), React.createElement('span', {
            className: 'preloader-inner-line'
          }), React.createElement('span', {
            className: 'preloader-inner-line'
          }), React.createElement('span', {
            className: 'preloader-inner-line'
          }), React.createElement('span', {
            className: 'preloader-inner-line'
          }), React.createElement('span', {
            className: 'preloader-inner-line'
          }), React.createElement('span', {
            className: 'preloader-inner-line'
          }), React.createElement('span', {
            className: 'preloader-inner-line'
          }), React.createElement('span', {
            className: 'preloader-inner-line'
          }), React.createElement('span', {
            className: 'preloader-inner-line'
          }), React.createElement('span', {
            className: 'preloader-inner-line'
          }));
        } else if (theme && theme.aurora) {
          innerEl = React.createElement('span', {
            className: 'preloader-inner'
          }, React.createElement('span', {
            className: 'preloader-inner-circle'
          }));
        }

        var classes = Utils.classNames(className, 'preloader', Mixins.colorClasses(props));
        return React.createElement('span', {
          id: id,
          style: preloaderStyle,
          className: classes
        }, innerEl);
      }
    }, {
      key: "sizeComputed",
      get: function get() {
        var s = this.props.size;

        if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
          s = s.replace('px', '');
        }

        return s;
      }
    }]);

    return F7Preloader;
  }(React.Component);

  __reactComponentSetProps(F7Preloader, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    size: [Number, String]
  }, Mixins.colorProps));

  F7Preloader.displayName = 'f7-preloader';

  function _typeof$10(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$10 = function _typeof(obj) { return typeof obj; }; } else { _typeof$10 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$10(obj); }

  function _classCallCheck$10(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$10(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$10(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$10(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$10(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$10(self, call) { if (call && (_typeof$10(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$10(self); }

  function _getPrototypeOf$10(o) { _getPrototypeOf$10 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$10(o); }

  function _assertThisInitialized$10(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$10(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$10(subClass, superClass); } }

  function _setPrototypeOf$10(o, p) { _setPrototypeOf$10 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$10(o, p); }

  var F7PageContent =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$10(F7PageContent, _React$Component);

    function F7PageContent(props, context) {
      var _this;

      _classCallCheck$10(this, F7PageContent);

      _this = _possibleConstructorReturn$10(this, _getPrototypeOf$10(F7PageContent).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$10(_this), ['onPtrPullStart', 'onPtrPullMove', 'onPtrPullEnd', 'onPtrRefresh', 'onPtrDone', 'onInfinite', 'onTabShow', 'onTabHide']);
      })();

      return _this;
    }

    _createClass$10(F7PageContent, [{
      key: "onPtrPullStart",
      value: function onPtrPullStart(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('ptr:pullstart ptrPullStart');
      }
    }, {
      key: "onPtrPullMove",
      value: function onPtrPullMove(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('ptr:pullmove ptrPullMove');
      }
    }, {
      key: "onPtrPullEnd",
      value: function onPtrPullEnd(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('ptr:pullend ptrPullEnd');
      }
    }, {
      key: "onPtrRefresh",
      value: function onPtrRefresh(el, done) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('ptr:refresh ptrRefresh', done);
      }
    }, {
      key: "onPtrDone",
      value: function onPtrDone(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('ptr:done ptrDone');
      }
    }, {
      key: "onInfinite",
      value: function onInfinite(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('infinite');
      }
    }, {
      key: "onTabShow",
      value: function onTabShow(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('tab:show tabShow');
      }
    }, {
      key: "onTabHide",
      value: function onTabHide(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('tab:hide tabHide');
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var ptr = props.ptr,
            ptrPreloader = props.ptrPreloader,
            ptrDistance = props.ptrDistance,
            ptrBottom = props.ptrBottom,
            ptrMousewheel = props.ptrMousewheel,
            infinite = props.infinite,
            infinitePreloader = props.infinitePreloader,
            id = props.id,
            style = props.style,
            infiniteDistance = props.infiniteDistance,
            infiniteTop = props.infiniteTop;
        var ptrEl;
        var infiniteEl;

        if (ptr && ptrPreloader) {
          ptrEl = React.createElement('div', {
            className: 'ptr-preloader'
          }, React.createElement(F7Preloader, null), React.createElement('div', {
            className: 'ptr-arrow'
          }));
        }

        if (infinite && infinitePreloader) {
          infiniteEl = React.createElement(F7Preloader, {
            className: 'infinite-scroll-preloader'
          });
        }

        return React.createElement('div', {
          id: id,
          style: style,
          className: self.classes,
          'data-ptr-distance': ptrDistance || undefined,
          'data-ptr-mousewheel': ptrMousewheel || undefined,
          'data-infinite-distance': infiniteDistance || undefined,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          }
        }, ptrBottom ? null : ptrEl, infiniteTop ? infiniteEl : null, self.slots.default, infiniteTop ? null : infiniteEl, ptrBottom ? ptrEl : null);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.off('ptrPullStart', self.onPtrPullStart);
        self.$f7.off('ptrPullMove', self.onPtrPullMove);
        self.$f7.off('ptrPullEnd', self.onPtrPullEnd);
        self.$f7.off('ptrRefresh', self.onPtrRefresh);
        self.$f7.off('ptrDone', self.onPtrDone);
        self.$f7.off('infinite', self.onInfinite);
        self.$f7.off('tabShow', self.onTabShow);
        self.$f7.off('tabHide', self.onTabHide);
        self.eventTargetEl = null;
        delete self.eventTargetEl;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        var _self$props = self.props,
            ptr = _self$props.ptr,
            infinite = _self$props.infinite,
            tab = _self$props.tab;
        self.$f7ready(function (f7) {
          self.eventTargetEl = el;

          if (ptr) {
            f7.on('ptrPullStart', self.onPtrPullStart);
            f7.on('ptrPullMove', self.onPtrPullMove);
            f7.on('ptrPullEnd', self.onPtrPullEnd);
            f7.on('ptrRefresh', self.onPtrRefresh);
            f7.on('ptrDone', self.onPtrDone);
          }

          if (infinite) {
            f7.on('infinite', self.onInfinite);
          }

          if (tab) {
            f7.on('tabShow', self.onTabShow);
            f7.on('tabHide', self.onTabHide);
          }
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "classes",
      get: function get() {
        var self = this;
        var props = self.props;
        var className = props.className,
            tab = props.tab,
            tabActive = props.tabActive,
            ptr = props.ptr,
            ptrBottom = props.ptrBottom,
            infinite = props.infinite,
            infiniteTop = props.infiniteTop,
            hideBarsOnScroll = props.hideBarsOnScroll,
            hideNavbarOnScroll = props.hideNavbarOnScroll,
            hideToolbarOnScroll = props.hideToolbarOnScroll,
            messagesContent = props.messagesContent,
            loginScreen = props.loginScreen;
        return Utils.classNames(className, 'page-content', {
          tab: tab,
          'tab-active': tabActive,
          'ptr-content': ptr,
          'ptr-bottom': ptrBottom,
          'infinite-scroll-content': infinite,
          'infinite-scroll-top': infiniteTop,
          'hide-bars-on-scroll': hideBarsOnScroll,
          'hide-navbar-on-scroll': hideNavbarOnScroll,
          'hide-toolbar-on-scroll': hideToolbarOnScroll,
          'messages-content': messagesContent,
          'login-screen-content': loginScreen
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

    return F7PageContent;
  }(React.Component);

  __reactComponentSetProps(F7PageContent, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    tab: Boolean,
    tabActive: Boolean,
    ptr: Boolean,
    ptrDistance: Number,
    ptrPreloader: {
      type: Boolean,
      default: true
    },
    ptrBottom: Boolean,
    ptrMousewheel: Boolean,
    infinite: Boolean,
    infiniteTop: Boolean,
    infiniteDistance: Number,
    infinitePreloader: {
      type: Boolean,
      default: true
    },
    hideBarsOnScroll: Boolean,
    hideNavbarOnScroll: Boolean,
    hideToolbarOnScroll: Boolean,
    messagesContent: Boolean,
    loginScreen: Boolean
  }, Mixins.colorProps));

  F7PageContent.displayName = 'f7-page-content';

  function _typeof$11(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$11 = function _typeof(obj) { return typeof obj; }; } else { _typeof$11 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$11(obj); }

  function _classCallCheck$11(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$11(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$11(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$11(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$11(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$11(self, call) { if (call && (_typeof$11(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$11(self); }

  function _getPrototypeOf$11(o) { _getPrototypeOf$11 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$11(o); }

  function _assertThisInitialized$11(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$11(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$11(subClass, superClass); } }

  function _setPrototypeOf$11(o, p) { _setPrototypeOf$11 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$11(o, p); }

  var F7Page =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$11(F7Page, _React$Component);

    function F7Page(props, context) {
      var _this;

      _classCallCheck$11(this, F7Page);

      _this = _possibleConstructorReturn$11(this, _getPrototypeOf$11(F7Page).call(this, props, context));
      _this.__reactRefs = {};

      _this.state = function () {
        return {
          hasSubnavbar: false,
          hasNavbarLarge: false,
          hasNavbarLargeCollapsed: false,
          hasCardExpandableOpened: false,
          routerPositionClass: '',
          routerForceUnstack: false,
          routerPageRole: null,
          routerPageRoleDetailRoot: false,
          routerPageMasterStack: false
        };
      }();

      (function () {
        Utils.bindMethods(_assertThisInitialized$11(_this), ['onPtrPullStart', 'onPtrPullMove', 'onPtrPullEnd', 'onPtrRefresh', 'onPtrDone', 'onInfinite', 'onPageMounted', 'onPageInit', 'onPageReinit', 'onPageBeforeIn', 'onPageBeforeOut', 'onPageAfterOut', 'onPageAfterIn', 'onPageBeforeRemove', 'onPageStack', 'onPageUnstack', 'onPagePosition', 'onPageRole', 'onPageMasterStack', 'onPageMasterUnstack', 'onPageNavbarLargeCollapsed', 'onPageNavbarLargeExpanded', 'onCardOpened', 'onCardClose']);
      })();

      return _this;
    }

    _createClass$11(F7Page, [{
      key: "onPtrPullStart",
      value: function onPtrPullStart() {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments$1[_key];
        }

        this.dispatchEvent.apply(this, ['ptr:pullstart ptrPullStart'].concat(args));
      }
    }, {
      key: "onPtrPullMove",
      value: function onPtrPullMove() {
        var arguments$1 = arguments;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments$1[_key2];
        }

        this.dispatchEvent.apply(this, ['ptr:pullmove ptrPullMove'].concat(args));
      }
    }, {
      key: "onPtrPullEnd",
      value: function onPtrPullEnd() {
        var arguments$1 = arguments;

        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments$1[_key3];
        }

        this.dispatchEvent.apply(this, ['ptr:pullend ptrPullEnd'].concat(args));
      }
    }, {
      key: "onPtrRefresh",
      value: function onPtrRefresh() {
        var arguments$1 = arguments;

        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments$1[_key4];
        }

        this.dispatchEvent.apply(this, ['ptr:refresh ptrRefresh'].concat(args));
      }
    }, {
      key: "onPtrDone",
      value: function onPtrDone() {
        var arguments$1 = arguments;

        for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments$1[_key5];
        }

        this.dispatchEvent.apply(this, ['ptr:done ptrDone'].concat(args));
      }
    }, {
      key: "onInfinite",
      value: function onInfinite() {
        var arguments$1 = arguments;

        for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
          args[_key6] = arguments$1[_key6];
        }

        this.dispatchEvent.apply(this, ['infinite'].concat(args));
      }
    }, {
      key: "onPageMounted",
      value: function onPageMounted(page) {
        if (this.eventTargetEl !== page.el) { return; }
        this.dispatchEvent('page:mounted pageMounted', page);
      }
    }, {
      key: "onPageInit",
      value: function onPageInit(page) {
        if (this.eventTargetEl !== page.el) { return; }
        var _this$props = this.props,
            withSubnavbar = _this$props.withSubnavbar,
            subnavbar = _this$props.subnavbar,
            withNavbarLarge = _this$props.withNavbarLarge,
            navbarLarge = _this$props.navbarLarge;

        if (typeof withSubnavbar === 'undefined' && typeof subnavbar === 'undefined') {
          if (page.$navbarEl && page.$navbarEl.length && page.$navbarEl.find('.subnavbar').length || page.$el.children('.navbar').find('.subnavbar').length) {
            this.setState({
              hasSubnavbar: true
            });
          }
        }

        if (typeof withNavbarLarge === 'undefined' && typeof navbarLarge === 'undefined') {
          if (page.$navbarEl && page.$navbarEl.hasClass('navbar-large')) {
            this.setState({
              hasNavbarLarge: true
            });
          }
        }

        this.dispatchEvent('page:init pageInit', page);
      }
    }, {
      key: "onPageReinit",
      value: function onPageReinit(page) {
        if (this.eventTargetEl !== page.el) { return; }
        this.dispatchEvent('page:reinit pageReinit', page);
      }
    }, {
      key: "onPageBeforeIn",
      value: function onPageBeforeIn(page) {
        if (this.eventTargetEl !== page.el) { return; }

        if (!page.swipeBack) {
          if (page.from === 'next') {
            this.setState({
              routerPositionClass: 'page-next'
            });
          }

          if (page.from === 'previous') {
            this.setState({
              routerPositionClass: 'page-previous'
            });
          }
        }

        this.dispatchEvent('page:beforein pageBeforeIn', page);
      }
    }, {
      key: "onPageBeforeOut",
      value: function onPageBeforeOut(page) {
        if (this.eventTargetEl !== page.el) { return; }
        this.dispatchEvent('page:beforeout pageBeforeOut', page);
      }
    }, {
      key: "onPageAfterOut",
      value: function onPageAfterOut(page) {
        if (this.eventTargetEl !== page.el) { return; }

        if (page.to === 'next') {
          this.setState({
            routerPositionClass: 'page-next'
          });
        }

        if (page.to === 'previous') {
          this.setState({
            routerPositionClass: 'page-previous'
          });
        }

        this.dispatchEvent('page:afterout pageAfterOut', page);
      }
    }, {
      key: "onPageAfterIn",
      value: function onPageAfterIn(page) {
        if (this.eventTargetEl !== page.el) { return; }
        this.setState({
          routerPositionClass: 'page-current'
        });
        this.dispatchEvent('page:afterin pageAfterIn', page);
      }
    }, {
      key: "onPageBeforeRemove",
      value: function onPageBeforeRemove(page) {
        if (this.eventTargetEl !== page.el) { return; }
        this.dispatchEvent('page:beforeremove pageBeforeRemove', page);
      }
    }, {
      key: "onPageStack",
      value: function onPageStack(pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          routerForceUnstack: false
        });
      }
    }, {
      key: "onPageUnstack",
      value: function onPageUnstack(pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          routerForceUnstack: true
        });
      }
    }, {
      key: "onPagePosition",
      value: function onPagePosition(pageEl, position) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          routerPositionClass: "page-".concat(position)
        });
      }
    }, {
      key: "onPageRole",
      value: function onPageRole(pageEl, rolesData) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          routerPageRole: rolesData.role,
          routerPageRoleDetailRoot: rolesData.detailRoot
        });
      }
    }, {
      key: "onPageMasterStack",
      value: function onPageMasterStack(pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          routerPageMasterStack: true
        });
      }
    }, {
      key: "onPageMasterUnstack",
      value: function onPageMasterUnstack(pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          routerPageMasterStack: false
        });
      }
    }, {
      key: "onPageNavbarLargeCollapsed",
      value: function onPageNavbarLargeCollapsed(pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          hasNavbarLargeCollapsed: true
        });
      }
    }, {
      key: "onPageNavbarLargeExpanded",
      value: function onPageNavbarLargeExpanded(pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          hasNavbarLargeCollapsed: false
        });
      }
    }, {
      key: "onCardOpened",
      value: function onCardOpened(cardEl, pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          hasCardExpandableOpened: true
        });
      }
    }, {
      key: "onCardClose",
      value: function onCardClose(cardEl, pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          hasCardExpandableOpened: false
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var id = props.id,
            style = props.style,
            name = props.name,
            pageContent = props.pageContent,
            messagesContent = props.messagesContent,
            ptr = props.ptr,
            ptrDistance = props.ptrDistance,
            ptrPreloader = props.ptrPreloader,
            ptrBottom = props.ptrBottom,
            ptrMousewheel = props.ptrMousewheel,
            infinite = props.infinite,
            infiniteDistance = props.infiniteDistance,
            infinitePreloader = props.infinitePreloader,
            infiniteTop = props.infiniteTop,
            hideBarsOnScroll = props.hideBarsOnScroll,
            hideNavbarOnScroll = props.hideNavbarOnScroll,
            hideToolbarOnScroll = props.hideToolbarOnScroll,
            loginScreen = props.loginScreen,
            className = props.className,
            stacked = props.stacked,
            tabs = props.tabs,
            subnavbar = props.subnavbar,
            withSubnavbar = props.withSubnavbar,
            navbarLarge = props.navbarLarge,
            withNavbarLarge = props.withNavbarLarge,
            noNavbar = props.noNavbar,
            noToolbar = props.noToolbar,
            noSwipeback = props.noSwipeback;
        var fixedList = [];
        var staticList = [];
        var _self$slots = self.slots,
            slotsStatic = _self$slots.static,
            slotsFixed = _self$slots.fixed,
            slotsDefault = _self$slots.default;
        var fixedTags;
        fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ').map(function (tagName) {
          return "f7-".concat(tagName);
        });
        var hasSubnavbar;
        var hasMessages;
        var hasNavbarLarge;
        hasMessages = messagesContent;

        if (slotsDefault) {
          slotsDefault.forEach(function (child) {
            if (typeof child === 'undefined') { return; }
            var isFixedTag = false;
            {
              var tag = child.type && (child.type.displayName || child.type.name);

              if (!tag) {
                if (pageContent) { staticList.push(child); }
                return;
              }

              if (tag === 'F7Subnavbar' || tag === 'f7-subnavbar') { hasSubnavbar = true; }

              if (tag === 'F7Navbar' || tag === 'f7-navbar') {
                if (child.props && child.props.large) { hasNavbarLarge = true; }
              }

              if (typeof hasMessages === 'undefined' && (tag === 'F7Messages' || tag === 'f7-messages')) { hasMessages = true; }

              if (fixedTags.indexOf(tag) >= 0) {
                isFixedTag = true;
              }
            }

            if (pageContent) {
              if (isFixedTag) { fixedList.push(child); }else { staticList.push(child); }
            }
          });
        }

        var forceSubnavbar = typeof subnavbar === 'undefined' && typeof withSubnavbar === 'undefined' ? hasSubnavbar || this.state.hasSubnavbar : false;
        var forceNavbarLarge = typeof navbarLarge === 'undefined' && typeof withNavbarLarge === 'undefined' ? hasNavbarLarge || this.state.hasNavbarLarge : false;
        var classes = Utils.classNames(className, 'page', this.state.routerPositionClass, {
          stacked: stacked && !this.state.routerForceUnstack,
          tabs: tabs,
          'page-with-subnavbar': subnavbar || withSubnavbar || forceSubnavbar,
          'page-with-navbar-large': navbarLarge || withNavbarLarge || forceNavbarLarge,
          'no-navbar': noNavbar,
          'no-toolbar': noToolbar,
          'no-swipeback': noSwipeback,
          'page-master': this.state.routerPageRole === 'master',
          'page-master-detail': this.state.routerPageRole === 'detail',
          'page-master-detail-root': this.state.routerPageRoleDetailRoot === true,
          'page-master-stacked': this.state.routerPageMasterStack === true,
          'page-with-navbar-large-collapsed': this.state.hasNavbarLargeCollapsed === true,
          'page-with-card-opened': this.state.hasCardExpandableOpened === true,
          'login-screen-page': loginScreen
        }, Mixins.colorClasses(props));

        if (!pageContent) {
          return React.createElement('div', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['el'] = __reactNode;
            },
            id: id,
            style: style,
            className: classes,
            'data-name': name
          }, slotsFixed, slotsStatic, slotsDefault);
        }

        var pageContentEl = React.createElement(F7PageContent, {
          ptr: ptr,
          ptrDistance: ptrDistance,
          ptrPreloader: ptrPreloader,
          ptrBottom: ptrBottom,
          ptrMousewheel: ptrMousewheel,
          infinite: infinite,
          infiniteTop: infiniteTop,
          infiniteDistance: infiniteDistance,
          infinitePreloader: infinitePreloader,
          hideBarsOnScroll: hideBarsOnScroll,
          hideNavbarOnScroll: hideNavbarOnScroll,
          hideToolbarOnScroll: hideToolbarOnScroll,
          messagesContent: messagesContent || hasMessages,
          loginScreen: loginScreen,
          onPtrPullStart: self.onPtrPullStart,
          onPtrPullMove: self.onPtrPullMove,
          onPtrPullEnd: self.onPtrPullEnd,
          onPtrRefresh: self.onPtrRefresh,
          onPtrDone: self.onPtrDone,
          onInfinite: self.onInfinite
        }, slotsStatic, staticList);
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes,
          'data-name': name
        }, fixedList, slotsFixed, pageContentEl);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        if (!self.$f7) { return; }
        var f7 = self.$f7;
        f7.off('pageMounted', self.onPageMounted);
        f7.off('pageInit', self.onPageInit);
        f7.off('pageReinit', self.onPageReinit);
        f7.off('pageBeforeIn', self.onPageBeforeIn);
        f7.off('pageBeforeOut', self.onPageBeforeOut);
        f7.off('pageAfterOut', self.onPageAfterOut);
        f7.off('pageAfterIn', self.onPageAfterIn);
        f7.off('pageBeforeRemove', self.onPageBeforeRemove);
        f7.off('pageStack', self.onPageStack);
        f7.off('pageUnstack', self.onPageUnstack);
        f7.off('pagePosition', self.onPagePosition);
        f7.off('pageRole', self.onPageRole);
        f7.off('pageMasterStack', self.onPageMasterStack);
        f7.off('pageMasterUnstack', self.onPageMasterUnstack);
        f7.off('pageNavbarLargeCollapsed', self.onPageNavbarLargeCollapsed);
        f7.off('pageNavbarLargeExpanded', self.onPageNavbarLargeExpanded);
        f7.off('cardOpened', self.onCardOpened);
        f7.off('cardClose', self.onCardClose);
        self.eventTargetEl = null;
        delete self.eventTargetEl;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        self.$f7ready(function (f7) {
          self.eventTargetEl = el;
          f7.on('pageMounted', self.onPageMounted);
          f7.on('pageInit', self.onPageInit);
          f7.on('pageReinit', self.onPageReinit);
          f7.on('pageBeforeIn', self.onPageBeforeIn);
          f7.on('pageBeforeOut', self.onPageBeforeOut);
          f7.on('pageAfterOut', self.onPageAfterOut);
          f7.on('pageAfterIn', self.onPageAfterIn);
          f7.on('pageBeforeRemove', self.onPageBeforeRemove);
          f7.on('pageStack', self.onPageStack);
          f7.on('pageUnstack', self.onPageUnstack);
          f7.on('pagePosition', self.onPagePosition);
          f7.on('pageRole', self.onPageRole);
          f7.on('pageMasterStack', self.onPageMasterStack);
          f7.on('pageMasterUnstack', self.onPageMasterUnstack);
          f7.on('pageNavbarLargeCollapsed', self.onPageNavbarLargeCollapsed);
          f7.on('pageNavbarLargeExpanded', self.onPageNavbarLargeExpanded);
          f7.on('cardOpened', self.onCardOpened);
          f7.on('cardClose', self.onCardClose);
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
          args[_key7 - 1] = arguments$1[_key7];
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

    return F7Page;
  }(React.Component);

  __reactComponentSetProps(F7Page, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    name: String,
    stacked: Boolean,
    withSubnavbar: {
      type: Boolean,
      default: undefined
    },
    subnavbar: {
      type: Boolean,
      default: undefined
    },
    withNavbarLarge: {
      type: Boolean,
      default: undefined
    },
    navbarLarge: {
      type: Boolean,
      default: undefined
    },
    noNavbar: Boolean,
    noToolbar: Boolean,
    tabs: Boolean,
    pageContent: {
      type: Boolean,
      default: true
    },
    noSwipeback: Boolean,
    ptr: Boolean,
    ptrDistance: Number,
    ptrPreloader: {
      type: Boolean,
      default: true
    },
    ptrBottom: Boolean,
    ptrMousewheel: Boolean,
    infinite: Boolean,
    infiniteTop: Boolean,
    infiniteDistance: Number,
    infinitePreloader: {
      type: Boolean,
      default: true
    },
    hideBarsOnScroll: Boolean,
    hideNavbarOnScroll: Boolean,
    hideToolbarOnScroll: Boolean,
    messagesContent: Boolean,
    loginScreen: Boolean
  }, Mixins.colorProps));

  F7Page.displayName = 'f7-page';

  function _typeof$12(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$12 = function _typeof(obj) { return typeof obj; }; } else { _typeof$12 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$12(obj); }

  function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _classCallCheck$12(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$12(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$12(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$12(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$12(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$12(self, call) { if (call && (_typeof$12(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$12(self); }

  function _getPrototypeOf$12(o) { _getPrototypeOf$12 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$12(o); }

  function _assertThisInitialized$12(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$12(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$12(subClass, superClass); } }

  function _setPrototypeOf$12(o, p) { _setPrototypeOf$12 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$12(o, p); }

  var F7Panel =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$12(F7Panel, _React$Component);

    function F7Panel(props, context) {
      var _this;

      _classCallCheck$12(this, F7Panel);

      _this = _possibleConstructorReturn$12(this, _getPrototypeOf$12(F7Panel).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$12(_this), ['onOpen', 'onOpened', 'onClose', 'onClosed', 'onBackdropClick', 'onSwipe', 'onSwipeOpen', 'onBreakpoint', 'onCollapsedBreakpoint', 'onResize']);
      })();

      return _this;
    }

    _createClass$12(F7Panel, [{
      key: "onOpen",
      value: function onOpen(event) {
        this.dispatchEvent('panel:open panelOpen', event);
      }
    }, {
      key: "onOpened",
      value: function onOpened(event) {
        this.dispatchEvent('panel:opened panelOpened', event);
      }
    }, {
      key: "onClose",
      value: function onClose(event) {
        this.dispatchEvent('panel:close panelClose', event);
      }
    }, {
      key: "onClosed",
      value: function onClosed(event) {
        this.dispatchEvent('panel:closed panelClosed', event);
      }
    }, {
      key: "onBackdropClick",
      value: function onBackdropClick(event) {
        this.dispatchEvent('panel:backdrop-click panelBackdropClick', event);
      }
    }, {
      key: "onSwipe",
      value: function onSwipe(event) {
        this.dispatchEvent('panel:swipe panelSwipe', event);
      }
    }, {
      key: "onSwipeOpen",
      value: function onSwipeOpen(event) {
        this.dispatchEvent('panel:swipeopen panelSwipeOpen', event);
      }
    }, {
      key: "onBreakpoint",
      value: function onBreakpoint(event) {
        this.dispatchEvent('panel:breakpoint panelBreakpoint', event);
      }
    }, {
      key: "onCollapsedBreakpoint",
      value: function onCollapsedBreakpoint(event) {
        this.dispatchEvent('panel:collapsedbreakpoint panelCollapsedBreakpoint', event);
      }
    }, {
      key: "onResize",
      value: function onResize(event) {
        this.dispatchEvent('panel:resize panelResize', event);
      }
    }, {
      key: "open",
      value: function open(animate) {
        var self = this;
        if (!self.f7Panel) { return; }
        self.f7Panel.open(animate);
      }
    }, {
      key: "close",
      value: function close(animate) {
        var self = this;
        if (!self.f7Panel) { return; }
        self.f7Panel.close(animate);
      }
    }, {
      key: "toggle",
      value: function toggle(animate) {
        var self = this;
        if (!self.f7Panel) { return; }
        self.f7Panel.toggle(animate);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var props = this.props;
        var id = props.id,
            style = props.style,
            resizable = props.resizable;
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: this.classes
        }, this.slots['default'], resizable && React.createElement('div', {
          className: 'panel-resize-handler'
        }));
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;

        if (self.f7Panel && self.f7Panel.destroy) {
          self.f7Panel.destroy();
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        var _self$props = self.props,
            opened = _self$props.opened,
            resizable = _self$props.resizable,
            backdrop = _self$props.backdrop,
            backdropEl = _self$props.backdropEl,
            visibleBreakpoint = _self$props.visibleBreakpoint,
            collapsedBreakpoint = _self$props.collapsedBreakpoint,
            swipe = _self$props.swipe,
            swipeOnlyClose = _self$props.swipeOnlyClose,
            swipeActiveArea = _self$props.swipeActiveArea,
            swipeThreshold = _self$props.swipeThreshold;
        self.$f7ready(function () {
          var $ = self.$$;
          if (!$) { return; }

          if ($('.panel-backdrop').length === 0) {
            $('<div class="panel-backdrop"></div>').insertBefore(el);
          }

          var params = Utils.noUndefinedProps({
            el: el,
            resizable: resizable,
            backdrop: backdrop,
            backdropEl: backdropEl,
            visibleBreakpoint: visibleBreakpoint,
            collapsedBreakpoint: collapsedBreakpoint,
            swipe: swipe,
            swipeOnlyClose: swipeOnlyClose,
            swipeActiveArea: swipeActiveArea,
            swipeThreshold: swipeThreshold,
            on: {
              open: self.onOpen,
              opened: self.onOpened,
              close: self.onClose,
              closed: self.onClosed,
              backdropClick: self.onBackdropClick,
              swipe: self.onSwipe,
              swipeOpen: self.onSwipeOpen,
              collapsedBreakpoint: self.onCollapsedBreakpoint,
              breakpoint: self.onBreakpoint,
              resize: self.onResize
            }
          });
          self.f7Panel = self.$f7.panel.create(params);

          if (opened) {
            self.f7Panel.open(false);
          }
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.resizable', prevProps, prevState, function (resizable) {
          var self = _this3;
          if (!self.f7Panel) { return; }
          if (resizable) { self.f7Panel.enableResizable(); }else { self.f7Panel.disableResizable(); }
        });

        __reactComponentWatch(this, 'props.opened', prevProps, prevState, function (opened) {
          var self = _this3;
          if (!self.f7Panel) { return; }

          if (opened) {
            self.f7Panel.open();
          } else {
            self.f7Panel.close();
          }
        });
      }
    }, {
      key: "classes",
      get: function get() {
        var _Utils$classNames;

        var self = this;
        var props = self.props;
        var left = props.left,
            reveal = props.reveal,
            className = props.className,
            resizable = props.resizable;
        var side = props.side,
            effect = props.effect;
        side = side || (left ? 'left' : 'right');
        effect = effect || (reveal ? 'reveal' : 'cover');
        return Utils.classNames(className, 'panel', (_Utils$classNames = {
          'panel-resizable': resizable
        }, _defineProperty$1(_Utils$classNames, "panel-".concat(side), side), _defineProperty$1(_Utils$classNames, "panel-".concat(effect), effect), _Utils$classNames), Mixins.colorClasses(props));
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

    return F7Panel;
  }(React.Component);

  __reactComponentSetProps(F7Panel, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    side: String,
    effect: String,
    cover: Boolean,
    reveal: Boolean,
    left: Boolean,
    right: Boolean,
    opened: Boolean,
    resizable: Boolean,
    backdrop: {
      type: Boolean,
      default: true
    },
    backdropEl: {
      type: String,
      default: undefined
    },
    visibleBreakpoint: {
      type: Number,
      default: undefined
    },
    collapsedBreakpoint: {
      type: Number,
      default: undefined
    },
    swipe: Boolean,
    swipeOnlyClose: Boolean,
    swipeActiveArea: {
      type: Number,
      default: 0
    },
    swipeThreshold: {
      type: Number,
      default: 0
    }
  }, Mixins.colorProps));

  F7Panel.displayName = 'f7-panel';

  function _typeof$13(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$13 = function _typeof(obj) { return typeof obj; }; } else { _typeof$13 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$13(obj); }

  function _classCallCheck$13(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$13(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$13(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$13(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$13(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$13(self, call) { if (call && (_typeof$13(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$13(self); }

  function _assertThisInitialized$13(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$13(o) { _getPrototypeOf$13 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$13(o); }

  function _inherits$13(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$13(subClass, superClass); } }

  function _setPrototypeOf$13(o, p) { _setPrototypeOf$13 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$13(o, p); }

  var F7PhotoBrowser =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$13(F7PhotoBrowser, _React$Component);

    function F7PhotoBrowser(props, context) {
      _classCallCheck$13(this, F7PhotoBrowser);

      return _possibleConstructorReturn$13(this, _getPrototypeOf$13(F7PhotoBrowser).call(this, props, context));
    }

    _createClass$13(F7PhotoBrowser, [{
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
        if (!self.props.init) { return; }
        self.$f7ready(function (f7) {
          var params;
          if (typeof self.props.params !== 'undefined') { params = self.props.params; }else { params = Object.assign({}, self.props); }
          Object.keys(params).forEach(function (param) {
            if (typeof params[param] === 'undefined' || params[param] === '') { delete params[param]; }
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
        if (self.f7PhotoBrowser && self.f7PhotoBrowser.destroy) { self.f7PhotoBrowser.destroy(); }
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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
          if (!pb) { return; }
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

  function _typeof$14(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$14 = function _typeof(obj) { return typeof obj; }; } else { _typeof$14 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$14(obj); }

  function _classCallCheck$14(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$14(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$14(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$14(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$14(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$14(self, call) { if (call && (_typeof$14(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$14(self); }

  function _getPrototypeOf$14(o) { _getPrototypeOf$14 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$14(o); }

  function _assertThisInitialized$14(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$14(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$14(subClass, superClass); } }

  function _setPrototypeOf$14(o, p) { _setPrototypeOf$14 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$14(o, p); }

  var F7Popover =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$14(F7Popover, _React$Component);

    function F7Popover(props, context) {
      var _this;

      _classCallCheck$14(this, F7Popover);

      _this = _possibleConstructorReturn$14(this, _getPrototypeOf$14(F7Popover).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$14(_this), ['onOpen', 'onOpened', 'onClose', 'onClosed']);
      })();

      return _this;
    }

    _createClass$14(F7Popover, [{
      key: "onOpen",
      value: function onOpen(instance) {
        this.dispatchEvent('popover:open popoverOpen', instance);
      }
    }, {
      key: "onOpened",
      value: function onOpened(instance) {
        this.dispatchEvent('popover:opened popoverOpened', instance);
      }
    }, {
      key: "onClose",
      value: function onClose(instance) {
        this.dispatchEvent('popover:close popoverClose', instance);
      }
    }, {
      key: "onClosed",
      value: function onClosed(instance) {
        this.dispatchEvent('popover:closed popoverClosed', instance);
      }
    }, {
      key: "open",
      value: function open(animate) {
        var self = this;
        if (!self.f7Popover) { return undefined; }
        return self.f7Popover.open(animate);
      }
    }, {
      key: "close",
      value: function close(animate) {
        var self = this;
        if (!self.f7Popover) { return undefined; }
        return self.f7Popover.close(animate);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'popover', Mixins.colorClasses(props));
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes
        }, React.createElement('div', {
          className: 'popover-angle'
        }), React.createElement('div', {
          className: 'popover-inner'
        }, this.slots['default']));
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        if (self.f7Popover) { self.f7Popover.destroy(); }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        if (!el) { return; }
        var props = self.props;
        var target = props.target,
            opened = props.opened,
            backdrop = props.backdrop,
            backdropEl = props.backdropEl,
            closeByBackdropClick = props.closeByBackdropClick,
            closeByOutsideClick = props.closeByOutsideClick,
            closeOnEscape = props.closeOnEscape;
        var popoverParams = {
          el: el,
          on: {
            open: self.onOpen,
            opened: self.onOpened,
            close: self.onClose,
            closed: self.onClosed
          }
        };
        if (target) { popoverParams.targetEl = target; }
        {
          if ('closeByBackdropClick' in props) { popoverParams.closeByBackdropClick = closeByBackdropClick; }
          if ('closeByOutsideClick' in props) { popoverParams.closeByOutsideClick = closeByOutsideClick; }
          if ('closeOnEscape' in props) { popoverParams.closeOnEscape = closeOnEscape; }
          if ('backdrop' in props) { popoverParams.backdrop = backdrop; }
          if ('backdropEl' in props) { popoverParams.backdropEl = backdropEl; }
        }
        self.$f7ready(function () {
          self.f7Popover = self.$f7.popover.create(popoverParams);

          if (opened && target) {
            self.f7Popover.open(target, false);
          }
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.opened', prevProps, prevState, function (opened) {
          var self = _this3;
          if (!self.f7Popover) { return; }

          if (opened) {
            self.f7Popover.open();
          } else {
            self.f7Popover.close();
          }
        });
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

    return F7Popover;
  }(React.Component);

  __reactComponentSetProps(F7Popover, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    opened: Boolean,
    target: [String, Object],
    backdrop: Boolean,
    backdropEl: [String, Object, window.HTMLElement],
    closeByBackdropClick: Boolean,
    closeByOutsideClick: Boolean,
    closeOnEscape: Boolean
  }, Mixins.colorProps));

  F7Popover.displayName = 'f7-popover';

  function _typeof$15(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$15 = function _typeof(obj) { return typeof obj; }; } else { _typeof$15 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$15(obj); }

  function _classCallCheck$15(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$15(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$15(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$15(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$15(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$15(self, call) { if (call && (_typeof$15(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$15(self); }

  function _getPrototypeOf$15(o) { _getPrototypeOf$15 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$15(o); }

  function _assertThisInitialized$15(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$15(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$15(subClass, superClass); } }

  function _setPrototypeOf$15(o, p) { _setPrototypeOf$15 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$15(o, p); }

  var F7Popup =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$15(F7Popup, _React$Component);

    function F7Popup(props, context) {
      var _this;

      _classCallCheck$15(this, F7Popup);

      _this = _possibleConstructorReturn$15(this, _getPrototypeOf$15(F7Popup).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$15(_this), ['onOpen', 'onOpened', 'onClose', 'onClosed']);
      })();

      return _this;
    }

    _createClass$15(F7Popup, [{
      key: "onOpen",
      value: function onOpen(instance) {
        this.dispatchEvent('popup:open popupOpen', instance);
      }
    }, {
      key: "onOpened",
      value: function onOpened(instance) {
        this.dispatchEvent('popup:opened popupOpened', instance);
      }
    }, {
      key: "onClose",
      value: function onClose(instance) {
        this.dispatchEvent('popup:close popupClose', instance);
      }
    }, {
      key: "onClosed",
      value: function onClosed(instance) {
        this.dispatchEvent('popup:closed popupClosed', instance);
      }
    }, {
      key: "open",
      value: function open(animate) {
        var self = this;
        if (!self.f7Popup) { return undefined; }
        return self.f7Popup.open(animate);
      }
    }, {
      key: "close",
      value: function close(animate) {
        var self = this;
        if (!self.f7Popup) { return undefined; }
        return self.f7Popup.close(animate);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            tabletFullscreen = props.tabletFullscreen,
            push = props.push;
        var classes = Utils.classNames(className, 'popup', {
          'popup-tablet-fullscreen': tabletFullscreen,
          'popup-push': push
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        if (self.f7Popup) { self.f7Popup.destroy(); }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        if (!el) { return; }
        var props = self.props;
        var closeByBackdropClick = props.closeByBackdropClick,
            backdrop = props.backdrop,
            backdropEl = props.backdropEl,
            animate = props.animate,
            closeOnEscape = props.closeOnEscape,
            swipeToClose = props.swipeToClose,
            swipeHandler = props.swipeHandler;
        var popupParams = {
          el: el,
          on: {
            open: self.onOpen,
            opened: self.onOpened,
            close: self.onClose,
            closed: self.onClosed
          }
        };
        {
          if ('closeByBackdropClick' in props) { popupParams.closeByBackdropClick = closeByBackdropClick; }
          if ('closeOnEscape' in props) { popupParams.closeOnEscape = closeOnEscape; }
          if ('animate' in props) { popupParams.animate = animate; }
          if ('backdrop' in props) { popupParams.backdrop = backdrop; }
          if ('backdropEl' in props) { popupParams.backdropEl = backdropEl; }
          if ('swipeToClose' in props) { popupParams.swipeToClose = swipeToClose; }
          if ('swipeHandler' in props) { popupParams.swipeHandler = swipeHandler; }
        }
        self.$f7ready(function () {
          self.f7Popup = self.$f7.popup.create(popupParams);

          if (self.props.opened) {
            self.f7Popup.open(false);
          }
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.opened', prevProps, prevState, function (opened) {
          var self = _this3;
          if (!self.f7Popup) { return; }

          if (opened) {
            self.f7Popup.open();
          } else {
            self.f7Popup.close();
          }
        });
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

    return F7Popup;
  }(React.Component);

  __reactComponentSetProps(F7Popup, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    tabletFullscreen: Boolean,
    opened: Boolean,
    animate: Boolean,
    backdrop: Boolean,
    backdropEl: [String, Object, window.HTMLElement],
    closeByBackdropClick: Boolean,
    closeOnEscape: Boolean,
    swipeToClose: {
      type: [Boolean, String],
      default: false
    },
    swipeHandler: [String, Object, window.HTMLElement],
    push: Boolean
  }, Mixins.colorProps));

  F7Popup.displayName = 'f7-popup';

  function _typeof$16(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$16 = function _typeof(obj) { return typeof obj; }; } else { _typeof$16 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$16(obj); }

  function _classCallCheck$16(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$16(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$16(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$16(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$16(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$16(self, call) { if (call && (_typeof$16(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$16(self); }

  function _assertThisInitialized$16(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$16(o) { _getPrototypeOf$16 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$16(o); }

  function _inherits$16(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$16(subClass, superClass); } }

  function _setPrototypeOf$16(o, p) { _setPrototypeOf$16 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$16(o, p); }

  var F7Progressbar =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$16(F7Progressbar, _React$Component);

    function F7Progressbar(props, context) {
      var _this;

      _classCallCheck$16(this, F7Progressbar);

      _this = _possibleConstructorReturn$16(this, _getPrototypeOf$16(F7Progressbar).call(this, props, context));
      _this.__reactRefs = {};
      return _this;
    }

    _createClass$16(F7Progressbar, [{
      key: "set",
      value: function set(progress, speed) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.progressbar.set(self.refs.el, progress, speed);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var progress = props.progress,
            id = props.id,
            style = props.style,
            infinite = props.infinite,
            className = props.className;
        var transformStyle = {
          transform: progress ? "translate3d(".concat(-100 + progress, "%, 0, 0)") : '',
          WebkitTransform: progress ? "translate3d(".concat(-100 + progress, "%, 0, 0)") : ''
        };
        var classes = Utils.classNames(className, 'progressbar', {
          'progressbar-infinite': infinite
        }, Mixins.colorClasses(props));
        return React.createElement('span', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes,
          'data-progress': progress
        }, React.createElement('span', {
          style: transformStyle
        }));
      }
    }, {
      key: "refs",
      get: function get() {
        return this.__reactRefs;
      },
      set: function set(refs) {}
    }]);

    return F7Progressbar;
  }(React.Component);

  __reactComponentSetProps(F7Progressbar, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    progress: Number,
    infinite: Boolean
  }, Mixins.colorProps));

  F7Progressbar.displayName = 'f7-progressbar';

  function _typeof$17(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$17 = function _typeof(obj) { return typeof obj; }; } else { _typeof$17 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$17(obj); }

  function _classCallCheck$17(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$17(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$17(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$17(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$17(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$17(self, call) { if (call && (_typeof$17(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$17(self); }

  function _getPrototypeOf$17(o) { _getPrototypeOf$17 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$17(o); }

  function _assertThisInitialized$17(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$17(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$17(subClass, superClass); } }

  function _setPrototypeOf$17(o, p) { _setPrototypeOf$17 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$17(o, p); }

  var F7Radio =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$17(F7Radio, _React$Component);

    function F7Radio(props, context) {
      var _this;

      _classCallCheck$17(this, F7Radio);

      _this = _possibleConstructorReturn$17(this, _getPrototypeOf$17(F7Radio).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$17(_this), ['onChange']);
      })();

      return _this;
    }

    _createClass$17(F7Radio, [{
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
        var name = props.name,
            value = props.value,
            disabled = props.disabled,
            readonly = props.readonly,
            checked = props.checked,
            defaultChecked = props.defaultChecked,
            id = props.id,
            style = props.style,
            className = props.className;
        var inputEl;
        {
          inputEl = React.createElement('input', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['inputEl'] = __reactNode;
            },
            type: 'radio',
            name: name,
            value: value,
            disabled: disabled,
            readOnly: readonly,
            checked: checked,
            defaultChecked: defaultChecked,
            onChange: self.onChange
          });
        }
        var iconEl = React.createElement('i', {
          className: 'icon-radio'
        });
        var classes = Utils.classNames(className, 'radio', {
          disabled: disabled
        }, Mixins.colorClasses(props));
        return React.createElement('label', {
          id: id,
          style: style,
          className: classes
        }, inputEl, iconEl, this.slots['default']);
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7Radio;
  }(React.Component);

  __reactComponentSetProps(F7Radio, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    checked: Boolean,
    name: [Number, String],
    value: [Number, String, Boolean],
    disabled: Boolean,
    readonly: Boolean,
    defaultChecked: Boolean
  }, Mixins.colorProps));

  F7Radio.displayName = 'f7-radio';

  function _typeof$18(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$18 = function _typeof(obj) { return typeof obj; }; } else { _typeof$18 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$18(obj); }

  function _classCallCheck$18(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$18(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$18(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$18(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$18(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$18(self, call) { if (call && (_typeof$18(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$18(self); }

  function _getPrototypeOf$18(o) { _getPrototypeOf$18 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$18(o); }

  function _assertThisInitialized$18(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$18(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$18(subClass, superClass); } }

  function _setPrototypeOf$18(o, p) { _setPrototypeOf$18 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$18(o, p); }

  var F7Row =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$18(F7Row, _React$Component);

    function F7Row(props, context) {
      var _this;

      _classCallCheck$18(this, F7Row);

      _this = _possibleConstructorReturn$18(this, _getPrototypeOf$18(F7Row).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$18(_this), ['onClick']);
      })();

      return _this;
    }

    _createClass$18(F7Row, [{
      key: "onClick",
      value: function onClick(event) {
        this.dispatchEvent('click', event);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            tag = props.tag,
            noGap = props.noGap;
        var RowTag = tag;
        var classes = Utils.classNames(className, 'row', {
          'no-gap': noGap
        }, Mixins.colorClasses(props));
        return React.createElement(RowTag, {
          id: id,
          style: style,
          className: classes,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          }
        }, this.slots['default']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.refs.el.removeEventListener('click', this.onClick);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.refs.el.addEventListener('click', this.onClick);
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7Row;
  }(React.Component);

  __reactComponentSetProps(F7Row, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    noGap: Boolean,
    tag: {
      type: String,
      default: 'div'
    }
  }, Mixins.colorProps));

  F7Row.displayName = 'f7-row';

  function _typeof$19(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$19 = function _typeof(obj) { return typeof obj; }; } else { _typeof$19 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$19(obj); }

  function _classCallCheck$19(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$19(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$19(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$19(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$19(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$19(self, call) { if (call && (_typeof$19(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$19(self); }

  function _getPrototypeOf$19(o) { _getPrototypeOf$19 = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$19(o); }

  function _assertThisInitialized$19(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$19(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$19(subClass, superClass); } }

  function _setPrototypeOf$19(o, p) { _setPrototypeOf$19 = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$19(o, p); }

  var F7Searchbar =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$19(F7Searchbar, _React$Component);

    function F7Searchbar(props, context) {
      var _this;

      _classCallCheck$19(this, F7Searchbar);

      _this = _possibleConstructorReturn$19(this, _getPrototypeOf$19(F7Searchbar).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$19(_this), ['onSubmit', 'onClearButtonClick', 'onDisableButtonClick', 'onInput', 'onChange', 'onFocus', 'onBlur']);
      })();

      return _this;
    }

    _createClass$19(F7Searchbar, [{
      key: "search",
      value: function search(query) {
        if (!this.f7Searchbar) { return undefined; }
        return this.f7Searchbar.search(query);
      }
    }, {
      key: "enable",
      value: function enable() {
        if (!this.f7Searchbar) { return undefined; }
        return this.f7Searchbar.enable();
      }
    }, {
      key: "disable",
      value: function disable() {
        if (!this.f7Searchbar) { return undefined; }
        return this.f7Searchbar.disable();
      }
    }, {
      key: "toggle",
      value: function toggle() {
        if (!this.f7Searchbar) { return undefined; }
        return this.toggle.disable();
      }
    }, {
      key: "clear",
      value: function clear() {
        if (!this.f7Searchbar) { return undefined; }
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

        if (self.f7Searchbar && self.f7Searchbar.destroy) { self.f7Searchbar.destroy(); }
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

        if (!init) { return; }
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
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

  function _typeof$1a(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1a = function _typeof(obj) { return typeof obj; }; } else { _typeof$1a = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1a(obj); }

  function _classCallCheck$1a(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1a(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1a(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1a(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1a(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1a(self, call) { if (call && (_typeof$1a(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1a(self); }

  function _assertThisInitialized$1a(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$1a(o) { _getPrototypeOf$1a = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1a(o); }

  function _inherits$1a(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1a(subClass, superClass); } }

  function _setPrototypeOf$1a(o, p) { _setPrototypeOf$1a = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1a(o, p); }

  var F7Segmented =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1a(F7Segmented, _React$Component);

    function F7Segmented(props, context) {
      _classCallCheck$1a(this, F7Segmented);

      return _possibleConstructorReturn$1a(this, _getPrototypeOf$1a(F7Segmented).call(this, props, context));
    }

    _createClass$1a(F7Segmented, [{
      key: "render",
      value: function render() {
        var self = this;
        var props = self.props;
        var className = props.className,
            raised = props.raised,
            raisedIos = props.raisedIos,
            raisedAurora = props.raisedAurora,
            raisedMd = props.raisedMd,
            round = props.round,
            roundIos = props.roundIos,
            roundAurora = props.roundAurora,
            roundMd = props.roundMd,
            strong = props.strong,
            strongIos = props.strongIos,
            strongMd = props.strongMd,
            strongAurora = props.strongAurora,
            id = props.id,
            style = props.style,
            tag = props.tag;
        var classNames = Utils.classNames(className, {
          segmented: true,
          'segmented-raised': raised,
          'segmented-raised-ios': raisedIos,
          'segmented-raised-aurora': raisedAurora,
          'segmented-raised-md': raisedMd,
          'segmented-round': round,
          'segmented-round-ios': roundIos,
          'segmented-round-aurora': roundAurora,
          'segmented-round-md': roundMd,
          'segmented-strong': strong,
          'segmented-strong-ios': strongIos,
          'segmented-strong-md': strongMd,
          'segmented-strong-aurora': strongAurora
        }, Mixins.colorClasses(props));
        var SegmentedTag = tag;
        return React.createElement(SegmentedTag, {
          id: id,
          style: style,
          className: classNames
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7Segmented;
  }(React.Component);

  __reactComponentSetProps(F7Segmented, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    raised: Boolean,
    raisedIos: Boolean,
    raisedMd: Boolean,
    raisedAurora: Boolean,
    round: Boolean,
    roundIos: Boolean,
    roundMd: Boolean,
    roundAurora: Boolean,
    strong: Boolean,
    strongIos: Boolean,
    strongMd: Boolean,
    strongAurora: Boolean,
    tag: {
      type: String,
      default: 'div'
    }
  }, Mixins.colorProps));

  F7Segmented.displayName = 'f7-segmented';

  function _typeof$1b(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1b = function _typeof(obj) { return typeof obj; }; } else { _typeof$1b = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1b(obj); }

  function _classCallCheck$1b(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1b(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1b(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1b(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1b(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1b(self, call) { if (call && (_typeof$1b(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1b(self); }

  function _getPrototypeOf$1b(o) { _getPrototypeOf$1b = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1b(o); }

  function _assertThisInitialized$1b(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$1b(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1b(subClass, superClass); } }

  function _setPrototypeOf$1b(o, p) { _setPrototypeOf$1b = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1b(o, p); }

  var F7Sheet =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1b(F7Sheet, _React$Component);

    function F7Sheet(props, context) {
      var _this;

      _classCallCheck$1b(this, F7Sheet);

      _this = _possibleConstructorReturn$1b(this, _getPrototypeOf$1b(F7Sheet).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$1b(_this), ['onOpen', 'onOpened', 'onClose', 'onClosed', 'onStepOpen', 'onStepClose', 'onStepProgress']);
      })();

      return _this;
    }

    _createClass$1b(F7Sheet, [{
      key: "onStepProgress",
      value: function onStepProgress(instance, progress) {
        this.dispatchEvent('sheet:stepprogress sheetStepProgress', instance, progress);
      }
    }, {
      key: "onStepOpen",
      value: function onStepOpen(instance) {
        this.dispatchEvent('sheet:stepopen sheetStepOpen', instance);
      }
    }, {
      key: "onStepClose",
      value: function onStepClose(instance) {
        this.dispatchEvent('sheet:stepclose sheetStepClose', instance);
      }
    }, {
      key: "onOpen",
      value: function onOpen(instance) {
        this.dispatchEvent('sheet:open sheetOpen', instance);
      }
    }, {
      key: "onOpened",
      value: function onOpened(instance) {
        this.dispatchEvent('sheet:opened sheetOpened', instance);
      }
    }, {
      key: "onClose",
      value: function onClose(instance) {
        this.dispatchEvent('sheet:close sheetClose', instance);
      }
    }, {
      key: "onClosed",
      value: function onClosed(instance) {
        this.dispatchEvent('sheet:closed sheetClosed', instance);
      }
    }, {
      key: "open",
      value: function open(animate) {
        var self = this;
        if (!self.f7Sheet) { return undefined; }
        return self.f7Sheet.open(animate);
      }
    }, {
      key: "close",
      value: function close(animate) {
        var self = this;
        if (!self.f7Sheet) { return undefined; }
        return self.f7Sheet.close(animate);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var fixedList = [];
        var staticList = [];
        var props = self.props;
        var id = props.id,
            style = props.style,
            className = props.className,
            top = props.top,
            bottom = props.bottom,
            position = props.position,
            push = props.push;
        var fixedTags;
        fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ').map(function (tagName) {
          return "f7-".concat(tagName);
        });
        var slotsDefault = self.slots.default;

        if (slotsDefault && slotsDefault.length) {
          slotsDefault.forEach(function (child) {
            if (typeof child === 'undefined') { return; }
            var isFixedTag = false;
            {
              var tag = child.type && (child.type.displayName || child.type.name);

              if (!tag) {
                staticList.push(child);
                return;
              }

              if (fixedTags.indexOf(tag) >= 0) {
                isFixedTag = true;
              }
            }
            if (isFixedTag) { fixedList.push(child); }else { staticList.push(child); }
          });
        }

        var innerEl = React.createElement('div', {
          className: 'sheet-modal-inner'
        }, staticList);
        var positionComputed = 'bottom';
        if (position) { positionComputed = position; }else if (top) { positionComputed = 'top'; }else if (bottom) { positionComputed = 'bottom'; }
        var classes = Utils.classNames(className, 'sheet-modal', "sheet-modal-".concat(positionComputed), {
          'sheet-modal-push': push
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes
        }, fixedList, innerEl);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        if (self.f7Sheet) { self.f7Sheet.destroy(); }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        if (!el) { return; }
        var props = self.props;
        var opened = props.opened,
            backdrop = props.backdrop,
            backdropEl = props.backdropEl,
            closeByBackdropClick = props.closeByBackdropClick,
            closeByOutsideClick = props.closeByOutsideClick,
            closeOnEscape = props.closeOnEscape,
            swipeToClose = props.swipeToClose,
            swipeToStep = props.swipeToStep,
            swipeHandler = props.swipeHandler;
        var sheetParams = {
          el: self.refs.el,
          on: {
            open: self.onOpen,
            opened: self.onOpened,
            close: self.onClose,
            closed: self.onClosed,
            stepOpen: self.onStepOpen,
            stepClose: self.onStepClose,
            stepProgress: self.onStepProgress
          }
        };
        {
          if ('backdrop' in props && typeof backdrop !== 'undefined') { sheetParams.backdrop = backdrop; }
          if ('backdropEl' in props) { sheetParams.backdropEl = backdropEl; }
          if ('closeByBackdropClick' in props) { sheetParams.closeByBackdropClick = closeByBackdropClick; }
          if ('closeByOutsideClick' in props) { sheetParams.closeByOutsideClick = closeByOutsideClick; }
          if ('closeOnEscape' in props) { sheetParams.closeOnEscape = closeOnEscape; }
          if ('swipeToClose' in props) { sheetParams.swipeToClose = swipeToClose; }
          if ('swipeToStep' in props) { sheetParams.swipeToStep = swipeToStep; }
          if ('swipeHandler' in props) { sheetParams.swipeHandler = swipeHandler; }
        }
        self.$f7ready(function () {
          self.f7Sheet = self.$f7.sheet.create(sheetParams);

          if (opened) {
            self.f7Sheet.open(false);
          }
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        var _this3 = this;

        __reactComponentWatch(this, 'props.opened', prevProps, prevState, function (opened) {
          var self = _this3;
          if (!self.f7Sheet) { return; }

          if (opened) {
            self.f7Sheet.open();
          } else {
            self.f7Sheet.close();
          }
        });
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

    return F7Sheet;
  }(React.Component);

  __reactComponentSetProps(F7Sheet, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    opened: Boolean,
    top: Boolean,
    bottom: Boolean,
    position: String,
    backdrop: Boolean,
    backdropEl: [String, Object, window.HTMLElement],
    closeByBackdropClick: Boolean,
    closeByOutsideClick: Boolean,
    closeOnEscape: Boolean,
    push: Boolean,
    swipeToClose: Boolean,
    swipeToStep: Boolean,
    swipeHandler: [String, Object, window.HTMLElement]
  }, Mixins.colorProps));

  F7Sheet.displayName = 'f7-sheet';

  function _typeof$1c(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1c = function _typeof(obj) { return typeof obj; }; } else { _typeof$1c = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1c(obj); }

  function _classCallCheck$1c(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1c(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1c(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1c(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1c(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1c(self, call) { if (call && (_typeof$1c(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1c(self); }

  function _assertThisInitialized$1c(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$1c(o) { _getPrototypeOf$1c = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1c(o); }

  function _inherits$1c(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1c(subClass, superClass); } }

  function _setPrototypeOf$1c(o, p) { _setPrototypeOf$1c = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1c(o, p); }

  var F7SkeletonBlock =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1c(F7SkeletonBlock, _React$Component);

    function F7SkeletonBlock(props, context) {
      _classCallCheck$1c(this, F7SkeletonBlock);

      return _possibleConstructorReturn$1c(this, _getPrototypeOf$1c(F7SkeletonBlock).call(this, props, context));
    }

    _createClass$1c(F7SkeletonBlock, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            width = props.width,
            height = props.height,
            tag = props.tag;
        var classes = Utils.classNames('skeleton-block', className, Mixins.colorClasses(props));
        var styleAttribute = style;

        if (width) {
          var widthValue = typeof width === 'number' ? "".concat(width, "px") : width;

          if (!styleAttribute) {
            styleAttribute = {
              width: widthValue
            };
          } else if (_typeof$1c(styleAttribute) === 'object') {
            styleAttribute = Object.assign({
              width: widthValue
            }, styleAttribute);
          } else if (typeof styleAttribute === 'string') {
            styleAttribute = "width: ".concat(widthValue, "; ").concat(styleAttribute);
          }
        }

        if (height) {
          var heightValue = typeof height === 'number' ? "".concat(height, "px") : height;

          if (!styleAttribute) {
            styleAttribute = {
              height: heightValue
            };
          } else if (_typeof$1c(styleAttribute) === 'object') {
            styleAttribute = Object.assign({
              height: heightValue
            }, styleAttribute);
          } else if (typeof styleAttribute === 'string') {
            styleAttribute = "height: ".concat(heightValue, "; ").concat(styleAttribute);
          }
        }

        var Tag = tag;
        return React.createElement(Tag, {
          id: id,
          style: styleAttribute,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7SkeletonBlock;
  }(React.Component);

  __reactComponentSetProps(F7SkeletonBlock, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    width: [Number, String],
    height: [Number, String],
    tag: {
      type: String,
      default: 'div'
    }
  }, Mixins.colorProps));

  F7SkeletonBlock.displayName = 'f7-skeleton-block';

  function _typeof$1d(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1d = function _typeof(obj) { return typeof obj; }; } else { _typeof$1d = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1d(obj); }

  function _classCallCheck$1d(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1d(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1d(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1d(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1d(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1d(self, call) { if (call && (_typeof$1d(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1d(self); }

  function _assertThisInitialized$1d(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$1d(o) { _getPrototypeOf$1d = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1d(o); }

  function _inherits$1d(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1d(subClass, superClass); } }

  function _setPrototypeOf$1d(o, p) { _setPrototypeOf$1d = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1d(o, p); }

  var F7SkeletonText =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1d(F7SkeletonText, _React$Component);

    function F7SkeletonText(props, context) {
      _classCallCheck$1d(this, F7SkeletonText);

      return _possibleConstructorReturn$1d(this, _getPrototypeOf$1d(F7SkeletonText).call(this, props, context));
    }

    _createClass$1d(F7SkeletonText, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            width = props.width,
            height = props.height,
            tag = props.tag;
        var classes = Utils.classNames('skeleton-text', className, Mixins.colorClasses(props));
        var styleAttribute = style;

        if (width) {
          var widthValue = typeof width === 'number' ? "".concat(width, "px") : width;

          if (!styleAttribute) {
            styleAttribute = {
              width: widthValue
            };
          } else if (_typeof$1d(styleAttribute) === 'object') {
            styleAttribute = Object.assign({
              width: widthValue
            }, styleAttribute);
          } else if (typeof styleAttribute === 'string') {
            styleAttribute = "width: ".concat(widthValue, "; ").concat(styleAttribute);
          }
        }

        if (height) {
          var heightValue = typeof height === 'number' ? "".concat(height, "px") : height;

          if (!styleAttribute) {
            styleAttribute = {
              height: heightValue
            };
          } else if (_typeof$1d(styleAttribute) === 'object') {
            styleAttribute = Object.assign({
              height: heightValue
            }, styleAttribute);
          } else if (typeof styleAttribute === 'string') {
            styleAttribute = "height: ".concat(heightValue, "; ").concat(styleAttribute);
          }
        }

        var Tag = tag;
        return React.createElement(Tag, {
          id: id,
          style: styleAttribute,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7SkeletonText;
  }(React.Component);

  __reactComponentSetProps(F7SkeletonText, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    width: [Number, String],
    height: [Number, String],
    tag: {
      type: String,
      default: 'span'
    }
  }, Mixins.colorProps));

  F7SkeletonText.displayName = 'f7-skeleton-text';

  function _typeof$1e(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1e = function _typeof(obj) { return typeof obj; }; } else { _typeof$1e = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1e(obj); }

  function _classCallCheck$1e(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1e(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1e(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1e(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1e(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1e(self, call) { if (call && (_typeof$1e(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1e(self); }

  function _getPrototypeOf$1e(o) { _getPrototypeOf$1e = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1e(o); }

  function _assertThisInitialized$1e(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$1e(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1e(subClass, superClass); } }

  function _setPrototypeOf$1e(o, p) { _setPrototypeOf$1e = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1e(o, p); }

  var F7Stepper =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1e(F7Stepper, _React$Component);

    function F7Stepper(props, context) {
      var _this;

      _classCallCheck$1e(this, F7Stepper);

      _this = _possibleConstructorReturn$1e(this, _getPrototypeOf$1e(F7Stepper).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$1e(_this), ['onInput', 'onMinusClick', 'onPlusClick']);
      })();

      return _this;
    }

    _createClass$1e(F7Stepper, [{
      key: "increment",
      value: function increment() {
        if (!this.f7Stepper) { return; }
        this.f7Stepper.increment();
      }
    }, {
      key: "decrement",
      value: function decrement() {
        if (!this.f7Stepper) { return; }
        this.f7Stepper.decrement();
      }
    }, {
      key: "setValue",
      value: function setValue(newValue) {
        var self = this;
        if (self.f7Stepper && self.f7Stepper.setValue) { self.f7Stepper.setValue(newValue); }
      }
    }, {
      key: "getValue",
      value: function getValue() {
        var self = this;

        if (self.f7Stepper && self.f7Stepper.getValue) {
          return self.f7Stepper.getValue();
        }

        return undefined;
      }
    }, {
      key: "onInput",
      value: function onInput(event) {
        var stepper = this.f7Stepper;
        this.dispatchEvent('input', event, stepper);
      }
    }, {
      key: "onChange",
      value: function onChange(event) {
        var stepper = this.f7Stepper;
        this.dispatchEvent('change', event, stepper);
      }
    }, {
      key: "onMinusClick",
      value: function onMinusClick(event) {
        var stepper = this.f7Stepper;
        this.dispatchEvent('stepper:minusclick stepperMinusClick', event, stepper);
      }
    }, {
      key: "onPlusClick",
      value: function onPlusClick(event) {
        var stepper = this.f7Stepper;
        this.dispatchEvent('stepper:plusclick stepperPlusClick', event, stepper);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var input = props.input,
            buttonsOnly = props.buttonsOnly,
            inputType = props.inputType,
            value = props.value,
            inputReadonly = props.inputReadonly,
            min = props.min,
            max = props.max,
            step = props.step,
            id = props.id,
            style = props.style,
            name = props.name,
            inputId = props.inputId;
        var inputWrapEl;
        var valueEl;

        if (input && !buttonsOnly) {
          var inputEl;
          {
            inputEl = React.createElement('input', {
              ref: function ref(__reactNode) {
                _this2.__reactRefs['inputEl'] = __reactNode;
              },
              name: name,
              id: inputId,
              type: inputType,
              min: inputType === 'number' ? min : undefined,
              max: inputType === 'number' ? max : undefined,
              step: inputType === 'number' ? step : undefined,
              onInput: self.onInput,
              onChange: self.onChange,
              value: value,
              readOnly: inputReadonly
            });
          }
          inputWrapEl = React.createElement('div', {
            className: 'stepper-input-wrap'
          }, inputEl);
        }

        if (!input && !buttonsOnly) {
          valueEl = React.createElement('div', {
            className: 'stepper-value'
          }, value);
        }

        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: self.classes
        }, React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['minusEl'] = __reactNode;
          },
          className: 'stepper-button-minus'
        }), inputWrapEl, valueEl, React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['plusEl'] = __reactNode;
          },
          className: 'stepper-button-plus'
        }));
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        var _self$refs = self.refs,
            minusEl = _self$refs.minusEl,
            plusEl = _self$refs.plusEl;

        if (minusEl) {
          minusEl.removeEventListener('click', self.onMinusClick);
        }

        if (plusEl) {
          plusEl.removeEventListener('click', self.onPlusClick);
        }

        if (!self.props.init) { return; }

        if (self.f7Stepper && self.f7Stepper.destroy) {
          self.f7Stepper.destroy();
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var _self$refs2 = self.refs,
            minusEl = _self$refs2.minusEl,
            plusEl = _self$refs2.plusEl;

        if (minusEl) {
          minusEl.addEventListener('click', self.onMinusClick);
        }

        if (plusEl) {
          plusEl.addEventListener('click', self.onPlusClick);
        }

        if (!self.props.init) { return; }
        self.$f7ready(function (f7) {
          var _self$props = self.props,
              min = _self$props.min,
              max = _self$props.max,
              value = _self$props.value,
              step = _self$props.step,
              formatValue = _self$props.formatValue,
              autorepeat = _self$props.autorepeat,
              autorepeatDynamic = _self$props.autorepeatDynamic,
              wraps = _self$props.wraps,
              manualInputMode = _self$props.manualInputMode,
              decimalPoint = _self$props.decimalPoint,
              buttonsEndInputMode = _self$props.buttonsEndInputMode;
          var el = self.refs.el;
          if (!el) { return; }
          self.f7Stepper = f7.stepper.create(Utils.noUndefinedProps({
            el: el,
            min: min,
            max: max,
            value: value,
            step: step,
            formatValue: formatValue,
            autorepeat: autorepeat,
            autorepeatDynamic: autorepeatDynamic,
            wraps: wraps,
            manualInputMode: manualInputMode,
            decimalPoint: decimalPoint,
            buttonsEndInputMode: buttonsEndInputMode,
            on: {
              change: function change(stepper, newValue) {
                self.dispatchEvent('stepper:change stepperChange', newValue);
              }
            }
          }));
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
        }

        return __reactComponentDispatchEvent.apply(void 0, [this, events].concat(args));
      }
    }, {
      key: "classes",
      get: function get() {
        var self = this;
        var props = self.props;
        var round = props.round,
            roundIos = props.roundIos,
            roundMd = props.roundMd,
            roundAurora = props.roundAurora,
            fill = props.fill,
            fillIos = props.fillIos,
            fillMd = props.fillMd,
            fillAurora = props.fillAurora,
            large = props.large,
            largeIos = props.largeIos,
            largeMd = props.largeMd,
            largeAurora = props.largeAurora,
            small = props.small,
            smallIos = props.smallIos,
            smallMd = props.smallMd,
            smallAurora = props.smallAurora,
            raised = props.raised,
            raisedMd = props.raisedMd,
            raisedIos = props.raisedIos,
            raisedAurora = props.raisedAurora,
            disabled = props.disabled;
        return Utils.classNames(self.props.className, 'stepper', {
          disabled: disabled,
          'stepper-round': round,
          'stepper-round-ios': roundIos,
          'stepper-round-md': roundMd,
          'stepper-round-aurora': roundAurora,
          'stepper-fill': fill,
          'stepper-fill-ios': fillIos,
          'stepper-fill-md': fillMd,
          'stepper-fill-aurora': fillAurora,
          'stepper-large': large,
          'stepper-large-ios': largeIos,
          'stepper-large-md': largeMd,
          'stepper-large-aurora': largeAurora,
          'stepper-small': small,
          'stepper-small-ios': smallIos,
          'stepper-small-md': smallMd,
          'stepper-small-aurora': smallAurora,
          'stepper-raised': raised,
          'stepper-raised-ios': raisedIos,
          'stepper-raised-md': raisedMd,
          'stepper-raised-aurora': raisedAurora
        }, Mixins.colorClasses(props));
      }
    }, {
      key: "refs",
      get: function get() {
        return this.__reactRefs;
      },
      set: function set(refs) {}
    }]);

    return F7Stepper;
  }(React.Component);

  __reactComponentSetProps(F7Stepper, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    init: {
      type: Boolean,
      default: true
    },
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    formatValue: Function,
    name: String,
    inputId: String,
    input: {
      type: Boolean,
      default: true
    },
    inputType: {
      type: String,
      default: 'text'
    },
    inputReadonly: {
      type: Boolean,
      default: false
    },
    autorepeat: {
      type: Boolean,
      default: false
    },
    autorepeatDynamic: {
      type: Boolean,
      default: false
    },
    wraps: {
      type: Boolean,
      default: false
    },
    manualInputMode: {
      type: Boolean,
      default: false
    },
    decimalPoint: {
      type: Number,
      default: 4
    },
    buttonsEndInputMode: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    buttonsOnly: Boolean,
    round: Boolean,
    roundMd: Boolean,
    roundIos: Boolean,
    roundAurora: Boolean,
    fill: Boolean,
    fillMd: Boolean,
    fillIos: Boolean,
    fillAurora: Boolean,
    large: Boolean,
    largeMd: Boolean,
    largeIos: Boolean,
    largeAurora: Boolean,
    small: Boolean,
    smallMd: Boolean,
    smallIos: Boolean,
    smallAurora: Boolean,
    raised: Boolean,
    raisedMd: Boolean,
    raisedIos: Boolean,
    raisedAurora: Boolean
  }, Mixins.colorProps));

  F7Stepper.displayName = 'f7-stepper';

  function _typeof$1f(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1f = function _typeof(obj) { return typeof obj; }; } else { _typeof$1f = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1f(obj); }

  function _classCallCheck$1f(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1f(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1f(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1f(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1f(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1f(self, call) { if (call && (_typeof$1f(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1f(self); }

  function _assertThisInitialized$1f(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$1f(o) { _getPrototypeOf$1f = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1f(o); }

  function _inherits$1f(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1f(subClass, superClass); } }

  function _setPrototypeOf$1f(o, p) { _setPrototypeOf$1f = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1f(o, p); }

  var F7Subnavbar =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1f(F7Subnavbar, _React$Component);

    function F7Subnavbar(props, context) {
      _classCallCheck$1f(this, F7Subnavbar);

      return _possibleConstructorReturn$1f(this, _getPrototypeOf$1f(F7Subnavbar).call(this, props, context));
    }

    _createClass$1f(F7Subnavbar, [{
      key: "render",
      value: function render() {
        var self = this;
        var props = self.props;
        var inner = props.inner,
            title = props.title,
            style = props.style,
            id = props.id,
            className = props.className,
            sliding = props.sliding;
        var classes = Utils.classNames(className, 'subnavbar', {
          sliding: sliding
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          className: classes,
          id: id,
          style: style
        }, inner ? React.createElement('div', {
          className: 'subnavbar-inner'
        }, title && React.createElement('div', {
          className: 'subnavbar-title'
        }, title), this.slots['default']) : this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7Subnavbar;
  }(React.Component);

  __reactComponentSetProps(F7Subnavbar, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    sliding: Boolean,
    title: String,
    inner: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps));

  F7Subnavbar.displayName = 'f7-subnavbar';

  function _typeof$1g(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1g = function _typeof(obj) { return typeof obj; }; } else { _typeof$1g = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1g(obj); }

  function _classCallCheck$1g(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1g(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1g(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1g(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1g(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1g(self, call) { if (call && (_typeof$1g(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1g(self); }

  function _assertThisInitialized$1g(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$1g(o) { _getPrototypeOf$1g = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1g(o); }

  function _inherits$1g(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1g(subClass, superClass); } }

  function _setPrototypeOf$1g(o, p) { _setPrototypeOf$1g = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1g(o, p); }

  var F7SwipeoutActions =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1g(F7SwipeoutActions, _React$Component);

    function F7SwipeoutActions(props, context) {
      _classCallCheck$1g(this, F7SwipeoutActions);

      return _possibleConstructorReturn$1g(this, _getPrototypeOf$1g(F7SwipeoutActions).call(this, props, context));
    }

    _createClass$1g(F7SwipeoutActions, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var left = props.left,
            right = props.right,
            side = props.side,
            className = props.className,
            id = props.id,
            style = props.style;
        var sideComputed = side;

        if (!sideComputed) {
          if (left) { sideComputed = 'left'; }
          if (right) { sideComputed = 'right'; }
        }

        var classes = Utils.classNames(className, "swipeout-actions-".concat(sideComputed), Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7SwipeoutActions;
  }(React.Component);

  __reactComponentSetProps(F7SwipeoutActions, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    left: Boolean,
    right: Boolean,
    side: String
  }, Mixins.colorProps));

  F7SwipeoutActions.displayName = 'f7-swipeout-actions';

  function _typeof$1h(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1h = function _typeof(obj) { return typeof obj; }; } else { _typeof$1h = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1h(obj); }

  function _classCallCheck$1h(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1h(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1h(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1h(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1h(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1h(self, call) { if (call && (_typeof$1h(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1h(self); }

  function _getPrototypeOf$1h(o) { _getPrototypeOf$1h = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1h(o); }

  function _assertThisInitialized$1h(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$1h(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1h(subClass, superClass); } }

  function _setPrototypeOf$1h(o, p) { _setPrototypeOf$1h = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1h(o, p); }

  var F7SwipeoutButton =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1h(F7SwipeoutButton, _React$Component);

    function F7SwipeoutButton(props, context) {
      var _this;

      _classCallCheck$1h(this, F7SwipeoutButton);

      _this = _possibleConstructorReturn$1h(this, _getPrototypeOf$1h(F7SwipeoutButton).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$1h(_this), ['onClick']);
      })();

      return _this;
    }

    _createClass$1h(F7SwipeoutButton, [{
      key: "onClick",
      value: function onClick(event) {
        this.dispatchEvent('click', event);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            overswipe = props.overswipe,
            deleteProp = props.delete,
            close = props.close,
            href = props.href,
            confirmTitle = props.confirmTitle,
            confirmText = props.confirmText,
            text = props.text;
        var classes = Utils.classNames(className, {
          'swipeout-overswipe': overswipe,
          'swipeout-delete': deleteProp,
          'swipeout-close': close
        }, Mixins.colorClasses(props));
        return React.createElement('a', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          href: href || '#',
          id: id,
          style: style,
          'data-confirm': confirmText || undefined,
          'data-confirm-title': confirmTitle || undefined,
          className: classes
        }, this.slots['default'], !this.slots.default && text);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.refs.el.removeEventListener('click', this.onClick);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.refs.el.addEventListener('click', this.onClick);
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7SwipeoutButton;
  }(React.Component);

  __reactComponentSetProps(F7SwipeoutButton, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    text: String,
    confirmTitle: String,
    confirmText: String,
    overswipe: Boolean,
    close: Boolean,
    delete: Boolean,
    href: String
  }, Mixins.colorProps));

  F7SwipeoutButton.displayName = 'f7-swipeout-button';

  function _typeof$1i(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1i = function _typeof(obj) { return typeof obj; }; } else { _typeof$1i = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1i(obj); }

  function _classCallCheck$1i(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1i(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1i(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1i(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1i(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1i(self, call) { if (call && (_typeof$1i(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1i(self); }

  function _assertThisInitialized$1i(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$1i(o) { _getPrototypeOf$1i = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1i(o); }

  function _inherits$1i(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1i(subClass, superClass); } }

  function _setPrototypeOf$1i(o, p) { _setPrototypeOf$1i = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1i(o, p); }

  var F7SwiperSlide =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1i(F7SwiperSlide, _React$Component);

    function F7SwiperSlide(props, context) {
      _classCallCheck$1i(this, F7SwiperSlide);

      return _possibleConstructorReturn$1i(this, _getPrototypeOf$1i(F7SwiperSlide).call(this, props, context));
    }

    _createClass$1i(F7SwiperSlide, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            zoom = props.zoom;
        var classes = Utils.classNames(className, 'swiper-slide');
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, zoom ? React.createElement('div', {
          className: 'swiper-zoom-container'
        }, this.slots['default']) : this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7SwiperSlide;
  }(React.Component);

  __reactComponentSetProps(F7SwiperSlide, {
    id: [String, Number],
    className: String,
    style: Object,
    zoom: Boolean
  });

  F7SwiperSlide.displayName = 'f7-swiper-slide';

  function _typeof$1j(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1j = function _typeof(obj) { return typeof obj; }; } else { _typeof$1j = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1j(obj); }

  function _classCallCheck$1j(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1j(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1j(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1j(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1j(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1j(self, call) { if (call && (_typeof$1j(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1j(self); }

  function _assertThisInitialized$1j(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$1j(o) { _getPrototypeOf$1j = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1j(o); }

  function _inherits$1j(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1j(subClass, superClass); } }

  function _setPrototypeOf$1j(o, p) { _setPrototypeOf$1j = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1j(o, p); }

  var F7Swiper =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1j(F7Swiper, _React$Component);

    function F7Swiper(props, context) {
      var _this;

      _classCallCheck$1j(this, F7Swiper);

      _this = _possibleConstructorReturn$1j(this, _getPrototypeOf$1j(F7Swiper).call(this, props, context));
      _this.__reactRefs = {};
      return _this;
    }

    _createClass$1j(F7Swiper, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var id = props.id,
            style = props.style,
            className = props.className;
        var paginationEl;
        var scrollbarEl;
        var buttonNextEl;
        var buttonPrevEl;

        if (self.paginationComputed) {
          paginationEl = React.createElement('div', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['paginationEl'] = __reactNode;
            },
            className: 'swiper-pagination'
          });
        }

        if (self.scrollbarComputed) {
          scrollbarEl = React.createElement('div', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['scrollbarEl'] = __reactNode;
            },
            className: 'swiper-scrollbar'
          });
        }

        if (self.navigationComputed) {
          buttonNextEl = React.createElement('div', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['nextEl'] = __reactNode;
            },
            className: 'swiper-button-next'
          });
          buttonPrevEl = React.createElement('div', {
            ref: function ref(__reactNode) {
              _this2.__reactRefs['prevEl'] = __reactNode;
            },
            className: 'swiper-button-prev'
          });
        }

        var classes = Utils.classNames(className, 'swiper-container', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          className: classes
        }, this.slots['before-wrapper'], React.createElement('div', {
          className: 'swiper-wrapper'
        }, this.slots['default']), paginationEl, scrollbarEl, buttonPrevEl, buttonNextEl, this.slots['after-wrapper']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        if (!self.props.init) { return; }
        if (self.swiper && self.swiper.destroy) { self.swiper.destroy(); }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        if (!self.props.init) { return; }
        self.$f7ready(function (f7) {
          var newParams = {
            pagination: {},
            navigation: {},
            scrollbar: {}
          };
          var _self$props = self.props,
              params = _self$props.params,
              pagination = _self$props.pagination,
              navigation = _self$props.navigation,
              scrollbar = _self$props.scrollbar;
          if (params) { Utils.extend(newParams, params); }
          if (pagination && !newParams.pagination.el) { newParams.pagination.el = self.refs.paginationEl; }

          if (navigation && !newParams.navigation.nextEl && !newParams.navigation.prevEl) {
            newParams.navigation.nextEl = self.refs.nextEl;
            newParams.navigation.prevEl = self.refs.prevEl;
          }

          if (scrollbar && !newParams.scrollbar.el) { newParams.scrollbar.el = self.refs.scrollbarEl; }
          self.swiper = f7.swiper.create(self.refs.el, newParams);
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var self = this;

        if (!self.initialUpdate) {
          self.initialUpdate = true;
          return;
        }

        if (self.swiper && self.swiper.update) { self.swiper.update(); }
      }
    }, {
      key: "paginationComputed",
      get: function get() {
        var self = this;
        var _self$props2 = self.props,
            pagination = _self$props2.pagination,
            params = _self$props2.params;

        if (pagination === true || params && params.pagination && !params.pagination.el) {
          return true;
        }

        return false;
      }
    }, {
      key: "scrollbarComputed",
      get: function get() {
        var self = this;
        var _self$props3 = self.props,
            scrollbar = _self$props3.scrollbar,
            params = _self$props3.params;

        if (scrollbar === true || params && params.scrollbar && !params.scrollbar.el) {
          return true;
        }

        return false;
      }
    }, {
      key: "navigationComputed",
      get: function get() {
        var self = this;
        var _self$props4 = self.props,
            navigation = _self$props4.navigation,
            params = _self$props4.params;

        if (navigation === true || params && params.navigation && !params.navigation.nextEl && !params.navigation.prevEl) {
          return true;
        }

        return false;
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

    return F7Swiper;
  }(React.Component);

  __reactComponentSetProps(F7Swiper, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    params: Object,
    pagination: Boolean,
    scrollbar: Boolean,
    navigation: Boolean,
    init: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps));

  F7Swiper.displayName = 'f7-swiper';

  function _typeof$1k(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1k = function _typeof(obj) { return typeof obj; }; } else { _typeof$1k = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1k(obj); }

  function _classCallCheck$1k(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1k(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1k(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1k(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1k(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1k(self, call) { if (call && (_typeof$1k(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1k(self); }

  function _getPrototypeOf$1k(o) { _getPrototypeOf$1k = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1k(o); }

  function _assertThisInitialized$1k(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$1k(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1k(subClass, superClass); } }

  function _setPrototypeOf$1k(o, p) { _setPrototypeOf$1k = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1k(o, p); }

  var F7Tab =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1k(F7Tab, _React$Component);

    function F7Tab(props, context) {
      var _this;

      _classCallCheck$1k(this, F7Tab);

      _this = _possibleConstructorReturn$1k(this, _getPrototypeOf$1k(F7Tab).call(this, props, context));
      _this.__reactRefs = {};

      _this.state = function () {
        return {
          tabContent: null
        };
      }();

      (function () {
        Utils.bindMethods(_assertThisInitialized$1k(_this), ['onTabShow', 'onTabHide']);
      })();

      return _this;
    }

    _createClass$1k(F7Tab, [{
      key: "show",
      value: function show(animate) {
        if (!this.$f7) { return; }
        this.$f7.tab.show(this.refs.el, animate);
      }
    }, {
      key: "onTabShow",
      value: function onTabShow(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('tab:show tabShow');
      }
    }, {
      key: "onTabHide",
      value: function onTabHide(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('tab:hide tabHide');
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var tabActive = props.tabActive,
            id = props.id,
            className = props.className,
            style = props.style;
        var tabContent = self.state.tabContent;
        var classes = Utils.classNames(className, 'tab', {
          'tab-active': tabActive
        }, Mixins.colorClasses(props));
        var TabContent;
        if (tabContent) { TabContent = tabContent.component; }
        {
          return React.createElement('div', {
            id: id,
            style: style,
            ref: function ref(__reactNode) {
              _this2.__reactRefs['el'] = __reactNode;
            },
            className: classes
          }, tabContent ? React.createElement(TabContent, Object.assign({
            key: tabContent.id
          }, tabContent.props)) : this.slots['default']);
        }
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        self.setState({
          tabContent: null
        });
        self.$f7ready(function () {
          self.$f7.on('tabShow', self.onTabShow);
          self.$f7.on('tabHide', self.onTabHide);
          self.eventTargetEl = el;
          self.routerData = {
            el: el,
            component: self,
            setTabContent: function setTabContent(tabContent) {
              self.setState({
                tabContent: tabContent
              });
            }
          };
          f7.routers.tabs.push(self.routerData);
        });
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;

        if (self.$f7) {
          self.$f7.off('tabShow', self.onTabShow);
          self.$f7.off('tabHide', self.onTabHide);
        }

        if (!self.routerData) { return; }
        f7.routers.tabs.splice(f7.routers.tabs.indexOf(self.routerData), 1);
        self.routerData = null;
        self.eventTargetEl = null;
        delete self.routerData;
        delete self.eventTargetEl;
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var self = this;
        if (!self.routerData) { return; }
        f7.events.emit('tabRouterDidUpdate', self.routerData);
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7Tab;
  }(React.Component);

  __reactComponentSetProps(F7Tab, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    tabActive: Boolean
  }, Mixins.colorProps));

  F7Tab.displayName = 'f7-tab';

  function _typeof$1l(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1l = function _typeof(obj) { return typeof obj; }; } else { _typeof$1l = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1l(obj); }

  function _classCallCheck$1l(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1l(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1l(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1l(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1l(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1l(self, call) { if (call && (_typeof$1l(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1l(self); }

  function _assertThisInitialized$1l(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$1l(o) { _getPrototypeOf$1l = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1l(o); }

  function _inherits$1l(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1l(subClass, superClass); } }

  function _setPrototypeOf$1l(o, p) { _setPrototypeOf$1l = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1l(o, p); }

  var F7Tabs =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1l(F7Tabs, _React$Component);

    function F7Tabs(props, context) {
      var _this;

      _classCallCheck$1l(this, F7Tabs);

      _this = _possibleConstructorReturn$1l(this, _getPrototypeOf$1l(F7Tabs).call(this, props, context));
      _this.__reactRefs = {};
      return _this;
    }

    _createClass$1l(F7Tabs, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var animated = props.animated,
            swipeable = props.swipeable,
            id = props.id,
            style = props.style,
            className = props.className,
            routable = props.routable;
        var classes = Utils.classNames(className, Mixins.colorClasses(props));
        var wrapClasses = Utils.classNames({
          'tabs-animated-wrap': animated,
          'tabs-swipeable-wrap': swipeable
        });
        var tabsClasses = Utils.classNames({
          tabs: true,
          'tabs-routable': routable
        });

        if (animated || swipeable) {
          return React.createElement('div', {
            id: id,
            style: style,
            className: Utils.classNames(wrapClasses, classes),
            ref: function ref(__reactNode) {
              _this2.__reactRefs['wrapEl'] = __reactNode;
            }
          }, React.createElement('div', {
            className: tabsClasses
          }, this.slots['default']));
        }

        return React.createElement('div', {
          id: id,
          style: style,
          className: Utils.classNames(tabsClasses, classes)
        }, this.slots['default']);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var _self$props = self.props,
            swipeable = _self$props.swipeable,
            swiperParams = _self$props.swiperParams;
        if (!swipeable || !swiperParams) { return; }
        var wrapEl = self.refs.wrapEl;
        if (!wrapEl) { return; }
        wrapEl.f7SwiperParams = swiperParams;
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

    return F7Tabs;
  }(React.Component);

  __reactComponentSetProps(F7Tabs, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    animated: Boolean,
    swipeable: Boolean,
    routable: Boolean,
    swiperParams: {
      type: Object,
      default: undefined
    }
  }, Mixins.colorProps));

  F7Tabs.displayName = 'f7-tabs';

  function _typeof$1m(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1m = function _typeof(obj) { return typeof obj; }; } else { _typeof$1m = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1m(obj); }

  function _classCallCheck$1m(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1m(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1m(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1m(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1m(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1m(self, call) { if (call && (_typeof$1m(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1m(self); }

  function _getPrototypeOf$1m(o) { _getPrototypeOf$1m = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1m(o); }

  function _assertThisInitialized$1m(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$1m(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1m(subClass, superClass); } }

  function _setPrototypeOf$1m(o, p) { _setPrototypeOf$1m = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1m(o, p); }

  var F7Toolbar =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1m(F7Toolbar, _React$Component);

    function F7Toolbar(props, context) {
      var _this;

      _classCallCheck$1m(this, F7Toolbar);

      _this = _possibleConstructorReturn$1m(this, _getPrototypeOf$1m(F7Toolbar).call(this, props, context));
      _this.__reactRefs = {};

      _this.state = function () {
        var self = _assertThisInitialized$1m(_this);

        var $f7 = self.$f7;

        if (!$f7) {
          self.$f7ready(function () {
            self.setState({
              _theme: self.$theme
            });
          });
        }

        return {
          _theme: $f7 ? self.$theme : null
        };
      }();

      (function () {
        Utils.bindMethods(_assertThisInitialized$1m(_this), ['onHide', 'onShow']);
      })();

      return _this;
    }

    _createClass$1m(F7Toolbar, [{
      key: "onHide",
      value: function onHide(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.dispatchEvent('toolbar:hide toolbarHide');
      }
    }, {
      key: "onShow",
      value: function onShow(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.dispatchEvent('toolbar:show toolbarShow');
      }
    }, {
      key: "hide",
      value: function hide(animate) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.toolbar.hide(this.refs.el, animate);
      }
    }, {
      key: "show",
      value: function show(animate) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.toolbar.show(this.refs.el, animate);
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var id = props.id,
            style = props.style,
            className = props.className,
            inner = props.inner,
            tabbar = props.tabbar,
            labels = props.labels,
            scrollable = props.scrollable,
            hidden = props.hidden,
            noShadow = props.noShadow,
            noHairline = props.noHairline,
            noBorder = props.noBorder,
            topMd = props.topMd,
            topIos = props.topIos,
            topAurora = props.topAurora,
            top = props.top,
            bottomMd = props.bottomMd,
            bottomIos = props.bottomIos,
            bottomAurora = props.bottomAurora,
            bottom = props.bottom,
            position = props.position;
        var theme = self.state._theme;
        var classes = Utils.classNames(className, 'toolbar', {
          tabbar: tabbar,
          'toolbar-bottom': theme && theme.md && bottomMd || theme && theme.ios && bottomIos || theme && theme.aurora && bottomAurora || bottom || position === 'bottom',
          'toolbar-top': theme && theme.md && topMd || theme && theme.ios && topIos || theme && theme.aurora && topAurora || top || position === 'top',
          'tabbar-labels': labels,
          'tabbar-scrollable': scrollable,
          'toolbar-hidden': hidden,
          'no-shadow': noShadow,
          'no-hairline': noHairline || noBorder
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          className: classes
        }, this.slots['before-inner'], inner ? React.createElement('div', {
          className: 'toolbar-inner'
        }, this.slots['default']) : this.slots['default'], this.slots['after-inner']);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;
        var el = self.refs.el;
        if (!el || !self.$f7) { return; }
        var f7 = self.$f7;
        f7.off('toolbarShow', self.onShow);
        f7.off('toolbarHide', self.onHide);
        self.eventTargetEl = null;
        delete self.eventTargetEl;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        if (!el) { return; }
        self.$f7ready(function (f7) {
          self.eventTargetEl = el;
          if (self.props.tabbar) { f7.toolbar.setHighlight(el); }
          f7.on('toolbarShow', self.onShow);
          f7.on('toolbarHide', self.onHide);
        });
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var self = this;

        if (self.props.tabbar && self.$f7) {
          self.$f7.toolbar.setHighlight(self.refs.el);
        }
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7Toolbar;
  }(React.Component);

  __reactComponentSetProps(F7Toolbar, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    tabbar: Boolean,
    labels: Boolean,
    scrollable: Boolean,
    hidden: Boolean,
    noShadow: Boolean,
    noHairline: Boolean,
    noBorder: Boolean,
    position: {
      type: String,
      default: undefined
    },
    topMd: {
      type: Boolean,
      default: undefined
    },
    topIos: {
      type: Boolean,
      default: undefined
    },
    topAurora: {
      type: Boolean,
      default: undefined
    },
    top: {
      type: Boolean,
      default: undefined
    },
    bottomMd: {
      type: Boolean,
      default: undefined
    },
    bottomIos: {
      type: Boolean,
      default: undefined
    },
    bottomAurora: {
      type: Boolean,
      default: undefined
    },
    bottom: {
      type: Boolean,
      default: undefined
    },
    inner: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps));

  F7Toolbar.displayName = 'f7-toolbar';

  function _typeof$1n(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1n = function _typeof(obj) { return typeof obj; }; } else { _typeof$1n = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1n(obj); }

  function _classCallCheck$1n(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1n(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1n(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1n(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1n(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1n(self, call) { if (call && (_typeof$1n(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1n(self); }

  function _getPrototypeOf$1n(o) { _getPrototypeOf$1n = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1n(o); }

  function _assertThisInitialized$1n(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$1n(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1n(subClass, superClass); } }

  function _setPrototypeOf$1n(o, p) { _setPrototypeOf$1n = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1n(o, p); }

  var F7TreeviewItem =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1n(F7TreeviewItem, _React$Component);

    function F7TreeviewItem(props, context) {
      var _this;

      _classCallCheck$1n(this, F7TreeviewItem);

      _this = _possibleConstructorReturn$1n(this, _getPrototypeOf$1n(F7TreeviewItem).call(this, props, context));
      _this.__reactRefs = {};

      (function () {
        Utils.bindMethods(_assertThisInitialized$1n(_this), ['onClick', 'onOpen', 'onClose', 'onLoadChildren']);
      })();

      return _this;
    }

    _createClass$1n(F7TreeviewItem, [{
      key: "onClick",
      value: function onClick(event) {
        this.dispatchEvent('click', event);
      }
    }, {
      key: "onOpen",
      value: function onOpen(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('treeview:open treeviewOpen', el);
      }
    }, {
      key: "onClose",
      value: function onClose(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('treeview:close treeviewClose', el);
      }
    }, {
      key: "onLoadChildren",
      value: function onLoadChildren(el, done) {
        if (this.eventTargetEl !== el) { return; }
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
        if (!el || self.$f7) { return; }
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
        if (!el) { return; }
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
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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
        if (link === true) { href = '#'; }
        if (link === false) { href = undefined; }
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

  function _typeof$1o(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1o = function _typeof(obj) { return typeof obj; }; } else { _typeof$1o = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1o(obj); }

  function _classCallCheck$1o(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1o(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1o(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1o(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1o(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1o(self, call) { if (call && (_typeof$1o(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1o(self); }

  function _assertThisInitialized$1o(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$1o(o) { _getPrototypeOf$1o = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1o(o); }

  function _inherits$1o(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1o(subClass, superClass); } }

  function _setPrototypeOf$1o(o, p) { _setPrototypeOf$1o = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1o(o, p); }

  var F7Treeview =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1o(F7Treeview, _React$Component);

    function F7Treeview(props, context) {
      _classCallCheck$1o(this, F7Treeview);

      return _possibleConstructorReturn$1o(this, _getPrototypeOf$1o(F7Treeview).call(this, props, context));
    }

    _createClass$1o(F7Treeview, [{
      key: "render",
      value: function render() {
        var props = this.props;
        var className = props.className,
            id = props.id,
            style = props.style;
        var classes = Utils.classNames(className, 'treeview', Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7Treeview;
  }(React.Component);

  __reactComponentSetProps(F7Treeview, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7Treeview.displayName = 'f7-treeview';

  function _typeof$1p(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1p = function _typeof(obj) { return typeof obj; }; } else { _typeof$1p = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1p(obj); }

  function _classCallCheck$1p(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1p(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1p(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1p(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1p(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1p(self, call) { if (call && (_typeof$1p(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1p(self); }

  function _getPrototypeOf$1p(o) { _getPrototypeOf$1p = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1p(o); }

  function _assertThisInitialized$1p(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits$1p(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1p(subClass, superClass); } }

  function _setPrototypeOf$1p(o, p) { _setPrototypeOf$1p = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1p(o, p); }

  var F7View =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1p(F7View, _React$Component);

    function F7View(props, context) {
      var _this;

      _classCallCheck$1p(this, F7View);

      _this = _possibleConstructorReturn$1p(this, _getPrototypeOf$1p(F7View).call(this, props, context));
      _this.__reactRefs = {};

      _this.state = function () {
        return {
          pages: []
        };
      }();

      (function () {
        var self = _assertThisInitialized$1p(_this);

        Utils.bindMethods(self, ['onSwipeBackMove', 'onSwipeBackBeforeChange', 'onSwipeBackAfterChange', 'onSwipeBackBeforeReset', 'onSwipeBackAfterReset', 'onTabShow', 'onTabHide', 'onViewInit']);
      })();

      return _this;
    }

    _createClass$1p(F7View, [{
      key: "onViewInit",
      value: function onViewInit(view) {
        var self = this;
        self.dispatchEvent('view:init viewInit', view);

        if (!self.props.init) {
          self.routerData.instance = view;
          self.f7View = self.routerData.instance;
        }
      }
    }, {
      key: "onSwipeBackMove",
      value: function onSwipeBackMove(data) {
        var swipeBackData = data;
        this.dispatchEvent('swipeback:move swipeBackMove', swipeBackData);
      }
    }, {
      key: "onSwipeBackBeforeChange",
      value: function onSwipeBackBeforeChange(data) {
        var swipeBackData = data;
        this.dispatchEvent('swipeback:beforechange swipeBackBeforeChange', swipeBackData);
      }
    }, {
      key: "onSwipeBackAfterChange",
      value: function onSwipeBackAfterChange(data) {
        var swipeBackData = data;
        this.dispatchEvent('swipeback:afterchange swipeBackAfterChange', swipeBackData);
      }
    }, {
      key: "onSwipeBackBeforeReset",
      value: function onSwipeBackBeforeReset(data) {
        var swipeBackData = data;
        this.dispatchEvent('swipeback:beforereset swipeBackBeforeReset', swipeBackData);
      }
    }, {
      key: "onSwipeBackAfterReset",
      value: function onSwipeBackAfterReset(data) {
        var swipeBackData = data;
        this.dispatchEvent('swipeback:afterreset swipeBackAfterReset', swipeBackData);
      }
    }, {
      key: "onTabShow",
      value: function onTabShow(el) {
        if (el === this.refs.el) {
          this.dispatchEvent('tab:show tabShow');
        }
      }
    }, {
      key: "onTabHide",
      value: function onTabHide(el) {
        if (el === this.refs.el) {
          this.dispatchEvent('tab:hide tabHide');
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        var self = this;
        var props = self.props;
        var id = props.id,
            style = props.style,
            tab = props.tab,
            main = props.main,
            tabActive = props.tabActive,
            className = props.className;
        var classes = Utils.classNames(className, 'view', {
          'view-main': main,
          'tab-active': tabActive,
          tab: tab
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          ref: function ref(__reactNode) {
            _this2.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes
        }, this.slots['default'], self.state.pages.map(function (page) {
          var PageComponent = page.component;
          {
            return React.createElement(PageComponent, Object.assign({
              key: page.id
            }, page.props));
          }
        }));
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var self = this;
        if (!self.routerData) { return; }
        f7.events.emit('viewRouterDidUpdate', self.routerData);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var self = this;

        if (f7.instance) {
          f7.instance.off('tabShow', self.onTabShow);
          f7.instance.off('tabHide', self.onTabHide);
        }

        if (self.f7View) {
          self.f7View.off('swipebackMove', self.onSwipeBackMove);
          self.f7View.off('swipebackBeforeChange', self.onSwipeBackBeforeChange);
          self.f7View.off('swipebackAfterChange', self.onSwipeBackAfterChange);
          self.f7View.off('swipebackBeforeReset', self.onSwipeBackBeforeReset);
          self.f7View.off('swipebackAfterReset', self.onSwipeBackAfterReset);
          if (self.f7View.destroy) { self.f7View.destroy(); }
        }

        f7.routers.views.splice(f7.routers.views.indexOf(self.routerData), 1);
        self.routerData = null;
        delete self.routerData;
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        var self = this;
        var el = self.refs.el;
        self.$f7ready(function (f7Instance) {
          f7Instance.on('tabShow', self.onTabShow);
          f7Instance.on('tabHide', self.onTabHide);
          self.routerData = {
            el: el,
            component: self,
            pages: self.state.pages,
            instance: null,
            setPages: function setPages(pages) {
              self.setState({
                pages: pages
              });
            }
          };
          f7.routers.views.push(self.routerData);
          if (!self.props.init) { return; }
          self.routerData.instance = f7Instance.views.create(el, Object.assign({
            on: {
              init: self.onViewInit
            }
          }, Utils.noUndefinedProps(self.props)));
          self.f7View = self.routerData.instance;
          self.f7View.on('swipebackMove', self.onSwipeBackMove);
          self.f7View.on('swipebackBeforeChange', self.onSwipeBackBeforeChange);
          self.f7View.on('swipebackAfterChange', self.onSwipeBackAfterChange);
          self.f7View.on('swipebackBeforeReset', self.onSwipeBackBeforeReset);
          self.f7View.on('swipebackAfterReset', self.onSwipeBackAfterReset);
        });
      }
    }, {
      key: "dispatchEvent",
      value: function dispatchEvent(events) {
        var arguments$1 = arguments;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments$1[_key];
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

    return F7View;
  }(React.Component);

  __reactComponentSetProps(F7View, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    tab: Boolean,
    tabActive: Boolean,
    name: String,
    router: Boolean,
    linksView: [Object, String],
    url: String,
    main: Boolean,
    stackPages: Boolean,
    xhrCache: Boolean,
    xhrCacheIgnore: Array,
    xhrCacheIgnoreGetParameters: Boolean,
    xhrCacheDuration: Number,
    preloadPreviousPage: Boolean,
    allowDuplicateUrls: Boolean,
    reloadPages: Boolean,
    reloadDetail: Boolean,
    masterDetailBreakpoint: Number,
    removeElements: Boolean,
    removeElementsWithTimeout: Boolean,
    removeElementsTimeout: Number,
    restoreScrollTopOnBack: Boolean,
    loadInitialPage: Boolean,
    iosSwipeBack: Boolean,
    iosSwipeBackAnimateShadow: Boolean,
    iosSwipeBackAnimateOpacity: Boolean,
    iosSwipeBackActiveArea: Number,
    iosSwipeBackThreshold: Number,
    mdSwipeBack: Boolean,
    mdSwipeBackAnimateShadow: Boolean,
    mdSwipeBackAnimateOpacity: Boolean,
    mdSwipeBackActiveArea: Number,
    mdSwipeBackThreshold: Number,
    auroraSwipeBack: Boolean,
    auroraSwipeBackAnimateShadow: Boolean,
    auroraSwipeBackAnimateOpacity: Boolean,
    auroraSwipeBackActiveArea: Number,
    auroraSwipeBackThreshold: Number,
    pushState: Boolean,
    pushStateRoot: String,
    pushStateAnimate: Boolean,
    pushStateAnimateOnLoad: Boolean,
    pushStateSeparator: String,
    pushStateOnLoad: Boolean,
    animate: Boolean,
    transition: String,
    iosDynamicNavbar: Boolean,
    iosAnimateNavbarBackIcon: Boolean,
    materialPageLoadDelay: Number,
    passRouteQueryToRequest: Boolean,
    passRouteParamsToRequest: Boolean,
    routes: Array,
    routesAdd: Array,
    routesBeforeEnter: [Function, Array],
    routesBeforeLeave: [Function, Array],
    init: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps));

  F7View.displayName = 'f7-view';

  function _typeof$1q(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1q = function _typeof(obj) { return typeof obj; }; } else { _typeof$1q = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1q(obj); }

  function _classCallCheck$1q(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties$1q(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass$1q(Constructor, protoProps, staticProps) { if (protoProps) { _defineProperties$1q(Constructor.prototype, protoProps); } if (staticProps) { _defineProperties$1q(Constructor, staticProps); } return Constructor; }

  function _possibleConstructorReturn$1q(self, call) { if (call && (_typeof$1q(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized$1q(self); }

  function _assertThisInitialized$1q(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf$1q(o) { _getPrototypeOf$1q = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf$1q(o); }

  function _inherits$1q(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) { _setPrototypeOf$1q(subClass, superClass); } }

  function _setPrototypeOf$1q(o, p) { _setPrototypeOf$1q = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf$1q(o, p); }

  var F7Views =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits$1q(F7Views, _React$Component);

    function F7Views(props, context) {
      _classCallCheck$1q(this, F7Views);

      return _possibleConstructorReturn$1q(this, _getPrototypeOf$1q(F7Views).call(this, props, context));
    }

    _createClass$1q(F7Views, [{
      key: "render",
      value: function render() {
        var self = this;
        var props = self.props;
        var className = props.className,
            id = props.id,
            style = props.style,
            tabs = props.tabs;
        var classes = Utils.classNames(className, 'views', {
          tabs: tabs
        }, Mixins.colorClasses(props));
        return React.createElement('div', {
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }
    }, {
      key: "slots",
      get: function get() {
        return __reactComponentSlots(this.props);
      }
    }]);

    return F7Views;
  }(React.Component);

  __reactComponentSetProps(F7Views, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    tabs: Boolean
  }, Mixins.colorProps));

  F7Views.displayName = 'f7-views';

  /* eslint no-underscore-dangle: "off" */

  var routerComponentIdCounter = 0;

  var componentsRouter = {
    proto: {
      pageComponentLoader: function pageComponentLoader(routerEl, component, componentUrl, options, resolve, reject) {
        var router = this;
        var el = routerEl;
        var viewRouter;
        f7.routers.views.forEach(function (data) {
          if (data.el && data.el === routerEl) {
            viewRouter = data;
          }
        });

        if (!viewRouter) {
          reject();
          return;
        }

        var id = (Utils.now()) + "_" + ((routerComponentIdCounter += 1));
        var pageData = {
          component: component,
          id: id,
          props: Utils.extend(
            {
              f7route: options.route,
              $f7route: options.route,
              f7router: router,
              $f7router: router,
            },
            options.route.params,
            options.props || {}
          ),
        };
        if (viewRouter.component) {
          viewRouter.component.$f7router = router;
          viewRouter.component.$f7route = options.route;
        }

        var resolved;
        function onDidUpdate(componentRouterData) {
          if (componentRouterData !== viewRouter || resolved) { return; }
          f7.events.off('viewRouterDidUpdate', onDidUpdate);

          var pageEl = el.children[el.children.length - 1];
          pageData.el = pageEl;

          resolve(pageEl);
          resolved = true;
        }

        f7.events.on('viewRouterDidUpdate', onDidUpdate);

        viewRouter.pages.push(pageData);
        viewRouter.setPages(viewRouter.pages);
      },
      removePage: function removePage($pageEl) {
        if (!$pageEl) { return; }
        var router = this;
        var f7Page;
        if ('length' in $pageEl) { f7Page = $pageEl[0].f7Page; }
        else { f7Page = $pageEl.f7Page; }
        if (f7Page && f7Page.route && f7Page.route.route && f7Page.route.route.keepAlive) {
          router.app.$($pageEl).remove();
          return;
        }
        var viewRouter;
        f7.routers.views.forEach(function (data) {
          if (data.el && data.el === router.el) {
            viewRouter = data;
          }
        });

        var pageEl;
        if ('length' in $pageEl) {
          // Dom7
          if ($pageEl.length === 0) { return; }
          pageEl = $pageEl[0];
        } else {
          pageEl = $pageEl;
        }
        if (!pageEl) { return; }

        var pageComponentFound;
        viewRouter.pages.forEach(function (page, index) {
          if (page.el === pageEl) {
            pageComponentFound = true;
            viewRouter.pages.splice(index, 1);
            viewRouter.setPages(viewRouter.pages);
          }
        });
        if (!pageComponentFound) {
          pageEl.parentNode.removeChild(pageEl);
        }
      },
      tabComponentLoader: function tabComponentLoader(tabEl, component, componentUrl, options, resolve, reject) {
        var router = this;
        if (!tabEl) { reject(); }

        var tabRouter;
        f7.routers.tabs.forEach(function (tabData) {
          if (tabData.el && tabData.el === tabEl) {
            tabRouter = tabData;
          }
        });
        if (!tabRouter) {
          reject();
          return;
        }

        var id = (Utils.now()) + "_" + ((routerComponentIdCounter += 1));
        var tabContent = {
          id: id,
          component: component,
          props: Utils.extend(
            {
              f7route: options.route,
              $f7route: options.route,
              f7router: router,
              $f7router: router,
            },
            options.route.params,
            options.props || {}
          ),
        };

        if (tabRouter.component) {
          tabRouter.component.$f7router = router;
          tabRouter.component.$f7route = options.route;
        }

        var resolved;
        function onDidUpdate(componentRouterData) {
          if (componentRouterData !== tabRouter || resolved) { return; }
          f7.events.off('tabRouterDidUpdate', onDidUpdate);

          var tabContentEl = tabEl.children[0];
          resolve(tabContentEl);

          resolved = true;
        }

        f7.events.on('tabRouterDidUpdate', onDidUpdate);

        tabRouter.setTabContent(tabContent);
      },
      removeTabContent: function removeTabContent(tabEl) {
        if (!tabEl) { return; }

        var tabRouter;
        f7.routers.tabs.forEach(function (tabData) {
          if (tabData.el && tabData.el === tabEl) {
            tabRouter = tabData;
          }
        });
        var hasComponent = tabRouter && tabRouter.component;
        if (!tabRouter || !hasComponent) {
          tabEl.innerHTML = ''; // eslint-disable-line
          return;
        }
        tabRouter.setTabContent(null);
      },
      modalComponentLoader: function modalComponentLoader(rootEl, component, componentUrl, options, resolve, reject) {
        var router = this;
        var modalsRouter = f7.routers.modals;

        if (!modalsRouter) {
          reject();
          return;
        }

        var id = (Utils.now()) + "_" + ((routerComponentIdCounter += 1));
        var modalData = {
          component: component,
          id: id,
          props: Utils.extend(
            {
              f7route: options.route,
              $f7route: options.route,
              f7router: router,
              $f7router: router,
            },
            options.route.params,
            options.props || {}
          ),
        };
        if (modalsRouter.component) {
          modalsRouter.component.$f7router = router;
          modalsRouter.component.$f7route = options.route;
        }

        var resolved;
        function onDidUpdate() {
          if (resolved) { return; }
          f7.events.off('modalsRouterDidUpdate', onDidUpdate);

          var modalEl = modalsRouter.el.children[modalsRouter.el.children.length - 1];
          modalData.el = modalEl;

          resolve(modalEl);
          resolved = true;
        }

        f7.events.on('modalsRouterDidUpdate', onDidUpdate);

        modalsRouter.modals.push(modalData);
        modalsRouter.setModals(modalsRouter.modals);
      },
      removeModal: function removeModal(modalEl) {
        var modalsRouter = f7.routers.modals;
        if (!modalsRouter) { return; }

        var modalDataToRemove;
        modalsRouter.modals.forEach(function (modalData) {
          if (modalData.el === modalEl) { modalDataToRemove = modalData; }
        });

        modalsRouter.modals.splice(modalsRouter.modals.indexOf(modalDataToRemove), 1);
        modalsRouter.setModals(modalsRouter.modals);
      },
    },
  };

  /**
   * Framework7 React 5.0.5
   * Build full featured iOS & Android apps using Framework7 & React
   * http://framework7.io/react/
   *
   * Copyright 2014-2019 Vladimir Kharlampidi
   *
   * Released under the MIT License
   *
   * Released on: October 16, 2019
   */

  function f7ready(callback) {
    f7.ready(callback);
  }

  var f7Theme = {};

  var Plugin = {
    name: 'phenomePlugin',
    installed: false,
    install: function install(params) {
      if ( params === void 0 ) params = {};

      if (Plugin.installed) { return; }
      Plugin.installed = true;

      var Framework7 = this;
      f7.Framework7 = Framework7;
      f7.events = new Framework7.Events();

      var Extend = params.React ? params.React.Component : React.Component; // eslint-disable-line

      window.AccordionContent = F7AccordionContent;
      window.AccordionItem = F7AccordionItem;
      window.AccordionToggle = F7AccordionToggle;
      window.Accordion = F7Accordion;
      window.ActionsButton = F7ActionsButton;
      window.ActionsGroup = F7ActionsGroup;
      window.ActionsLabel = F7ActionsLabel;
      window.Actions = F7Actions;
      window.App = F7App;
      window.Appbar = F7Appbar;
      window.Badge = F7Badge;
      window.BlockFooter = F7BlockFooter;
      window.BlockHeader = F7BlockHeader;
      window.BlockTitle = F7BlockTitle;
      window.Block = F7Block;
      window.Button = F7Button;
      window.CardContent = F7CardContent;
      window.CardFooter = F7CardFooter;
      window.CardHeader = F7CardHeader;
      window.Card = F7Card;
      window.Checkbox = F7Checkbox;
      window.Chip = F7Chip;
      window.Col = F7Col;
      window.FabButton = F7FabButton;
      window.FabButtons = F7FabButtons;
      window.Fab = F7Fab;
      window.Gauge = F7Gauge;
      window.Icon = F7Icon;
      window.Input = F7Input;
      window.Link = F7Link;
      window.ListButton = F7ListButton;
      window.ListGroup = F7ListGroup;
      window.ListIndex = F7ListIndex;
      window.ListInput = F7ListInput;
      window.ListItemCell = F7ListItemCell;
      window.ListItemContent = F7ListItemContent;
      window.ListItemRow = F7ListItemRow;
      window.ListItem = F7ListItem;
      window.List = F7List;
      window.LoginScreenTitle = F7LoginScreenTitle;
      window.LoginScreen = F7LoginScreen;
      window.MenuDropdownItem = F7MenuDropdownItem;
      window.MenuDropdown = F7MenuDropdown;
      window.MenuItem = F7MenuItem;
      window.Menu = F7Menu;
      window.Message = F7Message;
      window.MessagebarAttachment = F7MessagebarAttachment;
      window.MessagebarAttachments = F7MessagebarAttachments;
      window.MessagebarSheetImage = F7MessagebarSheetImage;
      window.MessagebarSheetItem = F7MessagebarSheetItem;
      window.MessagebarSheet = F7MessagebarSheet;
      window.Messagebar = F7Messagebar;
      window.MessagesTitle = F7MessagesTitle;
      window.Messages = F7Messages;
      window.NavLeft = F7NavLeft;
      window.NavRight = F7NavRight;
      window.NavTitleLarge = F7NavTitle;
      window.NavTitle = F7NavTitle$1;
      window.Navbar = F7Navbar;
      window.PageContent = F7PageContent;
      window.Page = F7Page;
      window.Panel = F7Panel;
      window.PhotoBrowser = F7PhotoBrowser;
      window.Popover = F7Popover;
      window.Popup = F7Popup;
      window.Preloader = F7Preloader;
      window.Progressbar = F7Progressbar;
      window.Radio = F7Radio;
      window.Range = F7Range;
      window.RoutableModals = F7RoutableModals;
      window.Row = F7Row;
      window.Searchbar = F7Searchbar;
      window.Segmented = F7Segmented;
      window.Sheet = F7Sheet;
      window.SkeletonBlock = F7SkeletonBlock;
      window.SkeletonText = F7SkeletonText;
      window.Stepper = F7Stepper;
      window.Subnavbar = F7Subnavbar;
      window.SwipeoutActions = F7SwipeoutActions;
      window.SwipeoutButton = F7SwipeoutButton;
      window.SwiperSlide = F7SwiperSlide;
      window.Swiper = F7Swiper;
      window.Tab = F7Tab;
      window.Tabs = F7Tabs;
      window.TextEditor = F7TextEditor;
      window.Toggle = F7Toggle;
      window.Toolbar = F7Toolbar;
      window.TreeviewItem = F7TreeviewItem;
      window.Treeview = F7Treeview;
      window.View = F7View;
      window.Views = F7Views;

      // Define protos
      Object.defineProperty(Extend.prototype, '$f7', {
        get: function get() {
          return f7.instance;
        },
      });

      var theme = params.theme;
      if (theme === 'md') { f7Theme.md = true; }
      if (theme === 'ios') { f7Theme.ios = true; }
      if (theme === 'aurora') { f7Theme.aurora = true; }
      if (!theme || theme === 'auto') {
        f7Theme.ios = !!Framework7.device.ios;
        f7Theme.aurora = Framework7.device.desktop && Framework7.device.electron;
        f7Theme.md = !f7Theme.ios && !f7Theme.aurora;
      }
      f7.ready(function () {
        f7Theme.ios = f7.instance.theme === 'ios';
        f7Theme.md = f7.instance.theme === 'md';
        f7Theme.aurora = f7.instance.theme === 'aurora';
      });
      Object.defineProperty(Extend.prototype, '$theme', {
        get: function get() {
          return {
            ios: f7.instance ? f7.instance.theme === 'ios' : f7Theme.ios,
            md: f7.instance ? f7.instance.theme === 'md' : f7Theme.md,
            aurora: f7.instance ? f7.instance.theme === 'aurora' : f7Theme.aurora,
          };
        },
      });


      Extend.prototype.Dom7 = Framework7.$;
      Extend.prototype.$$ = Framework7.$;
      Extend.prototype.$device = Framework7.device;
      Extend.prototype.$request = Framework7.request;
      Extend.prototype.$utils = Framework7.utils;
      Extend.prototype.$f7ready = f7ready;

      Object.defineProperty(Extend.prototype, '$f7route', {
        get: function get() {
          var self = this;
          if (self.props && self.props.f7route) { return self.props.f7route; }
          if (self.f7route) { return self.f7route; }
          if (self._f7route) { return self._f7route; }

          var route;
          return route;
        },
        set: function set(value) {
          var self = this;
          self._f7route = value;
        },
      });
      Object.defineProperty(Extend.prototype, '$f7router', {
        get: function get() {
          var self = this;
          if (self.props && self.props.f7router) { return self.props.f7router; }
          if (self.f7router) { return self.f7router; }
          if (self._f7router) { return self._f7router; }

          var router;
          return router;
        },
        set: function set(value) {
          var self = this;
          self._f7router = value;
        },
      });

      // Extend F7 Router
      Framework7.Router.use(componentsRouter);
    },
  };

  return Plugin;

}));
