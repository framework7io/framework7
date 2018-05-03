import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-messagebar-attachments',
  props: Mixins.colorProps,
  render() {
    return (
      <div id={this.props.id} style={this.props.style} className={this.classes}>
        <slot />
      </div>
    );
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        'messagebar-attachments',
        self.props.className,
        Mixins.colorClasses(self),
      );
    },
  },
};

