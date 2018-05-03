import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const RowProps = Utils.extend(
  {
    noGap: Boolean,
    tag: {
      type: String,
      default: 'div',
    },
  },
  Mixins.colorProps,
);

export default {
  name: 'f7-row',
  props: RowProps,
  render() {
    const self = this;

    const RowTag = self.props.tag;

    return (
      <RowTag id={this.props.id} style={this.props.style} className={self.classes}>
        <slot />
      </RowTag>
    );
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        self.props.className,
        {
          row: true,
          'no-gap': self.props.noGap,
        },
        Mixins.colorClasses(self),
      );
    },
  },
};
