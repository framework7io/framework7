import Framework7 from './components/app/app-class';

// Modules
import DeviceModule, { Device as DeviceNamespace } from './modules/device/device';
import SupportModule, { Support as SupportNamespace } from './modules/support/support';
import UtilsModule, { Utils as UtilsNamespace } from './modules/utils/utils';
import RequestModule, { Request as RequestNamespace } from './modules/request/request';
import TouchModule, { Touch as TouchNamespace } from './modules/touch/touch';
import ResizeModule, { Resize as ResizeNamespace } from './modules/resize/resize';
import ClicksModule, { Clicks as ClicksNamespace } from './modules/clicks/clicks';

// Components
//IMPORT_COMPONENTS
import AccordionComponent, { Accordion as AccordionNamespace } from './components/accordion/accordion';
import ActionsComponent, { Actions as ActionsNamespace } from './components/actions/actions';
import AutocompleteComponent, { Autocomplete as AutocompleteNamespace } from './components/autocomplete/autocomplete';
import CalendarComponent, { Calendar as CalendarNamespace } from './components/calendar/calendar';
import DataTableComponent, { DataTable as DataTableNamespace } from './components/data-table/data-table';
import DialogComponent, { Dialog as DialogNamespace } from './components/dialog/dialog';
import FormComponent, { Form as FormNamespace } from './components/form/form';
import GaugeComponent, { Gauge as GaugeNamespace } from './components/gauge/gauge';
import GridComponent, { Grid as GridNamespace } from './components/grid/grid';
import IconComponent, { Icon as IconNamespace } from './components/icon/icon';
import InfiniteComponent, { Infinite as InfiniteNamespace } from './components/infinite-scroll/infinite-scroll';
import InputComponent, { Input as InputNamespace } from './components/input/input';
import LazyComponent, { Lazy as LazyNamespace } from './components/lazy/lazy';
import LinkComponent, { Link as LinkNamespace } from './components/link/link';
import ListComponent, { List as ListNamespace } from './components/list/list';
import ListIndexComponent, { ListIndex as ListIndexNamespace } from './components/list-index/list-index';
import LoginScreenComponent, { LoginScreen as LoginScreenNamespace } from './components/login-screen/login-screen';
import MessagebarComponent, { Messagebar as MessagebarNamespace } from './components/messagebar/messagebar';
import MessagesComponent, { Messages as MessagesNamespace } from './components/messages/messages';
import ModalComponent, { Modal as ModalNamespace } from './components/modal/modal';
import NavbarComponent, { Navbar as NavbarNamespace } from './components/navbar/navbar';
import NotificationComponent, { Notification as NotificationNamespace } from './components/notification/notification';
import PageComponent, { Page as PageNamespace } from './components/page/page';
import PanelComponent, { Panel as PanelNamespace } from './components/panel/panel';
import PhotoBrowserComponent, { PhotoBrowser as PhotoBrowserNamespace } from './components/photo-browser/photo-browser';
import PickerComponent, { Picker as PickerNamespace } from './components/picker/picker';
import PopoverComponent, { Popover as PopoverNamespace } from './components/popover/popover';
import PopupComponent, { Popup as PopupNamespace } from './components/popup/popup';
import PreloaderComponent, { Preloader as PreloaderNamespace } from './components/preloader/preloader';
import ProgressbarComponent, { Progressbar as ProgressbarNamespace } from './components/progressbar/progressbar';
import PullToRefreshComponent, { PullToRefresh as PullToRefreshNamespace } from './components/pull-to-refresh/pull-to-refresh';
import RadioComponent, { Radio as RadioNamespace } from './components/radio/radio';
import RangeComponent, { Range as RangeNamespace } from './components/range/range';
import SearchbarComponent, { Searchbar as SearchbarNamespace } from './components/searchbar/searchbar';
import SheetComponent, { Sheet as SheetNamespace } from './components/sheet/sheet';
import SmartSelectComponent, { SmartSelect as SmartSelectNamespace } from './components/smart-select/smart-select';
import SortableComponent, { Sortable as SortableNamespace } from './components/sortable/sortable';
import StatusbarComponent, { Statusbar as StatusbarNamespace } from './components/statusbar/statusbar';
import StepperComponent, { Stepper as StepperNamespace } from './components/stepper/stepper';
import SubnavbarComponent, { Subnavbar as SubnavbarNamespace } from './components/subnavbar/subnavbar';
import SwipeoutComponent, { Swipeout as SwipeoutNamespace } from './components/swipeout/swipeout'
import SwiperComponent, { Swiper as SwiperNamespace } from './components/swiper/swiper'
import TabsComponent, { Tabs as TabsNamespace } from './components/tabs/tabs'
import ToastComponent, { Toast as ToastNamespace } from './components/toast/toast'
import ToggleComponent, { Toggle as ToggleNamespace } from './components/toggle/toggle'
import ToolbarComponent, { Toolbar as ToolbarNamespace } from './components/toolbar/toolbar'
import TooltipComponent, { Tooltip as TooltipNamespace } from './components/tooltip/tooltip'
import ViComponent, { Vi as ViNamespace } from './components/vi/vi'
import ViewComponent, { View as ViewNamespace } from './components/view/view'
import VirtualListComponent, { VirtualList as VirtualListNamespace } from './components/virtual-list/virtual-list'

