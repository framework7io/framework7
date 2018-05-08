import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-nav-title',
  props: {
    id: [
      String,
      Number
    ],
    title: String,
    subtitle: String,
    sliding: Boolean,
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    const {title, subtitle, id, style} = self.props;
    let subtitleEl;
    if (self.subtitle) {
      subtitleEl = _h('span', { class: 'subtitle' }, [subtitle]);
    }
    return _h('div', {
      style: style,
      class: self.classes,
      attrs: { id: id }
    }, [this.$slots['default'] || [
        title,
        subtitleEl
      ]]);
  },
  computed: {
    classes() {
      return Utils.classNames(this.props.className, {
        title: true,
        sliding: this.props.sliding
      }, Mixins.colorClasses(this));
    },
    props() {
      return __vueComponentProps(this);
    }
  }
};