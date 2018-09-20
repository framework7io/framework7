import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7PageContent extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }

  onPtrPullStart(event) {
    this.dispatchEvent('ptr:pullstart ptrPullStart', event);
  }

  onPtrPullMove(event) {
    this.dispatchEvent('ptr:pullmove ptrPullMove', event);
  }

  onPtrPullEnd(event) {
    this.dispatchEvent('ptr:pullend ptrPullEnd', event);
  }

  onPtrRefresh(event) {
    const done = event.detail;
    this.dispatchEvent('ptr:refresh ptrRefresh', event, done);
  }

  onPtrDone(event) {
    this.dispatchEvent('ptr:done ptrDone', event);
  }

  onInfinite(event) {
    this.dispatchEvent('infinite', event);
  }

  onTabShow(event) {
    this.dispatchEvent('tab:show tabShow', event);
  }

  onTabHide(event) {
    this.dispatchEvent('tab:hide tabHide', event);
  }

  get classes() {
    const self = this;
    const props = self.props;
    const {
      className,
      tab,
      tabActive,
      ptr,
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
      infinite,
      infinitePreloader,
      id,
      style,
      ptrDistance,
      infiniteDistance,
      infiniteTop
    } = props;
    let ptrEl;
    let infiniteEl;

    if (ptr && ptrPreloader) {
      ptrEl = React.createElement('div', {
        className: 'ptr-preloader'
      }, React.createElement('div', {
        className: 'preloader'
      }), React.createElement('div', {
        className: 'ptr-arrow'
      }));
    }

    if (infinite && infinitePreloader) {
      infiniteEl = React.createElement('div', {
        className: 'preloader infinite-scroll-preloader'
      });
    }

    return React.createElement('div', {
      id: id,
      style: style,
      className: self.classes,
      'data-ptr-distance': ptrDistance || undefined,
      'data-infinite-distance': infiniteDistance || undefined,
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      }
    }, ptrEl, infiniteTop ? infiniteEl : self.slots.default, infiniteTop ? self.slots.default : infiniteEl);
  }

  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    el.removeEventListener('ptr:pullstart', self.onPtrPullStart);
    el.removeEventListener('ptr:pullmove', self.onPtrPullMove);
    el.removeEventListener('ptr:pullend', self.onPtrPullEnd);
    el.removeEventListener('ptr:refresh', self.onPtrRefresh);
    el.removeEventListener('ptr:done', self.onPtrDone);
    el.removeEventListener('infinite', self.onInfinite);
    el.removeEventListener('tab:show', self.onTabShow);
    el.removeEventListener('tab:hide', self.onTabHide);
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    const {
      ptr,
      infinite,
      tab
    } = self.props;
    self.onPtrPullStart = self.onPtrPullStart.bind(self);
    self.onPtrPullMove = self.onPtrPullMove.bind(self);
    self.onPtrPullEnd = self.onPtrPullEnd.bind(self);
    self.onPtrRefresh = self.onPtrRefresh.bind(self);
    self.onPtrDone = self.onPtrDone.bind(self);
    self.onInfinite = self.onInfinite.bind(self);
    self.onTabShow = self.onTabShow.bind(self);
    self.onTabHide = self.onTabHide.bind(self);

    if (ptr) {
      el.addEventListener('ptr:pullstart', self.onPtrPullStart);
      el.addEventListener('ptr:pullmove', self.onPtrPullMove);
      el.addEventListener('ptr:pullend', self.onPtrPullEnd);
      el.addEventListener('ptr:refresh', self.onPtrRefresh);
      el.addEventListener('ptr:done', self.onPtrDone);
    }

    if (infinite) {
      el.addEventListener('infinite', self.onInfinite);
    }

    if (tab) {
      el.addEventListener('tab:show', self.onTabShow);
      el.addEventListener('tab:hide', self.onTabHide);
    }
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