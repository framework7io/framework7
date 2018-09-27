import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-checkbox',
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
    const { name, value, disabled, readonly, checked, defaultChecked, id, style } = props;

    let inputEl;
    if (process.env.COMPILER === 'react') {
      inputEl = (
        <input
          type="checkbox"
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
          type="checkbox"
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
    const iconEl = (<i className="icon-checkbox" />);

    return (
      <label id={id} style={style} className={self.classes}>
        {inputEl}
        {iconEl}
        <slot />
      </label>
    );
  },
  computed: {
    classes() {
      const self = this;
      const props = self.props;
      const { className, disabled } = props;
      return Utils.classNames(
        className,
        {
          checkbox: true,
          disabled,
        },
        Mixins.colorClasses(props),
      );
    },
  },
  methods: {
    onChange(event) {
      this.dispatchEvent('change', event);
    },
  },
};
