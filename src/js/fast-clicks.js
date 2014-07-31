/*===============================================================================
************   Fast Clicks   ************
************   Inspired by https://github.com/ftlabs/fastclick   ************
===============================================================================*/
app.initFastClicks = function () {
    if (!app.support.touch) return;
    var touchStartX, touchStartY, touchStartTime, targetElement, trackClick, activeSelection, scrollParent, lastClickTime, isMoved;

    function androidNeedsBlur(el) {
        var noBlur = ('button checkbox file image radio submit input textarea').split(' ');
        if (document.activeElement && el !== document.activeElement && document.activeElement !== document.body) {
            if (noBlur.indexOf(el.nodeName.toLowerCase()) >= 0) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }
    function targetNeedsFocus(el) {
        if (document.activeElement === el) {
            return false;
        }
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
    function targetNeedsPrevent(el) {
        el = $(el);
        if (el.is('label') || el.parents('label').length > 0) {
            if (app.device.os === 'android') {
                var osv = app.device.osVersion.split('.');
                if (osv[0] * 1 > 4 || (osv[0] * 1 === 4 && osv[1] * 1 >= 4)) {
                    return false;
                }
                else return true;
            }
            else return false;
        }
        return true;
    }
    function handleTouchStart(e) {
        isMoved = false;
        if (e.targetTouches.length > 1) {
            return true;
        }

        if (app.device.os === 'ios') {
            var selection = window.getSelection();
            if (selection.rangeCount && (!selection.isCollapsed || document.activeElement === selection.focusNode)) {
                activeSelection = true;
                return true;
            }
            else {
                activeSelection = false;
            }
        }
        if (app.device.os === 'android')  {
            if (androidNeedsBlur(e.target)) {
                document.activeElement.blur();
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
        if ((e.timeStamp - lastClickTime) < 200) {
            e.preventDefault();
        }
    }
    function handleTouchMove(e) {
        if (!trackClick) return;
        trackClick = false;
        targetElement = null;
        isMoved = true;
    }
    function handleTouchEnd(e) {
        if (!trackClick) {
            if (!activeSelection) e.preventDefault();
            return true;
        }

        if (document.activeElement === e.target) {
            return true;
        }

        if (!activeSelection) {
            e.preventDefault();
        }

        if ((e.timeStamp - lastClickTime) < 200) {
            return true;
        }

        lastClickTime = e.timeStamp;
        touchStartTime = 0;

        trackClick = false;

        if (app.device.os === 'ios' && scrollParent) {
            if (scrollParent.scrollTop !== scrollParent.f7ScrollTop) {
                return false;
            }
        }

        // Trigger focus when required
        if (targetNeedsFocus(targetElement)) {
            targetElement.focus();
        }

        e.preventDefault();
        var touch = e.changedTouches[0];
        var evt = document.createEvent('MouseEvents');
        var eventType = 'click';
        if (app.device.os === 'android' && targetElement.nodeName.toLowerCase() === 'select') {
            eventType = 'mousedown';
        }
        evt.initMouseEvent(eventType, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        evt.forwardedTouchEvent = true;
        targetElement.dispatchEvent(evt);

        return false;

        
    }
    function handleTouchCancel(e) {
        trackClick = false;
        targetElement = null;
    }

    function handleClick(e) {
        var allowClick = false;

        if (trackClick) {
            targetElement = null;
            trackClick = false;
            return true;
        }

        if (e.target.type === 'submit' && e.detail === 0) {
            return true;
        }

        if (!targetElement) {
            allowClick =  true;
        }
        if (document.activeElement === targetElement) {
            allowClick =  true;
        }
        if (e.forwardedTouchEvent) {
            allowClick =  true;
        }
        if (!e.cancelable) {
            allowClick =  true;
        }

        if (!allowClick) {
            e.stopImmediatePropagation();
            e.stopPropagation();
            if (targetElement) {
                if (targetNeedsPrevent(targetElement) || isMoved) e.preventDefault();
            }
            else {
                e.preventDefault();
            }
            targetElement = null;
        }

        return allowClick;
    }
    document.addEventListener('click', handleClick, true);
    $(document).on('touchstart', handleTouchStart);
    $(document).on('touchmove', handleTouchMove);
    $(document).on('touchend', handleTouchEnd);
    $(document).on('touchcancel', handleTouchCancel);
};
