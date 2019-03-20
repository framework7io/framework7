import Template7 from 'template7';
import Dom7 from 'dom7';
import Framework7 from '../components/app/app-class'

// Helpers
import Request from '../utils/request';
import Utils from '../utils/utils';
import Support from '../utils/support';
import Device from '../utils/device';

// Modules
import {Clicks as ClicksNamespace} from '../modules/clicks/clicks';
import {Device as DeviceNamespace} from '../modules/device/device';
import {Request as RequestNamespace} from '../modules/request/request';
import {Resize as ResizeNamespace} from '../modules/resize/resize';
import {Router as RouterNamespace} from '../modules/router/router';
import {ServiceWorker as ServiceWorkerNamespace} from '../modules/service-worker/service-worker';
import {Support as SupportNamespace} from '../modules/support/support';
import {Touch as TouchNamespace} from '../modules/touch/touch';
import {Utils as UtilsNamespace} from '../modules/utils/utils';

// Components
import {Accordion as AccordionNamespace} from '../components/accordion/accordion';
import {Actions as ActionsNamespace} from '../components/actions/actions';
import {Appbar as AppbarNamespace} from '../components/appbar/appbar';
import {Autocomplete as AutocompleteNamespace} from '../components/autocomplete/autocomplete';
import {Badge as BadgeNamespace} from '../components/badge/badge';
import {Block as BlockNamespace} from '../components/block/block';
import {Button as ButtonNamespace} from '../components/button/button';
import {Calendar as CalendarNamespace} from '../components/calendar/calendar';
import {Card as CardNamespace} from '../components/card/card';
import {Checkbox as CheckboxNamespace} from '../components/checkbox/checkbox';
import {Chip as ChipNamespace} from '../components/chip/chip';
import {ContactsList as ContactsListNamespace} from '../components/contacts-list/contacts-list';
import {DataTable as DataTableNamespace} from '../components/data-table/data-table';
import {Dialog as DialogNamespace} from '../components/dialog/dialog';
import {Elevation as ElevationNamespace} from '../components/elevation/elevation';
import {Fab as FabNamespace} from '../components/fab/fab';
import {Form as FormNamespace} from '../components/form/form';
import {Gauge as GaugeNamespace} from '../components/gauge/gauge';
import {Grid as GridNamespace} from '../components/grid/grid';
import {Icon as IconNamespace} from '../components/icon/icon';
import {InfiniteScroll as InfiniteScrollNamespace} from '../components/infinite-scroll/infinite-scroll';
import {Input as InputNamespace} from '../components/input/input';
import {Lazy as LazyNamespace} from '../components/lazy/lazy';
import {Link as LinkNamespace} from '../components/link/link';
import {List as ListNamespace} from '../components/list/list';
import {ListIndex as ListIndexNamespace} from '../components/list-index/list-index';
import {LoginScreen as LoginScreenNamespace} from '../components/login-screen/login-screen';
import {Menu as MenuNamespace} from '../components/menu/menu';
import {Messagebar as MessagebarNamespace} from '../components/messagebar/messagebar';
import {Messages as MessagesNamespace} from '../components/messages/messages';
import {Modal as ModalNamespace} from '../components/modal/modal';
import {Navbar as NavbarNamespace} from '../components/navbar/navbar';
import {Notification as NotificationNamespace} from '../components/notification/notification';
import {Page as PageNamespace} from '../components/page/page';
import {Panel as PanelNamespace} from '../components/panel/panel';
import {PhotoBrowser as PhotoBrowserNamespace} from '../components/photo-browser/photo-browser';
import {Picker as PickerNamespace} from '../components/picker/picker';
import {Popover as PopoverNamespace} from '../components/popover/popover';
import {Popup as PopupNamespace} from '../components/popup/popup';
import {Preloader as PreloaderNamespace} from '../components/preloader/preloader';
import {Progressbar as ProgressbarNamespace} from '../components/progressbar/progressbar';
import {PullToRefresh as PullToRefreshNamespace} from '../components/pull-to-refresh/pull-to-refresh';
import {Radio as RadioNamespace} from '../components/radio/radio';
import {Range as RangeNamespace} from '../components/range/range';
import {Searchbar as SearchbarNamespace} from '../components/searchbar/searchbar';
import {Sheet as SheetNamespace} from '../components/sheet/sheet';
import {Skeleton as SkeletonNamespace} from '../components/skeleton/skeleton';
import {SmartSelect as SmartSelectNamespace} from '../components/smart-select/smart-select';
import {Sortable as SortableNamespace} from '../components/sortable/sortable';
import {Statusbar as StatusbarNamespace} from '../components/statusbar/statusbar';
import {Stepper as StepperNamespace} from '../components/stepper/stepper';
import {Subnavbar as SubnavbarNamespace} from '../components/subnavbar/subnavbar';
import {Swipeout as SwipeoutNamespace} from '../components/swipeout/swipeout';
import {Swiper as SwiperNamespace} from '../components/swiper/swiper';
import {Tabs as TabsNamespace} from '../components/tabs/tabs';
import {Timeline as TimelineNamespace} from '../components/timeline/timeline';
import {Toast as ToastNamespace} from '../components/toast/toast';
import {Toggle as ToggleNamespace} from '../components/toggle/toggle';
import {Toolbar as ToolbarNamespace} from '../components/toolbar/toolbar';
import {Tooltip as TooltipNamespace} from '../components/tooltip/tooltip';
import {TouchRipple as TouchRippleNamespace} from '../components/touch-ripple/touch-ripple';
import {Typography as TypographyNamespace} from '../components/typography/typography';
import {Vi as ViNamespace} from '../components/vi/vi';
import {View as ViewNamespace} from '../components/view/view';
import {VirtualList as VirtualListNamespace} from '../components/virtual-list/virtual-list';

