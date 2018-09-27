import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-badge',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    ...Mixins.colorProps,
  },
  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
    } = props;

    const classes = Utils.classNames(
      className,
      'badge',
      Mixins.colorClasses(props),
    );
    return <span id={id} style={style} className={classes}><slot /></span>;
  },
};
