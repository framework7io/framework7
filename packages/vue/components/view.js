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
    xhrCache: Boolean,
    xhrCacheIgnore: Array,
    xhrCacheIgnoreGetParameters: Boolean,
    xhrCacheDuration: Number,
    preloadPreviousPage: Boolean,
    allowDuplicateUrls: Boolean,
    reloadPages: Boolean,
    reloadDetail: Boolean,
    masterDetailBreakpoint: Number,
    removeElements: Boolean,
    removeElementsWithTimeout: Boolean,
    removeElementsTimeout: Number,
    restoreScrollTopOnBack: Boolean,
    iosSwipeBack: Boolean,
    iosSwipeBackAnimateShadow: Boolean,
    iosSwipeBackAnimateOpacity: Boolean,
    iosSwipeBackActiveArea: Number,
    iosSwipeBackThreshold: Number,
    mdSwipeBack: Boolean,
    mdSwipeBackAnimateShadow: Boolean,
    mdSwipeBackAnimateOpacity: Boolean,
    mdSwipeBackActiveArea: Number,
    mdSwipeBackThreshold: Number,
    auroraSwipeBack: Boolean,
    auroraSwipeBackAnimateShadow: Boolean,
    auroraSwipeBackAnimateOpacity: Boolean,
    auroraSwipeBackActiveArea: Number,
    auroraSwipeBackThreshold: Number,
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
    routesBeforeEnter: [Function, Array],
    routesBeforeLeave: [Function, Array],
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
    Utils.bindMethods(this, ['onSwipeBackMove', 'onSwipeBackBeforeChange', 'onSwipeBackAfterChange', 'onSwipeBackBeforeReset', 'onSwipeBackAfterReset', 'onTabShow', 'onTabHide', 'onViewInit']);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    el.addEventListener('swipeback:move', self.onSwipeBackMove);
    el.addEventListener('swipeback:beforechange', self.onSwipeBackBeforeChange);
    el.addEventListener('swipeback:afterchange', self.onSwipeBackAfterChange);
    el.addEventListener('swipeback:beforereset', self.onSwipeBackBeforeReset);
    el.addEventListener('swipeback:afterreset', self.onSwipeBackAfterReset);
    el.addEventListener('tab:show', self.onTabShow);
    el.addEventListener('tab:hide', self.onTabHide);
    el.addEventListener('view:init', self.onViewInit);
    self.setState({
      pages: []
    });
    self.$f7ready(f7Instance => {
      self.routerData = {
        el,
        component: self,
        instance: null
      };
      f7.routers.views.push(self.routerData);
      if (!self.props.init) return;
      self.routerData.instance = f7Instance.views.create(el, Utils.noUndefinedProps(self.$options.propsData || {}));
      self.f7View = self.routerData.instance;
    });
  },

  beforeDestroy() {
    const self = this;
    const el = self.$refs.el;
    el.removeEventListener('swipeback:move', self.onSwipeBackMove);
    el.removeEventListener('swipeback:beforechange', self.onSwipeBackBeforeChange);
    el.removeEventListener('swipeback:afterchange', self.onSwipeBackAfterChange);
    el.removeEventListener('swipeback:beforereset', self.onSwipeBackBeforeReset);
    el.removeEventListener('swipeback:afterreset', self.onSwipeBackAfterReset);
    el.removeEventListener('tab:show', self.onTabShow);
    el.removeEventListener('tab:hide', self.onTabHide);
    el.removeEventListener('view:init', self.onViewInit);
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
    onViewInit(event) {
      const self = this;
      const view = event.detail;
      self.dispatchEvent('view:init viewInit', event, view);

      if (!self.props.init) {
        self.routerData.instance = view;
        self.f7View = self.routerData.instance;
      }
    },

    onSwipeBackMove(event) {
      const swipeBackData = event.detail;
      this.dispatchEvent('swipeback:move swipeBackMove', event, swipeBackData);
    },

    onSwipeBackBeforeChange(event) {
      const swipeBackData = event.detail;
      this.dispatchEvent('swipeback:beforechange swipeBackBeforeChange', event, swipeBackData);
    },

    onSwipeBackAfterChange(event) {
      const swipeBackData = event.detail;
      this.dispatchEvent('swipeback:afterchange swipeBackAfterChange', event, swipeBackData);
    },

    onSwipeBackBeforeReset(event) {
      const swipeBackData = event.detail;
      this.dispatchEvent('swipeback:beforereset swipeBackBeforeReset', event, swipeBackData);
    },

    onSwipeBackAfterReset(event) {
      const swipeBackData = event.detail;
      this.dispatchEvent('swipeback:afterreset swipeBackAfterReset', event, swipeBackData);
    },

    onTabShow(event) {
      this.dispatchEvent('tab:show tabShow', event);
    },

    onTabHide(event) {
      this.dispatchEvent('tab:hide tabHide', event);
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