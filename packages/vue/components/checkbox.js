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

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      name,
      value,
      disabled,
      readonly,
      checked,
      defaultChecked,
      id,
      style
    } = props;
    let inputEl;
    {
      inputEl = _h('input', {
        ref: 'inputEl',
        domProps: {
          value,
          disabled,
          readonly,
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

    const iconEl = _h('i', {
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
    classes() {
      const self = this;
      const props = self.props;
      const {
        className,
        disabled
      } = props;
      return Utils.classNames(className, {
        checkbox: true,
        disabled
      }, Mixins.colorClasses(props));
    },

    props() {
      return __vueComponentProps(this);
    }

  },

  created() {
    Utils.bindMethods(this, ['onChange']);
  },

  mounted() {
    const self = this;
    const {
      inputEl
    } = self.$refs;
    const {
      indeterminate
    } = self.props;

    if (indeterminate && inputEl) {
      inputEl.indeterminate = true;
    }
  },

  updated() {
    const self = this;
    const {
      inputEl
    } = self.$refs;
    const {
      indeterminate
    } = self.props;

    if (inputEl) {
      inputEl.indeterminate = indeterminate;
    }
  },

  methods: {
    onChange(event) {
      this.dispatchEvent('change', event);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  }
};