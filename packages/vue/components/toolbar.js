import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
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

  data() {
    const props = __vueComponentProps(this);

    const state = (() => {
      const self = this;
      const $f7 = self.$f7;

      if (!$f7) {
        self.$f7ready(() => {
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
      state
    };
  },

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      className,
      inner,
      tabbar,
      labels,
      scrollable,
      hidden,
      noShadow,
      noHairline,
      noBorder,
      topMd,
      topIos,
      topAurora,
      top,
      bottomMd,
      bottomIos,
      bottomAurora,
      bottom,
      position
    } = props;
    const theme = self.state._theme;
    const classes = Utils.classNames(className, 'toolbar', {
      tabbar,
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

  updated() {
    const self = this;

    if (self.props.tabbar && self.$f7) {
      self.$f7.toolbar.setHighlight(self.$refs.el);
    }
  },

  mounted() {
    const self = this;
    self.$f7ready(f7 => {
      if (self.props.tabbar) f7.toolbar.setHighlight(self.$refs.el);
    });
  },

  methods: {
    hide(animate) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.toolbar.hide(this.$refs.el, animate);
    },

    show(animate) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.toolbar.show(this.$refs.el, animate);
    },

    setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};