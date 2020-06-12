import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-toggle',
  props: Object.assign({
    id: [String, Number],
    init: {
      type: Boolean,
      default: true
    },
    checked: Boolean,
    defaultChecked: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    name: String,
    value: [String, Number, Array]
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
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
      value
    } = props;
    const labelClasses = Utils.classNames('toggle', className, {
      disabled
    }, Mixins.colorClasses(props));
    let inputEl;
    {
      inputEl = _h('input', {
        ref: 'inputEl',
        domProps: {
          disabled,
          readOnly: readonly,
          value,
          checked
        },
        on: {
          change: self.onChange
        },
        attrs: {
          type: 'checkbox',
          name: name
        }
      });
    }
    return _h('label', {
      ref: 'el',
      style: style,
      class: labelClasses,
      attrs: {
        id: id
      }
    }, [inputEl, _h('span', {
      class: 'toggle-icon'
    })]);
  },

  watch: {
    'props.checked': function watchChecked(newValue) {
      const self = this;
      if (!self.f7Toggle) return;
      self.f7Toggle.checked = newValue;
    }
  },

  created() {
    Utils.bindMethods(this, ['onChange']);
  },

  mounted() {
    const self = this;
    if (!self.props.init) return;
    self.$f7ready(f7 => {
      self.f7Toggle = f7.toggle.create({
        el: self.$refs.el,
        on: {
          change(toggle) {
            self.dispatchEvent('toggle:change toggleChange', toggle.checked);
          }

        }
      });
    });
  },

  beforeDestroy() {
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

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};