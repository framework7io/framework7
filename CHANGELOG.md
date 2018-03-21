# Change Log

## [v1.7.0](https://github.com/framework7io/framework7/compare/v1.6.5...v1.7.0) - March 21, 2018
  * Full iPhoneX support and required tweaks. Automatic support for top and bottom safe areas (for portrait orientation). For landscape orientation the following classes must be added to elements:
    * `ios-edges` - for full-width elements (like main View)
    * `ios-edge-left` - for elements that stick to the left edge of the screen (like left Panel)
    * `ios-edge-right` - for elements that stick to the right edge of the screen (like right Panel)
  * Dom7
    * Added `beforeCreate` callback for `.ajax` method
  * Minor fixes

## Framework7 v1.6.5 - Updated on September 7, 2017
  * Searchbar will remove accents (removeDiacritics: true) by default now
  * Fix issue with wrong element selected when scrolling on iOS
  * Data Table header "select all" checkbox will now only select checkboxes in same columns
  * Added `timeline` to custom build
  * Update Dom7 to latest version addresing issue with throwing error in cordova "resume" event (when there is no event target)
  * Update Template7 to latest version:
    * Fixed issue with not being able to access parent context `../`
    * `js_compare` helper has been renamed to `js_if` helper. `js_compare` is still available for backwards compatibility
    * Added support for `@index`, `@first`, `@last`, `@key`, `@root`, `@global` variables to `js` and `js_if` helpers
    * Added support for parent access (e.g. `../title`)  to `js` and `js_if` helpers
    * Added support for parent data access within loops, e.g. `../../@index`
  * Minor fixes

## Framework7 v1.6.4 - Updated on May 31, 2017
  * Fixed issue with Dom7 and Template7 being missing when using bundler

## Framework7 v1.6.3 - Updated on May 30, 2017
  * Dom7
    * Added missing shortcut methods `click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll`

## Framework7 v1.6.2 - Updated on May 29, 2017
  * Virtual List
    * New `renderExternal` callback parameter that allows to render DOM items using some custom method. Useful in case it is used with Vue plugin to pass DOM rendering and manipulation to Vue
  * Pull To Refresh
    * Fixed issue with its destory method when used in multiple tabs on single page to destroy it only in specified tab
  * Autocomplete
    * Fixed issues with not being used `valueProperty` on input
  * iOS
    * A bit improved page transitions performance using fake opacity layer instead of changing opacity of whole page
  * Dom7
    * Now it is used as a standalone library from https://github.com/nolimits4web/Dom7
    * New `Dom7.extend(obj1, obj2, ...)` method to clone/extend objects
    * Proxified events. Now all events are being added/removed using proxy functions. This allows to pass additional arguments to events handlers and detach all assigned event listeners by calling e.g. `$$(document).off('someEvent');`

## Framework7 v1.6.0 - Updated on April 10, 2017
  * New Data Table component
  * Lazy Loading
    * Lazy image placeholder can be specified in `src` image attribute
    * New callbacks in app parameters: `onLazyLoad`, `onLazyLoaded`, `onLazyError`
  * Panels
    * Fixed issues with swipe panels
  * Modals
    * New `popoverCloseByOutside` parameter to define wheter popover should be closed on outside (overlay) click or not. Enabled by default
  * Minor fixes

## Framework7 v1.5.4 - Updated on March 13, 2017
  * Panels
    * A bit reworked Panels layout/styling in favor of`translate` CSS property. May required small CSS fixes after update if you have changed panels sizes
    * Panels Breakpoints. Two new app parameters `panelLeftBreakpoint` and `panelRightBreakpoint` where you can specify minimal width to make panels always visible
  * Fixed Chrome issue that now treats most of touch events as "passive"
  * Autocomplete
    * New `autoFocus` parameter to open standalone autcomplete and auto focus search field
    * New `openWithAnimation` parameter (enabled by default) brings option to open standalone autocomplete without animation (if required)
  * Forms
    * `formFromData` now fires "change" events on form fields
  * iOS theme
    * Fixed issue on Chrome with invisible range slider thumb
  * Material theme:
    * Better support for bottom Toolbar/Tabbar
    * Navbars/Toolbars now have shadows by default. Use additional "no-shadow" class on navbar/toolbar to disable shadow on it
    * Status Bar height increased to 24px in Material theme
    * Theme color is also applicable to Status Bar overlay for Material theme
  * Swiper updated to latest 3.4.2 version
  * Lot of minor fixes

## Framework7 v1.5.3 - Updated on February 10, 2017
  * Autocomplete
    * New Standalone autocomplete parameter `requestSourceOnOpen` (`false`/disabled by default). Will request source on autocomplete open if enabled
    * New Dropdown autocomplete paremter `highlightMatches` parameter (`true`/enabled by default)
    * Fixed issues with special characters in Dropdown autocomplete
  * Fixed status bar overlay positioning when app root element is used
  * Smart Select
    * Added `data-display-as` attribute on option to display selected option value differently
  * Dom7
    * `.append` method now supports multiple arguments (elements) to append
    * `.each` methods will now stop iteration if you do `return false`
    * Improved `.parseUrlQuery` behavior
    * All XHR errors will now also trigger `complete` events/callback
  * Navbars/Toolbars
    * `.hideNavbar`, `.showNavbar`, `.hideToolbar`, `.showToolbar` methods now accepts boolean parameter to define whether it should be animated or not. By default it will be hidden/shown with animation (as before)
  * Panels
    * `.openPanel(position, animated)` and `.closePanel(animated)` now accepts additional `animated` parameter that defines whether the panel should be opened/closed with animation or not. Enabled (with animation) by default
    * Now swipe panels trigger additional `panel:swipe` event during touch swipe
    * Click on panel overlay will now trigger additional `panel:overlay-click` event on currently opened panel before it will be closed
  * Modals
    * All modal methods now also support new `animated` parameter that defines whether the modal should be opened/closed with animation or not. Enabled (with animation) by default:
      * `.actions(target, params, animated)`
      * `.popover(modal, target, removeOnClose, animated)`
      * `.popup(modal, removeOnClose, animated)`
      * `.pickerModal(modal, removeOnClose, animated)`
      * `.loginScreen(modal, removeOnClose, animated)`
      * `.closeModal(modal, animated)`
    * New app parameter `modalsMoveToRoot` (`true`/enabled by default). When enabled it will move opened modal to the app root element (or body) if it is not there on the moment of opening and move back after modal closed. It allows to use modals inside of loaded pages
  * Searchbar
    * Now it passes `previousQuery` to the `search:clear` event data (or `onClear` callback)
  * Tabs
    * `.showTab(tab, animated)` now accepts additional `animated` parameter that defines whether the tab should become visible with animation or not. Actual for animated and swipeable tabs. Enabled (with animation) by default
  * View
    * Now views support names with new `name` property on View initialization with `.addView` method and can be accessed later by same named property of `app.views`
  * Virtual List
    * Now it has default render template (if not passed anything to `template` or `renderItem` parameters)
    * New `emptyTemplate` parameter to specify template when no empty data is passed
  * Lot of minor fixes

