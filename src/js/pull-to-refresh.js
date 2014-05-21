/*======================================================
************   Pull To Refresh   ************
======================================================*/
app.initPullToRefresh = function (pageContainer) {
    var eventsTarget = $(pageContainer);
    if (!eventsTarget.hasClass('pull-to-refresh-content')) {
        eventsTarget = eventsTarget.find('.pull-to-refresh-content');
    }
    if (eventsTarget.length === 0) return;

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
