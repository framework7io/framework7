import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-toggle',
  props: {
    id: [String, Number],
    init: {
      type: Boolean,
      default: true,
    },
    checked: Boolean,
    defaultChecked: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    name: String,
    value: [String, Number, Array],
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      disabled,
      id,
      style,
      name,
      readonly,
      checked,
      defaultChecked,
      value,
    } = props;

    const labelClasses = Utils.classNames(
      'toggle',
      className,
      {
        disabled,
      },
      Mixins.colorClasses(props),
    );
    let inputEl;
    if (process.env.COMPILER === 'react') {
      inputEl = (
        <input
          type="checkbox"
          name={name}
          disabled={disabled}
          readOnly={readonly}
          checked={checked}
          defaultChecked={defaultChecked}
          value={value}
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
            disabled,
            readonly,
            value,
            checked,
          }}
        />
      );
    }
    return (
      <label ref="el" id={id} style={style} className={labelClasses}>
        {inputEl}
        <span className="toggle-icon" />
      </label>
    );
  },
  watch: {
    'props.checked': function watchChecked(newValue) {
      const self = this;
      if (!self.f7Toggle) return;
      self.f7Toggle.checked = newValue;
    },
  },
  componentDidMount() {
    const self = this;
    if (!self.props.init) return;
    self.$f7ready((f7) => {
      self.f7Toggle = f7.toggle.create({
        el: self.refs.el,
        on: {
          change(toggle) {
            self.dispatchEvent('toggle:change toggleChange', toggle.checked);
          },
        },
      });
    });
  },
  componentWillUnmount() {
    const self = this;
    if (self.f7Toggle && self.f7Toggle.destroy && self.f7Toggle.$el) self.f7Toggle.destroy();
  },
  methods: {
    toggle() {
      const self = this;
      if (self.f7Toggle && self.f7Toggle.toggle) self.f7Toggle.toggle();
    },
    onChange(e) {
      const self = this;
      self.dispatchEvent('change', e);
    },
  },
};