## Framework7 v1.5.2 - Updated on December 17, 2016
  * **New Timeline Component**
  * **Renamed Events**
    * All events are renamed and lowercased to match related components, now all events looks like `page:init`, `page:reinit`, `page:beforeremove`, `popup:open`, `modal:closed`, `accordion:open`, `panel:close`, etc. This can be a breaking change so the old events are still supported/triggered
  * Virtual List
    * Fixed issues with Virtual List not triggered Infinite Scroll
  * Dom7
    * `.val()` method for multiple select now returns array of selected values
    * `serializeObject` now keeps empty object properties as empty values
  * Panels
    * Fixed issue when `swipePanelActiveArea` was ignored when using `swipePanel: 'both'`
  * Fast Clicks
    * Fixed issue with custom click event on input:file
  * Swiper updated to latest 3.4.1 version
    * Fixed Zoom for RTL
    * Improved slideToClickedSlide behavior when loop is enabled
  * Template7 updated to latest 1.1.4 version
    * Fixed issue with quotes being added to helpers hash content
  * Lot of minor fixes

## Framework7 v1.5.0 - Updated on November 8, 2016
  * App Root
    * New `root` app parameter to specify app root element, by default is `'body'`. Useful when using F7 with libraries like Vue or React that doesn't allow to bind app to the body.
  * **Icons**
    * Brand new [Framework7 Icons](https://github.com/nolimits4web/Framework7-Icons) font with lot of precious and designed from scratch iOS icons
    * Default "Form" icons removed in favor of using F7 or Material icons fonts instead
  * **Vue.js** support (beta) with official [Framework7 Vue](https://github.com/nolimits4web/Framework7-Vue) plugin
  * **Animate7** (beta) - new built-in animation helper library to help with custom animation. Also avaialble as Dom7 method
    * `Animate7(elements, properties, parameters)`
    * `Dom7(elements).animate(properties, parameters)`
    ```js
    Animate7('#animate-me',
      {
        height: 200,
        width: 100
      },
      {
        duration: 400,
        easing: 'swing',
        complete: function () {
          console.log('Animation completed')
        }
      }
    )
    ```
  * iOS Theme
    * iOS 10 style Notifications
    * iOS 10 style Messagebar
    * Notifications in iOS theme now doesn't support more than one notification at a time
  * Chips
    * Now also supported by iOS theme to keep consistency with Material theme
  * Floating Action Button
    * Now also supported by iOS theme to keep consistency with Material theme
  * Messages
    * New `scrollMessages` parameter to enable/disable messages autoscrolling when adding new message. Enabled (`true`) by default
    * New `scrollMessagesOnlyOnEdge` parameter to autoscroll messages only when user is on top/bottom of the messages view. Disabled (`false`) by default
    * Added "message-date" element for message bubble for iOS theme to keep consistency with Material theme messages
  * Hairlines
    * New `no-hairlines` and `no-hairlines-between` classes for list-blocks and content-blocks to remove block hairlines and hairlines between list items
  * Forms
    * `formToJSON` renamed to `formToData` method. `formToJSON` is still supported for compatibility
    * `formFromJSON` renamed to `formFromData` method. `formFromJSON` is still supported for compatibility
  * Color Themes
    * `.colors.css` stylesheets are refactored to make higher priority for `color-` rules over `theme-` rules
    * Color preloaders now also supported by iOS theme with all default colors by adding `preloader-[color]` or `color-[color]` class, e.g. `preloader-green` or `preloader-orange` etc.
  * Sortable
    * `sort` event now receives additional `event.detail` object with `startIndex` and `newIndex` properties of sorted element
  * Photo Browser
    * Added `pinch to zoom` support for Android
  * Panels
    * Now it supports both left and right panels to be swipeable by setting `swipePanel: 'both'`
  * Tabs
    * Tab that becomes inactive will also trigger `hide` event
  * Swipeout
    * New `swipeoutRemoveWithTimeout` app parameter. By default is `false`. When specified, then framework will remove element after `0` timeout instead of immediately. Useful to enable if you use another library like Vue or React to manage (remove) swipeout items
  * Router
    * Page data and Navbar data are not available anymore in `BeforeRestroy` events
    * `.router.load` method supports new `pageElement` parameter to specify page HTMLElement to load if it is already added to the `.pages` container manually or by different means/library
    * Added context cache for pages rendered with Template7 to keep context when navigating deep in history and then going back
    * New `routerRemoveWithTimeout` app parameter. By default is `false`. When specified, then framework will remove element after `0` timeout instead of immediately. Useful to enable if you use another library like Vue or React to manage (remove) pages
    * Now you can keep dynamic navbar inside of page when loading pages dynamically (not inline pages) and router will place it automatically to the correct place. It helps to keep consistency with Material theme page layout
  * Dom7
    * New `.siblings(selector)` method to select all previous and next elements
    * New `.empty()` method to clear element inner HTML
    * New `.removeDiacritics(text)` helper method to remove/replace diacritics in passed text
  * Fast Clicks
    * New `fastClicksExclude` app parameter to specify elements not handled by fast clicks
    * Fixed issue with not-working `<select>` element on Android
    * Fixed issue with text selection on Android
  * Touch
    * Now framework uses passive event listeners for touch events in many components to improve scrolling performance on mobile devices
  * Template7 update to latest 1.1.3 version:
    * Added number, boolean, and single-quote-strings argument types support for template helpers
    * Ability to use single/double quotes in helpers and mix them
  * Swiper update to latest 3.4.0 version:
    * New **zoom** functionality that enables double tap and pinch to zoom slide's inner image:
      * Required slide layout for zoom:
        ```
        <div class="swiper-slide">
          <div class="swiper-zoom-container">
            <img src="path/to/image">
          </div>
        </div>
        ```
      * New zoom parameters:
        * `zoom` - enable zoom functionality
        * `zoomMax` - maximum image zoom multiplier, by default is `3`
        * `zoomMin` - minimum image zoom multiplier, by default is `1`
        * `zoomToggle` - enable/disable zoom-in by slide's double tap
      * `zoomMax` can be also overridden for specific slide by using `data-swiper-zoom` attribute
    * New `swiper.enableTouchControl()` and `swiper.disableTouchControl()` methods to enable disable touch control (it toggles `onlyExternal` parameter)
    * New `swiper.realIndex` property in addition to `swiper.activeIndex` that returns index of active slide considering loop
    * New methods `s.unsetGrabCursor()` and `s.setGrabCursor()` to enable/disable grab cursor
    * Draggable Scrollbar now works when `simulateTouch:false `
    * New `normalizeSlideIndex` parameter to improve work of controller (see #1766)
    * `lazyLoadingInPrevNextAmount` now works with `slidesPerView: 'auto'`
    * New `passiveListeners` parameter to use passive event listeners to improve scrolling performance on mobile devices. Enabled by default
    * New `freeModeMomentumVelocityRatio` parameter to control moment velocity
    * Now it is possible to specify autoplay delay for every (or specific) slides by using `data-swiper-autoplay` attribute on them
    * Lazy loading now also respects `sizes` responsive images attribute
    * New `touchReleaseOnEdges` parameter to release touch events on slider edge position (beginning, end) and allow for further page scrolling
    * Multirow (slidesPerColumn) support for vertical direction, which is in this case becomes multicolumn
    * `paginationBulletRender` now accepts `swiper` instance as a first argument, `paginationBulletRender(index, className)` -> `paginationBulletRender(swiper, index, className)`
  * Lot of minor fixes and improvements

## Framework7 v1.4.2 - Updated on February 27, 2016
  * Material Theme
    * Added colors support for speed dial buttons
  * Push State
    * New `pushStateOnLoad` app parameter (by default is `true`) allows to disable first push state navigation on app load
    * `preventPushStateOnLoad` app parameter that is used to block initial and falsy `popstate` event in Safari, has been removed now in favor of another fix
  * Autocomplete
    * Fixed issue with dropdown autocomplete not being opened on Androids
    * Fixed issue with standalone autocomplete searchbar overlay on iOS
    * More standalone autocomplete exposed properties: `page`, `pageData`, `searchbar` with search bar instance
  * Router
    * Now it will save URL query for inline page which was ignored before, for URLs like `#about?foo=bar`
    * A bit more imporved positioning for Dynamic navbar elements animation
  * Dom7
    * New `.closest(selector)` method to find elements matching specified selector starting from the element itself
    * `.text()` method is now "chainable"
  * Grid
    * More sizes added. Now all available sizes for columns are: 5, 10, 15, 20, 25, 30, 33, 35, 40, 45, 50, 55, 60, 65, 66, 70, 75, 80, 85, 90, 95, 100
  * Modals
    * Now it is supported to pass `HTMLElement` into `.popup`, `.popover` and `.pickerModal` methods
  * Swiper updated to latest 3.3.1 version:
    * New 3D Flip effect. Can be enabled with `effect: 'flip' parameter
    * New types of pagination with new parameters:
      * `paginationType` - type of pagination. Can be `'bullets'` (default) or `'fraction'` or `'progress'` or `'custom'`
      * `paginationFractionRender(swiper, currentClass, totalClass)` - custom function to render "fraction" type pagination
      * `paginationProgressRender(swiper, progressbarClass)` - custom function to render "progress" type pagination
      * `paginationCustomRender(swiper, current, total)` - custom function to render "custom" type pagination
    * New `lazyLoadingInPrevNextAmount` parameter allows to lazy load images in specified amount of next/prev slides
    * New `autoplayStopOnLast` parameter (`true` by default) tells to autoplay should it stop on last slide or start from first slide
    * New `onAutoplay(swiper)` callback
    * New `uniqueNavElements` parameter. If enabled (by default) and navigation elements' parameters passed as the string (like `.pagination`) then Swiper will look for such elements through child elements first. Applies for pagination, prev/next buttons and scrollbar
    * New `onPaginationRendered` callback. Will be fired after pagination elements generated and added to DOM
    * New `.reLoop()` method, which combines `.destroyLoop()` + `.createLoop()` methods with additional positioning fixes. Useful to call after you have changed `slidesPerView` parameter, it will dynamically recreate duplicated slides required for loop
    * New `.nextButton` and `.prevButton` properties with Dom7 element with next/prev button HTML element
  * Forms
    * New `app.destroyResizableTextarea()` method to destroy resizable textarea
  * Numerous minor fixes and improvements

## Framework7 v1.4.0 - Updated on December 7, 2015
  * New mobile-friendly "Autocomplete" component. Comes with 2 modifications as Dropdown or Standalone autocomplete
  * New "Progress Bar" component. Includes 3 different types of progress bar for each theme: "Determinate", "Indeterminate" and "Indeterminate Multi-color"
  * New "Swipeable Tabs" component which allows you to change Tabs by swiping left/right
  * Material Theme
    * Fixed issue with Notifications closing without animation in webkit browsers
    * New "Scrollable Tabbar" Tabbar modification. Allows to swipe/scroll through tab links if they all don't fit into view
    * New "Bottom Toolbar" Toolbar modification. It allows to use Toolbar on the bottom of screen instead of only on the top
    * New "Speed dial" Floating Action Button transition when it shows additional action buttons by tapping on it
    * New "Popover Morph" Floating Action Button transition when it morphs to Popover by tapping on it
    * Reworked "Preloader" in favor of plain HTML elements animation instead of SVG which has visual issues on "slow" devices.
      * `materialPreloaderSvg` parameter is deprectated and replaced with the new one `materialPreloaderHtml`
  * Dom7
    * Added option to trigger multiple events using space separated syntax `.trigger('event1 event2 event3')`
  * Calendar
    * Fixed Calendar dates ordering on iOS in Date Range Picker mode
  * Swiper updated to latest 3.2.7 version:
    * New "Auto Height" mode when container/wrapper adopts to the height of currently active slide. Can be enabled with `autoHeight: true` parameter
    * Numerous minor improvements
  * Custom Build
    * Added "progressbar" and "autcomplete" modules
  * Numerous minor fixes and improvements

## Framework7 v1.3.5 - Updated on November 8, 2015
  * Material Theme:
    * Fixed issue with not disappearing "ripples" in hidden elements
    * Fixed Searchbar color when using color themes
    * New "Chips" component
  * Calendar
    * New Date Range Picker mode, can be simple enabled by passing `rangePicker: true` parameter
    * "Date range"-type parameter now accepts mixed types (single date + date range)
  * Push State
    * Fixed issue for dynamic pages loaded with passing DOM directly
    * Fixed issue with Push State on start from inline-pages
    * Imporved behavior with empty `pushStateSeparator` and `pushStateRoot`
  * Virtual List
    * New `showFilteredItemsOnly` parameter to show filtered items only when using filter
  * Modals
    * Reworked overlay's z-indexes
  * Router
    * Added support for passing DOM content in `preprocess` callback
    * Fixed issue with `page.query` getting lost for deep Inline pages navigation
  * Dom7
    * Added support for XHR `DELETE`, `OPTIONS` and `PATCH` methods
    * `$.serializeObject` now serialize deep objects and arrays
  * Swiper updated to latest 3.2.0 version:
    * Added responsive breakpoints support using new `breakpoints` parameter. Now you can specify different `slidesPerView` and other similar parameters for different sizes
    * New callbacks: `onSlideNextStart`, `onSlideNextEnd`, `onSlidePrevStart`, `onSlidePrevEnd`
    * Minor fixes
  * Numerous minor fixes and improvements

## Framework7 v1.3.1 - Updated on October 12, 2015
  * Fixed issue with not showing "Cancel" button in Searchbar
  * Fixed issue with Modal without buttons (liek Preloader modal)

## Framework7 v1.3.0 - Updated on October 10, 2015
  * iOS Theme
    * New appearence to match new iOS 9 design, mostly for Overlays: Modal, Popover and Action Sheet
    * Support for new San Francisco font:
      * For desktops - using San Francisco font that can be downloaded from https://developer.apple.com/fonts/
      * For iOS - using system San Francisco font
    * Fixed issue with switch toggle in RTL layout
  * Material Theme
    * `dynamicNavbar` will be disabled automatically for this theme
    * Added `no-ripple` class to disable ripple effect on specific elements
    * Fixed issue with floating labels with predefined values
    * Fixed behavior of hidden toolbars/tabbars
    * Fixed issue in RTL layout for tab bar
  * Smart Select
    * App's `smartSelectInPopup` parameter is removed
    * Added new app's `smartSelectOpenIn` parameter. Can be `page`, `popup` or `picker`. By default is `page`
    * Added option to open it in picker:
      * Using `data-open-in="picker"` attribute or `smartSelectOpenIn` app's parameter
      * Picker close button text can be specified:
        * Using `data-picker-close-text` attribute
        * New app's `smartSelectPickerCloseText` parameter. By default is `Done`
      * Smart Select picker height can be controlled using `data-picker-height` attribute
    * Added support for none-standard `maxlength` attribute on `<select>` element to limit amount of selected items for "multiple" select
  * Dom7
    * New `prependTo(parent)` method to prepend element to parent
    * New `appendTo(parent)` method to append element to parent
    * Ajax: added support for data types different from "text", like "arraybuffer" and others
    * `$.serializeObject` method now supports deep objects with objects and arrays
  * Swipeout
    * Now overswipe-button will have additonal "swipeout-overswipe-active" class during overswipe
    * New `data-close-on-cancel="true"` attribute for "swipeout-delete" buttons with `data-confirm` to close swipeout element in case of user canceled confirm dialog
  * Photo Browser
    * Double tap to zoom now zooms to the tapped position, not only to the center of picture
  * Messagebar
    * Now when you type new message it will scroll messages pages to bottom only in case if you are in the bottom of this page
  * Picker
    * Added `closeByOutsideClick` parameter to close picker automatically when you click outside of related input or picker. By default is `true`
    * Now it will set related input's value on initialization with specified value
  * Calendar
    * Added `closeByOutsideClick` parameter to close picker automatically when you click outside of related input or picker. By default is `true`
    * Now it will set related input's value on initialization with specified value
    * New `disabled` parameter to specify additional "disabled" days
    * New `events` parameter to specify dates with "events" (will be marked with additional dots)
    * New `rangesClasses` parameter to easily add custom classes to specified dates
  * Pull To Refresh
    * New events `pullstart`, `pullmove`, `pullend` and `refreshdone`
  * Forms
    * Better cross-browser support for `input[type="range"]` element
  * Virtual List
    * Fixed issue with size and scroll calculating when initialized in hidden tab
    * Fixed issue with size and scroll calculating when used not in page
  * Searchbar
    * Fixed issue with close button when initialized in hidden tab
  * Lazy Loading
    * Fixed issue with lazy loading in hidden tab
  * Template7 update to latest 1.1.0 version:
    * Fixed access to data (`@index`, `@key`) and root context (`@root`) in partials
    * Fixed `null` variables not to be outputed
  * Swiper updated to latest 3.1.7 version:
    * Fixed issue with wrong slides fill when number of slides less than `slidesPerView * slidesPerColumn` with `slidesPerColumnFill: 'row'`
    * Added support for images `srcset` with lazy loading using `data-srcset` attribute
    * Fixed new Chrome errors with `WebkitCSSMatrix`
    * Fixed issue with `slideToClickedSlide` with `loop` and `centeredSlides`
    * New `freeModeMinimumVelocity` parameter to set minimum required touch velocity to trigger free mode momentum
    * Ability to make the Scrollbar draggable using new paramaters:
      * `scrollbarDraggable` - (boolean) by default is `false`. Allows to enable draggable scrollbar
      * `scrollbarSnapOnRelease` - (boolean) by default is `false`. Control slider snap on scrollbar release
  * Router
    * Now precompiled/cached tamplates will be ignored in case of `ignoreCache: true` parameter
    * Fixed issue with `domCache` when going back with `force:true` to home page
  * Lot of minor fixes and improvements

## Framework7 v1.2.0 - Updated on July 18, 2015
  * New full featured Material theme designed according to Google guidelines
  * New Material-specific App' parameters:
    * `material` - should be set to `true` to enable Material-specific JS logic
    * `materialPageLoadDelay` - option to add page loading delay (in ms)
    * `materialPreloaderSvg` - HTML code for Material preloader
    * `materialRipple` - option to enable Material-specific touch ripple effect (enabled by default)
    * `materialRippleElements` - list of elements to apply touch ripple effect
  * New CSS files structure
    * All color-specific styles (color themes) are moved to separate `*.colors.css` file
    * `*.themes.css` file has beend removed and its content merged into `*.colors.css` file
    * Each theme has its own CSS files:
      * `framework7.ios.css` - main styles for iOS theme
      * `framework7.ios.colors.css` - color-specific styles for iOS theme
      * `framework7.ios.rtl.css` - RTL layout styles for iOS theme
      * `framework7.material.css` - main styles for Material theme
      * `framework7.material.colors.css` - color-specific styles for Material theme
      * `framework7.material.rtl.css` - RTL layout styles for Material theme
  * Kitchen Sink has been splitted into two platform specific Kitchen Sinks
  * Material theme breaking changes:
    * Material theme doesn't support Dynamic Navbar
    * Material theme doesn't support Through-type layout for Navbars/Toolbars
    * A bit different layout for Checkboxes/Radios (check Kitchen Sink examples)
    * Notifications are now displayed as so called Snackbars & Toasts
    * Toolbar/Tabbar is now on the top of the page, under the Navbar
  * Photo Browser
    * Photo Browser main template changed to Template7 template
  * Smart Select
    * Fixed issue with using of optgroup with only one option with Virtual List enabled
  * Calendar
    * Fixed issue with wrong date formatting
  * Notifications
    * New global `notificationCloseButtonText` and local `closeButtonText` parameters for button on notifcation (toast) (Used in material theme only)
  * Swipeout
    * Fixed issue with none closing swipeout using a fast swipe
  * Forms
    * New Resizable textareas
    * All form icons are converted to SVG
  * Pull To Refresh
    * Fixed "jumping" effect during multi-touch pull on iOS
  * RTL
    * Fixed issue with back pages navigation
  * Swiper updated to latest 3.1.0 version:
    * Accessibility (a11y)
      * Fixed issue with wrong buttons labels
      * Added support for pagination bullets
      * New accessibility parameter for pagination label `paginationBulletMessage: 'Go to slide {{index}}'`
    * Controler
      * New parameter `controlBy` which can be 'slide' (by default) or 'container'. Defines a way how to control another slider: slide by slide or depending on all slides/container (like before)
      * Now controllers in `controlBy: 'slide'` (default) mode will respect grid of each other
    * Pagination
      * New `paginationElement` parameter defines which HTML tag will be use to represent single pagination bullet. By default it is `span`
    * New `roundLengths` parameter (by default is `false`) to round values of slides width and height to prevent blurry texts on usual resolution screens
    * New `slidesOffsetBefore: 0` and `slidesOffsetAfter: 0` (in px) parameters to add additional slide offset within a container
    * Correct calculation for slides size when use CSS padding on `.swiper-container`
    * Fixed issue with not working onResize handler when swipes are locked
    * Fixed issue with "jumping" effect when you disable `onlyExternal` during touchmove
    * Fixed issue when slider goes to previos slide from last slide after window resize
  * Custom builder will build both iOS and Android specific CSS files
  * Lot of minor fixes and improvements

## Framework7 v1.0.7 - Updated on June 20, 2015
  * Dom7
    * New `.removeData(key)` method to remove element data
    * New `.filter(func)` method to filter elements collections
    * Now initial XHR request parameters are available in `xhr.requestParameters` property
  * Push State
    * Fixed issues in FireFox/IE when going back produces infinite transition to first page in history
  * Searchbar
    * Fixed issue with not fully active Search Bar when using `customSearch:true`
    * `searchbarHideDividers` and `searchbarHideGroups` parameters are moved from global app parameters to Searchbar instance parameters
    * Now support callback parameters on initialization: `onSearch`, `onEnable`, `onDisable`, `onClear`
    * Searchbar instance has new `.query` property with current seaarch query
  * Accordion
    * Fixed issue when using Accordion with media lists
  * Messages
    * Improved "auto-scroll" behavior when adding new message
  * Photo Browser
    * Fixed issues with `onSlideChangeStart`, `onSlideChangeEnd` callbacks which actually were `onTransitionStart`, `onTransitionEnd`
    * Added support for Swiper's `onTransitionStart`, `onTransitionEnd` callbacks
  * Color Themes
    * Now `border-@color` class will set correct border color on elements that use pseudo-elements (:after, :before) as a borders
  * Overlays
    * Now pages and navbars in modals/popups should be initialized as normal pages on overlay open/creation
  * Template7 updated to latest 1.0.6 version:
    * Partials support:
        * `registerPartial(name, template)` method to register partial
        * `unregisterPartial(name, template)` method to unregister partial
        * `>` helper to include partials like `{{> list}}`
    * New `escape` helper for escaping strings
  * Swiper updated to latest 3.0.8 version:
    * Fixed issue with wrong active index and callbacks in Fade effect
    * New mousewheel parameters:
      * `mousewheelReleaseOnEdges` - will release mousewheel event and allow page scrolling when swiper is on edge positions (in the beginning or in the end)
      * `mousewheelInvert` - option to invert mousewheel slides
    * Fixed issue with lazy loading in next slides when `slidesPerView` > 1
    * Fixed issue with resistance bounds when swiping is locked
    * Fixed issue with wrong slides order in multi-row mode (when `slidesPerColumn` > 1)
    * Fixed issue with not working keyboard control in RTL mode
    * Fixed issue with nested fade-effect swipers
  * Lot of minor fixes

## Framework7 v1.0.6 - Updated on May 1, 2015
  * Dom7
    * Improved performance for `outerWidth` and `outerHeight` methods
    * `.serializeObject` method will apply encode uri to serialized string
  * Searchbar
    * Fixed search when using groups
    * New option `removeDiacritics` to remove/replace diacritics characters (á, í, ó, etc.) during search
  * Push State
    * New `pushStatePreventOnLoad` option to prevent pop state on app load
  * Navbars / Toolbars
    * New option `showBarsOnPageScrollTop` to show bars when scoll page to top
  * View
    * More swipe back callbacks/events on View: `swipebackmove` -> `swipeBackMove`, `swipeBackBeforeChange`, `swipeBackBeforeReset`, `swipeBackAfterChange`, `swipeBackAfterReset`
  * Calendar, Picker
    * Fixed issues when `input` is not specified
  * Grid
    * New auto layout columns (equal width) with `col-auto` class
  * Swiper updated to latest 3.0.7 version:
    * New `width` and `height` parameters to force Swiper size, useful when it is hidden on intialization
    * Better support for "Scroll Container". So now Swiper can be used as a scroll container with one single "scrollable"/"swipeable" slide
    * Added lazy loading for background images with `data-background` attribute on required elements
    * New "Sticky Free Mode" (with `freeModeSticky` parameter) which will snap to slides positions in free mode
    * Fixed issues with lazy loading
    * Fixed slide removing when loop mode is enabled
    * Fixed issues with Autoplay and Fade effect
  * Custom Build
    * Fixed issues with not working custom build
  * Lot of minor fixes

## Framework7 v1.0.5 - Updated on March 28, 2015
  * Dom7
    * `$.camelCase` utilite renamed to `$.toCamelCase`
    * `.removeAttr()` method now returns current Dom7 collection
    * All response statuses that are between 200 and 300 will fire "success" callback/event
  * Fast Clicks
    * Fixed issue whith removing "Active state" when using `fastClicksDistanceThreshold`
    * Fixed issues with multiple clicks on Android < 4.4
    * New Tap Hold Event
      * It is can be used (if enabled) as usual event on any element like `$('.something').on('taphold', handler)`
      * It is controled by new App parameters
        * `tapHold: false` - set to true to enable tap hold events
        * `tapHoldDelay: 750` - how long (in ms) the user must hold their tap before the taphold event is fired on the target element
        * `tapHoldPreventClicks: true` - if enabled (by default), then click event will not be fired after tap hold
  * Navbar
    * Dynamic Navbar now has some events similar to page events: `navbarReinit`, `navbarBeforeInit`, `navbarInit`, `navbarBeforeRemove`. Each event `detail` contains:
      * `navbar` - object with related navbar elements `navbarContainer` and `navbarInnerContainer`
      * `page` - object with related page data
  * Action Sheet
    * Each button support new additional `disabled` parameter to make button disabled
    * Added "Action Sheet To Popover" template that can be changed using App's `modalActionsToPopoverTemplate` parameter
  * Messages
    * New methods to handle messages:
      * `messages.removeMessage(message)` - remove message
      * `messages.removeMessages(messages)` - remove multiple messages per once
      * `messages.addMessages(newMessages, method, animate)` - add multiple messages per once
    * The following methods have new additional `animate` argument that allows to add new messages immediately without any transition and page scrolling
      * `messages.addMessage(message, method, animate)`
      * `messages.appendMessage(message, animate)`
      * `messages.prependMessage(message, animate)`
    * New `messages` initialization parameter that allows to pass initial messages using JS on initialization
  * Template7 update to latest 1.0.5 version:
    * Support for root context that may be used in templates as `{{@root.someVar}}`
    * Improved support for paths:
        * Support to access arrays directly by index `{{someArray.2}}`
        * Better support for context "level up" `{{../../../someVar}}`
    * New JS helpers with direct JS execution:
        * `{{js "this.price * 2"}} - inline helper to modify/check context on the fly or do some JS calculations
        * `{{#js_compare "this.price > 1000"}}Too expensive{{/js_compare}} - block helper for easier compares of variables
  * Swiper updated to latest 3.0.6 version:
    * Fixed sometimes wrong slides position when using "Fade" effect
    * `.destroy(deleteInstance, cleanupStyles)` method now has second `cleanupStyles` argument, when passed - all custom styles will be removed from slides, wrapper and container. Useful if you need to destroy Swiper and to init again with new options or in different direction

## Framework7 v1.0.4 - Updated on March 21, 2015
  * Router
    * `preprocess` callback parameter now also supported by View on its initialisation which could overwrite `preprocess` app' parameter (if specified)
    * New `preroute(view, options)` callback parameter which is supported by App and View on their initialisation. This callback allows to prevent default router load/back action and to load another page or do another required actions
  * Swipeout
    * Fixed issue with not opening swipeout after incomplete transition
    * Fixed issue with triggering overswipe action on mobiles
  * Messages
    * New method `messages.clean()` - to clean/remove all the messages
  * Calendar
    * Fixed issues with years switch when using min/maxDate which didn't allow to return to the current year
    * New parameter `onlyInPopover` (disabled by default). Enable it and Calendar will be always opened in Popover
  * Picker
    * New parameter `onlyInPopover` (disabled by default). Enable it and Picker will be always opened in Popover
    * Fixed issues with not-clickable "items" after using `col.replaceValues` method
  * Fast Clicks
    * Fixed issue that didn't allow to call click programmatically (using element.click()) after first synthetic click
  * Dom7
    * Added jQuery-like `$.each(object, callback)` method to iterate through Objects and Arrays
    * Added optional `callback` argument for `$.scrollTo/Top/Left` methods to be executed after scrolling completed. With the following arguments options:
      * `$.scrollTo(left, top, duration, easing, callback)`
      * `$.scrollTo(left, top, duration, callback)`
      * `$.scrollTop(top, duration, easing, callback)`
      * `$.scrollTop(top, duration, callback)`
      * `$.scrollLeft(top, duration, easing, callback)`
      * `$.scrollLeft(top, duration, callback)`
  * Swipe Back
    * Will automatically close any active Picker Modals
  * Searchbar
    * New `customSearch` parameter. When enabled searchbar will not search through any of list blocks specified by `searchList` and you will be able to use custom search functionality, for example, for calling external APIs with search results and for displaying them manually
    * Added ability to search in different places by passing a list of elements in `searchIn` parameters, for example: `searchIn: '.item-title, .item-text'`
  * View
    * New App method to get current (currently visible and active) View instance:
      * `myApp.getCurrentView(index)` - return currently active View. If there are few currently active views (as in split view layout), then you need to specify `index` number of View, otherwise this method will return an array with current Views
  * Push State
    * More strictly locked to main view only to prevent states from other views
  * Swiper updated to latest 3.0.5 version
      * New Keyboard accessibility module to provide focusable navigation buttons and basic ARIA for screen readers with new parameters:
      * `a11y: false` - enable accessibility
      * `prevSlideMessage: 'Previous slide'` - message for screen readers for previous button
      * `nextSlideMessage: 'Next slide'` - message for screen readers for next button
      * `firstSlideMessage: 'This is the first slide'` - message for screen readers for previous button when swiper is on first slide
      * `lastSlideMessage: 'This is the last slide'` - message for screen readers for next button when swiper is on last slide
    * New Emitter module. It allows to work with callbacks like with events, even adding them after initialization with new methods:
      * `.on(event, handler)` - add event/callback
      * `.off(event, handler)` - remove this event/callback
      * `.once(event, handler)` - add event/callback that will be executed only once
    * Plugins API is back. It allows to write custom Swiper plugins
    * New parameter `setWrapperSize` (be default it is `false`) to provide better compatibility with browser without flexbox support. Enabled this option and plugin will set width/height on swiper wrapper equal to total size of all slides
    * New `virtualTranslate` parameter. When it is enabled swiper will be operated as usual except it will not move. Useful when you may need to create custom slide transition
    * Added support for multiple Pagination containers
    * Fixed `onLazyImage...` callbacks
    * Fixed issue with not accessible links inside of Slides on Android < 4.4
    * Fixed pagination bullets behavior in loop mode with specified `slidesPerGroup`

## Framework7 v1.0.3 - Updated on March 7, 2015
  * Dataset
    * This could be a breaking change but all `data-` attributes, where used, now must be in hyphens-case instead of camelCase like in many places before. For example:
      * `data-animatePages` on links now should be `data-animate-pages`
      * `data-slidesPerView` on swiper now should be `data-slides-per-view`
      * etc.
  * Cards
    * Fixed margins when page contains cards only
  * Fast Clicks/Clicks
    * Fixed scroll prevention on overlays when `fastClicks:false`
  * SmartSelect
    * `data-back-onselect` renamed to `data-back-on-select`
    * Ability to add option color and additional class name using `data-option-color` and `data-option-class` attributes on `<option>`
    * New app method to add options dynamically using `app.smartSelectAddOption(selectElement, optionHTML, atIndex)`
    * Lower case search when using Smart Select with Virtual List and Searchbar
  * Virutal List
    * Fixed issues with Virtual List re initialization when using inline pages
  * Form elements
    * Reset styles for input[type="search"]
  * Searchbar
    * Searchbar reworked to standalone component/Class, that can be initialized with new `app.searchbar(searchbarElement, params)` method. Such method returns instances with useful methods and properties to get more control over Searchbar:
      * `searchbar.enable()` - to enable/activate searchbar
      * `searchbar.disable()` - to disable/deactivate searchbar
      * `searchbar.clear()` - to clear search query and update results
      * `searchbar.search(query)` - to search query
      * `searchbar.destroy()` - to destroy searchbar instance
      * `searchbar.input` - access to search text field HTML element
      * `searchbar.active` - property to know is it active or not
      * `searchbar.input` - access to search text field HTML element
      * `searchbar.searchList` - access to search list HTML element
      * `searchbar.container` - access to searchbar self HTML element
    * Also supports auto-initiliazation with additional "searchbar-init" class and passing parameters as `data-` attributes
    * Removed `app.destroySearchbar` method
  * Messagebar
    * Messagebar reworked to standalone component/Class, that can be initialized with new `app.messagebar(messagebarElement, params)` method. Such method returns instances with useful methods and properties to get more control over Messagebar:
      * `messagebar.textarea` - access to messagebar textarea HTML element
      * `messagebar.value(newValue)` - method to get/set messagebar value/text
      * `messagebar.clear()` - to clear messagebar textarea and update/reset its size
      * `messagebar.container` - access to messagebar self HTML element
      * `messagebar.destroy()` - to destroy messagebar instance
    * Also supports auto-initiliazation with additional "messagebar-init" class and passing parameters as `data-` attributes
    * Removed `app.destroyMessagebar` method
  * Messages
    * Messages reworked to standalone component/Class, that can be initialized with new `app.messages(messagesElement, params)` method. Such method returns instances with useful methods and properties to get more control over Messages:
      * `messages.container` - access to messages self HTML element
      * `messages.appendMessage(messageProps)` - add new message to the end
      * `messages.prependMessage(messageProps)` - add new message to the beginnging
      * `messages.addMessage(messageProps, method)` - add new message to the end or beginning depending on `newMessagesFirst` parameter
      * `messages.scrollMessages()` - scroll messages to top/bottom depending on `newMessagesFirst` parameter
      * `messages.layout()` - apply messages auto layout
      * `messages.destroy()` - to destroy messages instance
    * Also supports auto-initiliazation with additional "messages-init" class and passing parameters as `data-` attributes
    * Removed app method:
      * `app.addMessage`
      * `app.updateMessagesLayout`
      * `app.scrollMessagesContainer`
  * Router
    * Fixed issue with disabled pages animation and none dynamic navbar
  * Lazy Loading
    * Fixed issue with not working fade effect when `imagesLazyLoadSequential: false`
  * Popup
    * Fixed issue with flickering navbar during popup open/close animation
  * Photo Browser
    * Lazy Loading logic moved to Swiper's lazy loading
  * Sticky Titles
    * Fixed flickering hairline
  * Swiper updated to latest 3.0.4
    * New Parallax component for transitions with parallax effects on internal elements
    * New Images Lazy Load component
    * With new parameters `lazyLoading`, `lazyLoadingInPrevNext`, `lazyLoadingOnTransitionStart` (all disabled by default)
    * With new callbacks `onLazyImageLoad` and `onLazyImageReady`
    * `updateOnImages` ready split into 2 parameters:
      * `preloadImages` (by default is true) - to preload all images on swiper init
      * `updateOnImages` (by default is true) - update swiper when all images loaded
    * Fixed issues with touchmove on focused form elements
    * New `onObserverUpdate` callback function to be called after updates by ovserver
    * New `paginationBulletRender` parameter that accepts function which allow custom pagination elements layout
    * `watchVisibility` parameter renamed to `watchSlidesVisibility`
    * Fixed issue with not firing onSlideChangeEnd callback after calling .slideTo with runCallbacks=false
    * Fixed values of isBeginning/isEnd when there is only one slide
    * New `crossFade` option for fade effect
    * Improved .update and .onResize methods
    * Minor fixes
  * Dom7
    * New .dataset() method which returns data Object based on element `data-` attributes


## Framework7 v1.0.2 - Updated on February 22, 2015
  * Page Transitions
    * Highly improved page transitions and swipe back performance
  * FastClicks
    * Fixed issue with sometimes not working checkboxes on Androids
  * Icons
    * All inline SVG icons are now encoded for better support in IE
  * Photo Browser
    * Fixed "swipe-to-close" behavior
  * Pages
    * `pageData` now has additional `navbarInnerContainer` property with HTML container of related Navbar
  * Device API
    * New property `app.device.androidChrome` that indicates Chrome browser running on Android
  * Swiper update to latest 3.0.2
    * New callbacks
      * onInit (swiper)
      * onTouchMoveOpposite (swiper, e)
    * Fixed free mode momentum in RTL layout
    * `.update` method improved to fully cover what `onResize` do for full and correct update
    * Exposed `swiper.touches` object with the following properties: `startX`, `startY`, `currentX`, `currentY`, `diff`
    * New methods to remove slides
      * `.removeSlide(index)` or `.removeSlide([indexes])` - to remove selected slides
      * `.removeAllSlides()` - to remove all slides
  * Themes
    * Improved support for active tabbar icons and global theme colors
  * Sub Navbar
    * Improved animation/transition during swipe back action
  * Panels
    * Fixed issue with broken `swipePanelOnlyClose` parameter
  * Smart Select
    * Fixed small issue with "collapsed" (wtihout space between) values in item-after
  * Demo Apps
    * Demo apps removed from main repo to their own repositories on GitHub


## Framework7 v1.0.1 - Updated on February 13, 2015
  * FastClicks
    * Fixed issue with sometimes broken inertia scrolling on Androids
  * Swiper
    * Updated to latest version with bettwe suport in RTL layout with old-flexbox

## Framework7 v1.0.0 - Updated on February 6, 2015
  * Picker
    * New component that allows you to create custom overlay pickers which looks like iOS native picker
  * Calendar / Datepicker
    * New component, touch optimized calendar that provides an easy way to handle dates
  * Cards
    * New component. Cards, along with List View, is a one more great way to contain and orginize your information
  * Swiper
    * New component. Swiper is a powerful and most modern touch slider ever with super flexible configuration and lot, lot of features
  * Slider
    * Removed, replaced with Swiper
  * Lazy Load
    * New component. Lazy Load delays loading of images on page while they are outside of viewport until user scrolls to them
  * Sub Navbar
    * New component to be used in addition to Navbar. It is useful when you need to put any additional elements into Navbar, like Tab Links or Search Bar
  * Picker Modal
    * New type of Modals/Overlays, which allows to create custom picker overlays
  * Modals
    * New "Modals Stack" behavior. This feature doesn't allow to open multiple modals at the same time, and will automatically open next modal when you close the current one. Such behavior is similar to browser native alerts
  * Virutal List
    * Additional `dynamicHeightBufferSize` parameter to control buffer size on Virtual Lists with dynamic height
    * New `.scrollToItem(index)` method to scroll Virtual List to specified item
  * Navbars/Toolbars
    * Now it is possible not to hide Navbar/Toolbar on page scroll for selected pages using `dont-hide-navbar-on-scroll`, `dont-hide-toolbar-on-scroll`, `dont-hide-tabbar-on-scroll` classes
    * Navbars and toolbars support additional `no-border` class to remove hairlines from them
    * New app parameters to scroll page content to top:
      * `scrollTopOnNavbarClick` - set to `true` and clicking on navbar's "center" element will scroll active page to top
      * `scrollTopOnStatusbarClick` - set to `true` and clicking on "statusbar-overlay" will scroll active page to top
  * Dom7
    * Fixed `.text(value)` method when set new text content on multiple elements
    * Ajax methods
      * Global Ajax Setup. Now it is possible to set global options/headers for all Ajax requests
      * Support for timeout by using `timeout` option
      * `start` callback renamed to `beforeSend`
      * Returned `xhr` object in all requests will have additional custom `requestUrl` property with requested url
    * Utils
      * New `$.cancelAnimationFrame(frameId)` util method to cancel passed animation frame
      * `.scrollTo(left, top, duration, easing)`, `.scrollTop(top, duration, easing)`, `.scrollLeft(left, duration, easing)` methods now accept additional `easing` parameter, it can be "swing" or "linear" (by default, it is "swing")
    * New `.add()` method to add elements/collection to the current one
    * Fixed `.prevAll` and `.nextAll` methods when passed with selector
  * Forms
    * New `formFromJSON` and `formToJSON` events on forms that use Forms Storage
    * New `submitError` and `beforeSubmit` events to be used along with `submitted` event on Ajax Forms
  * Clicks / Fast Clicks
    * Now active/focused form elements (input, textarea, etc.) will be automatically blured on "click out"
    * Scrolling is now prevented on any kind of overlays (like modal-overlay, popup-overlay, etc.)
    * Links with `external` class and `target="_system"` attribute will be opened in system browser in Cordova apps
    * New `fastClicksDelayBetweenClicks` app parameter allows to set minimal delay (in ms) between clicks
  * Router
    * Router options object now supports new `query` property where you can pass page query
    * `pageData` now has additional `fromPage` property within pageData of previously active page
    * Fixed `context` property in `pageData` that could become empty in some situations
  * Device API
    * Now it also adds `pixel-ratio-` class to `<html>` with device pixel ratio
  * Messages
    * `.addMessage(props, messagesContent, addToTop)` method now accepts new arguments:
      * `messagesContent` (optional) to specify container with messages, useful if you have  multiple messages containers/pages at the same time
      * `addToTop` (optional) to specify should new message be appended or prepended
  * Messagebar
    * Support for additional `data-keyboard-height` to set additional padding on page content when using it with custom keyboards in Cordova app
  * Styles / Icons
    * All harilines reworked to `:after` and `:before` pseudo elements instead of usual CSS borders. Such method allows to have true 0.5px (for iOS Retina) and 0.33px (for iPhone 6 Plus) hairlines
    * New "forward" (`<i class="icon icon-forward"></i>`) icon to be used along with "back" icon (`<i class="icon icon-back"></i>`)
  * List View
    * Fixed "sticky titles" behavior when Navbar hidden by page scroll
  * Swipeout
    * All links/buttons/swipeout actions with additional `swipeout-close` class will close any opened swipeout element
    * `app.swipeoutOpen`, `app.swipeoutClose` and `app.swipeoutDelete` methods now support additional `callback` attribute that will be executed after swipeout open/close/delete
  * Searchbar
    * Now `data-search-in` attribute may be changed "on the fly" to dynamically change search field
  * Infinite Scroll
    * New option to trigger infinite scroll event on top of the page, could be enabled with additional `infinite-scroll-top` class on `infinite-scroll`
  * Smart Select
    * `item-after` element supports additional `smart-select-value` class, in this case Smart Select value will be set depending on "item-after" content  related to `<option>` with same text content, not `<option>` "value"
  * Pull To Refresh
    * Allows to configure trigger distance by stting `data-ptr-distance` attribute on `pull-to-refresh-content`. By default it is 44px
    * Fixed issue whith not animating (spinning) preloader on page with Pull To Refresh
  * Build
    * Build system (task manager) switched from Grunt to Gulp, because of much better performance

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
      * `.reloadPage(url)` - reload currently active view's page from specified URL
      * `.reloadPreviousPage(url)` - the same but for previous (left) view's page
      * `.reloadContent(content)`  - reload currently active view's page with passed HTML content
      * `.reloadPreviousContent(content)` - the same but for previous (left) view's page
      * `.refreshPage()` - refresh currently active view's page from specified URL
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

