import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const SubnavbarProps = Utils.extend({
  sliding: Boolean,
  title: String,
  inner: {
    type: Boolean,
    default: true,
  },
}, Mixins.colorProps);

export default {
  name: 'f7-subnavbar',
  props: SubnavbarProps,
  render() {
    const self = this;
    const { inner, title } = self.props;
    return (
      <div className={self.classes}>
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
  computed: {
    classes() {
      return Utils.classNames(
        this.props.className,
        {
          subnavbar: true,
          sliding: this.props.sliding,
        },
        Mixins.colorClasses(this),
      );
    },
  },
};
