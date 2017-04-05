/*======================================================
************   Panels   ************
======================================================*/
app.allowPanelOpen = true;
app.openPanel = function (panelPosition, animated) {
    if (typeof animated === 'undefined') animated = true;
    if (!app.allowPanelOpen) return false;
    var panel = $('.panel-' + panelPosition);
    if (panel.length === 0 || panel.hasClass('active') || panel.hasClass('panel-visible-by-breakpoint')) return false;
    app.closePanel(); // Close if some panel is opened
    app.allowPanelOpen = false;
    var effect = panel.hasClass('panel-reveal') ? 'reveal' : 'cover';
    panel[animated ? 'removeClass' : 'addClass']('not-animated');
    panel.css({display: 'block'}).addClass('active');
    panel.trigger('open panel:open');

    var panelOverlay = $('.panel-overlay');
    panelOverlay[animated ? 'removeClass' : 'addClass']('not-animated');
    panelOverlay.show();

    if (panel.find('.' + app.params.viewClass).length > 0) {
        if (app.sizeNavbars) app.sizeNavbars(panel.find('.' + app.params.viewClass)[0]);
    }

    // Trigger reLayout
    var clientLeft = panel[0].clientLeft;

    // Transition End;
    var transitionEndTarget = effect === 'reveal' ? $('.' + app.params.viewsClass) : panel;

    function panelTransitionEnd() {
        transitionEndTarget.transitionEnd(function (e) {
            if ($(e.target).is(transitionEndTarget)) {
                if (panel.hasClass('active')) {
                    panel.trigger('opened panel:opened');
                }
                else {
                    panel.trigger('closed panel:closed');
                }
                panelOverlay.css({display: ''});
                app.allowPanelOpen = true;
            }
            else panelTransitionEnd();
        });
    }
    if (animated) {
        panelTransitionEnd();
    }
    else {
        panel.trigger('opened panel:opened');
        panelOverlay.css({display: ''});
        app.allowPanelOpen = true;
    }

    $('body').addClass('with-panel-' + panelPosition + '-' + effect);
    return true;
};
app.closePanel = function (animated) {
    if (typeof animated === 'undefined') animated = true;
    var activePanel = $('.panel.active');
    if (activePanel.length === 0 || activePanel.hasClass('panel-visible-by-breakpoint')) return false;
    var effect = activePanel.hasClass('panel-reveal') ? 'reveal' : 'cover';
    var panelPosition = activePanel.hasClass('panel-left') ? 'left' : 'right';
    activePanel[animated ? 'removeClass' : 'addClass']('not-animated');
    activePanel.removeClass('active');

    var panelOverlay = $('.panel-overlay');
    panelOverlay.removeClass('not-animated');

    var transitionEndTarget = effect === 'reveal' ? $('.' + app.params.viewsClass) : activePanel;
    activePanel.trigger('close panel:close');
    app.allowPanelOpen = false;
    if (animated) {
        transitionEndTarget.transitionEnd(function () {
            if (activePanel.hasClass('active')) return;
            activePanel.css({display: ''});
            activePanel.trigger('closed panel:closed');
            $('body').removeClass('panel-closing');
            app.allowPanelOpen = true;
        });
        $('body').addClass('panel-closing').removeClass('with-panel-' + panelPosition + '-' + effect);
    }
    else {
        activePanel.css({display: ''});
        activePanel.trigger('closed panel:closed');
        activePanel.removeClass('not-animated');
        $('body').removeClass('with-panel-' + panelPosition + '-' + effect);
        app.allowPanelOpen = true;
    }
};
/*======================================================
************   Panels breakpoints   ************
======================================================*/
app.initPanelsBreakpoints = function () {
    var panelLeft = $('.panel-left');
    var panelRight = $('.panel-right');
    var views = app.root.children('.views');
    var wasVisible;
    function setPanels() {
        // Left Panel
        if (app.params.panelLeftBreakpoint && panelLeft.length > 0) {
            wasVisible = panelLeft.hasClass('panel-visible-by-breakpoint');
            if (app.width >= app.params.panelLeftBreakpoint) {
                if (!wasVisible) {
                    $('body').removeClass('with-panel-left-reveal with-panel-left-cover');
                    panelLeft.css('display', '').addClass('panel-visible-by-breakpoint').removeClass('active');
                    panelLeft.trigger('open panel:open opened panel:opened');
                    views.css({
                        'margin-left': panelLeft.width() + 'px'
                    });
                    app.allowPanelOpen = true;
                }
            }
            else {
                if (wasVisible) {
                    panelLeft.css('display', '').removeClass('panel-visible-by-breakpoint active');
                    panelLeft.trigger('close panel:close closed panel:closed');
                    views.css({
                        'margin-left': ''
                    });
                    app.allowPanelOpen = true;
                }
            }
        }
        // Right Panel
        if (app.params.panelRightBreakpoint && panelRight.length > 0) {
            wasVisible = panelRight.hasClass('panel-visible-by-breakpoint');
            if (app.width >= app.params.panelRightBreakpoint) {
                if (!wasVisible) {
                    $('body').removeClass('with-panel-right-reveal with-panel-right-cover');
                    panelRight.css('display', '').addClass('panel-visible-by-breakpoint').removeClass('active');
                    panelRight.trigger('open panel:open opened panel:opened');
                    views.css({
                        'margin-right': panelRight.width() + 'px'
                    });
                    app.allowPanelOpen = true;
                }
            }
            else {
                if (wasVisible) {
                    panelRight.css('display', '').removeClass('panel-visible-by-breakpoint active');
                    panelRight.trigger('close panel:close closed panel:closed');
                    views.css({
                        'margin-right': ''
                    });
                    app.allowPanelOpen = true;
                }
            }
        }
    }
    app.onResize(setPanels);
    setPanels();
};
/*======================================================
************   Swipe panels   ************
======================================================*/
app.initSwipePanels = function () {
    var panel, side;
    if (app.params.swipePanel) {
        panel = $('.panel.panel-' + app.params.swipePanel);
        side = app.params.swipePanel;
        if (panel.length === 0 && side !== 'both') return;
    }
    else {
        if (app.params.swipePanelOnlyClose) {
            if ($('.panel').length === 0) return;
        }
        else return;
    }

    var panelOverlay = $('.panel-overlay');
    var isTouched, isMoved, isScrolling, touchesStart = {}, touchStartTime, touchesDiff, translate, overlayOpacity, opened, panelWidth, effect, direction;
    var views = $('.' + app.params.viewsClass);

    function handleTouchStart(e) {
        if (!app.allowPanelOpen || (!app.params.swipePanel && !app.params.swipePanelOnlyClose) || isTouched) return;
        if ($('.modal-in, .photo-browser-in').length > 0) return;
        if (!(app.params.swipePanelCloseOpposite || app.params.swipePanelOnlyClose)) {
            if ($('.panel.active').length > 0 && !panel.hasClass('active')) return;
        }
        if (e.target && e.target.nodeName.toLowerCase() === 'input' && e.target.type === 'range') return;
        if ($(e.target).closest('.tabs-swipeable-wrap').length > 0) return;
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        if (app.params.swipePanelCloseOpposite || app.params.swipePanelOnlyClose) {
            if ($('.panel.active').length > 0) {
                side = $('.panel.active').hasClass('panel-left') ? 'left' : 'right';
            }
            else {
                if (app.params.swipePanelOnlyClose) return;
                side = app.params.swipePanel;
            }
            if (!side) return;
        }
        panel = $('.panel.panel-' + side);
        opened = panel.hasClass('active');
        if (app.params.swipePanelActiveArea && !opened) {
            if (side === 'left') {
                if (touchesStart.x > app.params.swipePanelActiveArea) return;
            }
            if (side === 'right') {
                if (touchesStart.x < app.width - app.params.swipePanelActiveArea) return;
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

            if(side === 'both'){
                if ($('.panel.active').length > 0) {
                    side = $('.panel.active').hasClass('panel-left') ? 'left' : 'right';
                }
                else {
                    side = direction === 'to-right' ? 'left' : 'right';
                }
                if (app.params.swipePanelActiveArea > 0) {
                    if (side === 'left' && touchesStart.x > app.params.swipePanelActiveArea) {
                        isTouched = false;
                        return;
                    }
                    if (side === 'right' && touchesStart.x < app.width - app.params.swipePanelActiveArea) {
                        isTouched = false;
                        return;
                    }
                }
                panel = $('.panel.panel-' + side);
            }
            if (panel.hasClass('panel-visible-by-breakpoint')) {
                isTouched = false;
                return;
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
            if (!opened) {
                panel.show();
                panelOverlay.show();
            }
            panelWidth = panel[0].offsetWidth;
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
            if (effect === 'cover') {
                translate = touchesDiff + (opened ? 0 : panelWidth);
                if (translate < 0) translate = 0;
                if (translate > panelWidth) {
                    translate = panelWidth;
                }
            }
            else {
                translate = touchesDiff - (opened ? panelWidth : 0);
                if (translate > 0) translate = 0;
                if (translate < -panelWidth) {
                    translate = -panelWidth;
                }
            }
        }
        else {
            translate = touchesDiff + (opened ? panelWidth : 0);
            if (translate < 0) translate = 0;
            if (translate > panelWidth) {
                translate = panelWidth;
            }
        }
        if (effect === 'reveal') {
            views.transform('translate3d(' + translate + 'px,0,0)').transition(0);
            panelOverlay.transform('translate3d(' + translate + 'px,0,0)').transition(0);

            panel.trigger('panel:swipe', {progress: Math.abs(translate / panelWidth)});
            app.pluginHook('swipePanelSetTransform', views[0], panel[0], Math.abs(translate / panelWidth));
        }
        else {
            if (side === 'left') translate = translate - panelWidth;
            panel.transform('translate3d(' + (translate) + 'px,0,0)').transition(0);

            panelOverlay.transition(0);
            overlayOpacity = 1 - Math.abs(translate/panelWidth);
            panelOverlay.css({opacity: overlayOpacity});

            panel.trigger('panel:swipe', {progress: Math.abs(translate / panelWidth)});
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
            if (effect === 'cover') {
                if (translate === 0) {
                    action = 'swap'; //open
                }
                else if (timeDiff < 300 && Math.abs(translate) > 0) {
                    action = 'swap'; //open
                }
                else if (timeDiff >= 300 && Math.abs(translate) < panelWidth / 2) {
                    action = 'swap'; //open
                }
                else {
                    action = 'reset'; //close
                }
            }
            else {
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
        }
        else {
            if (effect === 'cover') {
                if (translate === 0) {
                    action = 'reset'; //open
                }
                else if (timeDiff < 300 && Math.abs(translate) > 0) {
                    action = 'swap'; //open
                }
                else if (timeDiff >= 300 && Math.abs(translate) < panelWidth / 2) {
                    action = 'reset'; //open
                }
                else {
                    action = 'swap'; //close
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
                    panel.trigger('close panel:close');
                    $('body').addClass('panel-closing');
                    target.transitionEnd(function () {
                        if (panel.hasClass('active')) return;
                        panel.trigger('close panel:closed');
                        panel.css({display: ''});
                        $('body').removeClass('panel-closing');
                        app.allowPanelOpen = true;
                    });
                }
            }
        }
        if (effect === 'reveal') {
            views.transition('');
            views.transform('');
        }
        panel.transition('').transform('');
        panelOverlay.css({display: ''}).transform('').transition('').css('opacity', '');
    }
    var passiveListener = app.touchEvents.start === 'touchstart' && app.support.passiveListener ? {passive: true, capture: false} : false;
    var activeListener = app.support.passiveListener ? {passive: false, capture: false} : false;
    $(document).on(app.touchEvents.start, handleTouchStart, passiveListener);
    $(document).on(app.touchEvents.move, handleTouchMove, activeListener);
    $(document).on(app.touchEvents.end, handleTouchEnd, passiveListener);
};
