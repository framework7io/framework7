import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-segmented',
  props: {
    id: [
      String,
      Number
    ],
    raised: Boolean,
    round: Boolean,
    tag: {
      type: String,
      default: 'div'
    },
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    const classNames = Utils.classNames(self.props.className, {
      segmented: true,
      'segmented-raised': self.props.raised,
      'segmented-round': self.props.round
    }, Mixins.colorClasses(self));
    const SegmentedTag = self.props.tag;
    return _h(SegmentedTag, {
      style: self.props.style,
      class: classNames,
      attrs: { id: self.props.id }
    }, [this.$slots['default']]);
  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }
  }
};