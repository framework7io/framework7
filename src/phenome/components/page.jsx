import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

import F7PageContent from './page-content';

const PageProps = Utils.extend({
  name: String,
  stacked: Boolean,
  withSubnavbar: Boolean,
  subnavbar: Boolean,
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
}, Mixins.colorProps);

export default {
  name: 'f7-page',
  props: PageProps,
  state() {
    return {
      hasSubnavbar: false,
    };
  },
  render() {
    const self = this;
    const fixedList = [];
    const staticList = [];
    const needsPageContent = self.props.pageContent;

    const { static: slotsStatic, fixed: slotsFixed, default: slotsDefault } = self.slots;

    let fixedTags;
    // phenome-vue-next-line
    fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab list-index').split(' ');
    // phenome-react-next-line
    fixedTags = ('Navbar Toolbar Tabbar Subnavbar Searchbar Messagebar Fab ListIndex').split(' ').map(tagName => `F7${tagName}`);

    let hasSubnavbar;
    let hasMessages;
    hasMessages = self.props.messagesContent; // phenome-react-line
    hasMessages = self.$options.propsData.messagesContent; // phenome-vue-line

    if (slotsDefault) {
      slotsDefault.forEach((child) => {
        let isFixedTag = false;
        if (process.env.COMPILER === 'react') {
          const tag = child.type && child.type.name;
          if (!tag) {
            if (needsPageContent) staticList.push(child);
            return;
          }
          if (tag === 'F7Subnavbar') hasSubnavbar = true;
          if (typeof hasMessages === 'undefined' && tag === 'F7Messages') hasMessages = true;
          if (fixedTags.indexOf(tag) >= 0) {
            isFixedTag = true;
          }
        }
        if (process.env.COMPILER === 'vue') {
          const tag = child.tag;
          if (!tag) {
            if (needsPageContent) staticList.push(child);
            return;
          }
          if (tag.indexOf('subnavbar') >= 0) hasSubnavbar = true;
          if (typeof hasMessages === 'undefined' && tag.indexOf('messages') >= 0) hasMessages = true;
          for (let j = 0; j < fixedTags.length; j += 1) {
            if (tag.indexOf(fixedTags[j]) >= 0) {
              isFixedTag = true;
            }
          }
        }
        if (needsPageContent) {
          if (isFixedTag) fixedList.push(child);
          else staticList.push(child);
        }
      });
    }

    self.hasSubnavbar = hasSubnavbar;

    if (!needsPageContent) {
      return (
        <div ref="el" id={self.props.id} style={self.props.style} className={self.classes} data-name={self.props.name}>
          {slotsFixed}
          {slotsStatic}
          {slotsDefault}
        </div>
      );
    }

    const pageContentEl = (
      <F7PageContent
        ptr={self.props.ptr}
        ptrDistance={self.props.ptrDistance}
        ptrPreloader={self.props.ptrPreloader}
        infinite={self.props.infinite}
        infiniteTop={self.props.infiniteTop}
        infiniteDistance={self.props.infiniteDistance}
        infinitePreloader={self.props.infinitePreloader}
        hideBarsOnScroll={self.props.hideBarsOnScroll}
        hideNavbarOnScroll={self.props.hideNavbarOnScroll}
        hideToolbarOnScroll={self.props.hideToolbarOnScroll}
        messagesContent={self.props.messagesContent || hasMessages}
        loginScreen={self.props.loginScreen}
      >
        {slotsStatic}
        {staticList}
      </F7PageContent>
    );

    return (
      <div ref="el" id={self.props.id} style={self.props.style} className={self.classes} data-name={self.props.name}>
        {fixedList}
        {slotsFixed}
        {pageContentEl}
      </div>
    );
  },
  computed: {
    classes() {
      return Utils.classNames(
        this.props.className,
        {
          page: true,
          stacked: this.props.stacked,
          tabs: this.props.tabs,
          'page-with-subnavbar': this.props.subnavbar || this.props.withSubnavbar || this.hasSubnavbar,
          'no-navbar': this.props.noNavbar,
          'no-toolbar': this.props.noToolbar,
          'no-swipeback': this.props.noSwipeback,
        },
        Mixins.colorClasses(this),
      );
    },
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;

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

    el.addEventListener('ptr:pullstart', self.onPtrPullStart);
    el.addEventListener('ptr:pullmove', self.onPtrPullMove);
    el.addEventListener('ptr:pullend', self.onPtrPullEnd);
    el.addEventListener('ptr:refresh', self.onPtrRefresh);
    el.addEventListener('ptr:done', self.onPtrDone);
    el.addEventListener('infinite', self.onInfinite);
    el.addEventListener('page:mounted', self.onPageMounted);
    el.addEventListener('page:init', self.onPageInit);
    el.addEventListener('page:reinit', self.onPageReinit);
    el.addEventListener('page:beforein', self.onPageBeforeIn);
    el.addEventListener('page:beforeout', self.onPageBeforeOut);
    el.addEventListener('page:afterout', self.onPageAfterOut);
    el.addEventListener('page:afterin', self.onPageAfterIn);
    el.addEventListener('page:beforeremove', self.onPageBeforeRemove);
  },
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
  },
  methods: {
    onPtrPullStart(event) {
      this.dispatchEvent('ptr:pullstart ptrPullStart', event);
    },
    onPtrPullMove(event) {
      this.dispatchEvent('ptr:pullmove ptrPullMove', event);
    },
    onPtrPullEnd(event) {
      this.dispatchEvent('ptr:pullend ptrPullEnd', event);
    },
    onPtrRefresh(event) {
      this.dispatchEvent('ptr:refresh ptrRefresh', event, event.detail);
    },
    onPtrDone(event) {
      this.dispatchEvent('ptr:done ptrDone', event);
    },
    onInfinite(event) {
      this.dispatchEvent('infinite', event);
    },
    onPageMounted(event) {
      this.dispatchEvent('page:mounted pageMounted', event, event.detail);
    },
    onPageInit(event) {
      this.dispatchEvent('page:init pageInit', event, event.detail);
    },
    onPageReinit(event) {
      this.dispatchEvent('page:reinit pageReinit', event, event.detail);
    },
    onPageBeforeIn(event) {
      this.dispatchEvent('page:beforein pageBeforeIn', event, event.detail);
    },
    onPageBeforeOut(event) {
      this.dispatchEvent('page:beforeout pageBeforeOut', event, event.detail);
    },
    onPageAfterOut(event) {
      this.dispatchEvent('page:afterout pageAfterOut', event, event.detail);
    },
    onPageAfterIn(event) {
      this.dispatchEvent('page:afterin pageAfterIn', event, event.detail);
    },
    onPageBeforeRemove(event) {
      this.dispatchEvent('page:beforeremove pageBeforeRemove', event, event.detail);
    },
  },
};
