import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-block-footer',
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
      'block-footer',
      Mixins.colorClasses(props),
    );
    return (<div id={id} style={style} className={classes}><slot /></div>);
  },
};
