# Change Log

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
  