declare module './components/app/app-class' {
  // Modules
  interface Framework7Class extends DeviceNamespace.AppMethods{}
  interface Framework7Params extends DeviceNamespace.AppParams{}
  interface Framework7Events extends DeviceNamespace.AppEvents{}

  interface Framework7Class extends SupportNamespace.AppMethods{}
  interface Framework7Params extends SupportNamespace.AppParams{}
  interface Framework7Events extends SupportNamespace.AppEvents{}

  interface Framework7Class extends UtilsNamespace.AppMethods{}
  interface Framework7Params extends UtilsNamespace.AppParams{}
  interface Framework7Events extends UtilsNamespace.AppEvents{}

  interface Framework7Class extends RequestNamespace.AppMethods{}
  interface Framework7Params extends RequestNamespace.AppParams{}
  interface Framework7Events extends RequestNamespace.AppEvents{}

  interface Framework7Class extends TouchNamespace.AppMethods{}
  interface Framework7Params extends TouchNamespace.AppParams{}
  interface Framework7Events extends TouchNamespace.AppEvents{}

  interface Framework7Class extends ResizeNamespace.AppMethods{}
  interface Framework7Params extends ResizeNamespace.AppParams{}
  interface Framework7Events extends ResizeNamespace.AppEvents{}

  interface Framework7Class extends ClicksNamespace.AppMethods{}
  interface Framework7Params extends ClicksNamespace.AppParams{}
  interface Framework7Events extends ClicksNamespace.AppEvents{}

  // Components
  //INSTALL_COMPONENTS
  interface Framework7Class extends AccordionNamespace.AppMethods{}
  interface Framework7Params extends AccordionNamespace.AppParams{}
  interface Framework7Events extends AccordionNamespace.AppEvents{}

  interface Framework7Class extends ActionsNamespace.AppMethods{}
  interface Framework7Params extends ActionsNamespace.AppParams{}
  interface Framework7Events extends ActionsNamespace.AppEvents{}

  interface Framework7Class extends AutocompleteNamespace.AppMethods{}
  interface Framework7Params extends AutocompleteNamespace.AppParams{}
  interface Framework7Events extends AutocompleteNamespace.AppEvents{}

  interface Framework7Class extends CalendarNamespace.AppMethods{}
  interface Framework7Params extends CalendarNamespace.AppParams{}
  interface Framework7Events extends CalendarNamespace.AppEvents{}

  interface Framework7Class extends DataTableNamespace.AppMethods{}
  interface Framework7Params extends DataTableNamespace.AppParams{}
  interface Framework7Events extends DataTableNamespace.AppEvents{}

  interface Framework7Class extends DialogNamespace.AppMethods{}
  interface Framework7Params extends DialogNamespace.AppParams{}
  interface Framework7Events extends DialogNamespace.AppEvents{}

  interface Framework7Class extends FormNamespace.AppMethods{}
  interface Framework7Params extends FormNamespace.AppParams{}
  interface Framework7Events extends FormNamespace.AppEvents{}

  interface Framework7Class extends GaugeNamespace.AppMethods{}
  interface Framework7Params extends GaugeNamespace.AppParams{}
  interface Framework7Events extends GaugeNamespace.AppEvents{}

  interface Framework7Class extends GridNamespace.AppMethods{}
  interface Framework7Params extends GridNamespace.AppParams{}
  interface Framework7Events extends GridNamespace.AppEvents{}

