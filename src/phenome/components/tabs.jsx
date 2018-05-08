import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-tabs',
  props: {
    id: [String, Number],
    animated: Boolean,
    swipeable: Boolean,
    routable: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const { animated, swipeable, id, style } = self.props;

    if (animated || swipeable) {
      return (
        <div className={self.classes}>
          <div className="tabs">
            <slot />
          </div>
        </div>
      );
    }
    return (
      <div id={id} style={style} className={Utils.classNames('tabs', this.classes)}>
        <slot />
      </div>
    );
  },
  computed: {
    classes() {
      return Utils.classNames(
        this.props.className,
        {
          'tabs-animated-wrap': this.props.animated,
          'tabs-swipeable-wrap': this.props.swipeable,
          'tabs-routable': this.props.routable,
        },
        Mixins.colorClasses(this),
      );
    },
  },
};
