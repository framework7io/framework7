function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
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
    var id = props.id,
        style = props.style,
        resizable = props.resizable;
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
      }, _defineProperty(_Utils$classNames, "panel-".concat(side), side), _defineProperty(_Utils$classNames, "panel-".concat(effect), effect), _Utils$classNames), Mixins.colorClasses(props));
    },
    props: function props() {
      return __vueComponentProps(this);
    }
  },
  watch: {
    'props.resizable': function watchResizable(resizable) {
      var self = this;
      if (!self.f7Panel) return;
      if (resizable) self.f7Panel.enableResizable();else self.f7Panel.disableResizable();
    },
    'props.opened': function watchOpened(opened) {
      var self = this;
      if (!self.f7Panel) return;

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
      if (!$) return;

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
    onResize: function onResize(event) {
      this.dispatchEvent('panel:resize panelResize', event);
    },
    open: function open(animate) {
      var self = this;
      if (!self.f7Panel) return;
      self.f7Panel.open(animate);
    },
    close: function close(animate) {
      var self = this;
      if (!self.f7Panel) return;
      self.f7Panel.close(animate);
    },
    toggle: function toggle(animate) {
      var self = this;
      if (!self.f7Panel) return;
      self.f7Panel.toggle(animate);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  }
};