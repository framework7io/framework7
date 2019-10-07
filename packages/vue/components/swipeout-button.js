import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-swipeout-button',
  props: Object.assign({
    id: [String, Number],
    text: String,
    confirmTitle: String,
    confirmText: String,
    overswipe: Boolean,
    close: Boolean,
    delete: Boolean,
    href: String
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var props = this.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        overswipe = props.overswipe,
        deleteProp = props.delete,
        close = props.close,
        href = props.href,
        confirmTitle = props.confirmTitle,
        confirmText = props.confirmText,
        text = props.text;
    var classes = Utils.classNames(className, {
      'swipeout-overswipe': overswipe,
      'swipeout-delete': deleteProp,
      'swipeout-close': close
    }, Mixins.colorClasses(props));
    return _h('a', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        href: href || '#',
        id: id,
        'data-confirm': confirmText || undefined,
        'data-confirm-title': confirmTitle || undefined
      }
    }, [this.$slots['default'] || [text]]);
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