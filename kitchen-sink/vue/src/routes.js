import Home from './pages/home.vue';
import PanelLeft from './pages/panel-left.vue';
import PanelRight from './pages/panel-right.vue';
import About from './pages/about.vue';

import Accordion from './pages/accordion.vue';
import ActionSheet from './pages/action-sheet.vue';
import Appbar from './pages/appbar.vue';
import Autocomplete from './pages/autocomplete.vue';
import Badge from './pages/badge.vue';
import Buttons from './pages/buttons.vue';
import Calendar from './pages/calendar.vue';
import CalendarPage from './pages/calendar-page.vue';
import Cards from './pages/cards.vue';
import CardsExpandable from './pages/cards-expandable.vue';
import Checkbox from './pages/checkbox.vue';
import Chips from './pages/chips.vue';
import ColorPicker from './pages/color-picker.vue';
import ContactsList from './pages/contacts-list.vue';
import ContentBlock from './pages/content-block.vue';
import DataTable from './pages/data-table.vue';
import Dialog from './pages/dialog.vue';
import Elevation from './pages/elevation.vue';
import Fab from './pages/fab.vue';
import FabMorph from './pages/fab-morph.vue';
import FormStorage from './pages/form-storage.vue';
import Gauge from './pages/gauge.vue';
import Grid from './pages/grid.vue';
import Icons from './pages/icons.vue';
import InfiniteScroll from './pages/infinite-scroll.vue';
import Inputs from './pages/inputs.vue';
import LazyLoad from './pages/lazy-load.vue';
import List from './pages/list.vue';
import ListIndex from './pages/list-index.vue';
import LoginScreen from './pages/login-screen.vue';
import LoginScreenPage from './pages/login-screen-page.vue';
import Menu from './pages/menu.vue';
import Messages from './pages/messages.vue';
import Navbar from './pages/navbar.vue';
import NavbarHideScroll from './pages/navbar-hide-scroll.vue';
import Notifications from './pages/notifications.vue';
import Panel from './pages/panel.vue';
import PhotoBrowser from './pages/photo-browser.vue';
import Picker from './pages/picker.vue';
import Popup from './pages/popup.vue';
import Popover from './pages/popover.vue';
import Preloader from './pages/preloader.vue';
import Progressbar from './pages/progressbar.vue';
import PullToRefresh from './pages/pull-to-refresh.vue';
import Radio from './pages/radio.vue';
import Range from './pages/range.vue';
import Searchbar from './pages/searchbar.vue';
import SearchbarExpandable from './pages/searchbar-expandable.vue';
import SheetModal from './pages/sheet-modal.vue';
import Skeleton from './pages/skeleton.vue';
import SmartSelect from './pages/smart-select.vue';
import Sortable from './pages/sortable.vue';
import Statusbar from './pages/statusbar.vue';
import Stepper from './pages/stepper.vue';
import Subnavbar from './pages/subnavbar.vue';
import SubnavbarTitle from './pages/subnavbar-title.vue';
import Swiper from './pages/swiper.vue';
import SwiperHorizontal from './pages/swiper-horizontal.vue';
import SwiperVertical from './pages/swiper-vertical.vue';
import SwiperSpaceBetween from './pages/swiper-space-between.vue';
import SwiperMultiple from './pages/swiper-multiple.vue';
import SwiperNested from './pages/swiper-nested.vue';
import SwiperLoop from './pages/swiper-loop.vue';
import Swiper3dCube from './pages/swiper-3d-cube.vue';
import Swiper3dCoverflow from './pages/swiper-3d-coverflow.vue';
import Swiper3dFlip from './pages/swiper-3d-flip.vue';
import SwiperFade from './pages/swiper-fade.vue';
import SwiperScrollbar from './pages/swiper-scrollbar.vue';
import SwiperGallery from './pages/swiper-gallery.vue';
import SwiperCustomControls from './pages/swiper-custom-controls.vue';
import SwiperParallax from './pages/swiper-parallax.vue';
import SwiperLazy from './pages/swiper-lazy.vue';
import SwiperPaginationProgress from './pages/swiper-pagination-progress.vue';
import SwiperPaginationFraction from './pages/swiper-pagination-fraction.vue';
import SwiperZoom from './pages/swiper-zoom.vue';
import Swipeout from './pages/swipeout.vue';
import Tabs from './pages/tabs.vue';
import TabsStatic from './pages/tabs-static.vue';
import TabsAnimated from './pages/tabs-animated.vue';
import TabsSwipeable from './pages/tabs-swipeable.vue';
import TabsRoutable from './pages/tabs-routable.vue';
import Toast from './pages/toast.vue';
import Toggle from './pages/toggle.vue';
import ToolbarTabbar from './pages/toolbar-tabbar.vue';
import Tabbar from './pages/tabbar.vue';
import TabbarLabels from './pages/tabbar-labels.vue';
import TabbarScrollable from './pages/tabbar-scrollable.vue';
import ToolbarHideScroll from './pages/toolbar-hide-scroll.vue';
import Tooltip from './pages/tooltip.vue';
import Timeline from './pages/timeline.vue';
import TimelineVertical from './pages/timeline-vertical.vue';
import TimelineHorizontal from './pages/timeline-horizontal.vue';
import TimelineHorizontalCalendar from './pages/timeline-horizontal-calendar.vue';
import Treeview from './pages/treeview.vue';
import VirtualList from './pages/virtual-list.vue';
import ColorThemes from './pages/color-themes.vue';

import RoutableModals from './pages/routable-modals.vue';
import RoutablePopup from './pages/routable-popup.vue';
import RoutableActions from './pages/routable-actions.vue';

import MasterDetailMaster from './pages/master-detail-master.vue';
import MasterDetailDetail from './pages/master-detail-detail.vue';

import NotFound from './pages/404.vue';

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
    detailRoutes: [
      {
        path: '/master-detail/:id/',
        component: MasterDetailDetail,
      },
    ]
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    component: NotFound,
  },
];
