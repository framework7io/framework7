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
