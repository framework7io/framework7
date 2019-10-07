import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-actions-label',
  props: Object.assign({
    id: [String, Number],
    bold: Boolean
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        bold = props.bold;
    var classes = Utils.classNames(className, 'actions-label', {
      'actions-button-bold': bold
    }, Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      class: classes,
      ref: 'el',
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },
  created: function created() {
    Utils.bindMethods(this, ['onClick']);
  },
  mounted: function mounted() {
    this.$refs.el.addEventListener('click', this.onClick);
  },
  beforeDestroy: function beforeDestroy() {
    this.$refs.el.removeEventListener('click', this.onClick);
  },
  methods: {
    onClick: function onClick(event) {
      this.dispatchEvent('click', event);
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