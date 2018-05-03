import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-badge',
  props: Mixins.colorProps,
  render() {
    return <span id={this.props.id} style={this.props.style} className={this.classes}><slot /></span>;
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        self.props.className,
        {
          badge: true,
        },
        Mixins.colorClasses(self),
      );
    },
  },
};
