import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-swipeout-actions',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    left: Boolean,
    right: Boolean,
    side: String,
    ...Mixins.colorProps,
  },
  render() {
    const props = this.props;
    const { left, right, side, className, id, style } = props;

    let sideComputed = side;
    if (!sideComputed) {
      if (left) sideComputed = 'left';
      if (right) sideComputed = 'right';
    }

    const classes = Utils.classNames(
      className,
      `swipeout-actions-${sideComputed}`,
      Mixins.colorClasses(props),
    );

    return (
      <div
        id={id}
        style={style}
        className={classes}
      >
        <slot />
      </div>
    );
  },
};
