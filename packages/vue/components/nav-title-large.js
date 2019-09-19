import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-nav-title',
  props: Object.assign({
    id: [String, Number]
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      className
    } = props;
    const classes = Utils.classNames(className, 'title-large', Mixins.colorClasses(props));
    const children = [];
    const slots = self.$slots;

    if (slots && Object.keys(slots).length) {
      Object.keys(slots).forEach(key => {
        children.push(...slots[key]);
      });
    }

    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [_h('div', {
      class: 'title-large-text'
    }, [children])]);
  },

  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};