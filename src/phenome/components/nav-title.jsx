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
    const props = self.props;
    const { title, subtitle, id, style, sliding, className } = props;
    let subtitleEl;
    if (self.subtitle) {
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
    return (
      <div id={id} style={style} className={classes}>
        <slot>{title}{subtitleEl}</slot>
      </div>
    );
  },
};
