/*===============================================================================
************   Handle clicks and make them fast (on tap);   ************
===============================================================================*/
app.initClickEvents = function () {
    function handleScrollTop(e) {
        /*jshint validthis:true */
        var clicked = $(this);
        var target = $(e.target);
        var isLink = clicked[0].nodeName.toLowerCase() === 'a' ||
                     clicked.parents('a').length > 0 ||
                     target[0].nodeName.toLowerCase() === 'a' ||
                     target.parents('a').length > 0;

        if (isLink) return;
        var pageContent, page;
        if (app.params.scrollTopOnNavbarClick && clicked.is('.navbar .center')) {
            // Find active page
            var navbar = clicked.parents('.navbar');

            // Static Layout
            pageContent = navbar.parents('.page-content');

            if (pageContent.length === 0) {
                // Fixed Layout
                if (navbar.parents('.page').length > 0) {
                    pageContent = navbar.parents('.page').find('.page-content');
                }
                // Through Layout
                if (pageContent.length === 0) {
                    if (navbar.nextAll('.pages').length > 0) {
                        pageContent = navbar.nextAll('.pages').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                }
            }
        }
        if (app.params.scrollTopOnStatusbarClick && clicked.is('.statusbar-overlay')) {
            if ($('.popup.modal-in').length > 0) {
                // Check for opened popup
                pageContent = $('.popup.modal-in').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
            }
            else if ($('.panel.active').length > 0) {
                // Check for opened panel
                pageContent = $('.panel.active').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
            }
            else if ($('.views > .view.active').length > 0) {
                // View in tab bar app layout
                pageContent = $('.views > .view.active').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
            }
            else {
                // Usual case
                pageContent = $('.views').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
            }
        }

        if (pageContent && pageContent.length > 0) {
            // Check for tab
            if (pageContent.hasClass('tab')) {
                pageContent = pageContent.parent('.tabs').children('.page-content.active');
            }
            if (pageContent.length > 0) pageContent.scrollTop(0, 300);
        }
    }
    function handleClicks(e) {
        /*jshint validthis:true */
        var clicked = $(this);
        var url = clicked.attr('href');
        var isLink = clicked[0].nodeName.toLowerCase() === 'a';

        // Check if link is external
        if (isLink) {
            if (clicked.is(app.params.externalLinks) || (url && url.indexOf('javascript:') >= 0)) {
                if(url && clicked.attr('target') === '_system') {
                    e.preventDefault();
                    window.open(url, '_system');
                }
                return;
            }
        }

        // Collect Clicked data- attributes
        var clickedData = clicked.dataset();

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
                if (clickedData.panel === 'right') app.openPanel('right');
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
            if (clickedData.popover) {
                popover = clickedData.popover;
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
            if (clickedData.popup) {
                popup = clickedData.popup;
            }
            else popup = '.popup';
            app.popup(popup);
        }
        if (clicked.hasClass('close-popup')) {
            if (clickedData.popup) {
                popup = clickedData.popup;
            }
            else popup = '.popup.modal-in';
            app.closeModal(popup);
        }
        // Login Screen
        var loginScreen;
        if (clicked.hasClass('open-login-screen')) {
            if (clickedData.loginScreen) {
                loginScreen = clickedData.loginScreen;
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
        if (clicked.hasClass('picker-modal-overlay')) {
            if ($('.picker-modal.modal-in').length > 0)
                app.closeModal('.picker-modal.modal-in');
        }

        // Picker
        if (clicked.hasClass('close-picker')) {
            var pickerToClose = $('.picker-modal.modal-in');
            if (pickerToClose.length > 0) {
                app.closeModal(pickerToClose);
            }
            else {
                pickerToClose = $('.popover.modal-in .picker-modal');
                if (pickerToClose.length > 0) {
                    app.closeModal(pickerToClose.parents('.popover'));
                }
            }
        }
        if (clicked.hasClass('open-picker')) {
            var pickerToOpen;
            if (clickedData.picker) {
                pickerToOpen = clickedData.picker;
            }
            else pickerToOpen = '.picker-modal';
            app.pickerModal(pickerToOpen, clicked);
        }

        // Tabs
        var isTabLink;
        if (clicked.hasClass('tab-link')) {
            isTabLink = true;
            app.showTab(clickedData.tab || clicked.attr('href'), clicked);
        }
        // Swipeout Close
        if (clicked.hasClass('swipeout-close')) {
            app.swipeoutClose(clicked.parents('.swipeout-opened'));
        }
        // Swipeout Delete
        if (clicked.hasClass('swipeout-delete')) {
            if (clickedData.confirm) {
                var text = clickedData.confirm;
                var title = clickedData.confirmTitle;
                if (title) {
                    app.confirm(text, title, function () {
                        app.swipeoutDelete(clicked.parents('.swipeout'));
                    }, function () {
                        if (clickedData.closeOnCancel) app.swipeoutClose(clicked.parents('.swipeout'));
                    });
                }
                else {
                    app.confirm(text, function () {
                        app.swipeoutDelete(clicked.parents('.swipeout'));
                    }, function () {
                        if (clickedData.closeOnCancel) app.swipeoutClose(clicked.parents('.swipeout'));
                    });
                }
            }
            else {
                app.swipeoutDelete(clicked.parents('.swipeout'));
            }

        }
        // Sortable
        if (clicked.hasClass('toggle-sortable')) {
            app.sortableToggle(clickedData.sortable);
        }
        if (clicked.hasClass('open-sortable')) {
            app.sortableOpen(clickedData.sortable);
        }
        if (clicked.hasClass('close-sortable')) {
            app.sortableClose(clickedData.sortable);
        }
        // Accordion
        if (clicked.hasClass('accordion-item-toggle') || (clicked.hasClass('item-link') && clicked.parent().hasClass('accordion-item'))) {
            var accordionItem = clicked.parent('.accordion-item');
            if (accordionItem.length === 0) accordionItem = clicked.parents('.accordion-item');
            if (accordionItem.length === 0) accordionItem = clicked.parents('li');
            app.accordionToggle(accordionItem);
        }

        // Speed Dial
        if (clicked.hasClass('floating-button') && clicked.parent().hasClass('speed-dial')) {
            clicked.parent().toggleClass('speed-dial-opened');
        }
        if (clicked.hasClass('close-speed-dial')) {
            $('.speed-dial-opened').removeClass('speed-dial-opened');
        }

        // Load Page
        if (app.params.ajaxLinks && !clicked.is(app.params.ajaxLinks) || !isLink || !app.params.router) {
            return;
        }
        if (isLink) {
            e.preventDefault();
        }

        var validUrl = url && url.length > 0 && url !== '#' && !isTabLink;
        var template = clickedData.template;
        if (validUrl || clicked.hasClass('back') || template) {
            var view;
            if (clickedData.view) {
                view = $(clickedData.view)[0].f7View;
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
                if (url && url.indexOf('#') === 0 && url !== '#')  {
                    if (view.params.domCache) {
                        pageName = url.split('#')[1];
                    }
                    else return;
                }
                if (url === '#' && !clicked.hasClass('back')) return;
            }
            else {
                url = undefined;
            }

            var animatePages;
            if (typeof clickedData.animatePages !== 'undefined') {
                animatePages = clickedData.animatePages;
            }
            else {
                if (clicked.hasClass('with-animation')) animatePages = true;
                if (clicked.hasClass('no-animation')) animatePages = false;
            }

            var options = {
                animatePages: animatePages,
                ignoreCache: clickedData.ignoreCache,
                force: clickedData.force,
                reload: clickedData.reload,
                reloadPrevious: clickedData.reloadPrevious,
                pageName: pageName,
                pushState: clickedData.pushState,
                url: url
            };

            if (app.params.template7Pages) {
                options.contextName = clickedData.contextName;
                var context = clickedData.context;
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
    $(document).on('click', 'a, .open-panel, .close-panel, .panel-overlay, .modal-overlay, .popup-overlay, .swipeout-delete, .swipeout-close, .close-popup, .open-popup, .open-popover, .open-login-screen, .close-login-screen .smart-select, .toggle-sortable, .open-sortable, .close-sortable, .accordion-item-toggle, .close-picker, .picker-modal-overlay', handleClicks);
    if (app.params.scrollTopOnNavbarClick || app.params.scrollTopOnStatusbarClick) {
        $(document).on('click', '.statusbar-overlay, .navbar .center', handleScrollTop);
    }

    // Prevent scrolling on overlays
    function preventScrolling(e) {
        e.preventDefault();
    }
    if (app.support.touch && !app.device.android) {
        $(document).on((app.params.fastClicks ? 'touchstart' : 'touchmove'), '.panel-overlay, .modal-overlay, .preloader-indicator-overlay, .popup-overlay, .searchbar-overlay', preventScrolling);
    }
};
