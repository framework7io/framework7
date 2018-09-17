import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    ...Mixins.colorProps,
  },
  name: 'f7-accordion-content',
  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
    } = props;

    const classes = Utils.classNames(
      className,
      'accordion-item-content',
      Mixins.colorClasses(props),
    );
    return (
      <div id={id} style={style} className={classes}>
        <slot />
      </div>
    );
  },
};
