import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-subnavbar',
  props: Object.assign({
    id: [String, Number],
    sliding: Boolean,
    title: String,
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
      inner,
      title,
      style,
      id,
      className,
      sliding
    } = props;
    const classes = Utils.classNames(className, 'subnavbar', {
      sliding
    }, Mixins.colorClasses(props));
    return _h('div', {
      class: classes,
      style: style,
      attrs: {
        id: id
      }
    }, [inner ? _h('div', {
      class: 'subnavbar-inner'
    }, [title && _h('div', {
      class: 'title'
    }, [title]), this.$slots['default']]) : this.$slots['default']]);
  },

  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};