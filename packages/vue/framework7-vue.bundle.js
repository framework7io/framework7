/**
 * Framework7 Vue 5.7.14
 * Build full featured iOS & Android apps using Framework7 & Vue
 * https://framework7.io/vue/
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: November 9, 2020
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = global || self, global.Framework7Vue = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  var Utils = {
    text: function text(text$1) {
      if (typeof text$1 === 'undefined' || text$1 === null) { return ''; }
      return text$1;
    },
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

    created: function created() {
      Utils.bindMethods(this, 'onBeforeOpen onOpen onOpened onBeforeClose onClose onClosed'.split(' '));
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
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
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$refs.el;
      if (!el || !self.$f7) { return; }
      var f7 = self.$f7;
      f7.off('accordionBeforeOpen', self.onBeforeOpen);
      f7.off('accordionOpen', self.onOpen);
      f7.off('accordionOpened', self.onOpened);
      f7.off('accordionBeforeClose', self.onBeforeClose);
      f7.off('accordionClose', self.onClose);
      f7.off('accordionClosed', self.onClosed);
      delete this.eventTargetEl;
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
        ref: 'el',
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    methods: {
      onBeforeOpen: function onBeforeOpen(el, prevent) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordionBeforeOpen accordion:beforeopen', prevent);
      },

      onOpen: function onOpen(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordionOpen accordion:open');
      },

      onOpened: function onOpened(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordionOpened accordion:opened');
      },

      onBeforeClose: function onBeforeClose(el, prevent) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordionBeforeClose accordion:beforeclose', prevent);
      },

      onClose: function onClose(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordionClose accordion:close');
      },

      onClosed: function onClosed(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordionClosed accordion:closed');
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
      id: [String, Number],
      accordionOpposite: Boolean
    }, Mixins.colorProps),
    name: 'f7-accordion',

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var accordionOpposite = props.accordionOpposite;
      var classes = Utils.classNames(className, 'accordion-list', accordionOpposite && 'accordion-opposite', Mixins.colorClasses(props));
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
        attrs: {
          id: id
        }
      }, [mediaEl, _h('div', {
        class: 'actions-button-text'
      }, [this.$slots['default']])]);
    },

    created: function created() {
      Utils.bindMethods(this, ['onClick']);
    },

    mounted: function mounted() {
      this.$refs.el.addEventListener('click', this.onClick);
    },

    beforeDestroy: function beforeDestroy() {
      this.$refs.el.removeEventListener('click', this.onClick);
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
      var classes = Utils.classNames(className, 'actions-group', Mixins.colorClasses(props));
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
        ref: 'el',
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    created: function created() {
      Utils.bindMethods(this, ['onClick']);
    },

    mounted: function mounted() {
      this.$refs.el.addEventListener('click', this.onClick);
    },

    beforeDestroy: function beforeDestroy() {
      this.$refs.el.removeEventListener('click', this.onClick);
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
      target: [String, Object],
      backdrop: Boolean,
      backdropEl: [String, Object],
      closeByBackdropClick: Boolean,
      closeByOutsideClick: Boolean,
      closeOnEscape: Boolean
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

    created: function created() {
      Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed']);
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
      var closeByBackdropClick = props.closeByBackdropClick;
      var closeByOutsideClick = props.closeByOutsideClick;
      var closeOnEscape = props.closeOnEscape;
      var backdrop = props.backdrop;
      var backdropEl = props.backdropEl;
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
        var propsData = self.$options.propsData;
        if (typeof propsData.convertToPopover !== 'undefined') { actionsParams.convertToPopover = convertToPopover; }
        if (typeof propsData.forceToPopover !== 'undefined') { actionsParams.forceToPopover = forceToPopover; }
        if (typeof propsData.backdrop !== 'undefined') { actionsParams.backdrop = backdrop; }
        if (typeof propsData.backdropEl !== 'undefined') { actionsParams.backdropEl = backdropEl; }
        if (typeof propsData.closeByBackdropClick !== 'undefined') { actionsParams.closeByBackdropClick = closeByBackdropClick; }
        if (typeof propsData.closeByOutsideClick !== 'undefined') { actionsParams.closeByOutsideClick = closeByOutsideClick; }
        if (typeof propsData.closeOnEscape !== 'undefined') { actionsParams.closeOnEscape = closeOnEscape; }
      }
      self.$f7ready(function () {
        self.f7Actions = self.$f7.actions.create(actionsParams);

        if (opened) {
          self.f7Actions.open(false);
        }
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Actions) { self.f7Actions.destroy(); }
      delete self.f7Actions;
    },

    methods: {
      onOpen: function onOpen(instance) {
        this.dispatchEvent('actions:open actionsOpen', instance);
      },

      onOpened: function onOpened(instance) {
        this.dispatchEvent('actions:opened actionsOpened', instance);
      },

      onClose: function onClose(instance) {
        this.dispatchEvent('actions:close actionsClose', instance);
      },

      onClosed: function onClosed(instance) {
        this.dispatchEvent('actions:closed actionsClosed', instance);
      },

      open: function open(animate) {
        var self = this;
        if (!self.f7Actions) { return undefined; }
        return self.f7Actions.open(animate);
      },

      close: function close(animate) {
        var self = this;
        if (!self.f7Actions) { return undefined; }
        return self.f7Actions.close(animate);
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

  var f7RoutableModals = {
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
      f7.events.emit('modalsRouterDidUpdate', self.routerData);
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
      }, [this.$slots['default'], _h(f7RoutableModals)]);
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

      if (f7.instance) { return; }
      f7.init(el, params, routes);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Appbar = {
    name: 'f7-appbar',
    props: Object.assign({
      id: [String, Number],
      noShadow: Boolean,
      noHairline: Boolean,
      inner: {
        type: Boolean,
        default: true
      },
      innerClass: String,
      innerClassName: String
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
        innerEl = _h('div', {
          class: Utils.classNames('appbar-inner', innerClass, innerClassName)
        }, [this.$slots['default']]);
      }

      var classes = Utils.classNames(className, 'appbar', {
        'no-shadow': noShadow,
        'no-hairline': noHairline
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['before-inner'], innerEl || self.$slots.default, this.$slots['after-inner']]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Badge = {
    name: 'f7-badge',
    props: Object.assign({
      id: [String, Number],
      tooltip: String,
      tooltipTrigger: String
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'badge', Mixins.colorClasses(props));
      return _h('span', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    watch: {
      'props.tooltip': function watchTooltip(newText) {
        var self = this;

        if (!newText && self.f7Tooltip) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
          return;
        }

        if (newText && !self.f7Tooltip && self.$f7) {
          self.f7Tooltip = self.$f7.tooltip.create({
            targetEl: self.$refs.el,
            text: newText,
            trigger: self.props.tooltipTrigger
          });
          return;
        }

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
      var tooltipTrigger = ref.tooltipTrigger;
      if (!tooltip) { return; }
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: el,
          text: tooltip,
          trigger: tooltipTrigger
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
      id: [String, Number],
      large: Boolean,
      medium: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      accordionOpposite: Boolean,
      noHairlines: Boolean,
      noHairlinesMd: Boolean,
      noHairlinesIos: Boolean,
      noHairlinesAurora: Boolean
    }, Mixins.colorProps),

    created: function created() {
      Utils.bindMethods(this, ['onTabShow', 'onTabHide']);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      if (!el) { return; }
      self.eventTargetEl = el;
      self.$f7ready(function (f7) {
        f7.on('tabShow', self.onTabShow);
        f7.on('tabHide', self.onTabHide);
      });
    },

    beforeDestroy: function beforeDestroy() {
      var el = this.$refs.el;
      if (!el || !this.$f7) { return; }
      this.$f7.off('tabShow', this.onTabShow);
      this.$f7.off('tabHide', this.onTabHide);
      delete this.eventTargetEl;
    },

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var className = props.className;
      var inset = props.inset;
      var xsmallInset = props.xsmallInset;
      var smallInset = props.smallInset;
      var mediumInset = props.mediumInset;
      var largeInset = props.largeInset;
      var xlargeInset = props.xlargeInset;
      var strong = props.strong;
      var accordionList = props.accordionList;
      var accordionOpposite = props.accordionOpposite;
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
        'xsmall-inset': xsmallInset,
        'small-inset': smallInset,
        'medium-inset': mediumInset,
        'large-inset': largeInset,
        'xlarge-inset': xlargeInset,
        'block-strong': strong,
        'accordion-list': accordionList,
        'accordion-opposite': accordionOpposite,
        tabs: tabs,
        tab: tab,
        'tab-active': tabActive,
        'no-hairlines': noHairlines,
        'no-hairlines-md': noHairlinesMd,
        'no-hairlines-ios': noHairlinesIos,
        'no-hairlines-aurora': noHairlinesAurora
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        ref: 'el',
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    methods: {
      onTabShow: function onTabShow(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('tabShow tab:show', el);
      },

      onTabHide: function onTabHide(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('tabHide tab:hide', el);
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

  var f7Icon = {
    name: 'f7-icon',
    props: Object.assign({
      id: [String, Number],
      material: String,
      f7: String,
      icon: String,
      ios: String,
      aurora: String,
      md: String,
      tooltip: String,
      tooltipTrigger: String,
      size: [String, Number]
    }, Mixins.colorProps),

    data: function data() {
      var this$1 = this;

      var props = __vueComponentProps(this);

      var state = (function () {
        var self = this$1;
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
      var size = props.size;

      if (typeof size === 'number' || parseFloat(size) === size * 1) {
        size = size + "px";
      }

      return _h('i', {
        ref: 'el',
        style: Utils.extend({
          fontSize: size,
          width: size,
          height: size
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

        if (!newText && self.f7Tooltip) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
          return;
        }

        if (newText && !self.f7Tooltip && self.$f7) {
          self.f7Tooltip = self.$f7.tooltip.create({
            targetEl: self.$refs.el,
            text: newText,
            trigger: self.props.tooltipTrigger
          });
          return;
        }

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
      var tooltipTrigger = ref.tooltipTrigger;
      if (!tooltip) { return; }
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: el,
          text: tooltip,
          trigger: tooltipTrigger
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
      iconTextComputed: function iconTextComputed() {
        var self = this;
        var ref = self.props;
        var material = ref.material;
        var f7 = ref.f7;
        var md = ref.md;
        var ios = ref.ios;
        var aurora = ref.aurora;
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
      },

      classes: function classes() {
        var classes = {
          icon: true
        };
        var self = this;
        var props = self.props;
        var theme = self.state._theme;
        var material = props.material;
        var f7 = props.f7;
        var icon = props.icon;
        var md = props.md;
        var ios = props.ios;
        var aurora = props.aurora;
        var className = props.className;
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
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },
    methods: {
      setState: function setState(updater, callback) {
        __vueComponentSetState(this, updater, callback);
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
      tooltip: String,
      tooltipTrigger: String
    }, Mixins.colorProps, {}, Mixins.linkIconProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var iconEl;
      var textEl;
      var props = self.props;
      var text = props.text;
      var icon = props.icon;
      var iconMaterial = props.iconMaterial;
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
        textEl = _h('span', [text]);
      }

      if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
        iconEl = _h(f7Icon, {
          attrs: {
            material: iconMaterial,
            f7: iconF7,
            icon: icon,
            md: iconMd,
            ios: iconIos,
            aurora: iconAurora,
            color: iconColor,
            size: iconSize
          }
        });
      }

      var ButtonTag = type === 'submit' || type === 'reset' || type === 'button' ? 'button' : 'a';
      return _h(ButtonTag, __vueComponentTransformJSXProps(Object.assign({
        ref: 'el',
        style: style,
        class: self.classes
      }, self.attrs, {
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
      },

      classes: function classes() {
        var self = this;
        var props = self.props;
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

        if (!newText && self.f7Tooltip) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
          return;
        }

        if (newText && !self.f7Tooltip && self.$f7) {
          self.f7Tooltip = self.$f7.tooltip.create({
            targetEl: self.$refs.el,
            text: newText,
            trigger: self.props.tooltipTrigger
          });
          return;
        }

        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      }
    },

    created: function created() {
      Utils.bindMethods(this, ['onClick']);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      el.addEventListener('click', self.onClick);
      var ref = self.props;
      var tooltip = ref.tooltip;
      var tooltipTrigger = ref.tooltipTrigger;
      var routeProps = ref.routeProps;

      if (routeProps) {
        el.f7RouteProps = routeProps;
      }

      if (!tooltip) { return; }
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: el,
          text: tooltip,
          trigger: tooltipTrigger
        });
      });
    },

    updated: function updated() {
      var self = this;
      var el = self.$refs.el;
      var ref = self.props;
      var routeProps = ref.routeProps;

      if (routeProps) {
        el.f7RouteProps = routeProps;
      }
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$refs.el;
      el.removeEventListener('click', self.onClick);
      delete el.f7RouteProps;

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
    }

  };

  var f7CardContent = {
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

  var f7CardFooter = {
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

  var f7CardHeader = {
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
      scrollableEl: {
        type: String,
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
    }, Mixins.colorProps),
    watch: {
      'props.expandableOpened': function watchOpened(expandableOpened) {
        var self = this;

        if (expandableOpened) {
          self.open();
        } else {
          self.close();
        }
      }
    },

    created: function created() {
      Utils.bindMethods(this, 'onBeforeOpen onOpen onOpened onClose onClosed'.split(' '));
    },

    mounted: function mounted() {
      var self = this;
      if (!self.props.expandable) { return; }
      var el = self.$refs.el;
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
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (!self.props.expandable) { return; }
      var el = self.$refs.el;
      if (!el || !self.$f7) { return; }
      self.$f7.off('cardBeforeOpen', self.onBeforeOpen);
      self.$f7.off('cardOpen', self.onOpen);
      self.$f7.off('cardOpened', self.onOpened);
      self.$f7.off('cardClose', self.onClose);
      self.$f7.off('cardClosed', self.onClosed);
      self.eventTargetEl = null;
      delete self.eventTargetEl;
    },

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
      var expandable = props.expandable;
      var expandableAnimateWidth = props.expandableAnimateWidth;
      var animate = props.animate;
      var hideNavbarOnOpen = props.hideNavbarOnOpen;
      var hideToolbarOnOpen = props.hideToolbarOnOpen;
      var hideStatusbarOnOpen = props.hideStatusbarOnOpen;
      var scrollableEl = props.scrollableEl;
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

      if (title || self.$slots && self.$slots.header) {
        headerEl = _h(f7CardHeader, [title, this.$slots['header']]);
      }

      if (content || self.$slots && self.$slots.content) {
        contentEl = _h(f7CardContent, {
          attrs: {
            padding: padding
          }
        }, [content, this.$slots['content']]);
      }

      if (footer || self.$slots && self.$slots.footer) {
        footerEl = _h(f7CardFooter, [footer, this.$slots['footer']]);
      }

      return _h('div', {
        style: style,
        class: classes,
        ref: 'el',
        attrs: {
          id: id,
          'data-animate': typeof animate === 'undefined' ? animate : animate.toString(),
          'data-hide-navbar-on-open': typeof hideNavbarOnOpen === 'undefined' ? hideNavbarOnOpen : hideNavbarOnOpen.toString(),
          'data-hide-toolbar-on-open': typeof hideToolbarOnOpen === 'undefined' ? hideToolbarOnOpen : hideToolbarOnOpen.toString(),
          'data-hide-statusbar-on-open': typeof hideStatusbarOnOpen === 'undefined' ? hideStatusbarOnOpen : hideStatusbarOnOpen.toString(),
          'data-scrollable-el': scrollableEl,
          'data-swipe-to-close': typeof swipeToClose === 'undefined' ? swipeToClose : swipeToClose.toString(),
          'data-close-by-backdrop-click': typeof closeByBackdropClick === 'undefined' ? closeByBackdropClick : closeByBackdropClick.toString(),
          'data-backdrop': typeof backdrop === 'undefined' ? backdrop : backdrop.toString(),
          'data-backdrop-el': backdropEl
        }
      }, [headerEl, contentEl, footerEl, this.$slots['default']]);
    },

    methods: {
      open: function open() {
        var self = this;
        if (!self.$refs.el) { return; }
        self.$f7.card.open(self.$refs.el);
      },

      close: function close() {
        var self = this;
        if (!self.$refs.el) { return; }
        self.$f7.card.close(self.$refs.el);
      },

      onBeforeOpen: function onBeforeOpen(el, prevent) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('cardBeforeOpen card:beforeopen', el, prevent);
      },

      onOpen: function onOpen(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('cardOpen card:open', el);
      },

      onOpened: function onOpened(el, pageEl) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('cardOpened card:opened', el, pageEl);
      },

      onClose: function onClose(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('cardClose card:close', el);
      },

      onClosed: function onClosed(el, pageEl) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('cardClosed card:closed', el, pageEl);
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

  var f7Checkbox = {
    name: 'f7-checkbox',
    props: Object.assign({
      id: [String, Number],
      checked: Boolean,
      indeterminate: Boolean,
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
          ref: 'inputEl',
          domProps: {
            value: value,
            disabled: disabled,
            readonly: readonly,
            checked: checked
          },
          on: {
            change: self.onChange
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

    created: function created() {
      Utils.bindMethods(this, ['onChange']);
    },

    mounted: function mounted() {
      var self = this;
      var ref = self.$refs;
      var inputEl = ref.inputEl;
      var ref$1 = self.props;
      var indeterminate = ref$1.indeterminate;

      if (indeterminate && inputEl) {
        inputEl.indeterminate = true;
      }
    },

    updated: function updated() {
      var self = this;
      var ref = self.$refs;
      var inputEl = ref.inputEl;
      var ref$1 = self.props;
      var indeterminate = ref$1.indeterminate;

      if (inputEl) {
        inputEl.indeterminate = indeterminate;
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
      outline: Boolean,
      tooltip: String,
      tooltipTrigger: String
    }, Mixins.colorProps, {}, Mixins.linkIconProps),

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
      var icon = props.icon;
      var iconMaterial = props.iconMaterial;
      var iconF7 = props.iconF7;
      var iconMd = props.iconMd;
      var iconIos = props.iconIos;
      var iconAurora = props.iconAurora;
      var iconColor = props.iconColor;
      var iconSize = props.iconSize;
      var iconEl;
      var mediaEl;
      var labelEl;
      var deleteEl;

      if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
        iconEl = _h(f7Icon, {
          attrs: {
            material: iconMaterial,
            f7: iconF7,
            icon: icon,
            md: iconMd,
            ios: iconIos,
            aurora: iconAurora,
            color: iconColor,
            size: iconSize
          }
        });
      }

      if (media || iconEl || self.$slots && self.$slots.media) {
        var mediaClasses = Utils.classNames('chip-media', mediaTextColor && ("text-color-" + mediaTextColor), mediaBgColor && ("bg-color-" + mediaBgColor));
        mediaEl = _h('div', {
          class: mediaClasses
        }, [iconEl, media, this.$slots['media']]);
      }

      if (text || self.$slots && (self.$slots.text || self.$slots.default && self.$slots.default.length)) {
        labelEl = _h('div', {
          class: 'chip-label'
        }, [text, this.$slots['text'], this.$slots['default']]);
      }

      if (deleteable) {
        deleteEl = _h('a', {
          ref: 'deleteEl',
          class: 'chip-delete'
        });
      }

      var classes = Utils.classNames(className, 'chip', {
        'chip-outline': outline
      }, Mixins.colorClasses(props));
      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [mediaEl, labelEl, deleteEl]);
    },

    watch: {
      'props.tooltip': function watchTooltip(newText) {
        var self = this;

        if (!newText && self.f7Tooltip) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
          return;
        }

        if (newText && !self.f7Tooltip && self.$f7) {
          self.f7Tooltip = self.$f7.tooltip.create({
            targetEl: self.$refs.el,
            text: newText,
            trigger: self.props.tooltipTrigger
          });
          return;
        }

        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      }
    },

    created: function created() {
      Utils.bindMethods(this, ['onClick', 'onDeleteClick']);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      el.addEventListener('click', self.onClick);

      if (self.$refs.deleteEl) {
        self.$refs.deleteEl.addEventListener('click', self.onDeleteClick);
      }

      var ref = self.props;
      var tooltip = ref.tooltip;
      var tooltipTrigger = ref.tooltipTrigger;
      if (!tooltip) { return; }
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: el,
          text: tooltip,
          trigger: tooltipTrigger
        });
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      self.$refs.el.removeEventListener('click', self.onClick);

      if (self.$refs.deleteEl) {
        self.$refs.deleteEl.removeEventListener('click', self.onDeleteClick);
      }

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
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
      },
      resizable: Boolean,
      resizableFixed: Boolean,
      resizableAbsolute: Boolean,
      resizableHandler: {
        type: Boolean,
        default: true
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
      var xsmall = props.xsmall;
      var small = props.small;
      var medium = props.medium;
      var large = props.large;
      var xlarge = props.xlarge;
      var resizable = props.resizable;
      var resizableFixed = props.resizableFixed;
      var resizableAbsolute = props.resizableAbsolute;
      var resizableHandler = props.resizableHandler;
      var ColTag = tag;
      var classes = Utils.classNames(className, ( obj = {
        col: width === 'auto'
      }, obj[("col-" + width)] = width !== 'auto', obj[("xsmall-" + xsmall)] = xsmall, obj[("small-" + small)] = small, obj[("medium-" + medium)] = medium, obj[("large-" + large)] = large, obj[("xlarge-" + xlarge)] = xlarge, obj.resizable = resizable, obj['resizable-fixed'] = resizableFixed, obj['resizable-absolute'] = resizableAbsolute, obj ), Mixins.colorClasses(props));
      return _h(ColTag, {
        style: style,
        class: classes,
        ref: 'el',
        attrs: {
          id: id
        }
      }, [this.$slots['default'], resizable && resizableHandler && _h('span', {
        class: 'resize-handler'
      })]);
    },

    created: function created() {
      Utils.bindMethods(this, ['onClick', 'onResize']);
    },

    mounted: function mounted() {
      var self = this;
      self.eventTargetEl = self.$refs.el;
      self.eventTargetEl.addEventListener('click', self.onClick);
      self.$f7ready(function (f7) {
        f7.on('gridResize', self.onResize);
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$refs.el;
      if (!el || !self.$f7) { return; }
      el.removeEventListener('click', self.onClick);
      self.$f7.off('gridResize', self.onResize);
      delete self.eventTargetEl;
    },

    methods: {
      onClick: function onClick(event) {
        this.dispatchEvent('click', event);
      },

      onResize: function onResize(el) {
        if (el === this.eventTargetEl) {
          this.dispatchEvent('grid:resize gridResize');
        }
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

  var f7FabBackdrop = {
    name: 'f7-fab-backdrop',
    props: {
      id: [String, Number]
    },

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'fab-backdrop');
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      });
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
      tooltip: String,
      tooltipTrigger: String
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
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id,
          target: target
        }
      }, [this.$slots['default'], labelEl]);
    },

    created: function created() {
      Utils.bindMethods(this, ['onClick']);
    },

    mounted: function mounted() {
      var self = this;
      self.$refs.el.addEventListener('click', self.onClick);
      var ref = self.props;
      var tooltip = ref.tooltip;
      var tooltipTrigger = ref.tooltipTrigger;
      if (!tooltip) { return; }
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: self.$refs.el,
          text: tooltip,
          trigger: tooltipTrigger
        });
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      self.$refs.el.removeEventListener('click', self.onClick);

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
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

        if (!newText && self.f7Tooltip) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
          return;
        }

        if (newText && !self.f7Tooltip && self.$f7) {
          self.f7Tooltip = self.$f7.tooltip.create({
            targetEl: self.$refs.el,
            text: newText,
            trigger: self.props.tooltipTrigger
          });
          return;
        }

        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
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
      tooltip: String,
      tooltipTrigger: String
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

      if (linkChildren.length || linkSlots && linkSlots.length || textEl) {
        linkEl = _h('a', {
          ref: 'linkEl',
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

    watch: {
      'props.tooltip': function watchTooltip(newText) {
        var self = this;

        if (!newText && self.f7Tooltip) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
          return;
        }

        if (newText && !self.f7Tooltip && self.$f7) {
          self.f7Tooltip = self.$f7.tooltip.create({
            targetEl: self.$refs.el,
            text: newText,
            trigger: self.props.tooltipTrigger
          });
          return;
        }

        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      }
    },

    created: function created() {
      Utils.bindMethods(this, ['onClick']);
    },

    mounted: function mounted() {
      var self = this;

      if (self.$refs.linkEl) {
        self.$refs.linkEl.addEventListener('click', self.onClick);
      }

      var ref = self.props;
      var tooltip = ref.tooltip;
      var tooltipTrigger = ref.tooltipTrigger;
      if (!tooltip) { return; }
      self.$f7ready(function (f7) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: self.$refs.el,
          text: tooltip,
          trigger: tooltipTrigger
        });
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;

      if (self.$refs.linkEl) {
        self.$refs.linkEl.removeEventListener('click', self.onClick);
      }

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
      }
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
          'stroke-dashoffset': length / 2 * (1 + progress),
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
          'dominant-baseline': !semiCircle ? 'middle' : null
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
          'dominant-baseline': !semiCircle ? 'middle' : null
        }
      }, [labelText])])]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7Toggle = {
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
          ref: 'inputEl',
          domProps: {
            disabled: disabled,
            readOnly: readonly,
            value: value,
            checked: checked
          },
          on: {
            change: self.onChange
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

    created: function created() {
      Utils.bindMethods(this, ['onChange']);
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

      onChange: function onChange(event) {
        var self = this;
        self.dispatchEvent('change', event);
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

  var f7Range = {
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
      var vertical = ref.vertical;
      var verticalReversed = ref.verticalReversed;
      var classes = Utils.classNames(className, 'range-slider', {
        'range-slider-horizontal': !vertical,
        'range-slider-vertical': vertical,
        'range-slider-vertical-reversed': vertical && verticalReversed,
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
        var vertical = props.vertical;
        var verticalReversed = props.verticalReversed;
        var formatLabel = props.formatLabel;
        var scale = props.scale;
        var scaleSteps = props.scaleSteps;
        var scaleSubSteps = props.scaleSubSteps;
        var formatScaleLabel = props.formatScaleLabel;
        var limitKnobPosition = props.limitKnobPosition;
        self.f7Range = f7.range.create(Utils.noUndefinedProps({
          el: self.$refs.el,
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

  var f7TextEditor = {
    name: 'f7-text-editor',
    props: Object.assign({
      id: [String, Number]
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
    }),

    created: function created() {
      Utils.bindMethods(this, 'onChange onInput onFocus onBlur onButtonClick onKeyboardOpen onKeyboardClose onPopoverOpen onPopoverClose'.split(' '));
    },

    mounted: function mounted() {
      var this$1 = this;

      var props = this.props;
      var mode = props.mode;
      var value = props.value;
      var buttons = props.buttons;
      var customButtons = props.customButtons;
      var dividers = props.dividers;
      var imageUrlText = props.imageUrlText;
      var linkUrlText = props.linkUrlText;
      var placeholder = props.placeholder;
      var clearFormattingOnPaste = props.clearFormattingOnPaste;
      var params = Utils.noUndefinedProps({
        el: this.$refs.el,
        mode: mode,
        value: value,
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
        this$1.f7TextEditor = f7.textEditor.create(params);
      });
    },

    beforeDestroy: function beforeDestroy() {
      if (this.f7TextEditor && this.f7TextEditor.destroy) {
        this.f7TextEditor.destroy();
      }
    },

    watch: {
      'props.value': function watchValue() {
        if (this.f7TextEditor) {
          this.f7TextEditor.setValue(this.props.value);
        }
      }
    },

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var resizable = props.resizable;
      var classes = Utils.classNames(className, 'text-editor', resizable && 'text-editor-resizable', Mixins.colorClasses(props));
      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['root-start'], _h('div', {
        class: 'text-editor-content',
        attrs: {
          contenteditable: true
        }
      }, [this.$slots['default']]), this.$slots['root-end'], this.$slots['root']]);
    },

    methods: {
      onChange: function onChange(editor, value) {
        this.dispatchEvent('texteditor:change textEditorChange', value);
      },

      onInput: function onInput() {
        this.dispatchEvent('texteditor:change textEditorChange');
      },

      onFocus: function onFocus() {
        this.dispatchEvent('texteditor:focus textEditorFocus');
      },

      onBlur: function onBlur() {
        this.dispatchEvent('texteditor:blur textEditorBlur');
      },

      onButtonClick: function onButtonClick(editor, button) {
        this.dispatchEvent('texteditor:buttonclick textEditorButtonClick', button);
      },

      onKeyboardOpen: function onKeyboardOpen() {
        this.dispatchEvent('texteditor:keyboardopen textEditorKeyboardOpen');
      },

      onKeyboardClose: function onKeyboardClose() {
        this.dispatchEvent('texteditor:keyboardclose textEditorKeyboardClose');
      },

      onPopoverOpen: function onPopoverOpen() {
        this.dispatchEvent('texteditor:popoveropen textEditorPopoverOpen');
      },

      onPopoverClose: function onPopoverClose() {
        this.dispatchEvent('texteditor:popoverclose textEditorPopoverClose');
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

  var f7Input = {
    name: 'f7-input',
    props: Object.assign({
      type: String,
      name: String,
      value: [String, Number, Array, Date, Object],
      defaultValue: [String, Number, Array],
      inputmode: String,
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
      inputStyle: [String, Object],
      pattern: String,
      validate: [Boolean, String],
      validateOnBlur: Boolean,
      onValidate: Function,
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
    }, Mixins.colorProps),

    data: function data() {
      var props = __vueComponentProps(this);

      var state = (function () {
        return {
          inputFocused: false,
          inputInvalid: false
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
      var type = props.type;
      var name = props.name;
      var value = props.value;
      var defaultValue = props.defaultValue;
      var inputmode = props.inputmode;
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
      var textEditorParams = props.textEditorParams;
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
          input = _h(InputTag, {
            ref: 'inputEl',
            style: inputStyle,
            class: inputClassName,
            domProps: Object.assign({
              checked: checked,
              disabled: disabled,
              readOnly: readonly,
              multiple: multiple,
              required: required
            }, valueProps),
            on: {
              focus: self.onFocus,
              blur: self.onBlur,
              input: self.onInput,
              change: self.onChange
            },
            attrs: {
              name: name,
              type: needsType ? inputType : undefined,
              placeholder: placeholder,
              inputmode: inputmode,
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
              'data-validate': validate === true || validate === '' || validateOnBlur === true || validateOnBlur === '' ? true : undefined,
              'data-validate-on-blur': validateOnBlur === true || validateOnBlur === '' ? true : undefined,
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
        inputEl = _h(f7Toggle, {
          on: {
            change: self.onChange
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
        inputEl = _h(f7Range, {
          on: {
            rangeChange: self.onChange
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
      } else if (type === 'texteditor') {
        inputEl = _h(f7TextEditor, __vueComponentTransformJSXProps(Object.assign({}, textEditorParams, {
          on: {
            textEditorFocus: self.onFocus,
            textEditorBlur: self.onBlur,
            textEditorInput: self.onInput,
            textEditorChange: self.onChange
          },
          attrs: {
            value: value,
            resizable: resizable,
            placeholder: placeholder
          }
        })));
      } else {
        inputEl = createInput('input');
      }

      if (wrap) {
        var wrapClasses = Utils.classNames(className, 'input', {
          'input-outline': outline,
          'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown
        }, Mixins.colorClasses(props));
        return _h('div', {
          class: wrapClasses,
          style: style,
          attrs: {
            id: id
          }
        }, [inputEl, errorMessage && errorMessageForce && _h('div', {
          class: 'input-error-message'
        }, [errorMessage]), clearButton && _h('span', {
          class: 'input-clear-button'
        }), (info || slotsInfo && slotsInfo.length) && _h('div', {
          class: 'input-info'
        }, [info, this.$slots['info']])]);
      }

      return inputEl;
    },

    watch: {
      'props.colorPickerParams': function watchValue() {
        var self = this;
        if (!self.$f7 || !self.f7ColorPicker) { return; }
        Utils.extend(self.f7ColorPicker.params, self.colorPickerParams || {});
      },
      'props.calendarParams': function watchValue() {
        var self = this;
        if (!self.$f7 || !self.f7Calendar) { return; }
        Utils.extend(self.f7Calendar.params, self.calendarParams || {});
      },
      'props.value': function watchValue() {
        var self = this;
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
      }
    },

    created: function created() {
      Utils.bindMethods(this, 'onFocus onBlur onInput onChange onTextareaResize onInputNotEmpty onInputEmpty onInputClear'.split(' '));
    },

    mounted: function mounted() {
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
        var inputEl = self.$refs.inputEl;
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
    },

    updated: function updated() {
      var self = this;
      var ref = self.props;
      var validate = ref.validate;
      var validateOnBlur = ref.validateOnBlur;
      var resizable = ref.resizable;
      var f7 = self.$f7;
      if (!f7) { return; }

      if (self.updateInputOnDidUpdate) {
        var inputEl = self.$refs.inputEl;
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
    },

    methods: {
      domValue: function domValue() {
        var self = this;
        var ref = self.$refs;
        var inputEl = ref.inputEl;
        if (!inputEl) { return undefined; }
        return inputEl.value;
      },

      inputHasValue: function inputHasValue() {
        var self = this;
        var ref = self.props;
        var value = ref.value;
        var type = ref.type;

        if (type === 'datepicker' && Array.isArray(value) && value.length === 0) {
          return false;
        }

        var domValue = self.domValue();
        return typeof value === 'undefined' ? domValue || domValue === 0 : value || value === 0;
      },

      validateInput: function validateInput(inputEl) {
        var self = this;
        var f7 = self.$f7;
        if (!f7 || !inputEl) { return; }
        var validity = inputEl.validity;
        if (!validity) { return; }
        var ref = self.props;
        var onValidate = ref.onValidate;

        if (!validity.valid) {
          if (onValidate) { onValidate(false); }

          if (self.state.inputInvalid !== true) {
            self.setState({
              inputInvalid: true
            });
          }
        } else if (self.state.inputInvalid !== false) {
          if (onValidate) { onValidate(true); }
          self.setState({
            inputInvalid: false
          });
        }
      },

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

      onInput: function onInput() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var self = this;
        var ref = self.props;
        var validate = ref.validate;
        var validateOnBlur = ref.validateOnBlur;
        self.dispatchEvent.apply(self, [ 'input' ].concat( args ));

        if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && self.$refs && self.$refs.inputEl) {
          self.validateInput(self.$refs.inputEl);
        }
      },

      onFocus: function onFocus() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        (ref = this).dispatchEvent.apply(ref, [ 'focus' ].concat( args ));
        this.setState({
          inputFocused: true
        });
      },

      onBlur: function onBlur() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var self = this;
        var ref = self.props;
        var validate = ref.validate;
        var validateOnBlur = ref.validateOnBlur;
        self.dispatchEvent.apply(self, [ 'blur' ].concat( args ));

        if ((validate || validate === '' || validateOnBlur || validateOnBlur === '') && self.$refs && self.$refs.inputEl) {
          self.validateInput(self.$refs.inputEl);
        }

        self.setState({
          inputFocused: false
        });
      },

      onChange: function onChange() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        (ref = this).dispatchEvent.apply(ref, [ 'change' ].concat( args ));

        if (this.props.type === 'texteditor') {
          this.dispatchEvent('texteditor:change textEditorChange', args[1]);
        }
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

  var f7Link = {
    name: 'f7-link',
    props: Object.assign({
      id: [String, Number],
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
      tooltipTrigger: String,
      smartSelect: Boolean,
      smartSelectParams: Object
    }, Mixins.colorProps, {}, Mixins.linkIconProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps),

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
      var iconF7 = props.iconF7;
      var iconMd = props.iconMd;
      var iconIos = props.iconIos;
      var iconAurora = props.iconAurora;
      var id = props.id;
      var style = props.style;
      var defaultSlots = self.$slots.default || [];
      Object.keys(self.$slots).forEach(function (key) {
        if (typeof self.$slots[key] === 'undefined' || key === 'default') { return; }
        self.$slots[key].forEach(function (child) { return defaultSlots.push(child); });
      });
      var iconEl;
      var textEl;
      var badgeEl;
      var iconBadgeEl;

      if (text) {
        if (badge) { badgeEl = _h(f7Badge, {
          attrs: {
            color: badgeColor
          }
        }, [badge]); }
        textEl = _h('span', {
          class: self.state.isTabbarLabel ? 'tabbar-label' : ''
        }, [text, badgeEl]);
      }

      if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
        if (iconBadge) {
          iconBadgeEl = _h(f7Badge, {
            attrs: {
              color: badgeColor
            }
          }, [iconBadge]);
        }

        iconEl = _h(f7Icon, {
          attrs: {
            material: iconMaterial,
            f7: iconF7,
            icon: icon,
            md: iconMd,
            ios: iconIos,
            aurora: iconAurora,
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
        attrs: {
          id: id
        }
      })), [iconEl, textEl, defaultSlots]);
    },

    watch: {
      'props.tooltip': function watchTooltip(newText) {
        var self = this;

        if (!newText && self.f7Tooltip) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
          return;
        }

        if (newText && !self.f7Tooltip && self.$f7) {
          self.f7Tooltip = self.$f7.tooltip.create({
            targetEl: self.$refs.el,
            text: newText,
            trigger: self.props.tooltipTrigger
          });
          return;
        }

        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      }
    },

    created: function created() {
      Utils.bindMethods(this, ['onClick']);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      el.addEventListener('click', self.onClick);
      var ref = self.props;
      var tabbarLabel = ref.tabbarLabel;
      var tabLink = ref.tabLink;
      var tooltip = ref.tooltip;
      var tooltipTrigger = ref.tooltipTrigger;
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
            text: tooltip,
            trigger: tooltipTrigger
          });
        }
      });
    },

    updated: function updated() {
      var self = this;
      var el = self.$refs.el;
      var ref = self.props;
      var routeProps = ref.routeProps;

      if (routeProps) {
        el.f7RouteProps = routeProps;
      }
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$refs.el;
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
          'smart-select': smartSelect
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
      title: [String, Number],
      text: [String, Number],
      tabLink: [Boolean, String],
      tabLinkActive: Boolean,
      link: [Boolean, String],
      href: [Boolean, String],
      target: String,
      tooltip: String,
      tooltipTrigger: String
    }, Mixins.colorProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps),

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
        ref: 'linkEl'
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
        var tabLink = props.tabLink;
        var tabLinkActive = props.tabLinkActive;
        return Utils.classNames({
          'list-button': true,
          'tab-link': tabLink || tabLink === '',
          'tab-link-active': tabLinkActive
        }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },
    watch: {
      'props.tooltip': function watchTooltip(newText) {
        var self = this;

        if (!newText && self.f7Tooltip) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
          return;
        }

        if (newText && !self.f7Tooltip && self.$f7) {
          self.f7Tooltip = self.$f7.tooltip.create({
            targetEl: self.$refs.el,
            text: newText,
            trigger: self.props.tooltipTrigger
          });
          return;
        }

        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      }
    },

    created: function created() {
      Utils.bindMethods(this, ['onClick']);
    },

    mounted: function mounted() {
      var self = this;
      var linkEl = self.$refs.linkEl;
      var ref = self.props;
      var routeProps = ref.routeProps;
      var tooltip = ref.tooltip;
      var tooltipTrigger = ref.tooltipTrigger;

      if (routeProps) {
        linkEl.f7RouteProps = routeProps;
      }

      linkEl.addEventListener('click', self.onClick);
      self.$f7ready(function (f7) {
        if (tooltip) {
          self.f7Tooltip = f7.tooltip.create({
            targetEl: linkEl,
            text: tooltip,
            trigger: tooltipTrigger
          });
        }
      });
    },

    updated: function updated() {
      var self = this;
      var linkEl = self.$refs.linkEl;
      var ref = self.props;
      var routeProps = ref.routeProps;

      if (routeProps) {
        linkEl.f7RouteProps = routeProps;
      }
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var linkEl = self.$refs.linkEl;
      linkEl.removeEventListener('click', this.onClick);
      delete linkEl.f7RouteProps;

      if (self.f7Tooltip && self.f7Tooltip.destroy) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
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
      sortable: Boolean,
      sortableOpposite: Boolean,
      sortableTapHold: Boolean,
      sortableMoveElements: {
        type: Boolean,
        default: undefined
      }
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
      var sortableOpposite = props.sortableOpposite;
      var sortableTapHold = props.sortableTapHold;
      var sortableMoveElements = props.sortableMoveElements;
      var classes = Utils.classNames(className, 'list-group', {
        'media-list': mediaList,
        sortable: sortable,
        'sortable-tap-hold': sortableTapHold,
        'sortable-opposite': sortableOpposite
      }, Mixins.colorClasses(props));
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id,
          'data-sortable-move-elements': typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined
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
      },
      auroraItemHeight: {
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
    },

    watch: {
      'props.indexes': function watchIndexes() {
        if (!this.f7ListIndex) { return; }
        this.f7ListIndex.params.indexes = this.props.indexes;
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

  var f7ListInput = {
    name: 'f7-list-input',
    props: Object.assign({
      id: [String, Number],
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
      inputmode: String,
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
      inputStyle: [String, Object],
      pattern: String,
      validate: [Boolean, String],
      validateOnBlur: Boolean,
      onValidate: Function,
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
    }, Mixins.colorProps),

    data: function data() {
      var props = __vueComponentProps(this);

      var state = (function () {
        return {
          isSortable: props.sortable,
          inputFocused: false,
          inputInvalid: false
        };
      })();

      return {
        state: state
      };
    },

    render: function render() {
      var _h = this.$createElement;
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
      var inputmode = props.inputmode;
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
      var textEditorParams = props.textEditorParams;
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
          input = _h(InputTag, {
            ref: 'inputEl',
            style: inputStyle,
            class: inputClassName,
            domProps: Object.assign({
              disabled: disabled,
              readOnly: readonly,
              multiple: multiple,
              required: required
            }, valueProps),
            on: {
              focus: self.onFocus,
              blur: self.onBlur,
              input: self.onInput,
              change: self.onChange
            },
            attrs: {
              name: name,
              type: needsType ? inputType : undefined,
              placeholder: placeholder,
              inputmode: inputmode,
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
              'data-validate': validate === true || validate === '' || validateOnBlur === true || validateOnBlur === '' ? true : undefined,
              'data-validate-on-blur': validateOnBlur === true || validateOnBlur === '' ? true : undefined,
              tabindex: tabindex,
              'data-error-message': errorMessageForce ? undefined : errorMessage
            }
          }, [children]);
        }
        return input;
      };

      var inputEl;

      if (renderInput) {
        if (type === 'select' || type === 'textarea' || type === 'file') {
          if (type === 'select') {
            inputEl = createInput('select', self.$slots.default);
          } else if (type === 'file') {
            inputEl = createInput('input');
          } else {
            inputEl = createInput('textarea');
          }
        } else if (type === 'texteditor') {
          inputEl = _h(f7TextEditor, __vueComponentTransformJSXProps(Object.assign({}, textEditorParams, {
            on: {
              textEditorFocus: self.onFocus,
              textEditorBlur: self.onBlur,
              textEditorInput: self.onInput,
              textEditorChange: self.onChange
            },
            attrs: {
              value: value,
              resizable: resizable,
              placeholder: placeholder
            }
          })));
        } else {
          inputEl = createInput('input');
        }
      }

      var hasErrorMessage = !!errorMessage || self.$slots['error-message'] && self.$slots['error-message'].length;

      var ItemContent = _h('div', {
        ref: 'itemContentEl',
        class: Utils.classNames('item-content item-input', !wrap && className, !wrap && {
          disabled: disabled
        }, !wrap && Mixins.colorClasses(props), {
          'inline-label': inlineLabel,
          'item-input-outline': outline,
          'item-input-focused': inputFocused,
          'item-input-with-info': !!info || self.$slots.info && self.$slots.info.length,
          'item-input-with-value': inputHasValue,
          'item-input-with-error-message': hasErrorMessage && errorMessageForce || inputInvalid,
          'item-input-invalid': hasErrorMessage && errorMessageForce || inputInvalid
        })
      }, [this.$slots['content-start'], (media || self.$slots.media) && _h('div', {
        class: 'item-media'
      }, [media && _h('img', {
        attrs: {
          src: media
        }
      }), this.$slots['media']]), _h('div', {
        class: 'item-inner'
      }, [this.$slots['inner-start'], (label || self.$slots.label) && _h('div', {
        class: Utils.classNames('item-title item-label', {
          'item-floating-label': floatingLabel
        })
      }, [label, this.$slots['label']]), _h('div', {
        class: Utils.classNames('item-input-wrap', {
          'input-dropdown': dropdown === 'auto' ? type === 'select' : dropdown
        })
      }, [inputEl, this.$slots['input'], hasErrorMessage && errorMessageForce && _h('div', {
        class: 'item-input-error-message'
      }, [errorMessage, this.$slots['error-message']]), clearButton && _h('span', {
        class: 'input-clear-button'
      }), (info || self.$slots.info) && _h('div', {
        class: 'item-input-info'
      }, [info, this.$slots['info']])]), this.$slots['inner'], this.$slots['inner-end']]), this.$slots['content'], this.$slots['content-end']]);

      if (!wrap) {
        return ItemContent;
      }

      return _h('li', {
        ref: 'el',
        style: style,
        class: Utils.classNames(className, {
          disabled: disabled
        }, Mixins.colorClasses(props)),
        attrs: {
          id: id
        }
      }, [this.$slots['root-start'], ItemContent, isSortable && _h('div', {
        class: 'sortable-handler'
      }), this.$slots['root'], this.$slots['root-end']]);
    },

    watch: {
      'props.colorPickerParams': function watchValue() {
        var self = this;
        if (!self.$f7 || !self.f7ColorPicker) { return; }
        Utils.extend(self.f7ColorPicker.params, self.colorPickerParams || {});
      },
      'props.calendarParams': function watchValue() {
        var self = this;
        if (!self.$f7 || !self.f7Calendar) { return; }
        Utils.extend(self.f7Calendar.params, self.calendarParams || {});
      },
      'props.value': function watchValue() {
        var self = this;
        if (!self.$f7) { return; }
        self.updateInputOnDidUpdate = true;

        if (self.f7Calendar) {
          self.f7Calendar.setValue(self.props.value);
        }

        if (self.f7ColorPicker) {
          self.f7ColorPicker.setValue(self.props.value);
        }
      }
    },

    created: function created() {
      Utils.bindMethods(this, 'onChange onInput onFocus onBlur onTextareaResize onInputNotEmpty onInputEmpty onInputClear'.split(' '));
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      var itemContentEl = self.$refs.itemContentEl;
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
        var inputEl = self.$refs.inputEl;
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
    },

    updated: function updated() {
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
        var inputEl = self.$refs.inputEl;
        if (!inputEl) { return; }
        self.updateInputOnDidUpdate = false;

        if (validate && !validateOnBlur) {
          self.validateInput(inputEl);
        }

        if (type === 'textarea' && resizable) {
          f7.input.resizeTextarea(inputEl);
        }
      }
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var inputEl = self.$refs.inputEl;
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
    },

    methods: {
      domValue: function domValue() {
        var self = this;
        var ref = self.$refs;
        var inputEl = ref.inputEl;
        if (!inputEl) { return undefined; }
        return inputEl.value;
      },

      inputHasValue: function inputHasValue() {
        var self = this;
        var ref = self.props;
        var value = ref.value;
        var type = ref.type;

        if (type === 'datepicker' && Array.isArray(value) && value.length === 0) {
          return false;
        }

        var domValue = self.domValue();
        return typeof value === 'undefined' ? domValue || domValue === 0 : value || value === 0;
      },

      validateInput: function validateInput(inputEl) {
        var self = this;
        var f7 = self.$f7;
        if (!f7 || !inputEl) { return; }
        var validity = inputEl.validity;
        if (!validity) { return; }
        var ref = self.props;
        var onValidate = ref.onValidate;

        if (!validity.valid) {
          if (onValidate) { onValidate(false); }

          if (self.state.inputInvalid !== true) {
            self.setState({
              inputInvalid: true
            });
          }
        } else if (self.state.inputInvalid !== false) {
          if (onValidate) { onValidate(true); }
          self.setState({
            inputInvalid: false
          });
        }
      },

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

      onInput: function onInput() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var self = this;
        var ref = self.props;
        var validate = ref.validate;
        var validateOnBlur = ref.validateOnBlur;
        self.dispatchEvent.apply(self, [ 'input' ].concat( args ));

        if (!(validateOnBlur || validateOnBlur === '') && (validate || validate === '') && self.$refs && self.$refs.inputEl) {
          self.validateInput(self.$refs.inputEl);
        }
      },

      onFocus: function onFocus() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        (ref = this).dispatchEvent.apply(ref, [ 'focus' ].concat( args ));
        this.setState({
          inputFocused: true
        });
      },

      onBlur: function onBlur() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var self = this;
        var ref = self.props;
        var validate = ref.validate;
        var validateOnBlur = ref.validateOnBlur;
        self.dispatchEvent.apply(self, [ 'blur' ].concat( args ));

        if ((validate || validate === '' || validateOnBlur || validateOnBlur === '') && self.$refs && self.$refs.inputEl) {
          self.validateInput(self.$refs.inputEl);
        }

        self.setState({
          inputFocused: false
        });
      },

      onChange: function onChange() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        (ref = this).dispatchEvent.apply(ref, [ 'change' ].concat( args ));

        if (this.props.type === 'texteditor') {
          this.dispatchEvent('texteditor:change textEditorChange', args[0]);
        }
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

  var f7ListItemContent = {
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
      checkbox: Boolean,
      checked: Boolean,
      defaultChecked: Boolean,
      indeterminate: Boolean,
      radio: Boolean,
      radioIcon: String,
      name: String,
      value: [String, Number, Array],
      readonly: Boolean,
      required: Boolean,
      disabled: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var id = props.id;
      var className = props.className;
      var style = props.style;
      var radio = props.radio;
      var radioIcon = props.radioIcon;
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
      var slotsDefault = self.$slots.default;
      var flattenSlots = [];

      if (slotsDefault && slotsDefault.length) {
        slotsDefault.forEach(function (slot) {
          if (Array.isArray(slot)) { flattenSlots.push.apply(flattenSlots, slot); }else { flattenSlots.push(slot); }
        });
      }

      var passedSlotsContentStart = self.$slots['content-start'];

      if (passedSlotsContentStart && passedSlotsContentStart.length) {
        slotsContentStart.push.apply(slotsContentStart, passedSlotsContentStart);
      }

      flattenSlots.forEach(function (child) {
        if (typeof child === 'undefined') { return; }
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
            ref: 'inputEl',
            domProps: {
              checked: checked,
              readonly: readonly,
              disabled: disabled,
              required: required,
              value: value
            },
            on: {
              change: this.onChange
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
          badgeEl = _h(f7Badge, {
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
        'item-radio-icon-start': radio && radioIcon === 'start',
        'item-radio-icon-end': radio && radioIcon === 'end'
      }, Mixins.colorClasses(props));
      return _h(ItemContentTag, {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [slotsContentStart, inputEl, inputIconEl, mediaEl, innerEl, slotsContent, slotsContentEnd]);
    },

    created: function created() {
      Utils.bindMethods(this, 'onClick onChange'.split(' '));
    },

    mounted: function mounted() {
      var self = this;
      var ref = self.$refs;
      var el = ref.el;
      var inputEl = ref.inputEl;
      var ref$1 = self.props;
      var indeterminate = ref$1.indeterminate;

      if (indeterminate && inputEl) {
        inputEl.indeterminate = true;
      }

      el.addEventListener('click', self.onClick);
    },

    updated: function updated() {
      var self = this;
      var ref = self.$refs;
      var inputEl = ref.inputEl;
      var ref$1 = self.props;
      var indeterminate = ref$1.indeterminate;

      if (inputEl) {
        inputEl.indeterminate = indeterminate;
      }
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var ref = self.$refs;
      var el = ref.el;
      el.removeEventListener('click', self.onClick);
    },

    methods: {
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
      tooltip: String,
      tooltipTrigger: String,
      link: [Boolean, String],
      target: String,
      tabLink: [Boolean, String],
      tabLinkActive: Boolean,
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
      sortableOpposite: {
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
      radioIcon: String,
      checked: Boolean,
      defaultChecked: Boolean,
      indeterminate: Boolean,
      name: String,
      value: [String, Number, Array],
      readonly: Boolean,
      required: Boolean,
      disabled: Boolean,
      virtualListIndex: Number
    }, Mixins.colorProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps),

    data: function data() {
      var props = __vueComponentProps(this);

      var state = (function () {
        return {
          isMedia: props.mediaItem || props.mediaList,
          isSortable: props.sortable,
          isSortableOpposite: props.sortableOpposite,
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
      var tabLink = props.tabLink;
      var tabLinkActive = props.tabLinkActive;
      var href = props.href;
      var target = props.target;
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
      var radioIcon = props.radioIcon;
      var checked = props.checked;
      var defaultChecked = props.defaultChecked;
      var indeterminate = props.indeterminate;
      var name = props.name;
      var value = props.value;
      var readonly = props.readonly;
      var required = props.required;
      var disabled = props.disabled;
      var sortable = props.sortable;
      var sortableOpposite = props.sortableOpposite;
      var noChevron = props.noChevron;
      var chevronCenter = props.chevronCenter;
      var virtualListIndex = props.virtualListIndex;
      var isMedia = mediaItem || mediaList || self.state.isMedia;
      var isSortable = sortable || self.state.isSortable;
      var isSortableOpposite = isSortable && (sortableOpposite || self.state.isSortableOpposite);
      var isSimple = self.state.isSimple;

      if (!isSimple) {
        var needsEvents = !(link || href || accordionItem || smartSelect);
        itemContentEl = _h(f7ListItemContent, {
          on: needsEvents ? {
            click: self.onClick,
            change: self.onChange
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
            indeterminate: indeterminate,
            radio: radio,
            radioIcon: radioIcon,
            name: name,
            value: value,
            readonly: readonly,
            required: required,
            disabled: disabled
          }
        }, [this.$slots['content-start'], this.$slots['content'], this.$slots['content-end'], this.$slots['media'], this.$slots['inner-start'], this.$slots['inner'], this.$slots['inner-end'], this.$slots['after-start'], this.$slots['after'], this.$slots['after-end'], this.$slots['header'], this.$slots['footer'], this.$slots['before-title'], this.$slots['title'], this.$slots['after-title'], this.$slots['subtitle'], this.$slots['text'], swipeout || accordionItem ? null : self.$slots.default, isSortable && sortable !== false && isSortableOpposite && _h('div', {
          class: 'sortable-handler',
          slot: 'content-start'
        })]);

        if (link || href || accordionItem || smartSelect) {
          var linkAttrs = Object.assign({
            href: link === true ? '' : link || href,
            target: target,
            'data-tab': Utils.isStringProp(tabLink) && tabLink || undefined
          }, Mixins.linkRouterAttrs(props), {}, Mixins.linkActionsAttrs(props));
          var linkClasses = Utils.classNames({
            'item-link': true,
            'smart-select': smartSelect,
            'tab-link': tabLink || tabLink === '',
            'tab-link-active': tabLinkActive
          }, Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
          linkEl = _h('a', __vueComponentTransformJSXProps(Object.assign({
            ref: 'linkEl',
            class: linkClasses
          }, linkAttrs)), [itemContentEl]);
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
        return _h('li', {
          ref: 'el',
          style: style,
          class: liClasses,
          attrs: {
            id: id,
            'data-virtual-list-index': virtualListIndex
          }
        }, [_h('span', [this.$slots['default'] || [title]])]);
      }

      if (isSimple) {
        return _h('li', {
          ref: 'el',
          style: style,
          class: liClasses,
          attrs: {
            id: id,
            'data-virtual-list-index': virtualListIndex
          }
        }, [title, this.$slots['default']]);
      }

      var linkItemEl = link || href || smartSelect || accordionItem ? linkEl : itemContentEl;
      return _h('li', {
        ref: 'el',
        style: style,
        class: liClasses,
        attrs: {
          id: id,
          'data-virtual-list-index': virtualListIndex
        }
      }, [this.$slots['root-start'], swipeout ? _h('div', {
        class: 'swipeout-content'
      }, [linkItemEl]) : linkItemEl, isSortable && sortable !== false && !isSortableOpposite && _h('div', {
        class: 'sortable-handler'
      }), (swipeout || accordionItem) && self.$slots.default, this.$slots['root'], this.$slots['root-end']]);
    },

    watch: {
      'props.tooltip': function watchTooltip(newText) {
        var self = this;

        if (!newText && self.f7Tooltip) {
          self.f7Tooltip.destroy();
          self.f7Tooltip = null;
          delete self.f7Tooltip;
          return;
        }

        if (newText && !self.f7Tooltip && self.$f7) {
          self.f7Tooltip = self.$f7.tooltip.create({
            targetEl: self.$refs.el,
            text: newText,
            trigger: self.props.tooltipTrigger
          });
          return;
        }

        if (!newText || !self.f7Tooltip) { return; }
        self.f7Tooltip.setText(newText);
      },
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
      Utils.bindMethods(this, ['onClick', 'onChange', 'onSwipeoutOpen', 'onSwipeoutOpened', 'onSwipeoutClose', 'onSwipeoutClosed', 'onSwipeoutDelete', 'onSwipeoutDeleted', 'onSwipeoutOverswipeEnter', 'onSwipeoutOverswipeExit', 'onSwipeout', 'onAccBeforeOpen', 'onAccOpen', 'onAccOpened', 'onAccBeforeClose', 'onAccClose', 'onAccClosed']);
    },

    mounted: function mounted() {
      var self = this;
      var ref = self.$refs;
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
      var tooltipTrigger = ref$1.tooltipTrigger;
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
          isSortable: self.$listEl.hasClass('sortable'),
          isSortableOpposite: self.$listEl.hasClass('sortable-opposite')
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
            text: tooltip,
            trigger: tooltipTrigger
          });
        }
      });
    },

    updated: function updated() {
      var self = this;
      var $listEl = self.$listEl;
      var ref = self.$refs;
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
      var isSortableOpposite = $listEl.hasClass('sortable-opposite');

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

        if (isSortableOpposite !== self.state.isSortableOpposite) {
          self.setState({
            isSortableOpposite: isSortableOpposite
          });
        }
      }
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var ref = self.$refs;
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
    },

    methods: {
      onClick: function onClick(event) {
        var self = this;

        if (event.target.tagName.toLowerCase() !== 'input') {
          self.dispatchEvent('click', event);
        }
      },

      onSwipeoutOverswipeEnter: function onSwipeoutOverswipeEnter(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:overswipeenter swipeoutOverswipeEnter');
      },

      onSwipeoutOverswipeExit: function onSwipeoutOverswipeExit(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:overswipeexit swipeoutOverswipeExit');
      },

      onSwipeoutDeleted: function onSwipeoutDeleted(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:deleted swipeoutDeleted');
      },

      onSwipeoutDelete: function onSwipeoutDelete(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:delete swipeoutDelete');
      },

      onSwipeoutClose: function onSwipeoutClose(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:close swipeoutClose');
      },

      onSwipeoutClosed: function onSwipeoutClosed(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:closed swipeoutClosed');
      },

      onSwipeoutOpen: function onSwipeoutOpen(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:open swipeoutOpen');
      },

      onSwipeoutOpened: function onSwipeoutOpened(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout:opened swipeoutOpened');
      },

      onSwipeout: function onSwipeout(el, progress) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('swipeout', progress);
      },

      onAccBeforeClose: function onAccBeforeClose(el, prevent) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordion:beforeclose accordionBeforeClose', prevent);
      },

      onAccClose: function onAccClose(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordion:close accordionClose');
      },

      onAccClosed: function onAccClosed(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordion:closed accordionClosed');
      },

      onAccBeforeOpen: function onAccBeforeOpen(el, prevent) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordion:beforeopen accordionBeforeOpen', prevent);
      },

      onAccOpen: function onAccOpen(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordion:open accordionOpen');
      },

      onAccOpened: function onAccOpened(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('accordion:opened accordionOpened');
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
      sortableOpposite: Boolean,
      accordionList: Boolean,
      accordionOpposite: Boolean,
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
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var form = props.form;
      var sortableMoveElements = props.sortableMoveElements;
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

        if (!tag && 'vue' === 'react' || tag && !(tag === 'li' || tag === 'F7ListItem' || tag === 'F7ListButton' || tag === 'F7ListInput' || tag.indexOf('list-item') >= 0 || tag.indexOf('list-button') >= 0 || tag.indexOf('list-input') >= 0 || tag.indexOf('f7-list-item') >= 0 || tag.indexOf('f7-list-button') >= 0 || tag.indexOf('f7-list-input') >= 0)) {
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
            id: id,
            'data-sortable-move-elements': typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined
          }
        }, [self.$slots['before-list'], rootChildrenBeforeList, _h('ul', [ulChildren]), self.$slots['after-list'], rootChildrenAfterList]);
      } else {
        return _h(ListTag, {
          ref: 'el',
          style: style,
          class: self.classes,
          attrs: {
            id: id,
            'data-sortable-move-elements': typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined
          }
        }, [self.$slots['before-list'], rootChildrenBeforeList, self.$slots['after-list'], rootChildrenAfterList]);
      }
    },

    computed: {
      classes: function classes() {
        var self = this;
        var props = self.props;
        var inset = props.inset;
        var xsmallInset = props.xsmallInset;
        var smallInset = props.smallInset;
        var mediumInset = props.mediumInset;
        var largeInset = props.largeInset;
        var xlargeInset = props.xlargeInset;
        var mediaList = props.mediaList;
        var simpleList = props.simpleList;
        var linksList = props.linksList;
        var sortable = props.sortable;
        var sortableTapHold = props.sortableTapHold;
        var sortableEnabled = props.sortableEnabled;
        var sortableOpposite = props.sortableOpposite;
        var accordionList = props.accordionList;
        var accordionOpposite = props.accordionOpposite;
        var contactsList = props.contactsList;
        var virtualList = props.virtualList;
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
          'sortable-opposite': sortableOpposite,
          'accordion-list': accordionList,
          'accordion-opposite': accordionOpposite,
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
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },

    created: function created() {
      Utils.bindMethods(this, ['onSortableEnable', 'onSortableDisable', 'onSortableSort', 'onTabShow', 'onTabHide', 'onSubmit']);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      var ref = self.props;
      var virtualList = ref.virtualList;
      var virtualListParams = ref.virtualListParams;
      var form = ref.form;
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
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$refs.el;
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
    },

    methods: {
      onSubmit: function onSubmit(event) {
        this.dispatchEvent('submit', event);
      },

      onSortableEnable: function onSortableEnable(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('sortable:enable sortableEnable');
      },

      onSortableDisable: function onSortableDisable(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('sortable:disable sortableDisable');
      },

      onSortableSort: function onSortableSort(el, sortData, listEl) {
        if (this.eventTargetEl !== listEl) { return; }
        this.dispatchEvent('sortable:sort sortableSort', sortData);
      },

      onTabShow: function onTabShow(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('tab:show tabShow', el);
      },

      onTabHide: function onTabHide(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('tab:hide tabHide', el);
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

    created: function created() {
      Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed']);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
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
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7LoginScreen) { self.f7LoginScreen.destroy(); }
    },

    methods: {
      onOpen: function onOpen(instance) {
        this.dispatchEvent('loginscreen:open loginScreenOpen', instance);
      },

      onOpened: function onOpened(instance) {
        this.dispatchEvent('loginscreen:opened loginScreenOpened', instance);
      },

      onClose: function onClose(instance) {
        this.dispatchEvent('loginscreen:close loginScreenClose', instance);
      },

      onClosed: function onClosed(instance) {
        this.dispatchEvent('loginscreen:closed loginScreenClosed', instance);
      },

      open: function open(animate) {
        var self = this;
        if (!self.f7LoginScreen) { return undefined; }
        return self.f7LoginScreen.open(animate);
      },

      close: function close(animate) {
        var self = this;
        if (!self.f7LoginScreen) { return undefined; }
        return self.f7LoginScreen.close(animate);
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

  var f7MenuDropdownItem = {
    name: 'f7-menu-dropdown-item',
    props: Object.assign({
      id: [String, Number],
      text: String,
      link: Boolean,
      href: String,
      target: String,
      divider: Boolean
    }, Mixins.colorProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps),

    render: function render() {
      var _h = this.$createElement;
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
      return _h(Tag, __vueComponentTransformJSXProps(Object.assign({
        ref: 'el',
        class: classes,
        style: style
      }, self.attrs, {
        attrs: {
          id: id
        }
      })), [text, this.$slots['default']]);
    },

    created: function created() {
      Utils.bindMethods(this, ['onClick']);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      if (!el) { return; }
      el.addEventListener('click', self.onClick);
      var ref = self.props;
      var routeProps = ref.routeProps;
      if (routeProps) { el.f7RouteProps = routeProps; }
    },

    updated: function updated() {
      var self = this;
      var el = self.$refs.el;
      if (!el) { return; }
      var ref = self.props;
      var routeProps = ref.routeProps;
      if (routeProps) { el.f7RouteProps = routeProps; }
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$refs.el;
      if (!el) { return; }
      el.removeEventListener('click', self.onClick);
      delete el.f7RouteProps;
    },

    computed: {
      attrs: function attrs() {
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

  var f7MenuDropdown = {
    name: 'f7-menu-dropdown',
    props: Object.assign({
      id: [String, Number],
      contentHeight: String,
      position: String,
      left: Boolean,
      center: Boolean,
      right: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      return _h('div', {
        class: classes,
        style: style,
        attrs: {
          id: id
        }
      }, [_h('div', {
        class: 'menu-dropdown-content',
        style: {
          height: contentHeight
        }
      }, [this.$slots['default']])]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7MenuItem = {
    name: 'f7-menu-item',
    props: Object.assign({
      id: [String, Number],
      text: String,
      iconOnly: Boolean,
      href: String,
      link: Boolean,
      target: String,
      dropdown: Boolean
    }, Mixins.colorProps, {}, Mixins.linkIconProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps),

    render: function render() {
      var _h = this.$createElement;
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
      var iconF7 = props.iconF7;
      var iconMd = props.iconMd;
      var iconIos = props.iconIos;
      var iconAurora = props.iconAurora;
      var slots = self.$slots;
      var iconEl;
      var iconOnlyComputed;

      if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
        iconEl = _h(f7Icon, {
          attrs: {
            material: iconMaterial,
            f7: iconF7,
            icon: icon,
            md: iconMd,
            ios: iconIos,
            aurora: iconAurora,
            color: iconColor,
            size: iconSize
          }
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
      return _h(Tag, __vueComponentTransformJSXProps(Object.assign({
        ref: 'el',
        class: classes,
        style: style
      }, self.attrs, {
        attrs: {
          id: id
        }
      })), [(text || slots.text && slots.text.length || iconEl) && _h('div', {
        class: 'menu-item-content'
      }, [text, iconEl, this.$slots['text']]), this.$slots['default']]);
    },

    created: function created() {
      Utils.bindMethods(this, ['onClick', 'onOpened', 'onClosed']);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      if (!el) { return; }
      self.eventTargetEl = el;
      el.addEventListener('click', self.onClick);
      var ref = self.props;
      var routeProps = ref.routeProps;
      if (routeProps) { el.f7RouteProps = routeProps; }
      self.$f7ready(function (f7) {
        f7.on('menuOpened', self.onOpened);
        f7.on('menuClosed', self.onClosed);
      });
    },

    updated: function updated() {
      var self = this;
      var el = self.$refs.el;
      if (!el) { return; }
      var ref = self.props;
      var routeProps = ref.routeProps;
      if (routeProps) { el.f7RouteProps = routeProps; }
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$refs.el;
      if (!el || !self.$f7) { return; }
      el.removeEventListener('click', self.onClick);
      self.$f7.off('menuOpened', self.onOpened);
      self.$f7.off('menuClosed', self.onOpened);
      self.eventTargetEl = null;
      delete el.f7RouteProps;
      delete self.eventTargetEl;
    },

    computed: {
      attrs: function attrs() {
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
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },
    methods: {
      onClick: function onClick(e) {
        this.dispatchEvent('click', e);
      },

      onOpened: function onOpened(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('menuOpened menu:opened', el);
      },

      onClosed: function onClosed(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('menuClosed menu:closed', el);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    }
  };

  var f7Menu = {
    name: 'f7-menu',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var id = props.id;
      var className = props.className;
      var style = props.style;
      return _h('div', {
        class: Utils.classNames('menu', Mixins.colorClasses(props), className),
        style: style,
        attrs: {
          id: id
        }
      }, [_h('div', {
        class: 'menu-inner'
      }, [this.$slots['default']])]);
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
        ref: 'el',
        style: style,
        class: self.classes,
        attrs: {
          id: id
        }
      }, [slotsStart, (avatar || slotsAvatar) && _h('div', {
        ref: 'avatarEl',
        class: 'message-avatar',
        style: {
          backgroundImage: avatar && ("url(" + avatar + ")")
        }
      }, [slotsAvatar]), _h('div', {
        class: 'message-content'
      }, [slotsContentStart, (slotsName || name) && _h('div', {
        ref: 'nameEl',
        class: 'message-name'
      }, [slotsName || name]), (slotsHeader || header) && _h('div', {
        ref: 'headerEl',
        class: 'message-header'
      }, [slotsHeader || header]), _h('div', {
        ref: 'bubbleEl',
        class: 'message-bubble'
      }, [slotsBubbleStart, (slotsImage || image) && _h('div', {
        class: 'message-image'
      }, [slotsImage || _h('img', {
        attrs: {
          src: image
        }
      })]), (slotsTextHeader || textHeader) && _h('div', {
        class: 'message-text-header'
      }, [slotsTextHeader || textHeader]), (slotsText || text || typing) && _h('div', {
        ref: 'textEl',
        class: 'message-text'
      }, [slotsText || text, typing && _h('div', {
        class: 'message-typing-indicator'
      }, [_h('div'), _h('div'), _h('div')])]), (slotsTextFooter || textFooter) && _h('div', {
        class: 'message-text-footer'
      }, [slotsTextFooter || textFooter]), slotsBubbleEnd, slotsDefault]), (slotsFooter || footer) && _h('div', {
        ref: 'footerEl',
        class: 'message-footer'
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

    created: function created() {
      Utils.bindMethods(this, ['onClick', 'onNameClick', 'onTextClick', 'onAvatarClick', 'onHeaderClick', 'onFooterClick', 'onBubbleClick']);
    },

    mounted: function mounted() {
      var ref = this.$refs;
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
    },

    beforeDestroy: function beforeDestroy() {
      var ref = this.$refs;
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
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [image && _h('img', {
        attrs: {
          src: image
        }
      }), deletable && _h('span', {
        ref: 'deleteEl',
        class: 'messagebar-attachment-delete'
      }), this.$slots['default']]);
    },

    created: function created() {
      Utils.bindMethods(this, ['onClick', 'onDeleteClick']);
    },

    mounted: function mounted() {
      this.$refs.el.addEventListener('click', this.onClick);

      if (this.$refs.deleteEl) {
        this.$refs.deleteEl.addEventListener('click', this.onDeleteClick);
      }
    },

    beforeDestroy: function beforeDestroy() {
      this.$refs.el.removeEventListener('click', this.onClick);

      if (this.$refs.deleteEl) {
        this.$refs.deleteEl.removeEventListener('click', this.onDeleteClick);
      }
    },

    methods: {
      onClick: function onClick(event) {
        this.dispatchEvent('attachment:click attachmentClick', event);
      },

      onDeleteClick: function onDeleteClick(event) {
        this.dispatchEvent('attachment:delete attachmentDelete', event);
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
          ref: 'inputEl',
          domProps: {
            checked: checked
          },
          on: {
            change: self.onChange
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

    created: function created() {
      Utils.bindMethods(this, ['onChange']);
    },

    methods: {
      onChange: function onChange(event) {
        if (this.props.checked) { this.dispatchEvent('checked', event); }else { this.dispatchEvent('unchecked', event); }
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
    }, Mixins.colorProps),

    created: function created() {
      Utils.bindMethods(this, ['onChange', 'onInput', 'onFocus', 'onBlur', 'onClick', 'onAttachmentDelete', 'onAttachmentClick,', 'onResizePage']);
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

      var valueProps = {};
      if ('value' in self.props) { valueProps.value = value; }
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
      }, [slotsBeforeArea, messagebarAttachmentsEl, _h(f7Input, __vueComponentTransformJSXProps(Object.assign({
        ref: 'area'
      }, valueProps, {
        on: {
          input: self.onInput,
          change: self.onChange,
          focus: self.onFocus,
          blur: self.onBlur
        },
        attrs: {
          type: 'textarea',
          wrap: false,
          placeholder: placeholder,
          disabled: disabled,
          name: name,
          readonly: readonly,
          resizable: resizable
        }
      }))), slotsAfterArea]), (sendLink && sendLink.length > 0 || slotsSendLink) && _h(f7Link, {
        on: {
          click: self.onClick
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
        var value;
        {
          value = self.$refs.area.$refs.inputEl.value;
        }
        var clear = self.f7Messagebar ? function () {
          self.f7Messagebar.clear();
        } : function () {};
        this.dispatchEvent('submit', value, clear);
        this.dispatchEvent('send', value, clear);
        this.dispatchEvent('click', event);
      },

      onAttachmentDelete: function onAttachmentDelete(instance, attachmentEl, attachmentElIndex) {
        this.dispatchEvent('messagebar:attachmentdelete messagebarAttachmentDelete', instance, attachmentEl, attachmentElIndex);
      },

      onAttachmentClick: function onAttachmentClick(instance, attachmentEl, attachmentElIndex) {
        this.dispatchEvent('messagebar:attachmentclick messagebarAttachmentClick', instance, attachmentEl, attachmentElIndex);
      },

      onResizePage: function onResizePage(instance) {
        this.dispatchEvent('messagebar:resizepage messagebarResizePage', instance);
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

  var f7NavLeft = {
    name: 'f7-nav-left',
    props: Object.assign({
      id: [String, Number],
      backLink: [Boolean, String],
      backLinkUrl: String,
      backLinkForce: Boolean,
      backLinkShowText: {
        type: Boolean,
        default: undefined
      },
      sliding: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
        var text = backLink !== true && needBackLinkText ? backLink : undefined;
        linkEl = _h(f7Link, {
          class: !text ? 'icon-only' : undefined,
          on: {
            click: this.onBackClick
          },
          attrs: {
            href: backLinkUrl || '#',
            back: true,
            icon: 'icon-back',
            force: backLinkForce || undefined,
            text: text
          }
        });
      }

      var classes = Utils.classNames(className, 'left', {
        sliding: sliding
      }, Mixins.colorClasses(props));
      var children = [];
      var slots = this.$slots;

      if (slots && Object.keys(slots).length) {
        Object.keys(slots).forEach(function (key) {
          children.push.apply(children, slots[key]);
        });
      }

      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [linkEl, children]);
    },

    created: function created() {
      Utils.bindMethods(this, ['onBackClick']);
    },

    methods: {
      onBackClick: function onBackClick(event) {
        this.dispatchEvent('back-click backClick click:back clickBack', event);
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
      var children = [];
      var slots = this.$slots;

      if (slots && Object.keys(slots).length) {
        Object.keys(slots).forEach(function (key) {
          children.push.apply(children, slots[key]);
        });
      }

      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [children]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7NavTitleLarge = {
    name: 'f7-nav-title',
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var classes = Utils.classNames(className, 'title-large', Mixins.colorClasses(props));
      var children = [];
      var slots = self.$slots;

      if (slots && Object.keys(slots).length) {
        Object.keys(slots).forEach(function (key) {
          children.push.apply(children, slots[key]);
        });
      }

      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [_h('div', {
        class: 'title-large-text'
      }, [children])]);
    },

    computed: {
      props: function props() {
        return __vueComponentProps(this);
      }

    }
  };

  var f7NavTitle = {
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

      if (subtitle) {
        subtitleEl = _h('span', {
          class: 'subtitle'
        }, [subtitle]);
      }

      var classes = Utils.classNames(className, 'title', {
        sliding: sliding
      }, Mixins.colorClasses(props));
      var children;
      var slots = self.$slots;

      if (slots && Object.keys(slots).length) {
        children = [];
        Object.keys(slots).forEach(function (key) {
          children.push.apply(children, slots[key]);
        });
      }

      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [children, !children && title, !children && subtitleEl]);
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
      transparent: Boolean,
      titleLarge: String
    }, Mixins.colorProps),

    data: function data() {
      var this$1 = this;

      var props = __vueComponentProps(this);

      var state = (function () {
        var self = this$1;
        var $f7 = self.$f7;

        if (!$f7) {
          self.$f7ready(function () {
            self.setState({
              _theme: self.$theme
            });
          });
        }

        return {
          _theme: $f7 ? self.$theme : null,
          routerPositionClass: '',
          largeCollapsed: false,
          routerNavbarRole: null,
          routerNavbarRoleDetailRoot: false,
          routerNavbarMasterStack: false,
          transparentVisible: false
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
      var backLink = props.backLink;
      var backLinkUrl = props.backLinkUrl;
      var backLinkForce = props.backLinkForce;
      var backLinkShowText = props.backLinkShowText;
      var sliding = props.sliding;
      var title = props.title;
      var subtitle = props.subtitle;
      var innerClass = props.innerClass;
      var innerClassName = props.innerClassName;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var hidden = props.hidden;
      var noShadow = props.noShadow;
      var noHairline = props.noHairline;
      var large = props.large;
      var largeTransparent = props.largeTransparent;
      var transparent = props.transparent;
      var titleLarge = props.titleLarge;
      var ref = self.state;
      var theme = ref._theme;
      var routerPositionClass = ref.routerPositionClass;
      var largeCollapsed = ref.largeCollapsed;
      var transparentVisible = ref.transparentVisible;
      var leftEl;
      var titleEl;
      var rightEl;
      var titleLargeEl;
      var addLeftTitleClass = theme && theme.ios && self.$f7 && !self.$f7.params.navbar.iosCenterTitle;
      var addCenterTitleClass = theme && theme.md && self.$f7 && self.$f7.params.navbar.mdCenterTitle || theme && theme.aurora && self.$f7 && self.$f7.params.navbar.auroraCenterTitle;
      var slots = self.$slots;
      var isLarge = large || largeTransparent;
      var isTransparent = transparent || isLarge && largeTransparent;
      var isTransparentVisible = isTransparent && transparentVisible;
      var classes = Utils.classNames(className, 'navbar', routerPositionClass && routerPositionClass, {
        'navbar-hidden': hidden,
        'navbar-large': isLarge,
        'navbar-large-collapsed': isLarge && largeCollapsed,
        'navbar-transparent': isTransparent,
        'navbar-transparent-visible': isTransparentVisible,
        'navbar-master': this.state.routerNavbarRole === 'master',
        'navbar-master-detail': this.state.routerNavbarRole === 'detail',
        'navbar-master-detail-root': this.state.routerNavbarRoleDetailRoot === true,
        'navbar-master-stacked': this.state.routerNavbarMasterStack === true,
        'no-shadow': noShadow,
        'no-hairline': noHairline
      }, Mixins.colorClasses(props));

      if (backLink || slots['nav-left'] || slots.left) {
        leftEl = _h(f7NavLeft, {
          on: {
            backClick: self.onBackClick
          },
          attrs: {
            backLink: backLink,
            backLinkUrl: backLinkUrl,
            backLinkForce: backLinkForce,
            backLinkShowText: backLinkShowText
          }
        }, [slots['nav-left'], slots.left]);
      }

      if (title || subtitle || slots.title) {
        titleEl = _h(f7NavTitle, {
          attrs: {
            title: title,
            subtitle: subtitle
          }
        }, [slots.title]);
      }

      if (slots['nav-right'] || slots.right) {
        rightEl = _h(f7NavRight, [slots['nav-right'], slots.right]);
      }

      var largeTitle = titleLarge;
      if (!largeTitle && large && title) { largeTitle = title; }

      if (largeTitle || slots['title-large']) {
        titleLargeEl = _h('div', {
          class: 'title-large'
        }, [_h('div', {
          class: 'title-large-text'
        }, [largeTitle || '', this.$slots['title-large']])]);
      }

      var innerEl = _h('div', {
        class: Utils.classNames('navbar-inner', innerClass, innerClassName, {
          sliding: sliding,
          'navbar-inner-left-title': addLeftTitleClass,
          'navbar-inner-centered-title': addCenterTitleClass
        })
      }, [leftEl, titleEl, rightEl, titleLargeEl, this.$slots['default']]);

      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [_h('div', {
        class: 'navbar-bg'
      }), this.$slots['before-inner'], innerEl, this.$slots['after-inner']]);
    },

    created: function created() {
      Utils.bindMethods(this, ['onBackClick', 'onHide', 'onShow', 'onExpand', 'onCollapse', 'onNavbarPosition', 'onNavbarRole', 'onNavbarMasterStack', 'onNavbarMasterUnstack', 'onTransparentHide', 'onTransparentShow']);
    },

    mounted: function mounted() {
      var self = this;
      var ref = self.$refs;
      var el = ref.el;
      if (!el) { return; }
      self.$f7ready(function (f7) {
        self.eventTargetEl = el;
        f7.on('navbarShow', self.onShow);
        f7.on('navbarHide', self.onHide);
        f7.on('navbarCollapse', self.onCollapse);
        f7.on('navbarExpand', self.onExpand);
        f7.on('navbarPosition', self.onNavbarPosition);
        f7.on('navbarRole', self.onNavbarRole);
        f7.on('navbarMasterStack', self.onNavbarMasterStack);
        f7.on('navbarMasterUnstack', self.onNavbarMasterUnstack);
        f7.on('navbarTransparentShow', self.onNavbarTransparentShow);
        f7.on('navbarTransparentHide', self.onNavbarTransparentHide);
      });
    },

    updated: function updated() {
      var self = this;
      if (!self.$f7) { return; }
      var el = self.$refs.el;
      self.$f7.navbar.size(el);
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var ref = self.$refs;
      var el = ref.el;
      if (!el || !self.$f7) { return; }
      var f7 = self.$f7;
      f7.off('navbarShow', self.onShow);
      f7.off('navbarHide', self.onHide);
      f7.off('navbarCollapse', self.onCollapse);
      f7.off('navbarExpand', self.onExpand);
      f7.off('navbarPosition', self.onNavbarPosition);
      f7.off('navbarRole', self.onNavbarRole);
      f7.off('navbarMasterStack', self.onNavbarMasterStack);
      f7.off('navbarMasterUnstack', self.onNavbarMasterUnstack);
      f7.off('navbarTransparentShow', self.onNavbarTransparentShow);
      f7.off('navbarTransparentHide', self.onNavbarTransparentHide);
      self.eventTargetEl = null;
      delete self.eventTargetEl;
    },

    methods: {
      onHide: function onHide(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.dispatchEvent('navbar:hide navbarHide');
      },

      onShow: function onShow(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.dispatchEvent('navbar:show navbarShow');
      },

      onExpand: function onExpand(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.setState({
          largeCollapsed: false
        });
        this.dispatchEvent('navbar:expand navbarExpand');
      },

      onCollapse: function onCollapse(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.setState({
          largeCollapsed: true
        });
        this.dispatchEvent('navbar:collapse navbarCollapse');
      },

      onNavbarTransparentShow: function onNavbarTransparentShow(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.setState({
          transparentVisible: true
        });
        this.dispatchEvent('navbar:transparentshow navbarTransparentShow');
      },

      onNavbarTransparentHide: function onNavbarTransparentHide(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.setState({
          transparentVisible: false
        });
        this.dispatchEvent('navbar:transparenthide navbarTransparentHide');
      },

      onNavbarPosition: function onNavbarPosition(navbarEl, position) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.setState({
          routerPositionClass: position ? ("navbar-" + position) : ''
        });
      },

      onNavbarRole: function onNavbarRole(navbarEl, rolesData) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.setState({
          routerNavbarRole: rolesData.role,
          routerNavbarRoleDetailRoot: rolesData.detailRoot
        });
      },

      onNavbarMasterStack: function onNavbarMasterStack(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.setState({
          routerNavbarMasterStack: true
        });
      },

      onNavbarMasterUnstack: function onNavbarMasterUnstack(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.setState({
          routerNavbarMasterStack: false
        });
      },

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

      onBackClick: function onBackClick(event) {
        this.dispatchEvent('back-click backClick click:back clickBack', event);
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

  var f7Preloader = {
    name: 'f7-preloader',
    props: Object.assign({
      id: [String, Number],
      size: [Number, String]
    }, Mixins.colorProps),

    data: function data() {
      var this$1 = this;

      var props = __vueComponentProps(this);

      var state = (function () {
        var self = this$1;
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
      })();

      return {
        state: state
      };
    },

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var sizeComputed = self.sizeComputed;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var className = props.className;
      var theme = self.state._theme;
      var preloaderStyle = {};

      if (sizeComputed) {
        preloaderStyle.width = sizeComputed + "px";
        preloaderStyle.height = sizeComputed + "px";
        preloaderStyle['--f7-preloader-size'] = sizeComputed + "px";
      }

      if (style) { Utils.extend(preloaderStyle, style || {}); }
      var innerEl;

      if (theme && theme.md) {
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
      } else if (theme && theme.ios) {
        innerEl = _h('span', {
          class: 'preloader-inner'
        }, [_h('span', {
          class: 'preloader-inner-line'
        }), _h('span', {
          class: 'preloader-inner-line'
        }), _h('span', {
          class: 'preloader-inner-line'
        }), _h('span', {
          class: 'preloader-inner-line'
        }), _h('span', {
          class: 'preloader-inner-line'
        }), _h('span', {
          class: 'preloader-inner-line'
        }), _h('span', {
          class: 'preloader-inner-line'
        }), _h('span', {
          class: 'preloader-inner-line'
        }), _h('span', {
          class: 'preloader-inner-line'
        }), _h('span', {
          class: 'preloader-inner-line'
        }), _h('span', {
          class: 'preloader-inner-line'
        }), _h('span', {
          class: 'preloader-inner-line'
        })]);
      } else if (theme && theme.aurora) {
        innerEl = _h('span', {
          class: 'preloader-inner'
        }, [_h('span', {
          class: 'preloader-inner-circle'
        })]);
      } else if (!theme) {
        innerEl = _h('span', {
          class: 'preloader-inner'
        });
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

    },
    methods: {
      setState: function setState(updater, callback) {
        __vueComponentSetState(this, updater, callback);
      }

    }
  };

  var f7PageContent = {
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
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
        ptrEl = _h('div', {
          class: 'ptr-preloader'
        }, [_h(f7Preloader), _h('div', {
          class: 'ptr-arrow'
        })]);
      }

      if (infinite && infinitePreloader) {
        infiniteEl = _h(f7Preloader, {
          class: 'infinite-scroll-preloader'
        });
      }

      return _h('div', {
        style: style,
        class: self.classes,
        ref: 'el',
        attrs: {
          id: id,
          'data-ptr-distance': ptrDistance || undefined,
          'data-ptr-mousewheel': ptrMousewheel || undefined,
          'data-infinite-distance': infiniteDistance || undefined
        }
      }, [ptrBottom ? null : ptrEl, infiniteTop ? infiniteEl : null, self.$slots.default, infiniteTop ? null : infiniteEl, ptrBottom ? ptrEl : null]);
    },

    computed: {
      classes: function classes() {
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
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },

    created: function created() {
      Utils.bindMethods(this, ['onPtrPullStart', 'onPtrPullMove', 'onPtrPullEnd', 'onPtrRefresh', 'onPtrDone', 'onInfinite', 'onTabShow', 'onTabHide']);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      var ref = self.props;
      var ptr = ref.ptr;
      var infinite = ref.infinite;
      var tab = ref.tab;
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
    },

    beforeDestroy: function beforeDestroy() {
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
    },

    methods: {
      onPtrPullStart: function onPtrPullStart(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('ptr:pullstart ptrPullStart');
      },

      onPtrPullMove: function onPtrPullMove(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('ptr:pullmove ptrPullMove');
      },

      onPtrPullEnd: function onPtrPullEnd(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('ptr:pullend ptrPullEnd');
      },

      onPtrRefresh: function onPtrRefresh(el, done) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('ptr:refresh ptrRefresh', done);
      },

      onPtrDone: function onPtrDone(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('ptr:done ptrDone');
      },

      onInfinite: function onInfinite(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('infinite');
      },

      onTabShow: function onTabShow(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('tab:show tabShow', el);
      },

      onTabHide: function onTabHide(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('tab:hide tabHide', el);
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
    }, Mixins.colorProps),

    data: function data() {
      var props = __vueComponentProps(this);

      var state = (function () {
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
      var ref = self.$slots;
      var slotsStatic = ref.static;
      var slotsFixed = ref.fixed;
      var slotsDefault = ref.default;
      var fixedTags;
      fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ');
      var hasSubnavbar;
      var hasMessages;
      var hasNavbarLarge;
      hasMessages = self.$options.propsData.messagesContent;

      if (slotsDefault) {
        slotsDefault.forEach(function (child) {
          if (typeof child === 'undefined') { return; }
          var isFixedTag = false;
          {
            var tag = child.tag;

            if (!tag) {
              if (pageContent) { staticList.push(child); }
              return;
            }

            if (tag.indexOf('subnavbar') >= 0) { hasSubnavbar = true; }

            if (tag.indexOf('navbar') >= 0) {
              if (child.componentOptions && child.componentOptions.propsData && 'large' in child.componentOptions.propsData && (child.componentOptions.propsData.large || child.componentOptions.propsData.large === '')) {
                hasNavbarLarge = true;
              }
            }

            if (typeof hasMessages === 'undefined' && tag.indexOf('messages') >= 0) { hasMessages = true; }

            for (var j = 0; j < fixedTags.length; j += 1) {
              if (tag.indexOf(fixedTags[j]) >= 0) {
                isFixedTag = true;
              }
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

      var pageContentEl = _h(f7PageContent, {
        on: {
          ptrPullStart: self.onPtrPullStart,
          ptrPullMove: self.onPtrPullMove,
          ptrPullEnd: self.onPtrPullEnd,
          ptrRefresh: self.onPtrRefresh,
          ptrDone: self.onPtrDone,
          infinite: self.onInfinite
        },
        attrs: {
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

    created: function created() {
      Utils.bindMethods(this, ['onPtrPullStart', 'onPtrPullMove', 'onPtrPullEnd', 'onPtrRefresh', 'onPtrDone', 'onInfinite', 'onPageMounted', 'onPageInit', 'onPageReinit', 'onPageBeforeIn', 'onPageBeforeOut', 'onPageAfterOut', 'onPageAfterIn', 'onPageBeforeRemove', 'onPageBeforeUnmount', 'onPageStack', 'onPageUnstack', 'onPagePosition', 'onPageRole', 'onPageMasterStack', 'onPageMasterUnstack', 'onPageNavbarLargeCollapsed', 'onPageNavbarLargeExpanded', 'onCardOpened', 'onCardClose', 'onPageTabShow', 'onPageTabHide']);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
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
        f7.on('pageBeforeUnmount', self.onPageBeforeUnmount);
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
        f7.on('pageTabShow', self.onPageTabShow);
        f7.on('pageTabHide', self.onPageTabHide);
      });
    },

    beforeDestroy: function beforeDestroy() {
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
      f7.off('pageBeforeUnmount', self.onPageBeforeUnmount);
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
      f7.off('pageTabShow', self.onPageTabShow);
      f7.off('pageTabHide', self.onPageTabHide);
      self.eventTargetEl = null;
      delete self.eventTargetEl;
    },

    methods: {
      onPtrPullStart: function onPtrPullStart() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        (ref = this).dispatchEvent.apply(ref, [ 'ptr:pullstart ptrPullStart' ].concat( args ));
      },

      onPtrPullMove: function onPtrPullMove() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        (ref = this).dispatchEvent.apply(ref, [ 'ptr:pullmove ptrPullMove' ].concat( args ));
      },

      onPtrPullEnd: function onPtrPullEnd() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        (ref = this).dispatchEvent.apply(ref, [ 'ptr:pullend ptrPullEnd' ].concat( args ));
      },

      onPtrRefresh: function onPtrRefresh() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        (ref = this).dispatchEvent.apply(ref, [ 'ptr:refresh ptrRefresh' ].concat( args ));
      },

      onPtrDone: function onPtrDone() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        (ref = this).dispatchEvent.apply(ref, [ 'ptr:done ptrDone' ].concat( args ));
      },

      onInfinite: function onInfinite() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        (ref = this).dispatchEvent.apply(ref, [ 'infinite' ].concat( args ));
      },

      onPageMounted: function onPageMounted(page) {
        if (this.eventTargetEl !== page.el) { return; }
        this.dispatchEvent('page:mounted pageMounted', page);
      },

      onPageInit: function onPageInit(page) {
        if (this.eventTargetEl !== page.el) { return; }
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
          if (page.$navbarEl && page.$navbarEl.hasClass('navbar-large')) {
            this.setState({
              hasNavbarLarge: true
            });
          }
        }

        this.dispatchEvent('page:init pageInit', page);
      },

      onPageReinit: function onPageReinit(page) {
        if (this.eventTargetEl !== page.el) { return; }
        this.dispatchEvent('page:reinit pageReinit', page);
      },

      onPageBeforeIn: function onPageBeforeIn(page) {
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
      },

      onPageBeforeOut: function onPageBeforeOut(page) {
        if (this.eventTargetEl !== page.el) { return; }
        this.dispatchEvent('page:beforeout pageBeforeOut', page);
      },

      onPageAfterOut: function onPageAfterOut(page) {
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
      },

      onPageAfterIn: function onPageAfterIn(page) {
        if (this.eventTargetEl !== page.el) { return; }
        this.setState({
          routerPositionClass: 'page-current'
        });
        this.dispatchEvent('page:afterin pageAfterIn', page);
      },

      onPageBeforeRemove: function onPageBeforeRemove(page) {
        if (this.eventTargetEl !== page.el) { return; }
        this.dispatchEvent('page:beforeremove pageBeforeRemove', page);
      },

      onPageBeforeUnmount: function onPageBeforeUnmount(page) {
        if (this.eventTargetEl !== page.el) { return; }
        this.dispatchEvent('page:beforeunmount pageBeforeUnmount', page);
      },

      onPageStack: function onPageStack(pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          routerForceUnstack: false
        });
      },

      onPageUnstack: function onPageUnstack(pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          routerForceUnstack: true
        });
      },

      onPagePosition: function onPagePosition(pageEl, position) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          routerPositionClass: ("page-" + position)
        });
      },

      onPageRole: function onPageRole(pageEl, rolesData) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          routerPageRole: rolesData.role,
          routerPageRoleDetailRoot: rolesData.detailRoot
        });
      },

      onPageMasterStack: function onPageMasterStack(pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          routerPageMasterStack: true
        });
      },

      onPageMasterUnstack: function onPageMasterUnstack(pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          routerPageMasterStack: false
        });
      },

      onPageNavbarLargeCollapsed: function onPageNavbarLargeCollapsed(pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          hasNavbarLargeCollapsed: true
        });
      },

      onPageNavbarLargeExpanded: function onPageNavbarLargeExpanded(pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          hasNavbarLargeCollapsed: false
        });
      },

      onCardOpened: function onCardOpened(cardEl, pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          hasCardExpandableOpened: true
        });
      },

      onCardClose: function onCardClose(cardEl, pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.setState({
          hasCardExpandableOpened: false
        });
      },

      onPageTabShow: function onPageTabShow(pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.dispatchEvent('page:tabshow pageTabShow');
      },

      onPageTabHide: function onPageTabHide(pageEl) {
        if (this.eventTargetEl !== pageEl) { return; }
        this.dispatchEvent('page:tabhide pageTabHide');
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
      swipeNoFollow: Boolean,
      swipeOnlyClose: Boolean,
      swipeActiveArea: {
        type: Number,
        default: 0
      },
      swipeThreshold: {
        type: Number,
        default: 0
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var id = props.id;
      var style = props.style;
      var resizable = props.resizable;
      return _h('div', {
        ref: 'el',
        style: style,
        class: this.classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default'], resizable && _h('div', {
        class: 'panel-resize-handler'
      })]);
    },

    computed: {
      classes: function classes() {
        var obj;

        var self = this;
        var props = self.props;
        var left = props.left;
        var reveal = props.reveal;
        var className = props.className;
        var resizable = props.resizable;
        var side = props.side;
        var effect = props.effect;
        side = side || (left ? 'left' : 'right');
        effect = effect || (reveal ? 'reveal' : 'cover');
        return Utils.classNames(className, 'panel', ( obj = {
          'panel-resizable': resizable
        }, obj[("panel-" + side)] = side, obj[("panel-" + effect)] = effect, obj ), Mixins.colorClasses(props));
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },
    watch: {
      'props.resizable': function watchResizable(resizable) {
        var self = this;
        if (!self.f7Panel) { return; }
        if (resizable) { self.f7Panel.enableResizable(); }else { self.f7Panel.disableResizable(); }
      },
      'props.opened': function watchOpened(opened) {
        var self = this;
        if (!self.f7Panel) { return; }

        if (opened) {
          self.f7Panel.open();
        } else {
          self.f7Panel.close();
        }
      }
    },

    created: function created() {
      Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed', 'onBackdropClick', 'onSwipe', 'onSwipeOpen', 'onBreakpoint', 'onCollapsedBreakpoint', 'onResize']);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      var ref = self.props;
      var opened = ref.opened;
      var resizable = ref.resizable;
      var backdrop = ref.backdrop;
      var backdropEl = ref.backdropEl;
      var visibleBreakpoint = ref.visibleBreakpoint;
      var collapsedBreakpoint = ref.collapsedBreakpoint;
      var swipe = ref.swipe;
      var swipeNoFollow = ref.swipeNoFollow;
      var swipeOnlyClose = ref.swipeOnlyClose;
      var swipeActiveArea = ref.swipeActiveArea;
      var swipeThreshold = ref.swipeThreshold;
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
          swipeNoFollow: swipeNoFollow,
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
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;

      if (self.f7Panel && self.f7Panel.destroy) {
        self.f7Panel.destroy();
      }
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

      onSwipe: function onSwipe(event) {
        this.dispatchEvent('panel:swipe panelSwipe', event);
      },

      onSwipeOpen: function onSwipeOpen(event) {
        this.dispatchEvent('panel:swipeopen panelSwipeOpen', event);
      },

      onBreakpoint: function onBreakpoint(event) {
        this.dispatchEvent('panel:breakpoint panelBreakpoint', event);
      },

      onCollapsedBreakpoint: function onCollapsedBreakpoint(event) {
        this.dispatchEvent('panel:collapsedbreakpoint panelCollapsedBreakpoint', event);
      },

      onResize: function onResize() {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        (ref = this).dispatchEvent.apply(ref, [ 'panel:resize panelResize' ].concat( args ));
      },

      open: function open(animate) {
        var self = this;
        if (!self.f7Panel) { return; }
        self.f7Panel.open(animate);
      },

      close: function close(animate) {
        var self = this;
        if (!self.f7Panel) { return; }
        self.f7Panel.close(animate);
      },

      toggle: function toggle(animate) {
        var self = this;
        if (!self.f7Panel) { return; }
        self.f7Panel.toggle(animate);
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
        self.f7PhotoBrowser.params.photos = newValue;

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
      target: [String, Object],
      backdrop: Boolean,
      backdropEl: [String, Object],
      closeByBackdropClick: Boolean,
      closeByOutsideClick: Boolean,
      closeOnEscape: Boolean
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

    created: function created() {
      Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed']);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      if (!el) { return; }
      var props = self.props;
      var target = props.target;
      var opened = props.opened;
      var backdrop = props.backdrop;
      var backdropEl = props.backdropEl;
      var closeByBackdropClick = props.closeByBackdropClick;
      var closeByOutsideClick = props.closeByOutsideClick;
      var closeOnEscape = props.closeOnEscape;
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
        var propsData = self.$options.propsData;
        if (typeof propsData.closeByBackdropClick !== 'undefined') { popoverParams.closeByBackdropClick = closeByBackdropClick; }
        if (typeof propsData.closeByOutsideClick !== 'undefined') { popoverParams.closeByOutsideClick = closeByOutsideClick; }
        if (typeof propsData.closeOnEscape !== 'undefined') { popoverParams.closeOnEscape = closeOnEscape; }
        if (typeof propsData.backdrop !== 'undefined') { popoverParams.backdrop = backdrop; }
        if (typeof propsData.backdropEl !== 'undefined') { popoverParams.backdropEl = backdropEl; }
      }
      self.$f7ready(function () {
        self.f7Popover = self.$f7.popover.create(popoverParams);

        if (opened && target) {
          self.f7Popover.open(target, false);
        }
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Popover) { self.f7Popover.destroy(); }
    },

    methods: {
      onOpen: function onOpen(instance) {
        this.dispatchEvent('popover:open popoverOpen', instance);
      },

      onOpened: function onOpened(instance) {
        this.dispatchEvent('popover:opened popoverOpened', instance);
      },

      onClose: function onClose(instance) {
        this.dispatchEvent('popover:close popoverClose', instance);
      },

      onClosed: function onClosed(instance) {
        this.dispatchEvent('popover:closed popoverClosed', instance);
      },

      open: function open(animate) {
        var self = this;
        if (!self.f7Popover) { return undefined; }
        return self.f7Popover.open(animate);
      },

      close: function close(animate) {
        var self = this;
        if (!self.f7Popover) { return undefined; }
        return self.f7Popover.close(animate);
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
      opened: Boolean,
      animate: Boolean,
      backdrop: Boolean,
      backdropEl: [String, Object],
      closeByBackdropClick: Boolean,
      closeOnEscape: Boolean,
      swipeToClose: {
        type: [Boolean, String],
        default: false
      },
      swipeHandler: [String, Object],
      push: Boolean
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var tabletFullscreen = props.tabletFullscreen;
      var push = props.push;
      var classes = Utils.classNames(className, 'popup', {
        'popup-tablet-fullscreen': tabletFullscreen,
        'popup-push': push
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

    created: function created() {
      Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed', 'onSwipeStart', 'onSwipeMove', 'onSwipeEnd', 'onSwipeClose']);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      if (!el) { return; }
      var props = self.props;
      var closeByBackdropClick = props.closeByBackdropClick;
      var backdrop = props.backdrop;
      var backdropEl = props.backdropEl;
      var animate = props.animate;
      var closeOnEscape = props.closeOnEscape;
      var swipeToClose = props.swipeToClose;
      var swipeHandler = props.swipeHandler;
      var popupParams = {
        el: el,
        on: {
          swipeStart: self.onSwipeStart,
          swipeMove: self.onSwipeMove,
          swipeEnd: self.onSwipeEnd,
          swipeClose: self.onSwipeClose,
          open: self.onOpen,
          opened: self.onOpened,
          close: self.onClose,
          closed: self.onClosed
        }
      };
      {
        var propsData = self.$options.propsData;
        if (typeof propsData.closeByBackdropClick !== 'undefined') { popupParams.closeByBackdropClick = closeByBackdropClick; }
        if (typeof propsData.closeOnEscape !== 'undefined') { popupParams.closeOnEscape = closeOnEscape; }
        if (typeof propsData.animate !== 'undefined') { popupParams.animate = animate; }
        if (typeof propsData.backdrop !== 'undefined') { popupParams.backdrop = backdrop; }
        if (typeof propsData.backdropEl !== 'undefined') { popupParams.backdropEl = backdropEl; }
        if (typeof propsData.swipeToClose !== 'undefined') { popupParams.swipeToClose = swipeToClose; }
        if (typeof propsData.swipeHandler !== 'undefined') { popupParams.swipeHandler = swipeHandler; }
      }
      self.$f7ready(function () {
        self.f7Popup = self.$f7.popup.create(popupParams);

        if (self.props.opened) {
          self.f7Popup.open(false);
        }
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Popup) { self.f7Popup.destroy(); }
    },

    methods: {
      onSwipeStart: function onSwipeStart(instance) {
        this.dispatchEvent('popup:swipestart popupSwipeStart', instance);
      },

      onSwipeMove: function onSwipeMove(instance) {
        this.dispatchEvent('popup:swipemove popupSwipeMove', instance);
      },

      onSwipeEnd: function onSwipeEnd(instance) {
        this.dispatchEvent('popup:swipeend popupSwipeEnd', instance);
      },

      onSwipeClose: function onSwipeClose(instance) {
        this.dispatchEvent('popup:swipeclose popupSwipeClose', instance);
      },

      onOpen: function onOpen(instance) {
        this.dispatchEvent('popup:open popupOpen', instance);
      },

      onOpened: function onOpened(instance) {
        this.dispatchEvent('popup:opened popupOpened', instance);
      },

      onClose: function onClose(instance) {
        this.dispatchEvent('popup:close popupClose', instance);
      },

      onClosed: function onClosed(instance) {
        this.dispatchEvent('popup:closed popupClosed', instance);
      },

      open: function open(animate) {
        var self = this;
        if (!self.f7Popup) { return undefined; }
        return self.f7Popup.open(animate);
      },

      close: function close(animate) {
        var self = this;
        if (!self.f7Popup) { return undefined; }
        return self.f7Popup.close(animate);
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
          ref: 'inputEl',
          domProps: {
            value: value,
            disabled: disabled,
            readonly: readonly,
            checked: checked
          },
          on: {
            change: self.onChange
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

    created: function created() {
      Utils.bindMethods(this, ['onChange']);
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
      },
      resizable: Boolean,
      resizableFixed: Boolean,
      resizableAbsolute: Boolean,
      resizableHandler: {
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
      var tag = props.tag;
      var noGap = props.noGap;
      var resizable = props.resizable;
      var resizableFixed = props.resizableFixed;
      var resizableAbsolute = props.resizableAbsolute;
      var resizableHandler = props.resizableHandler;
      var RowTag = tag;
      var classes = Utils.classNames(className, 'row', {
        'no-gap': noGap,
        resizable: resizable,
        'resizable-fixed': resizableFixed,
        'resizable-absolute': resizableAbsolute
      }, Mixins.colorClasses(props));
      return _h(RowTag, {
        style: style,
        class: classes,
        ref: 'el',
        attrs: {
          id: id
        }
      }, [this.$slots['default'], resizable && resizableHandler && _h('span', {
        class: 'resize-handler'
      })]);
    },

    created: function created() {
      Utils.bindMethods(this, ['onClick', 'onResize']);
    },

    mounted: function mounted() {
      var self = this;
      self.eventTargetEl = self.$refs.el;
      self.eventTargetEl.addEventListener('click', self.onClick);
      self.$f7ready(function (f7) {
        f7.on('gridResize', self.onResize);
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var el = self.$refs.el;
      if (!el || !self.$f7) { return; }
      el.removeEventListener('click', self.onClick);
      self.$f7.off('gridResize', self.onResize);
      delete self.eventTargetEl;
    },

    methods: {
      onClick: function onClick(event) {
        this.dispatchEvent('click', event);
      },

      onResize: function onResize(el) {
        if (el === this.eventTargetEl) {
          this.dispatchEvent('grid:resize gridResize');
        }
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
      spellcheck: {
        type: Boolean,
        default: undefined
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
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var clearEl;
      var disableEl;
      var props = self.props;
      var placeholder = props.placeholder;
      var spellcheck = props.spellcheck;
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
        clearEl = _h('span', {
          ref: 'clearEl',
          class: 'input-clear-button'
        });
      }

      if (disableButton) {
        disableEl = _h('span', {
          ref: 'disableEl',
          class: 'searchbar-disable-button'
        }, [disableButtonText]);
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
        inputEl = _h('input', {
          ref: 'inputEl',
          domProps: {
            value: value
          },
          on: {
            input: self.onInput,
            change: self.onChange,
            focus: self.onFocus,
            blur: self.onBlur
          },
          attrs: {
            placeholder: placeholder,
            type: 'search',
            spellcheck: spellcheck
          }
        });
      }
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
      }, [this.$slots['input-wrap-start'], inputEl, _h('i', {
        class: 'searchbar-icon'
      }), clearEl, this.$slots['input-wrap-end']]), disableEl, this.$slots['inner-end'], this.$slots['default']]), this.$slots['after-inner']]);
    },

    created: function created() {
      Utils.bindMethods(this, ['onSubmit', 'onClearButtonClick', 'onDisableButtonClick', 'onInput', 'onChange', 'onFocus', 'onBlur']);
    },

    mounted: function mounted() {
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
      var ref$1 = self.$refs;
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
          el: self.$refs.el,
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
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var ref = self.$refs;
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
        return this.f7Searchbar.toggle();
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
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      var strong = props.strong;
      var strongIos = props.strongIos;
      var strongMd = props.strongMd;
      var strongAurora = props.strongAurora;
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
        'segmented-round-md': roundMd,
        'segmented-strong': strong,
        'segmented-strong-ios': strongIos,
        'segmented-strong-md': strongMd,
        'segmented-strong-aurora': strongAurora
      }, Mixins.colorClasses(props));
      var SegmentedTag = tag;
      return _h(SegmentedTag, {
        style: style,
        class: classNames,
        attrs: {
          id: id
        }
      }, [this.$slots['default'], (strong || strongIos || strongMd || strongAurora) && _h('span', {
        class: 'segmented-highlight'
      })]);
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
      top: Boolean,
      bottom: Boolean,
      position: String,
      backdrop: Boolean,
      backdropEl: [String, Object],
      closeByBackdropClick: Boolean,
      closeByOutsideClick: Boolean,
      closeOnEscape: Boolean,
      push: Boolean,
      swipeToClose: Boolean,
      swipeToStep: Boolean,
      swipeHandler: [String, Object]
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
      var top = props.top;
      var bottom = props.bottom;
      var position = props.position;
      var push = props.push;
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

      var positionComputed = 'bottom';
      if (position) { positionComputed = position; }else if (top) { positionComputed = 'top'; }else if (bottom) { positionComputed = 'bottom'; }
      var classes = Utils.classNames(className, 'sheet-modal', ("sheet-modal-" + positionComputed), {
        'sheet-modal-push': push
      }, Mixins.colorClasses(props));
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

    created: function created() {
      Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed', 'onStepOpen', 'onStepClose', 'onStepProgress']);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
      if (!el) { return; }
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
        el: self.$refs.el,
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
        var propsData = self.$options.propsData;
        if (typeof propsData.backdrop !== 'undefined') { sheetParams.backdrop = backdrop; }
        if (typeof propsData.backdropEl !== 'undefined') { sheetParams.backdropEl = backdropEl; }
        if (typeof propsData.closeByBackdropClick !== 'undefined') { sheetParams.closeByBackdropClick = closeByBackdropClick; }
        if (typeof propsData.closeByOutsideClick !== 'undefined') { sheetParams.closeByOutsideClick = closeByOutsideClick; }
        if (typeof propsData.closeOnEscape !== 'undefined') { sheetParams.closeOnEscape = closeOnEscape; }
        if (typeof propsData.swipeToClose !== 'undefined') { sheetParams.swipeToClose = swipeToClose; }
        if (typeof propsData.swipeToStep !== 'undefined') { sheetParams.swipeToStep = swipeToStep; }
        if (typeof propsData.swipeHandler !== 'undefined') { sheetParams.swipeHandler = swipeHandler; }
      }
      self.$f7ready(function () {
        self.f7Sheet = self.$f7.sheet.create(sheetParams);

        if (opened) {
          self.f7Sheet.open(false);
        }
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      if (self.f7Sheet) { self.f7Sheet.destroy(); }
    },

    methods: {
      onStepProgress: function onStepProgress(instance, progress) {
        this.dispatchEvent('sheet:stepprogress sheetStepProgress', instance, progress);
      },

      onStepOpen: function onStepOpen(instance) {
        this.dispatchEvent('sheet:stepopen sheetStepOpen', instance);
      },

      onStepClose: function onStepClose(instance) {
        this.dispatchEvent('sheet:stepclose sheetStepClose', instance);
      },

      onOpen: function onOpen(instance) {
        this.dispatchEvent('sheet:open sheetOpen', instance);
      },

      onOpened: function onOpened(instance) {
        this.dispatchEvent('sheet:opened sheetOpened', instance);
      },

      onClose: function onClose(instance) {
        this.dispatchEvent('sheet:close sheetClose', instance);
      },

      onClosed: function onClosed(instance) {
        this.dispatchEvent('sheet:closed sheetClosed', instance);
      },

      open: function open(animate) {
        var self = this;
        if (!self.f7Sheet) { return undefined; }
        return self.f7Sheet.open(animate);
      },

      close: function close(animate) {
        var self = this;
        if (!self.f7Sheet) { return undefined; }
        return self.f7Sheet.close(animate);
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

  var f7SkeletonBlock = {
    name: 'f7-skeleton-block',
    props: Object.assign({
      id: [String, Number],
      width: [Number, String],
      height: [Number, String],
      tag: {
        type: String,
        default: 'div'
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      return _h(Tag, {
        style: styleAttribute,
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

  var f7SkeletonText = {
    name: 'f7-skeleton-text',
    props: Object.assign({
      id: [String, Number],
      width: [Number, String],
      height: [Number, String],
      tag: {
        type: String,
        default: 'span'
      }
    }, Mixins.colorProps),

    render: function render() {
      var _h = this.$createElement;
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
      return _h(Tag, {
        style: styleAttribute,
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
      var name = props.name;
      var inputId = props.inputId;
      var inputWrapEl;
      var valueEl;

      if (input && !buttonsOnly) {
        var inputEl;
        {
          inputEl = _h('input', {
            ref: 'inputEl',
            domProps: {
              readOnly: inputReadonly,
              value: value
            },
            on: {
              input: self.onInput,
              change: self.onChange
            },
            attrs: {
              name: name,
              id: inputId,
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
        ref: 'minusEl',
        class: 'stepper-button-minus'
      }), inputWrapEl, valueEl, _h('div', {
        ref: 'plusEl',
        class: 'stepper-button-plus'
      })]);
    },

    computed: {
      classes: function classes() {
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
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },
    watch: {
      'props.value': function watchValue(newValue) {
        var self = this;
        if (!self.f7Stepper) { return; }
        self.f7Stepper.setValue(newValue);
      }
    },

    created: function created() {
      Utils.bindMethods(this, ['onInput', 'onMinusClick', 'onPlusClick']);
    },

    mounted: function mounted() {
      var self = this;
      var ref = self.$refs;
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
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var ref = self.$refs;
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

      onInput: function onInput(event) {
        var stepper = this.f7Stepper;
        this.dispatchEvent('input', event, stepper);
      },

      onChange: function onChange(event) {
        var stepper = this.f7Stepper;
        this.dispatchEvent('change', event, stepper);
      },

      onMinusClick: function onMinusClick(event) {
        var stepper = this.f7Stepper;
        this.dispatchEvent('stepper:minusclick stepperMinusClick', event, stepper);
      },

      onPlusClick: function onPlusClick(event) {
        var stepper = this.f7Stepper;
        this.dispatchEvent('stepper:plusclick stepperPlusClick', event, stepper);
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
        class: 'subnavbar-title'
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
      confirmTitle: String,
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
      var confirmTitle = props.confirmTitle;
      var confirmText = props.confirmText;
      var text = props.text;
      var classes = Utils.classNames(className, {
        'swipeout-overswipe': overswipe,
        'swipeout-delete': deleteProp,
        'swipeout-close': close
      }, Mixins.colorClasses(props));
      return _h('a', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          href: href || '#',
          id: id,
          'data-confirm': confirmText || undefined,
          'data-confirm-title': confirmTitle || undefined
        }
      }, [this.$slots['default'] || [text]]);
    },

    created: function created() {
      Utils.bindMethods(this, ['onClick']);
    },

    mounted: function mounted() {
      this.$refs.el.addEventListener('click', this.onClick);
    },

    beforeDestroy: function beforeDestroy() {
      this.$refs.el.removeEventListener('click', this.onClick);
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
      Utils.bindMethods(this, ['onTabShow', 'onTabHide']);
    },

    updated: function updated() {
      var self = this;
      if (!self.routerData) { return; }
      f7.events.emit('tabRouterDidUpdate', self.routerData);
    },

    beforeDestroy: function beforeDestroy() {
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
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
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
    },

    methods: {
      show: function show(animate) {
        if (!this.$f7) { return; }
        this.$f7.tab.show(this.$refs.el, animate);
      },

      onTabShow: function onTabShow(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('tab:show tabShow', el);
      },

      onTabHide: function onTabHide(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('tab:hide tabHide', el);
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
      routable: Boolean,
      swiperParams: {
        type: Object,
        default: undefined
      }
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
        return _h('div', {
          style: style,
          class: Utils.classNames(wrapClasses, classes),
          ref: 'wrapEl',
          attrs: {
            id: id
          }
        }, [_h('div', {
          class: tabsClasses
        }, [this.$slots['default']])]);
      }

      return _h('div', {
        style: style,
        class: Utils.classNames(tabsClasses, classes),
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    },

    mounted: function mounted() {
      var self = this;
      var ref = self.props;
      var swipeable = ref.swipeable;
      var swiperParams = ref.swiperParams;
      if (!swipeable || !swiperParams) { return; }
      var wrapEl = self.$refs.wrapEl;
      if (!wrapEl) { return; }
      wrapEl.f7SwiperParams = swiperParams;
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
    }, Mixins.colorProps),

    data: function data() {
      var this$1 = this;

      var props = __vueComponentProps(this);

      var state = (function () {
        var self = this$1;
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

    created: function created() {
      Utils.bindMethods(this, ['onHide', 'onShow']);
    },

    updated: function updated() {
      var self = this;

      if (self.props.tabbar && self.$f7) {
        self.$f7.toolbar.setHighlight(self.$refs.el);
      }
    },

    mounted: function mounted() {
      var self = this;
      var ref = self.$refs;
      var el = ref.el;
      if (!el) { return; }
      self.$f7ready(function (f7) {
        self.eventTargetEl = el;
        if (self.props.tabbar) { f7.toolbar.setHighlight(el); }
        f7.on('toolbarShow', self.onShow);
        f7.on('toolbarHide', self.onHide);
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var ref = self.$refs;
      var el = ref.el;
      if (!el || !self.$f7) { return; }
      var f7 = self.$f7;
      f7.off('toolbarShow', self.onShow);
      f7.off('toolbarHide', self.onHide);
      self.eventTargetEl = null;
      delete self.eventTargetEl;
    },

    methods: {
      onHide: function onHide(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.dispatchEvent('toolbar:hide toolbarHide');
      },

      onShow: function onShow(navbarEl) {
        if (this.eventTargetEl !== navbarEl) { return; }
        this.dispatchEvent('toolbar:show toolbarShow');
      },

      hide: function hide(animate) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.toolbar.hide(this.$refs.el, animate);
      },

      show: function show(animate) {
        var self = this;
        if (!self.$f7) { return; }
        self.$f7.toolbar.show(this.$refs.el, animate);
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

  var f7TreeviewItem = {
    props: Object.assign({
      id: [String, Number],
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
    }, Mixins.colorProps, {}, Mixins.linkActionsProps, {}, Mixins.linkRouterProps, {}, Mixins.linkIconProps),
    name: 'f7-treeview-item',

    render: function render() {
      var _h = this.$createElement;
      var self = this;
      var props = self.props;
      var id = props.id;
      var style = props.style;
      var toggle = props.toggle;
      var label = props.label;
      var icon = props.icon;
      var iconMaterial = props.iconMaterial;
      var iconF7 = props.iconF7;
      var iconMd = props.iconMd;
      var iconIos = props.iconIos;
      var iconAurora = props.iconAurora;
      var iconSize = props.iconSize;
      var iconColor = props.iconColor;
      var link = props.link;
      var slots = self.$slots;
      var hasChildren = slots.default && slots.default.length || slots.children && slots.children.length || slots['children-start'] && slots['children-start'].length;
      var needToggle = typeof toggle === 'undefined' ? hasChildren : toggle;
      var iconEl;

      if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
        iconEl = _h(f7Icon, {
          attrs: {
            material: iconMaterial,
            f7: iconF7,
            icon: icon,
            md: iconMd,
            ios: iconIos,
            aurora: iconAurora,
            color: iconColor,
            size: iconSize
          }
        });
      }

      var TreeviewRootTag = link || link === '' ? 'a' : 'div';
      return _h('div', {
        ref: 'el',
        style: style,
        class: self.classes,
        attrs: {
          id: id
        }
      }, [_h(TreeviewRootTag, __vueComponentTransformJSXProps(Object.assign({
        ref: 'rootEl',
        class: self.itemRootClasses
      }, self.itemRootAttrs)), [this.$slots['root-start'], needToggle && _h('div', {
        class: 'treeview-toggle'
      }), _h('div', {
        class: 'treeview-item-content'
      }, [this.$slots['content-start'], iconEl, this.$slots['media'], _h('div', {
        class: 'treeview-item-label'
      }, [this.$slots['label-start'], label, this.$slots['label']]), this.$slots['content'], this.$slots['content-end']]), this.$slots['root'], this.$slots['root-end']]), hasChildren && _h('div', {
        class: 'treeview-item-children'
      }, [this.$slots['children-start'], this.$slots['default'], this.$slots['children']])]);
    },

    computed: {
      itemRootAttrs: function itemRootAttrs() {
        var self = this;
        var props = self.props;
        var link = props.link;
        var href = link;
        if (link === true) { href = '#'; }
        if (link === false) { href = undefined; }
        return Utils.extend({
          href: href
        }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
      },

      itemRootClasses: function itemRootClasses() {
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
      },

      classes: function classes() {
        var self = this;
        var props = self.props;
        var className = props.className;
        var opened = props.opened;
        var loadChildren = props.loadChildren;
        return Utils.classNames(className, 'treeview-item', {
          'treeview-item-opened': opened,
          'treeview-load-children': loadChildren
        }, Mixins.colorClasses(props));
      },

      props: function props() {
        return __vueComponentProps(this);
      }

    },

    created: function created() {
      Utils.bindMethods(this, ['onClick', 'onOpen', 'onClose', 'onLoadChildren']);
    },

    mounted: function mounted() {
      var self = this;
      var ref = self.$refs;
      var el = ref.el;
      var rootEl = ref.rootEl;
      rootEl.addEventListener('click', self.onClick);
      if (!el) { return; }
      self.eventTargetEl = el;
      self.$f7ready(function (f7) {
        f7.on('treeviewOpen', self.onOpen);
        f7.on('treeviewClose', self.onClose);
        f7.on('treeviewLoadChildren', self.onLoadChildren);
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;
      var ref = self.$refs;
      var el = ref.el;
      var rootEl = ref.rootEl;
      rootEl.removeEventListener('click', self.onClick);
      if (!el || self.$f7) { return; }
      self.$f7.off('treeviewOpen', self.onOpen);
      self.$f7.off('treeviewClose', self.onClose);
      self.$f7.off('treeviewLoadChildren', self.onLoadChildren);
      self.eventTargetEl = null;
      delete self.eventTargetEl;
    },

    methods: {
      onClick: function onClick(event) {
        this.dispatchEvent('click', event);
      },

      onOpen: function onOpen(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('treeview:open treeviewOpen', el);
      },

      onClose: function onClose(el) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('treeview:close treeviewClose', el);
      },

      onLoadChildren: function onLoadChildren(el, done) {
        if (this.eventTargetEl !== el) { return; }
        this.dispatchEvent('treeview:loadchildren treeviewLoadChildren', el, done);
      },

      dispatchEvent: function dispatchEvent(events) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        __vueComponentDispatchEvent.apply(void 0, [ this, events ].concat( args ));
      }

    }
  };

  var f7Treeview = {
    props: Object.assign({
      id: [String, Number]
    }, Mixins.colorProps),
    name: 'f7-treeview',

    render: function render() {
      var _h = this.$createElement;
      var props = this.props;
      var className = props.className;
      var id = props.id;
      var style = props.style;
      var classes = Utils.classNames(className, 'treeview', Mixins.colorClasses(props));
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
      xhrCache: Boolean,
      xhrCacheIgnore: Array,
      xhrCacheIgnoreGetParameters: Boolean,
      xhrCacheDuration: Number,
      preloadPreviousPage: Boolean,
      allowDuplicateUrls: Boolean,
      reloadPages: Boolean,
      reloadDetail: Boolean,
      masterDetailResizable: Boolean,
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
      Utils.bindMethods(self, ['onSwipeBackMove', 'onSwipeBackBeforeChange', 'onSwipeBackAfterChange', 'onSwipeBackBeforeReset', 'onSwipeBackAfterReset', 'onTabShow', 'onTabHide', 'onViewInit']);
    },

    mounted: function mounted() {
      var self = this;
      var el = self.$refs.el;
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
        }, Utils.noUndefinedProps(self.$options.propsData || {})));
        self.f7View = self.routerData.instance;
        self.f7View.on('resize', self.onResize);
        self.f7View.on('swipebackMove', self.onSwipeBackMove);
        self.f7View.on('swipebackBeforeChange', self.onSwipeBackBeforeChange);
        self.f7View.on('swipebackAfterChange', self.onSwipeBackAfterChange);
        self.f7View.on('swipebackBeforeReset', self.onSwipeBackBeforeReset);
        self.f7View.on('swipebackAfterReset', self.onSwipeBackAfterReset);
      });
    },

    beforeDestroy: function beforeDestroy() {
      var self = this;

      if (f7.instance) {
        f7.instance.off('tabShow', self.onTabShow);
        f7.instance.off('tabHide', self.onTabHide);
      }

      if (self.f7View) {
        self.f7View.off('resize', self.onResize);
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
    },

    updated: function updated() {
      var self = this;
      if (!self.routerData) { return; }
      f7.events.emit('viewRouterDidUpdate', self.routerData);
    },

    methods: {
      onViewInit: function onViewInit(view) {
        var self = this;
        self.dispatchEvent('view:init viewInit', view);

        if (!self.props.init) {
          self.routerData.instance = view;
          self.f7View = self.routerData.instance;
        }
      },

      onResize: function onResize(view, width) {
        this.dispatchEvent('view:resize viewResize', width);
      },

      onSwipeBackMove: function onSwipeBackMove(data) {
        var swipeBackData = data;
        this.dispatchEvent('swipeback:move swipeBackMove', swipeBackData);
      },

      onSwipeBackBeforeChange: function onSwipeBackBeforeChange(data) {
        var swipeBackData = data;
        this.dispatchEvent('swipeback:beforechange swipeBackBeforeChange', swipeBackData);
      },

      onSwipeBackAfterChange: function onSwipeBackAfterChange(data) {
        var swipeBackData = data;
        this.dispatchEvent('swipeback:afterchange swipeBackAfterChange', swipeBackData);
      },

      onSwipeBackBeforeReset: function onSwipeBackBeforeReset(data) {
        var swipeBackData = data;
        this.dispatchEvent('swipeback:beforereset swipeBackBeforeReset', swipeBackData);
      },

      onSwipeBackAfterReset: function onSwipeBackAfterReset(data) {
        var swipeBackData = data;
        this.dispatchEvent('swipeback:afterreset swipeBackAfterReset', swipeBackData);
      },

      onTabShow: function onTabShow(el) {
        if (el === this.$refs.el) {
          this.dispatchEvent('tab:show tabShow', el);
        }
      },

      onTabHide: function onTabHide(el) {
        if (el === this.$refs.el) {
          this.dispatchEvent('tab:hide tabHide', el);
        }
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
        if ('length' in $pageEl && $pageEl[0]) { f7Page = $pageEl[0].f7Page; }
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
   * Framework7 Vue 5.7.14
   * Build full featured iOS & Android apps using Framework7 & Vue
   * https://framework7.io/vue/
   *
   * Copyright 2014-2020 Vladimir Kharlampidi
   *
   * Released under the MIT License
   *
   * Released on: November 9, 2020
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

      // eslint-disable-next-line
      var Extend = params.Vue || Vue;

      Vue.component('f7-accordion-content', f7AccordionContent);
      Vue.component('f7-accordion-item', f7AccordionItem);
      Vue.component('f7-accordion-toggle', f7AccordionToggle);
      Vue.component('f7-accordion', f7Accordion);
      Vue.component('f7-actions-button', f7ActionsButton);
      Vue.component('f7-actions-group', f7ActionsGroup);
      Vue.component('f7-actions-label', f7ActionsLabel);
      Vue.component('f7-actions', f7Actions);
      Vue.component('f7-app', f7App);
      Vue.component('f7-appbar', f7Appbar);
      Vue.component('f7-badge', f7Badge);
      Vue.component('f7-block-footer', f7BlockFooter);
      Vue.component('f7-block-header', f7BlockHeader);
      Vue.component('f7-block-title', f7BlockTitle);
      Vue.component('f7-block', f7Block);
      Vue.component('f7-button', f7Button);
      Vue.component('f7-card-content', f7CardContent);
      Vue.component('f7-card-footer', f7CardFooter);
      Vue.component('f7-card-header', f7CardHeader);
      Vue.component('f7-card', f7Card);
      Vue.component('f7-checkbox', f7Checkbox);
      Vue.component('f7-chip', f7Chip);
      Vue.component('f7-col', f7Col);
      Vue.component('f7-fab-backdrop', f7FabBackdrop);
      Vue.component('f7-fab-button', f7FabButton);
      Vue.component('f7-fab-buttons', f7FabButtons);
      Vue.component('f7-fab', f7Fab);
      Vue.component('f7-gauge', f7Gauge);
      Vue.component('f7-icon', f7Icon);
      Vue.component('f7-input', f7Input);
      Vue.component('f7-link', f7Link);
      Vue.component('f7-list-button', f7ListButton);
      Vue.component('f7-list-group', f7ListGroup);
      Vue.component('f7-list-index', f7ListIndex);
      Vue.component('f7-list-input', f7ListInput);
      Vue.component('f7-list-item-cell', f7ListItemCell);
      Vue.component('f7-list-item-content', f7ListItemContent);
      Vue.component('f7-list-item-row', f7ListItemRow);
      Vue.component('f7-list-item', f7ListItem);
      Vue.component('f7-list', f7List);
      Vue.component('f7-login-screen-title', f7LoginScreenTitle);
      Vue.component('f7-login-screen', f7LoginScreen);
      Vue.component('f7-menu-dropdown-item', f7MenuDropdownItem);
      Vue.component('f7-menu-dropdown', f7MenuDropdown);
      Vue.component('f7-menu-item', f7MenuItem);
      Vue.component('f7-menu', f7Menu);
      Vue.component('f7-message', f7Message);
      Vue.component('f7-messagebar-attachment', f7MessagebarAttachment);
      Vue.component('f7-messagebar-attachments', f7MessagebarAttachments);
      Vue.component('f7-messagebar-sheet-image', f7MessagebarSheetImage);
      Vue.component('f7-messagebar-sheet-item', f7MessagebarSheetItem);
      Vue.component('f7-messagebar-sheet', f7MessagebarSheet);
      Vue.component('f7-messagebar', f7Messagebar);
      Vue.component('f7-messages-title', f7MessagesTitle);
      Vue.component('f7-messages', f7Messages);
      Vue.component('f7-nav-left', f7NavLeft);
      Vue.component('f7-nav-right', f7NavRight);
      Vue.component('f7-nav-title-large', f7NavTitleLarge);
      Vue.component('f7-nav-title', f7NavTitle);
      Vue.component('f7-navbar', f7Navbar);
      Vue.component('f7-page-content', f7PageContent);
      Vue.component('f7-page', f7Page);
      Vue.component('f7-panel', f7Panel);
      Vue.component('f7-photo-browser', f7PhotoBrowser);
      Vue.component('f7-popover', f7Popover);
      Vue.component('f7-popup', f7Popup);
      Vue.component('f7-preloader', f7Preloader);
      Vue.component('f7-progressbar', f7Progressbar);
      Vue.component('f7-radio', f7Radio);
      Vue.component('f7-range', f7Range);
      Vue.component('f7-routable-modals', f7RoutableModals);
      Vue.component('f7-row', f7Row);
      Vue.component('f7-searchbar', f7Searchbar);
      Vue.component('f7-segmented', f7Segmented);
      Vue.component('f7-sheet', f7Sheet);
      Vue.component('f7-skeleton-block', f7SkeletonBlock);
      Vue.component('f7-skeleton-text', f7SkeletonText);
      Vue.component('f7-stepper', f7Stepper);
      Vue.component('f7-subnavbar', f7Subnavbar);
      Vue.component('f7-swipeout-actions', f7SwipeoutActions);
      Vue.component('f7-swipeout-button', f7SwipeoutButton);
      Vue.component('f7-swiper-slide', f7SwiperSlide);
      Vue.component('f7-swiper', f7Swiper);
      Vue.component('f7-tab', f7Tab);
      Vue.component('f7-tabs', f7Tabs);
      Vue.component('f7-text-editor', f7TextEditor);
      Vue.component('f7-toggle', f7Toggle);
      Vue.component('f7-toolbar', f7Toolbar);
      Vue.component('f7-treeview-item', f7TreeviewItem);
      Vue.component('f7-treeview', f7Treeview);
      Vue.component('f7-view', f7View);
      Vue.component('f7-views', f7Views);

      // DEFINE_INSTANCE_PROTOS_START
      Object.defineProperty(Extend.prototype, '$f7', {
        get: function get() {
          return f7.instance;
        },
      });
      // DEFINE_INSTANCE_PROTOS_END

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

      // DEFINE_PROTOS_START
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
          // eslint-disable-next-line
          {
            if (self.$vnode && self.$vnode.data && self.$vnode.data.props && self.$vnode.data.props.f7route) {
              route = self.$vnode.data.props.f7route;
            }
            var parent = self;
            while (parent && !route) {
              if (parent._f7route) { route = parent._f7route; }
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
          // eslint-disable-next-line
          {
            if (self.$vnode && self.$vnode.data && self.$vnode.data.props && self.$vnode.data.props.f7route) {
              router = self.$vnode.data.props.f7router;
            }
            var parent = self;
            while (parent && !router) {
              if (parent._f7router) { router = parent._f7router; }
              else if (parent.f7View) {
                router = parent.f7View.router;
              } else if (parent.$refs && parent.$refs.el && parent.$refs.el.f7View) {
                router = parent.$refs.el.f7View.router;
              }
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
      // DEFINE_PROTOS_END

      // Extend F7 Router
      Framework7.Router.use(componentsRouter);
    },
  };

  return Plugin;

})));
