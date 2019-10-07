import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-checkbox',
  props: Object.assign({
    id: [String, Number],
    checked: Boolean,
    indeterminate: Boolean,
    name: [Number, String],
    value: [Number, String, Boolean],
    disabled: Boolean,
    readonly: Boolean,
    defaultChecked: Boolean
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var name = props.name,
        value = props.value,
        disabled = props.disabled,
        readonly = props.readonly,
        checked = props.checked,
        defaultChecked = props.defaultChecked,
        id = props.id,
        style = props.style;
    var inputEl;
    {
      inputEl = _h('input', {
        ref: 'inputEl',
        domProps: {
          value: value,
          disabled: disabled,
          readonly: readonly,
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

    var iconEl = _h('i', {
      class: 'icon-checkbox'
    });

    return _h('label', {
      style: style,
      class: self.classes,
      attrs: {
        id: id
      }
    }, [inputEl, iconEl, this.$slots['default']]);
  },
  computed: {
    classes: function classes() {
      var self = this;
      var props = self.props;
      var className = props.className,
          disabled = props.disabled;
      return Utils.classNames(className, {
        checkbox: true,
        disabled: disabled
      }, Mixins.colorClasses(props));
    },
    props: function props() {
      return __vueComponentProps(this);
    }
  },
  created: function created() {
    Utils.bindMethods(this, ['onChange']);
  },
  mounted: function mounted() {
    var self = this;
    var inputEl = self.$refs.inputEl;
    var indeterminate = self.props.indeterminate;

    if (indeterminate && inputEl) {
      inputEl.indeterminate = true;
    }
  },
  updated: function updated() {
    var self = this;
    var inputEl = self.$refs.inputEl;
    var indeterminate = self.props.indeterminate;

    if (inputEl) {
      inputEl.indeterminate = indeterminate;
    }
  },
  methods: {
    onChange: function onChange(event) {
      this.dispatchEvent('change', event);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  }
};