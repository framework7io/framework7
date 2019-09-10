# WIP

<!--
v5: Core: Device - remove needsStatusbarOverlay(), remove .statusbar …
-->

# [v5.0.0](https://github.com/framework7io/framework7/compare/v4.5.0...v5.0.0) - August 21, 2019
  * Core
    * All new Rich Text Editor component 🎉
    * Sortable
      * Sortable `sort` event data now also contain `el` property with reference to sorted item
    * Smart Select
      * Fixed behavior when it is `multiple` and with Virtual List enabled
    * Calendar
      * Now calendar value will be cleared on related input's clear (when "clear button" clicked)
      * Calendar has been reworked to use `Intl.DateTimeFormat` API.
      * New `locale` parameter (e.g. `en-US`). If not specified, it will use browser locale
      * `dateFormat` now can accept `Intl.DateTimeFormatOptions` (e.g. `{ month: 'long', day: 'numeric' }`)
      * `monthNames` now by default is `auto` - it will display month names based on specified locale (or browser locale)
      * `monthNamesShort` now by default is `auto` - it will display month names based on specified locale (or browser locale)
      * `dayNames` now by default is `auto` - it will display week day names based on specified locale (or browser locale)
      * `dayNamesShort` now by default is `auto` - it will display week day names based on specified locale (or browser locale)
      * New month picker functionality (clicking month name in toolbar will open month picker) with new `monthPicker` parameter (by default true)
      * New year picker functionality (clicking year in toolbar will open year picker) with new `yearPicker` parameter (by default true)
      * New `yearPickerMin` parameter to specify minimum available year for year picker, by default is today minus 100 years
      * New `yearPickerMax` parameter to specify maximum available year for year picker, by default is today plus 100 years
      * New time picker functionality (to select a time in addition to date) with new `timePicker` parameter (by default false)
      * New `timePickerFormat` parameter to specify time format displayed in time selector. (default { hour: 'numeric', minute: 'numeric' }) */
      * New `timePickerPlaceholder` parameter to specify time picker placeholder text (default "Select time")
    * Touch
      * Fast clicks functionality has been completely removed. Following `app.touch`' parameters are not supported anymore: `fastClicks`, `fastClicksDistanceThreshold`, `fastClicksDelayBetweenClicks` and `fastClicksExclude`
    * View/Router
      * New `loadInitialPage` (boolean) parameter. When enabled, and there is no children pages inside of the View. It will load initial page that matches to initial URL (default true)
      * New `componentCache` (boolean) parameter. When enabled, Router will cache components specified via `componentUrl` (default true)
    * PhotoBrowser
      * `backLinkText` parameter renamed to `pageBackLinkText`
      * New `popupCloseLinkText` parameter to specify "close" link text when it is opened as Popup or as Standalone
      * New `navbarShowCount` parameter to define should it display "3 of 5" text in navbar title or not. If not specified (undefined) then it will show this text if there is more than 1 ite
    * Component (previously Router Component)
      * Now it supports async `data` method (where it must return Promise) 🎉
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
      * Now it is possible to create custom reusable components with new method `Framework7.registerComponent(tagName, component)` 🎉🎉🎉
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
      * New `class` based syntax for components with better TypeScript support:
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
  * Phenome
    * Package
      * Now it is possible to get Framework7 instance, `f7ready` function and `theme` by directly importing them from package. This can be useful for functional components that don't have F7 extensions, e.g.:
        ```js
          import { f7, f7ready, theme } from 'framework7-react';

          // or

          import { f7, f7ready, theme } from 'framework7-vue';
        ```
    * TextEditor
      * New `TextEditor` component
    * Page
      * `ptr:refresh` event now contains `done` method as first argument
    * PageContent
      * `ptr:refresh` event now contains `done` method as first argument
    * List
      * Sortable `sort` event data now also contain `el` property with reference to sorted item
      * Sortable `sort` event data now contains `sortableData` property as first argument
    * ListItem
      * `accordionBeforeOpen`, `accordionBeforeClose` events now contain `prevent` method as first argument
      * `swipeout` event now contains swipeout `progress` as first argument
    * ListInput/Input
      * Support for new `type="texteditor"` prop to make it as Text Editor
      * New `textEditorParams` prop to specify text editor parameters
    * Tabs
      * New `swiperParams` prop to specify swipeable tabs swiper parameters
    * Icon
      * Now passed `size` prop will also set element `width` and `height` in addition to just `font-size` before
      * Removed support for Font Awesome and Ionic icons, props `fa` and `ion` and not supported anymore
    * PhotoBrowser
      * `backLinkText` prop renamed to `pageBackLinkText`
      * New `popupCloseLinkText` prop to specify "close" link text when it is opened as Popup or as Standalone
      * New `navbarShowCount` prop to define should it display "3 of 5" text in navbar title or not. If not specified (undefined) then it will show this text if there is more than 1 item
