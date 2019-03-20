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

    if (inner) {
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
        ref: 'inner',
        class: Utils.classNames('navbar-inner', innerClass, innerClassName, {
          sliding,
          'navbar-inner-left-title': addLeftTitleClass,
          'navbar-inner-centered-title': addCenterTitleClass,
          'navbar-inner-large': large
        })
      }, [leftEl, titleEl, rightEl, titleLargeEl, this.$slots['default']]);
    }

    const classes = Utils.classNames(className, 'navbar', {
      'navbar-hidden': hidden,
      'no-shadow': noShadow,
      'no-hairline': noHairline,
      'navbar-large': large
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

  created() {
    Utils.bindMethods(this, ['onBackClick']);
  },

  updated() {
    const self = this;
    if (!self.$f7) return;
    const el = self.$refs.el;

    if (el && el.children && el.children.length) {
      self.$f7.navbar.size(el);
    } else if (self.$refs.inner) {
      self.$f7.navbar.size(self.$refs.inner);
    }
  },

  methods: {
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