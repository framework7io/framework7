/*======================================================
 ************   Panels   ************
 ======================================================*/
app.allowPanelOpen = true;
app.openPanel = function (panelPosition) {
    var panel, effect, clientLeft, transitionEndTarget, openedTriggered;
    if (!app.allowPanelOpen) {
        return false;
    }
    panel = $('.panel-' + panelPosition);
    if (panel.length === 0 || panel.hasClass('active')) {
        return false;
    }
    app.closePanel(); // Close if some panel is opened
    app.allowPanelOpen = false;
    effect = panel.hasClass('panel-reveal') ? 'reveal' : 'cover';
    panel.css({display: 'block'}).addClass('active');
    panel.trigger('open');
    if (panel.find('.' + app.params.viewClass).length > 0) {
        if (app.sizeNavbars) app.sizeNavbars(panel.find('.' + app.params.viewClass)[0]);
    }

    // Trigger reLayout
    clientLeft = panel[0].clientLeft;

    // Transition End;
    transitionEndTarget = effect === 'reveal' ? $('.' + app.params.viewsClass) : panel;
    openedTriggered = false;

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
            else {
                panelTransitionEnd();
            }
        });
    }

    panelTransitionEnd();

    $('body').addClass('with-panel-' + panelPosition + '-' + effect);
    return true;
};
app.closePanel = function () {
    var activePanel = $('.panel.active'), effect, panelPosition, transitionEndTarget;
    if (activePanel.length === 0) {
        return false;
    }
    effect = activePanel.hasClass('panel-reveal') ? 'reveal' : 'cover';
    panelPosition = activePanel.hasClass('panel-left') ? 'left' : 'right';
    activePanel.removeClass('active');
    transitionEndTarget = effect === 'reveal' ? $('.' + app.params.viewsClass) : activePanel;
    activePanel.trigger('close');
    app.allowPanelOpen = false;

    transitionEndTarget.transitionEnd(function () {
        if (activePanel.hasClass('active')) {
            return;
        }
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
    var panel = $('.panel.panel-' + app.params.swipePanel), panelOverlay,
        isTouched, isMoved, isScrolling, touchesStart = {}, touchStartTime,
        touchesDiff, translate, opened, panelWidth, effect, direction, side,
        views;
    if (panel.length === 0) {
        return;
    }

    panelOverlay = $('.panel-overlay');
    views = $('.' + app.params.viewsClass);
    side = app.params.swipePanel;

    function handleTouchStart(e) {
        if (!app.allowPanelOpen || !app.params.swipePanel) {
            return;
        }
        if ($('.modal-in, .photo-browser-in').length > 0) {
            return;
        }
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        if (app.params.swipePanelActiveArea) {
            if (app.params.swipePanel === 'left') {
                if (touchesStart.x > app.params.swipePanelActiveArea) {
                    return;
                }
            }
            if (app.params.swipePanel === 'right') {
                if (touchesStart.x < window.innerWidth - app.params.swipePanelActiveArea) {
                    return;
                }
            }
        }
        isMoved = false;
        isTouched = true;
        isScrolling = undefined;

        touchStartTime = (new Date()).getTime();
        direction = undefined;
    }

    function handleTouchMove(e) {
        var pageX, pageY, timeDiff, threshold;
        if (!isTouched) {
            return;
        }
        if (e.f7PreventPanelSwipe) {
            return;
        }
        pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
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
                ) {
                isTouched = false;
                return;
            }
        }

        if (app.params.swipePanelNoFollow) {
            timeDiff = (new Date()).getTime() - touchStartTime;
            if (timeDiff < 300) {
                if (direction === 'to-left') {
                    if (side === 'right') {
                        app.openPanel(side);
                    }
                    if (side === 'left' && panel.hasClass('active')) {
                        app.closePanel();
                    }
                }
                if (direction === 'to-right') {
                    if (side === 'left') {
                        app.openPanel(side);
                    }
                    if (side === 'right' && panel.hasClass('active')) {
                        app.closePanel();
                    }
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
                if (app.sizeNavbars) {
                    app.sizeNavbars(panel.find('.' + app.params.viewClass)[0]);
                }
            }
        }

        isMoved = true;

        e.preventDefault();
        threshold = opened ? 0 : -app.params.swipePanelThreshold;
        if (side === 'right') {
            threshold = -threshold;
        }

        touchesDiff = pageX - touchesStart.x + threshold;

        if (side === 'right') {
            translate = touchesDiff - (opened ? panelWidth : 0);
            if (translate > 0) {
                translate = 0;
            }
            if (translate < -panelWidth) {
                translate = -panelWidth;
            }
        }
        else {
            translate = touchesDiff + (opened ? panelWidth : 0);
            if (translate < 0) {
                translate = 0;
            }
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
        var timeDiff, action, edge, target;
        if (!isTouched || !isMoved) {
            isTouched = false;
            isMoved = false;
            return;
        }
        isTouched = false;
        isMoved = false;
        timeDiff = (new Date()).getTime() - touchStartTime;

        edge = (translate === 0 || Math.abs(translate) === panelWidth);

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
                if (side === 'left' && translate === panelWidth) {
                    action = 'reset';
                }
                else {
                    action = 'swap';
                }
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
            if (edge) {
                app.allowPanelOpen = true;
            }
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
                    target = effect === 'reveal' ? views : panel;
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
