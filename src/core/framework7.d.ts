import Framework7 from './components/app/app-class';

// Modules
import DeviceModule from './modules/device/device';
import SupportModule from './modules/support/support';
import UtilsModule from './modules/utils/utils';
import RequestModule from './modules/request/request';
import TouchModule from './modules/touch/touch';
import ResizeModule from './modules/resize/resize';
import ClicksModule from './modules/clicks/clicks';

// Components
import Accordion from './components/accordion/accordion';
import Actions from './components/actions/actions';
import Autocomplete from './components/autocomplete/autocomplete';
import Calendar from './components/calendar/calendar';
import DataTable from './components/data-table/data-table';
import Dialog from './components/dialog/dialog';
import Form from './components/form/form';
import Gauge from './components/gauge/gauge';
import Grid from './components/grid/grid';
import Icon from './components/icon/icon';
import Infinite from './components/infinite-scroll/infinite-scroll';
import Input from './components/input/input';
import Lazy from './components/lazy/lazy';
import Link from './components/link/link';
import List from './components/list/list';
import ListIndex from './components/list-index/list-index';
import LoginScreen from './components/login-screen/login-screen';
import Messagebar from './components/messagebar/messagebar';
import Messages from './components/messages/messages';
import Modal from './components/modal/modal';
import Navbar from './components/navbar/navbar';
import Notification from './components/notification/notification';
import Page from './components/page/page';
import Panel from './components/panel/panel';
import PhotoBrowser from './components/photo-browser/photo-browser';
import Picker from './components/picker/picker';
import Popover from './components/popover/popover';
import Popup from './components/popup/popup';
import Preloader from './components/preloader/preloader';
import Progressbar from './components/progressbar/progressbar';
import PullToRefresh from './components/pull-to-refresh/pull-to-refresh';
import Radio from './components/radio/radio';
import Range from './components/range/range';
import Statusbar from './components/statusbar/statusbar';

declare module './components/app/app-class' {
  // Modules
  interface Framework7Class extends DeviceModule.AppMethods {}
  interface Framework7Params extends DeviceModule.AppParams {}
  interface Framework7AppEvents extends DeviceModule.AppEvents {}

  interface Framework7Class extends SupportModule.AppMethods {}
  interface Framework7Params extends SupportModule.AppParams {}
  interface Framework7AppEvents extends SupportModule.AppEvents {}

  interface Framework7Class extends UtilsModule.AppMethods {}
  interface Framework7Params extends UtilsModule.AppParams {}
  interface Framework7AppEvents extends UtilsModule.AppEvents {}

  interface Framework7Class extends RequestModule.AppMethods {}
  interface Framework7Params extends RequestModule.AppParams {}
  interface Framework7AppEvents extends RequestModule.AppEvents {}

  interface Framework7Class extends TouchModule.AppMethods {}
  interface Framework7Params extends TouchModule.AppParams {}
  interface Framework7AppEvents extends TouchModule.AppEvents {}

  interface Framework7Class extends ResizeModule.AppMethods {}
  interface Framework7Params extends ResizeModule.AppParams {}
  interface Framework7AppEvents extends ResizeModule.AppEvents {}

  interface Framework7Class extends ClicksModule.AppMethods {}
  interface Framework7Params extends ClicksModule.AppParams {}
  interface Framework7AppEvents extends ClicksModule.AppEvents {}

  // Components
  interface Framework7Class extends Accordion.AppMethods {}
  interface Framework7Params extends Accordion.AppParams {}
  interface Framework7AppEvents extends Accordion.AppEvents {}

  interface Framework7Class extends Actions.AppMethods {}
  interface Framework7Params extends Actions.AppParams {}
  interface Framework7AppEvents extends Actions.AppEvents {}

  interface Framework7Class extends Autocomplete.AppMethods {}
  interface Framework7Params extends Autocomplete.AppParams {}
  interface Framework7AppEvents extends Autocomplete.AppEvents {}

  interface Framework7Class extends Calendar.AppMethods {}
  interface Framework7Params extends Calendar.AppParams {}
  interface Framework7AppEvents extends Calendar.AppEvents {}

  interface Framework7Class extends DataTable.AppMethods {}
  interface Framework7Params extends DataTable.AppParams {}
  interface Framework7AppEvents extends DataTable.AppEvents {}

  interface Framework7Class extends Dialog.AppMethods {}
  interface Framework7Params extends Dialog.AppParams {}
  interface Framework7AppEvents extends Dialog.AppEvents {}

  interface Framework7Class extends Form.AppMethods {}
  interface Framework7Params extends Form.AppParams {}
  interface Framework7AppEvents extends Form.AppEvents {}

