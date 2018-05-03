import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const ToggleProps = Utils.extend({
  init: {
    type: Boolean,
    default: true,
  },
  checked: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  name: String,
  value: [String, Number, Array],
}, Mixins.colorProps);

export default {
  name: 'f7-toggle',
  props: ToggleProps,
  render() {
    const self = this;

    const labelClasses = Utils.classNames(
      'toggle',
      self.props.className,
      {
        disabled: self.props.disabled,
      },
      Mixins.colorClasses(self),
    );

    return (
      <label ref="el" id={self.props.id} style={self.props.style} className={labelClasses}>
        <input
          type="checkbox"
          name={self.props.name}
          disabled={self.props.disabled}
          readOnly={self.props.readonly}
          checked={self.props.checked}
          value={self.props.value}
          onChange={self.onChange.bind(self)}
        />
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
