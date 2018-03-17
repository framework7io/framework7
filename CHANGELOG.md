<a href="https://www.patreon.com/vladimirkharlampidi"><img src="https://cdn.framework7.io/i/support-badge.png" height="20"></a>

# Change Log

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
