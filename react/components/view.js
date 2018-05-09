import React from 'react';
import routers from '../utils/routers';
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
      return { pages: [] };
    })();
    (() => {
      const self = this;
      self.onSwipeBackMoveBound = self.onSwipeBackMove.bind(self);
      self.onSwipeBackBeforeChangeBound = self.onSwipeBackBeforeChange.bind(self);
      self.onSwipeBackAfterChangeBound = self.onSwipeBackAfterChange.bind(self);
      self.onSwipeBackBeforeResetBound = self.onSwipeBackBeforeReset.bind(self);
      self.onSwipeBackAfterResetBound = self.onSwipeBackAfterReset.bind(self);
      self.onTabShowBound = self.onTabShow.bind(self);
      self.onTabHideBound = self.onTabHide.bind(self);
    })();
  }
  onSwipeBackMove(event) {
    this.dispatchEvent('swipeback:move swipeBackMove', event, event.detail);
  }
  onSwipeBackBeforeChange(event) {
    this.dispatchEvent('swipeback:beforechange swipeBackBeforeChange', event, event.detail);
  }
  onSwipeBackAfterChange(event) {
    this.dispatchEvent('swipeback:afterchange swipeBackAfterChange', event, event.detail);
  }
  onSwipeBackBeforeReset(event) {
    this.dispatchEvent('swipeback:beforereset swipeBackBeforeReset', event, event.detail);
  }
  onSwipeBackAfterReset(event) {
    this.dispatchEvent('swipeback:afterreset swipeBackAfterReset', event, event.detail);
  }
  onTabShow(e) {
    this.dispatchEvent('tab:show tabShow', e);
  }
  onTabHide(e) {
    this.dispatchEvent('tab:hide tabHide', e);
  }
  get classes() {
    return Utils.classNames(this.props.className, {
      view: true,
      'view-main': this.props.main,
      'tab-active': this.props.tabActive,
      tab: this.props.tab
    }, Mixins.colorClasses(this));
  }
  render() {
    const self = this;
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: self.props.id,
      style: self.props.style,
      className: self.classes
    }, this.slots['default'], self.state.pages.map(page => {
      const PageComponent = page.component;
      return React.createElement(PageComponent, {
        key: page.id,
        ...page.props
      });
    }));
  }
  componentDidUpdate() {
    const self = this;
    if (!self.routerData)
      return;
    events.emit('viewRouterDidUpdate', self.routerData);
  }
  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    el.removeEventListener('swipeback:move', self.onSwipeBackMoveBound);
    el.removeEventListener('swipeback:beforechange', self.onSwipeBackBeforeChangeBound);
    el.removeEventListener('swipeback:afterchange', self.onSwipeBackAfterChangeBound);
    el.removeEventListener('swipeback:beforereset', self.onSwipeBackBeforeResetBound);
    el.removeEventListener('swipeback:afterreset', self.onSwipeBackAfterResetBound);
    el.removeEventListener('tab:show', self.onTabShowBound);
    el.removeEventListener('tab:hide', self.onTabHideBound);
    if (!self.props.init)
      return;
    if (self.f7View && self.f7View.destroy)
      self.f7View.destroy();
    routers.views.splice(routers.views.indexOf(self.routerData), 1);
    delete self.routerData;
  }
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    el.addEventListener('swipeback:move', self.onSwipeBackMoveBound);
    el.addEventListener('swipeback:beforechange', self.onSwipeBackBeforeChangeBound);
    el.addEventListener('swipeback:afterchange', self.onSwipeBackAfterChangeBound);
    el.addEventListener('swipeback:beforereset', self.onSwipeBackBeforeResetBound);
    el.addEventListener('swipeback:afterreset', self.onSwipeBackAfterResetBound);
    el.addEventListener('tab:show', self.onTabShowBound);
    el.addEventListener('tab:hide', self.onTabHideBound);
    self.setState({ pages: [] });
    self.$f7ready(f7 => {
      if (!self.props.init)
        return;
      self.routerData = {
        el,
        component: self,
        instance: null
      };
      routers.views.push(self.routerData);
      self.routerData.instance = f7.views.create(el, self.props);
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
  set refs(refs) {
  }
}
__reactComponentSetProps(F7View, {
  id: [
    String,
    Number
  ],
  tab: Boolean,
  tabActive: Boolean,
  name: String,
  router: Boolean,
  linksView: [
    Object,
    String
  ],
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
  },
  ...Mixins.colorProps
});
export default F7View;