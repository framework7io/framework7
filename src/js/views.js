/*======================================================
************   Views   ************
======================================================*/
app.views = [];
var View = function (selector, params) {
    var defaults = {
        dynamicNavbar: false,
        domCache: false,
        linksView: undefined,
        reloadPages: false,
        uniqueHistory: app.params.uniqueHistory,
        uniqueHistoryIgnoreGetParameters: app.params.uniqueHistoryIgnoreGetParameters,
        allowDuplicateUrls: app.params.allowDuplicateUrls,
        swipeBackPage: app.params.swipeBackPage,
        swipeBackPageAnimateShadow: app.params.swipeBackPageAnimateShadow,
        swipeBackPageAnimateOpacity: app.params.swipeBackPageAnimateOpacity,
        swipeBackPageActiveArea: app.params.swipeBackPageActiveArea,
        swipeBackPageThreshold: app.params.swipeBackPageThreshold,
        animatePages: app.params.animatePages,
        preloadPreviousPage: app.params.preloadPreviousPage
    };
    var i;

    // Params
    params = params || {};

    // Disable dynamic navbar for material theme
    if (params.dynamicNavbar && app.params.material) params.dynamicNavbar = false;

    // Extend params with defaults
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

    // Fix Selector

    if (typeof selector !== 'string') {
        // Supposed to be HTMLElement or Dom7
        selector = (container.attr('id') ? '#' + container.attr('id') : '') + (container.attr('class') ? '.' + container.attr('class').replace(/ /g, '.').replace('.active', '') : '');
        view.selector = selector;
    }

    // Is main
    view.main = container.hasClass(app.params.viewMainClass);

    // Content cache
    view.contentCache = {};

    // Pages cache
    view.pagesCache = {};

    // Store View in element for easy access
    container[0].f7View = view;

    // Pages
    view.pagesContainer = container.find('.pages')[0];
    view.initialPages = [];
    view.initialPagesUrl = [];
    view.initialNavbars = [];
    if (view.params.domCache) {
        var initialPages = container.find('.page');
        for (i = 0; i < initialPages.length; i++) {
            view.initialPages.push(initialPages[i]);
            view.initialPagesUrl.push('#' + initialPages.eq(i).attr('data-page'));
        }
        if (view.params.dynamicNavbar) {
            var initialNavbars = container.find('.navbar-inner');
            for (i = 0; i < initialNavbars.length; i++) {
                view.initialNavbars.push(initialNavbars[i]);
            }
        }

    }

    view.allowPageChange = true;

    // Location
    var docLocation = document.location.href;

    // History
    view.history = [];
    var viewURL = docLocation;
    var pushStateSeparator = app.params.pushStateSeparator;
    var pushStateRoot = app.params.pushStateRoot;
    if (app.params.pushState && view.main) {
        if (pushStateRoot) {
            viewURL = pushStateRoot;
        }
        else {
            if (viewURL.indexOf(pushStateSeparator) >= 0 && viewURL.indexOf(pushStateSeparator + '#') < 0) viewURL = viewURL.split(pushStateSeparator)[0];
        }

    }

    // Active Page
    var currentPage, currentPageData;
    if (!view.activePage) {
        currentPage = $(view.pagesContainer).find('.page-on-center');
        if (currentPage.length === 0) {
            currentPage = $(view.pagesContainer).find('.page:not(.cached)');
            currentPage = currentPage.eq(currentPage.length - 1);
        }
        if (currentPage.length > 0) {
            currentPageData = currentPage[0].f7PageData;
        }
    }

    // View startup URL
    if (view.params.domCache && currentPage) {
        view.url = container.attr('data-url') || view.params.url || '#' + currentPage.attr('data-page');   
        view.pagesCache[view.url] = currentPage.attr('data-page');
    }
    else view.url = container.attr('data-url') || view.params.url || viewURL;

    // Update current page Data
    if (currentPageData) {
        currentPageData.view = view;
        currentPageData.url = view.url;
        if (view.params.domCache && view.params.dynamicNavbar && !currentPageData.navbarInnerContainer) {
            currentPageData.navbarInnerContainer = view.initialNavbars[view.initialPages.indexOf(currentPageData.container)];
        }
        view.activePage = currentPageData;
        currentPage[0].f7PageData = currentPageData;
    }

    // Store to history main view's url
    if (view.url) {
        view.history.push(view.url);
    }

    // Touch events
    var isTouched = false,
        isMoved = false,
        touchesStart = {},
        isScrolling,
        activePage = [],
        previousPage = [],
        viewContainerWidth,
        touchesDiff,
        allowViewTouchMove = true,
        touchStartTime,
        activeNavbar = [],
        previousNavbar = [],
        activeNavElements,
        previousNavElements,
        activeNavBackIcon,
        previousNavBackIcon,
        dynamicNavbar,
        pageShadow,
        el;

    view.handleTouchStart = function (e) {
        if (!allowViewTouchMove || !view.params.swipeBackPage || isTouched || app.swipeoutOpenedEl || !view.allowPageChange) return;
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
        if (isScrolling || e.f7PreventSwipeBack || app.preventSwipeBack) {
            isTouched = false;
            return;
        }
        if (!isMoved) {
            var cancel = false;
            // Calc values during first move fired
            viewContainerWidth = container.width();
            var target = $(e.target);
            var swipeout = target.hasClass('swipeout') ? target : target.parents('.swipeout');
            if (swipeout.length > 0) {
                if (!app.rtl && swipeout.find('.swipeout-actions-left').length > 0) cancel = true;
                if (app.rtl && swipeout.find('.swipeout-actions-right').length > 0) cancel = true;
            }
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

            if (view.params.swipeBackPageAnimateShadow && !app.device.android) {
                pageShadow = activePage.find('.swipeback-page-shadow');
                if (pageShadow.length === 0) {
                    pageShadow = $('<div class="swipeback-page-shadow"></div>');
                    activePage.append(pageShadow);
                }
            }

            if (dynamicNavbar) {
                activeNavbar = container.find('.navbar-on-center:not(.cached)');
                previousNavbar = container.find('.navbar-on-left:not(.cached)');
                activeNavElements = activeNavbar.find('.left, .center, .right, .subnavbar, .fading');
                previousNavElements = previousNavbar.find('.left, .center, .right, .subnavbar, .fading');
                if (app.params.animateNavBackIcon) {
                    activeNavBackIcon = activeNavbar.find('.left.sliding .back .icon');
                    previousNavBackIcon = previousNavbar.find('.left.sliding .back .icon');
                }
            }

            // Close/Hide Any Picker
            if ($('.picker-modal.modal-in').length > 0) {
                app.closeModal($('.picker-modal.modal-in'));
            }
        }
        e.f7PreventPanelSwipe = true;
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
        container.trigger('swipeBackMove', callbackData);

        // Transform pages
        var activePageTranslate = touchesDiff * inverter;
        var previousPageTranslate = (touchesDiff / 5 - viewContainerWidth / 5) * inverter;
        if (app.device.pixelRatio === 1) {
            activePageTranslate = Math.round(activePageTranslate);
            previousPageTranslate = Math.round(previousPageTranslate);
        }

        activePage.transform('translate3d(' + activePageTranslate + 'px,0,0)');
        if (view.params.swipeBackPageAnimateShadow && !app.device.android) pageShadow[0].style.opacity = 1 - 1 * percentage;

        previousPage.transform('translate3d(' + previousPageTranslate + 'px,0,0)');
        if (view.params.swipeBackPageAnimateOpacity) previousPage[0].style.opacity = 0.9 + 0.1 * percentage;

        // Dynamic Navbars Animation
        if (dynamicNavbar) {
            var i;
            for (i = 0; i < activeNavElements.length; i++) {
                el = $(activeNavElements[i]);
                if (!el.is('.subnavbar.sliding')) el[0].style.opacity = (1 - percentage * 1.3);
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
                if (!el.is('.subnavbar.sliding')) el[0].style.opacity = percentage * 1.3 - 0.3;
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
        // Swipe Back Callback
        var callbackData = {
            activePage: activePage[0],
            previousPage: previousPage[0],
            activeNavbar: activeNavbar[0],
            previousNavbar: previousNavbar[0]
        };
        if (pageChanged) {
            // Update View's URL
            var url = view.history[view.history.length - 2];
            view.url = url;

            // Page before animation callback
            app.pageBackCallback('before', view, {pageContainer: activePage[0], url: url, position: 'center', newPage: previousPage, oldPage: activePage, swipeBack: true});
            app.pageAnimCallback('before', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage, swipeBack: true});

            if (view.params.onSwipeBackBeforeChange) {
                view.params.onSwipeBackBeforeChange(callbackData);
            }
            container.trigger('swipeBackBeforeChange', callbackData);
        }
        else {
            if (view.params.onSwipeBackBeforeReset) {
                view.params.onSwipeBackBeforeReset(callbackData);
            }
            container.trigger('swipeBackBeforeReset', callbackData);
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
                if (app.params.pushState && view.main) history.back();
                // Page after animation callback
                app.pageBackCallback('after', view, {pageContainer: activePage[0], url: url, position: 'center', newPage: previousPage, oldPage: activePage, swipeBack: true});
                app.pageAnimCallback('after', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage, swipeBack: true});
                app.router.afterBack(view, activePage, previousPage);

                if (view.params.onSwipeBackAfterChange) {
                    view.params.onSwipeBackAfterChange(callbackData);
                }
                container.trigger('swipeBackAfterChange', callbackData);
            }
            else {
                if (view.params.onSwipeBackAfterReset) {
                    view.params.onSwipeBackAfterReset(callbackData);
                }
                container.trigger('swipeBackAfterReset', callbackData);
            }
            if (pageShadow && pageShadow.length > 0) pageShadow.remove();
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
    if (view.params.swipeBackPage && !app.params.material) {
        view.attachEvents();
    }

    // Add view to app
    app.views.push(view);
    if (view.main) app.mainView = view;

    // Router 
    view.router = {
        load: function (options) {
            return app.router.load(view, options);
        },
        back: function (options) {
            return app.router.back(view, options);  
        },
        // Shortcuts
        loadPage: function (options) {
            options = options || {};
            if (typeof options === 'string') {
                var url = options;
                options = {};
                if (url && url.indexOf('#') === 0 && view.params.domCache) {
                    options.pageName = url.split('#')[1];
                }
                else options.url = url;
            }
            return app.router.load(view, options);
        },
        loadContent: function (content) {
            return app.router.load(view, {content: content});
        },
        reloadPage: function (url) {
            return app.router.load(view, {url: url, reload: true});
        },
        reloadContent: function (content) {
            return app.router.load(view, {content: content, reload: true});
        },
        reloadPreviousPage: function (url) {
            return app.router.load(view, {url: url, reloadPrevious: true, reload: true});
        },
        reloadPreviousContent: function (content) {
            return app.router.load(view, {content: content, reloadPrevious: true, reload: true});
        },
        refreshPage: function () {
            var options = {
                url: view.url,
                reload: true,
                ignoreCache: true
            };
            if (options.url && options.url.indexOf('#') === 0) {
                if (view.params.domCache && view.pagesCache[options.url]) {
                    options.pageName = view.pagesCache[options.url];
                    options.url = undefined;
                    delete options.url;
                }
                else if (view.contentCache[options.url]) {
                    options.content = view.contentCache[options.url];
                    options.url = undefined;
                    delete options.url;
                }
            }
            return app.router.load(view, options);
        },
        refreshPreviousPage: function () {
            var options = {
                url: view.history[view.history.length - 2],
                reload: true,
                reloadPrevious: true,
                ignoreCache: true
            };
            if (options.url && options.url.indexOf('#') === 0 && view.params.domCache && view.pagesCache[options.url]) {
                options.pageName = view.pagesCache[options.url];
                options.url = undefined;
                delete options.url;
            }
            return app.router.load(view, options);
        }
    };

    // Aliases for temporary backward compatibility
    view.loadPage = view.router.loadPage;
    view.loadContent = view.router.loadContent;
    view.reloadPage = view.router.reloadPage;
    view.reloadContent = view.router.reloadContent;
    view.reloadPreviousPage = view.router.reloadPreviousPage;
    view.reloadPreviousContent = view.router.reloadPreviousContent;
    view.refreshPage = view.router.refreshPage;
    view.refreshPreviousPage = view.router.refreshPreviousPage;
    view.back = view.router.back;

    // Bars methods
    view.hideNavbar = function () {
        return app.hideNavbar(container.find('.navbar'));
    };
    view.showNavbar = function () {
        return app.showNavbar(container.find('.navbar'));
    };
    view.hideToolbar = function () {
        return app.hideToolbar(container.find('.toolbar'));
    };
    view.showToolbar = function () {
        return app.showToolbar(container.find('.toolbar'));
    };

    // Push State on load
    if (app.params.pushState && app.params.pushStateOnLoad && view.main) {
        var pushStateUrl;
        var pushStateUrlSplit = docLocation.split(pushStateSeparator)[1];
        if (pushStateRoot) {
            pushStateUrl = docLocation.split(app.params.pushStateRoot + pushStateSeparator)[1];
        }
        else if (pushStateSeparator && docLocation.indexOf(pushStateSeparator) >= 0 && docLocation.indexOf(pushStateSeparator + '#') < 0) {
            pushStateUrl = pushStateUrlSplit;
        }
        var pushStateAnimatePages = app.params.pushStateNoAnimation ? false : undefined;
        var historyState = history.state;
        if (pushStateUrl) {
            if (pushStateUrl.indexOf('#') >= 0 && view.params.domCache && historyState && historyState.pageName && 'viewIndex' in historyState) {
                app.router.load(view, {pageName: historyState.pageName, url: historyState.url, animatePages: pushStateAnimatePages, pushState: false});
            }
            else if (pushStateUrl.indexOf('#') >= 0 && view.params.domCache && view.initialPagesUrl.indexOf(pushStateUrl) >= 0) {
                app.router.load(view, {pageName: pushStateUrl.replace('#',''), animatePages: pushStateAnimatePages, pushState: false});
            }
            else app.router.load(view, {url: pushStateUrl, animatePages: pushStateAnimatePages, pushState: false});
        }
        else if (view.params.domCache && docLocation.indexOf(pushStateSeparator + '#') >= 0) {
            if (historyState && historyState.pageName && 'viewIndex' in historyState) {
                app.router.load(view, {pageName: historyState.pageName, url: historyState.url, animatePages: pushStateAnimatePages, pushState: false});
            }
            else if (pushStateSeparator && pushStateUrlSplit.indexOf('#') === 0) {
                if (view.initialPagesUrl.indexOf(pushStateUrlSplit)) {
                    app.router.load(view, {pageName: pushStateUrlSplit.replace('#', ''), animatePages: pushStateAnimatePages, pushState: false});
                }
            }
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

app.getCurrentView = function (index) {
    var popoverView = $('.popover.modal-in .view');
    var popupView = $('.popup.modal-in .view');
    var panelView = $('.panel.active .view');
    var appViews = $('.views');
    // Find active view as tab
    var appView = appViews.children('.view');
    // Propably in tabs or split view
    if (appView.length > 1) {
        if (appView.hasClass('tab')) {
            // Tabs
            appView = appViews.children('.view.active');
        }
        else {
            // Split View, leave appView intact
        }
    }
    if (popoverView.length > 0 && popoverView[0].f7View) return popoverView[0].f7View;
    if (popupView.length > 0 && popupView[0].f7View) return popupView[0].f7View;
    if (panelView.length > 0 && panelView[0].f7View) return panelView[0].f7View;
    if (appView.length > 0) {
        if (appView.length === 1 && appView[0].f7View) return appView[0].f7View;
        if (appView.length > 1) {
            var currentViews = [];
            for (var i = 0; i < appView.length; i++) {
                if (appView[i].f7View) currentViews.push(appView[i].f7View);
            }
            if (currentViews.length > 0 && typeof index !== 'undefined') return currentViews[index];
            if (currentViews.length > 1) return currentViews;
            if (currentViews.length === 1) return currentViews[0];
            return undefined;
        }
    }
    return undefined;
};
