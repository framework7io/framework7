import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const PageContentProps = Utils.extend({
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
}, Mixins.colorProps);
export default {
  name: 'f7-page-content',
  props: __vueComponentGetPropKeys(PageContentProps),
  render() {
    var _h = this.$createElement;
    const self = this;
    let ptrEl;
    let infiniteEl;
    if (self.props.ptr && self.props.ptrPreloader) {
      ptrEl = _h('div', { class: 'ptr-preloader' }, [
        _h('div', { class: 'preloader' }),
        _h('div', { class: 'ptr-arrow' })
      ]);
    }
    if (self.props.infinite && self.props.infinitePreloader) {
      infiniteEl = _h('div', { class: 'preloader infinite-scroll-preloader' });
    }
    return _h('div', {
      style: self.props.style,
      class: self.classes,
      ref: 'el',
      attrs: {
        id: self.props.id,
        'data-ptr-distance': self.props.ptrDistance || undefined,
        'data-infinite-distance': self.props.infiniteDistance || undefined
      }
    }, [
      ptrEl,
      self.props.infiniteTop ? infiniteEl : self.$slots.default,
      self.props.infiniteTop ? self.$slots.default : infiniteEl
    ]);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, {
        tab: self.props.tab,
        'page-content': true,
        'tab-active': self.props.tabActive,
        'ptr-content': self.props.ptr,
        'infinite-scroll-content': self.props.infinite,
        'infinite-scroll-top': self.props.infiniteTop,
        'hide-bars-on-scroll': self.props.hideBarsOnScroll,
        'hide-navbar-on-scroll': self.props.hideNavbarOnScroll,
        'hide-toolbar-on-scroll': self.props.hideToolbarOnScroll,
        'messages-content': self.props.messagesContent,
        'login-screen-content': self.props.loginScreen
      }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  },
  mounted() {
    const self = this;
    const el = self.$refs.el;
    self.onPtrPullStart = self.onPtrPullStart.bind(self);
    self.onPtrPullMove = self.onPtrPullMove.bind(self);
    self.onPtrPullEnd = self.onPtrPullEnd.bind(self);
    self.onPtrRefresh = self.onPtrRefresh.bind(self);
    self.onPtrDone = self.onPtrDone.bind(self);
    self.onInfinite = self.onInfinite.bind(self);
    self.onTabShow = self.onTabShow.bind(self);
    self.onTabHide = self.onTabHide.bind(self);
    el.addEventListener('ptr:pullstart', self.onPtrPullStart);
    el.addEventListener('ptr:pullmove', self.onPtrPullMove);
    el.addEventListener('ptr:pullend', self.onPtrPullEnd);
    el.addEventListener('ptr:refresh', self.onPtrRefresh);
    el.addEventListener('ptr:done', self.onPtrDone);
    el.addEventListener('infinite', self.onInfinite);
    el.addEventListener('tab:show', self.onTabShow);
    el.addEventListener('tab:hide', self.onTabHide);
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