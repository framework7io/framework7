import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-nav-title',
  props: {
    id: [String, Number],
    title: String,
    subtitle: String,
    sliding: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const { title, subtitle, id, style } = self.props;
    let subtitleEl;
    if (self.subtitle) {
      subtitleEl = (<span className="subtitle">{subtitle}</span>);
    }
    return (
      <div id={id} style={style} className={self.classes}>
        <slot>{title}{subtitleEl}</slot>
      </div>
    );
  },
  computed: {
    classes() {
      return Utils.classNames(
        this.props.className,
        {
          title: true,
          sliding: this.props.sliding,
        },
        Mixins.colorClasses(this),
      );
    },
  },
};
