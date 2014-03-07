'use strict';
/*===========================
Framework 7
===========================*/
window.Framework7 = function (params) {
    // CSS ":active" pseudo selector fix
    document.addEventListener('touchstart', function () {}, true);

    // App
    var app = this;

    // Anim Frame
    app._animFrame = function (callback) {
        if (window.requestAnimationFrame) window.requestAnimationFrame(callback);
        else if (window.webkitRequestAnimationFrame) window.webkitRequestAnimationFrame(callback);
        else if (window.mozRequestAnimationFrame) window.mozRequestAnimationFrame(callback);
        else {
            window.setTimeout(callback, 1000 / 60);
        }
    };

    // Default Parameters
    app.params = {
        cache: true,
        cacheDuration: 1000 * 60 * 10, // Ten minutes 
        preloadPreviousPage: true,
        swipeBackPage: true,
        swipeBackPageThreshold: 0,
        swipeBackPageActiveArea: 30,
        // Panels
        panelsCloseByOutside: true,
        panelsVisibleZIndex: 6000,
        panelsAnimationDuration: 400,
        // panelsOpenBySwipe: true,
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
        modalPreloaderTitle: 'Loading... '
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