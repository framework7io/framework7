import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-label',
  props: Object.assign({
    id: [String, Number],
    floating: Boolean,
    inline: Boolean
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      inline,
      id,
      style,
      className,
      floating
    } = props;
    const classes = Utils.classNames(className, 'item-title', {
      'item-label-inline': inline,
      'item-label': !floating,
      'item-floating-label': floating
    }, Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },

  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};