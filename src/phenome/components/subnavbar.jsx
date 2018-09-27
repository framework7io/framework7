import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-subnavbar',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    sliding: Boolean,
    title: String,
    inner: {
      type: Boolean,
      default: true,
    },
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const { inner, title, style, id, className, sliding } = props;

    const classes = Utils.classNames(
      className,
      'subnavbar',
      {
        sliding,
      },
      Mixins.colorClasses(props),
    );
    return (
      <div className={classes} id={id} style={style}>
        {inner ? (
          <div className="subnavbar-inner">
            {title && <div className="title">{title}</div>}
            <slot />
          </div>
        ) : (
          <slot />
        )}
      </div>
    );
  },
};
