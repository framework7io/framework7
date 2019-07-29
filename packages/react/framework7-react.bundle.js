/**
 * Framework7 React 4.4.10
 * Build full featured iOS & Android apps using Framework7 & React
 * http://framework7.io/react/
 *
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: July 29, 2019
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
      iconIon: String,
      iconFa: String,
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

  var F7AccordionContent = /*@__PURE__*/(function (superclass) {
    function F7AccordionContent(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7AccordionContent.__proto__ = superclass;
    F7AccordionContent.prototype = Object.create( superclass && superclass.prototype );
    F7AccordionContent.prototype.constructor = F7AccordionContent;

    var prototypeAccessors = { slots: { configurable: true } };

    F7AccordionContent.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'accordion-item-content', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7AccordionContent.prototype, prototypeAccessors );

    return F7AccordionContent;
  }(React.Component));

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

  var F7AccordionItem = /*@__PURE__*/(function (superclass) {
    function F7AccordionItem(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, 'onBeforeOpen onOpen onOpened onBeforeClose onClose onClosed'.split(' '));
      })();
    }

    if ( superclass ) F7AccordionItem.__proto__ = superclass;
    F7AccordionItem.prototype = Object.create( superclass && superclass.prototype );
    F7AccordionItem.prototype.constructor = F7AccordionItem;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7AccordionItem.prototype.onBeforeOpen = function onBeforeOpen (event) {
      this.dispatchEvent('accordionBeforeOpen accordion:beforeopen', event, event.detail.prevent);
    };

    F7AccordionItem.prototype.onOpen = function onOpen (event) {
      this.dispatchEvent('accordionOpen accordion:open', event);
    };

    F7AccordionItem.prototype.onOpened = function onOpened (event) {
      this.dispatchEvent('accordionOpened accordion:opened', event);
    };

    F7AccordionItem.prototype.onBeforeClose = function onBeforeClose (event) {
      this.dispatchEvent('accordionBeforeClose accordion:beforeclose', event, event.detail.prevent);
    };

    F7AccordionItem.prototype.onClose = function onClose (event) {
      this.dispatchEvent('accordionClose accordion:close', event);
    };

    F7AccordionItem.prototype.onClosed = function onClosed (event) {
      this.dispatchEvent('accordionClosed accordion:closed', event);
    };

    F7AccordionItem.prototype.render = function render () {
      var this$1 = this;

      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var opened = props.opened;
      var classes = Utils.classNames(className, 'accordion-item', {
        'accordion-item-opened': opened
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes,
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        }
      }, this.slots['default']);
    };

    F7AccordionItem.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var el = self.refs.el;
      if (!el) { return; }
      el.removeEventListener('accordion:beforeopen', self.onBeforeOpen);
      el.removeEventListener('accordion:open', self.onOpen);
      el.removeEventListener('accordion:opened', self.onOpened);
      el.removeEventListener('accordion:beforeclose', self.onBeforeClose);
      el.removeEventListener('accordion:close', self.onClose);
      el.removeEventListener('accordion:closed', self.onClosed);
    };

    F7AccordionItem.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      if (!el) { return; }
      el.addEventListener('accordion:beforeopen', self.onBeforeOpen);
      el.addEventListener('accordion:open', self.onOpen);
      el.addEventListener('accordion:opened', self.onOpened);
      el.addEventListener('accordion:beforeclose', self.onBeforeClose);
      el.addEventListener('accordion:close', self.onClose);
      el.addEventListener('accordion:closed', self.onClosed);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7AccordionItem.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7AccordionItem.prototype, prototypeAccessors );

    return F7AccordionItem;
  }(React.Component));

  __reactComponentSetProps(F7AccordionItem, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    opened: Boolean
  }, Mixins.colorProps));

  F7AccordionItem.displayName = 'f7-accordion-item';

  var F7AccordionToggle = /*@__PURE__*/(function (superclass) {
    function F7AccordionToggle(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7AccordionToggle.__proto__ = superclass;
    F7AccordionToggle.prototype = Object.create( superclass && superclass.prototype );
    F7AccordionToggle.prototype.constructor = F7AccordionToggle;

    var prototypeAccessors = { slots: { configurable: true } };

    F7AccordionToggle.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'accordion-item-toggle', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7AccordionToggle.prototype, prototypeAccessors );

    return F7AccordionToggle;
  }(React.Component));

  __reactComponentSetProps(F7AccordionToggle, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7AccordionToggle.displayName = 'f7-accordion-toggle';

  var F7Accordion = /*@__PURE__*/(function (superclass) {
    function F7Accordion(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7Accordion.__proto__ = superclass;
    F7Accordion.prototype = Object.create( superclass && superclass.prototype );
    F7Accordion.prototype.constructor = F7Accordion;

    var prototypeAccessors = { slots: { configurable: true } };

    F7Accordion.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'accordion-list', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7Accordion.prototype, prototypeAccessors );

    return F7Accordion;
  }(React.Component));

  __reactComponentSetProps(F7Accordion, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7Accordion.displayName = 'f7-accordion';

  var F7ActionsButton = /*@__PURE__*/(function (superclass) {
    function F7ActionsButton(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onClick']);
      })();
    }

    if ( superclass ) F7ActionsButton.__proto__ = superclass;
    F7ActionsButton.prototype = Object.create( superclass && superclass.prototype );
    F7ActionsButton.prototype.constructor = F7ActionsButton;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7ActionsButton.prototype.onClick = function onClick (event) {
      var self = this;
      var $$ = self.$$;
      var el = self.refs.el;

      if (self.props.close && self.$f7 && el) {
        self.$f7.actions.close($$(el).parents('.actions-modal'));
      }

      self.dispatchEvent('click', event);
    };

    F7ActionsButton.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var id = props.id;
      var className = props.className;
      var style = props.style;
      var bold = props.bold;
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        }
      }, mediaEl, React.createElement('div', {
        className: 'actions-button-text'
      }, this.slots['default']));
    };

    F7ActionsButton.prototype.componentWillUnmount = function componentWillUnmount () {
      this.refs.el.removeEventListener('click', this.onClick);
    };

    F7ActionsButton.prototype.componentDidMount = function componentDidMount () {
      this.refs.el.addEventListener('click', this.onClick);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7ActionsButton.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7ActionsButton.prototype, prototypeAccessors );

    return F7ActionsButton;
  }(React.Component));

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

  var F7ActionsGroup = /*@__PURE__*/(function (superclass) {
    function F7ActionsGroup(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7ActionsGroup.__proto__ = superclass;
    F7ActionsGroup.prototype = Object.create( superclass && superclass.prototype );
    F7ActionsGroup.prototype.constructor = F7ActionsGroup;

    var prototypeAccessors = { slots: { configurable: true } };

    F7ActionsGroup.prototype.render = function render () {
      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'actions-group', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7ActionsGroup.prototype, prototypeAccessors );

    return F7ActionsGroup;
  }(React.Component));

  __reactComponentSetProps(F7ActionsGroup, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7ActionsGroup.displayName = 'f7-actions-group';

  var F7ActionsLabel = /*@__PURE__*/(function (superclass) {
    function F7ActionsLabel(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onClick']);
      })();
    }

    if ( superclass ) F7ActionsLabel.__proto__ = superclass;
    F7ActionsLabel.prototype = Object.create( superclass && superclass.prototype );
    F7ActionsLabel.prototype.constructor = F7ActionsLabel;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7ActionsLabel.prototype.onClick = function onClick (event) {
      this.dispatchEvent('click', event);
    };

    F7ActionsLabel.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var bold = props.bold;
      var classes = Utils.classNames(className, 'actions-label', {
        'actions-button-bold': bold
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes,
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        }
      }, this.slots['default']);
    };

    F7ActionsLabel.prototype.componentWillUnmount = function componentWillUnmount () {
      this.refs.el.removeEventListener('click', this.onClick);
    };

    F7ActionsLabel.prototype.componentDidMount = function componentDidMount () {
      this.refs.el.addEventListener('click', this.onClick);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7ActionsLabel.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7ActionsLabel.prototype, prototypeAccessors );

    return F7ActionsLabel;
  }(React.Component));

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

  var F7Actions = /*@__PURE__*/(function (superclass) {
    function F7Actions(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onOpen', 'onOpened', 'onClose', 'onClosed']);
      })();
    }

    if ( superclass ) F7Actions.__proto__ = superclass;
    F7Actions.prototype = Object.create( superclass && superclass.prototype );
    F7Actions.prototype.constructor = F7Actions;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Actions.prototype.onOpen = function onOpen (event) {
      this.dispatchEvent('actions:open actionsOpen', event);
    };

    F7Actions.prototype.onOpened = function onOpened (event) {
      this.dispatchEvent('actions:opened actionsOpened', event);
    };

    F7Actions.prototype.onClose = function onClose (event) {
      this.dispatchEvent('actions:close actionsClose', event);
    };

    F7Actions.prototype.onClosed = function onClosed (event) {
      this.dispatchEvent('actions:closed actionsClosed', event);
    };

    F7Actions.prototype.open = function open (animate) {
      var self = this;
      if (!self.$f7) { return undefined; }
      return self.$f7.actions.open(self.refs.el, animate);
    };

    F7Actions.prototype.close = function close (animate) {
      var self = this;
      if (!self.$f7) { return undefined; }
      return self.$f7.actions.close(self.refs.el, animate);
    };

    F7Actions.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var grid = props.grid;
      var classes = Utils.classNames(className, 'actions-modal', {
        'actions-grid': grid
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        className: classes
      }, this.slots['default']);
    };

    F7Actions.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      if (self.f7Actions) { self.f7Actions.destroy(); }
      var el = self.refs.el;
      if (!el) { return; }
      el.removeEventListener('actions:open', self.onOpen);
      el.removeEventListener('actions:opened', self.onOpened);
      el.removeEventListener('actions:close', self.onClose);
      el.removeEventListener('actions:closed', self.onClosed);
    };

    F7Actions.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      if (!el) { return; }
      el.addEventListener('actions:open', self.onOpen);
      el.addEventListener('actions:opened', self.onOpened);
      el.addEventListener('actions:close', self.onClose);
      el.addEventListener('actions:closed', self.onClosed);
      var props = self.props;
      var grid = props.grid;
      var target = props.target;
      var convertToPopover = props.convertToPopover;
      var forceToPopover = props.forceToPopover;
      var opened = props.opened;
      var closeByBackdropClick = props.closeByBackdropClick;
      var closeByOutsideClick = props.closeByOutsideClick;
      var closeOnEscape = props.closeOnEscape;
      var backdrop = props.backdrop;
      var backdropEl = props.backdropEl;
      var actionsParams = {
        el: self.refs.el,
        grid: grid
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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Actions.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    F7Actions.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.opened', prevProps, prevState, function (opened) {
        var self = this$1;
        if (!self.f7Actions) { return; }

        if (opened) {
          self.f7Actions.open();
        } else {
          self.f7Actions.close();
        }
      });
    };

    Object.defineProperties( F7Actions.prototype, prototypeAccessors );

    return F7Actions;
  }(React.Component));

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

  var F7RoutableModals = /*@__PURE__*/(function (superclass) {
    function F7RoutableModals(props, context) {
      superclass.call(this, props, context);
      this.__reactRefs = {};

      this.state = (function () {
        return {
          modals: []
        };
      })();
    }

    if ( superclass ) F7RoutableModals.__proto__ = superclass;
    F7RoutableModals.prototype = Object.create( superclass && superclass.prototype );
    F7RoutableModals.prototype.constructor = F7RoutableModals;

    var prototypeAccessors = { refs: { configurable: true } };

    F7RoutableModals.prototype.render = function render () {
      var this$1 = this;

      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
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
    };

    F7RoutableModals.prototype.componentDidMount = function componentDidMount () {
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
    };

    F7RoutableModals.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      if (!self.routerData) { return; }
      f7.routers.modals = null;
      self.routerData = null;
      delete self.routerData;
    };

    F7RoutableModals.prototype.componentDidUpdate = function componentDidUpdate () {
      var self = this;
      if (!self.routerData) { return; }
      f7.events.emit('modalsRouterDidUpdate', self.routerData);
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7RoutableModals.prototype, prototypeAccessors );

    return F7RoutableModals;
  }(React.Component));

  F7RoutableModals.displayName = 'f7-routable-modals';

  var F7App = /*@__PURE__*/(function (superclass) {
    function F7App(props, context) {
      superclass.call(this, props, context);
      this.__reactRefs = {};
    }

    if ( superclass ) F7App.__proto__ = superclass;
    F7App.prototype = Object.create( superclass && superclass.prototype );
    F7App.prototype.constructor = F7App;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7App.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var classes = Utils.classNames(className, 'framework7-root', Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id || 'framework7-root',
        style: style,
        className: classes
      }, this.slots['default'], React.createElement(F7RoutableModals, null));
    };

    F7App.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var ref = self.props;
      var params = ref.params; if ( params === void 0 ) params = {};
      var routes = ref.routes;
      var el = self.refs.el;
      var parentEl = el.parentNode;

      if (parentEl && parentEl !== document.body && parentEl.parentNode === document.body) {
        parentEl.style.height = '100%';
      }

      f7.init(el, params, routes);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7App.prototype, prototypeAccessors );

    return F7App;
  }(React.Component));

  __reactComponentSetProps(F7App, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    params: Object,
    routes: Array
  }, Mixins.colorProps));

  F7App.displayName = 'f7-app';

  var F7Appbar = /*@__PURE__*/(function (superclass) {
    function F7Appbar(props, context) {
      superclass.call(this, props, context);
      this.__reactRefs = {};
    }

    if ( superclass ) F7Appbar.__proto__ = superclass;
    F7Appbar.prototype = Object.create( superclass && superclass.prototype );
    F7Appbar.prototype.constructor = F7Appbar;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Appbar.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var inner = props.inner;
      var innerClass = props.innerClass;
      var innerClassName = props.innerClassName;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var noShadow = props.noShadow;
      var noHairline = props.noHairline;
      var innerEl;

      if (inner) {
        innerEl = React.createElement('div', {
          ref: function (__reactNode) {
            this$1.__reactRefs['inner'] = __reactNode;
          },
          className: Utils.classNames('appbar-inner', innerClass, innerClassName)
        }, this.slots['default']);
      }

      var classes = Utils.classNames(className, 'appbar', {
        'no-shadow': noShadow,
        'no-hairline': noHairline
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['before-inner'], innerEl || self.slots.default, this.slots['after-inner']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Appbar.prototype, prototypeAccessors );

    return F7Appbar;
  }(React.Component));

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

  var F7Badge = /*@__PURE__*/(function (superclass) {
    function F7Badge(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7Badge.__proto__ = superclass;
    F7Badge.prototype = Object.create( superclass && superclass.prototype );
    F7Badge.prototype.constructor = F7Badge;

    var prototypeAccessors = { slots: { configurable: true } };

    F7Badge.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'badge', Mixins.colorClasses(props));
      return React.createElement('span', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7Badge.prototype, prototypeAccessors );

    return F7Badge;
  }(React.Component));

  __reactComponentSetProps(F7Badge, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7Badge.displayName = 'f7-badge';

  var F7BlockFooter = /*@__PURE__*/(function (superclass) {
    function F7BlockFooter(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7BlockFooter.__proto__ = superclass;
    F7BlockFooter.prototype = Object.create( superclass && superclass.prototype );
    F7BlockFooter.prototype.constructor = F7BlockFooter;

    var prototypeAccessors = { slots: { configurable: true } };

    F7BlockFooter.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'block-footer', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7BlockFooter.prototype, prototypeAccessors );

    return F7BlockFooter;
  }(React.Component));

  __reactComponentSetProps(F7BlockFooter, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7BlockFooter.displayName = 'f7-block-footer';

  var F7BlockHeader = /*@__PURE__*/(function (superclass) {
    function F7BlockHeader(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7BlockHeader.__proto__ = superclass;
    F7BlockHeader.prototype = Object.create( superclass && superclass.prototype );
    F7BlockHeader.prototype.constructor = F7BlockHeader;

    var prototypeAccessors = { slots: { configurable: true } };

    F7BlockHeader.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'block-header', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7BlockHeader.prototype, prototypeAccessors );

    return F7BlockHeader;
  }(React.Component));

  __reactComponentSetProps(F7BlockHeader, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7BlockHeader.displayName = 'f7-block-header';

  var F7BlockTitle = /*@__PURE__*/(function (superclass) {
    function F7BlockTitle(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7BlockTitle.__proto__ = superclass;
    F7BlockTitle.prototype = Object.create( superclass && superclass.prototype );
    F7BlockTitle.prototype.constructor = F7BlockTitle;

    var prototypeAccessors = { slots: { configurable: true } };

    F7BlockTitle.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var large = props.large;
      var medium = props.medium;
      var classes = Utils.classNames(className, 'block-title', {
        'block-title-large': large,
        'block-title-medium': medium
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7BlockTitle.prototype, prototypeAccessors );

    return F7BlockTitle;
  }(React.Component));

  __reactComponentSetProps(F7BlockTitle, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    large: Boolean,
    medium: Boolean
  }, Mixins.colorProps));

  F7BlockTitle.displayName = 'f7-block-title';

  var F7Block = /*@__PURE__*/(function (superclass) {
    function F7Block(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onTabShow', 'onTabHide']);
      })();
    }

    if ( superclass ) F7Block.__proto__ = superclass;
    F7Block.prototype = Object.create( superclass && superclass.prototype );
    F7Block.prototype.constructor = F7Block;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Block.prototype.onTabShow = function onTabShow (event) {
      this.dispatchEvent('tabShow tab:show', event);
    };

    F7Block.prototype.onTabHide = function onTabHide (event) {
      this.dispatchEvent('tabHide tab:hide', event);
    };

    F7Block.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var className = props.className;
      var inset = props.inset;
      var strong = props.strong;
      var accordionList = props.accordionList;
      var tabletInset = props.tabletInset;
      var tabs = props.tabs;
      var tab = props.tab;
      var tabActive = props.tabActive;
      var noHairlines = props.noHairlines;
      var noHairlinesIos = props.noHairlinesIos;
      var noHairlinesMd = props.noHairlinesMd;
      var noHairlinesAurora = props.noHairlinesAurora;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'block', {
        inset: inset,
        'block-strong': strong,
        'accordion-list': accordionList,
        'tablet-inset': tabletInset,
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        }
      }, this.slots['default']);
    };

    F7Block.prototype.componentWillUnmount = function componentWillUnmount () {
      var el = this.refs.el;
      if (!el) { return; }
      el.removeEventListener('tab:show', this.onTabShow);
      el.removeEventListener('tab:hide', this.onTabHide);
    };

    F7Block.prototype.componentDidMount = function componentDidMount () {
      var el = this.refs.el;
      if (!el) { return; }
      el.addEventListener('tab:show', this.onTabShow);
      el.addEventListener('tab:hide', this.onTabHide);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Block.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Block.prototype, prototypeAccessors );

    return F7Block;
  }(React.Component));

  __reactComponentSetProps(F7Block, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    inset: Boolean,
    tabletInset: Boolean,
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

  var F7Icon = /*@__PURE__*/(function (superclass) {
    function F7Icon(props, context) {
      superclass.call(this, props, context);
      this.__reactRefs = {};
    }

    if ( superclass ) F7Icon.__proto__ = superclass;
    F7Icon.prototype = Object.create( superclass && superclass.prototype );
    F7Icon.prototype.constructor = F7Icon;

    var prototypeAccessors = { sizeComputed: { configurable: true },iconTextComputed: { configurable: true },classes: { configurable: true },slots: { configurable: true },refs: { configurable: true } };

    prototypeAccessors.sizeComputed.get = function () {
      var self = this;
      var size = self.props.size;

      if (typeof size === 'number' || parseFloat(size) === size * 1) {
        size = size + "px";
      }

      return size;
    };

    prototypeAccessors.iconTextComputed.get = function () {
      var self = this;
      var ref = self.props;
      var material = ref.material;
      var f7 = ref.f7;
      var md = ref.md;
      var ios = ref.ios;
      var aurora = ref.aurora;
      var text = material || f7;

      if (md && self.$theme.md && (md.indexOf('material:') >= 0 || md.indexOf('f7:') >= 0)) {
        text = md.split(':')[1];
      } else if (ios && self.$theme.ios && (ios.indexOf('material:') >= 0 || ios.indexOf('f7:') >= 0)) {
        text = ios.split(':')[1];
      } else if (aurora && self.$theme.aurora && (aurora.indexOf('material:') >= 0 || aurora.indexOf('f7:') >= 0)) {
        text = aurora.split(':')[1];
      }

      return text;
    };

    prototypeAccessors.classes.get = function () {
      var classes = {
        icon: true
      };
      var self = this;
      var props = self.props;
      var material = props.material;
      var f7 = props.f7;
      var fa = props.fa;
      var ion = props.ion;
      var icon = props.icon;
      var md = props.md;
      var ios = props.ios;
      var aurora = props.aurora;
      var className = props.className;
      var themeIcon;
      if (self.$theme.ios) { themeIcon = ios; }else if (self.$theme.md) { themeIcon = md; }else if (self.$theme.aurora) { themeIcon = aurora; }

      if (themeIcon) {
        var parts = themeIcon.split(':');
        var prop = parts[0];
        var value = parts[1];

        if (prop === 'material' || prop === 'fa' || prop === 'f7') {
          classes.fa = prop === 'fa';
          classes['material-icons'] = prop === 'material';
          classes['f7-icons'] = prop === 'f7';
        }

        if (prop === 'fa' || prop === 'ion') {
          classes[(prop + "-" + value)] = true;
        }

        if (prop === 'icon') {
          classes[value] = true;
        }
      } else {
        classes = {
          icon: true,
          'material-icons': material,
          'f7-icons': f7,
          fa: fa
        };
        if (ion) { classes[("ion-" + ion)] = true; }
        if (fa) { classes[("fa-" + fa)] = true; }
        if (icon) { classes[icon] = true; }
      }

      return Utils.classNames(className, classes, Mixins.colorClasses(props));
    };

    F7Icon.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      return React.createElement('i', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: Utils.extend({
          fontSize: self.sizeComputed
        }, style),
        className: self.classes
      }, self.iconTextComputed, this.slots['default']);
    };

    F7Icon.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
    };

    F7Icon.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      if (!el) { return; }
      var ref = self.props;
      var tooltip = ref.tooltip;
      if (!tooltip) { return; }
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: el,
          text: tooltip
        });
      });
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    F7Icon.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
        var self = this$1;
        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      });
    };

    Object.defineProperties( F7Icon.prototype, prototypeAccessors );

    return F7Icon;
  }(React.Component));

  __reactComponentSetProps(F7Icon, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    material: String,
    f7: String,
    ion: String,
    fa: String,
    icon: String,
    ios: String,
    aurora: String,
    md: String,
    tooltip: String,
    size: [String, Number]
  }, Mixins.colorProps));

  F7Icon.displayName = 'f7-icon';

  var F7Button = /*@__PURE__*/(function (superclass) {
    function F7Button(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onClick']);
      })();
    }

    if ( superclass ) F7Button.__proto__ = superclass;
    F7Button.prototype = Object.create( superclass && superclass.prototype );
    F7Button.prototype.constructor = F7Button;

    var prototypeAccessors = { attrs: { configurable: true },classes: { configurable: true },slots: { configurable: true },refs: { configurable: true } };

    F7Button.prototype.onClick = function onClick (event) {
      this.dispatchEvent('click', event);
    };

    prototypeAccessors.attrs.get = function () {
      var self = this;
      var props = self.props;
      var href = props.href;
      var target = props.target;
      var tabLink = props.tabLink;
      var type = props.type;
      var hrefComputed = href;
      if (href === true) { hrefComputed = '#'; }
      if (href === false) { hrefComputed = undefined; }
      return Utils.extend({
        href: hrefComputed,
        target: target,
        type: type,
        'data-tab': Utils.isStringProp(tabLink) && tabLink || undefined
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    };

    prototypeAccessors.classes.get = function () {
      var self = this;
      var props = self.props;
      var noFastclick = props.noFastclick;
      var noFastClick = props.noFastClick;
      var tabLink = props.tabLink;
      var tabLinkActive = props.tabLinkActive;
      var round = props.round;
      var roundIos = props.roundIos;
      var roundAurora = props.roundAurora;
      var roundMd = props.roundMd;
      var fill = props.fill;
      var fillIos = props.fillIos;
      var fillAurora = props.fillAurora;
      var fillMd = props.fillMd;
      var large = props.large;
      var largeIos = props.largeIos;
      var largeAurora = props.largeAurora;
      var largeMd = props.largeMd;
      var small = props.small;
      var smallIos = props.smallIos;
      var smallAurora = props.smallAurora;
      var smallMd = props.smallMd;
      var raised = props.raised;
      var raisedIos = props.raisedIos;
      var raisedAurora = props.raisedAurora;
      var raisedMd = props.raisedMd;
      var active = props.active;
      var outline = props.outline;
      var outlineIos = props.outlineIos;
      var outlineAurora = props.outlineAurora;
      var outlineMd = props.outlineMd;
      var disabled = props.disabled;
      var className = props.className;
      return Utils.classNames(className, 'button', {
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'no-fastclick': noFastclick || noFastClick,
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
    };

    F7Button.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var iconEl;
      var textEl;
      var props = self.props;
      var text = props.text;
      var icon = props.icon;
      var iconMaterial = props.iconMaterial;
      var iconIon = props.iconIon;
      var iconFa = props.iconFa;
      var iconF7 = props.iconF7;
      var iconMd = props.iconMd;
      var iconIos = props.iconIos;
      var iconAurora = props.iconAurora;
      var iconColor = props.iconColor;
      var iconSize = props.iconSize;
      var id = props.id;
      var style = props.style;
      var type = props.type;

      if (text) {
        textEl = React.createElement('span', null, text);
      }

      if (icon || iconMaterial || iconIon || iconFa || iconF7 || iconMd || iconIos || iconAurora) {
        iconEl = React.createElement(F7Icon, {
          material: iconMaterial,
          ion: iconIon,
          fa: iconFa,
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes
      }, self.attrs), iconEl, textEl, this.slots['default']);
    };

    F7Button.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var el = self.refs.el;
      el.removeEventListener('click', self.onClick);
      delete el.f7RouteProps;

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
    };

    F7Button.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
        var self = this$1;
        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      });

      var self = this;
      var el = self.refs.el;
      var ref = self.props;
      var routeProps = ref.routeProps;

      if (routeProps) {
        el.f7RouteProps = routeProps;
      }
    };

    F7Button.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      el.addEventListener('click', self.onClick);
      var ref = self.props;
      var tooltip = ref.tooltip;
      var routeProps = ref.routeProps;

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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Button.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Button.prototype, prototypeAccessors );

    return F7Button;
  }(React.Component));

  __reactComponentSetProps(F7Button, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    noFastclick: Boolean,
    noFastClick: Boolean,
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
  }, Mixins.colorProps, Mixins.linkIconProps, Mixins.linkRouterProps, Mixins.linkActionsProps));

  F7Button.displayName = 'f7-button';

  var F7CardContent = /*@__PURE__*/(function (superclass) {
    function F7CardContent(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7CardContent.__proto__ = superclass;
    F7CardContent.prototype = Object.create( superclass && superclass.prototype );
    F7CardContent.prototype.constructor = F7CardContent;

    var prototypeAccessors = { slots: { configurable: true } };

    F7CardContent.prototype.render = function render () {
      var props = this.props;
      var id = props.id;
      var className = props.className;
      var style = props.style;
      var padding = props.padding;
      var classes = Utils.classNames(className, 'card-content', {
        'card-content-padding': padding
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7CardContent.prototype, prototypeAccessors );

    return F7CardContent;
  }(React.Component));

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

  var F7CardFooter = /*@__PURE__*/(function (superclass) {
    function F7CardFooter(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7CardFooter.__proto__ = superclass;
    F7CardFooter.prototype = Object.create( superclass && superclass.prototype );
    F7CardFooter.prototype.constructor = F7CardFooter;

    var prototypeAccessors = { slots: { configurable: true } };

    F7CardFooter.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'card-footer', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7CardFooter.prototype, prototypeAccessors );

    return F7CardFooter;
  }(React.Component));

  __reactComponentSetProps(F7CardFooter, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7CardFooter.displayName = 'f7-card-footer';

  var F7CardHeader = /*@__PURE__*/(function (superclass) {
    function F7CardHeader(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7CardHeader.__proto__ = superclass;
    F7CardHeader.prototype = Object.create( superclass && superclass.prototype );
    F7CardHeader.prototype.constructor = F7CardHeader;

    var prototypeAccessors = { slots: { configurable: true } };

    F7CardHeader.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'card-header', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7CardHeader.prototype, prototypeAccessors );

    return F7CardHeader;
  }(React.Component));

  __reactComponentSetProps(F7CardHeader, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7CardHeader.displayName = 'f7-card-header';

  var F7Card = /*@__PURE__*/(function (superclass) {
    function F7Card(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, 'onBeforeOpen onOpen onOpened onClose onClosed'.split(' '));
      })();
    }

    if ( superclass ) F7Card.__proto__ = superclass;
    F7Card.prototype = Object.create( superclass && superclass.prototype );
    F7Card.prototype.constructor = F7Card;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Card.prototype.open = function open () {
      var self = this;
      if (!self.refs.el) { return; }
      self.$f7.card.open(self.refs.el);
    };

    F7Card.prototype.close = function close () {
      var self = this;
      if (!self.refs.el) { return; }
      self.$f7.card.close(self.refs.el);
    };

    F7Card.prototype.onBeforeOpen = function onBeforeOpen (e) {
      this.dispatchEvent('cardBeforeOpen card:beforeopen', e, e.detail.prevent);
    };

    F7Card.prototype.onOpen = function onOpen (e) {
      this.dispatchEvent('cardOpen card:open', e);
    };

    F7Card.prototype.onOpened = function onOpened (e) {
      this.dispatchEvent('cardOpened card:opened', e);
    };

    F7Card.prototype.onClose = function onClose (e) {
      this.dispatchEvent('cardClose card:close', e);
    };

    F7Card.prototype.onClosed = function onClosed (e) {
      this.dispatchEvent('cardClosed card:closed', e);
    };

    F7Card.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var title = props.title;
      var content = props.content;
      var footer = props.footer;
      var padding = props.padding;
      var outline = props.outline;
      var expandable = props.expandable;
      var expandableAnimateWidth = props.expandableAnimateWidth;
      var animate = props.animate;
      var hideNavbarOnOpen = props.hideNavbarOnOpen;
      var hideToolbarOnOpen = props.hideToolbarOnOpen;
      var swipeToClose = props.swipeToClose;
      var closeByBackdropClick = props.closeByBackdropClick;
      var backdrop = props.backdrop;
      var backdropEl = props.backdropEl;
      var noShadow = props.noShadow;
      var noBorder = props.noBorder;
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        'data-animate': typeof animate === 'undefined' ? animate : animate.toString(),
        'data-hide-navbar-on-open': typeof hideNavbarOnOpen === 'undefined' ? hideNavbarOnOpen : hideNavbarOnOpen.toString(),
        'data-hide-toolbar-on-open': typeof hideToolbarOnOpen === 'undefined' ? hideToolbarOnOpen : hideToolbarOnOpen.toString(),
        'data-swipe-to-close': typeof swipeToClose === 'undefined' ? swipeToClose : swipeToClose.toString(),
        'data-close-by-backdrop-click': typeof closeByBackdropClick === 'undefined' ? closeByBackdropClick : closeByBackdropClick.toString(),
        'data-backdrop': typeof backdrop === 'undefined' ? backdrop : backdrop.toString(),
        'data-backdrop-el': backdropEl
      }, headerEl, contentEl, footerEl, this.slots['default']);
    };

    F7Card.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      if (!self.props.expandable) { return; }
      var el = self.refs.el;
      if (!el) { return; }
      el.removeEventListener('card:beforeopen', self.onBeforeOpen);
      el.removeEventListener('card:open', self.onOpen);
      el.removeEventListener('card:opened', self.onOpened);
      el.removeEventListener('card:close', self.onClose);
      el.removeEventListener('card:closed', self.onClosed);
    };

    F7Card.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      if (!self.props.expandable) { return; }
      var el = self.refs.el;
      if (!el) { return; }
      el.addEventListener('card:beforeopen', self.onBeforeOpen);
      el.addEventListener('card:open', self.onOpen);
      el.addEventListener('card:opened', self.onOpened);
      el.addEventListener('card:close', self.onClose);
      el.addEventListener('card:closed', self.onClosed);

      if (self.props.expandable && self.props.expandableOpened) {
        self.$f7ready(function () {
          self.$f7.card.open(el, false);
        });
      }
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Card.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    F7Card.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.expandableOpened', prevProps, prevState, function (expandableOpened) {
        var self = this$1;

        if (expandableOpened) {
          self.open();
        } else {
          self.close();
        }
      });
    };

    Object.defineProperties( F7Card.prototype, prototypeAccessors );

    return F7Card;
  }(React.Component));

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

  var F7Checkbox = /*@__PURE__*/(function (superclass) {
    function F7Checkbox(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onChange']);
      })();
    }

    if ( superclass ) F7Checkbox.__proto__ = superclass;
    F7Checkbox.prototype = Object.create( superclass && superclass.prototype );
    F7Checkbox.prototype.constructor = F7Checkbox;

    var prototypeAccessors = { classes: { configurable: true },slots: { configurable: true },refs: { configurable: true } };

    F7Checkbox.prototype.onChange = function onChange (event) {
      this.dispatchEvent('change', event);
    };

    prototypeAccessors.classes.get = function () {
      var self = this;
      var props = self.props;
      var className = props.className;
      var disabled = props.disabled;
      return Utils.classNames(className, {
        checkbox: true,
        disabled: disabled
      }, Mixins.colorClasses(props));
    };

    F7Checkbox.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var name = props.name;
      var value = props.value;
      var disabled = props.disabled;
      var readonly = props.readonly;
      var checked = props.checked;
      var defaultChecked = props.defaultChecked;
      var id = props.id;
      var style = props.style;
      var inputEl;
      {
        inputEl = React.createElement('input', {
          ref: function (__reactNode) {
            this$1.__reactRefs['inputEl'] = __reactNode;
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
    };

    F7Checkbox.prototype.componentDidUpdate = function componentDidUpdate () {
      var self = this;
      var ref = self.refs;
      var inputEl = ref.inputEl;
      var ref$1 = self.props;
      var indeterminate = ref$1.indeterminate;

      if (inputEl) {
        inputEl.indeterminate = indeterminate;
      }
    };

    F7Checkbox.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var ref = self.refs;
      var inputEl = ref.inputEl;
      var ref$1 = self.props;
      var indeterminate = ref$1.indeterminate;

      if (indeterminate && inputEl) {
        inputEl.indeterminate = true;
      }
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Checkbox.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Checkbox.prototype, prototypeAccessors );

    return F7Checkbox;
  }(React.Component));

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

  var F7Chip = /*@__PURE__*/(function (superclass) {
    function F7Chip(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onClick', 'onDeleteClick']);
      })();
    }

    if ( superclass ) F7Chip.__proto__ = superclass;
    F7Chip.prototype = Object.create( superclass && superclass.prototype );
    F7Chip.prototype.constructor = F7Chip;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Chip.prototype.onClick = function onClick (event) {
      this.dispatchEvent('click', event);
    };

    F7Chip.prototype.onDeleteClick = function onDeleteClick (event) {
      this.dispatchEvent('delete', event);
    };

    F7Chip.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var media = props.media;
      var text = props.text;
      var deleteable = props.deleteable;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var mediaTextColor = props.mediaTextColor;
      var mediaBgColor = props.mediaBgColor;
      var outline = props.outline;
      var mediaEl;
      var labelEl;
      var deleteEl;

      if (media || self.slots && self.slots.media) {
        var mediaClasses = Utils.classNames('chip-media', mediaTextColor && ("text-color-" + mediaTextColor), mediaBgColor && ("bg-color-" + mediaBgColor));
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
          ref: function (__reactNode) {
            this$1.__reactRefs['deleteEl'] = __reactNode;
          },
          className: 'chip-delete'
        });
      }

      var classes = Utils.classNames(className, 'chip', {
        'chip-outline': outline
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, mediaEl, labelEl, deleteEl);
    };

    F7Chip.prototype.componentWillUnmount = function componentWillUnmount () {
      this.refs.el.removeEventListener('click', this.onClick);

      if (this.refs.deleteEl) {
        this.refs.deleteEl.removeEventListener('click', this.onDeleteClick);
      }
    };

    F7Chip.prototype.componentDidMount = function componentDidMount () {
      this.refs.el.addEventListener('click', this.onClick);

      if (this.refs.deleteEl) {
        this.refs.deleteEl.addEventListener('click', this.onDeleteClick);
      }
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Chip.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Chip.prototype, prototypeAccessors );

    return F7Chip;
  }(React.Component));

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

  var F7Col = /*@__PURE__*/(function (superclass) {
    function F7Col(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onClick']);
      })();
    }

    if ( superclass ) F7Col.__proto__ = superclass;
    F7Col.prototype = Object.create( superclass && superclass.prototype );
    F7Col.prototype.constructor = F7Col;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Col.prototype.onClick = function onClick (event) {
      this.dispatchEvent('click', event);
    };

    F7Col.prototype.render = function render () {
      var this$1 = this;
      var obj;

      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var tag = props.tag;
      var width = props.width;
      var tabletWidth = props.tabletWidth;
      var desktopWidth = props.desktopWidth;
      var ColTag = tag;
      var classes = Utils.classNames(className, ( obj = {
        col: width === 'auto'
      }, obj[("col-" + width)] = width !== 'auto', obj[("tablet-" + tabletWidth)] = tabletWidth, obj[("desktop-" + desktopWidth)] = desktopWidth, obj ), Mixins.colorClasses(props));
      return React.createElement(ColTag, {
        id: id,
        style: style,
        className: classes,
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        }
      }, this.slots['default']);
    };

    F7Col.prototype.componentWillUnmount = function componentWillUnmount () {
      this.refs.el.removeEventListener('click', this.onClick);
    };

    F7Col.prototype.componentDidMount = function componentDidMount () {
      this.refs.el.addEventListener('click', this.onClick);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Col.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Col.prototype, prototypeAccessors );

    return F7Col;
  }(React.Component));

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
    tabletWidth: {
      type: [Number, String]
    },
    desktopWidth: {
      type: [Number, String]
    }
  }, Mixins.colorProps));

  F7Col.displayName = 'f7-col';

  var F7FabButton = /*@__PURE__*/(function (superclass) {
    function F7FabButton(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        this$1.onClick = this$1.onClick.bind(this$1);
      })();

      (function () {
        Utils.bindMethods(this$1, ['onClick']);
      })();
    }

    if ( superclass ) F7FabButton.__proto__ = superclass;
    F7FabButton.prototype = Object.create( superclass && superclass.prototype );
    F7FabButton.prototype.constructor = F7FabButton;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7FabButton.prototype.onClick = function onClick (event) {
      this.dispatchEvent('click', event);
    };

    F7FabButton.prototype.render = function render () {
      var this$1 = this;

      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var fabClose = props.fabClose;
      var label = props.label;
      var target = props.target;
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        target: target,
        className: classes
      }, this.slots['default'], labelEl);
    };

    F7FabButton.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      self.refs.el.removeEventListener('click', self.onClick);

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
    };

    F7FabButton.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      self.refs.el.addEventListener('click', self.onClick);
      var ref = self.props;
      var tooltip = ref.tooltip;
      if (!tooltip) { return; }
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: self.refs.el,
          text: tooltip
        });
      });
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7FabButton.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    F7FabButton.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
        var self = this$1;
        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      });
    };

    Object.defineProperties( F7FabButton.prototype, prototypeAccessors );

    return F7FabButton;
  }(React.Component));

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

  var F7FabButtons = /*@__PURE__*/(function (superclass) {
    function F7FabButtons(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7FabButtons.__proto__ = superclass;
    F7FabButtons.prototype = Object.create( superclass && superclass.prototype );
    F7FabButtons.prototype.constructor = F7FabButtons;

    var prototypeAccessors = { slots: { configurable: true } };

    F7FabButtons.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var position = props.position;
      var classes = Utils.classNames(className, 'fab-buttons', ("fab-buttons-" + position), Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7FabButtons.prototype, prototypeAccessors );

    return F7FabButtons;
  }(React.Component));

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

  var F7Fab = /*@__PURE__*/(function (superclass) {
    function F7Fab(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onClick']);
      })();
    }

    if ( superclass ) F7Fab.__proto__ = superclass;
    F7Fab.prototype = Object.create( superclass && superclass.prototype );
    F7Fab.prototype.constructor = F7Fab;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Fab.prototype.onClick = function onClick (event) {
      var self = this;
      self.dispatchEvent('click', event);
    };

    F7Fab.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var morphTo = props.morphTo;
      var initialHref = props.href;
      var position = props.position;
      var text = props.text;
      var target = props.target;
      var href = initialHref;
      if (href === true) { href = '#'; }
      if (href === false) { href = undefined; }
      var linkChildren = [];
      var rootChildren = [];
      var ref = self.slots;
      var linkSlots = ref.link;
      var defaultSlots = ref.default;
      var rootSlots = ref.root;
      var textSlots = ref.text;

      if (defaultSlots) {
        for (var i = 0; i < defaultSlots.length; i += 1) {
          var child = defaultSlots[i];
          var isRoot = (void 0);
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
          ref: function (__reactNode) {
            this$1.__reactRefs['linkEl'] = __reactNode;
          },
          target: target,
          href: href,
          key: 'f7-fab-link'
        }, linkChildren, textEl, linkSlots);
      }

      var classes = Utils.classNames(className, 'fab', ("fab-" + position), {
        'fab-morph': morphTo,
        'fab-extended': typeof textEl !== 'undefined'
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes,
        'data-morph-to': morphTo
      }, linkEl, rootChildren, rootSlots);
    };

    F7Fab.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;

      if (self.refs.linkEl) {
        self.refs.linkEl.removeEventListener('click', self.onClick);
      }

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
    };

    F7Fab.prototype.componentDidMount = function componentDidMount () {
      var self = this;

      if (self.refs.linkEl) {
        self.refs.linkEl.addEventListener('click', self.onClick);
      }

      var ref = self.props;
      var tooltip = ref.tooltip;
      if (!tooltip) { return; }
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: self.refs.el,
          text: tooltip
        });
      });
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Fab.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    F7Fab.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
        var self = this$1;
        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      });
    };

    Object.defineProperties( F7Fab.prototype, prototypeAccessors );

    return F7Fab;
  }(React.Component));

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

  var F7Gauge = /*@__PURE__*/(function (superclass) {
    function F7Gauge(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7Gauge.__proto__ = superclass;
    F7Gauge.prototype = Object.create( superclass && superclass.prototype );
    F7Gauge.prototype.constructor = F7Gauge;

    F7Gauge.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var type = props.type;
      var value = props.value;
      var size = props.size;
      var bgColor = props.bgColor;
      var borderBgColor = props.borderBgColor;
      var borderColor = props.borderColor;
      var borderWidth = props.borderWidth;
      var valueText = props.valueText;
      var valueTextColor = props.valueTextColor;
      var valueFontSize = props.valueFontSize;
      var valueFontWeight = props.valueFontWeight;
      var labelText = props.labelText;
      var labelTextColor = props.labelTextColor;
      var labelFontSize = props.labelFontSize;
      var labelFontWeight = props.labelFontWeight;
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
        width: (size + "px"),
        height: ((semiCircle ? size / 2 : size) + "px"),
        viewBox: ("0 0 " + size + " " + (semiCircle ? size / 2 : size))
      }, semiCircle && React.createElement('path', {
        className: 'gauge-back-semi',
        d: ("M" + (size - borderWidth / 2) + "," + (size / 2) + " a1,1 0 0,0 -" + (size - borderWidth) + ",0"),
        stroke: borderBgColor,
        strokeWidth: borderWidth,
        fill: bgColor || 'none'
      }), semiCircle && React.createElement('path', {
        className: 'gauge-front-semi',
        d: ("M" + (size - borderWidth / 2) + "," + (size / 2) + " a1,1 0 0,0 -" + (size - borderWidth) + ",0"),
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
        transform: ("rotate(-90 " + (size / 2) + " " + (size / 2) + ")"),
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
    };

    return F7Gauge;
  }(React.Component));

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

  var F7Toggle = /*@__PURE__*/(function (superclass) {
    function F7Toggle(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onChange']);
      })();
    }

    if ( superclass ) F7Toggle.__proto__ = superclass;
    F7Toggle.prototype = Object.create( superclass && superclass.prototype );
    F7Toggle.prototype.constructor = F7Toggle;

    var prototypeAccessors = { refs: { configurable: true } };

    F7Toggle.prototype.toggle = function toggle () {
      var self = this;
      if (self.f7Toggle && self.f7Toggle.toggle) { self.f7Toggle.toggle(); }
    };

    F7Toggle.prototype.onChange = function onChange (event) {
      var self = this;
      self.dispatchEvent('change', event);
    };

    F7Toggle.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var className = props.className;
      var disabled = props.disabled;
      var id = props.id;
      var style = props.style;
      var name = props.name;
      var readonly = props.readonly;
      var checked = props.checked;
      var defaultChecked = props.defaultChecked;
      var value = props.value;
      var labelClasses = Utils.classNames('toggle', className, {
        disabled: disabled
      }, Mixins.colorClasses(props));
      var inputEl;
      {
        inputEl = React.createElement('input', {
          ref: function (__reactNode) {
            this$1.__reactRefs['inputEl'] = __reactNode;
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: labelClasses
      }, inputEl, React.createElement('span', {
        className: 'toggle-icon'
      }));
    };

    F7Toggle.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      if (self.f7Toggle && self.f7Toggle.destroy && self.f7Toggle.$el) { self.f7Toggle.destroy(); }
    };

    F7Toggle.prototype.componentDidMount = function componentDidMount () {
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
    };

    F7Toggle.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    F7Toggle.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.checked', prevProps, prevState, function (newValue) {
        var self = this$1;
        if (!self.f7Toggle) { return; }
        self.f7Toggle.checked = newValue;
      });
    };

    Object.defineProperties( F7Toggle.prototype, prototypeAccessors );

    return F7Toggle;
  }(React.Component));

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

  var F7Range = /*@__PURE__*/(function (superclass) {
    function F7Range(props, context) {
      superclass.call(this, props, context);
      this.__reactRefs = {};
    }

    if ( superclass ) F7Range.__proto__ = superclass;
    F7Range.prototype = Object.create( superclass && superclass.prototype );
    F7Range.prototype.constructor = F7Range;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Range.prototype.setValue = function setValue (newValue) {
      var self = this;
      if (self.f7Range && self.f7Range.setValue) { self.f7Range.setValue(newValue); }
    };

    F7Range.prototype.getValue = function getValue () {
      var self = this;

      if (self.f7Range && self.f7Range.getValue) {
        return self.f7Range.getValue();
      }

      return undefined;
    };

    F7Range.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var ref = self.props;
      var id = ref.id;
      var disabled = ref.disabled;
      var className = ref.className;
      var style = ref.style;
      var input = ref.input;
      var inputId = ref.inputId;
      var name = ref.name;
      var vertical = ref.vertical;
      var verticalReversed = ref.verticalReversed;
      var classes = Utils.classNames(className, 'range-slider', {
        'range-slider-horizontal': !vertical,
        'range-slider-vertical': vertical,
        'range-slider-vertical-reversed': vertical && verticalReversed,
        disabled: disabled
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, input && React.createElement('input', {
        type: 'range',
        name: name,
        id: inputId
      }), this.slots['default']);
    };

    F7Range.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      if (self.f7Range && self.f7Range.destroy) { self.f7Range.destroy(); }
    };

    F7Range.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      self.$f7ready(function (f7) {
        if (!self.props.init) { return; }
        var props = self.props;
        var value = props.value;
        var min = props.min;
        var max = props.max;
        var step = props.step;
        var label = props.label;
        var dual = props.dual;
        var draggableBar = props.draggableBar;
        var vertical = props.vertical;
        var verticalReversed = props.verticalReversed;
        var formatLabel = props.formatLabel;
        var scale = props.scale;
        var scaleSteps = props.scaleSteps;
        var scaleSubSteps = props.scaleSubSteps;
        var formatScaleLabel = props.formatScaleLabel;
        var limitKnobPosition = props.limitKnobPosition;
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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Range.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    F7Range.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.value', prevProps, prevState, function (newValue) {
        var self = this$1;
        if (!self.f7Range) { return; }
        self.f7Range.setValue(newValue);
      });
    };

    Object.defineProperties( F7Range.prototype, prototypeAccessors );

    return F7Range;
  }(React.Component));

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

  var F7Input = /*@__PURE__*/(function (superclass) {
    function F7Input(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      this.state = (function () {
        return {
          inputFocused: false,
          inputInvalid: false
        };
      })();

      (function () {
        Utils.bindMethods(this$1, 'onFocus onBlur onInput onChange onTextareaResize onInputNotEmpty onInputEmpty onInputClear'.split(' '));
      })();
    }

    if ( superclass ) F7Input.__proto__ = superclass;
    F7Input.prototype = Object.create( superclass && superclass.prototype );
    F7Input.prototype.constructor = F7Input;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Input.prototype.domValue = function domValue () {
      var self = this;
      var ref = self.refs;
      var inputEl = ref.inputEl;
      if (!inputEl) { return undefined; }
      return inputEl.value;
    };

    F7Input.prototype.inputHasValue = function inputHasValue () {
      var self = this;
      var ref = self.props;
      var value = ref.value;
      var domValue = self.domValue();
      return typeof value === 'undefined' ? domValue || domValue === 0 : value || value === 0;
    };

    F7Input.prototype.validateInput = function validateInput (inputEl) {
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
    };

    F7Input.prototype.onTextareaResize = function onTextareaResize (event) {
      this.dispatchEvent('textarea:resize textareaResize', event);
    };

    F7Input.prototype.onInputNotEmpty = function onInputNotEmpty (event) {
      this.dispatchEvent('input:notempty inputNotEmpty', event);
    };

    F7Input.prototype.onInputEmpty = function onInputEmpty (event) {
      this.dispatchEvent('input:empty inputEmpty', event);
    };

    F7Input.prototype.onInputClear = function onInputClear (event) {
      this.dispatchEvent('input:clear inputClear', event);
    };

    F7Input.prototype.onInput = function onInput (event) {
      var self = this;
      var ref = self.props;
      var validate = ref.validate;
      var validateOnBlur = ref.validateOnBlur;
      self.dispatchEvent('input', event);

      if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && self.refs && self.refs.inputEl) {
        self.validateInput(self.refs.inputEl);
      }
    };

    F7Input.prototype.onFocus = function onFocus (event) {
      this.dispatchEvent('focus', event);
      this.setState({
        inputFocused: true
      });
    };

    F7Input.prototype.onBlur = function onBlur (event) {
      var self = this;
      var ref = self.props;
      var validate = ref.validate;
      var validateOnBlur = ref.validateOnBlur;
      self.dispatchEvent('blur', event);

      if ((validate || validate === '' || validateOnBlur || validateOnBlur === '') && self.refs && self.refs.inputEl) {
        self.validateInput(self.refs.inputEl);
      }

      self.setState({
        inputFocused: false
      });
    };

    F7Input.prototype.onChange = function onChange (event) {
      this.dispatchEvent('change', event);
    };

    F7Input.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var type = props.type;
      var name = props.name;
      var value = props.value;
      var defaultValue = props.defaultValue;
      var placeholder = props.placeholder;
      var id = props.id;
      var inputId = props.inputId;
      var size = props.size;
      var accept = props.accept;
      var autocomplete = props.autocomplete;
      var autocorrect = props.autocorrect;
      var autocapitalize = props.autocapitalize;
      var spellcheck = props.spellcheck;
      var autofocus = props.autofocus;
      var autosave = props.autosave;
      var checked = props.checked;
      var disabled = props.disabled;
      var max = props.max;
      var min = props.min;
      var step = props.step;
      var maxlength = props.maxlength;
      var minlength = props.minlength;
      var multiple = props.multiple;
      var readonly = props.readonly;
      var required = props.required;
      var inputStyle = props.inputStyle;
      var pattern = props.pattern;
      var validate = props.validate;
      var validateOnBlur = props.validateOnBlur;
      var tabindex = props.tabindex;
      var resizable = props.resizable;
      var clearButton = props.clearButton;
      var errorMessage = props.errorMessage;
      var errorMessageForce = props.errorMessageForce;
      var info = props.info;
      var wrap = props.wrap;
      var dropdown = props.dropdown;
      var style = props.style;
      var className = props.className;
      var noStoreData = props.noStoreData;
      var noFormStoreData = props.noFormStoreData;
      var ignoreStoreData = props.ignoreStoreData;
      var outline = props.outline;
      var domValue = self.domValue();
      var inputHasValue = self.inputHasValue();
      var inputEl;

      var createInput = function (InputTag, children) {
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
            ref: function (__reactNode) {
              this$1.__reactRefs['inputEl'] = __reactNode;
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

      var ref = self.slots;
      var slotsDefault = ref.default;
      var slotsInfo = ref.info;

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
          ref: function (__reactNode) {
            this$1.__reactRefs['wrapEl'] = __reactNode;
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
    };

    F7Input.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var ref = self.props;
      var type = ref.type;
      var resizable = ref.resizable;
      var clearButton = ref.clearButton;
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
    };

    F7Input.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.value', prevProps, prevState, function () {
        var self = this$1;
        var ref = self.props;
        var type = ref.type;
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
      var ref = self.props;
      var validate = ref.validate;
      var validateOnBlur = ref.validateOnBlur;
      var resizable = ref.resizable;
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
    };

    F7Input.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      self.$f7ready(function (f7) {
        var ref = self.props;
        var validate = ref.validate;
        var validateOnBlur = ref.validateOnBlur;
        var resizable = ref.resizable;
        var type = ref.type;
        var clearButton = ref.clearButton;
        var value = ref.value;
        var defaultValue = ref.defaultValue;
        var calendarParams = ref.calendarParams;
        var colorPickerParams = ref.colorPickerParams;
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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Input.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Input.prototype, prototypeAccessors );

    return F7Input;
  }(React.Component));

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
    colorPickerParams: Object
  }, Mixins.colorProps));

  F7Input.displayName = 'f7-input';

  var F7Link = /*@__PURE__*/(function (superclass) {
    function F7Link(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      this.state = (function () {
        return {
          isTabbarLabel: props.tabbarLabel
        };
      })();

      (function () {
        Utils.bindMethods(this$1, ['onClick']);
      })();
    }

    if ( superclass ) F7Link.__proto__ = superclass;
    F7Link.prototype = Object.create( superclass && superclass.prototype );
    F7Link.prototype.constructor = F7Link;

    var prototypeAccessors = { attrs: { configurable: true },classes: { configurable: true },slots: { configurable: true },refs: { configurable: true } };

    F7Link.prototype.onClick = function onClick (event) {
      this.dispatchEvent('click', event);
    };

    prototypeAccessors.attrs.get = function () {
      var self = this;
      var props = self.props;
      var href = props.href;
      var target = props.target;
      var tabLink = props.tabLink;
      var hrefComputed = href;
      if (href === true) { hrefComputed = '#'; }
      if (href === false) { hrefComputed = undefined; }
      return Utils.extend({
        href: hrefComputed,
        target: target,
        'data-tab': Utils.isStringProp(tabLink) && tabLink || undefined
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    };

    prototypeAccessors.classes.get = function () {
      var self = this;
      var props = self.props;
      var noFastclick = props.noFastclick;
      var noFastClick = props.noFastClick;
      var tabLink = props.tabLink;
      var tabLinkActive = props.tabLinkActive;
      var noLinkClass = props.noLinkClass;
      var smartSelect = props.smartSelect;
      var className = props.className;
      return Utils.classNames(className, {
        link: !(noLinkClass || self.state.isTabbarLabel),
        'icon-only': self.iconOnlyComputed,
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'no-fastclick': noFastclick || noFastClick,
        'smart-select': smartSelect
      }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
    };

    F7Link.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var text = props.text;
      var badge = props.badge;
      var badgeColor = props.badgeColor;
      var iconOnly = props.iconOnly;
      var iconBadge = props.iconBadge;
      var icon = props.icon;
      var iconColor = props.iconColor;
      var iconSize = props.iconSize;
      var iconMaterial = props.iconMaterial;
      var iconIon = props.iconIon;
      var iconFa = props.iconFa;
      var iconF7 = props.iconF7;
      var iconMd = props.iconMd;
      var iconIos = props.iconIos;
      var iconAurora = props.iconAurora;
      var id = props.id;
      var style = props.style;
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

      if (icon || iconMaterial || iconIon || iconFa || iconF7 || iconMd || iconIos || iconAurora) {
        if (iconBadge) {
          iconBadgeEl = React.createElement(F7Badge, {
            color: badgeColor
          }, iconBadge);
        }

        iconEl = React.createElement(F7Icon, {
          material: iconMaterial,
          f7: iconF7,
          fa: iconFa,
          ion: iconIon,
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes
      }, self.attrs), iconEl, textEl, defaultSlots);
    };

    F7Link.prototype.componentWillUnmount = function componentWillUnmount () {
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
    };

    F7Link.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
        var self = this$1;
        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      });

      var self = this;
      var el = self.refs.el;
      var ref = self.props;
      var routeProps = ref.routeProps;

      if (routeProps) {
        el.f7RouteProps = routeProps;
      }
    };

    F7Link.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      el.addEventListener('click', self.onClick);
      var ref = self.props;
      var tabbarLabel = ref.tabbarLabel;
      var tabLink = ref.tabLink;
      var tooltip = ref.tooltip;
      var smartSelect = ref.smartSelect;
      var smartSelectParams = ref.smartSelectParams;
      var routeProps = ref.routeProps;
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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Link.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Link.prototype, prototypeAccessors );

    return F7Link;
  }(React.Component));

  __reactComponentSetProps(F7Link, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    noLinkClass: Boolean,
    noFastClick: Boolean,
    noFastclick: Boolean,
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
  }, Mixins.colorProps, Mixins.linkIconProps, Mixins.linkRouterProps, Mixins.linkActionsProps));

  F7Link.displayName = 'f7-link';

  var F7ListButton = /*@__PURE__*/(function (superclass) {
    function F7ListButton(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onClick']);
      })();
    }

    if ( superclass ) F7ListButton.__proto__ = superclass;
    F7ListButton.prototype = Object.create( superclass && superclass.prototype );
    F7ListButton.prototype.constructor = F7ListButton;

    var prototypeAccessors = { attrs: { configurable: true },classes: { configurable: true },slots: { configurable: true },refs: { configurable: true } };

    F7ListButton.prototype.onClick = function onClick (event) {
      this.dispatchEvent('click', event);
    };

    prototypeAccessors.attrs.get = function () {
      var self = this;
      var props = self.props;
      var link = props.link;
      var href = props.href;
      var target = props.target;
      var tabLink = props.tabLink;
      return Utils.extend({
        href: typeof link === 'boolean' && typeof href === 'boolean' ? '#' : link || href,
        target: target,
        'data-tab': Utils.isStringProp(tabLink) && tabLink
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    };

    prototypeAccessors.classes.get = function () {
      var self = this;
      var props = self.props;
      var noFastclick = props.noFastclick;
      var noFastClick = props.noFastClick;
      var tabLink = props.tabLink;
      var tabLinkActive = props.tabLinkActive;
      return Utils.classNames({
        'list-button': true,
        'tab-link': tabLink || tabLink === '',
        'tab-link-active': tabLinkActive,
        'no-fastclick': noFastclick || noFastClick
      }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
    };

    F7ListButton.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var title = props.title;
      var text = props.text;
      return React.createElement('li', {
        id: id,
        style: style,
        className: className
      }, React.createElement('a', Object.assign({
        className: self.classes
      }, self.attrs, {
        ref: function (__reactNode) {
          this$1.__reactRefs['linkEl'] = __reactNode;
        }
      }), this.slots['default'], !this.slots.default && (title || text)));
    };

    F7ListButton.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var linkEl = self.refs.linkEl;
      linkEl.removeEventListener('click', this.onClick);
      delete linkEl.f7RouteProps;

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
    };

    F7ListButton.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
        var self = this$1;
        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      });

      var self = this;
      var linkEl = self.refs.linkEl;
      var ref = self.props;
      var routeProps = ref.routeProps;

      if (routeProps) {
        linkEl.f7RouteProps = routeProps;
      }
    };

    F7ListButton.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var linkEl = self.refs.linkEl;
      var ref = self.props;
      var routeProps = ref.routeProps;
      var tooltip = ref.tooltip;

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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7ListButton.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7ListButton.prototype, prototypeAccessors );

    return F7ListButton;
  }(React.Component));

  __reactComponentSetProps(F7ListButton, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    noFastclick: Boolean,
    noFastClick: Boolean,
    title: [String, Number],
    text: [String, Number],
    tabLink: [Boolean, String],
    tabLinkActive: Boolean,
    link: [Boolean, String],
    href: [Boolean, String],
    target: String,
    tooltip: String
  }, Mixins.colorProps, Mixins.linkRouterProps, Mixins.linkActionsProps));

  F7ListButton.displayName = 'f7-list-button';

  var F7ListGroup = /*@__PURE__*/(function (superclass) {
    function F7ListGroup(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7ListGroup.__proto__ = superclass;
    F7ListGroup.prototype = Object.create( superclass && superclass.prototype );
    F7ListGroup.prototype.constructor = F7ListGroup;

    var prototypeAccessors = { slots: { configurable: true } };

    F7ListGroup.prototype.render = function render () {
      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var mediaList = props.mediaList;
      var sortable = props.sortable;
      var classes = Utils.classNames(className, 'list-group', {
        'media-list': mediaList,
        sortable: sortable
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, React.createElement('ul', null, this.slots['default']));
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7ListGroup.prototype, prototypeAccessors );

    return F7ListGroup;
  }(React.Component));

  __reactComponentSetProps(F7ListGroup, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    mediaList: Boolean,
    sortable: Boolean
  }, Mixins.colorProps));

  F7ListGroup.displayName = 'f7-list-group';

  var F7ListIndex = /*@__PURE__*/(function (superclass) {
    function F7ListIndex(props, context) {
      superclass.call(this, props, context);
      this.__reactRefs = {};
    }

    if ( superclass ) F7ListIndex.__proto__ = superclass;
    F7ListIndex.prototype = Object.create( superclass && superclass.prototype );
    F7ListIndex.prototype.constructor = F7ListIndex;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7ListIndex.prototype.update = function update () {
      if (!this.f7ListIndex) { return; }
      this.f7ListIndex.update();
    };

    F7ListIndex.prototype.scrollListToIndex = function scrollListToIndex (indexContent) {
      if (!this.f7ListIndex) { return; }
      this.f7ListIndex.scrollListToIndex(indexContent);
    };

    F7ListIndex.prototype.render = function render () {
      var this$1 = this;

      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'list-index', Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    F7ListIndex.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      if (!self.props.init) { return; }
      self.$f7ready(function (f7) {
        var el = self.refs.el;
        var ref = self.props;
        var listEl = ref.listEl;
        var indexes = ref.indexes;
        var iosItemHeight = ref.iosItemHeight;
        var mdItemHeight = ref.mdItemHeight;
        var auroraItemHeight = ref.auroraItemHeight;
        var scrollList = ref.scrollList;
        var label = ref.label;
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
    };

    F7ListIndex.prototype.componentWillUnmount = function componentWillUnmount () {
      if (!this.props.init) { return; }

      if (this.f7ListIndex && this.f7ListIndex.destroy) {
        this.f7ListIndex.destroy();
      }
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7ListIndex.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    F7ListIndex.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.indexes', prevProps, prevState, function () {
        if (!this$1.f7ListIndex) { return; }
        this$1.f7ListIndex.params.indexes = this$1.props.indexes;
        this$1.update();
      });
    };

    Object.defineProperties( F7ListIndex.prototype, prototypeAccessors );

    return F7ListIndex;
  }(React.Component));

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

  var F7ListInput = /*@__PURE__*/(function (superclass) {
    function F7ListInput(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      this.state = (function () {
        return {
          isSortable: props.sortable,
          inputFocused: false,
          inputInvalid: false
        };
      })();

      (function () {
        Utils.bindMethods(this$1, 'onChange onInput onFocus onBlur onTextareaResize onInputNotEmpty onInputEmpty onInputClear'.split(' '));
      })();
    }

    if ( superclass ) F7ListInput.__proto__ = superclass;
    F7ListInput.prototype = Object.create( superclass && superclass.prototype );
    F7ListInput.prototype.constructor = F7ListInput;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7ListInput.prototype.domValue = function domValue () {
      var self = this;
      var ref = self.refs;
      var inputEl = ref.inputEl;
      if (!inputEl) { return undefined; }
      return inputEl.value;
    };

    F7ListInput.prototype.inputHasValue = function inputHasValue () {
      var self = this;
      var ref = self.props;
      var value = ref.value;
      var domValue = self.domValue();
      return typeof value === 'undefined' ? domValue || domValue === 0 : value || value === 0;
    };

    F7ListInput.prototype.validateInput = function validateInput (inputEl) {
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
    };

    F7ListInput.prototype.onTextareaResize = function onTextareaResize (event) {
      this.dispatchEvent('textarea:resize textareaResize', event);
    };

    F7ListInput.prototype.onInputNotEmpty = function onInputNotEmpty (event) {
      this.dispatchEvent('input:notempty inputNotEmpty', event);
    };

    F7ListInput.prototype.onInputEmpty = function onInputEmpty (event) {
      this.dispatchEvent('input:empty inputEmpty', event);
    };

    F7ListInput.prototype.onInputClear = function onInputClear (event) {
      this.dispatchEvent('input:clear inputClear', event);
    };

    F7ListInput.prototype.onInput = function onInput (event) {
      var self = this;
      var ref = self.props;
      var validate = ref.validate;
      var validateOnBlur = ref.validateOnBlur;
      self.dispatchEvent('input', event);

      if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && self.refs && self.refs.inputEl) {
        self.validateInput(self.refs.inputEl);
      }
    };

    F7ListInput.prototype.onFocus = function onFocus (event) {
      this.dispatchEvent('focus', event);
      this.setState({
        inputFocused: true
      });
    };

    F7ListInput.prototype.onBlur = function onBlur (event) {
      var self = this;
      var ref = self.props;
      var validate = ref.validate;
      var validateOnBlur = ref.validateOnBlur;
      self.dispatchEvent('blur', event);

      if ((validate || validate === '' || validateOnBlur || validateOnBlur === '') && self.refs && self.refs.inputEl) {
        self.validateInput(self.refs.inputEl);
      }

      self.setState({
        inputFocused: false
      });
    };

    F7ListInput.prototype.onChange = function onChange (event) {
      this.dispatchEvent('change', event);
    };

    F7ListInput.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var ref = self.state;
      var inputFocused = ref.inputFocused;
      var inputInvalid = ref.inputInvalid;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var sortable = props.sortable;
      var media = props.media;
      var dropdown = props.dropdown;
      var renderInput = props.input;
      var wrap = props.wrap;
      var type = props.type;
      var name = props.name;
      var value = props.value;
      var defaultValue = props.defaultValue;
      var readonly = props.readonly;
      var required = props.required;
      var disabled = props.disabled;
      var placeholder = props.placeholder;
      var inputId = props.inputId;
      var size = props.size;
      var accept = props.accept;
      var autocomplete = props.autocomplete;
      var autocorrect = props.autocorrect;
      var autocapitalize = props.autocapitalize;
      var spellcheck = props.spellcheck;
      var autofocus = props.autofocus;
      var autosave = props.autosave;
      var max = props.max;
      var min = props.min;
      var step = props.step;
      var maxlength = props.maxlength;
      var minlength = props.minlength;
      var multiple = props.multiple;
      var inputStyle = props.inputStyle;
      var pattern = props.pattern;
      var validate = props.validate;
      var validateOnBlur = props.validateOnBlur;
      var tabindex = props.tabindex;
      var resizable = props.resizable;
      var clearButton = props.clearButton;
      var noFormStoreData = props.noFormStoreData;
      var noStoreData = props.noStoreData;
      var ignoreStoreData = props.ignoreStoreData;
      var errorMessage = props.errorMessage;
      var errorMessageForce = props.errorMessageForce;
      var info = props.info;
      var outline = props.outline;
      var label = props.label;
      var inlineLabel = props.inlineLabel;
      var floatingLabel = props.floatingLabel;
      var domValue = self.domValue();
      var inputHasValue = self.inputHasValue();
      var isSortable = sortable || self.state.isSortable;

      var createInput = function (InputTag, children) {
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
            ref: function (__reactNode) {
              this$1.__reactRefs['inputEl'] = __reactNode;
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
        } else {
          inputEl = createInput('input');
        }
      }

      var hasErrorMessage = !!errorMessage || self.slots['error-message'] && self.slots['error-message'].length;
      var ItemContent = React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['itemContentEl'] = __reactNode;
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: Utils.classNames(className, {
          disabled: disabled
        }, Mixins.colorClasses(props))
      }, this.slots['root-start'], ItemContent, isSortable && React.createElement('div', {
        className: 'sortable-handler'
      }), this.slots['root'], this.slots['root-end']);
    };

    F7ListInput.prototype.componentWillUnmount = function componentWillUnmount () {
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
    };

    F7ListInput.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.value', prevProps, prevState, function () {
        var self = this$1;
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

      var ref = self.props;
      var validate = ref.validate;
      var validateOnBlur = ref.validateOnBlur;
      var resizable = ref.resizable;
      var type = ref.type;
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
    };

    F7ListInput.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      var itemContentEl = self.refs.itemContentEl;
      if (!el && !itemContentEl) { return; }
      self.$f7ready(function (f7) {
        var ref = self.props;
        var validate = ref.validate;
        var validateOnBlur = ref.validateOnBlur;
        var resizable = ref.resizable;
        var value = ref.value;
        var defaultValue = ref.defaultValue;
        var type = ref.type;
        var calendarParams = ref.calendarParams;
        var colorPickerParams = ref.colorPickerParams;
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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7ListInput.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7ListInput.prototype, prototypeAccessors );

    return F7ListInput;
  }(React.Component));

  __reactComponentSetProps(F7ListInput, Object.assign({
    id: [String, Number],
    style: Object,
    className: String,
    sortable: Boolean,
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
    colorPickerParams: Object
  }, Mixins.colorProps));

  F7ListInput.displayName = 'f7-list-input';

  var F7ListItemCell = /*@__PURE__*/(function (superclass) {
    function F7ListItemCell(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7ListItemCell.__proto__ = superclass;
    F7ListItemCell.prototype = Object.create( superclass && superclass.prototype );
    F7ListItemCell.prototype.constructor = F7ListItemCell;

    var prototypeAccessors = { slots: { configurable: true } };

    F7ListItemCell.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'item-cell', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7ListItemCell.prototype, prototypeAccessors );

    return F7ListItemCell;
  }(React.Component));

  __reactComponentSetProps(F7ListItemCell, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7ListItemCell.displayName = 'f7-list-item-cell';

  var F7ListItemContent = /*@__PURE__*/(function (superclass) {
    function F7ListItemContent(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, 'onClick onChange'.split(' '));
      })();
    }

    if ( superclass ) F7ListItemContent.__proto__ = superclass;
    F7ListItemContent.prototype = Object.create( superclass && superclass.prototype );
    F7ListItemContent.prototype.constructor = F7ListItemContent;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7ListItemContent.prototype.onClick = function onClick (event) {
      this.dispatchEvent('click', event);
    };

    F7ListItemContent.prototype.onChange = function onChange (event) {
      this.dispatchEvent('change', event);
    };

    F7ListItemContent.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var id = props.id;
      var className = props.className;
      var style = props.style;
      var radio = props.radio;
      var checkbox = props.checkbox;
      var value = props.value;
      var name = props.name;
      var checked = props.checked;
      var defaultChecked = props.defaultChecked;
      var readonly = props.readonly;
      var disabled = props.disabled;
      var required = props.required;
      var media = props.media;
      var header = props.header;
      var footer = props.footer;
      var title = props.title;
      var subtitle = props.subtitle;
      var text = props.text;
      var after = props.after;
      var badge = props.badge;
      var mediaList = props.mediaList;
      var mediaItem = props.mediaItem;
      var badgeColor = props.badgeColor;
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
          if (Array.isArray(slot)) { flattenSlots.push.apply(flattenSlots, slot); }else { flattenSlots.push(slot); }
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
            ref: function (__reactNode) {
              this$1.__reactRefs['inputEl'] = __reactNode;
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
          className: ("icon icon-" + (radio ? 'radio' : 'checkbox'))
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
          ref: function (__reactNode) {
            this$1.__reactRefs['innerEl'] = __reactNode;
          },
          className: 'item-inner'
        }, slotsInnerStart, headerEl, titleRowEl, subtitleEl, textEl, slotsInner, footerEl, slotsInnerEnd);
      } else {
        innerEl = React.createElement('div', {
          ref: function (__reactNode) {
            this$1.__reactRefs['innerEl'] = __reactNode;
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, slotsContentStart, inputEl, inputIconEl, mediaEl, innerEl, slotsContent, slotsContentEnd);
    };

    F7ListItemContent.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var ref = self.refs;
      var el = ref.el;
      el.removeEventListener('click', self.onClick);
    };

    F7ListItemContent.prototype.componentDidUpdate = function componentDidUpdate () {
      var self = this;
      var ref = self.refs;
      var inputEl = ref.inputEl;
      var ref$1 = self.props;
      var indeterminate = ref$1.indeterminate;

      if (inputEl) {
        inputEl.indeterminate = indeterminate;
      }
    };

    F7ListItemContent.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var ref = self.refs;
      var el = ref.el;
      var inputEl = ref.inputEl;
      var ref$1 = self.props;
      var indeterminate = ref$1.indeterminate;

      if (indeterminate && inputEl) {
        inputEl.indeterminate = true;
      }

      el.addEventListener('click', self.onClick);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7ListItemContent.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7ListItemContent.prototype, prototypeAccessors );

    return F7ListItemContent;
  }(React.Component));

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

  var F7ListItemRow = /*@__PURE__*/(function (superclass) {
    function F7ListItemRow(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7ListItemRow.__proto__ = superclass;
    F7ListItemRow.prototype = Object.create( superclass && superclass.prototype );
    F7ListItemRow.prototype.constructor = F7ListItemRow;

    var prototypeAccessors = { slots: { configurable: true } };

    F7ListItemRow.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'item-row', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7ListItemRow.prototype, prototypeAccessors );

    return F7ListItemRow;
  }(React.Component));

  __reactComponentSetProps(F7ListItemRow, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7ListItemRow.displayName = 'f7-list-item-row';

  var F7ListItem = /*@__PURE__*/(function (superclass) {
    function F7ListItem(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      this.state = (function () {
        return {
          isMedia: props.mediaItem || props.mediaList,
          isSortable: props.sortable,
          isSimple: false
        };
      })();

      (function () {
        Utils.bindMethods(this$1, ['onClick', 'onChange', 'onSwipeoutOpen', 'onSwipeoutOpened', 'onSwipeoutClose', 'onSwipeoutClosed', 'onSwipeoutDelete', 'onSwipeoutDeleted', 'onSwipeoutOverswipeEnter', 'onSwipeoutOverswipeExit', 'onSwipeout', 'onAccBeforeOpen', 'onAccOpen', 'onAccOpened', 'onAccBeforeClose', 'onAccClose', 'onAccClosed']);
      })();
    }

    if ( superclass ) F7ListItem.__proto__ = superclass;
    F7ListItem.prototype = Object.create( superclass && superclass.prototype );
    F7ListItem.prototype.constructor = F7ListItem;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7ListItem.prototype.onClick = function onClick (event) {
      var self = this;

      if (event.target.tagName.toLowerCase() !== 'input') {
        self.dispatchEvent('click', event);
      }
    };

    F7ListItem.prototype.onSwipeoutOverswipeEnter = function onSwipeoutOverswipeEnter (event) {
      this.dispatchEvent('swipeout:overswipeenter swipeoutOverswipeEnter', event);
    };

    F7ListItem.prototype.onSwipeoutOverswipeExit = function onSwipeoutOverswipeExit (event) {
      this.dispatchEvent('swipeout:overswipeexit swipeoutOverswipeExit', event);
    };

    F7ListItem.prototype.onSwipeoutDeleted = function onSwipeoutDeleted (event) {
      this.dispatchEvent('swipeout:deleted swipeoutDeleted', event);
    };

    F7ListItem.prototype.onSwipeoutDelete = function onSwipeoutDelete (event) {
      this.dispatchEvent('swipeout:delete swipeoutDelete', event);
    };

    F7ListItem.prototype.onSwipeoutClose = function onSwipeoutClose (event) {
      this.dispatchEvent('swipeout:close swipeoutClose', event);
    };

    F7ListItem.prototype.onSwipeoutClosed = function onSwipeoutClosed (event) {
      this.dispatchEvent('swipeout:closed swipeoutClosed', event);
    };

    F7ListItem.prototype.onSwipeoutOpen = function onSwipeoutOpen (event) {
      this.dispatchEvent('swipeout:open swipeoutOpen', event);
    };

    F7ListItem.prototype.onSwipeoutOpened = function onSwipeoutOpened (event) {
      this.dispatchEvent('swipeout:opened swipeoutOpened', event);
    };

    F7ListItem.prototype.onSwipeout = function onSwipeout (event) {
      this.dispatchEvent('swipeout', event);
    };

    F7ListItem.prototype.onAccBeforeClose = function onAccBeforeClose (event) {
      this.dispatchEvent('accordion:beforeclose accordionBeforeClose', event, event.detail.prevent);
    };

    F7ListItem.prototype.onAccClose = function onAccClose (event) {
      this.dispatchEvent('accordion:close accordionClose', event);
    };

    F7ListItem.prototype.onAccClosed = function onAccClosed (event) {
      this.dispatchEvent('accordion:closed accordionClosed', event);
    };

    F7ListItem.prototype.onAccBeforeOpen = function onAccBeforeOpen (event) {
      this.dispatchEvent('accordion:beforeopen accordionBeforeOpen', event, event.detail.prevent);
    };

    F7ListItem.prototype.onAccOpen = function onAccOpen (event) {
      this.dispatchEvent('accordion:open accordionOpen', event);
    };

    F7ListItem.prototype.onAccOpened = function onAccOpened (event) {
      this.dispatchEvent('accordion:opened accordionOpened', event);
    };

    F7ListItem.prototype.onChange = function onChange (event) {
      this.dispatchEvent('change', event);
    };

    F7ListItem.prototype.onInput = function onInput (event) {
      this.dispatchEvent('input', event);
    };

    F7ListItem.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var linkEl;
      var itemContentEl;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var title = props.title;
      var text = props.text;
      var media = props.media;
      var subtitle = props.subtitle;
      var header = props.header;
      var footer = props.footer;
      var link = props.link;
      var href = props.href;
      var target = props.target;
      var noFastclick = props.noFastclick;
      var noFastClick = props.noFastClick;
      var after = props.after;
      var badge = props.badge;
      var badgeColor = props.badgeColor;
      var mediaItem = props.mediaItem;
      var mediaList = props.mediaList;
      var divider = props.divider;
      var groupTitle = props.groupTitle;
      var swipeout = props.swipeout;
      var accordionItem = props.accordionItem;
      var accordionItemOpened = props.accordionItemOpened;
      var smartSelect = props.smartSelect;
      var checkbox = props.checkbox;
      var radio = props.radio;
      var checked = props.checked;
      var defaultChecked = props.defaultChecked;
      var indeterminate = props.indeterminate;
      var name = props.name;
      var value = props.value;
      var readonly = props.readonly;
      var required = props.required;
      var disabled = props.disabled;
      var sortable = props.sortable;
      var noChevron = props.noChevron;
      var chevronCenter = props.chevronCenter;
      var virtualListIndex = props.virtualListIndex;
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
          }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
          var linkClasses = Utils.classNames({
            'item-link': true,
            'no-fastclick': noFastclick || noFastClick,
            'smart-select': smartSelect
          }, Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
          linkEl = React.createElement('a', Object.assign({
            ref: function (__reactNode) {
              this$1.__reactRefs['linkEl'] = __reactNode;
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
        'chevron-center': chevronCenter
      }, Mixins.colorClasses(props));

      if (divider || groupTitle) {
        return React.createElement('li', {
          ref: function (__reactNode) {
            this$1.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: liClasses,
          'data-virtual-list-index': virtualListIndex
        }, React.createElement('span', null, this.slots['default'], !this.slots.default && title));
      }

      if (isSimple) {
        return React.createElement('li', {
          ref: function (__reactNode) {
            this$1.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: liClasses,
          'data-virtual-list-index': virtualListIndex
        }, title, this.slots['default']);
      }

      var linkItemEl = link || href || smartSelect || accordionItem ? linkEl : itemContentEl;
      return React.createElement('li', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: liClasses,
        'data-virtual-list-index': virtualListIndex
      }, this.slots['root-start'], swipeout ? React.createElement('div', {
        className: 'swipeout-content'
      }, linkItemEl) : linkItemEl, isSortable && React.createElement('div', {
        className: 'sortable-handler'
      }), (swipeout || accordionItem) && self.slots.default, this.slots['root'], this.slots['root-end']);
    };

    F7ListItem.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var ref = self.refs;
      var el = ref.el;
      var linkEl = ref.linkEl;
      var ref$1 = self.props;
      var link = ref$1.link;
      var href = ref$1.href;
      var smartSelect = ref$1.smartSelect;
      var swipeout = ref$1.swipeout;
      var accordionItem = ref$1.accordionItem;
      var needsEvents = !(link || href || accordionItem || smartSelect);

      if (linkEl) {
        if (!needsEvents) {
          linkEl.removeEventListener('click', self.onClick);
        }

        delete linkEl.f7RouteProps;
      }

      if (el) {
        if (swipeout) {
          el.removeEventListener('swipeout:open', self.onSwipeoutOpen);
          el.removeEventListener('swipeout:opened', self.onSwipeoutOpened);
          el.removeEventListener('swipeout:close', self.onSwipeoutClose);
          el.removeEventListener('swipeout:closed', self.onSwipeoutClosed);
          el.removeEventListener('swipeout:delete', self.onSwipeoutDelete);
          el.removeEventListener('swipeout:deleted', self.onSwipeoutDeleted);
          el.removeEventListener('swipeout:overswipeenter', self.onSwipeoutOverswipeEnter);
          el.removeEventListener('swipeout:overswipeexit', self.onSwipeoutOverswipeExit);
          el.removeEventListener('swipeout', self.onSwipeout);
        }

        if (accordionItem) {
          el.removeEventListener('accordion:beforeopen', self.onAccBeforeOpen);
          el.removeEventListener('accordion:open', self.onAccOpen);
          el.removeEventListener('accordion:opened', self.onAccOpened);
          el.removeEventListener('accordion:beforeclose', self.onAccBeforeClose);
          el.removeEventListener('accordion:close', self.onAccClose);
          el.removeEventListener('accordion:closed', self.onAccClosed);
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
    };

    F7ListItem.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, function (newText) {
        var self = this$1;
        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      });

      __reactComponentWatch(this, 'props.swipeoutOpened', prevProps, prevState, function (opened) {
        var self = this$1;
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
      var ref = self.refs;
      var linkEl = ref.linkEl;
      var ref$1 = self.props;
      var routeProps = ref$1.routeProps;

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
    };

    F7ListItem.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var ref = self.refs;
      var el = ref.el;
      var linkEl = ref.linkEl;
      if (!el) { return; }
      var ref$1 = self.props;
      var link = ref$1.link;
      var href = ref$1.href;
      var smartSelect = ref$1.smartSelect;
      var swipeout = ref$1.swipeout;
      var swipeoutOpened = ref$1.swipeoutOpened;
      var accordionItem = ref$1.accordionItem;
      var smartSelectParams = ref$1.smartSelectParams;
      var routeProps = ref$1.routeProps;
      var tooltip = ref$1.tooltip;
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

      if (swipeout) {
        el.addEventListener('swipeout:open', self.onSwipeoutOpen);
        el.addEventListener('swipeout:opened', self.onSwipeoutOpened);
        el.addEventListener('swipeout:close', self.onSwipeoutClose);
        el.addEventListener('swipeout:closed', self.onSwipeoutClosed);
        el.addEventListener('swipeout:delete', self.onSwipeoutDelete);
        el.addEventListener('swipeout:deleted', self.onSwipeoutDeleted);
        el.addEventListener('swipeout:overswipeenter', self.onSwipeoutOverswipeEnter);
        el.addEventListener('swipeout:overswipeexit', self.onSwipeoutOverswipeExit);
        el.addEventListener('swipeout', self.onSwipeout);
      }

      if (accordionItem) {
        el.addEventListener('accordion:beforeopen', self.onAccBeforeOpen);
        el.addEventListener('accordion:open', self.onAccOpen);
        el.addEventListener('accordion:opened', self.onAccOpened);
        el.addEventListener('accordion:beforeclose', self.onAccBeforeClose);
        el.addEventListener('accordion:close', self.onAccClose);
        el.addEventListener('accordion:closed', self.onAccClosed);
      }

      self.$f7ready(function (f7) {
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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7ListItem.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7ListItem.prototype, prototypeAccessors );

    return F7ListItem;
  }(React.Component));

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
  }, Mixins.colorProps, Mixins.linkRouterProps, Mixins.linkActionsProps));

  F7ListItem.displayName = 'f7-list-item';

  var F7List = /*@__PURE__*/(function (superclass) {
    function F7List(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onSortableEnable', 'onSortableDisable', 'onSortableSort', 'onTabShow', 'onTabHide', 'onSubmit']);
      })();
    }

    if ( superclass ) F7List.__proto__ = superclass;
    F7List.prototype = Object.create( superclass && superclass.prototype );
    F7List.prototype.constructor = F7List;

    var prototypeAccessors = { classes: { configurable: true },slots: { configurable: true },refs: { configurable: true } };

    F7List.prototype.onSubmit = function onSubmit (event) {
      this.dispatchEvent('submit', event);
    };

    F7List.prototype.onSortableEnable = function onSortableEnable (event) {
      this.dispatchEvent('sortable:enable sortableEnable', event);
    };

    F7List.prototype.onSortableDisable = function onSortableDisable (event) {
      this.dispatchEvent('sortable:disable sortableDisable', event);
    };

    F7List.prototype.onSortableSort = function onSortableSort (event) {
      var sortData = event.detail;
      this.dispatchEvent('sortable:sort sortableSort', event, sortData);
    };

    F7List.prototype.onTabShow = function onTabShow (event) {
      this.dispatchEvent('tab:show tabShow', event);
    };

    F7List.prototype.onTabHide = function onTabHide (event) {
      this.dispatchEvent('tab:hide tabHide', event);
    };

    prototypeAccessors.classes.get = function () {
      var self = this;
      var props = self.props;
      var inset = props.inset;
      var tabletInset = props.tabletInset;
      var mediaList = props.mediaList;
      var simpleList = props.simpleList;
      var linksList = props.linksList;
      var sortable = props.sortable;
      var accordionList = props.accordionList;
      var contactsList = props.contactsList;
      var virtualList = props.virtualList;
      var sortableEnabled = props.sortableEnabled;
      var tab = props.tab;
      var tabActive = props.tabActive;
      var noHairlines = props.noHairlines;
      var noHairlinesIos = props.noHairlinesIos;
      var noHairlinesMd = props.noHairlinesMd;
      var noHairlinesAurora = props.noHairlinesAurora;
      var noHairlinesBetween = props.noHairlinesBetween;
      var noHairlinesBetweenIos = props.noHairlinesBetweenIos;
      var noHairlinesBetweenMd = props.noHairlinesBetweenMd;
      var noHairlinesBetweenAurora = props.noHairlinesBetweenAurora;
      var formStoreData = props.formStoreData;
      var inlineLabels = props.inlineLabels;
      var className = props.className;
      var noChevron = props.noChevron;
      var chevronCenter = props.chevronCenter;
      return Utils.classNames(className, 'list', {
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
        'no-hairlines-aurora': noHairlinesAurora,
        'no-hairlines-between-aurora': noHairlinesBetweenAurora,
        'form-store-data': formStoreData,
        'inline-labels': inlineLabels,
        'no-chevron': noChevron,
        'chevron-center': chevronCenter
      }, Mixins.colorClasses(props));
    };

    F7List.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var form = props.form;
      var ref = self.slots;
      var slotsList = ref.list;
      var slotsDefault = ref.default;
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
          ref: function (__reactNode) {
            this$1.__reactRefs['el'] = __reactNode;
          },
          style: style,
          className: self.classes
        }, self.slots['before-list'], rootChildrenBeforeList, React.createElement('ul', null, ulChildren), self.slots['after-list'], rootChildrenAfterList);
      } else {
        return React.createElement(ListTag, {
          id: id,
          ref: function (__reactNode) {
            this$1.__reactRefs['el'] = __reactNode;
          },
          style: style,
          className: self.classes
        }, self.slots['before-list'], rootChildrenBeforeList, self.slots['after-list'], rootChildrenAfterList);
      }
    };

    F7List.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var el = self.refs.el;

      if (el) {
        el.removeEventListener('sortable:enable', self.onSortableEnable);
        el.removeEventListener('sortable:disable', self.onSortableDisable);
        el.removeEventListener('sortable:sort', self.onSortableSort);
        el.removeEventListener('tab:show', self.onTabShow);
        el.removeEventListener('tab:hide', self.onTabHide);

        if (self.props.form) {
          el.removeEventListener('submit', self.onSubmit);
        }
      }

      if (!(self.virtualList && self.f7VirtualList)) { return; }
      if (self.f7VirtualList.destroy) { self.f7VirtualList.destroy(); }
    };

    F7List.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      var ref = self.props;
      var virtualList = ref.virtualList;
      var virtualListParams = ref.virtualListParams;
      var form = ref.form;

      if (el) {
        el.addEventListener('sortable:enable', self.onSortableEnable);
        el.addEventListener('sortable:disable', self.onSortableDisable);
        el.addEventListener('sortable:sort', self.onSortableSort);
        el.addEventListener('tab:show', self.onTabShow);
        el.addEventListener('tab:hide', self.onTabHide);

        if (form) {
          el.addEventListener('submit', self.onSubmit);
        }
      }

      if (!virtualList) { return; }
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
        if (!template && !vlParams.renderItem && !vlParams.itemTemplate && !vlParams.renderExternal) { return; }
        if (template) { template = self.$t7.compile(template); }
        self.f7VirtualList = f7.virtualList.create(Utils.extend({
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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7List.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7List.prototype, prototypeAccessors );

    return F7List;
  }(React.Component));

  __reactComponentSetProps(F7List, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
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

  var F7LoginScreenTitle = /*@__PURE__*/(function (superclass) {
    function F7LoginScreenTitle(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7LoginScreenTitle.__proto__ = superclass;
    F7LoginScreenTitle.prototype = Object.create( superclass && superclass.prototype );
    F7LoginScreenTitle.prototype.constructor = F7LoginScreenTitle;

    var prototypeAccessors = { slots: { configurable: true } };

    F7LoginScreenTitle.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'login-screen-title', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7LoginScreenTitle.prototype, prototypeAccessors );

    return F7LoginScreenTitle;
  }(React.Component));

  __reactComponentSetProps(F7LoginScreenTitle, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7LoginScreenTitle.displayName = 'f7-login-screen-title';

  var F7LoginScreen = /*@__PURE__*/(function (superclass) {
    function F7LoginScreen(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onOpen', 'onOpened', 'onClose', 'onClosed']);
      })();
    }

    if ( superclass ) F7LoginScreen.__proto__ = superclass;
    F7LoginScreen.prototype = Object.create( superclass && superclass.prototype );
    F7LoginScreen.prototype.constructor = F7LoginScreen;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7LoginScreen.prototype.onOpen = function onOpen (event) {
      this.dispatchEvent('loginscreen:open loginScreenOpen', event);
    };

    F7LoginScreen.prototype.onOpened = function onOpened (event) {
      this.dispatchEvent('loginscreen:opened loginScreenOpened', event);
    };

    F7LoginScreen.prototype.onClose = function onClose (event) {
      this.dispatchEvent('loginscreen:close loginScreenClose', event);
    };

    F7LoginScreen.prototype.onClosed = function onClosed (event) {
      this.dispatchEvent('loginscreen:closed loginScreenClosed', event);
    };

    F7LoginScreen.prototype.open = function open (animate) {
      var self = this;
      var el = self.refs.el;
      if (!self.$f7 || !el) { return undefined; }
      return self.$f7.loginScreen.open(el, animate);
    };

    F7LoginScreen.prototype.close = function close (animate) {
      var self = this;
      var el = self.refs.el;
      if (!self.$f7 || !el) { return undefined; }
      return self.$f7.loginScreen.close(el, animate);
    };

    F7LoginScreen.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'login-screen', Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    F7LoginScreen.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var el = self.refs.el;
      if (self.f7LoginScreen) { self.f7LoginScreen.destroy(); }
      if (!el) { return; }
      el.removeEventListener('loginscreen:open', self.onOpen);
      el.removeEventListener('loginscreen:opened', self.onOpened);
      el.removeEventListener('loginscreen:close', self.onClose);
      el.removeEventListener('loginscreen:closed', self.onClosed);
    };

    F7LoginScreen.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      if (!el) { return; }
      el.addEventListener('loginscreen:open', self.onOpen);
      el.addEventListener('loginscreen:opened', self.onOpened);
      el.addEventListener('loginscreen:close', self.onClose);
      el.addEventListener('loginscreen:closed', self.onClosed);
      self.$f7ready(function () {
        self.f7LoginScreen = self.$f7.loginScreen.create({
          el: el
        });

        if (self.props.opened) {
          self.f7LoginScreen.open(false);
        }
      });
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7LoginScreen.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    F7LoginScreen.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.opened', prevProps, prevState, function (opened) {
        var self = this$1;
        if (!self.f7LoginScreen) { return; }

        if (opened) {
          self.f7LoginScreen.open();
        } else {
          self.f7LoginScreen.close();
        }
      });
    };

    Object.defineProperties( F7LoginScreen.prototype, prototypeAccessors );

    return F7LoginScreen;
  }(React.Component));

  __reactComponentSetProps(F7LoginScreen, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    opened: Boolean
  }, Mixins.colorProps));

  F7LoginScreen.displayName = 'f7-login-screen';

  var F7MenuDropdownItem = /*@__PURE__*/(function (superclass) {
    function F7MenuDropdownItem(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onClick']);
      })();
    }

    if ( superclass ) F7MenuDropdownItem.__proto__ = superclass;
    F7MenuDropdownItem.prototype = Object.create( superclass && superclass.prototype );
    F7MenuDropdownItem.prototype.constructor = F7MenuDropdownItem;

    var prototypeAccessors = { attrs: { configurable: true },slots: { configurable: true },refs: { configurable: true } };

    F7MenuDropdownItem.prototype.onClick = function onClick (event) {
      this.dispatchEvent('click', event);
    };

    prototypeAccessors.attrs.get = function () {
      var self = this;
      var props = self.props;
      var link = props.link;
      var href = props.href;
      var target = props.target;
      var hrefComputed = href;
      if (typeof hrefComputed === 'undefined' && link) { hrefComputed = '#'; }
      return Utils.extend({
        href: hrefComputed,
        target: target
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    };

    F7MenuDropdownItem.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var id = props.id;
      var className = props.className;
      var style = props.style;
      var link = props.link;
      var href = props.href;
      var text = props.text;
      var divider = props.divider;
      var menuClose = props.menuClose;
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        className: classes,
        id: id,
        style: style
      }, self.attrs), text, this.slots['default']);
    };

    F7MenuDropdownItem.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var el = self.refs.el;
      if (!el) { return; }
      el.removeEventListener('click', self.onClick);
      delete el.f7RouteProps;
    };

    F7MenuDropdownItem.prototype.componentDidUpdate = function componentDidUpdate () {
      var self = this;
      var el = self.refs.el;
      if (!el) { return; }
      var ref = self.props;
      var routeProps = ref.routeProps;
      if (routeProps) { el.f7RouteProps = routeProps; }
    };

    F7MenuDropdownItem.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      if (!el) { return; }
      el.addEventListener('click', self.onClick);
      var ref = self.props;
      var routeProps = ref.routeProps;
      if (routeProps) { el.f7RouteProps = routeProps; }
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7MenuDropdownItem.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7MenuDropdownItem.prototype, prototypeAccessors );

    return F7MenuDropdownItem;
  }(React.Component));

  __reactComponentSetProps(F7MenuDropdownItem, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    text: String,
    link: Boolean,
    href: String,
    target: String,
    divider: Boolean
  }, Mixins.colorProps, Mixins.linkRouterProps, Mixins.linkActionsProps));

  F7MenuDropdownItem.displayName = 'f7-menu-dropdown-item';

  var F7MenuDropdown = /*@__PURE__*/(function (superclass) {
    function F7MenuDropdown(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7MenuDropdown.__proto__ = superclass;
    F7MenuDropdown.prototype = Object.create( superclass && superclass.prototype );
    F7MenuDropdown.prototype.constructor = F7MenuDropdown;

    var prototypeAccessors = { slots: { configurable: true } };

    F7MenuDropdown.prototype.render = function render () {
      var self = this;
      var props = self.props;
      var id = props.id;
      var className = props.className;
      var style = props.style;
      var contentHeight = props.contentHeight;
      var position = props.position;
      var left = props.left;
      var center = props.center;
      var right = props.right;
      var positionComputed = position || 'left';
      if (left) { positionComputed = 'left'; }
      if (center) { positionComputed = 'center'; }
      if (right) { positionComputed = 'right'; }
      var classes = Utils.classNames('menu-dropdown', ("menu-dropdown-" + positionComputed), Mixins.colorClasses(props), className);
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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7MenuDropdown.prototype, prototypeAccessors );

    return F7MenuDropdown;
  }(React.Component));

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

  var F7MenuItem = /*@__PURE__*/(function (superclass) {
    function F7MenuItem(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onClick', 'onOpened', 'onClosed']);
      })();
    }

    if ( superclass ) F7MenuItem.__proto__ = superclass;
    F7MenuItem.prototype = Object.create( superclass && superclass.prototype );
    F7MenuItem.prototype.constructor = F7MenuItem;

    var prototypeAccessors = { attrs: { configurable: true },slots: { configurable: true },refs: { configurable: true } };

    F7MenuItem.prototype.onClick = function onClick (e) {
      this.dispatchEvent('click', e);
    };

    F7MenuItem.prototype.onOpened = function onOpened (e) {
      this.dispatchEvent('menuOpened menu:opened', e);
    };

    F7MenuItem.prototype.onClosed = function onClosed (e) {
      this.dispatchEvent('menuClosed menu:closed', e);
    };

    prototypeAccessors.attrs.get = function () {
      var self = this;
      var props = self.props;
      var href = props.href;
      var link = props.link;
      var target = props.target;
      var hrefComputed = href;
      if (typeof hrefComputed === 'undefined' && link) { hrefComputed = '#'; }
      return Utils.extend({
        href: hrefComputed,
        target: target
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    };

    F7MenuItem.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var id = props.id;
      var className = props.className;
      var style = props.style;
      var link = props.link;
      var href = props.href;
      var text = props.text;
      var dropdown = props.dropdown;
      var iconOnly = props.iconOnly;
      var icon = props.icon;
      var iconColor = props.iconColor;
      var iconSize = props.iconSize;
      var iconMaterial = props.iconMaterial;
      var iconIon = props.iconIon;
      var iconFa = props.iconFa;
      var iconF7 = props.iconF7;
      var iconMd = props.iconMd;
      var iconIos = props.iconIos;
      var iconAurora = props.iconAurora;
      var slots = self.slots;
      var iconEl;
      var iconOnlyComputed;

      if (icon || iconMaterial || iconIon || iconFa || iconF7 || iconMd || iconIos || iconAurora) {
        iconEl = React.createElement(F7Icon, {
          material: iconMaterial,
          f7: iconF7,
          fa: iconFa,
          ion: iconIon,
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        className: classes,
        id: id,
        style: style
      }, self.attrs), (text || slots.text && slots.text.length || iconEl) && React.createElement('div', {
        className: 'menu-item-content'
      }, text, iconEl, this.slots['text']), this.slots['default']);
    };

    F7MenuItem.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var el = self.refs.el;
      if (!el) { return; }
      el.removeEventListener('click', self.onClick);
      el.removeEventListener('menu:opened', self.onOpened);
      el.removeEventListener('menu:closed', self.onClosed);
      delete el.f7RouteProps;
    };

    F7MenuItem.prototype.componentDidUpdate = function componentDidUpdate () {
      var self = this;
      var el = self.refs.el;
      if (!el) { return; }
      var ref = self.props;
      var routeProps = ref.routeProps;
      if (routeProps) { el.f7RouteProps = routeProps; }
    };

    F7MenuItem.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      if (!el) { return; }
      el.addEventListener('click', self.onClick);
      el.addEventListener('menu:opened', self.onOpened);
      el.addEventListener('menu:closed', self.onClosed);
      var ref = self.props;
      var routeProps = ref.routeProps;
      if (routeProps) { el.f7RouteProps = routeProps; }
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7MenuItem.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7MenuItem.prototype, prototypeAccessors );

    return F7MenuItem;
  }(React.Component));

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
  }, Mixins.colorProps, Mixins.linkIconProps, Mixins.linkRouterProps, Mixins.linkActionsProps));

  F7MenuItem.displayName = 'f7-menu-item';

  var F7Menu = /*@__PURE__*/(function (superclass) {
    function F7Menu(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7Menu.__proto__ = superclass;
    F7Menu.prototype = Object.create( superclass && superclass.prototype );
    F7Menu.prototype.constructor = F7Menu;

    var prototypeAccessors = { slots: { configurable: true } };

    F7Menu.prototype.render = function render () {
      var self = this;
      var props = self.props;
      var id = props.id;
      var className = props.className;
      var style = props.style;
      return React.createElement('div', {
        className: Utils.classNames('menu', Mixins.colorClasses(props), className),
        id: id,
        style: style
      }, React.createElement('div', {
        className: 'menu-inner'
      }, this.slots['default']));
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7Menu.prototype, prototypeAccessors );

    return F7Menu;
  }(React.Component));

  __reactComponentSetProps(F7Menu, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7Menu.displayName = 'f7-menu';

  var F7Message = /*@__PURE__*/(function (superclass) {
    function F7Message(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onClick', 'onNameClick', 'onTextClick', 'onAvatarClick', 'onHeaderClick', 'onFooterClick', 'onBubbleClick']);
      })();
    }

    if ( superclass ) F7Message.__proto__ = superclass;
    F7Message.prototype = Object.create( superclass && superclass.prototype );
    F7Message.prototype.constructor = F7Message;

    var prototypeAccessors = { classes: { configurable: true },slots: { configurable: true },refs: { configurable: true } };

    F7Message.prototype.onClick = function onClick (event) {
      this.dispatchEvent('click', event);
    };

    F7Message.prototype.onNameClick = function onNameClick (event) {
      this.dispatchEvent('click:name clickName', event);
    };

    F7Message.prototype.onTextClick = function onTextClick (event) {
      this.dispatchEvent('click:text clickText', event);
    };

    F7Message.prototype.onAvatarClick = function onAvatarClick (event) {
      this.dispatchEvent('click:avatar clickAvatar', event);
    };

    F7Message.prototype.onHeaderClick = function onHeaderClick (event) {
      this.dispatchEvent('click:header clickHeader', event);
    };

    F7Message.prototype.onFooterClick = function onFooterClick (event) {
      this.dispatchEvent('click:footer clickFooter', event);
    };

    F7Message.prototype.onBubbleClick = function onBubbleClick (event) {
      this.dispatchEvent('click:bubble clickBubble', event);
    };

    prototypeAccessors.classes.get = function () {
      var self = this;
      var props = self.props;
      var type = props.type;
      var typing = props.typing;
      var first = props.first;
      var last = props.last;
      var tail = props.tail;
      var sameName = props.sameName;
      var sameHeader = props.sameHeader;
      var sameFooter = props.sameFooter;
      var sameAvatar = props.sameAvatar;
      var className = props.className;
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
    };

    F7Message.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var text = props.text;
      var name = props.name;
      var avatar = props.avatar;
      var image = props.image;
      var header = props.header;
      var footer = props.footer;
      var textHeader = props.textHeader;
      var textFooter = props.textFooter;
      var typing = props.typing;
      var id = props.id;
      var style = props.style;
      var ref = self.slots;
      var slotsStart = ref.start;
      var slotsEnd = ref.end;
      var slotsDefault = ref.default;
      var slotsContentStart = ref['content-start'];
      var slotsContentEnd = ref['content-end'];
      var slotsAvatar = ref.avatar;
      var slotsName = ref.name;
      var slotsHeader = ref.header;
      var slotsFooter = ref.footer;
      var slotsImage = ref.image;
      var slotsText = ref.text;
      var slotsTextHeader = ref['text-header'];
      var slotsTextFooter = ref['text-footer'];
      var slotsBubbleStart = ref['bubble-start'];
      var slotsBubbleEnd = ref['bubble-end'];
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes
      }, slotsStart, (avatar || slotsAvatar) && React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['avatarEl'] = __reactNode;
        },
        className: 'message-avatar',
        style: {
          backgroundImage: avatar && ("url(" + avatar + ")")
        }
      }, slotsAvatar), React.createElement('div', {
        className: 'message-content'
      }, slotsContentStart, (slotsName || name) && React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['nameEl'] = __reactNode;
        },
        className: 'message-name'
      }, slotsName || name), (slotsHeader || header) && React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['headerEl'] = __reactNode;
        },
        className: 'message-header'
      }, slotsHeader || header), React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['bubbleEl'] = __reactNode;
        },
        className: 'message-bubble'
      }, slotsBubbleStart, (slotsImage || image) && React.createElement('div', {
        className: 'message-image'
      }, slotsImage || React.createElement('img', {
        src: image
      })), (slotsTextHeader || textHeader) && React.createElement('div', {
        className: 'message-text-header'
      }, slotsTextHeader || textHeader), (slotsText || text || typing) && React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['textEl'] = __reactNode;
        },
        className: 'message-text'
      }, slotsText || text, typing && React.createElement('div', {
        className: 'message-typing-indicator'
      }, React.createElement('div', null), React.createElement('div', null), React.createElement('div', null))), (slotsTextFooter || textFooter) && React.createElement('div', {
        className: 'message-text-footer'
      }, slotsTextFooter || textFooter), slotsBubbleEnd, slotsDefault), (slotsFooter || footer) && React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['footerEl'] = __reactNode;
        },
        className: 'message-footer'
      }, slotsFooter || footer), slotsContentEnd), slotsEnd);
    };

    F7Message.prototype.componentWillUnmount = function componentWillUnmount () {
      var ref = this.refs;
      var el = ref.el;
      var nameEl = ref.nameEl;
      var textEl = ref.textEl;
      var avatarEl = ref.avatarEl;
      var headerEl = ref.headerEl;
      var footerEl = ref.footerEl;
      var bubbleEl = ref.bubbleEl;
      el.removeEventListener('click', this.onClick);
      if (nameEl) { nameEl.removeEventListener('click', this.onNameClick); }
      if (textEl) { textEl.removeEventListener('click', this.onTextClick); }
      if (avatarEl) { avatarEl.removeEventListener('click', this.onAvatarClick); }
      if (headerEl) { headerEl.removeEventListener('click', this.onHeaderClick); }
      if (footerEl) { footerEl.removeEventListener('click', this.onFooterClick); }
      if (bubbleEl) { bubbleEl.removeEventListener('click', this.onBubbleClick); }
    };

    F7Message.prototype.componentDidMount = function componentDidMount () {
      var ref = this.refs;
      var el = ref.el;
      var nameEl = ref.nameEl;
      var textEl = ref.textEl;
      var avatarEl = ref.avatarEl;
      var headerEl = ref.headerEl;
      var footerEl = ref.footerEl;
      var bubbleEl = ref.bubbleEl;
      el.addEventListener('click', this.onClick);
      if (nameEl) { nameEl.addEventListener('click', this.onNameClick); }
      if (textEl) { textEl.addEventListener('click', this.onTextClick); }
      if (avatarEl) { avatarEl.addEventListener('click', this.onAvatarClick); }
      if (headerEl) { headerEl.addEventListener('click', this.onHeaderClick); }
      if (footerEl) { footerEl.addEventListener('click', this.onFooterClick); }
      if (bubbleEl) { bubbleEl.addEventListener('click', this.onBubbleClick); }
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Message.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Message.prototype, prototypeAccessors );

    return F7Message;
  }(React.Component));

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

  var F7MessagebarAttachment = /*@__PURE__*/(function (superclass) {
    function F7MessagebarAttachment(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onClick', 'onDeleteClick']);
      })();
    }

    if ( superclass ) F7MessagebarAttachment.__proto__ = superclass;
    F7MessagebarAttachment.prototype = Object.create( superclass && superclass.prototype );
    F7MessagebarAttachment.prototype.constructor = F7MessagebarAttachment;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7MessagebarAttachment.prototype.onClick = function onClick (event) {
      this.dispatchEvent('attachment:click attachmentClick', event);
    };

    F7MessagebarAttachment.prototype.onDeleteClick = function onDeleteClick (event) {
      this.dispatchEvent('attachment:delete attachmentDelete', event);
    };

    F7MessagebarAttachment.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var deletable = props.deletable;
      var image = props.image;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'messagebar-attachment', Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, image && React.createElement('img', {
        src: image
      }), deletable && React.createElement('span', {
        ref: function (__reactNode) {
          this$1.__reactRefs['deleteEl'] = __reactNode;
        },
        className: 'messagebar-attachment-delete'
      }), this.slots['default']);
    };

    F7MessagebarAttachment.prototype.componentWillUnmount = function componentWillUnmount () {
      this.refs.el.removeEventListener('click', this.onClick);

      if (this.refs.deleteEl) {
        this.refs.deleteEl.removeEventListener('click', this.onDeleteClick);
      }
    };

    F7MessagebarAttachment.prototype.componentDidMount = function componentDidMount () {
      this.refs.el.addEventListener('click', this.onClick);

      if (this.refs.deleteEl) {
        this.refs.deleteEl.addEventListener('click', this.onDeleteClick);
      }
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7MessagebarAttachment.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7MessagebarAttachment.prototype, prototypeAccessors );

    return F7MessagebarAttachment;
  }(React.Component));

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

  var F7MessagebarAttachments = /*@__PURE__*/(function (superclass) {
    function F7MessagebarAttachments(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7MessagebarAttachments.__proto__ = superclass;
    F7MessagebarAttachments.prototype = Object.create( superclass && superclass.prototype );
    F7MessagebarAttachments.prototype.constructor = F7MessagebarAttachments;

    var prototypeAccessors = { slots: { configurable: true } };

    F7MessagebarAttachments.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'messagebar-attachments', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7MessagebarAttachments.prototype, prototypeAccessors );

    return F7MessagebarAttachments;
  }(React.Component));

  __reactComponentSetProps(F7MessagebarAttachments, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7MessagebarAttachments.displayName = 'f7-messagebar-attachments';

  var F7MessagebarSheetImage = /*@__PURE__*/(function (superclass) {
    function F7MessagebarSheetImage(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onChange']);
      })();
    }

    if ( superclass ) F7MessagebarSheetImage.__proto__ = superclass;
    F7MessagebarSheetImage.prototype = Object.create( superclass && superclass.prototype );
    F7MessagebarSheetImage.prototype.constructor = F7MessagebarSheetImage;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7MessagebarSheetImage.prototype.onChange = function onChange (event) {
      if (this.props.checked) { this.dispatchEvent('checked', event); }else { this.dispatchEvent('unchecked', event); }
      this.dispatchEvent('change', event);
    };

    F7MessagebarSheetImage.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var image = props.image;
      var checked = props.checked;
      var id = props.id;
      var className = props.className;
      var style = props.style;
      var classes = Utils.classNames(className, 'messagebar-sheet-image', 'checkbox', Mixins.colorClasses(props));
      var styles = Utils.extend({
        backgroundImage: image && ("url(" + image + ")")
      }, style || {});
      var inputEl;
      {
        inputEl = React.createElement('input', {
          ref: function (__reactNode) {
            this$1.__reactRefs['inputEl'] = __reactNode;
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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7MessagebarSheetImage.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7MessagebarSheetImage.prototype, prototypeAccessors );

    return F7MessagebarSheetImage;
  }(React.Component));

  __reactComponentSetProps(F7MessagebarSheetImage, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    image: String,
    checked: Boolean
  }, Mixins.colorProps));

  F7MessagebarSheetImage.displayName = 'f7-messagebar-sheet-image';

  var F7MessagebarSheetItem = /*@__PURE__*/(function (superclass) {
    function F7MessagebarSheetItem(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7MessagebarSheetItem.__proto__ = superclass;
    F7MessagebarSheetItem.prototype = Object.create( superclass && superclass.prototype );
    F7MessagebarSheetItem.prototype.constructor = F7MessagebarSheetItem;

    var prototypeAccessors = { slots: { configurable: true } };

    F7MessagebarSheetItem.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'messagebar-sheet-item', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7MessagebarSheetItem.prototype, prototypeAccessors );

    return F7MessagebarSheetItem;
  }(React.Component));

  __reactComponentSetProps(F7MessagebarSheetItem, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7MessagebarSheetItem.displayName = 'f7-messagebar-sheet-item';

  var F7MessagebarSheet = /*@__PURE__*/(function (superclass) {
    function F7MessagebarSheet(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7MessagebarSheet.__proto__ = superclass;
    F7MessagebarSheet.prototype = Object.create( superclass && superclass.prototype );
    F7MessagebarSheet.prototype.constructor = F7MessagebarSheet;

    var prototypeAccessors = { slots: { configurable: true } };

    F7MessagebarSheet.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'messagebar-sheet', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7MessagebarSheet.prototype, prototypeAccessors );

    return F7MessagebarSheet;
  }(React.Component));

  __reactComponentSetProps(F7MessagebarSheet, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7MessagebarSheet.displayName = 'f7-messagebar-sheet';

  var F7Messagebar = /*@__PURE__*/(function (superclass) {
    function F7Messagebar(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onChange', 'onInput', 'onFocus', 'onBlur', 'onClick', 'onDeleteAttachment', 'onClickAttachment', 'onResizePage']);
      })();
    }

    if ( superclass ) F7Messagebar.__proto__ = superclass;
    F7Messagebar.prototype = Object.create( superclass && superclass.prototype );
    F7Messagebar.prototype.constructor = F7Messagebar;

    var prototypeAccessors = { classes: { configurable: true },slots: { configurable: true },refs: { configurable: true } };

    F7Messagebar.prototype.clear = function clear () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (!this.f7Messagebar) { return undefined; }
      return (ref = this.f7Messagebar).clear.apply(ref, args);
    };

    F7Messagebar.prototype.getValue = function getValue () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (!this.f7Messagebar) { return undefined; }
      return (ref = this.f7Messagebar).getValue.apply(ref, args);
    };

    F7Messagebar.prototype.setValue = function setValue () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (!this.f7Messagebar) { return undefined; }
      return (ref = this.f7Messagebar).setValue.apply(ref, args);
    };

    F7Messagebar.prototype.setPlaceholder = function setPlaceholder () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (!this.f7Messagebar) { return undefined; }
      return (ref = this.f7Messagebar).setPlaceholder.apply(ref, args);
    };

    F7Messagebar.prototype.resize = function resize () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (!this.f7Messagebar) { return undefined; }
      return (ref = this.f7Messagebar).resizePage.apply(ref, args);
    };

    F7Messagebar.prototype.focus = function focus () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (!this.f7Messagebar) { return undefined; }
      return (ref = this.f7Messagebar).focus.apply(ref, args);
    };

    F7Messagebar.prototype.blur = function blur () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (!this.f7Messagebar) { return undefined; }
      return (ref = this.f7Messagebar).blur.apply(ref, args);
    };

    F7Messagebar.prototype.attachmentsShow = function attachmentsShow () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (!this.f7Messagebar) { return undefined; }
      return (ref = this.f7Messagebar).attachmentsShow.apply(ref, args);
    };

    F7Messagebar.prototype.attachmentsHide = function attachmentsHide () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (!this.f7Messagebar) { return undefined; }
      return (ref = this.f7Messagebar).attachmentsHide.apply(ref, args);
    };

    F7Messagebar.prototype.attachmentsToggle = function attachmentsToggle () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (!this.f7Messagebar) { return undefined; }
      return (ref = this.f7Messagebar).attachmentsToggle.apply(ref, args);
    };

    F7Messagebar.prototype.sheetShow = function sheetShow () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (!this.f7Messagebar) { return undefined; }
      return (ref = this.f7Messagebar).sheetShow.apply(ref, args);
    };

    F7Messagebar.prototype.sheetHide = function sheetHide () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (!this.f7Messagebar) { return undefined; }
      return (ref = this.f7Messagebar).sheetHide.apply(ref, args);
    };

    F7Messagebar.prototype.sheetToggle = function sheetToggle () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (!this.f7Messagebar) { return undefined; }
      return (ref = this.f7Messagebar).sheetToggle.apply(ref, args);
    };

    F7Messagebar.prototype.onChange = function onChange (event) {
      this.dispatchEvent('change', event);
    };

    F7Messagebar.prototype.onInput = function onInput (event) {
      this.dispatchEvent('input', event);
    };

    F7Messagebar.prototype.onFocus = function onFocus (event) {
      this.dispatchEvent('focus', event);
    };

    F7Messagebar.prototype.onBlur = function onBlur (event) {
      this.dispatchEvent('blur', event);
    };

    F7Messagebar.prototype.onClick = function onClick (event) {
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
    };

    F7Messagebar.prototype.onDeleteAttachment = function onDeleteAttachment (event) {
      this.dispatchEvent('messagebar:attachmentdelete messagebarAttachmentDelete', event);
    };

    F7Messagebar.prototype.onClickAttachment = function onClickAttachment (event) {
      this.dispatchEvent('messagebar:attachmentclick messagebarAttachmentClick', event);
    };

    F7Messagebar.prototype.onResizePage = function onResizePage (event) {
      this.dispatchEvent('messagebar:resizepage messagebarResizePage', event);
    };

    prototypeAccessors.classes.get = function () {
      var self = this;
      var props = self.props;
      var className = props.className;
      var attachmentsVisible = props.attachmentsVisible;
      var sheetVisible = props.sheetVisible;
      return Utils.classNames(className, 'toolbar', 'messagebar', {
        'messagebar-attachments-visible': attachmentsVisible,
        'messagebar-sheet-visible': sheetVisible
      }, Mixins.colorClasses(props));
    };

    F7Messagebar.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var ref = self.props;
      var placeholder = ref.placeholder;
      var disabled = ref.disabled;
      var name = ref.name;
      var readonly = ref.readonly;
      var resizable = ref.resizable;
      var value = ref.value;
      var sendLink = ref.sendLink;
      var id = ref.id;
      var style = ref.style;
      var ref$1 = self.slots;
      var slotsDefault = ref$1.default;
      var slotsBeforeInner = ref$1['before-inner'];
      var slotsAfterInner = ref$1['after-inner'];
      var slotsSendLink = ref$1['send-link'];
      var slotsInnerStart = ref$1['inner-start'];
      var slotsInnerEnd = ref$1['inner-end'];
      var slotsBeforeArea = ref$1['before-area'];
      var slotsAfterArea = ref$1['after-area'];
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes
      }, slotsBeforeInner, React.createElement('div', {
        className: 'toolbar-inner'
      }, slotsInnerStart, React.createElement('div', {
        className: 'messagebar-area'
      }, slotsBeforeArea, messagebarAttachmentsEl, React.createElement(F7Input, Object.assign({
        ref: function (__reactNode) {
          this$1.__reactRefs['area'] = __reactNode;
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
    };

    F7Messagebar.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      if (self.f7Messagebar && self.f7Messagebar.destroy) { self.f7Messagebar.destroy(); }
      var el = self.refs.el;
      if (!el) { return; }
      el.removeEventListener('messagebar:attachmentdelete', self.onDeleteAttachment);
      el.removeEventListener('messagebar:attachmentclick', self.onClickAttachment);
      el.removeEventListener('messagebar:resizepage', self.onResizePage);
    };

    F7Messagebar.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.sheetVisible', prevProps, prevState, function () {
        var self = this$1;
        if (!self.props.resizable || !self.f7Messagebar) { return; }
        self.updateSheetVisible = true;
      });

      __reactComponentWatch(this, 'props.attachmentsVisible', prevProps, prevState, function () {
        var self = this$1;
        if (!self.props.resizable || !self.f7Messagebar) { return; }
        self.updateAttachmentsVisible = true;
      });

      var self = this;
      if (!self.f7Messagebar) { return; }
      var ref = self.props;
      var sheetVisible = ref.sheetVisible;
      var attachmentsVisible = ref.attachmentsVisible;

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
    };

    F7Messagebar.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var ref = self.props;
      var init = ref.init;
      var top = ref.top;
      var resizePage = ref.resizePage;
      var bottomOffset = ref.bottomOffset;
      var topOffset = ref.topOffset;
      var maxHeight = ref.maxHeight;
      if (!init) { return; }
      var el = self.refs.el;
      if (!el) { return; }
      el.addEventListener('messagebar:attachmentdelete', self.onDeleteAttachment);
      el.addEventListener('messagebar:attachmentclick', self.onClickAttachment);
      el.addEventListener('messagebar:resizepage', self.onResizePage);
      var params = Utils.noUndefinedProps({
        el: el,
        top: top,
        resizePage: resizePage,
        bottomOffset: bottomOffset,
        topOffset: topOffset,
        maxHeight: maxHeight
      });
      self.$f7ready(function () {
        self.f7Messagebar = self.$f7.messagebar.create(params);
      });
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Messagebar.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Messagebar.prototype, prototypeAccessors );

    return F7Messagebar;
  }(React.Component));

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

  var F7MessagesTitle = /*@__PURE__*/(function (superclass) {
    function F7MessagesTitle(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7MessagesTitle.__proto__ = superclass;
    F7MessagesTitle.prototype = Object.create( superclass && superclass.prototype );
    F7MessagesTitle.prototype.constructor = F7MessagesTitle;

    var prototypeAccessors = { slots: { configurable: true } };

    F7MessagesTitle.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'messages-title', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7MessagesTitle.prototype, prototypeAccessors );

    return F7MessagesTitle;
  }(React.Component));

  __reactComponentSetProps(F7MessagesTitle, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7MessagesTitle.displayName = 'f7-messages-title';

  var F7Messages = /*@__PURE__*/(function (superclass) {
    function F7Messages(props, context) {
      superclass.call(this, props, context);
      this.__reactRefs = {};
    }

    if ( superclass ) F7Messages.__proto__ = superclass;
    F7Messages.prototype = Object.create( superclass && superclass.prototype );
    F7Messages.prototype.constructor = F7Messages;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Messages.prototype.renderMessages = function renderMessages (messagesToRender, method) {
      if (!this.f7Messages) { return undefined; }
      return this.f7Messages.renderMessages(messagesToRender, method);
    };

    F7Messages.prototype.layout = function layout () {
      if (!this.f7Messages) { return undefined; }
      return this.f7Messages.layout();
    };

    F7Messages.prototype.scroll = function scroll (duration, scrollTop) {
      if (!this.f7Messages) { return undefined; }
      return this.f7Messages.scroll(duration, scrollTop);
    };

    F7Messages.prototype.clear = function clear () {
      if (!this.f7Messages) { return undefined; }
      return this.f7Messages.clear();
    };

    F7Messages.prototype.removeMessage = function removeMessage (messageToRemove, layout) {
      if (!this.f7Messages) { return undefined; }
      return this.f7Messages.removeMessage(messageToRemove, layout);
    };

    F7Messages.prototype.removeMessages = function removeMessages (messagesToRemove, layout) {
      if (!this.f7Messages) { return undefined; }
      return this.f7Messages.removeMessages(messagesToRemove, layout);
    };

    F7Messages.prototype.addMessage = function addMessage () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (!this.f7Messages) { return undefined; }
      return (ref = this.f7Messages).addMessage.apply(ref, args);
    };

    F7Messages.prototype.addMessages = function addMessages () {
      var ref;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      if (!this.f7Messages) { return undefined; }
      return (ref = this.f7Messages).addMessages.apply(ref, args);
    };

    F7Messages.prototype.showTyping = function showTyping (message) {
      if (!this.f7Messages) { return undefined; }
      return this.f7Messages.showTyping(message);
    };

    F7Messages.prototype.hideTyping = function hideTyping () {
      if (!this.f7Messages) { return undefined; }
      return this.f7Messages.hideTyping();
    };

    F7Messages.prototype.destroy = function destroy () {
      if (!this.f7Messages) { return undefined; }
      return this.f7Messages.destroy();
    };

    F7Messages.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var classes = Utils.classNames(className, 'messages', Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    F7Messages.prototype.componentWillUnmount = function componentWillUnmount () {
      if (this.f7Messages && this.f7Messages.destroy) { this.f7Messages.destroy(); }
    };

    F7Messages.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var ref = self.props;
      var init = ref.init;
      var autoLayout = ref.autoLayout;
      var messages = ref.messages;
      var newMessagesFirst = ref.newMessagesFirst;
      var scrollMessages = ref.scrollMessages;
      var scrollMessagesOnEdge = ref.scrollMessagesOnEdge;
      var firstMessageRule = ref.firstMessageRule;
      var lastMessageRule = ref.lastMessageRule;
      var tailMessageRule = ref.tailMessageRule;
      var sameNameMessageRule = ref.sameNameMessageRule;
      var sameHeaderMessageRule = ref.sameHeaderMessageRule;
      var sameFooterMessageRule = ref.sameFooterMessageRule;
      var sameAvatarMessageRule = ref.sameAvatarMessageRule;
      var customClassMessageRule = ref.customClassMessageRule;
      var renderMessage = ref.renderMessage;
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
    };

    F7Messages.prototype.componentDidUpdate = function componentDidUpdate () {
      var self = this;
      var ref = self.props;
      var init = ref.init;
      var autoLayout = ref.autoLayout;
      var scrollMessages = ref.scrollMessages;
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
    };

    F7Messages.prototype.componentWillUpdate = function componentWillUpdate () {
      var self = this;
      if (!self.props.init) { return; }
      var el = self.refs.el;
      if (!el) { return; }
      var children = el.children;
      if (!children) { return; }

      for (var i = 0; i < children.length; i += 1) {
        children[i].classList.add('message-appeared');
      }
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Messages.prototype, prototypeAccessors );

    return F7Messages;
  }(React.Component));

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

      default: function default$1() {
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

  var F7NavLeft = /*@__PURE__*/(function (superclass) {
    function F7NavLeft(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);

      (function () {
        Utils.bindMethods(this$1, ['onBackClick']);
      })();
    }

    if ( superclass ) F7NavLeft.__proto__ = superclass;
    F7NavLeft.prototype = Object.create( superclass && superclass.prototype );
    F7NavLeft.prototype.constructor = F7NavLeft;

    var prototypeAccessors = { slots: { configurable: true } };

    F7NavLeft.prototype.onBackClick = function onBackClick (event) {
      this.dispatchEvent('back-click backClick click:back clickBack', event);
    };

    F7NavLeft.prototype.render = function render () {
      var props = this.props;
      var backLink = props.backLink;
      var backLinkUrl = props.backLinkUrl;
      var backLinkForce = props.backLinkForce;
      var backLinkShowText = props.backLinkShowText;
      var sliding = props.sliding;
      var className = props.className;
      var style = props.style;
      var id = props.id;
      var linkEl;
      var needBackLinkText = backLinkShowText;
      if (typeof needBackLinkText === 'undefined') { needBackLinkText = !this.$theme.md; }

      if (backLink) {
        linkEl = React.createElement(F7Link, {
          href: backLinkUrl || '#',
          back: true,
          icon: 'icon-back',
          force: backLinkForce || undefined,
          className: backLink === true || backLink && this.$theme.md ? 'icon-only' : undefined,
          text: backLink !== true && needBackLinkText ? backLink : undefined,
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
          children.push.apply(children, slots[key]);
        });
      }

      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, linkEl, children);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7NavLeft.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    Object.defineProperties( F7NavLeft.prototype, prototypeAccessors );

    return F7NavLeft;
  }(React.Component));

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

  var F7NavRight = /*@__PURE__*/(function (superclass) {
    function F7NavRight(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7NavRight.__proto__ = superclass;
    F7NavRight.prototype = Object.create( superclass && superclass.prototype );
    F7NavRight.prototype.constructor = F7NavRight;

    var prototypeAccessors = { slots: { configurable: true } };

    F7NavRight.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var sliding = props.sliding;
      var classes = Utils.classNames(className, 'right', {
        sliding: sliding
      }, Mixins.colorClasses(props));
      var children = [];
      var slots = this.slots;

      if (slots && Object.keys(slots).length) {
        Object.keys(slots).forEach(function (key) {
          children.push.apply(children, slots[key]);
        });
      }

      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, children);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7NavRight.prototype, prototypeAccessors );

    return F7NavRight;
  }(React.Component));

  __reactComponentSetProps(F7NavRight, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    sliding: Boolean
  }, Mixins.colorProps));

  F7NavRight.displayName = 'f7-nav-right';

  var F7NavTitle = /*@__PURE__*/(function (superclass) {
    function F7NavTitle(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7NavTitle.__proto__ = superclass;
    F7NavTitle.prototype = Object.create( superclass && superclass.prototype );
    F7NavTitle.prototype.constructor = F7NavTitle;

    var prototypeAccessors = { slots: { configurable: true } };

    F7NavTitle.prototype.render = function render () {
      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var classes = Utils.classNames(className, 'title-large', Mixins.colorClasses(props));
      var children = [];
      var slots = self.slots;

      if (slots && Object.keys(slots).length) {
        Object.keys(slots).forEach(function (key) {
          children.push.apply(children, slots[key]);
        });
      }

      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, React.createElement('div', {
        className: 'title-large-text'
      }, children));
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7NavTitle.prototype, prototypeAccessors );

    return F7NavTitle;
  }(React.Component));

  __reactComponentSetProps(F7NavTitle, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7NavTitle.displayName = 'f7-nav-title';

  var F7NavTitle$1 = /*@__PURE__*/(function (superclass) {
    function F7NavTitle(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7NavTitle.__proto__ = superclass;
    F7NavTitle.prototype = Object.create( superclass && superclass.prototype );
    F7NavTitle.prototype.constructor = F7NavTitle;

    var prototypeAccessors = { slots: { configurable: true } };

    F7NavTitle.prototype.render = function render () {
      var self = this;
      var props = self.props;
      var title = props.title;
      var subtitle = props.subtitle;
      var id = props.id;
      var style = props.style;
      var sliding = props.sliding;
      var className = props.className;
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
          children.push.apply(children, slots[key]);
        });
      }

      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, children, !children && title, !children && subtitleEl);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7NavTitle.prototype, prototypeAccessors );

    return F7NavTitle;
  }(React.Component));

  __reactComponentSetProps(F7NavTitle$1, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    title: String,
    subtitle: String,
    sliding: Boolean
  }, Mixins.colorProps));

  F7NavTitle$1.displayName = 'f7-nav-title';

  var F7Navbar = /*@__PURE__*/(function (superclass) {
    function F7Navbar(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onBackClick', 'onHide', 'onShow', 'onExpand', 'onCollapse']);
      })();
    }

    if ( superclass ) F7Navbar.__proto__ = superclass;
    F7Navbar.prototype = Object.create( superclass && superclass.prototype );
    F7Navbar.prototype.constructor = F7Navbar;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Navbar.prototype.onHide = function onHide (navbarEl) {
      var self = this;
      var ref = self.refs;
      var el = ref.el;
      var innerEl = ref.innerEl;

      if (navbarEl === el || innerEl && innerEl.parentNode === navbarEl) {
        self.dispatchEvent('navbar:hide navbarHide');
      }
    };

    F7Navbar.prototype.onShow = function onShow (navbarEl) {
      var self = this;
      var ref = self.refs;
      var el = ref.el;
      var innerEl = ref.innerEl;

      if (navbarEl === el || innerEl && innerEl.parentNode === navbarEl) {
        self.dispatchEvent('navbar:show navbarShow');
      }
    };

    F7Navbar.prototype.onExpand = function onExpand (navbarEl) {
      var self = this;
      var ref = self.refs;
      var el = ref.el;
      var innerEl = ref.innerEl;

      if (navbarEl === el || innerEl && innerEl.parentNode === navbarEl) {
        self.dispatchEvent('navbar:expand navbarExpand');
      }
    };

    F7Navbar.prototype.onCollapse = function onCollapse (navbarEl) {
      var self = this;
      var ref = self.refs;
      var el = ref.el;
      var innerEl = ref.innerEl;

      if (navbarEl === el || innerEl && innerEl.parentNode === navbarEl) {
        self.dispatchEvent('navbar:collapse navbarCollapse');
      }
    };

    F7Navbar.prototype.hide = function hide (animate) {
      var self = this;
      if (!self.$f7) { return; }
      self.$f7.navbar.hide(self.refs.el, animate);
    };

    F7Navbar.prototype.show = function show (animate) {
      var self = this;
      if (!self.$f7) { return; }
      self.$f7.navbar.show(self.refs.el, animate);
    };

    F7Navbar.prototype.size = function size () {
      var self = this;
      if (!self.$f7) { return; }
      self.$f7.navbar.size(self.refs.el);
    };

    F7Navbar.prototype.onBackClick = function onBackClick (event) {
      this.dispatchEvent('back-click backClick click:back clickBack', event);
    };

    F7Navbar.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var backLink = props.backLink;
      var backLinkUrl = props.backLinkUrl;
      var backLinkForce = props.backLinkForce;
      var backLinkShowText = props.backLinkShowText;
      var sliding = props.sliding;
      var title = props.title;
      var subtitle = props.subtitle;
      var inner = props.inner;
      var innerClass = props.innerClass;
      var innerClassName = props.innerClassName;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var hidden = props.hidden;
      var noShadow = props.noShadow;
      var noHairline = props.noHairline;
      var large = props.large;
      var titleLarge = props.titleLarge;
      var innerEl;
      var leftEl;
      var titleEl;
      var rightEl;
      var titleLargeEl;
      var addLeftTitleClass = self.$theme && self.$theme.ios && self.$f7 && !self.$f7.params.navbar.iosCenterTitle;
      var addCenterTitleClass = self.$theme && self.$theme.md && self.$f7 && self.$f7.params.navbar.mdCenterTitle || self.$theme && self.$theme.aurora && self.$f7 && self.$f7.params.navbar.auroraCenterTitle;
      var slots = self.slots;
      var classes = Utils.classNames(className, 'navbar', {
        'navbar-hidden': hidden,
        'no-shadow': noShadow,
        'no-hairline': noHairline,
        'navbar-large': large
      }, Mixins.colorClasses(props));

      if (!inner) {
        return React.createElement('div', {
          ref: function (__reactNode) {
            this$1.__reactRefs['el'] = __reactNode;
          },
          id: id,
          style: style,
          className: classes
        }, this.slots['default']);
      }

      if (backLink || slots['nav-left']) {
        leftEl = React.createElement(F7NavLeft, {
          backLink: backLink,
          backLinkUrl: backLinkUrl,
          backLinkForce: backLinkForce,
          backLinkShowText: backLinkShowText,
          onBackClick: self.onBackClick
        }, slots['nav-left']);
      }

      if (title || subtitle || slots.title) {
        titleEl = React.createElement(F7NavTitle$1, {
          title: title,
          subtitle: subtitle
        }, slots.title);
      }

      if (slots['nav-right']) {
        rightEl = React.createElement(F7NavRight, null, slots['nav-right']);
      }

      var largeTitle = titleLarge;
      if (!largeTitle && large && title) { largeTitle = title; }

      if (largeTitle) {
        titleLargeEl = React.createElement('div', {
          className: 'title-large'
        }, React.createElement('div', {
          className: 'title-large-text'
        }, largeTitle));
      }

      innerEl = React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['innerEl'] = __reactNode;
        },
        className: Utils.classNames('navbar-inner', innerClass, innerClassName, {
          sliding: sliding,
          'navbar-inner-left-title': addLeftTitleClass,
          'navbar-inner-centered-title': addCenterTitleClass,
          'navbar-inner-large': large
        })
      }, leftEl, titleEl, rightEl, titleLargeEl, this.slots['default']);
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['before-inner'], innerEl, this.slots['after-inner']);
    };

    F7Navbar.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      if (!self.props.inner) { return; }
      var ref = self.refs;
      var innerEl = ref.innerEl;
      if (!innerEl) { return; }
      var f7 = self.$f7;
      if (!f7) { return; }
      f7.off('navbarShow', self.onShow);
      f7.off('navbarHide', self.onHide);
      f7.off('navbarCollapse', self.onCollapse);
      f7.off('navbarExpand', self.onExpand);
    };

    F7Navbar.prototype.componentDidUpdate = function componentDidUpdate () {
      var self = this;
      if (!self.$f7) { return; }
      var el = self.refs.el;

      if (el && el.children && el.children.length) {
        self.$f7.navbar.size(el);
      } else if (self.refs.innerEl) {
        self.$f7.navbar.size(self.refs.innerEl);
      }
    };

    F7Navbar.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var ref = self.refs;
      var innerEl = ref.innerEl;
      if (!innerEl) { return; }
      self.$f7ready(function (f7) {
        f7.on('navbarShow', self.onShow);
        f7.on('navbarHide', self.onHide);
        f7.on('navbarCollapse', self.onCollapse);
        f7.on('navbarExpand', self.onExpand);
      });
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Navbar.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Navbar.prototype, prototypeAccessors );

    return F7Navbar;
  }(React.Component));

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
    inner: {
      type: Boolean,
      default: true
    },
    innerClass: String,
    innerClassName: String,
    large: Boolean,
    titleLarge: String
  }, Mixins.colorProps));

  F7Navbar.displayName = 'f7-navbar';

  var F7Preloader = /*@__PURE__*/(function (superclass) {
    function F7Preloader(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7Preloader.__proto__ = superclass;
    F7Preloader.prototype = Object.create( superclass && superclass.prototype );
    F7Preloader.prototype.constructor = F7Preloader;

    var prototypeAccessors = { sizeComputed: { configurable: true } };

    prototypeAccessors.sizeComputed.get = function () {
      var s = this.props.size;

      if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
        s = s.replace('px', '');
      }

      return s;
    };

    F7Preloader.prototype.render = function render () {
      var self = this;
      var sizeComputed = self.sizeComputed;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var preloaderStyle = {};

      if (sizeComputed) {
        preloaderStyle.width = sizeComputed + "px";
        preloaderStyle.height = sizeComputed + "px";
        preloaderStyle['--f7-preloader-size'] = sizeComputed + "px";
      }

      if (style) { Utils.extend(preloaderStyle, style || {}); }
      var innerEl;

      if (self.$theme.md) {
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
      } else if (self.$theme.ios) {
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
      } else if (self.$theme.aurora) {
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
    };

    Object.defineProperties( F7Preloader.prototype, prototypeAccessors );

    return F7Preloader;
  }(React.Component));

  __reactComponentSetProps(F7Preloader, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    size: [Number, String]
  }, Mixins.colorProps));

  F7Preloader.displayName = 'f7-preloader';

  var F7PageContent = /*@__PURE__*/(function (superclass) {
    function F7PageContent(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onPtrPullStart', 'onPtrPullMove', 'onPtrPullEnd', 'onPtrRefresh', 'onPtrDone', 'onInfinite', 'onTabShow', 'onTabHide']);
      })();
    }

    if ( superclass ) F7PageContent.__proto__ = superclass;
    F7PageContent.prototype = Object.create( superclass && superclass.prototype );
    F7PageContent.prototype.constructor = F7PageContent;

    var prototypeAccessors = { classes: { configurable: true },slots: { configurable: true },refs: { configurable: true } };

    F7PageContent.prototype.onPtrPullStart = function onPtrPullStart (event) {
      this.dispatchEvent('ptr:pullstart ptrPullStart', event);
    };

    F7PageContent.prototype.onPtrPullMove = function onPtrPullMove (event) {
      this.dispatchEvent('ptr:pullmove ptrPullMove', event);
    };

    F7PageContent.prototype.onPtrPullEnd = function onPtrPullEnd (event) {
      this.dispatchEvent('ptr:pullend ptrPullEnd', event);
    };

    F7PageContent.prototype.onPtrRefresh = function onPtrRefresh (event) {
      var done = event.detail;
      this.dispatchEvent('ptr:refresh ptrRefresh', event, done);
    };

    F7PageContent.prototype.onPtrDone = function onPtrDone (event) {
      this.dispatchEvent('ptr:done ptrDone', event);
    };

    F7PageContent.prototype.onInfinite = function onInfinite (event) {
      this.dispatchEvent('infinite', event);
    };

    F7PageContent.prototype.onTabShow = function onTabShow (event) {
      this.dispatchEvent('tab:show tabShow', event);
    };

    F7PageContent.prototype.onTabHide = function onTabHide (event) {
      this.dispatchEvent('tab:hide tabHide', event);
    };

    prototypeAccessors.classes.get = function () {
      var self = this;
      var props = self.props;
      var className = props.className;
      var tab = props.tab;
      var tabActive = props.tabActive;
      var ptr = props.ptr;
      var ptrBottom = props.ptrBottom;
      var infinite = props.infinite;
      var infiniteTop = props.infiniteTop;
      var hideBarsOnScroll = props.hideBarsOnScroll;
      var hideNavbarOnScroll = props.hideNavbarOnScroll;
      var hideToolbarOnScroll = props.hideToolbarOnScroll;
      var messagesContent = props.messagesContent;
      var loginScreen = props.loginScreen;
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
    };

    F7PageContent.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var ptr = props.ptr;
      var ptrPreloader = props.ptrPreloader;
      var ptrDistance = props.ptrDistance;
      var ptrBottom = props.ptrBottom;
      var ptrMousewheel = props.ptrMousewheel;
      var infinite = props.infinite;
      var infinitePreloader = props.infinitePreloader;
      var id = props.id;
      var style = props.style;
      var infiniteDistance = props.infiniteDistance;
      var infiniteTop = props.infiniteTop;
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        }
      }, ptrBottom ? null : ptrEl, infiniteTop ? infiniteEl : null, self.slots.default, infiniteTop ? null : infiniteEl, ptrBottom ? ptrEl : null);
    };

    F7PageContent.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var el = self.refs.el;
      el.removeEventListener('ptr:pullstart', self.onPtrPullStart);
      el.removeEventListener('ptr:pullmove', self.onPtrPullMove);
      el.removeEventListener('ptr:pullend', self.onPtrPullEnd);
      el.removeEventListener('ptr:refresh', self.onPtrRefresh);
      el.removeEventListener('ptr:done', self.onPtrDone);
      el.removeEventListener('infinite', self.onInfinite);
      el.removeEventListener('tab:show', self.onTabShow);
      el.removeEventListener('tab:hide', self.onTabHide);
    };

    F7PageContent.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      var ref = self.props;
      var ptr = ref.ptr;
      var infinite = ref.infinite;
      var tab = ref.tab;

      if (ptr) {
        el.addEventListener('ptr:pullstart', self.onPtrPullStart);
        el.addEventListener('ptr:pullmove', self.onPtrPullMove);
        el.addEventListener('ptr:pullend', self.onPtrPullEnd);
        el.addEventListener('ptr:refresh', self.onPtrRefresh);
        el.addEventListener('ptr:done', self.onPtrDone);
      }

      if (infinite) {
        el.addEventListener('infinite', self.onInfinite);
      }

      if (tab) {
        el.addEventListener('tab:show', self.onTabShow);
        el.addEventListener('tab:hide', self.onTabHide);
      }
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7PageContent.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7PageContent.prototype, prototypeAccessors );

    return F7PageContent;
  }(React.Component));

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

  var F7Page = /*@__PURE__*/(function (superclass) {
    function F7Page(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      this.state = (function () {
        return {
          hasSubnavbar: false,
          hasNavbarLarge: false,
          hasNavbarLargeCollapsed: false,
          hasCardExpandableOpened: false,
          routerPositionClass: '',
          routerForceUnstack: false,
          routerPageRole: null,
          routerPageMasterStack: false
        };
      })();

      (function () {
        Utils.bindMethods(this$1, ['onPtrPullStart', 'onPtrPullMove', 'onPtrPullEnd', 'onPtrRefresh', 'onPtrDone', 'onInfinite', 'onPageMounted', 'onPageInit', 'onPageReinit', 'onPageBeforeIn', 'onPageBeforeOut', 'onPageAfterOut', 'onPageAfterIn', 'onPageBeforeRemove', 'onPageStack', 'onPageUnstack', 'onPagePosition', 'onPageRole', 'onPageMasterStack', 'onPageMasterUnstack', 'onPageNavbarLargeCollapsed', 'onPageNavbarLargeExpanded', 'onCardOpened', 'onCardClose']);
      })();
    }

    if ( superclass ) F7Page.__proto__ = superclass;
    F7Page.prototype = Object.create( superclass && superclass.prototype );
    F7Page.prototype.constructor = F7Page;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Page.prototype.onPtrPullStart = function onPtrPullStart (event) {
      this.dispatchEvent('ptr:pullstart ptrPullStart', event);
    };

    F7Page.prototype.onPtrPullMove = function onPtrPullMove (event) {
      this.dispatchEvent('ptr:pullmove ptrPullMove', event);
    };

    F7Page.prototype.onPtrPullEnd = function onPtrPullEnd (event) {
      this.dispatchEvent('ptr:pullend ptrPullEnd', event);
    };

    F7Page.prototype.onPtrRefresh = function onPtrRefresh (event) {
      var done = event.detail;
      this.dispatchEvent('ptr:refresh ptrRefresh', event, done);
    };

    F7Page.prototype.onPtrDone = function onPtrDone (event) {
      this.dispatchEvent('ptr:done ptrDone', event);
    };

    F7Page.prototype.onInfinite = function onInfinite (event) {
      this.dispatchEvent('infinite', event);
    };

    F7Page.prototype.onPageMounted = function onPageMounted (event) {
      var page = event.detail;
      this.dispatchEvent('page:mounted pageMounted', event, page);
    };

    F7Page.prototype.onPageStack = function onPageStack () {
      this.setState({
        routerForceUnstack: false
      });
    };

    F7Page.prototype.onPageUnstack = function onPageUnstack () {
      this.setState({
        routerForceUnstack: true
      });
    };

    F7Page.prototype.onPagePosition = function onPagePosition (event) {
      var position = event.detail.position;
      this.setState({
        routerPositionClass: ("page-" + position)
      });
    };

    F7Page.prototype.onPageRole = function onPageRole (event) {
      this.setState({
        routerPageRole: event.detail.role
      });
    };

    F7Page.prototype.onPageMasterStack = function onPageMasterStack () {
      this.setState({
        routerPageMasterStack: true
      });
    };

    F7Page.prototype.onPageMasterUnstack = function onPageMasterUnstack () {
      this.setState({
        routerPageMasterStack: false
      });
    };

    F7Page.prototype.onPageNavbarLargeCollapsed = function onPageNavbarLargeCollapsed () {
      this.setState({
        hasNavbarLargeCollapsed: true
      });
    };

    F7Page.prototype.onPageNavbarLargeExpanded = function onPageNavbarLargeExpanded () {
      this.setState({
        hasNavbarLargeCollapsed: false
      });
    };

    F7Page.prototype.onPageInit = function onPageInit (event) {
      var page = event.detail;
      var ref = this.props;
      var withSubnavbar = ref.withSubnavbar;
      var subnavbar = ref.subnavbar;
      var withNavbarLarge = ref.withNavbarLarge;
      var navbarLarge = ref.navbarLarge;

      if (typeof withSubnavbar === 'undefined' && typeof subnavbar === 'undefined') {
        if (page.$navbarEl && page.$navbarEl.length && page.$navbarEl.find('.subnavbar').length || page.$el.children('.navbar').find('.subnavbar').length) {
          this.setState({
            hasSubnavbar: true
          });
        }
      }

      if (typeof withNavbarLarge === 'undefined' && typeof navbarLarge === 'undefined') {
        if (page.$navbarEl && page.$navbarEl.hasClass('navbar-inner-large')) {
          this.setState({
            hasNavbarLarge: true
          });
        }
      }

      this.dispatchEvent('page:init pageInit', event, page);
    };

    F7Page.prototype.onPageReinit = function onPageReinit (event) {
      var page = event.detail;
      this.dispatchEvent('page:reinit pageReinit', event, page);
    };

    F7Page.prototype.onPageBeforeIn = function onPageBeforeIn (event) {
      var page = event.detail;

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

      this.dispatchEvent('page:beforein pageBeforeIn', event, page);
    };

    F7Page.prototype.onPageBeforeOut = function onPageBeforeOut (event) {
      var page = event.detail;
      this.dispatchEvent('page:beforeout pageBeforeOut', event, page);
    };

    F7Page.prototype.onPageAfterOut = function onPageAfterOut (event) {
      var page = event.detail;

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

      this.dispatchEvent('page:afterout pageAfterOut', event, page);
    };

    F7Page.prototype.onPageAfterIn = function onPageAfterIn (event) {
      var page = event.detail;
      this.setState({
        routerPositionClass: 'page-current'
      });
      this.dispatchEvent('page:afterin pageAfterIn', event, page);
    };

    F7Page.prototype.onPageBeforeRemove = function onPageBeforeRemove (event) {
      var page = event.detail;
      this.dispatchEvent('page:beforeremove pageBeforeRemove', event, page);
    };

    F7Page.prototype.onCardOpened = function onCardOpened () {
      this.setState({
        hasCardExpandableOpened: true
      });
    };

    F7Page.prototype.onCardClose = function onCardClose () {
      this.setState({
        hasCardExpandableOpened: false
      });
    };

    F7Page.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var name = props.name;
      var pageContent = props.pageContent;
      var messagesContent = props.messagesContent;
      var ptr = props.ptr;
      var ptrDistance = props.ptrDistance;
      var ptrPreloader = props.ptrPreloader;
      var ptrBottom = props.ptrBottom;
      var ptrMousewheel = props.ptrMousewheel;
      var infinite = props.infinite;
      var infiniteDistance = props.infiniteDistance;
      var infinitePreloader = props.infinitePreloader;
      var infiniteTop = props.infiniteTop;
      var hideBarsOnScroll = props.hideBarsOnScroll;
      var hideNavbarOnScroll = props.hideNavbarOnScroll;
      var hideToolbarOnScroll = props.hideToolbarOnScroll;
      var loginScreen = props.loginScreen;
      var className = props.className;
      var stacked = props.stacked;
      var tabs = props.tabs;
      var subnavbar = props.subnavbar;
      var withSubnavbar = props.withSubnavbar;
      var navbarLarge = props.navbarLarge;
      var withNavbarLarge = props.withNavbarLarge;
      var noNavbar = props.noNavbar;
      var noToolbar = props.noToolbar;
      var noSwipeback = props.noSwipeback;
      var fixedList = [];
      var staticList = [];
      var needsPageContent = pageContent;
      var ref = self.slots;
      var slotsStatic = ref.static;
      var slotsFixed = ref.fixed;
      var slotsDefault = ref.default;
      var fixedTags;
      fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ').map(function (tagName) { return ("f7-" + tagName); });
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
              if (needsPageContent) { staticList.push(child); }
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

          if (needsPageContent) {
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
        'page-master-stacked': this.state.routerPageMasterStack === true,
        'page-with-navbar-large-collapsed': this.state.hasNavbarLargeCollapsed === true,
        'page-with-card-opened': this.state.hasCardExpandableOpened === true
      }, Mixins.colorClasses(props));

      if (!needsPageContent) {
        return React.createElement('div', {
          ref: function (__reactNode) {
            this$1.__reactRefs['el'] = __reactNode;
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
        loginScreen: loginScreen
      }, slotsStatic, staticList);
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes,
        'data-name': name
      }, fixedList, slotsFixed, pageContentEl);
    };

    F7Page.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var el = self.refs.el;
      el.removeEventListener('ptr:pullstart', self.onPtrPullStart);
      el.removeEventListener('ptr:pullmove', self.onPtrPullMove);
      el.removeEventListener('ptr:pullend', self.onPtrPullEnd);
      el.removeEventListener('ptr:refresh', self.onPtrRefresh);
      el.removeEventListener('ptr:done', self.onPtrDone);
      el.removeEventListener('infinite', self.onInfinite);
      el.removeEventListener('page:mounted', self.onPageMounted);
      el.removeEventListener('page:init', self.onPageInit);
      el.removeEventListener('page:reinit', self.onPageReinit);
      el.removeEventListener('page:beforein', self.onPageBeforeIn);
      el.removeEventListener('page:beforeout', self.onPageBeforeOut);
      el.removeEventListener('page:afterout', self.onPageAfterOut);
      el.removeEventListener('page:afterin', self.onPageAfterIn);
      el.removeEventListener('page:beforeremove', self.onPageBeforeRemove);
      el.removeEventListener('page:stack', self.onPageStack);
      el.removeEventListener('page:unstack', self.onPageUnstack);
      el.removeEventListener('page:position', self.onPagePosition);
      el.removeEventListener('page:role', self.onPageRole);
      el.removeEventListener('page:masterstack', self.onPageMasterStack);
      el.removeEventListener('page:masterunstack', self.onPageMasterUnstack);
      el.removeEventListener('page:navbarlargecollapsed', self.onPageNavbarLargeCollapsed);
      el.removeEventListener('page:navbarlargeexpanded', self.onPageNavbarLargeExpanded);
      el.removeEventListener('card:opened', self.onCardOpened);
      el.removeEventListener('card:close', self.onCardClose);
    };

    F7Page.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      var ref = self.props;
      var ptr = ref.ptr;
      var infinite = ref.infinite;

      if (ptr) {
        el.addEventListener('ptr:pullstart', self.onPtrPullStart);
        el.addEventListener('ptr:pullmove', self.onPtrPullMove);
        el.addEventListener('ptr:pullend', self.onPtrPullEnd);
        el.addEventListener('ptr:refresh', self.onPtrRefresh);
        el.addEventListener('ptr:done', self.onPtrDone);
      }

      if (infinite) {
        el.addEventListener('infinite', self.onInfinite);
      }

      el.addEventListener('page:mounted', self.onPageMounted);
      el.addEventListener('page:init', self.onPageInit);
      el.addEventListener('page:reinit', self.onPageReinit);
      el.addEventListener('page:beforein', self.onPageBeforeIn);
      el.addEventListener('page:beforeout', self.onPageBeforeOut);
      el.addEventListener('page:afterout', self.onPageAfterOut);
      el.addEventListener('page:afterin', self.onPageAfterIn);
      el.addEventListener('page:beforeremove', self.onPageBeforeRemove);
      el.addEventListener('page:stack', self.onPageStack);
      el.addEventListener('page:unstack', self.onPageUnstack);
      el.addEventListener('page:position', self.onPagePosition);
      el.addEventListener('page:role', self.onPageRole);
      el.addEventListener('page:masterstack', self.onPageMasterStack);
      el.addEventListener('page:masterunstack', self.onPageMasterUnstack);
      el.addEventListener('page:navbarlargecollapsed', self.onPageNavbarLargeCollapsed);
      el.addEventListener('page:navbarlargeexpanded', self.onPageNavbarLargeExpanded);
      el.addEventListener('card:opened', self.onCardOpened);
      el.addEventListener('card:close', self.onCardClose);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Page.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Page.prototype, prototypeAccessors );

    return F7Page;
  }(React.Component));

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

  var F7Panel = /*@__PURE__*/(function (superclass) {
    function F7Panel(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onOpen', 'onOpened', 'onClose', 'onClosed', 'onBackdropClick', 'onPanelSwipe', 'onPanelSwipeOpen', 'onBreakpoint', 'onResize']);
      })();
    }

    if ( superclass ) F7Panel.__proto__ = superclass;
    F7Panel.prototype = Object.create( superclass && superclass.prototype );
    F7Panel.prototype.constructor = F7Panel;

    var prototypeAccessors = { classes: { configurable: true },slots: { configurable: true },refs: { configurable: true } };

    F7Panel.prototype.onOpen = function onOpen (event) {
      this.dispatchEvent('panel:open panelOpen', event);
    };

    F7Panel.prototype.onOpened = function onOpened (event) {
      this.dispatchEvent('panel:opened panelOpened', event);
    };

    F7Panel.prototype.onClose = function onClose (event) {
      this.dispatchEvent('panel:close panelClose', event);
    };

    F7Panel.prototype.onClosed = function onClosed (event) {
      this.dispatchEvent('panel:closed panelClosed', event);
    };

    F7Panel.prototype.onBackdropClick = function onBackdropClick (event) {
      this.dispatchEvent('panel:backdrop-click panelBackdropClick', event);
    };

    F7Panel.prototype.onPanelSwipe = function onPanelSwipe (event) {
      this.dispatchEvent('panel:swipe panelSwipe', event);
    };

    F7Panel.prototype.onPanelSwipeOpen = function onPanelSwipeOpen (event) {
      this.dispatchEvent('panel:swipeopen panelSwipeOpen', event);
    };

    F7Panel.prototype.onBreakpoint = function onBreakpoint (event) {
      this.dispatchEvent('panel:breakpoint panelBreakpoint', event);
    };

    F7Panel.prototype.onResize = function onResize (event) {
      this.dispatchEvent('panel:resize panelResize', event);
    };

    F7Panel.prototype.open = function open (animate) {
      var self = this;
      if (!self.$f7) { return; }
      var side = self.props.side || (self.props.left ? 'left' : 'right');
      self.$f7.panel.open(side, animate);
    };

    F7Panel.prototype.close = function close (animate) {
      var self = this;
      if (!self.$f7) { return; }
      var side = self.props.side || (self.props.left ? 'left' : 'right');
      self.$f7.panel.close(side, animate);
    };

    F7Panel.prototype.toggle = function toggle (animate) {
      var self = this;
      if (!self.$f7) { return; }
      var side = self.props.side || (self.props.left ? 'left' : 'right');
      self.$f7.panel.toggle(side, animate);
    };

    prototypeAccessors.classes.get = function () {
      var obj;

      var self = this;
      var props = self.props;
      var left = props.left;
      var reveal = props.reveal;
      var className = props.className;
      var opened = props.opened;
      var resizable = props.resizable;
      var side = props.side;
      var effect = props.effect;
      side = side || (left ? 'left' : 'right');
      effect = effect || (reveal ? 'reveal' : 'cover');
      return Utils.classNames(className, 'panel', ( obj = {
        'panel-active': opened,
        'panel-resizable': resizable
      }, obj[("panel-" + side)] = side, obj[("panel-" + effect)] = effect, obj ), Mixins.colorClasses(props));
    };

    F7Panel.prototype.render = function render () {
      var this$1 = this;

      var props = this.props;
      var id = props.id;
      var style = props.style;
      var resizable = props.resizable;
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: this.classes
      }, this.slots['default'], resizable && React.createElement('div', {
        className: 'panel-resize-handler'
      }));
    };

    F7Panel.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;

      if (self.f7Panel) {
        self.f7Panel.destroy();
      }
    };

    F7Panel.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      var ref = self.props;
      var side = ref.side;
      var effect = ref.effect;
      var opened = ref.opened;
      var left = ref.left;
      var reveal = ref.reveal;
      var resizable = ref.resizable;
      self.$f7ready(function () {
        var $ = self.$$;
        if (!$) { return; }

        if ($('.panel-backdrop').length === 0) {
          $('<div class="panel-backdrop"></div>').insertBefore(el);
        }

        self.f7Panel = self.$f7.panel.create({
          el: el,
          resizable: resizable
        });
        var events = {
          open: self.onOpen,
          opened: self.onOpened,
          close: self.onClose,
          closed: self.onClosed,
          backdropClick: self.onBackdropClick,
          swipe: self.onPanelSwipe,
          swipeOpen: self.onPanelSwipeOpen,
          breakpoint: self.onBreakpoint,
          resize: self.onResize
        };
        Object.keys(events).forEach(function (ev) {
          self.f7Panel.on(ev, events[ev]);
        });
      });

      if (opened) {
        el.style.display = 'block';
      }

      var $ = self.$$;
      if (!$) { return; }
      var panelSide = side || (left ? 'left' : 'right');
      var panelEffect = effect || (reveal ? 'reveal' : 'cover');

      if (opened) {
        $('html').addClass(("with-panel-" + panelSide + "-" + panelEffect));
      }
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Panel.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    F7Panel.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.resizable', prevProps, prevState, function (resizable) {
        var self = this$1;
        if (!resizable) { return; }

        if (self.f7Panel && !self.f7Panel.resizableInitialized) {
          self.f7Panel.initResizablePanel();
        }
      });

      __reactComponentWatch(this, 'props.opened', prevProps, prevState, function (opened) {
        var self = this$1;
        if (!self.$f7) { return; }
        var side = self.props.side || (self.props.left ? 'left' : 'right');

        if (opened) {
          self.$f7.panel.open(side);
        } else {
          self.$f7.panel.close(side);
        }
      });
    };

    Object.defineProperties( F7Panel.prototype, prototypeAccessors );

    return F7Panel;
  }(React.Component));

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
    resizable: Boolean
  }, Mixins.colorProps));

  F7Panel.displayName = 'f7-panel';

  var F7PhotoBrowser = /*@__PURE__*/(function (superclass) {
    function F7PhotoBrowser(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7PhotoBrowser.__proto__ = superclass;
    F7PhotoBrowser.prototype = Object.create( superclass && superclass.prototype );
    F7PhotoBrowser.prototype.constructor = F7PhotoBrowser;

    F7PhotoBrowser.prototype.open = function open (index) {
      return this.f7PhotoBrowser.open(index);
    };

    F7PhotoBrowser.prototype.close = function close () {
      return this.f7PhotoBrowser.close();
    };

    F7PhotoBrowser.prototype.expositionToggle = function expositionToggle () {
      return this.f7PhotoBrowser.expositionToggle();
    };

    F7PhotoBrowser.prototype.expositionEnable = function expositionEnable () {
      return this.f7PhotoBrowser.expositionEnable();
    };

    F7PhotoBrowser.prototype.expositionDisable = function expositionDisable () {
      return this.f7PhotoBrowser.expositionDisable();
    };

    F7PhotoBrowser.prototype.render = function render () {
      return null;
    };

    F7PhotoBrowser.prototype.componentDidMount = function componentDidMount () {
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
    };

    F7PhotoBrowser.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      if (self.f7PhotoBrowser && self.f7PhotoBrowser.destroy) { self.f7PhotoBrowser.destroy(); }
    };

    F7PhotoBrowser.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    F7PhotoBrowser.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.photos', prevProps, prevState, function (newValue) {
        var self = this$1;
        var pb = self.f7PhotoBrowser;
        if (!pb) { return; }
        self.f7PhotoBrowser.photos = newValue;

        if (pb.opened && pb.swiper) {
          pb.swiper.update();
        }
      });
    };

    return F7PhotoBrowser;
  }(React.Component));

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
    backLinkText: {
      type: String
    },
    navbarOfText: {
      type: String
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

  var F7Popover = /*@__PURE__*/(function (superclass) {
    function F7Popover(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onOpen', 'onOpened', 'onClose', 'onClosed']);
      })();
    }

    if ( superclass ) F7Popover.__proto__ = superclass;
    F7Popover.prototype = Object.create( superclass && superclass.prototype );
    F7Popover.prototype.constructor = F7Popover;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Popover.prototype.onOpen = function onOpen (event) {
      this.dispatchEvent('popover:open popoverOpen', event);
    };

    F7Popover.prototype.onOpened = function onOpened (event) {
      this.dispatchEvent('popover:opened popoverOpened', event);
    };

    F7Popover.prototype.onClose = function onClose (event) {
      this.dispatchEvent('popover:close popoverClose', event);
    };

    F7Popover.prototype.onClosed = function onClosed (event) {
      this.dispatchEvent('popover:closed popoverClosed', event);
    };

    F7Popover.prototype.open = function open (target, animate) {
      var self = this;
      if (!self.$f7) { return undefined; }
      return self.$f7.popover.open(self.refs.el, target, animate);
    };

    F7Popover.prototype.close = function close (animate) {
      var self = this;
      if (!self.$f7) { return undefined; }
      return self.$f7.sheet.close(self.refs.el, animate);
    };

    F7Popover.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'popover', Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, React.createElement('div', {
        className: 'popover-angle'
      }), React.createElement('div', {
        className: 'popover-inner'
      }, this.slots['default']));
    };

    F7Popover.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      if (self.f7Popover) { self.f7Popover.destroy(); }
      var el = self.refs.el;
      if (!el) { return; }
      el.removeEventListener('popover:open', self.onOpen);
      el.removeEventListener('popover:opened', self.onOpened);
      el.removeEventListener('popover:close', self.onClose);
      el.removeEventListener('popover:closed', self.onClosed);
    };

    F7Popover.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      if (!el) { return; }
      el.addEventListener('popover:open', self.onOpen);
      el.addEventListener('popover:opened', self.onOpened);
      el.addEventListener('popover:close', self.onClose);
      el.addEventListener('popover:closed', self.onClosed);
      var props = self.props;
      var target = props.target;
      var opened = props.opened;
      var backdrop = props.backdrop;
      var backdropEl = props.backdropEl;
      var closeByBackdropClick = props.closeByBackdropClick;
      var closeByOutsideClick = props.closeByOutsideClick;
      var closeOnEscape = props.closeOnEscape;
      var popoverParams = {
        el: el
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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Popover.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    F7Popover.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.opened', prevProps, prevState, function (opened) {
        var self = this$1;
        if (!self.f7Popover) { return; }

        if (opened) {
          self.f7Popover.open();
        } else {
          self.f7Popover.close();
        }
      });
    };

    Object.defineProperties( F7Popover.prototype, prototypeAccessors );

    return F7Popover;
  }(React.Component));

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

  var F7Popup = /*@__PURE__*/(function (superclass) {
    function F7Popup(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onOpen', 'onOpened', 'onClose', 'onClosed']);
      })();
    }

    if ( superclass ) F7Popup.__proto__ = superclass;
    F7Popup.prototype = Object.create( superclass && superclass.prototype );
    F7Popup.prototype.constructor = F7Popup;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Popup.prototype.onOpen = function onOpen (event) {
      this.dispatchEvent('popup:open popupOpen', event);
    };

    F7Popup.prototype.onOpened = function onOpened (event) {
      this.dispatchEvent('popup:opened popupOpened', event);
    };

    F7Popup.prototype.onClose = function onClose (event) {
      this.dispatchEvent('popup:close popupClose', event);
    };

    F7Popup.prototype.onClosed = function onClosed (event) {
      this.dispatchEvent('popup:closed popupClosed', event);
    };

    F7Popup.prototype.open = function open (animate) {
      var self = this;
      if (!self.$f7) { return undefined; }
      return self.$f7.popup.open(self.refs.el, animate);
    };

    F7Popup.prototype.close = function close (animate) {
      var self = this;
      if (!self.$f7) { return undefined; }
      return self.$f7.popup.close(self.refs.el, animate);
    };

    F7Popup.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var tabletFullscreen = props.tabletFullscreen;
      var classes = Utils.classNames(className, 'popup', {
        'popup-tablet-fullscreen': tabletFullscreen
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    F7Popup.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      if (self.f7Popup) { self.f7Popup.destroy(); }
      var el = self.refs.el;
      if (!el) { return; }
      el.removeEventListener('popup:open', self.onOpen);
      el.removeEventListener('popup:opened', self.onOpened);
      el.removeEventListener('popup:close', self.onClose);
      el.removeEventListener('popup:closed', self.onClosed);
    };

    F7Popup.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      if (!el) { return; }
      el.addEventListener('popup:open', self.onOpen);
      el.addEventListener('popup:opened', self.onOpened);
      el.addEventListener('popup:close', self.onClose);
      el.addEventListener('popup:closed', self.onClosed);
      var props = self.props;
      var closeByBackdropClick = props.closeByBackdropClick;
      var backdrop = props.backdrop;
      var backdropEl = props.backdropEl;
      var animate = props.animate;
      var closeOnEscape = props.closeOnEscape;
      var swipeToClose = props.swipeToClose;
      var swipeHandler = props.swipeHandler;
      var popupParams = {
        el: el
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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Popup.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    F7Popup.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.opened', prevProps, prevState, function (opened) {
        var self = this$1;
        if (!self.f7Popup) { return; }

        if (opened) {
          self.f7Popup.open();
        } else {
          self.f7Popup.close();
        }
      });
    };

    Object.defineProperties( F7Popup.prototype, prototypeAccessors );

    return F7Popup;
  }(React.Component));

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
    swipeHandler: [String, Object, window.HTMLElement]
  }, Mixins.colorProps));

  F7Popup.displayName = 'f7-popup';

  var F7Progressbar = /*@__PURE__*/(function (superclass) {
    function F7Progressbar(props, context) {
      superclass.call(this, props, context);
      this.__reactRefs = {};
    }

    if ( superclass ) F7Progressbar.__proto__ = superclass;
    F7Progressbar.prototype = Object.create( superclass && superclass.prototype );
    F7Progressbar.prototype.constructor = F7Progressbar;

    var prototypeAccessors = { refs: { configurable: true } };

    F7Progressbar.prototype.set = function set (progress, speed) {
      var self = this;
      if (!self.$f7) { return; }
      self.$f7.progressbar.set(self.refs.el, progress, speed);
    };

    F7Progressbar.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var progress = props.progress;
      var id = props.id;
      var style = props.style;
      var infinite = props.infinite;
      var className = props.className;
      var transformStyle = {
        transform: progress ? ("translate3d(" + (-100 + progress) + "%, 0, 0)") : '',
        WebkitTransform: progress ? ("translate3d(" + (-100 + progress) + "%, 0, 0)") : ''
      };
      var classes = Utils.classNames(className, 'progressbar', {
        'progressbar-infinite': infinite
      }, Mixins.colorClasses(props));
      return React.createElement('span', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes,
        'data-progress': progress
      }, React.createElement('span', {
        style: transformStyle
      }));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Progressbar.prototype, prototypeAccessors );

    return F7Progressbar;
  }(React.Component));

  __reactComponentSetProps(F7Progressbar, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    progress: Number,
    infinite: Boolean
  }, Mixins.colorProps));

  F7Progressbar.displayName = 'f7-progressbar';

  var F7Radio = /*@__PURE__*/(function (superclass) {
    function F7Radio(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onChange']);
      })();
    }

    if ( superclass ) F7Radio.__proto__ = superclass;
    F7Radio.prototype = Object.create( superclass && superclass.prototype );
    F7Radio.prototype.constructor = F7Radio;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Radio.prototype.onChange = function onChange (event) {
      this.dispatchEvent('change', event);
    };

    F7Radio.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var name = props.name;
      var value = props.value;
      var disabled = props.disabled;
      var readonly = props.readonly;
      var checked = props.checked;
      var defaultChecked = props.defaultChecked;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var inputEl;
      {
        inputEl = React.createElement('input', {
          ref: function (__reactNode) {
            this$1.__reactRefs['inputEl'] = __reactNode;
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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Radio.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Radio.prototype, prototypeAccessors );

    return F7Radio;
  }(React.Component));

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

  var F7Row = /*@__PURE__*/(function (superclass) {
    function F7Row(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onClick']);
      })();
    }

    if ( superclass ) F7Row.__proto__ = superclass;
    F7Row.prototype = Object.create( superclass && superclass.prototype );
    F7Row.prototype.constructor = F7Row;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Row.prototype.onClick = function onClick (event) {
      this.dispatchEvent('click', event);
    };

    F7Row.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var tag = props.tag;
      var noGap = props.noGap;
      var RowTag = tag;
      var classes = Utils.classNames(className, 'row', {
        'no-gap': noGap
      }, Mixins.colorClasses(props));
      return React.createElement(RowTag, {
        id: id,
        style: style,
        className: classes,
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        }
      }, this.slots['default']);
    };

    F7Row.prototype.componentWillUnmount = function componentWillUnmount () {
      this.refs.el.removeEventListener('click', this.onClick);
    };

    F7Row.prototype.componentDidMount = function componentDidMount () {
      this.refs.el.addEventListener('click', this.onClick);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Row.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Row.prototype, prototypeAccessors );

    return F7Row;
  }(React.Component));

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

  var F7Searchbar = /*@__PURE__*/(function (superclass) {
    function F7Searchbar(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onSubmit', 'onClearButtonClick', 'onDisableButtonClick', 'onInput', 'onChange', 'onFocus', 'onBlur']);
      })();
    }

    if ( superclass ) F7Searchbar.__proto__ = superclass;
    F7Searchbar.prototype = Object.create( superclass && superclass.prototype );
    F7Searchbar.prototype.constructor = F7Searchbar;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Searchbar.prototype.search = function search (query) {
      if (!this.f7Searchbar) { return undefined; }
      return this.f7Searchbar.search(query);
    };

    F7Searchbar.prototype.enable = function enable () {
      if (!this.f7Searchbar) { return undefined; }
      return this.f7Searchbar.enable();
    };

    F7Searchbar.prototype.disable = function disable () {
      if (!this.f7Searchbar) { return undefined; }
      return this.f7Searchbar.disable();
    };

    F7Searchbar.prototype.toggle = function toggle () {
      if (!this.f7Searchbar) { return undefined; }
      return this.toggle.disable();
    };

    F7Searchbar.prototype.clear = function clear () {
      if (!this.f7Searchbar) { return undefined; }
      return this.f7Searchbar.clear();
    };

    F7Searchbar.prototype.onChange = function onChange (event) {
      this.dispatchEvent('change', event);
    };

    F7Searchbar.prototype.onInput = function onInput (event) {
      this.dispatchEvent('input', event);
    };

    F7Searchbar.prototype.onFocus = function onFocus (event) {
      this.dispatchEvent('focus', event);
    };

    F7Searchbar.prototype.onBlur = function onBlur (event) {
      this.dispatchEvent('blur', event);
    };

    F7Searchbar.prototype.onSubmit = function onSubmit (event) {
      this.dispatchEvent('submit', event);
    };

    F7Searchbar.prototype.onClearButtonClick = function onClearButtonClick (event) {
      this.dispatchEvent('click:clear clickClear', event);
    };

    F7Searchbar.prototype.onDisableButtonClick = function onDisableButtonClick (event) {
      this.dispatchEvent('click:disable clickDisable', event);
    };

    F7Searchbar.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var clearEl;
      var disableEl;
      var props = self.props;
      var placeholder = props.placeholder;
      var clearButton = props.clearButton;
      var disableButton = props.disableButton;
      var disableButtonText = props.disableButtonText;
      var form = props.form;
      var noShadow = props.noShadow;
      var noHairline = props.noHairline;
      var expandable = props.expandable;
      var className = props.className;
      var style = props.style;
      var id = props.id;
      var value = props.value;
      var inline = props.inline;

      if (clearButton) {
        clearEl = React.createElement('span', {
          ref: function (__reactNode) {
            this$1.__reactRefs['clearEl'] = __reactNode;
          },
          className: 'input-clear-button'
        });
      }

      if (disableButton) {
        disableEl = React.createElement('span', {
          ref: function (__reactNode) {
            this$1.__reactRefs['disableEl'] = __reactNode;
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
          ref: function (__reactNode) {
            this$1.__reactRefs['inputEl'] = __reactNode;
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
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
    };

    F7Searchbar.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var ref = self.refs;
      var el = ref.el;
      var clearEl = ref.clearEl;
      var disableEl = ref.disableEl;

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
    };

    F7Searchbar.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var ref = self.props;
      var init = ref.init;
      var inputEvents = ref.inputEvents;
      var searchContainer = ref.searchContainer;
      var searchIn = ref.searchIn;
      var searchItem = ref.searchItem;
      var searchGroup = ref.searchGroup;
      var searchGroupTitle = ref.searchGroupTitle;
      var hideOnEnableEl = ref.hideOnEnableEl;
      var hideOnSearchEl = ref.hideOnSearchEl;
      var foundEl = ref.foundEl;
      var notFoundEl = ref.notFoundEl;
      var backdrop = ref.backdrop;
      var backdropEl = ref.backdropEl;
      var disableButton = ref.disableButton;
      var ignore = ref.ignore;
      var customSearch = ref.customSearch;
      var removeDiacritics = ref.removeDiacritics;
      var hideDividers = ref.hideDividers;
      var hideGroups = ref.hideGroups;
      var form = ref.form;
      var expandable = ref.expandable;
      var inline = ref.inline;
      var ref$1 = self.refs;
      var el = ref$1.el;
      var clearEl = ref$1.clearEl;
      var disableEl = ref$1.disableEl;

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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Searchbar.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Searchbar.prototype, prototypeAccessors );

    return F7Searchbar;
  }(React.Component));

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

  var F7Segmented = /*@__PURE__*/(function (superclass) {
    function F7Segmented(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7Segmented.__proto__ = superclass;
    F7Segmented.prototype = Object.create( superclass && superclass.prototype );
    F7Segmented.prototype.constructor = F7Segmented;

    var prototypeAccessors = { slots: { configurable: true } };

    F7Segmented.prototype.render = function render () {
      var self = this;
      var props = self.props;
      var className = props.className;
      var raised = props.raised;
      var raisedIos = props.raisedIos;
      var raisedAurora = props.raisedAurora;
      var raisedMd = props.raisedMd;
      var round = props.round;
      var roundIos = props.roundIos;
      var roundAurora = props.roundAurora;
      var roundMd = props.roundMd;
      var id = props.id;
      var style = props.style;
      var tag = props.tag;
      var classNames = Utils.classNames(className, {
        segmented: true,
        'segmented-raised': raised,
        'segmented-raised-ios': raisedIos,
        'segmented-raised-aurora': raisedAurora,
        'segmented-raised-md': raisedMd,
        'segmented-round': round,
        'segmented-round-ios': roundIos,
        'segmented-round-aurora': roundAurora,
        'segmented-round-md': roundMd
      }, Mixins.colorClasses(props));
      var SegmentedTag = tag;
      return React.createElement(SegmentedTag, {
        id: id,
        style: style,
        className: classNames
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7Segmented.prototype, prototypeAccessors );

    return F7Segmented;
  }(React.Component));

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
    tag: {
      type: String,
      default: 'div'
    }
  }, Mixins.colorProps));

  F7Segmented.displayName = 'f7-segmented';

  var F7Sheet = /*@__PURE__*/(function (superclass) {
    function F7Sheet(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onOpen', 'onOpened', 'onClose', 'onClosed', 'onStepOpen', 'onStepClose', 'onStepProgress']);
      })();
    }

    if ( superclass ) F7Sheet.__proto__ = superclass;
    F7Sheet.prototype = Object.create( superclass && superclass.prototype );
    F7Sheet.prototype.constructor = F7Sheet;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Sheet.prototype.onStepProgress = function onStepProgress (event) {
      this.dispatchEvent('sheet:stepprogress sheetStepProgress', event.detail);
    };

    F7Sheet.prototype.onStepOpen = function onStepOpen (event) {
      this.dispatchEvent('sheet:stepopen sheetStepOpen', event);
    };

    F7Sheet.prototype.onStepClose = function onStepClose (event) {
      this.dispatchEvent('sheet:stepclose sheetStepClose', event);
    };

    F7Sheet.prototype.onOpen = function onOpen (event) {
      this.dispatchEvent('sheet:open sheetOpen', event);
    };

    F7Sheet.prototype.onOpened = function onOpened (event) {
      this.dispatchEvent('sheet:opened sheetOpened', event);
    };

    F7Sheet.prototype.onClose = function onClose (event) {
      this.dispatchEvent('sheet:close sheetClose', event);
    };

    F7Sheet.prototype.onClosed = function onClosed (event) {
      this.dispatchEvent('sheet:closed sheetClosed', event);
    };

    F7Sheet.prototype.open = function open (animate) {
      var self = this;
      if (!self.$f7) { return undefined; }
      return self.$f7.sheet.open(self.refs.el, animate);
    };

    F7Sheet.prototype.close = function close (animate) {
      var self = this;
      if (!self.$f7) { return undefined; }
      return self.$f7.sheet.close(self.refs.el, animate);
    };

    F7Sheet.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var fixedList = [];
      var staticList = [];
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var top = props.top;
      var bottom = props.bottom;
      var position = props.position;
      var fixedTags;
      fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ').map(function (tagName) { return ("f7-" + tagName); });
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
      var classes = Utils.classNames(className, 'sheet-modal', ("sheet-modal-" + positionComputed), Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, fixedList, innerEl);
    };

    F7Sheet.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      if (self.f7Sheet) { self.f7Sheet.destroy(); }
      var el = self.refs.el;
      if (!el) { return; }
      el.removeEventListener('sheet:open', self.onOpen);
      el.removeEventListener('sheet:opened', self.onOpened);
      el.removeEventListener('sheet:close', self.onClose);
      el.removeEventListener('sheet:closed', self.onClosed);
      el.removeEventListener('sheet:stepopen', self.onStepOpen);
      el.removeEventListener('sheet:stepclose', self.onStepClose);
      el.removeEventListener('sheet:stepprogress', self.onStepProgress);
    };

    F7Sheet.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;
      if (!el) { return; }
      el.addEventListener('sheet:open', self.onOpen);
      el.addEventListener('sheet:opened', self.onOpened);
      el.addEventListener('sheet:close', self.onClose);
      el.addEventListener('sheet:closed', self.onClosed);
      el.addEventListener('sheet:stepopen', self.onStepOpen);
      el.addEventListener('sheet:stepclose', self.onStepClose);
      el.addEventListener('sheet:stepprogress', self.onStepProgress);
      var props = self.props;
      var opened = props.opened;
      var backdrop = props.backdrop;
      var backdropEl = props.backdropEl;
      var closeByBackdropClick = props.closeByBackdropClick;
      var closeByOutsideClick = props.closeByOutsideClick;
      var closeOnEscape = props.closeOnEscape;
      var swipeToClose = props.swipeToClose;
      var swipeToStep = props.swipeToStep;
      var swipeHandler = props.swipeHandler;
      var sheetParams = {
        el: self.refs.el
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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Sheet.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    F7Sheet.prototype.componentDidUpdate = function componentDidUpdate (prevProps, prevState) {
      var this$1 = this;

      __reactComponentWatch(this, 'props.opened', prevProps, prevState, function (opened) {
        var self = this$1;
        if (!self.f7Sheet) { return; }

        if (opened) {
          self.f7Sheet.open();
        } else {
          self.f7Sheet.close();
        }
      });
    };

    Object.defineProperties( F7Sheet.prototype, prototypeAccessors );

    return F7Sheet;
  }(React.Component));

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
    swipeToClose: Boolean,
    swipeToStep: Boolean,
    swipeHandler: [String, Object, window.HTMLElement]
  }, Mixins.colorProps));

  F7Sheet.displayName = 'f7-sheet';

  var F7SkeletonBlock = /*@__PURE__*/(function (superclass) {
    function F7SkeletonBlock(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7SkeletonBlock.__proto__ = superclass;
    F7SkeletonBlock.prototype = Object.create( superclass && superclass.prototype );
    F7SkeletonBlock.prototype.constructor = F7SkeletonBlock;

    var prototypeAccessors = { slots: { configurable: true } };

    F7SkeletonBlock.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var width = props.width;
      var height = props.height;
      var tag = props.tag;
      var classes = Utils.classNames('skeleton-block', className, Mixins.colorClasses(props));
      var styleAttribute = style;

      if (width) {
        var widthValue = typeof width === 'number' ? (width + "px") : width;

        if (!styleAttribute) {
          styleAttribute = {
            width: widthValue
          };
        } else if (typeof styleAttribute === 'object') {
          styleAttribute = Object.assign({
            width: widthValue
          }, styleAttribute);
        } else if (typeof styleAttribute === 'string') {
          styleAttribute = "width: " + widthValue + "; " + styleAttribute;
        }
      }

      if (height) {
        var heightValue = typeof height === 'number' ? (height + "px") : height;

        if (!styleAttribute) {
          styleAttribute = {
            height: heightValue
          };
        } else if (typeof styleAttribute === 'object') {
          styleAttribute = Object.assign({
            height: heightValue
          }, styleAttribute);
        } else if (typeof styleAttribute === 'string') {
          styleAttribute = "height: " + heightValue + "; " + styleAttribute;
        }
      }

      var Tag = tag;
      return React.createElement(Tag, {
        id: id,
        style: styleAttribute,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7SkeletonBlock.prototype, prototypeAccessors );

    return F7SkeletonBlock;
  }(React.Component));

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

  var F7SkeletonText = /*@__PURE__*/(function (superclass) {
    function F7SkeletonText(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7SkeletonText.__proto__ = superclass;
    F7SkeletonText.prototype = Object.create( superclass && superclass.prototype );
    F7SkeletonText.prototype.constructor = F7SkeletonText;

    var prototypeAccessors = { slots: { configurable: true } };

    F7SkeletonText.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var width = props.width;
      var height = props.height;
      var tag = props.tag;
      var classes = Utils.classNames('skeleton-text', className, Mixins.colorClasses(props));
      var styleAttribute = style;

      if (width) {
        var widthValue = typeof width === 'number' ? (width + "px") : width;

        if (!styleAttribute) {
          styleAttribute = {
            width: widthValue
          };
        } else if (typeof styleAttribute === 'object') {
          styleAttribute = Object.assign({
            width: widthValue
          }, styleAttribute);
        } else if (typeof styleAttribute === 'string') {
          styleAttribute = "width: " + widthValue + "; " + styleAttribute;
        }
      }

      if (height) {
        var heightValue = typeof height === 'number' ? (height + "px") : height;

        if (!styleAttribute) {
          styleAttribute = {
            height: heightValue
          };
        } else if (typeof styleAttribute === 'object') {
          styleAttribute = Object.assign({
            height: heightValue
          }, styleAttribute);
        } else if (typeof styleAttribute === 'string') {
          styleAttribute = "height: " + heightValue + "; " + styleAttribute;
        }
      }

      var Tag = tag;
      return React.createElement(Tag, {
        id: id,
        style: styleAttribute,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7SkeletonText.prototype, prototypeAccessors );

    return F7SkeletonText;
  }(React.Component));

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

  var F7Statusbar = /*@__PURE__*/(function (superclass) {
    function F7Statusbar(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7Statusbar.__proto__ = superclass;
    F7Statusbar.prototype = Object.create( superclass && superclass.prototype );
    F7Statusbar.prototype.constructor = F7Statusbar;

    var prototypeAccessors = { slots: { configurable: true } };

    F7Statusbar.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'statusbar', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7Statusbar.prototype, prototypeAccessors );

    return F7Statusbar;
  }(React.Component));

  __reactComponentSetProps(F7Statusbar, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7Statusbar.displayName = 'f7-statusbar';

  var F7Stepper = /*@__PURE__*/(function (superclass) {
    function F7Stepper(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onInput', 'onMinusClick', 'onPlusClick']);
      })();
    }

    if ( superclass ) F7Stepper.__proto__ = superclass;
    F7Stepper.prototype = Object.create( superclass && superclass.prototype );
    F7Stepper.prototype.constructor = F7Stepper;

    var prototypeAccessors = { classes: { configurable: true },refs: { configurable: true } };

    F7Stepper.prototype.increment = function increment () {
      if (!this.f7Stepper) { return; }
      this.f7Stepper.increment();
    };

    F7Stepper.prototype.decrement = function decrement () {
      if (!this.f7Stepper) { return; }
      this.f7Stepper.decrement();
    };

    F7Stepper.prototype.setValue = function setValue (newValue) {
      var self = this;
      if (self.f7Stepper && self.f7Stepper.setValue) { self.f7Stepper.setValue(newValue); }
    };

    F7Stepper.prototype.getValue = function getValue () {
      var self = this;

      if (self.f7Stepper && self.f7Stepper.getValue) {
        return self.f7Stepper.getValue();
      }

      return undefined;
    };

    F7Stepper.prototype.onInput = function onInput (event) {
      var stepper = this.f7Stepper;
      this.dispatchEvent('input', event, stepper);
    };

    F7Stepper.prototype.onChange = function onChange (event) {
      var stepper = this.f7Stepper;
      this.dispatchEvent('change', event, stepper);
    };

    F7Stepper.prototype.onMinusClick = function onMinusClick (event) {
      var stepper = this.f7Stepper;
      this.dispatchEvent('stepper:minusclick stepperMinusClick', event, stepper);
    };

    F7Stepper.prototype.onPlusClick = function onPlusClick (event) {
      var stepper = this.f7Stepper;
      this.dispatchEvent('stepper:plusclick stepperPlusClick', event, stepper);
    };

    prototypeAccessors.classes.get = function () {
      var self = this;
      var props = self.props;
      var round = props.round;
      var roundIos = props.roundIos;
      var roundMd = props.roundMd;
      var roundAurora = props.roundAurora;
      var fill = props.fill;
      var fillIos = props.fillIos;
      var fillMd = props.fillMd;
      var fillAurora = props.fillAurora;
      var large = props.large;
      var largeIos = props.largeIos;
      var largeMd = props.largeMd;
      var largeAurora = props.largeAurora;
      var small = props.small;
      var smallIos = props.smallIos;
      var smallMd = props.smallMd;
      var smallAurora = props.smallAurora;
      var raised = props.raised;
      var raisedMd = props.raisedMd;
      var raisedIos = props.raisedIos;
      var raisedAurora = props.raisedAurora;
      var disabled = props.disabled;
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
    };

    F7Stepper.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var input = props.input;
      var buttonsOnly = props.buttonsOnly;
      var inputType = props.inputType;
      var value = props.value;
      var inputReadonly = props.inputReadonly;
      var min = props.min;
      var max = props.max;
      var step = props.step;
      var id = props.id;
      var style = props.style;
      var name = props.name;
      var inputId = props.inputId;
      var inputWrapEl;
      var valueEl;

      if (input && !buttonsOnly) {
        var inputEl;
        {
          inputEl = React.createElement('input', {
            ref: function (__reactNode) {
              this$1.__reactRefs['inputEl'] = __reactNode;
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes
      }, React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['minusEl'] = __reactNode;
        },
        className: 'stepper-button-minus'
      }), inputWrapEl, valueEl, React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['plusEl'] = __reactNode;
        },
        className: 'stepper-button-plus'
      }));
    };

    F7Stepper.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var ref = self.refs;
      var minusEl = ref.minusEl;
      var plusEl = ref.plusEl;

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
    };

    F7Stepper.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var ref = self.refs;
      var minusEl = ref.minusEl;
      var plusEl = ref.plusEl;

      if (minusEl) {
        minusEl.addEventListener('click', self.onMinusClick);
      }

      if (plusEl) {
        plusEl.addEventListener('click', self.onPlusClick);
      }

      if (!self.props.init) { return; }
      self.$f7ready(function (f7) {
        var ref = self.props;
        var min = ref.min;
        var max = ref.max;
        var value = ref.value;
        var step = ref.step;
        var formatValue = ref.formatValue;
        var autorepeat = ref.autorepeat;
        var autorepeatDynamic = ref.autorepeatDynamic;
        var wraps = ref.wraps;
        var manualInputMode = ref.manualInputMode;
        var decimalPoint = ref.decimalPoint;
        var buttonsEndInputMode = ref.buttonsEndInputMode;
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
    };

    F7Stepper.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Stepper.prototype, prototypeAccessors );

    return F7Stepper;
  }(React.Component));

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

  var F7Subnavbar = /*@__PURE__*/(function (superclass) {
    function F7Subnavbar(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7Subnavbar.__proto__ = superclass;
    F7Subnavbar.prototype = Object.create( superclass && superclass.prototype );
    F7Subnavbar.prototype.constructor = F7Subnavbar;

    var prototypeAccessors = { slots: { configurable: true } };

    F7Subnavbar.prototype.render = function render () {
      var self = this;
      var props = self.props;
      var inner = props.inner;
      var title = props.title;
      var style = props.style;
      var id = props.id;
      var className = props.className;
      var sliding = props.sliding;
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
        className: 'title'
      }, title), this.slots['default']) : this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7Subnavbar.prototype, prototypeAccessors );

    return F7Subnavbar;
  }(React.Component));

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

  var F7SwipeoutActions = /*@__PURE__*/(function (superclass) {
    function F7SwipeoutActions(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7SwipeoutActions.__proto__ = superclass;
    F7SwipeoutActions.prototype = Object.create( superclass && superclass.prototype );
    F7SwipeoutActions.prototype.constructor = F7SwipeoutActions;

    var prototypeAccessors = { slots: { configurable: true } };

    F7SwipeoutActions.prototype.render = function render () {
      var props = this.props;
      var left = props.left;
      var right = props.right;
      var side = props.side;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var sideComputed = side;

      if (!sideComputed) {
        if (left) { sideComputed = 'left'; }
        if (right) { sideComputed = 'right'; }
      }

      var classes = Utils.classNames(className, ("swipeout-actions-" + sideComputed), Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7SwipeoutActions.prototype, prototypeAccessors );

    return F7SwipeoutActions;
  }(React.Component));

  __reactComponentSetProps(F7SwipeoutActions, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    left: Boolean,
    right: Boolean,
    side: String
  }, Mixins.colorProps));

  F7SwipeoutActions.displayName = 'f7-swipeout-actions';

  var F7SwipeoutButton = /*@__PURE__*/(function (superclass) {
    function F7SwipeoutButton(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onClick']);
      })();
    }

    if ( superclass ) F7SwipeoutButton.__proto__ = superclass;
    F7SwipeoutButton.prototype = Object.create( superclass && superclass.prototype );
    F7SwipeoutButton.prototype.constructor = F7SwipeoutButton;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7SwipeoutButton.prototype.onClick = function onClick (event) {
      this.dispatchEvent('click', event);
    };

    F7SwipeoutButton.prototype.render = function render () {
      var this$1 = this;

      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var overswipe = props.overswipe;
      var deleteProp = props.delete;
      var close = props.close;
      var href = props.href;
      var confirmTitle = props.confirmTitle;
      var confirmText = props.confirmText;
      var text = props.text;
      var classes = Utils.classNames(className, {
        'swipeout-overswipe': overswipe,
        'swipeout-delete': deleteProp,
        'swipeout-close': close
      }, Mixins.colorClasses(props));
      return React.createElement('a', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        href: href || '#',
        id: id,
        style: style,
        'data-confirm': confirmText || undefined,
        'data-confirm-title': confirmTitle || undefined,
        className: classes
      }, this.slots['default'], !this.slots.default && text);
    };

    F7SwipeoutButton.prototype.componentWillUnmount = function componentWillUnmount () {
      this.refs.el.removeEventListener('click', this.onClick);
    };

    F7SwipeoutButton.prototype.componentDidMount = function componentDidMount () {
      this.refs.el.addEventListener('click', this.onClick);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7SwipeoutButton.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7SwipeoutButton.prototype, prototypeAccessors );

    return F7SwipeoutButton;
  }(React.Component));

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

  var F7SwiperSlide = /*@__PURE__*/(function (superclass) {
    function F7SwiperSlide(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7SwiperSlide.__proto__ = superclass;
    F7SwiperSlide.prototype = Object.create( superclass && superclass.prototype );
    F7SwiperSlide.prototype.constructor = F7SwiperSlide;

    var prototypeAccessors = { slots: { configurable: true } };

    F7SwiperSlide.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var zoom = props.zoom;
      var classes = Utils.classNames(className, 'swiper-slide');
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, zoom ? React.createElement('div', {
        className: 'swiper-zoom-container'
      }, this.slots['default']) : this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7SwiperSlide.prototype, prototypeAccessors );

    return F7SwiperSlide;
  }(React.Component));

  __reactComponentSetProps(F7SwiperSlide, {
    id: [String, Number],
    className: String,
    style: Object,
    zoom: Boolean
  });

  F7SwiperSlide.displayName = 'f7-swiper-slide';

  var F7Swiper = /*@__PURE__*/(function (superclass) {
    function F7Swiper(props, context) {
      superclass.call(this, props, context);
      this.__reactRefs = {};
    }

    if ( superclass ) F7Swiper.__proto__ = superclass;
    F7Swiper.prototype = Object.create( superclass && superclass.prototype );
    F7Swiper.prototype.constructor = F7Swiper;

    var prototypeAccessors = { paginationComputed: { configurable: true },scrollbarComputed: { configurable: true },navigationComputed: { configurable: true },slots: { configurable: true },refs: { configurable: true } };

    prototypeAccessors.paginationComputed.get = function () {
      var self = this;
      var ref = self.props;
      var pagination = ref.pagination;
      var params = ref.params;

      if (pagination === true || params && params.pagination && !params.pagination.el) {
        return true;
      }

      return false;
    };

    prototypeAccessors.scrollbarComputed.get = function () {
      var self = this;
      var ref = self.props;
      var scrollbar = ref.scrollbar;
      var params = ref.params;

      if (scrollbar === true || params && params.scrollbar && !params.scrollbar.el) {
        return true;
      }

      return false;
    };

    prototypeAccessors.navigationComputed.get = function () {
      var self = this;
      var ref = self.props;
      var navigation = ref.navigation;
      var params = ref.params;

      if (navigation === true || params && params.navigation && !params.navigation.nextEl && !params.navigation.prevEl) {
        return true;
      }

      return false;
    };

    F7Swiper.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var paginationEl;
      var scrollbarEl;
      var buttonNextEl;
      var buttonPrevEl;

      if (self.paginationComputed) {
        paginationEl = React.createElement('div', {
          ref: function (__reactNode) {
            this$1.__reactRefs['paginationEl'] = __reactNode;
          },
          className: 'swiper-pagination'
        });
      }

      if (self.scrollbarComputed) {
        scrollbarEl = React.createElement('div', {
          ref: function (__reactNode) {
            this$1.__reactRefs['scrollbarEl'] = __reactNode;
          },
          className: 'swiper-scrollbar'
        });
      }

      if (self.navigationComputed) {
        buttonNextEl = React.createElement('div', {
          ref: function (__reactNode) {
            this$1.__reactRefs['nextEl'] = __reactNode;
          },
          className: 'swiper-button-next'
        });
        buttonPrevEl = React.createElement('div', {
          ref: function (__reactNode) {
            this$1.__reactRefs['prevEl'] = __reactNode;
          },
          className: 'swiper-button-prev'
        });
      }

      var classes = Utils.classNames(className, 'swiper-container', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        className: classes
      }, this.slots['before-wrapper'], React.createElement('div', {
        className: 'swiper-wrapper'
      }, this.slots['default']), paginationEl, scrollbarEl, buttonPrevEl, buttonNextEl, this.slots['after-wrapper']);
    };

    F7Swiper.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      if (!self.props.init) { return; }
      if (self.swiper && self.swiper.destroy) { self.swiper.destroy(); }
    };

    F7Swiper.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      if (!self.props.init) { return; }
      self.$f7ready(function (f7) {
        var newParams = {
          pagination: {},
          navigation: {},
          scrollbar: {}
        };
        var ref = self.props;
        var params = ref.params;
        var pagination = ref.pagination;
        var navigation = ref.navigation;
        var scrollbar = ref.scrollbar;
        if (params) { Utils.extend(newParams, params); }
        if (pagination && !newParams.pagination.el) { newParams.pagination.el = self.refs.paginationEl; }

        if (navigation && !newParams.navigation.nextEl && !newParams.navigation.prevEl) {
          newParams.navigation.nextEl = self.refs.nextEl;
          newParams.navigation.prevEl = self.refs.prevEl;
        }

        if (scrollbar && !newParams.scrollbar.el) { newParams.scrollbar.el = self.refs.scrollbarEl; }
        self.swiper = f7.swiper.create(self.refs.el, newParams);
      });
    };

    F7Swiper.prototype.componentDidUpdate = function componentDidUpdate () {
      var self = this;

      if (!self.initialUpdate) {
        self.initialUpdate = true;
        return;
      }

      if (self.swiper && self.swiper.update) { self.swiper.update(); }
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Swiper.prototype, prototypeAccessors );

    return F7Swiper;
  }(React.Component));

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

  var F7Tab = /*@__PURE__*/(function (superclass) {
    function F7Tab(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      this.state = (function () {
        return {
          tabContent: null
        };
      })();

      (function () {
        Utils.bindMethods(this$1, ['onTabShow', 'onTabHide']);
      })();
    }

    if ( superclass ) F7Tab.__proto__ = superclass;
    F7Tab.prototype = Object.create( superclass && superclass.prototype );
    F7Tab.prototype.constructor = F7Tab;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Tab.prototype.show = function show (animate) {
      if (!this.$f7) { return; }
      this.$f7.tab.show(this.refs.el, animate);
    };

    F7Tab.prototype.onTabShow = function onTabShow (event) {
      this.dispatchEvent('tab:show tabShow', event);
    };

    F7Tab.prototype.onTabHide = function onTabHide (event) {
      this.dispatchEvent('tab:hide tabHide', event);
    };

    F7Tab.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var tabActive = props.tabActive;
      var id = props.id;
      var className = props.className;
      var style = props.style;
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
          ref: function (__reactNode) {
            this$1.__reactRefs['el'] = __reactNode;
          },
          className: classes
        }, tabContent ? React.createElement(TabContent, Object.assign({
          key: tabContent.id
        }, tabContent.props)) : this.slots['default']);
      }
    };

    F7Tab.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var el = self.refs.el;

      if (el) {
        el.addEventListener('tab:show', self.onTabShow);
        el.addEventListener('tab:hide', self.onTabHide);
      }

      self.setState({
        tabContent: null
      });
      self.$f7ready(function () {
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
    };

    F7Tab.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var el = self.refs.el;

      if (el) {
        el.removeEventListener('tab:show', self.onTabShow);
        el.removeEventListener('tab:hide', self.onTabHide);
      }

      if (!self.routerData) { return; }
      f7.routers.tabs.splice(f7.routers.tabs.indexOf(self.routerData), 1);
      self.routerData = null;
      delete self.routerData;
    };

    F7Tab.prototype.componentDidUpdate = function componentDidUpdate () {
      var self = this;
      if (!self.routerData) { return; }
      f7.events.emit('tabRouterDidUpdate', self.routerData);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7Tab.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Tab.prototype, prototypeAccessors );

    return F7Tab;
  }(React.Component));

  __reactComponentSetProps(F7Tab, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    tabActive: Boolean
  }, Mixins.colorProps));

  F7Tab.displayName = 'f7-tab';

  var F7Tabs = /*@__PURE__*/(function (superclass) {
    function F7Tabs(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7Tabs.__proto__ = superclass;
    F7Tabs.prototype = Object.create( superclass && superclass.prototype );
    F7Tabs.prototype.constructor = F7Tabs;

    var prototypeAccessors = { slots: { configurable: true } };

    F7Tabs.prototype.render = function render () {
      var self = this;
      var props = self.props;
      var animated = props.animated;
      var swipeable = props.swipeable;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var routable = props.routable;
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
          className: Utils.classNames(wrapClasses, classes)
        }, React.createElement('div', {
          className: tabsClasses
        }, this.slots['default']));
      }

      return React.createElement('div', {
        id: id,
        style: style,
        className: Utils.classNames(tabsClasses, classes)
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7Tabs.prototype, prototypeAccessors );

    return F7Tabs;
  }(React.Component));

  __reactComponentSetProps(F7Tabs, Object.assign({
    id: [String, Number],
    className: String,
    style: Object,
    animated: Boolean,
    swipeable: Boolean,
    routable: Boolean
  }, Mixins.colorProps));

  F7Tabs.displayName = 'f7-tabs';

  var F7Toolbar = /*@__PURE__*/(function (superclass) {
    function F7Toolbar(props, context) {
      superclass.call(this, props, context);
      this.__reactRefs = {};
    }

    if ( superclass ) F7Toolbar.__proto__ = superclass;
    F7Toolbar.prototype = Object.create( superclass && superclass.prototype );
    F7Toolbar.prototype.constructor = F7Toolbar;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7Toolbar.prototype.hide = function hide (animate) {
      var self = this;
      if (!self.$f7) { return; }
      self.$f7.toolbar.hide(this.refs.el, animate);
    };

    F7Toolbar.prototype.show = function show (animate) {
      var self = this;
      if (!self.$f7) { return; }
      self.$f7.toolbar.show(this.refs.el, animate);
    };

    F7Toolbar.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var inner = props.inner;
      var tabbar = props.tabbar;
      var labels = props.labels;
      var scrollable = props.scrollable;
      var hidden = props.hidden;
      var noShadow = props.noShadow;
      var noHairline = props.noHairline;
      var noBorder = props.noBorder;
      var topMd = props.topMd;
      var topIos = props.topIos;
      var topAurora = props.topAurora;
      var top = props.top;
      var bottomMd = props.bottomMd;
      var bottomIos = props.bottomIos;
      var bottomAurora = props.bottomAurora;
      var bottom = props.bottom;
      var position = props.position;
      var classes = Utils.classNames(className, 'toolbar', {
        tabbar: tabbar,
        'toolbar-bottom': self.$theme.md && bottomMd || self.$theme.ios && bottomIos || self.$theme.aurora && bottomAurora || bottom || position === 'bottom',
        'toolbar-top': self.$theme.md && topMd || self.$theme.ios && topIos || self.$theme.aurora && topAurora || top || position === 'top',
        'tabbar-labels': labels,
        'tabbar-scrollable': scrollable,
        'toolbar-hidden': hidden,
        'no-shadow': noShadow,
        'no-hairline': noHairline || noBorder
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        className: classes
      }, this.slots['before-inner'], inner ? React.createElement('div', {
        className: 'toolbar-inner'
      }, this.slots['default']) : this.slots['default'], this.slots['after-inner']);
    };

    F7Toolbar.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      self.$f7ready(function (f7) {
        if (self.props.tabbar) { f7.toolbar.setHighlight(self.refs.el); }
      });
    };

    F7Toolbar.prototype.componentDidUpdate = function componentDidUpdate () {
      var self = this;

      if (self.props.tabbar && self.$f7) {
        self.$f7.toolbar.setHighlight(self.refs.el);
      }
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7Toolbar.prototype, prototypeAccessors );

    return F7Toolbar;
  }(React.Component));

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

  var F7TreeviewItem = /*@__PURE__*/(function (superclass) {
    function F7TreeviewItem(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      (function () {
        Utils.bindMethods(this$1, ['onClick', 'onOpen', 'onClose', 'onLoadChildren']);
      })();
    }

    if ( superclass ) F7TreeviewItem.__proto__ = superclass;
    F7TreeviewItem.prototype = Object.create( superclass && superclass.prototype );
    F7TreeviewItem.prototype.constructor = F7TreeviewItem;

    var prototypeAccessors = { itemRootAttrs: { configurable: true },itemRootClasses: { configurable: true },classes: { configurable: true },slots: { configurable: true },refs: { configurable: true } };

    F7TreeviewItem.prototype.onClick = function onClick (event) {
      this.dispatchEvent('click', event);
    };

    F7TreeviewItem.prototype.onOpen = function onOpen (event) {
      this.dispatchEvent('treeview:open treeviewOpen', event);
    };

    F7TreeviewItem.prototype.onClose = function onClose (event) {
      this.dispatchEvent('treeview:close treeviewClose', event);
    };

    F7TreeviewItem.prototype.onLoadChildren = function onLoadChildren (event) {
      this.dispatchEvent('treeview:loadchildren treeviewLoadChildren', event, event.detail);
    };

    prototypeAccessors.itemRootAttrs.get = function () {
      var self = this;
      var props = self.props;
      var link = props.link;
      var href = link;
      if (link === true) { href = '#'; }
      if (link === false) { href = undefined; }
      return Utils.extend({
        href: href
      }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
    };

    prototypeAccessors.itemRootClasses.get = function () {
      var self = this;
      var props = self.props;
      var selectable = props.selectable;
      var selected = props.selected;
      var itemToggle = props.itemToggle;
      return Utils.classNames('treeview-item-root', {
        'treeview-item-selectable': selectable,
        'treeview-item-selected': selected,
        'treeview-item-toggle': itemToggle
      }, Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
    };

    prototypeAccessors.classes.get = function () {
      var self = this;
      var props = self.props;
      var className = props.className;
      var opened = props.opened;
      var loadChildren = props.loadChildren;
      return Utils.classNames(className, 'treeview-item', {
        'treeview-item-opened': opened,
        'treeview-load-children': loadChildren
      }, Mixins.colorClasses(props));
    };

    F7TreeviewItem.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var toggle = props.toggle;
      var label = props.label;
      var icon = props.icon;
      var iconMaterial = props.iconMaterial;
      var iconIon = props.iconIon;
      var iconFa = props.iconFa;
      var iconF7 = props.iconF7;
      var iconMd = props.iconMd;
      var iconIos = props.iconIos;
      var iconAurora = props.iconAurora;
      var iconSize = props.iconSize;
      var iconColor = props.iconColor;
      var link = props.link;
      var slots = self.slots;
      var hasChildren = slots.default && slots.default.length || slots.children && slots.children.length || slots['children-start'] && slots['children-start'].length;
      var needToggle = typeof toggle === 'undefined' ? hasChildren : toggle;
      var iconEl;

      if (icon || iconMaterial || iconIon || iconFa || iconF7 || iconMd || iconIos || iconAurora) {
        iconEl = React.createElement(F7Icon, {
          material: iconMaterial,
          f7: iconF7,
          fa: iconFa,
          ion: iconIon,
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
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: self.classes
      }, React.createElement(TreeviewRootTag, Object.assign({
        ref: function (__reactNode) {
          this$1.__reactRefs['rootEl'] = __reactNode;
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
    };

    F7TreeviewItem.prototype.componentWillUnmount = function componentWillUnmount () {
      var self = this;
      var ref = self.refs;
      var el = ref.el;
      var rootEl = ref.rootEl;
      rootEl.removeEventListener('click', self.onClick);
      el.removeEventListener('treeview:open', self.onOpen);
      el.removeEventListener('treeview:close', self.onClose);
      el.removeEventListener('treeview:loadchildren', self.onLoadChildren);
    };

    F7TreeviewItem.prototype.componentDidMount = function componentDidMount () {
      var self = this;
      var ref = self.refs;
      var el = ref.el;
      var rootEl = ref.rootEl;
      rootEl.addEventListener('click', self.onClick);
      el.addEventListener('treeview:open', self.onOpen);
      el.addEventListener('treeview:close', self.onClose);
      el.addEventListener('treeview:loadchildren', self.onLoadChildren);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7TreeviewItem.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7TreeviewItem.prototype, prototypeAccessors );

    return F7TreeviewItem;
  }(React.Component));

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
  }, Mixins.colorProps, Mixins.linkActionsProps, Mixins.linkRouterProps, Mixins.linkIconProps));

  F7TreeviewItem.displayName = 'f7-treeview-item';

  var F7Treeview = /*@__PURE__*/(function (superclass) {
    function F7Treeview(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7Treeview.__proto__ = superclass;
    F7Treeview.prototype = Object.create( superclass && superclass.prototype );
    F7Treeview.prototype.constructor = F7Treeview;

    var prototypeAccessors = { slots: { configurable: true } };

    F7Treeview.prototype.render = function render () {
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'treeview', Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7Treeview.prototype, prototypeAccessors );

    return F7Treeview;
  }(React.Component));

  __reactComponentSetProps(F7Treeview, Object.assign({
    id: [String, Number],
    className: String,
    style: Object
  }, Mixins.colorProps));

  F7Treeview.displayName = 'f7-treeview';

  var F7View = /*@__PURE__*/(function (superclass) {
    function F7View(props, context) {
      var this$1 = this;

      superclass.call(this, props, context);
      this.__reactRefs = {};

      this.state = (function () {
        return {
          pages: []
        };
      })();

      (function () {
        var self = this$1;
        Utils.bindMethods(self, ['onSwipeBackMove', 'onSwipeBackBeforeChange', 'onSwipeBackAfterChange', 'onSwipeBackBeforeReset', 'onSwipeBackAfterReset', 'onTabShow', 'onTabHide', 'onViewInit']);
      })();
    }

    if ( superclass ) F7View.__proto__ = superclass;
    F7View.prototype = Object.create( superclass && superclass.prototype );
    F7View.prototype.constructor = F7View;

    var prototypeAccessors = { slots: { configurable: true },refs: { configurable: true } };

    F7View.prototype.onViewInit = function onViewInit (view) {
      var self = this;
      self.dispatchEvent('view:init viewInit', view);

      if (!self.props.init) {
        self.routerData.instance = view;
        self.f7View = self.routerData.instance;
      }
    };

    F7View.prototype.onSwipeBackMove = function onSwipeBackMove (data) {
      var swipeBackData = data;
      this.dispatchEvent('swipeback:move swipeBackMove', swipeBackData);
    };

    F7View.prototype.onSwipeBackBeforeChange = function onSwipeBackBeforeChange (data) {
      var swipeBackData = data;
      this.dispatchEvent('swipeback:beforechange swipeBackBeforeChange', swipeBackData);
    };

    F7View.prototype.onSwipeBackAfterChange = function onSwipeBackAfterChange (data) {
      var swipeBackData = data;
      this.dispatchEvent('swipeback:afterchange swipeBackAfterChange', swipeBackData);
    };

    F7View.prototype.onSwipeBackBeforeReset = function onSwipeBackBeforeReset (data) {
      var swipeBackData = data;
      this.dispatchEvent('swipeback:beforereset swipeBackBeforeReset', swipeBackData);
    };

    F7View.prototype.onSwipeBackAfterReset = function onSwipeBackAfterReset (data) {
      var swipeBackData = data;
      this.dispatchEvent('swipeback:afterreset swipeBackAfterReset', swipeBackData);
    };

    F7View.prototype.onTabShow = function onTabShow (el) {
      if (el === this.refs.el) {
        this.dispatchEvent('tab:show tabShow');
      }
    };

    F7View.prototype.onTabHide = function onTabHide (el) {
      if (el === this.refs.el) {
        this.dispatchEvent('tab:hide tabHide');
      }
    };

    F7View.prototype.render = function render () {
      var this$1 = this;

      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var tab = props.tab;
      var main = props.main;
      var tabActive = props.tabActive;
      var className = props.className;
      var classes = Utils.classNames(className, 'view', {
        'view-main': main,
        'tab-active': tabActive,
        tab: tab
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        ref: function (__reactNode) {
          this$1.__reactRefs['el'] = __reactNode;
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
    };

    F7View.prototype.componentDidUpdate = function componentDidUpdate () {
      var self = this;
      if (!self.routerData) { return; }
      f7.events.emit('viewRouterDidUpdate', self.routerData);
    };

    F7View.prototype.componentWillUnmount = function componentWillUnmount () {
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
    };

    F7View.prototype.componentDidMount = function componentDidMount () {
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
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    F7View.prototype.dispatchEvent = function dispatchEvent (events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      return __reactComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
    };

    prototypeAccessors.refs.get = function () {
      return this.__reactRefs;
    };

    prototypeAccessors.refs.set = function (refs) {};

    Object.defineProperties( F7View.prototype, prototypeAccessors );

    return F7View;
  }(React.Component));

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
    iosDynamicNavbar: Boolean,
    iosSeparateDynamicNavbar: Boolean,
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

  var F7Views = /*@__PURE__*/(function (superclass) {
    function F7Views(props, context) {
      superclass.call(this, props, context);
    }

    if ( superclass ) F7Views.__proto__ = superclass;
    F7Views.prototype = Object.create( superclass && superclass.prototype );
    F7Views.prototype.constructor = F7Views;

    var prototypeAccessors = { slots: { configurable: true } };

    F7Views.prototype.render = function render () {
      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var tabs = props.tabs;
      var classes = Utils.classNames(className, 'views', {
        tabs: tabs
      }, Mixins.colorClasses(props));
      return React.createElement('div', {
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    };

    prototypeAccessors.slots.get = function () {
      return __reactComponentSlots(this.props);
    };

    Object.defineProperties( F7Views.prototype, prototypeAccessors );

    return F7Views;
  }(React.Component));

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
              f7router: router,
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
              f7router: router,
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
              f7router: router,
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
   * Framework7 React 4.4.10
   * Build full featured iOS & Android apps using Framework7 & React
   * http://framework7.io/react/
   *
   * Copyright 2014-2019 Vladimir Kharlampidi
   *
   * Released under the MIT License
   *
   * Released on: July 29, 2019
   */

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
      window.Statusbar = F7Statusbar;
      window.Stepper = F7Stepper;
      window.Subnavbar = F7Subnavbar;
      window.SwipeoutActions = F7SwipeoutActions;
      window.SwipeoutButton = F7SwipeoutButton;
      window.SwiperSlide = F7SwiperSlide;
      window.Swiper = F7Swiper;
      window.Tab = F7Tab;
      window.Tabs = F7Tabs;
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

      var $theme = {};
      var theme = params.theme;
      if (theme === 'md') { $theme.md = true; }
      if (theme === 'ios') { $theme.ios = true; }
      if (theme === 'aurora') { $theme.aurora = true; }
      if (!theme || theme === 'auto') {
        $theme.ios = !!Framework7.device.ios;
        $theme.aurora = Framework7.device.desktop && Framework7.device.electron;
        $theme.md = !$theme.ios && !$theme.aurora;
      }
      Object.defineProperty(Extend.prototype, '$theme', {
        get: function get() {
          return {
            ios: f7.instance ? f7.instance.theme === 'ios' : $theme.ios,
            md: f7.instance ? f7.instance.theme === 'md' : $theme.md,
            aurora: f7.instance ? f7.instance.theme === 'aurora' : $theme.aurora,
          };
        },
      });

      function f7ready(callback) {
        f7.ready(callback);
      }
      Extend.prototype.Dom7 = Framework7.$;
      Extend.prototype.$$ = Framework7.$;
      Extend.prototype.$device = Framework7.device;
      Extend.prototype.$request = Framework7.request;
      Extend.prototype.$utils = Framework7.utils;
      Extend.prototype.$f7ready = f7ready;
      Extend.prototype.$f7Ready = f7ready;

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