declare module '../components/app/app-class' {
  interface Framework7Class<Events> extends ClicksNamespace.AppMethods{}
  interface Framework7Params extends ClicksNamespace.AppParams{}
  interface Framework7Events extends ClicksNamespace.AppEvents{}
  interface Framework7Class<Events> extends DeviceNamespace.AppMethods{}
  interface Framework7Params extends DeviceNamespace.AppParams{}
  interface Framework7Events extends DeviceNamespace.AppEvents{}
  interface Framework7Class<Events> extends RequestNamespace.AppMethods{}
  interface Framework7Params extends RequestNamespace.AppParams{}
  interface Framework7Events extends RequestNamespace.AppEvents{}
  interface Framework7Class<Events> extends ResizeNamespace.AppMethods{}
  interface Framework7Params extends ResizeNamespace.AppParams{}
  interface Framework7Events extends ResizeNamespace.AppEvents{}
  interface Framework7Class<Events> extends RouterNamespace.AppMethods{}
  interface Framework7Params extends RouterNamespace.AppParams{}
  interface Framework7Events extends RouterNamespace.AppEvents{}
  interface Framework7Class<Events> extends ServiceWorkerNamespace.AppMethods{}
  interface Framework7Params extends ServiceWorkerNamespace.AppParams{}
  interface Framework7Events extends ServiceWorkerNamespace.AppEvents{}
  interface Framework7Class<Events> extends SupportNamespace.AppMethods{}
  interface Framework7Params extends SupportNamespace.AppParams{}
  interface Framework7Events extends SupportNamespace.AppEvents{}
  interface Framework7Class<Events> extends TouchNamespace.AppMethods{}
  interface Framework7Params extends TouchNamespace.AppParams{}
  interface Framework7Events extends TouchNamespace.AppEvents{}
  interface Framework7Class<Events> extends UtilsNamespace.AppMethods{}
  interface Framework7Params extends UtilsNamespace.AppParams{}
  interface Framework7Events extends UtilsNamespace.AppEvents{}
  interface Framework7Class<Events> extends AccordionNamespace.AppMethods{}
  interface Framework7Params extends AccordionNamespace.AppParams{}
  interface Framework7Events extends AccordionNamespace.AppEvents{}
  interface Framework7Class<Events> extends ActionsNamespace.AppMethods{}
  interface Framework7Params extends ActionsNamespace.AppParams{}
  interface Framework7Events extends ActionsNamespace.AppEvents{}
  interface Framework7Class<Events> extends AppbarNamespace.AppMethods{}
  interface Framework7Params extends AppbarNamespace.AppParams{}
  interface Framework7Events extends AppbarNamespace.AppEvents{}
  interface Framework7Class<Events> extends AutocompleteNamespace.AppMethods{}
  interface Framework7Params extends AutocompleteNamespace.AppParams{}
  interface Framework7Events extends AutocompleteNamespace.AppEvents{}
  interface Framework7Class<Events> extends BadgeNamespace.AppMethods{}
  interface Framework7Params extends BadgeNamespace.AppParams{}
  interface Framework7Events extends BadgeNamespace.AppEvents{}
  interface Framework7Class<Events> extends BlockNamespace.AppMethods{}
  interface Framework7Params extends BlockNamespace.AppParams{}
  interface Framework7Events extends BlockNamespace.AppEvents{}
  interface Framework7Class<Events> extends ButtonNamespace.AppMethods{}
  interface Framework7Params extends ButtonNamespace.AppParams{}
  interface Framework7Events extends ButtonNamespace.AppEvents{}
  interface Framework7Class<Events> extends CalendarNamespace.AppMethods{}
  interface Framework7Params extends CalendarNamespace.AppParams{}
  interface Framework7Events extends CalendarNamespace.AppEvents{}
  interface Framework7Class<Events> extends CardNamespace.AppMethods{}
  interface Framework7Params extends CardNamespace.AppParams{}
  interface Framework7Events extends CardNamespace.AppEvents{}
  interface Framework7Class<Events> extends CheckboxNamespace.AppMethods{}
  interface Framework7Params extends CheckboxNamespace.AppParams{}
  interface Framework7Events extends CheckboxNamespace.AppEvents{}
  interface Framework7Class<Events> extends ChipNamespace.AppMethods{}
  interface Framework7Params extends ChipNamespace.AppParams{}
  interface Framework7Events extends ChipNamespace.AppEvents{}
  interface Framework7Class<Events> extends ContactsListNamespace.AppMethods{}
  interface Framework7Params extends ContactsListNamespace.AppParams{}
  interface Framework7Events extends ContactsListNamespace.AppEvents{}
  interface Framework7Class<Events> extends DataTableNamespace.AppMethods{}
  interface Framework7Params extends DataTableNamespace.AppParams{}
  interface Framework7Events extends DataTableNamespace.AppEvents{}
  interface Framework7Class<Events> extends DialogNamespace.AppMethods{}
  interface Framework7Params extends DialogNamespace.AppParams{}
  interface Framework7Events extends DialogNamespace.AppEvents{}
  interface Framework7Class<Events> extends ElevationNamespace.AppMethods{}
  interface Framework7Params extends ElevationNamespace.AppParams{}
  interface Framework7Events extends ElevationNamespace.AppEvents{}
  interface Framework7Class<Events> extends FabNamespace.AppMethods{}
  interface Framework7Params extends FabNamespace.AppParams{}
  interface Framework7Events extends FabNamespace.AppEvents{}
  interface Framework7Class<Events> extends FormNamespace.AppMethods{}
  interface Framework7Params extends FormNamespace.AppParams{}
  interface Framework7Events extends FormNamespace.AppEvents{}
  interface Framework7Class<Events> extends GaugeNamespace.AppMethods{}
  interface Framework7Params extends GaugeNamespace.AppParams{}
  interface Framework7Events extends GaugeNamespace.AppEvents{}
  interface Framework7Class<Events> extends GridNamespace.AppMethods{}
  interface Framework7Params extends GridNamespace.AppParams{}
  interface Framework7Events extends GridNamespace.AppEvents{}
  interface Framework7Class<Events> extends IconNamespace.AppMethods{}
  interface Framework7Params extends IconNamespace.AppParams{}
  interface Framework7Events extends IconNamespace.AppEvents{}
  interface Framework7Class<Events> extends InfiniteScrollNamespace.AppMethods{}
  interface Framework7Params extends InfiniteScrollNamespace.AppParams{}
  interface Framework7Events extends InfiniteScrollNamespace.AppEvents{}
  interface Framework7Class<Events> extends InputNamespace.AppMethods{}
  interface Framework7Params extends InputNamespace.AppParams{}
  interface Framework7Events extends InputNamespace.AppEvents{}
  interface Framework7Class<Events> extends LazyNamespace.AppMethods{}
  interface Framework7Params extends LazyNamespace.AppParams{}
  interface Framework7Events extends LazyNamespace.AppEvents{}
  interface Framework7Class<Events> extends LinkNamespace.AppMethods{}
  interface Framework7Params extends LinkNamespace.AppParams{}
  interface Framework7Events extends LinkNamespace.AppEvents{}
  interface Framework7Class<Events> extends ListNamespace.AppMethods{}
  interface Framework7Params extends ListNamespace.AppParams{}
  interface Framework7Events extends ListNamespace.AppEvents{}
  interface Framework7Class<Events> extends ListIndexNamespace.AppMethods{}
  interface Framework7Params extends ListIndexNamespace.AppParams{}
  interface Framework7Events extends ListIndexNamespace.AppEvents{}
  interface Framework7Class<Events> extends LoginScreenNamespace.AppMethods{}
  interface Framework7Params extends LoginScreenNamespace.AppParams{}
  interface Framework7Events extends LoginScreenNamespace.AppEvents{}
  interface Framework7Class<Events> extends MenuNamespace.AppMethods{}
  interface Framework7Params extends MenuNamespace.AppParams{}
  interface Framework7Events extends MenuNamespace.AppEvents{}
  interface Framework7Class<Events> extends MessagebarNamespace.AppMethods{}
  interface Framework7Params extends MessagebarNamespace.AppParams{}
  interface Framework7Events extends MessagebarNamespace.AppEvents{}
  interface Framework7Class<Events> extends MessagesNamespace.AppMethods{}
  interface Framework7Params extends MessagesNamespace.AppParams{}
  interface Framework7Events extends MessagesNamespace.AppEvents{}
  interface Framework7Class<Events> extends ModalNamespace.AppMethods{}
  interface Framework7Params extends ModalNamespace.AppParams{}
  interface Framework7Events extends ModalNamespace.AppEvents{}
  interface Framework7Class<Events> extends NavbarNamespace.AppMethods{}
  interface Framework7Params extends NavbarNamespace.AppParams{}
  interface Framework7Events extends NavbarNamespace.AppEvents{}
  interface Framework7Class<Events> extends NotificationNamespace.AppMethods{}
  interface Framework7Params extends NotificationNamespace.AppParams{}
  interface Framework7Events extends NotificationNamespace.AppEvents{}
  interface Framework7Class<Events> extends PageNamespace.AppMethods{}
  interface Framework7Params extends PageNamespace.AppParams{}
  interface Framework7Events extends PageNamespace.AppEvents{}
  interface Framework7Class<Events> extends PanelNamespace.AppMethods{}
  interface Framework7Params extends PanelNamespace.AppParams{}
  interface Framework7Events extends PanelNamespace.AppEvents{}
  interface Framework7Class<Events> extends PhotoBrowserNamespace.AppMethods{}
  interface Framework7Params extends PhotoBrowserNamespace.AppParams{}
  interface Framework7Events extends PhotoBrowserNamespace.AppEvents{}
  interface Framework7Class<Events> extends PickerNamespace.AppMethods{}
  interface Framework7Params extends PickerNamespace.AppParams{}
  interface Framework7Events extends PickerNamespace.AppEvents{}
  interface Framework7Class<Events> extends PopoverNamespace.AppMethods{}
  interface Framework7Params extends PopoverNamespace.AppParams{}
  interface Framework7Events extends PopoverNamespace.AppEvents{}
  interface Framework7Class<Events> extends PopupNamespace.AppMethods{}
  interface Framework7Params extends PopupNamespace.AppParams{}
  interface Framework7Events extends PopupNamespace.AppEvents{}
  interface Framework7Class<Events> extends PreloaderNamespace.AppMethods{}
  interface Framework7Params extends PreloaderNamespace.AppParams{}
  interface Framework7Events extends PreloaderNamespace.AppEvents{}
  interface Framework7Class<Events> extends ProgressbarNamespace.AppMethods{}
  interface Framework7Params extends ProgressbarNamespace.AppParams{}
  interface Framework7Events extends ProgressbarNamespace.AppEvents{}
  interface Framework7Class<Events> extends PullToRefreshNamespace.AppMethods{}
  interface Framework7Params extends PullToRefreshNamespace.AppParams{}
  interface Framework7Events extends PullToRefreshNamespace.AppEvents{}
  interface Framework7Class<Events> extends RadioNamespace.AppMethods{}
  interface Framework7Params extends RadioNamespace.AppParams{}
  interface Framework7Events extends RadioNamespace.AppEvents{}
  interface Framework7Class<Events> extends RangeNamespace.AppMethods{}
  interface Framework7Params extends RangeNamespace.AppParams{}
  interface Framework7Events extends RangeNamespace.AppEvents{}
  interface Framework7Class<Events> extends SearchbarNamespace.AppMethods{}
  interface Framework7Params extends SearchbarNamespace.AppParams{}
  interface Framework7Events extends SearchbarNamespace.AppEvents{}
  interface Framework7Class<Events> extends SheetNamespace.AppMethods{}
  interface Framework7Params extends SheetNamespace.AppParams{}
  interface Framework7Events extends SheetNamespace.AppEvents{}
  interface Framework7Class<Events> extends SkeletonNamespace.AppMethods{}
  interface Framework7Params extends SkeletonNamespace.AppParams{}
  interface Framework7Events extends SkeletonNamespace.AppEvents{}
  interface Framework7Class<Events> extends SmartSelectNamespace.AppMethods{}
  interface Framework7Params extends SmartSelectNamespace.AppParams{}
  interface Framework7Events extends SmartSelectNamespace.AppEvents{}
  interface Framework7Class<Events> extends SortableNamespace.AppMethods{}
  interface Framework7Params extends SortableNamespace.AppParams{}
  interface Framework7Events extends SortableNamespace.AppEvents{}
  interface Framework7Class<Events> extends StatusbarNamespace.AppMethods{}
  interface Framework7Params extends StatusbarNamespace.AppParams{}
  interface Framework7Events extends StatusbarNamespace.AppEvents{}
  interface Framework7Class<Events> extends StepperNamespace.AppMethods{}
  interface Framework7Params extends StepperNamespace.AppParams{}
  interface Framework7Events extends StepperNamespace.AppEvents{}
  interface Framework7Class<Events> extends SubnavbarNamespace.AppMethods{}
  interface Framework7Params extends SubnavbarNamespace.AppParams{}
  interface Framework7Events extends SubnavbarNamespace.AppEvents{}
  interface Framework7Class<Events> extends SwipeoutNamespace.AppMethods{}
  interface Framework7Params extends SwipeoutNamespace.AppParams{}
  interface Framework7Events extends SwipeoutNamespace.AppEvents{}
  interface Framework7Class<Events> extends SwiperNamespace.AppMethods{}
  interface Framework7Params extends SwiperNamespace.AppParams{}
  interface Framework7Events extends SwiperNamespace.AppEvents{}
  interface Framework7Class<Events> extends TabsNamespace.AppMethods{}
  interface Framework7Params extends TabsNamespace.AppParams{}
  interface Framework7Events extends TabsNamespace.AppEvents{}
  interface Framework7Class<Events> extends TimelineNamespace.AppMethods{}
  interface Framework7Params extends TimelineNamespace.AppParams{}
  interface Framework7Events extends TimelineNamespace.AppEvents{}
  interface Framework7Class<Events> extends ToastNamespace.AppMethods{}
  interface Framework7Params extends ToastNamespace.AppParams{}
  interface Framework7Events extends ToastNamespace.AppEvents{}
  interface Framework7Class<Events> extends ToggleNamespace.AppMethods{}
  interface Framework7Params extends ToggleNamespace.AppParams{}
  interface Framework7Events extends ToggleNamespace.AppEvents{}
  interface Framework7Class<Events> extends ToolbarNamespace.AppMethods{}
  interface Framework7Params extends ToolbarNamespace.AppParams{}
  interface Framework7Events extends ToolbarNamespace.AppEvents{}
  interface Framework7Class<Events> extends TooltipNamespace.AppMethods{}
  interface Framework7Params extends TooltipNamespace.AppParams{}
  interface Framework7Events extends TooltipNamespace.AppEvents{}
  interface Framework7Class<Events> extends TouchRippleNamespace.AppMethods{}
  interface Framework7Params extends TouchRippleNamespace.AppParams{}
  interface Framework7Events extends TouchRippleNamespace.AppEvents{}
  interface Framework7Class<Events> extends TypographyNamespace.AppMethods{}
  interface Framework7Params extends TypographyNamespace.AppParams{}
  interface Framework7Events extends TypographyNamespace.AppEvents{}
  interface Framework7Class<Events> extends ViNamespace.AppMethods{}
  interface Framework7Params extends ViNamespace.AppParams{}
  interface Framework7Events extends ViNamespace.AppEvents{}
  interface Framework7Class<Events> extends ViewNamespace.AppMethods{}
  interface Framework7Params extends ViewNamespace.AppParams{}
  interface Framework7Events extends ViewNamespace.AppEvents{}
  interface Framework7Class<Events> extends VirtualListNamespace.AppMethods{}
  interface Framework7Params extends VirtualListNamespace.AppParams{}
  interface Framework7Events extends VirtualListNamespace.AppEvents{}
}

export { Request, Utils, Support, Device };
export { Template7, Dom7 };
export default Framework7;
