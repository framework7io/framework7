/**
 * Framework7 Vue 5.4.0
 * Build full featured iOS & Android apps using Framework7 & Vue
 * https://framework7.io/vue/
 *
 * Copyright 2014-2020 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: January 29, 2020
 */
import Vue from 'vue';
import f7AccordionContent from './components/accordion-content';
import f7AccordionItem from './components/accordion-item';
import f7AccordionToggle from './components/accordion-toggle';
import f7Accordion from './components/accordion';
import f7ActionsButton from './components/actions-button';
import f7ActionsGroup from './components/actions-group';
import f7ActionsLabel from './components/actions-label';
import f7Actions from './components/actions';
import f7App from './components/app';
import f7Appbar from './components/appbar';
import f7Badge from './components/badge';
import f7BlockFooter from './components/block-footer';
import f7BlockHeader from './components/block-header';
import f7BlockTitle from './components/block-title';
import f7Block from './components/block';
import f7Button from './components/button';
import f7CardContent from './components/card-content';
import f7CardFooter from './components/card-footer';
import f7CardHeader from './components/card-header';
import f7Card from './components/card';
import f7Checkbox from './components/checkbox';
import f7Chip from './components/chip';
import f7Col from './components/col';
import f7FabButton from './components/fab-button';
import f7FabButtons from './components/fab-buttons';
import f7Fab from './components/fab';
import f7Gauge from './components/gauge';
import f7Icon from './components/icon';
import f7Input from './components/input';
import f7Link from './components/link';
import f7ListButton from './components/list-button';
import f7ListGroup from './components/list-group';
import f7ListIndex from './components/list-index';
import f7ListInput from './components/list-input';
import f7ListItemCell from './components/list-item-cell';
import f7ListItemContent from './components/list-item-content';
import f7ListItemRow from './components/list-item-row';
import f7ListItem from './components/list-item';
import f7List from './components/list';
import f7LoginScreenTitle from './components/login-screen-title';
import f7LoginScreen from './components/login-screen';
import f7MenuDropdownItem from './components/menu-dropdown-item';
import f7MenuDropdown from './components/menu-dropdown';
import f7MenuItem from './components/menu-item';
import f7Menu from './components/menu';
import f7Message from './components/message';
import f7MessagebarAttachment from './components/messagebar-attachment';
import f7MessagebarAttachments from './components/messagebar-attachments';
import f7MessagebarSheetImage from './components/messagebar-sheet-image';
import f7MessagebarSheetItem from './components/messagebar-sheet-item';
import f7MessagebarSheet from './components/messagebar-sheet';
import f7Messagebar from './components/messagebar';
import f7MessagesTitle from './components/messages-title';
import f7Messages from './components/messages';
import f7NavLeft from './components/nav-left';
import f7NavRight from './components/nav-right';
import f7NavTitleLarge from './components/nav-title-large';
import f7NavTitle from './components/nav-title';
import f7Navbar from './components/navbar';
import f7PageContent from './components/page-content';
import f7Page from './components/page';
import f7Panel from './components/panel';
import f7PhotoBrowser from './components/photo-browser';
import f7Popover from './components/popover';
import f7Popup from './components/popup';
import f7Preloader from './components/preloader';
import f7Progressbar from './components/progressbar';
import f7Radio from './components/radio';
import f7Range from './components/range';
import f7RoutableModals from './components/routable-modals';
import f7Row from './components/row';
import f7Searchbar from './components/searchbar';
import f7Segmented from './components/segmented';
import f7Sheet from './components/sheet';
import f7SkeletonBlock from './components/skeleton-block';
import f7SkeletonText from './components/skeleton-text';
import f7Stepper from './components/stepper';
import f7Subnavbar from './components/subnavbar';
import f7SwipeoutActions from './components/swipeout-actions';
import f7SwipeoutButton from './components/swipeout-button';
import f7SwiperSlide from './components/swiper-slide';
import f7Swiper from './components/swiper';
import f7Tab from './components/tab';
import f7Tabs from './components/tabs';
import f7TextEditor from './components/text-editor';
import f7Toggle from './components/toggle';
import f7Toolbar from './components/toolbar';
import f7TreeviewItem from './components/treeview-item';
import f7Treeview from './components/treeview';
import f7View from './components/view';
import f7Views from './components/views';

/* eslint no-underscore-dangle: "off" */
import componentsRouter from './utils/components-router';
import f7, { f7Instance } from './utils/f7';

function f7ready(callback) {
  f7.ready(callback);
}

const f7Theme = {};

