import f7 from '../utils/f7';
import events from '../utils/events';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-view',
  props: Object.assign({
    id: [String, Number],
    tab: Boolean,
    tabActive: Boolean,
    name: String,
    router: Boolean,
    linksView: [Object, String],
    url: String,
    main: Boolean,
    stackPages: Boolean,
    xhrCache: String,
    xhrCacheIgnore: Array,
    xhrCacheIgnoreGetParameters: Boolean,
    xhrCacheDuration: Number,
    preloadPreviousPage: Boolean,
    uniqueHistory: Boolean,
    uniqueHistoryIgnoreGetParameters: Boolean,
    allowDuplicateUrls: Boolean,
    reloadPages: Boolean,
    removeElements: Boolean,
    removeElementsWithTimeout: Boolean,
    removeElementsTimeout: Number,
    restoreScrollTopOnBack: Boolean,
    iosSwipeBack: Boolean,
    iosSwipeBackAnimateShadow: Boolean,
    iosSwipeBackAnimateOpacity: Boolean,
    iosSwipeBackActiveArea: Number,
    iosSwipeBackThreshold: Number,
    pushState: Boolean,
    pushStateRoot: String,
    pushStateAnimate: Boolean,
    pushStateAnimateOnLoad: Boolean,
    pushStateSeparator: String,
    pushStateOnLoad: Boolean,
    animate: Boolean,
    iosDynamicNavbar: Boolean,
    iosSeparateDynamicNavbar: Boolean,
    iosAnimateNavbarBackIcon: Boolean,
    materialPageLoadDelay: Number,
    passRouteQueryToRequest: Boolean,
    passRouteParamsToRequest: Boolean,
    routes: Array,
    routesAdd: Array,
    init: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps),

  data() {
    const props = __vueComponentProps(this);

    const state = (() => {
      return {
        pages: []
      };
    })();

    return {
      state
    };
  },

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      tab,
      main,
      tabActive,
      className
    } = props;
    const classes = Utils.classNames(className, 'view', {
      'view-main': main,
      'tab-active': tabActive,
      tab
    }, Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['default'], self.state.pages.map(page => {
      const PageComponent = page.component;
      {
        return _h(PageComponent, {
          key: page.id,
          props: page.props
        });
      }
    })]);
  },

  created() {
    const self = this;
    self.onSwipeBackMoveBound = self.onSwipeBackMove.bind(self);
    self.onSwipeBackBeforeChangeBound = self.onSwipeBackBeforeChange.bind(self);
    self.onSwipeBackAfterChangeBound = self.onSwipeBackAfterChange.bind(self);
    self.onSwipeBackBeforeResetBound = self.onSwipeBackBeforeReset.bind(self);
    self.onSwipeBackAfterResetBound = self.onSwipeBackAfterReset.bind(self);
    self.onTabShowBound = self.onTabShow.bind(self);
    self.onTabHideBound = self.onTabHide.bind(self);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    el.addEventListener('swipeback:move', self.onSwipeBackMoveBound);
    el.addEventListener('swipeback:beforechange', self.onSwipeBackBeforeChangeBound);
    el.addEventListener('swipeback:afterchange', self.onSwipeBackAfterChangeBound);
    el.addEventListener('swipeback:beforereset', self.onSwipeBackBeforeResetBound);
    el.addEventListener('swipeback:afterreset', self.onSwipeBackAfterResetBound);
    el.addEventListener('tab:show', self.onTabShowBound);
    el.addEventListener('tab:hide', self.onTabHideBound);
    self.setState({
      pages: []
    });
    self.$f7ready(f7Instance => {
      if (!self.props.init) return;
      self.routerData = {
        el,
        component: self,
        instance: null
      };
      f7.routers.views.push(self.routerData);
      self.routerData.instance = f7Instance.views.create(el, Utils.noUndefinedProps(self.$options.propsData || {}));
      self.f7View = self.routerData.instance;
    });
  },

  beforeDestroy() {
    const self = this;
    const el = self.$refs.el;
    el.removeEventListener('swipeback:move', self.onSwipeBackMoveBound);
    el.removeEventListener('swipeback:beforechange', self.onSwipeBackBeforeChangeBound);
    el.removeEventListener('swipeback:afterchange', self.onSwipeBackAfterChangeBound);
    el.removeEventListener('swipeback:beforereset', self.onSwipeBackBeforeResetBound);
    el.removeEventListener('swipeback:afterreset', self.onSwipeBackAfterResetBound);
    el.removeEventListener('tab:show', self.onTabShowBound);
    el.removeEventListener('tab:hide', self.onTabHideBound);
    if (!self.props.init) return;
    if (self.f7View && self.f7View.destroy) self.f7View.destroy();
    f7.routers.views.splice(f7.routers.views.indexOf(self.routerData), 1);
    self.routerData = null;
    delete self.routerData;
  },

  updated() {
    const self = this;
    if (!self.routerData) return;
    events.emit('viewRouterDidUpdate', self.routerData);
  },

  methods: {
    onSwipeBackMove(event) {
      this.dispatchEvent('swipeback:move swipeBackMove', event, event.detail);
    },

    onSwipeBackBeforeChange(event) {
      this.dispatchEvent('swipeback:beforechange swipeBackBeforeChange', event, event.detail);
    },

    onSwipeBackAfterChange(event) {
      this.dispatchEvent('swipeback:afterchange swipeBackAfterChange', event, event.detail);
    },

    onSwipeBackBeforeReset(event) {
      this.dispatchEvent('swipeback:beforereset swipeBackBeforeReset', event, event.detail);
    },

    onSwipeBackAfterReset(event) {
      this.dispatchEvent('swipeback:afterreset swipeBackAfterReset', event, event.detail);
    },

    onTabShow(e) {
      this.dispatchEvent('tab:show tabShow', e);
    },

    onTabHide(e) {
      this.dispatchEvent('tab:hide tabHide', e);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    },

    setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};