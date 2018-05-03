
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const FabButtonsProps = Utils.extend(
  {
    position: {
      type: String,
      default: 'top',
    },
  },
  Mixins.colorProps,
);

export default {
  name: 'f7-fab-buttons',
  props: FabButtonsProps,
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
