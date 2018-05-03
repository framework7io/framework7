
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const ListGroupProps = Utils.extend(
  {
    mediaList: Boolean,
    sortable: Boolean,
  },
  Mixins.colorProps,
);

export default {
  name: 'f7-list-group',
  props: ListGroupProps,
  render() {
    return (
      <div id={this.props.id} style={this.props.style} className={this.classes}>
        <ul>
          <slot />
        </ul>
      </div>
    );
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        this.props.className,
        'list-group',
        Mixins.colorClasses(self),
      );
    },
  },
};
