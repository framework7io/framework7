/**
 * F7 Build Configuration
 * Don't modify this file!
 * If you want to build custom version of F7, just put build-config-custom.js with the required configuration in this folder. Or build it using command line:
 * $ npm run build-core:prod -- --config path/to/config.js --output path/to/output/folder
 */

const config = {
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

    // Color Picker
    'color-picker',

    // Tree View
    'treeview',

    // WYSIWYG Editor
    'text-editor',

    // Pie Chart
    'pie-chart',

    // Area Chart
    'area-chart',

    'breadcrumbs',

    // Typography
    'typography',
  ],
  darkTheme: true,
  lightTheme: true,
  themes: ['ios', 'md'],
};

module.exports = config;
