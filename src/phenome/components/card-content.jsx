import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-card-content',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    padding: {
      type: Boolean,
      default: true,
    },
    ...Mixins.colorProps,
  },
  render() {
    const props = this.props;
    const {
      id,
      className,
      style,
      padding,
    } = props;

    const classes = Utils.classNames(
      className,
      'card-content',
      {
        'card-content-padding': padding,
      },
      Mixins.colorClasses(props),
    );

    return (<div id={id} style={style} className={classes}><slot /></div>);
  },
};
