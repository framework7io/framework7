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