  interface Framework7Class extends Gauge.AppMethods {}
  interface Framework7Params extends Gauge.AppParams {}
  interface Framework7AppEvents extends Gauge.AppEvents {}

  interface Framework7Class extends Grid.AppMethods {}
  interface Framework7Params extends Grid.AppParams {}
  interface Framework7AppEvents extends Grid.AppEvents {}

  interface Framework7Class extends Icon.AppMethods {}
  interface Framework7Params extends Icon.AppParams {}
  interface Framework7AppEvents extends Icon.AppEvents {}

  interface Framework7Class extends Infinite.AppMethods {}
  interface Framework7Params extends Infinite.AppParams {}
  interface Framework7AppEvents extends Infinite.AppEvents {}

  interface Framework7Class extends Input.AppMethods {}
  interface Framework7Params extends Input.AppParams {}
  interface Framework7AppEvents extends Input.AppEvents {}

  interface Framework7Class extends Lazy.AppMethods {}
  interface Framework7Params extends Lazy.AppParams {}
  interface Framework7AppEvents extends Lazy.AppEvents {}

  interface Framework7Class extends Link.AppMethods {}
  interface Framework7Params extends Link.AppParams {}
  interface Framework7AppEvents extends Link.AppEvents {}

  interface Framework7Class extends List.AppMethods {}
  interface Framework7Params extends List.AppParams {}
  interface Framework7AppEvents extends List.AppEvents {}

  interface Framework7Class extends ListIndex.AppMethods {}
  interface Framework7Params extends ListIndex.AppParams {}
  interface Framework7AppEvents extends ListIndex.AppEvents {}

  interface Framework7Class extends LoginScreen.AppMethods {}
  interface Framework7Params extends LoginScreen.AppParams {}
  interface Framework7AppEvents extends LoginScreen.AppEvents {}

  interface Framework7Class extends Messagebar.AppMethods {}
  interface Framework7Params extends Messagebar.AppParams {}
  interface Framework7AppEvents extends Messagebar.AppEvents {}

  interface Framework7Class extends Messages.AppMethods {}
  interface Framework7Params extends Messages.AppParams {}
  interface Framework7AppEvents extends Messages.AppEvents {}

  interface Framework7Class extends Modal.AppMethods {}
  interface Framework7Params extends Modal.AppParams {}
  interface Framework7AppEvents extends Modal.AppEvents {}

  interface Framework7Class extends Navbar.AppMethods {}
  interface Framework7Params extends Navbar.AppParams {}
  interface Framework7AppEvents extends Navbar.AppEvents {}

  interface Framework7Class extends Notification.AppMethods {}
  interface Framework7Params extends Notification.AppParams {}
  interface Framework7AppEvents extends Notification.AppEvents {}

  interface Framework7Class extends Page.AppMethods {}
  interface Framework7Params extends Page.AppParams {}
  interface Framework7AppEvents extends Page.AppEvents {}

  interface Framework7Class extends Panel.AppMethods {}
  interface Framework7Params extends Panel.AppParams {}
  interface Framework7AppEvents extends Panel.AppEvents {}

  interface Framework7Class extends PhotoBrowser.AppMethods {}
  interface Framework7Params extends PhotoBrowser.AppParams {}
  interface Framework7AppEvents extends PhotoBrowser.AppEvents {}

  interface Framework7Class extends Picker.AppMethods {}
  interface Framework7Params extends Picker.AppParams {}
  interface Framework7AppEvents extends Picker.AppEvents {}

  interface Framework7Class extends Popover.AppMethods {}
  interface Framework7Params extends Popover.AppParams {}
  interface Framework7AppEvents extends Popover.AppEvents {}

  interface Framework7Class extends Popup.AppMethods {}
  interface Framework7Params extends Popup.AppParams {}
  interface Framework7AppEvents extends Popup.AppEvents {}

  interface Framework7Class extends Preloader.AppMethods {}
  interface Framework7Params extends Preloader.AppParams {}
  interface Framework7AppEvents extends Preloader.AppEvents {}

  interface Framework7Class extends Progressbar.AppMethods {}
  interface Framework7Params extends Progressbar.AppParams {}
  interface Framework7AppEvents extends Progressbar.AppEvents {}

  interface Framework7Class extends PullToRefresh.AppMethods {}
  interface Framework7Params extends PullToRefresh.AppParams {}
  interface Framework7AppEvents extends PullToRefresh.AppEvents {}

  interface Framework7Class extends Range.AppMethods {}
  interface Framework7Params extends Range.AppParams {}
  interface Framework7AppEvents extends Range.AppEvents {}

  interface Framework7Class extends Statusbar.AppMethods {}
  interface Framework7Params extends Statusbar.AppParams {}
  interface Framework7AppEvents extends Statusbar.AppEvents {}
}

export default Framework7;