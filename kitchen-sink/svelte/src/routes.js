import Home from './pages/home.svelte';
import PanelLeft from './pages/panel-left.svelte';
import PanelRight from './pages/panel-right.svelte';
import About from './pages/about.svelte';

import Accordion from './pages/accordion.svelte';
import ActionSheet from './pages/action-sheet.svelte';
import AreaChart from './pages/area-chart.svelte';
import Autocomplete from './pages/autocomplete.svelte';
import Badge from './pages/badge.svelte';
import Breadcrumbs from './pages/breadcrumbs.svelte';
import Buttons from './pages/buttons.svelte';
import Calendar from './pages/calendar.svelte';
import CalendarPage from './pages/calendar-page.svelte';
import Cards from './pages/cards.svelte';
import CardsExpandable from './pages/cards-expandable.svelte';
import Checkbox from './pages/checkbox.svelte';
import Chips from './pages/chips.svelte';
import ColorPicker from './pages/color-picker.svelte';
import ContactsList from './pages/contacts-list.svelte';
import ContentBlock from './pages/content-block.svelte';
import DataTable from './pages/data-table.svelte';
import Dialog from './pages/dialog.svelte';
import Fab from './pages/fab.svelte';
import FabMorph from './pages/fab-morph.svelte';
import FormStorage from './pages/form-storage.svelte';
import Gauge from './pages/gauge.svelte';
import Grid from './pages/grid.svelte';
import Icons from './pages/icons.svelte';
import InfiniteScroll from './pages/infinite-scroll.svelte';
import Inputs from './pages/inputs.svelte';
import ListButton from './pages/list-button.svelte';
import List from './pages/list.svelte';
import ListIndex from './pages/list-index.svelte';
import LoginScreen from './pages/login-screen.svelte';
import LoginScreenPage from './pages/login-screen-page.svelte';
import MenuList from './pages/menu-list.svelte';
import Messages from './pages/messages.svelte';
import Navbar from './pages/navbar.svelte';
import NavbarHideScroll from './pages/navbar-hide-scroll.svelte';
import Notifications from './pages/notifications.svelte';
import Panel from './pages/panel.svelte';
import PhotoBrowser from './pages/photo-browser.svelte';
import Picker from './pages/picker.svelte';
import PieChart from './pages/pie-chart.svelte';
import Popup from './pages/popup.svelte';
import Popover from './pages/popover.svelte';
import Preloader from './pages/preloader.svelte';
import Progressbar from './pages/progressbar.svelte';
import PullToRefresh from './pages/pull-to-refresh.svelte';
import Radio from './pages/radio.svelte';
import Range from './pages/range.svelte';
import Searchbar from './pages/searchbar.svelte';
import SearchbarExpandable from './pages/searchbar-expandable.svelte';
import Segmented from './pages/segmented.svelte';
import SheetModal from './pages/sheet-modal.svelte';
import Skeleton from './pages/skeleton.svelte';
import SmartSelect from './pages/smart-select.svelte';
import Sortable from './pages/sortable.svelte';
import Stepper from './pages/stepper.svelte';
import Subnavbar from './pages/subnavbar.svelte';
import SubnavbarTitle from './pages/subnavbar-title.svelte';
import Swiper from './pages/swiper.svelte';
import SwiperHorizontal from './pages/swiper-horizontal.svelte';
import SwiperVertical from './pages/swiper-vertical.svelte';
import SwiperSpaceBetween from './pages/swiper-space-between.svelte';
import SwiperMultiple from './pages/swiper-multiple.svelte';
import SwiperNested from './pages/swiper-nested.svelte';
import SwiperLoop from './pages/swiper-loop.svelte';
import Swiper3dCube from './pages/swiper-3d-cube.svelte';
import Swiper3dCoverflow from './pages/swiper-3d-coverflow.svelte';
import Swiper3dFlip from './pages/swiper-3d-flip.svelte';
import SwiperFade from './pages/swiper-fade.svelte';
import SwiperScrollbar from './pages/swiper-scrollbar.svelte';
import SwiperGallery from './pages/swiper-gallery.svelte';
import SwiperParallax from './pages/swiper-parallax.svelte';
import SwiperLazy from './pages/swiper-lazy.svelte';
import SwiperPaginationProgress from './pages/swiper-pagination-progress.svelte';
import SwiperPaginationFraction from './pages/swiper-pagination-fraction.svelte';
import SwiperZoom from './pages/swiper-zoom.svelte';
import Swipeout from './pages/swipeout.svelte';
import Tabs from './pages/tabs.svelte';
import TabsStatic from './pages/tabs-static.svelte';
import TabsAnimated from './pages/tabs-animated.svelte';
import TabsSwipeable from './pages/tabs-swipeable.svelte';
import TabsRoutable from './pages/tabs-routable.svelte';
import TextEditor from './pages/text-editor.svelte';
import Toast from './pages/toast.svelte';
import Toggle from './pages/toggle.svelte';
import ToolbarTabbar from './pages/toolbar-tabbar.svelte';
import Tabbar from './pages/tabbar.svelte';
import TabbarIcons from './pages/tabbar-icons.svelte';
import TabbarScrollable from './pages/tabbar-scrollable.svelte';
import ToolbarHideScroll from './pages/toolbar-hide-scroll.svelte';
import Tooltip from './pages/tooltip.svelte';
import Timeline from './pages/timeline.svelte';
import TimelineVertical from './pages/timeline-vertical.svelte';
import TimelineHorizontal from './pages/timeline-horizontal.svelte';
import TimelineHorizontalCalendar from './pages/timeline-horizontal-calendar.svelte';
import Treeview from './pages/treeview.svelte';
import VirtualList from './pages/virtual-list.svelte';
import ColorThemes from './pages/color-themes.svelte';

import PageTransitions from './pages/page-transitions.svelte';
import PageTransitionsEffect from './pages/page-transitions-effect.svelte';

import RoutableModals from './pages/routable-modals.svelte';
import RoutablePopup from './pages/routable-popup.svelte';
import RoutableActions from './pages/routable-actions.svelte';

import MasterDetailMaster from './pages/master-detail-master.svelte';
import MasterDetailDetail from './pages/master-detail-detail.svelte';

import Store from './pages/store.svelte';

import NotFound from './pages/404.svelte';

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
          <div class="navbar-bg"></div>
          <div class="navbar-inner sliding">
            <div class="left">
              <a  class="link back">
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
          <div class="navbar-bg"></div>
          <div class="navbar-inner sliding">
            <div class="left">
              <a  class="link back">
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
    path: '/area-chart/',
    component: AreaChart,
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
    path: '/breadcrumbs/',
    component: Breadcrumbs,
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
    path: '/list-button/',
    component: ListButton,
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
    path: '/menu-list/',
    component: MenuList,
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
    path: '/pie-chart/',
    component: PieChart,
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
    path: '/segmented/',
    component: Segmented,
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
    path: '/text-editor/',
    component: TextEditor,
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
        path: 'tabbar-icons/',
        component: TabbarIcons,
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

  // Page Transitions
  {
    path: '/page-transitions/',
    component: PageTransitions,
  },
  {
    path: '/page-transitions/:effect/',
    component: PageTransitionsEffect,
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
    ],
  },
  {
    path: '/store/',
    component: Store,
  },

  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    component: NotFound,
  },
];
