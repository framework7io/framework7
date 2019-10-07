import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-swiper',
  props: Object.assign({
    id: [String, Number],
    params: Object,
    pagination: Boolean,
    scrollbar: Boolean,
    navigation: Boolean,
    init: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var id = props.id,
        style = props.style,
        className = props.className;
    var paginationEl;
    var scrollbarEl;
    var buttonNextEl;
    var buttonPrevEl;

    if (self.paginationComputed) {
      paginationEl = _h('div', {
        ref: 'paginationEl',
        class: 'swiper-pagination'
      });
    }

    if (self.scrollbarComputed) {
      scrollbarEl = _h('div', {
        ref: 'scrollbarEl',
        class: 'swiper-scrollbar'
      });
    }

    if (self.navigationComputed) {
      buttonNextEl = _h('div', {
        ref: 'nextEl',
        class: 'swiper-button-next'
      });
      buttonPrevEl = _h('div', {
        ref: 'prevEl',
        class: 'swiper-button-prev'
      });
    }

    var classes = Utils.classNames(className, 'swiper-container', Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      ref: 'el',
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['before-wrapper'], _h('div', {
      class: 'swiper-wrapper'
    }, [this.$slots['default']]), paginationEl, scrollbarEl, buttonPrevEl, buttonNextEl, this.$slots['after-wrapper']]);
  },
  computed: {
    paginationComputed: function paginationComputed() {
      var self = this;
      var _self$props = self.props,
          pagination = _self$props.pagination,
          params = _self$props.params;

      if (pagination === true || params && params.pagination && !params.pagination.el) {
        return true;
      }

      return false;
    },
    scrollbarComputed: function scrollbarComputed() {
      var self = this;
      var _self$props2 = self.props,
          scrollbar = _self$props2.scrollbar,
          params = _self$props2.params;

      if (scrollbar === true || params && params.scrollbar && !params.scrollbar.el) {
        return true;
      }

      return false;
    },
    navigationComputed: function navigationComputed() {
      var self = this;
      var _self$props3 = self.props,
          navigation = _self$props3.navigation,
          params = _self$props3.params;

      if (navigation === true || params && params.navigation && !params.navigation.nextEl && !params.navigation.prevEl) {
        return true;
      }

      return false;
    },
    props: function props() {
      return __vueComponentProps(this);
    }
  },
  updated: function updated() {
    var self = this;

    if (!self.initialUpdate) {
      self.initialUpdate = true;
      return;
    }

    if (self.swiper && self.swiper.update) self.swiper.update();
  },
  mounted: function mounted() {
    var self = this;
    if (!self.props.init) return;
    self.$f7ready(function (f7) {
      var newParams = {
        pagination: {},
        navigation: {},
        scrollbar: {}
      };
      var _self$props4 = self.props,
          params = _self$props4.params,
          pagination = _self$props4.pagination,
          navigation = _self$props4.navigation,
          scrollbar = _self$props4.scrollbar;
      if (params) Utils.extend(newParams, params);
      if (pagination && !newParams.pagination.el) newParams.pagination.el = self.$refs.paginationEl;

      if (navigation && !newParams.navigation.nextEl && !newParams.navigation.prevEl) {
        newParams.navigation.nextEl = self.$refs.nextEl;
        newParams.navigation.prevEl = self.$refs.prevEl;
      }

      if (scrollbar && !newParams.scrollbar.el) newParams.scrollbar.el = self.$refs.scrollbarEl;
      self.swiper = f7.swiper.create(self.$refs.el, newParams);
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    if (!self.props.init) return;
    if (self.swiper && self.swiper.destroy) self.swiper.destroy();
  }
};