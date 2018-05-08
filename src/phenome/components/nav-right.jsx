import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-nav-right',
  props: {
    id: [String, Number],
    sliding: Boolean,
    ...Mixins.colorProps,
  },
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
