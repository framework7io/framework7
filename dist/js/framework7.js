/*
 * Framework7 0.8.2
 * Full Featured HTML Framework For Building iOS 7 Apps
 *
 * http://www.idangero.us/framework7
 *
 * Copyright 2014, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: May 8, 2014
*/
(function () {

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
            cacheIgnoreList: [],
            cacheDuration: 1000 * 60 * 10, // Ten minutes 
            preloadPreviousPage: true,
            // Push State
            pushState: false,
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
            ajaxLinks: false, // or CSS selector
            // Pull To Refresh
            pullToRefresh: true,
            // Sortable
            sortable: true,
            // Swipeout
            swipeout: true,
            swipeoutNoFollow: false,
            // Smart Select Back link template
            smartSelectBackTemplate: '<div class="left sliding"><a href="#" class="back link"><i class="icon icon-back-blue"></i><span>Back</span></a></div>',
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
            modalTitle: 'Framework7',
            modalCloseByOutside: false,
            modalActionsCloseByOutside: true,
            modalPopupCloseByOutside: true,
            modalPreloaderTitle: 'Loading... ',
            // Auto init
            init: true,
            // Name space
            viewClass: 'view',
            viewMainClass: 'view-main',
            viewsClass: 'views',
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
        
        /*======================================================
        ************   Views   ************
        ======================================================*/
        app.views = [];
        app.addView = function (selector, params) {
            if (!selector) return;
            var $container = $(selector);
            if ($container.length === 0) return;
            
            var container = $container[0];
            if (typeof params === 'undefined') params = {};
            var docLocation = document.location.href;
            var viewURL = docLocation;
            if (app.params.pushState) {
                if (viewURL.indexOf('#/') >= 0 && viewURL.indexOf('#/#') < 0) viewURL = viewURL.split('#/')[0];
            }
            var view = {
                container: container,
                selector: selector,
                params: params || {},
                history: [],
                contentCache: {},
                url: $container.attr('data-url') || viewURL,
                pagesContainer: $('.pages', container)[0],
                main: $container.hasClass(app.params.viewMainClass),
                loadContent: function (content) {
                    app.loadContent(view, content);
                },
                loadPage: function (url) {
                    app.loadPage(view, url);
                },
                goBack: function (url) {
                    app.goBack(view, url, undefined);
                },
                hideNavbar: function () {
                    app.hideNavbar(container);
                },
                showNavbar: function () {
                    app.showNavbar(container);
                },
                hideToolbar: function () {
                    app.hideToolbar(container);
                },
                showToolbar: function () {
                    app.showToolbar(container);
                }
            };
            // Store to history main view's url
            if (view.url) {
                view.history.push(view.url);
            }
        
            // Store View in element for easy access
            container.f7View = view;
        
            // Add view to app
            app.views.push(view);
        
            // Init View's events
            app.initViewEvents(view);
        
            // Push State on load
            if (app.params.pushState && view.main) {
                if (docLocation.indexOf('#/') >= 0 && docLocation.indexOf('#/#') < 0) {
                    app.loadPage(view, docLocation.split('#/')[1], false);
                }
            }
            
            // Return view object
            return view;
        };
        
        // Live Events on view links
        app.initViewEvents = function (view) {
            if (!app.params.swipeBackPage) return;
            // Swipe Back to previous page
            var viewContainer = $(view.container),
                isTouched = false,
                isMoved = false,
                touchesStart = {},
                isScrolling,
                activePage,
                previousPage,
                viewContainerWidth,
                touchesDiff,
                allowViewTouchMove = true,
                touchStartTime,
                activeNavbar,
                previousNavbar,
                activeNavElements,
                previousNavElements,
                activeNavBackIcon,
                previousNavBackIcon,
                i,
                dynamicNavbar,
                el;
        
            function handleTouchStart(e, target) {
                if (!allowViewTouchMove || !app.params.swipeBackPage || isTouched || app.swipeoutOpenedEl) return;
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();
                dynamicNavbar = view.params.dynamicNavbar && viewContainer.find('.navbar-inner').length > 1;
            }
            
            function handleTouchMove(e, target) {
                if (!isTouched) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (isScrolling) {
                    isTouched = false;
                    return;
                }
                e.f7PreventPanelSwipe = true;
                if (!isMoved) {
                    var cancel = false;
                    // Calc values during first move fired
                    viewContainerWidth = viewContainer.width();
                    activePage = $(target || e.target).is('.page') ? $(target || e.target) : $(target || e.target).parents('.page');
                    previousPage = viewContainer.find('.page-on-left:not(.cached)');
                    if (touchesStart.x - viewContainer.offset().left > app.params.swipeBackPageActiveArea) cancel = true;
                    if (previousPage.length === 0 || activePage.length === 0) cancel = true;
                    if (cancel) {
                        isTouched = false;
                        return;
                    }
                    if (dynamicNavbar) {
                        activeNavbar = viewContainer.find('.navbar-on-center:not(.cached)');
                        previousNavbar = viewContainer.find('.navbar-on-left:not(.cached)');
                        activeNavElements = activeNavbar.find('.left, .center, .right');
                        previousNavElements = previousNavbar.find('.left, .center, .right');
                        if (app.params.animateNavBackIcon) {
                            activeNavBackIcon = activeNavbar.find('.left.sliding .back .icon');
                            previousNavBackIcon = previousNavbar.find('.left.sliding .back .icon');
                        }
                    }
                }
                isMoved = true;
        
                e.preventDefault();
                touchesDiff = pageX - touchesStart.x - app.params.swipeBackPageThreshold;
                if (touchesDiff < 0) touchesDiff = 0;
                var percentage = touchesDiff / viewContainerWidth;
        
                // Transform pages
                activePage.transform('translate3d(' + touchesDiff + 'px,0,0)');
                if (app.params.swipeBackPageBoxShadow && app.device.os !== 'android') activePage[0].style.boxShadow = '0px 0px 12px rgba(0,0,0,' + (0.5 - 0.5 * percentage) + ')';
        
                var pageTranslate = (touchesDiff / 5 - viewContainerWidth / 5);
                if (app.device.pixelRatio === 1) pageTranslate = Math.round(pageTranslate);
        
                previousPage.transform('translate3d(' + pageTranslate + 'px,0,0)');
                previousPage[0].style.opacity = 0.9 + 0.1 * percentage;
        
                // Dynamic Navbars Animation
                if (dynamicNavbar) {
                    for (i = 0; i < activeNavElements.length; i++) {
                        el = $(activeNavElements[i]);
                        el[0].style.opacity = (1 - percentage * 1.3);
                        if (el[0].className.indexOf('sliding') >= 0) {
                            var activeNavTranslate = percentage * el[0].f7NavbarRightOffset;
                            if (app.device.pixelRatio === 1) activeNavTranslate = Math.round(activeNavTranslate);
                            el.transform('translate3d(' + activeNavTranslate + 'px,0,0)');
                            if (app.params.animateNavBackIcon) {
                                if (el[0].className.indexOf('left') >= 0 && activeNavBackIcon.length > 0) {
                                    activeNavBackIcon.transform('translate3d(' + -activeNavTranslate + 'px,0,0)');
                                }
                            }
                        }
                    }
                    for (i = 0; i < previousNavElements.length; i++) {
                        el = $(previousNavElements[i]);
                        el[0].style.opacity = percentage * 1.3 - 0.3;
                        if (el[0].className.indexOf('sliding') >= 0) {
                            var previousNavTranslate = el[0].f7NavbarLeftOffset * (1 - percentage);
                            if (app.device.pixelRatio === 1) previousNavTranslate = Math.round(previousNavTranslate);
                            el.transform('translate3d(' + previousNavTranslate + 'px,0,0)');
                            if (app.params.animateNavBackIcon) {
                                if (el[0].className.indexOf('left') >= 0 && previousNavBackIcon.length > 0) {
                                    previousNavBackIcon.transform('translate3d(' + -previousNavTranslate + 'px,0,0)');
                                }
                            }
                        }
                    }
                }
        
            }
            function handleTouchEnd(e, target) {
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                isTouched = false;
                isMoved = false;
                if (touchesDiff === 0) {
                    $([activePage[0], previousPage[0]]).transform('').css({opacity: '', boxShadow: ''});
                    if (dynamicNavbar) {
                        activeNavElements.transform('').css({opacity: ''});
                        previousNavElements.transform('').css({opacity: ''});
                        if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.transform('');
                        if (previousNavBackIcon && activeNavBackIcon.length > 0) previousNavBackIcon.transform('');
                    }
                    return;
                }
                var timeDiff = (new Date()).getTime() - touchStartTime;
                var pageChanged = false;
                // Swipe back to previous page
                if (
                        timeDiff < 300 && touchesDiff > 10 ||
                        timeDiff >= 300 && touchesDiff > viewContainerWidth / 2
                    ) {
                    activePage.removeClass('page-on-center').addClass('page-on-right');
                    previousPage.removeClass('page-on-left').addClass('page-on-center');
                    if (dynamicNavbar) {
                        activeNavbar.removeClass('navbar-on-center').addClass('navbar-on-right');
                        previousNavbar.removeClass('navbar-on-left').addClass('navbar-on-center');
                    }
                    pageChanged = true;
                }
                // Reset custom styles
                // Add transitioning class for transition-duration
                $([activePage[0], previousPage[0]]).transform('').css({opacity: '', boxShadow: ''}).addClass('page-transitioning');
                if (dynamicNavbar) {
                    activeNavElements.css({opacity: ''})
                    .each(function () {
                        var translate = pageChanged ? this.f7NavbarRightOffset : 0;
                        var sliding = $(this);
                        sliding.transform('translate3d(' + translate + 'px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && activeNavBackIcon.length > 0) {
                                activeNavBackIcon.addClass('page-transitioning').transform('translate3d(' + -translate + 'px,0,0)');
                            }
                        }
        
                    }).addClass('page-transitioning');
        
                    previousNavElements.transform('').css({opacity: ''}).each(function () {
                        var translate = pageChanged ? 0 : this.f7NavbarLeftOffset;
                        var sliding = $(this);
                        sliding.transform('translate3d(' + translate + 'px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && previousNavBackIcon.length > 0) {
                                previousNavBackIcon.addClass('page-transitioning').transform('translate3d(' + -translate + 'px,0,0)');
                            }
                        }
                    }).addClass('page-transitioning');
                }
                allowViewTouchMove = false;
                app.allowPageChange = false;
        
                if (pageChanged) {
                    // Update View's URL
                    var url = view.history[view.history.length - 2];
                    view.url = url;
                    
                    // Page before animation callback
                    app.pageAnimCallbacks('before', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage});
                }
        
                activePage.transitionEnd(function () {
                    $([activePage[0], previousPage[0]]).removeClass('page-transitioning');
                    if (dynamicNavbar) {
                        activeNavElements.removeClass('page-transitioning').css({opacity: ''});
                        previousNavElements.removeClass('page-transitioning').css({opacity: ''});
                        if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.removeClass('page-transitioning');
                        if (previousNavBackIcon && previousNavBackIcon.length > 0) previousNavBackIcon.removeClass('page-transitioning');
                    }
                    allowViewTouchMove = true;
                    app.allowPageChange = true;
                    if (pageChanged) {
                        if (app.params.pushState) history.back();
                        app.afterGoBack(view, activePage, previousPage);
                    }
                });
            }
        
            viewContainer.on(app.touchEvents.start, handleTouchStart);
            viewContainer.on(app.touchEvents.move, handleTouchMove);
            viewContainer.on(app.touchEvents.end, handleTouchEnd);
             
            view.attachSubEvents = function (page, el) {
                $(el).on(app.touchEvents.start, function (e) {
                    return handleTouchStart.apply(page, [e, page]);
                });
                $(el).on(app.touchEvents.move, function (e) {
                    return handleTouchMove.apply(page, [e, page]);
                });
                $(el).on(app.touchEvents.end, function (e, page) {
                    return handleTouchEnd.apply(page, [e, page]);
                });
            };
        };
        
        /*======================================================
        ************   Navbars && Toolbars   ************
        ======================================================*/
        app.sizeNavbars = function (viewContainer) {
            var navbarInner = viewContainer ? $(viewContainer).find('.navbar .navbar-inner:not(.cached)') : $('.navbar .navbar-inner:not(.cached)');
            navbarInner.each(function () {
                var tt = $(this),
                    left = tt.find('.left'),
                    right = tt.find('.right'),
                    center = tt.find('.center'),
                    noLeft = left.length === 0,
                    noRight = right.length === 0,
                    leftWidth = noLeft ? 0 : left.outerWidth(true),
                    rightWidth = noRight ? 0 : right.outerWidth(true),
                    centerWidth = center.outerWidth(true),
                    navbarWidth = tt.width(),
                    onLeft = tt.hasClass('navbar-on-left'),
                    currLeft, diff;
        
                if (noRight) {
                    currLeft = navbarWidth - centerWidth;
                }
                if (noLeft) {
                    currLeft = 0;
                }
                if (!noLeft && !noRight) {
                    currLeft = (navbarWidth - rightWidth - centerWidth + leftWidth) / 2;
                }
                var requiredLeft = (navbarWidth - centerWidth) / 2;
                if (navbarWidth - leftWidth - rightWidth > centerWidth) {
                    if (requiredLeft < leftWidth) {
                        requiredLeft = leftWidth;
                    }
                    if (requiredLeft + centerWidth > navbarWidth - rightWidth) {
                        requiredLeft = navbarWidth - rightWidth - centerWidth;
                    }
                    diff = requiredLeft - currLeft;
                }
                else {
                    diff = 0;
                }
                center.css({left: diff + 'px'});
                if (center.hasClass('sliding')) {
                    center[0].f7NavbarLeftOffset = -(currLeft + diff);
                    center[0].f7NavbarRightOffset = navbarWidth - currLeft - diff - centerWidth;
                    if (onLeft) center.transform('translate3d(' + center[0].f7NavbarLeftOffset + 'px, 0, 0)');
                }
                if (!noLeft && left.hasClass('sliding')) {
                    left[0].f7NavbarLeftOffset = -leftWidth;
                    left[0].f7NavbarRightOffset = (navbarWidth - left.outerWidth()) / 2;
                    if (onLeft) left.transform('translate3d(' + left[0].f7NavbarLeftOffset + 'px, 0, 0)');
                }
                if (!noRight && right.hasClass('sliding')) {
                    right[0].f7NavbarLeftOffset = -(navbarWidth - right.outerWidth()) / 2;
                    right[0].f7NavbarRightOffset = rightWidth;
                    if (onLeft) right.transform('translate3d(' + right[0].f7NavbarLeftOffset + 'px, 0, 0)');
                }
                
            });
        };
        app.hideNavbar = function (viewContainer) {
            $(viewContainer).addClass('hidden-navbar');
            return true;
        };
        app.showNavbar = function (viewContainer) {
            var vc = $(viewContainer);
            vc.addClass('hiding-navbar').removeClass('hidden-navbar').find('.navbar').transitionEnd(function () {
                vc.removeClass('hiding-navbar');
            });
            return true;
        };
        app.hideToolbar = function (viewContainer) {
            $(viewContainer).addClass('hidden-toolbar');
            return true;
        };
        app.showToolbar = function (viewContainer) {
            var vc = $(viewContainer);
            vc.addClass('hiding-toolbar').removeClass('hidden-toolbar').find('.toolbar').transitionEnd(function () {
                vc.removeClass('hiding-toolbar');
            });
        };
        
        /*======================================================
        ************   XHR   ************
        ======================================================*/
        // XHR Caching
        app.cache = [];
        app.removeFromCache = function (url) {
            var index = false;
            for (var i = 0; i < app.cache.length; i++) {
                if (app.cache[i].url === url) index = i;
            }
            if (index !== false) app.cache.splice(index, 1);
        };
        
        // XHR
        app.xhr = false;
        app.get = function (url, callback) {
            if (app.params.cache && url.indexOf('nocache') < 0 && app.params.cacheIgnoreList.indexOf(url) < 0) {
                // Check is the url cached
                for (var i = 0; i < app.cache.length; i++) {
                    if (app.cache[i].url === url) {
                        // Check expiration
                        if ((new Date()).getTime() - app.cache[i].time < app.params.cacheDuration) {
                            // Load from cache
                            callback(app.cache[i].data);
                            return false;
                        }
                    }
                }
            }
        
            app.xhr = $.ajax({
                url: url,
                method: 'GET',
                start: app.params.onAjaxStart,
                complete: function (xhr) {
                    if (xhr.status === 200 || xhr.status === 0) {
                        callback(xhr.responseText, false);
                        if (app.params.cache) {
                            app.removeFromCache(url);
                            app.cache.push({
                                url: url,
                                time: (new Date()).getTime(),
                                data: xhr.responseText
                            });
                        }
                    }
                    else {
                        callback(xhr.responseText, true);
                    }
                    if (app.params.onAjaxComplete) app.params.onAjaxComplete(xhr);
                },
                error: function (xhr) {
                    callback(xhr.responseText, true);
                    if (app.params.onAjaxError) app.params.onAjaxonAjaxError(xhr);
                }
            });
        
            return app.xhr;
        };
        
        /*======================================================
        ************   Pages   ************
        ======================================================*/
        // On Page Init Callback
        app.pageInitCallback = function (view, pageContainer, url, position) {
            if (pageContainer.f7PageInitialized) return;
            pageContainer.f7PageInitialized = true;
            // Page Data
            var pageData = {
                container: pageContainer,
                url: url,
                query: $.parseUrlQuery(url || ''),
                name: $(pageContainer).attr('data-page'),
                view: view,
                from: position
            };
            // Before Init Callback
            $(pageData.container).trigger('pageBeforeInit', {page: pageData});
            app.initPage(pageContainer);
            // Init Callback
            $(pageData.container).trigger('pageInit', {page: pageData});
        };
        app.pageAnimCallbacks = function (callback, view, params) {
            // Page Data
            var pageData = {
                container: params.pageContainer,
                url: params.url,
                query: $.parseUrlQuery(params.url || ''),
                name: $(params.pageContainer).attr('data-page'),
                view: view,
                from: params.position
            };
            var oldPage = params.oldPage,
                newPage = params.newPage;
        
            if (callback === 'after') {
                $(pageData.container).trigger('pageAfterAnimation', {page: pageData});
        
            }
            if (callback === 'before') {
                // Add data-page on view
                $(view.container).attr('data-page', pageData.name);
        
                // Hide/show navbar dynamically
                if (newPage.hasClass('no-navbar') && !oldPage.hasClass('no-navbar')) {
                    view.hideNavbar();
                }
                if (!newPage.hasClass('no-navbar') && oldPage.hasClass('no-navbar')) {
                    view.showNavbar();
                }
                // Hide/show navbar toolbar
                if (newPage.hasClass('no-toolbar') && !oldPage.hasClass('no-toolbar')) {
                    view.hideToolbar();
                }
                if (!newPage.hasClass('no-toolbar') && oldPage.hasClass('no-toolbar')) {
                    view.showToolbar();
                }
                // Callbacks
                $(pageData.container).trigger('pageBeforeAnimation', {page: pageData});
            }
        };
        
        // Init Page Events and Manipulations
        app.initPage = function (pageContainer) {
            // Size navbars on page load
            if (app.sizeNavbars) app.sizeNavbars($(pageContainer).parents('.' + app.params.viewClass)[0]);
            // Init messages
            if (app.initMessages) app.initMessages(pageContainer);
            // Init forms storage
            if (app.initFormsStorage) app.initFormsStorage(pageContainer);
            // Init smart select
            if (app.initSmartSelects) app.initSmartSelects(pageContainer);
        };
        
        // Load Page
        app.allowPageChange = true;
        app._tempDomElement = document.createElement('div');
        
        // Search required element in parsed content in related view
        function _findElement(selector, container, view) {
            container = $(container);
            var found = container.find(selector);
            if (found.length > 1) {
                if (typeof view.selector === 'string') {
                    // Search in related view
                    found = container.find(view.selector + ' ' + selector);
                }
                if (found.length > 1) {
                    // Search in main view
                    found = container.find('.' + app.params.viewMainClass + ' ' + selector);
                }
            }
            if (found.length === 1) return found;
            else {
                return undefined;
            }
        }
        
        // Set pages classess for animation
        function _animatePages(leftPage, rightPage, direction, view) {
            // Loading new page
            if (direction === 'to-left') {
                leftPage.removeClass('page-on-center').addClass('page-from-center-to-left');
                rightPage.addClass('page-from-right-to-center');
            }
            // Go back
            if (direction === 'to-right') {
                leftPage.removeClass('page-on-left').addClass('page-from-left-to-center');
                rightPage.removeClass('page-on-center').addClass('page-from-center-to-right');
            }
        }
        
        // Set navbars classess for animation
        function _animateNavbars(leftNavbarInner, rightNavbarInner, direction, view) {
            // Loading new page
            if (direction === 'to-left') {
                rightNavbarInner.removeClass('navbar-on-right').addClass('navbar-from-right-to-center');
                rightNavbarInner.find('.sliding').each(function () {
                    var sliding = $(this);
                    sliding.transform('translate3d(0px,0,0)');
                    if (app.params.animateNavBackIcon) {
                        if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                            sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                        }
                    }
                });
        
                leftNavbarInner.removeClass('navbar-on-center').addClass('navbar-from-center-to-left');
                leftNavbarInner.find('.sliding').each(function () {
                    var sliding = $(this);
                    if (app.params.animateNavBackIcon) {
                        if (sliding.hasClass('center') && rightNavbarInner.find('.sliding.left .back .icon').length > 0) {
                            this.f7NavbarLeftOffset += rightNavbarInner.find('.sliding.left .back span')[0].offsetLeft;
                        }
                        if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                            sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarLeftOffset) + 'px,0,0)');
                        }
                    }
                    sliding.transform('translate3d(' + (this.f7NavbarLeftOffset) + 'px,0,0)');
                });
            }
            // Go back
            if (direction === 'to-right') {
                leftNavbarInner.removeClass('navbar-on-left').addClass('navbar-from-left-to-center');
                leftNavbarInner.find('.sliding').each(function () {
                    var sliding = $(this);
                    sliding.transform('translate3d(0px,0,0)');
                    if (app.params.animateNavBackIcon) {
                        if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                            sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                        }
                    }
                });
        
                rightNavbarInner.removeClass('navbar-on-center').addClass('navbar-from-center-to-right');
                rightNavbarInner.find('.sliding').each(function () {
                    var sliding = $(this);
                    if (app.params.animateNavBackIcon) {
                        if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                            sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarRightOffset) + 'px,0,0)');
                        }
                    }
                    sliding.transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
                });
            }
        }
        function _load(view, url, content) {
            var viewContainer = $(view.container),
                newPage, oldPage, pagesInView, i, oldNavbarInner, newNavbarInner, navbar, dynamicNavbar;
        
            // Preprocess content
            if (app.params.preprocess) {
                content = app.params.preprocess(content, url);
            }
        
            // Clear temp div
            app._tempDomElement.innerHTML = '';
        
            // Parse DOM
            if (url || (typeof content === 'string')) {
                app._tempDomElement.innerHTML = content;
            } else {
                if ('length' in content && content.length > 1) {
                    for (var ci = 0; ci < content.length; ci++) {
                        $(app._tempDomElement).append(content[ci]);
                    }
                } else {
                    $(app._tempDomElement).append(content);
                }
            }
            
            // Subevents for iframes
            if (view.params.subEvents) {
                $(app._tempDomElement).find('.page').each(function () {
                    var page = this;
                    $(page).find('iframe').on('load', function () {
                        view.attachSubEvents(page, this.contentWindow.document);
                    });
                });
            }
        
            // Find new page
            newPage = _findElement('.page', app._tempDomElement, view);
        
            // If page not found exit
            if (!newPage) {
                app.allowPageChange = true;
                return;
            }
        
            newPage.addClass('page-on-right');
        
            // Find old page (should be the last one) and remove older pages
            pagesInView = viewContainer.find('.page:not(.cached)');
            if (pagesInView.length > 1) {
                for (i = 0; i < pagesInView.length - 2; i++) {
                    if (!view.params.domCache)
                        $(pagesInView[i]).remove();
                    else
                        $(pagesInView[i]).addClass('cached');
                }
                if (!view.params.domCache)
                    $(pagesInView[i]).remove();
                else
                    $(pagesInView[i]).addClass('cached');
            }
            
            oldPage = viewContainer.find('.page:not(.cached)');
        
            // Dynamic navbar
            if (view.params.dynamicNavbar) {
                dynamicNavbar = true;
                // Find navbar
                newNavbarInner = _findElement('.navbar-inner', app._tempDomElement, view);
                if (!newNavbarInner) {
                    dynamicNavbar = false;
                }
                navbar = viewContainer.find('.navbar');
                oldNavbarInner = navbar.find('.navbar-inner:not(.cached)');
                if (oldNavbarInner.length > 0) {
                    for (i = 0; i < oldNavbarInner.length - 1; i++) {
                        if (!view.params.domCache)
                            $(oldNavbarInner[i]).remove();
                        else
                            $(oldNavbarInner[i]).addClass('cached');
                    }
                    if (!newNavbarInner && oldNavbarInner.length === 1) {
                        if (!view.params.domCache)
                            $(oldNavbarInner[0]).remove();
                        else
                            $(oldNavbarInner[0]).addClass('cached');
                    }
                    oldNavbarInner = navbar.find('.navbar-inner:not(.cached)');
                }
            }
            if (dynamicNavbar) {
                newNavbarInner.addClass('navbar-on-right');
                navbar.append(newNavbarInner[0]);
            }
        
            // save content areas into view's cache
            if (!url) {
                url = '#content-' + view.history.length;
        
                if (!view.params.domCache) {
                    if (view.history.length === 1) {
                        view.contentCache[view.history[0]] = { nav: oldNavbarInner, page: oldPage };
                    }
                    view.contentCache[url] = { nav: newNavbarInner, page: newPage };
                }
            }
        
            // Update View history
            view.url = url;
            view.history.push(url);
            
            // Append Old Page and add classes for animation
            $(view.pagesContainer).append(newPage[0]);
        
            // Page Init Events
            app.pageInitCallback(view, newPage[0], url, 'right');
            
            if (dynamicNavbar) {
                newNavbarInner.find('.sliding').each(function () {
                    var sliding = $(this);
                    sliding.transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
                    if (app.params.animateNavBackIcon) {
                        if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                            sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarRightOffset) + 'px,0,0)');
                        }
                    }
                });
            }
            // Force reLayout
            var clientLeft = newPage[0].clientLeft;
        
            // Before Anim Callback
            app.pageAnimCallbacks('before', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});
        
            // Set pages before animation
            _animatePages(oldPage, newPage, 'to-left', view);
        
            // Dynamic navbar animation
            if (dynamicNavbar) {
                setTimeout(function () {
                    _animateNavbars(oldNavbarInner, newNavbarInner, 'to-left', view);
                }, 0);
                    
            }
        
            newPage.animationEnd(function (e) {
                app.allowPageChange = true;
                newPage.removeClass('page-from-right-to-center page-on-right').addClass('page-on-center');
                oldPage.removeClass('page-from-center-to-left').addClass('page-on-left');
                if (dynamicNavbar) {
                    newNavbarInner.removeClass('navbar-from-right-to-center').addClass('navbar-on-center');
                    oldNavbarInner.removeClass('navbar-from-center-to-left').addClass('navbar-on-left');
                }
                app.pageAnimCallbacks('after', view, {pageContainer: newPage[0], url: url, position: 'right', oldPage: oldPage, newPage: newPage});
                if (app.params.pushState) app.pushStateClearQueue();
            });
        }
        app.loadContent = function (view, content, pushState) {
            if (!app.allowPageChange) return false;
            app.allowPageChange = false;
            if (app.xhr) {
                app.xhr.abort();
                app.xhr = false;
            }
            if (app.params.pushState)  {
                if (typeof pushState === 'undefined') pushState = true;
                if (pushState) history.pushState({content: content, url: '#content-' + view.history.length}, '', '#/#content-' + view.history.length);
            }
            _load(view, null, content);
        
        };
        app.loadPage = function (view, url, pushState) {
            if (!app.allowPageChange) return false;
            if (view.url === url) return false;
            app.allowPageChange = false;
            if (app.xhr) {
                app.xhr.abort();
                app.xhr = false;
            }
            app.get(url, function (data, error) {
                if (error) {
                    app.allowPageChange = true;
                    return;
                }
                if (app.params.pushState)  {
                    if (typeof pushState === 'undefined') pushState = true;
                    if (pushState) history.pushState({url: url}, '', '#/' + url);
                }
        
                _load(view, url, data);
        
            });
        };
        app.goBack = function (view, url, preloadOnly, pushState) {
            if (!app.allowPageChange) return false;
            app.allowPageChange = false;
            if (app.xhr) {
                app.xhr.abort();
                app.xhr = false;
            }
            if (app.params.pushState)  {
                if (typeof pushState === 'undefined') pushState = true;
                if (!preloadOnly && history.state && pushState) {
                    history.back();
                }
            }
        
            var viewContainer = $(view.container),
                pagesInView = viewContainer.find('.page'),
                oldPage, newPage, oldNavbarInner, newNavbarInner, navbar, dynamicNavbar;
            function _animate() {
                // Page before animation callback
                app.pageAnimCallbacks('before', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});
        
                // Set pages before animation
                _animatePages(newPage, oldPage, 'to-right', view);
        
                // Dynamic navbar animation
                if (dynamicNavbar) {
                    setTimeout(function () {
                        _animateNavbars(newNavbarInner, oldNavbarInner, 'to-right', view);
                    }, 0);
                }
                
                newPage.animationEnd(function () {
                    app.afterGoBack(view, oldPage[0], newPage[0]);
                    app.pageAnimCallbacks('after', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});
                });
            }
            function _preload() {
                newPage = _findElement('.page', app._tempDomElement, view);
        
                // If pages not found or there are still more than one, exit
                if (!newPage) {
                    app.allowPageChange = true;
                    return;
                }
                newPage.addClass('page-on-left');
        
                // Find old page (should be the only one)
                oldPage = $(viewContainer.find('.page')[0]);
        
                // Dynamic navbar
                if (view.params.dynamicNavbar) {
                    dynamicNavbar = true;
                    // Find navbar
                    newNavbarInner = _findElement('.navbar-inner', app._tempDomElement, view);
                    if (!newNavbarInner) {
                        dynamicNavbar = false;
                    }
                    
                }
        
                if (dynamicNavbar) {
                    navbar = viewContainer.find('.navbar');
                    oldNavbarInner = navbar.find('.navbar-inner');
                    newNavbarInner.addClass(oldNavbarInner.length > 0 ? 'navbar-on-left' : 'navbar-on-center');
                    if (oldNavbarInner.length > 1) {
                        $(oldNavbarInner[0]).remove();
                        oldNavbarInner = navbar.find('.navbar-inner');
                    }
                    navbar.prepend(newNavbarInner[0]);
                }
                // Prepend new Page and add classes for animation
                $(view.pagesContainer).prepend(newPage[0]);
        
                // Page Init Events
                app.pageInitCallback(view, newPage[0], url, 'left');
        
                if (dynamicNavbar && newNavbarInner.hasClass('navbar-on-left')) {
                    newNavbarInner.find('.sliding').each(function () {
                        var sliding = $(this);
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                                sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarLeftOffset) + 'px,0,0)');
                            }
                            if (sliding.hasClass('center') && oldNavbarInner.find('.left .back .icon').length > 0) {
                                this.f7NavbarLeftOffset += oldNavbarInner.find('.left .back span')[0].offsetLeft;
                            }
                        }
                        sliding.transform('translate3d(' + (this.f7NavbarLeftOffset) + 'px,0,0)');
                    });
                }
        
                // Exit if we need only to preload page
                if (preloadOnly) {
                    newPage.addClass('page-on-left');
                    app.allowPageChange = true;
                    return;
                }
        
                // Update View's URL
                view.url = url;
        
                // Force reLayout
                var clientLeft = newPage[0].clientLeft;
        
                _animate();
            }
        
            if (pagesInView.length > 1) {
                // Exit if only preloadOnly
                if (preloadOnly) {
                    app.allowPageChange = true;
                    return;
                }
                // Update View's URL
                view.url = view.history[view.history.length - 2];
        
                // Define old and new pages
                newPage = $(pagesInView[pagesInView.length - 2]);
                oldPage = $(pagesInView[pagesInView.length - 1]);
        
                // Dynamic navbar
                if (view.params.dynamicNavbar) {
                    dynamicNavbar = true;
                    // Find navbar
                    var inners = viewContainer.find('.navbar-inner:not(.cached)');
                    newNavbarInner = $(inners[0]);
                    oldNavbarInner = $(inners[1]);
                }
                _animate();
            }
            else {
                if (url && url.indexOf('#') === 0) url = undefined;
                if (view.history.length > 1) {
                    url = view.history[view.history.length - 2];
                }
                if (!url) {
                    app.allowPageChange = true;
                    return;
                }
                
                // Check current url is in cache?
                if (!view.params.domCache && (url in view.contentCache)) {
                    var _cache = view.contentCache[url];
                    app._tempDomElement.innerHTML = '';
                    $(app._tempDomElement).append(_cache.nav[0]).append(_cache.page[0]);
                    _preload();
                    return;
                }
        
                app.get(url, function (data, error) {
                    if (error) {
                        app.allowPageChange = true;
                        return;
                    }
                    if (app.params.preprocess) {
                        data = app.params.preprocess(data, url);
                    }
                    app._tempDomElement.innerHTML = data;
                    _preload();
                });
            }
        };
        app.afterGoBack = function (view, oldPage, newPage) {
            // Remove old page and set classes on new one
            oldPage = $(oldPage);
            newPage = $(newPage);
            oldPage.remove();
            newPage.removeClass('page-from-left-to-center page-on-left').addClass('page-on-center');
            app.allowPageChange = true;
            // Updated dynamic navbar
            if (view.params.dynamicNavbar) {
                var inners = $(view.container).find('.navbar-inner:not(.cached)');
                var oldNavbar = $(inners[1]).remove();
                var newNavbar = $(inners[0]).removeClass('navbar-on-left navbar-from-left-to-center').addClass('navbar-on-center');
        
                if (app.params.preloadPreviousPage && view.params.domCache) {
                    var cachedNavs = $(view.container).find('.navbar-inner.cached');
                    $(cachedNavs[cachedNavs.length - 1]).removeClass('cached');
                }
            }
            // Update View's History
            view.history.pop();
            
            // Check current page is content based only
            if (!view.params.domCache && view.url && view.url.indexOf('#content-') > -1 && (view.url in view.contentCache)) {
                view.contentCache[view.url] = null;
                delete view.contentCache[view.url];
            }
            
            if (app.params.pushState) app.pushStateClearQueue();
        
            // Preload previous page
            if (app.params.preloadPreviousPage) {
                if (view.params.domCache) {
                    var cachedPages = $(view.container).find('.page.cached');
                    $(cachedPages[cachedPages.length - 1]).removeClass('cached');
                }
                app.goBack(view, false, true);
            }
        
        };
        
        /*======================================================
        ************   Modals   ************
        ======================================================*/
        var _modalTemplateTempDiv = document.createElement('div');
        app.modal = function (params) {
            params = params || {};
            /* @params example
            {
                title: 'Modal title',
                text: 'Modal text',
                afterText: 'Custom content after text',
                buttons: [{
                    text:'Cancel',
                    bold: true,
                    onClick: function (){},
                    close:false
                }]
            }
            */
            var buttonsHTML = '';
            if (params.buttons && params.buttons.length > 0) {
                for (var i = 0; i < params.buttons.length; i++) {
                    buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
                }
            }
            var modalTemplate = app.params.modalTemplate;
            if (!params.title) {
                modalTemplate = modalTemplate.split('{{if title}}')[0] + modalTemplate.split('{{/if title}}')[1];
            }
            else {
                modalTemplate = modalTemplate.replace(/{{if\ title}}/g, '').replace(/{{\/if\ title}}/g, '');
            }
            var modalHTML = modalTemplate
                            .replace(/{{title}}/g, params.title || '')
                            .replace(/{{text}}/g, params.text || '')
                            .replace(/{{afterText}}/g, params.afterText || '')
                            .replace(/{{buttons}}/g, buttonsHTML)
                            .replace(/{{noButtons}}/g, !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '');
            _modalTemplateTempDiv.innerHTML = modalHTML;
        
            var modal = $(_modalTemplateTempDiv).children();
        
            $('body').append(modal[0]);
            
            // Add events on buttons
            modal.find('.modal-button').each(function (index, el) {
                $(el).on('click', function (e) {
                    if (params.buttons[index].close !== false) app.closeModal(modal);
                    if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
                });
            });
            app.openModal(modal);
            return modal[0];
        };
        app.alert = function (text, title) {
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                buttons: [ {text: app.params.modalButtonOk, bold: true} ]
            });
        };
        app.confirm = function (text, callbackOk, callbackCancel) {
            return app.modal({
                text: text || '',
                title: app.params.modalTitle || '',
                buttons: [
                    {text: app.params.modalButtonCancel, onClick: callbackCancel},
                    {text: app.params.modalButtonOk, bold: true, onClick: callbackOk}
                ]
            });
        };
        app.prompt = function (text, callbackOk, callbackCancel) {
            return app.modal({
                text: text || '',
                title: app.params.modalTitle || '',
                afterText: '<input type="text" class="modal-prompt-input">',
                buttons: [
                    {text: app.params.modalButtonCancel, onClick: function (modal) {
                        if (callbackCancel) callbackCancel($(modal).find('.modal-prompt-input').val());
                    }},
                    {text: app.params.modalButtonOk, bold: true, onClick: function (modal) {
                        if (callbackOk) callbackOk($(modal).find('.modal-prompt-input').val());
                    }}
                ]
            });
        };
        app.showPreloader = function (title) {
            return app.modal({
                title: title || app.params.modalPreloaderTitle,
                text: '<div class="preloader"></div>'
            });
        };
        app.hidePreloader = function () {
            app.closeModal();
        };
        app.showIndicator = function () {
            $('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>');
        };
        app.hideIndicator = function () {
            $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
        };
        // Action Sheet
        app.actions = function (params) {
            params = params || [];
            /*Example of @params
            [
                [
                    {
                        text: 'Button 1',
                        red: false,
                        bold: false,
                        onClick: function () { ... },
                        label: false // or true
                    },
                    {
                        text: '<a href="#" class="open-panel">Open panel</a>',
                        red: false,
                        bold: false,
                        onClick: function () { ... }  
                        label: false // or true
                    }
                    ... more buttons in this group
                ],
                ... more groups
            ]
            */
            if (params.length > 0 && !$.isArray(params[0])) {
                params = [params];
            }
        
            var actionsTemplate = app.params.modalActionsTemplate;
            var buttonsHTML = '';
            for (var i = 0; i < params.length; i++) {
                for (var j = 0; j < params[i].length; j++) {
                    if (j === 0) buttonsHTML += '<div class="actions-modal-group">';
                    var button = params[i][j];
                    var buttonClass = button.label ? 'actions-modal-label' : 'actions-modal-button';
                    if (button.bold) buttonClass += ' actions-modal-button-bold';
                    if (button.red) buttonClass += ' actions-modal-button-red';
                    buttonsHTML += '<span class="' + buttonClass + '">' + button.text + '</span>';
                    if (j === params[i].length - 1) buttonsHTML += '</div>';
                }
            }
            var modalHTML = actionsTemplate.replace(/{{buttons}}/g, buttonsHTML);
        
            _modalTemplateTempDiv.innerHTML = modalHTML;
            var modal = $(_modalTemplateTempDiv).children();
            $('body').append(modal[0]);
        
            var groups = modal.find('.actions-modal-group');
            groups.each(function (index, el) {
                var groupIndex = index;
                $(el).children().each(function (index, el) {
                    var buttonIndex = index;
                    var buttonParams = params[groupIndex][buttonIndex];
                    if ($(el).hasClass('actions-modal-button')) {
                        $(el).on('click', function (e) {
                            if (buttonParams.close !== false) app.closeModal(modal);
                            if (buttonParams.onClick) buttonParams.onClick(modal, e);
                        });
                    }
                });
            });
            app.openModal(modal);
            return modal[0];
        };
        app.popover = function (modal, target, removeOnClose) {
            if (typeof removeOnClose === 'undefined') removeOnClose = true;
            if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
                var _modal = document.createElement('div');
                _modal.innerHTML = modal;
                if (_modal.childNodes.length > 0) {
                    modal = _modal.childNodes[0];
                    if (removeOnClose) modal.classList.add('remove-on-close');
                    $('body').append(modal);
                }
                else return false; //nothing found
            }
            modal = $(modal);
            target = $(target);
            if (modal.length === 0 || target.length === 0) return false;
            if (modal.find('.popover-angle').length === 0) {
                modal.append('<div class="popover-angle"></div>');
            }
            modal.show();
        
            function sizePopover() {
                modal.css({left: '', top: ''});
                var modalWidth =  modal.width();
                var modalHeight =  modal.height(); // 13 - height of angle
                var modalAngle = modal.find('.popover-angle');
                var modalAngleSize = modalAngle.width() / 2;
                modalAngle.removeClass('on-left on-right on-top on-bottom').css({left: '', top: ''});
        
                var targetWidth = target.outerWidth();
                var targetHeight = target.outerHeight();
                var targetOffset = target.offset();
                var targetParentPage = target.parents('.page');
                if (targetParentPage.length > 0) {
                    targetOffset.top = targetOffset.top - targetParentPage[0].scrollTop;
                }
        
                var windowHeight = $(window).height();
                var windowWidth = $(window).width();
        
                var modalTop = 0;
                var modalLeft = 0;
                var diff = 0;
                // Top Position
                var modalPosition = 'top';
        
                if ((modalHeight + modalAngleSize) < targetOffset.top) {
                    // On top
                    modalTop = targetOffset.top - modalHeight - modalAngleSize;
                }
                else if ((modalHeight + modalAngleSize) < windowHeight - targetOffset.top - targetHeight) {
                    // On bottom
                    modalPosition = 'bottom';
                    modalTop = targetOffset.top + targetHeight + modalAngleSize;
                }
                else {
                    // On middle
                    modalPosition = 'middle';
                    modalTop = targetHeight / 2 + targetOffset.top - modalHeight / 2;
                    diff = modalTop;
                    if (modalTop < 0) {
                        modalTop = 5;
                    }
                    else if (modalTop + modalHeight > windowHeight) {
                        modalTop = windowHeight - modalHeight - 5;
                    }
                    diff = diff - modalTop;
                }
                // Horizontal Position
                if (modalPosition === 'top' || modalPosition === 'bottom') {
                    modalLeft = targetWidth / 2 + targetOffset.left - modalWidth / 2;
                    diff = modalLeft;
                    if (modalLeft < 5) modalLeft = 5;
                    if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
                    if (modalPosition === 'top') modalAngle.addClass('on-bottom');
                    if (modalPosition === 'bottom') modalAngle.addClass('on-top');
                    diff = diff - modalLeft;
                    modalAngle.css({left: (modalWidth / 2 - modalAngleSize + diff) + 'px'});
                }
                else if (modalPosition === 'middle') {
                    modalLeft = targetOffset.left - modalWidth - modalAngleSize;
                    modalAngle.addClass('on-right');
                    if (modalLeft < 5) {
                        modalLeft = targetOffset.left + targetWidth + modalAngleSize;
                        modalAngle.removeClass('on-right').addClass('on-left');
                    }
                    if (modalLeft + modalWidth > windowWidth) {
                        modalLeft = windowWidth - modalWidth - 5;
                        modalAngle.removeClass('on-right').addClass('on-left');
                    }
                    modalAngle.css({top: (modalHeight / 2 - modalAngleSize + diff) + 'px'});
                }
        
                // Apply Styles
                modal.css({top: modalTop + 'px', left: modalLeft + 'px'});
            }
            sizePopover();
        
            $(window).on('resize', sizePopover);
            modal.on('close', function () {
                $(window).off('resize', sizePopover);
            });
        
            app.openModal(modal);
            return modal[0];
        };
        app.popup = function (modal, removeOnClose) {
            if (typeof removeOnClose === 'undefined') removeOnClose = true;
            if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
                var _modal = document.createElement('div');
                _modal.innerHTML = modal;
                if (_modal.childNodes.length > 0) {
                    modal = _modal.childNodes[0];
                    if (removeOnClose) modal.classList.add('remove-on-close');
                    $('body').append(modal);
                }
                else return false; //nothing found
            }
            modal = $(modal);
            if (modal.length === 0) return false;
            modal.show();
            if (modal.find('.' + app.params.viewClass).length > 0) {
                app.sizeNavbars(modal.find('.' + app.params.viewClass)[0]);
            }
            app.openModal(modal);
            return modal[0];
        };
        app.openModal = function (modal) {
            modal = $(modal);
            if ($('.modal-overlay').length === 0) {
                var overlay = document.createElement('div');
                overlay.className = 'modal-overlay';
                $('body').append(overlay);
            }
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            if (!isPopover && !isPopup) modal.css({marginTop: -modal.outerHeight() / 2 + 'px'});
            
            //Make sure that styles are applied, trigger relayout;
            var clientLeft = modal[0].clientLeft;
        
            // Trugger open event
            modal.trigger('open');
        
            // Classes for transition in
            $('.modal-overlay').addClass('modal-overlay-visible');
            modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
                if (modal.hasClass('modal-out')) modal.trigger('closed');
                else modal.trigger('opened');
            });
            return true;
        };
        app.closeModal = function (modal) {
            modal = $(modal || '.modal-in');
            $('.modal-overlay').removeClass('modal-overlay-visible');
            modal.trigger('close');
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            var removeOnClose = modal.hasClass('remove-on-close');
            if (!isPopover) {
                modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
                    if (modal.hasClass('modal-out')) modal.trigger('closed');
                    else modal.trigger('opened');
                    if (!isPopup) modal.remove();
                    if (isPopup) modal.removeClass('modal-out').hide();
                    if (removeOnClose) modal.remove();
                });
            }
            else {
                modal.removeClass('modal-in modal-out').trigger('closed').hide();
                if (removeOnClose) modal.remove();
            }
            return true;
        };
        
        /*======================================================
        ************   Panels   ************
        ======================================================*/
        app.allowPanelOpen = true;
        app.openPanel = function (panelPosition) {
            // @panelPosition - string with panel position "left", "right"
            if (!app.allowPanelOpen) return false;
            var panel = $('.panel-' + panelPosition);
            if (panel.length === 0 || panel.hasClass('active')) return false;
            app.closePanel(); // Close if some panel is opened
            app.allowPanelOpen = false;
            var effect = panel.hasClass('panel-reveal') ? 'reveal' : 'cover';
            panel.css({display: 'block'}).addClass('active');
            panel.trigger('open');
            if (panel.find('.' + app.params.viewClass).length > 0) {
                if (app.sizeNavbars) app.sizeNavbars(panel.find('.' + app.params.viewClass)[0]);
            }
        
            // Trigger reLayout
            var clientLeft = panel[0].clientLeft;
            
            // Transition End;
            var transitionEndTarget = effect === 'reveal' ? $('.' + app.params.viewsClass) : panel;
            var openedTriggered = false;
            
            function panelTransitionEnd() {
                transitionEndTarget.transitionEnd(function (e) {
                    if ($(e.target).is(transitionEndTarget)) {
                        if (panel.hasClass('active')) {
                            panel.trigger('opened');
                        }
                        else {
                            panel.trigger('closed');
                        }
                        app.allowPanelOpen = true;
                    }
                    else panelTransitionEnd();
                });
            }
            panelTransitionEnd();
        
            $('body').addClass('with-panel-' + panelPosition + '-' + effect);
            return true;
        };
        app.closePanel = function () {
            var activePanel = $('.panel.active');
            if (activePanel.length === 0) return false;
            var effect = activePanel.hasClass('panel-reveal') ? 'reveal' : 'cover';
            var panelPosition = activePanel.hasClass('panel-left') ? 'left' : 'right';
            activePanel.removeClass('active');
            var transitionEndTarget = effect === 'reveal' ? $('.' + app.params.viewsClass) : activePanel;
            activePanel.trigger('close');
            app.allowPanelOpen = false;
        
            transitionEndTarget.transitionEnd(function () {
                if (activePanel.hasClass('active')) return;
                activePanel.css({display: ''});
                activePanel.trigger('closed');
                $('body').removeClass('panel-closing');
                app.allowPanelOpen = true;
            });
        
            $('body').addClass('panel-closing').removeClass('with-panel-' + panelPosition + '-' + effect);
        };
        /*======================================================
        ************   Swipe panels   ************
        ======================================================*/
        app.initSwipePanels = function () {
            if (!app.params.swipePanel) return;
            var panel = $('.panel.panel-' + app.params.swipePanel);
            if (panel.length === 0) return;
        
            var panelOverlay = $('.panel-overlay');
            var isTouched, isMoved, isScrolling, touchesStart = {}, touchStartTime, touchesDiff, translate, opened, panelWidth, effect, direction, side;
            var views = $('.' + app.params.viewsClass);
            side = app.params.swipePanel;
        
            function handleTouchStart(e) {
                if (!app.allowPanelOpen) return;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                if (app.params.swipePanelActiveArea) {
                    if (app.params.swipePanel === 'left') {
                        if (touchesStart.x > app.params.swipePanelActiveArea) return;
                    }
                    if (app.params.swipePanel === 'right') {
                        if (touchesStart.x < window.innerWidth - app.params.swipePanelActiveArea) return;
                    }
                }
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
                
                touchStartTime = (new Date()).getTime();
                direction = undefined;
            }
            function handleTouchMove(e) {
                if (!isTouched) return;
                if (e.f7PreventPanelSwipe) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (isScrolling) {
                    isTouched = false;
                    return;
                }
                if (!direction) {
                    if (pageX > touchesStart.x) {
                        direction = 'to-right';
                    }
                    else {
                        direction = 'to-left';
                    }
        
                    if (
                        side === 'left' &&
                        (
                            direction === 'to-left' && !panel.hasClass('active')
                        ) ||
                        side === 'right' &&
                        (
                            direction === 'to-right' && !panel.hasClass('active')
                        )
                    )
                    {
                        isTouched = false;
                        return;
                    }
                }
        
                if (app.params.swipePanelNoFollow) {
                    var timeDiff = (new Date()).getTime() - touchStartTime;
                    if (timeDiff < 300) {
                        if (direction === 'to-left') {
                            if (side === 'right') app.openPanel(side);
                            if (side === 'left' && panel.hasClass('active')) app.closePanel();
                        }
                        if (direction === 'to-right') {
                            if (side === 'left') app.openPanel(side);
                            if (side === 'right' && panel.hasClass('active')) app.closePanel();
                        }
                    }
                    isTouched = false;
                    isMoved = false;
                    return;
                }
        
                if (!isMoved) {
                    effect = panel.hasClass('panel-cover') ? 'cover' : 'reveal';
                    panel.show();
                    panelOverlay.show();
                    opened = panel.hasClass('active');
                    panelWidth = panel.width();
                    panel.transition(0);
                    if (panel.find('.' + app.params.viewClass).length > 0) {
                        if (app.sizeNavbars) app.sizeNavbars(panel.find('.' + app.params.viewClass)[0]);
                    }
                }
        
                isMoved = true;
        
                e.preventDefault();
                var threshold = opened ? 0 : -app.params.swipePanelThreshold;
                if (side === 'right') threshold = -threshold;
                
                touchesDiff = pageX - touchesStart.x + threshold;
        
                if (side === 'right') {
                    translate = touchesDiff  - (opened ? panelWidth : 0);
                    if (translate > 0) translate = 0;
                    if (translate < -panelWidth) {
                        translate = -panelWidth;
                    }
                }
                else {
                    translate = touchesDiff  + (opened ? panelWidth : 0);
                    if (translate < 0) translate = 0;
                    if (translate > panelWidth) {
                        translate = panelWidth;
                    }
                }
                    
                if (effect === 'reveal') {
                    views.transform('translate3d(' + translate + 'px,0,0)').transition(0);
                    panelOverlay.transform('translate3d(' + translate + 'px,0,0)');
                }
                else {
                    panel.transform('translate3d(' + translate + 'px,0,0)').transition(0);
                }
        
            }
            function handleTouchEnd(e) {
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                isTouched = false;
                isMoved = false;
                var timeDiff = (new Date()).getTime() - touchStartTime;
                var action;
                var edge = (translate === 0 || Math.abs(translate) === panelWidth);
        
                if (!opened) {
                    if (translate === 0) {
                        action = 'reset';
                    }
                    else if (
                        timeDiff < 300 && Math.abs(translate) > 0 ||
                        timeDiff >= 300 && (Math.abs(translate) >= panelWidth / 2)
                    ) {
                        action = 'swap';
                    }
                    else {
                        action = 'reset';
                    }
                }
                else {
                    if (translate === -panelWidth) {
                        action = 'reset';
                    }
                    else if (
                        timeDiff < 300 && Math.abs(translate) > 0 ||
                        timeDiff >= 300 && (Math.abs(translate) <= panelWidth / 2)
                    ) {
                        action = 'swap';
                    }
                    else {
                        action = 'reset';
                    }
                }
                    
                panelOverlay.css({display: ''}).transform('');
                panel.transition('').transform('');
                if (action === 'swap') {
                    app.allowPanelOpen = true;
                    if (opened) {
                        app.closePanel();
                        if (edge) {
                            panel.css({display: ''});
                            $('body').removeClass('panel-closing');
                        }
                    }
                    else {
                        app.openPanel(side);
                    }
                    if (edge) app.allowPanelOpen = true;
                }
                if (action === 'reset') {
                    if (opened) {
                        app.allowPanelOpen = true;
                        app.openPanel(side);
                    }
                    else {
                        app.closePanel();
                        if (edge) {
                            app.allowPanelOpen = true;
                            panel.css({display: ''});
                        }
                        else {
                            var target = effect === 'reveal' ? views : panel;
                            $('body').addClass('panel-closing');
                            target.transitionEnd(function () {
                                app.allowPanelOpen = true;
                                panel.css({display: ''});
                                $('body').removeClass('panel-closing');
                            });
                        }
                    }
                }
                if (effect === 'reveal') {
                    views.transition('');
                    views.transform('');
                }
            }
            $(document).on(app.touchEvents.start, handleTouchStart);
            $(document).on(app.touchEvents.move, handleTouchMove);
            $(document).on(app.touchEvents.end, handleTouchEnd);
        };
        
        /*======================================================
        ************   Messages   ************
        ======================================================*/
        app.initMessages = function (pageContainer) {
            var page = $(pageContainer);
            var messages = page.find('.messages');
            if (messages.length === 0) return;
            var pageContent = page.find('.page-content');
            if (!messages.hasClass('new-messages-first')) pageContent[0].scrollTop = messages.height() - pageContent.height();
            app.updateMessagesAngles(messages);
        };
        app.addMessage = function (props) {
            props = props || {};
            /*
            {
                text : 'Message text',
                day : 'Mon',
                time : '14:42',
                type : 'sent' // or 'received'
            }
            */
            props.type = props.type || 'sent';
            if (!props.text || props.length === 0) return false;
            var messagesContent = $('.messages-content');
            if (messagesContent.length === 0) return false;
            var messages = messagesContent.find('.messages');
            var newOnTop = messages.hasClass('new-messages-first');
            var html = '';
            if (props.day) {
                html += '<div class="messages-date">' + props.day + (props.time ? ',' : '') + (props.time ? ' <span>' + props.time + '</span>' : '') + '</div>';
            }
            var isPic = props.text.indexOf('<img') >= 0;
            var messageClass = 'message' + ' message-' + props.type + (isPic ? ' message-pic' : '') + ' message-appear';
            html += '<div class="' + messageClass + '">' + props.text + '</div>';
            if (newOnTop) messages.prepend(html);
            else messages.append(html);
            app.updateMessagesAngles(messages);
            app.scrollMessagesContainer(messagesContent);
        };
        app.updateMessagesAngles = function (messages) {
            messages.find('.message-sent').each(function () {
                var message = $(this);
                if (!message.next().hasClass('message-sent')) {
                    message.addClass('message-last');
                }
                else message.removeClass('message-last');
            });
            messages.find('.message-received').each(function () {
                var message = $(this);
                if (!message.next().hasClass('message-received')) {
                    message.addClass('message-last');
                }
                else message.removeClass('message-last');
            });
        };
        app.scrollMessagesContainer = function (messagesContent) {
            messagesContent = $(messagesContent || '.messages-content');
            if (messagesContent.length === 0) return;
            var messages = messagesContent.find('.messages');
            var newOnTop = messages.hasClass('new-messages-first');
            var currentScroll = messagesContent[0].scrollTop;
            var newScroll = newOnTop ? 0 : messages.height() - messagesContent.height();
            if (newScroll === currentScroll) return;
            var step = (newScroll - currentScroll) / 12;
            function animScroll() {
                if (messagesContent[0].scrollTop > newScroll && newOnTop) {
                    messagesContent[0].scrollTop = messagesContent[0].scrollTop + Math.floor(step);
                    app._animFrame(animScroll);
                }
                else if (messagesContent[0].scrollTop < newScroll && !newOnTop) {
                    messagesContent[0].scrollTop = messagesContent[0].scrollTop + Math.floor(step);
                    app._animFrame(animScroll);
                }
                else {
                    messagesContent[0].scrollTop = newScroll;
                }
            }
            app._animFrame(animScroll);
        };
        
        /*===============================================================================
        ************   Swipeout Actions (Swipe to delete)   ************
        ===============================================================================*/
        app.swipeoutOpenedEl = undefined;
        app.allowSwipeout = true;
        app.initSwipeout = function () {
            var isTouched, isMoved, isScrolling, touchesStart = {}, touchStartTime, touchesDiff, swipeOutEl, swipeOutContent, swipeOutActions, swipeOutActionsWidth, translate, opened;
            $(document).on(app.touchEvents.start, function (e) {
                if (app.swipeoutOpenedEl) {
                    var target = $(e.target);
                    if (!(
                        app.swipeoutOpenedEl.is(target[0]) ||
                        target.parents('.swipeout').is(app.swipeoutOpenedEl) ||
                        target.hasClass('modal-in') ||
                        target.parents('.modal-in').length > 0 ||
                        target.hasClass('modal-overlay')
                        )) {
                        app.swipeoutClose(app.swipeoutOpenedEl);
                    }
                }
            });
            
        
            function handleTouchStart(e) {
                if (!app.allowSwipeout) return;
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();
            }
            function handleTouchMove(e) {
                if (!isTouched) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (isScrolling) {
                    isTouched = false;
                    return;
                }
        
                if (!isMoved) {
                    if ($('.list-block.sortable-opened').length > 0) return;
                    /*jshint validthis:true */
                    swipeOutEl = $(this);
                    swipeOutContent = swipeOutEl.find('.swipeout-content');
                    swipeOutActions = swipeOutEl.find('.swipeout-actions-inner');
                    swipeOutActionsWidth = swipeOutActions.width();
                    opened = swipeOutEl.hasClass('swipeout-opened');
                    swipeOutEl.removeClass('transitioning');
                }
                isMoved = true;
        
                e.preventDefault();
                e.f7PreventPanelSwipe = true;
                touchesDiff = pageX - touchesStart.x;
                translate = touchesDiff  - (opened ? swipeOutActionsWidth : 0);
        
                if (translate > 0) translate = 0;
                if (translate < -swipeOutActionsWidth) {
                    translate = -swipeOutActionsWidth - Math.pow(-translate - swipeOutActionsWidth, 0.8);
                }
        
                if (app.params.swipeoutNoFollow) {
                    if (touchesDiff < 0 && !opened) {
                        app.swipeoutOpen(swipeOutEl);
                        isTouched = false;
                        isMoved = false;
                        return;
                    }
                    if (touchesDiff > 0 && opened) {
                        app.swipeoutClose(swipeOutEl);
                        isTouched = false;
                        isMoved = false;
                        return;
                    }
                }
                else swipeOutContent.transform('translate3d(' + translate + 'px,0,0)');
        
            }
            function handleTouchEnd(e) {
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                isTouched = false;
                isMoved = false;
                var timeDiff = (new Date()).getTime() - touchStartTime;
                if (!(translate === 0 || translate === -swipeOutActionsWidth)) app.allowSwipeout = false;
                
                var action;
                if (opened) {
                    if (
                        timeDiff < 300 && translate > -(swipeOutActionsWidth - 10) ||
                        timeDiff >= 300 && translate > -swipeOutActionsWidth / 2
                    ) {
                        action = 'close';
                    }
                    else {
                        action = 'open';
                    }
                }
                else {
                    if (
                        timeDiff < 300 && translate < -10 ||
                        timeDiff >= 300 && translate < -swipeOutActionsWidth / 2
                    ) {
                        action = 'open';
                    }
                    else {
                        action = 'close';
                    }
                }
                if (action === 'open') {
                    app.swipeoutOpenedEl = swipeOutEl;
                    swipeOutEl.trigger('open');
                    swipeOutEl.addClass('swipeout-opened transitioning');
                    swipeOutContent.transform('translate3d(' + -swipeOutActionsWidth + 'px,0,0)');
                }
                else {
                    swipeOutEl.trigger('close');
                    app.swipeoutOpenedEl = undefined;
                    swipeOutEl.addClass('transitioning').removeClass('swipeout-opened');
                    swipeOutContent.transform('translate3d(' + 0 + 'px,0,0)');
                }
                swipeOutContent.transitionEnd(function () {
                    app.allowSwipeout = true;
                    swipeOutEl.trigger(action === 'open' ? 'opened' : 'closed');
                });
            }
            $(document).on(app.touchEvents.start, '.list-block li.swipeout', handleTouchStart);
            $(document).on(app.touchEvents.move, '.list-block li.swipeout', handleTouchMove);
            $(document).on(app.touchEvents.end, '.list-block li.swipeout', handleTouchEnd);
        };
        app.swipeoutOpen = function (el) {
            el = $(el);
            if (!el.hasClass('swipeout')) return;
            if (el.length === 0) return;
            if (el.length > 1) el = $(el[0]);
            el.trigger('open').addClass('transitioning swipeout-opened');
            var swipeOutActions = el.find('.swipeout-actions-inner');
            el.find('.swipeout-content').transform('translate3d(-' + swipeOutActions.width() + 'px,0,0)').transitionEnd(function () {
                el.trigger('opened');
            });
            app.swipeoutOpenedEl = el;
        };
        app.swipeoutClose = function (el) {
            el = $(el);
            if (el.length === 0) return;
            app.allowSwipeout = false;
            el.trigger('close');
            el.removeClass('swipeout-opened')
                .addClass('transitioning')
            .find('.swipeout-content')
                .transform('translate3d(' + 0 + 'px,0,0)')
                .transitionEnd(function () {
                    el.trigger('closed');
                    app.allowSwipeout = true;
                });
        
            if (app.swipeoutOpenedEl[0] === el[0]) app.swipeoutOpenedEl = undefined;
        };
        app.swipeoutDelete = function (el) {
            el = $(el);
            if (el.length === 0) return;
            if (el.length > 1) el = $(el[0]);
            app.swipeoutOpenedEl = undefined;
            el.trigger('delete');
            el.css({height: el.outerHeight() + 'px'});
            var clientLeft = el[0].clientLeft;
            el.css({height: 0 + 'px'}).addClass('deleting transitioning').transitionEnd(function () {
                el.trigger('deleted');
                el.remove();
            });
            el.find('.swipeout-content').transform('translate3d(-100%,0,0)');
        };
        
        /*===============================================================================
        ************   Sortable   ************
        ===============================================================================*/
        app.sortableToggle = function (sortableContainer) {
            sortableContainer = $(sortableContainer);
            if (sortableContainer.length === 0) sortableContainer = $('.list-block.sortable');
            sortableContainer.toggleClass('sortable-opened');
            if (sortableContainer.hasClass('sortable-opened')) {
                sortableContainer.trigger('open');
            }
            else {
                sortableContainer.trigger('close');
            }
            return sortableContainer;
        };
        app.sortableOpen = function (sortableContainer) {
            sortableContainer = $(sortableContainer);
            if (sortableContainer.length === 0) sortableContainer = $('.list-block.sortable');
            sortableContainer.addClass('sortable-opened');
            sortableContainer.trigger('open');
            return sortableContainer;
        };
        app.sortableClose = function (sortableContainer) {
            sortableContainer = $(sortableContainer);
            if (sortableContainer.length === 0) sortableContainer = $('.list-block.sortable');
            sortableContainer.removeClass('sortable-opened');
            sortableContainer.trigger('close');
            return sortableContainer;
        };
        app.initSortable = function () {
            var isTouched, isMoved, touchStartY, touchesDiff, sortingEl, sortingItems, minTop, maxTop, insertAfter, insertBefore, sortableContainer;
            
            function handleTouchStart(e) {
                isMoved = false;
                isTouched = true;
                touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                /*jshint validthis:true */
                sortingEl = $(this).parent();
                sortingItems = sortingEl.parent().find('li');
                sortableContainer = sortingEl.parents('.sortable');
                e.preventDefault();
                app.allowsPanelOpen = app.allowSwipeout = false;
            }
            function handleTouchMove(e) {
                if (!isTouched || !sortingEl) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (!isMoved) {
                    sortingEl.addClass('sorting');
                    sortableContainer.addClass('sortable-sorting');
                    minTop = sortingEl[0].offsetTop;
                    maxTop = sortingEl.parent().height() - sortingEl[0].offsetTop - sortingEl.height();
                    
                }
                isMoved = true;
        
                e.preventDefault();
                e.f7PreventPanelSwipe = true;
                touchesDiff = pageY - touchStartY;
                var translate = touchesDiff;
                if (translate < -minTop) translate = -minTop;
                if (translate > maxTop) translate = maxTop;
                sortingEl.transform('translate3d(0,' + translate + 'px,0)');
        
                insertBefore = insertAfter = undefined;
        
                sortingItems.each(function () {
                    var currentEl = $(this);
                    if (currentEl[0] === sortingEl[0]) return;
                    var currentElOffset = currentEl[0].offsetTop;
                    var currentElHeight = currentEl.height();
                    var sortingElOffset = sortingEl[0].offsetTop + translate;
        
                    if ((sortingElOffset >= currentElOffset - currentElHeight / 2) && sortingEl.index() < currentEl.index()) {
                        currentEl.transform('translate3d(0,-100%,0)');
                        insertAfter = currentEl;
                        insertBefore = undefined;
                    }
                    else if ((sortingElOffset <= currentElOffset + currentElHeight / 2) && sortingEl.index() > currentEl.index()) {
                        $(this).transform('translate3d(0,100%,0)');
                        insertAfter = undefined;
                        if (!insertBefore) insertBefore = currentEl;
                    }
                    else {
                        $(this).transform('translate3d(0, 0%,0)');
                    }
                });
            }
            function handleTouchEnd(e) {
                app.allowsPanelOpen = app.allowSwipeout = true;
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                e.preventDefault();
                sortingItems.transform('');
                sortingEl.removeClass('sorting');
                sortableContainer.removeClass('sortable-sorting');
                if (insertAfter) {
                    sortingEl.insertAfter(insertAfter);
                    sortingEl.trigger('sort');
                }
                if (insertBefore) {
                    sortingEl.insertBefore(insertBefore);
                    sortingEl.trigger('sort');
                }
                insertAfter = insertBefore = undefined;
                isTouched = false;
                isMoved = false;
            }
            $(document).on(app.touchEvents.start, '.list-block.sortable .sortable-handler', handleTouchStart);
            $(document).on(app.touchEvents.move, '.list-block.sortable .sortable-handler', handleTouchMove);
            $(document).on(app.touchEvents.end, '.list-block.sortable .sortable-handler', handleTouchEnd);
        };
        
        /*===============================================================================
        ************   Smart Select   ************
        ===============================================================================*/
        app.initSmartSelects = function (pageContainer) {
            var page = $(pageContainer);
            if (page.length === 0) return;
        
            var selects = page.find('.smart-select');
            if (selects.length === 0) return;
        
            selects.each(function () {
                var smartSelect = $(this);
        
                var $select = smartSelect.find('select');
                if ($select.length === 0) return;
        
                var select = $select[0];
                if (select.length === 0) return;
        
                var valueText;
                for (var i = 0; i < select.length; i++) {
                    if (select[i].selected) valueText = select[i].textContent.trim();
                }
        
                var itemAfter = smartSelect.find('.item-after');
                if (itemAfter.length === 0) {
                    smartSelect.find('.item-inner').append('<div class="item-after">' + valueText + '</div>');
                }
                else {
                    itemAfter.text(valueText);
                }
                
            });
            
        };
        app.smartSelectOpen = function (smartSelect) {
            smartSelect = $(smartSelect);
            if (smartSelect.length === 0) return;
        
            // Find related view
            var view = smartSelect.parents('.' + app.params.viewClass);
            if (view.length === 0) return;
            view = view[0].f7View;
            if (!view) return;
        
            // Collect all values
            var select = smartSelect.find('select')[0];
            var values = {};
            values.length = select.length;
            for (var i = 0; i < select.length; i++) {
                values[i] = {
                    value: select[i].value,
                    text: select[i].textContent.trim(),
                    selected: select[i].selected
                };
            }
        
            var pageTitle = smartSelect.find('.item-title').text();
        
            // Generate dynamic page layout
            var radiosName = 'radio-' + (new Date()).getTime();
            var radiosHTML = '';
            for (var j = 0; j < values.length; j++) {
                var checked = values[j].selected ? 'checked' : '';
                radiosHTML +=
                    '<li>' +
                        '<label class="label-radio item-content">' +
                            '<input type="radio" name="' + radiosName + '" value="' + values[j].value + '" ' + checked + '>' +
                            '<div class="item-inner">' +
                                '<div class="item-title">' + values[j].text + '</div>' +
                            '</div>' +
                        '</label>' +
                    '</li>';
            }
            // Navbar HTML
            var navbarHTML =
                '<div class="navbar">' +
                '  <div class="navbar-inner">' +
                    app.params.smartSelectBackTemplate +
                '    <div class="center sliding">' + pageTitle + '</div>' +
                '  </div>' +
                '</div>';
            // Determine navbar layout type - static/fixed/through
            var navbarLayout = 'static';
            if (smartSelect.parents('.navbar-through').length > 0) navbarLayout = 'through';
            if (smartSelect.parents('.navbar-fixed').length > 0) navbarLayout = 'fixed';
            // Page Layout
            var pageName = 'smart-select-' + radiosName;
            var pageHTML =
                (navbarLayout === 'through' ? navbarHTML : '') +
                '<div class="pages">' +
                '  <div data-page="' + pageName + '" class="page">' +
                     (navbarLayout === 'fixed' ? navbarHTML : '') +
                '    <div class="page-content">' +
                       (navbarLayout === 'static' ? navbarHTML : '') +
                '      <div class="list-block">' +
                '        <ul>' +
                            radiosHTML +
                '        </ul>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>';
        
            // Event Listeners on new page
            function handleRadios(e) {
                var page = e.detail.page;
                if (page.name === pageName) {
                    $(document).off('pageInit', handleRadios);
                    $(page.container).find('input[name="' + radiosName + '"]').on('change', function () {
                        var value = this.value;
                        select.value = value;
                        $(select).trigger('change');
                        var optionText = smartSelect.find('option[value="' + value + '"]').text();
                        smartSelect.find('.item-after').text(optionText);
                    });
                }
            }
            $(document).on('pageInit', handleRadios);
        
            // Load content
            view.loadContent(pageHTML);
        
        };
        
        /*======================================================
        ************   Pull To Refresh   ************
        ======================================================*/
        app.initPullToRefresh = function () {
            var isTouched, isMoved, touchesStart = {}, isScrolling, touchesDiff, touchStartTime, container, refresh = false, useTranslate = false, startTranslate = 0;
            function handleTouchStart(e) {
                if (isTouched) return;
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();
            }
            
            function handleTouchMove(e) {
                if (!isTouched) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (!isScrolling) {
                    isTouched = false;
                    return;
                }
                if (!isMoved) {
                    /*jshint validthis:true */
                    container = $(this);
                    container.removeClass('transitioning');
                    startTranslate = container.hasClass('refreshing') ? 44 : 0;
                    if (container[0].scrollHeight === container[0].offsetHeight || app.device.os !== 'ios') {
                        useTranslate = true;
                    }
                    else {
                        useTranslate = false;
                    }
                }
                isMoved = true;
                touchesDiff = pageY - touchesStart.y;
                if (touchesDiff > 0 && container[0].scrollTop <= 0 || container[0].scrollTop < 0) {
                    if (useTranslate) {
                        e.preventDefault();
                        container.transform('translate3d(0,' + (Math.pow(touchesDiff, 0.85) + startTranslate) + 'px,0)');
                    }
                    if ((useTranslate && Math.pow(touchesDiff, 0.85) > 44) || (!useTranslate && touchesDiff >= 88)) {
                        refresh = true;
                        container.addClass('pull-up');
                    }
                    else {
                        refresh = false;
                        container.removeClass('pull-up');
                    }
                }
                else {
                    container.removeClass('pull-up');
                    refresh = false;
                    return;
                }
            }
            function handleTouchEnd(e) {
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                container.addClass('transitioning');
                container.transform('');
                if (refresh) {
                    container.addClass('refreshing');
                    container.trigger('refresh', {
                        done: function () {
                            app.pullToRefreshDone(container);
                        }
                    });
                }
                isTouched = false;
                isMoved = false;
            }
            $(document).on(app.touchEvents.start, '.pull-to-refresh-content', handleTouchStart);
            $(document).on(app.touchEvents.move, '.pull-to-refresh-content', handleTouchMove);
            $(document).on(app.touchEvents.end, '.pull-to-refresh-content', handleTouchEnd);
        };
        
        app.pullToRefreshDone = function (container) {
            container = $(container);
            if (container.length === 0) container = $('.pull-to-refresh-content.refreshing');
            container.removeClass('refreshing').addClass('transitioning');
            container.transitionEnd(function () {
                container.removeClass('transitioning pull-up');
            });
        };
        
        /*===============================================================================
        ************   Fast Clicks   ************
        ************   Inspired by https://github.com/ftlabs/fastclick   ************
        ===============================================================================*/
        app.initFastClicks = function () {
            if (!app.support.touch) return;
            var touchStartX, touchStartY, touchStartTime, targetElement, trackClick, activeSelection, scrollParent, lastClickTime, isMoved;
        
            function targetNeedsFocus(el) {
                var tag = el.nodeName.toLowerCase();
                var skipInputs = ('button checkbox file image radio submit').split(' ');
                if (el.disabled || el.readOnly) return false;
                if (tag === 'textarea') return true;
                if (tag === 'select') {
                    if (app.device.os === 'android') return false;
                    else return true;
                }
                if (tag === 'input' && skipInputs.indexOf(el.type) < 0) return true;
            }
            function targetNeedsPrevent(el) {
                el = $(el);
                if (el.is('label') || el.parents('label').length > 0) {
                    return false;
                }
                return true;
            }
            function handleTouchStart(e) {
                isMoved = false;
                if (e.targetTouches.length > 1) {
                    return true;
                }
                if (app.device.os === 'ios') {
                    var selection = window.getSelection();
                    if (selection.rangeCount && !selection.isCollapsed) {
                        activeSelection = true;
                        return true;
                    }
                    else {
                        activeSelection = false;
                    }
                }
                trackClick = true;
                targetElement = e.target;
                touchStartTime = (new Date()).getTime();
                touchStartX = e.targetTouches[0].pageX;
                touchStartY = e.targetTouches[0].pageY;
        
                // Detect scroll parent
                if (app.device.os === 'ios') {
                    scrollParent = undefined;
                    $(targetElement).parents().each(function () {
                        var parent = this;
                        if (parent.scrollHeight > parent.offsetHeight && !scrollParent) {
                            scrollParent = parent;
                            scrollParent.f7ScrollTop = scrollParent.scrollTop;
                        }
                    });
                }
                if ((e.timeStamp - lastClickTime) < 200) {
                    e.preventDefault();
                }
            }
            function handleTouchMove(e) {
                if (!trackClick) return;
                trackClick = false;
                targetElement = null;
                isMoved = true;
            }
            function handleTouchEnd(e) {
                if (!trackClick) {
                    if (!activeSelection) e.preventDefault();
                    return true;
                }
        
                if (!activeSelection) {
                    e.preventDefault();
                }
        
                if ((e.timeStamp - lastClickTime) < 200) {
                    return true;
                }
        
                lastClickTime = e.timeStamp;
                touchStartTime = 0;
        
                trackClick = false;
        
                if (app.device.os === 'ios' && scrollParent) {
                    if (scrollParent.scrollTop !== scrollParent.f7ScrollTop) {
                        return false;
                    }
                }
        
                // Trigger focus when required
                if (targetNeedsFocus(targetElement)) targetElement.focus();
        
                e.preventDefault();
                var touch = e.changedTouches[0];
                var evt = document.createEvent('MouseEvents');
                var eventType = 'click';
                if (app.device.os === 'android' && targetElement.nodeName.toLowerCase() === 'select') {
                    eventType = 'mousedown';
                }
                evt.initMouseEvent(eventType, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
                evt.forwardedTouchEvent = true;
                targetElement.dispatchEvent(evt);
        
                return false;
        
                
            }
            function handleTouchCancel(e) {
                trackClick = false;
                targetElement = null;
            }
        
            function onMouse(e) {
                if (!targetElement) {
                    return true;
                }
                if (e.forwardedTouchEvent) {
                    return true;
                }
                if (!e.cancelable) {
                    return true;
                }
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
        
                return false;
        
            }
            function handleClick(e) {
                var allowClick = false;
        
                if (trackClick) {
                    targetElement = null;
                    trackClick = false;
                    return true;
                }
        
                if (e.target.type === 'submit' && e.detail === 0) {
                    return true;
                }
        
                if (!targetElement) {
                    allowClick =  true;
                }
                if (e.forwardedTouchEvent) {
                    allowClick =  true;
                }
                if (!e.cancelable) {
                    allowClick =  true;
                }
        
                if (!allowClick) {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    if (targetElement) {
                        if (targetNeedsPrevent(targetElement) || isMoved) e.preventDefault();
                    }
                    else {
                        e.preventDefault();
                    }
                    targetElement = null;
                }
        
                return allowClick;
            }
            document.addEventListener('click', handleClick, true);
            $(document).on('touchstart', handleTouchStart);
            $(document).on('touchmove', handleTouchMove);
            $(document).on('touchend', handleTouchEnd);
            $(document).on('touchcancel', handleTouchCancel);
        };
        
        /*===============================================================================
        ************   Handle clicks and make them fast (on tap);   ************
        ===============================================================================*/
        app.initClickEvents = function () {
            function handleClicks(e) {
                /*jshint validthis:true */
                var clicked = $(this);
                var url = clicked.attr('href');
                if (clicked[0].nodeName.toLowerCase() === 'a') {
                    // External
                    if (clicked.hasClass('external')) {
                        return;
                    }
                    else {
                        e.preventDefault();
                    }
                }
                // Smart Select
                if (clicked.hasClass('smart-select')) {
                    if (app.smartSelectOpen) app.smartSelectOpen(clicked);
                }
                
                // Open Panel
                if (clicked.hasClass('open-panel')) {
                    if ($('.panel').length === 1) {
                        if ($('.panel').hasClass('panel-left')) app.openPanel('left');
                        else app.openPanel('right');
                    }
                    else {
                        if (clicked.attr('data-panel') === 'right') app.openPanel('right');
                        else app.openPanel('left');
                    }
                }
                // Close Panel
                if (clicked.hasClass('close-panel')) {
                    app.closePanel();
                }
        
                if (clicked.hasClass('panel-overlay') && app.params.panelsCloseByOutside) {
                    app.closePanel();
                }
                // Popover
                if (clicked.hasClass('open-popover')) {
                    var popover;
                    if (clicked.attr('data-popover')) {
                        popover = clicked.attr('data-popover');
                    }
                    else popover = '.popover';
                    app.popover(popover, clicked);
                }
                // Popup
                var popup;
                if (clicked.hasClass('open-popup')) {
                    if (clicked.attr('data-popup')) {
                        popup = clicked.attr('data-popup');
                    }
                    else popup = '.popup';
                    app.popup(popup);
                }
                if (clicked.hasClass('close-popup')) {
                    app.closeModal('.popup.modal-in');
                }
                // Close Modal
                if (clicked.hasClass('modal-overlay')) {
                    if ($('.modal.modal-in').length > 0 && app.params.modalCloseByOutside)
                        app.closeModal();
                    if ($('.actions-modal.modal-in').length > 0 && app.params.modalActionsCloseByOutside)
                        app.closeModal();
                    if ($('.popup.modal-in').length > 0 && app.params.modalPopupCloseByOutside)
                        app.closeModal();
                    if ($('.popover.modal-in').length > 0) app.closeModal('.popover.modal-in');
                }
                
                // Tabs
                if (clicked.hasClass('tab-link')) {
                    var newTab = $(clicked.attr('href'));
                    if (newTab.length === 0) return;
                    var oldTab = newTab.parent().find('.tab.active').removeClass('active');
                    newTab.addClass('active');
                    newTab.trigger('show');
                    var clickedParent = clicked.parent();
                    if (clickedParent.hasClass('buttons-row') || clicked.parents('.tabbar').length > 0) {
                        clickedParent.find('.active').removeClass('active');
                        clicked.addClass('active');
                    }
                    if (newTab.find('.navbar').length > 0) {
                        // Find tab's view
                        var viewContainer;
                        if (newTab.hasClass(app.params.viewClass)) viewContainer = newTab[0];
                        else viewContainer = newTab.parents('.' + app.params.viewClass)[0];
                        app.sizeNavbars(viewContainer);
                    }
                }
                // Swipeout Delete
                if (clicked.hasClass('swipeout-delete')) {
                    if (clicked.attr('data-confirm')) {
                        var modal = app.confirm(clicked.attr('data-confirm'), function () {
                            app.swipeoutDelete(clicked.parents('.swipeout'));
                        });
                    }
                    else {
                        app.swipeoutDelete(clicked.parents('.swipeout'));
                    }
                        
                }
                // Sortable
                if (clicked.hasClass('sortable-toggle')) {
                    app.sortableToggle(clicked.data('sortable'));
                }
                if (clicked.hasClass('sortable-open')) {
                    app.sortableOpen(clicked.data('sortable'));
                }
                if (clicked.hasClass('sortable-close')) {
                    app.sortableClose(clicked.data('sortable'));
                }
                // Load Page
                if (app.params.ajaxLinks && !clicked.is(app.params.ajaxLinks)) {
                    return;
                }
                var validUrl = url && url.length > 0 && url.indexOf('#') !== 0;
                if (validUrl || clicked.hasClass('back')) {
                    var view;
                    if (clicked.attr('data-view')) {
                        view = $(clicked.attr('data-view'))[0].f7View;
                    }
                    else {
                        view = clicked.parents('.' + app.params.viewClass)[0] && clicked.parents('.' + app.params.viewClass)[0].f7View;
                        if (view && view.params.linksView) {
                            view = $(view.params.linksView)[0].f7View;
                        }
                    }
                    if (!view) {
                        for (var i = 0; i < app.views.length; i++) {
                            if (app.views[i].main) view = app.views[i];
                        }
                    }
                    if (!view) return;
                    if (clicked.hasClass('back')) view.goBack(clicked.attr('href'));
                    else view.loadPage(clicked.attr('href'));
                }
            }
            $(document).on('click', 'a, .open-panel, .close-panel, .panel-overlay, .modal-overlay, .swipeout-delete, .close-popup, .open-popup, .open-popover, .smart-select, .sortable-toggle, .sortable-open, .sortable-close', handleClicks);
        };
        
        /*======================================================
        ************   App Resize Actions   ************
        ======================================================*/
        // Prevent iPad horizontal body scrolling when soft keyboard is opened
        function _fixIpadBodyScrolLeft() {
            if (app.device.ipad) {
                document.body.scrollLeft = 0;
                setTimeout(function () {
                    document.body.scrollLeft = 0;
                }, 0);
            }
        }
        app.initResize = function () {
            $(window).on('resize', app.resize);
            $(window).on('orientationchange', app.orientationchange);
        };
        app.resize = function () {
            if (app.sizeNavbars) app.sizeNavbars();
            _fixIpadBodyScrolLeft();
            
        };
        app.orientationchange = function () {
            if (app.device && app.device.minimalUi) {
                if (window.orientation === 90 || window.orientation === -90) document.body.scrollTop = 0;
            }
            _fixIpadBodyScrolLeft();
        };
        
        /*===============================================================================
        ************   Store and parse forms data   ************
        ===============================================================================*/
        app.formsData = {};
        app.formStoreData = function (formId, formJSON) {
            // Store form data in app.formsData
            app.formsData[formId] = formJSON;
        
            // Store form data in local storage also
            app.ls['f7form-' + formId] = JSON.stringify(formJSON);
        };
        app.formDeleteData = function (formId) {
            // Delete form data from app.formsData
            if (app.formsData[formId]) {
                app.formsData[formId] = '';
                delete app.formsData[formId];
            }
        
            // Delete form data from local storage also
            if (app.ls['f7form-' + formId]) {
                app.ls['f7form-' + formId] = '';
                delete app.ls['f7form-' + formId];
            }
        };
        app.formGetData = function (formId) {
            // First of all check in local storage
            if (app.ls['f7form-' + formId]) {
                return JSON.parse(app.ls['f7form-' + formId]);
            }
            // Try to get it from formsData obj
            else if (app.formsData[formId]) return app.formsData[formId];
        };
        app.formToJSON = function (form) {
            form = $(form);
            if (form.length !== 1) return false;
        
            // Form data
            var formData = {};
        
            // Skip input types
            var skipTypes = ['submit', 'image', 'button', 'file'];
            var skipNames = [];
            form.find('input, select, textarea').each(function () {
                var input = $(this);
                var name = input.attr('name');
                var type = input.attr('type');
                var tag = this.nodeName.toLowerCase();
                if (skipTypes.indexOf(type) >= 0) return;
                if (skipNames.indexOf(name) >= 0 || !name) return;
                if (tag === 'select' && input.attr('multiple')) {
                    skipNames.push(name);
                    formData[name] = [];
                    form.find('select[name="' + name + '"] option').each(function () {
                        if (this.selected) formData[name].push(this.value);
                    });
                }
                else {
                    switch (type) {
                        case 'checkbox' :
                            skipNames.push(name);
                            formData[name] = [];
                            form.find('input[name="' + name + '"]').each(function () {
                                if (this.checked) formData[name].push(this.value);
                            });
                            break;
                        case 'radio' :
                            skipNames.push(name);
                            form.find('input[name="' + name + '"]').each(function () {
                                if (this.checked) formData[name] = this.value;
                            });
                            break;
                        default :
                            formData[name] = input.val();
                            break;
                    }
                }
                    
            });
        
            return formData;
        };
        app.formFromJSON = function (form, formData) {
            form = $(form);
            if (form.length !== 1) return false;
        
            // Skip input types
            var skipTypes = ['submit', 'image', 'button', 'file'];
            var skipNames = [];
        
            form.find('input, select, textarea').each(function () {
                var input = $(this);
                var name = input.attr('name');
                var type = input.attr('type');
                var tag = this.nodeName.toLowerCase();
                if (!formData[name]) return;
                if (skipTypes.indexOf(type) >= 0) return;
                if (skipNames.indexOf(name) >= 0 || !name) return;
                if (tag === 'select' && input.attr('multiple')) {
                    skipNames.push(name);
                    form.find('select[name="' + name + '"] option').each(function () {
                        if (formData[name].indexOf(this.value) >= 0) this.selected = true;
                        else this.selected = false;
                    });
                }
                else {
                    switch (type) {
                        case 'checkbox' :
                            skipNames.push(name);
                            form.find('input[name="' + name + '"]').each(function () {
                                if (formData[name].indexOf(this.value) >= 0) this.checked = true;
                                else this.checked = false;
                            });
                            break;
                        case 'radio' :
                            skipNames.push(name);
                            form.find('input[name="' + name + '"]').each(function () {
                                if (formData[name] === this.value) this.checked = true;
                                else this.checked = false;
                            });
                            break;
                        default :
                            input.val(formData[name]);
                            break;
                    }
                }
                    
            });
        };
        app.initFormsStorage = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length === 0) return;
        
            var forms = pageContainer.find('form.store-data');
        
            // Parse forms data and fill form if there is such data
            forms.each(function () {
                var id = this.getAttribute('id');
                if (!id) return;
                var formData = app.formGetData(id);
                if (formData) app.formFromJSON(this, formData);
            });
            // Update forms data on inputs change
            forms.on('change submit', function () {
                var formId = this.id;
                if (!formId) return;
                var formJSON = app.formToJSON(this);
                if (!formJSON) return;
                app.formStoreData(formId, formJSON);
                $(this).trigger('store', {data: formJSON});
            });
        };
        
        // Ajax submit on forms
        $(document).on('submit change', 'form.ajax-submit, form.ajax-submit-onchange', function (e) {
            var form = $(this);
            if (e.type === 'change' && !form.hasClass('ajax-submit-onchange')) return;
            if (e.type === 'submit') e.preventDefault();
            
            var method = form.attr('method') || 'GET';
            var contentType = form.attr('enctype');
        
            var url = form.attr('action');
            if (!url) return;
        
            var data;
            if (method === 'POST') data = new FormData(form[0]);
            else data = $.serializeObject(app.formToJSON(form[0]));
        
            $.ajax({
                method: method,
                url: url,
                contentType: contentType,
                data: data,
                success: function (data) {
                    form.trigger('submitted', {data: data});
                }
            });
        });
        
        
        /*======================================================
        ************   Handle Browser's History   ************
        ======================================================*/
        app.pushStateQueue = [];
        app.pushStateClearQueue = function () {
            if (app.pushStateQueue.length === 0) return;
            var queue = app.pushStateQueue.pop();
            if (queue.action === 'goBack') {
                app.goBack(queue.view, undefined, false, false);
            }
            if (queue.action === 'loadPage') {
                app.loadPage(queue.view, queue.stateUrl, false);
            }
            if (queue.action === 'loadContent') {
                app.loadContent(queue.view, queue.stateContent, false);
            }
        };
        
        app.initPushState = function () {
            var blockPopstate = true;
            $(window).on('load', function () {
                setTimeout(function () {
                    blockPopstate = false;
                }, 0);
            });
            function handlePopState(e) {
                if (blockPopstate) return;
                var mainView;
                for (var i = 0; i < app.views.length; i++) {
                    if (app.views[i].main) mainView = app.views[i];
                }
                if (!mainView) return;
                var state = e.state;
                if (!state) {
                    state = {
                        url : mainView.history[0]
                    };
                }
                var stateUrl = state && state.url || undefined;
                var stateContent = state && state.content || undefined;
                if (stateUrl !== mainView.url) {
                    if (mainView.history.indexOf(stateUrl) >= 0) {
                        // Go Back
                        if (app.allowPageChange) {
                            app.goBack(mainView, undefined, false, false);
                        }
                        else {
                            app.pushStateQueue.push({
                                action: 'goBack',
                                view: mainView
                            });
                        }
                    }
                    else if (stateUrl && !stateContent) {
                        // Load Page
                        if (app.allowPageChange) {
                            app.loadPage(mainView, stateUrl, false);
                        }
                        else {
                            app.pushStateQueue.push({
                                action: 'loadPage',
                                stateUrl: stateUrl,
                                view: mainView
                            });
                        }
                    }
                    else if (stateContent) {
                        // Load Page
                        if (app.allowPageChange) {
                            app.loadContent(mainView, stateContent, false);
                        }
                        else {
                            app.pushStateQueue.push({
                                action: 'loadContent',
                                stateContent: stateContent,
                                view: mainView
                            });
                        }
                    }
                }
            }
            $(window).on('popstate', handlePopState);
        };
        
        /*======================================================
        ************   App Init   ************
        ======================================================*/
        app.init = function () {
            if (app.getDeviceInfo) app.getDeviceInfo();
        
            // Init Click events
            if (app.initFastClicks && app.params.fastClicks) app.initFastClicks();
            if (app.initClickEvents) app.initClickEvents();
        
            // Init each page callbacks
            $('.page').each(function () {
                var pageContainer = $(this);
                var viewContainer = pageContainer.parents('.' + app.params.viewClass);
                var view = viewContainer[0].f7View || false;
                var url = view && view.url ? view.url : false;
                if (viewContainer) {
                    viewContainer.attr('data-page', pageContainer.attr('data-page') || undefined);
                }
                app.pageInitCallback(view, this, url, 'center');
            });
            
            // Init resize events
            if (app.initResize) app.initResize();
        
            // Init push state
            if (app.initPushState && app.params.pushState) app.initPushState();
        
            // Init Swipeouts events
            if (app.initSwipeout && app.params.swipeout) app.initSwipeout();
        
            // Init Sortable events
            if (app.initSortable && app.params.sortable) app.initSortable();
        
            // Init Pull To Refresh
            if (app.initPullToRefresh && app.params.pullToRefresh) app.initPullToRefresh();
        
            // Init Swipe Panels
            if (app.initSwipePanels && app.params.swipePanel) app.initSwipePanels();
            
            // App Init callback
            if (app.params.onAppInit) app.params.onAppInit();
        };
        if (app.params.init) app.init();
        
        //Return instance        
        return app;
    };
    
    /*===========================
    jQuery-like DOM library
    ===========================*/
    var Dom7 = function (arr) {
        var _this = this, i = 0;
        // Create array-like object
        for (i = 0; i < arr.length; i++) {
            _this[i] = arr[i];
        }
        _this.length = arr.length;
        // Return collection with methods
        return this;
    };
    Dom7.prototype = {
        // Classes and attriutes
        addClass: function (className) {
            var classes = className.split(' ');
            for (var i = 0; i < classes.length; i++) {
                for (var j = 0; j < this.length; j++) {
                    this[j].classList.add(classes[i]);
                }
            }
            return this;
        },
        removeClass: function (className) {
            var classes = className.split(' ');
            for (var i = 0; i < classes.length; i++) {
                for (var j = 0; j < this.length; j++) {
                    this[j].classList.remove(classes[i]);
                }
            }
            return this;
        },
        hasClass: function (className) {
            if (!this[0]) return false;
            else return this[0].className.indexOf(className) >= 0;
        },
        toggleClass: function (className) {
            var classes = className.split(' ');
            for (var i = 0; i < classes.length; i++) {
                for (var j = 0; j < this.length; j++) {
                    this[j].classList.toggle(classes[i]);
                }
            }
            return this;
        },
        attr: function (attr, value) {
            if (typeof value === 'undefined') {
                return this[0].getAttribute(attr);
            }
            else {
                for (var i = 0; i < this.length; i++) {
                    this[i].setAttribute(attr, value);
                }
                return this;
            }
        },
        data: function (key, value) {
            if (typeof value === 'undefined') {
                // Get value
                if (this[0]) {
                    var dataKey = this[0].getAttribute('data-' + key);
                    if (dataKey) return dataKey;
                    else if (this[0].f7ElementDataStorage && this[0].f7ElementDataStorage[key]) return this[0].f7ElementDataStorage[key];
                    else return undefined;
                }
                else return undefined;
            }
            else {
                // Set value
                for (var i = 0; i < this.length; i++) {
                    var el = this[i];
                    if (!el.f7ElementDataStorage) el.f7ElementDataStorage = {};
                    el.f7ElementDataStorage[key] = value;
                }
                return this;
            }
        },
        val: function (value) {
            if (typeof value === 'undefined') {
                if (this[0]) return this[0].value;
                else return null;
            }
            else {
                for (var i = 0; i < this.length; i++) {
                    this[i].value = value;
                }
                return this;
            }
        },
        // Transforms
        transform : function (transform) {
            for (var i = 0; i < this.length; i++) {
                var elStyle = this[i].style;
                elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
            }
            return this;
        },
        transition: function (duration) {
            if (typeof duration !== 'string') {
                duration = duration + 'ms';
            }
            for (var i = 0; i < this.length; i++) {
                var elStyle = this[i].style;
                elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
            }
            return this;
        },
        //Events
        on: function (eventName, targetSelector, listener) {
            function handleLiveEvent(e) {
                var target = e.target;
                if ($(target).is(targetSelector)) listener.call(target, e);
                else {
                    var parents = $(target).parents();
                    for (var k = 0; k < parents.length; k++) {
                        if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                    }
                }
            }
            var events = eventName.split(' ');
            var i, j;
            for (i = 0; i < this.length; i++) {
                if (arguments.length === 2 || targetSelector === false) {
                    // Usual events
                    if (arguments.length === 2) listener = arguments[1];
                    for (j = 0; j < events.length; j++) {
                        this[i].addEventListener(events[j], listener, false);
                    }
                }
                else {
                    //Live events
                    for (j = 0; j < events.length; j++) {
                        this[i].addEventListener(events[j], handleLiveEvent, false);
                    }
                }
            }
    
            return this;
        },
        off: function (event, listener) {
            for (var i = 0; i < this.length; i++) {
                this[i].removeEventListener(event, listener, false);
            }
            return this;
        },
        trigger: function (eventName, eventData) {
            for (var i = 0; i < this.length; i++) {
                var evt;
                try {
                    evt = new CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
                }
                catch (e) {
                    evt = document.createEvent('Event');
                    evt.initEvent(eventName, true, true);
                    evt.detail = eventData;
                }
                this[i].dispatchEvent(evt);
            }
            return this;
        },
        transitionEnd: function (callback) {
            var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                i, j, dom = this;
            function fireCallBack(e) {
                /*jshint validthis:true */
                callback.call(this, e);
                for (i = 0; i < events.length; i++) {
                    dom.off(events[i], fireCallBack);
                }
            }
            if (callback) {
                for (i = 0; i < events.length; i++) {
                    dom.on(events[i], fireCallBack);
                }
            }
            return this;
        },
        animationEnd: function (callback) {
            var events = ['webkitAnimationEnd', 'OAnimationEnd', 'MSAnimationEnd', 'animationend'],
                i, j, dom = this;
            function fireCallBack(e) {
                callback(e);
                for (i = 0; i < events.length; i++) {
                    dom.off(events[i], fireCallBack);
                }
            }
            if (callback) {
                for (i = 0; i < events.length; i++) {
                    dom.on(events[i], fireCallBack);
                }
            }
            return this;
        },
        // Sizing/Styles
        width: function () {
            if (this[0] === window) {
                return window.innerWidth;
            }
            else {
                if (this.length > 0) {
                    return parseFloat(this.css('width')) - parseFloat(this.css('padding-left')) - parseFloat(this.css('padding-right'));
                }
                else {
                    return null;
                }
            }
                
        },
        outerWidth: function (margins) {
            if (this.length > 0) {
                if (margins)
                    return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                else
                    return this[0].offsetWidth;
            }
            else return null;
        },
        height: function () {
            if (this[0] === window) {
                return window.innerHeight;
            }
            else {
                if (this.length > 0) {
                    return this[0].offsetHeight - parseFloat(this.css('padding-top')) - parseFloat(this.css('padding-bottom'));
                }
                else {
                    return null;
                }
            }
                
        },
        outerHeight: function (margins) {
            if (this.length > 0) {
                if (margins)
                    return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));
                else
                    return this[0].offsetHeight;
            }
            else return null;
        },
        offset: function () {
            if (this.length > 0) {
                var el = this[0];
                var box = el.getBoundingClientRect();
                var body = document.body;
                var clientTop  = el.clientTop  || body.clientTop  || 0;
                var clientLeft = el.clientLeft || body.clientLeft || 0;
                var scrollTop  = window.pageYOffset || el.scrollTop;
                var scrollLeft = window.pageXOffset || el.scrollLeft;
                return {
                    top: box.top  + scrollTop  - clientTop,
                    left: box.left + scrollLeft - clientLeft
                };
            }
            else {
                return null;
            }
        },
        hide: function () {
            for (var i = 0; i < this.length; i++) {
                this[i].style.display = 'none';
            }
            return this;
        },
        show: function () {
            for (var i = 0; i < this.length; i++) {
                this[i].style.display = 'block';
            }
            return this;
        },
        css: function (props, value) {
            var i;
            if (arguments.length === 1) {
                if (typeof props === 'string') {
                    if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                }
                else {
                    for (i = 0; i < this.length; i++) {
                        for (var prop in props) {
                            this[i].style[prop] = props[prop];
                        }
                    }
                    return this;
                }
            }
            if (arguments.length === 2 && typeof props === 'string') {
                for (i = 0; i < this.length; i++) {
                    this[i].style[props] = value;
                }
                return this;
            }
            return this;
        },
        
        //Dom manipulation
        each: function (callback) {
            for (var i = 0; i < this.length; i++) {
                callback.call(this[i], i, this[i]);
            }
            return this;
        },
        html: function (html) {
            if (typeof html === 'undefined') {
                return this[0] ? this[0].innerHTML : undefined;
            }
            else {
                for (var i = 0; i < this.length; i++) {
                    this[i].innerHTML = html;
                }
                return this;
            }
        },
        text: function (text) {
            if (typeof text === 'undefined') {
                if (this[0]) {
                    return this[0].textContent.trim();
                }
                else return null;
            }
            else {
                for (var i = 0; i < this.length; i++) {
                    this[0].textContent = text;
                }
            }
        },
        is: function (selector) {
            var compareWith;
            if (typeof selector === 'string') compareWith = document.querySelectorAll(selector);
            else if (selector.nodeType) compareWith = [selector];
            else compareWith = selector;
            for (var i = 0; i < compareWith.length; i++) {
                if (compareWith[i] === this[0]) return true;
            }
            return false;
        },
        indexOf: function (el) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] === el) return i;
            }
        },
        index: function () {
            if (this[0]) {
                var child = this[0];
                var i = 0;
                while ((child = child.previousSibling) != null)
                    i++;
                return i;
            }
            else return undefined;
        },
        eq: function (index) {
            if (typeof index === 'undefined') return this;
            var length = this.length;
            var returnIndex;
            if (index > length - 1) {
                return new Dom7([]);
            }
            if (index < 0) {
                returnIndex = length + index;
                if (returnIndex < 0) return new Dom7([]);
                else return new Dom7([this[returnIndex]]);
            }
            return new Dom7([this[index]]);
        },
        append: function (newChild) {
            for (var i = 0; i < this.length; i++) {
                if (typeof newChild === 'string') {
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = newChild;
                    while (tempDiv.firstChild) {
                        this[i].appendChild(tempDiv.firstChild);
                    }
                }
                else {
                    this[i].appendChild(newChild);
                }
            }
            return this;
        },
        prepend: function (newChild) {
            for (var i = 0; i < this.length; i++) {
                if (typeof newChild === 'string') {
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = newChild;
                    for (var j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                        this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                    }
                }
                else {
                    this[i].insertBefore(newChild, this[i].childNodes[0]);
                }
            }
            return this;
        },
        insertBefore: function (selector) {
            var before = $(selector);
            for (var i = 0; i < this.length; i++) {
                if (before.length === 1) {
                    before[0].parentNode.insertBefore(this[i], before[0]);
                }
                else if (before.length > 1) {
                    for (var j = 0; j < before.length; j++) {
                        before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                    }
                }
            }
        },
        insertAfter: function (selector) {
            var after = $(selector);
            for (var i = 0; i < this.length; i++) {
                if (after.length === 1) {
                    after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                }
                else if (after.length > 1) {
                    for (var j = 0; j < after.length; j++) {
                        after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                    }
                }
            }
        },
        next: function () {
            if (this.length > 0) {
                if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
                else return new Dom7([]);
            }
            else return new Dom7([]);
        },
        prev: function () {
            if (this.length > 0) {
                if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
                else return new Dom7([]);
            }
            else return new Dom7([]);
        },
        parent: function (selector) {
            var parents = [];
            for (var i = 0; i < this.length; i++) {
                if (selector) {
                    if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                }
                else {
                    parents.push(this[i].parentNode);
                }
            }
            return $($.unique(parents));
        },
        parents: function (selector) {
            var parents = [];
            for (var i = 0; i < this.length; i++) {
                var parent = this[i].parentNode;
                while (parent) {
                    if (selector) {
                        if ($(parent).is(selector)) parents.push(parent);
                    }
                    else {
                        parents.push(parent);
                    }
                    parent = parent.parentNode;
                }
            }
            return $($.unique(parents));
        },
        find : function (selector) {
            var foundElements = [];
            for (var i = 0; i < this.length; i++) {
                var found = this[i].querySelectorAll(selector);
                for (var j = 0; j < found.length; j++) {
                    foundElements.push(found[j]);
                }
            }
            return new Dom7(foundElements);
        },
        children: function (selector) {
            var children = [];
            for (var i = 0; i < this.length; i++) {
                var childNodes = this[i].childNodes;
    
                for (var j = 0; j < childNodes.length; j++) {
                    if (!selector) {
                        if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                    }
                    else {
                        if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                    }
                }
            }
            return new Dom7($.unique(children));
        },
        remove: function () {
            for (var i = 0; i < this.length; i++) {
                if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
            }
            return this;
        },
    };
    // Shortcuts
    (function () {
        var shortcuts = ('click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll').split(' ');
        var notTrigger = ('resize scroll').split(' ');
        function createMethod(name) {
            Dom7.prototype[name] = function (handler) {
                var i;
                if (typeof handler === 'undefined') {
                    for (i = 0; i < this.length; i++) {
                        if (notTrigger.indexOf(name) < 0) this[i][name]();
                    }
                    return this;
                }
                else {
                    return this.on(name, handler);
                }
            };
        }
        for (var i = 0; i < shortcuts.length; i++) {
            createMethod(shortcuts[i]);
        }
    })();
    
    // Selector 
    var $ = function (selector, context) {
        var arr = [], i = 0;
        if (selector) {
            // String
            if (typeof selector === 'string') {
                var els = (context || document).querySelectorAll(selector);
                for (i = 0; i < els.length; i++) {
                    arr.push(els[i]);
                }
            }
            // Node/element
            else if (selector.nodeType || selector === window || selector === document) {
                arr.push(selector);
            }
            //Array of elements or instance of Dom
            else if (selector.length > 0 && selector[0].nodeType) {
                for (i = 0; i < selector.length; i++) {
                    arr.push(selector[i]);
                }
            }
        }
        return new Dom7(arr);
    };
    
    // DOM Library Utilites
    $.parseUrlQuery = function (url) {
        var query = {}, i, params, param;
        if (url.indexOf('?') >= 0) url = url.split('?')[1];
        params = url.split('&');
        for (i = 0; i < params.length; i++) {
            param = params[i].split('=');
            query[param[0]] = param[1];
        }
        return query;
    };
    $.isArray = function (arr) {
        if (Object.prototype.toString.apply(arr) === '[object Array]') return true;
        else return false;
    };
    $.unique = function (arr) {
        var unique = [];
        for (var i = 0; i < arr.length; i++) {
            if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
        }
        return unique;
    };
    $.trim = function (str) {
        return str.trim();
    };
    $.serializeObject = function (obj) {
        if (typeof obj === 'string') return obj;
        var resultArray = [];
        var separator = '&';
        for (var prop in obj) {
            if ($.isArray(obj[prop])) {
                var toPush = [];
                for (var i = 0; i < obj[prop].length; i ++) {
                    toPush.push(prop + '=' + obj[prop][i]);
                }
                resultArray.push(toPush.join(separator));
            }
            else {
                // Should be string
                resultArray.push(prop + '=' + obj[prop]);
            }
        }
    
        return resultArray.join(separator);
    };
    $.fn = Dom7.prototype;
    
    // Ajax
    $.ajax = function (options) {
        var defaults = {
            method: 'GET',
            data: false,
            crossDomain: true,
            async: true,
            cache: true,
            user: '',
            password: '',
            headers: {},
            statusCode: {},
            processData: true,
            dataType: 'text',
            contentType: 'application/x-www-form-urlencoded'
        };
    
        // Merge options and defaults
        for (var prop in defaults) {
            if (!(prop in options)) options[prop] = defaults[prop];
        }
    
        // Data to modify GET URL
        if ((options.method === 'GET' || options.method === 'HEAD') && options.data) {
            var stringData;
            if (typeof options.data === 'string') {
                // Should be key=value string
                if (options.data.indexOf('?') >= 0) stringData = options.data.split('?')[1];
                else stringData = options.data;
            }
            else {
                // Should be key=value object
                stringData = $.serializeObject(options.data);
            }
            if (options.url.indexOf('?') >= 0) options.url += '&' + stringData;
            else options.url += '?' + stringData;
        }
        // JSONP
        if (options.dataType === 'json' && options.url.indexOf('callback=') >= 0) {
            
            var callbackName = 'f7jsonp_' + Date.now();
            var requestURL;
            var callbackSplit = options.url.split('callback=');
            if (callbackSplit[1].indexOf('&') >= 0) {
                var addVars = callbackSplit[1].split('&').filter(function (el) { return el.indexOf('=') > 0; }).join('&');
                requestURL = callbackSplit[0] + 'callback=' + callbackName + (addVars.length > 0 ? '&' + addVars : '');
            }
            else {
                requestURL = callbackSplit[0] + 'callback=' + callbackName;
            }
    
            // Create script
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = requestURL;
    
            // Handler
            window[callbackName] = function (data) {
                if (options.success) options.success(data);
                script.parentNode.removeChild(script);
                script = null;
                delete window[callbackName];
            };
            document.querySelector('head').appendChild(script);
    
            return;
        }
    
        // Cache for GET/HEAD requests
        if (options.method === 'GET' || options.method === 'HEAD') {
            if (options.cache === false) options.url += ('_nocache=' + Date.now());
        }
    
        // Create XHR
        var xhr = new XMLHttpRequest();
    
        // Open XHR
        xhr.open(options.method, options.url, options.async, options.user, options.password);
    
        // Create POST Data
        var postData = null;
        
        if ((options.method === 'POST' || options.method === 'PUT') && options.data) {
            if (options.processData) {
                var postDataInstances = [ArrayBuffer, Blob, Document, FormData];
                // Post Data
                if (postDataInstances.indexOf(options.data.constructor) >= 0) {
                    postData = options.data;
                }
                else {
                    // POST Headers
                    var boundary = '---------------------------' + Date.now().toString(16);
    
                    if (options.contentType === 'multipart\/form-data') {
                        xhr.setRequestHeader('Content-Type', 'multipart\/form-data; boundary=' + boundary);
                    }
                    else {
                        xhr.setRequestHeader('Content-Type', options.contentType);
                    }
                    postData = '';
                    var _data = $.serializeObject(options.data);
                    if (options.contentType === 'multipart\/form-data') {
                        boundary = '---------------------------' + Date.now().toString(16);
                        _data = _data.split('&');
                        var _newData = [];
                        for (var i = 0; i < _data.length; i++) {
                            _newData.push('Content-Disposition: form-data; name="' + _data[i].split('=')[0] + '"\r\n\r\n' + _data[i].split('=')[1] + '\r\n');
                        }
                        postData = '--' + boundary + '\r\n' + _newData.join('--' + boundary + '\r\n') + '--' + boundary + '--\r\n';
                    }
                    else {
                        postData = options.contentType === 'application/x-www-form-urlencoded' ? _data : _data.replace(/&/g, '\r\n');
                    }
                }
            }
            else {
                postData = options.data;
            }
                
        }
    
        // Additional headers
        if (options.headers) {
            for (var header in options.headers) {
                xhr.setRequestHeader(header, options.headers[header]);
            }
        }
    
        // Handle XHR
        xhr.onload = function (e) {
            if (xhr.status === 200 || xhr.status === 0) {
                $(document).trigger('ajaxSuccess', {xhr: xhr});
                if (options.success) {
                    var responseData = xhr.responseText;
    
                    if (options.dataType === 'json') responseData = JSON.parse(responseData);
                    options.success(responseData, xhr.status, xhr);
                }
            }
            if (options.statusCode) {
                if (options.statusCode[xhr.status]) options.statusCode[xhr.status](xhr);
            }
            if (options.complete) {
                options.complete(xhr);
            }
            $(document).trigger('ajaxComplete', {xhr: xhr});
        };
        if (options.error) {
    
        }
        xhr.onerror = function (e) {
            $(document).trigger('ajaxError', {xhr: xhr});
            if (options.error) options.error(xhr);
        };
    
        // Ajax start callback
        if (options.start) options.start(xhr);
    
        // Send XHR
        $(document).trigger('ajaxStart', {xhr: xhr});
        xhr.send(postData);
    
        // Return XHR object
        return xhr;
    };
    
    $.get = function (url, data, success) {
        var options = {
            url: url,
            method: 'GET',
            data: typeof data === 'function' ? undefined : data,
            success: typeof data === 'function' ? data : success
        };
        return $.ajax(options);
    };
    
    $.post = function (url, data, success) {
        var options = {
            url: url,
            method: 'POST',
            data: typeof data === 'function' ? undefined : data,
            success: typeof data === 'function' ? data : success
        };
        return $.ajax(options);
    };
    
    $.getJSON = function (url, data, success) {
        var options = {
            url: url,
            method: 'GET',
            data: typeof data === 'function' ? undefined : data,
            success: typeof data === 'function' ? data : success,
            dataType: 'json'
        };
        return $.ajax(options);
    };
    
    // Export Selectors engine to global Framework7
    Framework7.$ = $;
    
    /*===========================
    Features Support Detection
    ===========================*/
    Framework7.prototype.support = (function () {
        var support = {
            touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)
        };
    
        // Export object
        return support;
    })();
    
    /*===========================
    Device/OS Detection
    ===========================*/
    Framework7.prototype.device = (function () {
        var device = {};
        var ua = navigator.userAgent;
    
        var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    
        device.ios = device.android = device.iphone = device.ipad = false;
        
        // Android
        if (android) {
            device.os = 'android';
            device.osVersion = android[2];
            device.android = true;
        }
        if (ipad || iphone || ipod) {
            device.os = 'ios';
            device.ios = true;
        }
        // iOS
        if (iphone && !ipod) {
            device.osVersion = iphone[2].replace(/_/g, '.');
            device.iphone = true;
        }
        if (ipad) {
            device.osVersion = ipad[2].replace(/_/g, '.');
            device.ipad = true;
        }
        if (ipod) {
            device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
            device.iphone = true;
        }
    
        // Webview
        device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
            
        // Minimal UI
        if (device.os && device.os === 'ios') {
            var osVersionArr = device.osVersion.split('.');
            device.minimalUi = !device.webView &&
                                (ipod || iphone) &&
                                (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
                                $('meta[name="viewport"]').length > 0 && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
        }
    
        // Check for status bar and fullscreen app mode
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
        device.statusBar = false;
        if (
            device.webView &&
            (
                // iPhone 5
                (windowWidth === 320 && windowHeight === 568) ||
                (windowWidth === 568 && windowHeight === 320) ||
                // iPhone 4
                (windowWidth === 320 && windowHeight === 480) ||
                (windowWidth === 480 && windowHeight === 320) ||
                // iPad
                (windowWidth === 768 && windowHeight === 1024) ||
                (windowWidth === 1024 && windowHeight === 768)
            )
        ) {
            device.statusBar = true;
        }
        else {
            device.statusBar = false;
        }
    
        // Pixel Ratio
        device.pixelRatio = window.devicePixelRatio || 1;
    
        // Add html classes
        if (device.os) {
            var className = device.os +
                            ' ' +
                            device.os + '-' + device.osVersion.replace(/\./g, '-') +
                            ' ' +
                            device.os + '-' + device.osVersion.split('.')[0];
            $('html').addClass(className);
        }
        if (device.statusBar) {
            $('html').addClass('with-statusbar-overlay');
        }
        else {
            $('html').removeClass('with-statusbar-overlay');
        }
    
        // Export object
        return device;
    })();
    
})();