import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-nav-title',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const { id, style, className } = props;

    const classes = Utils.classNames(
      className,
      'title-large',
      Mixins.colorClasses(props),
    );

    const children = [];
    const slots = self.slots;
    if (slots && Object.keys(slots).length) {
      Object.keys(slots).forEach((key) => {
        children.push(...slots[key]);
      });
    }

    return (
      <div id={id} style={style} className={classes}>
        <div className="title-large-text">
          {children}
        </div>
      </div>
    );
  },
};
