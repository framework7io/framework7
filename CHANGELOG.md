<a href="https://www.patreon.com/vladimirkharlampidi"><img src="https://cdn.framework7.io/i/support-badge.png" height="20"></a>

# Change Log

# [v4.4.10](https://github.com/framework7io/framework7/compare/v4.4.9...v4.4.10) - July 29, 2019
  * Core
    * Device
      * Fixed `device-desktop` class

# [v4.4.9](https://github.com/framework7io/framework7/compare/v4.4.7...v4.4.9) - July 29, 2019
  * Core
    * Infinite Scroll
      * Fixed issue when destroying infinite scroll could detach all other `scroll` event listeners
    * Navbar/Toolbar
      * Fixed issue with enabled `hideNavbar/ToolbarOnScroll` could hide toolbar on nested elements scrolling
    * Device
      * On desktop `device.os` will contain `macos` or `windows` if it is running under these OS
  * Phenome
    * Card
      * Added `backdropEl` property to specify custom card backdrop

# [v4.4.7](https://github.com/framework7io/framework7/compare/v4.4.6...v4.4.7) - July 19, 2019
  * Core
    * Card
      * Fixed issue when `data-close-by-backdrop-click` was ignored
    * Sheet
      * New `sheet:stepprogress` and `sheetStepPropgress` events firing during swipe step
    * Inputs
      * New `--f7-input-padding-left` and `--f7-input-padding-right` CSS variables
      * New `--f7-textarea-height` CSS variable
    * Device
      * Fixed iOS 13 iPad detection when it is in desktop mode
    * View/Router
      * Fixed issue when `currentView` may not return View in tabs layout
      * Fixed issue when returning to previous page could block its scroll in iOS
    * Tooltip
      * Fixed issue when tooltip wasn't initialized if added dynamically with VDOM
  * Minor fixes

# [v4.4.6](https://github.com/framework7io/framework7/compare/v4.4.5...v4.4.6) - July 1, 2019
  * Core
    * Router
      * Fixed issue when loading detail page in (Master Detail) with `reloadAll` loaded only detail page

# [v4.4.5](https://github.com/framework7io/framework7/compare/v4.4.3...v4.4.5) - June 27, 2019
  * Core
    * Router
      * Improved Master-Detail behavior with `pushState` enabled
      * Fixed issue when routable modal template contains comments before actual template
      * Route `params` now url-decoded
    * Router Component
      * Fixed issue when Progressbar progress wasn't updated with `$setState`
  * Phenome
    * Page
      * Fixed issue with not correctly rendered preloader when infinite or ptr preloader property set dynamically
  * Minor tweaks and fixes

# [v4.4.3](https://github.com/framework7io/framework7/compare/v4.4.0...v4.4.3) - June 4, 2019
  * Core
    * Color Picker
      * New Hue-Saturation spectrum module (`hs-spectrum`)
      * New Brightness slider module (`brightness-slider`)
    * Router
      * Fixed issue when `beforeIn` page callback called before `beforeOut` of other page
    * Virtual List
      * Now it is possible to pass custom scrollable parent element with new `scrollableParentEl` parameter
  * Phenome
    * Range
      * New `name` prop to specify input's "name" attribute
    * Stepper
      * New `name` prop to specify input's "name" attribute
    * ListButton
      * Now also supports `tooltip` property to display tooltip
    * ListItem
      * Now also supports `tooltip` property to display tooltip
  * Minor fixes

# [v4.4.0](https://github.com/framework7io/framework7/compare/v4.3.1...v4.4.0) - May 13, 2019
  * Core
    * All new Treeview component 🎉
    * Popup
      * Added "swipe-to-close" feature
      * New `swipeToClose` parameter that will allow to close Popup with swipe
      * New `swipeHandler` parameter to specify swipe to close handler element
    * Sheet Modal
      * Added "swipe-to-close" feature
      * Added "swipe-to-step" feature
      * New `swipeToClose` parameter that will allow to close Sheet modal with swipe
      * New `swipeToStep` parameter that will allow to expand Sheet modal with swipe
      * New `swipeHandler` parameter to specify swipe to close handler element
      * New `stepOpen()`, `stepClose()` and `stepToggle()` sheet instance methods to open, close and toggle swipe step.
      * New `app.sheet.stepOpen()`, `app.sheet.stepClose()` and `app.sheet.stepToggle()` app sheet methods to open, close and toggle swipe step.
      * New `sheet:stepopen`, `sheet:stepclose` sheet DOM events
      * New `stepOpen`, `stepClose` sheet instance events
      * New `sheetStepOpen`, `sheetStepClose` app instance events
    * Autocomplete
      * Now it is possible to select dropdown values with keyboard UP and DOWN keys
      * Now it will close dropdown on ESC key
    * Checkbox
      * Added support for indeterminate checkboxes
    * Data Table
      * Now it uses indeterminate checkbox in head when some of the rows are selected
    * Range Slider
      * New `limitKnobPosition` boolean property to limit knob position to size of the bar. By default enabled for iOS theme
  * Phenome
    * Treeview
      * New `Treeview` and `TreeviewItem` components
    * Popup
      * Added "swipe-to-close" feature
      * New `swipeToClose` prop that will allow to close Popup with swipe
      * New `swipeHandler` prop to specify swipe to close handler element
    * Sheet Modal
      * Added "swipe-to-close" feature
      * Added "swipe-to-step" feature
      * New `swipeToClose` parameter that will allow to close Sheet modal with swipe
      * New `swipeToStep` parameter that will allow to expand Sheet modal with swipe
      * New `swipeHandler` parameter to specify swipe to close handler element
      * New `sheet:stepopen` (`sheetStepOpen`), `sheet:stepclose` (`sheetStepClose`) sheet events
    * Checkbox/ListItem
      * New `indeterminate` prop to make checkbox indeterminate
    * Range Slider
      * New `limitKnobPosition` boolean property to limit knob position to size of the bar. By default enabled for iOS theme
  * Minor fixes

# [v4.3.1](https://github.com/framework7io/framework7/compare/v4.3.0...v4.3.1) - April 29, 2019
  * Core
    * Range Slider
      * Fixed issue with vertical slider not working correctly with side swipes
    * Cards
      * Fixed issue with expandable cards glitches in iOS
      * Expandable card app parameters can now be set on each card individually with `data-` attributes: `data-animate`, `data-backdrop`, `data-swipe-to-close`, `data-close-by-backdrop-click`, `data-hide-navbar-on-open`, `data-hide-toolbar-on-open`
    * Router
      * Fixed missing reference to `pageFrom` in swipe-back data
      * Router component has new `$id` property
    * Touch
      * Now touch clicks threshold is configurable with `app.touch.touchClicksDistanceThreshold` parameter
  * Phenome
    * Card
      * Expandable card app parameters can now be set on each card individually with new props: `animate`, `hideNavbarOnOpen`, `hideToolbarOnOpen`, `swipeToClose`, `closeByBackdropClick`, `backdrop`
    * Navbar
      * Now it should return all children correctly when `inner: false` passed
  * Minor fixes

