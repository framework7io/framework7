/**
* F7 Build Configuration
* Don't modify this file!
* If you want to build custom version of F7, just put build-config-custom.js with the required configuration in this folder
*/

const config = {
  target: 'universal',
  rtl: false,
  components: [
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

    // Typography
    'typography',
  ],
  themes: [
    'ios',
    'md',
  ],
  ios: {
    themeColor: '#007aff',
    colors: {
      red: '#ff3b30',
      pink: '#ff2d55',
      purple: '#9c27b0',
      deeppurple: '#673ab7',
      indigo: '#3f51b5',
      blue: '#007aff',
      lightblue: '#5ac8fa',
      cyan: '#00bcd4',
      teal: '#009688',
      green: '#4cd964',
      lightgreen: '#8bc34a',
      lime: '#cddc39',
      yellow: '#ffcc00',
      amber: '#ffc107',
      orange: '#ff9500',
      deeporange: '#ff5722',
      brown: '#795548',
      gray: '#8e8e93',
      bluegray: '#607d8b',
      white: '#ffffff',
      black: '#000000',
    },
  },
  md: {
    themeColor: '#2196f3',
    colors: {
      red: '#f44336',
      pink: '#e91e63',
      purple: '#9c27b0',
      deeppurple: '#673ab7',
      indigo: '#3f51b5',
      blue: '#2196f3',
      lightblue: '#03a9f4',
      cyan: '#00bcd4',
      teal: '#009688',
      green: '#4caf50',
      lightgreen: '#8bc34a',
      lime: '#cddc39',
      yellow: '#ffeb3b',
      amber: '#ffc107',
      orange: '#ff9800',
      deeporange: '#ff5722',
      brown: '#795548',
      gray: '#9e9e9e',
      bluegray: '#607d8b',
      white: '#ffffff',
      black: '#000000',
    },
  },
};

module.exports = config;
