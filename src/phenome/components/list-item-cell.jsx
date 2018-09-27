import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-list-item-cell',
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
      'item-cell',
      Mixins.colorClasses(props),
    );
    return (<div id={id} style={style} className={classes}><slot /></div>);
  },
};
