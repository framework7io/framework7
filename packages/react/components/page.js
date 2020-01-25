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
        hasSubnavbar: false,
        hasNavbarLarge: false,
        hasNavbarLargeCollapsed: false,
        hasCardExpandableOpened: false,
        routerPositionClass: '',
        routerForceUnstack: false,
        routerPageRole: null,
        routerPageRoleDetailRoot: false,
        routerPageMasterStack: false
      };
    })();

    (() => {
      Utils.bindMethods(this, ['onPtrPullStart', 'onPtrPullMove', 'onPtrPullEnd', 'onPtrRefresh', 'onPtrDone', 'onInfinite', 'onPageMounted', 'onPageInit', 'onPageReinit', 'onPageBeforeIn', 'onPageBeforeOut', 'onPageAfterOut', 'onPageAfterIn', 'onPageBeforeRemove', 'onPageStack', 'onPageUnstack', 'onPagePosition', 'onPageRole', 'onPageMasterStack', 'onPageMasterUnstack', 'onPageNavbarLargeCollapsed', 'onPageNavbarLargeExpanded', 'onCardOpened', 'onCardClose']);
    })();
  }

  onPtrPullStart(...args) {
    this.dispatchEvent('ptr:pullstart ptrPullStart', ...args);
  }

  onPtrPullMove(...args) {
    this.dispatchEvent('ptr:pullmove ptrPullMove', ...args);
  }

  onPtrPullEnd(...args) {
    this.dispatchEvent('ptr:pullend ptrPullEnd', ...args);
  }

  onPtrRefresh(...args) {
    this.dispatchEvent('ptr:refresh ptrRefresh', ...args);
  }

  onPtrDone(...args) {
    this.dispatchEvent('ptr:done ptrDone', ...args);
  }

  onInfinite(...args) {
    this.dispatchEvent('infinite', ...args);
  }

  onPageMounted(page) {
    if (this.eventTargetEl !== page.el) return;
    this.dispatchEvent('page:mounted pageMounted', page);
  }

  onPageInit(page) {
    if (this.eventTargetEl !== page.el) return;
    const {
      withSubnavbar,
      subnavbar,
      withNavbarLarge,
      navbarLarge
    } = this.props;

    if (typeof withSubnavbar === 'undefined' && typeof subnavbar === 'undefined') {
      if (page.$navbarEl && page.$navbarEl.length && page.$navbarEl.find('.subnavbar').length || page.$el.children('.navbar').find('.subnavbar').length) {
        this.setState({
          hasSubnavbar: true
        });
      }
    }

    if (typeof withNavbarLarge === 'undefined' && typeof navbarLarge === 'undefined') {
      if (page.$navbarEl && page.$navbarEl.hasClass('navbar-large')) {
        this.setState({
          hasNavbarLarge: true
        });
      }
    }

    this.dispatchEvent('page:init pageInit', page);
  }

  onPageReinit(page) {
    if (this.eventTargetEl !== page.el) return;
    this.dispatchEvent('page:reinit pageReinit', page);
  }

  onPageBeforeIn(page) {
    if (this.eventTargetEl !== page.el) return;

    if (!page.swipeBack) {
      if (page.from === 'next') {
        this.setState({
          routerPositionClass: 'page-next'
        });
      }

      if (page.from === 'previous') {
        this.setState({
          routerPositionClass: 'page-previous'
        });
      }
    }

    this.dispatchEvent('page:beforein pageBeforeIn', page);
  }

  onPageBeforeOut(page) {
    if (this.eventTargetEl !== page.el) return;
    this.dispatchEvent('page:beforeout pageBeforeOut', page);
  }

  onPageAfterOut(page) {
    if (this.eventTargetEl !== page.el) return;

    if (page.to === 'next') {
      this.setState({
        routerPositionClass: 'page-next'
      });
    }

    if (page.to === 'previous') {
      this.setState({
        routerPositionClass: 'page-previous'
      });
    }

    this.dispatchEvent('page:afterout pageAfterOut', page);
  }

  onPageAfterIn(page) {
    if (this.eventTargetEl !== page.el) return;
    this.setState({
      routerPositionClass: 'page-current'
    });
    this.dispatchEvent('page:afterin pageAfterIn', page);
  }

  onPageBeforeRemove(page) {
    if (this.eventTargetEl !== page.el) return;
    this.dispatchEvent('page:beforeremove pageBeforeRemove', page);
  }

  onPageStack(pageEl) {
    if (this.eventTargetEl !== pageEl) return;
    this.setState({
      routerForceUnstack: false
    });
  }

  onPageUnstack(pageEl) {
    if (this.eventTargetEl !== pageEl) return;
    this.setState({
      routerForceUnstack: true
    });
  }

  onPagePosition(pageEl, position) {
    if (this.eventTargetEl !== pageEl) return;
    this.setState({
      routerPositionClass: `page-${position}`
    });
  }

  onPageRole(pageEl, rolesData) {
    if (this.eventTargetEl !== pageEl) return;
    this.setState({
      routerPageRole: rolesData.role,
      routerPageRoleDetailRoot: rolesData.detailRoot
    });
  }

  onPageMasterStack(pageEl) {
    if (this.eventTargetEl !== pageEl) return;
    this.setState({
      routerPageMasterStack: true
    });
  }

  onPageMasterUnstack(pageEl) {
    if (this.eventTargetEl !== pageEl) return;
    this.setState({
      routerPageMasterStack: false
    });
  }

  onPageNavbarLargeCollapsed(pageEl) {
    if (this.eventTargetEl !== pageEl) return;
    this.setState({
      hasNavbarLargeCollapsed: true
    });
  }

  onPageNavbarLargeExpanded(pageEl) {
    if (this.eventTargetEl !== pageEl) return;
    this.setState({
      hasNavbarLargeCollapsed: false
    });
  }

  onCardOpened(cardEl, pageEl) {
    if (this.eventTargetEl !== pageEl) return;
    this.setState({
      hasCardExpandableOpened: true
    });
  }

  onCardClose(cardEl, pageEl) {
    if (this.eventTargetEl !== pageEl) return;
    this.setState({
      hasCardExpandableOpened: false
    });
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
      ptrBottom,
      ptrMousewheel,
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
      navbarLarge,
      withNavbarLarge,
      noNavbar,
      noToolbar,
      noSwipeback
    } = props;
    const fixedList = [];
    const staticList = [];
    const {
      static: slotsStatic,
      fixed: slotsFixed,
      default: slotsDefault
    } = self.slots;
    let fixedTags;
    fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ').map(tagName => `f7-${tagName}`);
    let hasSubnavbar;
    let hasMessages;
    let hasNavbarLarge;
    hasMessages = messagesContent;

    if (slotsDefault) {
      slotsDefault.forEach(child => {
        if (typeof child === 'undefined') return;
        let isFixedTag = false;
        {
          const tag = child.type && (child.type.displayName || child.type.name);

          if (!tag) {
            if (pageContent) staticList.push(child);
            return;
          }

          if (tag === 'F7Subnavbar' || tag === 'f7-subnavbar') hasSubnavbar = true;

          if (tag === 'F7Navbar' || tag === 'f7-navbar') {
            if (child.props && child.props.large) hasNavbarLarge = true;
          }

          if (typeof hasMessages === 'undefined' && (tag === 'F7Messages' || tag === 'f7-messages')) hasMessages = true;

          if (fixedTags.indexOf(tag) >= 0) {
            isFixedTag = true;
          }
        }

        if (pageContent) {
          if (isFixedTag) fixedList.push(child);else staticList.push(child);
        }
      });
    }

    const forceSubnavbar = typeof subnavbar === 'undefined' && typeof withSubnavbar === 'undefined' ? hasSubnavbar || this.state.hasSubnavbar : false;
    const forceNavbarLarge = typeof navbarLarge === 'undefined' && typeof withNavbarLarge === 'undefined' ? hasNavbarLarge || this.state.hasNavbarLarge : false;
    const classes = Utils.classNames(className, 'page', this.state.routerPositionClass, {
      stacked: stacked && !this.state.routerForceUnstack,
      tabs,
      'page-with-subnavbar': subnavbar || withSubnavbar || forceSubnavbar,
      'page-with-navbar-large': navbarLarge || withNavbarLarge || forceNavbarLarge,
      'no-navbar': noNavbar,
      'no-toolbar': noToolbar,
      'no-swipeback': noSwipeback,
      'page-master': this.state.routerPageRole === 'master',
      'page-master-detail': this.state.routerPageRole === 'detail',
      'page-master-detail-root': this.state.routerPageRoleDetailRoot === true,
      'page-master-stacked': this.state.routerPageMasterStack === true,
      'page-with-navbar-large-collapsed': this.state.hasNavbarLargeCollapsed === true,
      'page-with-card-opened': this.state.hasCardExpandableOpened === true,
      'login-screen-page': loginScreen
    }, Mixins.colorClasses(props));

    if (!pageContent) {
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
      ptrBottom: ptrBottom,
      ptrMousewheel: ptrMousewheel,
      infinite: infinite,
      infiniteTop: infiniteTop,
      infiniteDistance: infiniteDistance,
      infinitePreloader: infinitePreloader,
      hideBarsOnScroll: hideBarsOnScroll,
      hideNavbarOnScroll: hideNavbarOnScroll,
      hideToolbarOnScroll: hideToolbarOnScroll,
      messagesContent: messagesContent || hasMessages,
      loginScreen: loginScreen,
      onPtrPullStart: self.onPtrPullStart,
      onPtrPullMove: self.onPtrPullMove,
      onPtrPullEnd: self.onPtrPullEnd,
      onPtrRefresh: self.onPtrRefresh,
      onPtrDone: self.onPtrDone,
      onInfinite: self.onInfinite
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
    if (!self.$f7) return;
    const f7 = self.$f7;
    f7.off('pageMounted', self.onPageMounted);
    f7.off('pageInit', self.onPageInit);
    f7.off('pageReinit', self.onPageReinit);
    f7.off('pageBeforeIn', self.onPageBeforeIn);
    f7.off('pageBeforeOut', self.onPageBeforeOut);
    f7.off('pageAfterOut', self.onPageAfterOut);
    f7.off('pageAfterIn', self.onPageAfterIn);
    f7.off('pageBeforeRemove', self.onPageBeforeRemove);
    f7.off('pageStack', self.onPageStack);
    f7.off('pageUnstack', self.onPageUnstack);
    f7.off('pagePosition', self.onPagePosition);
    f7.off('pageRole', self.onPageRole);
    f7.off('pageMasterStack', self.onPageMasterStack);
    f7.off('pageMasterUnstack', self.onPageMasterUnstack);
    f7.off('pageNavbarLargeCollapsed', self.onPageNavbarLargeCollapsed);
    f7.off('pageNavbarLargeExpanded', self.onPageNavbarLargeExpanded);
    f7.off('cardOpened', self.onCardOpened);
    f7.off('cardClose', self.onCardClose);
    self.eventTargetEl = null;
    delete self.eventTargetEl;
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    self.$f7ready(f7 => {
      self.eventTargetEl = el;
      f7.on('pageMounted', self.onPageMounted);
      f7.on('pageInit', self.onPageInit);
      f7.on('pageReinit', self.onPageReinit);
      f7.on('pageBeforeIn', self.onPageBeforeIn);
      f7.on('pageBeforeOut', self.onPageBeforeOut);
      f7.on('pageAfterOut', self.onPageAfterOut);
      f7.on('pageAfterIn', self.onPageAfterIn);
      f7.on('pageBeforeRemove', self.onPageBeforeRemove);
      f7.on('pageStack', self.onPageStack);
      f7.on('pageUnstack', self.onPageUnstack);
      f7.on('pagePosition', self.onPagePosition);
      f7.on('pageRole', self.onPageRole);
      f7.on('pageMasterStack', self.onPageMasterStack);
      f7.on('pageMasterUnstack', self.onPageMasterUnstack);
      f7.on('pageNavbarLargeCollapsed', self.onPageNavbarLargeCollapsed);
      f7.on('pageNavbarLargeExpanded', self.onPageNavbarLargeExpanded);
      f7.on('cardOpened', self.onCardOpened);
      f7.on('cardClose', self.onCardClose);
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

__reactComponentSetProps(F7Page, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  name: String,
  stacked: Boolean,
  withSubnavbar: {
    type: Boolean,
    default: undefined
  },
  subnavbar: {
    type: Boolean,
    default: undefined
  },
  withNavbarLarge: {
    type: Boolean,
    default: undefined
  },
  navbarLarge: {
    type: Boolean,
    default: undefined
  },
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

F7Page.displayName = 'f7-page';
export default F7Page;