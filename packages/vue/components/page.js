import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7PageContent from './page-content';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-page',
  props: Object.assign({
    id: [String, Number],
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
  }, Mixins.colorProps),

  data() {
    const props = __vueComponentProps(this);

    const state = (() => {
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

    return {
      state
    };
  },

  render() {
    const _h = this.$createElement;
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
    } = self.$slots;
    let fixedTags;
    fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ');
    let hasSubnavbar;
    let hasMessages;
    let hasNavbarLarge;
    hasMessages = self.$options.propsData.messagesContent;

    if (slotsDefault) {
      slotsDefault.forEach(child => {
        if (typeof child === 'undefined') return;
        let isFixedTag = false;
        {
          const tag = child.tag;

          if (!tag) {
            if (pageContent) staticList.push(child);
            return;
          }

          if (tag.indexOf('subnavbar') >= 0) hasSubnavbar = true;

          if (tag.indexOf('navbar') >= 0) {
            if (child.componentOptions && child.componentOptions.propsData && 'large' in child.componentOptions.propsData && (child.componentOptions.propsData.large || child.componentOptions.propsData.large === '')) {
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
      return _h('div', {
        ref: 'el',
        style: style,
        class: classes,
        attrs: {
          id: id,
          'data-name': name
        }
      }, [slotsFixed, slotsStatic, slotsDefault]);
    }

    const pageContentEl = _h(F7PageContent, {
      on: {
        ptrPullStart: self.onPtrPullStart,
        ptrPullMove: self.onPtrPullMove,
        ptrPullEnd: self.onPtrPullEnd,
        ptrRefresh: self.onPtrRefresh,
        ptrDone: self.onPtrDone,
        infinite: self.onInfinite
      },
      attrs: {
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
        loginScreen: loginScreen
      }
    }, [slotsStatic, staticList]);

    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id,
        'data-name': name
      }
    }, [fixedList, slotsFixed, pageContentEl]);
  },

  created() {
    Utils.bindMethods(this, ['onPtrPullStart', 'onPtrPullMove', 'onPtrPullEnd', 'onPtrRefresh', 'onPtrDone', 'onInfinite', 'onPageMounted', 'onPageInit', 'onPageReinit', 'onPageBeforeIn', 'onPageBeforeOut', 'onPageAfterOut', 'onPageAfterIn', 'onPageBeforeRemove', 'onPageStack', 'onPageUnstack', 'onPagePosition', 'onPageRole', 'onPageMasterStack', 'onPageMasterUnstack', 'onPageNavbarLargeCollapsed', 'onPageNavbarLargeExpanded', 'onCardOpened', 'onCardClose']);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
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
  },

  beforeDestroy() {
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

    onPageMounted(page) {
      if (this.eventTargetEl !== page.el) return;
      this.dispatchEvent('page:mounted pageMounted', page);
    },

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
    },

    onPageBeforeOut(page) {
      if (this.eventTargetEl !== page.el) return;
      this.dispatchEvent('page:beforeout pageBeforeOut', page);
    },

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
    },

    onPageAfterIn(page) {
      if (this.eventTargetEl !== page.el) return;
      this.setState({
        routerPositionClass: 'page-current'
      });
      this.dispatchEvent('page:afterin pageAfterIn', page);
    },

    onPageBeforeRemove(page) {
      if (this.eventTargetEl !== page.el) return;
      this.dispatchEvent('page:beforeremove pageBeforeRemove', page);
    },

    onPageStack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerForceUnstack: false
      });
    },

    onPageUnstack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerForceUnstack: true
      });
    },

    onPagePosition(pageEl, position) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPositionClass: `page-${position}`
      });
    },

    onPageRole(pageEl, rolesData) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPageRole: rolesData.role,
        routerPageRoleDetailRoot: rolesData.detailRoot
      });
    },

    onPageMasterStack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPageMasterStack: true
      });
    },

    onPageMasterUnstack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPageMasterStack: false
      });
    },

    onPageNavbarLargeCollapsed(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        hasNavbarLargeCollapsed: true
      });
    },

    onPageNavbarLargeExpanded(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        hasNavbarLargeCollapsed: false
      });
    },

    onCardOpened(cardEl, pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        hasCardExpandableOpened: true
      });
    },

    onCardClose(cardEl, pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        hasCardExpandableOpened: false
      });
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    },

    setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};