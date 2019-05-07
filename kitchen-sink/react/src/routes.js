import Home from './pages/home.jsx';
import PanelLeft from './pages/panel-left.jsx';
import PanelRight from './pages/panel-right.jsx';
import About from './pages/about.jsx';
import Accordion from './pages/accordion.jsx';
import ActionSheet from './pages/action-sheet.jsx';
import Appbar from './pages/appbar.jsx';
import Autocomplete from './pages/autocomplete.jsx';
import Badge from './pages/badge.jsx';
import Buttons from './pages/buttons.jsx';
import Calendar from './pages/calendar.jsx';
import CalendarPage from './pages/calendar-page.jsx';
import Cards from './pages/cards.jsx';
import CardsExpandable from './pages/cards-expandable.jsx';
import Checkbox from './pages/checkbox.jsx';
import Chips from './pages/chips.jsx';
import ColorPicker from './pages/color-picker.jsx';
import ContactsList from './pages/contacts-list.jsx';
import ContentBlock from './pages/content-block.jsx';
import DataTable from './pages/data-table.jsx';
import Dialog from './pages/dialog.jsx';
import Elevation from './pages/elevation.jsx';
import Fab from './pages/fab.jsx';
import FabMorph from './pages/fab-morph.jsx';
import FormStorage from './pages/form-storage.jsx';
import Gauge from './pages/gauge.jsx';
import Grid from './pages/grid.jsx';
import Icons from './pages/icons.jsx';
import InfiniteScroll from './pages/infinite-scroll.jsx';
import Inputs from './pages/inputs.jsx';
import LazyLoad from './pages/lazy-load.jsx';
import List from './pages/list.jsx';
import ListIndex from './pages/list-index.jsx';
import LoginScreen from './pages/login-screen.jsx';
import LoginScreenPage from './pages/login-screen-page.jsx';
import Menu from './pages/menu.jsx';
import Messages from './pages/messages.jsx';
import Navbar from './pages/navbar.jsx';
import NavbarHideScroll from './pages/navbar-hide-scroll.jsx';
import Notifications from './pages/notifications.jsx';
import Panel from './pages/panel.jsx';
import PhotoBrowser from './pages/photo-browser.jsx';
import Picker from './pages/picker.jsx';
import Popup from './pages/popup.jsx';
import Popover from './pages/popover.jsx';
import Preloader from './pages/preloader.jsx';
import Progressbar from './pages/progressbar.jsx';
import PullToRefresh from './pages/pull-to-refresh.jsx';
import Radio from './pages/radio.jsx';
import Range from './pages/range.jsx';
import Searchbar from './pages/searchbar.jsx';
import SearchbarExpandable from './pages/searchbar-expandable.jsx';
import SheetModal from './pages/sheet-modal.jsx';
import Skeleton from './pages/skeleton.jsx';
import SmartSelect from './pages/smart-select.jsx';
import Sortable from './pages/sortable.jsx';
import Statusbar from './pages/statusbar.jsx';
import Stepper from './pages/stepper.jsx';
import Subnavbar from './pages/subnavbar.jsx';
import SubnavbarTitle from './pages/subnavbar-title.jsx';
import Swiper from './pages/swiper.jsx';
import SwiperHorizontal from './pages/swiper-horizontal.jsx';
import SwiperVertical from './pages/swiper-vertical.jsx';
import SwiperSpaceBetween from './pages/swiper-space-between.jsx';
import SwiperMultiple from './pages/swiper-multiple.jsx';
import SwiperNested from './pages/swiper-nested.jsx';
import SwiperLoop from './pages/swiper-loop.jsx';
import Swiper3dCube from './pages/swiper-3d-cube.jsx';
import Swiper3dCoverflow from './pages/swiper-3d-coverflow.jsx';
import Swiper3dFlip from './pages/swiper-3d-flip.jsx';
import SwiperFade from './pages/swiper-fade.jsx';
import SwiperScrollbar from './pages/swiper-scrollbar.jsx';
import SwiperGallery from './pages/swiper-gallery.jsx';
import SwiperCustomControls from './pages/swiper-custom-controls.jsx';
import SwiperParallax from './pages/swiper-parallax.jsx';
import SwiperLazy from './pages/swiper-lazy.jsx';
import SwiperPaginationProgress from './pages/swiper-pagination-progress.jsx';
import SwiperPaginationFraction from './pages/swiper-pagination-fraction.jsx';
import SwiperZoom from './pages/swiper-zoom.jsx';
import Swipeout from './pages/swipeout.jsx';
import Tabs from './pages/tabs.jsx';
import TabsStatic from './pages/tabs-static.jsx';
import TabsAnimated from './pages/tabs-animated.jsx';
import TabsSwipeable from './pages/tabs-swipeable.jsx';
import TabsRoutable from './pages/tabs-routable.jsx';
import Toast from './pages/toast.jsx';
import Toggle from './pages/toggle.jsx';
import ToolbarTabbar from './pages/toolbar-tabbar.jsx';
import Tabbar from './pages/tabbar.jsx';
import TabbarLabels from './pages/tabbar-labels.jsx';
import TabbarScrollable from './pages/tabbar-scrollable.jsx';
import ToolbarHideScroll from './pages/toolbar-hide-scroll.jsx';
import Tooltip from './pages/tooltip.jsx';
import Timeline from './pages/timeline.jsx';
import TimelineVertical from './pages/timeline-vertical.jsx';
import TimelineHorizontal from './pages/timeline-horizontal.jsx';
import TimelineHorizontalCalendar from './pages/timeline-horizontal-calendar.jsx';
import Treeview from './pages/treeview.jsx';
import VirtualList from './pages/virtual-list.jsx';
import ColorThemes from './pages/color-themes.jsx';

