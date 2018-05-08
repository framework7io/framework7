import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7CardHeader from './card-header';
import F7CardContent from './card-content';
import F7CardFooter from './card-footer';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-card',
  props: {
    id: [
      String,
      Number
    ],
    title: [
      String,
      Number
    ],
    content: [
      String,
      Number
    ],
    footer: [
      String,
      Number
    ],
    padding: {
      type: Boolean,
      default: true
    },
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    let headerEl;
    let contentEl;
    let footerEl;
    if (self.title || self.$slots && self.$slots.header) {
      headerEl = _h(F7CardHeader, [
        self.props.title,
        this.$slots['header']
      ]);
    }
    if (self.content || self.$slots && self.$slots.content) {
      contentEl = _h(F7CardContent, { attrs: { padding: this.props.padding } }, [
        self.props.content,
        this.$slots['content']
      ]);
    }
    if (self.footer || self.$slots && self.$slots.footer) {
      footerEl = _h(F7CardFooter, [
        self.props.title,
        this.$slots['footer']
      ]);
    }
    return _h('div', {
      style: this.props.style,
      class: this.classes,
      attrs: { id: this.props.id }
    }, [
      headerEl,
      contentEl,
      footerEl,
      this.$slots['default']
    ]);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, { card: true }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this);
    }
  }
};