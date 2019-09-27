import Vue from 'vue';
import { Dom7 } from 'dom7';
import Framework7 from 'framework7';
import { Framework7Plugin } from 'framework7/components/app/app-class';
import { Router } from 'framework7/modules/router/router';
import { Device } from 'framework7/utils/device';
import { Request } from 'framework7/utils/request';
import { Utils } from 'framework7/utils/utils';

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

export interface Framework7Theme {
  ios: boolean
  md: boolean
  aurora: boolean
}

export interface Framework7Extensions {
  /** Main Framework7's initialized instance. It allows you to use any of Framework7 APIs */
  $f7: Framework7
  /** Callback function that will be executed when Framework7 fully intialized. Useful to use in components when you need to access Framework7 API and to be sure it is ready. So it is safe to put all Framework7 related logic into this callback. As an argument it receives initialized Framework7 instance */
  $f7ready(onF7Ready: (f7: Framework7) => void): void
  /** Access to built-in Dom7 DOM library that utilizes most edge and high-performance methods for DOM manipulation */
  $$: Dom7
  /** Access to built-in Dom7 DOM library that utilizes most edge and high-performance methods for DOM manipulation */
  $Dom7: Dom7
  /** Framework7 Router Instance. It has a lot of useful Methods & Properties to use for navigation */
  $f7router: Router.Router
  /** Object with current route data that was used to load this page, tab or modal */
  $f7route: Router.Route
  /** Access to Device utilities */
  $device: Device
  /** Access to Request library for XHR requests */
  $request: Request
  /** Access to Utils object with few useful utilities */
  $utils: Utils
  /** Object with boolean properties with information about currently used theme (iOS or MD) */
  $theme: Framework7Theme
}

/** Object with boolean properties with information about currently used theme (iOS or MD) */
declare const theme : Framework7Theme;
/** Main Framework7's initialized instance. It allows you to use any of Framework7 APIs */
declare const f7 : Framework7;
/** Callback function that will be executed when Framework7 fully intialized. Useful to use in components when you need to access Framework7 API and to be sure it is ready. So it is safe to put all Framework7 related logic into this callback. As an argument it receives initialized Framework7 instance */
declare const f7ready: (onF7Ready: (f7: Framework7) => void) => void;

declare module 'vue/types/vue' {
  interface Vue extends Partial<Framework7Extensions> {}
}

export {
  f7AccordionContent,
  f7AccordionItem,
  f7AccordionToggle,
  f7Accordion,
  f7ActionsButton,
  f7ActionsGroup,
  f7ActionsLabel,
  f7Actions,
  f7App,
  f7Appbar,
  f7Badge,
  f7BlockFooter,
  f7BlockHeader,
  f7BlockTitle,
  f7Block,
  f7Button,
  f7CardContent,
  f7CardFooter,
  f7CardHeader,
  f7Card,
  f7Checkbox,
  f7Chip,
  f7Col,
  f7FabButton,
  f7FabButtons,
  f7Fab,
  f7Gauge,
  f7Icon,
  f7Input,
  f7Link,
  f7ListButton,
  f7ListGroup,
  f7ListIndex,
  f7ListInput,
  f7ListItemCell,
  f7ListItemContent,
  f7ListItemRow,
  f7ListItem,
  f7List,
  f7LoginScreenTitle,
  f7LoginScreen,
  f7MenuDropdownItem,
  f7MenuDropdown,
  f7MenuItem,
  f7Menu,
  f7Message,
  f7MessagebarAttachment,
  f7MessagebarAttachments,
  f7MessagebarSheetImage,
  f7MessagebarSheetItem,
  f7MessagebarSheet,
  f7Messagebar,
  f7MessagesTitle,
  f7Messages,
  f7NavLeft,
  f7NavRight,
  f7NavTitleLarge,
  f7NavTitle,
  f7Navbar,
  f7PageContent,
  f7Page,
  f7Panel,
  f7PhotoBrowser,
  f7Popover,
  f7Popup,
  f7Preloader,
  f7Progressbar,
  f7Radio,
  f7Range,
  f7RoutableModals,
  f7Row,
  f7Searchbar,
  f7Segmented,
  f7Sheet,
  f7SkeletonBlock,
  f7SkeletonText,
  f7Stepper,
  f7Subnavbar,
  f7SwipeoutActions,
  f7SwipeoutButton,
  f7SwiperSlide,
  f7Swiper,
  f7Tab,
  f7Tabs,
  f7TextEditor,
  f7Toggle,
  f7Toolbar,
  f7TreeviewItem,
  f7Treeview,
  f7View,
  f7Views
}

export {
  theme,
  theme as $theme,
  f7,
  f7 as $f7,
  f7ready,
  f7ready as $f7ready,
}

declare const Framework7Vue: Framework7Plugin;
export default Framework7Vue;
