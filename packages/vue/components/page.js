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
  data: function data() {
    var props = __vueComponentProps(this);

    var state = function () {
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
    }();

    return {
      state: state
    };
  },
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var id = props.id,
        style = props.style,
        name = props.name,
        pageContent = props.pageContent,
        messagesContent = props.messagesContent,
        ptr = props.ptr,
        ptrDistance = props.ptrDistance,
        ptrPreloader = props.ptrPreloader,
        ptrBottom = props.ptrBottom,
        ptrMousewheel = props.ptrMousewheel,
        infinite = props.infinite,
        infiniteDistance = props.infiniteDistance,
        infinitePreloader = props.infinitePreloader,
        infiniteTop = props.infiniteTop,
        hideBarsOnScroll = props.hideBarsOnScroll,
        hideNavbarOnScroll = props.hideNavbarOnScroll,
        hideToolbarOnScroll = props.hideToolbarOnScroll,
        loginScreen = props.loginScreen,
        className = props.className,
        stacked = props.stacked,
        tabs = props.tabs,
        subnavbar = props.subnavbar,
        withSubnavbar = props.withSubnavbar,
        navbarLarge = props.navbarLarge,
        withNavbarLarge = props.withNavbarLarge,
        noNavbar = props.noNavbar,
        noToolbar = props.noToolbar,
        noSwipeback = props.noSwipeback;
    var fixedList = [];
    var staticList = [];
    var _self$$slots = self.$slots,
        slotsStatic = _self$$slots.static,
        slotsFixed = _self$$slots.fixed,
        slotsDefault = _self$$slots.default;
    var fixedTags;
    fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ');
    var hasSubnavbar;
    var hasMessages;
    var hasNavbarLarge;
    hasMessages = self.$options.propsData.messagesContent;

    if (slotsDefault) {
      slotsDefault.forEach(function (child) {
        if (typeof child === 'undefined') return;
        var isFixedTag = false;
        {
          var tag = child.tag;

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

          for (var j = 0; j < fixedTags.length; j += 1) {
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

    var forceSubnavbar = typeof subnavbar === 'undefined' && typeof withSubnavbar === 'undefined' ? hasSubnavbar || this.state.hasSubnavbar : false;
    var forceNavbarLarge = typeof navbarLarge === 'undefined' && typeof withNavbarLarge === 'undefined' ? hasNavbarLarge || this.state.hasNavbarLarge : false;
    var classes = Utils.classNames(className, 'page', this.state.routerPositionClass, {
      stacked: stacked && !this.state.routerForceUnstack,
      tabs: tabs,
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

    var pageContentEl = _h(F7PageContent, {
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
  created: function created() {
    Utils.bindMethods(this, ['onPtrPullStart', 'onPtrPullMove', 'onPtrPullEnd', 'onPtrRefresh', 'onPtrDone', 'onInfinite', 'onPageMounted', 'onPageInit', 'onPageReinit', 'onPageBeforeIn', 'onPageBeforeOut', 'onPageAfterOut', 'onPageAfterIn', 'onPageBeforeRemove', 'onPageStack', 'onPageUnstack', 'onPagePosition', 'onPageRole', 'onPageMasterStack', 'onPageMasterUnstack', 'onPageNavbarLargeCollapsed', 'onPageNavbarLargeExpanded', 'onCardOpened', 'onCardClose']);
  },
  mounted: function mounted() {
    var self = this;
    var el = self.$refs.el;
    self.$f7ready(function (f7) {
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
  beforeDestroy: function beforeDestroy() {
    var self = this;
    if (!self.$f7) return;
    var f7 = self.$f7;
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
    onPtrPullStart: function onPtrPullStart() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.dispatchEvent.apply(this, ['ptr:pullstart ptrPullStart'].concat(args));
    },
    onPtrPullMove: function onPtrPullMove() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.dispatchEvent.apply(this, ['ptr:pullmove ptrPullMove'].concat(args));
    },
    onPtrPullEnd: function onPtrPullEnd() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.dispatchEvent.apply(this, ['ptr:pullend ptrPullEnd'].concat(args));
    },
    onPtrRefresh: function onPtrRefresh() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.dispatchEvent.apply(this, ['ptr:refresh ptrRefresh'].concat(args));
    },
    onPtrDone: function onPtrDone() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this.dispatchEvent.apply(this, ['ptr:done ptrDone'].concat(args));
    },
    onInfinite: function onInfinite() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      this.dispatchEvent.apply(this, ['infinite'].concat(args));
    },
    onPageMounted: function onPageMounted(page) {
      if (this.eventTargetEl !== page.el) return;
      this.dispatchEvent('page:mounted pageMounted', page);
    },
    onPageInit: function onPageInit(page) {
      if (this.eventTargetEl !== page.el) return;
      var _this$props = this.props,
          withSubnavbar = _this$props.withSubnavbar,
          subnavbar = _this$props.subnavbar,
          withNavbarLarge = _this$props.withNavbarLarge,
          navbarLarge = _this$props.navbarLarge;

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
    onPageReinit: function onPageReinit(page) {
      if (this.eventTargetEl !== page.el) return;
      this.dispatchEvent('page:reinit pageReinit', page);
    },
    onPageBeforeIn: function onPageBeforeIn(page) {
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
    onPageBeforeOut: function onPageBeforeOut(page) {
      if (this.eventTargetEl !== page.el) return;
      this.dispatchEvent('page:beforeout pageBeforeOut', page);
    },
    onPageAfterOut: function onPageAfterOut(page) {
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
    onPageAfterIn: function onPageAfterIn(page) {
      if (this.eventTargetEl !== page.el) return;
      this.setState({
        routerPositionClass: 'page-current'
      });
      this.dispatchEvent('page:afterin pageAfterIn', page);
    },
    onPageBeforeRemove: function onPageBeforeRemove(page) {
      if (this.eventTargetEl !== page.el) return;
      this.dispatchEvent('page:beforeremove pageBeforeRemove', page);
    },
    onPageStack: function onPageStack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerForceUnstack: false
      });
    },
    onPageUnstack: function onPageUnstack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerForceUnstack: true
      });
    },
    onPagePosition: function onPagePosition(pageEl, position) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPositionClass: "page-".concat(position)
      });
    },
    onPageRole: function onPageRole(pageEl, rolesData) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPageRole: rolesData.role,
        routerPageRoleDetailRoot: rolesData.detailRoot
      });
    },
    onPageMasterStack: function onPageMasterStack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPageMasterStack: true
      });
    },
    onPageMasterUnstack: function onPageMasterUnstack(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        routerPageMasterStack: false
      });
    },
    onPageNavbarLargeCollapsed: function onPageNavbarLargeCollapsed(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        hasNavbarLargeCollapsed: true
      });
    },
    onPageNavbarLargeExpanded: function onPageNavbarLargeExpanded(pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        hasNavbarLargeCollapsed: false
      });
    },
    onCardOpened: function onCardOpened(cardEl, pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        hasCardExpandableOpened: true
      });
    },
    onCardClose: function onCardClose(cardEl, pageEl) {
      if (this.eventTargetEl !== pageEl) return;
      this.setState({
        hasCardExpandableOpened: false
      });
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key7 = 1; _key7 < _len7; _key7++) {
        args[_key7 - 1] = arguments[_key7];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    },
    setState: function setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};