import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-subnavbar',
  props: {
    id: [
      String,
      Number
    ],
    sliding: Boolean,
    title: String,
    inner: {
      type: Boolean,
      default: true
    },
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    const {inner, title} = self.props;
    return _h('div', { class: self.classes }, [inner ? _h('div', { class: 'subnavbar-inner' }, [
        title && _h('div', { class: 'title' }, [title]),
        this.$slots['default']
      ]) : this.$slots['default']]);
  },
  computed: {
    classes() {
      return Utils.classNames(this.props.className, {
        subnavbar: true,
        sliding: this.props.sliding
      }, Mixins.colorClasses(this));
    },
    props() {
      return __vueComponentProps(this);
    }
  }
};