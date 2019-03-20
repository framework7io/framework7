import React from 'react';
import f7 from '../utils/f7';
import events from '../utils/events';
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
      Utils.bindMethods(this, ['onSwipeBackMove', 'onSwipeBackBeforeChange', 'onSwipeBackAfterChange', 'onSwipeBackBeforeReset', 'onSwipeBackAfterReset', 'onTabShow', 'onTabHide', 'onViewInit']);
    })();
  }

  onViewInit(event) {
    const self = this;
    const view = event.detail;
    self.dispatchEvent('view:init viewInit', event, view);

    if (!self.props.init) {
      self.routerData.instance = view;
      self.f7View = self.routerData.instance;
    }
  }

  onSwipeBackMove(event) {
    const swipeBackData = event.detail;
    this.dispatchEvent('swipeback:move swipeBackMove', event, swipeBackData);
  }

  onSwipeBackBeforeChange(event) {
    const swipeBackData = event.detail;
    this.dispatchEvent('swipeback:beforechange swipeBackBeforeChange', event, swipeBackData);
  }

  onSwipeBackAfterChange(event) {
    const swipeBackData = event.detail;
    this.dispatchEvent('swipeback:afterchange swipeBackAfterChange', event, swipeBackData);
  }

  onSwipeBackBeforeReset(event) {
    const swipeBackData = event.detail;
    this.dispatchEvent('swipeback:beforereset swipeBackBeforeReset', event, swipeBackData);
  }

  onSwipeBackAfterReset(event) {
    const swipeBackData = event.detail;
    this.dispatchEvent('swipeback:afterreset swipeBackAfterReset', event, swipeBackData);
  }

  onTabShow(event) {
    this.dispatchEvent('tab:show tabShow', event);
  }

  onTabHide(event) {
    this.dispatchEvent('tab:hide tabHide', event);
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
    events.emit('viewRouterDidUpdate', self.routerData);
  }

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
  }

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
      self.routerData.instance = f7Instance.views.create(el, Utils.noUndefinedProps(self.props));
      self.f7View = self.routerData.instance;
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