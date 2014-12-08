# Change Log

## Framework7 v0.10.0 - Updated on December 8, 2014
  * Fixed issue with messages scrolling when adding new message
  * Fixed issue with positioning of dynamic navbar elements

## Framework7 v0.9.9 - Updated on December 7, 2014
  * Virtual List
    * Now it is possible to use multiple Virtual Lists on same page
    * Fixed issue with muliple columns and wrong list height on iOS 7
  * Smart Select
    * Generated Smart Select page/popup can be used with Virtual List by adding `data-virtual-list="true"` and `data-virtual-list-height="44"` attributes to Smart Select. 
  * Panels
    * Fixed issue with swipe panel with specified `swipePanelActiveArea` parameter
    * New app parameter `swipePanelOnlyClose` allows to close panels with swipe without `swipePanel`
  * Modals
    * New `verticalButtons` modal parameter to enable vertical buttons layout
  * Accordion
    * Better support for nested accordions
    * Fixed issue when its content becomes invisible on Android devices
  * Router
    * New App and View `allowDuplicateUrls` parameter (disabled by default) that allows loading of pages with same urls
    * Fixed issues with DOM manipulation with enabled `domCache`
  * Dom7
    * Now Dom7 can parse and create DOM elements from string, like `var div = $$('<div></div>')`
    * Better width/height calculationg in `.width()` and `.height()` methods
    * Support for JSON declaration of attributes and propeties in `.attr()` and `.prop()` methods
  * Template7
    * Updated to latest Template7 version with new support of Global context, that could be specified using `Template7.global` property and used as `@global` keyword in templates
  * Pull To Refresh
    * New `app.destroyPullToRefresh()` method to destroy/disable PTR on page
    
## Framework7 v0.9.8 - Updated on November 2, 2014
  * Virtual List
    * New component that allows to render lists with huge amount of items without loss of performance.
  * Swipeouts
    * Improved performance and fixes issues that could cause app crashes
    * Fixed issue with `swipeoutNoFollow`
    * Compatibility with Virtual List
  * Searchbar
    * Better calculation for input field width with "Cancel" button
    * Send .focus() on search field after tap on clear (x) icon
    * Compatibility with Virtual List
  * Infinite Scroll
    * Compatibility with Virtual List
  * Sortable
    * Compatibility with Virtual List
  * Smart Select
    * Close smart select popup when use data-back-onselect attribute
    * New attributes (data-form-theme, data-navbar-theme) and new app parameters (smartSelectFormTheme, smartSelectNavbarTheme) to control color theme on smart select page/popup
  * Messages
    * New `label` property for `app.addMessage()` method to specify message label
  * Action Sheet
    * Added `bg` property for button to specify button background color
  * Slider
    * Fixed issues with loop and autoplay when slider jumps over slides
    * Fixes issue with focusing form elements in slides
  * Swipe Back
    * `swipeBackPageBoxShadow` App/View parameter renamed to `swipeBackPageAnimateShadow`
    * New app parameter `swipeBackPageAnimateOpacity` that allows to control back page opacity during swipe back
  * App
    * `externalLinks` parameter now accepts string with CSS selector of external links
  * Navbar / Toolbar
    * New app methods `app.show/hideNavbar(navbar)`, `app.show/hideToolbar(navbar)` to show and hide navbar and toolbar/tabbar
    * Now, tab bar can also be hidden by scroll by adding "hide-tabbar-on-scroll" class to page-content or using `hideTabbarOnPageScroll` parameter
    * Fixed issues with disappearing navbar when using domCache
  * Pages
    * Page data object now has additional `context` property with passed context when using Template7 Pages
  * View
    * `linksView` parameter now also supports another View instance
    * New reload behavior with new `reloadPages: true` parameter. In this mode View will always reload currently active page without loading new one
  * Popover
    * Fixed "angle" position on edge screen position


