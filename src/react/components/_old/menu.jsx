import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-menu',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const { id, className, style } = props;

    return (
      <div className={Utils.classNames('menu', Mixins.colorClasses(props), className)} id={id} style={style}>
        <div className="menu-inner">
          <slot />
        </div>
      </div>
    );
  },
};
