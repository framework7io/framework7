import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-actions-button',
  props: Object.assign({
    id: [String, Number],
    bold: Boolean,
    close: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      id,
      className,
      style,
      bold
    } = props;
    let mediaEl;

    if (self.$slots.media && self.$slots.media.length) {
      mediaEl = _h('div', {
        class: 'actions-button-media'
      }, [this.$slots['media']]);
    }

    const classes = Utils.classNames(className, {
      'actions-button': true,
      'actions-button-bold': bold
    }, Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      class: classes,
      ref: 'el',
      attrs: {
        id: id
      }
    }, [mediaEl, _h('div', {
      class: 'actions-button-text'
    }, [this.$slots['default']])]);
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
      const self = this;
      const $$ = self.$$;
      const el = self.$refs.el;

      if (self.props.close && self.$f7 && el) {
        self.$f7.actions.close($$(el).parents('.actions-modal'));
      }

      self.dispatchEvent('click', event);
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