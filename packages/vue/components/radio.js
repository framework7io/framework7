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
      style,
      className
    } = props;
    let inputEl;
    {
      inputEl = _h('input', {
        domProps: {
          value,
          disabled,
          readonly,
          checked
        },
        on: {
          change: self.onChange.bind(self)
        },
        attrs: {
          type: 'radio',
          name: name
        }
      });
    }

    const iconEl = _h('i', {
      class: 'icon-radio'
    });

    const classes = Utils.classNames(className, 'radio', {
      disabled
    }, Mixins.colorClasses(props));
    return _h('label', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [inputEl, iconEl, this.$slots['default']]);
  },

  methods: {
    onChange(event) {
      this.dispatchEvent('change', event);
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