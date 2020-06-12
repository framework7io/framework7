import Utils from '../utils/utils';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-fab-backdrop',
  props: {
    id: [String, Number]
  },

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'fab-backdrop');
    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    });
  },

  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};