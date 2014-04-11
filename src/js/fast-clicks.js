/*===============================================================================
************   Fast Clicks   ************
************   Impressed by https://github.com/ftlabs/fastclick   ************
===============================================================================*/
app.initFastClicks = function () {
    if (!$.supportTouch) return;
    var touchStartX, touchStartY, touchStartTime, targetElement, trackClick, activeSelection, scrollParent;

    function targetNeedsFocus(el) {
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
    function handleTouchStart(e) {
        if (e.targetTouches.length > 1) {
            return true;
        }
        if (app.device.os === 'ios') {
            var selection = window.getSelection();
            if (selection.rangeCount && !selection.isCollapsed) {
                activeSelection = true;
                return true;
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
    }
    function handleTouchMove(e) {
        if (!trackClick) return;
        trackClick = false;
        targetElement = null;
    }
    function handleTouchEnd(e) {
        if (!trackClick) {
            if (!activeSelection) e.preventDefault();
            return true;
        }
        var touchEndTime = (new Date()).getTime();
        if (touchEndTime - touchStartTime > 200) return true;

        e.preventDefault();

        trackClick = false;
        if (app.device.os === 'ios' && scrollParent) {
            if (scrollParent.scrollTop !== scrollParent.f7ScrollTop) {
                return false;
            }
        }

        // Trigger focus where required
        if (targetNeedsFocus(targetElement)) targetElement.focus();

        // Trigger click
        var touch = e.changedTouches[0];
        var evt = document.createEvent('MouseEvents');
        var eventType = 'click';
        if (app.device.os === 'android' && targetElement.nodeName.toLowerCase() === 'select') {
            eventType = 'mousedown';
        }
        evt.initMouseEvent(eventType, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        
        targetElement.dispatchEvent(evt);
    }
    $(document).on('touchstart', handleTouchStart);
    $(document).on('touchmove', handleTouchMove);
    $(document).on('touchend', handleTouchEnd);
};