import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-tabs',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    animated: Boolean,
    swipeable: Boolean,
    routable: Boolean,
    swiperParams: {
      type: Object,
      default: undefined,
    },
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const { animated, swipeable, id, style, className, routable } = props;

    const classes = Utils.classNames(
      className,
      Mixins.colorClasses(props),
    );
    const wrapClasses = Utils.classNames({
      'tabs-animated-wrap': animated,
      'tabs-swipeable-wrap': swipeable,
    });
    const tabsClasses = Utils.classNames({
      tabs: true,
      'tabs-routable': routable,
    });

    if (animated || swipeable) {
      return (
        <div id={id} style={style} className={Utils.classNames(wrapClasses, classes)} ref="wrapEl">
          <div className={tabsClasses}>
            <slot />
          </div>
        </div>
      );
    }

    return (
      <div id={id} style={style} className={Utils.classNames(tabsClasses, classes)}>
        <slot />
      </div>
    );
  },
  componentDidMount() {
    const self = this;
    const { swipeable, swiperParams } = self.props;
    if (!swipeable || !swiperParams) return;
    const wrapEl = self.refs.wrapEl;
    if (!wrapEl) return;
    wrapEl.f7SwiperParams = swiperParams;
  },
};
