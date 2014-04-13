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

    var view = {
        container: container,
        selector: selector,
        params: params || {},
        history: [],
        contentCache: {},
        url: container.getAttribute('data-url') || document.location.href,
        pagesContainer: $('.pages', container)[0],
        main: $container.hasClass('view-main'),
        loadContent: function (content) {
            app.loadContent(view, content);
        },
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
    if (view.url) {
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
                activeNavElements.removeClass('page-transitioning').transform('').css({opacity: ''});
                previousNavElements.removeClass('page-transitioning').transform('').css({opacity: ''});
                if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.removeClass('page-transitioning').transform('');
                if (previousNavBackIcon && previousNavBackIcon.length > 0) previousNavBackIcon.removeClass('page-transitioning').transform('');
            }
            allowViewTouchMove = true;
            app.allowPageChange = true;
            if (pageChanged) app.afterGoBack(view, activePage, previousPage);
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