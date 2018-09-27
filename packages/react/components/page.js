import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7PageContent from './page-content';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Page extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    this.state = (() => {
      return {
        hasSubnavbar: false
      };
    })();
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

  onPageMounted(event) {
    const page = event.detail;
    this.dispatchEvent('page:mounted pageMounted', event, page);
  }

  onPageInit(event) {
    const page = event.detail;
    this.dispatchEvent('page:init pageInit', event, page);
  }

  onPageReinit(event) {
    const page = event.detail;
    this.dispatchEvent('page:reinit pageReinit', event, page);
  }

  onPageBeforeIn(event) {
    const page = event.detail;
    this.dispatchEvent('page:beforein pageBeforeIn', event, page);
  }

  onPageBeforeOut(event) {
    const page = event.detail;
    this.dispatchEvent('page:beforeout pageBeforeOut', event, page);
  }

  onPageAfterOut(event) {
    const page = event.detail;
    this.dispatchEvent('page:afterout pageAfterOut', event, page);
  }

  onPageAfterIn(event) {
    const page = event.detail;
    this.dispatchEvent('page:afterin pageAfterIn', event, page);
  }

  onPageBeforeRemove(event) {
    const page = event.detail;
    this.dispatchEvent('page:beforeremove pageBeforeRemove', event, page);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      name,
      pageContent,
      messagesContent,
      ptr,
      ptrDistance,
      ptrPreloader,
      infinite,
      infiniteDistance,
      infinitePreloader,
      infiniteTop,
      hideBarsOnScroll,
      hideNavbarOnScroll,
      hideToolbarOnScroll,
      loginScreen,
      className,
      stacked,
      tabs,
      subnavbar,
      withSubnavbar,
      noNavbar,
      noToolbar,
      noSwipeback
    } = props;
    const fixedList = [];
    const staticList = [];
    const needsPageContent = pageContent;
    const {
      static: slotsStatic,
      fixed: slotsFixed,
      default: slotsDefault
    } = self.slots;
    let fixedTags;
    fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ').map(tagName => `f7-${tagName}`);
    let hasSubnavbar;
    let hasMessages;
    hasMessages = messagesContent;

    if (slotsDefault) {
      slotsDefault.forEach(child => {
        if (typeof child === 'undefined') return;
        let isFixedTag = false;
        {
          const tag = child.type && (child.type.displayName || child.type.name);

          if (!tag) {
            if (needsPageContent) staticList.push(child);
            return;
          }

          if (tag === 'F7Subnavbar' || tag === 'f7-subnavbar') hasSubnavbar = true;
          if (typeof hasMessages === 'undefined' && (tag === 'F7Messages' || tag === 'f7-messages')) hasMessages = true;

          if (fixedTags.indexOf(tag) >= 0) {
            isFixedTag = true;
          }
        }

        if (needsPageContent) {
          if (isFixedTag) fixedList.push(child);else staticList.push(child);
        }
      });
    }

    const classes = Utils.classNames(className, 'page', {
      stacked,
      tabs,
      'page-with-subnavbar': subnavbar || withSubnavbar || hasSubnavbar,
      'no-navbar': noNavbar,
      'no-toolbar': noToolbar,
      'no-swipeback': noSwipeback
    }, Mixins.colorClasses(props));

    if (!needsPageContent) {
      return React.createElement('div', {
        ref: __reactNode => {
          this.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes,
        'data-name': name
      }, slotsFixed, slotsStatic, slotsDefault);
    }

    const pageContentEl = React.createElement(F7PageContent, {
      ptr: ptr,
      ptrDistance: ptrDistance,
      ptrPreloader: ptrPreloader,
      infinite: infinite,
      infiniteTop: infiniteTop,
      infiniteDistance: infiniteDistance,
      infinitePreloader: infinitePreloader,
      hideBarsOnScroll: hideBarsOnScroll,
      hideNavbarOnScroll: hideNavbarOnScroll,
      hideToolbarOnScroll: hideToolbarOnScroll,
      messagesContent: messagesContent || hasMessages,
      loginScreen: loginScreen
    }, slotsStatic, staticList);
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes,
      'data-name': name
    }, fixedList, slotsFixed, pageContentEl);
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
    el.removeEventListener('page:mounted', self.onPageMounted);
    el.removeEventListener('page:init', self.onPageInit);
    el.removeEventListener('page:reinit', self.onPageReinit);
    el.removeEventListener('page:beforein', self.onPageBeforeIn);
    el.removeEventListener('page:beforeout', self.onPageBeforeOut);
    el.removeEventListener('page:afterout', self.onPageAfterOut);
    el.removeEventListener('page:afterin', self.onPageAfterIn);
    el.removeEventListener('page:beforeremove', self.onPageBeforeRemove);
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    const {
      ptr,
      infinite
    } = self.props;
    self.onPtrPullStart = self.onPtrPullStart.bind(self);
    self.onPtrPullMove = self.onPtrPullMove.bind(self);
    self.onPtrPullEnd = self.onPtrPullEnd.bind(self);
    self.onPtrRefresh = self.onPtrRefresh.bind(self);
    self.onPtrDone = self.onPtrDone.bind(self);
    self.onInfinite = self.onInfinite.bind(self);
    self.onPageMounted = self.onPageMounted.bind(self);
    self.onPageInit = self.onPageInit.bind(self);
    self.onPageReinit = self.onPageReinit.bind(self);
    self.onPageBeforeIn = self.onPageBeforeIn.bind(self);
    self.onPageBeforeOut = self.onPageBeforeOut.bind(self);
    self.onPageAfterOut = self.onPageAfterOut.bind(self);
    self.onPageAfterIn = self.onPageAfterIn.bind(self);
    self.onPageBeforeRemove = self.onPageBeforeRemove.bind(self);

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

    el.addEventListener('page:mounted', self.onPageMounted);
    el.addEventListener('page:init', self.onPageInit);
    el.addEventListener('page:reinit', self.onPageReinit);
    el.addEventListener('page:beforein', self.onPageBeforeIn);
    el.addEventListener('page:beforeout', self.onPageBeforeOut);
    el.addEventListener('page:afterout', self.onPageAfterOut);
    el.addEventListener('page:afterin', self.onPageAfterIn);
    el.addEventListener('page:beforeremove', self.onPageBeforeRemove);
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

__reactComponentSetProps(F7Page, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  name: String,
  stacked: Boolean,
  withSubnavbar: Boolean,
  subnavbar: Boolean,
  noNavbar: Boolean,
  noToolbar: Boolean,
  tabs: Boolean,
  pageContent: {
    type: Boolean,
    default: true
  },
  noSwipeback: Boolean,
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

F7Page.displayName = 'f7-page';
export default F7Page;