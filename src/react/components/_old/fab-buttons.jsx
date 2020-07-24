
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-fab-buttons',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    position: {
      type: String,
      default: 'top',
    },
    ...Mixins.colorProps,
  },
  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      position,
    } = props;

    const classes = Utils.classNames(
      className,
      'fab-buttons',
      `fab-buttons-${position}`,
      Mixins.colorClasses(props),
    );

    return (
      <div
        id={id}
        style={style}
        className={classes}
      ><slot /></div>
    );
  },
};