## Framework7 v0.9.7 - Updated on October 7, 2014
  * Slider
    * Now supports continuous loop mode with `loop:true` option
    * New `onlyExternal` option to disable swipes
    * Fixed issue when `slidesPerView` is more than actual amount of slides
  * Photo Browser
    * Renamed enable/disable exposition methods to `.enableExposition` and `.disableExposition`
    * Also supports continuous loop mode with option `loop:true`
    * Added support for images lazy loading with new available options: `lazyLoading`, `lazyLoadingInPrevNext`, `lazyLoadingOnTransitionStart`
    * New template `photoLazyTemplate` parameter for lazy laoding images layout
    * Now it also supports pan and zoom for `<svg>` and `<canvas>`
  * Smart Select
    * Now could be opened in Popup instead of Page with configuration using new related App parameters `smartSelectInPopup`, `smartSelectPopupCloseTemplate`, `smartSelectPopupCloseText`
    * Smart select element supports new additional attributes `data-open-in` (to open in popup or in page) and `data-popup-close-text` (to sepcify popup's close button text)
  * Messages
    * New message element `message-label`
    * Fixed bubbles masks on iOS 8 devices with none retina screens
    * `app.updateMessagesAngles` renamed to `app.updateMessagesLayout`
    * Each messages now supports additional classes `message-hide-avatar`, `message-with-tail`, `message-hide-name`, `message-hide-label`
    * Auto set tails and hide/show avatars and names now requires for additional `messages-auto-layout` class on `messages` container
  * Searchbar
    * Fixed `disalbeSearch` and `enableSearch` events
  * Pull To Refresh
    * Fixed issue when there is no navbar on PTR page
  * Icons
    * Reworked `icon-bars` for none retina screens
  * Navbars/Toolbars
    * Now, can be hidden automatically when scrolling content (`page-content`). Could be enabled by adding `hide-bars-on-scroll` or `hide-navbar-on-scroll` or `hide-toolbar-on-scroll` additional classes on `page-content`. Or by setting app parameters: `hideNavbarOnPageScroll`, `hideToolbarOnPageScroll`, `showBarsOnPageScrollEnd`
  * Template7
    * Template7 updated to v1.0.1
      * Now supports helpers without context
      * New method `.unregisterHelper` to remove helper
    * `<script type="text/template7">` templates could be automatically precompiled by setting `precompileTemplates` App parameter. They will be accessable as properties of `Template7.templates` object
    * Template7 is integrated to app router so now you can use Template7 templates in Ajax- or Dynamically-loded pages. It is configurable with new App parameters: `template7Pages`, `template7Data` or using `data-template`, `data-context` and `data-contextName` attributes on links
  * Pages
    * New page events `pageBack`, `pageAfterBack` and `pageReinit` and new page callbacks: `back`, `afterBack` and `reinit`
  * Router
    * New App/View parameter `uniqueHistoryIgnoreGetParameters` to treat urls like "about.html" and "about.html?id=1" as the same url
    * New App parameter `dynamicPageUrl` to set URL rule for dynamically loaded pages
    * Router loading methods are highly reworked
      * `.goBack()` method is renamed to just `back()`
      * All page router methods are reworked and now moved to `.router` View property and has 2 main methods:
        * `view.router.load(options)` - to load page
        * `view.router.back(options)` - to go back in navigation
      * Also there are shortcut methods:
        * `view.router.loadPage()`
        * `view.router.reloadPage()`
        * `view.router.reloadPreviousPage()`
        * `view.router.loadContent()`
        * `view.router.reloadContent()`
        * `view.router.reloadPreviousContent()`
        * `view.router.refreshPage()`
        * `view.router.refreshPreviousPage()`
        * `view.router.back()`
      * `options` object now supports the following properties: `url`, `content`, `force`, `reload`, `reloadPrevious`, `ignoreCache`, `pushState`, `animatePages`, `pageName`, `template`, `context`, `contextName`
      * The same options are supported for links as `data-` attributes
    * Support for Inline Pages by enabling `domCache` View' parameter 
      * Now, Dom cache allows to use Inline Pages in Framework7. So you may set up all your pages in single file, where you need to add `cached` class to initialy hidden pages and navbar inners
      * Such pages could be loaded with usual links by using `<a href="#{pageName}">` format
  * Examples
    * 2 new examples to show how to handle "Inline Pages" and "Template7 Pages"




  
## Framework7 v0.9.6 - Updated on September 12, 2014
  * Template7
    * Now Framework7 comes with its own template engine - Template7. Which has totally the same syntax as Handlebars, but a way faster in templates compilation and rendering, especially in mobile Safari (up to 4 times faster!)
    * It is now globally available in window as `Template7` function
  * Modals
    * App's `modalTemplate` and `modalActionsTemplate` now accept Template7 html template string
  * Swipeouts
    * Totally reworked swipeouts layout (not compatible with previous F7 versions) and behavior to make them like in iOS 8. Now they could be on both sides (on left or/and right) and support overswipe to immediately trigger action without click on action button
  * Status bar overlay now detected correctly on iPhone 6 and 6 plus
  * Slider
    * New .update() method to update slides, positions, sizes, pagination if you add slides dynamically
    * New onTransitionStart/End callbacks parameters
    * Totally prevent click events and custom handlers when `preventClicks` enabled
  * Accordion
    * Now triggers "open", "opened", "close", "closed" events
  * Action Sheet
    * Now could be automatically converted to Popover on iPad if you call it with new two-arguments syntax .actionSheet(target, buttons)
  * Pull To Refresh
    * Pull to refresh content receives additional "pull-down" class when pulled down
    * Fixed issues on iOS 8
  * Fast Clicks
    * New "Active state" feature to make :active state behavior like in apps not like in web. With two additional App parameters: `activeState` and `activeStateElements`. It is enabled by default
    * Now fast clicks could be disabled on some specific element with "no-fastclick" class
    * New `fastClicksDistanceThreshold` app parameter to set distance threshold to prevent short taps 
    * Fixed issue with input:file
  * Dom7
    * Support to add event listeners with "capture", so the full syntax now is `.on(eventName, target, listener, capture)` or `.on(eventName, listener, capture)`
    * New `.once` method to add event listener that should be executed only once
    * JSONP requests now support "error" callback and script load timeout
  * Notifications
    * Prevent .onClick callback function when user clicks on "close" icon
  * Highly reworked App router:
    * New `uniqueHistory` App/View initialization parameter, that will remove duplicate pages from View history and from DOM
    * Now, there will be only one page in View's DOM if `swipeBackPage` and `preloadPreviousPage` App/View parameters are set to `false`
    * New View's `.loadPage(options)` method that accepts object with options: `animatePages`, `ignoreCache`, `url`, `content`, `forceUrl`, `reload`, `reloadPrevious`
    * New View's `.goBack(options)` method that accepts object with options: `animatePages`, `ignoreCache`, `url`, `content`, `forceUrl`, `reload`, `reloadPrevious`
    * Links now also support these options as data- attributes, like `<a href="#" data-animatePages="true" data-ignoreCache="true" ... >`
    * New View's .loadPage's shortcuts methods: 
      * `.loadPage(url)` - load page by specified url
      * `.loadContent(content)` - load page with specified content
      * `.reloadPage(url)` - reload currenly active view's page from specified URL
      * `.reloadPreviousPage(url)` - the same but for previous (left) view's page
      * `.reloadContent(content)`  - reload currenly active view's page with passed HTML content
      * `.reloadPreviousContent(content)` - the same but for previous (left) view's page
      * `.refreshPage()` - refresh currenly active view's page from specified URL
      * `.refreshPreviousPage()` - the same but for previous (left) view's page
  * Tab bar
    * New additional classes `tabbar-labels-fixed` and `tabbar-labels-through` (for Views, View, Pages and Page) for pages with tab bar to set required bottom padding on `page-content`
  * ToDo7 / Weather7 apps updated with support of new swipeouts and now they use Template7 for templating

## Framework7 v0.9.5 - Updated on August 15, 2014
  * Colors
    * Now Framework7 supports color themes: 10 default iOS colors (red, green, blue, lightblue, gray, white, black, orange, yellow, pink) that can be applied to any interactive elements (icons, links, buttons, form elements)  
    * There are also introduced layout themes (with additional framework7.themes.css file) which contains 2 additional layout themes: dark and white. These themes change look of whole app.
  * Core
    * Links support additional "with-animation" class name to force animation if it is disabled in App/View parameters
    * Reworked `allowPageChange` flag. Now it is linked to View. This allows to load pages in multiple Views at the same time
  * View
    * New `onSwipeBackMove` callback function parameter that will be executed during swipe back
    * Also triggers `swipebackmove` event during swipe back
  * Dom7
    * Dom7 is totally restructured, now it is a global Window function and can be accessible from everywhere
    * New `.scrollLeft(left, duration)`, `.scrollTo(left, top, duration)` methods
    * Fixed issue with multiple JSONP requests at the same time
    * `.removeClass` now will remove "class" attribute if class name is not passed as argument
  * Custom build
    * Included missed Pull To Refresh' css styles
  * Styles
    * Half-pixel iOS 8 borders are available only for retina iOS screens
    * Fixed list view items borders on nested lists and accordions
  * Device API
    * `html` also has "retina" class on HiDPI screens
  * Panels
    * Resolved conflict with swipe panel and swipeouts
    * New `swipePanelCloseOpposite` app parameter that also allows to close opposite panel with swipe
    * Fixed multi touch issue
  * Content block
    * Now can be inset with additional `inset` and `tablet-inset` classes
  * Messages/Message Bar
    * Fixed crashes on iOS 8
    * Message Bar has additional `data-max-height` attribute to set its max grow height
  * Photo Browser
    * New `onOpen`, `onClose`, `onSwipeToClose` callback functions parameters
    * New `ofText` parameter allows customisation of "of" word in photos counter "3 of 5"
    * Fixed next/prev icons opacity when there is only one photo browser slide
    * Resolved z-indexes conflict with Popup
    * Fixed panning ability on Android
  * Smart Select
    * Smart select's `<option>` now support additional `data-option-icon` and `data-option-image` attributes to set appropriate media element on opened Smart select page
    * `data-backtext`, `data-pagetitle`, `data-backonselect` attributes are changed to `data-back-text`, `data-page-title`, `data-back-onselect`
  * Icons
    * Checkbox and radio icons images now moved to CSS with SVG
  * Fast Clicks
    * Automatically trigger blur on form inputs on Android when it is required
  * Pull To Refresh
    * New `app.pullToRefreshTrigger` method to trigger pull to refresh manually
    * Improved scrolling performance on long lists
    * Fixed issue with continuous browser repaint because of preloader animation
    * Fixed Android's "lost focus" bug
  * Grid
    * Now grid is responsive, and number of columns could be changed on Phone/Tablet with additional class like `.col-50.tablet-33`
  * Tabs 
    * Tabs links now support more complex layout, now each tab's link could be placed in different Dom parts and on different level
  * Pages
    * `pageData` now has additional `swipeBack` property within pageBefore/AfterAnimation callback to detect that page was animated after swipe back
    * `pageData` now has additional `navbarInnerContainer` property with related Navbar inner (only for Dynamic Navbar)
  * Action Sheet
    * Action Sheet button doesn't support "red" property anymore. Now it supports "color" property where you may specify any of 10 default colors
  * Lot of minor fixes

### 0.9.5 Breaking changes!
  * Icons now haven't color name in class, there are no more "icon-back-blue", "icon-bars-blue", etc. Now they are just "icon-back", "icon-bars", etc. Their color could be changed with introduced color themes.
  * Badges don't support additional badge-red/green/etc. classes anymore. Their color could be changed with introduced color themes
  * There is no more `app.allowPageChange` flag. Now this flag is linked to each View
  * Because of Dom7 now globally available, the `Framework7.$` dom export is now deprecated and will be removed in next release
  * Smart select `data-backtext`, `data-pagetitle`, `data-backonselect` attributes are changed to `data-back-text`, `data-page-title`, `data-back-onselect`
  

## Framework7 v0.9.4 - Updated on July 26, 2014
  
  * New Framework7 grunt custom library builder where you can include only required components
  * Half-pixel (0.5px) borders in iOS 8 for list views, navbars, toolbars, modals, etc.
  * Core
    * New "statusbarOverlay" parameter to overwrite automatic statusbar overlay detection
  * Searchbar
    * Now it may consider and hide item-dividers and grouped list if nothing found there with two new App's options: searchbarHideDividers and searchbarHideGroups. By default, they are enabled (true)
  * Smart Select 
    * Now it consider and doesn't output "disabled" options and will not be opened if it has "disabled" class or attribute
  * Dom7 
    * New .removeAttr(attrName) method to remove attribute
    * Now it is possible to detach live event listeners with the same "live" syntax `$('something').off('click', '.target', listener)`
  * Icons
    * New "icon-camera" (in message bar) and "icon-plus" icons
  * Views
    * New "url" parameter to specify View's default (startup) URL
  * Tabs
    * Now it is possible to swith multiple tabs with single tab-link by using "data-tab" attribute instead of "#" href attribute
  * Modals
    * New "tablet-fullscreen" class on Popup to make fullscreen popup in iPad

## Framework7 v0.9.3 - Updated on July 20, 2014
  
  * New Accordion component
  * New Login Screen component
  * Messages 
    * Avatars now hide/show with transition
    * Fixes white space wrap along long-words messages
  * Views 
    * New "no-swipeback" class for .page to prevent Swipe Back on this page
  * Grid
    * Grid reworked to flex-box layout
  * Fast Clicks
    * Improved behavior on form fields
  * Slider
    * New "onOppositeTouchMove" callback
  * Photo Browser
    * New "swipeToClose" parameter that allows to close photo browser on swipe up/down

## Framework7 v0.9.2 - Updated on July 12, 2014

  * New Message Bar component to be used with messages
  * Totally reworked Messages, now they support avatar and user name
  * Core:
    * New "externalLinks" (array) parameter to set custom external links
    * New "cacheIgnoreGetParameters" parameter to ignore caching for same urls with different GET parameters
    * New "pushStateRoot" parameter that allow to use PushState with empty pushStateSeparator
  * Smart Select:
    * Support for "optgroup" tag which will be converted do list dividers on smart select page
    * Support for "multiple" attribute that will convert radios to checkboxes on smart select page
    * New "smartSelectBackOnSelect" option that will close Smart Select page when user choose item
  * Modals:
    * New Login Modal available by myApp.modalLogin() method
    * New Password Modal available by myApp.modalPassword() method
    * New "close-popover" class for links to close popover
    * New .onClick(modal, index) callback function for custom Modal that receives index number of clicked button
  * Searchbar:
    * New option to specify "found" and "not-found" containers using data-searchbar-found and data-searchbar-not-found attributes
  * Dom7:
    * .next() and .prev() methods now support matching selector as an argument
    * New .scrollTop(position, duration) method for animated scroll on element or to get element's scroll top position if no arguments passed
  * Page Callbacks API:
    * Support for "*" page name value to trigger callback for all pages
  * Photo Browser
    * Videos support with &lt;video&gt; or within embedded iframes
    * Captions
    * New syntax to define photos, not it could be array of objects with "url" and "caption" properties
    * New Photo Browser parameters: captionsTheme, expositionHideCaptions, captionsTemplate, captionTemplate, objectTemplate
  * View:
    * New .activePage property that contains pageData of currently active page
  * Styles:
    * New disabled styles for elements with "disabled" class or attribute
  * Fixes:
    * Fixed issues with caching of Dynamic content
    * Fixed swipeouts when they are in hidden tabs
    * Corrected z-index relations between modals, overlays and status bar overlay

## Framework7 v0.9.0 - Updated on June 28, 2014

  * Full RTL support for right to left languages (Arabic, Hebrew)!
  * New Page callbacks API
  * Smart Select: configurable page title and back link text via data-pagetitle and data-backtext attributes, new smartSelectBackText app parameter
  * Dom7: new .prop(prop, value) method to set/access HTMLElement properties (checked, disabled, etc.)
  * Search Bar: improved search for items that don't match to "search-in"; new "enableSearch", "disableSearch", "clearSearch" events
  * Slider: support for fractional slidesPerView value
  * Improved behavior of nested Views
  * New ".tablet-inset" class for List Views to make them inset only on tablets (iPad)
  * Navbar: fixed layout with only "right" element
  * Changed preloader's CSS animation name to prevent conflicts with Font Awesome

## Framework7 v0.8.8 - Updated on June 21, 2014

  * New App and View option to disable page animations - "animatePages:false"
  * Improved behavior of Notifications
  * Improved performance of Swipeouts
  * Fixed Ajax loading when using ajaxLinks parameter
  * Slider: prevent unnecessary clicks during touch move
  * Preprocess now has new parameter - next(content) callback function to continue page loading from asynchronous thread
  * Plugins API: new "swipePanelSetTransform" plugins hook; now it is possible to preprocess content by plugin
  * Push State: new "pushStateNoAnimation" and "pushStateSeparator" app parameters
  * Reset styles for "input[type=datetime-local]"

## Framework7 v0.8.7 - Updated on June 15, 2014

  * New Notifications component
  * New Search Bar component
  * Slider: autoplay feature; fixed styles for nested sliders
  * Dom7: fixed .off method to remove multiple events; new .nextAll and .prevAll methods
  * Device API: new "gt-" (greater than) iOS version classes on HTML element
  * Smart Select: now inherits no-navbar/toolbar props from page; now available with Search Bar
  * Pluigns API: new 'pageBeforeRemove' plugin hook
  * Separate overlays for Modals (modal, action sheet, popover) and Popups
  * Reset styles for "input[type=number]"

## Framework7 v0.8.6 - Updated on May 31, 2014

  * New Infinite Scroll component
  * New Plugins API
  * Slider: prevent links clicks during swipe
  * Swipeout: new "swipeout" callback which returns opened progress
  * Views: swipeBackPage App parameters could be overwrited for View
  * Views: totally reworked to Classes
  * Navbar: dynamic navbars now triggers 'navbarInit' event when added to DOM
  * Tabs: new method app.showTab(tab) to switch tabs programmatically

## Framework7 v0.8.5 - Updated on May 24, 2014

  * Many minor fixes 

## Framework7 v0.8.4 - Updated on May 17, 2014

  *  New Slider component
  *  New Photo Browser component
  *  New arguments for predefined Modals (Alert, Confirm, Prompt) - myApp.alert(text, title, callbackOk, callbackCancel) 
  *  "X-Requested-With: XMLHttpRequest" header for non crossdomain Ajax requests
  *  "cacheIgnoreList" app parameter renamed to "cacheIgnore"
  *  New transitional/animated Tabs
  *  New "pageBeforeRemove" Page callback
  *  Fixed swipe-panels when swiping during opened Modal/Overlay
  *  Removed Rails distributive
  *  New $.getTranslate(el, axis) DOM7 helper
  *  Lot of minor fixes and improvements

## Framework7 v0.8.2 - Updated on May 8, 2014

  *  Automatically submit forms using Ajax with additional "ajax-submit" and "ajax-submit-onchange" classes on form
  *  New Ajax DOM lib methods $.ajax(), $.get(), $.post(), $.getJSON()
  *  New DOM lib util $.serializeObject(obj)
  *  Ability to use Messages with new messages on top
  *  "cacheIgnoreList" app parameter to add array of URLs that should not be cached
  *  New app.support object with features detection
  *  Fix for submit button on iOS

## Framework7 v0.8.0 - Updated on May 2, 2014

  * Sortable lists
  * Disable caching for specific pages with "nocache" parameter in URL
  * New "swipePanelActiveArea" parameter to allow swipe panels on specific distance from side of screen
  * Totally reworked internal FastClicks library
  * "device" object moved to Framework7.prototype for easy access before app intialization
  * New DOM7 methods - .insertAfter()
  * Fixed/improved DOM7 methods - .data(), .html(), .css()
  * Better animation sync for dynamic navbar and pages
  * New "viewClass", "viewMainClass", "viewsClass" parameters allow to have custom classes on Views

## Framework7 v0.7.8 - Updated on April 27, 2014

  * pushState, FastClicks improvements
  * Allow modal without title
  * New .data() DOM7 method
  * Fix styles for popup with statusbar overlay

## Framework7 v0.7.7 - Updated on April 24, 2014

  * pushState navigation
  * line-height fix for textarea

## Framework7 v0.7.6 - Updated on April 19, 2014

  * Lot of new shortcut methods for DOM7 library: click(), blur(), focus(), focusin(), focusout(), keyup(), keydown(), keypress(), submit(), change(), mousedown(), mousemove(), mouseup(), mouseenter(), mouseleave(), mouseout(), mouseover(), touchstart(), touchend(), touchmove(), resize(), scroll()
  * New .eq() DOM7 method
  * fixed navbar/toolbar vertical alignment

## Framework7 v0.7.5 - Updated on April 18, 2014

  * Swipe panels
  * Forms Storage
  * Preprocess Ajax content with "preprocess" callback parameter
  * Cross-browser checkbox switch
  * Fixes for navbar resizing

## Framework7 v0.7.4 - Updated on April 12, 2014

  * Smart selects
  * Smarter Ajax parser to parse files with different few pages in different views
  * Removed deprecated onPageInit/onPageBeforeInit callbacks from app and view
  * Refactored pages.js structure to bring mutual methods
  * Animated navbar’s left back icon when ".left" is ".sliding"
  * Fixed and improvements

## Framework7 v0.7.2 - Updated on April 11, 2014
  
  * improved dist/ app
  * small improvements and fixes in form elements

## Framework7 v0.7.1 - Updated on April 10, 2014

  * "show" event on active tab
  * fix for status bar detection
  * check for proper params in addView
  * size navbar on tab "show"

## Framework7 v0.7.0 - Updated on April 9, 2014
  
  * new fast clicks library
  * .tap() method removed and deprecated!
  * domCache to keep prev pages in view
  * dynamically generated popup and popover
  * improved device object
  * selectors engine available via Framework7.$
  