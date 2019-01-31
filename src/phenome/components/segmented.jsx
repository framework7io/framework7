import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-segmented',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    raised: Boolean,
    raisedIos: Boolean,
    raisedMd: Boolean,
    round: Boolean,
    roundIos: Boolean,
    roundMd: Boolean,
    tag: {
      type: String,
      default: 'div',
    },
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      raised,
      raisedIos,
      raisedMd,
      round,
      roundIos,
      roundMd,
      id,
      style,
      tag,
    } = props;
    const classNames = Utils.classNames(
      className,
      {
        segmented: true,
        'segmented-raised': raised,
        'segmented-raised-ios': raisedIos,
        'segmented-raised-md': raisedMd,
        'segmented-round': round,
        'segmented-round-ios': roundIos,
        'segmented-round-md': roundMd,
      },
      Mixins.colorClasses(props),
    );
    const SegmentedTag = tag;

    return (
      <SegmentedTag
        id={id}
        style={style}
        className={classNames}
      >
        <slot />
      </SegmentedTag>
    );
  },
};
