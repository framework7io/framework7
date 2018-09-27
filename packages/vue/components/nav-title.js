import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-nav-title',
  props: Object.assign({
    id: [String, Number],
    title: String,
    subtitle: String,
    sliding: Boolean
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      title,
      subtitle,
      id,
      style,
      sliding,
      className
    } = props;
    let subtitleEl;

    if (self.subtitle) {
      subtitleEl = _h('span', {
        class: 'subtitle'
      }, [subtitle]);
    }

    const classes = Utils.classNames(className, 'title', {
      sliding
    }, Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['default'] || [title, subtitleEl]]);
  },

  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};