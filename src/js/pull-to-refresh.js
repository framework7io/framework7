/*======================================================
************   Pull To Refresh   ************
======================================================*/
app.initPullToRefresh = function (pageContainer) {
    var eventsTarget = $(pageContainer);
    if (!eventsTarget.hasClass('pull-to-refresh-content')) {
        eventsTarget = eventsTarget.find('.pull-to-refresh-content');
    }
    if (!eventsTarget || eventsTarget.length === 0) return;

    var touchId, isTouched, isMoved, touchesStart = {}, isScrolling, touchesDiff, touchStartTime, container, refresh = false, useTranslate = false, startTranslate = 0, translate, scrollTop, wasScrolled, layer, triggerDistance, dynamicTriggerDistance, pullStarted;
    var page = eventsTarget.hasClass('page') ? eventsTarget : eventsTarget.parents('.page');
    var hasNavbar = false;
    if (page.find('.navbar').length > 0 || page.parents('.navbar-fixed, .navbar-through').length > 0 || page.hasClass('navbar-fixed') || page.hasClass('navbar-through')) hasNavbar = true;
    if (page.hasClass('no-navbar')) hasNavbar = false;
    if (!hasNavbar) eventsTarget.addClass('pull-to-refresh-no-navbar');

    container = eventsTarget;

    // Define trigger distance
    if (container.attr('data-ptr-distance')) {
        dynamicTriggerDistance = true;
    }
    else {
        triggerDistance = 44;   
    }
    
    function handleTouchStart(e) {
        if (isTouched) {
            if (app.device.os === 'android') {
                if ('targetTouches' in e && e.targetTouches.length > 1) return;
            }
            else return;
        }
        
        /*jshint validthis:true */
        container = $(this);
        if (container.hasClass('refreshing')) {
            return;
        }
        
        isMoved = false;
        pullStarted = false;
        isTouched = true;
        isScrolling = undefined;
        wasScrolled = undefined;
        if (e.type === 'touchstart') touchId = e.targetTouches[0].identifier;
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchStartTime = (new Date()).getTime();
        
    }
    
    function handleTouchMove(e) {
        if (!isTouched) return;
        var pageX, pageY, touch;
        if (e.type === 'touchmove') {
            if (touchId && e.touches) {
                for (var i = 0; i < e.touches.length; i++) {
                    if (e.touches[i].identifier === touchId) {
                        touch = e.touches[i];
                    }
                }
            }
            if (!touch) touch = e.targetTouches[0];
            pageX = touch.pageX;
            pageY = touch.pageY;
        }
        else {
            pageX = e.pageX;
            pageY = e.pageY;
        }
        if (!pageX || !pageY) return;
            

        if (typeof isScrolling === 'undefined') {
            isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
        }
        if (!isScrolling) {
            isTouched = false;
            return;
        }

        scrollTop = container[0].scrollTop;
        if (typeof wasScrolled === 'undefined' && scrollTop !== 0) wasScrolled = true; 

        if (!isMoved) {
            /*jshint validthis:true */
            container.removeClass('transitioning');
            if (scrollTop > container[0].offsetHeight) {
                isTouched = false;
                return;
            }
            if (dynamicTriggerDistance) {
                triggerDistance = container.attr('data-ptr-distance');
                if (triggerDistance.indexOf('%') >= 0) triggerDistance = container[0].offsetHeight * parseInt(triggerDistance, 10) / 100;
            }
            startTranslate = container.hasClass('refreshing') ? triggerDistance : 0;
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
            // iOS 8 fix
            if (app.device.os === 'ios' && parseInt(app.device.osVersion.split('.')[0], 10) > 7 && scrollTop === 0 && !wasScrolled) useTranslate = true;

            if (useTranslate) {
                e.preventDefault();
                translate = (Math.pow(touchesDiff, 0.85) + startTranslate);
                container.transform('translate3d(0,' + translate + 'px,0)');
            }
            if ((useTranslate && Math.pow(touchesDiff, 0.85) > triggerDistance) || (!useTranslate && touchesDiff >= triggerDistance * 2)) {
                refresh = true;
                container.addClass('pull-up').removeClass('pull-down');
            }
            else {
                refresh = false;
                container.removeClass('pull-up').addClass('pull-down');
            }
            if (!pullStarted) {
                container.trigger('pullstart');
                pullStarted = true;
            }
            container.trigger('pullmove', {
                event: e,
                scrollTop: scrollTop,
                translate: translate,
                touchesDiff: touchesDiff
            });
        }
        else {
            pullStarted = false;
            container.removeClass('pull-up pull-down');
            refresh = false;
            return;
        }
    }
    function handleTouchEnd(e) {
        if (e.type === 'touchend' && e.changedTouches && e.changedTouches.length > 0 && touchId) {
            if (e.changedTouches[0].identifier !== touchId) return;
        }
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
        else {
            container.removeClass('pull-down');
        }
        isTouched = false;
        isMoved = false;
        if (pullStarted) container.trigger('pullend');
    }

    // Attach Events
    eventsTarget.on(app.touchEvents.start, handleTouchStart);
    eventsTarget.on(app.touchEvents.move, handleTouchMove);
    eventsTarget.on(app.touchEvents.end, handleTouchEnd);

    // Detach Events on page remove
    if (page.length === 0) return;
    function destroyPullToRefresh() {
        eventsTarget.off(app.touchEvents.start, handleTouchStart);
        eventsTarget.off(app.touchEvents.move, handleTouchMove);
        eventsTarget.off(app.touchEvents.end, handleTouchEnd);
    }
    eventsTarget[0].f7DestroyPullToRefresh = destroyPullToRefresh;
    function detachEvents() {
        destroyPullToRefresh();
        page.off('pageBeforeRemove', detachEvents);
    }
    page.on('pageBeforeRemove', detachEvents);

};

app.pullToRefreshDone = function (container) {
    container = $(container);
    if (container.length === 0) container = $('.pull-to-refresh-content.refreshing');
    container.removeClass('refreshing').addClass('transitioning');
    container.transitionEnd(function () {
        container.removeClass('transitioning pull-up pull-down');
        container.trigger('refreshdone');
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

app.destroyPullToRefresh = function (pageContainer) {
    pageContainer = $(pageContainer);
    var pullToRefreshContent = pageContainer.hasClass('pull-to-refresh-content') ? pageContainer : pageContainer.find('.pull-to-refresh-content');
    if (pullToRefreshContent.length === 0) return;
    if (pullToRefreshContent[0].f7DestroyPullToRefresh) pullToRefreshContent[0].f7DestroyPullToRefresh();
};
