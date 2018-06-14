import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-fab-button',
  props: {
    id: [String, Number],
    fabClose: Boolean,
    label: String,
    target: String,
    ...Mixins.colorProps,
  },
  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      fabClose,
      label,
      target,
    } = props;

    const classes = Utils.classNames(
      className,
      {
        'fab-close': fabClose,
        'fab-label-button': label,
      },
      Mixins.colorClasses(props),
    );

    let labelEl;
    if (label) {
      labelEl = (
        <span className="fab-label">{label}</span>
      );
    }

    return (
      <a
        id={id}
        style={style}
        target={target}
        className={classes}
        onClick={this.onClick.bind(this)}
      >
        <slot />
        {labelEl}
      </a>
    );
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
  },
};
