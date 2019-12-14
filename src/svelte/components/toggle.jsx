import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

/* phenome-dts-imports
import { Toggle as ToggleNamespace } from 'framework7/components/toggle/toggle';
*/

/* phenome-dts-instance
f7Toggle: ToggleNamespace.Toggle
*/

export default {
  name: 'f7-toggle',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
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
          ref="inputEl"
          type="checkbox"
          name={name}
          disabled={disabled}
          readOnly={readonly}
          checked={checked}
          defaultChecked={defaultChecked}
          value={value}
          onChange={self.onChange}
        />
      );
    }
    if (process.env.COMPILER === 'vue') {
      inputEl = (
        <input
          ref="inputEl"
          type="checkbox"
          name={name}
          onChange={self.onChange}
          domProps={{
            disabled,
            readOnly: readonly,
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
  componentDidCreate() {
    Utils.bindMethods(this, ['onChange'])
  },
  componentDidMount() {
    const self = this;
    if (!self.props.init) return;
    self.$f7ready((f7) => {
      self.f7Toggle = f7.toggle.create({
        el: self.refs.el,
        on: {
          change(toggle) {
            const checked = toggle.checked;
            self.dispatchEvent('toggle:change toggleChange', checked);
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
    onChange(event) {
      const self = this;
      self.dispatchEvent('change', event);
    },
  },
};
