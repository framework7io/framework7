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
    const props = this.props;
    const {
      className,
      id,
      style,
      fabClose,
    } = props;

    const classes = Utils.classNames(
      className,
      {
        'fab-close': fabClose,
      },
      Mixins.colorClasses(props),
    );
    return (
      <a
        id={id}
        style={style}
        className={classes}
        onClick={this.onClick.bind(this)}
      ><slot /></a>
    );
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
  },
};
