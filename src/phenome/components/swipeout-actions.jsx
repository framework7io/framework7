import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-swipeout-actions',
  props: {
    id: [String, Number],
    left: Boolean,
    right: Boolean,
    side: String,
    ...Mixins.colorProps,
  },
  render() {
    const { left, right, side, className, id, style } = this.props;

    let sideComputed = side;
    if (!sideComputed) {
      if (left) sideComputed = 'left';
      if (right) sideComputed = 'right';
    }

    const classes = Utils.classNames(
      className,
      {
        [`swipeout-actions-${sideComputed}`]: true,
      },
      Mixins.colorClasses(this),
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