const Plugin = {
  name: 'phenomePlugin',
  installed: false,
  install(params = {}) {
    if (Plugin.installed) return;
    Plugin.installed = true;

    const Framework7 = this;
    f7.Framework7 = Framework7;
    f7.events = new Framework7.Events();

    // eslint-disable-next-line
    const Extend = params.Vue || Vue;

    Vue.component('f7-accordion-content', f7AccordionContent);
    Vue.component('f7-accordion-item', f7AccordionItem);
    Vue.component('f7-accordion-toggle', f7AccordionToggle);
    Vue.component('f7-accordion', f7Accordion);
    Vue.component('f7-actions-button', f7ActionsButton);
    Vue.component('f7-actions-group', f7ActionsGroup);
    Vue.component('f7-actions-label', f7ActionsLabel);
    Vue.component('f7-actions', f7Actions);
    Vue.component('f7-app', f7App);
    Vue.component('f7-appbar', f7Appbar);
    Vue.component('f7-badge', f7Badge);
    Vue.component('f7-block-footer', f7BlockFooter);
    Vue.component('f7-block-header', f7BlockHeader);
    Vue.component('f7-block-title', f7BlockTitle);
    Vue.component('f7-block', f7Block);
    Vue.component('f7-button', f7Button);
    Vue.component('f7-card-content', f7CardContent);
    Vue.component('f7-card-footer', f7CardFooter);
    Vue.component('f7-card-header', f7CardHeader);
    Vue.component('f7-card', f7Card);
    Vue.component('f7-checkbox', f7Checkbox);
    Vue.component('f7-chip', f7Chip);
    Vue.component('f7-col', f7Col);
    Vue.component('f7-fab-button', f7FabButton);
    Vue.component('f7-fab-buttons', f7FabButtons);
    Vue.component('f7-fab', f7Fab);
    Vue.component('f7-gauge', f7Gauge);
    Vue.component('f7-icon', f7Icon);
    Vue.component('f7-input', f7Input);
    Vue.component('f7-link', f7Link);
    Vue.component('f7-list-button', f7ListButton);
    Vue.component('f7-list-group', f7ListGroup);
    Vue.component('f7-list-index', f7ListIndex);
    Vue.component('f7-list-input', f7ListInput);
    Vue.component('f7-list-item-cell', f7ListItemCell);
    Vue.component('f7-list-item-content', f7ListItemContent);
    Vue.component('f7-list-item-row', f7ListItemRow);
    Vue.component('f7-list-item', f7ListItem);
    Vue.component('f7-list', f7List);
    Vue.component('f7-login-screen-title', f7LoginScreenTitle);
    Vue.component('f7-login-screen', f7LoginScreen);
    Vue.component('f7-menu-dropdown-item', f7MenuDropdownItem);
    Vue.component('f7-menu-dropdown', f7MenuDropdown);
    Vue.component('f7-menu-item', f7MenuItem);
    Vue.component('f7-menu', f7Menu);
    Vue.component('f7-message', f7Message);
    Vue.component('f7-messagebar-attachment', f7MessagebarAttachment);
    Vue.component('f7-messagebar-attachments', f7MessagebarAttachments);
    Vue.component('f7-messagebar-sheet-image', f7MessagebarSheetImage);
    Vue.component('f7-messagebar-sheet-item', f7MessagebarSheetItem);
    Vue.component('f7-messagebar-sheet', f7MessagebarSheet);
    Vue.component('f7-messagebar', f7Messagebar);
    Vue.component('f7-messages-title', f7MessagesTitle);
    Vue.component('f7-messages', f7Messages);
    Vue.component('f7-nav-left', f7NavLeft);
    Vue.component('f7-nav-right', f7NavRight);
    Vue.component('f7-nav-title-large', f7NavTitleLarge);
    Vue.component('f7-nav-title', f7NavTitle);
    Vue.component('f7-navbar', f7Navbar);
    Vue.component('f7-page-content', f7PageContent);
    Vue.component('f7-page', f7Page);
    Vue.component('f7-panel', f7Panel);
    Vue.component('f7-photo-browser', f7PhotoBrowser);
    Vue.component('f7-popover', f7Popover);
    Vue.component('f7-popup', f7Popup);
    Vue.component('f7-preloader', f7Preloader);
    Vue.component('f7-progressbar', f7Progressbar);
    Vue.component('f7-radio', f7Radio);
    Vue.component('f7-range', f7Range);
    Vue.component('f7-routable-modals', f7RoutableModals);
    Vue.component('f7-row', f7Row);
    Vue.component('f7-searchbar', f7Searchbar);
    Vue.component('f7-segmented', f7Segmented);
    Vue.component('f7-sheet', f7Sheet);
    Vue.component('f7-skeleton-block', f7SkeletonBlock);
    Vue.component('f7-skeleton-text', f7SkeletonText);
    Vue.component('f7-stepper', f7Stepper);
    Vue.component('f7-subnavbar', f7Subnavbar);
    Vue.component('f7-swipeout-actions', f7SwipeoutActions);
    Vue.component('f7-swipeout-button', f7SwipeoutButton);
    Vue.component('f7-swiper-slide', f7SwiperSlide);
    Vue.component('f7-swiper', f7Swiper);
    Vue.component('f7-tab', f7Tab);
    Vue.component('f7-tabs', f7Tabs);
    Vue.component('f7-text-editor', f7TextEditor);
    Vue.component('f7-toggle', f7Toggle);
    Vue.component('f7-toolbar', f7Toolbar);
    Vue.component('f7-treeview-item', f7TreeviewItem);
    Vue.component('f7-treeview', f7Treeview);
    Vue.component('f7-view', f7View);
    Vue.component('f7-views', f7Views);

    // DEFINE_INSTANCE_PROTOS_START
    Object.defineProperty(Extend.prototype, '$f7', {
      get() {
        return f7.instance;
      },
    });
    // DEFINE_INSTANCE_PROTOS_END

    const { theme } = params;
    if (theme === 'md') f7Theme.md = true;
    if (theme === 'ios') f7Theme.ios = true;
    if (theme === 'aurora') f7Theme.aurora = true;
    if (!theme || theme === 'auto') {
      f7Theme.ios = !!Framework7.device.ios;
      f7Theme.aurora = Framework7.device.desktop && Framework7.device.electron;
      f7Theme.md = !f7Theme.ios && !f7Theme.aurora;
    }
    f7.ready(() => {
      f7Theme.ios = f7.instance.theme === 'ios';
      f7Theme.md = f7.instance.theme === 'md';
      f7Theme.aurora = f7.instance.theme === 'aurora';
    });

    // DEFINE_PROTOS_START
    Object.defineProperty(Extend.prototype, '$theme', {
      get() {
        return {
          ios: f7.instance ? f7.instance.theme === 'ios' : f7Theme.ios,
          md: f7.instance ? f7.instance.theme === 'md' : f7Theme.md,
          aurora: f7.instance ? f7.instance.theme === 'aurora' : f7Theme.aurora,
        };
      },
    });

    Extend.prototype.Dom7 = Framework7.$;
    Extend.prototype.$$ = Framework7.$;
    Extend.prototype.$device = Framework7.device;
    Extend.prototype.$request = Framework7.request;
    Extend.prototype.$utils = Framework7.utils;
    Extend.prototype.$f7ready = f7ready;

    Object.defineProperty(Extend.prototype, '$f7route', {
      get() {
        const self = this;
        if (self.props && self.props.f7route) return self.props.f7route;
        if (self.f7route) return self.f7route;
        if (self._f7route) return self._f7route;

        let route;
        // eslint-disable-next-line
        if ('vue' === 'vue') {
          if (self.$vnode && self.$vnode.data && self.$vnode.data.props && self.$vnode.data.props.f7route) {
            route = self.$vnode.data.props.f7route;
          }
          let parent = self;
          while (parent && !route) {
            if (parent._f7route) route = parent._f7route;
            parent = parent.$parent;
          }
        }
        return route;
      },
      set(value) {
        const self = this;
        self._f7route = value;
      },
    });
    Object.defineProperty(Extend.prototype, '$f7router', {
      get() {
        const self = this;
        if (self.props && self.props.f7router) return self.props.f7router;
        if (self.f7router) return self.f7router;
        if (self._f7router) return self._f7router;

        let router;
        // eslint-disable-next-line
        if ('vue' === 'vue') {
          if (self.$vnode && self.$vnode.data && self.$vnode.data.props && self.$vnode.data.props.f7route) {
            router = self.$vnode.data.props.f7router;
          }
          let parent = self;
          while (parent && !router) {
            if (parent._f7router) router = parent._f7router;
            else if (parent.f7View) {
              router = parent.f7View.router;
            } else if (parent.$refs && parent.$refs.el && parent.$refs.el.f7View) {
              router = parent.$refs.el.f7View.router;
            }
            parent = parent.$parent;
          }
        }
        return router;
      },
      set(value) {
        const self = this;
        self._f7router = value;
      },
    });
    // DEFINE_PROTOS_END

    // Extend F7 Router
    Framework7.Router.use(componentsRouter);
  },
};

export { f7ready, f7Instance as f7, f7Theme as theme };
export default Plugin;
