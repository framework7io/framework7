import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
export default {
  name: 'f7-actions-button',
  props: __vueComponentGetPropKeys({
    bold: Boolean,
    close: {
      type: Boolean,
      default: true
    },
    ...Mixins.colorProps
  }),
  render() {
    var _h = this.$createElement;
    const self = this;
    let mediaEl;
    if (self.$slots.media && self.$slots.media.length) {
      mediaEl = _h('div', { class: 'actions-button-media' }, [this.$slots['media']]);
    }
    return _h('div', {
      style: self.props.style,
      class: self.className,
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
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  },
  methods: {
    onClick(event) {
      const self = this;
      const $$ = self.$$;
      if (self.props.close && self.$f7) {
        self.$f7.actions.close($$(self.$el).parents('.actions-modal'));
      }
      self.dispatchEvent('click', event);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  }
};