/**
* F7 Build Configuration
* Don't modify this file!
* If you want to build custom version of F7, just put build-config-custom.js with the required configuration in this folder. Or build it using command line:
* $ npm run build-core:prod -- --config path/to/config.js --output path/to/output/folder
*/

const config = {
  target: 'universal',
  rtl: false,
  components: [
    // Appbar
    'appbar',

    // Modals
    'dialog',
    'popup',
    'login-screen',
    'popover',
    'actions',
    'sheet',
    'toast',

    // Loaders
    'preloader',
    'progressbar',

    // List Components
    'sortable',
    'swipeout',
    'accordion',
    'contacts-list',
    'virtual-list',
    'list-index',

    // Timeline
    'timeline',

    // Tabs
    'tabs',

    // Panel
    'panel',

    // Card
    'card',

    // Chip
    'chip',

    // Form Components
    'form',
    'input',
    'checkbox',
    'radio',
    'toggle',
    'range',
    'stepper',
    'smart-select',

    // Grid
    'grid',

    // Pickers
    'calendar',
    'picker',

    // Page Components
    'infinite-scroll',
    'pull-to-refresh',
    'lazy',

    // Data table
    'data-table',

    // FAB
    'fab',

    // Searchbar
    'searchbar',

    // Messages
    'messages',
    'messagebar',

    // Swiper
    'swiper',

    // Photo Browser
    'photo-browser',

    // Notifications
    'notification',

    // Autocomplete
    'autocomplete',

    // Tooltip
    'tooltip',

    // Gauge
    'gauge',

    // Skeleton
    'skeleton',

    // Menu
    'menu',

    // Color Picker
    'color-picker',

    // Tree View
    'treeview',

    // VI Video Ads
    'vi',

    // Elevation
    'elevation',

    // Typography
    'typography',
  ],
  darkTheme: true,
  themes: [
    'ios',
    'md',
    'aurora',
  ],
  themeColor: '#007aff',
  colors: {
    red: '#ff3b30',
    green: '#4cd964',
    blue: '#2196f3',
    pink: '#ff2d55',
    yellow: '#ffcc00',
    orange: '#ff9500',
    purple: '#9c27b0',
    deeppurple: '#673ab7',
    lightblue: '#5ac8fa',
    teal: '#009688',
    lime: '#cddc39',
    deeporange: '#ff6b22',
    gray: '#8e8e93',
    white: '#ffffff',
    black: '#000000',
  },
};

module.exports = config;
