import * as React from 'react';
import { Dom7 } from 'dom7';
import Framework7 from 'framework7';
import { Framework7Plugin } from 'framework7/components/app/app-class';
import { Router } from 'framework7/modules/router/router';
import { Device } from 'framework7/utils/device';
import { Request } from 'framework7/utils/request';
import { Utils } from 'framework7/utils/utils';

import F7AccordionContent from './components/accordion-content';
import F7AccordionItem from './components/accordion-item';
import F7AccordionToggle from './components/accordion-toggle';
import F7Accordion from './components/accordion';
import F7ActionsButton from './components/actions-button';
import F7ActionsGroup from './components/actions-group';
import F7ActionsLabel from './components/actions-label';
import F7Actions from './components/actions';
import F7App from './components/app';
import F7Appbar from './components/appbar';
import F7Badge from './components/badge';
import F7BlockFooter from './components/block-footer';
import F7BlockHeader from './components/block-header';
import F7BlockTitle from './components/block-title';
import F7Block from './components/block';
import F7Button from './components/button';
import F7CardContent from './components/card-content';
import F7CardFooter from './components/card-footer';
import F7CardHeader from './components/card-header';
import F7Card from './components/card';
import F7Checkbox from './components/checkbox';
import F7Chip from './components/chip';
import F7Col from './components/col';
import F7FabButton from './components/fab-button';
import F7FabButtons from './components/fab-buttons';
import F7Fab from './components/fab';
import F7Gauge from './components/gauge';
import F7Icon from './components/icon';
import F7Input from './components/input';
import F7Link from './components/link';
import F7ListButton from './components/list-button';
import F7ListGroup from './components/list-group';
import F7ListIndex from './components/list-index';
import F7ListInput from './components/list-input';
import F7ListItemCell from './components/list-item-cell';
import F7ListItemContent from './components/list-item-content';
import F7ListItemRow from './components/list-item-row';
import F7ListItem from './components/list-item';
import F7List from './components/list';
import F7LoginScreenTitle from './components/login-screen-title';
import F7LoginScreen from './components/login-screen';
import F7MenuDropdownItem from './components/menu-dropdown-item';
import F7MenuDropdown from './components/menu-dropdown';
import F7MenuItem from './components/menu-item';
import F7Menu from './components/menu';
import F7Message from './components/message';
import F7MessagebarAttachment from './components/messagebar-attachment';
import F7MessagebarAttachments from './components/messagebar-attachments';
import F7MessagebarSheetImage from './components/messagebar-sheet-image';
import F7MessagebarSheetItem from './components/messagebar-sheet-item';
import F7MessagebarSheet from './components/messagebar-sheet';
import F7Messagebar from './components/messagebar';
import F7MessagesTitle from './components/messages-title';
import F7Messages from './components/messages';
import F7NavLeft from './components/nav-left';
import F7NavRight from './components/nav-right';
import F7NavTitleLarge from './components/nav-title-large';
import F7NavTitle from './components/nav-title';
import F7Navbar from './components/navbar';
import F7PageContent from './components/page-content';
import F7Page from './components/page';
import F7Panel from './components/panel';
import F7PhotoBrowser from './components/photo-browser';
import F7Popover from './components/popover';
import F7Popup from './components/popup';
import F7Preloader from './components/preloader';
import F7Progressbar from './components/progressbar';
import F7Radio from './components/radio';
import F7Range from './components/range';
import F7RoutableModals from './components/routable-modals';
import F7Row from './components/row';
import F7Searchbar from './components/searchbar';
import F7Segmented from './components/segmented';
import F7Sheet from './components/sheet';
import F7SkeletonBlock from './components/skeleton-block';
import F7SkeletonText from './components/skeleton-text';
import F7Statusbar from './components/statusbar';
import F7Stepper from './components/stepper';
import F7Subnavbar from './components/subnavbar';
import F7SwipeoutActions from './components/swipeout-actions';
import F7SwipeoutButton from './components/swipeout-button';
import F7SwiperSlide from './components/swiper-slide';
import F7Swiper from './components/swiper';
import F7Tab from './components/tab';
import F7Tabs from './components/tabs';
import F7Toggle from './components/toggle';
import F7Toolbar from './components/toolbar';
import F7TreeviewItem from './components/treeview-item';
import F7Treeview from './components/treeview';
import F7View from './components/view';
import F7Views from './components/views';

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
  $theme: {
    ios: boolean
    md: boolean
    aurora: boolean
  }
}

declare module 'react' {
  interface Component extends Partial<Framework7Extensions> {}
}

