import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-toolbar',
  props: {
    id: [
      String,
      Number
    ],
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
    },
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    return _h('div', {
      ref: 'el',
      class: self.classes
    }, [
      this.$slots['before-inner'],
      self.props.inner ? _h('div', { class: 'toolbar-inner' }, [this.$slots['default']]) : this.$slots['default'],
      this.$slots['after-inner']
    ]);
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
      if (self.props.tabbar)
        f7.toolbar.setHighlight(self.$refs.el);
    });
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, {
        toolbar: true,
        'toolbar-bottom-md': self.props.bottomMd,
        tabbar: self.props.tabbar,
        'tabbar-labels': self.props.labels,
        'tabbar-scrollable': self.props.scrollable,
        'toolbar-hidden': self.props.hidden,
        'no-shadow': self.props.noShadow,
        'no-hairline': self.props.noHairline
      }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this);
    }
  },
  methods: {
    hide(animate) {
      const self = this;
      if (!self.$f7)
        return;
      self.$f7.toolbar.hide(this.$refs.el, animate);
    },
    show(animate) {
      const self = this;
      if (!self.$f7)
        return;
      self.$f7.toolbar.show(this.$refs.el, animate);
    }
  }
};