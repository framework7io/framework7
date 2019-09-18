# [v5.0.0](https://github.com/framework7io/framework7/compare/v4.5.0...v5.0.0)

## CSS & Theming

* iOS Dark theme colors reworked to match iOS 13 dark theme colors
* Most of CSS variables related to colors (especially "gray" colors) reworked to `rgba` colors to appear better on custom designs. It is related to text colors, background colors, icons colors, borders and hairlines colors.
* Most of iOS theme `15px` sizes (list/blocks paddings and margins) are changed to `16px` instead
* New CSS breakpoints. Now there are new names for app sizes instead of `tablet-` and `desktop-` before. Now they are:
  * `xsmall` - width more than `480px`
  * `small` - width more than `568px`
  * `medium` - width more than `768px`
  * `large` - width more than `1024px`
  * `xlarge` - width more than `1200px`
* Dark Theme can now be excluded from bundle (custom build)
* Light Theme can now also be excluded from bundle (custom build)

## Core APIs & Modules

* **iOS Translucent**
  * New `iosTranslucentBars` app parameter to enable translucent effect (blur background) on navigation bars (by default enabled)
  * New `iosTranslucentModals` app parameter to enable translucent effect (blur background) on modals (Dialog, Popover, Actions) (by default enabled)
* **Connection API** (new)
  * New F7 instance's `online` boolean property that is `true` when app online and `false` otherwise
  * Now app emits `online` event when app goes online
  * Now app emits `offline` event when app goes offline
  * Now app emits `connection` event on app connection change
* **Device**
  * `.needsStatusbarOverlay()` method has been removed
  * `.statusbar` property and detection has been removed
  * `.iphoneX` property and detection has been removed
  * `.windowsPhone` property and detection has been removed
  * It doesn't set `device-ios-gt-{version}` classes on `html` element anymore
  * It doesn't set `device-{os}-{version}` classes on `html` element anymore
* **Request**
  * Request "promise" methods now will be resolved with `{ data, status, xhr }` object (rather than with just `data` like before)
  * Request "promise" methods now will be rejected with `{ message, status, xhr }` object (rather than with just `status` like before)
* **Statusbar**
    * Statusbar overlay element (`<div class="statusbar">`) and related functionality has been removed in favor of using that space by navigation bars and other elements to provide true full-screen experience and customization. Statusbar cordova's API is there as it was before.
* **Touch**
  * Fast clicks functionality has been completely removed. Following `app.touch`' parameters are not supported anymore: `fastClicks`, `fastClicksDistanceThreshold`, `fastClicksDelayBetweenClicks` and `fastClicksExclude`
  * Added support to disable "active state" on specific elements by adding `no-active-state` class to such elements
* **View/Router**
  * New `loadInitialPage` (boolean) parameter. When enabled, and there is no children pages inside of the View. It will load initial page that matches to initial URL (default true)
  * New `componentCache` (boolean) parameter. When enabled, Router will cache components specified via `componentUrl` (default true)
  * Removed `.clearPreviousPages()` method. Now there is only `.clearPreviousHistory()` that removes both history and pages from DOM
  * Root (first) detail page (in master-detail layout) will now have extra `page-master-detail-root`
  * Root (first) detail navbar (in master-detail layout) will now have extra `navbar-master-detail-root`.
  * Route declaration now supports new `viewName` property. And whatever View such route requested, it will be loaded in View specified in `viewName` property.
  * Added custom page transitions support and 8 new page transitions: `f7-circle`, `f7-cover`, `f7-cover-v`, `f7-dive`, `f7-fade`, `f7-flip`, `f7-parallax`, `f7-push`
  * Route declaration now supports new `options.transition` string property to specify custom transition for this route
  * Custom transition can now also be specified via `data-transition` attribute on links
  * It is now possible to specify "current" view for link to load the page with `data-view="current"` attribute

## Core Components

* **Action Sheet**
  * Now it also appears in dark when dark theme enabled
