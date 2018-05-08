import Mixins from '../utils/mixins';
import Utils from '../utils/utils';

export default {
  name: 'f7-actions-label',
  props: {
    id: [String, Number],
    bold: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;

    const classes = Utils.classNames(
      self.props.className,
      {
        'actions-label': true,
        'actions-button-bold': self.props.bold,
      },
      Mixins.colorClasses(self),
    );
    return (
      <div id={self.props.id} style={self.props.style} className={classes} onClick={self.onClick.bind(self)}>
        <slot />
      </div>
    );
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
  },
};
