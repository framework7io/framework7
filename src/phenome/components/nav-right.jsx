import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const NavRightProps = Utils.extend({
  sliding: Boolean,
}, Mixins.colorProps);

export default {
  name: 'f7-nav-right',
  props: NavRightProps,
  render() {
    return (
      <div id={this.props.id} style={this.props.style} className={this.classes}>
        <slot />
      </div>
    );
  },
  computed: {
    classes() {
      return Utils.classNames(
        this.props.className,
        {
          right: true,
          sliding: this.props.slidng,
        },
        Mixins.colorClasses(this),
      );
    },
  },
};
