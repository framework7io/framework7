import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
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

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      className,
      inner,
      bottomMd,
      tabbar,
      labels,
      scrollable,
      hidden,
      noShadow,
      noHairline
    } = props;
    const classes = Utils.classNames(className, 'toolbar', {
      'toolbar-bottom-md': bottomMd,
      tabbar,
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
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};