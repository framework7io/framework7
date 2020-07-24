import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-menu-dropdown',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    contentHeight: String,
    position: String,
    left: Boolean,
    center: Boolean,
    right: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const { id, className, style, contentHeight, position, left, center, right } = props;
    let positionComputed = position || 'left';
    if (left) positionComputed = 'left';
    if (center) positionComputed = 'center';
    if (right) positionComputed = 'right';

    const classes = Utils.classNames(
      'menu-dropdown',
      `menu-dropdown-${positionComputed}`,
      Mixins.colorClasses(props),
      className
    );
    return (
      <div className={classes} id={id} style={style}>
        <div className="menu-dropdown-content" style={{ height: contentHeight }}>
          <slot />
        </div>
      </div>
    );
  },
};
