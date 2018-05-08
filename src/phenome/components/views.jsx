import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-views',
  props: {
    id: [String, Number],
    tabs: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const classes = Utils.classNames(
      self.props.className,
      'views',
      {
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