* **Autocomplete**
  * New `popupPush` parameter - enables Autocomplete popup to push view(s) behind on open
  * New `popupSwipeToClose` parameter - enables ability to close Autocomplete popup with swipe
* **Block**
  * Now it uses new breakpoint names for `{size}-inset` classes (e.g. `tablet-inset` -> `medium-inset`, etc.)
  * Block title in iOS theme is now larger and bolder
* **Button**
  * iOS theme buttons are reworked a bit. They now has thicker border and uppercased
  * New "strong" segmented style (e.g. iOS 13 segmented). Can be enabled by adding `segmented-strong` class to segmented element (`<div class="segmented">`)
* **Calendar**
  * Now calendar value will be cleared on related input's clear (when "clear button" clicked)
  * Calendar has been reworked to use `Intl.DateTimeFormat` API.
    * New `locale` parameter (e.g. `en-US`). If not specified, it will use browser locale
    * `dateFormat` now can accept `Intl.DateTimeFormatOptions` (e.g. `{ month: 'long', day: 'numeric' }`)
    * `monthNames` now by default is `auto` - it will display month names based on specified locale (or browser locale)
    * `monthNamesShort` now by default is `auto` - it will display month names based on specified locale (or browser locale)
    * `dayNames` now by default is `auto` - it will display week day names based on specified locale (or browser locale)
    * `dayNamesShort` now by default is `auto` - it will display week day names based on specified locale (or browser locale)
    * Jalali calendar and `IDate` dependency removed in favor of new Intl api
  * New month picker functionality (clicking month name in toolbar will open month picker) with new `monthPicker` parameter (by default true)
  * New year picker functionality (clicking year in toolbar will open year picker) with new `yearPicker` parameter (by default true)
  * New `yearPickerMin` parameter to specify minimum available year for year picker, by default is today minus 100 years
  * New `yearPickerMax` parameter to specify maximum available year for year picker, by default is today plus 100 years
  * New time picker functionality (to select a time in addition to date) with new `timePicker` parameter (by default false)
  * New `timePickerFormat` parameter to specify time format displayed in time selector. (default `{ hour: 'numeric', minute: 'numeric' }`)
  * New `timePickerPlaceholder` parameter to specify time picker placeholder text (default "Select time")
  * New `sheetPush` parameter - enables Calendar sheet to push view(s) behind on open
  * New `sheetSwipeToClose` parameter - to close Calendar sheet with swipe
* **Card**
  * New `hideStatusbarOnOpen` app card parameter - will hide "Statusbar" on expandable card open. (default `true`)
* **Color Picker**
  * New `popupPush` parameter - enables Color Picker popup to push view(s) behind on open
  * New `popupSwipeToClose` parameter - enables ability to close Color Picker popup with swipe
  * New `sheetPush` parameter - enables Color Picker sheet to push view(s) behind on open
  * New `sheetSwipeToClose` parameter - enables ability to close Color Picker sheet with swipe
* **Data Table**
  * Removed support for `tablet-only` and `desktop-only` classes for table columns. Now it uses new breakpoint names and classes accordingly (e.g. `medium-inset`, `xlarge-inset`, etc.)
* **Dialog**
  * Now it also appears in dark when dark theme enabled
* **Grid**
  * Now it uses new breakpoint names for responsive columns classes (e.g. `tablet-50` -> `medium-50`, etc.)
* **List**
  * Now it uses new breakpoint names for `{size}-inset` classes (e.g. `tablet-inset` -> `medium-inset`, etc.)
  * Removed declaration for list icon default color (that could make it harder to customize)
* **Login Screen**
  * Now it centers content vertically
