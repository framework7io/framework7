import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-actions-label',
  props: {
    id: [
      String,
      Number
    ],
    bold: Boolean,
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    const classes = Utils.classNames(self.props.className, {
      'actions-label': true,
      'actions-button-bold': self.props.bold
    }, Mixins.colorClasses(self));
    return _h('div', {
      style: self.props.style,
      class: classes,
      on: { click: self.onClick.bind(self) },
      attrs: { id: self.props.id }
    }, [this.$slots['default']]);
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