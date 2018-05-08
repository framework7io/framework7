import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-radio',
  props: {
    id: [String, Number],
    checked: Boolean,
    name: [Number, String],
    value: [Number, String, Boolean],
    disabled: Boolean,
    readonly: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const { name, value, disabled, readonly, checked } = self;

    const inputEl = (
      <input
        type="radio"
        name={name}
        value={value}
        disabled={disabled}
        readOnly={readonly}
        checked={checked}
        onChange={self.onChange.bind(self)}
      />
    );
    const iconEl = (<i className="icon-radio" />);

    return (
      <label id={self.props.id} style={self.props.style} className={self.classes}>
        {inputEl}
        {iconEl}
        <slot />
      </label>
    );
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        self.props.className,
        {
          radio: true,
          disabled: self.disabled,
        },
        Mixins.colorClasses(self),
      );
    },
  },
  methods: {
    onChange(event) {
      this.dispatchEvent('change', event);
    },
  },
};
