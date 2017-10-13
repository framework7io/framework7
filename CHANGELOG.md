# [v2.0.0-beta.11](https://github.com/nolimits4web/framework7/compare/v2.0.0-beta.10...v2.0.0-beta.11) - October 13, 2017
  * Messagebar
    * Added `top` parameter to consider it as top messagebar
    * Added `resizePage` parameter to define whether it should resize the page
    * Added `maxHeight` parameter to specify messagebar max-height on resize
  * Minor fixes

# [v2.0.0-beta.10](https://github.com/nolimits4web/framework7/compare/v2.0.0-beta.9...v2.0.0-beta.10) - October 11, 2017
  * Swiper update to latest 4.0.1:
    * Fixed issue with pagination being broken with loop mode
    * Reworked `realIndex` calculation ordering
  * Router
    * Now it creates dynamically navbar (for isDynamicNavbar) only when the page with navbar appears
  * Statusbar
    * Fixed broken `statusbar.show` method
  * Package
    * Now it exports by default modular `framework7.esm.js` version instead of bundle

# [v2.0.0-beta.9](https://github.com/nolimits4web/framework7/compare/v2.0.0-beta.8...v2.0.0-beta.9) - October 8, 2017
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

# [v2.0.0-beta.8](https://github.com/nolimits4web/framework7/compare/v2.0.0-beta.7...v2.0.0-beta.8) - September 21, 2017
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

# [v2.0.0-beta.7](https://github.com/nolimits4web/framework7/compare/v2.0.0-beta.6...v2.0.0-beta.7) - September 13, 2017
  * Fixed issue with Routable Tabs not working correctly on home page
  * Fixed issue with touch ripple effect being broken after bundler optimization

# [v2.0.0-beta.6](https://github.com/nolimits4web/framework7/compare/v2.0.0-beta.5...v2.0.0-beta.6) - September 13, 2017
  * Template7 updated to latest v1.3.0

# [v2.0.0-beta.5](https://github.com/nolimits4web/framework7/compare/v2.0.0-beta.4...v2.0.0-beta.5) - September 13, 2017
  * Small core refactorings to work better in tree-shaking bundlers

# [v2.0.0-beta.4](https://github.com/nolimits4web/framework7/compare/v2.0.0-beta.3...v2.0.0-beta.4) - September 11, 2017
  * Added full RTL layout support (with new `.rtl` stylesheets).
  * Removed XHR (Ajax) functionality from Dom7, including `$.ajax`, `$.get`, `$.post`, `$.getJSON`. These are replaced with new Framework7 `request` module.
  * Removed `$.` utilities from Dom7, including `$.parseUrlQuery`, `$.isArray`, `$.each`, `$.unique`, `$.serializeObject`, `$.dataset`, `$.extend`, they are available via `Framework7.utils` or `app.utils`.
  * Utils' `.promise` now returns native Promise if it is supported by browser and fallback to Promise-like polifyl if it is not supported.

# [v2.0.0-beta.3](https://github.com/nolimits4web/framework7/compare/v2.0.0-beta.2...v2.0.0-beta.3) - September 7, 2017
  * Add new Autocomplete component
  * Add new Toast component
  * New modular package `framework7.modular.js`
  * New view `restoreScrollTopOnBack` parameter to restor previous page scroll position when navigating back
  * Lots of minor fixes and improvements

# [v2.0.0-beta.2](https://github.com/nolimits4web/framework7/compare/v2.0.0-beta.1...v2.0.0-beta.2) - September 2, 2017
  * Add new Swiper component
  * Add new Photo Browser component
  * Ported Notifications component
  * Improved custom build
  * Lots of minor fixes

# [v2.0.0-beta.1](https://github.com/nolimits4web/framework7/compare/v1.6.4...v2) - August 21, 2017
  * Initial v2 release
