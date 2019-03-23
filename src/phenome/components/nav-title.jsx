import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-nav-title',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    title: String,
    subtitle: String,
    sliding: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const { title, subtitle, id, style, sliding, className } = props;
    let subtitleEl;
    if (subtitle) {
      subtitleEl = (<span className="subtitle">{subtitle}</span>);
    }

    const classes = Utils.classNames(
      className,
      'title',
      {
        sliding,
      },
      Mixins.colorClasses(props),
    );

    let children;
    const slots = self.slots;
    if (slots && Object.keys(slots).length) {
      children = [];
      Object.keys(slots).forEach((key) => {
        children.push(...slots[key]);
      });
    }
    return (
      <div id={id} style={style} className={classes}>
        {children}
        {!children && title}
        {!children && subtitleEl}
      </div>
    );
  },
};
