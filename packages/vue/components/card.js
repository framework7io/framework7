import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7CardHeader from './card-header';
import F7CardContent from './card-content';
import F7CardFooter from './card-footer';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
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
    if (!self.props.expandable) return;
    var el = self.$refs.el;
    if (!el) return;
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
    if (!self.props.expandable) return;
    var el = self.$refs.el;
    if (!el || !self.$f7) return;
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
      ref: 'el',
      attrs: {
        id: id,
        'data-animate': typeof animate === 'undefined' ? animate : animate.toString(),
        'data-hide-navbar-on-open': typeof hideNavbarOnOpen === 'undefined' ? hideNavbarOnOpen : hideNavbarOnOpen.toString(),
        'data-hide-toolbar-on-open': typeof hideToolbarOnOpen === 'undefined' ? hideToolbarOnOpen : hideToolbarOnOpen.toString(),
        'data-hide-statusbar-on-open': typeof hideStatusbarOnOpen === 'undefined' ? hideStatusbarOnOpen : hideStatusbarOnOpen.toString(),
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
      if (!self.$refs.el) return;
      self.$f7.card.open(self.$refs.el);
    },
    close: function close() {
      var self = this;
      if (!self.$refs.el) return;
      self.$f7.card.close(self.$refs.el);
    },
    onBeforeOpen: function onBeforeOpen(el, prevent) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('cardBeforeOpen card:beforeopen', el, prevent);
    },
    onOpen: function onOpen(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('cardOpen card:open', el);
    },
    onOpened: function onOpened(el, pageEl) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('cardOpened card:opened', el, pageEl);
    },
    onClose: function onClose(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('cardClose card:close', el);
    },
    onClosed: function onClosed(el, pageEl) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('cardClosed card:closed', el, pageEl);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};