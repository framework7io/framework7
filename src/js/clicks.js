/*===============================================================================
************   Handle clicks and make them fast (on tap);   ************
===============================================================================*/
app.initClickEvents = function () {
    function handleClicks(e) {
        /*jshint validthis:true */
        var clicked = $(this);
        var url = clicked.attr('href');
        var isLink = clicked[0].nodeName.toLowerCase() === 'a';

        // Str to boolean for data attributes
        function toBoolean(str) {
            if (str === 'false') return false;
            if (str === 'true') return true;
            return undefined;
        }
        // Check if link is external 
        if (isLink) {
            if (clicked.is(app.params.externalLinks)) return;
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
        var isTabLink;
        if (clicked.hasClass('tab-link')) {
            isTabLink = true;
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
            var accordionItem = clicked.parent('.accordion-item');
            if (accordionItem.length === 0) accordionItem = clicked.parents('.accordion-item');
            if (accordionItem.length === 0) accordionItem = clicked.parents('li');
            app.accordionToggle(accordionItem);
        }

        // Load Page
        if (app.params.ajaxLinks && !clicked.is(app.params.ajaxLinks) || !isLink || !app.params.router) {
            return;
        }
        if (isLink) {
            e.preventDefault();
        }

        var validUrl = url && url.length > 0 && url !== '#' && !isTabLink;
        var template = clicked.attr('data-template');
        if (validUrl || clicked.hasClass('back') || template) {
            var view;
            if (clicked.attr('data-view')) {
                view = $(clicked.attr('data-view'))[0].f7View;
            }
            else {
                view = clicked.parents('.' + app.params.viewClass)[0] && clicked.parents('.' + app.params.viewClass)[0].f7View;
                if (view && view.params.linksView) {
                    if (typeof view.params.linksView === 'string') view = $(view.params.linksView)[0].f7View;
                    else if (view.params.linksView instanceof View) view = view.params.linksView;
                }
            }
            if (!view) {
                if (app.mainView) view = app.mainView;
            }
            if (!view) return;

            var pageName;
            if (!template) {
                if (url.indexOf('#') === 0 && url !== '#')  {
                    if (view.params.domCache) {
                        pageName = url.split('#')[1];
                        url = undefined;
                    }
                    else return;
                }
                if (url === '#' && !clicked.hasClass('back')) return;
            }
            else {
                url = undefined;
            }

            var animatePages;
            if (clicked.attr('data-animatePages')) {
                animatePages = toBoolean(clicked.attr('data-animatePages'));
            }
            else {
                if (clicked.hasClass('with-animation')) animatePages = true;
                if (clicked.hasClass('no-animation')) animatePages = false;
            }
            
            var options = {
                animatePages: animatePages,
                ignoreCache: toBoolean(clicked.attr('data-ignoreCache')),
                force: toBoolean(clicked.attr('data-force')),
                reload: toBoolean(clicked.attr('data-reload')),
                reloadPrevious: toBoolean(clicked.attr('data-reloadPrevious')),
                pageName: pageName,
                url: url
            };

            if (app.params.template7Pages) {
                options.contextName = clicked.attr('data-contextName');
                var context = clicked.attr('data-context');
                if (context) {
                    options.context = JSON.parse(context);
                }
            }
            if (template && template in t7.templates) {
                options.template = t7.templates[template];
            }

            if (clicked.hasClass('back')) view.router.back(options);
            else view.router.load(options);
        }
    }
    $(document).on('click', 'a, .open-panel, .close-panel, .panel-overlay, .modal-overlay, .popup-overlay, .swipeout-delete, .close-popup, .open-popup, .open-popover, .open-login-screen, .close-login-screen .smart-select, .toggle-sortable, .open-sortable, .close-sortable, .accordion-item-toggle', handleClicks);
};