# [v4.3.0](https://github.com/framework7io/framework7/compare/v4.2.2...v4.3.0) - April 17, 2019
  * Core
    * Color Picker - all new modular Color Picker component 🎉
    * Auto Dark Theme
      * Now it can be set automatically based on user system color scheme preference (where supported). To enable `autoDarkTheme: true` must be passed to app init parameters
      * New `app.enableAutoDarkTheme()` to enable this feature manually (where supported)
      * New `app.disableAutoDarkTheme()` to disable this feature manually
    * Panel
      * Now side panels can be resizable 🎊. Requires `panel-resizable` class on panel element to enable
    * Device
      * New `prefersColorScheme()` that returns `dark` or `light` where supported, or `undefined` where not supported
    * Cards
      * Fixed issue whith "jumpy" layout when expandable card closes on iOS
    * Navbar
      * New `navbar:hide` and `navbar:show` events when navbar hidden/shown
      * New `navbar:collapse` and `navbar:expand` events when navbar collapsed/expanded to large title navbar
    * Popover
      * New `closeOnEscape` parameter to allow to close it when `ESC` keyboard key pressed (disabled by default)
      * New `backdropEl` parameter to pass custom backdrop element
      * Now it won't be closed on backdrop click if onscreen keyboard opened (requires cordova keyboard plugin)
      * Now it will be repositioned when onscreen keyboard opens and closes (requires cordova keyboard plugin)
      * Reworked/tweaked positioning in MD theme
    * Popup
      * New `closeOnEscape` parameter to allow to close it when `ESC` keyboard key pressed (disabled by default)
      * New `backdropEl` parameter to pass custom backdrop element
      * Now it won't be closed on backdrop click if onscreen keyboard opened (requires cordova keyboard plugin)
    * Actions
      * New `closeOnEscape` parameter to allow to close it when `ESC` keyboard key pressed (disabled by default)
      * New `backdropEl` parameter to pass custom backdrop element
      * Now it won't be closed on backdrop click if onscreen keyboard opened (requires cordova keyboard plugin)
    * Sheet
      * New `closeOnEscape` parameter to allow to close it when `ESC` keyboard key pressed (disabled by default)
      * New `backdropEl` parameter to pass custom backdrop element
      * Now it won't be closed on backdrop click if onscreen keyboard opened (requires cordova keyboard plugin)
      * Now it can be opened from top (instead of bottom) by adding `sheet-modal-top` class to sheet modal element
    * Stepper
      * Reworked RTL layout to be in same direction as in LTR
    * Request
      * Now it automatically set `Accept: 'application/json'` header when `dataType: 'json'` parameter passed
    * Touch
      * Fixed issue with not-removed touch-ripple with very fast clicks or multi-touch
    * Utils
      * New `utils.colorHsbToHsl(h, s, b)` method to convert HSB(V) color to HSL color
      * New `utils.colorHslToHsb(h, s, l)` method to convert HSL color to HSB(V) color
  * Phenome
    * Panel
      * New `resizable` prop to enable resizable panel
    * Navbar
      * New `navbar:hide`/`navbarHide` and `navbar:show`/`navbarShow` events when navbar hidden/shown
      * New `navbar:collapse`/`navbarCollapse` and `navbar:expand`/`navbarExpand` events when navbar collapsed/expanded to large title navbar
    * Popover
      * Added `backdrop` prop to enable/disable backdrop
      * New `closeOnEscape` prop to allow to close it when `ESC` keyboard key pressed (disabled by default)
      * New `backdropEl` prop to pass custom backdrop element
    * Popup
      * New `closeOnEscape` prop to allow to close it when `ESC` keyboard key pressed (disabled by default)
      * New `backdropEl` prop to pass custom backdrop element
    * Actions
      * Added `backdrop` prop to enable/disable backdrop
      * New `closeOnEscape` prop to allow to close it when `ESC` keyboard key pressed (disabled by default)
      * New `backdropEl` prop to pass custom backdrop element
    * Sheet
      * New `closeOnEscape` prop to allow to close it when `ESC` keyboard key pressed (disabled by default)
      * New `backdropEl` prop to pass custom backdrop element
      * New `position` prop, can be `top` or `bottom` (default) to define how to open Sheet
      * New `top` prop, alias for `position="top"`
      * New `bottom` prop, alias for `position="bottom"`
    * ListInput / Input
      * Now it accepts special type `colorpicker` to open color picker on focus
      * New prop `colorPickerParams` to specify color picker params for `colorpicker` type
    * SwipeoutButton
      * New `confirmTitle` prop to set confirm dialog title
  * Lots of minor fixes and improvements

# [v4.2.2](https://github.com/framework7io/framework7/compare/v4.2.0...v4.2.2) - April 4, 2019
  * Core
    * Smart Select
      * New `scrollToSelectedItem` parameter - when enabled it will scroll smart select content to first selected item on open (default `false`)
      * New `.scrollToSelectedItem()` smart select instance method to scroll smart select content to first selected item (when opened)
      * Now when opened in Popup, it will render Popup's close button as a plain text link on the right side in Navbar
    * Autocomplete
      * Now when opened in Popup, it will render Popup's close button as a plain text link on the right side in Navbar
    * Router
      * Fixed issue with swipe-back when used in Master-Detail layout
    * List Index
      * Fixed issue with wrong positioning when used with large navbar
  * Phenome
    * ListInput / Input
      * Now it accepts special type `datepicker` to open calendar on focus
      * New prop `calendarParams` to specify calendar params for `datepicker` type
    * Button
      * New `type` prop. If this prop is one of `submit`, `button` or `reset` then it will be rendered as `<button>` tag
  * Lots of minor fixes

# [v4.2.0](https://github.com/framework7io/framework7/compare/v4.1.1...v4.2.0) - March 20, 2019
  * All new Aurora theme! 🖥🎉
  * Core
    * New Appbar component
    * Button
      * New `button-round-aurora`, `button-raised-aurora`, `button-fill-aurora`, `button-small-aurora`, `button-large-aurora`, `button-outline-aurora` modifier classes for Aurora theme
    * Cards
      * Now it is possible to specify custom expandable card backdrop element with `data-backrop-el` attribute on card
    * Device
      * New `device.electron` property which is `true` when app runs in Electron environment
    * List Index
      * New `auroraItemHeight` parameter to specify item height in Aurora theme
    * Navbar
      * New `auroraCenterTitle` parameter (enabled by default) to position title at the center in Aurora theme.
    * Panel
      * New `app.panel.toggle(side, animate)` method to toggle (open or close) specified panel
      * New `panel.toggle(animate)` method to toggle (open or close) current panel
      * Support for `panel-toggle` class on links to toggle panels
    * Picker
      * New `mousewheel` parameter (enabled by default) to scroll picker values with mousewheel
      * New `updateValuesOnMousewheel` parameter (enabled by default) to updates picker and input values during mousewheel scrolling
    * Pull To Refresh
      * Added mousewheel support with additional `data-ptr-mousewheel="true"` attribute on PTR content element
    * Searchbar
      * New Inline Searchbar to fit it better within other components. Can be enabled by adding `searchbar-inline` class to searchbar
    * Stepper
      * New `stepper-round-aurora`, `stepper-raised-aurora`, `stepper-fill-aurora`, `stepper-small-aurora`, `stepper-large-aurora` modifier classes for Aurora theme
    * Toolbar
      * New `toolbar-top-aurora` and `toolbar-bottom-aurora` modifier classes for Aurora theme
    * Touch
      * Not it is possible to prevent active state bubbling on nested active-state elements with additional `prevent-active-state-propagation` class on nested active-state element
      * Improved clicks handling with Apple Pencil
    * Typography
      * New half-value margin and padding classes: `margin-half`, `margin-left-half`, `margin-right-half`, `margin-top-half`, `margin-bottom-half`, `margin-horizontal-half`, `margin-vertical-half`, `padding-half`, `padding-left-half`, `padding-right-half`, `padding-top-half`, `padding-bottom-half`, `padding-horizontal-half`, `padding-vertical-half`
    * View / Router
      * Router component's `$theme` object now contains boolean `aurora` property which is `true` for Aurora theme
      * New Aurora-related parameters: `auroraPageLoadDelay`, `auroraSwipeBack`, `auroraSwipeBackThreshold`, `auroraSwipeBackActiveArea`, `auroraSwipeBackAnimateShadow`, `auroraSwipeBackAnimateOpacity`
      * Fixed VDOM rendering with SVG elements
  * Phenome
    * React and Vue's component prototype `$theme`object now contains boolean `aurora` property which is `true` for Aurora theme
    * New Appbar component
    * Button
      * New Aurora related modifier props: `raisedAurora`, `roundAurora`, `largeAurora`, `smallAurora`, `fillAurora`, `outlineAurora`
    * Icon
      * New `aurora` prop to specify icon for Aurora theme
    * Link
      * New `iconAurora` prop to specify icon for Aurora theme
    * ListIndex
      * New `auroraItemHeight` prop to specify item height in Aurora theme
    * Navbar
      * New boolean `backLinkForce` prop to load and ignore previous page in history
      * New boolean `backLinkShowText` prop to hide or show back button text. By default  disable for MD theme
    * Page
      * New `ptrMousewheel` prop to make PTR work with mousewheel
    * Searchbar
      * New `inline` boolean prop to enable inline searchbar
    * Stepper
      * New Aurora related modifier props: `raisedAurora`, `roundAurora`, `largeAurora`, `smallAurora`, `fillAurora`
      * New `iconAurora` prop to specify icon for Aurora theme
    * Toolbar
      * New `topAurora` and `bottomAurora` boolean props to set Toolbar position for Aurora theme
  * Lots of minor fixed and improvements

# [v4.1.1](https://github.com/framework7io/framework7/compare/v4.1.0...v4.1.1) - March 14, 2019
  * Core
    * Form
      * Fix form ajax event arguments (`xhr` and `data`) to be in `e.detail`
    * Panel
      * Unset breakpoint layout on panel destroy
    * Autocomplete
      * Fixed issue with autcomplete dropdown click on iOS devices
    * Router
      * Fixed wrong behavior of navbar back link with swipe back in `ios` theme
    * Cards
      * Fixed issue when opened expanadble cards wasn't positioned correctly in some layouts
  * Minor fixes

# [v4.1.0](https://github.com/framework7io/framework7/compare/v4.0.6...v4.1.0) - March 4, 2019
  * Core
    * Input
      * New "outline" input styles
    * List
      * Fixed sticky list group titles when used with large navbar
    * Cards
      * Fixed issue when opened expanadble cards wasn't positioned correctly in some layouts
    * Tooltip
      * Fixed tooltip auto init under ios theme when it is used in navbar
    * Calendar
      * Fixed issue when `monthSelector` and `yearSelector` params were ignored
  * Phenome
    * Support for new outline inputs by adding boolean `outline` prop to `f7-list-input`/`ListInput` component
  * Minor fixes

