import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-card-content',
  props: {
    id: [String, Number],
    padding: {
      type: Boolean,
      default: true,
    },
    ...Mixins.colorProps,
  },
  render() {
    const {
      id,
      className,
      style,
      padding,
    } = this.props;

    const classes = Utils.classNames(
      className,
      {
        'card-content': true,
        'card-content-padding': padding,
      },
      Mixins.colorClasses(this),
    );

    return (<div id={id} style={style} className={classes}><slot /></div>);
  },
};
