import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7NavLeft from './nav-left';
import F7NavTitle from './nav-title';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
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

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      backLink,
      backLinkUrl,
      backLinkForce,
      sliding,
      title,
      subtitle,
      inner,
      className,
      id,
      style,
      hidden,
      noShadow,
      noHairline
    } = props;
    let innerEl;
    let leftEl;
    let titleEl;

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
          sliding
        })
      }, [leftEl, titleEl, this.$slots['default']]);
    }

    const classes = Utils.classNames(className, 'navbar', {
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

    onBackClick(e) {
      this.dispatchEvent('back-click backClick click:back clickBack', e);
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