* **Navbar**
  * iOS theme dynamic Navbar behavior totally reworked. Now it doesn't take `navbar-inner` from the page's Navbar, but takes whole Navbar element. It makes it easier to customize each navbar (bg color, text color, hairlines, shadows) and brings better transitions between them.
  * Navbar size now will be increased (when top safe-area is in place) to cover the status bar space. This gives even better full-screen experience and transitions.
  * Navbar HTML layout has been reworked, now it has new `navbar-bg` element:
    ```html
    <div class="navbar">
      <div class="navbar-bg"></div>
      <div class="navbar-inner">
        ...
      </div>
    </div>
    ```
  * Large Navbar should now have addition `navbar-large` class on navbar itself (instead of `navbar-large-inner` on `navbar-inner`):
    ```html
    <div class="navbar navbar-large">
      <div class="navbar-bg"></div>
      <div class="navbar-inner">
        ...
      </div>
    </div>
    ```
  * New large transparent Navbar (like in iOS 13), can enabled with additional `navbar-large-transparent` class:
    ```html
    <div class="navbar navbar-large navbar-large-transparent">
      <div class="navbar-bg"></div>
      <div class="navbar-inner">
        ...
      </div>
    </div>
    ```
* **Panel**
  * Panels functionality has been fully reworked and now behaves more like a modals, which means we now can have as many panels as we want (or need) not limited to only 2 (left and right) panels.
  * The following parameter has been removed from `app.panel` parameters: `leftBreakpoint`, `rightBreakpoint`, `swipe`, `swipeActiveArea`, `swipeColoseAtiveSide`, `swipeOnlyClose`, `swipeThreshold`, `closeByBackdropClick`.
  * Now every panel must be initialized separately and panel parameters must be specified for each panel.
  * It is now possible to auto init the panel by adding `panel-init` class and specify such panel parameters with `data-` attributes, e.g.:
    ```html
      <div class="panel panel-left panel-cover" data-swipe="true" data-visible-breakpoint="1200">
        ...
      </div>
    ```
  * Each panel supports new set of parameters:
    * `backdrop` - enables backdrop
    * `backdropEl` - specify custom backdop element
    * `collapsedBreakpoint` (number) - app width when panel becomes partially visible (collapsed)
    * `visibleBreakpoint` (number) - app width when panel becomes fully visible
    * `swipe` (boolean) - makes panel swipeable
    * `swipeOnlyClose` (boolean) - makes panel swipeable but only to close
    * `swipeActiveArea` (number) - active area from the edge of the screen where panel swipes enabled
    * `swipeThreshold` (number) - panel will not move with swipe if "touch distance" will be less than this value
  * Each panel instance has new methods:
    * `enableVisibleBreakpoint()`
    * `disableVisibleBreakpoint()`
    * `toggleVisibleBreakpoint()`
    * `enableCollapsedBreakpoint()`
    * `disableCollapsedBreakpoint()`
    * `toggleCollapsedBreakpoint()`
    * `enableResizable()`
    * `disableResizable()`
    * `enableSwipe()`
    * `disableSwipe()`
  * `app.panel.open(panel)/close(panel)` methods now can receive panel element (or CSS selector) of the panel to open/close. `left` and `right` values are still work buton only if you have only one left or right panel
  * The following F7 instance props and methods removed and indended to be used on panel instance instead:
    * `app.panel.enableSwipe()`
    * `app.panel.disableSwipe()`
    * `app.panel.enableResizableSwipe()`
    * `app.panel.disableResizableSwipe()`
    * `app.panel.left`
    * `app.panel.right`
  * `panel-active` panel class renamed to `panel-in`
* **PhotoBrowser**
  * `backLinkText` parameter renamed to `pageBackLinkText`
  * New `popupCloseLinkText` parameter to specify "close" link text when it is opened as Popup or as Standalone
  * New `navbarShowCount` parameter to define should it display "3 of 5" text in navbar title or not. If not specified (undefined) then it will show this text if there is more than 1 item
  * New `popupPush` parameter - enables Photo Browser popup to push view(s) behind on open
* **Picker**
  * Font size on picker items became smaller in iOS and MD themes
  * New `sheetPush` parameter - enables Picker sheet to push view(s) behind on open
  * New `sheetSwipeToClose` parameter - enables ability to close Picker sheet with swipe
