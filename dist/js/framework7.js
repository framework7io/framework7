/*
 * Framework7 0.9.5
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
 * Released on: August 15, 2014
*/
(function () {

    'use strict';
    /*===========================
    Framework 7
    ===========================*/
    window.Framework7 = function (params) {
    
        // App
        var app = this;
    
        // Version
        app.version = '0.9.5';
    
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
            smartSelectBackTemplate: '<div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>{{backText}}</span></a></div>',
            smartSelectBackText: 'Back',
            smartSelectSearchbar: false,
            smartSelectBackOnSelect: false,
            // Searchbar
            searchbarHideDividers: true,
            searchbarHideGroups: true,
            // Panels
            swipePanel: false, // or 'left' or 'right'
            swipePanelActiveArea: 0,
            swipePanelCloseOpposite: true,
            swipePanelNoFollow: false,
            swipePanelThreshold: 0,
            panelsCloseByOutside: true,
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
    
        // DOM lib
        var $ = Dom7;
    
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
    
        // Overwrite statusbar overlay
        if (typeof app.params.statusbarOverlay !== 'undefined') {
            if (app.params.statusbarOverlay) $('html').addClass('with-statusbar-overlay');
            else $('html').removeClass('with-statusbar-overlay');
        }
    
        
    
        /*======================================================
        ************   Views   ************
        ======================================================*/
        app.views = [];
        var View = function (selector, params) {
            var defaults = {
                dynamicNavbar: false,
                domCache: false,
                linksView: undefined,
                swipeBackPage: app.params.swipeBackPage,
                swipeBackPageBoxShadow: app.params.swipeBackPageBoxShadow,
                swipeBackPageActiveArea: app.params.swipeBackPageActiveArea,
                swipeBackPageThreshold: app.params.swipeBackPageThreshold,
                animatePages: app.params.animatePages
            };
        
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            // View
            var view = this;
            view.params = params;
        
            // Selector
            view.selector = selector;
        
            // Container
            var container = $(selector);
            view.container = container[0];
            
            // Location
            var docLocation = document.location.href;
        
            // History
            view.history = [];
            var viewURL = docLocation;
            var pushStateSeparator = app.params.pushStateSeparator;
            var pushStateRoot = app.params.pushStateRoot;
            if (app.params.pushState) {
                if (pushStateRoot) {
                    viewURL = pushStateRoot;
                }
                else {
                    if (viewURL.indexOf(pushStateSeparator) >= 0 && viewURL.indexOf(pushStateSeparator + '#') < 0) viewURL = viewURL.split(pushStateSeparator)[0];
                }
                    
            }
            view.url = container.attr('data-url') || view.params.url || viewURL;
        
            // Store to history main view's url
            if (view.url) {
                view.history.push(view.url);
            }
        
            // Content cache
            view.contentCache = {};
        
            // Store View in element for easy access
            container[0].f7View = view;
        
            // Pages
            view.pagesContainer = container.find('.pages')[0];
        
            view.allowPageChange = true;
        
            // Active Page
            if (!view.activePage) {
                var currentPage = $(view.pagesContainer).find('.page-on-center');
                var currentPageData;
                if (currentPage.length === 0) {
                    currentPage = $(view.pagesContainer).find('.page');
                    currentPage = currentPage.eq(currentPage.length - 1);
                }
                if (currentPage.length > 0) {
                    currentPageData = currentPage[0].f7PageData;
                
                }
                if (currentPageData) {
                    currentPageData.view = view;
                    if (view.url) currentPageData.url = view.url;
                    view.activePage = currentPageData;
                    currentPage[0].f7PageData = currentPageData;
                }
            }
        
            // Is main
            view.main = container.hasClass(app.params.viewMainClass);
        
            // Touch events
            var isTouched = false,
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
                dynamicNavbar,
                el;
        
            view.handleTouchStart = function (e) {
                if (!allowViewTouchMove || !view.params.swipeBackPage || isTouched || app.swipeoutOpenedEl) return;
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();
                dynamicNavbar = view.params.dynamicNavbar && container.find('.navbar-inner').length > 1;
            };
        
            view.handleTouchMove = function (e) {
                if (!isTouched) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (isScrolling || e.f7PreventSwipeBack) {
                    isTouched = false;
                    return;
                }
                e.f7PreventPanelSwipe = true;
                if (!isMoved) {
                    var cancel = false;
                    // Calc values during first move fired
                    viewContainerWidth = container.width();
                    var target = $(e.target);
                    activePage = target.is('.page') ? target : target.parents('.page');
                    if (activePage.hasClass('no-swipeback')) cancel = true;
                    previousPage = container.find('.page-on-left:not(.cached)');
                    var notFromBorder = touchesStart.x - container.offset().left > view.params.swipeBackPageActiveArea;
                    if (app.rtl) {
                        notFromBorder = touchesStart.x < container.offset().left - container[0].scrollLeft + viewContainerWidth - view.params.swipeBackPageActiveArea;
                    }
                    else {
                        notFromBorder = touchesStart.x - container.offset().left > view.params.swipeBackPageActiveArea;
                    }
                    if (notFromBorder) cancel = true;
                    if (previousPage.length === 0 || activePage.length === 0) cancel = true;
                    if (cancel) {
                        isTouched = false;
                        return;
                    }
                    if (dynamicNavbar) {
                        activeNavbar = container.find('.navbar-on-center:not(.cached)');
                        previousNavbar = container.find('.navbar-on-left:not(.cached)');
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
        
                // RTL inverter
                var inverter = app.rtl ? -1 : 1;
        
                // Touches diff
                touchesDiff = (pageX - touchesStart.x - view.params.swipeBackPageThreshold) * inverter;
                if (touchesDiff < 0) touchesDiff = 0;
                var percentage = touchesDiff / viewContainerWidth;
        
                // Swipe Back Callback
                var callbackData = {
                    percentage: percentage,
                    activePage: activePage[0],
                    previousPage: previousPage[0],
                    activeNavbar: activeNavbar[0],
                    previousNavbar: previousNavbar[0]
                };
                if (view.params.onSwipeBackMove) {
                    view.params.onSwipeBackMove(callbackData);
                }
                container.trigger('swipebackmove', callbackData);
        
                // Transform pages
                var activePageTranslate = touchesDiff * inverter;
                var previousPageTranslate = (touchesDiff / 5 - viewContainerWidth / 5) * inverter;
                if (app.device.pixelRatio === 1) {
                    activePageTranslate = Math.round(activePageTranslate);
                    previousPageTranslate = Math.round(previousPageTranslate);
                }
        
                activePage.transform('translate3d(' + activePageTranslate + 'px,0,0)');
                if (view.params.swipeBackPageBoxShadow && app.device.os !== 'android') activePage[0].style.boxShadow = '0px 0px 12px rgba(0,0,0,' + (0.5 - 0.5 * percentage) + ')';
        
                previousPage.transform('translate3d(' + previousPageTranslate + 'px,0,0)');
                previousPage[0].style.opacity = 0.9 + 0.1 * percentage;
        
                // Dynamic Navbars Animation
                if (dynamicNavbar) {
                    var i;
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
            };
        
            view.handleTouchEnd = function (e) {
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
                view.allowPageChange = false;
        
                if (pageChanged) {
                    // Update View's URL
                    var url = view.history[view.history.length - 2];
                    view.url = url;
                    
                    // Page before animation callback
                    app.pageAnimCallbacks('before', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage, swipeBack: true});
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
                    view.allowPageChange = true;
                    if (pageChanged) {
                        if (app.params.pushState) history.back();
                        // Page after animation callback
                        app.pageAnimCallbacks('after', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage, swipeBack: true});
                        app.afterGoBack(view, activePage, previousPage);
                    }
                });
            };
            view.attachEvents = function (detach) {
                var action = detach ? 'off' : 'on';
                container[action](app.touchEvents.start, view.handleTouchStart);
                container[action](app.touchEvents.move, view.handleTouchMove);
                container[action](app.touchEvents.end, view.handleTouchEnd);
            };
            view.detachEvents = function () {
                view.attachEvents(true);
            };
        
            // Init
            if (view.params.swipeBackPage) {
                view.attachEvents();
            }
        
            // Add view to app
            app.views.push(view);
            if (view.main) app.mainView = view;
        
            // Load methods
            view.loadPage = function (url, animatePages) {
                return app.loadPage(view, url, animatePages);
            };
            view.loadContent = function (content, animatePages) {
                return app.loadContent(view, content, animatePages);
            };
            view.goBack = function (url, animatePages) {
                return app.goBack(view, url, animatePages);
            };
        
            // Bars methods
            view.hideNavbar = function () {
                return app.hideNavbar(container);
            };
            view.showNavbar = function () {
                return app.showNavbar(container);
            };
            view.hideToolbar = function () {
                return app.hideToolbar(container);
            };
            view.showToolbar = function () {
                return app.showToolbar(container);
            };
        
            // Push State on load
            if (app.params.pushState && view.main) {
                var pushStateUrl;
                if (pushStateRoot) {
                    pushStateUrl = docLocation.split(app.params.pushStateRoot + pushStateSeparator)[1];
                }
        
                else if (docLocation.indexOf(pushStateSeparator) >= 0 && docLocation.indexOf(pushStateSeparator + '#') < 0) {
                    pushStateUrl = docLocation.split(pushStateSeparator)[1];
                }
                var pushStateAnimatePages;
                if (app.params.pushStateNoAnimation === true) pushStateAnimatePages = false;
                if (pushStateUrl) {
                    app.loadPage(view, pushStateUrl, pushStateAnimatePages, false);
                }
                    
            }
        
            // Destroy
            view.destroy = function () {
                view.detachEvents();
                view = undefined;
            };
        
            // Plugin hook
            app.pluginHook('addView', view);
            
            // Return view
            return view;
        };
        
        app.addView = function (selector, params) {
            return new View(selector, params);
        };
        /*======================================================
        ************   Navbars && Toolbars   ************
        ======================================================*/
        // On Navbar Init Callback
        app.navbarInitCallback = function (view, pageContainer, navbar, navbarInnerContainer, url, position) {
            var _navbar = {
                container: navbar,
                innerContainer: navbarInnerContainer
            };
            var _page = {
                url: url,
                query: $.parseUrlQuery(url || ''),
                container: pageContainer,
                name: $(pageContainer).attr('data-page'),
                view: view,
                from: position
            };
            var eventData = {
                navbar: _navbar,
                page: _page
            };
        
            // Plugin hook
            app.pluginHook('navbarInit', _navbar, _page);
            
            // Navbar Init Callback
            $(navbarInnerContainer).trigger('navbarInit', eventData);
        };
        app.sizeNavbars = function (viewContainer) {
            var navbarInner = viewContainer ? $(viewContainer).find('.navbar .navbar-inner:not(.cached)') : $('.navbar .navbar-inner:not(.cached)');
            navbarInner.each(function () {
                var tt = $(this),
                    left = app.rtl ? tt.find('.right') : tt.find('.left'),
                    right = app.rtl ? tt.find('.left') : tt.find('.right'),
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
                // RTL inverter
                var inverter = app.rtl ? -1 : 1;
                
                // Center left
                var centerLeft = diff;
                if (app.rtl && noLeft && noRight && center.length > 0) centerLeft = -centerLeft;
                center.css({left: centerLeft + 'px'});
        
                if (center.hasClass('sliding')) {
                    center[0].f7NavbarLeftOffset = -(currLeft + diff) * inverter;
                    center[0].f7NavbarRightOffset = (navbarWidth - currLeft - diff - centerWidth) * inverter;
                    if (onLeft) center.transform('translate3d(' + center[0].f7NavbarLeftOffset + 'px, 0, 0)');
                }
                if (!noLeft && left.hasClass('sliding')) {
                    if (app.rtl) {
                        left[0].f7NavbarLeftOffset = -(navbarWidth - left.outerWidth()) / 2 * inverter;
                        left[0].f7NavbarRightOffset = leftWidth * inverter;
                    }
                    else {
                        left[0].f7NavbarLeftOffset = -leftWidth;
                        left[0].f7NavbarRightOffset = (navbarWidth - left.outerWidth()) / 2;
                    }
                    if (onLeft) left.transform('translate3d(' + left[0].f7NavbarLeftOffset + 'px, 0, 0)');
                }
                if (!noRight && right.hasClass('sliding')) {
                    if (app.rtl) {
                        right[0].f7NavbarLeftOffset = -rightWidth * inverter;
                        right[0].f7NavbarRightOffset = (navbarWidth - right.outerWidth()) / 2 * inverter;
                    }
                    else {
                        right[0].f7NavbarLeftOffset = -(navbarWidth - right.outerWidth()) / 2;
                        right[0].f7NavbarRightOffset = rightWidth;
                    }
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
        ************   Searchbar   ************
        ======================================================*/
        app.initSearchbar = function (pageContainer) {
            pageContainer = $(pageContainer);
            var searchbar = pageContainer.hasClass('searchbar') ? pageContainer : pageContainer.find('.searchbar');
            if (searchbar.length === 0) return;
            if (!pageContainer.hasClass('page')) pageContainer = searchbar.parents('.page').eq(0);
            var searchbarOverlay = pageContainer.hasClass('page') ? pageContainer.find('.searchbar-overlay') : $('.searchbar-overlay');
            var input = searchbar.find('input[type="search"]');
            var clear = searchbar.find('.searchbar-clear');
            var cancel = searchbar.find('.searchbar-cancel');
            var searchList = $(searchbar.attr('data-search-list'));
            var searchIn = searchbar.attr('data-search-in');
            var searchBy = searchbar.attr('data-search-by');
            var found = searchbar.attr('data-searchbar-found');
            if (!found) {
                found = pageContainer.find('.searchbar-found');
                if (found.length === 0) found = $('.searchbar-found');
            }
            else {
                found = $(found);
            }
            var notFound = searchbar.attr('data-searchbar-not-found');
            if (!notFound) {
                notFound = pageContainer.find('.searchbar-not-found');
                if (notFound.length === 0) notFound = $('.searchbar-not-found');
            }
            else {
                notFound = $(notFound);
            }
        
            // Cancel button
            var cancelWidth, cancelMarginProp = app.rtl ? 'margin-left' : 'margin-right';
            if (cancel.length > 0) {
                cancelWidth = cancel.width();
        
                cancel.css(cancelMarginProp, - cancelWidth + 'px');
            }
        
            // Handlers
            function disableSearchbar() {
                input.val('').trigger('change');
                searchbar.removeClass('searchbar-active searchbar-not-empty');
                if (cancel.length > 0) cancel.css(cancelMarginProp, - cancelWidth + 'px');
                
                if (searchList) searchbarOverlay.removeClass('searchbar-overlay-active');
                if (app.device.ios) {
                    setTimeout(function () {
                        input.blur();
                    }, 400);
                }
                else {
                    input.blur();
                }
            }
        
            // Activate
            function enableSearchbar() {
                if (app.device.ios) {
                    setTimeout(function () {
                        if (searchList && !searchbar.hasClass('searchbar-active')) searchbarOverlay.addClass('searchbar-overlay-active');
                        searchbar.addClass('searchbar-active');
                        if (cancel.length > 0) cancel.css(cancelMarginProp, '0px');
                        searchList.trigger('enableSearch');
        
                    }, 400);
                }
                else {
                    if (searchList && !searchbar.hasClass('searchbar-active')) searchbarOverlay.addClass('searchbar-overlay-active');
                    searchbar.addClass('searchbar-active');
                    if (cancel.length > 0) cancel.css(cancelMarginProp, '0px');
                    searchList.trigger('disableSearch');
                }
            }
        
            // Clear
            function clearSearchbar() {
                input.val('').trigger('change');
                searchList.trigger('clearSearch');
            }
        
            // Change
            function searchValue() {
                setTimeout(function () {
                    var value = input.val().trim();
                    if (value.length === 0) {
                        searchbar.removeClass('searchbar-not-empty');
                        if (searchList && searchbar.hasClass('searchbar-active')) searchbarOverlay.addClass('searchbar-overlay-active');
                    }
                    else {
                        searchbar.addClass('searchbar-not-empty');
                        if (searchList && searchbar.hasClass('searchbar-active')) searchbarOverlay.removeClass('searchbar-overlay-active');
                    }
                    if (searchList.length > 0 && searchIn) search(value);
                }, 0);
            }
        
            //Prevent submit
            function preventSubmit(e) {
                e.preventDefault();
            }
        
            function attachEvents(destroy) {
                var method = destroy ? 'off' : 'on';
                searchbar[method]('submit', preventSubmit);
                cancel[method]('click', disableSearchbar);
                searchbarOverlay[method]('click', disableSearchbar);
                input[method]('focus', enableSearchbar);
                input[method]('change keydown keypress keyup', searchValue);
                clear[method]('click', clearSearchbar);
            }
            function detachEvents() {
                attachEvents(true);
            }
            searchbar[0].f7DestroySearchbar = detachEvents;
        
            // Attach events
            attachEvents();
        
            // Search
            function search(query) {
                var values = query.trim().toLowerCase().split(' ');
                searchList.find('li').removeClass('hidden-by-searchbar');
                var foundItems = [];
                searchList.find('li').each(function (index, el) {
                    el = $(el);
                    var compareWithEl = el.find(searchIn);
                    if (compareWithEl.length === 0) return;
                    var compareWith;
                    compareWith = compareWithEl.text().trim().toLowerCase();
                    var wordsMatch = 0;
                    for (var i = 0; i < values.length; i++) {
                        if (compareWith.indexOf(values[i]) >= 0) wordsMatch++;
                    }
                    if (wordsMatch !== values.length) {
                        el.addClass('hidden-by-searchbar');
                    }
                    else {
                        foundItems.push(el[0]);
                    }
                });
        
                if (app.params.searchbarHideDividers) {
                    searchList.find('.item-divider, .list-group-title').each(function () {
                        var title = $(this);
                        var nextElements = title.nextAll('li');
                        var hide = true;
                        for (var i = 0; i < nextElements.length; i++) {
                            var nextEl = $(nextElements[i]);
                            if (nextEl.hasClass('list-group-title') || nextEl.hasClass('item-divider')) break;
                            if (!nextEl.hasClass('hidden-by-searchbar')) {
                                hide = false;
                            }
                        }
                        if (hide) title.addClass('hidden-by-searchbar');
                        else title.removeClass('hidden-by-searchbar');
                    });
                }
                if (app.params.searchbarHideGroups) {
                    searchList.find('.list-group').each(function () {
                        var group = $(this);
                        var notHidden = group.find('li:not(.hidden-by-searchbar)');
                        if (notHidden.length === 0) {
                            group.addClass('hidden-by-searchbar');
                        }
                        else {
                            group.removeClass('hidden-by-searchbar');
                        }
                    });
                }
        
                searchList.trigger('search', {query: query, foundItems: foundItems});
        
                if (foundItems.length === 0) {
                    notFound.show();
                    found.hide();
                }
                else {
                    notFound.hide();
                    found.show();
                }
            }
        
            // Destroy on page remove
            function pageBeforeRemove() {
                detachEvents();
                pageContainer.off('pageBeforeRemove', pageBeforeRemove);
            }
            if (pageContainer.hasClass('page')) {
                pageContainer.on('pageBeforeRemove', pageBeforeRemove);
            }
                
        };
        app.destroySearchbar = function (pageContainer) {
            pageContainer = $(pageContainer);
            var searchbar = pageContainer.hasClass('searchbar') ? pageContainer : pageContainer.find('.searchbar');
            if (searchbar.length === 0) return;
            if (searchbar[0].f7DestroySearchbar) searchbar[0].f7DestroySearchbar();
        };
        
        /*======================================================
        ************   Messagebar   ************
        ======================================================*/
        app.initMessagebar = function (pageContainer) {
            pageContainer = $(pageContainer);
            var messagebar = pageContainer.hasClass('messagebar') ? pageContainer : pageContainer.find('.messagebar');
            if (messagebar.length === 0) return;
            var textarea = messagebar.find('textarea');
            var pageContent = messagebar.parents('.page').find('.page-content');
            var initialBarHeight = messagebar[0].offsetHeight;
            var initialAreaHeight = textarea[0].offsetHeight;
        
            //Prevent submit
            function preventSubmit(e) {
                e.preventDefault();
            }
        
            // Resize textarea
            function sizeTextarea() {
                
                // Reset
                textarea.css({'height': ''});
                
                var height = textarea[0].offsetHeight;
                var diff = height - textarea[0].clientHeight;
                var scrollHeight = textarea[0].scrollHeight;
                // Update
                if (scrollHeight + diff > height) {
                    var newAreaHeight = scrollHeight + diff;
                    var newBarHeight = initialBarHeight + (newAreaHeight - initialAreaHeight);
                    var maxBarHeight = messagebar.attr('data-max-height') || messagebar.parents('.view')[0].offsetHeight - 88;
                    if (newBarHeight > maxBarHeight) {
                        newBarHeight = maxBarHeight;
                        newAreaHeight = newBarHeight - initialBarHeight + initialAreaHeight;
                    }
                    textarea.css('height', newAreaHeight + 'px');
                    messagebar.css('height', newBarHeight + 'px');
                    if (pageContent.length > 0) {
                        pageContent.css('padding-bottom', newBarHeight + 'px');
                        pageContent.scrollTop(pageContent[0].scrollHeight - pageContent[0].offsetHeight);
                    }
                }
                else {
                    if (pageContent.length > 0) {
                        messagebar.css({'height': ''});
                        pageContent.css({'padding-bottom': ''});
                    }
                }
            }
            var to;
            function handleKey(e) {
                clearTimeout(to);
                to = setTimeout(function () {
                    sizeTextarea();
                }, 0);
                    
            }
        
            function attachEvents(destroy) {
                var method = destroy ? 'off' : 'on';
                messagebar[method]('submit', preventSubmit);
                textarea[method]('change keydown keypress keyup paste cut', handleKey);
            }
            function detachEvents() {
                attachEvents(true);
            }
            
            messagebar[0].f7DestroyMessagebar = detachEvents;
        
            // Attach events
            attachEvents();
        
            // Destroy on page remove
            function pageBeforeRemove() {
                detachEvents();
                pageContainer.off('pageBeforeRemove', pageBeforeRemove);
            }
            if (pageContainer.hasClass('page')) {
                pageContainer.on('pageBeforeRemove', pageBeforeRemove);
            }
        };
        app.destroyMessagebar = function (pageContainer) {
            pageContainer = $(pageContainer);
            var messagebar = pageContainer.hasClass('messagebar') ? pageContainer : pageContainer.find('.messagebar');
            if (messagebar.length === 0) return;
            if (messagebar[0].f7DestroyMessagebar) messagebar[0].f7DestroyMessagebar();
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
        app.get = function (url, view, callback) {
            // should we ignore get params or not
            var _url = url;
            if (app.params.cacheIgnoreGetParameters && url.indexOf('?') >= 0) {
                _url = url.split('?')[0];
            }
            if (app.params.cache && url.indexOf('nocache') < 0 && app.params.cacheIgnore.indexOf(_url) < 0) {
                // Check is the url cached
                for (var i = 0; i < app.cache.length; i++) {
                    if (app.cache[i].url === _url) {
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
                            app.removeFromCache(_url);
                            app.cache.push({
                                url: _url,
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
            if (view) view.xhr = app.xhr;
        
            return app.xhr;
        };
        
        /*======================================================
        ************   Pages   ************
        ======================================================*/
        // Page Callbacks API
        app.pageCallbacks = {};
        
        app.onPage = function (callbackName, pageName, callback) {
            if (pageName && pageName.split(' ').length > 1) {
                var pageNames = pageName.split(' ');
                var returnCallbacks = [];
                for (var i = 0; i < pageNames.length; i++) {
                    returnCallbacks.push(app.onPage(callbackName, pageNames[i], callback));
                }
                returnCallbacks.remove = function () {
                    for (var i = 0; i < returnCallbacks.length; i++) {
                        returnCallbacks[i].remove();
                    }
                };
                returnCallbacks.trigger = function () {
                    for (var i = 0; i < returnCallbacks.length; i++) {
                        returnCallbacks[i].trigger();
                    }
                };
                return returnCallbacks;
            }
            var callbacks = app.pageCallbacks[callbackName][pageName];
            if (!callbacks) {
                callbacks = app.pageCallbacks[callbackName][pageName] = [];
            }
            app.pageCallbacks[callbackName][pageName].push(callback);
            return {
                remove: function () {
                    var removeIndex;
                    for (var i = 0; i < callbacks.length; i++) {
                        if (callbacks[i].toString() === callback.toString()) {
                            removeIndex = i;
                        }
                    }
                    if (typeof removeIndex !== 'undefined') callbacks.splice(removeIndex, 1);
                },
                trigger: callback
            };
        };
        
        //Create callbacks methods dynamically
        function createPageCallback(callbackName) {
            var capitalized = callbackName.replace(/^./, function (match) {
                return match.toUpperCase();
            });
            app['onPage' + capitalized] = function (pageName, callback) {
                return app.onPage(callbackName, pageName, callback);
            };
        }
        
        var pageCallbacksNames = ('beforeInit init beforeAnimation afterAnimation beforeRemove').split(' ');
        for (var i = 0; i < pageCallbacksNames.length; i++) {
            app.pageCallbacks[pageCallbacksNames[i]] = {};
            createPageCallback(pageCallbacksNames[i]);
        }
        
        app.triggerPageCallbacks = function (callbackName, pageName, pageData) {
            var allPagesCallbacks = app.pageCallbacks[callbackName]['*'];
            if (allPagesCallbacks) {
                for (var j = 0; j < allPagesCallbacks.length; j++) {
                    allPagesCallbacks[j](pageData);
                }
            }
            var callbacks = app.pageCallbacks[callbackName][pageName];
            if (!callbacks || callbacks.length === 0) return;
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i](pageData);
            }
        };
        
        // On Page Init Callback
        app.pageInitCallback = function (view, pageContainer, url, position, navbarInnerContainer) {
            if (pageContainer.f7PageInitialized) return;
            pageContainer.f7PageInitialized = true;
            // Page Data
            var pageData = {
                container: pageContainer,
                url: url,
                query: $.parseUrlQuery(url || ''),
                name: $(pageContainer).attr('data-page'),
                view: view,
                from: position,
                navbarInnerContainer: navbarInnerContainer
            };
        
            // Store pagedata in page
            pageContainer.f7PageData = pageData;
        
            // Update View's activePage
            if (view) view.activePage = pageData;
        
            // Before Init Callbacks
            app.pluginHook('pageBeforeInit', pageData);
            if (app.params.onPageBeforeInit) app.params.onPageBeforeInit(app, pageData);
            app.triggerPageCallbacks('beforeInit', pageData.name, pageData);
            $(pageData.container).trigger('pageBeforeInit', {page: pageData});
        
            // Init page
            app.initPage(pageContainer);
        
            // Init Callback
            app.pluginHook('pageInit', pageData);
            if (app.params.onPageInit) app.params.onPageInit(app, pageData);
            app.triggerPageCallbacks('init', pageData.name, pageData);
            $(pageData.container).trigger('pageInit', {page: pageData});
        };
        app.pageRemoveCallback = function (view, pageContainer, position) {
            // Page Data
            var pageData = {
                container: pageContainer,
                name: $(pageContainer).attr('data-page'),
                view: view,
                from: position
            };
            // Before Init Callback
            app.pluginHook('pageBeforeRemove', pageData);
            if (app.params.onPageBeforeRemove) app.params.onPageBeforeRemove(app, pageData);
            app.triggerPageCallbacks('beforeRemove', pageData.name, pageData);
            $(pageData.container).trigger('pageBeforeRemove', {page: pageData});
        };
        app.pageAnimCallbacks = function (callback, view, params) {
            // Page Data
            var pageData = {
                container: params.pageContainer,
                url: params.url,
                query: $.parseUrlQuery(params.url || ''),
                name: $(params.pageContainer).attr('data-page'),
                view: view,
                from: params.position,
                swipeBack: params.swipeBack
            };
            var oldPage = params.oldPage,
                newPage = params.newPage;
        
            // Update page date
            params.pageContainer.f7PageData = pageData;
        
            if (callback === 'after') {
                app.pluginHook('pageAfterAnimation', pageData);
                if (app.params.onPageAfterAnimation) app.params.onPageAfterAnimation(app, pageData);
                app.triggerPageCallbacks('afterAnimation', pageData.name, pageData);
                $(pageData.container).trigger('pageAfterAnimation', {page: pageData});
        
            }
            if (callback === 'before') {
                // Add data-page on view
                $(view.container).attr('data-page', pageData.name);
        
                // Update View's activePage
                if (view) view.activePage = pageData;
        
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
                app.pluginHook('pageBeforeAnimation', pageData);
                if (app.params.onPageBeforeAnimation) app.params.onPageBeforeAnimation(app, pageData);
                app.triggerPageCallbacks('beforeAnimation', pageData.name, pageData);
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
            // Init slider
            if (app.initSlider) app.initSlider(pageContainer);
            // Init pull to refres
            if (app.initPullToRefresh) app.initPullToRefresh(pageContainer);
            // Init infinite scroll
            if (app.initInfiniteScroll) app.initInfiniteScroll(pageContainer);
            // Init searchbar
            if (app.initSearchbar) app.initSearchbar(pageContainer);
            // Init message bar
            if (app.initMessagebar) app.initMessagebar(pageContainer);
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
        function _load(view, url, content, animatePages) {
            var viewContainer = $(view.container), pagesContainer = $(view.pagesContainer),
                newPage, oldPage, pagesInView, i, oldNavbarInner, newNavbarInner, navbar, dynamicNavbar;
        
            if (typeof animatePages === 'undefined') animatePages = view.params.animatePages;
        
            // Plugin hook
            app.pluginHook('loadPage', view, url, content);
        
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
        
            // Find new page
            newPage = _findElement('.page', app._tempDomElement, view);
        
            // If page not found exit
            if (!newPage) {
                view.allowPageChange = true;
                return;
            }
        
            newPage.addClass('page-on-right');
        
            // Find old page (should be the last one) and remove older pages
            pagesInView = pagesContainer.children('.page:not(.cached)');
            if (pagesInView.length > 1) {
                for (i = 0; i < pagesInView.length - 2; i++) {
                    if (!view.params.domCache) {
                        app.pageRemoveCallback(view, pagesInView[i], 'left');
                        $(pagesInView[i]).remove();
                    }
                    else {
                        $(pagesInView[i]).addClass('cached');
                    }
                }
                if (!view.params.domCache) {
                    app.pageRemoveCallback(view, pagesInView[i], 'left');
                    $(pagesInView[i]).remove();
                }
                else {
                    $(pagesInView[i]).addClass('cached');
                }
            }
        
            oldPage = pagesContainer.children('.page:not(.cached)');
        
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
            pagesContainer.append(newPage[0]);
        
            // Page Init Events
            app.pageInitCallback(view, newPage[0], url, 'right', dynamicNavbar ? newNavbarInner[0] : undefined);
        
            // Navbar init event
            if (dynamicNavbar) {
                app.navbarInitCallback(view, newPage[0], navbar[0], newNavbarInner[0], url, 'right');
            }
        
            if (dynamicNavbar && animatePages) {
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
            app.pageAnimCallbacks('before', view, {pageContainer: newPage[0], url: url, position: 'right', oldPage: oldPage, newPage: newPage});
        
            function afterAnimation() {
                view.allowPageChange = true;
                newPage.removeClass('page-from-right-to-center page-on-right').addClass('page-on-center');
                oldPage.removeClass('page-from-center-to-left page-on-center').addClass('page-on-left');
                if (dynamicNavbar) {
                    newNavbarInner.removeClass('navbar-from-right-to-center navbar-on-right').addClass('navbar-on-center');
                    oldNavbarInner.removeClass('navbar-from-center-to-left navbar-on-center').addClass('navbar-on-left');
                }
                app.pageAnimCallbacks('after', view, {pageContainer: newPage[0], url: url, position: 'right', oldPage: oldPage, newPage: newPage});
                if (app.params.pushState) app.pushStateClearQueue();
            }
        
            if (animatePages) {
                // Set pages before animation
                _animatePages(oldPage, newPage, 'to-left', view);
        
                // Dynamic navbar animation
                if (dynamicNavbar) {
                    setTimeout(function () {
                        _animateNavbars(oldNavbarInner, newNavbarInner, 'to-left', view);
                    }, 0);
        
                }
                newPage.animationEnd(function (e) {
                    afterAnimation();
                });
            }
            else {
                afterAnimation();
            }
        }
        function preprocess(content, url, next) {
            //Modified by Greg Keys, added callback
            
            // Plugin hook
            app.pluginHook('preprocess', content, url, next);
            
            // Preprocess by plugin
            content = app.pluginProcess('preprocess', content);
        
            if (app.params.preprocess) {
                content = app.params.preprocess(content, url, next);
                //this should handle backwards compatibility
                //@NOTE if using loadPage from within preprocess it may be necessary to set myApp.allowPageChange = true;
                if (typeof content !== 'undefined') {
                    next(content);
                }
            } else {//we need to call the callback function if there is no preprocessing
                next(content);
            }
        }
        app.loadContent = function (view, content, animatePages, pushState) {
            if (!view.allowPageChange) return false;
            view.allowPageChange = false;
            if (app.xhr && view.xhr && view.xhr === app.xhr) {
                app.xhr.abort();
                app.xhr = false;
            }
            if (app.params.pushState)  {
                if (typeof pushState === 'undefined') pushState = true;
                var pushStateRoot = app.params.pushStateRoot || '';
                if (pushState) history.pushState({content: content, url: '#content-' + view.history.length}, '', pushStateRoot + app.params.pushStateSeparator + '#content-' + view.history.length);
            }
            preprocess(content, null, function (content) {
                _load(view, null, content, animatePages);
            });
        };
        app.loadPage = function (view, url, animatePages, pushState) {
            if (!view.allowPageChange) return false;
            if (view.url === url) return false;
            view.allowPageChange = false;
            if (app.xhr && view.xhr && view.xhr === app.xhr) {
                app.xhr.abort();
                app.xhr = false;
            }
            app.get(url, view, function (data, error) {
                if (error) {
                    view.allowPageChange = true;
                    return;
                }
                if (app.params.pushState)  {
                    if (typeof pushState === 'undefined') pushState = true;
                    var pushStateRoot = app.params.pushStateRoot || '';
                    if (pushState) history.pushState({url: url}, '', pushStateRoot + app.params.pushStateSeparator + url);
                }
                
                preprocess(data, url, function (data) {
                    _load(view, url, data, animatePages);
                });
            });
        };
        app.goBack = function (view, url, animatePages, preloadOnly, pushState) {
            if (!view.allowPageChange) return false;
        
            view.allowPageChange = false;
            if (app.xhr && view.xhr && view.xhr === app.xhr) {
                app.xhr.abort();
                app.xhr = false;
            }
            app.pluginHook('goBack', view, url, preloadOnly);
        
            if (app.params.pushState)  {
                if (typeof pushState === 'undefined') pushState = true;
                if (!preloadOnly && history.state && pushState) {
                    history.back();
                }
            }
        
            var viewContainer = $(view.container),
                pagesContainer = $(view.pagesContainer),
                pagesInView = pagesContainer.children('.page'),
                oldPage, newPage, oldNavbarInner, newNavbarInner, navbar, dynamicNavbar;
        
            if (typeof animatePages === 'undefined') animatePages = view.params.animatePages;
        
            function _animate() {
                // Page before animation callback
                app.pageAnimCallbacks('before', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});
        
                function afterAnimation() {
                    app.afterGoBack(view, oldPage[0], newPage[0]);
                    app.pageAnimCallbacks('after', view, {pageContainer: newPage[0], url: url, position: 'left', oldPage: oldPage, newPage: newPage});
                }
        
                if (animatePages) {
                    // Set pages before animation
                    _animatePages(newPage, oldPage, 'to-right', view);
        
                    // Dynamic navbar animation
                    if (dynamicNavbar) {
                        setTimeout(function () {
                            _animateNavbars(newNavbarInner, oldNavbarInner, 'to-right', view);
                        }, 0);
                    }
                    
                    newPage.animationEnd(function () {
                        afterAnimation();
                    });
                }
                else {
                    newNavbarInner.find('.sliding, .sliding .back .icon').transform('');
                    afterAnimation();
                }
            }
            function _preload() {
                newPage = _findElement('.page', app._tempDomElement, view);
        
                // If pages not found or there are still more than one, exit
                if (!newPage) {
                    view.allowPageChange = true;
                    return;
                }
                newPage.addClass('page-on-left');
        
                // Find old page (should be the only one)
                oldPage = $(pagesInView[0]);
        
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
                pagesContainer.prepend(newPage[0]);
        
                // Page Init Events
                app.pageInitCallback(view, newPage[0], url, 'left', dynamicNavbar ? newNavbarInner[0] : undefined);
        
                // Navbar init event
                if (dynamicNavbar) {
                    app.navbarInitCallback(view, newPage[0], navbar[0], newNavbarInner[0], url, 'right');
                }
        
                if (dynamicNavbar && newNavbarInner.hasClass('navbar-on-left') && animatePages) {
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
                    view.allowPageChange = true;
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
                    view.allowPageChange = true;
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
                    view.allowPageChange = true;
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
        
                app.get(url, view, function (data, error) {
                    if (error) {
                        view.allowPageChange = true;
                        return;
                    }
                    preprocess(data, null, function (data) {
                        app._tempDomElement.innerHTML = data;
                        _preload();
                    });
                });
            }
        };
        app.afterGoBack = function (view, oldPage, newPage) {
            // Remove old page and set classes on new one
            oldPage = $(oldPage);
            newPage = $(newPage);
            app.pageRemoveCallback(view, oldPage[0], 'right');
            oldPage.remove();
            newPage.removeClass('page-from-left-to-center page-on-left').addClass('page-on-center');
            view.allowPageChange = true;
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
            var previousURL = view.history.pop();
            
            // Check previous page is content based only and remove it from content cache
            if (!view.params.domCache && previousURL && previousURL.indexOf('#content-') > -1 && (previousURL in view.contentCache)) {
                view.contentCache[previousURL] = null;
                delete view.contentCache[previousURL];
            }
            
            if (app.params.pushState) app.pushStateClearQueue();
        
            // Preload previous page
            if (app.params.preloadPreviousPage) {
                if (view.params.domCache) {
                    var cachedPages = $(view.container).find('.page.cached');
                    $(cachedPages[cachedPages.length - 1]).removeClass('cached');
                }
                app.goBack(view, false, undefined, true);
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
                }],
                onClick: function(index){}
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
                    if (params.onClick) params.onClick(modal, index);
                });
            });
            app.openModal(modal);
            return modal[0];
        };
        app.alert = function (text, title, callbackOk) {
            if (typeof title === 'function') {
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                buttons: [ {text: app.params.modalButtonOk, bold: true, onClick: callbackOk} ]
            });
        };
        app.confirm = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                buttons: [
                    {text: app.params.modalButtonCancel, onClick: callbackCancel},
                    {text: app.params.modalButtonOk, bold: true, onClick: callbackOk}
                ]
            });
        };
        app.prompt = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                afterText: '<input type="text" class="modal-text-input">',
                buttons: [
                    {
                        text: app.params.modalButtonCancel,
                    },
                    {
                        text: app.params.modalButtonOk,
                        bold: true,
                    }
                ],
                onClick: function (modal, index) {
                    if (index === 0 && callbackCancel) callbackCancel($(modal).find('.modal-text-input').val());
                    if (index === 1 && callbackOk) callbackOk($(modal).find('.modal-text-input').val());
                }
            });
        };
        app.modalLogin = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                afterText: '<input type="text" name="modal-username" placeholder="' + app.params.modalUsernamePlaceholder + '" class="modal-text-input modal-text-input-double"><input type="password" name="modal-password" placeholder="' + app.params.modalPasswordPlaceholder + '" class="modal-text-input modal-text-input-double">',
                buttons: [
                    {
                        text: app.params.modalButtonCancel,
                    },
                    {
                        text: app.params.modalButtonOk,
                        bold: true,
                    }
                ],
                onClick: function (modal, index) {
                    var username = $(modal).find('.modal-text-input[name="modal-username"]').val();
                    var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
                    if (index === 0 && callbackCancel) callbackCancel(username, password);
                    if (index === 1 && callbackOk) callbackOk(username, password);
                }
            });
        };
        app.modalPassword = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                afterText: '<input type="password" name="modal-password" placeholder="' + app.params.modalPasswordPlaceholder + '" class="modal-text-input">',
                buttons: [
                    {
                        text: app.params.modalButtonCancel,
                    },
                    {
                        text: app.params.modalButtonOk,
                        bold: true,
                    }
                ],
                onClick: function (modal, index) {
                    var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
                    if (index === 0 && callbackCancel) callbackCancel(password);
                    if (index === 1 && callbackOk) callbackOk(password);
                }
            });
        };
        app.showPreloader = function (title) {
            return app.modal({
                title: title || app.params.modalPreloaderTitle,
                text: '<div class="preloader"></div>'
            });
        };
        app.hidePreloader = function () {
            app.closeModal('.modal.modal-in');
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
                    if (button.color) buttonClass += ' color-' + button.color;
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
                _modal.innerHTML = $.trim(modal);
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
            
            if (modal.find('.' + app.params.viewClass).length > 0) {
                app.sizeNavbars(modal.find('.' + app.params.viewClass)[0]);
            }
        
            app.openModal(modal);
            return modal[0];
        };
        app.popup = function (modal, removeOnClose) {
            if (typeof removeOnClose === 'undefined') removeOnClose = true;
            if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
                var _modal = document.createElement('div');
                _modal.innerHTML = $.trim(modal);
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
        app.loginScreen = function (modal) {
            if (!modal) modal = '.login-screen';
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
        
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            var isLoginScreen = modal.hasClass('login-screen');
            if (!isPopover && !isPopup && !isLoginScreen) modal.css({marginTop: - Math.round(modal.outerHeight() / 2) + 'px'});
        
            var overlay;
            if (!isLoginScreen) {
                if ($('.modal-overlay').length === 0 && !isPopup) {
                    $('body').append('<div class="modal-overlay"></div>');
                }
                if ($('.popup-overlay').length === 0 && isPopup) {
                    $('body').append('<div class="popup-overlay"></div>');
                }
                overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
            }
        
            //Make sure that styles are applied, trigger relayout;
            var clientLeft = modal[0].clientLeft;
        
            // Trugger open event
            modal.trigger('open');
        
            // Classes for transition in
            if (!isLoginScreen) overlay.addClass('modal-overlay-visible');
            modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
                if (modal.hasClass('modal-out')) modal.trigger('closed');
                else modal.trigger('opened');
            });
            return true;
        };
        app.closeModal = function (modal) {
            modal = $(modal || '.modal-in');
            if (typeof modal !== 'undefined' && modal.length === 0) {
                return;
            }
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            var isLoginScreen = modal.hasClass('login-screen');
        
            var removeOnClose = modal.hasClass('remove-on-close');
        
            var overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
            overlay.removeClass('modal-overlay-visible');
        
            modal.trigger('close');
            
            if (!isPopover) {
                modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
                    if (modal.hasClass('modal-out')) modal.trigger('closed');
                    else modal.trigger('opened');
                    
                    if (isPopup || isLoginScreen) {
                        modal.removeClass('modal-out').hide();
                        if (removeOnClose && modal.length > 0) modal.remove();
                    }
                    else {
                        modal.remove();
                    }
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
            var panel = $('.panel.panel-' + app.params.swipePanel);
            if (panel.length === 0) return;
        
            var panelOverlay = $('.panel-overlay');
            var isTouched, isMoved, isScrolling, touchesStart = {}, touchStartTime, touchesDiff, translate, opened, panelWidth, effect, direction, side;
            var views = $('.' + app.params.viewsClass);
            side = app.params.swipePanel;
        
            function handleTouchStart(e) {
                if (!app.allowPanelOpen || !app.params.swipePanel || isTouched) return;
                if ($('.modal-in, .photo-browser-in').length > 0) return;
                if (!app.params.swipePanelCloseOpposite) {
                    if ($('.panel.active').length > 0 && !panel.hasClass('active')) return;
                }
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                if (app.params.swipePanelCloseOpposite) {
                    if ($('.panel.active').length > 0) {
                        side = $('.panel.active').hasClass('panel-left') ? 'left' : 'right';
                    }
                    else {
                        side = app.params.swipePanel;
                    }
                }
                panel = $('.panel.panel-' + side);
                if (app.params.swipePanelActiveArea) {
                    if (side === 'left') {
                        if (touchesStart.x > app.params.swipePanelActiveArea) return;
                    }
                    if (side === 'right') {
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
                    app.pluginHook('swipePanelSetTransform', views[0], panel[0], Math.abs(translate / panelWidth));
                }
                else {
                    panel.transform('translate3d(' + translate + 'px,0,0)').transition(0);
                    app.pluginHook('swipePanelSetTransform', views[0], panel[0], Math.abs(translate / panelWidth));
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
                        timeDiff < 300 && Math.abs(translate) >= 0 ||
                        timeDiff >= 300 && (Math.abs(translate) <= panelWidth / 2)
                    ) {
                        if (side === 'left' && translate === panelWidth) action = 'reset';
                        else action = 'swap';
                    }
                    else {
                        action = 'reset';
                    }
                }
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
                panel.transition('').transform('');
                panelOverlay.css({display: ''}).transform('');
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
            var isPic = props.text.indexOf('<img') >= 0 ? 'message-pic' : '';
            var withAvatar = props.avatar ? 'message-with-avatar' : '';
            var messageClass = 'message' + ' message-' + props.type + isPic  + ' ' + withAvatar + ' message-appear';
            html += '<div class="' + messageClass + '">' +
                        (props.name ? '<div class="message-name">' + props.name + '</div>' : '') +
                        '<div class="message-text">' + props.text + '</div>' +
                        (props.avatar ? '<div class="message-avatar" style="background-image:url(' + props.avatar + ')"></div>' : '') +
                    '</div>';
            if (newOnTop) messages.prepend(html);
            else messages.append(html);
            app.updateMessagesAngles(messages);
            app.scrollMessagesContainer(messagesContent);
        };
        app.updateMessagesAngles = function (messages) {
            messages.find('.message').each(function () {
                var message = $(this);
                if (message.find('.message-text img').length > 0) message.addClass('message-pic');
                if (message.find('.message-avatar').length > 0) message.addClass('message-with-avatar');
            });
            messages.find('.message-sent').each(function () {
                var message = $(this);
                var next = message.next('.message-sent');
                var prev = message.prev('.message-sent');
                if (next.length === 0) {
                    message.addClass('message-last');
                }
                else message.removeClass('message-last');
        
                if (prev.length === 0) {
                    message.addClass('message-first');
                }
                else message.removeClass('message-first');
                // Search for changed names
                if (prev.length > 0 && prev.find('.message-name').length > 0 && message.find('.message-name').length > 0) {
                    if (prev.find('.message-name').text() !== message.find('.message-name').text()) {
                        prev.addClass('message-last');
                        message.addClass('message-first');
                    }
                }
            });
            messages.find('.message-received').each(function () {
                var message = $(this);
                var next = message.next('.message-received');
                var prev = message.prev('.message-received');
                if (next.length === 0) {
                    message.addClass('message-last');
                }
                else message.removeClass('message-last');
        
                if (prev.length === 0) {
                    message.addClass('message-first');
                }
                else message.removeClass('message-first');
                // Search for changed names
                if (prev.length > 0 && prev.find('.message-name').length > 0 && message.find('.message-name').length > 0) {
                    if (prev.find('.message-name').text() !== message.find('.message-name').text()) {
                        prev.addClass('message-last');
                        message.addClass('message-first');
                    }
                }
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
            messagesContent.scrollTop(newScroll, 300);
        };
        
        /*===============================================================================
        ************   Swipeout Actions (Swipe to delete)   ************
        ===============================================================================*/
        app.swipeoutOpenedEl = undefined;
        app.allowSwipeout = true;
        app.initSwipeout = function (swipeoutEl) {
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
                
                if (app.rtl) e.f7PreventSwipeBack = true;
                touchesDiff = pageX - touchesStart.x;
                translate = touchesDiff  - (opened ? swipeOutActionsWidth : 0);
        
                if (translate > 0) {
                    if (!opened) {
                        isTouched = isMoved = false;
                        return;
                    }
                    translate = 0;
                }
                if (translate < -swipeOutActionsWidth) {
                    translate = -swipeOutActionsWidth - Math.pow(-translate - swipeOutActionsWidth, 0.8);
                }
                e.f7PreventPanelSwipe = true;
        
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
                else {
                    swipeOutEl.trigger('swipeout', {progress: Math.abs(translate / swipeOutActionsWidth)});
                    swipeOutContent.transform('translate3d(' + translate + 'px,0,0)');
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
                    var newTranslate = -swipeOutActionsWidth;
                    swipeOutContent.transform('translate3d(' + newTranslate + 'px,0,0)');
                }
                else {
                    swipeOutEl.trigger('close');
                    app.swipeoutOpenedEl = undefined;
                    swipeOutEl.addClass('transitioning').removeClass('swipeout-opened');
                    swipeOutContent.transform('translate3d(' + 0 + 'px,0,0)');
                }
                if (translate <= -swipeOutActionsWidth) {
                    if (!opened) {
                        swipeOutEl.trigger('opened');
                    }
                    app.allowSwipeout = true;
                }
                else if (translate >= 0) {
                    if (opened) {
                        swipeOutEl.trigger('closed');
                    }
                    app.allowSwipeout = true;
                }
                else {
                    swipeOutContent.transitionEnd(function () {
                        app.allowSwipeout = true;
                        swipeOutEl.trigger(action === 'open' ? 'opened' : 'closed');
                    });
                }
            }
            if (swipeoutEl) {
                $(swipeoutEl).on(app.touchEvents.start, handleTouchStart);
                $(swipeoutEl).on(app.touchEvents.move, handleTouchMove);
                $(swipeoutEl).on(app.touchEvents.end, handleTouchEnd);
            }
            else {
                $(document).on(app.touchEvents.start, '.list-block li.swipeout', handleTouchStart);
                $(document).on(app.touchEvents.move, '.list-block li.swipeout', handleTouchMove);
                $(document).on(app.touchEvents.end, '.list-block li.swipeout', handleTouchEnd);
            }
                
        };
        app.swipeoutOpen = function (el) {
            el = $(el);
            if (!el.hasClass('swipeout')) return;
            if (el.length === 0) return;
            if (el.length > 1) el = $(el[0]);
            el.trigger('open').addClass('transitioning swipeout-opened');
            var swipeOutActions = el.find('.swipeout-actions-inner');
            var translate = -swipeOutActions.width();
            el.find('.swipeout-content').transform('translate3d(' + translate + 'px,0,0)').transitionEnd(function () {
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
        
            if (app.swipeoutOpenedEl && app.swipeoutOpenedEl[0] === el[0]) app.swipeoutOpenedEl = undefined;
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
            var translate = '-100%';
            el.find('.swipeout-content').transform('translate3d(' + translate + ',0,0)');
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
            if (app.support.touch) {
                $(document).on(app.touchEvents.move, '.list-block.sortable .sortable-handler', handleTouchMove);
                $(document).on(app.touchEvents.end, '.list-block.sortable .sortable-handler', handleTouchEnd);
            }
            else {
                $(document).on(app.touchEvents.move, handleTouchMove);
                $(document).on(app.touchEvents.end, handleTouchEnd);
            }
                
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
        
                var valueText = [];
                for (var i = 0; i < select.length; i++) {
                    if (select[i].selected) valueText.push(select[i].textContent.trim());
                }
        
                var itemAfter = smartSelect.find('.item-after');
                if (itemAfter.length === 0) {
                    smartSelect.find('.item-inner').append('<div class="item-after">' + valueText.join(', ') + '</div>');
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
            var $select = $(select);
            if (select.disabled || smartSelect.hasClass('disabled') || $select.hasClass('disabled')) {
                return;
            }
            var values = {};
            values.length = select.length;
            var option;
            for (var i = 0; i < select.length; i++) {
                option = $(select[i]);
                values[i] = {
                    value: select[i].value,
                    text: select[i].textContent.trim(),
                    selected: select[i].selected,
                    group: option.parent('optgroup')[0],
                    image: option.attr('data-option-image') || $select.attr('data-option-image'),
                    icon: option.attr('data-option-icon') || $select.attr('data-option-icon'),
                    disabled: select[i].disabled
                };
            }
        
            var pageTitle = smartSelect.attr('data-page-title') || smartSelect.find('.item-title').text();
            var backText = smartSelect.attr('data-back-text') || app.params.smartSelectBackText;
            var backOnSelect = smartSelect.attr('data-back-onselect') ? (smartSelect.attr('data-back-onselect') === 'true' ? true : false) : app.params.smartSelectBackOnSelect;
        
            // Generate dynamic page layout
            var id = (new Date()).getTime();
            var inputType = select.multiple ? 'checkbox' : 'radio';
            var inputName = inputType + '-' + id;
            var inputsHTML = '';
            var previousGroup;
            for (var j = 0; j < values.length; j++) {
                if (values[j].disabled) continue;
                var checked = values[j].selected ? 'checked' : '';
                if (values[j].group) {
                    if (values[j].group !== previousGroup) {
                        inputsHTML += '<li class="item-divider">' + values[j].group.label + '</li>';
                        previousGroup = values[j].group;
                    }
                }
                var media = '';
                if (inputType === 'checkbox') media += '<i class="icon icon-form-checkbox"></i>';
                if (values[j].icon) media += '<i class="icon ' + values[j].icon + '"></i>';
                if (values[j].image) media += '<img src="' + values[j].image + '">';
                inputsHTML +=
                    '<li>' +
                        '<label class="label-' + inputType + ' item-content">' +
                            '<input type="' + inputType + '" name="' + inputName + '" value="' + values[j].value + '" ' + checked + '>' +
                            (media !== '' ? '<div class="item-media">' + media + '</div>' : '') +
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
                    app.params.smartSelectBackTemplate.replace(/{{backText}}/g, backText) +
                '    <div class="center sliding">' + pageTitle + '</div>' +
                '  </div>' +
                '</div>';
            // Determine navbar layout type - static/fixed/through
            var navbarLayout = 'static';
            if (smartSelect.parents('.navbar-through').length > 0) navbarLayout = 'through';
            if (smartSelect.parents('.navbar-fixed').length > 0) navbarLayout = 'fixed';
            // Page Layout
            var pageName = 'smart-select-' + inputName;
        
            var noToolbar = smartSelect.parents('.page').hasClass('no-toolbar') ? 'no-toolbar' : '';
            var noNavbar  = smartSelect.parents('.page').hasClass('no-navbar')  ? 'no-navbar'  : 'navbar-' + navbarLayout;
        
            var useSearchbar = typeof smartSelect.data('searchbar') === 'undefined' ? app.params.smartSelectSearchbar : (smartSelect.data('searchbar') === 'true' ? true : false);
            var searchbarPlaceholder, searchbarCancel;
                
            if (useSearchbar) {
                searchbarPlaceholder = smartSelect.data('searchbar-placeholder') || 'Search';
                searchbarCancel = smartSelect.data('searchbar-cancel') || 'Cancel';
            }
        
            var searchbarHTML =   '<form class="searchbar" data-search-list=".smart-select-list-' + id + '" data-search-in=".item-title">' +
                                    '<div class="searchbar-input">' +
                                        '<input type="search" placeholder="' + searchbarPlaceholder + '">' +
                                        '<a href="#" class="searchbar-clear"></a>' +
                                    '</div>' +
                                    '<a href="#" class="searchbar-cancel">' + searchbarCancel + '</a>' +
                                  '</form>' +
                                  '<div class="searchbar-overlay"></div>';
        
            var pageHTML =
                (navbarLayout === 'through' ? navbarHTML : '') +
                '<div class="pages">' +
                '  <div data-page="' + pageName + '" class="page smart-select-page ' + noNavbar + ' ' + noToolbar + '">' +
                     (navbarLayout === 'fixed' ? navbarHTML : '') +
                     (useSearchbar ? searchbarHTML : '') +
                '    <div class="page-content">' +
                       (navbarLayout === 'static' ? navbarHTML : '') +
                '      <div class="list-block smart-select-list-' + id + '">' +
                '        <ul>' +
                            inputsHTML +
                '        </ul>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>';
        
            // Event Listeners on new page
            function handleInputs(e) {
                var page = e.detail.page;
                if (page.name === pageName) {
                    $(document).off('pageInit', handleInputs);
                    $(page.container).find('input[name="' + inputName + '"]').on('change', function () {
                        var input = this;
                        var value = input.value;
                        var optionText = [];
                        if (input.type === 'checkbox') {
                            var values = [];
                            for (var i = 0; i < select.options.length; i++) {
                                var option = select.options[i];
                                if (option.value === value) {
                                    option.selected = input.checked;
                                }
                                if (option.selected) {
                                    optionText.push(option.textContent.trim());
                                }
                            }
                        }
                        else {
                            optionText = [smartSelect.find('option[value="' + value + '"]').text()];
                            select.value = value;
                        }
                            
                        $select.trigger('change');
                        smartSelect.find('.item-after').text(optionText.join(', '));
                        if (backOnSelect && inputType === 'radio') {
                            view.goBack();
                        }
                    });
                }
            }
            $(document).on('pageInit', handleInputs);
        
            // Load content
            view.loadContent(pageHTML);
        
        };
        
        /*======================================================
        ************   Pull To Refresh   ************
        ======================================================*/
        app.initPullToRefresh = function (pageContainer) {
            var eventsTarget = $(pageContainer);
            if (!eventsTarget.hasClass('pull-to-refresh-content')) {
                eventsTarget = eventsTarget.find('.pull-to-refresh-content');
            }
            if (eventsTarget.length === 0) return;
        
            var isTouched, isMoved, touchesStart = {}, isScrolling, touchesDiff, touchStartTime, container, refresh = false, useTranslate = false, startTranslate = 0, translate, scrollTop;
        
            container = eventsTarget;
        
            function handleTouchStart(e) {
                if (isTouched) {
                    if (app.device.os === 'android') {
                        if ('targetTouches' in e && e.targetTouches.length > 1) return;
                    }
                    else return;
                }
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
        
                scrollTop = container[0].scrollTop;
        
                if (!isMoved) {
                    /*jshint validthis:true */
                    container.removeClass('transitioning');
                    if (scrollTop > container[0].offsetHeight) {
                        isTouched = false;
                        return;
                    }
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
                
                if (touchesDiff > 0 && scrollTop <= 0 || scrollTop < 0) {
                    if (useTranslate) {
                        e.preventDefault();
                        translate = (Math.pow(touchesDiff, 0.85) + startTranslate);
                        container.transform('translate3d(0,' + translate + 'px,0)');
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
                if (translate) {
                    container.addClass('transitioning');
                    translate = 0;
                }
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
        
            // Attach Events
            eventsTarget.on(app.touchEvents.start, handleTouchStart);
            eventsTarget.on(app.touchEvents.move, handleTouchMove);
            eventsTarget.on(app.touchEvents.end, handleTouchEnd);
        
            // Detach Events on page remove
            var page = eventsTarget.hasClass('page') ? eventsTarget : eventsTarget.parents('.page');
            if (page.length === 0) return;
            function detachEvents() {
                eventsTarget.off(app.touchEvents.start, handleTouchStart);
                eventsTarget.off(app.touchEvents.move, handleTouchMove);
                eventsTarget.off(app.touchEvents.end, handleTouchEnd);
        
                page.off('pageBeforeRemove', detachEvents);
            }
            page.on('pageBeforeRemove', detachEvents);
        
        };
        
        app.pullToRefreshDone = function (container) {
            container = $(container);
            if (container.length === 0) container = $('.pull-to-refresh-content.refreshing');
            container.removeClass('refreshing').addClass('transitioning');
            container.transitionEnd(function () {
                container.removeClass('transitioning pull-up');
            });
        };
        app.pullToRefreshTrigger = function (container) {
            container = $(container);
            if (container.length === 0) container = $('.pull-to-refresh-content');
            if (container.hasClass('refreshing')) return;
            container.addClass('transitioning refreshing');
            container.trigger('refresh', {
                done: function () {
                    app.pullToRefreshDone(container);
                }
            });
        };
        /* ===============================================================================
        ************   Infinite Scroll   ************
        =============================================================================== */
        function handleInfiniteScroll() {
            /*jshint validthis:true */
            var inf = this;
            var scrollTop = inf.scrollTop;
            var scrollHeight = inf.scrollHeight;
            var height = inf.offsetHeight;
            var distance = inf.getAttribute('data-distance');
            if (!distance) distance = 50;
            if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
                distance = parseInt(distance, 10) / 100 * height;
            }
            if (distance > height) distance = height;
            if (scrollTop + height >= scrollHeight - distance) {
                $(inf).trigger('infinite');
            }
        }
        app.attachInfiniteScroll = function (infiniteContent) {
            $(infiniteContent).on('scroll', handleInfiniteScroll);
        };
        app.detachInfiniteScroll = function (infiniteContent) {
            $(infiniteContent).off('scroll', handleInfiniteScroll);
        };
        
        app.initInfiniteScroll = function (pageContainer) {
            pageContainer = $(pageContainer);
            var infiniteContent = pageContainer.find('.infinite-scroll');
            app.attachInfiniteScroll(infiniteContent);
            function detachEvents() {
                app.detachInfiniteScroll(infiniteContent);
                pageContainer.off('pageBeforeRemove', detachEvents);
            }
            pageContainer.on('pageBeforeRemove', detachEvents);
        };
        /* ===============================================================================
        ************   Tabs   ************
        =============================================================================== */
        app.showTab = function (tab, tabLink) {
            var newTab = $(tab);
            if (newTab.hasClass('active')) return false;
            if (newTab.length === 0) return false;
            var tabs = newTab.parent('.tabs');
            if (tabs.length === 0) return false;
        
            // Return swipeouts in hidden tabs
            app.allowSwipeout = true;
        
            // Animated tabs
            var isAnimatedTabs = tabs.parent().hasClass('tabs-animated-wrap');
            if (isAnimatedTabs) {
                tabs.transform('translate3d(' + -newTab.index() * 100 + '%,0,0)');
            }
        
            // Remove active class from old tabs
            var oldTab = tabs.children('.tab.active').removeClass('active');
            // Add active class to new tab
            newTab.addClass('active');
            // Trigger 'show' event on new tab
            newTab.trigger('show');
        
            // Update navbars in new tab
            if (!isAnimatedTabs && newTab.find('.navbar').length > 0) {
                // Find tab's view
                var viewContainer;
                if (newTab.hasClass(app.params.viewClass)) viewContainer = newTab[0];
                else viewContainer = newTab.parents('.' + app.params.viewClass)[0];
                app.sizeNavbars(viewContainer);
            }
        
            // Find related link for new tab
            if (tabLink) tabLink = $(tabLink);
            else {
                // Search by id
                if (typeof tab === 'string') tabLink = $('.tab-link[href="' + tab + '"]');
                else tabLink = $('.tab-link[href="#' + newTab.attr('id') + '"]');
                // Search by data-tab
                if (tabLink.length === 0) {
                    $('[data-tab]').each(function () {
                        if (newTab.is($(this).attr('data-tab'))) tabLink = $(this);
                    });
                }
            }
            if (tabLink.length === 0) return;
        
            // Find related link for old tab
            var oldTabLink;
            if (oldTab && oldTab.length > 0) {
                // Search by id
                var oldTabId = oldTab.attr('id');
                if (oldTabId) oldTabLink = $('.tab-link[href="#' + oldTabId + '"]');
                // Search by data-tab
                if (oldTabLink.length === 0) {
                    $('[data-tab]').each(function () {
                        if (oldTab.is($(this).attr('data-tab'))) oldTabLink = $(this);
                    });
                }
            }
        
            // Update links' classes
            if (tabLink && tabLink.length > 0) tabLink.addClass('active');
            if (oldTabLink && oldTabLink.length > 0) oldTabLink.removeClass('active');
            
            return true;
        };
        /*===============================================================================
        ************   Accordion   ************
        ===============================================================================*/
        app.accordionToggle = function (item) {
            item = $(item);
            if (item.length === 0) return;
            if (item.hasClass('accordion-item-expanded')) app.accordionClose(item);
            else app.accordionOpen(item);
        };
        app.accordionOpen = function (item) {
            item = $(item);
            var list = item.parents('.accordion-list');
            var content = item.find('.accordion-item-content');
            var expandedItem = list.find('.accordion-item-expanded');
            if (expandedItem.length > 0) {
                app.accordionClose(expandedItem);
            }
            content.css('height', content[0].scrollHeight + 'px').transitionEnd(function () {
                if (item.hasClass('accordion-item-expanded')) {
                    content.transition(0);
                    content.css('height', 'auto');
                    var clientLeft = content[0].clientLeft;
                    content.transition('');
                }
                else content.css('height', '');
            });
            item.addClass('accordion-item-expanded');
        };
        app.accordionClose = function (item) {
            item = $(item);
            var content = item.find('.accordion-item-content');
            item.removeClass('accordion-item-expanded');
            content.transition(0);
            content.css('height', content[0].scrollHeight + 'px');
            // Relayout
            var clientLeft = content[0].clientLeft;
            // Close
            content.transition('');
            content.css('height', '').transitionEnd(function () {
                if (item.hasClass('accordion-item-expanded')) {
                    content.transition(0);
                    content.css('height', 'auto');
                    var clientLeft = content[0].clientLeft;
                    content.transition('');
                }
                else content.css('height', '');
            });
        };
        /*===============================================================================
        ************   Fast Clicks   ************
        ************   Inspired by https://github.com/ftlabs/fastclick   ************
        ===============================================================================*/
        app.initFastClicks = function () {
            if (!app.support.touch) return;
            var touchStartX, touchStartY, touchStartTime, targetElement, trackClick, activeSelection, scrollParent, lastClickTime, isMoved;
        
            function androidNeedsBlur(el) {
                var noBlur = ('button checkbox file image radio submit input textarea').split(' ');
                if (document.activeElement && el !== document.activeElement && document.activeElement !== document.body) {
                    if (noBlur.indexOf(el.nodeName.toLowerCase()) >= 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return false;
                }
            }
            function targetNeedsFocus(el) {
                if (document.activeElement === el) {
                    return false;
                }
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
                    if (app.device.os === 'android') {
                        var osv = app.device.osVersion.split('.');
                        if (osv[0] * 1 > 4 || (osv[0] * 1 === 4 && osv[1] * 1 >= 4)) {
                            return false;
                        }
                        else return true;
                    }
                    else return false;
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
                    if (selection.rangeCount && (!selection.isCollapsed || document.activeElement === selection.focusNode)) {
                        activeSelection = true;
                        return true;
                    }
                    else {
                        activeSelection = false;
                    }
                }
                if (app.device.os === 'android')  {
                    if (androidNeedsBlur(e.target)) {
                        document.activeElement.blur();
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
        
                if (document.activeElement === e.target) {
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
                if (targetNeedsFocus(targetElement)) {
                    targetElement.focus();
                }
        
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
                if (document.activeElement === targetElement) {
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
                var isLink = clicked[0].nodeName.toLowerCase() === 'a';
        
                // Check if link is external 
                if (isLink) {
                    /*jshint shadow:true */
                    for (var i = 0; i < app.params.externalLinks.length; i++) {
                        if (clicked.hasClass(app.params.externalLinks[i])) {
                            return;
                        }
        
                        if (clicked[0].rel === app.params.externalLinks[i]) {
                            return;
                        }
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
                if (clicked.hasClass('close-popover')) {
                    app.closeModal('.popover.modal-in');
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
                    if (clicked.attr('data-popup')) {
                        popup = clicked.attr('data-popup');
                    }
                    else popup = '.popup.modal-in';
                    app.closeModal(popup);
                }
                // Login Screen
                var loginScreen;
                if (clicked.hasClass('open-login-screen')) {
                    if (clicked.attr('data-login-screen')) {
                        loginScreen = clicked.attr('data-login-screen');
                    }
                    else loginScreen = '.login-screen';
                    app.loginScreen(loginScreen);
                }
                if (clicked.hasClass('close-login-screen')) {
                    app.closeModal('.login-screen.modal-in');
                }
                // Close Modal
                if (clicked.hasClass('modal-overlay')) {
                    if ($('.modal.modal-in').length > 0 && app.params.modalCloseByOutside)
                        app.closeModal('.modal.modal-in');
                    if ($('.actions-modal.modal-in').length > 0 && app.params.actionsCloseByOutside)
                        app.closeModal('.actions-modal.modal-in');
                    
                    if ($('.popover.modal-in').length > 0) app.closeModal('.popover.modal-in');
                }
                if (clicked.hasClass('popup-overlay')) {
                    if ($('.popup.modal-in').length > 0 && app.params.popupCloseByOutside)
                        app.closeModal('.popup.modal-in');
                }
        
                // Tabs
                if (clicked.hasClass('tab-link')) {
                    app.showTab(clicked.attr('data-tab') || clicked.attr('href'), clicked);
                }
                // Swipeout Delete
                if (clicked.hasClass('swipeout-delete')) {
                    if (clicked.attr('data-confirm')) {
                        var text = clicked.attr('data-confirm');
                        var title = clicked.attr('data-confirm-title');
                        if (title) {
                            app.confirm(text, title, function () {
                                app.swipeoutDelete(clicked.parents('.swipeout'));
                            });
                        }
                        else {
                            app.confirm(text, function () {
                                app.swipeoutDelete(clicked.parents('.swipeout'));
                            });
                        }
                    }
                    else {
                        app.swipeoutDelete(clicked.parents('.swipeout'));
                    }
                        
                }
                // Sortable
                if (clicked.hasClass('toggle-sortable')) {
                    app.sortableToggle(clicked.data('sortable'));
                }
                if (clicked.hasClass('open-sortable')) {
                    app.sortableOpen(clicked.data('sortable'));
                }
                if (clicked.hasClass('close-sortable')) {
                    app.sortableClose(clicked.data('sortable'));
                }
                // Accordion
                if (clicked.hasClass('accordion-item-toggle') || (clicked.hasClass('item-link') && clicked.parent().hasClass('accordion-item'))) {
                    var accordionItem = clicked.parents('.accordion-item');
                    if (accordionItem.length === 0) accordionItem = clicked.parents('li');
                    app.accordionToggle(accordionItem);
                }
                // Load Page
                if (app.params.ajaxLinks && !clicked.is(app.params.ajaxLinks) || !isLink) {
                    return;
                }
                if (isLink) {
                    e.preventDefault();
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
                    var animatePages;
                    if (clicked.hasClass('no-animation')) animatePages = false;
                    if (clicked.hasClass('with-animation')) animatePages = true;
                    if (clicked.hasClass('back')) view.goBack(clicked.attr('href'), animatePages);
                    else view.loadPage(clicked.attr('href'), animatePages);
                }
            }
            $(document).on('click', 'a, .open-panel, .close-panel, .panel-overlay, .modal-overlay, .popup-overlay, .swipeout-delete, .close-popup, .open-popup, .open-popover, .open-login-screen, .close-login-screen .smart-select, .toggle-sortable, .open-sortable, .close-sortable, .accordion-item-toggle', handleClicks);
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
            if (forms.length === 0) return;
            
            // Parse forms data and fill form if there is such data
            forms.each(function () {
                var id = this.getAttribute('id');
                if (!id) return;
                var formData = app.formGetData(id);
                if (formData) app.formFromJSON(this, formData);
            });
            // Update forms data on inputs change
            function storeForm() {
                /*jshint validthis:true */
                var form = $(this);
                var formId = form[0].id;
                if (!formId) return;
                var formJSON = app.formToJSON(form);
                if (!formJSON) return;
                app.formStoreData(formId, formJSON);
                form.trigger('store', {data: formJSON});
            }
            forms.on('change submit', storeForm);
        
            // Detach Listeners
            function pageBeforeRemove() {
                forms.off('change submit', storeForm);
                pageContainer.off('pageBeforeRemove', pageBeforeRemove);
            }
            pageContainer.on('pageBeforeRemove', pageBeforeRemove);
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
        
            var xhr = $.ajax({
                method: method,
                url: url,
                contentType: contentType,
                data: data,
                success: function (data) {
                    form.trigger('submitted', {data: data, xhr: xhr});
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
            var animatePages;
            if (app.params.pushStateNoAnimation === true) animatePages = false;
            if (queue.action === 'goBack') {
                app.goBack(queue.view, undefined, animatePages, false, false);
            }
            if (queue.action === 'loadPage') {
                app.loadPage(queue.view, queue.stateUrl, animatePages, false);
            }
            if (queue.action === 'loadContent') {
                app.loadContent(queue.view, queue.stateContent, animatePages, false);
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
                var animatePages;
                if (app.params.pushStateNoAnimation === true) animatePages = false;
                if (stateUrl !== mainView.url) {
                    if (mainView.history.indexOf(stateUrl) >= 0) {
                        // Go Back
                        if (mainView.allowPageChange) {
                            app.goBack(mainView, undefined, animatePages, false, false);
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
                        if (mainView.allowPageChange) {
                            app.loadPage(mainView, stateUrl, animatePages, false);
                        }
                        else {
                            app.pushStateQueue.unshift({
                                action: 'loadPage',
                                stateUrl: stateUrl,
                                view: mainView
                            });
                        }
                    }
                    else if (stateContent) {
                        // Load Page
                        if (mainView.allowPageChange) {
                            app.loadContent(mainView, stateContent, animatePages, false);
                        }
                        else {
                            app.pushStateQueue.unshift({
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
        ************   Slider   ************
        ======================================================*/
        var Slider = function (container, params) {
            var defaults = {
                initialSlide: 0,
                spaceBetween: 0,
                speed: 300,
                slidesPerView: 1,
                direction: 'horizontal',
                paginationHide: true,
                slideClass: 'slider-slide',
                slideActiveClass: 'slider-slide-active',
                slideNextClass: 'slider-slide-next',
                slidePrevClass: 'slider-slide-prev',
                wrapperClass: 'slider-wrapper',
                bulletClass: 'slider-pagination-bullet',
                bulletActiveClass: 'slider-pagination-active',
                preventClicks: true,
                preventClicksPropagation: true,
                autoplay: false,
                autoplayDisableOnInteraction: true
            };
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
        
            var s = this;
            s.params = params;
            s.container = $(container);
            if (s.container.length === 0) return;
            s.container[0].f7Slider = s;
        
            if (s.params.direction === 'vertical') {
                s.container.addClass('slider-container-vertical');
            }
            else {
                s.container.addClass('slider-container-horizontal');
            }
        
            s.wrapper = s.container.children('.' + s.params.wrapperClass);
        
            if (s.params.pagination) {
                s.paginationContainer = $(s.params.pagination);
            }
            
            s.activeSlideIndex = s.previousSlideIndex = s.params.initialSlide || 0;
        
            var isH = s.params.direction === 'horizontal';
        
            var inverter = isH ? (app.rtl ? -1 : 1) : 1;
        
            s.updateSlides = function () {
                s.slides = s.wrapper.children('.' + s.params.slideClass);
        
                if (s.params.spaceBetween !== 0) {
                    var marginProp = app.rtl ? 'margin-left' : 'margin-right';
                    if (isH) s.slides.css(marginProp, s.params.spaceBetween + 'px');
                    else s.slides.css({marginBottom: s.params.spaceBetween + 'px'});
                }
                if (s.params.slidesPerView > 1) {
                    var sizeValue = '(100% - ' + (s.params.slidesPerView - 1) * params.spaceBetween + 'px)/' + s.params.slidesPerView;
                    if (isH) {
                        s.slides.css('width', '-webkit-calc(' + sizeValue + ')');
                        s.slides.css('width', '-moz-calc(' + sizeValue + ')');
                        s.slides.css('width', 'calc(' + sizeValue + ')');
                    }
                    else {
                        s.slides.css('height', '-webkit-calc(' + sizeValue + ')');
                        s.slides.css('height', '-moz-calc(' + sizeValue + ')');
                        s.slides.css('height', 'calc(' + sizeValue + ')');
                    }
                }
            };
        
            s.updatePagination = function () {
                if (s.paginationContainer && s.paginationContainer.length > 0) {
                    var bulletsHTML = '';
                    for (var i = 0; i < s.slides.length - s.params.slidesPerView + 1; i++) {
                        bulletsHTML += '<span class="' + s.params.bulletClass + '"></span>';
                    }
                    s.paginationContainer.html(bulletsHTML);
                    s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
                }
            };
        
            s.updateSize = function () {
                s.width = s.container[0].offsetWidth;
                s.height = s.container[0].offsetHeight;
                s.size = isH ? s.width : s.height;
            };
        
            s.attachEvents = function (detach) {
                var action = detach ? 'off' : 'on';
                // Slide between photos
                s.container[action](app.touchEvents.start, s.onTouchStart);
                s.container[action](app.touchEvents.move, s.onTouchMove);
                s.container[action](app.touchEvents.end, s.onTouchEnd);
                $(window)[action]('resize', s.onResize);
        
                // Next, Prev, Index
                if (s.params.nextButton) $(s.params.nextButton)[action]('click', s.onClickNext);
                if (s.params.prevButton) $(s.params.prevButton)[action]('click', s.onClickPrev);
                if (s.params.indexButton) $(s.params.indexButton)[action]('click', s.onClickIndex);
        
                // Prevent Links
                if (s.params.preventClicks) s.container[action]('click', s.onClick);
            };
            s.detachEvents = function () {
                s.attachEvents(true);
            };
        
            s.onResize = function () {
                s.updateSize();
                s.slideTo(s.activeSlideIndex, 0, false);
            };
        
            var isTouched, isMoved, touchesStart = {}, touchesCurrent = {}, touchStartTime, isScrolling, currentTranslate, animating = false;
            var lastClickTime = Date.now(), clickTimeout;
            s.allowClick = true;
        
            s.onClick = function (e) {
                if (s.params.preventClicks && !s.allowClick) {
                    e.preventDefault();
                    if (s.params.preventClicksPropagation) {
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                    }
                }
            };
            s.onTouchStart = function (e) {
                isTouched = true;
                isMoved = false;
                isScrolling = undefined;
                touchesStart.x = touchesCurrent.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = touchesCurrent.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = Date.now();
                s.allowClick = true;
                s.updateSize();
                if (s.params.onTouchStart) s.params.onTouchStart(s, e);
                if (e.type === 'mousedown') e.preventDefault();
            };
            s.onTouchMove = function (e) {
                if (s.params.onTouchMove) s.params.onTouchMove(s, e);
                s.allowClick = false;
                if (e.targetTouches && e.targetTouches.length > 1) return;
                
                touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(touchesCurrent.y - touchesStart.y) > Math.abs(touchesCurrent.x - touchesStart.x));
                }
                if ((isH && isScrolling) || (!isH && !isScrolling))  {
                    if (s.params.onOppositeTouchMove) s.params.onOppositeTouchMove(s, e);
                }
                if (!isTouched) return;
                if ((isH && isScrolling) || (!isH && !isScrolling))  {
                    isTouched = false;
                    return;
                }
                if (s.params.onSliderMove) s.params.onSliderMove(s, e);
        
                e.preventDefault();
                e.stopPropagation();
        
                if (!isMoved) {
                    currentTranslate = $.getTranslate(s.wrapper[0], isH ? 'x' : 'y') * inverter;
                    s.wrapper.transition(0);
                    if (animating) s.onSlideChangeEnd();
                    if (params.autoplay && autoplay) {
                        if (s.params.autoplayDisableOnInteraction) s.stopAutoplay();
                        else {
                            if (autoplayTimeout) clearTimeout(autoplayTimeout);
                        }
                    }
                }
                isMoved = true;
                var diff = isH ? (touchesCurrent.x - touchesStart.x) * inverter : touchesCurrent.y - touchesStart.y;
        
                if ((diff > 0 && s.activeSlideIndex === 0)) diff = Math.pow(diff, 0.85);
                else if (diff < 0 && s.activeSlideIndex === s.slides.length - s.params.slidesPerView) diff = -Math.pow(-diff, 0.85);
                
                var translateX = isH ? (diff + currentTranslate) * inverter : 0, translateY = isH ? 0 : diff + currentTranslate;
        
                s.wrapper.transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
            };
            s.onTouchEnd = function (e) {
                if (s.params.onTouchEnd) s.params.onTouchEnd(s, e);
                var touchEndTime = Date.now();
                var timeDiff = touchEndTime - touchStartTime;
                if (s.allowClick) {
                    if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                        if (clickTimeout) clearTimeout(clickTimeout);
                        clickTimeout = setTimeout(function () {
                            if (!s) return;
                            if (s.params.paginationHide && s.paginationContainer) {
                                s.paginationContainer.toggleClass('slider-pagination-hidden');
                            }
                            if (s.params.onClick) s.params.onClick(s, e);
                        }, 300);
                        
                    }
                    if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
                        if (clickTimeout) clearTimeout(clickTimeout);
                        if (s.params.onDoubleTap) {
                            s.params.onDoubleTap(s, e);
                        }
                    }
                    if (s.params.onTap) s.params.onTap(s, e);
                }
        
                lastClickTime = Date.now();
        
                if (!isTouched || !isMoved) {
                    isTouched = isMoved = false;
                    return;
                }
                isTouched = isMoved = false;
                var touchesDiff = isH ? (touchesCurrent.x - touchesStart.x) * inverter : touchesCurrent.y - touchesStart.y;
                
                //Release links clicks
                if (Math.abs(touchesDiff) < 5 && (timeDiff) < 300 && s.allowClick === false) {
                    s.allowClick = true;
                }
                setTimeout(function () {
                    if (!s) return;
                    s.allowClick = true;
                }, 100);
                
                var continueAutoplay = s.params.autoplay && autoplay && !s.params.autoplayDisableOnInteraction;
        
                if (touchesDiff === 0) {
                    if (continueAutoplay) {
                        s.startAutoplay();
                    }
                    return;
                }
                var skipSlides = 1;
                var slideSize = s.size / s.params.slidesPerView;
                if (s.params.slidesPerView > 1) {
                    skipSlides = Math.abs((Math.abs(touchesDiff) + slideSize / 2) / slideSize);
                }
                if (continueAutoplay) {
                    s.wrapper.transitionEnd(function () {
                        s.startAutoplay();
                    });
                }
        
                if (timeDiff > 300) {
                    // Long touches
                    if (touchesDiff <= -slideSize / 2) {
                        s.slideTo(s.activeSlideIndex + Math.floor(skipSlides));
                    }
                    else if (touchesDiff > slideSize / 2) {
                        s.slideTo(s.activeSlideIndex - Math.floor(skipSlides));
                    }
                    else {
                        s.slideReset();
                    }
                }
                else {
                    if (Math.abs(touchesDiff) < 10) {
                        s.slideReset();
                    }
                    else {
                        if (touchesDiff < 0) {
                            s.slideTo(s.activeSlideIndex + Math.round(skipSlides));
                        }
                        else {
                            s.slideTo(s.activeSlideIndex - Math.round(skipSlides));
                        }
                    }
                        
                }
            };
        
            s.slideTo = function (index, speed, runCallbacks) {
                if (typeof index === 'undefined') index = 0;
                if (index < 0) index = 0;
                if (index > s.slides.length - s.params.slidesPerView) index = s.slides.length - s.params.slidesPerView;
        
                var translate = - (s.size + s.params.spaceBetween) * index / s.params.slidesPerView;
        
                if (typeof speed === 'undefined') speed = s.params.speed;
                s.previousSlideIndex = s.activeSlideIndex;
                s.activeSlideIndex = Math.round(index);
                s.isFirst = s.activeSlideIndex === 0;
                s.isLast = s.activeSlideIndex === s.slides.length - s.params.slidesPerView;
                s.onSlideChangeStart();
                var translateX = isH ? translate * inverter : 0, translateY = isH ? 0 : translate;
                if (speed === 0) {
                    s.wrapper
                        .transition(0)
                        .transform('translate3d(' + translateX + 'px,' + translateY + 'px,0)');
                    if (runCallbacks !== false) s.onSlideChangeEnd();
                }
                else {
                    animating = true;
                    s.wrapper
                        .transition(speed)
                        .transform('translate3d(' + translateX + 'px,' + translateY + 'px,0)')
                        .transitionEnd(function () {
                            if (runCallbacks !== false) s.onSlideChangeEnd();
                        });
                }
            };
            s.updateClasses = function () {
                s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass);
                var activeSlide = s.slides.eq(s.activeSlideIndex);
                activeSlide.addClass(s.params.slideActiveClass);
                activeSlide.next().addClass(s.params.slideNextClass);
                activeSlide.prev().addClass(s.params.slidePrevClass);
        
                if (s.bullets && s.bullets.length > 0) {
                    s.bullets.removeClass(s.params.bulletActiveClass);
                    s.bullets.eq(s.activeSlideIndex).addClass(s.params.bulletActiveClass);
                }
            };
            s.onSlideChangeStart = function () {
                s.updateClasses();
                if (s.params.onSlideChangeStart) s.params.onSlideChangeStart(s);
            };
            s.onSlideChangeEnd = function () {
                animating = false;
                s.wrapper.transition(0);
                if (s.params.onSlideChangeEnd) s.params.onSlideChangeEnd(s);
            };
            s.slideNext = function () {
                s.slideTo(s.activeSlideIndex + 1);
            };
            s.slidePrev = function () {
                s.slideTo(s.activeSlideIndex - 1);
            };
            s.slideReset = function () {
                s.slideTo(s.activeSlideIndex);
            };
        
            // Clicks
            s.onClickNext = function (e) {
                e.preventDefault();
                s.slideNext();
            };
            s.onClickPrev = function (e) {
                e.preventDefault();
                s.slidePrev();
            };
            s.onClickIndex = function (e) {
                e.preventDefault();
                s.slideTo($(this).index());
            };
        
            // Autoplay
            var autoplayTimeout;
            var autoplay;
            s.startAutoplay = function () {
                if (!s.params.autoplay) return;
                autoplay = true;
                if (autoplayTimeout) clearTimeout(autoplayTimeout);
                autoplayTimeout = setTimeout(function () {
                    s.wrapper.transitionEnd(function () {
                        s.startAutoplay();
                    });
                    var index = s.activeSlideIndex + 1;
                    if (index > s.slides.length - s.params.slidesPerView) index = 0;
                    s.slideTo(index);
                }, s.params.autoplay);
            };
            s.stopAutoplay = function () {
                autoplay = false;
                if (autoplayTimeout) clearTimeout(autoplayTimeout);
            };
            s.resetAutoplay = function () {
                s.stopAutoplay();
                s.startAutoplay();
            };
        
            // init
            s.init = function () {
                s.updateSlides();
                s.updatePagination();
                s.updateSize();
                s.slideTo(s.params.initialSlide, 0);
                s.attachEvents();
                if (s.params.autoplay) s.startAutoplay();
            };
        
            // Destroy
            s.destroy = function () {
                s.detachEvents();
                if (s.params.onDestroy) s.params.onDestroy();
                s = undefined;
            };
        
            s.init();
        
            return s;
        };
        app.slider = function (container, params) {
            return new Slider(container, params);
        };
        app.initSlider = function (pageContainer) {
            var page = $(pageContainer);
            var sliders = page.find('.slider-init');
            if (sliders.length === 0) return;
            function destroySliderOnRemove(slider) {
                function destroySlider() {
                    slider.destroy();
                    page.off('pageBeforeRemove', destroySlider);
                }
                page.on('pageBeforeRemove', destroySlider);
            }
            for (var i = 0; i < sliders.length; i++) {
                var slider = sliders.eq(i);
                var params;
                if (slider.data('slider')) {
                    params = JSON.parse(slider.data('slider'));
                }
                else {
                    params = {
                        initialSlide: parseInt(slider.data('initialSlide'), 10) || undefined,
                        spaceBetween: parseInt(slider.data('spaceBetween'), 10) || undefined,
                        speed: parseInt(slider.data('speed'), 10) || undefined,
                        slidesPerView: slider.data('slidesPerView'),
                        direction: slider.data('direction'),
                        pagination: slider.data('pagination'),
                        paginationHide: slider.data('paginationHide') && (slider.data('paginationHide') === 'true' ? true : false),
                        slideClass: slider.data('slideClass'),
                        slideActiveClass: slider.data('slideActiveClass'),
                        slideNextClass: slider.data('slideNextClass'),
                        slidePrevClass: slider.data('slidePrevClass'),
                        wrapperClass: slider.data('wrapperClass'),
                        bulletClass: slider.data('bulletClass'),
                        bulletActiveClass: slider.data('bulletActiveClass'),
                        nextButton: slider.data('nextButton'),
                        prevButton: slider.data('prevButton'),
                        indexButton: slider.data('indexButton'),
                        autoplay: slider.data('autoplay')
                    };
                }
                var _slider = app.slider(slider[0], params);
                destroySliderOnRemove(_slider);
            }
        };
        
        /*======================================================
        ************   Photo Browser   ************
        ======================================================*/
        var PhotoBrowser = function (params) {
            var pb = this, i;
        
            var defaults = {
                photos : [],
                initialSlide: 0,
                spaceBetween: 20,
                speed: 300,
                zoom: true,
                maxZoom: 3,
                minZoom: 1,
                exposition: true,
                expositionHideCaptions: false,
                type: 'standalone',
                navbar: true,
                toolbar: true,
                theme: 'light',
                swipeToClose: true,
                backLinkText: 'Close',
                ofText: 'of'
            };
            
            params = params || {};
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
        
            pb.params = params;
            
            function findView() {
                var view;
                for (i = 0; i < app.views.length; i ++) {
                    if (app.views[i].main) view = app.views[i];
                }
                return view;
            }
        
            var iconColor = pb.params.theme === 'dark' ? 'color-white' : '';
        
            var navbarTemplate = pb.params.navbarTemplate ||
                                '<div class="navbar">' +
                                    '<div class="navbar-inner">' +
                                        '<div class="left sliding"><a href="#" class="link ' + (pb.params.type === 'page' && 'back') + ' close-popup photo-browser-close-link" data-popup=".photo-browser-popup"><i class="icon icon-back ' + iconColor + '"></i><span>' + pb.params.backLinkText + '</span></a></div>' +
                                        '<div class="center sliding"><span class="photo-browser-current"></span> <span class="photo-browser-of">' + pb.params.ofText + '</span> <span class="photo-browser-total"></span></div>' +
                                        '<div class="right"></div>' +
                                    '</div>' +
                                '</div>';
            var prevIconClassName = app.rtl ? 'next' : 'prev';
            var nextIconClassName = app.rtl ? 'prev' : 'next';
            var toolbarTemplate = pb.params.toolbarTemplate ||
                                '<div class="toolbar tabbar">' +
                                    '<div class="toolbar-inner">' +
                                        '<a href="#" class="link photo-browser-prev"><i class="icon icon-' + prevIconClassName + ' ' + iconColor + '"></i></a>' +
                                        '<a href="#" class="link photo-browser-next"><i class="icon icon-' + nextIconClassName + ' ' + iconColor + '"></i></a>' +
                                    '</div>' +
                                '</div>';
        
            var template = pb.params.template ||
                            '<div class="photo-browser photo-browser-' + pb.params.theme + '">' +
                                '<div class="view navbar-fixed toolbar-fixed">' +
                                    '{{navbar}}' +
                                    '<div data-page="photo-browser-slides" class="page no-toolbar {{noNavbar}} toolbar-fixed navbar-fixed">' +
                                        '{{toolbar}}' +
                                        '{{captions}}' +
                                        '<div class="photo-browser-slider-container slider-container">' +
                                            '<div class="photo-browser-slider-wrapper slider-wrapper">' +
                                                '{{photos}}' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
        
            var photoTemplate = pb.params.photoTemplate || '<div class="photo-browser-slide slider-slide"><span class="photo-browser-zoom-container"><img src="{{url}}"></span></div>';
            var captionsTheme = pb.params.captionsTheme || pb.params.theme;
            var captionsTemplate = pb.params.captionsTemplate || '<div class="photo-browser-captions photo-browser-captions-' + captionsTheme + '">{{captions}}</div>';
            var captionTemplate = pb.params.captionTemplate || '<div class="photo-browser-caption" data-caption-index="{{captionIndex}}">{{caption}}</div>';
        
            var objectTemplate = pb.params.objectTemplate || '<div class="photo-browser-slide photo-browser-object-slide slider-slide">{{html}}</div>';
            var photosHtml = '';
            var captionsHtml = '';
            for (i = 0; i < pb.params.photos.length; i ++) {
                var photo = pb.params.photos[i];
                var thisTemplate = '';
        
                //check if photo is a string or string-like object, for backwards compatibility 
                if (typeof(photo) === 'string' || photo instanceof String) {
        
                    //check if "photo" is html object
                    if (photo.indexOf('<') >= 0 || photo.indexOf('>') >= 0) {
                        thisTemplate = objectTemplate.replace(/{{html}}/g, photo);
                    } else {
                        thisTemplate = photoTemplate.replace(/{{url}}/g, photo);
                    }
        
                    //photo is a string, thus has no caption, so remove the caption template placeholder
                    // captionsHtml += captionTemplate.replace(/{{caption}}/g, '');
        
                    //otherwise check if photo is an object with a url property
                } else if (typeof(photo) === 'object') {
        
                    //check if "photo" is html object
                    if (photo.hasOwnProperty('html') && photo.html.length > 0) {
                        thisTemplate = objectTemplate.replace(/{{html}}/g, photo.html);
                    } else if (photo.hasOwnProperty('url') && photo.url.length > 0) {
                        thisTemplate = photoTemplate.replace(/{{url}}/g, photo.url);
                    }
        
                    //check if photo has a caption
                    if (photo.hasOwnProperty('caption') && photo.caption.length > 0) {
                        captionsHtml += captionTemplate.replace(/{{caption}}/g, photo.caption).replace(/{{captionIndex}}/g, i);
                    } else {
                        thisTemplate = thisTemplate.replace(/{{caption}}/g, '');
                        // captionsHtml += captionTemplate.replace(/{{caption}}/g, '');
                    }
                }
        
                photosHtml += thisTemplate;
        
            }
        
            var htmlTemplate = template
                                .replace('{{navbar}}', (pb.params.navbar ? navbarTemplate : ''))
                                .replace('{{noNavbar}}', (pb.params.navbar ? '' : 'no-navbar'))
                                .replace('{{photos}}', photosHtml)
                                .replace('{{captions}}', captionsTemplate.replace(/{{captions}}/g, captionsHtml))
                                .replace('{{toolbar}}', (pb.params.toolbar ? toolbarTemplate : ''));
        
            pb.activeSlideIndex = pb.params.initialSlide;
            pb.openIndex = pb.activeSlideIndex;
            pb.opened = false;
        
            pb.open = function (index) {
                if (typeof index === 'undefined') index = pb.activeSlideIndex;
                index = parseInt(index, 10);
                if (pb.opened && pb.slider) {
                    pb.slider.slideTo(index);
                    return;
                }
                pb.opened = true;
                pb.openIndex = index;
                if (pb.params.type === 'standalone') {
                    $('body').append(htmlTemplate);
                }
                if (pb.params.type === 'popup') {
                    pb.popup = app.popup('<div class="popup photo-browser-popup">' + htmlTemplate + '</div>');
                    $(pb.popup).on('closed', pb.onPopupClose);
                }
                if (pb.params.type === 'page') {
                    $(document).on('pageBeforeInit', pb.onPageBeforeInit);
                    $(document).on('pageBeforeRemove', pb.onPageBeforeRemove);
                    if (!pb.params.view) pb.params.view = findView();
                    pb.params.view.loadContent(htmlTemplate);
                    return;
                }
                pb.layout(pb.openIndex);
                if (pb.params.onOpen) {
                    pb.params.onOpen(pb);
                }
        
            };
            pb.close = function () {
                pb.opened = false;
                if (!pb.sliderContainer || pb.sliderContainer.length === 0) {
                    return;
                }
                if (pb.params.onClose) {
                    pb.params.onClose(pb);
                }
                // Detach events
                pb.attachEvents(true);
                // Delete from DOM
                if (pb.params.type === 'standalone') {
                    pb.container.removeClass('photo-browser-in').addClass('photo-browser-out').animationEnd(function () {
                        pb.container.remove();
                    });
                }
                // Destroy slider
                pb.slider.destroy();
                // Delete references
                pb.slider = pb.sliderContainer = pb.sliderWrapper = pb.slides = gestureSlide = gestureImg = gestureImgWrap = undefined;
            };
        
            pb.onPopupClose = function (e) {
                pb.close();
                $(pb.popup).off('pageBeforeInit', pb.onPopupClose);
            };
            pb.onPageBeforeInit = function (e) {
                if (e.detail.page.name === 'photo-browser-slides') {
                    pb.layout(pb.openIndex);
                }
                $(document).off('pageBeforeInit', pb.onPageBeforeInit);
            };
            pb.onPageBeforeRemove = function (e) {
                if (e.detail.page.name === 'photo-browser-slides') {
                    pb.close();
                }
                $(document).off('pageBeforeRemove', pb.onPageBeforeRemove);
            };
        
            pb.layout = function (index) {
                if (pb.params.type === 'page') {
                    pb.container = $('.photo-browser-slider-container').parents('.view');
                }
                else {
                    pb.container = $('.photo-browser');
                }
                if (pb.params.type === 'standalone') {
                    pb.container.addClass('photo-browser-in');
                    app.sizeNavbars(pb.container);
                }
                pb.sliderContainer = pb.container.find('.photo-browser-slider-container');
                pb.sliderWrapper = pb.container.find('.photo-browser-slider-wrapper');
                pb.slides = pb.container.find('.photo-browser-slide');
                pb.captionsContainer = pb.container.find('.photo-browser-captions');
                pb.captions = pb.container.find('.photo-browser-caption');
                
                var sliderSettings = {
                    nextButton: pb.params.nextButton || '.photo-browser-next',
                    prevButton: pb.params.prevButton || '.photo-browser-prev',
                    indexButton: pb.params.indexButton,
                    initialSlide: index,
                    spaceBetween: pb.params.spaceBetween,
                    speed: pb.params.speed,
                    onTap: function (slider, e) {
                        if (pb.params.onTap) pb.params.onTap(slider, e);
                    },
                    onClick: function (slider, e) {
                        if (pb.params.exposition) pb.toggleExposition();
                        if (pb.params.onClick) pb.params.onClick(slider, e);
                    },
                    onDoubleTap: function (slider, e) {
                        pb.toggleZoom($(e.target).parents('.photo-browser-slide'));
                        if (pb.params.onDoubleTap) pb.params.onDoubleTap(slider, e);
                    },
                    onSlideChangeStart: function (slider) {
                        pb.activeSlideIndex = slider.activeSlideIndex;
                        pb.container.find('.photo-browser-current').text(slider.activeSlideIndex + 1);
                        pb.container.find('.photo-browser-total').text(slider.slides.length);
        
                        $('.photo-browser-prev, .photo-browser-next').removeClass('photo-browser-link-inactive');
                        if (slider.isFirst) {
                            $('.photo-browser-prev').addClass('photo-browser-link-inactive');
                        }
                        if (slider.isLast) {
                            $('.photo-browser-next').addClass('photo-browser-link-inactive');
                        }
        
                        // Update captions
                        if (pb.captions.length > 0) {
                            pb.captionsContainer.find('.photo-browser-caption-active').removeClass('photo-browser-caption-active');
                            pb.captionsContainer.find('[data-caption-index="' + pb.activeSlideIndex + '"]').addClass('photo-browser-caption-active');
                        }
        
                        // Stop Video
                        var previousSlideVideo = slider.slides.eq(slider.previousSlideIndex).find('video');
                        if (previousSlideVideo.length > 0) {
                            if ('pause' in previousSlideVideo[0]) previousSlideVideo[0].pause();
                        }
                        // Callback
                        if (pb.params.onSlideChangeStart) pb.params.onSlideChangeStart(slider);
                    },
                    onSlideChangeEnd: function (slider) {
                        // Reset zoom
                        if (pb.params.zoom && gestureSlide && slider.previousSlideIndex !== slider.activeSlideIndex) {
                            gestureImg.transform('translate3d(0,0,0) scale(1)');
                            gestureImgWrap.transform('translate3d(0,0,0)');
                            gestureSlide = gestureImg = gestureImgWrap = undefined;
                            scale = currentScale = 1;
                        }
                        if (pb.params.onSlideChangeEnd) pb.params.onSlideChangeEnd(slider);
                    },
                };
        
                if (pb.params.swipeToClose && pb.params.type !== 'page') {
                    sliderSettings.onTouchStart = pb.swipeCloseTouchStart;
                    sliderSettings.onOppositeTouchMove = pb.swipeCloseTouchMove;
                    sliderSettings.onTouchEnd = pb.swipeCloseTouchEnd;
                }
        
                pb.slider = app.slider(pb.sliderContainer, sliderSettings);
                pb.attachEvents();
            };
            pb.attachEvents = function (detach) {
                var action = detach ? 'off' : 'on';
                // Slide between photos
        
                if (pb.params.zoom) {
                    // Scale image
                    pb.slides[action]('gesturestart', pb.onSlideGestureStart);
                    pb.slides[action]('gesturechange', pb.onSlideGestureChange);
                    pb.slides[action]('gestureend', pb.onSlideGestureEnd);
        
                    // Move image
                    pb.slides[action](app.touchEvents.start, pb.onSlideTouchStart);
                    pb.slides[action](app.touchEvents.move, pb.onSlideTouchMove);
                    pb.slides[action](app.touchEvents.end, pb.onSlideTouchEnd);
                }
                pb.container.find('.photo-browser-close-link')[action]('click', pb.close);
            };
        
            var isTouched, isMoved, touchesStart = {}, touchesCurrent = {}, touchStartTime, isScrolling, animating = false, currentTranslate;
            var allowClick = true;
        
            // Expose
            pb.exposed = false;
            pb.toggleExposition = function () {
                if (pb.container) pb.container.toggleClass('photo-browser-exposed');
                if (pb.params.expositionHideCaptions) pb.captionsContainer.toggleClass('photo-browser-captions-exposed');
                pb.exposed = !pb.exposed;
            };
            pb.expositionOn = function () {
                if (pb.container) pb.container.addClass('photo-browser-exposed');
                if (pb.params.expositionHideCaptions) pb.captionsContainer.addClass('photo-browser-captions-exposed');
                pb.exposed = true;
            };
            pb.expositionOff = function () {
                if (pb.container) pb.container.removeClass('photo-browser-exposed');
                if (pb.params.expositionHideCaptions) pb.captionsContainer.removeClass('photo-browser-captions-exposed');
                pb.exposed = false;
            };
            
            // Gestures
            var gestureSlide, gestureImg, gestureImgWrap, scale = 1, currentScale = 1, isScaling = false;
            pb.onSlideGestureStart = function (e) {
                if (!gestureSlide) {
                    gestureSlide = $(this);
                    gestureImg = gestureSlide.find('img');
                    gestureImgWrap = gestureImg.parent();
                }
                gestureImg.transition(0);
                isScaling = true;
            };
            pb.onSlideGestureChange = function (e) {
                scale = e.scale * currentScale;
                if (scale > pb.params.maxZoom) {
                    scale = pb.params.maxZoom - 1 + Math.pow((scale - pb.params.maxZoom + 1), 0.5);
                }
                if (scale < pb.params.minZoom) {
                    scale =  pb.params.minZoom + 1 - Math.pow((pb.params.minZoom - scale + 1), 0.5);
                }
                gestureImg.transform('translate3d(0,0,0) scale(' + scale + ')');
            };
            pb.onSlideGestureEnd = function (e) {
                scale = Math.max(Math.min(scale, pb.params.maxZoom), pb.params.minZoom);
                gestureImg.transition(pb.params.speed).transform('translate3d(0,0,0) scale(' + scale + ')');
                currentScale = scale;
                isScaling = false;
                if (scale === 1) gestureSlide = undefined;
            };
            pb.toggleZoom = function () {
                if (!gestureSlide) {
                    gestureSlide = pb.slides.eq(pb.slider.activeSlideIndex);
                    gestureImg = gestureSlide.find('img');
                    gestureImgWrap = gestureImg.parent();
                }
                gestureImgWrap.transition(300).transform('translate3d(0,0,0)');
                if (scale && scale !== 1) {
                    scale = currentScale = 1;
                    gestureImg.transition(300).transform('translate3d(0,0,0) scale(1)');
                    gestureSlide = undefined;
                }
                else {
                    scale = currentScale = pb.params.maxZoom;
                    gestureImg.transition(300).transform('translate3d(0,0,0) scale(' + scale + ')');
                }
            };
        
            var imageIsTouched, imageIsMoved, imageCurrentX, imageCurrentY, imageMinX, imageMinY, imageMaxX, imageMaxY, imageWidth, imageHeight, imageTouchesStart = {}, imageTouchesCurrent = {}, imageStartX, imageStartY, velocityPrevPositionX, velocityPrevTime, velocityX, velocityPrevPositionY, velocityY;
        
            pb.onSlideTouchStart = function (e) {
                if (imageIsTouched) return;
                if (app.device.os === 'android') e.preventDefault();
                imageIsTouched = true;
                imageTouchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                imageTouchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            };
            pb.onSlideTouchMove = function (e) {
                pb.slider.allowClick = false;
                if (!imageIsTouched || !gestureSlide) return;
        
                if (!imageIsMoved) {
                    imageWidth = gestureImg[0].offsetWidth;
                    imageHeight = gestureImg[0].offsetHeight;
                    imageStartX = $.getTranslate(gestureImgWrap[0], 'x') || 0;
                    imageStartY = $.getTranslate(gestureImgWrap[0], 'y') || 0;
                    gestureImgWrap.transition(0);
                }
                // Define if we need image drag
                var scaledWidth = imageWidth * scale;
                var scaledHeight = imageHeight * scale;
        
                if (scaledWidth < pb.slider.width && scaledHeight < pb.slider.height) return;
        
                imageMinX = Math.min((pb.slider.width / 2 - scaledWidth / 2), 0);
                imageMaxX = -imageMinX;
                imageMinY = Math.min((pb.slider.height / 2 - scaledHeight / 2), 0);
                imageMaxY = -imageMinY;
                
                imageTouchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                imageTouchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
                if (!imageIsMoved && !isScaling) {
                    if (
                        (Math.floor(imageMinX) === Math.floor(imageStartX) && imageTouchesCurrent.x < imageTouchesStart.x) ||
                        (Math.floor(imageMaxX) === Math.floor(imageStartX) && imageTouchesCurrent.x > imageTouchesStart.x)
                        ) {
                        imageIsTouched = false;
                        return;
                    }
                }
                
                e.stopPropagation();
                imageIsMoved = true;
                imageCurrentX = imageTouchesCurrent.x - imageTouchesStart.x + imageStartX;
                imageCurrentY = imageTouchesCurrent.y - imageTouchesStart.y + imageStartY;
                
                
                if (imageCurrentX < imageMinX) {
                    imageCurrentX =  imageMinX + 1 - Math.pow((imageMinX - imageCurrentX + 1), 0.8);
                }
                if (imageCurrentX > imageMaxX) {
                    imageCurrentX = imageMaxX - 1 + Math.pow((imageCurrentX - imageMaxX + 1), 0.8);
                }
                
                if (imageCurrentY < imageMinY) {
                    imageCurrentY =  imageMinY + 1 - Math.pow((imageMinY - imageCurrentY + 1), 0.8);
                }
                if (imageCurrentY > imageMaxY) {
                    imageCurrentY = imageMaxY - 1 + Math.pow((imageCurrentY - imageMaxY + 1), 0.8);
                }
        
                //Velocity
                if (!velocityPrevPositionX) velocityPrevPositionX = imageTouchesCurrent.x;
                if (!velocityPrevPositionY) velocityPrevPositionY = imageTouchesCurrent.y;
                if (!velocityPrevTime) velocityPrevTime = Date.now();
                velocityX = (imageTouchesCurrent.x - velocityPrevPositionX) / (Date.now() - velocityPrevTime) / 2;
                velocityY = (imageTouchesCurrent.y - velocityPrevPositionY) / (Date.now() - velocityPrevTime) / 2;
                if (Math.abs(imageTouchesCurrent.x - velocityPrevPositionX) < 2) velocityX = 0;
                if (Math.abs(imageTouchesCurrent.y - velocityPrevPositionY) < 2) velocityY = 0;
                velocityPrevPositionX = imageTouchesCurrent.x;
                velocityPrevPositionY = imageTouchesCurrent.y;
                velocityPrevTime = Date.now();
        
                gestureImgWrap.transform('translate3d(' + imageCurrentX + 'px, ' + imageCurrentY + 'px,0)');
            };
            pb.onSlideTouchEnd = function (e) {
                if (!imageIsTouched || !imageIsMoved) {
                    imageIsTouched = false;
                    imageIsMoved = false;
                    return;
                }
                imageIsTouched = false;
                imageIsMoved = false;
                var momentumDurationX = 300;
                var momentumDurationY = 300;
                var momentumDistanceX = velocityX * momentumDurationX;
                var newPositionX = imageCurrentX + momentumDistanceX;
                var momentumDistanceY = velocityY * momentumDurationY;
                var newPositionY = imageCurrentY + momentumDistanceY;
        
                //Fix duration
                if (velocityX !== 0) momentumDurationX = Math.abs((newPositionX - imageCurrentX) / velocityX);
                if (velocityY !== 0) momentumDurationY = Math.abs((newPositionY - imageCurrentY) / velocityY);
                var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
        
                imageCurrentX = newPositionX;
                imageCurrentY = newPositionY;
        
                // Define if we need image drag
                var scaledWidth = imageWidth * scale;
                var scaledHeight = imageHeight * scale;
                imageMinX = Math.min((pb.slider.width / 2 - scaledWidth / 2), 0);
                imageMaxX = -imageMinX;
                imageMinY = Math.min((pb.slider.height / 2 - scaledHeight / 2), 0);
                imageMaxY = -imageMinY;
                imageCurrentX = Math.max(Math.min(imageCurrentX, imageMaxX), imageMinX);
                imageCurrentY = Math.max(Math.min(imageCurrentY, imageMaxY), imageMinY);
        
                gestureImgWrap.transition(momentumDuration).transform('translate3d(' + imageCurrentX + 'px, ' + imageCurrentY + 'px,0)');
            };
        
            // Swipe Up To Close
            var swipeToCloseIsTouched = false;
            var allowSwipeToClose = true;
            var swipeToCloseDiff, swipeToCloseStart, swipeToCloseCurrent, swipeToCloseStarted = false, swipeToCloseActiveSlide, swipeToCloseTimeStart;
            pb.swipeCloseTouchStart = function (slider, e) {
                if (!allowSwipeToClose) return;
                swipeToCloseIsTouched = true;
            };
            pb.swipeCloseTouchMove = function (slider, e) {
                if (!swipeToCloseIsTouched) return;
                if (!swipeToCloseStarted) {
                    swipeToCloseStarted = true;
                    swipeToCloseStart = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    swipeToCloseActiveSlide = pb.slider.slides.eq(pb.slider.activeSlideIndex);
                    swipeToCloseTimeStart = (new Date()).getTime();
                }
                e.preventDefault();
                swipeToCloseCurrent = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                swipeToCloseDiff = swipeToCloseStart - swipeToCloseCurrent;
                var opacity = 1 - Math.abs(swipeToCloseDiff) / 300;
                swipeToCloseActiveSlide.transform('translate3d(0,' + (-swipeToCloseDiff) + 'px,0)');
                pb.slider.container.css('opacity', opacity).transition(0);
            };
            pb.swipeCloseTouchEnd = function (slider, e) {
                swipeToCloseIsTouched = false;
                if (!swipeToCloseStarted) {
                    swipeToCloseStarted = false;
                    return;
                }
                swipeToCloseStarted = false;
                allowSwipeToClose = false;
                var diff = Math.abs(swipeToCloseDiff);
                var timeDiff = (new Date()).getTime() - swipeToCloseTimeStart;
                if ((timeDiff < 300 && diff > 20) || (timeDiff >= 300 && diff > 100)) {
                    setTimeout(function () {
                        if (pb.params.type === 'standalone') {
                            pb.close();
                        }
                        if (pb.params.type === 'popup') {
                            app.closeModal(pb.popup);
                        }
                        if (pb.params.onSwipeToClose) {
                            pb.params.onSwipeToClose(pb);
                        }
                        allowSwipeToClose = true;
                    }, 0);
                    return;
                }
                if (diff !== 0) {
                    swipeToCloseActiveSlide.addClass('transitioning').transitionEnd(function () {
                        allowSwipeToClose = true;
                        swipeToCloseActiveSlide.removeClass('transitioning');
                    });
                }
                else {
                    allowSwipeToClose = true;
                }
                pb.slider.container.css('opacity', '').transition('');
                swipeToCloseActiveSlide.transform('');
            };
        
            return pb;
        };
        
        app.photoBrowser = function (params) {
            return new PhotoBrowser(params);
        };
        
        /*======================================================
        ************   Notifications   ************
        ======================================================*/
        var _tempNotificationElement;
        app.addNotification = function (params) {
            if (!params) return;
            
            if (typeof params.media === 'undefined') params.media = app.params.notificationMedia;
            if (typeof params.title === 'undefined') params.title = app.params.notificationTitle;
            if (typeof params.subtitle === 'undefined') params.subtitle = app.params.notificationSubtitle;
            if (typeof params.closeIcon === 'undefined') params.closeIcon = app.params.notificationCloseIcon;
            if (typeof params.hold === 'undefined') params.hold = app.params.notificationHold;
            if (typeof params.closeOnClick === 'undefined') params.closeOnClick = app.params.notificationCloseOnClick;
        
            if (!_tempNotificationElement) _tempNotificationElement = document.createElement('div');
        
            var container = $('.notifications');
            if (container.length === 0) {
                $('body').append('<div class="notifications list-block media-list"><ul></ul></div>');
                container = $('.notifications');
            }
            var list = container.children('ul');
        
            var itemHTML;
            if (params.custom) {
                itemHTML = '<li>' + params.custom + '</li>';
            }
            else {
                itemHTML = '<li class="notification-item notification-hidden"><div class="item-content">' +
                                (params.media ?
                                '<div class="item-media">' +
                                    params.media +
                                '</div>' : '') +
                                '<div class="item-inner">' +
                                    '<div class="item-title-row">' +
                                        (params.title ? '<div class="item-title">' + params.title + '</div>' : '') +
                                        (params.closeIcon ? '<div class="item-after"><a href="#" class="close-notification"><span></span></a></div>' : '') +
                                    '</div>' +
                                    (params.subtitle ? '<div class="item-subtitle">' + params.subtitle + '</div>' : '') +
                                    (params.message ? '<div class="item-text">' + params.message + '</div>' : '') +
                                '</div>' +
                            '</div></li>';
            }
            _tempNotificationElement.innerHTML = itemHTML;
        
            var item = $(_tempNotificationElement).children();
        
            item.on('click', function (e) {
                if (params.onClick) params.onClick(e, item[0]);
                if (params.closeOnClick) app.closeNotification(item[0]);
                else if ($(e.target).is('.close-notification') || $(e.target).parents('.close-notification').length > 0) app.closeNotification(item[0]);
            });
            if (params.onClose) {
                item.data('f7NotificationOnClose', function () {
                    params.onClose(item[0]);
                });
            }
            if (params.additionalClass) {
                item.addClass(params.additionalClass);
            }
            if (params.hold) {
                setTimeout(function () {
                    if (item.length > 0) app.closeNotification(item[0]);
                }, params.hold);
            }
        
            list.prepend(item[0]);
            container.show();
            
            var itemHeight = item.height();
            item.css('marginTop', -itemHeight + 'px');
            item.transition(0);
        
            var clientLeft = item[0].clientLeft;
            item.transition('');
            item.css('marginTop', '0px');
        
            container.transform('translate3d(0, 0,0)');
            item.removeClass('notification-hidden');
        
            return item[0];
        };
        app.closeNotification = function (item) {
            item = $(item);
            if (item.length === 0) return;
            if (item.hasClass('notification-item-removing')) return;
            var container = $('.notifications');
        
            var itemHeight = item.height();
            item.css('height', itemHeight + 'px').transition(0);
            var clientLeft = item[0].clientLeft;
        
            item.css('height', '0px').transition('').addClass('notification-item-removing');
            if (item.data('f7NotificationOnClose')) item.data('f7NotificationOnClose')();
        
            if (container.find('.notification-item:not(.notification-item-removing)').length === 0) {
                container.transform('');
            }
        
            item.addClass('notification-hidden').transitionEnd(function () {
                item.remove();
                if (container.find('.notification-item').length === 0) {
                    container.hide();
                }
            });
        };
        /*=======================================
        ************   Plugins API   ************
        =======================================*/
        var _plugins = [];
        app.initPlugins = function () {
            // Initialize plugins
            for (var plugin in app.plugins) {
                var p = app.plugins[plugin](app, app.params[plugin]);
                if (p) _plugins.push(p);
            }
        };
        // Plugin Hooks
        app.pluginHook = function (hook) {
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].hooks && hook in _plugins[i].hooks) {
                    _plugins[i].hooks[hook](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };
        // Prevented by plugin
        app.pluginPrevent = function (action) {
            var prevent = false;
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].prevents && action in _plugins[i].prevents) {
                    if (_plugins[i].prevents[action](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])) prevent = true;
                }
            }
            return prevent;
        };
        // Preprocess content by plugin
        app.pluginProcess = function (action, data) {
            var processed = data;
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].preprocess && process in _plugins[i].preprocess) {
                    processed = _plugins[i].preprocess[process](data, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                }
            }
            return processed;
        };
        
        
        /*======================================================
        ************   App Init   ************
        ======================================================*/
        app.init = function () {
            // Init Plugins
            if (app.initPlugins) app.initPlugins();
            
            // Init Device
            if (app.getDeviceInfo) app.getDeviceInfo();
            
            // Init Click events
            if (app.initFastClicks && app.params.fastClicks) app.initFastClicks();
            if (app.initClickEvents) app.initClickEvents();
        
            // Init each page callbacks
            $('.page').each(function () {
                var pageContainer = $(this);
                var viewContainer = pageContainer.parents('.' + app.params.viewClass);
                if (viewContainer.length === 0) return;
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
        
            // Init Live Swipeouts events
            if (app.initSwipeout && app.params.swipeout) app.initSwipeout();
        
            // Init Live Sortable events
            if (app.initSortable && app.params.sortable) app.initSortable();
        
            // Init Live Swipe Panels
            if (app.initSwipePanels && app.params.swipePanel) app.initSwipePanels();
            
            // App Init callback
            if (app.params.onAppInit) app.params.onAppInit();
        
            // Plugin app init hook
            app.pluginHook('appInit');
        };
        if (app.params.init) app.init();
        
        //Return instance        
        return app;
    };
    
    /*===========================
    Dom7 Library
    ===========================*/
    var Dom7 = (function () {
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
        var $ = function (selector, context) {
            var arr = [], i = 0;
            if (selector && !context) {
                if (selector instanceof Dom7) {
                    return selector;
                }
            }
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
        Dom7.prototype = {
            // Classes and attriutes
            addClass: function (className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function (className) {
                if (typeof className === 'undefined') {
                    return this.removeAttr('class');
                }
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
                else return this[0].classList.contains(className);
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
                    if (this[0]) return this[0].getAttribute(attr);
                    else return undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].setAttribute(attr, value);
                    }
                    return this;
                }
            },
            removeAttr: function (attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
            },
            prop: function (prop, value) {
                if (typeof value === 'undefined') {
                    if (this[0]) return this[0][prop];
                    else return undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i][prop] = value;
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
                        else if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) return this[0].dom7ElementDataStorage[key];
                        else return undefined;
                    }
                    else return undefined;
                }
                else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
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
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                            this[i].addEventListener(events[j], handleLiveEvent, false);
                        }
                    }
                }
        
                return this;
            },
            off: function (eventName, listener) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (arguments.length === 3) {
                            var _targetSelector = arguments[1];
                            var _listener = arguments[2];
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === _listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, false);
                                    }
                                }
                            }
                        }
                        else {
                            this[j].removeEventListener(events[i], listener, false);
                        }
                    }
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
                if (!this[0]) return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === document) return selector === document;
                    if (el === window) return selector === window;
        
                    if (el.matches) return el.matches(selector);
                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                    else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                }
                else if (selector === document) return this[0] === document;
                else if (selector === window) return this[0] === window;
                else {
                    if (selector.nodeType || selector instanceof Dom7) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
                
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
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
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
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    }
                    else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            prepend: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
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
            next: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            nextAll: function (selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector && $(next).is(selector)) nextEls.push(next);
                    else nextEls.push(next);
                    el = next;
                }
                return new Dom7(nextEls);
            },
            prev: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            prevAll: function (selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector && $(prev).is(selector)) prevEls.push(prev);
                    else prevEls.push(prev);
                    el = prev;
                }
                return new Dom7(prevEls);
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
            detach: function () {
                return this.remove();
            }
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
        
        // Ajax
        var _jsonpRequests = 0;
        $.ajax = function (options) {
            var defaults = {
                method: 'GET',
                data: false,
                async: true,
                cache: true,
                user: '',
                password: '',
                headers: {},
                xhrFields: {},
                statusCode: {},
                processData: true,
                dataType: 'text',
                contentType: 'application/x-www-form-urlencoded'
            };
        
            //For jQuery guys
            if (options.type) options.type = options.method;
        
            // Merge options and defaults
            for (var prop in defaults) {
                if (!(prop in options)) options[prop] = defaults[prop];
            }
        
            // Default URL
            if (!options.url) {
                options.url = window.location.toString();
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
                
                var callbackName = 'f7jsonp_' + Date.now() + (_jsonpRequests++);
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
        
            // Check for crossDomain
            if (typeof options.crossDomain === 'undefined') {
                options.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== window.location.host;
            }
        
            if (!options.crossDomain) {
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            }
        
            if (options.xhrFields) {
                for (var field in options.xhrFields) {
                    xhr[field] = options.xhrFields[field];
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
        // Shrotcuts
        (function () {
            var methods = ('get post getJSON').split(' ');
            function createMethod(method) {
                $[method] = function (url, data, success) {
                    return $.ajax({
                        url: url,
                        method: method === 'post' ? 'POST' : 'GET',
                        data: typeof data === 'function' ? undefined : data,
                        success: typeof data === 'function' ? data : success,
                        dataType: method === 'getJSON' ? 'json' : undefined
                    });
                };
            }
            for (var i = 0; i < methods.length; i++) {
                createMethod(methods[i]);
            }
        })();
        // DOM Library Utilites
        $.parseUrlQuery = function (url) {
            var query = {}, i, params, param;
            if (url.indexOf('?') >= 0) url = url.split('?')[1];
            else return query;
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
        
        $.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;
        
            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }
        
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new WebKitCSSMatrix(curStyle.webkitTransform === 'none' ? '' : curStyle.webkitTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
        
            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[5]);
            }
            
            return curTransform || 0;
        };
        
        $.requestAnimationFrame = function (callback) {
            if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
            else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
            else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
            else {
                return window.setTimeout(callback, 1000 / 60);
            }
        };
        $.supportTouch = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
        
        // Link to prototype
        $.fn = Dom7.prototype;
        
        // Plugins
        $.fn.scrollTo = function (left, top, duration) {
            return this.each(function () {
                var el = this;
                var currentTop, currentLeft, maxTop, maxLeft, newTop, newLeft, scrollTop, scrollLeft;
                var animateTop = top > 0 || top === 0;
                var animateLeft = left > 0 || left === 0;
                if (animateTop) {
                    currentTop = el.scrollTop;
                    if (!duration) {
                        el.scrollTop = top;
                    }
                }
                if (animateLeft) {
                    currentLeft = el.scrollLeft;
                    if (!duration) {
                        el.scrollLeft = left;
                    }
                }
                if (!duration) return;
                if (animateTop) {
                    maxTop = el.scrollHeight - el.offsetHeight;
                    newTop = Math.max(Math.min(top, maxTop), 0);
                }
                if (animateLeft) {
                    maxLeft = el.scrollWidth - el.offsetWidth;
                    newLeft = Math.max(Math.min(left, maxLeft), 0);
                }
                var startTime = null;
                if (animateTop && newTop === currentTop) animateTop = false;
                if (animateLeft && newLeft === currentLeft) animateLeft = false;
                function render(time) {
                    if (time === undefined) {
                        time = new Date().getTime();
                    }
                    if (startTime === null) {
                        startTime = time;
                    }
                    var doneLeft, doneTop, done;
                    if (animateTop) scrollTop = currentTop + ((time - startTime) / duration * (newTop - currentTop));
                    if (animateLeft) scrollLeft = currentLeft + ((time - startTime) / duration * (newLeft - currentLeft));
        
                    if (animateTop && newTop > currentTop && scrollTop >= newTop)  {
                        el.scrollTop = newTop;
                        done = true;
                    }
                    if (animateTop && newTop < currentTop && scrollTop <= newTop)  {
                        el.scrollTop = newTop;
                        done = true;
                    }
        
                    if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft)  {
                        el.scrollLeft = newLeft;
                        done = true;
                    }
                    if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft)  {
                        el.scrollLeft = newLeft;
                        done = true;
                    }
        
                    if (done) return;
                    if (animateTop) el.scrollTop = scrollTop;
                    if (animateLeft) el.scrollLeft = scrollLeft;
                    $.requestAnimationFrame(render);
                }
                $.requestAnimationFrame(render);
            });
        };
        $.fn.scrollTop = function (top, duration) {
            var dom = this;
            if (typeof top === 'undefined') {
                if (dom.length > 0) return dom[0].scrollTop;
                else return null;
            }
            return dom.scrollTo(undefined, top, duration);
        };
        $.fn.scrollLeft = function (left, duration) {
            var dom = this;
            if (typeof left === 'undefined') {
                if (dom.length > 0) return dom[0].scrollLeft;
                else return null;
            }
            return dom.scrollTo(left, undefined, duration);
        };
        return $;
    })();
    
    // Export Dom7 to Framework7
    Framework7.$ = Dom7;
    
    // Export to local scope
    var $ = Dom7;
    
    // Export to Window
    window.Dom7 = Dom7;
    
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
        var $ = Dom7;
    
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
    
        // Classes
        var classNames = [];
    
        // Pixel Ratio
        device.pixelRatio = window.devicePixelRatio || 1;
        if (device.pixelRatio >= 2) {
            classNames.push('retina');
        }
    
        // OS classes
        if (device.os) {
            classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
            if (device.os === 'ios') {
                var major = parseInt(device.osVersion.split('.')[0], 10);
                for (var i = major - 1; i >= 6; i--) {
                    classNames.push('ios-gt-' + i);
                }
            }
            
        }
        // Status bar classes
        if (device.statusBar) {
            classNames.push('with-statusbar-overlay');
        }
        else {
            $('html').removeClass('with-statusbar-overlay');
        }
    
        // Add html classes
        if (classNames.length > 0) $('html').addClass(classNames.join(' '));
    
        // Export object
        return device;
    })();
    
    /*===========================
    Plugins prototype
    ===========================*/
    Framework7.prototype.plugins = {};
    
})();