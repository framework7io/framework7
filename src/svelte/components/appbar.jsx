import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-appbar',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    noShadow: Boolean,
    noHairline: Boolean,
    inner: {
      type: Boolean,
      default: true,
    },
    innerClass: String,
    innerClassName: String,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      inner,
      innerClass,
      innerClassName,
      className,
      id,
      style,
      noShadow,
      noHairline,
    } = props;

    let innerEl;

    if (inner) {
      innerEl = (
        <div
          ref="inner"
          className={Utils.classNames(
            'appbar-inner',
            innerClass,
            innerClassName,
          )}
        >
          <slot />
        </div>
      );
    }
    const classes = Utils.classNames(
      className,
      'appbar',
      {
        'no-shadow': noShadow,
        'no-hairline': noHairline,
      },
      Mixins.colorClasses(props),
    );

    return (
      <div ref="el" id={id} style={style} className={classes}>
        <slot name="before-inner" />
        {innerEl || self.slots.default}
        <slot name="after-inner" />
      </div>
    );
  },
};
