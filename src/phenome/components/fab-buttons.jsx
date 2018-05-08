
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-fab-buttons',
  props: {
    id: [String, Number],
    position: {
      type: String,
      default: 'top',
    },
    ...Mixins.colorProps,
  },
  render() {
    return (
      <div
        id={this.props.id}
        style={this.props.style}
        className={this.classes}
      ><slot /></div>
    );
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        self.props.className,
        {
          'fab-buttons': true,
          [`fab-buttons-${self.props.position}`]: true,
        },
        Mixins.colorClasses(self),
      );
    },
  },
};
