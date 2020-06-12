import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-block-title',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    large: Boolean,
    medium: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      large,
      medium,
    } = props;

    const classes = Utils.classNames(
      className,
      'block-title',
      {
        'block-title-large': large,
        'block-title-medium': medium,
      },
      Mixins.colorClasses(props),
    );
    return (<div id={id} style={style} className={classes}><slot /></div>);
  },
};
