import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-subnavbar',
  props: Object.assign({
    id: [String, Number],
    sliding: Boolean,
    title: String,
    inner: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var inner = props.inner,
        title = props.title,
        style = props.style,
        id = props.id,
        className = props.className,
        sliding = props.sliding;
    var classes = Utils.classNames(className, 'subnavbar', {
      sliding: sliding
    }, Mixins.colorClasses(props));
    return _h('div', {
      class: classes,
      style: style,
      attrs: {
        id: id
      }
    }, [inner ? _h('div', {
      class: 'subnavbar-inner'
    }, [title && _h('div', {
      class: 'subnavbar-title'
    }, [title]), this.$slots['default']]) : this.$slots['default']]);
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};