import Mixins from '../utils/mixins';
import Utils from '../utils/utils';

export default {
  name: 'f7-actions-label',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    bold: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      bold,
    } = props;

    const classes = Utils.classNames(
      className,
      'actions-label',
      {
        'actions-button-bold': bold,
      },
      Mixins.colorClasses(props),
    );
    return (
      <div id={id} style={style} className={classes} onClick={self.onClick.bind(self)}>
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
