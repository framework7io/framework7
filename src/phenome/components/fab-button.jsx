import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-fab-button',
  props: {
    id: [String, Number],
    fabClose: Boolean,
    ...Mixins.colorProps,
  },
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
