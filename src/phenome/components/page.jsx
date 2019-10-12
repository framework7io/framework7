import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

import F7PageContent from './page-content';

export default {
  name: 'f7-page',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    name: String,
    stacked: Boolean,
    withSubnavbar: {
      type: Boolean,
      default: undefined,
    },
    subnavbar: {
      type: Boolean,
      default: undefined,
    },
    withNavbarLarge: {
      type: Boolean,
      default: undefined,
    },
    navbarLarge: {
      type: Boolean,
      default: undefined,
    },
    noNavbar: Boolean,
    noToolbar: Boolean,
    tabs: Boolean,
    pageContent: {
      type: Boolean,
      default: true,
    },
    noSwipeback: Boolean,
    // Page Content Props
    ptr: Boolean,
    ptrDistance: Number,
    ptrPreloader: {
      type: Boolean,
      default: true,
    },
    ptrBottom: Boolean,
    ptrMousewheel: Boolean,
    infinite: Boolean,
    infiniteTop: Boolean,
    infiniteDistance: Number,
    infinitePreloader: {
      type: Boolean,
      default: true,
    },
    hideBarsOnScroll: Boolean,
    hideNavbarOnScroll: Boolean,
    hideToolbarOnScroll: Boolean,
    messagesContent: Boolean,
    loginScreen: Boolean,
    ...Mixins.colorProps,
  },
  state() {
    return {
      hasSubnavbar: false,
      hasNavbarLarge: false,
      hasNavbarLargeCollapsed: false,
      hasCardExpandableOpened: false,
      routerPositionClass: '',
      routerForceUnstack: false,
      routerPageRole: null,
      routerPageRoleDetailRoot: false,
      routerPageMasterStack: false,
    };
  },
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
      noSwipeback,
    } = props;
    const fixedList = [];
    const staticList = [];

    const { static: slotsStatic, fixed: slotsFixed, default: slotsDefault } = self.slots;

    let fixedTags;
    // phenome-vue-next-line
    fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab list-index').split(' ');
    // phenome-react-next-line
    fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab list-index').split(' ').map(tagName => `f7-${tagName}`);

    let hasSubnavbar;
    let hasMessages;
    let hasNavbarLarge;
    hasMessages = messagesContent; // phenome-react-line
    hasMessages = self.$options.propsData.messagesContent; // phenome-vue-line

    if (slotsDefault) {
      slotsDefault.forEach((child) => {
        if (typeof child === 'undefined') return;
        let isFixedTag = false;
        if (process.env.COMPILER === 'react') {
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
        if (process.env.COMPILER === 'vue') {
          const tag = child.tag;
          if (!tag) {
            if (pageContent) staticList.push(child);
            return;
          }
          if (tag.indexOf('subnavbar') >= 0) hasSubnavbar = true;
          if (tag.indexOf('navbar') >= 0) {
            if (child.componentOptions && child.componentOptions.propsData && ('large' in child.componentOptions.propsData) && (child.componentOptions.propsData.large || child.componentOptions.propsData.large === '')) {
              hasNavbarLarge = true;
            }
          }
          if (typeof hasMessages === 'undefined' && tag.indexOf('messages') >= 0) hasMessages = true;
          for (let j = 0; j < fixedTags.length; j += 1) {
            if (tag.indexOf(fixedTags[j]) >= 0) {
              isFixedTag = true;
            }
          }
        }
        if (pageContent) {
          if (isFixedTag) fixedList.push(child);
          else staticList.push(child);
        }
      });
    }

    const forceSubnavbar = (typeof subnavbar === 'undefined' && typeof withSubnavbar === 'undefined')
      ? hasSubnavbar || this.state.hasSubnavbar
      : false;

    const forceNavbarLarge = (typeof navbarLarge === 'undefined' && typeof withNavbarLarge === 'undefined')
      ? hasNavbarLarge || this.state.hasNavbarLarge
      : false;

    const classes = Utils.classNames(
      className,
      'page',
      this.state.routerPositionClass,
      {
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
        'login-screen-page': loginScreen,
      },
      Mixins.colorClasses(props),
    );

    if (!pageContent) {
      return (
        <div ref="el" id={id} style={style} className={classes} data-name={name}>
          {slotsFixed}
          {slotsStatic}
          {slotsDefault}
        </div>
      );
    }

    const pageContentEl = (
      <F7PageContent
        ptr={ptr}
        ptrDistance={ptrDistance}
        ptrPreloader={ptrPreloader}
        ptrBottom={ptrBottom}
        ptrMousewheel={ptrMousewheel}
        infinite={infinite}
        infiniteTop={infiniteTop}
        infiniteDistance={infiniteDistance}
        infinitePreloader={infinitePreloader}
        hideBarsOnScroll={hideBarsOnScroll}
        hideNavbarOnScroll={hideNavbarOnScroll}
        hideToolbarOnScroll={hideToolbarOnScroll}
        messagesContent={messagesContent || hasMessages}
        loginScreen={loginScreen}
        onPtrPullStart={self.onPtrPullStart}
        onPtrPullMove={self.onPtrPullMove}
        onPtrPullEnd={self.onPtrPullEnd}
        onPtrRefresh={self.onPtrRefresh}
        onPtrDone={self.onPtrDone}
        onInfinite={self.onInfinite}
      >
        {slotsStatic}
        {staticList}
      </F7PageContent>
    );

    return (
      <div ref="el" id={id} style={style} className={classes} data-name={name}>
        {fixedList}
        {slotsFixed}
        {pageContentEl}
      </div>
    );
  },
  componentDidCreate() {
    Utils.bindMethods(this, [
      'onPtrPullStart',
      'onPtrPullMove',
      'onPtrPullEnd',
      'onPtrRefresh',
      'onPtrDone',
      'onInfinite',

      'onPageMounted',
      'onPageInit',
      'onPageReinit',
      'onPageBeforeIn',
      'onPageBeforeOut',
      'onPageAfterOut',
      'onPageAfterIn',
      'onPageBeforeRemove',
      'onPageStack',
      'onPageUnstack',
      'onPagePosition',
      'onPageRole',
      'onPageMasterStack',
      'onPageMasterUnstack',
      'onPageNavbarLargeCollapsed',
      'onPageNavbarLargeExpanded',
      'onCardOpened',
      'onCardClose',
    ]);
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    self.$f7ready((f7) => {
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
  },
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
  },
  methods: {
    onPtrPullStart(...args) {
      this.dispatchEvent('ptr:pullstart ptrPullStart', ...args);
    },
    onPtrPullMove(...args) {
      this.dispatchEvent('ptr:pullmove ptrPullMove', ...args);
    },
    onPtrPullEnd(...args) {
      this.dispatchEvent('ptr:pullend ptrPullEnd', ...args);
    },
    onPtrRefresh(...args) {
      this.dispatchEvent('ptr:refresh ptrRefresh', ...args);
    },
    onPtrDone(...args) {
      this.dispatchEvent('ptr:done ptrDone', ...args);
    },
    onInfinite(...args) {
      this.dispatchEvent('infinite', ...args);
    },
    // Main Page Events
    onPageMounted(page) {
      if (this.eventTargetEl !== page.el) return;
      this.dispatchEvent('page:mounted pageMounted', page);
    },
    onPageInit(page) {
      if (this.eventTargetEl !== page.el) return;
      const { withSubnavbar, subnavbar, withNavbarLarge, navbarLarge } = this.props;
      if (typeof withSubnavbar === 'undefined' && typeof subnavbar === 'undefined') {
        if (
          (page.$navbarEl && page.$navbarEl.length && page.$navbarEl.find('.subnavbar').length)
          || (page.$el.children('.navbar').find('.subnavbar').length)
        ) {
          this.setState({ hasSubnavbar: true });
        }
      }

      if (typeof withNavbarLarge === 'undefined' && typeof navbarLarge === 'undefined') {
        if (page.$navbarEl && page.$navbarEl.hasClass('navbar-large')) {
          this.setState({ hasNavbarLarge: true });
        }
      }

      this.dispatchEvent('page:init pageInit', page);
    },
    onPageReinit(page) {
      if (this.eventTargetEl !== page.el) return;
      this.dispatchEvent('page:reinit pageReinit', page);
    },
    onPageBeforeIn(page) {
      if (this.eventTargetEl !== page.el) return;
      if (!page.swipeBack) {
        if (page.from === 'next') {
          this.setState({
            routerPositionClass: 'page-next',
          });
        }
        if (page.from === 'previous') {
          this.setState({
            routerPositionClass: 'page-previous',
          });
        }
      }
      this.dispatchEvent('page:beforein pageBeforeIn', page);
    },
    onPageBeforeOut(page) {
      if (this.eventTargetEl !== page.el) return;
      this.dispatchEvent('page:beforeout pageBeforeOut', page);
    },
    onPageAfterOut(page) {
      if (this.eventTargetEl !== page.el) return;
      if (page.to === 'next') {
        this.setState({
          routerPositionClass: 'page-next',
        });
      }
      if (page.to === 'previous') {
        this.setState({
          routerPositionClass: 'page-previous',
        });
      }
      this.dispatchEvent('page:afterout pageAfterOut', page);
    },
    onPageAfterIn(page) {
      if (this.eventTargetEl !== page.el) return;
      this.setState({
        routerPositionClass: 'page-current',
      });
      this.dispatchEvent('page:afterin pageAfterIn', page);
    },
    onPageBeforeRemove(page) {
      if (this.eventTargetEl !== page.el) return;
      this.dispatchEvent('page:beforeremove pageBeforeRemove', page);
    },
    // Helper events
    onPageStack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerForceUnstack: false,
      });
    },
    onPageUnstack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerForceUnstack: true,
      });
    },
    onPagePosition(pageEl, position) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPositionClass: `page-${position}`,
      });
    },
    onPageRole(pageEl, rolesData) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPageRole: rolesData.role,
        routerPageRoleDetailRoot: rolesData.detailRoot,
      });
    },
    onPageMasterStack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPageMasterStack: true,
      });
    },
    onPageMasterUnstack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPageMasterStack: false,
      });
    },
    onPageNavbarLargeCollapsed(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        hasNavbarLargeCollapsed: true,
      });
    },
    onPageNavbarLargeExpanded(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        hasNavbarLargeCollapsed: false,
      });
    },
    onCardOpened(cardEl, pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({ hasCardExpandableOpened: true });
    },
    onCardClose(cardEl, pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({ hasCardExpandableOpened: false });
    },
  },
};
