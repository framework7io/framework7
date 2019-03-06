/* eslint array-callback-return: "off" */
/* eslint consistent-return: "off" */
import f7 from '../utils/f7';
import events from '../utils/events';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

/* phenome-dts-imports
import { View as ViewNamespace } from 'framework7/components/view/view';
*/

/* phenome-dts-instance
f7View: ViewNamespace.View
*/

export default {
  name: 'f7-view',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line

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
    // Swipe Back
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
    // Push State
    pushState: Boolean,
    pushStateRoot: String,
    pushStateAnimate: Boolean,
    pushStateAnimateOnLoad: Boolean,
    pushStateSeparator: String,
    pushStateOnLoad: Boolean,
    // Animate Pages
    animate: Boolean,
    // iOS Dynamic Navbar
    iosDynamicNavbar: Boolean,
    iosSeparateDynamicNavbar: Boolean,
    // Animate iOS Navbar Back Icon
    iosAnimateNavbarBackIcon: Boolean,
    // MD Theme delay
    materialPageLoadDelay: Number,

    passRouteQueryToRequest: Boolean,
    passRouteParamsToRequest: Boolean,
    routes: Array,
    routesAdd: Array,

    // Routes hooks
    routesBeforeEnter: [Function, Array],
    routesBeforeLeave: [Function, Array],

    init: {
      type: Boolean,
      default: true,
    },

    ...Mixins.colorProps,
  },
  state() {
    return {
      pages: [],
    };
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      tab,
      main,
      tabActive,
      className,
    } = props;

    const classes = Utils.classNames(
      className,
      'view',
      {
        'view-main': main,
        'tab-active': tabActive,
        tab,
      },
      Mixins.colorClasses(props),
    );

    return (
      <div ref="el" id={id} style={style} className={classes}>
        <slot />
        {self.state.pages.map((page) => {
          const PageComponent = page.component;
          if (process.env.COMPILER === 'react') {
            return (
              <PageComponent key={page.id} {...page.props} />
            );
          }
          if (process.env.COMPILER === 'vue') {
            return (
              <PageComponent key={page.id} props={page.props} />
            );
          }
        })}
      </div>
    );
  },
  componentDidCreate() {
    const self = this;
    Utils.bindMethods(this, [
      'onSwipeBackMove',
      'onSwipeBackBeforeChange',
      'onSwipeBackAfterChange',
      'onSwipeBackBeforeReset',
      'onSwipeBackAfterReset',
      'onTabShow',
      'onTabHide',
      'onViewInit',
    ]);
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;

    el.addEventListener('swipeback:move', self.onSwipeBackMove);
    el.addEventListener('swipeback:beforechange', self.onSwipeBackBeforeChange);
    el.addEventListener('swipeback:afterchange', self.onSwipeBackAfterChange);
    el.addEventListener('swipeback:beforereset', self.onSwipeBackBeforeReset);
    el.addEventListener('swipeback:afterreset', self.onSwipeBackAfterReset);
    el.addEventListener('tab:show', self.onTabShow);
    el.addEventListener('tab:hide', self.onTabHide);
    el.addEventListener('view:init', self.onViewInit);

    self.setState({ pages: [] });

    self.$f7ready((f7Instance) => {
      self.routerData = {
        el,
        component: self,
        instance: null,
      };
      f7.routers.views.push(self.routerData);
      if (!self.props.init) return;
      // phenome-vue-next-line
      self.routerData.instance = f7Instance.views.create(el, Utils.noUndefinedProps(self.$options.propsData || {}));
      // phenome-react-next-line
      self.routerData.instance = f7Instance.views.create(el, Utils.noUndefinedProps(self.props));
      self.f7View = self.routerData.instance;
    });
  },
  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;

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
  componentDidUpdate() {
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
  },
};
