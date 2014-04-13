'use strict';
/*===========================
Framework 7
===========================*/
window.Framework7 = function (params) {

    // App
    var app = this;

    // Anim Frame
    app._animFrame = function (callback) {
        if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
        else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
        else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
        else {
            return window.setTimeout(callback, 1000 / 60);
        }
    };

    // Default Parameters
    app.params = {
        cache: true,
        cacheDuration: 1000 * 60 * 10, // Ten minutes 
        preloadPreviousPage: true,
        // Fast clicks
        fastClicks : true,
        // 
        animateNavBackIcon: false,
        // Swipe Back
        swipeBackPage: true,
        swipeBackPageThreshold: 0,
        swipeBackPageActiveArea: 30,
        swipeBackPageBoxShadow: true,
        // Ajax
        ajaxLinks: false, // or CSS selector
        // Pull To Refresh
        pullToRefresh: true,
        // Swipeout
        swipeout: true,
        swipeoutNoFollow: false,
        // Smart Select Back link template
        smartSelectBackTemplate: '<div class="left"><a href="#" class="back link"><i class="icon icon-back-blue"></i><span>Back</span></a></div>',
        // Panels
        swipePanel: false, // or 'left' or 'right'
        swipePanelNoFollow: false,
        swipePanelThreshold: 0,
        panelsCloseByOutside: true,
        panelsVisibleZIndex: 6000,
        panelsAnimationDuration: 400,
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
        modalTitle: 'Framework7',
        modalCloseByOutside: false,
        modalActionsCloseByOutside: true,
        modalPopupCloseByOutside: true,
        modalPreloaderTitle: 'Loading... ',
        // Auto init
        init: true
    };

    // Extend defaults with parameters
    for (var param in params) {
        app.params[param] = params[param];
    }

    // Expose DOM lib
    app.$ = $;

    // Touch events
    app.touchEvents = {
        start: $.supportTouch ? 'touchstart' : 'mousedown',
        move: $.supportTouch ? 'touchmove' : 'mousemove',
        end: $.supportTouch ? 'touchend' : 'mouseup'
    };

    // Link to local storage
    app.ls = localStorage;
    