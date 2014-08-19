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