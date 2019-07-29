/**
 * Framework7 React 4.4.10
 * Build full featured iOS & Android apps using Framework7 & React
 * http://framework7.io/react/
 *
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: July 29, 2019
 */

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
import Framework7React from './utils/plugin';

const AccordionContent = F7AccordionContent;
const AccordionItem = F7AccordionItem;
const AccordionToggle = F7AccordionToggle;
const Accordion = F7Accordion;
const ActionsButton = F7ActionsButton;
const ActionsGroup = F7ActionsGroup;
const ActionsLabel = F7ActionsLabel;
const Actions = F7Actions;
const App = F7App;
const Appbar = F7Appbar;
const Badge = F7Badge;
const BlockFooter = F7BlockFooter;
const BlockHeader = F7BlockHeader;
const BlockTitle = F7BlockTitle;
const Block = F7Block;
const Button = F7Button;
const CardContent = F7CardContent;
const CardFooter = F7CardFooter;
const CardHeader = F7CardHeader;
const Card = F7Card;
const Checkbox = F7Checkbox;
const Chip = F7Chip;
const Col = F7Col;
const FabButton = F7FabButton;
const FabButtons = F7FabButtons;
const Fab = F7Fab;
const Gauge = F7Gauge;
const Icon = F7Icon;
const Input = F7Input;
const Link = F7Link;
const ListButton = F7ListButton;
const ListGroup = F7ListGroup;
const ListIndex = F7ListIndex;
const ListInput = F7ListInput;
const ListItemCell = F7ListItemCell;
const ListItemContent = F7ListItemContent;
const ListItemRow = F7ListItemRow;
const ListItem = F7ListItem;
const List = F7List;
const LoginScreenTitle = F7LoginScreenTitle;
const LoginScreen = F7LoginScreen;
const MenuDropdownItem = F7MenuDropdownItem;
const MenuDropdown = F7MenuDropdown;
const MenuItem = F7MenuItem;
const Menu = F7Menu;
const Message = F7Message;
const MessagebarAttachment = F7MessagebarAttachment;
const MessagebarAttachments = F7MessagebarAttachments;
const MessagebarSheetImage = F7MessagebarSheetImage;
const MessagebarSheetItem = F7MessagebarSheetItem;
const MessagebarSheet = F7MessagebarSheet;
const Messagebar = F7Messagebar;
const MessagesTitle = F7MessagesTitle;
const Messages = F7Messages;
const NavLeft = F7NavLeft;
const NavRight = F7NavRight;
const NavTitleLarge = F7NavTitleLarge;
const NavTitle = F7NavTitle;
const Navbar = F7Navbar;
const PageContent = F7PageContent;
const Page = F7Page;
const Panel = F7Panel;
const PhotoBrowser = F7PhotoBrowser;
const Popover = F7Popover;
const Popup = F7Popup;
const Preloader = F7Preloader;
const Progressbar = F7Progressbar;
const Radio = F7Radio;
const Range = F7Range;
const RoutableModals = F7RoutableModals;
const Row = F7Row;
const Searchbar = F7Searchbar;
const Segmented = F7Segmented;
const Sheet = F7Sheet;
const SkeletonBlock = F7SkeletonBlock;
const SkeletonText = F7SkeletonText;
const Statusbar = F7Statusbar;
const Stepper = F7Stepper;
const Subnavbar = F7Subnavbar;
const SwipeoutActions = F7SwipeoutActions;
const SwipeoutButton = F7SwipeoutButton;
const SwiperSlide = F7SwiperSlide;
const Swiper = F7Swiper;
const Tab = F7Tab;
const Tabs = F7Tabs;
const Toggle = F7Toggle;
const Toolbar = F7Toolbar;
const TreeviewItem = F7TreeviewItem;
const Treeview = F7Treeview;
const View = F7View;
const Views = F7Views;

