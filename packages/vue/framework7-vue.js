/**
 * Framework7 Vue 3.0.0
 * Build full featured iOS & Android apps using Framework7 & Vue
 * http://framework7.io/vue/
 *
 * Copyright 2014-2018 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: July 5, 2018
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global.Framework7Vue = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

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
      return classes.join(' ');
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
      iconIfMd: String,
      iconIfIos: String,
      iconIos: String,
      iconMd: String,
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
      pageName: String,
      reloadCurrent: Boolean,
      reloadAll: Boolean,
      reloadPrevious: Boolean,
      routeTabId: String,
      view: String,
    },
    linkRouterAttrs: function linkRouterAttrs(props) {
      var force = props.force;
      var reloadCurrent = props.reloadCurrent;
      var reloadPrevious = props.reloadPrevious;
      var reloadAll = props.reloadAll;
      var animate = props.animate;
      var ignoreCache = props.ignoreCache;
      var routeTabId = props.routeTabId;
      var view = props.view;

      var dataAnimate;
      if ('animate' in props && typeof animate !== 'undefined') {
        dataAnimate = animate.toString();
      }

      return {
        'data-force': force || undefined,
        'data-reload-current': reloadCurrent || undefined,
        'data-reload-all': reloadAll || undefined,
        'data-reload-previous': reloadPrevious || undefined,
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

      return {
        back: back || linkBack,
        external: external,
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
    },
    linkActionsAttrs: function linkActionsAttrs(props) {
      var searchbarEnable = props.searchbarEnable;
      var searchbarDisable = props.searchbarDisable;
      var searchbarClear = props.searchbarClear;
      var searchbarToggle = props.searchbarToggle;
      var panelOpen = props.panelOpen;
      var panelClose = props.panelClose;
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

      return {
        'data-searchbar': (Utils.isStringProp(searchbarEnable) && searchbarEnable)
                          || (Utils.isStringProp(searchbarDisable) && searchbarDisable)
                          || (Utils.isStringProp(searchbarClear) && searchbarClear)
                          || (Utils.isStringProp(searchbarToggle) && searchbarToggle) || undefined,
        'data-panel': (Utils.isStringProp(panelOpen) && panelOpen)
                      || (Utils.isStringProp(panelClose) && panelClose) || undefined,
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
      };
    },
    linkActionsClasses: function linkActionsClasses(props) {
      var searchbarEnable = props.searchbarEnable;
      var searchbarDisable = props.searchbarDisable;
      var searchbarClear = props.searchbarClear;
      var searchbarToggle = props.searchbarToggle;
      var panelOpen = props.panelOpen;
      var panelClose = props.panelClose;
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

      return {
        'searchbar-enable': searchbarEnable || searchbarEnable === '',
        'searchbar-disable': searchbarDisable || searchbarDisable === '',
        'searchbar-clear': searchbarClear || searchbarClear === '',
        'searchbar-toggle': searchbarToggle || searchbarToggle === '',
        'panel-close': Utils.isTrueProp(panelClose),
        'panel-open': panelOpen || panelOpen === '',
        'popup-close': Utils.isTrueProp(popupClose),
        'popup-open': popupOpen || popupOpen === '',
        'actions-close': Utils.isTrueProp(actionsClose),
        'actions-open': actionsOpen || actionsOpen === '',
        'popover-close': Utils.isTrueProp(popoverClose),
        'popover-open': popoverOpen || popoverOpen === '',
        'sheet-close': Utils.isTrueProp(sheetClose),
        'sheet-open': sheetOpen || sheetOpen === '',
        'login-screen-close': Utils.isTrueProp(loginScreenClose),
        'login-screen-open': loginScreenOpen || loginScreenOpen === '',
        'sortable-enable': Utils.isTrueProp(sortableEnable),
        'sortable-disable': Utils.isTrueProp(sortableDisable),
        'sortable-toggle': sortableToggle === true || (typeof sortableToggle === 'string' && sortableToggle.length),
      };
    },
  };

  function __vueComponentProps (component) {
    var props = {};
    var $props = component.$props;
    Object.keys($props).forEach(function (propKey) {
      if (typeof $props[propKey] !== 'undefined') { props[propKey] = $props[propKey]; }
    });

    var children = [];
    Object.keys(component.$slots).forEach(function (slotName) {
      children.push.apply(children, component.$slots[slotName]);
    });
    props.children = children;

    return props;
  }

  var f7AccordionContent = {
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),
    name: 'f7-accordion-content',

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'accordion-item-content', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  function __vueComponentDispatchEvent (component, events) {
    var args = [], len = arguments.length - 2;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 2 ];

    var self = component;
    events.split(' ').forEach(function (event) {
      self.$emit.apply(self, [ event ].concat( args ));
    });
  }

  var f7AccordionItem = {
    name: 'f7-accordion-item',
    props: Object.assign({
      id: [String, Number],
      opened: Boolean
    }, Mixins.colorProps),

    mounted: function mounted() {
      var self = this;
      var el = self.$el;
      if (!el) { return; }
      self.onOpenBound = self.onOpen.bind(self);
      self.onOpenedBound = self.onOpened.bind(self);
      self.onCloseBound = self.onClose.bind(self);
      self.onClosedBound = self.onClosed.bind(self);
      el.addEventListener('accordion:open', self.onOpenBound);
      el.addEventListener('accordion:opened', self.onOpenedBound);
      el.addEventListener('accordion:close', self.onCloseBound);
      el.addEventListener('accordion:closed', self.onClosedBound);
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$el;
      if (!el) { return; }
      el.removeEventListener('accordion:open', self.onOpenBound);
      el.removeEventListener('accordion:opened', self.onOpenedBound);
      el.removeEventListener('accordion:close', self.onCloseBound);
      el.removeEventListener('accordion:closed', self.onClosedBound);
    },

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var opened = props.opened;
      var classes = Utils.classNames(className, 'accordion-item', {
        'accordion-item-opened': opened
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    methods: {
      onOpen: function onOpen(event) {
        this.dispatchEvent('accordionOpen accordion:open', event);
      },

      onOpened: function onOpened(event) {
        this.dispatchEvent('accordionOpened accordion:opened', event);
      },

      onClose: function onClose(event) {
        this.dispatchEvent('accordionClose accordion:close', event);
      },

      onClosed: function onClosed(event) {
        this.dispatchEvent('accordionClosed accordion:closed', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7AccordionToggle = {
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),
    name: 'f7-accordion-toggle',

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'accordion-item-toggle', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Accordion = {
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),
    name: 'f7-accordion',

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'accordion-list', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7ActionsButton = {
    name: 'f7-actions-button',
    props: Object.assign({
      id: [String, Number],
      bold: Boolean,
      close: {
        type: Boolean,
        default: true
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var id = props.id;
      var className = props.className;
      var style = props.style;
      var bold = props.bold;
      var mediaEl;

      if (self.$slots.media && self.$slots.media.length) {
        mediaEl = _h('div', {
          class: 'actions-button-media'
        }, [this.$slots['media']]);
      }

      var classes = Utils.classNames(className, {
        'actions-button': true,
        'actions-button-bold': bold
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        ref: 'el',
        on: {
          click: self.onClick.bind(self)
        },
        attrs: {
          id: id
        }
      }, [mediaEl, _h('div', {
        class: 'actions-button-text'
      }, [this.$slots['default']])]);
    },

    methods: {
      onClick: function onClick(event) {
        var self = this;
        var $$ = self.$$;
        var el = self.$refs.el;

        if (self.props.close && self.$f7 && el) {
          self.$f7.actions.close($$(el).parents('.actions-modal'));
        }

        self.dispatchEvent('click', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7ActionsGroup = {
    name: 'f7-actions-group',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames.apply(Utils, [ className, 'actions-group' ].concat( Mixins.colorClasses(props) ));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7ActionsLabel = {
    name: 'f7-actions-label',
    props: Object.assign({
      id: [String, Number],
      bold: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var bold = props.bold;
      var classes = Utils.classNames(className, 'actions-label', {
        'actions-button-bold': bold
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        on: {
          click: self.onClick.bind(self)
        },
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    methods: {
      onClick: function onClick(event) {
        this.dispatchEvent('click', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Actions = {
    name: 'f7-actions',
    props: Object.assign({
      id: [String, Number],
      opened: Boolean,
      grid: Boolean,
      convertToPopover: Boolean,
      forceToPopover: Boolean,
      target: [String, Object]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var grid = props.grid;
      var classes = Utils.classNames(className, 'actions-modal', {
        'actions-grid': grid
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        ref: 'el',
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    watch: {
      'props.opened': function watchOpened(opened) {
        var self = this;
        if (!self.f7Actions) { return; }

        if (opened) {
          self.f7Actions.open();
        } else {
          self.f7Actions.close();
        }
      }
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      if (!el) { return; }
      var props = self.props;
      var grid = props.grid;
      var target = props.target;
      var convertToPopover = props.convertToPopover;
      var forceToPopover = props.forceToPopover;
      var opened = props.opened;
      self.onOpenBound = self.onOpen.bind(self);
      self.onOpenedBound = self.onOpened.bind(self);
      self.onCloseBound = self.onClose.bind(self);
      self.onClosedBound = self.onClosed.bind(self);
      el.addEventListener('actions:open', self.onOpenBound);
      el.addEventListener('actions:opened', self.onOpenedBound);
      el.addEventListener('actions:close', self.onCloseBound);
      el.addEventListener('actions:closed', self.onClosedBound);
      self.$f7ready(function () {
        var actionsParams = {
          el: self.$refs.el,
          grid: grid
        };
        if (target) { actionsParams.targetEl = target; }
        if (typeof self.$options.propsData.convertToPopover !== 'undefined') { actionsParams.convertToPopover = convertToPopover; }
        if (typeof self.$options.propsData.forceToPopover !== 'undefined') { actionsParams.forceToPopover = forceToPopover; }
        self.f7Actions = self.$f7.actions.create(actionsParams);

        if (opened) {
          self.f7Actions.open(false);
        }
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Actions) { self.f7Actions.destroy(); }
      var el = self.$el;
      if (!el) { return; }
      el.removeEventListener('actions:open', self.onOpenBound);
      el.removeEventListener('actions:opened', self.onOpenedBound);
      el.removeEventListener('actions:close', self.onCloseBound);
      el.removeEventListener('actions:closed', self.onClosedBound);
    },

    methods: {
      onOpen: function onOpen(event) {
        this.dispatchEvent('actions:open actionsOpen', event);
      },

      onOpened: function onOpened(event) {
        this.dispatchEvent('actions:opened actionsOpened', event);
      },

      onClose: function onClose(event) {
        this.dispatchEvent('actions:close actionsClose', event);
      },

      onClosed: function onClosed(event) {
        this.dispatchEvent('actions:closed actionsClosed', event);
      },

      open: function open(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.actions.open(self.$refs.el, animate);
      },

      close: function close(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.actions.close(self.$refs.el, animate);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var eventsEmitter = {
    listeners: {},
    on: function on(events, handler) {
      events.split(' ').forEach(function (event) {
        if (!eventsEmitter.listeners[event]) { eventsEmitter.listeners[event] = []; }
        eventsEmitter.listeners[event].push(handler);
      });
    },
    off: function off(events, handler) {
      events.split(' ').forEach(function (event) {
        if (!eventsEmitter.listeners[event]) { return; }
        if (typeof handler === 'undefined') {
          eventsEmitter.listeners[event] = [];
        } else {
          eventsEmitter.listeners[event].forEach(function (eventHandler, index) {
            if (eventHandler === handler) {
              eventsEmitter.listeners[event].splice(index, 1);
            }
          });
        }
      });
    },
    once: function once(events, handler) {
      if (typeof handler !== 'function') { return; }
      function onceHandler() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        handler.apply(void 0, args);
        eventsEmitter.off(events, onceHandler);
      }
      eventsEmitter.on(events, onceHandler);
    },
    emit: function emit(events) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      events.split(' ').forEach(function (event) {
        if (eventsEmitter.listeners && eventsEmitter.listeners[event]) {
          var handlers = [];
          eventsEmitter.listeners[event].forEach(function (eventHandler) {
            handlers.push(eventHandler);
          });
          handlers.forEach(function (eventHandler) {
            eventHandler.apply(void 0, args);
          });
        }
      });
    },
  };

  var f7 = {
    instance: null,
    Framework7: null,
    init: function init(rootEl, params, routes) {
      if ( params === void 0 ) params = {};

      var f7Params = Utils.extend({}, params, {
        root: rootEl,
      });
      if (routes && routes.length && !f7Params.routes) { f7Params.routes = routes; }

      f7.instance = new f7.Framework7(f7Params);
      eventsEmitter.emit('ready', f7.instance);
    },
    ready: function ready(callback) {
      if (!callback) { return; }
      if (f7.instance) { callback(f7.instance); }
      else {
        eventsEmitter.once('ready', callback);
      }
    },
    routers: {
      views: [],
      tabs: [],
      modals: null,
    },
  };

  function __vueComponentSetState (component, updater, callback) {
    var self = component;
    var newState;
    if (typeof updater === 'function') {
      newState = updater(self.state, self.props);
    } else {
      newState = updater;
    }
    Object.keys(newState).forEach(function (key) {
      self.$set(self.state, key, newState[key]);
    });
    if (typeof callback === 'function') { callback(); }
  }

  var RoutableModals = {
    name: 'f7-routable-modals',

    data: function data() {
      var state = (function () {
        return {
          modals: []
        };
      })();

      return {
        state: state
      };
    },

    render: function render() {
      var _h = this.$createElement;
      return _h('div', {
        ref: 'el',
        class: 'framework7-modals'
      }, [this.state.modals.map(function (modal) {
        var ModalComponent = modal.component;
        {
          return _h(ModalComponent, {
            key: modal.id,
            props: modal.props
          });
        }
      })]);
    },

    updated: function updated() {
      var self = this;
      if (!self.routerData) { return; }
      eventsEmitter.emit('modalsRouterDidUpdate', self.routerData);
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (!self.routerData) { return; }
      f7.routers.modals = null;
      self.routerData = null;
      delete self.routerData;
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      self.setState({
        modals: []
      });
      self.routerData = {
        el: el,
        component: self
      };
      f7.routers.modals = self.routerData;
    },

    methods: {
      setState: function setState(updater, callback) {
        __vueComponentSetState(this, updater, callback);
      }

    }
  };

  var f7App = {
    name: 'f7-app',
    props: Object.assign({
      id: [String, Number],
      params: Object,
      routes: Array
    }, Mixins.colorProps),

    data: function data() {
      var props = __vueComponentProps(this);

      var state = (function () {
        return {
          modals: []
        };
      })();

      return {
        state: state
      };
    },

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var classes = Utils.classNames(className, 'framework7-root', Mixins.colorClasses(props));
      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id || 'framework7-root'
        }
      }, [this.$slots['default'], _h(RoutableModals)]);
    },

    mounted: function mounted() {
      var self = this;
      var ref = self.props;
      var params = ref.params; if ( params === void 0 ) params = {};
      var routes = ref.routes;
      var el = self.$refs.el;
      var parentEl = el.parentNode;

      if (parentEl && parentEl !== document.body && parentEl.parentNode === document.body) {
        parentEl.style.height = '100%';
      }

      f7.init(el, params, routes);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var F7Badge = {
    name: 'f7-badge',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'badge', Mixins.colorClasses(props));
      return _h('span', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7BlockFooter = {
    name: 'f7-block-footer',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'block-footer', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7BlockHeader = {
    name: 'f7-block-header',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'block-header', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7BlockTitle = {
    name: 'f7-block-title',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'block-title', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Block = {
    name: 'f7-block',
    props: Object.assign({
      id: [String, Number],
      inset: Boolean,
      tabletInset: Boolean,
      strong: Boolean,
      tabs: Boolean,
      tab: Boolean,
      tabActive: Boolean,
      accordionList: Boolean,
      noHairlines: Boolean,
      noHairlinesMd: Boolean,
      noHairlinesIos: Boolean
    }, Mixins.colorProps),

    mounted: function mounted() {
      var el = this.$el;
      if (!el) { return; }
      this.onTabShowBound = this.onTabShow.bind(this);
      this.onTabHideBound = this.onTabHide.bind(this);
      el.addEventListener('tab:show', this.onTabShowBound);
      el.addEventListener('tab:hide', this.onTabHideBound);
    },

    beforeDestroy: function beforeDestroy() {
      var el = this.$el;
      if (!el) { return; }
      el.removeEventListener('tab:show', this.onTabShowBound);
      el.removeEventListener('tab:hide', this.onTabHideBound);
    },

    render: function render() {
      var _h = this.$createElement;
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
        'no-hairlines-ios': noHairlinesIos
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    methods: {
      onTabShow: function onTabShow(e) {
        this.dispatchEvent('tabShow tab:show', e);
      },

      onTabHide: function onTabHide(e) {
        this.dispatchEvent('tabShow tab:hide', e);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var F7Icon = {
    name: 'f7-icon',
    props: Object.assign({
      id: [String, Number],
      material: String,
      f7: String,
      ion: String,
      fa: String,
      icon: String,
      ifMd: String,
      ifIos: String,
      ios: String,
      md: String,
      tooltip: String,
      size: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      return _h('i', {
        ref: 'el',
        style: Utils.extend({
          fontSize: self.sizeComputed
        }, style),
        class: self.classes,
        attrs: {
          id: id
        }
      }, [self.iconTextComputed, this.$slots['default']]);
    },

    watch: {
      'props.tooltip': function watchTooltip(newText) {
        var self = this;
        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      }
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
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
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
    },

    computed: {
      sizeComputed: function sizeComputed() {
        var self = this;
        var size = self.props.size;

        if (typeof size === 'number' || parseFloat(size) === size * 1) {
          size = size + "px";
        }

        return size;
      },

      iconTextComputed: function iconTextComputed() {
        var self = this;
        var ref = self.props;
        var material = ref.material;
        var f7 = ref.f7;
        var ifMd = ref.ifMd;
        var ifIos = ref.ifIos;
        var md = ref.md;
        var ios = ref.ios;
        var text = material || f7;
        var mdIcon = ifMd || md;
        var iosIcon = ifIos || ios;

        if (mdIcon && self.$theme.md && (mdIcon.indexOf('material:') >= 0 || mdIcon.indexOf('f7:') >= 0)) {
          text = mdIcon.split(':')[1];
        } else if (iosIcon && self.$theme.ios && (iosIcon.indexOf('material:') >= 0 || iosIcon.indexOf('f7:') >= 0)) {
          text = iosIcon.split(':')[1];
        }

        return text;
      },

      classes: function classes() {
        var classes = {
          icon: true
        };
        var self = this;
        var props = self.props;
        var ifMd = props.ifMd;
        var ifIos = props.ifIos;
        var material = props.material;
        var f7 = props.f7;
        var fa = props.fa;
        var ion = props.ion;
        var icon = props.icon;
        var md = props.md;
        var ios = props.ios;
        var className = props.className;
        var mdIcon = ifMd || md;
        var iosIcon = ifIos || ios;

        if (mdIcon || iosIcon) {
          var parts = (self.$theme.md ? mdIcon : iosIcon).split(':');
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
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  function __vueComponentTransformJSXProps (props) {
    if (!props) { return props; }
    var nestedPropsKeys = ('style class domProps slot key ref attrs on props').split(' ');
    Object.keys(props).forEach(function (key) {
      if (key === 'className') {
        props.class = props.className;
        delete props.className;
        return;
      } else if (key === 'dangerouslySetInnerHTML') {
        if (!props.domProps) { props.domProps = {}; }
        props.domProps.innerHTML = props[key];
        if (props.domProps.innerHTML && props.domProps.innerHTML.__html) {
          props.domProps.innerHTML = props.domProps.innerHTML.__html;
        }
        delete props.dangerouslySetInnerHTML;
        return;
      } else if (key.match(/^on?([A-Z])/)) {
        if (!props.on) { props.on = {}; }
        var newKey = key.replace(/(^on?)([A-Z])/, function (found, first, second) { return second.toLowerCase(); });
        props.on[newKey] = props[key];
        delete props[key];
        return;
      }
      if (nestedPropsKeys.indexOf(key) >= 0) {
        return;
      }
      if (!props.attrs) {
        props.attrs = {};
      }
      if (!props.attrs[key]) {
        props.attrs[key] = props[key];
        delete props[key];
      }
    });

    return props;
  }

  var f7Button = {
    name: 'f7-button',
    props: Object.assign({
      id: [String, Number],
      noFastclick: Boolean,
      noFastClick: Boolean,
      text: String,
      tabLink: [Boolean, String],
      tabLinkActive: Boolean,
      href: {
        type: [String, Boolean],
        default: '#'
      },
      target: String,
      round: Boolean,
      roundMd: Boolean,
      roundIos: Boolean,
      fill: Boolean,
      fillMd: Boolean,
      fillIos: Boolean,
      big: Boolean,
      bigMd: Boolean,
      bigIos: Boolean,
      small: Boolean,
      smallMd: Boolean,
      smallIos: Boolean,
      raised: Boolean,
      outline: Boolean,
      active: Boolean,
      disabled: Boolean,
      tooltip: String
    }, Mixins.colorProps, Mixins.linkIconProps, Mixins.linkRouterProps, Mixins.linkActionsProps),

    render: function render() {
      var _h = this.$createElement;
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
      var iconIfMd = props.iconIfMd;
      var iconIfIos = props.iconIfIos;
      var iconMd = props.iconMd;
      var iconIos = props.iconIos;
      var iconColor = props.iconColor;
      var iconSize = props.iconSize;
      var id = props.id;
      var style = props.style;

      if (text) {
        textEl = _h('span', [text]);
      }

      var mdThemeIcon = iconIfMd || iconMd;
      var iosThemeIcon = iconIfIos || iconIos;

      if (icon || iconMaterial || iconIon || iconFa || iconF7 || mdThemeIcon || iosThemeIcon) {
        iconEl = _h(F7Icon, {
          attrs: {
            material: iconMaterial,
            ion: iconIon,
            fa: iconFa,
            f7: iconF7,
            icon: icon,
            md: mdThemeIcon,
            ios: iosThemeIcon,
            color: iconColor,
            size: iconSize
          }
        });
      }

      return _h('a', __vueComponentTransformJSXProps(Object.assign({
        ref: 'el',
        style: style,
        class: self.classes
      }, self.attrs, {
        on: {
          click: self.onClick.bind(self)
        },
        attrs: {
          id: id
        }
      })), [iconEl, textEl, this.$slots['default']]);
    },

    computed: {
      attrs: function attrs() {
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
      },

      classes: function classes() {
        var self = this;
        var props = self.props;
        var noFastclick = props.noFastclick;
        var noFastClick = props.noFastClick;
        var tabLink = props.tabLink;
        var tabLinkActive = props.tabLinkActive;
        var round = props.round;
        var roundIos = props.roundIos;
        var roundMd = props.roundMd;
        var fill = props.fill;
        var fillIos = props.fillIos;
        var fillMd = props.fillMd;
        var big = props.big;
        var bigIos = props.bigIos;
        var bigMd = props.bigMd;
        var small = props.small;
        var smallIos = props.smallIos;
        var smallMd = props.smallMd;
        var raised = props.raised;
        var active = props.active;
        var outline = props.outline;
        var disabled = props.disabled;
        var className = props.className;
        return Utils.classNames(className, 'button', {
          'tab-link': tabLink || tabLink === '',
          'tab-link-active': tabLinkActive,
          'no-fastclick': noFastclick || noFastClick,
          'button-round': round,
          'button-round-ios': roundIos,
          'button-round-md': roundMd,
          'button-fill': fill,
          'button-fill-ios': fillIos,
          'button-fill-md': fillMd,
          'button-big': big,
          'button-big-ios': bigIos,
          'button-big-md': bigMd,
          'button-small': small,
          'button-small-ios': smallIos,
          'button-small-md': smallMd,
          'button-raised': raised,
          'button-active': active,
          'button-outline': outline,
          disabled: disabled
        }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },
    methods: {
      onClick: function onClick(event) {
        this.dispatchEvent('click', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    watch: {
      'props.tooltip': function watchTooltip(newText) {
        var self = this;
        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      }
    },

    mounted: function mounted() {
      var self = this;
      var ref = self.props;
      var tooltip = ref.tooltip;
      if (!tooltip) { return; }
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: self.$refs.el,
          text: tooltip
        });
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
    }

  };

  var F7CardContent = {
    name: 'f7-card-content',
    props: Object.assign({
      id: [String, Number],
      padding: {
        type: Boolean,
        default: true
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var id = props.id;
      var className = props.className;
      var style = props.style;
      var padding = props.padding;
      var classes = Utils.classNames(className, 'card-content', {
        'card-content-padding': padding
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var F7CardFooter = {
    name: 'f7-card-footer',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'card-footer', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var F7CardHeader = {
    name: 'f7-card-header',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'card-header', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Card = {
    name: 'f7-card',
    props: Object.assign({
      id: [String, Number],
      title: [String, Number],
      content: [String, Number],
      footer: [String, Number],
      outline: Boolean,
      padding: {
        type: Boolean,
        default: true
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      var headerEl;
      var contentEl;
      var footerEl;
      var classes = Utils.classNames(className, 'card', {
        'card-outline': outline
      }, Mixins.colorClasses(props));

      if (title || self.$slots && self.$slots.header) {
        headerEl = _h(F7CardHeader, [title, this.$slots['header']]);
      }

      if (content || self.$slots && self.$slots.content) {
        contentEl = _h(F7CardContent, {
          attrs: {
            padding: padding
          }
        }, [content, this.$slots['content']]);
      }

      if (footer || self.$slots && self.$slots.footer) {
        footerEl = _h(F7CardFooter, [footer, this.$slots['footer']]);
      }

      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [headerEl, contentEl, footerEl, this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Checkbox = {
    name: 'f7-checkbox',
    props: Object.assign({
      id: [String, Number],
      checked: Boolean,
      name: [Number, String],
      value: [Number, String, Boolean],
      disabled: Boolean,
      readonly: Boolean,
      defaultChecked: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
        inputEl = _h('input', {
          domProps: {
            value: value,
            disabled: disabled,
            readonly: readonly,
            checked: checked
          },
          on: {
            change: self.onChange.bind(self)
          },
          attrs: {
            type: 'checkbox',
            name: name
          }
        });
      }

      var iconEl = _h('i', {
        class: 'icon-checkbox'
      });

      return _h('label', {
        style: style,
        class: self.classes,
        attrs: {
          id: id
        }
      }, [inputEl, iconEl, this.$slots['default']]);
    },

    computed: {
      classes: function classes() {
        var self = this;
        var props = self.props;
        var className = props.className;
        var disabled = props.disabled;
        return Utils.classNames(className, {
          checkbox: true,
          disabled: disabled
        }, Mixins.colorClasses(props));
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },
    methods: {
      onChange: function onChange(event) {
        this.dispatchEvent('change', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    }
  };

  var f7Chip = {
    name: 'f7-chip',
    props: Object.assign({
      id: [String, Number],
      media: String,
      text: [String, Number],
      deleteable: Boolean,
      mediaBgColor: String,
      mediaTextColor: String,
      outline: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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

      if (media || self.$slots && self.$slots.media) {
        var mediaClasses = Utils.classNames('chip-media', mediaTextColor && ("text-color-" + mediaTextColor), mediaBgColor && ("bg-color-" + mediaBgColor));
        mediaEl = _h('div', {
          class: mediaClasses
        }, [media || this.$slots['media']]);
      }

      if (text || self.$slots && self.$slots.text) {
        labelEl = _h('div', {
          class: 'chip-label'
        }, [text, this.$slots['text']]);
      }

      if (deleteable) {
        deleteEl = _h('a', {
          class: 'chip-delete',
          on: {
            click: self.onDeleteClick.bind(self)
          },
          attrs: {
            href: '#'
          }
        });
      }

      var classes = Utils.classNames(className, 'chip', {
        'chip-outline': outline
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        on: {
          click: self.onClick.bind(self)
        },
        attrs: {
          id: id
        }
      }, [mediaEl, labelEl, deleteEl]);
    },

    methods: {
      onClick: function onClick(event) {
        this.dispatchEvent('click', event);
      },

      onDeleteClick: function onDeleteClick(event) {
        this.dispatchEvent('delete', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Col = {
    name: 'f7-col',
    props: Object.assign({
      id: [String, Number],
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
    }, Mixins.colorProps),

    render: function render() {
      var obj;

      var _h = this.$createElement;
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
      return _h(ColTag, {
        style: style,
        class: classes,
        on: {
          click: self.onClick.bind(self)
        },
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    methods: {
      onClick: function onClick(e) {
        this.dispatchEvent('click', e);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7FabButton = {
    name: 'f7-fab-button',
    props: Object.assign({
      id: [String, Number],
      fabClose: Boolean,
      label: String,
      target: String,
      tooltip: String
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
        labelEl = _h('span', {
          class: 'fab-label'
        }, [label]);
      }

      return _h('a', {
        style: style,
        class: classes,
        on: {
          click: this.onClick.bind(this)
        },
        attrs: {
          id: id,
          target: target
        }
      }, [this.$slots['default'], labelEl]);
    },

    methods: {
      onClick: function onClick(event) {
        this.dispatchEvent('click', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    watch: {
      'props.tooltip': function watchTooltip(newText) {
        var self = this;
        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      }
    },

    mounted: function mounted() {
      var self = this;
      var ref = self.props;
      var tooltip = ref.tooltip;
      if (!tooltip) { return; }
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: self.$refs.el,
          text: tooltip
        });
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7FabButtons = {
    name: 'f7-fab-buttons',
    props: Object.assign({
      id: [String, Number],
      position: {
        type: String,
        default: 'top'
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var position = props.position;
      var classes = Utils.classNames(className, 'fab-buttons', ("fab-buttons-" + position), Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Fab = {
    name: 'f7-fab',
    props: Object.assign({
      id: [String, Number],
      morphTo: String,
      href: [Boolean, String],
      target: String,
      text: String,
      position: {
        type: String,
        default: 'right-bottom'
      },
      tooltip: String
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      var ref = self.$slots;
      var linkSlots = ref.link;
      var defaultSlots = ref.default;
      var rootSlots = ref.root;
      var textSlots = ref.text;

      if (defaultSlots) {
        for (var i = 0; i < defaultSlots.length; i += 1) {
          var child = defaultSlots[i];
          var isRoot = (void 0);
          {
            if (child.tag && child.tag.indexOf('fab-buttons') >= 0) { isRoot = true; }
          }
          if (isRoot) { rootChildren.push(child); }else { linkChildren.push(child); }
        }
      }

      var textEl;

      if (text || textSlots && textSlots.length) {
        textEl = _h('div', {
          class: 'fab-text'
        }, [text || textSlots]);
      }

      var linkEl;

      if (linkChildren.length || linkSlots && linkSlots.length) {
        linkEl = _h('a', {
          key: 'f7-fab-link',
          on: {
            click: self.onClick.bind(self)
          },
          attrs: {
            target: target,
            href: href
          }
        }, [linkChildren, textEl, linkSlots]);
      }

      var classes = Utils.classNames(className, 'fab', ("fab-" + position), {
        'fab-morph': morphTo,
        'fab-extended': typeof textEl !== 'undefined'
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id,
          'data-morph-to': morphTo
        }
      }, [linkEl, rootChildren, rootSlots]);
    },

    methods: {
      onClick: function onClick(event) {
        var self = this;
        self.dispatchEvent('click', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    watch: {
      'props.tooltip': function watchTooltip(newText) {
        var self = this;
        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      }
    },

    mounted: function mounted() {
      var self = this;
      var ref = self.props;
      var tooltip = ref.tooltip;
      if (!tooltip) { return; }
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: self.$refs.el,
          text: tooltip
        });
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Gauge = {
    props: {
      id: [String, Number],
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
    },
    name: 'f7-gauge',

    render: function render() {
      var _h = this.$createElement;
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
      {
        return _h('div', {
          style: style,
          class: classes,
          attrs: {
            id: id
          }
        }, [_h('svg', {
          class: 'gauge-svg',
          attrs: {
            width: (size + "px"),
            height: ((semiCircle ? size / 2 : size) + "px"),
            viewBox: ("0 0 " + size + " " + (semiCircle ? size / 2 : size))
          }
        }, [semiCircle && _h('path', {
          class: 'gauge-back-semi',
          attrs: {
            d: ("M" + (size - borderWidth / 2) + "," + (size / 2) + " a1,1 0 0,0 -" + (size - borderWidth) + ",0"),
            stroke: borderBgColor,
            'stroke-width': borderWidth,
            fill: bgColor || 'none'
          }
        }), semiCircle && _h('path', {
          class: 'gauge-front-semi',
          attrs: {
            d: ("M" + (size - borderWidth / 2) + "," + (size / 2) + " a1,1 0 0,0 -" + (size - borderWidth) + ",0"),
            stroke: borderColor,
            'stroke-width': borderWidth,
            'stroke-dasharray': length / 2,
            'stroke-dashoffset': length / 2 * (progress - 1),
            fill: borderBgColor ? 'none' : bgColor || 'none'
          }
        }), !semiCircle && borderBgColor && _h('circle', {
          class: 'gauge-back-circle',
          attrs: {
            stroke: borderBgColor,
            'stroke-width': borderWidth,
            fill: bgColor || 'none',
            cx: size / 2,
            cy: size / 2,
            r: radius
          }
        }), !semiCircle && _h('circle', {
          class: 'gauge-front-circle',
          attrs: {
            transform: ("rotate(-90 " + (size / 2) + " " + (size / 2) + ")"),
            stroke: borderColor,
            'stroke-width': borderWidth,
            'stroke-dasharray': length,
            'stroke-dashoffset': length * (1 - progress),
            fill: borderBgColor ? 'none' : bgColor || 'none',
            cx: size / 2,
            cy: size / 2,
            r: radius
          }
        }), valueText && _h('text', {
          class: 'gauge-value-text',
          attrs: {
            x: '50%',
            y: semiCircle ? '100%' : '50%',
            'font-weight': valueFontWeight,
            'font-size': valueFontSize,
            fill: valueTextColor,
            dy: semiCircle ? labelText ? -labelFontSize - 15 : -5 : 0,
            'text-anchor': 'middle',
            'dominant-baseline': !semiCircle && 'middle'
          }
        }, [valueText]), labelText && _h('text', {
          class: 'gauge-label-text',
          attrs: {
            x: '50%',
            y: semiCircle ? '100%' : '50%',
            'font-weight': labelFontWeight,
            'font-size': labelFontSize,
            fill: labelTextColor,
            dy: semiCircle ? -5 : valueText ? valueFontSize / 2 + 10 : 0,
            'text-anchor': 'middle',
            'dominant-baseline': !semiCircle && 'middle'
          }
        }, [labelText])])]);
      }
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var F7Toggle = {
    name: 'f7-toggle',
    props: Object.assign({
      id: [String, Number],
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
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
        inputEl = _h('input', {
          domProps: {
            disabled: disabled,
            readonly: readonly,
            value: value,
            checked: checked
          },
          on: {
            change: self.onChange.bind(self)
          },
          attrs: {
            type: 'checkbox',
            name: name
          }
        });
      }
      return _h('label', {
        ref: 'el',
        style: style,
        class: labelClasses,
        attrs: {
          id: id
        }
      }, [inputEl, _h('span', {
        class: 'toggle-icon'
      })]);
    },

    watch: {
      'props.checked': function watchChecked(newValue) {
        var self = this;
        if (!self.f7Toggle) { return; }
        self.f7Toggle.checked = newValue;
      }
    },

    mounted: function mounted() {
      var self = this;
      if (!self.props.init) { return; }
      self.$f7ready(function (f7) {
        self.f7Toggle = f7.toggle.create({
          el: self.$refs.el,
          on: {
            change: function change(toggle) {
              self.dispatchEvent('toggle:change toggleChange', toggle.checked);
            }

          }
        });
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Toggle && self.f7Toggle.destroy && self.f7Toggle.$el) { self.f7Toggle.destroy(); }
    },

    methods: {
      toggle: function toggle() {
        var self = this;
        if (self.f7Toggle && self.f7Toggle.toggle) { self.f7Toggle.toggle(); }
      },

      onChange: function onChange(e) {
        var self = this;
        self.dispatchEvent('change', e);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var F7Range = {
    name: 'f7-range',
    props: Object.assign({
      id: [String, Number],
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
      name: String,
      inputId: String,
      input: Boolean,
      disabled: Boolean,
      draggableBar: {
        type: Boolean,
        default: true
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      var classes = Utils.classNames(className, 'range-slider', {
        disabled: disabled
      }, Mixins.colorClasses(props));
      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [input && _h('input', {
        attrs: {
          type: 'range',
          name: name,
          id: inputId
        }
      }), this.$slots['default']]);
    },

    watch: {
      'props.value': function watchValue(newValue) {
        var self = this;
        if (!self.f7Range) { return; }
        self.f7Range.setValue(newValue);
      }
    },

    mounted: function mounted() {
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
        self.f7Range = f7.range.create(Utils.noUndefinedProps({
          el: self.$refs.el,
          value: value,
          min: min,
          max: max,
          step: step,
          label: label,
          dual: dual,
          draggableBar: draggableBar,
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
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Range && self.f7Range.destroy) { self.f7Range.destroy(); }
    },

    methods: {
      setValue: function setValue(newValue) {
        var self = this;
        if (self.f7Range && self.f7Range.setValue) { self.f7Range.setValue(newValue); }
      },

      getValue: function getValue() {
        var self = this;

        if (self.f7Range && self.f7Range.getValue) {
          return self.f7Range.getValue();
        }

        return undefined;
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var F7Input = {
    name: 'f7-input',
    props: Object.assign({
      type: String,
      name: String,
      value: [String, Number, Array],
      defaultValue: [String, Number, Array],
      placeholder: String,
      id: [String, Number],
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
      inputStyle: String,
      pattern: String,
      validate: [Boolean, String],
      tabindex: [String, Number],
      resizable: Boolean,
      clearButton: Boolean,
      noFormStoreData: Boolean,
      noStoreData: Boolean,
      ignoreStoreData: Boolean,
      errorMessage: String,
      errorMessageForce: Boolean,
      info: String,
      wrap: {
        type: Boolean,
        default: true
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      var tabindex = props.tabindex;
      var resizable = props.resizable;
      var clearButton = props.clearButton;
      var errorMessage = props.errorMessage;
      var errorMessageForce = props.errorMessageForce;
      var info = props.info;
      var wrap = props.wrap;
      var style = props.style;
      var className = props.className;
      var noStoreData = props.noStoreData;
      var noFormStoreData = props.noFormStoreData;
      var ignoreStoreData = props.ignoreStoreData;
      var inputEl;

      var createInput = function (tag, children) {
        var InputTag = tag;
        var needsValue = type !== 'file';
        var needsType = tag === 'input';
        var inputClassName = Utils.classNames(type === 'textarea' && resizable && 'resizable', !wrap && className, (noFormStoreData || noStoreData || ignoreStoreData) && 'no-store-data', errorMessage && errorMessageForce && 'input-invalid');
        var input;
        {
          input = _h(InputTag, {
            ref: 'inputEl',
            style: inputStyle,
            class: inputClassName,
            domProps: {
              value: needsValue ? value : undefined,
              checked: checked,
              disabled: disabled,
              readonly: readonly,
              multiple: multiple,
              required: required
            },
            on: {
              focus: self.onFocusBound,
              blur: self.onBlurBound,
              input: self.onInputBound,
              change: self.onChangeBound
            },
            attrs: {
              name: name,
              type: needsType ? type : undefined,
              placeholder: placeholder,
              id: inputId,
              size: size,
              accept: accept,
              autocomplete: autocomplete,
              autocorrect: autocorrect,
              autocapitalize: autocapitalize,
              spellcheck: spellcheck,
              autofocus: autofocus,
              autoSave: autosave,
              max: max,
              maxlength: maxlength,
              min: min,
              minlength: minlength,
              step: step,
              pattern: pattern,
              validate: typeof validate === 'string' && validate.length ? validate : undefined,
              'data-validate': validate === true || validate === '' ? true : undefined,
              tabindex: tabindex,
              'data-error-message': errorMessageForce ? undefined : errorMessage
            }
          }, [children]);
        }
        return input;
      };

      var ref = self.$slots;
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
        inputEl = _h(F7Toggle, {
          on: {
            change: self.onChangeBound
          },
          attrs: {
            checked: checked,
            readonly: readonly,
            name: name,
            value: value,
            disabled: disabled,
            id: inputId
          }
        });
      } else if (type === 'range') {
        inputEl = _h(F7Range, {
          on: {
            rangeChange: self.onChangeBound
          },
          attrs: {
            value: value,
            disabled: disabled,
            min: min,
            max: max,
            step: step,
            name: name,
            id: inputId,
            input: true
          }
        });
      } else {
        inputEl = createInput('input');
      }

      if (wrap) {
        var wrapClasses = Utils.classNames(className, 'item-input-wrap', Mixins.colorClasses(props));
        return _h('div', {
          ref: 'wrapEl',
          class: wrapClasses,
          style: style,
          attrs: {
            id: id
          }
        }, [inputEl, errorMessage && errorMessageForce && _h('div', {
          class: 'item-input-error-message'
        }, [errorMessage]), clearButton && _h('span', {
          class: 'input-clear-button'
        }), (info || slotsInfo && slotsInfo.length) && _h('div', {
          class: 'item-input-info'
        }, [info, this.$slots['info']])]);
      }

      return inputEl;
    },

    watch: {
      'props.value': function watchValue() {
        var self = this;
        var ref = self.props;
        var type = ref.type;
        if (type === 'range' || type === 'toggle') { return; }
        if (!self.$f7) { return; }
        self.updateInputOnDidUpdate = true;
      }
    },

    created: function created() {
      var self = this;
      self.onFocusBound = self.onFocus.bind(self);
      self.onBlurBound = self.onBlur.bind(self);
      self.onInputBound = self.onInput.bind(self);
      self.onChangeBound = self.onChange.bind(self);
      self.onTextareaResizeBound = self.onTextareaResize.bind(self);
      self.onInputNotEmptyBound = self.onInputNotEmpty.bind(self);
      self.onInputEmptyBound = self.onInputEmpty.bind(self);
      self.onInputClearBound = self.onInputClear.bind(self);
    },

    mounted: function mounted() {
      var self = this;
      self.$f7ready(function (f7) {
        var ref = self.props;
        var validate = ref.validate;
        var resizable = ref.resizable;
        var type = ref.type;
        var clearButton = ref.clearButton;
        var value = ref.value;
        var defaultValue = ref.defaultValue;
        if (type === 'range' || type === 'toggle') { return; }
        var inputEl = self.$refs.inputEl;
        if (!inputEl) { return; }
        inputEl.addEventListener('input:notempty', self.onInputNotEmptyBound, false);

        if (type === 'textarea' && resizable) {
          inputEl.addEventListener('textarea:resze', self.onTextareaResizeBound, false);
        }

        if (clearButton) {
          inputEl.addEventListener('input:empty', self.onInputEmptyBound, false);
          inputEl.addEventListener('input:clear', self.onInputClearBound, false);
        }

        f7.input.checkEmptyState(inputEl);

        if ((validate || validate === '') && (typeof value !== 'undefined' && value !== null && value !== '' || typeof defaultValue !== 'undefined' && defaultValue !== null && defaultValue !== '')) {
          setTimeout(function () {
            f7.input.validate(inputEl);
          }, 0);
        }

        if (resizable) {
          f7.input.resizeTextarea(inputEl);
        }
      });
    },

    updated: function updated() {
      var self = this;
      var ref = self.props;
      var validate = ref.validate;
      var resizable = ref.resizable;
      var f7 = self.$f7;
      if (!f7) { return; }

      if (self.updateInputOnDidUpdate) {
        var inputEl = self.$refs.inputEl;
        if (!inputEl) { return; }
        self.updateInputOnDidUpdate = false;
        f7.input.checkEmptyState(inputEl);

        if (validate) {
          f7.input.validate(inputEl);
        }

        if (resizable) {
          f7.input.resizeTextarea(inputEl);
        }
      }
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var ref = self.props;
      var type = ref.type;
      var resizable = ref.resizable;
      var clearButton = ref.clearButton;
      if (type === 'range' || type === 'toggle') { return; }
      var inputEl = self.$refs.inputEl;
      if (!inputEl) { return; }
      inputEl.removeEventListener('input:notempty', self.onInputNotEmptyBound, false);

      if (type === 'textarea' && resizable) {
        inputEl.removeEventListener('textarea:resze', self.onTextareaResizeBound, false);
      }

      if (clearButton) {
        inputEl.removeEventListener('input:empty', self.onInputEmptyBound, false);
        inputEl.removeEventListener('input:clear', self.onInputClearBound, false);
      }
    },

    methods: {
      onTextareaResize: function onTextareaResize(event) {
        this.dispatchEvent('textarea:resize textareaResize', event);
      },

      onInputNotEmpty: function onInputNotEmpty(event) {
        this.dispatchEvent('input:notempty inputNotEmpty', event);
      },

      onInputEmpty: function onInputEmpty(event) {
        this.dispatchEvent('input:empty inputEmpty', event);
      },

      onInputClear: function onInputClear(event) {
        this.dispatchEvent('input:clear inputClear', event);
      },

      onInput: function onInput(event) {
        this.dispatchEvent('input', event);
      },

      onFocus: function onFocus(event) {
        this.dispatchEvent('focus', event);
      },

      onBlur: function onBlur(event) {
        this.dispatchEvent('blur', event);
      },

      onChange: function onChange(event) {
        this.dispatchEvent('change', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Label = {
    name: 'f7-label',
    props: Object.assign({
      id: [String, Number],
      floating: Boolean,
      inline: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var inline = props.inline;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var floating = props.floating;
      var classes = Utils.classNames(className, 'item-title', {
        'item-label-inline': inline,
        'item-label': !floating,
        'item-floating-label': floating
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var F7Link = {
    name: 'f7-link',
    props: Object.assign({
      id: [String, Number],
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
    }, Mixins.colorProps, Mixins.linkIconProps, Mixins.linkRouterProps, Mixins.linkActionsProps),

    data: function data() {
      var props = __vueComponentProps(this);

      var state = (function () {
        return {
          isTabbarLabel: props.tabbarLabel
        };
      })();

      return {
        state: state
      };
    },

    render: function render() {
      var _h = this.$createElement;
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
      var iconIfMd = props.iconIfMd;
      var iconIfIos = props.iconIfIos;
      var iconMd = props.iconMd;
      var iconIos = props.iconIos;
      var id = props.id;
      var style = props.style;
      var defaultSlots = self.$slots.default;
      var iconEl;
      var textEl;
      var badgeEl;
      var iconBadgeEl;

      if (text) {
        if (badge) { badgeEl = _h(F7Badge, {
          attrs: {
            color: badgeColor
          }
        }, [badge]); }
        textEl = _h('span', {
          class: self.state.isTabbarLabel ? 'tabbar-label' : ''
        }, [text, badgeEl]);
      }

      var mdThemeIcon = iconIfMd || iconMd;
      var iosThemeIcon = iconIfIos || iconIos;

      if (icon || iconMaterial || iconIon || iconFa || iconF7 || mdThemeIcon || iosThemeIcon) {
        if (iconBadge) {
          iconBadgeEl = _h(F7Badge, {
            attrs: {
              color: badgeColor
            }
          }, [iconBadge]);
        }

        iconEl = _h(F7Icon, {
          attrs: {
            material: iconMaterial,
            f7: iconF7,
            fa: iconFa,
            ion: iconIon,
            icon: icon,
            md: mdThemeIcon,
            ios: iosThemeIcon,
            color: iconColor,
            size: iconSize
          }
        }, [iconBadgeEl]);
      }

      if (iconOnly || !text && defaultSlots && defaultSlots.length === 0 || !text && !defaultSlots) {
        self.iconOnlyComputed = true;
      } else {
        self.iconOnlyComputed = false;
      }

      return _h('a', __vueComponentTransformJSXProps(Object.assign({
        ref: 'el',
        style: style,
        class: self.classes
      }, self.attrs, {
        on: {
          click: self.onClick.bind(self)
        },
        attrs: {
          id: id
        }
      })), [iconEl, textEl, defaultSlots]);
    },

    watch: {
      'props.tooltip': function watchTooltip(newText) {
        var self = this;
        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      }
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      var ref = self.props;
      var tabbarLabel = ref.tabbarLabel;
      var tabLink = ref.tabLink;
      var tooltip = ref.tooltip;
      var smartSelect = ref.smartSelect;
      var smartSelectParams = ref.smartSelectParams;
      var isTabbarLabel = false;

      if (tabbarLabel || (tabLink || tabLink === '') && self.$$(el).parents('.tabbar-labels').length) {
        isTabbarLabel = true;
      }

      self.setState({
        isTabbarLabel: isTabbarLabel
      });
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
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;

      if (self.f7SmartSelect && self.f7SmartSelect.destroy) {
        self.f7SmartSelect.destroy();
      }

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
    },

    computed: {
      attrs: function attrs() {
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
      },

      classes: function classes() {
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
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },
    methods: {
      onClick: function onClick(event) {
        var self = this;

        if (self.props.smartSelect && self.f7SmartSelect) {
          self.f7SmartSelect.open();
        }

        this.dispatchEvent('click', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      },

      setState: function setState(updater, callback) {
        __vueComponentSetState(this, updater, callback);
      }

    }
  };

  var f7ListButton = {
    name: 'f7-list-button',
    props: Object.assign({
      id: [String, Number],
      noFastclick: Boolean,
      noFastClick: Boolean,
      title: [String, Number],
      text: [String, Number],
      tabLink: [Boolean, String],
      tabLinkActive: Boolean,
      link: [Boolean, String],
      href: [Boolean, String],
      target: String
    }, Mixins.colorProps, Mixins.linkRouterProps, Mixins.linkActionsProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var title = props.title;
      var text = props.text;
      return _h('li', {
        style: style,
        class: className,
        attrs: {
          id: id
        }
      }, [_h('a', __vueComponentTransformJSXProps(Object.assign({
        class: self.classes
      }, self.attrs, {
        on: {
          click: self.onClick.bind(self)
        }
      })), [this.$slots['default'] || [title || text]])]);
    },

    computed: {
      attrs: function attrs() {
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
      },

      classes: function classes() {
        var self = this;
        var props = self.props;
        var noFastclick = props.noFastclick;
        var noFastClick = props.noFastClick;
        var tabLink = props.tabLink;
        var tabLinkActive = props.tabLinkActive;
        return Utils.classNames({
          'item-link': true,
          'list-button': true,
          'tab-link': tabLink || tabLink === '',
          'tab-link-active': tabLinkActive,
          'no-fastclick': noFastclick || noFastClick
        }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },
    methods: {
      onClick: function onClick(event) {
        this.dispatchEvent('click', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    }
  };

  var f7ListGroup = {
    name: 'f7-list-group',
    props: Object.assign({
      id: [String, Number],
      mediaList: Boolean,
      sortable: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [_h('ul', [this.$slots['default']])]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7ListIndex = {
    name: 'f7-list-index',
    props: Object.assign({
      id: [String, Number],
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
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'list-index', Mixins.colorClasses(props));
      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    beforeDestroy: function beforeDestroy() {
      if (!this.props.init) { return; }

      if (this.f7ListIndex && this.f7ListIndex.destroy) {
        this.f7ListIndex.destroy();
      }
    },

    mounted: function mounted() {
      var self = this;
      if (!self.props.init) { return; }
      self.$f7ready(function (f7) {
        var el = self.$refs.el;
        var ref = self.props;
        var listEl = ref.listEl;
        var indexes = ref.indexes;
        var iosItemHeight = ref.iosItemHeight;
        var mdItemHeight = ref.mdItemHeight;
        var scrollList = ref.scrollList;
        var label = ref.label;
        self.f7ListIndex = f7.listIndex.create({
          el: el,
          listEl: listEl,
          indexes: indexes,
          iosItemHeight: iosItemHeight,
          mdItemHeight: mdItemHeight,
          scrollList: scrollList,
          label: label,
          on: {
            select: function select(index, itemContent, itemIndex) {
              self.dispatchEvent('listindex:select listIndexSelect', itemContent, itemIndex);
            }

          }
        });
      });
    },

    watch: {
      'props.indexes': function watchIndexes() {
        if (!this.f7ListIndex) { return; }
        this.f7ListIndex.params.indexes = this.indexes;
        this.update();
      }
    },
    methods: {
      update: function update() {
        if (!this.f7ListIndex) { return; }
        this.f7ListIndex.update();
      },

      scrollListToIndex: function scrollListToIndex(indexContent) {
        if (!this.f7ListIndex) { return; }
        this.f7ListIndex.scrollListToIndex(indexContent);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7ListItemCell = {
    name: 'f7-list-item-cell',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'item-cell', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var F7ListItemContent = {
    name: 'f7-list-item-content',
    props: Object.assign({
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
      defaultChecked: Boolean,
      radio: Boolean,
      name: String,
      value: [String, Number, Array],
      readonly: Boolean,
      required: Boolean,
      disabled: Boolean
    }, Mixins.colorProps),

    data: function data() {
      var props = __vueComponentProps(this);

      var state = (function () {
        return {
          hasInput: false,
          hasInlineLabel: false,
          hasInputInfo: false,
          hasInputErrorMessage: false
        };
      })();

      return {
        state: state
      };
    },

    render: function render() {
      var _h = this.$createElement;
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
      var itemInput = props.itemInput;
      var inlineLabel = props.inlineLabel;
      var itemInputWithInfo = props.itemInputWithInfo;
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
      var slots = self.$slots.default;
      var flattenSlots = [];

      if (slots && slots.length) {
        slots.forEach(function (slot) {
          if (Array.isArray(slot)) { flattenSlots.push.apply(flattenSlots, slot); }else { flattenSlots.push(slot); }
        });
      }

      flattenSlots.forEach(function (child) {
        if (typeof child === 'undefined') { return; }
        {
          var tag = child.tag;

          if (tag && tag.indexOf('f7-input') >= 0) {
            hasInput = true;
            if (child.data && child.data.info) { hasInputInfo = true; }
            if (child.data && child.data.errorMessage && child.data.errorMessageForce) { hasInputErrorMessage = true; }
          }

          if (tag && tag.indexOf('f7-label') >= 0) {
            if (child.data && child.data.inline) { hasInlineLabel = true; }
          }
        }
        var slotName;
        slotName = child.data ? child.data.slot : undefined;
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
          inputEl = _h('input', {
            domProps: {
              checked: checked,
              readonly: readonly,
              disabled: disabled,
              required: required,
              value: value
            },
            on: {
              change: self.onChange.bind(self)
            },
            attrs: {
              name: name,
              type: radio ? 'radio' : 'checkbox'
            }
          });
        }
        inputIconEl = _h('i', {
          class: ("icon icon-" + (radio ? 'radio' : 'checkbox'))
        });
      }

      if (media || slotsMedia.length) {
        var mediaImgEl;

        if (media) {
          mediaImgEl = _h('img', {
            attrs: {
              src: media
            }
          });
        }

        mediaEl = _h('div', {
          class: 'item-media'
        }, [mediaImgEl, slotsMedia]);
      }

      var isMedia = mediaItem || mediaList;

      if (header || slotsHeader.length) {
        headerEl = _h('div', {
          class: 'item-header'
        }, [header, slotsHeader]);
      }

      if (footer || slotsFooter.length) {
        footerEl = _h('div', {
          class: 'item-footer'
        }, [footer, slotsFooter]);
      }

      if (title || slotsTitle.length || !isMedia && headerEl || !isMedia && footerEl) {
        titleEl = _h('div', {
          class: 'item-title'
        }, [!isMedia && headerEl, title, slotsTitle, !isMedia && footerEl]);
      }

      if (subtitle || slotsSubtitle.length) {
        subtitleEl = _h('div', {
          class: 'item-subtitle'
        }, [subtitle, slotsSubtitle]);
      }

      if (text || slotsText.length) {
        textEl = _h('div', {
          class: 'item-text'
        }, [text, slotsText]);
      }

      if (after || badge || slotsAfter.length) {
        if (after) {
          afterEl = _h('span', [after]);
        }

        if (badge) {
          badgeEl = _h(F7Badge, {
            attrs: {
              color: badgeColor
            }
          }, [badge]);
        }

        afterWrapEl = _h('div', {
          class: 'item-after'
        }, [slotsAfterStart, afterEl, badgeEl, slotsAfter, slotsAfterEnd]);
      }

      if (isMedia) {
        titleRowEl = _h('div', {
          class: 'item-title-row'
        }, [slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl]);
        innerEl = _h('div', {
          ref: 'innerEl',
          class: 'item-inner'
        }, [slotsInnerStart, headerEl, titleRowEl, subtitleEl, textEl, slotsInner, footerEl, slotsInnerEnd]);
      } else {
        innerEl = _h('div', {
          ref: 'innerEl',
          class: 'item-inner'
        }, [slotsInnerStart, slotsBeforeTitle, titleEl, slotsAfterTitle, afterWrapEl, slotsInner, slotsInnerEnd]);
      }

      var ItemContentTag = checkbox || radio ? 'label' : 'div';
      var classes = Utils.classNames(className, 'item-content', {
        'item-checkbox': checkbox,
        'item-radio': radio,
        'item-input': hasInput,
        'inline-label': hasInlineLabel,
        'item-input-with-info': hasInputInfo,
        'item-input-with-error-message': hasInputErrorMessage,
        'item-input-invalid': hasInputErrorMessage
      }, Mixins.colorClasses(props));
      return _h(ItemContentTag, {
        ref: 'el',
        style: style,
        class: classes,
        on: {
          click: self.onClick.bind(self)
        },
        attrs: {
          id: id
        }
      }, [slotsContentStart, inputEl, inputIconEl, mediaEl, innerEl, slotsContent, slotsContentEnd]);
    },

    beforeMount: function beforeMount() {
      this.checkHasInputState();
    },

    beforeUpdate: function beforeUpdate() {
      this.checkHasInputState();
    },

    mounted: function mounted() {
      var self = this;
      var innerEl = self.$refs.innerEl;
      if (!innerEl) { return; }
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
    },

    updated: function updated() {
      var self = this;
      var innerEl = self.$refs.innerEl;
      if (!innerEl) { return; }
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
    },

    methods: {
      checkHasInputState: function checkHasInputState() {
        var self = this;
        var props = self.props;
        var itemInput = props.itemInput;
        var inlineLabel = props.inlineLabel;
        var itemInputWithInfo = props.itemInputWithInfo;
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
      },

      onClick: function onClick(event) {
        this.dispatchEvent('click', event);
      },

      onChange: function onChange(event) {
        this.dispatchEvent('change', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      },

      setState: function setState(updater, callback) {
        __vueComponentSetState(this, updater, callback);
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7ListItemRow = {
    name: 'f7-list-item-row',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'item-row', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7ListItem = {
    name: 'f7-list-item',
    props: Object.assign({
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
      defaultChecked: Boolean,
      name: String,
      value: [String, Number, Array],
      readonly: Boolean,
      required: Boolean,
      disabled: Boolean,
      itemInput: Boolean,
      itemInputWithInfo: Boolean,
      inlineLabel: Boolean
    }, Mixins.colorProps, Mixins.linkRouterProps, Mixins.linkActionsProps),

    data: function data() {
      var props = __vueComponentProps(this);

      var state = (function () {
        return {
          isMedia: props.mediaItem || props.mediaList,
          isSortable: props.sortable,
          isSimple: false
        };
      })();

      return {
        state: state
      };
    },

    render: function render() {
      var _h = this.$createElement;
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
      var name = props.name;
      var value = props.value;
      var readonly = props.readonly;
      var required = props.required;
      var disabled = props.disabled;
      var itemInput = props.itemInput;
      var itemInputWithInfo = props.itemInputWithInfo;
      var inlineLabel = props.inlineLabel;
      var sortable = props.sortable;
      var isMedia = mediaItem || mediaList || self.state.isMedia;
      var isSortable = sortable || self.state.isSortable;
      var isSimple = self.state.isSimple;

      if (!isSimple) {
        var needsEvents = !(link || href || accordionItem || smartSelect);
        itemContentEl = _h(F7ListItemContent, {
          on: needsEvents ? {
            click: self.onClickBound,
            change: self.onChangeBound
          } : undefined,
          attrs: {
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
            radio: radio,
            name: name,
            value: value,
            readonly: readonly,
            required: required,
            disabled: disabled,
            itemInput: itemInput,
            itemInputWithInfo: itemInputWithInfo,
            inlineLabel: inlineLabel
          }
        }, [this.$slots['content-start'], this.$slots['content'], this.$slots['content-end'], this.$slots['media'], this.$slots['inner-start'], this.$slots['inner'], this.$slots['inner-end'], this.$slots['after-start'], this.$slots['after'], this.$slots['after-end'], this.$slots['header'], this.$slots['footer'], this.$slots['before-title'], this.$slots['title'], this.$slots['after-title'], this.$slots['subtitle'], this.$slots['text'], swipeout || accordionItem ? null : self.$slots.default]);

        if (link || href || accordionItem || smartSelect) {
          var linkAttrs = Utils.extend({
            href: link === true || accordionItem || smartSelect ? '#' : link || href,
            target: target
          }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
          var linkClasses = Utils.classNames({
            'item-link': true,
            'no-fastclick': noFastclick || noFastClick,
            'smart-select': smartSelect
          }, Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
          linkEl = _h('a', __vueComponentTransformJSXProps(Object.assign({
            class: linkClasses
          }, linkAttrs, {
            on: {
              click: self.onClick.bind(self)
            }
          })), [itemContentEl]);
        }
      }

      var liClasses = Utils.classNames(className, {
        'item-divider': divider,
        'list-group-title': groupTitle,
        'media-item': isMedia,
        swipeout: swipeout,
        'accordion-item': accordionItem,
        'accordion-item-opened': accordionItemOpened
      }, Mixins.colorClasses(props));

      if (divider || groupTitle) {
        return _h('li', {
          ref: 'el',
          style: style,
          class: liClasses,
          attrs: {
            id: id
          }
        }, [_h('span', [this.$slots['default'] || [title]])]);
      }

      if (isSimple) {
        return _h('li', {
          ref: 'el',
          style: style,
          class: liClasses,
          attrs: {
            id: id
          }
        }, [title, this.$slots['default']]);
      }

      var linkItemEl = link || href || smartSelect || accordionItem ? linkEl : itemContentEl;
      return _h('li', {
        ref: 'el',
        style: style,
        class: liClasses,
        attrs: {
          id: id
        }
      }, [this.$slots['root-start'], swipeout ? _h('div', {
        class: 'swipeout-content'
      }, [linkItemEl]) : linkItemEl, isSortable && _h('div', {
        class: 'sortable-handler'
      }), (swipeout || accordionItem) && self.$slots.default, this.$slots['root'], this.$slots['root-end']]);
    },

    watch: {
      'props.swipeoutOpened': function watchSwipeoutOpened(opened) {
        var self = this;
        if (!self.props.swipeout) { return; }
        var el = self.$refs.el;

        if (opened) {
          self.$f7.swipeout.open(el);
        } else {
          self.$f7.swipeout.close(el);
        }
      }
    },

    created: function created() {
      var self = this;
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
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      if (!el) { return; }
      self.$listEl = self.$$(el).parents('.list, .list-group').eq(0);

      if (self.$listEl.length) {
        self.setState({
          isMedia: self.$listEl.hasClass('media-list'),
          isSimple: self.$listEl.hasClass('simple-list'),
          isSortable: self.$listEl.hasClass('sortable')
        });
      }

      var ref = self.props;
      var swipeout = ref.swipeout;
      var swipeoutOpened = ref.swipeoutOpened;
      var accordionItem = ref.accordionItem;
      var smartSelect = ref.smartSelect;
      var smartSelectParams = ref.smartSelectParams;

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
          var ssParams = Utils.extend({
            el: el.querySelector('a.smart-select')
          }, smartSelectParams || {});
          self.f7SmartSelect = f7.smartSelect.create(ssParams);
        }

        if (swipeoutOpened) {
          f7.swipeout.open(el);
        }
      });
    },

    updated: function updated() {
      var self = this;
      var $listEl = self.$listEl;
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
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$refs.el;
      var ref = self.props;
      var swipeout = ref.swipeout;
      var accordionItem = ref.accordionItem;
      var smartSelect = ref.smartSelect;

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
    },

    methods: {
      onClick: function onClick(event) {
        var self = this;

        if (self.props.smartSelect && self.f7SmartSelect) {
          self.f7SmartSelect.open();
        }

        if (event.target.tagName.toLowerCase() !== 'input') {
          self.dispatchEvent('click', event);
        }
      },

      onSwipeoutDeleted: function onSwipeoutDeleted(event) {
        this.dispatchEvent('swipeout:deleted swipeoutDeleted', event);
      },

      onSwipeoutDelete: function onSwipeoutDelete(event) {
        this.dispatchEvent('swipeout:delete swipeoutDelete', event);
      },

      onSwipeoutClose: function onSwipeoutClose(event) {
        this.dispatchEvent('swipeout:close swipeoutClose', event);
      },

      onSwipeoutClosed: function onSwipeoutClosed(event) {
        this.dispatchEvent('swipeout:closed swipeoutClosed', event);
      },

      onSwipeoutOpen: function onSwipeoutOpen(event) {
        this.dispatchEvent('swipeout:open swipeoutOpen', event);
      },

      onSwipeoutOpened: function onSwipeoutOpened(event) {
        this.dispatchEvent('swipeout:opened swipeoutOpened', event);
      },

      onSwipeout: function onSwipeout(event) {
        this.dispatchEvent('swipeout', event);
      },

      onAccClose: function onAccClose(event) {
        this.dispatchEvent('accordion:close accordionClose', event);
      },

      onAccClosed: function onAccClosed(event) {
        this.dispatchEvent('accordion:closed accordionClosed', event);
      },

      onAccOpen: function onAccOpen(event) {
        this.dispatchEvent('accordion:open accordionOpen', event);
      },

      onAccOpened: function onAccOpened(event) {
        this.dispatchEvent('accordion:opened accordionOpened', event);
      },

      onChange: function onChange(event) {
        this.dispatchEvent('change', event);
      },

      onInput: function onInput(event) {
        this.dispatchEvent('input', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      },

      setState: function setState(updater, callback) {
        __vueComponentSetState(this, updater, callback);
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7List = {
    name: 'f7-list',
    props: Object.assign({
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
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var form = props.form;
      var ref = self.$slots;
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
          tag = child.tag;
        }

        if (!tag && 'vue' === 'react' || tag && !(tag === 'li' || tag === 'F7ListItem' || tag === 'F7ListButton' || tag.indexOf('list-item') >= 0 || tag.indexOf('list-button') >= 0 || tag.indexOf('f7-list-item') >= 0 || tag.indexOf('f7-list-button') >= 0)) {
          if (wasUlChild) { rootChildrenAfterList.push(child); }else { rootChildrenBeforeList.push(child); }
        } else if (tag) {
          wasUlChild = true;
          ulChildren.push(child);
        }
      });
      var ListTag = form ? 'form' : 'div';

      if (ulChildren.length > 0) {
        return _h(ListTag, {
          ref: 'el',
          style: style,
          class: self.classes,
          attrs: {
            id: id
          }
        }, [self.$slots['before-list'], rootChildrenBeforeList, _h('ul', [ulChildren]), self.$slots['after-list'], rootChildrenAfterList]);
      } else {
        return _h(ListTag, {
          ref: 'el',
          style: style,
          class: self.classes,
          attrs: {
            id: id
          }
        }, [self.$slots['before-list'], rootChildrenBeforeList, self.$slots['after-list'], rootChildrenAfterList]);
      }
    },

    computed: {
      classes: function classes() {
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
        var noHairlinesBetween = props.noHairlinesBetween;
        var noHairlinesBetweenIos = props.noHairlinesBetweenIos;
        var noHairlinesBetweenMd = props.noHairlinesBetweenMd;
        var formStoreData = props.formStoreData;
        var inlineLabels = props.inlineLabels;
        var className = props.className;
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
          'form-store-data': formStoreData,
          'inline-labels': inlineLabels
        }, Mixins.colorClasses(props));
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$refs.el;

      if (el) {
        el.removeEventListener('sortable:enable', self.onSortableEnableBound);
        el.removeEventListener('sortable:disable', self.onSortableDisableBound);
        el.removeEventListener('sortable:sort', self.onSortableSortBound);
        el.removeEventListener('tab:show', self.onTabShowBound);
        el.removeEventListener('tab:hide', self.onTabHideBound);
      }

      if (!(self.virtualList && self.f7VirtualList)) { return; }
      if (self.f7VirtualList.destroy) { self.f7VirtualList.destroy(); }
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      var ref = self.props;
      var virtualList = ref.virtualList;
      var virtualListParams = ref.virtualListParams;

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
    },

    methods: {
      onSortableEnable: function onSortableEnable(event) {
        this.dispatchEvent('sortable:enable sortableEnable', event);
      },

      onSortableDisable: function onSortableDisable(event) {
        this.dispatchEvent('sortable:disable sortableDisable', event);
      },

      onSortableSort: function onSortableSort(event) {
        this.dispatchEvent('sortable:sort sortableSort', event, event.detail);
      },

      onTabShow: function onTabShow(e) {
        this.dispatchEvent('tab:show tabShow', e);
      },

      onTabHide: function onTabHide(e) {
        this.dispatchEvent('tab:hide tabHide', e);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    }
  };

  var f7LoginScreenTitle = {
    name: 'f7-login-screen-title',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'login-screen-title', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7LoginScreen = {
    name: 'f7-login-screen',
    props: Object.assign({
      id: [String, Number],
      opened: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'login-screen', Mixins.colorClasses(props));
      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    watch: {
      'props.opened': function watchOpened(opened) {
        var self = this;
        if (!self.f7LoginScreen) { return; }

        if (opened) {
          self.f7LoginScreen.open();
        } else {
          self.f7LoginScreen.close();
        }
      }
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      if (!el) { return; }
      self.onOpenBound = self.onOpen.bind(self);
      self.onOpenedBound = self.onOpened.bind(self);
      self.onCloseBound = self.onClose.bind(self);
      self.onClosedBound = self.onClosed.bind(self);
      el.addEventListener('loginscreen:open', self.onOpenBound);
      el.addEventListener('loginscreen:opened', self.onOpenedBound);
      el.addEventListener('loginscreen:close', self.onCloseBound);
      el.addEventListener('loginscreen:closed', self.onClosedBound);
      self.$f7ready(function () {
        self.f7LoginScreen = self.$f7.loginScreen.create({
          el: el
        });

        if (self.props.opened) {
          self.f7LoginScreen.open(false);
        }
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$refs.el;
      if (self.f7LoginScreen) { self.f7LoginScreen.destroy(); }
      if (!el) { return; }
      el.removeEventListener('loginscreen:open', self.onOpenBound);
      el.removeEventListener('loginscreen:opened', self.onOpenedBound);
      el.removeEventListener('loginscreen:close', self.onCloseBound);
      el.removeEventListener('loginscreen:closed', self.onClosedBound);
    },

    methods: {
      onOpen: function onOpen(event) {
        this.dispatchEvent('loginscreen:open loginScreenOpen', event);
      },

      onOpened: function onOpened(event) {
        this.dispatchEvent('loginscreen:opened loginScreenOpened', event);
      },

      onClose: function onClose(event) {
        this.dispatchEvent('loginscreen:close loginScreenClose', event);
      },

      onClosed: function onClosed(event) {
        this.dispatchEvent('loginscreen:closed loginScreenClosed', event);
      },

      open: function open(animate) {
        var self = this;
        var el = self.$refs.el;
        if (!self.$f7 || !el) { return undefined; }
        return self.$f7.loginScreen.open(el, animate);
      },

      close: function close(animate) {
        var self = this;
        var el = self.$refs.el;
        if (!self.$f7 || !el) { return undefined; }
        return self.$f7.loginScreen.close(el, animate);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Message = {
    name: 'f7-message',
    props: Object.assign({
      id: [String, Number],
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
    }, Mixins.colorProps),

    created: function created() {
      this.onClickBound = this.onClick.bind(this);
      this.onNameClickBound = this.onNameClick.bind(this);
      this.onTextClickBound = this.onTextClick.bind(this);
      this.onAvatarClickBound = this.onAvatarClick.bind(this);
      this.onHeaderClickBound = this.onHeaderClick.bind(this);
      this.onFooterClickBound = this.onFooterClick.bind(this);
      this.onBubbleClickBound = this.onBubbleClick.bind(this);
    },

    render: function render() {
      var _h = this.$createElement;
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
      var ref = self.$slots;
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
      return _h('div', {
        style: style,
        class: self.classes,
        on: {
          click: self.onClickBound
        },
        attrs: {
          id: id
        }
      }, [slotsStart, (avatar || slotsAvatar) && _h('div', {
        class: 'message-avatar',
        style: {
          backgroundImage: avatar && ("url(" + avatar + ")")
        },
        on: {
          click: self.onAvatarClickBound
        }
      }, [slotsAvatar]), _h('div', {
        class: 'message-content'
      }, [slotsContentStart, (slotsName || name) && _h('div', {
        class: 'message-name',
        on: {
          click: self.onNameClickBound
        }
      }, [slotsName || name]), (slotsHeader || header) && _h('div', {
        class: 'message-header',
        on: {
          click: self.onHeaderClickBound
        }
      }, [slotsHeader || header]), _h('div', {
        class: 'message-bubble',
        on: {
          click: self.onBubbleClickBound
        }
      }, [slotsBubbleStart, (slotsImage || image) && _h('div', {
        class: 'message-image'
      }, [slotsImage || _h('img', {
        attrs: {
          src: image
        }
      })]), (slotsTextHeader || textHeader) && _h('div', {
        class: 'message-text-header'
      }, [slotsTextHeader || textHeader]), (slotsText || text || typing) && _h('div', {
        class: 'message-text',
        on: {
          click: self.onTextClickBound
        }
      }, [slotsText || text, typing && _h('div', {
        class: 'message-typing-indicator'
      }, [_h('div'), _h('div'), _h('div')])]), (slotsTextFooter || textFooter) && _h('div', {
        class: 'message-text-footer'
      }, [slotsTextFooter || textFooter]), slotsBubbleEnd, slotsDefault]), (slotsFooter || footer) && _h('div', {
        class: 'message-footer',
        on: {
          click: self.onFooterClickBound
        }
      }, [slotsFooter || footer]), slotsContentEnd]), slotsEnd]);
    },

    computed: {
      classes: function classes() {
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
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },
    methods: {
      onClick: function onClick(event) {
        this.dispatchEvent('click', event);
      },

      onNameClick: function onNameClick(event) {
        this.dispatchEvent('click:name clickName', event);
      },

      onTextClick: function onTextClick(event) {
        this.dispatchEvent('click:text clickText', event);
      },

      onAvatarClick: function onAvatarClick(event) {
        this.dispatchEvent('click:avatar clickAvatar', event);
      },

      onHeaderClick: function onHeaderClick(event) {
        this.dispatchEvent('click:header clickHeader', event);
      },

      onFooterClick: function onFooterClick(event) {
        this.dispatchEvent('click:footer clickFooter', event);
      },

      onBubbleClick: function onBubbleClick(event) {
        this.dispatchEvent('click:bubble clickBubble', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    }
  };

  var f7MessagebarAttachment = {
    name: 'f7-messagebar-attachment',
    props: Object.assign({
      id: [String, Number],
      image: String,
      deletable: {
        type: Boolean,
        default: true
      }
    }, Mixins.colorProps),

    created: function created() {
      this.onClickBound = this.onClick.bind(this);
      this.onDeleteClickBound = this.onDeleteClick.bind(this);
    },

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var deletable = props.deletable;
      var image = props.image;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'messagebar-attachment', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        on: {
          click: self.onClickBound
        },
        attrs: {
          id: id
        }
      }, [image && _h('img', {
        attrs: {
          src: image
        }
      }), deletable && _h('span', {
        class: 'messagebar-attachment-delete',
        on: {
          click: self.onDeleteClickBound
        }
      }), this.$slots['default']]);
    },

    methods: {
      onClick: function onClick(e) {
        this.dispatchEvent('attachment:click attachmentClick', e);
      },

      onDeleteClick: function onDeleteClick(e) {
        this.dispatchEvent('attachment:delete attachmentDelete', e);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7MessagebarAttachments = {
    name: 'f7-messagebar-attachments',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'messagebar-attachments', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7MessagebarSheetImage = {
    name: 'f7-messagebar-sheet-image',
    props: Object.assign({
      id: [String, Number],
      image: String,
      checked: Boolean
    }, Mixins.colorProps),

    created: function created() {
      this.onChangeBound = this.onChange.bind(this);
    },

    render: function render() {
      var _h = this.$createElement;
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
        inputEl = _h('input', {
          domProps: {
            checked: checked
          },
          on: {
            change: self.onChangeBound
          },
          attrs: {
            type: 'checkbox'
          }
        });
      }
      return _h('label', {
        class: classes,
        style: styles,
        attrs: {
          id: id
        }
      }, [inputEl, _h('i', {
        class: 'icon icon-checkbox'
      }), this.$slots['default']]);
    },

    methods: {
      onChange: function onChange(e) {
        if (this.props.checked) { this.dispatchEvent('checked', e); }else { this.dispatchEvent('unchecked', e); }
        this.dispatchEvent('change', e);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7MessagebarSheetItem = {
    name: 'f7-messagebar-sheet-item',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'messagebar-sheet-item', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7MessagebarSheet = {
    name: 'f7-messagebar-sheet',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'messagebar-sheet', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Messagebar = {
    name: 'f7-messagebar',
    props: Object.assign({
      id: [String, Number],
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
      resizePage: Boolean,
      sendLink: String,
      value: [String, Number, Array],
      disabled: Boolean,
      readonly: Boolean,
      name: String,
      placeholder: {
        type: String,
        default: 'Message'
      },
      init: {
        type: Boolean,
        default: true
      }
    }, Mixins.colorProps),

    created: function created() {
      this.onChangeBound = this.onChange.bind(this);
      this.onInputBound = this.onInput.bind(this);
      this.onFocusBound = this.onFocus.bind(this);
      this.onBlurBound = this.onBlur.bind(this);
      this.onClickBound = this.onClick.bind(this);
      this.onDeleteAttachmentBound = this.onDeleteAttachment.bind(this);
      this.onClickAttachmentBound = this.onClickAttachment.bind(this);
      this.onResizePageBound = this.onResizePage.bind(this);
    },

    render: function render() {
      var _h = this.$createElement;
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
      var ref$1 = self.$slots;
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
          tag = child.tag;

          if (tag && (tag.indexOf('messagebar-attachments') >= 0 || tag === 'F7MessagebarAttachments' || tag === 'f7-messagebar-attachments')) {
            messagebarAttachmentsEl = child;
          } else if (tag && (tag.indexOf('messagebar-sheet') >= 0 || tag === 'F7MessagebarSheet' || tag === 'f7-messagebar-sheet')) {
            messagebarSheetEl = child;
          } else {
            innerEndEls.push(child);
          }
        });
      }

      return _h('div', {
        ref: 'el',
        style: style,
        class: self.classes,
        attrs: {
          id: id
        }
      }, [slotsBeforeInner, _h('div', {
        class: 'toolbar-inner'
      }, [slotsInnerStart, _h('div', {
        class: 'messagebar-area'
      }, [slotsBeforeArea, messagebarAttachmentsEl, _h(F7Input, {
        ref: 'area',
        on: {
          input: self.onInputBound,
          change: self.onChangeBound,
          focus: self.onFocusBound,
          blur: self.onBlurBound
        },
        attrs: {
          type: 'textarea',
          wrap: false,
          placeholder: placeholder,
          disabled: disabled,
          name: name,
          readonly: readonly,
          resizable: resizable,
          value: value
        }
      }), slotsAfterArea]), (sendLink && sendLink.length > 0 || slotsSendLink) && _h(F7Link, {
        on: {
          click: self.onClickBound
        }
      }, [slotsSendLink || sendLink]), slotsInnerEnd, innerEndEls]), slotsAfterInner, messagebarSheetEl]);
    },

    computed: {
      classes: function classes() {
        var self = this;
        var props = self.props;
        var className = props.className;
        var attachmentsVisible = props.attachmentsVisible;
        var sheetVisible = props.sheetVisible;
        return Utils.classNames(className, 'toolbar', 'messagebar', {
          'messagebar-attachments-visible': attachmentsVisible,
          'messagebar-sheet-visible': sheetVisible
        }, Mixins.colorClasses(props));
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },
    watch: {
      'props.sheetVisible': function watchSheetVisible() {
        var self = this;
        if (!self.props.resizable || !self.f7Messagebar) { return; }
        self.updateSheetVisible = true;
      },
      'props.attachmentsVisible': function watchAttachmentsVisible() {
        var self = this;
        if (!self.props.resizable || !self.f7Messagebar) { return; }
        self.updateAttachmentsVisible = true;
      }
    },

    mounted: function mounted() {
      var self = this;
      var ref = self.props;
      var init = ref.init;
      var top = ref.top;
      var resizePage = ref.resizePage;
      var bottomOffset = ref.bottomOffset;
      var topOffset = ref.topOffset;
      var maxHeight = ref.maxHeight;
      if (!init) { return; }
      var el = self.$refs.el;
      if (!el) { return; }
      el.addEventListener('messagebar:attachmentdelete', self.onDeleteAttachmentBound);
      el.addEventListener('messagebar:attachmentclick', self.onClickAttachmentBound);
      el.addEventListener('messagebar:resizepage', self.onResizePageBound);
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
    },

    updated: function updated() {
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
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Messagebar && self.f7Messagebar.destroy) { self.f7Messagebar.destroy(); }
      var el = self.$refs.el;
      if (!el) { return; }
      el.removeEventListener('messagebar:attachmentdelete', self.onDeleteAttachmentBound);
      el.removeEventListener('messagebar:attachmentclick', self.onClickAttachmentBound);
      el.removeEventListener('messagebar:resizepage', self.onResizePageBound);
    },

    methods: {
      clear: function clear() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).clear.apply(ref, args);
      },

      getValue: function getValue() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).getValue.apply(ref, args);
      },

      setValue: function setValue() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).setValue.apply(ref, args);
      },

      setPlaceholder: function setPlaceholder() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).setPlaceholder.apply(ref, args);
      },

      resize: function resize() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).resizePage.apply(ref, args);
      },

      focus: function focus() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).focus.apply(ref, args);
      },

      blur: function blur() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).blur.apply(ref, args);
      },

      attachmentsShow: function attachmentsShow() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).attachmentsShow.apply(ref, args);
      },

      attachmentsHide: function attachmentsHide() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).attachmentsHide.apply(ref, args);
      },

      attachmentsToggle: function attachmentsToggle() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).attachmentsToggle.apply(ref, args);
      },

      sheetShow: function sheetShow() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).sheetShow.apply(ref, args);
      },

      sheetHide: function sheetHide() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).sheetHide.apply(ref, args);
      },

      sheetToggle: function sheetToggle() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messagebar) { return undefined; }
        return (ref = this.f7Messagebar).sheetToggle.apply(ref, args);
      },

      onChange: function onChange(event) {
        this.dispatchEvent('change', event);
      },

      onInput: function onInput(event) {
        this.dispatchEvent('input', event);
      },

      onFocus: function onFocus(event) {
        this.dispatchEvent('focus', event);
      },

      onBlur: function onBlur(event) {
        this.dispatchEvent('blur', event);
      },

      onClick: function onClick(event) {
        var self = this;
        var value = self.$refs.area.refs.inputEl.value;
        var clear = self.f7Messagebar ? function () {
          self.f7Messagebar.clear();
        } : function () {};
        this.dispatchEvent('submit', value, clear);
        this.dispatchEvent('send', value, clear);
        this.dispatchEvent('click', event);
      },

      onDeleteAttachment: function onDeleteAttachment(e) {
        this.dispatchEvent('messagebar:attachmentdelete messagebarAttachmentDelete', e);
      },

      onClickAttachment: function onClickAttachment(e) {
        this.dispatchEvent('messagebar:attachmentclick messagebarAttachmentClick', e);
      },

      onResizePage: function onResizePage(e) {
        this.dispatchEvent('messagebar:resizepage messagebarResizePage', e);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    }
  };

  var f7MessagesTitle = {
    name: 'f7-messages-title',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'messages-title', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Messages = {
    name: 'f7-messages',
    props: Object.assign({
      id: [String, Number],
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
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var classes = Utils.classNames(className, 'messages', Mixins.colorClasses(props));
      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    beforeUpdate: function beforeUpdate() {
      var self = this;
      if (!self.props.init) { return; }
      var el = self.$refs.el;
      if (!el) { return; }
      var children = el.children;
      if (!children) { return; }

      for (var i = 0; i < children.length; i += 1) {
        children[i].classList.add('message-appeared');
      }
    },

    updated: function updated() {
      var self = this;
      var ref = self.props;
      var init = ref.init;
      var autoLayout = ref.autoLayout;
      var scrollMessages = ref.scrollMessages;
      if (!init) { return; }
      var el = self.$refs.el;
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
    },

    mounted: function mounted() {
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
          el: self.$refs.el,
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
    },

    beforeDestroy: function beforeDestroy() {
      if (this.f7Messages && this.f7Messages.destroy) { this.f7Messages.destroy(); }
    },

    methods: {
      renderMessages: function renderMessages(messagesToRender, method) {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.renderMessages(messagesToRender, method);
      },

      layout: function layout() {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.layout();
      },

      scroll: function scroll(duration, scrollTop) {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.scroll(duration, scrollTop);
      },

      clear: function clear() {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.clear();
      },

      removeMessage: function removeMessage(messageToRemove, layout) {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.removeMessage(messageToRemove, layout);
      },

      removeMessages: function removeMessages(messagesToRemove, layout) {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.removeMessages(messagesToRemove, layout);
      },

      addMessage: function addMessage() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messages) { return undefined; }
        return (ref = this.f7Messages).addMessage.apply(ref, args);
      },

      addMessages: function addMessages() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        if (!this.f7Messages) { return undefined; }
        return (ref = this.f7Messages).addMessages.apply(ref, args);
      },

      showTyping: function showTyping(message) {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.showTyping(message);
      },

      hideTyping: function hideTyping() {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.hideTyping();
      },

      destroy: function destroy() {
        if (!this.f7Messages) { return undefined; }
        return this.f7Messages.destroy();
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var F7NavLeft = {
    name: 'f7-nav-left',
    props: Object.assign({
      id: [String, Number],
      backLink: [Boolean, String],
      backLinkUrl: String,
      backLinkForce: Boolean,
      sliding: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var backLink = props.backLink;
      var backLinkUrl = props.backLinkUrl;
      var backLinkForce = props.backLinkForce;
      var sliding = props.sliding;
      var className = props.className;
      var style = props.style;
      var id = props.id;
      var linkEl;

      if (backLink) {
        linkEl = _h(F7Link, {
          class: backLink === true || backLink && this.$theme.md ? 'icon-only' : undefined,
          on: {
            click: this.onBackClick.bind(this)
          },
          attrs: {
            href: backLinkUrl || '#',
            back: true,
            icon: 'icon-back',
            force: backLinkForce || undefined,
            text: backLink !== true && !this.$theme.md ? backLink : undefined
          }
        });
      }

      var classes = Utils.classNames(className, 'left', {
        sliding: sliding
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [linkEl, this.$slots['default']]);
    },

    methods: {
      onBackClick: function onBackClick(e) {
        this.dispatchEvent('back-click backClick click:back clickBack', e);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7NavRight = {
    name: 'f7-nav-right',
    props: Object.assign({
      id: [String, Number],
      sliding: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var sliding = props.sliding;
      var classes = Utils.classNames(className, 'right', {
        sliding: sliding
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var F7NavTitle = {
    name: 'f7-nav-title',
    props: Object.assign({
      id: [String, Number],
      title: String,
      subtitle: String,
      sliding: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var title = props.title;
      var subtitle = props.subtitle;
      var id = props.id;
      var style = props.style;
      var sliding = props.sliding;
      var className = props.className;
      var subtitleEl;

      if (self.subtitle) {
        subtitleEl = _h('span', {
          class: 'subtitle'
        }, [subtitle]);
      }

      var classes = Utils.classNames(className, 'title', {
        sliding: sliding
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default'] || [title, subtitleEl]]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Navbar = {
    name: 'f7-navbar',
    props: Object.assign({
      id: [String, Number],
      backLink: [Boolean, String],
      backLinkUrl: String,
      backLinkForce: Boolean,
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
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var backLink = props.backLink;
      var backLinkUrl = props.backLinkUrl;
      var backLinkForce = props.backLinkForce;
      var sliding = props.sliding;
      var title = props.title;
      var subtitle = props.subtitle;
      var inner = props.inner;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var hidden = props.hidden;
      var noShadow = props.noShadow;
      var noHairline = props.noHairline;
      var innerEl;
      var leftEl;
      var titleEl;

      if (inner) {
        if (backLink) {
          leftEl = _h(F7NavLeft, {
            on: {
              backClick: self.onBackClick.bind(self)
            },
            attrs: {
              backLink: backLink,
              backLinkUrl: backLinkUrl,
              backLinkForce: backLinkForce
            }
          });
        }

        if (title || subtitle) {
          titleEl = _h(F7NavTitle, {
            attrs: {
              title: title,
              subtitle: subtitle
            }
          });
        }

        innerEl = _h('div', {
          ref: 'inner',
          class: Utils.classNames('navbar-inner', {
            sliding: sliding
          })
        }, [leftEl, titleEl, this.$slots['default']]);
      }

      var classes = Utils.classNames(className, 'navbar', {
        'navbar-hidden': hidden,
        'no-shadow': noShadow,
        'no-hairline': noHairline
      }, Mixins.colorClasses(props));
      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['before-inner'], innerEl, this.$slots['after-inner']]);
    },

    updated: function updated() {
      var self = this;
      if (!self.$f7) { return; }
      var el = self.$refs.el;

      if (el && el.children && el.children.length) {
        self.$f7.navbar.size(el);
      } else if (self.$refs.inner) {
        self.$f7.navbar.size(self.$refs.inner);
      }
    },

    methods: {
      hide: function hide(animate) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.navbar.hide(self.$refs.el, animate);
      },

      show: function show(animate) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.navbar.show(self.$refs.el, animate);
      },

      size: function size() {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.navbar.size(self.$refs.el);
      },

      onBackClick: function onBackClick(e) {
        this.dispatchEvent('back-click backClick click:back clickBack', e);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var F7PageContent = {
    name: 'f7-page-content',
    props: Object.assign({
      id: [String, Number],
      tab: Boolean,
      tabActive: Boolean,
      ptr: Boolean,
      ptrDistance: Number,
      ptrPreloader: {
        type: Boolean,
        default: true
      },
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
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var ptr = props.ptr;
      var ptrPreloader = props.ptrPreloader;
      var infinite = props.infinite;
      var infinitePreloader = props.infinitePreloader;
      var id = props.id;
      var style = props.style;
      var ptrDistance = props.ptrDistance;
      var infiniteDistance = props.infiniteDistance;
      var infiniteTop = props.infiniteTop;
      var ptrEl;
      var infiniteEl;

      if (ptr && ptrPreloader) {
        ptrEl = _h('div', {
          class: 'ptr-preloader'
        }, [_h('div', {
          class: 'preloader'
        }), _h('div', {
          class: 'ptr-arrow'
        })]);
      }

      if (infinite && infinitePreloader) {
        infiniteEl = _h('div', {
          class: 'preloader infinite-scroll-preloader'
        });
      }

      return _h('div', {
        style: style,
        class: self.classes,
        ref: 'el',
        attrs: {
          id: id,
          'data-ptr-distance': ptrDistance || undefined,
          'data-infinite-distance': infiniteDistance || undefined
        }
      }, [ptrEl, infiniteTop ? infiniteEl : self.$slots.default, infiniteTop ? self.$slots.default : infiniteEl]);
    },

    computed: {
      classes: function classes() {
        var self = this;
        var props = self.props;
        var className = props.className;
        var tab = props.tab;
        var tabActive = props.tabActive;
        var ptr = props.ptr;
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
          'infinite-scroll-content': infinite,
          'infinite-scroll-top': infiniteTop,
          'hide-bars-on-scroll': hideBarsOnScroll,
          'hide-navbar-on-scroll': hideNavbarOnScroll,
          'hide-toolbar-on-scroll': hideToolbarOnScroll,
          'messages-content': messagesContent,
          'login-screen-content': loginScreen
        }, Mixins.colorClasses(props));
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      var ref = self.props;
      var ptr = ref.ptr;
      var infinite = ref.infinite;
      var tab = ref.tab;
      self.onPtrPullStart = self.onPtrPullStart.bind(self);
      self.onPtrPullMove = self.onPtrPullMove.bind(self);
      self.onPtrPullEnd = self.onPtrPullEnd.bind(self);
      self.onPtrRefresh = self.onPtrRefresh.bind(self);
      self.onPtrDone = self.onPtrDone.bind(self);
      self.onInfinite = self.onInfinite.bind(self);
      self.onTabShow = self.onTabShow.bind(self);
      self.onTabHide = self.onTabHide.bind(self);

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
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$refs.el;
      el.removeEventListener('ptr:pullstart', self.onPtrPullStart);
      el.removeEventListener('ptr:pullmove', self.onPtrPullMove);
      el.removeEventListener('ptr:pullend', self.onPtrPullEnd);
      el.removeEventListener('ptr:refresh', self.onPtrRefresh);
      el.removeEventListener('ptr:done', self.onPtrDone);
      el.removeEventListener('infinite', self.onInfinite);
      el.removeEventListener('tab:show', self.onTabShow);
      el.removeEventListener('tab:hide', self.onTabHide);
    },

    methods: {
      onPtrPullStart: function onPtrPullStart(event) {
        this.dispatchEvent('ptr:pullstart ptrPullStart', event);
      },

      onPtrPullMove: function onPtrPullMove(event) {
        this.dispatchEvent('ptr:pullmove ptrPullMove', event);
      },

      onPtrPullEnd: function onPtrPullEnd(event) {
        this.dispatchEvent('ptr:pullend ptrPullEnd', event);
      },

      onPtrRefresh: function onPtrRefresh(event) {
        this.dispatchEvent('ptr:refresh ptrRefresh', event, event.detail);
      },

      onPtrDone: function onPtrDone(event) {
        this.dispatchEvent('ptr:done ptrDone', event);
      },

      onInfinite: function onInfinite(event) {
        this.dispatchEvent('infinite', event);
      },

      onTabShow: function onTabShow(e) {
        this.dispatchEvent('tab:show tabShow', e);
      },

      onTabHide: function onTabHide(e) {
        this.dispatchEvent('tab:hide tabHide', e);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    }
  };

  var f7Page = {
    name: 'f7-page',
    props: Object.assign({
      id: [String, Number],
      name: String,
      stacked: Boolean,
      withSubnavbar: Boolean,
      subnavbar: Boolean,
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
    }, Mixins.colorProps),

    data: function data() {
      var props = __vueComponentProps(this);

      var state = (function () {
        return {
          hasSubnavbar: false
        };
      })();

      return {
        state: state
      };
    },

    render: function render() {
      var _h = this.$createElement;
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
      var noNavbar = props.noNavbar;
      var noToolbar = props.noToolbar;
      var noSwipeback = props.noSwipeback;
      var fixedList = [];
      var staticList = [];
      var needsPageContent = pageContent;
      var ref = self.$slots;
      var slotsStatic = ref.static;
      var slotsFixed = ref.fixed;
      var slotsDefault = ref.default;
      var fixedTags;
      fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ');
      var hasSubnavbar;
      var hasMessages;
      hasMessages = self.$options.propsData.messagesContent;

      if (slotsDefault) {
        slotsDefault.forEach(function (child) {
          if (typeof child === 'undefined') { return; }
          var isFixedTag = false;
          {
            var tag = child.tag;

            if (!tag) {
              if (needsPageContent) { staticList.push(child); }
              return;
            }

            if (tag.indexOf('subnavbar') >= 0) { hasSubnavbar = true; }
            if (typeof hasMessages === 'undefined' && tag.indexOf('messages') >= 0) { hasMessages = true; }

            for (var j = 0; j < fixedTags.length; j += 1) {
              if (tag.indexOf(fixedTags[j]) >= 0) {
                isFixedTag = true;
              }
            }
          }

          if (needsPageContent) {
            if (isFixedTag) { fixedList.push(child); }else { staticList.push(child); }
          }
        });
      }

      var classes = Utils.classNames(className, 'page', {
        stacked: stacked,
        tabs: tabs,
        'page-with-subnavbar': subnavbar || withSubnavbar || hasSubnavbar,
        'no-navbar': noNavbar,
        'no-toolbar': noToolbar,
        'no-swipeback': noSwipeback
      }, Mixins.colorClasses(props));

      if (!needsPageContent) {
        return _h('div', {
          ref: 'el',
          style: style,
          class: classes,
          attrs: {
            id: id,
            'data-name': name
          }
        }, [slotsFixed, slotsStatic, slotsDefault]);
      }

      var pageContentEl = _h(F7PageContent, {
        attrs: {
          ptr: ptr,
          ptrDistance: ptrDistance,
          ptrPreloader: ptrPreloader,
          infinite: infinite,
          infiniteTop: infiniteTop,
          infiniteDistance: infiniteDistance,
          infinitePreloader: infinitePreloader,
          hideBarsOnScroll: hideBarsOnScroll,
          hideNavbarOnScroll: hideNavbarOnScroll,
          hideToolbarOnScroll: hideToolbarOnScroll,
          messagesContent: messagesContent || hasMessages,
          loginScreen: loginScreen
        }
      }, [slotsStatic, staticList]);

      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id,
          'data-name': name
        }
      }, [fixedList, slotsFixed, pageContentEl]);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      var ref = self.props;
      var ptr = ref.ptr;
      var infinite = ref.infinite;
      self.onPtrPullStart = self.onPtrPullStart.bind(self);
      self.onPtrPullMove = self.onPtrPullMove.bind(self);
      self.onPtrPullEnd = self.onPtrPullEnd.bind(self);
      self.onPtrRefresh = self.onPtrRefresh.bind(self);
      self.onPtrDone = self.onPtrDone.bind(self);
      self.onInfinite = self.onInfinite.bind(self);
      self.onPageMounted = self.onPageMounted.bind(self);
      self.onPageInit = self.onPageInit.bind(self);
      self.onPageReinit = self.onPageReinit.bind(self);
      self.onPageBeforeIn = self.onPageBeforeIn.bind(self);
      self.onPageBeforeOut = self.onPageBeforeOut.bind(self);
      self.onPageAfterOut = self.onPageAfterOut.bind(self);
      self.onPageAfterIn = self.onPageAfterIn.bind(self);
      self.onPageBeforeRemove = self.onPageBeforeRemove.bind(self);

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
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$refs.el;
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
    },

    methods: {
      onPtrPullStart: function onPtrPullStart(event) {
        this.dispatchEvent('ptr:pullstart ptrPullStart', event);
      },

      onPtrPullMove: function onPtrPullMove(event) {
        this.dispatchEvent('ptr:pullmove ptrPullMove', event);
      },

      onPtrPullEnd: function onPtrPullEnd(event) {
        this.dispatchEvent('ptr:pullend ptrPullEnd', event);
      },

      onPtrRefresh: function onPtrRefresh(event) {
        this.dispatchEvent('ptr:refresh ptrRefresh', event, event.detail);
      },

      onPtrDone: function onPtrDone(event) {
        this.dispatchEvent('ptr:done ptrDone', event);
      },

      onInfinite: function onInfinite(event) {
        this.dispatchEvent('infinite', event);
      },

      onPageMounted: function onPageMounted(event) {
        this.dispatchEvent('page:mounted pageMounted', event, event.detail);
      },

      onPageInit: function onPageInit(event) {
        this.dispatchEvent('page:init pageInit', event, event.detail);
      },

      onPageReinit: function onPageReinit(event) {
        this.dispatchEvent('page:reinit pageReinit', event, event.detail);
      },

      onPageBeforeIn: function onPageBeforeIn(event) {
        this.dispatchEvent('page:beforein pageBeforeIn', event, event.detail);
      },

      onPageBeforeOut: function onPageBeforeOut(event) {
        this.dispatchEvent('page:beforeout pageBeforeOut', event, event.detail);
      },

      onPageAfterOut: function onPageAfterOut(event) {
        this.dispatchEvent('page:afterout pageAfterOut', event, event.detail);
      },

      onPageAfterIn: function onPageAfterIn(event) {
        this.dispatchEvent('page:afterin pageAfterIn', event, event.detail);
      },

      onPageBeforeRemove: function onPageBeforeRemove(event) {
        this.dispatchEvent('page:beforeremove pageBeforeRemove', event, event.detail);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Panel = {
    name: 'f7-panel',
    props: Object.assign({
      id: [String, Number],
      side: String,
      effect: String,
      cover: Boolean,
      reveal: Boolean,
      left: Boolean,
      right: Boolean,
      opened: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var id = props.id;
      var style = props.style;
      return _h('div', {
        ref: 'el',
        style: style,
        class: this.classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      classes: function classes() {
        var obj;

        var self = this;
        var props = self.props;
        var left = props.left;
        var reveal = props.reveal;
        var className = props.className;
        var opened = props.opened;
        var side = props.side;
        var effect = props.effect;
        side = side || (left ? 'left' : 'right');
        effect = effect || (reveal ? 'reveal' : 'cover');
        return Utils.classNames(className, 'panel', ( obj = {
          'panel-active': opened
        }, obj[("panel-" + side)] = side, obj[("panel-" + effect)] = effect, obj ), Mixins.colorClasses(props));
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },
    watch: {
      'props.opened': function watchOpened(opened) {
        var self = this;
        if (!self.$f7) { return; }
        var side = self.props.side || (self.props.left ? 'left' : 'right');

        if (opened) {
          self.$f7.panel.open(side);
        } else {
          self.$f7.panel.open(side);
        }
      }
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      var ref = self.props;
      var side = ref.side;
      var effect = ref.effect;
      var opened = ref.opened;
      var left = ref.left;
      var reveal = ref.reveal;
      self.onOpenBound = self.onOpen.bind(self);
      self.onOpenedBound = self.onOpened.bind(self);
      self.onCloseBound = self.onClose.bind(self);
      self.onClosedBound = self.onClosed.bind(self);
      self.onBackdropClickBound = self.onBackdropClick.bind(self);
      self.onPanelSwipeBound = self.onPanelSwipe.bind(self);
      self.onPanelSwipeOpenBound = self.onPanelSwipeOpen.bind(self);
      self.onBreakpointBound = self.onBreakpoint.bind(self);

      if (el) {
        el.addEventListener('panel:open', self.onOpenBound);
        el.addEventListener('panel:opened', self.onOpenedBound);
        el.addEventListener('panel:close', self.onCloseBound);
        el.addEventListener('panel:closed', self.onClosedBound);
        el.addEventListener('panel:backdrop-click', self.onBackdropClickBound);
        el.addEventListener('panel:swipe', self.onPanelSwipeBound);
        el.addEventListener('panel:swipeopen', self.onPanelSwipeOpenBound);
        el.addEventListener('panel:breakpoint', self.onBreakpointBound);
      }

      self.$f7ready(function () {
        var $ = self.$$;
        if (!$) { return; }

        if ($('.panel-backdrop').length === 0) {
          $('<div class="panel-backdrop"></div>').insertBefore(el);
        }

        self.f7Panel = self.$f7.panel.create({
          el: el
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
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Panel) { self.f7Panel.destroy(); }
      var el = self.$refs.el;
      if (!el) { return; }
      el.removeEventListener('panel:open', self.onOpenBound);
      el.removeEventListener('panel:opened', self.onOpenedBound);
      el.removeEventListener('panel:close', self.onCloseBound);
      el.removeEventListener('panel:closed', self.onClosedBound);
      el.removeEventListener('panel:backdrop-click', self.onBackdropClickBound);
      el.removeEventListener('panel:swipe', self.onPanelSwipeBound);
      el.removeEventListener('panel:swipeopen', self.onPanelSwipeOpenBound);
      el.removeEventListener('panel:breakpoint', self.onBreakpointBound);
    },

    methods: {
      onOpen: function onOpen(event) {
        this.dispatchEvent('panel:open panelOpen', event);
      },

      onOpened: function onOpened(event) {
        this.dispatchEvent('panel:opened panelOpened', event);
      },

      onClose: function onClose(event) {
        this.dispatchEvent('panel:close panelClose', event);
      },

      onClosed: function onClosed(event) {
        this.dispatchEvent('panel:closed panelClosed', event);
      },

      onBackdropClick: function onBackdropClick(event) {
        this.dispatchEvent('panel:backdrop-click panelBackdropClick', event);
      },

      onPanelSwipe: function onPanelSwipe(event) {
        this.dispatchEvent('panel:swipe panelSwipe', event);
      },

      onPanelSwipeOpen: function onPanelSwipeOpen(event) {
        this.dispatchEvent('panel:swipeopen panelSwipeOpen', event);
      },

      onBreakpoint: function onBreakpoint(event) {
        this.dispatchEvent('panel:breakpoint panelBreakpoint', event);
      },

      open: function open(animate) {
        var self = this;
        if (!self.$f7) { return; }
        var side = self.props.side || (self.props.left ? 'left' : 'right');
        self.$f7.panel.open(side, animate);
      },

      close: function close(animate) {
        var self = this;
        if (!self.$f7) { return; }
        var side = self.props.side || (self.props.left ? 'left' : 'right');
        self.$f7.panel.close(side, animate);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    }
  };

  var f7PhotoBrowser = {
    name: 'f7-photo-browser',
    props: {
      id: [String, Number],
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
    },

    render: function render() {
      var _h = this.$createElement;
      return null;
    },

    watch: {
      'props.photos': function watchPhotos(newValue) {
        var self = this;
        var pb = self.f7PhotoBrowser;
        if (!pb) { return; }
        self.f7PhotoBrowser.photos = newValue;

        if (pb.opened && pb.swiper) {
          pb.swiper.update();
        }
      }
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7PhotoBrowser && self.f7PhotoBrowser.destroy) { self.f7PhotoBrowser.destroy(); }
    },

    mounted: function mounted() {
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
    },

    methods: {
      open: function open(index) {
        return this.f7PhotoBrowser.open(index);
      },

      close: function close() {
        return this.f7PhotoBrowser.close();
      },

      expositionToggle: function expositionToggle() {
        return this.f7PhotoBrowser.expositionToggle();
      },

      expositionEnable: function expositionEnable() {
        return this.f7PhotoBrowser.expositionEnable();
      },

      expositionDisable: function expositionDisable() {
        return this.f7PhotoBrowser.expositionDisable();
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Popover = {
    name: 'f7-popover',
    props: Object.assign({
      id: [String, Number],
      opened: Boolean,
      target: [String, Object]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'popover', Mixins.colorClasses(props));
      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [_h('div', {
        class: 'popover-angle'
      }), _h('div', {
        class: 'popover-inner'
      }, [this.$slots['default']])]);
    },

    watch: {
      'props.opened': function watchOpened(opened) {
        var self = this;
        if (!self.f7Popover) { return; }

        if (opened) {
          self.f7Popover.open();
        } else {
          self.f7Popover.close();
        }
      }
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      if (!el) { return; }
      self.onOpenBound = self.onOpen.bind(self);
      self.onOpenedBound = self.onOpened.bind(self);
      self.onCloseBound = self.onClose.bind(self);
      self.onClosedBound = self.onClosed.bind(self);
      el.addEventListener('popover:open', self.onOpenBound);
      el.addEventListener('popover:opened', self.onOpenedBound);
      el.addEventListener('popover:close', self.onCloseBound);
      el.addEventListener('popover:closed', self.onClosedBound);
      var ref = self.props;
      var target = ref.target;
      var opened = ref.opened;
      self.$f7ready(function () {
        var popoverParams = {
          el: el
        };
        if (target) { popoverParams.targetEl = target; }
        self.f7Popover = self.$f7.popover.create(popoverParams);

        if (opened && target) {
          self.f7Popover.open(target, false);
        }
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Popover) { self.f7Popover.destroy(); }
      var el = self.$refs.el;
      if (!el) { return; }
      el.removeEventListener('popover:open', self.onOpenBound);
      el.removeEventListener('popover:opened', self.onOpenedBound);
      el.removeEventListener('popover:close', self.onCloseBound);
      el.removeEventListener('popover:closed', self.onClosedBound);
    },

    methods: {
      onOpen: function onOpen(event) {
        this.dispatchEvent('popover:open popoverOpen', event);
      },

      onOpened: function onOpened(event) {
        this.dispatchEvent('popover:opened popoverOpened', event);
      },

      onClose: function onClose(event) {
        this.dispatchEvent('popover:close popoverClose', event);
      },

      onClosed: function onClosed(event) {
        this.dispatchEvent('popover:closed popoverClosed', event);
      },

      open: function open(target, animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.popover.open(self.$refs.el, target, animate);
      },

      close: function close(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.sheet.close(self.$refs.el, animate);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Popup = {
    name: 'f7-popup',
    props: Object.assign({
      id: [String, Number],
      tabletFullscreen: Boolean,
      opened: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var tabletFullscreen = props.tabletFullscreen;
      var classes = Utils.classNames(className, 'popup', {
        'popup-tablet-fullscreen': tabletFullscreen
      }, Mixins.colorClasses(props));
      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    watch: {
      'props.opened': function watchOpened(opened) {
        var self = this;
        if (!self.f7Popup) { return; }

        if (opened) {
          self.f7Popup.open();
        } else {
          self.f7Popup.close();
        }
      }
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      if (!el) { return; }
      self.onOpenBound = self.onOpen.bind(self);
      self.onOpenedBound = self.onOpened.bind(self);
      self.onCloseBound = self.onClose.bind(self);
      self.onClosedBound = self.onClosed.bind(self);
      el.addEventListener('popup:open', self.onOpenBound);
      el.addEventListener('popup:opened', self.onOpenedBound);
      el.addEventListener('popup:close', self.onCloseBound);
      el.addEventListener('popup:closed', self.onClosedBound);
      self.$f7ready(function () {
        self.f7Popup = self.$f7.popup.create({
          el: el
        });

        if (self.props.opened) {
          self.f7Popup.open(false);
        }
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Popup) { self.f7Popup.destroy(); }
      var el = self.$refs.el;
      if (!el) { return; }
      el.removeEventListener('popup:open', self.onOpenBound);
      el.removeEventListener('popup:opened', self.onOpenedBound);
      el.removeEventListener('popup:close', self.onCloseBound);
      el.removeEventListener('popup:closed', self.onClosedBound);
    },

    methods: {
      onOpen: function onOpen(event) {
        this.dispatchEvent('popup:open popupOpen', event);
      },

      onOpened: function onOpened(event) {
        this.dispatchEvent('popup:opened popupOpened', event);
      },

      onClose: function onClose(event) {
        this.dispatchEvent('popup:close popupClose', event);
      },

      onClosed: function onClosed(event) {
        this.dispatchEvent('popup:closed popupClosed', event);
      },

      open: function open(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.popup.open(self.$refs.el, animate);
      },

      close: function close(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.popup.close(self.$refs.el, animate);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Preloader = {
    name: 'f7-preloader',
    props: Object.assign({
      id: [String, Number],
      size: [Number, String]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      }

      if (style) { Utils.extend(preloaderStyle, style || {}); }
      var innerEl;

      if (self.$theme.md) {
        innerEl = _h('span', {
          class: 'preloader-inner'
        }, [_h('span', {
          class: 'preloader-inner-gap'
        }), _h('span', {
          class: 'preloader-inner-left'
        }, [_h('span', {
          class: 'preloader-inner-half-circle'
        })]), _h('span', {
          class: 'preloader-inner-right'
        }, [_h('span', {
          class: 'preloader-inner-half-circle'
        })])]);
      }

      var classes = Utils.classNames(className, 'preloader', Mixins.colorClasses(props));
      return _h('span', {
        style: preloaderStyle,
        class: classes,
        attrs: {
          id: id
        }
      }, [innerEl]);
    },

    computed: {
      sizeComputed: function sizeComputed() {
        var s = this.props.size;

        if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
          s = s.replace('px', '');
        }

        return s;
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Progressbar = {
    name: 'f7-progressbar',
    props: Object.assign({
      id: [String, Number],
      progress: Number,
      infinite: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      return _h('span', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id,
          'data-progress': progress
        }
      }, [_h('span', {
        style: transformStyle
      })]);
    },

    methods: {
      set: function set(progress, speed) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.progressbar.set(self.$refs.el, progress, speed);
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Radio = {
    name: 'f7-radio',
    props: Object.assign({
      id: [String, Number],
      checked: Boolean,
      name: [Number, String],
      value: [Number, String, Boolean],
      disabled: Boolean,
      readonly: Boolean,
      defaultChecked: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
        inputEl = _h('input', {
          domProps: {
            value: value,
            disabled: disabled,
            readonly: readonly,
            checked: checked
          },
          on: {
            change: self.onChange.bind(self)
          },
          attrs: {
            type: 'radio',
            name: name
          }
        });
      }

      var iconEl = _h('i', {
        class: 'icon-radio'
      });

      var classes = Utils.classNames(className, 'radio', {
        disabled: disabled
      }, Mixins.colorClasses(props));
      return _h('label', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [inputEl, iconEl, this.$slots['default']]);
    },

    methods: {
      onChange: function onChange(event) {
        this.dispatchEvent('change', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Row = {
    name: 'f7-row',
    props: Object.assign({
      id: [String, Number],
      noGap: Boolean,
      tag: {
        type: String,
        default: 'div'
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      return _h(RowTag, {
        style: style,
        class: classes,
        on: {
          click: self.onClick.bind(self)
        },
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    methods: {
      onClick: function onClick(e) {
        this.dispatchEvent('click', e);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Searchbar = {
    name: 'f7-searchbar',
    props: Object.assign({
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
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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

      if (clearButton) {
        clearEl = _h('span', {
          class: 'input-clear-button',
          on: {
            click: self.onClearButtonClick.bind(self)
          }
        });
      }

      if (disableButton) {
        disableEl = _h('span', {
          class: 'searchbar-disable-button',
          on: {
            click: self.onDisableButtonClick.bind(self)
          }
        }, [disableButtonText]);
      }

      var SearchbarTag = form ? 'form' : 'div';
      var classes = Utils.classNames(className, 'searchbar', {
        'no-shadow': noShadow,
        'no-hairline': noHairline,
        'searchbar-expandable': expandable
      }, Mixins.colorClasses(props));
      return _h(SearchbarTag, {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['before-inner'], _h('div', {
        class: 'searchbar-inner'
      }, [this.$slots['inner-start'], _h('div', {
        class: 'searchbar-input-wrap'
      }, [this.$slots['input-wrap-start'], _h('input', {
        on: {
          input: self.onInput.bind(self),
          change: self.onChange.bind(self),
          focus: self.onFocus.bind(self),
          blur: self.onBlur.bind(self)
        },
        attrs: {
          placeholder: placeholder,
          type: 'search'
        }
      }), _h('i', {
        class: 'searchbar-icon'
      }), clearEl, this.$slots['input-wrap-end']]), disableEl, this.$slots['inner-end'], this.$slots['default']]), this.$slots['after-inner']]);
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;

      if (self.props.form && self.$refs.el) {
        self.$refs.el.removeEventListener('submit', self.onSubmitBound, false);
      }

      if (self.f7Searchbar && self.f7Searchbar.destroy) { self.f7Searchbar.destroy(); }
    },

    mounted: function mounted() {
      var self = this;
      var ref = self.props;
      var init = ref.init;
      var searchContainer = ref.searchContainer;
      var searchIn = ref.searchIn;
      var searchItem = ref.searchItem;
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
      if (!init) { return; }
      var el = self.$refs.el;

      if (form && el) {
        self.onSubmitBound = self.onSubmit.bind(self);
        el.addEventListener('submit', self.onSubmitBound, false);
      }

      self.$f7ready(function () {
        var params = Utils.noUndefinedProps({
          el: self.$refs.el,
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
    },

    methods: {
      search: function search(query) {
        if (!this.f7Searchbar) { return undefined; }
        return this.f7Searchbar.search(query);
      },

      enable: function enable() {
        if (!this.f7Searchbar) { return undefined; }
        return this.f7Searchbar.enable();
      },

      disable: function disable() {
        if (!this.f7Searchbar) { return undefined; }
        return this.f7Searchbar.disable();
      },

      toggle: function toggle() {
        if (!this.f7Searchbar) { return undefined; }
        return this.toggle.disable();
      },

      clear: function clear() {
        if (!this.f7Searchbar) { return undefined; }
        return this.f7Searchbar.clear();
      },

      onChange: function onChange(event) {
        this.dispatchEvent('change', event);
      },

      onInput: function onInput(event) {
        this.dispatchEvent('input', event);
      },

      onFocus: function onFocus(event) {
        this.dispatchEvent('focus', event);
      },

      onBlur: function onBlur(event) {
        this.dispatchEvent('blur', event);
      },

      onSubmit: function onSubmit(event) {
        this.dispatchEvent('submit', event);
      },

      onClearButtonClick: function onClearButtonClick(event) {
        this.dispatchEvent('click:clear clickClear', event);
      },

      onDisableButtonClick: function onDisableButtonClick(event) {
        this.dispatchEvent('click:disable clickDisable', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Segmented = {
    name: 'f7-segmented',
    props: Object.assign({
      id: [String, Number],
      raised: Boolean,
      round: Boolean,
      tag: {
        type: String,
        default: 'div'
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var className = props.className;
      var raised = props.raised;
      var round = props.round;
      var id = props.id;
      var style = props.style;
      var tag = props.tag;
      var classNames = Utils.classNames(className, {
        segmented: true,
        'segmented-raised': raised,
        'segmented-round': round
      }, Mixins.colorClasses(props));
      var SegmentedTag = tag;
      return _h(SegmentedTag, {
        style: style,
        class: classNames,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Sheet = {
    name: 'f7-sheet',
    props: Object.assign({
      id: [String, Number],
      opened: Boolean,
      backdrop: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var fixedList = [];
      var staticList = [];
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var fixedTags;
      fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ');
      var slotsDefault = self.$slots.default;

      if (slotsDefault && slotsDefault.length) {
        slotsDefault.forEach(function (child) {
          if (typeof child === 'undefined') { return; }
          var isFixedTag = false;
          {
            var tag = child.tag;

            if (!tag) {
              return;
            }

            for (var j = 0; j < fixedTags.length; j += 1) {
              if (tag.indexOf(fixedTags[j]) >= 0) {
                isFixedTag = true;
              }
            }
          }
          if (isFixedTag) { fixedList.push(child); }else { staticList.push(child); }
        });
      }

      var innerEl = _h('div', {
        class: 'sheet-modal-inner'
      }, [staticList]);

      var classes = Utils.classNames(className, 'sheet-modal', Mixins.colorClasses(props));
      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [fixedList, innerEl]);
    },

    watch: {
      'props.opened': function watchOpened(opened) {
        var self = this;
        if (!self.f7Sheet) { return; }

        if (opened) {
          self.f7Sheet.open();
        } else {
          self.f7Sheet.close();
        }
      }
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      if (!el) { return; }
      self.onOpenBound = self.onOpen.bind(self);
      self.onOpenedBound = self.onOpened.bind(self);
      self.onCloseBound = self.onClose.bind(self);
      self.onClosedBound = self.onClosed.bind(self);
      el.addEventListener('sheet:open', self.onOpenBound);
      el.addEventListener('sheet:opened', self.onOpenedBound);
      el.addEventListener('sheet:close', self.onCloseBound);
      el.addEventListener('sheet:closed', self.onClosedBound);
      self.$f7ready(function () {
        var useBackdrop;
        var useDefaultBackdrop;
        var ref = self.props;
        var opened = ref.opened;
        var backdrop = ref.backdrop;
        useDefaultBackdrop = self.$options.propsData.backdrop === undefined;

        if (useDefaultBackdrop) {
          var app = self.$f7;
          useBackdrop = app.params.sheet && app.params.sheet.backdrop !== undefined ? app.params.sheet.backdrop : self.$theme.md;
        }

        self.f7Sheet = self.$f7.sheet.create({
          el: self.$refs.el,
          backdrop: useBackdrop
        });

        if (opened) {
          self.f7Sheet.open(false);
        }
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Sheet) { self.f7Sheet.destroy(); }
      var el = self.$el;
      if (!el) { return; }
      el.removeEventListener('popup:open', self.onOpenBound);
      el.removeEventListener('popup:opened', self.onOpenedBound);
      el.removeEventListener('popup:close', self.onCloseBound);
      el.removeEventListener('popup:closed', self.onClosedBound);
    },

    methods: {
      onOpen: function onOpen(event) {
        this.dispatchEvent('sheet:open sheetOpen', event);
      },

      onOpened: function onOpened(event) {
        this.dispatchEvent('sheet:opened sheetOpened', event);
      },

      onClose: function onClose(event) {
        this.dispatchEvent('sheet:close sheetClose', event);
      },

      onClosed: function onClosed(event) {
        this.dispatchEvent('sheet:closed sheetClosed', event);
      },

      open: function open(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.sheet.open(self.$refs.el, animate);
      },

      close: function close(animate) {
        var self = this;
        if (!self.$f7) { return undefined; }
        return self.$f7.sheet.close(self.$refs.el, animate);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Statusbar = {
    name: 'f7-statusbar',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'statusbar', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Stepper = {
    name: 'f7-stepper',
    props: Object.assign({
      id: [String, Number],
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
        default: true
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
      disabled: Boolean,
      buttonsOnly: Boolean,
      round: Boolean,
      roundMd: Boolean,
      roundIos: Boolean,
      fill: Boolean,
      fillMd: Boolean,
      fillIos: Boolean,
      big: Boolean,
      bigMd: Boolean,
      bigIos: Boolean,
      small: Boolean,
      smallMd: Boolean,
      smallIos: Boolean,
      raised: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      var inputWrapEl;
      var valueEl;

      if (input && !buttonsOnly) {
        var inputEl;
        {
          inputEl = _h('input', {
            domProps: {
              readonly: inputReadonly,
              value: value
            },
            on: {
              input: self.onInput.bind(self)
            },
            attrs: {
              type: inputType,
              min: inputType === 'number' ? min : undefined,
              max: inputType === 'number' ? max : undefined,
              step: inputType === 'number' ? step : undefined
            }
          });
        }
        inputWrapEl = _h('div', {
          class: 'stepper-input-wrap'
        }, [inputEl]);
      }

      if (!input && !buttonsOnly) {
        valueEl = _h('div', {
          class: 'stepper-value'
        }, [value]);
      }

      return _h('div', {
        ref: 'el',
        style: style,
        class: self.classes,
        attrs: {
          id: id
        }
      }, [_h('div', {
        class: 'stepper-button-minus',
        on: {
          click: self.onMinusClickBound
        }
      }), inputWrapEl, valueEl, _h('div', {
        class: 'stepper-button-plus',
        on: {
          click: self.onPlusClickBound
        }
      })]);
    },

    computed: {
      classes: function classes() {
        var self = this;
        var props = self.props;
        var round = props.round;
        var roundIos = props.roundIos;
        var roundMd = props.roundMd;
        var fill = props.fill;
        var fillIos = props.fillIos;
        var fillMd = props.fillMd;
        var big = props.big;
        var bigIos = props.bigIos;
        var bigMd = props.bigMd;
        var small = props.small;
        var smallIos = props.smallIos;
        var smallMd = props.smallMd;
        var raised = props.raised;
        var disabled = props.disabled;
        return Utils.classNames(self.props.className, 'stepper', {
          disabled: disabled,
          'stepper-round': round,
          'stepper-round-ios': roundIos,
          'stepper-round-md': roundMd,
          'stepper-fill': fill,
          'stepper-fill-ios': fillIos,
          'stepper-fill-md': fillMd,
          'stepper-big': big,
          'stepper-big-ios': bigIos,
          'stepper-big-md': bigMd,
          'stepper-small': small,
          'stepper-small-ios': smallIos,
          'stepper-small-md': smallMd,
          'stepper-raised': raised
        }, Mixins.colorClasses(props));
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },

    created: function created() {
      this.onInputBound = this.onInput.bind(this);
      this.onMinusClickBound = this.onMinusClick.bind(this);
      this.onPlusClickBound = this.onPlusClick.bind(this);
    },

    mounted: function mounted() {
      var self = this;
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
        var el = self.$refs.el;
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
          on: {
            change: function change(stepper, newValue) {
              self.dispatchEvent('stepper:change stepperChange', newValue);
            }

          }
        }));
      });
    },

    beforeDestroy: function beforeDestroy() {
      if (!this.props.init) { return; }

      if (this.f7Stepper && this.f7Stepper.destroy) {
        this.f7Stepper.destroy();
      }
    },

    methods: {
      increment: function increment() {
        if (!this.f7Stepper) { return; }
        this.f7Stepper.increment();
      },

      decrement: function decrement() {
        if (!this.f7Stepper) { return; }
        this.f7Stepper.decrement();
      },

      setValue: function setValue(newValue) {
        var self = this;
        if (self.f7Stepper && self.f7Stepper.setValue) { self.f7Stepper.setValue(newValue); }
      },

      getValue: function getValue() {
        var self = this;

        if (self.f7Stepper && self.f7Stepper.getValue) {
          return self.f7Stepper.getValue();
        }

        return undefined;
      },

      onInput: function onInput(e) {
        this.dispatchEvent('input', e, this.f7Stepper);
      },

      onMinusClick: function onMinusClick(e) {
        this.dispatchEvent('stepper:minusclick stepperMinusClick', e, this.f7Stepper);
      },

      onPlusClick: function onPlusClick(e) {
        this.dispatchEvent('stepper:plusclick stepperPlusClick', e, this.f7Stepper);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    }
  };

  var f7Subnavbar = {
    name: 'f7-subnavbar',
    props: Object.assign({
      id: [String, Number],
      sliding: Boolean,
      title: String,
      inner: {
        type: Boolean,
        default: true
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      return _h('div', {
        class: classes,
        style: style,
        attrs: {
          id: id
        }
      }, [inner ? _h('div', {
        class: 'subnavbar-inner'
      }, [title && _h('div', {
        class: 'title'
      }, [title]), this.$slots['default']]) : this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7SwipeoutActions = {
    name: 'f7-swipeout-actions',
    props: Object.assign({
      id: [String, Number],
      left: Boolean,
      right: Boolean,
      side: String
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7SwipeoutButton = {
    name: 'f7-swipeout-button',
    props: Object.assign({
      id: [String, Number],
      text: String,
      confirmText: String,
      overswipe: Boolean,
      close: Boolean,
      delete: Boolean,
      href: String
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var overswipe = props.overswipe;
      var deleteProp = props.delete;
      var close = props.close;
      var href = props.href;
      var confirmText = props.confirmText;
      var text = props.text;
      var classes = Utils.classNames(className, {
        'swipeout-overswipe': overswipe,
        'swipeout-delete': deleteProp,
        'swipeout-close': close
      }, Mixins.colorClasses(props));
      return _h('a', {
        style: style,
        class: classes,
        on: {
          click: this.onClick.bind(this)
        },
        attrs: {
          href: href || '#',
          id: id,
          'data-confirm': confirmText || undefined
        }
      }, [this.$slots['default'] || [text]]);
    },

    methods: {
      onClick: function onClick(event) {
        this.dispatchEvent('click', event);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7SwiperSlide = {
    name: 'f7-swiper-slide',
    props: {
      id: [String, Number],
      zoom: Boolean
    },

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var zoom = props.zoom;
      var classes = Utils.classNames(className, 'swiper-slide');
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [zoom ? _h('div', {
        class: 'swiper-zoom-container'
      }, [this.$slots['default']]) : this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Swiper = {
    name: 'f7-swiper',
    props: Object.assign({
      id: [String, Number],
      params: Object,
      pagination: Boolean,
      scrollbar: Boolean,
      navigation: Boolean,
      init: {
        type: Boolean,
        default: true
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
        paginationEl = _h('div', {
          ref: 'paginationEl',
          class: 'swiper-pagination'
        });
      }

      if (self.scrollbarComputed) {
        scrollbarEl = _h('div', {
          ref: 'scrollbarEl',
          class: 'swiper-scrollbar'
        });
      }

      if (self.navigationComputed) {
        buttonNextEl = _h('div', {
          ref: 'nextEl',
          class: 'swiper-button-next'
        });
        buttonPrevEl = _h('div', {
          ref: 'prevEl',
          class: 'swiper-button-prev'
        });
      }

      var classes = Utils.classNames(className, 'swiper-container', Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        ref: 'el',
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['before-wrapper'], _h('div', {
        class: 'swiper-wrapper'
      }, [this.$slots['default']]), paginationEl, scrollbarEl, buttonPrevEl, buttonNextEl, this.$slots['after-wrapper']]);
    },

    computed: {
      paginationComputed: function paginationComputed() {
        var self = this;
        var ref = self.props;
        var pagination = ref.pagination;
        var params = ref.params;

        if (pagination === true || params && params.pagination && !params.pagination.el) {
          return true;
        }

        return false;
      },

      scrollbarComputed: function scrollbarComputed() {
        var self = this;
        var ref = self.props;
        var scrollbar = ref.scrollbar;
        var params = ref.params;

        if (scrollbar === true || params && params.scrollbar && !params.scrollbar.el) {
          return true;
        }

        return false;
      },

      navigationComputed: function navigationComputed() {
        var self = this;
        var ref = self.props;
        var navigation = ref.navigation;
        var params = ref.params;

        if (navigation === true || params && params.navigation && !params.navigation.nextEl && !params.navigation.prevEl) {
          return true;
        }

        return false;
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },

    updated: function updated() {
      var self = this;

      if (!self.initialUpdate) {
        self.initialUpdate = true;
        return;
      }

      if (self.swiper && self.swiper.update) { self.swiper.update(); }
    },

    mounted: function mounted() {
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
        if (pagination && !newParams.pagination.el) { newParams.pagination.el = self.$refs.paginationEl; }

        if (navigation && !newParams.navigation.nextEl && !newParams.navigation.prevEl) {
          newParams.navigation.nextEl = self.$refs.nextEl;
          newParams.navigation.prevEl = self.$refs.prevEl;
        }

        if (scrollbar && !newParams.scrollbar.el) { newParams.scrollbar.el = self.$refs.scrollbarEl; }
        self.swiper = f7.swiper.create(self.$refs.el, newParams);
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (!self.props.init) { return; }
      if (self.swiper && self.swiper.destroy) { self.swiper.destroy(); }
    }

  };

  var f7Tab = {
    name: 'f7-tab',
    props: Object.assign({
      id: [String, Number],
      tabActive: Boolean
    }, Mixins.colorProps),

    data: function data() {
      var props = __vueComponentProps(this);

      var state = (function () {
        return {
          tabContent: null
        };
      })();

      return {
        state: state
      };
    },

    render: function render() {
      var _h = this.$createElement;
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
        return _h('div', {
          style: style,
          ref: 'el',
          class: classes,
          attrs: {
            id: id
          }
        }, [tabContent ? _h(TabContent, {
          key: tabContent.id,
          props: tabContent.props
        }) : this.$slots['default']]);
      }
    },

    created: function created() {
      this.onTabShowBound = this.onTabShow.bind(this);
      this.onTabHideBound = this.onTabHide.bind(this);
    },

    updated: function updated() {
      var self = this;
      if (!self.routerData) { return; }
      eventsEmitter.emit('tabRouterDidUpdate', self.routerData);
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$refs.el;

      if (el) {
        el.removeEventListener('tab:show', self.onTabShowBound);
        el.removeEventListener('tab:hide', self.onTabHideBound);
      }

      if (!self.routerData) { return; }
      f7.routers.tabs.splice(f7.routers.tabs.indexOf(self.routerData), 1);
      self.routerData = null;
      delete self.routerData;
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;

      if (el) {
        el.addEventListener('tab:show', self.onTabShowBound);
        el.addEventListener('tab:hide', self.onTabHideBound);
      }

      self.setState({
        tabContent: null
      });
      self.$f7ready(function () {
        self.routerData = {
          el: el,
          component: self
        };
        f7.routers.tabs.push(self.routerData);
      });
    },

    methods: {
      show: function show(animate) {
        if (!this.$f7) { return; }
        this.$f7.tab.show(this.$refs.el, animate);
      },

      onTabShow: function onTabShow(e) {
        this.dispatchEvent('tab:show tabShow', e);
      },

      onTabHide: function onTabHide(e) {
        this.dispatchEvent('tab:hide tabHide', e);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      },

      setState: function setState(updater, callback) {
        __vueComponentSetState(this, updater, callback);
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Tabs = {
    name: 'f7-tabs',
    props: Object.assign({
      id: [String, Number],
      animated: Boolean,
      swipeable: Boolean,
      routable: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var animated = props.animated;
      var swipeable = props.swipeable;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var routable = props.routable;
      var classes = Utils.classNames(className, {
        'tabs-animated-wrap': animated,
        'tabs-swipeable-wrap': swipeable,
        'tabs-routable': routable
      }, Mixins.colorClasses(props));

      if (animated || swipeable) {
        return _h('div', {
          style: style,
          class: classes,
          attrs: {
            id: id
          }
        }, [_h('div', {
          class: 'tabs'
        }, [this.$slots['default']])]);
      }

      return _h('div', {
        style: style,
        class: Utils.classNames('tabs', classes),
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Toolbar = {
    name: 'f7-toolbar',
    props: Object.assign({
      id: [String, Number],
      bottomMd: Boolean,
      tabbar: Boolean,
      labels: Boolean,
      scrollable: Boolean,
      hidden: Boolean,
      noShadow: Boolean,
      noHairline: Boolean,
      inner: {
        type: Boolean,
        default: true
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var inner = props.inner;
      var bottomMd = props.bottomMd;
      var tabbar = props.tabbar;
      var labels = props.labels;
      var scrollable = props.scrollable;
      var hidden = props.hidden;
      var noShadow = props.noShadow;
      var noHairline = props.noHairline;
      var classes = Utils.classNames(className, 'toolbar', {
        'toolbar-bottom-md': bottomMd,
        tabbar: tabbar,
        'tabbar-labels': labels,
        'tabbar-scrollable': scrollable,
        'toolbar-hidden': hidden,
        'no-shadow': noShadow,
        'no-hairline': noHairline
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        ref: 'el',
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['before-inner'], inner ? _h('div', {
        class: 'toolbar-inner'
      }, [this.$slots['default']]) : this.$slots['default'], this.$slots['after-inner']]);
    },

    updated: function updated() {
      var self = this;

      if (self.props.tabbar && self.$f7) {
        self.$f7.toolbar.setHighlight(self.$refs.el);
      }
    },

    mounted: function mounted() {
      var self = this;
      self.$f7ready(function (f7) {
        if (self.props.tabbar) { f7.toolbar.setHighlight(self.$refs.el); }
      });
    },

    methods: {
      hide: function hide(animate) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.toolbar.hide(this.$refs.el, animate);
      },

      show: function show(animate) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.toolbar.show(this.$refs.el, animate);
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7View = {
    name: 'f7-view',
    props: Object.assign({
      id: [String, Number],
      tab: Boolean,
      tabActive: Boolean,
      name: String,
      router: Boolean,
      linksView: [Object, String],
      url: String,
      main: Boolean,
      stackPages: Boolean,
      xhrCache: String,
      xhrCacheIgnore: Array,
      xhrCacheIgnoreGetParameters: Boolean,
      xhrCacheDuration: Number,
      preloadPreviousPage: Boolean,
      uniqueHistory: Boolean,
      uniqueHistoryIgnoreGetParameters: Boolean,
      allowDuplicateUrls: Boolean,
      reloadPages: Boolean,
      removeElements: Boolean,
      removeElementsWithTimeout: Boolean,
      removeElementsTimeout: Number,
      restoreScrollTopOnBack: Boolean,
      iosSwipeBack: Boolean,
      iosSwipeBackAnimateShadow: Boolean,
      iosSwipeBackAnimateOpacity: Boolean,
      iosSwipeBackActiveArea: Number,
      iosSwipeBackThreshold: Number,
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
      init: {
        type: Boolean,
        default: true
      }
    }, Mixins.colorProps),

    data: function data() {
      var props = __vueComponentProps(this);

      var state = (function () {
        return {
          pages: []
        };
      })();

      return {
        state: state
      };
    },

    render: function render() {
      var _h = this.$createElement;
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
      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default'], self.state.pages.map(function (page) {
        var PageComponent = page.component;
        {
          return _h(PageComponent, {
            key: page.id,
            props: page.props
          });
        }
      })]);
    },

    created: function created() {
      var self = this;
      self.onSwipeBackMoveBound = self.onSwipeBackMove.bind(self);
      self.onSwipeBackBeforeChangeBound = self.onSwipeBackBeforeChange.bind(self);
      self.onSwipeBackAfterChangeBound = self.onSwipeBackAfterChange.bind(self);
      self.onSwipeBackBeforeResetBound = self.onSwipeBackBeforeReset.bind(self);
      self.onSwipeBackAfterResetBound = self.onSwipeBackAfterReset.bind(self);
      self.onTabShowBound = self.onTabShow.bind(self);
      self.onTabHideBound = self.onTabHide.bind(self);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      el.addEventListener('swipeback:move', self.onSwipeBackMoveBound);
      el.addEventListener('swipeback:beforechange', self.onSwipeBackBeforeChangeBound);
      el.addEventListener('swipeback:afterchange', self.onSwipeBackAfterChangeBound);
      el.addEventListener('swipeback:beforereset', self.onSwipeBackBeforeResetBound);
      el.addEventListener('swipeback:afterreset', self.onSwipeBackAfterResetBound);
      el.addEventListener('tab:show', self.onTabShowBound);
      el.addEventListener('tab:hide', self.onTabHideBound);
      self.setState({
        pages: []
      });
      self.$f7ready(function (f7Instance) {
        if (!self.props.init) { return; }
        self.routerData = {
          el: el,
          component: self,
          instance: null
        };
        f7.routers.views.push(self.routerData);
        self.routerData.instance = f7Instance.views.create(el, Utils.noUndefinedProps(self.$options.propsData || {}));
        self.f7View = self.routerData.instance;
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$refs.el;
      el.removeEventListener('swipeback:move', self.onSwipeBackMoveBound);
      el.removeEventListener('swipeback:beforechange', self.onSwipeBackBeforeChangeBound);
      el.removeEventListener('swipeback:afterchange', self.onSwipeBackAfterChangeBound);
      el.removeEventListener('swipeback:beforereset', self.onSwipeBackBeforeResetBound);
      el.removeEventListener('swipeback:afterreset', self.onSwipeBackAfterResetBound);
      el.removeEventListener('tab:show', self.onTabShowBound);
      el.removeEventListener('tab:hide', self.onTabHideBound);
      if (!self.props.init) { return; }
      if (self.f7View && self.f7View.destroy) { self.f7View.destroy(); }
      f7.routers.views.splice(f7.routers.views.indexOf(self.routerData), 1);
      self.routerData = null;
      delete self.routerData;
    },

    updated: function updated() {
      var self = this;
      if (!self.routerData) { return; }
      eventsEmitter.emit('viewRouterDidUpdate', self.routerData);
    },

    methods: {
      onSwipeBackMove: function onSwipeBackMove(event) {
        this.dispatchEvent('swipeback:move swipeBackMove', event, event.detail);
      },

      onSwipeBackBeforeChange: function onSwipeBackBeforeChange(event) {
        this.dispatchEvent('swipeback:beforechange swipeBackBeforeChange', event, event.detail);
      },

      onSwipeBackAfterChange: function onSwipeBackAfterChange(event) {
        this.dispatchEvent('swipeback:afterchange swipeBackAfterChange', event, event.detail);
      },

      onSwipeBackBeforeReset: function onSwipeBackBeforeReset(event) {
        this.dispatchEvent('swipeback:beforereset swipeBackBeforeReset', event, event.detail);
      },

      onSwipeBackAfterReset: function onSwipeBackAfterReset(event) {
        this.dispatchEvent('swipeback:afterreset swipeBackAfterReset', event, event.detail);
      },

      onTabShow: function onTabShow(e) {
        this.dispatchEvent('tab:show tabShow', e);
      },

      onTabHide: function onTabHide(e) {
        this.dispatchEvent('tab:hide tabHide', e);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      },

      setState: function setState(updater, callback) {
        __vueComponentSetState(this, updater, callback);
      }

    },
    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Views = {
    name: 'f7-views',
    props: Object.assign({
      id: [String, Number],
      tabs: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var tabs = props.tabs;
      var classes = Utils.classNames(className, 'views', {
        tabs: tabs
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  /* eslint no-underscore-dangle: "off" */

  var routerComponentIdCounter = 0;

  var componentsRouter = {
    proto: {
      pageComponentLoader: function pageComponentLoader(routerEl, component, componentUrl, options, resolve, reject) {
        var router = this;
        var el = routerEl;
        var routerComponent;
        f7.routers.views.forEach(function (data) {
          if (data.el && data.el === routerEl) {
            routerComponent = data.component;
          }
        });

        if (!routerComponent || !routerComponent.state.pages) {
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
            options.route.params
          ),
        };
        routerComponent.$f7router = router;
        routerComponent.$f7route = options.route;

        var resolved;
        function onDidUpdate(componentRouterData) {
          if (componentRouterData.component !== routerComponent || resolved) { return; }
          eventsEmitter.off('viewRouterDidUpdate', onDidUpdate);

          var pageEl = el.children[el.children.length - 1];
          pageData.el = pageEl;

          resolve(pageEl);
          resolved = true;
        }

        eventsEmitter.on('viewRouterDidUpdate', onDidUpdate);

        routerComponent.state.pages.push(pageData);
        routerComponent.setState({ pages: routerComponent.state.pages });
      },
      removePage: function removePage($pageEl) {
        if (!$pageEl) { return; }
        var router = this;
        var routerComponent;
        f7.routers.views.forEach(function (data) {
          if (data.el && data.el === router.el) {
            routerComponent = data.component;
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
        routerComponent.state.pages.forEach(function (page, index) {
          if (page.el === pageEl) {
            pageComponentFound = true;
            routerComponent.state.pages.splice(index, 1);
            routerComponent.setState({ pages: routerComponent.state.pages });
          }
        });
        if (!pageComponentFound) {
          pageEl.parentNode.removeChild(pageEl);
        }
      },
      tabComponentLoader: function tabComponentLoader(tabEl, component, componentUrl, options, resolve, reject) {
        var router = this;
        if (!tabEl) { reject(); }

        var tabsComponent;
        f7.routers.tabs.forEach(function (tabData) {
          if (tabData.el && tabData.el === tabEl) {
            tabsComponent = tabData.component;
          }
        });
        if (!tabsComponent) {
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
            options.route.params
          ),
        };

        tabsComponent.$f7router = router;
        tabsComponent.$f7route = options.route;

        var resolved;
        function onDidUpdate(componentRouterData) {
          if (componentRouterData.component !== tabsComponent || resolved) { return; }
          eventsEmitter.off('tabRouterDidUpdate', onDidUpdate);

          var tabContentEl = tabEl.children[0];
          resolve(tabContentEl);

          resolved = true;
        }

        eventsEmitter.on('tabRouterDidUpdate', onDidUpdate);

        tabsComponent.setState({ tabContent: tabContent });
      },
      removeTabContent: function removeTabContent(tabEl) {
        if (!tabEl) { return; }

        var tabComponent;
        f7.routers.tabs.forEach(function (tabData) {
          if (tabData.el && tabData.el === tabEl) {
            tabComponent = tabData.component;
          }
        });
        var hasComponent = !!tabComponent.state.tabContent;
        if (!tabComponent || !hasComponent) {
          tabEl.innerHTML = ''; // eslint-disable-line
          return;
        }
        tabComponent.setState({ tabContent: null });
      },
      modalComponentLoader: function modalComponentLoader(rootEl, component, componentUrl, options, resolve, reject) {
        var router = this;
        var modalsComponent = f7.routers.modals && f7.routers.modals.component;
        var modalsComponentEl = f7.routers.modals && f7.routers.modals.el;

        if (!modalsComponent || !modalsComponent.state.modals) {
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
            options.route.params
          ),
        };
        modalsComponent.$f7router = router;
        modalsComponent.$f7route = options.route;

        var resolved;
        function onDidUpdate(componentRouterData) {
          if (componentRouterData.component !== modalsComponent || resolved) { return; }
          eventsEmitter.off('modalsRouterDidUpdate', onDidUpdate);

          var modalEl = modalsComponentEl.children[modalsComponentEl.children.length - 1];
          modalData.el = modalEl;

          resolve(modalEl);
          resolved = true;
        }

        eventsEmitter.on('modalsRouterDidUpdate', onDidUpdate);

        modalsComponent.state.modals.push(modalData);
        modalsComponent.setState({ modals: modalsComponent.state.modals });
      },
      removeModal: function removeModal(modalEl) {
        var modalsComponent = f7.routers.modals && f7.routers.modals.component;
        if (!modalsComponent) { return; }

        var modalDataToRemove;
        modalsComponent.state.modals.forEach(function (modalData) {
          if (modalData.el === modalEl) { modalDataToRemove = modalData; }
        });

        modalsComponent.state.modals.splice(modalsComponent.state.modals.indexOf(modalDataToRemove), 1);
        modalsComponent.setState({ modals: modalsComponent.state.modals });
      },
    },
  };

  /**
   * Framework7 Vue 3.0.0
   * Build full featured iOS & Android apps using Framework7 & Vue
   * http://framework7.io/vue/
   *
   * Copyright 2014-2018 Vladimir Kharlampidi
   *
   * Released under the MIT License
   *
   * Released on: July 5, 2018
   */

  var Plugin = {
    name: 'phenomePlugin',
    install: function install(params) {
      if ( params === void 0 ) params = {};

      var Framework7 = this;
      f7.Framework7 = Framework7;

      var Extend = Vue; // eslint-disable-line
      var refs = '$refs'; // eslint-disable-line

      Vue.component('f7-accordion-content', f7AccordionContent);
      Vue.component('f7-accordion-item', f7AccordionItem);
      Vue.component('f7-accordion-toggle', f7AccordionToggle);
      Vue.component('f7-accordion', f7Accordion);
      Vue.component('f7-actions-button', f7ActionsButton);
      Vue.component('f7-actions-group', f7ActionsGroup);
      Vue.component('f7-actions-label', f7ActionsLabel);
      Vue.component('f7-actions', f7Actions);
      Vue.component('f7-app', f7App);
      Vue.component('f7-badge', F7Badge);
      Vue.component('f7-block-footer', f7BlockFooter);
      Vue.component('f7-block-header', f7BlockHeader);
      Vue.component('f7-block-title', f7BlockTitle);
      Vue.component('f7-block', f7Block);
      Vue.component('f7-button', f7Button);
      Vue.component('f7-card-content', F7CardContent);
      Vue.component('f7-card-footer', F7CardFooter);
      Vue.component('f7-card-header', F7CardHeader);
      Vue.component('f7-card', f7Card);
      Vue.component('f7-checkbox', f7Checkbox);
      Vue.component('f7-chip', f7Chip);
      Vue.component('f7-col', f7Col);
      Vue.component('f7-fab-button', f7FabButton);
      Vue.component('f7-fab-buttons', f7FabButtons);
      Vue.component('f7-fab', f7Fab);
      Vue.component('f7-gauge', f7Gauge);
      Vue.component('f7-icon', F7Icon);
      Vue.component('f7-input', F7Input);
      Vue.component('f7-label', f7Label);
      Vue.component('f7-link', F7Link);
      Vue.component('f7-list-button', f7ListButton);
      Vue.component('f7-list-group', f7ListGroup);
      Vue.component('f7-list-index', f7ListIndex);
      Vue.component('f7-list-item-cell', f7ListItemCell);
      Vue.component('f7-list-item-content', F7ListItemContent);
      Vue.component('f7-list-item-row', f7ListItemRow);
      Vue.component('f7-list-item', f7ListItem);
      Vue.component('f7-list', f7List);
      Vue.component('f7-login-screen-title', f7LoginScreenTitle);
      Vue.component('f7-login-screen', f7LoginScreen);
      Vue.component('f7-message', f7Message);
      Vue.component('f7-messagebar-attachment', f7MessagebarAttachment);
      Vue.component('f7-messagebar-attachments', f7MessagebarAttachments);
      Vue.component('f7-messagebar-sheet-image', f7MessagebarSheetImage);
      Vue.component('f7-messagebar-sheet-item', f7MessagebarSheetItem);
      Vue.component('f7-messagebar-sheet', f7MessagebarSheet);
      Vue.component('f7-messagebar', f7Messagebar);
      Vue.component('f7-messages-title', f7MessagesTitle);
      Vue.component('f7-messages', f7Messages);
      Vue.component('f7-nav-left', F7NavLeft);
      Vue.component('f7-nav-right', f7NavRight);
      Vue.component('f7-nav-title', F7NavTitle);
      Vue.component('f7-navbar', f7Navbar);
      Vue.component('f7-page-content', F7PageContent);
      Vue.component('f7-page', f7Page);
      Vue.component('f7-panel', f7Panel);
      Vue.component('f7-photo-browser', f7PhotoBrowser);
      Vue.component('f7-popover', f7Popover);
      Vue.component('f7-popup', f7Popup);
      Vue.component('f7-preloader', f7Preloader);
      Vue.component('f7-progressbar', f7Progressbar);
      Vue.component('f7-radio', f7Radio);
      Vue.component('f7-range', F7Range);
      Vue.component('f7-routable-modals', RoutableModals);
      Vue.component('f7-row', f7Row);
      Vue.component('f7-searchbar', f7Searchbar);
      Vue.component('f7-segmented', f7Segmented);
      Vue.component('f7-sheet', f7Sheet);
      Vue.component('f7-statusbar', f7Statusbar);
      Vue.component('f7-stepper', f7Stepper);
      Vue.component('f7-subnavbar', f7Subnavbar);
      Vue.component('f7-swipeout-actions', f7SwipeoutActions);
      Vue.component('f7-swipeout-button', f7SwipeoutButton);
      Vue.component('f7-swiper-slide', f7SwiperSlide);
      Vue.component('f7-swiper', f7Swiper);
      Vue.component('f7-tab', f7Tab);
      Vue.component('f7-tabs', f7Tabs);
      Vue.component('f7-toggle', F7Toggle);
      Vue.component('f7-toolbar', f7Toolbar);
      Vue.component('f7-view', f7View);
      Vue.component('f7-views', f7Views);

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
      if (!theme || theme === 'auto') {
        $theme.ios = !!(Framework7.Device || Framework7.device).ios;
        $theme.md = !(Framework7.Device || Framework7.device).ios;
      }
      Object.defineProperty(Extend.prototype, '$theme', {
        get: function get() {
          return {
            ios: f7.instance ? f7.instance.theme === 'ios' : $theme.ios,
            md: f7.instance ? f7.instance.theme === 'md' : $theme.md,
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
          var parent = self;
          while (parent && !route) {
            if (parent._f7route) { route = parent._f7route; }
            {
              parent = parent.$parent;
            }
          }
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
          var parent = self;
          while (parent && !router) {
            if (parent._f7router) { router = parent._f7router; }
            else if (parent.f7View) {
              router = parent.f7View.router;
            } else if (parent[refs] && parent[refs].el && parent[refs].el.f7View) {
              router = parent[refs].el.f7View.router;
            }
            {
              parent = parent.$parent;
            }
          }
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

})));
