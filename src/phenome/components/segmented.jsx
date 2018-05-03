import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const SegmentedProps = Utils.extend({
  raised: Boolean,
  round: Boolean,
  tag: {
    type: String,
    default: 'div',
  },
}, Mixins.colorProps);

export default {
  name: 'f7-segmented',
  props: SegmentedProps,
  render() {
    const self = this;
    const classNames = Utils.classNames(
      self.props.className,
      {
        segmented: true,
        'segmented-raised': self.props.raised,
        'segmented-round': self.props.round,
      },
      Mixins.colorClasses(self),
    );
    const SegmentedTag = self.props.tag;

    return (
      <SegmentedTag
        id={self.props.id}
        style={self.props.style}
        className={classNames}
      >
        <slot />
      </SegmentedTag>
    );
  },
};