export {
  F7AccordionContent,
  AccordionContent,
  F7AccordionItem,
  AccordionItem,
  F7AccordionToggle,
  AccordionToggle,
  F7Accordion,
  Accordion,
  F7ActionsButton,
  ActionsButton,
  F7ActionsGroup,
  ActionsGroup,
  F7ActionsLabel,
  ActionsLabel,
  F7Actions,
  Actions,
  F7App,
  App,
  F7Appbar,
  Appbar,
  F7Badge,
  Badge,
  F7BlockFooter,
  BlockFooter,
  F7BlockHeader,
  BlockHeader,
  F7BlockTitle,
  BlockTitle,
  F7Block,
  Block,
  F7Button,
  Button,
  F7CardContent,
  CardContent,
  F7CardFooter,
  CardFooter,
  F7CardHeader,
  CardHeader,
  F7Card,
  Card,
  F7Checkbox,
  Checkbox,
  F7Chip,
  Chip,
  F7Col,
  Col,
  F7FabButton,
  FabButton,
  F7FabButtons,
  FabButtons,
  F7Fab,
  Fab,
  F7Gauge,
  Gauge,
  F7Icon,
  Icon,
  F7Input,
  Input,
  F7Link,
  Link,
  F7ListButton,
  ListButton,
  F7ListGroup,
  ListGroup,
  F7ListIndex,
  ListIndex,
  F7ListInput,
  ListInput,
  F7ListItemCell,
  ListItemCell,
  F7ListItemContent,
  ListItemContent,
  F7ListItemRow,
  ListItemRow,
  F7ListItem,
  ListItem,
  F7List,
  List,
  F7LoginScreenTitle,
  LoginScreenTitle,
  F7LoginScreen,
  LoginScreen,
  F7MenuDropdownItem,
  MenuDropdownItem,
  F7MenuDropdown,
  MenuDropdown,
  F7MenuItem,
  MenuItem,
  F7Menu,
  Menu,
  F7Message,
  Message,
  F7MessagebarAttachment,
  MessagebarAttachment,
  F7MessagebarAttachments,
  MessagebarAttachments,
  F7MessagebarSheetImage,
  MessagebarSheetImage,
  F7MessagebarSheetItem,
  MessagebarSheetItem,
  F7MessagebarSheet,
  MessagebarSheet,
  F7Messagebar,
  Messagebar,
  F7MessagesTitle,
  MessagesTitle,
  F7Messages,
  Messages,
  F7NavLeft,
  NavLeft,
  F7NavRight,
  NavRight,
  F7NavTitleLarge,
  NavTitleLarge,
  F7NavTitle,
  NavTitle,
  F7Navbar,
  Navbar,
  F7PageContent,
  PageContent,
  F7Page,
  Page,
  F7Panel,
  Panel,
  F7PhotoBrowser,
  PhotoBrowser,
  F7Popover,
  Popover,
  F7Popup,
  Popup,
  F7Preloader,
  Preloader,
  F7Progressbar,
  Progressbar,
  F7Radio,
  Radio,
  F7Range,
  Range,
  F7RoutableModals,
  RoutableModals,
  F7Row,
  Row,
  F7Searchbar,
  Searchbar,
  F7Segmented,
  Segmented,
  F7Sheet,
  Sheet,
  F7SkeletonBlock,
  SkeletonBlock,
  F7SkeletonText,
  SkeletonText,
  F7Statusbar,
  Statusbar,
  F7Stepper,
  Stepper,
  F7Subnavbar,
  Subnavbar,
  F7SwipeoutActions,
  SwipeoutActions,
  F7SwipeoutButton,
  SwipeoutButton,
  F7SwiperSlide,
  SwiperSlide,
  F7Swiper,
  Swiper,
  F7Tab,
  Tab,
  F7Tabs,
  Tabs,
  F7Toggle,
  Toggle,
  F7Toolbar,
  Toolbar,
  F7TreeviewItem,
  TreeviewItem,
  F7Treeview,
  Treeview,
  F7View,
  View,
  F7Views,
  Views
};

export default Framework7React;