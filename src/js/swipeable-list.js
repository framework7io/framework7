app.initSwipeableList = function () {
    var isTouched, isMoved, isScrolling, touchesStart = {}, touchStartTime;
    $(document).on(app.touchEvents.start, '.list-block li.swipeable', function (e) {
        isMoved = false;
        isTouched = true;
        isScrolling = undefined;
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchStartTime = (new Date()).getTime();
    });
    $(document).on(app.touchEvents.move, '.list-block li.swipeable', function (e) {
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
            
        }
        isMoved = true;

        e.preventDefault();
        var actionsWrap = $(this).find('.swipe-actions-wrap');
        var actions = $(this).find('.swipe-actions');
        var diff = pageX - touchesStart.x;
        if (diff > 0) diff = 0;
        if (diff < -actions.width()) diff = -actions.width();
        
        $(this).find('.swipe-layer').transform('translate3d(' + diff + 'px,0,0)');
        actionsWrap.css({width: -diff + 'px'});

    });
    $(document).on(app.touchEvents.end, '.list-block li.swipeable', function (e) {
        if (!isTouched || !isMoved) {
            isTouched = false;
            isMoved = false;
            return;
        }
        isTouched = false;
        isMoved = false;
    });
};
app.initSwipeableList();