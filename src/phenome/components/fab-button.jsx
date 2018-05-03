import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const FabButtonProps = Utils.extend(
  {
    fabClose: Boolean,
  },
  Mixins.colorProps,
);

export default {
  name: 'f7-fab-button',
  props: FabButtonProps,
  render() {
    return (
      <a
        id={this.props.id}
        style={this.props.style}
        className={this.classes}
        onClick={this.onClick.bind(this)}
      ><slot /></a>
    );
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        self.props.className,
        {
          'fab-close': self.fabClose,
        },
        Mixins.colorClasses(self),
      );
    },
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
  },
};