  interface Framework7Class extends IconNamespace.AppMethods{}
  interface Framework7Params extends IconNamespace.AppParams{}
  interface Framework7Events extends IconNamespace.AppEvents{}

  interface Framework7Class extends InfiniteNamespace.AppMethods{}
  interface Framework7Params extends InfiniteNamespace.AppParams{}
  interface Framework7Events extends InfiniteNamespace.AppEvents{}

  interface Framework7Class extends InputNamespace.AppMethods{}
  interface Framework7Params extends InputNamespace.AppParams{}
  interface Framework7Events extends InputNamespace.AppEvents{}

  interface Framework7Class extends LazyNamespace.AppMethods{}
  interface Framework7Params extends LazyNamespace.AppParams{}
  interface Framework7Events extends LazyNamespace.AppEvents{}

  interface Framework7Class extends LinkNamespace.AppMethods{}
  interface Framework7Params extends LinkNamespace.AppParams{}
  interface Framework7Events extends LinkNamespace.AppEvents{}

  interface Framework7Class extends ListNamespace.AppMethods{}
  interface Framework7Params extends ListNamespace.AppParams{}
  interface Framework7Events extends ListNamespace.AppEvents{}

  interface Framework7Class extends ListIndexNamespace.AppMethods{}
  interface Framework7Params extends ListIndexNamespace.AppParams{}
  interface Framework7Events extends ListIndexNamespace.AppEvents{}

  interface Framework7Class extends LoginScreenNamespace.AppMethods{}
  interface Framework7Params extends LoginScreenNamespace.AppParams{}
  interface Framework7Events extends LoginScreenNamespace.AppEvents{}

  interface Framework7Class extends MessagebarNamespace.AppMethods{}
  interface Framework7Params extends MessagebarNamespace.AppParams{}
  interface Framework7Events extends MessagebarNamespace.AppEvents{}

  interface Framework7Class extends MessagesNamespace.AppMethods{}
  interface Framework7Params extends MessagesNamespace.AppParams{}
  interface Framework7Events extends MessagesNamespace.AppEvents{}

  interface Framework7Class extends ModalNamespace.AppMethods{}
  interface Framework7Params extends ModalNamespace.AppParams{}
  interface Framework7Events extends ModalNamespace.AppEvents{}

  interface Framework7Class extends NavbarNamespace.AppMethods{}
  interface Framework7Params extends NavbarNamespace.AppParams{}
  interface Framework7Events extends NavbarNamespace.AppEvents{}

  interface Framework7Class extends NotificationNamespace.AppMethods{}
  interface Framework7Params extends NotificationNamespace.AppParams{}
  interface Framework7Events extends NotificationNamespace.AppEvents{}

  interface Framework7Class extends PageNamespace.AppMethods{}
  interface Framework7Params extends PageNamespace.AppParams{}
  interface Framework7Events extends PageNamespace.AppEvents{}

  interface Framework7Class extends PanelNamespace.AppMethods{}
  interface Framework7Params extends PanelNamespace.AppParams{}
  interface Framework7Events extends PanelNamespace.AppEvents{}

  interface Framework7Class extends PhotoBrowserNamespace.AppMethods{}
  interface Framework7Params extends PhotoBrowserNamespace.AppParams{}
  interface Framework7Events extends PhotoBrowserNamespace.AppEvents{}

  interface Framework7Class extends PickerNamespace.AppMethods{}
  interface Framework7Params extends PickerNamespace.AppParams{}
  interface Framework7Events extends PickerNamespace.AppEvents{}

  interface Framework7Class extends PopoverNamespace.AppMethods{}
  interface Framework7Params extends PopoverNamespace.AppParams{}
  interface Framework7Events extends PopoverNamespace.AppEvents{}

  interface Framework7Class extends PopupNamespace.AppMethods{}
  interface Framework7Params extends PopupNamespace.AppParams{}
  interface Framework7Events extends PopupNamespace.AppEvents{}

  interface Framework7Class extends PreloaderNamespace.AppMethods{}
  interface Framework7Params extends PreloaderNamespace.AppParams{}
  interface Framework7Events extends PreloaderNamespace.AppEvents{}

  interface Framework7Class extends ProgressbarNamespace.AppMethods{}
  interface Framework7Params extends ProgressbarNamespace.AppParams{}
  interface Framework7Events extends ProgressbarNamespace.AppEvents{}