# [v4.0.6](https://github.com/framework7io/framework7/compare/v4.0.5...v4.0.6) - February 25, 2019
  * Core
    * Searchbar
      * Tweaked/fixed styles for MD-Dark theme
    * Pull To Refresh
      * Now it will be ignored on opened expandable cards
      * Now it will be ignored on elements with `ptr-ignore` class
    * Dialog
      * Fixed text alignment in RTL direction
    * Swiper update to latest 4.5.0:
      * Core
        * New `swiper.changeDirection()` method to change direction from horizontal to vertical (and back) dynamically
        * `direction` parameter can be used in breakpoints
      * Virtual Slides
        * `swiper.virtual.appendSlide` now accepts array of slides to add
        * `swiper.virtual.prependSlide` now accepts array of slides to prepend
        * New `swiper.virtual.removeSlide(indexes)` to remove virtual selected slides
        * New `swiper.virtual.removeAllSlides()` to remove all virtual slides
      * Navigation
        * Now it emits `navigationHide` and `navigationShow` events when on nav hide/show
      * Pagination
        * Now it emits `paginationHide` and `paginationShow` events when on pagination hide/show
  * Phenome
    * Fixed broken `textarea:resize` / `textareaResize` on `Input` and `ListInput` components
  * Minor fixes

# [v4.0.5](https://github.com/framework7io/framework7/compare/v4.0.4...v4.0.5) - February 14, 2019
  * Core
    * Fixed d.ts reference path

# [v4.0.4](https://github.com/framework7io/framework7/compare/v4.0.3...v4.0.4) - February 13, 2019
  * Core
    * Fixed lost messages color

# [v4.0.3](https://github.com/framework7io/framework7/compare/v4.0.2...v4.0.3) - February 13, 2019
  * Core
    * Fixed d.ts reference path

# [v4.0.2](https://github.com/framework7io/framework7/compare/v4.0.1...v4.0.2) - February 13, 2019
  * Core
    * Fixed issue when event handlers attached with `.once` may not be detached correctly later
    * Router
      * Fixed issue when routable tab with params `/:param/` in path could produce new page loading instead of switching tab
    * Card
      * Add `card-prevent-open` class that can be added to element inside of the expandable card. Click on that element won't open expandable card.
    * Searchbar
      * Fixed Searchbar position when it is used on page with large navbar
  * Dom7 update to latest 2.1.3:
    * Fixed issue when event handlers attached with `.once` may not be detached correctly later
  * Phenome
    * Card
      * New `cardPreventOpen` prop on Link-like components to prevent expandable card open on this element click.
  * Minor fixes

# [v4.0.1](https://github.com/framework7io/framework7/compare/v4.0.0...v4.0.1) - February 8, 2019
  * Core
    * Fixed issue with Safari crashing on `button-large` rendering
    * Fixed issue with wrong active button color in bars
    * Removed not needed animation prefixes in utils

