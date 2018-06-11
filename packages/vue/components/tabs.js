import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-tabs',
  props: Object.assign({
    id: [String, Number],
    animated: Boolean,
    swipeable: Boolean,
    routable: Boolean
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      animated,
      swipeable,
      id,
      style,
      className,
      routable
    } = props;
    const classes = Utils.classNames(className, {
      'tabs-animated-wrap': animated,
      'tabs-swipeable-wrap': swipeable,
      'tabs-routable': routable
    }, Mixins.colorClasses(props));

    if (animated || swipeable) {
      return _h('div', {
        style: style,
        class: classes,
        attrs: {
          id: id
        }
      }, [_h('div', {
        class: 'tabs'
      }, [this.$slots['default']])]);
    }

    return _h('div', {
      style: style,
      class: Utils.classNames('tabs', classes),
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },

  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};