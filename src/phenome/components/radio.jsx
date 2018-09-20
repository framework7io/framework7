import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-radio',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    checked: Boolean,
    name: [Number, String],
    value: [Number, String, Boolean],
    disabled: Boolean,
    readonly: Boolean,
    defaultChecked: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      name, value, disabled, readonly, checked, defaultChecked, id, style, className,
    } = props;

    let inputEl;
    if (process.env.COMPILER === 'react') {
      inputEl = (
        <input
          type="radio"
          name={name}
          value={value}
          disabled={disabled}
          readOnly={readonly}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={self.onChange.bind(self)}
        />
      );
    }
    if (process.env.COMPILER === 'vue') {
      inputEl = (
        <input
          type="radio"
          name={name}
          onChange={self.onChange.bind(self)}
          domProps={{
            value,
            disabled,
            readonly,
            checked,
          }}
        />
      );
    }
    const iconEl = (<i className="icon-radio" />);

    const classes = Utils.classNames(
      className,
      'radio',
      {
        disabled,
      },
      Mixins.colorClasses(props),
    );

    return (
      <label id={id} style={style} className={classes}>
        {inputEl}
        {iconEl}
        <slot />
      </label>
    );
  },
  methods: {
    onChange(event) {
      this.dispatchEvent('change', event);
    },
  },
};
