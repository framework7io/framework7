/*
 * Framework7 0.5.4
 * Full Featured HTML Framework For Building iOS7 Apps
 *
 * http://www.idangero.us/framework7
 *
 * Copyright 2014, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under MIT
 *
 * Released on: March 20, 2014
*/
(function () {

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
            swipeBackPage: true,
            swipeBackPageThreshold: 0,
            swipeBackPageActiveArea: 30,
            swipeBackPageBoxShadow: true,
            // Ajax
            ajaxLinks: false, // or CSS selector
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
            modalPopupCloseByOutside: true,
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
        
        /*======================================================
        ************   Views   ************
        ======================================================*/
        app.views = [];
        app.addView = function (viewSelector, viewParams) {
            if (!viewSelector) return;
            var container = $(viewSelector)[0];
            var view = {
                container: container,
                selector: viewSelector,
                params: viewParams || {},
                history: [],
                url: '',
                pagesContainer: $('.pages', container)[0],
                main: $(container).hasClass('view-main'),
                loadPage: function (url) {
                    app.loadPage(view, url);
                },
                goBack: function (url) {
                    app.goBack(view, url);
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
            if (view.main) {
                view.url = document.location.href;
                view.history.push(view.url);
            }
            // Store View in element for easy access
            container.f7View = view;
        
            // Add view to app
            app.views.push(view);
        
            // Init View's events
            app.initViewEvents(view);
        
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
                i,
                dynamicNavbar,
                el;
        
            viewContainer.on(app.touchEvents.start, function (e) {
                if (!allowViewTouchMove || !app.params.swipeBackPage) return;
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();
                dynamicNavbar = view.params.dynamicNavbar && viewContainer.find('.navbar-inner').length > 1;
            });
            viewContainer.on(app.touchEvents.move, function (e) {
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
                    var cancel = false;
                    // Calc values during first move fired
                    viewContainerWidth = viewContainer.width();
                    activePage = $(e.target).is('.page') ? $(e.target) : $(e.target).parents('.page');
                    previousPage = viewContainer.find('.page-on-left');
                    if (touchesStart.x - viewContainer.offset().left > app.params.swipeBackPageActiveArea) cancel = true;
                    if (previousPage.length === 0 || activePage.length === 0) cancel = true;
                    if (cancel) {
                        isTouched = false;
                        return;
                    }
                    if (dynamicNavbar) {
                        activeNavbar = viewContainer.find('.navbar-on-center');
                        previousNavbar = viewContainer.find('.navbar-on-left');
                        activeNavElements = activeNavbar.find('.left, .center, .right');
                        previousNavElements = previousNavbar.find('.left, .center, .right');
                    }
                }
                isMoved = true;
        
                e.preventDefault();
                touchesDiff = pageX - touchesStart.x - app.params.swipeBackPageThreshold;
                if (touchesDiff < 0) touchesDiff = 0;
                var percentage = touchesDiff / viewContainerWidth;
        
                // Transform pages
                activePage.transform('translate3d(' + touchesDiff + 'px,0,0)');
                if (app.params.swipeBackPageBoxShadow) activePage[0].style.boxShadow = '0px 0px 12px rgba(0,0,0,' + (0.5 - 0.5 * percentage) + ')';
                previousPage.transform('translate3d(' + (touchesDiff / 5 - viewContainerWidth / 5) + 'px,0,0)');
                previousPage[0].style.opacity = 0.9 + 0.1 * percentage;
        
                // Dynamic Navbars Animation
                if (dynamicNavbar) {
                    for (i = 0; i < activeNavElements.length; i++) {
                        el = $(activeNavElements[i]);
                        el[0].style.opacity = (1 - percentage * 1.3);
                        if (el[0].className.indexOf('sliding') >= 0) {
                            el.transform('translate3d(' + (percentage * el[0].f7NavbarRightOffset) + 'px,0,0)');
                        }
                    }
                    for (i = 0; i < previousNavElements.length; i++) {
                        el = $(previousNavElements[i]);
                        el[0].style.opacity = percentage * 1.3 - 0.3;
                        if (el[0].className.indexOf('sliding') >= 0) {
                            el.transform('translate3d(' + (el[0].f7NavbarLeftOffset * (1 - percentage)) + 'px,0,0)');
                        }
                    }
                }
        
            });
            viewContainer.on(app.touchEvents.end, function (e) {
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                isTouched = false;
                isMoved = false;
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
                        $(this).transform('translate3d(' + translate + 'px,0,0)');
                    }).addClass('page-transitioning');
        
                    previousNavElements.transform('').css({opacity: ''}).each(function () {
                        var translate = pageChanged ? 0 : this.f7NavbarLeftOffset;
                        $(this).transform('translate3d(' + translate + 'px,0,0)');
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
                        activeNavElements.removeClass('page-transitioning');
                        activeNavElements.transform('').css({opacity: ''});
                        previousNavElements.removeClass('page-transitioning');
                        previousNavElements.transform('').css({opacity: ''});
                    }
                    allowViewTouchMove = true;
                    app.allowPageChange = true;
                    if (pageChanged) app.afterGoBack(view, activePage, previousPage);
                });
            });
        };
        /*======================================================
        ************   Navbars && Toolbars   ************
        ======================================================*/
        app.sizeNavbars = function (viewContainer) {
            var navbarInner = viewContainer ? $(viewContainer).find('.navbar .navbar-inner') : $('.navbar .navbar-inner');
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
                }
                if (!noLeft && left.hasClass('sliding')) {
                    left[0].f7NavbarLeftOffset = -leftWidth;
                    left[0].f7NavbarRightOffset = (navbarWidth - left.outerWidth()) / 2;
                }
                if (!noRight && right.hasClass('sliding')) {
                    right[0].f7NavbarLeftOffset = -(navbarWidth - right.outerWidth()) / 2;
                    right[0].f7NavbarRightOffset = rightWidth;
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
            if (app.params.cache) {
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
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onload = function (e) {
                if (callback) {
                    if (this.status === 200 || this.status === 0) {
                        callback(this.responseText, false);
                        if (app.params.cache) {
                            app.removeFromCache(url);
                            app.cache.push({
                                url: url,
                                time: (new Date()).getTime(),
                                data: this.responseText
                            });
                        }
                    }
                    else {
                        callback(this.responseText, true);
                    }
                }
            };
            xhr.send();
            app.xhr = xhr;
            return xhr;
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
            if (app.params.onBeforePageInit) {
                app.params.onBeforePageInit(pageData);
            }
            if (view.params.onBeforePageInit) {
                view.params.onBeforePageInit(pageData);
            }
            $(document).trigger('beforePageInit', {page: pageData});
            app.initPage(pageContainer);
            // Init Callback
            if (app.params.onPageInit) {
                app.params.onPageInit(pageData);
            }
            if (view.params.onPageInit) {
                view.params.onPageInit(pageData);
            }
            $(document).trigger('pageInit', {page: pageData});
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
                if (app.params.onPageAfterAnimation) {
                    app.params.onPageAfterAnimation(pageData);
                }
                if (view.params.onPageAfterAnimation) {
                    view.params.onPageAfterAnimation(pageData);
                }
                $(document).trigger('pageAfterAnimation', {page: pageData});
        
            }
            if (callback === 'before') {
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
                if (app.params.onPageBeforeAnimation) {
                    app.params.onPageBeforeAnimation(pageData);
                }
                if (view.params.onPageBeforeAnimation) {
                    view.params.onPageBeforeAnimation(pageData);
                }
                $(document).trigger('pageBeforeAnimation', {page: pageData});
            }
        };
        // Init Page Events and Manipulations
        app.initPage = function (pageContainer) {
            // Prevent Togglers from bubbling AnimationEnd events
            $(pageContainer).find('.switch').on('webkitAnimationEnd OAnimationEnd MSAnimationEnd animationend', function (e) {
                e.stopPropagation();
            });
            // Size navbars on page load
            app.sizeNavbars($(pageContainer).parents('.view')[0]);
            // Init messages
            app.initMessages(pageContainer);
        };
        // Load Page
        app.allowPageChange = true;
        app._tempDomElement = document.createElement('div');
        app.loadPage = function (view, url) {
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
                var viewContainer = $(view.container),
                    newPage, oldPage, pagesInView, i, oldNavbarInner, newNavbarInner, navbar, dynamicNavbar;
        
                // Parse DOM to find new page
                app._tempDomElement.innerHTML = data;
                newPage = $('.page', app._tempDomElement);
                if (newPage.length > 1) {
                    newPage = $(app._tempDomElement).find('.view-main .page');
                }
        
                // If pages not found or there are still more than one, exit
                if (newPage.length === 0 || newPage.length > 1) {
                    app.allowPageChange = true;
                    return;
                }
                newPage.addClass('page-on-right');
        
                // Update View history
                view.url = url;
                view.history.push(url);
        
                // Find old page (should be the last one) and remove older pages
                pagesInView = viewContainer.find('.page');
                if (pagesInView.length > 1) {
                    for (i = 0; i < pagesInView.length - 2; i++) {
                        $(pagesInView[i]).remove();
                    }
                    $(pagesInView[i]).remove();
                }
                oldPage = viewContainer.find('.page');
        
                // Dynamic navbar
                if (view.params.dynamicNavbar) {
                    dynamicNavbar = true;
                    // Find navbar
                    newNavbarInner = $('.navbar-inner', app._tempDomElement);
                    if (newNavbarInner.length > 1) {
                        newNavbarInner = $('.view-main .navbar-inner', app._tempDomElement);
                    }
                    if (newNavbarInner.length === 0 || newNavbarInner > 1) {
                        dynamicNavbar = false;
                    }
                    navbar = viewContainer.find('.navbar');
                    oldNavbarInner = navbar.find('.navbar-inner');
                    if (oldNavbarInner.length > 0) {
                        for (i = 0; i < oldNavbarInner.length - 1; i++) {
                            $(oldNavbarInner[i]).remove();
                        }
                        if (newNavbarInner.length === 0 && oldNavbarInner.length === 1) {
                            $(oldNavbarInner[0]).remove();
                        }
                        oldNavbarInner = navbar.find('.navbar-inner');
                    }
                }
                if (dynamicNavbar) {
                    newNavbarInner.addClass('navbar-on-right');
                    navbar.append(newNavbarInner[0]);
                }
        
                // Append Old Page and add classes for animation
                $(view.pagesContainer).append(newPage[0]);
        
                // Page Init Events
                app.pageInitCallback(view, newPage[0], url, 'right');
                
                if (dynamicNavbar) {
                    newNavbarInner.find('.sliding').each(function () {
                        $(this).transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
                    });
                }
                // Force reLayout
                var clientLeft = newPage[0].clientLeft;
        
                // Before Anim Callback
                app.pageAnimCallbacks('before', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});
                
                newPage.addClass('page-from-right-to-center');
                oldPage.addClass('page-from-center-to-left').removeClass('page-on-center');
        
                // Dynamic navbar animation
                if (dynamicNavbar) {
                    newNavbarInner.removeClass('navbar-on-right').addClass('navbar-from-right-to-center');
                    newNavbarInner.find('.sliding').each(function () {
                        $(this).transform('translate3d(0px,0,0)');
                    });
                    oldNavbarInner.removeClass('navbar-on-center').addClass('navbar-from-center-to-left');
                    oldNavbarInner.find('.sliding').each(function () {
                        $(this).transform('translate3d(' + (this.f7NavbarLeftOffset) + 'px,0,0)');
                    });
                }
        
                newPage.animationEnd(function (e) {
                    app.allowPageChange = true;
                    newPage.toggleClass('page-from-right-to-center page-on-center page-on-right');
                    oldPage.toggleClass('page-from-center-to-left page-on-left');
                    if (dynamicNavbar) {
                        newNavbarInner.toggleClass('navbar-from-right-to-center navbar-on-center');
                        oldNavbarInner.toggleClass('navbar-from-center-to-left navbar-on-left');
                    }
                    app.pageAnimCallbacks('after', view, {pageContainer: newPage[0], url: url, position: 'right', oldPage: oldPage, newPage: newPage});
                });
        
            });
        };
        app.goBack = function (view, url, preloadOnly) {
            if (!app.allowPageChange) return false;
            app.allowPageChange = false;
            if (app.xhr) {
                app.xhr.abort();
                app.xhr = false;
            }
        
            var viewContainer = $(view.container),
                pagesInView = viewContainer.find('.page'),
                oldPage, newPage, oldNavbarInner, newNavbarInner, navbar, dynamicNavbar;
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
                    var inners = viewContainer.find('.navbar-inner');
                    newNavbarInner = $(inners[0]);
                    oldNavbarInner = $(inners[1]);
                }
        
                // Page before animation callback
                app.pageAnimCallbacks('before', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});
        
                // Add classes for animation
                newPage.removeClass('page-on-left').addClass('page-from-left-to-center');
                oldPage.removeClass('page-on-center').addClass('page-from-center-to-right');
        
                // Dynamic navbar animation
                if (dynamicNavbar) {
                    newNavbarInner.removeClass('navbar-on-left').addClass('navbar-from-left-to-center');
                    newNavbarInner.find('.sliding').each(function () {
                        $(this).transform('translate3d(0px,0,0)');
                    });
        
                    oldNavbarInner.removeClass('navbar-on-center').addClass('navbar-from-center-to-right');
                    oldNavbarInner.find('.sliding').each(function () {
                        $(this).transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
                    });
                }
                
                newPage.animationEnd(function () {
                    app.afterGoBack(view, oldPage[0], newPage[0]);
                    app.pageAnimCallbacks('after', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});
                });
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
                app.get(url, function (data, error) {
                    if (error) {
                        app.allowPageChange = true;
                        return;
                    }
                    // Parse DOM to find new page
                    app._tempDomElement.innerHTML = data;
                    newPage = $('.page', app._tempDomElement);
                    if (newPage.length > 1) {
                        newPage = $(app._tempDomElement).find('.view-main .page');
                    }
        
                    // If pages not found or there are still more than one, exit
                    if (newPage.length === 0 || newPage.length > 1) {
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
                        newNavbarInner = $('.navbar-inner', app._tempDomElement);
                        if (newNavbarInner.length > 1) {
                            newNavbarInner = $('.view-main .navbar-inner', app._tempDomElement);
                        }
                        if (newNavbarInner.length === 0 || newNavbarInner > 1) {
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
                            $(this).transform('translate3d(' + (this.f7NavbarLeftOffset) + 'px,0,0)');
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
        
                    // Before Anim Callback
                    app.pageAnimCallbacks('before', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});
        
                    newPage.addClass('page-from-left-to-center');
                    oldPage.removeClass('page-on-center').addClass('page-from-center-to-right');
        
                    // Dynamic navbar animation
                    if (dynamicNavbar) {
                        newNavbarInner.removeClass('navbar-on-left').addClass('navbar-from-left-to-center');
                        newNavbarInner.find('.sliding').each(function () {
                            $(this).transform('translate3d(0px,0,0)');
                        });
                        oldNavbarInner.removeClass('navbar-on-center').addClass('navbar-from-center-to-right');
                        oldNavbarInner.find('.sliding').each(function () {
                            $(this).transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
                        });
                    }
        
                    newPage.animationEnd(function () {
                        app.afterGoBack(view, oldPage[0], newPage[0]);
                        app.pageAnimCallbacks('after', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});
                    });
        
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
                var inners = $(view.container).find('.navbar-inner');
                var oldNavbar = $(inners[1]).remove();
                var newNavbar = $(inners[0]).removeClass('navbar-on-left navbar-from-left-to-center').addClass('navbar-on-center');
            }
            // Update View's Hitory
            view.history.pop();
            // Preload previous page
            if (app.params.preloadPreviousPage) {
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
                $(el).tap(function (e) {
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
                title: title || app.params.modalTitle,
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
                text: '<div class="preloader"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>'
            });
        };
        app.hidePreloader = function () {
            app.closeModal();
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
                $(el).find('.actions-modal-button').each(function (index, el) {
                    var buttonIndex = index;
                    var buttonParams = params[groupIndex][buttonIndex];
                    $(el).tap(function (e) {
                        if (buttonParams.close !== false) app.closeModal(modal);
                        if (buttonParams.onClick) buttonParams.onClick(modal, e);
                    });
                });
            });
            app.openModal(modal);
            return modal[0];
        };
        app.popover = function (modal, target) {
            modal = $(modal);
            target = $(target);
            if (modal.length === 0 || target.length === 0) return false;
        
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
        app.popup = function (modal) {
            modal = $(modal);
            if (modal.length === 0) return false;
            modal.show();
            if (modal.find('.view').length > 0) {
                app.sizeNavbars(modal.find('.view')[0]);
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
            $(modal).addClass('modal-in');
            return true;
        };
        app.closeModal = function (modal) {
            modal = $(modal || '.modal-in');
            $('.modal-overlay').removeClass('modal-overlay-visible');
            modal.trigger('close');
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            if (!isPopover) {
                modal.toggleClass('modal-in modal-out').transitionEnd(function (e) {
                    modal.trigger('closed');
                    if (!isPopup) modal.remove();
                    if (isPopup) modal.removeClass('modal-out').hide();
                });
            }
            else {
                modal.removeClass('modal-in modal-out').trigger('closed').hide();
            }
            return true;
        };
        /*======================================================
        ************   Panels   ************
        ======================================================*/
        app.allowPanelOpen = true;
        app.openPanel = function (panelPosition) {
            // @panelPosition - string with panel position "left", "right", "top"
            if (!app.allowPanelOpen) return false;
            var panel = $('.panel-' + panelPosition);
            if (panel.length === 0 || panel.hasClass('active')) return false;
            app.closePanel(); // Close if some panel is opened
            app.allowPanelOpen = false;
            var effect = panel.hasClass('panel-reveal') ? 'reveal' : 'cover';
            panel.css({display: 'block'}).addClass('active');
            panel.trigger('open');
        
            // Trigger reLayout
            var clientLeft = panel[0].clientLeft;
            
            // Transition End;
            var transitionEndTarget = effect === 'reveal' ? $('.views') : panel;
            var openedTriggered = false;
            transitionEndTarget.transitionEnd(function (e) {
                if ($(e.target).is(transitionEndTarget)) {
                    if (!openedTriggered) panel.trigger('opened');
                }
                app.allowPanelOpen = true;
            });
            setTimeout(function () {
                if (!openedTriggered) panel.trigger('opened');
            }, app.params.panelsAnimationDuration);
        
            $('body').addClass('with-panel-' + panelPosition + '-' + effect);
            return true;
        };
        app.closePanel = function () {
            var activePanel = $('.panel.active');
            if (activePanel.length === 0) return false;
            var effect = activePanel.hasClass('panel-reveal') ? 'reveal' : 'cover';
            var panelPosition = activePanel.hasClass('panel-left') ? 'left' : 'right';
            activePanel.removeClass('active');
            var transitionEndTarget = effect === 'reveal' ? $('.views') : activePanel;
            activePanel.trigger('close');
            transitionEndTarget.transitionEnd(function () {
                activePanel.css({display: ''});
                activePanel.trigger('closed');
                $('body').removeClass('panel-closing');
            });
            $('body').addClass('panel-closing').removeClass('with-panel-' + panelPosition + '-' + effect);
        };
        /*======================================================
        ************   Messages   ************
        ======================================================*/
        app.initMessages = function (pageContainer) {
            var page = $(pageContainer);
            var messages = page.find('.messages');
            if (messages.length === 0) return;
            var pageContent = page.find('.page-content');
            pageContent[0].scrollTop = messages.height() - pageContent.height();
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
        
            var html = '';
            if (props.day) {
                html += '<div class="messages-date">' + props.day + (props.time ? ',' : '') + (props.time ? ' <span>' + props.time + '</span>' : '') + '</div>';
            }
            var isPic = props.text.indexOf('<img') >= 0;
            var messageClass = 'message' + ' message-' + props.type + (isPic ? ' message-pic' : '') + ' message-appear';
            html += '<div class="' + messageClass + '">' + props.text + '</div>';
            messages.append(html);
            app.updateMessagesAngles(messages);
            app.scrollMessagesContainer(messagesContent);
        };
        app.updateMessagesAngles = function (messages) {
            messages.find('.message-sent').each(function () {
                var message = $(this);
                if (!message.next().hasClass('message-sent') && !message.hasClass('message-pic')) {
                    message.addClass('message-last');
                }
                else message.removeClass('message-last');
            });
            messages.find('.message-received').each(function () {
                var message = $(this);
                if (!message.next().hasClass('message-received') && !message.hasClass('message-pic')) {
                    message.addClass('message-last');
                }
                else message.removeClass('message-last');
            });
        };
        app.scrollMessagesContainer = function (messagesContent) {
            messagesContent = $(messagesContent || '.messages-content');
            if (messagesContent.length === 0) return;
            var messages = messagesContent.find('.messages');
            var currentScroll = messagesContent[0].scrollTop;
            var newScroll = messages.height() - messagesContent.height();
            var step = (newScroll - currentScroll) / 12;
            function animScroll() {
                if (messagesContent[0].scrollTop < newScroll) {
                    messagesContent[0].scrollTop = messagesContent[0].scrollTop + Math.floor(step);
                    app._animFrame(animScroll);
                }
                else {
                    messagesContent[0].scrollTop = newScroll;
                }
            }
            app._animFrame(animScroll);
        };
        app.openedSwipeOutEl = undefined;
        app.allowSwipeOut = true;
        app.initSwipeOutList = function () {
            var isTouched, isMoved, isScrolling, touchesStart = {}, touchStartTime, touchesDiff, swipeOutEl, swipeOutContent, swipeOutActions, swipeOutActionsWidth, translate, opened;
            $(document).on(app.touchEvents.start, function (e) {
                if (app.openedSwipeOutEl) {
                    var target = $(e.target);
                    if (!(
                        app.openedSwipeOutEl.is(target[0]) ||
                        target.parents('.swipeout').is(app.openedSwipeOutEl) ||
                        target.hasClass('modal-in') ||
                        target.parents('.modal-in').length > 0 ||
                        target.hasClass('modal-overlay')
                        )) {
                        app.closeSwipeOutList(app.openedSwipeOutEl);
                    }
                }
            });
            $(document).on(app.touchEvents.start, '.list-block li.swipeout', function (e) {
                if (!app.allowSwipeOut) return;
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();
        
            });
            $(document).on(app.touchEvents.move, '.list-block li.swipeout', function (e) {
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
                    swipeOutEl = $(this);
                    swipeOutContent = swipeOutEl.find('.swipeout-content');
                    swipeOutActions = swipeOutEl.find('.swipeout-actions-inner');
                    swipeOutActionsWidth = swipeOutActions.width();
                    opened = swipeOutEl.hasClass('opened');
                    swipeOutEl.removeClass('transitioning');
                }
                isMoved = true;
        
                e.preventDefault();
                touchesDiff = pageX - touchesStart.x;
                translate = touchesDiff  - (opened ? swipeOutActionsWidth : 0);
                if (translate > 0) translate = 0;
                if (translate < -swipeOutActionsWidth) {
                    translate = -swipeOutActionsWidth - Math.pow(-translate - swipeOutActionsWidth, 0.8);
                }
                
                swipeOutContent.transform('translate3d(' + translate + 'px,0,0)');
        
            });
            $(document).on(app.touchEvents.end, '.list-block li.swipeout', function (e) {
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                isTouched = false;
                isMoved = false;
                var timeDiff = (new Date()).getTime() - touchStartTime;
                if (!(translate === 0 || translate === -swipeOutActionsWidth)) app.allowSwipeOut = false;
                
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
                    app.openedSwipeOutEl = swipeOutEl;
                    swipeOutEl.trigger('open');
                    swipeOutEl.addClass('opened transitioning');
                    swipeOutContent.transform('translate3d(' + -swipeOutActionsWidth + 'px,0,0)');
                }
                else {
                    swipeOutEl.trigger('close');
                    app.openedSwipeOutEl = undefined;
                    swipeOutEl.addClass('transitioning').removeClass('opened');
                    swipeOutContent.transform('translate3d(' + 0 + 'px,0,0)');
                }
                swipeOutContent.transitionEnd(function () {
                    app.allowSwipeOut = true;
                    swipeOutEl.trigger(action === 'open' ? 'opened' : 'closed');
                });
            });
        };
        app.openSwipeOutList = function (el) {
            el = $(el);
            if (!el.hasClass('swipeout')) return;
            if (el.length === 0) return;
            if (el.length > 1) el = $(el[0]);
            el.trigger('open').addClass('transitioning opened');
            var swipeOutActions = el.find('.swipeout-actions-inner');
            el.find('.swipeout-content').transform('translate3d(-' + swipeOutActions.width() + 'px,0,0)').transitionEnd(function () {
                el.trigger('opened');
            });
            app.openedSwipeOutEl = el;
        };
        app.closeSwipeOutList = function (el) {
            el = $(el);
            if (el.length === 0) return;
            app.allowSwipeOut = false;
            el.trigger('close');
            el.removeClass('opened')
                .addClass('transitioning')
            .find('.swipeout-content')
                .transform('translate3d(' + 0 + 'px,0,0)')
                .transitionEnd(function () {
                    el.trigger('closed');
                    app.allowSwipeOut = true;
                });
        
            if (app.openedSwipeOutEl[0] === el[0]) app.openedSwipeOutEl = undefined;
        };
        app.deleteSwipeOutList = function (el) {
            el = $(el);
            if (el.length === 0) return;
            if (el.length > 1) el = $(el[0]);
            app.openedSwipeOutEl = undefined;
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
        ************   Handle clicks and make them fast (on tap);   ************
        ===============================================================================*/
        app.initClickEvents = function () {
            $(document).tap('a, .open-panel, .close-panel, .panel-overlay, .modal-overlay, .swipeout-delete, .close-popup, .open-popup, .open-popover', function (e) {
                var clicked = $(this);
                var url = clicked.attr('href');
                // External
                if (clicked.hasClass('external')) {
                    return;
                }
                // Open Panel
                if (clicked.hasClass('open-panel')) {
                    // e.preventDefault();
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
                    var oldTab = newTab.parent().find('.tab.active').removeClass('active');
                    newTab.addClass('active');
                    if (clicked.parent().hasClass('buttons-row')) {
                        clicked.parent().find('.active').removeClass('active');
                        clicked.addClass('active');
                    }
                }
                // Swipeout Delete
                if (clicked.hasClass('swipeout-delete')) {
                    if (clicked.attr('data-confirm')) {
                        var modal = app.confirm(clicked.attr('data-confirm'), function () {
                            app.deleteSwipeOutList(clicked.parents('.swipeout'));
                        });
                    }
                    else {
                        app.deleteSwipeOutList(clicked.parents('.swipeout'));
                    }
                        
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
                        view = clicked.parents('.view')[0] && clicked.parents('.view')[0].f7View;
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
            });
            //Disable clicks
            $(document).on('click', 'a', function (e) {
                if (!$(this).hasClass('external')) e.preventDefault();
            });
        };
        /*======================================================
        ************   App Resize Actions   ************
        ======================================================*/
        app.onResize = function () {
            app.sizeNavbars();
            // Something else could be here
        };
        /*=====================================================================================
        ************   Detect that app in fullscreen mode or chopped by statusbar  ************
        =====================================================================================*/
        app.detectStatusBar = function () {
            var width = $(window).width();
            var height = $(window).height();
            if (
                // iPhone 5
                (width === 320 && height === 568) ||
                (width === 568 && height === 320) ||
                // iPhone 4
                (width === 320 && height === 480) ||
                (width === 480 && height === 320) ||
                // iPad
                (width === 768 && height === 1024) ||
                (width === 1024 && height === 768)
            ) {
                $('body').addClass('with-statusbar-overlay');
            }
            else {
                $('body').removeClass('with-statusbar-overlay');
            }
        };
        /*======================================================
        ************   App Init   ************
        ======================================================*/
        app.init = function () {
            // Init Click events
            app.initClickEvents();
            app.initSwipeOutList();
            // Detect statusbar
            app.detectStatusBar();
            // Init each page callbacks
            $('.page').each(function () {
                app.initPage(this);
            });
            // App resize events
            $(window).on('resize', app.onResize);
            // App Init callback
            if (app.params.onAppInit) app.params.onAppInit();
        };
        app.init();
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
            for (var i = 0; i < this.length; i++) {
                var elStyle = this[i].style;
                elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration + 'ms';
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
        tap: function (targetSelector, listener) {
            var dom = this;
            var isTouched, isMoved, touchesStart = {}, touchStartTime, deltaX, deltaY;
            if (arguments.length === 1) {
                listener = arguments[0];
                targetSelector = false;
            }
            if ($.supportTouch) {
                dom.on('touchstart', targetSelector, function (e) {
                    isTouched = true;
                    isMoved = false;
                    // touchesStart.x = e.targetTouches[0].pageX;
                    // touchesStart.y = e.targetTouches[0].pageY;
                    // deltaX = deltaY = 0;
                    // touchStartTime = (new Date()).getTime();
                });
                dom.on('touchmove', targetSelector, function (e) {
                    if (!isTouched) return;
                    isMoved = true;
                    // deltaX = e.targetTouches[0].pageX - touchesStart.x;
                    // deltaY = e.targetTouches[0].pageY - touchesStart.y;
                });
                dom.on('touchend', targetSelector, function (e) {
                    // var timeDiff = (new Date()).getTime() - touchStartTime;
                    e.preventDefault(); // - to prevent Safari's Ghost click
                    if (isTouched && !isMoved) {
                        listener.call(this, e);
                    }
                    isTouched = isMoved = false;
                });
            }
            else {
                dom.on('click', targetSelector, listener);
            }
        },
        off: function (event, listener) {
            for (var i = 0; i < this.length; i++) {
                this[i].removeEventListener(event, listener, false);
            }
            return this;
        },
        trigger: function (eventName, eventData) {
            for (var i = 0; i < this.length; i++) {
                var e = new CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
                this[i].dispatchEvent(e);
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
        css: function (props) {
            if (typeof props === 'string') {
                if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
            }
            else {
                for (var i = 0; i < this.length; i++) {
                    for (var prop in props) {
                        this[i].style[prop] = props[prop];
                    }
                }
                return this;
            }
            
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
                return this[0].innerHTML;
            }
            else {
                for (var i = 0; i < this.length; i++) {
                    this[i].innerHTML = html;
                }
                return this;
            }
        },
        is: function (selector) {
            var compareWith;
            if (typeof selector === 'string') compareWith = document.querySelectorAll(selector);
            else if (selector.nodeType) compareWith = [selector];
            else compareWith = selector;
            var match = false;
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
                    this[i].innerHTML = newChild + this[i].innerHTML;
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
        parent: function () {
            var parents = [];
            for (var i = 0; i < this.length; i++) {
                parents.push(this[i].parentNode);
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
                this[i].parentNode.removeChild(this[i]);
            }
            return this;
        },
        
    };
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
    $.supportTouch = (function () {
        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
    })();
    $.fn = Dom7.prototype;
})();