import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-statusbar',
  props: Mixins.colorProps,
  render() {
    return (
      <div id={this.props.id} style={this.props.style} className={this.classes} />
    );
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        self.props.className,
        'statusbar',
        Mixins.colorClasses(self),
      );
    },
  },
};
