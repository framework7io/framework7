import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7NavLeft from './nav-left';
import F7NavTitle from './nav-title';
import F7NavRight from './nav-right';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
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
    inner: {
      type: Boolean,
      default: true
    },
    innerClass: String,
    innerClassName: String,
    large: Boolean,
    titleLarge: String
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      backLink,
      backLinkUrl,
      backLinkForce,
      backLinkShowText,
      sliding,
      title,
      subtitle,
      inner,
      innerClass,
      innerClassName,
      className,
      id,
      style,
      hidden,
      noShadow,
      noHairline,
      large,
      titleLarge
    } = props;
    let innerEl;
    let leftEl;
    let titleEl;
    let rightEl;
    let titleLargeEl;
    const addLeftTitleClass = self.$theme && self.$theme.ios && self.$f7 && !self.$f7.params.navbar.iosCenterTitle;
    const addCenterTitleClass = self.$theme && self.$theme.md && self.$f7 && self.$f7.params.navbar.mdCenterTitle || self.$theme && self.$theme.aurora && self.$f7 && self.$f7.params.navbar.auroraCenterTitle;
    const slots = self.$slots;
    const classes = Utils.classNames(className, 'navbar', {
      'navbar-hidden': hidden,
      'no-shadow': noShadow,
      'no-hairline': noHairline,
      'navbar-large': large
    }, Mixins.colorClasses(props));

    if (!inner) {
      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [this.$slots['default']]);
    }

    if (backLink || slots['nav-left']) {
      leftEl = _h(F7NavLeft, {
        on: {
          backClick: self.onBackClick
        },
        attrs: {
          backLink: backLink,
          backLinkUrl: backLinkUrl,
          backLinkForce: backLinkForce,
          backLinkShowText: backLinkShowText
        }
      }, [slots['nav-left']]);
    }

    if (title || subtitle || slots.title) {
      titleEl = _h(F7NavTitle, {
        attrs: {
          title: title,
          subtitle: subtitle
        }
      }, [slots.title]);
    }

    if (slots['nav-right']) {
      rightEl = _h(F7NavRight, [slots['nav-right']]);
    }

    let largeTitle = titleLarge;
    if (!largeTitle && large && title) largeTitle = title;

    if (largeTitle) {
      titleLargeEl = _h('div', {
        class: 'title-large'
      }, [_h('div', {
        class: 'title-large-text'
      }, [largeTitle])]);
    }

    innerEl = _h('div', {
      ref: 'innerEl',
      class: Utils.classNames('navbar-inner', innerClass, innerClassName, {
        sliding,
        'navbar-inner-left-title': addLeftTitleClass,
        'navbar-inner-centered-title': addCenterTitleClass,
        'navbar-inner-large': large
      })
    }, [leftEl, titleEl, rightEl, titleLargeEl, this.$slots['default']]);
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['before-inner'], innerEl, this.$slots['after-inner']]);
  },

  created() {
    Utils.bindMethods(this, ['onBackClick', 'onHide', 'onShow', 'onExpand', 'onCollapse']);
  },

  mounted() {
    const self = this;
    const {
      innerEl
    } = self.$refs;
    if (!innerEl) return;
    self.$f7ready(f7 => {
      f7.on('navbarShow', self.onShow);
      f7.on('navbarHide', self.onHide);
      f7.on('navbarCollapse', self.onCollapse);
      f7.on('navbarExpand', self.onExpand);
    });
  },

  updated() {
    const self = this;
    if (!self.$f7) return;
    const el = self.$refs.el;

    if (el && el.children && el.children.length) {
      self.$f7.navbar.size(el);
    } else if (self.$refs.innerEl) {
      self.$f7.navbar.size(self.$refs.innerEl);
    }
  },

  beforeDestroy() {
    const self = this;
    if (!self.props.inner) return;
    const {
      innerEl
    } = self.$refs;
    if (!innerEl) return;
    const f7 = self.$f7;
    if (!f7) return;
    f7.off('navbarShow', self.onShow);
    f7.off('navbarHide', self.onHide);
    f7.off('navbarCollapse', self.onCollapse);
    f7.off('navbarExpand', self.onExpand);
  },

  methods: {
    onHide(navbarEl) {
      const self = this;
      const {
        el,
        innerEl
      } = self.$refs;

      if (navbarEl === el || innerEl && innerEl.parentNode === navbarEl) {
        self.dispatchEvent('navbar:hide navbarHide');
      }
    },

    onShow(navbarEl) {
      const self = this;
      const {
        el,
        innerEl
      } = self.$refs;

      if (navbarEl === el || innerEl && innerEl.parentNode === navbarEl) {
        self.dispatchEvent('navbar:show navbarShow');
      }
    },

    onExpand(navbarEl) {
      const self = this;
      const {
        el,
        innerEl
      } = self.$refs;

      if (navbarEl === el || innerEl && innerEl.parentNode === navbarEl) {
        self.dispatchEvent('navbar:expand navbarExpand');
      }
    },

    onCollapse(navbarEl) {
      const self = this;
      const {
        el,
        innerEl
      } = self.$refs;

      if (navbarEl === el || innerEl && innerEl.parentNode === navbarEl) {
        self.dispatchEvent('navbar:collapse navbarCollapse');
      }
    },

    hide(animate) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.navbar.hide(self.$refs.el, animate);
    },

    show(animate) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.navbar.show(self.$refs.el, animate);
    },

    size() {
      const self = this;
      if (!self.$f7) return;
      self.$f7.navbar.size(self.$refs.el);
    },

    onBackClick(event) {
      this.dispatchEvent('back-click backClick click:back clickBack', event);
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