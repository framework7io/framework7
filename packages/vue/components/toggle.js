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
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var className = props.className,
        disabled = props.disabled,
        id = props.id,
        style = props.style,
        name = props.name,
        readonly = props.readonly,
        checked = props.checked,
        defaultChecked = props.defaultChecked,
        value = props.value;
    var labelClasses = Utils.classNames('toggle', className, {
      disabled: disabled
    }, Mixins.colorClasses(props));
    var inputEl;
    {
      inputEl = _h('input', {
        ref: 'inputEl',
        domProps: {
          disabled: disabled,
          readOnly: readonly,
          value: value,
          checked: checked
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
      var self = this;
      if (!self.f7Toggle) return;
      self.f7Toggle.checked = newValue;
    }
  },
  created: function created() {
    Utils.bindMethods(this, ['onChange']);
  },
  mounted: function mounted() {
    var self = this;
    if (!self.props.init) return;
    self.$f7ready(function (f7) {
      self.f7Toggle = f7.toggle.create({
        el: self.$refs.el,
        on: {
          change: function change(toggle) {
            var checked = toggle.checked;
            self.dispatchEvent('toggle:change toggleChange', checked);
          }
        }
      });
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    if (self.f7Toggle && self.f7Toggle.destroy && self.f7Toggle.$el) self.f7Toggle.destroy();
  },
  methods: {
    toggle: function toggle() {
      var self = this;
      if (self.f7Toggle && self.f7Toggle.toggle) self.f7Toggle.toggle();
    },
    onChange: function onChange(event) {
      var self = this;
      self.dispatchEvent('change', event);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};