import RoutableModals from './pages/routable-modals.jsx';
import RoutablePopup from './pages/routable-popup.jsx';
import RoutableActions from './pages/routable-actions.jsx';

import MasterDetailMaster from './pages/master-detail-master.jsx';
import MasterDetailDetail from './pages/master-detail-detail.jsx';


import NotFound from './pages/404.jsx';

// Pages
export default [
  // Index page
  {
    path: '/',
    component: Home,
  },
  // About page
  {
    path: '/about/',
    component: About,
  },
  // Left Panel
  {
    path: '/panel-left/',
    component: PanelLeft,
  },
  // Right Panel
  {
    path: '/panel-right/',
    component: PanelRight,
  },
  // Right Panel pages
  {
    path: '/panel-right-1/',
    content: `
      <div class="page">
        <div class="navbar">
          <div class="navbar-inner sliding">
            <div class="left">
              <a href="#" class="link back">
                <i class="icon icon-back"></i>
                <span class="if-not-md">Back</span>
              </a>
            </div>
            <div class="title">Panel Page 1</div>
          </div>
        </div>
        <div class="page-content">
          <div class="block">
            <p>This is a right panel page 1</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo saepe aspernatur inventore dolorum voluptates consequatur tempore ipsum! Quia, incidunt, aliquam sit veritatis nisi aliquid porro similique ipsa mollitia eaque ex!</p>
          </div>
        </div>
      </div>
    `,
  },
  {
    path: '/panel-right-2/',
    content: `
      <div class="page">
        <div class="navbar">
          <div class="navbar-inner sliding">
            <div class="left">
              <a href="#" class="link back">
                <i class="icon icon-back"></i>
                <span class="if-not-md">Back</span>
              </a>
            </div>
            <div class="title">Panel Page 2</div>
          </div>
        </div>
        <div class="page-content">
          <div class="block">
            <p>This is a right panel page 2</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo saepe aspernatur inventore dolorum voluptates consequatur tempore ipsum! Quia, incidunt, aliquam sit veritatis nisi aliquid porro similique ipsa mollitia eaque ex!</p>
          </div>
        </div>
      </div>
    `,
  },
  // Components
  {
    path: '/accordion/',
    component: Accordion,
  },
  {
    path: '/action-sheet/',
    component: ActionSheet,
  },
  {
    path: '/appbar/',
    component: Appbar,
  },
  {
    path: '/autocomplete/',
    component: Autocomplete,
  },
  {
    path: '/badge/',
    component: Badge,
  },
  {
    path: '/buttons/',
    component: Buttons,
  },
  {
    path: '/calendar/',
    component: Calendar,
  },
  {
    path: '/calendar-page/',
    component: CalendarPage,
  },
  {
    path: '/cards/',
    component: Cards,
  },
  {
    path: '/cards-expandable/',
    component: CardsExpandable,
  },
  {
    path: '/checkbox/',
    component: Checkbox,
  },
  {
    path: '/chips/',
    component: Chips,
  },
  {
    path: '/color-picker/',
    component: ColorPicker,
  },
  {
    path: '/contacts-list/',
    component: ContactsList,
  },
  {
    path: '/content-block/',
    component: ContentBlock,
  },
  {
    path: '/data-table/',
    component: DataTable,
  },
  {
    path: '/dialog/',
    component: Dialog,
  },
  {
    path: '/elevation/',
    component: Elevation,
  },
  {
    path: '/fab/',
    component: Fab,
  },
  {
    path: '/fab-morph/',
    component: FabMorph,
  },
  {
    path: '/form-storage/',
    component: FormStorage,
  },
  {
    path: '/gauge/',
    component: Gauge,
  },
  {
    path: '/grid/',
    component: Grid,
  },
  {
    path: '/icons/',
    component: Icons,
  },
  {
    path: '/infinite-scroll/',
    component: InfiniteScroll,
  },
  {
    path: '/inputs/',
    component: Inputs,
  },
  {
    path: '/lazy-load/',
    component: LazyLoad,
  },
  {
    path: '/list/',
    component: List,
  },
  {
    path: '/list-index/',
    component: ListIndex,
  },
  {
    path: '/login-screen/',
    component: LoginScreen,
  },
  {
    path: '/login-screen-page/',
    component: LoginScreenPage,
  },
  {
    path: '/menu/',
    component: Menu,
  },
  {
    path: '/messages/',
    component: Messages,
  },
  {
    path: '/navbar/',
    component: Navbar,
  },
  {
    path: '/navbar-hide-scroll/',
    component: NavbarHideScroll,
  },
  {
    path: '/notifications/',
    component: Notifications,
  },
  {
    path: '/panel/',
    component: Panel,
  },
  {
    path: '/photo-browser/',
    component: PhotoBrowser,
  },
  {
    path: '/picker/',
    component: Picker,
  },
  {
    path: '/popup/',
    component: Popup,
  },
  {
    path: '/popover/',
    component: Popover,
  },
  {
    path: '/preloader/',
    component: Preloader,
  },
  {
    path: '/progressbar/',
    component: Progressbar,
  },
  {
    path: '/pull-to-refresh/',
    component: PullToRefresh,
  },
  {
    path: '/radio/',
    component: Radio,
  },
  {
    path: '/range/',
    component: Range,
  },
  {
    path: '/searchbar/',
    component: Searchbar,
  },
  {
    path: '/searchbar-expandable/',
    component: SearchbarExpandable,
  },
  {
    path: '/sheet-modal/',
    component: SheetModal,
  },
  {
    path: '/skeleton/',
    component: Skeleton,
  },
  {
    path: '/smart-select/',
    component: SmartSelect,
  },
  {
    path: '/sortable/',
    component: Sortable,
  },
  {
    path: '/statusbar/',
    component: Statusbar,
  },
  {
    path: '/stepper/',
    component: Stepper,
  },
  {
    path: '/subnavbar/',
    component: Subnavbar,
  },
  {
    path: '/subnavbar-title/',
    component: SubnavbarTitle,
  },
  {
    path: '/swiper/',
    component: Swiper,
    routes: [
      {
        path: 'swiper-horizontal/',
        component: SwiperHorizontal,
      },
      {
        path: 'swiper-vertical/',
        component: SwiperVertical,
      },
      {
        path: 'swiper-space-between/',
        component: SwiperSpaceBetween,
      },
      {
        path: 'swiper-multiple/',
        component: SwiperMultiple,
      },
      {
        path: 'swiper-nested/',
        component: SwiperNested,
      },
      {
        path: 'swiper-loop/',
        component: SwiperLoop,
      },
      {
        path: 'swiper-3d-cube/',
        component: Swiper3dCube,
      },
      {
        path: 'swiper-3d-coverflow/',
        component: Swiper3dCoverflow,
      },
      {
        path: 'swiper-3d-flip/',
        component: Swiper3dFlip,
      },
      {
        path: 'swiper-fade/',
        component: SwiperFade,
      },
      {
        path: 'swiper-scrollbar/',
        component: SwiperScrollbar,
      },
      {
        path: 'swiper-gallery/',
        component: SwiperGallery,
      },
      {
        path: 'swiper-custom-controls/',
        component: SwiperCustomControls,
      },
      {
        path: 'swiper-parallax/',
        component: SwiperParallax,
      },
      {
        path: 'swiper-lazy/',
        component: SwiperLazy,
      },
      {
        path: 'swiper-pagination-progress/',
        component: SwiperPaginationProgress,
      },
      {
        path: 'swiper-pagination-fraction/',
        component: SwiperPaginationFraction,
      },
      {
        path: 'swiper-zoom/',
        component: SwiperZoom,
      },
    ],
  },
  {
    path: '/swipeout/',
    component: Swipeout,
  },
  {
    path: '/tabs/',
    component: Tabs,
  },
  {
    path: '/tabs-static/',
    component: TabsStatic,
  },
  {
    path: '/tabs-animated/',
    component: TabsAnimated,
  },
  {
    path: '/tabs-swipeable/',
    component: TabsSwipeable,
  },
  {
    path: '/tabs-routable/',
    component: TabsRoutable,
    tabs: [
      {
        path: '/',
        id: 'tab1',
        content: `
        <div class="block">
          <p>Tab 1 content</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad laboriosam accusamus?</p>
          <p>Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit blanditiis eaque exercitationem praesentium reprehenderit, fuga accusamus possimus sed, sint facilis ratione quod, qui dignissimos voluptas! Aliquam rerum consequuntur deleniti.</p>
          <p>Totam reprehenderit amet commodi ipsum nam provident doloremque possimus odio itaque, est animi culpa modi consequatur reiciendis corporis libero laudantium sed eveniet unde delectus a maiores nihil dolores? Natus, perferendis.</p>
        </div>
        `,
      },
      {
        path: '/tab2/',
        id: 'tab2',
        content: `
        <div class="block">
          <p>Tab 2 content</p>
          <p>Suscipit, facere quasi atque totam. Repudiandae facilis at optio atque, rem nam, natus ratione cum enim voluptatem suscipit veniam! Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid impedit! Adipisci!</p>
          <p>Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum cumque impedit.</p>
          <p>Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.</p>
        </div>
        `,
      },
      {
        path: '/tab3/',
        id: 'tab3',
        content: `
        <div class="block">
          <p>Tab 3 content</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad laboriosam accusamus?</p>
          <p>Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum cumque impedit.</p>
          <p>Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.</p>
        </div>
        `,
      },
    ],
  },
  {
    path: '/toast/',
    component: Toast,
  },
  {
    path: '/toggle/',
    component: Toggle,
  },
  {
    path: '/toolbar-tabbar/',
    component: ToolbarTabbar,
    routes: [
      {
        path: 'tabbar/',
        component: Tabbar,
      },
      {
        path: 'tabbar-labels/',
        component: TabbarLabels,
      },
      {
        path: 'tabbar-scrollable/',
        component: TabbarScrollable,
      },
      {
        path: 'toolbar-hide-scroll/',
        component: ToolbarHideScroll,
      },
    ],
  },
  {
    path: '/tooltip/',
    component: Tooltip,
  },
  {
    path: '/timeline/',
    component: Timeline,
  },
  {
    path: '/timeline-vertical/',
    component: TimelineVertical,
  },
  {
    path: '/timeline-horizontal/',
    component: TimelineHorizontal,
  },
  {
    path: '/timeline-horizontal-calendar/',
    component: TimelineHorizontalCalendar,
  },
  {
    path: '/treeview/',
    component: Treeview,
  },
  {
    path: '/virtual-list/',
    component: VirtualList,
  },

  // Color Themes
  {
    path: '/color-themes/',
    component: ColorThemes,
  },

  // Routable Modals
  {
    path: '/routable-modals/',
    component: RoutableModals,
    routes: [
      {
        path: 'popup/',
        popup: {
          component: RoutablePopup,
        },
      },
      {
        path: 'actions/',
        popup: {
          component: RoutableActions,
        },
      },
    ],
  },
  {
    path: '/master-detail/',
    component: MasterDetailMaster,
    master: true,
  },
  {
    path: '/master-detail/:id/',
    component: MasterDetailDetail,
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    component: NotFound,
  },
];
