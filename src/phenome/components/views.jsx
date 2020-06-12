import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-views',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    tabs: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      tabs,
    } = props;

    const classes = Utils.classNames(
      className,
      'views',
      {
        tabs,
      },
      Mixins.colorClasses(props),
    );
    return (
      <div id={id} style={style} className={classes}>
        <slot />
      </div>
    );
  },
};
