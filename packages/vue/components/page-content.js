import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
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
      infinite,
      infinitePreloader,
      id,
      style,
      ptrDistance,
      infiniteDistance,
      infiniteTop
    } = props;
    let ptrEl;
    let infiniteEl;

    if (ptr && ptrPreloader) {
      ptrEl = _h('div', {
        class: 'ptr-preloader'
      }, [_h('div', {
        class: 'preloader'
      }), _h('div', {
        class: 'ptr-arrow'
      })]);
    }

    if (infinite && infinitePreloader) {
      infiniteEl = _h('div', {
        class: 'preloader infinite-scroll-preloader'
      });
    }

    return _h('div', {
      style: style,
      class: self.classes,
      ref: 'el',
      attrs: {
        id: id,
        'data-ptr-distance': ptrDistance || undefined,
        'data-infinite-distance': infiniteDistance || undefined
      }
    }, [ptrEl, infiniteTop ? infiniteEl : self.$slots.default, infiniteTop ? self.$slots.default : infiniteEl]);
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

  mounted() {
    const self = this;
    const el = self.$refs.el;
    const {
      ptr,
      infinite,
      tab
    } = self.props;
    self.onPtrPullStart = self.onPtrPullStart.bind(self);
    self.onPtrPullMove = self.onPtrPullMove.bind(self);
    self.onPtrPullEnd = self.onPtrPullEnd.bind(self);
    self.onPtrRefresh = self.onPtrRefresh.bind(self);
    self.onPtrDone = self.onPtrDone.bind(self);
    self.onInfinite = self.onInfinite.bind(self);
    self.onTabShow = self.onTabShow.bind(self);
    self.onTabHide = self.onTabHide.bind(self);

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
      this.dispatchEvent('ptr:refresh ptrRefresh', event, event.detail);
    },

    onPtrDone(event) {
      this.dispatchEvent('ptr:done ptrDone', event);
    },

    onInfinite(event) {
      this.dispatchEvent('infinite', event);
    },

    onTabShow(e) {
      this.dispatchEvent('tab:show tabShow', e);
    },

    onTabHide(e) {
      this.dispatchEvent('tab:hide tabHide', e);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  }
};