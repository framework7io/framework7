import t7 from 'template7';
import $ from 'dom7';

// F7 Class
import Framework7 from './components/app/app-class';

// Import Core Modules
import Resize from './modules/resize/resize';
import Device from './modules/device/device';
import Support from './modules/support/support';
import Touch from './modules/touch/touch';
import Router from './modules/router/router';
import History from './modules/history/history';
import Clicks from './modules/clicks/clicks';

// Core Components
import Statusbar from './components/statusbar/statusbar';
import View from './components/view/view';
import Navbar from './components/navbar/navbar';
import Toolbar from './components/toolbar/toolbar';
import Subnavbar from './components/subnavbar/subnavbar';

// Loaders
import Preloader from './components/preloader/preloader';
import Progressbar from './components/progressbar/progressbar';

// Modals
import Modal from './components/modal/modal';
import Dialog from './components/dialog/dialog';
import Popup from './components/popup/popup';
import LoginScreen from './components/login-screen/login-screen';
import Popover from './components/popover/popover';
import Actions from './components/actions/actions';
import Sheet from './components/sheet/sheet';

// Lists
import Sortable from './components/sortable/sortable';
import Swipeout from './components/swipeout/swipeout';
import Accordion from './components/accordion/accordion';
import VirtualList from './components/virtual-list/virtual-list';

// Additional Components
import Tabs from './components/tabs/tabs';
import Panel from './components/panel/panel';
import Card from './components/card/card';
import Chip from './components/chip/chip';

// Forms
import Input from './components/input/input';
import Toggle from './components/toggle/toggle';
import Range from './components/range/range';
import SmartSelect from './components/smartselect/smartselect';

// Pickers
import Calendar from './components/calendar/calendar';
import Picker from './components/picker/picker';

// Page
import InfiniteScroll from './components/infinite-scroll/infinite-scroll';
import PullToRefresh from './components/pull-to-refresh/pull-to-refresh';

// Table
import DataTable from './components/data-table/data-table';

// Template7
Framework7.prototype.t7 = t7;
if (!window.Template7) window.Template7 = t7;

// Dom7
Framework7.prototype.$ = $;
if (!window.Dom7) window.Dom7 = $;

// Install Modules
Framework7
  // Core Modules
  .use(Support)
  .use(Device)
  .use(Resize)
  .use(Touch)
  .use(Router)
  .use(History)
  .use(Clicks)
  // Core Components
  .use(Statusbar)
  .use(View)
  .use(Navbar)
  .use(Toolbar)
  .use(Subnavbar)
  // Loaders
  .use(Preloader)
  .use(Progressbar)
  // Modals
  .use(Modal)
  .use(Dialog)
  .use(Popup)
  .use(LoginScreen)
  .use(Popover)
  .use(Actions)
  .use(Sheet)
  // Lists
  .use(Sortable)
  .use(Swipeout)
  .use(Accordion)
  .use(VirtualList)
  // Additional Components
  .use(Tabs)
  .use(Panel)
  .use(Card)
  .use(Chip)
  // Forms
  .use(Input)
  .use(Toggle)
  .use(Range)
  .use(SmartSelect)
  // Pickers
  .use(Calendar)
  .use(Picker)
  // Page
  .use(InfiniteScroll)
  .use(PullToRefresh)
  // Table
  .use(DataTable);

export default Framework7;
