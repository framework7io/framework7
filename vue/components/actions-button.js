import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-actions-button',
  props: {
    id: [
      String,
      Number
    ],
    bold: Boolean,
    close: {
      type: Boolean,
      default: true
    },
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    let mediaEl;
    if (self.$slots.media && self.$slots.media.length) {
      mediaEl = _h('div', { class: 'actions-button-media' }, [this.$slots['media']]);
    }
    return _h('div', {
      style: self.props.style,
      class: self.classes,
      ref: 'el',
      on: { click: self.onClick.bind(self) },
      attrs: { id: self.props.id }
    }, [
      mediaEl,
      _h('div', { class: 'actions-button-text' }, [this.$slots['default']])
    ]);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, {
        'actions-button': true,
        'actions-button-bold': self.props.bold
      }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this);
    }
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
  }
};