export {
  F7AccordionContent,
  F7AccordionContent as AccordionContent,
  F7AccordionItem,
  F7AccordionItem as AccordionItem,
  F7AccordionToggle,
  F7AccordionToggle as AccordionToggle,
  F7Accordion,
  F7Accordion as Accordion,
  F7ActionsButton,
  F7ActionsButton as ActionsButton,
  F7ActionsGroup,
  F7ActionsGroup as ActionsGroup,
  F7ActionsLabel,
  F7ActionsLabel as ActionsLabel,
  F7Actions,
  F7Actions as Actions,
  F7App,
  F7App as App,
  F7Appbar,
  F7Appbar as Appbar,
  F7Badge,
  F7Badge as Badge,
  F7BlockFooter,
  F7BlockFooter as BlockFooter,
  F7BlockHeader,
  F7BlockHeader as BlockHeader,
  F7BlockTitle,
  F7BlockTitle as BlockTitle,
  F7Block,
  F7Block as Block,
  F7Button,
  F7Button as Button,
  F7CardContent,
  F7CardContent as CardContent,
  F7CardFooter,
  F7CardFooter as CardFooter,
  F7CardHeader,
  F7CardHeader as CardHeader,
  F7Card,
  F7Card as Card,
  F7Checkbox,
  F7Checkbox as Checkbox,
  F7Chip,
  F7Chip as Chip,
  F7Col,
  F7Col as Col,
  F7FabButton,
  F7FabButton as FabButton,
  F7FabButtons,
  F7FabButtons as FabButtons,
  F7Fab,
  F7Fab as Fab,
  F7Gauge,
  F7Gauge as Gauge,
  F7Icon,
  F7Icon as Icon,
  F7Input,
  F7Input as Input,
  F7Link,
  F7Link as Link,
  F7ListButton,
  F7ListButton as ListButton,
  F7ListGroup,
  F7ListGroup as ListGroup,
  F7ListIndex,
  F7ListIndex as ListIndex,
  F7ListInput,
  F7ListInput as ListInput,
  F7ListItemCell,
  F7ListItemCell as ListItemCell,
  F7ListItemContent,
  F7ListItemContent as ListItemContent,
  F7ListItemRow,
  F7ListItemRow as ListItemRow,
  F7ListItem,
  F7ListItem as ListItem,
  F7List,
  F7List as List,
  F7LoginScreenTitle,
  F7LoginScreenTitle as LoginScreenTitle,
  F7LoginScreen,
  F7LoginScreen as LoginScreen,
  F7MenuDropdownItem,
  F7MenuDropdownItem as MenuDropdownItem,
  F7MenuDropdown,
  F7MenuDropdown as MenuDropdown,
  F7MenuItem,
  F7MenuItem as MenuItem,
  F7Menu,
  F7Menu as Menu,
  F7Message,
  F7Message as Message,
  F7MessagebarAttachment,
  F7MessagebarAttachment as MessagebarAttachment,
  F7MessagebarAttachments,
  F7MessagebarAttachments as MessagebarAttachments,
  F7MessagebarSheetImage,
  F7MessagebarSheetImage as MessagebarSheetImage,
  F7MessagebarSheetItem,
  F7MessagebarSheetItem as MessagebarSheetItem,
  F7MessagebarSheet,
  F7MessagebarSheet as MessagebarSheet,
  F7Messagebar,
  F7Messagebar as Messagebar,
  F7MessagesTitle,
  F7MessagesTitle as MessagesTitle,
  F7Messages,
  F7Messages as Messages,
  F7NavLeft,
  F7NavLeft as NavLeft,
  F7NavRight,
  F7NavRight as NavRight,
  F7NavTitleLarge,
  F7NavTitleLarge as NavTitleLarge,
  F7NavTitle,
  F7NavTitle as NavTitle,
  F7Navbar,
  F7Navbar as Navbar,
  F7PageContent,
  F7PageContent as PageContent,
  F7Page,
  F7Page as Page,
  F7Panel,
  F7Panel as Panel,
  F7PhotoBrowser,
  F7PhotoBrowser as PhotoBrowser,
  F7Popover,
  F7Popover as Popover,
  F7Popup,
  F7Popup as Popup,
  F7Preloader,
  F7Preloader as Preloader,
  F7Progressbar,
  F7Progressbar as Progressbar,
  F7Radio,
  F7Radio as Radio,
  F7Range,
  F7Range as Range,
  F7RoutableModals,
  F7RoutableModals as RoutableModals,
  F7Row,
  F7Row as Row,
  F7Searchbar,
  F7Searchbar as Searchbar,
  F7Segmented,
  F7Segmented as Segmented,
  F7Sheet,
  F7Sheet as Sheet,
  F7SkeletonBlock,
  F7SkeletonBlock as SkeletonBlock,
  F7SkeletonText,
  F7SkeletonText as SkeletonText,
  F7Statusbar,
  F7Statusbar as Statusbar,
  F7Stepper,
  F7Stepper as Stepper,
  F7Subnavbar,
  F7Subnavbar as Subnavbar,
  F7SwipeoutActions,
  F7SwipeoutActions as SwipeoutActions,
  F7SwipeoutButton,
  F7SwipeoutButton as SwipeoutButton,
  F7SwiperSlide,
  F7SwiperSlide as SwiperSlide,
  F7Swiper,
  F7Swiper as Swiper,
  F7Tab,
  F7Tab as Tab,
  F7Tabs,
  F7Tabs as Tabs,
  F7Toggle,
  F7Toggle as Toggle,
  F7Toolbar,
  F7Toolbar as Toolbar,
  F7TreeviewItem,
  F7TreeviewItem as TreeviewItem,
  F7Treeview,
  F7Treeview as Treeview,
  F7View,
  F7View as View,
  F7Views,
  F7Views as Views
}

declare const Framework7React: Framework7Plugin;
export default Framework7React;
