import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-tabs',
  props: Object.assign({
    id: [String, Number],
    animated: Boolean,
    swipeable: Boolean,
    routable: Boolean,
    swiperParams: {
      type: Object,
      default: undefined
    }
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
    const classes = Utils.classNames(className, Mixins.colorClasses(props));
    const wrapClasses = Utils.classNames({
      'tabs-animated-wrap': animated,
      'tabs-swipeable-wrap': swipeable
    });
    const tabsClasses = Utils.classNames({
      tabs: true,
      'tabs-routable': routable
    });

    if (animated || swipeable) {
      return _h('div', {
        style: style,
        class: Utils.classNames(wrapClasses, classes),
        ref: 'wrapEl',
        attrs: {
          id: id
        }
      }, [_h('div', {
        class: tabsClasses
      }, [this.$slots['default']])]);
    }

    return _h('div', {
      style: style,
      class: Utils.classNames(tabsClasses, classes),
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },

  mounted() {
    const self = this;
    const {
      swipeable,
      swiperParams
    } = self.props;
    if (!swipeable || !swiperParams) return;
    const wrapEl = self.$refs.wrapEl;
    if (!wrapEl) return;
    wrapEl.f7SwiperParams = swiperParams;
  },

  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};