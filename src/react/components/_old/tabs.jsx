import Utils from '../shared/utils';
import Mixins from '../shared/mixins';

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
    ...colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const { animated, swipeable, id, style, className, routable } = props;

    const classes = classNames(
      className,
      colorClasses(props),
    );
    const wrapClasses = classNames({
      'tabs-animated-wrap': animated,
      'tabs-swipeable-wrap': swipeable,
    });
    const tabsClasses = classNames({
      tabs: true,
      'tabs-routable': routable,
    });

    if (animated || swipeable) {
      return (
        <div id={id} style={style} className={classNames(wrapClasses, classes)} ref="wrapEl">
          <div className={tabsClasses}>
            <slot />
          </div>
        </div>
      );
    }

    return (
      <div id={id} style={style} className={classNames(tabsClasses, classes)}>
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
