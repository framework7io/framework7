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
      const self = this;

      if (expandableOpened) {
        self.open();
      } else {
        self.close();
      }
    }
  },

  created() {
    Utils.bindMethods(this, 'onBeforeOpen onOpen onOpened onClose onClosed'.split(' '));
  },

  mounted() {
    const self = this;
    if (!self.props.expandable) return;
    const el = self.$refs.el;
    if (!el) return;
    self.eventTargetEl = el;
    self.$f7ready(f7 => {
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

  beforeDestroy() {
    const self = this;
    if (!self.props.expandable) return;
    const el = self.$refs.el;
    if (!el || !self.$f7) return;
    self.$f7.off('cardBeforeOpen', self.onBeforeOpen);
    self.$f7.off('cardOpen', self.onOpen);
    self.$f7.off('cardOpened', self.onOpened);
    self.$f7.off('cardClose', self.onClose);
    self.$f7.off('cardClosed', self.onClosed);
    self.eventTargetEl = null;
    delete self.eventTargetEl;
  },

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      title,
      content,
      footer,
      padding,
      outline,
      expandable,
      expandableAnimateWidth,
      animate,
      hideNavbarOnOpen,
      hideToolbarOnOpen,
      hideStatusbarOnOpen,
      scrollableEl,
      swipeToClose,
      closeByBackdropClick,
      backdrop,
      backdropEl,
      noShadow,
      noBorder
    } = props;
    let headerEl;
    let contentEl;
    let footerEl;
    const classes = Utils.classNames(className, 'card', {
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
        'data-scrollable-el': scrollableEl,
        'data-swipe-to-close': typeof swipeToClose === 'undefined' ? swipeToClose : swipeToClose.toString(),
        'data-close-by-backdrop-click': typeof closeByBackdropClick === 'undefined' ? closeByBackdropClick : closeByBackdropClick.toString(),
        'data-backdrop': typeof backdrop === 'undefined' ? backdrop : backdrop.toString(),
        'data-backdrop-el': backdropEl
      }
    }, [headerEl, contentEl, footerEl, this.$slots['default']]);
  },

  methods: {
    open() {
      const self = this;
      if (!self.$refs.el) return;
      self.$f7.card.open(self.$refs.el);
    },

    close() {
      const self = this;
      if (!self.$refs.el) return;
      self.$f7.card.close(self.$refs.el);
    },

    onBeforeOpen(el, prevent) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('cardBeforeOpen card:beforeopen', el, prevent);
    },

    onOpen(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('cardOpen card:open', el);
    },

    onOpened(el, pageEl) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('cardOpened card:opened', el, pageEl);
    },

    onClose(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('cardClose card:close', el);
    },

    onClosed(el, pageEl) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('cardClosed card:closed', el, pageEl);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};