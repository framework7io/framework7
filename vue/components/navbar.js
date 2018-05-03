import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7NavLeft from './nav-left';
import F7NavTitle from './nav-title';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const NavbarProps = Utils.extend({
  backLink: [
    Boolean,
    String
  ],
  backLinkUrl: String,
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
}, Mixins.colorProps);
export default {
  name: 'f7-navbar',
  props: __vueComponentGetPropKeys(NavbarProps),
  render() {
    var _h = this.$createElement;
    const self = this;
    const {backLink, backLinkUrl, sliding, title, subtitle, inner} = self.props;
    let innerEl;
    let leftEl;
    let titleEl;
    if (inner) {
      if (backLink) {
        leftEl = _h(F7NavLeft, {
          on: { backClick: self.onBackClick.bind(self) },
          attrs: {
            backLink: backLink,
            backLinkUrl: backLinkUrl
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
        class: Utils.classNames('navbar-inner', { sliding })
      }, [
        leftEl,
        titleEl,
        this.$slots['default']
      ]);
    }
    return _h('div', {
      ref: 'el',
      style: this.props.style,
      class: this.classes,
      attrs: { id: this.props.id }
    }, [
      this.$slots['before-inner'],
      innerEl,
      this.$slots['after-inner']
    ]);
  },
  updated() {
    const self = this;
    if (!self.$f7)
      return;
    const el = self.$refs.el;
    if (el && el.children && el.children.length) {
      self.$f7.navbar.size(el);
    } else if (self.$refs.inner) {
      self.$f7.navbar.size(self.$refs.inner);
    }
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, {
        navbar: true,
        'navbar-hidden': self.props.hidden,
        'no-shadow': self.props.noShadow,
        'no-hairline': self.props.noHairline
      }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  },
  methods: {
    hide(animate) {
      const self = this;
      if (!self.$f7)
        return;
      self.$f7.navbar.hide(self.$refs.el, animate);
    },
    show(animate) {
      const self = this;
      if (!self.$f7)
        return;
      self.$f7.navbar.show(self.$refs.el, animate);
    },
    size() {
      const self = this;
      if (!self.$f7)
        return;
      self.$f7.navbar.size(self.$refs.el);
    },
    onBackClick(e) {
      this.dispatchEvent('back-click backClick click:back clickBack', e);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  }
};