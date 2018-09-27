import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-swipeout-button',
  props: Object.assign({
    id: [String, Number],
    text: String,
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
      confirmText,
      text
    } = props;
    const classes = Utils.classNames(className, {
      'swipeout-overswipe': overswipe,
      'swipeout-delete': deleteProp,
      'swipeout-close': close
    }, Mixins.colorClasses(props));
    return _h('a', {
      style: style,
      class: classes,
      on: {
        click: this.onClick.bind(this)
      },
      attrs: {
        href: href || '#',
        id: id,
        'data-confirm': confirmText || undefined
      }
    }, [this.$slots['default'] || [text]]);
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