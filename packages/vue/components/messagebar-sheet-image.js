import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-messagebar-sheet-image',
  props: Object.assign({
    id: [String, Number],
    image: String,
    checked: Boolean
  }, Mixins.colorProps),

  created() {
    this.onChangeBound = this.onChange.bind(this);
  },

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      image,
      checked,
      id,
      className,
      style
    } = props;
    const classes = Utils.classNames(className, 'messagebar-sheet-image', 'checkbox', Mixins.colorClasses(props));
    const styles = Utils.extend({
      backgroundImage: image && `url(${image})`
    }, style || {});
    let inputEl;
    {
      inputEl = _h('input', {
        domProps: {
          checked
        },
        on: {
          change: self.onChangeBound
        },
        attrs: {
          type: 'checkbox'
        }
      });
    }
    return _h('label', {
      class: classes,
      style: styles,
      attrs: {
        id: id
      }
    }, [inputEl, _h('i', {
      class: 'icon icon-checkbox'
    }), this.$slots['default']]);
  },

  methods: {
    onChange(e) {
      if (this.props.checked) this.dispatchEvent('checked', e);else this.dispatchEvent('unchecked', e);
      this.dispatchEvent('change', e);
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