/*===============================================================================
************   Handle clicks and make them fast (on tap);   ************
===============================================================================*/
app.initClickEvents = function () {
    function handleClicks(e) {
        /*jshint validthis:true */
        var clicked = $(this);
        var url = clicked.attr('href');
        var isLink = clicked[0].nodeName.toLowerCase() === 'a';

        // Check if link is external 
        if (isLink) {
            /*jshint shadow:true */
            for (var i = 0; i < app.params.externalLinks.length; i++) {
                if (clicked.hasClass(app.params.externalLinks[i])) {
                    return;
                }

                if (clicked[0].rel === app.params.externalLinks[i]) {
                    return;
                }
            }
        }

        // Smart Select
        if (clicked.hasClass('smart-select')) {
            if (app.smartSelectOpen) app.smartSelectOpen(clicked);
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
        if (clicked.hasClass('close-popover')) {
            app.closeModal('.popover.modal-in');
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
            if (clicked.attr('data-popup')) {
                popup = clicked.attr('data-popup');
            }
            else popup = '.popup.modal-in';
            app.closeModal(popup);
        }
        // Login Screen
        var loginScreen;
        if (clicked.hasClass('open-login-screen')) {
            if (clicked.attr('data-login-screen')) {
                loginScreen = clicked.attr('data-login-screen');
            }
            else loginScreen = '.login-screen';
            app.loginScreen(loginScreen);
        }
        if (clicked.hasClass('close-login-screen')) {
            app.closeModal('.login-screen.modal-in');
        }
        // Close Modal
        if (clicked.hasClass('modal-overlay')) {
            if ($('.modal.modal-in').length > 0 && app.params.modalCloseByOutside)
                app.closeModal('.modal.modal-in');
            if ($('.actions-modal.modal-in').length > 0 && app.params.actionsCloseByOutside)
                app.closeModal('.actions-modal.modal-in');
            
            if ($('.popover.modal-in').length > 0) app.closeModal('.popover.modal-in');
        }
        if (clicked.hasClass('popup-overlay')) {
            if ($('.popup.modal-in').length > 0 && app.params.popupCloseByOutside)
                app.closeModal('.popup.modal-in');
        }

        // Tabs
        if (clicked.hasClass('tab-link')) {
            app.showTab(clicked.attr('data-tab') || clicked.attr('href'), clicked);
        }
        // Swipeout Delete
        if (clicked.hasClass('swipeout-delete')) {
            if (clicked.attr('data-confirm')) {
                var text = clicked.attr('data-confirm');
                var title = clicked.attr('data-confirm-title');
                if (title) {
                    app.confirm(text, title, function () {
                        app.swipeoutDelete(clicked.parents('.swipeout'));
                    });
                }
                else {
                    app.confirm(text, function () {
                        app.swipeoutDelete(clicked.parents('.swipeout'));
                    });
                }
            }
            else {
                app.swipeoutDelete(clicked.parents('.swipeout'));
            }
                
        }
        // Sortable
        if (clicked.hasClass('toggle-sortable')) {
            app.sortableToggle(clicked.data('sortable'));
        }
        if (clicked.hasClass('open-sortable')) {
            app.sortableOpen(clicked.data('sortable'));
        }
        if (clicked.hasClass('close-sortable')) {
            app.sortableClose(clicked.data('sortable'));
        }
        // Accordion
        if (clicked.hasClass('accordion-item-toggle') || (clicked.hasClass('item-link') && clicked.parent().hasClass('accordion-item'))) {
            var accordionItem = clicked.parents('.accordion-item');
            if (accordionItem.length === 0) accordionItem = clicked.parents('li');
            app.accordionToggle(accordionItem);
        }
        // Load Page
        if (app.params.ajaxLinks && !clicked.is(app.params.ajaxLinks) || !isLink) {
            return;
        }
        if (isLink) {
            e.preventDefault();
        }
        var validUrl = url && url.length > 0 && url.indexOf('#') !== 0;
        if (validUrl || clicked.hasClass('back')) {
            var view;
            if (clicked.attr('data-view')) {
                view = $(clicked.attr('data-view'))[0].f7View;
            }
            else {
                view = clicked.parents('.' + app.params.viewClass)[0] && clicked.parents('.' + app.params.viewClass)[0].f7View;
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
            var animatePages;
            if (clicked.hasClass('no-animation')) animatePages = false;
            if (clicked.hasClass('with-animation')) animatePages = true;
            if (clicked.hasClass('back')) view.goBack(clicked.attr('href'), animatePages);
            else view.loadPage(clicked.attr('href'), animatePages);
        }
    }
    $(document).on('click', 'a, .open-panel, .close-panel, .panel-overlay, .modal-overlay, .popup-overlay, .swipeout-delete, .close-popup, .open-popup, .open-popover, .open-login-screen, .close-login-screen .smart-select, .toggle-sortable, .open-sortable, .close-sortable, .accordion-item-toggle', handleClicks);
};
