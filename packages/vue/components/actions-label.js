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

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      bold
    } = props;
    const classes = Utils.classNames(className, 'actions-label', {
      'actions-button-bold': bold
    }, Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      class: classes,
      on: {
        click: self.onClick.bind(self)
      },
      attrs: {
        id: id
      }
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