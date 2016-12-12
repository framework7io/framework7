'use strict';
/*===========================
Framework 7
===========================*/
window.Framework7 = function (params) {
    // App
    var app = this;

    // Version
    app.version = '1.5.0';

    // Default Parameters
    app.params = {
        //
        root: 'body',
        //
        cache: true,
        cacheIgnore: [],
        cacheIgnoreGetParameters: false,
        cacheDuration: 1000 * 60 * 10, // Ten minutes
        preloadPreviousPage: true,
        uniqueHistory: false,
        uniqueHistoryIgnoreGetParameters: false,
        dynamicPageUrl: 'content-{{index}}',
        allowDuplicateUrls: false,
        router: true,
        routerRemoveTimeout: false,
        routerRemoveWithTimeout: false,
        // Push State
        pushState: false,
        pushStateRoot: undefined,
        pushStateNoAnimation: false,
        pushStateSeparator: '#!/',
        pushStateOnLoad: true,
        // Fast clicks
        fastClicks: true,
        fastClicksDistanceThreshold: 10,
        fastClicksDelayBetweenClicks: 50,
        fastClicksExclude: '', // CSS selector
        // Tap Hold
        tapHold: false,
        tapHoldDelay: 750,
        tapHoldPreventClicks: true,
        // Active State
        activeState: true,
        activeStateElements: 'a, button, label, span',
        // Animate Nav Back Icon
        animateNavBackIcon: false,
        // Swipe Back
        swipeBackPage: true,
        swipeBackPageThreshold: 0,
        swipeBackPageActiveArea: 30,
        swipeBackPageAnimateShadow: true,
        swipeBackPageAnimateOpacity: true,
        // Ajax
        ajaxLinks: undefined, // or CSS selector
        // External Links
        externalLinks: '.external', // CSS selector
        // Sortable
        sortable: true,
        // Scroll toolbars
        hideNavbarOnPageScroll: false,
        hideToolbarOnPageScroll: false,
        hideTabbarOnPageScroll: false,
        showBarsOnPageScrollEnd: true,
        showBarsOnPageScrollTop: true,
        // Swipeout
        swipeout: true,
        swipeoutActionsNoFold: false,
        swipeoutNoFollow: false,
        swipeoutRemoveWithTimeout: false,
        // Smart Select Back link template
        smartSelectOpenIn: 'page', // or 'popup' or 'picker'
        smartSelectBackText: 'Back',
        smartSelectPopupCloseText: 'Close',
        smartSelectPickerCloseText: 'Done',
        smartSelectSearchbar: false,
        smartSelectBackOnSelect: false,
        // Tap Navbar or Statusbar to scroll to top
        scrollTopOnNavbarClick: false,
        scrollTopOnStatusbarClick: false,
        // Panels
        swipePanel: false, // or 'left' or 'right'
        swipePanelActiveArea: 0,
        swipePanelCloseOpposite: true,
        swipePanelOnlyClose: false,
        swipePanelNoFollow: false,
        swipePanelThreshold: 0,
        panelsCloseByOutside: true,
        // Modals
        modalButtonOk: 'OK',
        modalButtonCancel: 'Cancel',
        modalUsernamePlaceholder: 'Username',
        modalPasswordPlaceholder: 'Password',
        modalTitle: 'Framework7',
        modalCloseByOutside: false,
        actionsCloseByOutside: true,
        popupCloseByOutside: true,
        modalPreloaderTitle: 'Loading... ',
        modalStack: true,
        // Lazy Load
        imagesLazyLoadThreshold: 0,
        imagesLazyLoadSequential: true,
        // Name space
        viewClass: 'view',
        viewMainClass: 'view-main',
        viewsClass: 'views',
        // Notifications defaults
        notificationCloseOnClick: false,
        notificationCloseIcon: true,
        notificationCloseButtonText: 'Close',
        // Animate Pages
        animatePages: true,
        // Template7
        templates: {},
        template7Data: {},
        template7Pages: false,
        precompileTemplates: false,
        // Material
        material: false,
        materialPageLoadDelay: 0,
        materialPreloaderSvg: '<svg xmlns="http://www.w3.org/2000/svg" height="75" width="75" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg>',
        materialPreloaderHtml:
            '<span class="preloader-inner">' +
                '<span class="preloader-inner-gap"></span>' +
                '<span class="preloader-inner-left">' +
                    '<span class="preloader-inner-half-circle"></span>' +
                '</span>' +
                '<span class="preloader-inner-right">' +
                    '<span class="preloader-inner-half-circle"></span>' +
                '</span>' +
            '</span>',
        materialRipple: true,
        materialRippleElements: '.ripple, a.link, a.item-link, .button, .modal-button, .tab-link, .label-radio, .label-checkbox, .actions-modal-button, a.searchbar-clear, a.floating-button, .floating-button > a, .speed-dial-buttons a',
        // Auto init
        init: true,
    };

    // Extend defaults with parameters
    for (var param in params) {
        app.params[param] = params[param];
    }

    // DOM lib
    var $ = Dom7;

    // Template7 lib
    var t7 = Template7;
    app._compiledTemplates = {};

    // App Root
    app.root = $(app.params.root);
    app.root.eq(0).addClass('framework7-root');

    // Touch events
    app.touchEvents = {
        start: app.support.touch ? 'touchstart' : 'mousedown',
        move: app.support.touch ? 'touchmove' : 'mousemove',
        end: app.support.touch ? 'touchend' : 'mouseup'
    };

    // Link to local storage
    app.ls = window.localStorage;

    // RTL
    app.rtl = $('body').css('direction') === 'rtl';
    if (app.rtl) $('html').attr('dir', 'rtl');

    // Overwrite statusbar overlay
    if (typeof app.params.statusbarOverlay !== 'undefined') {
        if (app.params.statusbarOverlay) $('html').addClass('with-statusbar-overlay');
        else $('html').removeClass('with-statusbar-overlay');
    }
    else if (app.device.ios && (window.cordova || window.phonegap)) {
        $(document).on('resume', function () {
            if (app.device.needsStatusBar()) {
                $('html').addClass('with-statusbar-overlay');
            }
        }, false);
    }