  interface Framework7Class extends PullToRefreshNamespace.AppMethods{}
  interface Framework7Params extends PullToRefreshNamespace.AppParams{}
  interface Framework7Events extends PullToRefreshNamespace.AppEvents{}

  interface Framework7Class extends RadioNamespace.AppMethods{}
  interface Framework7Params extends RadioNamespace.AppParams{}
  interface Framework7Events extends RadioNamespace.AppEvents{}

  interface Framework7Class extends RangeNamespace.AppMethods{}
  interface Framework7Params extends RangeNamespace.AppParams{}
  interface Framework7Events extends RangeNamespace.AppEvents{}

  interface Framework7Class extends SearchbarNamespace.AppMethods{}
  interface Framework7Params extends SearchbarNamespace.AppParams{}
  interface Framework7Events extends SearchbarNamespace.AppEvents{}

  interface Framework7Class extends SheetNamespace.AppMethods{}
  interface Framework7Params extends SheetNamespace.AppParams{}
  interface Framework7Events extends SheetNamespace.AppEvents{}

  interface Framework7Class extends SmartSelectNamespace.AppMethods{}
  interface Framework7Params extends SmartSelectNamespace.AppParams{}
  interface Framework7Events extends SmartSelectNamespace.AppEvents{}

  interface Framework7Class extends SortableNamespace.AppMethods{}
  interface Framework7Params extends SortableNamespace.AppParams{}
  interface Framework7Events extends SortableNamespace.AppEvents{}

  interface Framework7Class extends StatusbarNamespace.AppMethods{}
  interface Framework7Params extends StatusbarNamespace.AppParams{}
  interface Framework7Events extends StatusbarNamespace.AppEvents{}

  interface Framework7Class extends StepperNamespace.AppMethods{}
  interface Framework7Params extends StepperNamespace.AppParams{}
  interface Framework7Events extends StepperNamespace.AppEvents{}

  interface Framework7Class extends SubnavbarNamespace.AppMethods{}
  interface Framework7Params extends SubnavbarNamespace.AppParams{}
  interface Framework7Events extends SubnavbarNamespace.AppEvents{}

  interface Framework7Class extends SwipeoutNamespace.AppMethods{}
  interface Framework7Params extends SwipeoutNamespace.AppParams{}
  interface Framework7Events extends SwipeoutNamespace.AppEvents{}

  interface Framework7Class extends SwiperNamespace.AppMethods{}
  interface Framework7Params extends SwiperNamespace.AppParams{}
  interface Framework7Events extends SwiperNamespace.AppEvents{}

  interface Framework7Class extends TabsNamespace.AppMethods{}
  interface Framework7Params extends TabsNamespace.AppParams{}
  interface Framework7Events extends TabsNamespace.AppEvents{}

  interface Framework7Class extends ToastNamespace.AppMethods{}
  interface Framework7Params extends ToastNamespace.AppParams{}
  interface Framework7Events extends ToastNamespace.AppEvents{}

  interface Framework7Class extends ToggleNamespace.AppMethods{}
  interface Framework7Params extends ToggleNamespace.AppParams{}
  interface Framework7Events extends ToggleNamespace.AppEvents{}

  interface Framework7Class extends ToolbarNamespace.AppMethods{}
  interface Framework7Params extends ToolbarNamespace.AppParams{}
  interface Framework7Events extends ToolbarNamespace.AppEvents{}

  interface Framework7Class extends TooltipNamespace.AppMethods{}
  interface Framework7Params extends TooltipNamespace.AppParams{}
  interface Framework7Events extends TooltipNamespace.AppEvents{}

  interface Framework7Class extends ViNamespace.AppMethods{}
  interface Framework7Params extends ViNamespace.AppParams{}
  interface Framework7Events extends ViNamespace.AppEvents{}

  interface Framework7Class extends ViewNamespace.AppMethods{}
  interface Framework7Params extends ViewNamespace.AppParams{}
  interface Framework7Events extends ViewNamespace.AppEvents{}

  interface Framework7Class extends VirtualListNamespace.AppMethods{}
  interface Framework7Params extends VirtualListNamespace.AppParams{}
  interface Framework7Events extends VirtualListNamespace.AppEvents{}
}
//NAMED_EXPORT
export default Framework7;