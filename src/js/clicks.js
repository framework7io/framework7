/*===============================================================================
************   Fast Clicks   ************
===============================================================================*/
app.initFastClicks = function () {
    if (!$.supportTouch) return;
    var touchStartX, touchStartY, touchStartTime, targetElement, trackClick, activeSelection;

    function targetNeedsFocus(el) {
        var tag = el.nodeName.toLowerCase();
        var tags = ['textarea', 'select'];
        var skipInputs = ('button checkbox file image radio submit').split(' ');
        if (el.disabled || el.readOnly) return false;
        if (tag === 'textarea' || tag === 'select') return true;
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
        e.preventDefault();

        var touchEndTime = (new Date()).getTime();
        trackClick = false;

        // Trigger focus where required
        if (targetNeedsFocus(targetElement)) targetElement.focus();

        // Trigger click
        $(targetElement).trigger('click');
    }
    function handleClick(e) {
        
    }
    $(document).on('touchstart', handleTouchStart);
    $(document).on('touchmove', handleTouchMove);
    $(document).on('touchend', handleTouchEnd);
    $(document).on('click', handleClick);
    
};
/*===============================================================================
************   Handle clicks and make them fast (on tap);   ************
===============================================================================*/
app.initClickEvents = function () {
    function handleTap(e) {
        /*jshint validthis:true */
        var clicked = $(this);
        var url = clicked.attr('href');
        // External
        if (clicked.hasClass('external')) {
            return;
        }
        else if (clicked.is('a')) {
            e.preventDefault();
        }
        // Open Panel
        if (clicked.hasClass('open-panel')) {
            if ($('.panel').length === 1) {
                if ($('.panel').hasClass('panel-left')) app.openPanel('left');
                else app.openPanel('right');
            }
            else {
                if (clicked.attr('data-panel') === 'right') app.openPanel('right');
                else app.openPanel('left');
            }
        }
        // Close Panel
        if (clicked.hasClass('close-panel')) {
            app.closePanel();
        }

        if (clicked.hasClass('panel-overlay') && app.params.panelsCloseByOutside) {
            app.closePanel();
        }
        // Popover
        if (clicked.hasClass('open-popover')) {
            var popover;
            if (clicked.attr('data-popover')) {
                popover = clicked.attr('data-popover');
            }
            else popover = '.popover';
            app.popover(popover, clicked);
        }
        // Popup
        var popup;
        if (clicked.hasClass('open-popup')) {
            if (clicked.attr('data-popup')) {
                popup = clicked.attr('data-popup');
            }
            else popup = '.popup';
            app.popup(popup);
        }
        if (clicked.hasClass('close-popup')) {
            app.closeModal('.popup.modal-in');
        }
        // Close Modal
        if (clicked.hasClass('modal-overlay')) {
            if ($('.modal.modal-in').length > 0 && app.params.modalCloseByOutside)
                app.closeModal();
            if ($('.actions-modal.modal-in').length > 0 && app.params.modalActionsCloseByOutside)
                app.closeModal();
            if ($('.popup.modal-in').length > 0 && app.params.modalPopupCloseByOutside)
                app.closeModal();
            if ($('.popover.modal-in').length > 0) app.closeModal('.popover.modal-in');
        }
        
        if ($.supportTouch) {
            if (clicked.parent().hasClass('label-switch')) {
                clicked[0].checked = !clicked[0].checked;
                clicked.trigger('change');
            }
        }
        
        // Tabs
        if (clicked.hasClass('tab-link')) {
            var newTab = $(clicked.attr('href'));
            var oldTab = newTab.parent().find('.tab.active').removeClass('active');
            newTab.addClass('active');
            var clickedParent = clicked.parent();
            if (clickedParent.hasClass('buttons-row') || clicked.parents('.tabbar').length > 0) {
                clickedParent.find('.active').removeClass('active');
                clicked.addClass('active');
            }
        }
        // Swipeout Delete
        if (clicked.hasClass('swipeout-delete')) {
            if (clicked.attr('data-confirm')) {
                var modal = app.confirm(clicked.attr('data-confirm'), function () {
                    app.swipeoutDelete(clicked.parents('.swipeout'));
                });
            }
            else {
                app.swipeoutDelete(clicked.parents('.swipeout'));
            }
                
        }
        // Load Page
        if (app.params.ajaxLinks && !clicked.is(app.params.ajaxLinks)) {
            return;
        }
        var validUrl = url && url.length > 0 && url.indexOf('#') !== 0;
        if (validUrl || clicked.hasClass('back')) {
            var view;
            if (clicked.attr('data-view')) {
                view = $(clicked.attr('data-view'))[0].f7View;
            }
            else {
                view = clicked.parents('.view')[0] && clicked.parents('.view')[0].f7View;
                if (view && view.params.linksView) {
                    view = $(view.params.linksView)[0].f7View;
                }
            }
            if (!view) {
                for (var i = 0; i < app.views.length; i++) {
                    if (app.views[i].main) view = app.views[i];
                }
            }
            if (!view) return;
            if (clicked.hasClass('back')) view.goBack(clicked.attr('href'));
            else view.loadPage(clicked.attr('href'));
        }
    }
    $(document).on('click', 'a, .open-panel, .close-panel, .panel-overlay, .modal-overlay, .swipeout-delete, .close-popup, .open-popup, .open-popover, .label-switch, .label-switch input', handleTap);
};