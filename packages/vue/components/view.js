import f7 from '../utils/f7';
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
    loadInitialPage: Boolean,
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
    transition: String,
    iosDynamicNavbar: Boolean,
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
  data: function data() {
    var props = __vueComponentProps(this);

    var state = function () {
      return {
        pages: []
      };
    }();

    return {
      state: state
    };
  },
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var id = props.id,
        style = props.style,
        tab = props.tab,
        main = props.main,
        tabActive = props.tabActive,
        className = props.className;
    var classes = Utils.classNames(className, 'view', {
      'view-main': main,
      'tab-active': tabActive,
      tab: tab
    }, Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['default'], self.state.pages.map(function (page) {
      var PageComponent = page.component;
      {
        return _h(PageComponent, {
          key: page.id,
          props: page.props
        });
      }
    })]);
  },
  created: function created() {
    var self = this;
    Utils.bindMethods(self, ['onSwipeBackMove', 'onSwipeBackBeforeChange', 'onSwipeBackAfterChange', 'onSwipeBackBeforeReset', 'onSwipeBackAfterReset', 'onTabShow', 'onTabHide', 'onViewInit']);
  },
  mounted: function mounted() {
    var self = this;
    var el = self.$refs.el;
    self.$f7ready(function (f7Instance) {
      f7Instance.on('tabShow', self.onTabShow);
      f7Instance.on('tabHide', self.onTabHide);
      self.routerData = {
        el: el,
        component: self,
        pages: self.state.pages,
        instance: null,
        setPages: function setPages(pages) {
          self.setState({
            pages: pages
          });
        }
      };
      f7.routers.views.push(self.routerData);
      if (!self.props.init) return;
      self.routerData.instance = f7Instance.views.create(el, Object.assign({
        on: {
          init: self.onViewInit
        }
      }, Utils.noUndefinedProps(self.$options.propsData || {})));
      self.f7View = self.routerData.instance;
      self.f7View.on('swipebackMove', self.onSwipeBackMove);
      self.f7View.on('swipebackBeforeChange', self.onSwipeBackBeforeChange);
      self.f7View.on('swipebackAfterChange', self.onSwipeBackAfterChange);
      self.f7View.on('swipebackBeforeReset', self.onSwipeBackBeforeReset);
      self.f7View.on('swipebackAfterReset', self.onSwipeBackAfterReset);
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;

    if (f7.instance) {
      f7.instance.off('tabShow', self.onTabShow);
      f7.instance.off('tabHide', self.onTabHide);
    }

    if (self.f7View) {
      self.f7View.off('swipebackMove', self.onSwipeBackMove);
      self.f7View.off('swipebackBeforeChange', self.onSwipeBackBeforeChange);
      self.f7View.off('swipebackAfterChange', self.onSwipeBackAfterChange);
      self.f7View.off('swipebackBeforeReset', self.onSwipeBackBeforeReset);
      self.f7View.off('swipebackAfterReset', self.onSwipeBackAfterReset);
      if (self.f7View.destroy) self.f7View.destroy();
    }

    f7.routers.views.splice(f7.routers.views.indexOf(self.routerData), 1);
    self.routerData = null;
    delete self.routerData;
  },
  updated: function updated() {
    var self = this;
    if (!self.routerData) return;
    f7.events.emit('viewRouterDidUpdate', self.routerData);
  },
  methods: {
    onViewInit: function onViewInit(view) {
      var self = this;
      self.dispatchEvent('view:init viewInit', view);

      if (!self.props.init) {
        self.routerData.instance = view;
        self.f7View = self.routerData.instance;
      }
    },
    onSwipeBackMove: function onSwipeBackMove(data) {
      var swipeBackData = data;
      this.dispatchEvent('swipeback:move swipeBackMove', swipeBackData);
    },
    onSwipeBackBeforeChange: function onSwipeBackBeforeChange(data) {
      var swipeBackData = data;
      this.dispatchEvent('swipeback:beforechange swipeBackBeforeChange', swipeBackData);
    },
    onSwipeBackAfterChange: function onSwipeBackAfterChange(data) {
      var swipeBackData = data;
      this.dispatchEvent('swipeback:afterchange swipeBackAfterChange', swipeBackData);
    },
    onSwipeBackBeforeReset: function onSwipeBackBeforeReset(data) {
      var swipeBackData = data;
      this.dispatchEvent('swipeback:beforereset swipeBackBeforeReset', swipeBackData);
    },
    onSwipeBackAfterReset: function onSwipeBackAfterReset(data) {
      var swipeBackData = data;
      this.dispatchEvent('swipeback:afterreset swipeBackAfterReset', swipeBackData);
    },
    onTabShow: function onTabShow(el) {
      if (el === this.$refs.el) {
        this.dispatchEvent('tab:show tabShow');
      }
    },
    onTabHide: function onTabHide(el) {
      if (el === this.$refs.el) {
        this.dispatchEvent('tab:hide tabHide');
      }
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    },
    setState: function setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};