* **Popup**
  * New boolean `push` parameter. When enabled it will push view behind on open. Works only when top safe area is in place. It can also enabled by adding `popup-push` class to popup element.
* **Sheet Modal**
  * In iOS theme it now has white background color by default
  * New boolean `push` parameter. When enabled it will push view behind on open. Works only when top safe area is in place. It can also enabled by adding `sheet-push` class to sheet modal element.
  * Swipeable Sheet Modal now correctly handles scrolling inside of nested `page-content` element
* **Sortable**
  * Sortable `sort` event data now also contain `el` property with reference to sorted item
* **Smart Select**
  * Fixed behavior when it is `multiple` and with Virtual List enabled
  * New `.unsetValue()` method to unset smart select value
  * New `popupPush` parameter - enables Smart Select popup to push view(s) behind on open
  * New `popupSwipeToClose` parameter - enables ability to close Smart Select popup with swipe
  * New `sheetPush` parameter - enables Smart Select sheet to push view(s) behind on open
  * New `sheetSwipeToClose` parameter - enables ability to close Smart Select sheet with swipe
* **Subnavbar**
  * Subnavbar's title element (`<div class="title">`) now should be used with class `subnavbar-title` instead (`<div class="subnavbar-title">`)
* **Text Editor**
  * All new touch-friendly Rich Text Editor component
* **Toolbar**
  * Tabbar labels size increased in iOS theme

## Framework7.Component (previously Router Component)

* Now it supports async `data` method (where it must return Promise)
  ```js
  export default {
    async data() {
      const user = await fetch('some/path').then(res => res.json());
      return {
        user,
      }
    }
  }
  ```
  or
  ```js
  export default {
    data() {
      return new Promise((resolve) => {
        fetch('some/path')
          .then(res => res.json())
          .then(user => resolve({ user }))
      });
    }
  }
  ```
* Component DOM updates are now async. It means that it is not guaranteed that DOM will be updated right after calling `$setState`. So there is a new `$tick` context method that can be safely used to reference DOM and ensure it was updated:
  ```js
  this.$setState({foo: 'bar'});
  this.$setState({john: 'doe'});
  this.$tick(() => {
    // DOM update
  });
  ```
* Component context has new `$update()` method that can be used instead of `$setState` to just trigger DOM update:
  ```js
  this.foo = 'bar';
  this.$update();
  ```
* Added support for mixins that can be re-used in components. Mixin can extend any component lifecycle hook, methods and `data`. Mixins should be passed in component's `mixins` property as an array:
  ```js
  const mountedMixin = {
    mounted() {
      // do something on mounted
      console.log('mounted');
    }
  }
  const defaultDataMixin = {
    data() {
      return { foo: 'bar' }
    }
  }
  // extend component with mixins
  export default {
    mixins: [ mountedMixin, defaultDataMixin ],
    data() {
      return { john: 'doe' }
    },
    // ...
  }
  ```
* It is also possible to register global mixins with new method `Framework7.registerComponentMixin(mixinName, mixin)`
  ```js
  Framework7.registerComponentMixin('default-data-mixin', {
    data() {
      return { foo: 'bar' }
    }
  });
  ```
  And use it like:
  ```js
  export default {
    mixins: [ 'default-data-mixin' ],
    data() {
      return { john: 'doe' }
    },
    // ...
  }
  ```
* Now it is possible to create custom reusable components with new method `Framework7.registerComponent(tagName, component)`
  ```js
  Framework7.registerComponent('my-list-item', {
    data() {
      return { foo: 'bar' }
    },
    template: `
      <li class="list-item" id="{{foo}}">...</li>
    `,
  })
  ```
  And use it in other components like:
  ```html
  <div class="list">
    <ul>
      <my-list-item></my-list-item>
    </ul>
  </div>
  ```
