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

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      className
    } = props;
    let paginationEl;
    let scrollbarEl;
    let buttonNextEl;
    let buttonPrevEl;

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

    const classes = Utils.classNames(className, 'swiper-container', Mixins.colorClasses(props));
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
    paginationComputed() {
      const self = this;
      const {
        pagination,
        params
      } = self.props;

      if (pagination === true || params && params.pagination && !params.pagination.el) {
        return true;
      }

      return false;
    },

    scrollbarComputed() {
      const self = this;
      const {
        scrollbar,
        params
      } = self.props;

      if (scrollbar === true || params && params.scrollbar && !params.scrollbar.el) {
        return true;
      }

      return false;
    },

    navigationComputed() {
      const self = this;
      const {
        navigation,
        params
      } = self.props;

      if (navigation === true || params && params.navigation && !params.navigation.nextEl && !params.navigation.prevEl) {
        return true;
      }

      return false;
    },

    props() {
      return __vueComponentProps(this);
    }

  },

  updated() {
    const self = this;

    if (!self.initialUpdate) {
      self.initialUpdate = true;
      return;
    }

    if (self.swiper && self.swiper.update) self.swiper.update();
  },

  mounted() {
    const self = this;
    if (!self.props.init) return;
    self.$f7ready(f7 => {
      const newParams = {
        pagination: {},
        navigation: {},
        scrollbar: {}
      };
      const {
        params,
        pagination,
        navigation,
        scrollbar
      } = self.props;
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

  beforeDestroy() {
    const self = this;
    if (!self.props.init) return;
    if (self.swiper && self.swiper.destroy) self.swiper.destroy();
  }

};