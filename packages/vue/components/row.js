import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-row',
  props: Object.assign({
    id: [String, Number],
    noGap: Boolean,
    tag: {
      type: String,
      default: 'div'
    }
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      tag,
      noGap
    } = props;
    const RowTag = tag;
    const classes = Utils.classNames(className, 'row', {
      'no-gap': noGap
    }, Mixins.colorClasses(props));
    return _h(RowTag, {
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
    onClick(e) {
      this.dispatchEvent('click', e);
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