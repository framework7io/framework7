import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const ViewsProps = Utils.extend(
  {
    tabs: Boolean,
  },
  Mixins.colorProps,
);

export default {
  name: 'f7-views',
  props: ViewsProps,
  render() {
    const self = this;
    const classes = Utils.classNames(
      self.props.className,
      {
        views: true,
        tabs: self.props.tabs,
      },
      Mixins.colorClasses(self),
    );
    return (
      <div id={self.props.id} style={self.props.style} className={classes}>
        <slot />
      </div>
    );
  },
};
