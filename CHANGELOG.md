# Change Log

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
  