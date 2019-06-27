import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import Preloader from './preloader';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-page-content',
  props: Object.assign({
    id: [String, Number],
    tab: Boolean,
    tabActive: Boolean,
    ptr: Boolean,
    ptrDistance: Number,
    ptrPreloader: {
      type: Boolean,
      default: true
    },
    ptrBottom: Boolean,
    ptrMousewheel: Boolean,
    infinite: Boolean,
    infiniteTop: Boolean,
    infiniteDistance: Number,
    infinitePreloader: {
      type: Boolean,
      default: true
    },
    hideBarsOnScroll: Boolean,
    hideNavbarOnScroll: Boolean,
    hideToolbarOnScroll: Boolean,
    messagesContent: Boolean,
    loginScreen: Boolean
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      ptr,
      ptrPreloader,
      ptrDistance,
      ptrBottom,
      ptrMousewheel,
      infinite,
      infinitePreloader,
      id,
      style,
      infiniteDistance,
      infiniteTop
    } = props;
    let ptrEl;
    let infiniteEl;

    if (ptr && ptrPreloader) {
      ptrEl = _h('div', {
        class: 'ptr-preloader'
      }, [_h(Preloader), _h('div', {
        class: 'ptr-arrow'
      })]);
    }

    if (infinite && infinitePreloader) {
      infiniteEl = _h(Preloader, {
        class: 'infinite-scroll-preloader'
      });
    }

    return _h('div', {
      style: style,
      class: self.classes,
      ref: 'el',
      attrs: {
        id: id,
        'data-ptr-distance': ptrDistance || undefined,
        'data-ptr-mousewheel': ptrMousewheel || undefined,
        'data-infinite-distance': infiniteDistance || undefined
      }
    }, [ptrBottom ? null : ptrEl, infiniteTop ? infiniteEl : null, self.$slots.default, infiniteTop ? null : infiniteEl, ptrBottom ? ptrEl : null]);
  },

  computed: {
    classes() {
      const self = this;
      const props = self.props;
      const {
        className,
        tab,
        tabActive,
        ptr,
        ptrBottom,
        infinite,
        infiniteTop,
        hideBarsOnScroll,
        hideNavbarOnScroll,
        hideToolbarOnScroll,
        messagesContent,
        loginScreen
      } = props;
      return Utils.classNames(className, 'page-content', {
        tab,
        'tab-active': tabActive,
        'ptr-content': ptr,
        'ptr-bottom': ptrBottom,
        'infinite-scroll-content': infinite,
        'infinite-scroll-top': infiniteTop,
        'hide-bars-on-scroll': hideBarsOnScroll,
        'hide-navbar-on-scroll': hideNavbarOnScroll,
        'hide-toolbar-on-scroll': hideToolbarOnScroll,
        'messages-content': messagesContent,
        'login-screen-content': loginScreen
      }, Mixins.colorClasses(props));
    },

    props() {
      return __vueComponentProps(this);
    }

  },

  created() {
    Utils.bindMethods(this, ['onPtrPullStart', 'onPtrPullMove', 'onPtrPullEnd', 'onPtrRefresh', 'onPtrDone', 'onInfinite', 'onTabShow', 'onTabHide']);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    const {
      ptr,
      infinite,
      tab
    } = self.props;

    if (ptr) {
      el.addEventListener('ptr:pullstart', self.onPtrPullStart);
      el.addEventListener('ptr:pullmove', self.onPtrPullMove);
      el.addEventListener('ptr:pullend', self.onPtrPullEnd);
      el.addEventListener('ptr:refresh', self.onPtrRefresh);
      el.addEventListener('ptr:done', self.onPtrDone);
    }

    if (infinite) {
      el.addEventListener('infinite', self.onInfinite);
    }

    if (tab) {
      el.addEventListener('tab:show', self.onTabShow);
      el.addEventListener('tab:hide', self.onTabHide);
    }
  },

  beforeDestroy() {
    const self = this;
    const el = self.$refs.el;
    el.removeEventListener('ptr:pullstart', self.onPtrPullStart);
    el.removeEventListener('ptr:pullmove', self.onPtrPullMove);
    el.removeEventListener('ptr:pullend', self.onPtrPullEnd);
    el.removeEventListener('ptr:refresh', self.onPtrRefresh);
    el.removeEventListener('ptr:done', self.onPtrDone);
    el.removeEventListener('infinite', self.onInfinite);
    el.removeEventListener('tab:show', self.onTabShow);
    el.removeEventListener('tab:hide', self.onTabHide);
  },

  methods: {
    onPtrPullStart(event) {
      this.dispatchEvent('ptr:pullstart ptrPullStart', event);
    },

    onPtrPullMove(event) {
      this.dispatchEvent('ptr:pullmove ptrPullMove', event);
    },

    onPtrPullEnd(event) {
      this.dispatchEvent('ptr:pullend ptrPullEnd', event);
    },

    onPtrRefresh(event) {
      const done = event.detail;
      this.dispatchEvent('ptr:refresh ptrRefresh', event, done);
    },

    onPtrDone(event) {
      this.dispatchEvent('ptr:done ptrDone', event);
    },

    onInfinite(event) {
      this.dispatchEvent('infinite', event);
    },

    onTabShow(event) {
      this.dispatchEvent('tab:show tabShow', event);
    },

    onTabHide(event) {
      this.dispatchEvent('tab:hide tabHide', event);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  }
};