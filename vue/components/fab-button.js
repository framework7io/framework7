import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-fab-button',
  props: {
    id: [
      String,
      Number
    ],
    fabClose: Boolean,
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const props = this.props;
    const {className, id, style, fabClose} = props;
    const classes = Utils.classNames(className, { 'fab-close': fabClose }, Mixins.colorClasses(props));
    return _h('a', {
      style: style,
      class: classes,
      on: { click: this.onClick.bind(this) },
      attrs: { id: id }
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