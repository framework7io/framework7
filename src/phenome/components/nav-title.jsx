import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const NavTitleProps = Utils.extend({
  title: String,
  subtitle: String,
  sliding: Boolean,
}, Mixins.colorProps);

export default {
  name: 'f7-nav-title',
  props: NavTitleProps,
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
