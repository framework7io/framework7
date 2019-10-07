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
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var image = props.image,
        checked = props.checked,
        id = props.id,
        className = props.className,
        style = props.style;
    var classes = Utils.classNames(className, 'messagebar-sheet-image', 'checkbox', Mixins.colorClasses(props));
    var styles = Utils.extend({
      backgroundImage: image && "url(".concat(image, ")")
    }, style || {});
    var inputEl;
    {
      inputEl = _h('input', {
        ref: 'inputEl',
        domProps: {
          checked: checked
        },
        on: {
          change: self.onChange
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
  created: function created() {
    Utils.bindMethods(this, ['onChange']);
  },
  methods: {
    onChange: function onChange(event) {
      if (this.props.checked) this.dispatchEvent('checked', event);else this.dispatchEvent('unchecked', event);
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