# [v4.0.0](https://github.com/framework7io/framework7/compare/v3.6.6...v4.0.0) - February 7, 2019 🎉🎉🎉
  * [What Is New In v4](https://blog.framework7.io/the-best-framework7-yet-what-is-new-in-v4-74b2b467047c)

# [v3.6.6](https://github.com/framework7io/framework7/compare/v3.6.5...v3.6.6) - February 5, 2019
  * Core
    * App `data` and `methods` now available before app initialization. Useful when you delay app initialization (like on `deviceready` event in Cordova app) and need to access data before
    * Pull To Refresh
      * Support for `ptr-watch-scroll` that should be added on scollable elements inside of `ptr-content`, so pull to refresh won't trigger during their scrolling
    * Panel
      * Fixed issue when panel backdrop not removed for routable panel
    * Template7 update to latest 1.4.1:
      * Relaxed `escape` helper to escape only `<>&"'` characters
      * Improved variables parsing in `js` and `js_if` helpers
  * Minor fixes

# [v3.6.5](https://github.com/framework7io/framework7/compare/v3.6.3...v3.6.5) - January 4, 2019
  * Core
    * Router
      * Now router methods will throw error if accessed on main app router, e.g. `app.router.navigate()`, it was never allowed, and done to avoid further issues
  * Minor fixes

# [v3.6.3](https://github.com/framework7io/framework7/compare/v3.6.2...v3.6.3) - December 27, 2018
  * Core
    * Range
      * New `formatLabel` parameter that allows to pass function and return formatted value for range knob label
    * Tabs
      * Fixes issue when routable swipeable tabs don't emit `tab:show` events
    * Dialog
      * Now it is possible to specify default value for Prompt dialog by adding it as last parameter to `app.dialog.prompt()` method
  * Phenome
    * New `routeProps` prop for Link, Button, ListItem, ListButton components that allows to pass props directly to target route component. For example, `<f7-link :props="{foo: 'bar'}">`
    * New `formatLabel` prop for Range component that allows to pass function and return formatted value for range knob label
  * Lost of minor fixes

# [v3.6.2](https://github.com/framework7io/framework7/compare/v3.6.1...v3.6.2) - December 11, 2018
  * Core
    * View
      * Fixed wrong type for `name` parameter in typescript definitions
  * Phenome
    * Message - fixed wrong click handler target

# [v3.6.1](https://github.com/framework7io/framework7/compare/v3.6.0...v3.6.1) - December 10, 2018
  * Phenome (React / Vue)
    * Tabs - fixed issue with broken Animated/Swipeable tabs

# [v3.6.0](https://github.com/framework7io/framework7/compare/v3.5.2...v3.6.0) - December 7, 2018
  * Core
    * Router
      * New `keepAlive` routes. When route's page is specified with `keepAlive: true`, then it, instead of removing and destroying component, it will be detached from DOM and attached back when required.
      * New `router.clearPreviousPages()` method that removes all previous (stacked) pages from DOM
    * Accordion
      * New `accordion:beforeopen` event that is triggered right before accordion will be opened. `event.detail.prevent` contains function that will prevent it from opening if called;
      * New `accordion:beforeclose` event that is triggered right before accordion will be closed. `event.detail.prevent` contains function that will prevent it from closing if called;
  * Phenome (React / Vue)
    * AccordionItem and ListItem have new `accordion:beforeopen` / `accordionBeforeOpen` events, second argument passed to handler contains function that will prevent it from closing if called;
    * AccordionItem and ListItem have new `accordion:beforeclose` / `accordionBeforeClose` events, second argument passed to  handler contains function that will prevent it from closing if called;
    *  View component now accepts MD-theme related swipeback props: `mdSwipeBack`, `mdSwipeBackAnimateShadow`, `mdSwipeBackAnimateOpacity`, `mdSwipeBackActiveArea`, `mdSwipeBackThreshold`
    * ListItem has new `virtualListIndex: Number` property to specify item index when rendered inside of Virtual List
    * Searchbar has new `value` property to specify Searchbar input's value. Can be usefule when used with `customSearch` enabled
  * Lots of minor fixes and improvements

# [v3.5.2](https://github.com/framework7io/framework7/compare/v3.5.1...v3.5.2) - November 12, 2018
  * Core
    * List
      * Fixed issue with hairlines in last swipeout-list item
    * Panel
      * Fixed issue when routable Panel can appear without backdrop
    * Searchbar
      * New `inputEvents` parameter that allow to specify which input events should be tracked for search
  * Phenome
    * ListInput - add `tag` property to allow to change default `li` tag to anything else
    * Searchbar - new `inputEvents` prop that allow to specify which input events should be tracked for search
    * Fixed issue with router page classes
  * Minor fixes

# [v3.5.1](https://github.com/framework7io/framework7/compare/v3.5.0...v3.5.1) - November 2, 2018
  * Core
    * Swiper update to latest 4.4.2:
      * New `touchStartForcePreventDefault` parameter to force touch start event prevent default
      * Breakpoints fix when breakpoint keys are strings
      * Fixed issue when draggable scrollbar may not work on desktop Safari
      * Fixed issue with wrong sort of Virtual Slides
    * Swipeout
      * Added new `swipeout:overswipeenter` and `swipeout:overswipeexit` events fired when overswipe enabled/disabled
    * Panel
      * Fixed issue when Swipe Panel could cause kind of screen flickering on open
  * Phenome
    * Messagebar - new `textareaId` property to set ID attribute on its textarea
    * ListItem - new `swipeoutOverswipeEnter` and `swipeoutOverswipeExit` events
  * Minor fixes

# [v3.5.0](https://github.com/framework7io/framework7/compare/v3.4.3...v3.5.0) - October 26, 2018
  * Phenome
    * Fix issues with handling "stacked" pages
    * New **ListInput** component to be used instead of ListItem+Label+Input
  * Minor fixes

# [v3.4.3](https://github.com/framework7io/framework7/compare/v3.4.2...v3.4.3) - October 19, 2018
  * Phenome
    * Input - better handling of `with-value` and `focused` states
    * Messagebar - make `resizePage` enabled by default like in docs
  * Minor fixes

# [v3.4.2](https://github.com/framework7io/framework7/compare/v3.4.0...v3.4.2) - October 12, 2018
  * Core
    * Device
      * Added correct detection for `webView` prop when app installed to home screen
    * Accordion
      * Fixes issue when `accordionOpened` event fired without passing opened element as argument
    * Request
      * If `contentType: 'application/json'` and `processData: false` it will automatically send POST data as JSON
    * Picker
      * Fixed issue when double click outside of opened Picker could cause router navigating to previous page
    * Pull To Refresh
      * Now it will ignore PTR when scrolling in page's nested container
    * Panel
      * Now it respects `swipeThreshold` parameter when `swipeNoFollow` is enabled
    * Searchbar
      * New `searchGroup` parameter to handle custom item groups to hide on search
      * New `searchGroupTitle` parameter to handle custom item groups titles to hide on search
  * Phenome (React / Vue)
    * Input - better handling of `with-value` and `focused` states when used in list item
    * Searchbar - new `searchGroup` and `searchGroupTitle` props
    * Page - improved router-related page classes handling that could cause issue with navigation
  * Minor fixes

# [v3.4.0](https://github.com/framework7io/framework7/compare/v3.3.2...v3.4.0) - September 28, 2018
  * Core
    * Lazy modules support 🎉
      * Added support to load F7 modules during runtime with new app methods:
        * New `app.loadModule(module)` method to load F7 module
        * New `app.loadModules([module])` method to load array of F7 modules
      * New `lazyModulesPath` app parameter to specify lazy modules location
      * New lazy component files in `lazy-components/` package folder
      * New `js/framework7-lazy.js` script containing core version of Framework7
      * New `css/framework7-lazy.css` styles containing core version of Framework7
    * Router
      * New Route's `modules` parameter to load F7 modules before entering the route
    * Statusbar
      * Added new `statusbar` app parameters:
        * `androidOverlaysWebView` (by default `false`)
        * `androidTextColor` (by default `black`)
        * `androidBackgroundColor` (by default `null`)
      * Added new `app.statusbar` app methods:
        * `app.statusbar.overlaysWebView(overlays)`
        * `app.statusbar.setTextColor(color)`
  * Phenome
    * Lots of TypeScript definitions fixes and tweaks
  * Minor fixes

# [v3.3.2](https://github.com/framework7io/framework7/compare/v3.3.1...v3.3.2) - September 20, 2018
  * Core
    * Support for new iPhone XR / XS / XS Max
    * View
      * Now it emits `view:init` DOM event and `viewInit` app event
    * Router
      * Now it is possible to pass React/Vue component `props` in route `options` or when navigating like `router.navigate('/somepage/', { props: { foo: 'bar' } })`
  * Phenome
    * View Component - added support `viewInit` event
    * Improved TypeScript declaration for React components events
  * Minor fixes

# [v3.3.1](https://github.com/framework7io/framework7/compare/v3.3.0...v3.3.1) - September 14, 2018
  * Core
    * Router
      * TypeScript defs tweaks #2668 #2666
    * Panel
      * TypeScript defs tweaks #2667
    * Smart Select
      * Fixed issue when it could throw error on init trying to get select `name` attribute
  * Phenome
    * ListItem
      * Fixed issue when Smart Select could be opened twice that caused router issue on navigating back

# [v3.3.0](https://github.com/framework7io/framework7/compare/v3.2.1...v3.3.0) - September 14, 2018
  * Core
    * Added TypeScript definitions for whole core framework APIs (with huge help of @JasonKleban)! 🎉
    * Swiper update to latest 4.4.1:
      * Core
        * New `centerInsufficientSlides` parameter to center slides if the amount of slides less than `slidesPerView`
        * New `breakpointsInverse` parameter (boolean), if enabled then it will count breakpoints in reversed direction, e.g. will override parameters if window width is more than specified breakpoint
      * Virtual Slides
        * New `addSlidesBefore` and `addSlidesAfter` parameters to increase amount of pre-rendered slides
      * Thumbs
        * All new "Thumbs" module/component designed to control slider thumbnails, in more logical and correct way than with Controller module.
    * Virtual DOM Router Components
      * Added snabbdom's "style" module that allows to make fancy and smooth custom animations
    * Input
      * Now input placeholder will be visible on item with floating label when it receives focus
  * Phenome
    * Added TypeScript definitions for all React components 🎉
    * Added TypeScript definitions for F7-Vue and F7-React components extensions (e.g. `this.$f7`, `this.$f7router`, etc.) 🎉
    * List Component
      * new `noChevron` prop to disable "chevron" icon on all nested list items with link
      * new `chevronCenter` prop to set "chevron" icon in the middle of all nested media list items with link
    * ListItem Component
      * `disabled` prop will now set "disabled" class on list item if it is not a checkbox or radio
      * new `noChevron` prop to disable "chevron" icon on list item with link
      * new `chevronCenter` prop to set "chevron" icon in the middle of media list item with link
    * Improved Framework7 initialization routine
    * Fixed issue when `f7ready` callback fired before `deviceready` event in Cordova environment
  * Lots of fixes

# [v3.2.1](https://github.com/framework7io/framework7/compare/v3.2.0...v3.2.1) - August 31, 2018
  * Template7 - updated to latest 1.4.0
      * Added TypeScript Definitions
  * Dom7 - updated to latest 2.1.0
      * Added TypeScript Definitions
  * Phenome
    * Navbar - added `innerClass` and `innerClassName` (alias) props to set additional class on `navbar-inner` element
    * Popup - fixed issue when its `animate` and `backdrop` props became disabled by default
  * Minor fixes

# [v3.2.0](https://github.com/framework7io/framework7/compare/v3.1.1...v3.2.0) - August 28, 2018
  * Core
    * Router
      * Added support for routable Panels! Thanks to @bencompton 🎉
      * Added support to navigate to route by its name using `router.navigate({ name: 'someroute' })`
      * Optimized Router Component ES template parsing
      * Now it caches XHR-loaded Router Components (from `componentUrl`)
    * Calendar
      * New `backdrop` and `closeByBackdropClick` parameters
    * Smart Select
      * New `cssClass` parameter that will add additional class to Smart Select element
      * `searchbar` parameter now can be a full object with Searchbar parameters
      * New `appendSearchbarNotFound` parameter that adds additional element to Smart Select container that will be visible when there are no searchbar results
    * Popup
      * Fixed issue on backdrop click when multiple popups opened same time
    * Device
      * It now adds `device-macos` and `device-windows` html classes when relevant device is used
    * Utils - 2 new methods added:
      * `app.utils.uniqueNumber()` - returns unique counter number
      * `app.utils.id(mask, map)` - returns randomly generated string by mask, e.g. `app.utils.id('xxxx-xxxx-xxxx-xxxx')` will return string like `d692-c811-e032-6028`
  * Phenome (Vue/React)
    * View component - added new `routesBeforeEnter` and `routesBeforeLeave` properties
    * List component - now emits `submit` event if it is used as form
    * List Item component - fixed issue with `onChange` event in React
    * Actions, Popover, Sheet - added new `closeByBackdropClick` and `closeByOutsideClick` properties
    * Popup - added new `closeByBackdropClick`, `backdrop`, `animate` properties
  * Lots of minor fixes

# [v3.1.1](https://github.com/framework7io/framework7/compare/v3.1.0...v3.1.1) - August 3, 2018
  * Core
    * Virtual DOM Router Components
      * Imporved boolean attributes handling (`readonly`, `checked`, etc.)
      * Fixed issue when comment inside of template can break the rendering
      * Better auto-init components cleanup
  * Minor fixes

# [v3.1.0](https://github.com/framework7io/framework7/compare/v3.0.7...v3.1.0) - July 31, 2018
  * Core
    * Router
      * New `updateCurrentUrl(url)` method to update url of the currently active route (and current browser state if `pushState` is enabled)
      * Will emit new `routeUrlUpdate` event if `updateCurrentUrl()` was called
      * Fixed issue when going back with enabled `pushState` could produce double pages back in Firefox
      * Fixed issue when changing routable swipeable tabs wasn't trigger `routeChanged` event
      * Single-file Router Components:
        * It can now treat component template as ES template literal. Addional `es` attribute is required on template to enable, e.g. `<template es>`
        * It is now rendered with Virtual DOM (Snabbdom library) for layout auto updating 🎉
        * It has new `$setState(mergeState)` method to set new component state and force component to update its layout
    * Searchbar
      * Fixed issue when in some situations it didn't trigger `search` event when used with Virtual List
    * Calendar
      * Day "events" dots layout is reworked and now each day can have few dots (of different color) at a time
    * Input
      * Fixed wrong resizable textarea calculation in Firefox
    * Stepper
      * Has new "manual input mode". When enabled it allows to type value from keyboar and check fractional part with defined accurancy. Also, when enabled, then `step` parameter is ignored during typing. It has 3 new parameters:
        * `manualInputMode: false` - enables manual input mode
        * `decimalPoint: 4` - number of digits after dot
        * `buttonsEndInputMode: true` - disables manual input mode on Stepper's button click
    * Swiper - updated to latest 4.3.5
      * Core
        * `iOSEdgeSwipeThreshold` parameter renamed to just `edgeSwipeThreshold`. Old `iOSEdgeSwipeThreshold` name is still supported
        * Improved observer performance if there are many mutations at a time.
      * Controller
        * Fixed issue with wrong auto height resizing
      * Scrollbar
        * Fixed issue when it was using active event listeners instead of passive.
    * Dom7 - updated to latest  2.0.7
      * Fixed issue with undefined elements in classList access (#13)
    * Template7 - updated to latest 1.3.8
      * Fixed issue with parsing parents in `js` and `js_if` helpers when properties contain `$` character
  * Phenome
    * Stepper component has new properties:
      * `manualInputMode: false` - enables manual input mode
      * `decimalPoint: 4` - number of digits after dot
      * `buttonsEndInputMode: true` - disables manual input mode on Stepper's button click
    * Fixed Messagebar send-link reference issue
  * Lots of minor fixes

# [v3.0.7](https://github.com/framework7io/framework7/compare/v3.0.6...v3.0.7) - July 20, 2018
  * Phenome
    * Fixed build error

# [v3.0.6](https://github.com/framework7io/framework7/compare/v3.0.5...v3.0.6) - July 20, 2018
  * Core
    * Fixed missing `idate` dependency

# [v3.0.5](https://github.com/framework7io/framework7/compare/v3.0.1...v3.0.5) - July 20, 2018
  * Core
    * Calendar
      * Added support for Jalali calendar, can be enabled with `calendarType: 'jalali'`
      * New `rangePickerMinDays` and `rangePickerMaxDays` to require min/max days when range picker enabled
    * Tooltip
      * Fixed issue when tooltip wasn't fully hidden on touch devices
    * Router
      * `routeChanged` event will also work for routable tabs now
  * Phenome
    * Fixed not working `readonly` prop in `f7-input` Vue component
  * Minor fixes

# [v3.0.1](https://github.com/framework7io/framework7/compare/v3.0.0...v3.0.1) - July 10, 2018
  * Phenome
    * Fixed `TypeError` error in `ActionsGroup` component

# [v3.0.0](https://github.com/framework7io/framework7/compare/v3.0.0-beta.19...v3.0.0) - July 5, 2018 🎉 

# [v3.0.0-beta.19](https://github.com/framework7io/framework7/compare/v3.0.0-beta.18...v3.0.0-beta.19) - July 3, 2018
  * Core
    * Router
      * View/Router parameter `beforeLeave` renamed to `routesBeforeLeave`
      * View/Router parameter `beforeEnter` renamed to `routesBeforeEnter`

# [v3.0.0-beta.18](https://github.com/framework7io/framework7/compare/v3.0.0-beta.17...v3.0.0-beta.18) - July 3, 2018
  * Core
    * Router
      * Fixed error with `beforeLeave` middleware when loading initial route

# [v3.0.0-beta.17](https://github.com/framework7io/framework7/compare/v3.0.0-beta.16...v3.0.0-beta.17) - July 2, 2018
  * Core
    * Router
      * `preRoute` middleware renamed to `beforeEnter` that will be executed before route load/enter.
      * Added `beforeLeave` route middleware that will be executed before route unload/leave.
    * Progressbar
      * Fixed positioning of progressbar inside of the Page with statusbar enabled

# [v3.0.0-beta.16](https://github.com/framework7io/framework7/compare/v3.0.0-beta.15...v3.0.0-beta.16) - July 1, 2018
  * Core
    * Searchbar - fixed issue with wrong `previousQuery` in `search` event
  * Phenome
    * ListItem has new `defaultChecked` prop to support React uncontrolled components
  * Minor fixes

# [v3.0.0-beta.15](https://github.com/framework7io/framework7/compare/v3.0.0-beta.14...v3.0.0-beta.15) - June 27, 2018
  * Phenome Components
    * Fixes issue when React components could be rendered wrong in production build

# [v3.0.0-beta.14](https://github.com/framework7io/framework7/compare/v3.0.0-beta.12...v3.0.0-beta.14) - June 24, 2018
  * Core
    * Elevation
      * Elevation moved to separate component
      * Added support for `elevation-hover-$n` class to add elevation on hover
      * Added support for `elevation-pressed-$n` class to add elevation on press
      * Added support for `elevation-transiton` class to add transition between elevation states
  * Phenome
    * Icon
      * Added support for tooltip with `tooltip` prop

# [v3.0.0-beta.12](https://github.com/framework7io/framework7/compare/v3.0.0-beta.11...v3.0.0-beta.12) - June 22, 2018
  * Core
    * Tooltip
      * `el` parameter has been renamed to `targetEl`
    * Accordion
      * Now it toggles `aria-hidden` attribute on accordion content toggle

# [v3.0.0-beta.11](https://github.com/framework7io/framework7/compare/v3.0.0-beta.10...v3.0.0-beta.11) - June 19, 2018
  * Core
    * Fix touch ripple issues that happen from time to time in Edge
    * Fix minor push state issues in Edge
    * Device util now has additional detections props: `windowsPhone`, `windows`, `macos`, `ie`, `edge`

# [v3.0.0-beta.10](https://github.com/framework7io/framework7/compare/v3.0.0-beta.9...v3.0.0-beta.10) - June 15, 2018
  * Core
    * All new Gauge component with responsive SVG gauges
    * Router
      * Added `preRoute` support (middleware) that can be configured per route or globally on View/Router init for all routes
    * Smart Select
      * New `change`/`smartSelectChange` events
    * Autocomplete
      * Fixed error with undefined value replacement
    * Tooltip
      * New `setText` method to dynamically change Tooltip's text/content
  * Phenome
    * Better validation logic for `Input` component
    * `Toggle` - fixed issue when `toggleChange` event not being fired on desktop
    * `ListItemContent` - fixed issue with calling `setState` in render function
    * Support for `target` prop/attribute for `Link`, `Button`, `Fab`, `FabButton` components
    * Tooltip support (with `tooltip` prop) for `Fab` and `FabButton` components
    * New `Gauge` (React) / `f7-gauge` (Vue) component to produce responsive SVG gauges
    * Added Smart Select for `Link` component with `smartSelect` and `smartSelectParams` props

# [v3.0.0-beta.9](https://github.com/framework7io/framework7/compare/v3.0.0-beta.8...v3.0.0-beta.9) - June 12, 2018
  * Core
    * All new Tooltip component
    * Template7 update to latest 1.3.6
      * Better `@global` parsing in `js` and `js_if` helpers
  * Phenome
    * Now `f7route` and `f7router` are passed as props for components loaded by router (Page, Routable Tabs, Routable Modals).
    * `$f7route` and `$f7router` are now also available only on components loaded by router (Page, Routable Tabs, Routable Modals) and may not be available in custom children components. For children components they must be passed done using props
    * Added `tooltip` support for `Link` and `Button` components

# [v3.0.0-beta.8](https://github.com/framework7io/framework7/compare/v3.0.0-beta.7...v3.0.0-beta.8) - June 11, 2018
  * Phenome
    * Transform object rest spread syntax to Object.assign in Vue/React components

# [v3.0.0-beta.7](https://github.com/framework7io/framework7/compare/v3.0.0-beta.6...v3.0.0-beta.7) - June 9, 2018
  * Core
    * Lots of MD styles updated to new Material Design specification
    * Cards
      * New outline cards style
    * Chips
      * New outline style + tweaked iOS chips styles
    * FAB
      * New FAB-Extended style with addtional text label support inside of FAB
      * Support for FAB actions label
    * Typography
      * New Elevation styles, can be configured with `elevation-1`, `elevation-2`,  ..., `elevation-24` classes
    * Dialog
      * Preloader dialog now supports preloader color as second argument: `app.dialog.preloader(title, color)`
    * Smart Select
      * Will not error anymore about required View if it is actually not required (e.g. for SS opened in Popup, Popover or Sheet)
    * Picker - fixed issues with touch/swipe areas in RTL layout
    * Calendar
      * Fixed issue when not possible to switch calendar to previous month when min date is the last date of previous month
      * Fixed issue when double click behind calendar could cause router to go to the previous page
    * Swiper - updated to latest
      * Fixed issue when slidePrev goes to wrong slide #2650
      * Fixed issue when roundLength was not considered for grids calculation #2656
  * Phenome
    * Card
      * New `outline` prop to make card outline
    * Chip
      * New `outline` prop to make card outline
    * Fab
      * New `text` prop to add text to FAB and make it as Extended FAB
      * New `label` prop for `FabButton` to add label for fab button
    * Simplified conditional icon props for Icon, Link and Button components: `if-ios` -> `is`, `if-md` -> `md`, `icon-if-ios` -> `icon-ios`, `icon-if-md` -> `icon-md`
    * Input
      * New `error-message-force` prop to force error message to show. Works in case of `validate` is omitted
    * Messagebar
      * New `resizePage` prop that will resize messages page with messagebar
      * New `resizePage()` method renamed to `resize()`

# [v3.0.0-beta.6](https://github.com/framework7io/framework7/compare/v3.0.0-beta.5...v3.0.0-beta.6) - June 5, 2018
  * Phenome
    * ListItem - fixed `subtitle` slot being ignored

# [v3.0.0-beta.5](https://github.com/framework7io/framework7/compare/v3.0.0-beta.4...v3.0.0-beta.5) - June 4, 2018
  * Phenome - fix issue when passing `undefined` child to the component

# [v3.0.0-beta.4](https://github.com/framework7io/framework7/compare/v3.0.0-beta.3...v3.0.0-beta.4) - June 4, 2018
  * Core
    * App methods (specified in `methods` params) are now bound to app context (initialized F7 instance)
    * Swiper - updated to latest 4.3.2
      * Core
        * Added `addSlide(index, slide)` method to add slide at required position. Thanks to @kochizufan
        * Fixed issue with loop #2647. Thanks to @kochizufan
      * Pagination
        * New `formatFractionCurrent(number)` parameter to format current number in Fraction pagination
        * New `formatFractionTotal(number)` parameter to format total number in Fraction pagination
  * Phenome
    * Use `domProps` for Vue input components
    * ListItem
      * New `swipeoutOpened` prop to control (open/close) swipeout item by prop

# [v2.3.1](https://github.com/framework7io/framework7/compare/v2.3.0...v2.3.1) - June 1, 2018
  * Searchbar
    * Fixed issue with not hiding/showing backdrop when `customSearch` is enabled
  * Sortable
    * New app parameter `sortable.moveElements` by default is `true`. Useful to disable when you use for DOM manipulation other library like Vue or React
  * Swiper update to latest v4.3.2:
    * Core
      * Added `addSlide(index, slide)` method to add slide at required position. Thanks to @kochizufan
      * Fixed issue with loop #2647. Thanks to @kochizufan
    * Pagination
      * New `formatFractionCurrent(number)` parameter to format current number in Fraction pagination
      * New `formatFractionTotal(number)` parameter to format total number in Fraction pagination
  * Minor fixes

# [v2.3.0](https://github.com/framework7io/framework7/compare/v2.2.5...v2.3.0) - May 27, 2018
  * View/Router
    * Fixed missing `pushStateOnLoad` parameter
    * Added support for routable Action Sheet
  * Searchbar
    * Fixed issue with exapandable Searchbar missplace in MD theme when used with Subnavbar
  * Input
    * New `scrollIntoViewDuration` app.input parameter to set duration for scrolling input into view
    * New `scrollIntoViewAlways` app.input parameter to scroll input into view no matter is it outside of view or not
    * `app.input.scrollIntoView` now has additional `force` argument to scroll input into view no matter is it outside of view or not: `app.input.scrollIntoView(inputEl, duration, centered, force)`
    * Clicking input's clear button now also triggers `input` event in addition to `change` event
  * Statusbar
    * Improved statusbar overlay detection for iOS devices
  * Autocomplete
    * New `dropdownContainerEl` parameter to define place where dropdown need to be inserted
    * Imporved dropdown positioning
  * Dom7 update to latest v2.0.6:
    * Fixed issue with remove event listeners when they was not added
  * Swiper update to latest v4.3.0:
    * Core
      * Fixed issue when `swipeBack` sometimes slides to wrong slide
      * Fixed issue when window resizing can break Coverflow effect layout
      * Fixed issue with wrong detection of iOSEdgeSwipeDetection
    * Dom7 update to latest v2.0.6:
      * Fixed issue with remove event listeners when they was not added
  * Lots of minor fixes

# [v2.2.5](https://github.com/framework7io/framework7/compare/v2.2.1...v2.2.5) - April 29, 2018
  * Router
    * Fixed issue with not loaded routable tabs content after swipe-back to page with these routable tabs
    * Page data will have additional `swipeback: true` prop when the page event was triggered by swipe back
  * Range
    * New `range:changed` (`rangeChanged`, `changed`) event that will be triggered on slide knob release after value change
  * Messagebar
    * Fixed textarea text color for MD-Dark theme
  * Form Storage
    * Added support for skip inputs from storing by adding `no-store-data` or `ignore-store-data` class to input element
  * Dom7 updated to latest v2.0.5
    * Support for setting array value on multiple select
    * Imporved internal events proxies logic for better memory management
  * Swiper update to latest v4.2.5
    * Core
      * Prevent apply grab cursor when swiper is locked
      * Fixed breakpoint with loop getting wrong realIndex when on init
      * Fixed "transformed" slides sizes calculation that could cause issues in with Coverflow effect
    * Autoplay
      * Fixed issue that can cause memory leak
  * Minor fixes

# [v2.2.1](https://github.com/framework7io/framework7/compare/v2.2.0...v2.2.1) - April 7, 2018
  * List Index
    * Improved page scroll logic when scrolling upward
  * Router
    * Fixed issue when Swipe Back may not work for views other than main
    * Fixed issue with undefined initial browser history state when `pushState` enabled
  * Minor fixes

## [v1.7.1](https://github.com/framework7io/framework7/compare/v1.7.0...v1.7.1) - March 21, 2018
  * Fix for touch events when app can be unresponsive iOS 11.3

# [v2.2.0](https://github.com/framework7io/framework7/compare/v2.1.3...v2.2.0) - April 1, 2018
  * List Index
    * Meet all new List Index component 🎉
  * Full iPhone X safe areas support and required tweaks for MD theme 🙌. Same as for iOS theme: automatic support for top and bottom safe areas (for portrait orientation). For landscape orientation the following classes must be added to elements:
    * `ios-edges` - for full-width elements (like main View)
    * `ios-edge-left` - for elements that stick to the left edge of the screen (like left Panel)
    * `ios-edge-right` - for elements that stick to the right edge of the screen (like right Panel)
  * Stepper
    * New `autorepeat` parameter that will repeatedly increase/decrease values while you tap and hold plus/minus buttons
    * New `autorepeatDynamic` parameter that will increase autorepeat ratio based on how long you hold the button
    * New `wraps` parameter. When enabled, incrementing beyond maximum value sets value to minimum value; likewise, decrementing below minimum value sets value to maximum value
  * Sortable
    * Fixed styling when sortable list is using with `no-chevron` class
  * Range Slider
    * New `draggableBar` parameter (defaults to `true`) that allows to disable value change on range bar click and drag
    * Added auto sizes recalculation on parent modals/panel/tabs open
  * Router
    * Will now replace state (if `pushState` enabled) on initial load when initial route has `redirect`
    * Fixed issue with `tab:beforeremove` event was not fired for routeable tabs
    * Improved `restoreScrollTopOnBack` logic to save and restore scrolling on active `page-content` element
    * Swipe Back support for MD theme with new Router parameters:
      * `mdSwipeBack: false` - enables swipe back for MD theme
      * `mdSwipeBackAnimateShadow: true` - enable/disable box-shadow animation during swipe back action
      * `mdSwipeBackAnimateOpacity: false` - enable/disable opacity animation during swipe back action. You can disable it to improve performance
      * `mdSwipeBackActiveArea: 30` - width of invisible left edge of the screen that triggers swipe back action
      * `mdSwipeBackThreshold: 0` - swipe back will start if "touch distance" will be more than this value
  * Request
    * Now if you `return false` in `beforeOpen` or `beforeSend` callbacks it will cancel the XHR request
  * Autocomplete
    * New `inputEvents` parameter (by default is `input`) allows to configure input events used to handle Autcomplete actions and source request
  * Smart Select
    * Fixed issue when Searchbar didn't work when Smart Select opened in `page` with Searchbar in iOS theme
  * Dialog
    * New `app.dialog.keyboardActions` parameter (enabled by default) that enables keyboard shortcuts (Enter and Esc) keys for predefined dialogs (Alert, Confirm, Prompt, Login, Password)
  * Fixed iOS 11.3 bug that can break Fast clicks and make Cordova/PhoneGap app unresponsive on app resume from background 🔥
  * Swiper updated to latest 4.2.2 version
    * Core
      * Respect and update breakpoints when calling Swiper's `.update()` method
    * Pagination
      * New `progressbarOpposite` parameter to make pagination progressbar opposite to `direction` parameter, means vertical progressbar for horizontal swiper direction and horizontal progressbar for vertical swiper direction
  * Lots of minor fixes

## [v1.7.0](https://github.com/framework7io/framework7/compare/v1.6.5...v1.7.0) - March 21, 2018
  * Full iPhoneX support and required tweaks. Automatic support for top and bottom safe areas (for portrait orientation). For landscape orientation the following classes must be added to elements:
    * `ios-edges` - for full-width elements (like main View)
    * `ios-edge-left` - for elements that stick to the left edge of the screen (like left Panel)
    * `ios-edge-right` - for elements that stick to the right edge of the screen (like right Panel)
  * Dom7
    * Added `beforeCreate` callback for `.ajax` method
  * Minor fixes

# [v2.1.3](https://github.com/framework7io/framework7/compare/v2.1.2...v2.1.3) - March 19, 2018
  * Searchbar
    * Fixed issue with position of input clear button
  * Router
    * Fixed issue with wrong component context when `component` passed to route

# [v2.1.2](https://github.com/framework7io/framework7/compare/v2.1.1...v2.1.2) - March 18, 2018
  * Stepper
    * Fixed theme-specific modifier classes, e.g. `stepper-fill-ios`, `.stepper-round-md` etc.

# [v2.1.1](https://github.com/framework7io/framework7/compare/v2.0.10...v2.1.1) - March 17, 2018
  * Stepper
    * Meet all new Stepper component 🎉
  * Data Table
    * Added data table footer UI for pagination
    * Added UI support for having inputs in table head
  * Input
    * Now it is possible to use fancy input elements outside of List View, by just wrapping it with `<div class="input">`
  * Router
    * Fixed issue when route context wasn't available in `async` route
    * Fixed issue when modal HTML element was duplicated in modal routes
  * Form
    * Fixed issue when `enctype` attribute was ignored on ajax form
  * VI (video intelligence)
    * Now serves vi api over `https`
  * Actions
    * Fixed issue with error when pass already rendered HTML element to the `actions.create` constructor
    * Fixed issue with not setting actions button bg color
    * Addedd support for `closeByOutsideClick` logic
  * Searchbar
    * Now hides elements (when required) by setting/unsetting classes instead of directly modifying element `display` property
  * Toast
    * Added `destroyOnClose` parameter to automatically destroy toast instance on close
    * New `app.toast.show` method to automatically create and open Toast
    * Improved iPhoneX support for bottom toast
  * List
    * New `no-chevron` class on list and list item link to disable chevron icon
    * New `chevron-center` class on media list or media list item to set chevron icon position on center
  * Swiper updated to latest 4.2.0 version
    * Core
      * `swiper.updateAutoHeight(speed)` now supports `speed` parameter to resize swiper wrapper with duration
      * Fixed issues in free mode with `freeModeSticky` not being able to snap to closest snap point
      * New `swiper.slideToClosest()` method to slide to closest snap point when it is somewhere in between
    * A11y (Accessibility)
      * It is now enabled by default (if installed)
    * Controller
      * Fixed RTL issue when vertical swiper controls horizontal one
    * Lazy
      * Fixed issue when lazy loading not always triggered on window resize
  * Improved server-side rendering by using `ssr-window` package
  * Lots of minor fixes

# [v2.0.10](https://github.com/framework7io/framework7/compare/v2.0.8...v2.0.10) - February 19, 2018
  * Router
    * New `router.clearPreviousHistory()` method to clear all previous pages history and remove all previous pages from DOM
    * New `clearPreviousHistory` option for `router.navigate` that will clear history after reloading/navigating to specified page
    * Fixed issue with not correctly working `reloadPrevious` parameter
  * Smart Select
    * Now accepts `view` as a parameter on initialization
  * Accordion
    * Fixed iOS rendering issue when opening accordiong enables page scroll
  * Panel
    * Swipe panel won't be opened on quick swipe if the swipe distance doesn't exceed `swipeThreshold` parameter
  * Range Slider
    * Fixed issue with broken events when passing event listeners in `on` parameter on init
  * Minor fixes

# [v2.0.8](https://github.com/framework7io/framework7/compare/v2.0.7...v2.0.8) - February 11, 2018
  * Swipeout
    * Fixed issue in Safari when it flashes on open
  * Router
    * Now `route` (currentRoute) object has additional `context` property if it was passed in route options
  * Range Slider
    * Now it triggers input's `change` event on when user releases slider
  * Sortable
    * Fixed issue when sortable list used with list groups
  * Swiper updated to latest 4.1.6:
    * Improved touch events support on desktop Windows devices with touch screen
    * Improved "loop fix" when slider is in the free mode
    * New `noSwipingSelector` parameter that can be used instead of `noSwipingClass`
    * New `preventIntercationOnTransition` parameter to prevent interaction during slice change transition
    * New `.slideToLoop` method to be used in loop mode
    * Improved IE 10 support. But it is recommended to use [__proto__ polyfill](https://www.npmjs.com/package/proto-polyfill)
    * Improved touch support for Edge
    * Fixed issue with `slideChange` events being fired when slide wasn't actually changed
    * Scrollbar
      * Now doesn't require to enable `simulateTouch` for desktops when it is `draggable`
    * Pagination
      * Added new multiple main bullets support for dynamic bullets pagination
    * Zoom
      * Now supports Virtual Slides
    * New `watchOverflow` (disabled by default). When enabled Swiper will be disabled and hide navigation buttons on case there are not enough slides for sliding
    * Autoplay
      * New `reverseDirection` to enable autoplay in reverse direction
      * New `waitForTransition` parameter when autoplay will wait for wrapper transition to continue (enabled by default). Can be disabled in case of using Virtual Translate when your slider may not have transition
  * Minor fixes

# [v2.0.7](https://github.com/framework7io/framework7/compare/v2.0.6...v2.0.7) - January 27, 2018
  * Picker
    * Fixed issue with `change` event not being fired
  * Panel
    * Fixed issue with closing swipe panel with `swipeActiveArea` parameter
  * Router
    * `async` route support for routable tabs
    * `async` route support for routable modals
  * Virutal List
    * New `ul` and `createUl` parameters. When disabled then VL can be used with any elements not expecting the list only
  * Dialog
    * New `app.destroyPredefinedDialogs` parameter to automatically destroy predefined dialogs like Alert, Confirm, Prompt, etc.
  * Package
    * Now ES-next modules have named export in addition to default, it exports `{ Template7, Dom7, Utils, Request, Device, Support }`
  * Minor fixes

# [v2.0.6](https://github.com/framework7io/framework7/compare/v2.0.5...v2.0.6) - January 9, 2018
  * Photo Browser
    * Fixed isse with wrong navbar color when color theme applied
  * Range Slider
    * Fixed wrong knob position in RTL layout
  * Tabs
    * Fixed issue with routable tabs links in navbar not switching correctly active class
  * Request
    * New `request.postJSON(url, data, success, error, dataType)` method to send pure JSON data with POST
  * Router
    * Router ajax events now receives second argument with navigating options
    * New `router.refreshPage()` method to reload current page
    * New `passRouteQueryToRequest` parameter (`true` by default) will pass route url query to request url query (for route `url`, `templateUrl` and `componentUrl` options).
      If you have the following route `{ path: '/somepage/', url: 'http://myserver/page/' }` and you will click link with `/somepage/?foo=bar` url then it will load page from `http://myserver/page/?foo=bar` url.
    * New `passRouteParamsToRequest` parameter (`false` by default) will pass current route parameters to request url query (for route `url`, `templateUrl` and `componentUrl` options).
      If you have the following route `{ path: '/user/:userId/posts/:postId/', url: 'http://myserver/userpost/' }` and you will click link with `/user/11/posts/12/` url then it will load page from `http://myserver/userpost/?userId=11&postId=12` url.
    * It is now also possible to use router parameters delimiters in route `url`, `templateUrl` and `componentUrl` options that will be replaced on request. E.g. `{ path: '/user/:userId/posts/:postId/', url: 'http://myserver/{{userId}}/{{postId}}' }`
  * Toolbar / Tabbar
    * Common app tabbar in multiple views app structure can be also hidden with "toolbar-hide-on-scroll"
  * Minor fixes

# [v2.0.5](https://github.com/framework7io/framework7/compare/v2.0.2...v2.0.5) - January 2, 2018
  * Lots of minor fixes

# [v2.0.2](https://github.com/framework7io/framework7/compare/v2.0.1...v2.0.2) - December 5, 2017
  * Router
    * Fix to make Routable tabs work on home page
  * Few CSS tweaks for iPhone X safe areas

# [v2.0.1](https://github.com/framework7io/framework7/compare/v2.0.0...v2.0.1) - December 4, 2017
  * Fixed iOS 11.2 iPhone X support with new CSS `env` safe areas

# [v2.0.0](https://github.com/framework7io/framework7/compare/v2.0.0-beta.21...v2.0.0) - December 3, 2017 🎉

# [v2.0.0-beta.21](https://github.com/framework7io/framework7/compare/v2.0.0-beta.20...v2.0.0-beta.21) - December 3, 2017
  * Router
    * Fixed issue with multiple "destroy" hooks called when using modals/tabs as router components
  * vi
    * Added `placementType` ad parameter

# [v2.0.0-beta.20](https://github.com/framework7io/framework7/compare/v2.0.0-beta.19...v2.0.0-beta.20) - December 2, 2017
  * Range Slider
    * Recalculate range slider size when parent tab becomes visible
  * CSS
    * `!important` rule for hiding `ios-only` and `md-only` elements

# [v2.0.0-beta.19](https://github.com/framework7io/framework7/compare/v2.0.0-beta.18...v2.0.0-beta.19) - December 1, 2017
  * Fixed issue with View router initialization when it was created after app init. Fixes also issue in cordova when app initialized later within `deviceready` event

# [v2.0.0-beta.18](https://github.com/framework7io/framework7/compare/v2.0.0-beta.17...v2.0.0-beta.18) - November 30, 2017
  * New *vi* (video intelligence) component. *vi* is a mobile video SSP (Supply / Sell Side Platform). It provides self-serve tools for publishers to captivate and monetize audiences
  * Popover
    * Now may accept target elements coordinates with `targetX`, `targetY` parameters instead of `targetEl` target element itself
  * Actions
    * New `forceToPopover` parameter to always convert it to Popover
    * `toPopover` parameter renamed to `convertToPopover`
    * New `backdrop` (true/false) parameter to enable/disable Actions backdrop
  * Router
    * New `currentPageEl` router property that points to current page HTMLElement.
    * Improved routable tabs support for different routes but with same tab IDs
    * Improved dynamic navbar transition using CSS page transitions
  * Form Storage
    * Renamed methods:
      * `app.form.data.get()` -> `app.form.getFormData()`
      * `app.form.data.remove()` -> `app.form.removeFormData()`
      * `app.form.data.store()` -> `app.form.storeFormData()`
      * `app.form.toData()` -> `app.form.convertToData()`
      * `app.form.fromData()` -> `app.form.fillFromData()`
  * CSS & Theming
    * New "Dark Colo Theme" for both "iOS" and "MD" themes. Can be added with `theme-dark` CSS class.
    * Full iPhoneX support and required tweaks. Automatic support for top and bottom safe areas (for portrait orientation). For landscape orientation the following classes must be added to elements:
      * `ios-edges` - for full-width elements (like main View)
      * `ios-edge-left` - for elements that stick to the left edge of the screen (like left Panel)
      * `ios-edge-right` - for elements that stick to the right edge of the screen (like right Panel)
    * Common `disabled` class to make any elements disabled
  * Swiper updated to latest 4.0.7:
    * Fixed issue with not working correctly `touchReleaseOnEdges` on iOS
    * Fixed issue with not working allowSlideNext/Prev change on Breakpoints
    * Fixed wrong scrollbar dragging when using custom `dragSize`
  * Build/Package - new files structure to improve tree-shaking as much as possible:
    * Now the `framework7.esm.js` and `framework7.esm.bundle.js` are in the root of `/dist/` folder.
    * `framework7.esm.js` now exports only Framework7 core library with single *default* export
    * All additional components must be included from separate `/dist/components/` folder. For example `import Searchbar from 'framework7/dist/components/searchbar/searchbar.js';`
    * Custom CSS build is now also possible with LESS. `framework7.less` is now in the root of `/dist/` and contains only Framework7 core library styles. Additional components must be included from separate `/dist/components/` folder. For example `import "framework7/dist/components/searchbar/searchbar.less";`
  * Lost of minor fixes

# [v2.0.0-beta.17](https://github.com/framework7io/framework7/compare/v2.0.0-beta.16...v2.0.0-beta.17) - November 14, 2017
  * Preloader
    * Fixed preloader backdrop styles to cover the screen behind it
  * Router
    * Cancels swipe back page in case of swipe left
  * Input
    * Added `scrollIntoViewOnFocus` parameter, that is by default enabled for Android
    * Added `scrollIntoViewCentered` paramter to scroll input into center of view
  * Minor fixes

# [v2.0.0-beta.16](https://github.com/framework7io/framework7/compare/v2.0.0-beta.15...v2.0.0-beta.16) - November 8, 2017
  * Swiper updated to latest version
    * Fixed issue with not working `noSwiping` parameter
    * Parallax now considers `slidesPerGroup` parameter
    * Zoom: imporved gestures handling
    * Pagination: fixed issues with wrong positioned dynamic-bullets when there are not enough slides
    * Fixed issues with some effects being broken with enabled `breakpoints`
  * Panels
    * Fixed issue with wrong styles when panels become visible by breakpoints
  * PhotoBrowser
    * Improved zoom behavior on Androids (due to Swiper update)
  * Router
    * Added routes alias support
      ```
      routes = [
        {
          path: '/foo/',
          url: 'somepage.html',
          alias: '/bar/',
        }
      ]
      ```
    * Added routes redirect support
      ```
      routes = [
        {
          path: '/foo/',
          url: 'somepage.html',
        },
        {
          path: '/bar/',
          redirect: '/foo/',
        }
      ]
      ```
  * Build
    * Along with config file path now it is also possible to specify build output path like `npm run build:prod -- --config path/to/config.js --output path/to/build`
  * Minor fixes

# [v2.0.0-beta.15](https://github.com/framework7io/framework7/compare/v2.0.0-beta.14...v2.0.0-beta.15) - October 27, 2017
  * Fixed issue with extented context in router components

# [v2.0.0-beta.14](https://github.com/framework7io/framework7/compare/v2.0.0-beta.12...v2.0.0-beta.14) - October 26, 2017
  * Fix router page events issue when no `route` passed to page callback

# [v2.0.0-beta.12](https://github.com/framework7io/framework7/compare/v2.0.0-beta.11...v2.0.0-beta.12) - October 26, 2017
  * Router
    * Added [path-to-regexp](https://github.com/pillarjs/path-to-regexp) for better route matching with support of RegExp in route path
    * Route `name` renamed to `pageName` parameter to specify page's name to load. Route `name` now means name of the route
    * Added additional routes arguments to `async` method. Now it is `async(routeTo, routeFrom, resolve, reject)`
    * `pushState` now supports for multiple Views at a time
    * Router component's context now can be extended with `options.context` route parameter
    * Router component now supports inline nested `<template>` that won't be parsed by Template7
    * Addded support for dynamic routes
    * Route events, now it is possible to specify `on` object with page events on route object
  * PhotoBrowser
    * Now uses Virtual Slides by default
  * Input
    * Now automatically scrolls into view on Androids when keyboard becomes opened
  * Colors
    * Number of built-in colors reduced to red, green, blue, pink, yellow, orange, white, black, gray
  * Build
    * Now it is possible to specify path to config file like `npm run build:dev -- --config path/to/config.js`
  * Lost of minor fixes

# [v2.0.0-beta.11](https://github.com/framework7io/framework7/compare/v2.0.0-beta.10...v2.0.0-beta.11) - October 13, 2017
  * Messagebar
    * Added `top` parameter to consider it as top messagebar
    * Added `resizePage` parameter to define whether it should resize the page
    * Added `maxHeight` parameter to specify messagebar max-height on resize
  * Minor fixes

# [v2.0.0-beta.10](https://github.com/framework7io/framework7/compare/v2.0.0-beta.9...v2.0.0-beta.10) - October 11, 2017
  * Swiper update to latest 4.0.1:
    * Fixed issue with pagination being broken with loop mode
    * Reworked `realIndex` calculation ordering
  * Router
    * Now it creates dynamically navbar (for isDynamicNavbar) only when the page with navbar appears
  * Statusbar
    * Fixed broken `statusbar.show` method
  * Package
    * Now it exports by default modular `framework7.esm.js` version instead of bundle

# [v2.0.0-beta.9](https://github.com/framework7io/framework7/compare/v2.0.0-beta.8...v2.0.0-beta.9) - October 8, 2017
  * New Picker component
  * New Calendar component
  * New Custom Modal component
  * Router
    * Added support for swipeable routable tabs
  * Swiper
    * Update to latest version with Virtual Slides support
  * ES-next modules renamed
    * `framework7.module.js` -> `framework7.esm.bundle.js` (exported by default)
    * `framework7.modular.js` -> `framework7.esm.js`
  * Numerous fixes and improvements

# [v2.0.0-beta.8](https://github.com/framework7io/framework7/compare/v2.0.0-beta.7...v2.0.0-beta.8) - September 21, 2017
  * Toolbar
    * Class `toolbar-bottom` to display it on the bottom for MD theme has been renamed to `toolbar-bottom-md`.
  * Sortable
    * Renamed events `sortable:open` -> `sortable:enable`, `sortable:close` -> `sortable:disable`.
  * Grid
    * `no-gutter` class renamed to `no-gap`.
  * Card
    * `card-content-inner` element has been removed. Now to have the same effect it is required additional `card-content-padding` class to `card-content` element.
  * Modal is now a part of a core components.
  * Toast
    * Added icon support for center-positioned Toast.
  * Router
    * Reloaded page (called with `reloadAll` or `reloadCurrent` parameters) now also fires `pageBeforeIn` and `pageAfterIn` events.
    * Improved routable Tabs. Now it also works with Animated Tabs.
  * Notification
    * All new Notification component arrived, with better unified look and swipe-to-close support.
  * Buttons
    * `small` buttons now can be round and not round.
  * Lots of minor fixes.

# [v2.0.0-beta.7](https://github.com/framework7io/framework7/compare/v2.0.0-beta.6...v2.0.0-beta.7) - September 13, 2017
  * Fixed issue with Routable Tabs not working correctly on home page
  * Fixed issue with touch ripple effect being broken after bundler optimization

# [v2.0.0-beta.6](https://github.com/framework7io/framework7/compare/v2.0.0-beta.5...v2.0.0-beta.6) - September 13, 2017
  * Template7 updated to latest v1.3.0

# [v2.0.0-beta.5](https://github.com/framework7io/framework7/compare/v2.0.0-beta.4...v2.0.0-beta.5) - September 13, 2017
  * Small core refactorings to work better in tree-shaking bundlers

# [v2.0.0-beta.4](https://github.com/framework7io/framework7/compare/v2.0.0-beta.3...v2.0.0-beta.4) - September 11, 2017
  * Added full RTL layout support (with new `.rtl` stylesheets).
  * Removed XHR (Ajax) functionality from Dom7, including `$.ajax`, `$.get`, `$.post`, `$.getJSON`. These are replaced with new Framework7 `request` module.
  * Removed `$.` utilities from Dom7, including `$.parseUrlQuery`, `$.isArray`, `$.each`, `$.unique`, `$.serializeObject`, `$.dataset`, `$.extend`, they are available via `Framework7.utils` or `app.utils`.
  * Utils' `.promise` now returns native Promise if it is supported by browser and fallback to Promise-like polifyl if it is not supported.

# [v2.0.0-beta.3](https://github.com/framework7io/framework7/compare/v2.0.0-beta.2...v2.0.0-beta.3) - September 7, 2017
  * Add new Autocomplete component
  * Add new Toast component
  * New modular package `framework7.modular.js`
  * New view `restoreScrollTopOnBack` parameter to restor previous page scroll position when navigating back
  * Lots of minor fixes and improvements

# [v2.0.0-beta.2](https://github.com/framework7io/framework7/compare/v2.0.0-beta.1...v2.0.0-beta.2) - September 2, 2017
  * Add new Swiper component
  * Add new Photo Browser component
  * Ported Notifications component
  * Improved custom build
  * Lots of minor fixes

# [v2.0.0-beta.1](https://github.com/framework7io/framework7/compare/v1.6.4...v2) - August 21, 2017
  * Initial v2 release
