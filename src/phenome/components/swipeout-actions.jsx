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
    return (
      <div
        id={this.props.id}
        style={this.props.style}
        className={this.classes}
      >
        <slot />
      </div>
    );
  },
  computed: {
    classes() {
      return Utils.classNames(
        this.props.className,
        {
          [`swipeout-actions-${this.sideComputed}`]: true,
        },
        Mixins.colorClasses(this),
      );
    },
    sideComputed() {
      const { left, right, side } = this;
      if (!side) {
        if (left) return 'left';
        if (right) return 'right';
        return 'right';
      }
      return side;
    },
  },
};
