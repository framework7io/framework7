import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import Preloader from './preloader';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7PageContent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onPtrPullStart', 'onPtrPullMove', 'onPtrPullEnd', 'onPtrRefresh', 'onPtrDone', 'onInfinite', 'onTabShow', 'onTabHide']);
    })();
  }

  onPtrPullStart(el) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('ptr:pullstart ptrPullStart');
  }

  onPtrPullMove(el) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('ptr:pullmove ptrPullMove');
  }

  onPtrPullEnd(el) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('ptr:pullend ptrPullEnd');
  }

  onPtrRefresh(el, done) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('ptr:refresh ptrRefresh', done);
  }

  onPtrDone(el) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('ptr:done ptrDone');
  }

  onInfinite(el) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('infinite');
  }

  onTabShow(el) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('tab:show tabShow');
  }

  onTabHide(el) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('tab:hide tabHide');
  }

  get classes() {
    const self = this;
    const props = self.props;
    const {
      className,
      tab,
      tabActive,
      ptr,
      ptrBottom,
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
      'ptr-bottom': ptrBottom,
      'infinite-scroll-content': infinite,
      'infinite-scroll-top': infiniteTop,
      'hide-bars-on-scroll': hideBarsOnScroll,
      'hide-navbar-on-scroll': hideNavbarOnScroll,
      'hide-toolbar-on-scroll': hideToolbarOnScroll,
      'messages-content': messagesContent,
      'login-screen-content': loginScreen
    }, Mixins.colorClasses(props));
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      ptr,
      ptrPreloader,
      ptrDistance,
      ptrBottom,
      ptrMousewheel,
      infinite,
      infinitePreloader,
      id,
      style,
      infiniteDistance,
      infiniteTop
    } = props;
    let ptrEl;
    let infiniteEl;

    if (ptr && ptrPreloader) {
      ptrEl = React.createElement('div', {
        className: 'ptr-preloader'
      }, React.createElement(Preloader, null), React.createElement('div', {
        className: 'ptr-arrow'
      }));
    }

    if (infinite && infinitePreloader) {
      infiniteEl = React.createElement(Preloader, {
        className: 'infinite-scroll-preloader'
      });
    }

    return React.createElement('div', {
      id: id,
      style: style,
      className: self.classes,
      'data-ptr-distance': ptrDistance || undefined,
      'data-ptr-mousewheel': ptrMousewheel || undefined,
      'data-infinite-distance': infiniteDistance || undefined,
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      }
    }, ptrBottom ? null : ptrEl, infiniteTop ? infiniteEl : null, self.slots.default, infiniteTop ? null : infiniteEl, ptrBottom ? ptrEl : null);
  }

  componentWillUnmount() {
    const self = this;
    if (!self.$f7) return;
    self.$f7.off('ptrPullStart', self.onPtrPullStart);
    self.$f7.off('ptrPullMove', self.onPtrPullMove);
    self.$f7.off('ptrPullEnd', self.onPtrPullEnd);
    self.$f7.off('ptrRefresh', self.onPtrRefresh);
    self.$f7.off('ptrDone', self.onPtrDone);
    self.$f7.off('infinite', self.onInfinite);
    self.$f7.off('tabShow', self.onTabShow);
    self.$f7.off('tabHide', self.onTabHide);
    self.eventTargetEl = null;
    delete self.eventTargetEl;
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    const {
      ptr,
      infinite,
      tab
    } = self.props;
    self.$f7ready(f7 => {
      self.eventTargetEl = el;

      if (ptr) {
        f7.on('ptrPullStart', self.onPtrPullStart);
        f7.on('ptrPullMove', self.onPtrPullMove);
        f7.on('ptrPullEnd', self.onPtrPullEnd);
        f7.on('ptrRefresh', self.onPtrRefresh);
        f7.on('ptrDone', self.onPtrDone);
      }

      if (infinite) {
        f7.on('infinite', self.onInfinite);
      }

      if (tab) {
        f7.on('tabShow', self.onTabShow);
        f7.on('tabHide', self.onTabHide);
      }
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

__reactComponentSetProps(F7PageContent, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  tab: Boolean,
  tabActive: Boolean,
  ptr: Boolean,
  ptrDistance: Number,
  ptrPreloader: {
    type: Boolean,
    default: true
  },
  ptrBottom: Boolean,
  ptrMousewheel: Boolean,
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
}, Mixins.colorProps));

F7PageContent.displayName = 'f7-page-content';
export default F7PageContent;