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

  render() {
    const _h = this.$createElement;
    const props = this.props;
    const {
      className,
      id,
      style,
      overswipe,
      delete: deleteProp,
      close,
      href,
      confirmTitle,
      confirmText,
      text
    } = props;
    const classes = Utils.classNames(className, {
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

  created() {
    Utils.bindMethods(this, ['onClick']);
  },

  mounted() {
    this.$refs.el.addEventListener('click', this.onClick);
  },

  beforeDestroy() {
    this.$refs.el.removeEventListener('click', this.onClick);
  },

  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
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