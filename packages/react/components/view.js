import React from 'react';
import f7 from '../utils/f7';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7View extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    this.state = (() => {
      return {
        pages: []
      };
    })();

    (() => {
      const self = this;
      Utils.bindMethods(self, ['onSwipeBackMove', 'onSwipeBackBeforeChange', 'onSwipeBackAfterChange', 'onSwipeBackBeforeReset', 'onSwipeBackAfterReset', 'onTabShow', 'onTabHide', 'onViewInit']);
    })();
  }

  onViewInit(view) {
    const self = this;
    self.dispatchEvent('view:init viewInit', view);

    if (!self.props.init) {
      self.routerData.instance = view;
      self.f7View = self.routerData.instance;
    }
  }

  onSwipeBackMove(data) {
    const swipeBackData = data;
    this.dispatchEvent('swipeback:move swipeBackMove', swipeBackData);
  }

  onSwipeBackBeforeChange(data) {
    const swipeBackData = data;
    this.dispatchEvent('swipeback:beforechange swipeBackBeforeChange', swipeBackData);
  }

  onSwipeBackAfterChange(data) {
    const swipeBackData = data;
    this.dispatchEvent('swipeback:afterchange swipeBackAfterChange', swipeBackData);
  }

  onSwipeBackBeforeReset(data) {
    const swipeBackData = data;
    this.dispatchEvent('swipeback:beforereset swipeBackBeforeReset', swipeBackData);
  }

  onSwipeBackAfterReset(data) {
    const swipeBackData = data;
    this.dispatchEvent('swipeback:afterreset swipeBackAfterReset', swipeBackData);
  }

  onTabShow(el) {
    if (el === this.refs.el) {
      this.dispatchEvent('tab:show tabShow');
    }
  }

  onTabHide(el) {
    if (el === this.refs.el) {
      this.dispatchEvent('tab:hide tabHide');
    }
  }

  render() {
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
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, this.slots['default'], self.state.pages.map(page => {
      const PageComponent = page.component;
      {
        return React.createElement(PageComponent, Object.assign({
          key: page.id
        }, page.props));
      }
    }));
  }

  componentDidUpdate() {
    const self = this;
    if (!self.routerData) return;
    f7.events.emit('viewRouterDidUpdate', self.routerData);
  }

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
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    self.$f7ready(f7Instance => {
      f7Instance.on('tabShow', self.onTabShow);
      f7Instance.on('tabHide', self.onTabHide);
      self.routerData = {
        el,
        component: self,
        pages: self.state.pages,
        instance: null,

        setPages(pages) {
          self.setState({
            pages
          });
        }

      };
      f7.routers.views.push(self.routerData);
      if (!self.props.init) return;
      self.routerData.instance = f7Instance.views.create(el, Object.assign({
        on: {
          init: self.onViewInit
        }
      }, Utils.noUndefinedProps(self.props)));
      self.f7View = self.routerData.instance;
      self.f7View.on('swipebackMove', self.onSwipeBackMove);
      self.f7View.on('swipebackBeforeChange', self.onSwipeBackBeforeChange);
      self.f7View.on('swipebackAfterChange', self.onSwipeBackAfterChange);
      self.f7View.on('swipebackBeforeReset', self.onSwipeBackBeforeReset);
      self.f7View.on('swipebackAfterReset', self.onSwipeBackAfterReset);
    });
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7View, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
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
}, Mixins.colorProps));

F7View.displayName = 'f7-view';
export default F7View;