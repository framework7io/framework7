/* eslint array-callback-return: "off" */
/* eslint consistent-return: "off" */
import f7 from '../utils/f7';
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
    Utils.bindMethods(self, [
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

    self.$f7ready((f7Instance) => {
      f7Instance.on('tabShow', self.onTabShow);
      f7Instance.on('tabHide', self.onTabHide);
      self.routerData = {
        el,
        component: self,
        pages: self.state.pages,
        instance: null,
        setPages(pages) {
          self.setState({ pages });
        },
      };
      f7.routers.views.push(self.routerData);
      if (!self.props.init) return;

      self.routerData.instance = f7Instance.views.create(el, {
        on: {
          init: self.onViewInit,
        },
        // phenome-vue-next-line
        ...Utils.noUndefinedProps(self.$options.propsData || {}),
        // phenome-react-next-line
        ...Utils.noUndefinedProps(self.props),
      });
      self.f7View = self.routerData.instance;
      self.f7View.on('swipebackMove', self.onSwipeBackMove);
      self.f7View.on('swipebackBeforeChange', self.onSwipeBackBeforeChange);
      self.f7View.on('swipebackAfterChange', self.onSwipeBackAfterChange);
      self.f7View.on('swipebackBeforeReset', self.onSwipeBackBeforeReset);
      self.f7View.on('swipebackAfterReset', self.onSwipeBackAfterReset);
    });
  },
  componentWillUnmount() {
    const self = this;

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
  componentDidUpdate() {
    const self = this;
    if (!self.routerData) return;
    f7.events.emit('viewRouterDidUpdate', self.routerData);
  },
  methods: {
    onViewInit(view) {
      const self = this;
      self.dispatchEvent('view:init viewInit', view);
      if (!self.props.init) {
        self.routerData.instance = view;
        self.f7View = self.routerData.instance;
      }
    },
    onSwipeBackMove(data) {
      const swipeBackData = data;
      this.dispatchEvent('swipeback:move swipeBackMove', swipeBackData);
    },
    onSwipeBackBeforeChange(data) {
      const swipeBackData = data;
      this.dispatchEvent('swipeback:beforechange swipeBackBeforeChange', swipeBackData);
    },
    onSwipeBackAfterChange(data) {
      const swipeBackData = data;
      this.dispatchEvent('swipeback:afterchange swipeBackAfterChange', swipeBackData);
    },
    onSwipeBackBeforeReset(data) {
      const swipeBackData = data;
      this.dispatchEvent('swipeback:beforereset swipeBackBeforeReset', swipeBackData);
    },
    onSwipeBackAfterReset(data) {
      const swipeBackData = data;
      this.dispatchEvent('swipeback:afterreset swipeBackAfterReset', swipeBackData);
    },
    onTabShow(el) {
      if (el === this.refs.el) {
        this.dispatchEvent('tab:show tabShow');
      }
    },
    onTabHide(el) {
      if (el === this.refs.el) {
        this.dispatchEvent('tab:hide tabHide');
      }
    },
  },
};
