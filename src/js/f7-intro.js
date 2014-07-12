'use strict';
/*===========================
Framework 7
===========================*/
window.Framework7 = function (params) {

    // App
    var app = this;

    // Version
    app.version = '0.9.2';

    // Default Parameters
    app.params = {
        cache: true,
        cacheIgnore: [],
        cacheIgnoreGetParameters: false,
        cacheDuration: 1000 * 60 * 10, // Ten minutes 
        preloadPreviousPage: true,
        // Push State
        pushState: false,
        pushStateRoot: undefined,
        pushStateNoAnimation: false,
        pushStateSeparator: '#!/',
        // Fast clicks
        fastClicks : true,
        // Animate Nav Back Icon
        animateNavBackIcon: false,
        // Swipe Back
        swipeBackPage: true,
        swipeBackPageThreshold: 0,
        swipeBackPageActiveArea: 30,
        swipeBackPageBoxShadow: true,
        // Ajax
        ajaxLinks: undefined, // or CSS selector
        // External Links
        externalLinks: ['external'], // array of CSS class selectors and/or rel attributes
        // Sortable
        sortable: true,
        // Swipeout
        swipeout: true,
        swipeoutNoFollow: false,
        // Smart Select Back link template
        smartSelectBackTemplate: '<div class="left sliding"><a href="#" class="back link"><i class="icon icon-back-blue"></i><span>{{backText}}</span></a></div>',
        smartSelectBackText: 'Back',
        smartSelectSearchbar: false,
        smartSelectBackOnSelect: false,
        // Panels
        swipePanel: false, // or 'left' or 'right'
        swipePanelActiveArea: 0,
        swipePanelNoFollow: false,
        swipePanelThreshold: 0,
        panelsCloseByOutside: true,
        panelsVisibleZIndex: 6000,
        // Modals
        modalTemplate: '<div class="modal {{noButtons}}">' +
                            '<div class="modal-inner">' +
                                '{{if title}}<div class="modal-title">{{title}}</div>{{/if title}}' +
                                '<div class="modal-text">{{text}}</div>' +
                                '{{afterText}}' +
                            '</div>' +
                            '<div class="modal-buttons">{{buttons}}</div>' +
                        '</div>',
        modalActionsTemplate: '<div class="actions-modal">{{buttons}}</div>',
        modalButtonOk: 'OK',
        modalButtonCancel: 'Cancel',
        modalUsernamePlaceholder: 'Username',
        modalPasswordPlaceholder: 'Password',
        modalTitle: 'Framework7',
        modalCloseByOutside: false,
        actionsCloseByOutside: true,
        popupCloseByOutside: true,
        modalPreloaderTitle: 'Loading... ',
        // Auto init
        init: true,
        // Name space
        viewClass: 'view',
        viewMainClass: 'view-main',
        viewsClass: 'views',
        // Notifications defaults
        notificationCloseOnClick: false,
        notificationCloseIcon: true,
        // Animate Pages
        animatePages: true

    };

    // Extend defaults with parameters
    for (var param in params) {
        app.params[param] = params[param];
    }

    // Expose DOM lib
    app.$ = $;

    // Touch events
    app.touchEvents = {
        start: app.support.touch ? 'touchstart' : 'mousedown',
        move: app.support.touch ? 'touchmove' : 'mousemove',
        end: app.support.touch ? 'touchend' : 'mouseup'
    };

    // Link to local storage
    app.ls = localStorage;

    // RTL
    app.rtl = $('body').css('direction') === 'rtl';
    if (app.rtl) $('html').attr('dir', 'rtl');

    
