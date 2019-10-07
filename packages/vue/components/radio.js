import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-radio',
  props: Object.assign({
    id: [String, Number],
    checked: Boolean,
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
        style = props.style,
        className = props.className;
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
          type: 'radio',
          name: name
        }
      });
    }

    var iconEl = _h('i', {
      class: 'icon-radio'
    });

    var classes = Utils.classNames(className, 'radio', {
      disabled: disabled
    }, Mixins.colorClasses(props));
    return _h('label', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [inputEl, iconEl, this.$slots['default']]);
  },
  created: function created() {
    Utils.bindMethods(this, ['onChange']);
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
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};