* New `class` based syntax for components for better TypeScript support:
  ```js
  import { Component } from 'famework7';

  export default class extends Component {
    data() {
      return { foo: 'bar' }
    }
    mounted() {
      console.log('mounted');
      this.onMount(); // call method
    }
    onMounted() {
      // ...
    }
    // ...
  }

## Phenome (Vue/React)

* Now it is possible to get Framework7 instance, `f7ready` function and `theme` by directly importing them from package. This can be useful for functional components that don't have F7 extensions, e.g.:
  ```js
    import { f7, f7ready, theme } from 'framework7-react';

    // or

    import { f7, f7ready, theme } from 'framework7-vue';
  ```
* Most of internal events reworked to use custom events system instead of DOM events. So all component events don't contain reference to HTML elements anymore.

## Phenome (Vue/React) Components

* **Block**
  * `tabletInset` prop has been removed
  * New inset props to reflect new breakpoint names: `xsmallInset`, `smallInset`, `mediumInset`, `largeInset`, `xlargeInset`
* **Button**
  * New `transition` (string) prop to specify custom page transition name for list link
* **Grid**
  * `Col` component now uses new breakpoint names for responsive size props. So there are new props instead of `tabletWidth` and `desktopWidth`: `xsmall`, `small`, `medium`, `large`, `xlarge`.
    ```html
      <Col size="50" medium="33" large="25">...</Col>
    ```
* **Icon**
  * `size` prop will also set element `width` and `height` in addition to just `font-size` (like before)
  * Removed support for Font Awesome and Ionic icons, props `fa` and `ion` and not supported anymore
* **Link**
  * New `transition` (string) prop to specify custom page transition name for list link
* **List**
  * Sortable `sort` event data now also contain `el` property with reference to sorted item
  * Sortable `sort` event data now contains `sortableData` property as first argument
  * `tabletInset` prop has been removed
  * New inset props to reflect new breakpoint names: `xsmallInset`, `smallInset`, `mediumInset`, `largeInset`, `xlargeInset`
* **ListItem**
  * `accordionBeforeOpen`, `accordionBeforeClose` events now contain `prevent` method as first argument
  * `swipeout` event now contains swipeout `progress` as first argument
  * New `transition` (string) prop to specify custom page transition name for list link
* **ListInput/Input**
  * Support for new `type="texteditor"` prop to make it appear as Text Editor
  * New `textEditorParams` prop to specify text editor parameters
* **Navbar**
  * Removed support for boolean `inner` prop and removed ability to render it without navbar-inner element
  * New `largeTransparent` prop to make large navbar transparent (should be used in addition to `large` prop)
  * `nav-left` slot renamed to `left`
  * `nav-right` slot renamed to `right`
  * New `title-large` slot
* **Panel**
  * New`collapsedBreakpoint` (number) prop - app width when panel becomes partially visible (collapsed)
  * New`visibleBreakpoint` (number) prop - app width when panel becomes fully visible
  * New`swipe` (boolean) prop - makes panel swipeable
  * New`swipeOnlyClose` (boolean) prop - makes panel swipeable but only to close
  * New`swipeActiveArea` (number) prop - active area from the edge of the screen where panel swipes enabled
  * New`swipeThreshold` (number) prop - panel will not move with swipe if "touch distance" will be less than this value
* **Page**
  * `ptr:refresh` event now contains `done` method as first argument
* **PageContent**
  * `ptr:refresh` event now contains `done` method as first argument
* **PhotoBrowser**
  * `backLinkText` prop renamed to `pageBackLinkText`
  * New `popupCloseLinkText` prop to specify "close" link text when it is opened as Popup or as Standalone
  * New `navbarShowCount` prop to define should it display "3 of 5" text in navbar title or not. If not specified (undefined) then it will show this text if there is more than 1 item
* **Popup**
  * New `push` prop to push view(s) behind on open
* **Segmented**
  * New `strong`, `strongIos`, `strongMd` and `strongAurora` props to enable new "strong" segmented style
* **Sheet**
  * New `push` prop to push view(s) behind on open
* **Statusbar**
  * `Statusbar` component has been removed
* **Tabs**
  * New `swiperParams` prop to specify swipeable tabs swiper parameters
* **TextEditor**
  * New `TextEditor` component




