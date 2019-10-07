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
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var animated = props.animated,
        swipeable = props.swipeable,
        id = props.id,
        style = props.style,
        className = props.className,
        routable = props.routable;
    var classes = Utils.classNames(className, Mixins.colorClasses(props));
    var wrapClasses = Utils.classNames({
      'tabs-animated-wrap': animated,
      'tabs-swipeable-wrap': swipeable
    });
    var tabsClasses = Utils.classNames({
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
  mounted: function mounted() {
    var self = this;
    var _self$props = self.props,
        swipeable = _self$props.swipeable,
        swiperParams = _self$props.swiperParams;
    if (!swipeable || !swiperParams) return;
    var wrapEl = self.$refs.wrapEl;
    if (!wrapEl) return;
    wrapEl.f7SwiperParams = swiperParams;
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};