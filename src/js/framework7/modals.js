/*======================================================
************   Modals   ************
======================================================*/
var _modalTemplateTempDiv = document.createElement('div');
app.modalStack = [];
app.modalStackClearQueue = function () {
    if (app.modalStack.length) {
        (app.modalStack.shift())();
    }
};
app.modal = function (params) {
    params = params || {};
    var modalHTML = '';
    if (app.params.modalTemplate) {
        if (!app._compiledTemplates.modal) app._compiledTemplates.modal = t7.compile(app.params.modalTemplate);
        modalHTML = app._compiledTemplates.modal(params);
    }
    else {
        var buttonsHTML = '';
        if (params.buttons && params.buttons.length > 0) {
            for (var i = 0; i < params.buttons.length; i++) {
                buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
            }
        }
        var titleHTML = params.title ? '<div class="modal-title">' + params.title + '</div>' : '';
        var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
        var afterTextHTML = params.afterText ? params.afterText : '';
        var noButtons = !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '';
        var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical': '';
        var modalButtonsHTML = params.buttons && params.buttons.length > 0 ? '<div class="modal-buttons modal-buttons-' + params.buttons.length + ' ' + verticalButtons + '">' + buttonsHTML + '</div>' : '';
        modalHTML = '<div class="modal ' + noButtons + ' ' + (params.cssClass || '') + '"><div class="modal-inner">' + (titleHTML + textHTML + afterTextHTML) + '</div>' + modalButtonsHTML + '</div>';
    }

    _modalTemplateTempDiv.innerHTML = modalHTML;

    var modal = $(_modalTemplateTempDiv).children();

    app.root.append(modal[0]);

    // Add events on buttons
    modal.find('.modal-button').each(function (index, el) {
        $(el).on('click', function (e) {
            if (params.buttons[index].close !== false) app.closeModal(modal);
            if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
            if (params.onClick) params.onClick(modal, index);
        });
    });
    app.openModal(modal);
    return modal[0];
};
app.alert = function (text, title, callbackOk) {
    if (typeof title === 'function') {
        callbackOk = arguments[1];
        title = undefined;
    }
    return app.modal({
        text: text || '',
        title: typeof title === 'undefined' ? app.params.modalTitle : title,
        buttons: [ {text: app.params.modalButtonOk, bold: true, onClick: callbackOk} ]
    });
};
app.confirm = function (text, title, callbackOk, callbackCancel) {
    if (typeof title === 'function') {
        callbackCancel = arguments[2];
        callbackOk = arguments[1];
        title = undefined;
    }
    return app.modal({
        text: text || '',
        title: typeof title === 'undefined' ? app.params.modalTitle : title,
        buttons: [
            {text: app.params.modalButtonCancel, onClick: callbackCancel},
            {text: app.params.modalButtonOk, bold: true, onClick: callbackOk}
        ]
    });
};
app.prompt = function (text, title, callbackOk, callbackCancel) {
    if (typeof title === 'function') {
        callbackCancel = arguments[2];
        callbackOk = arguments[1];
        title = undefined;
    }
    return app.modal({
        text: text || '',
        title: typeof title === 'undefined' ? app.params.modalTitle : title,
        afterText: '<div class="input-field"><input type="text" class="modal-text-input"></div>',
        buttons: [
            {
                text: app.params.modalButtonCancel
            },
            {
                text: app.params.modalButtonOk,
                bold: true
            }
        ],
        onClick: function (modal, index) {
            if (index === 0 && callbackCancel) callbackCancel($(modal).find('.modal-text-input').val());
            if (index === 1 && callbackOk) callbackOk($(modal).find('.modal-text-input').val());
        }
    });
};
app.modalLogin = function (text, title, callbackOk, callbackCancel) {
    if (typeof title === 'function') {
        callbackCancel = arguments[2];
        callbackOk = arguments[1];
        title = undefined;
    }
    return app.modal({
        text: text || '',
        title: typeof title === 'undefined' ? app.params.modalTitle : title,
        afterText: '<div class="input-field modal-input-double"><input type="text" name="modal-username" placeholder="' + app.params.modalUsernamePlaceholder + '" class="modal-text-input"></div><div class="input-field modal-input-double"><input type="password" name="modal-password" placeholder="' + app.params.modalPasswordPlaceholder + '" class="modal-text-input"></div>',
        buttons: [
            {
                text: app.params.modalButtonCancel
            },
            {
                text: app.params.modalButtonOk,
                bold: true
            }
        ],
        onClick: function (modal, index) {
            var username = $(modal).find('.modal-text-input[name="modal-username"]').val();
            var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
            if (index === 0 && callbackCancel) callbackCancel(username, password);
            if (index === 1 && callbackOk) callbackOk(username, password);
        }
    });
};
app.modalPassword = function (text, title, callbackOk, callbackCancel) {
    if (typeof title === 'function') {
        callbackCancel = arguments[2];
        callbackOk = arguments[1];
        title = undefined;
    }
    return app.modal({
        text: text || '',
        title: typeof title === 'undefined' ? app.params.modalTitle : title,
        afterText: '<div class="input-field"><input type="password" name="modal-password" placeholder="' + app.params.modalPasswordPlaceholder + '" class="modal-text-input"></div>',
        buttons: [
            {
                text: app.params.modalButtonCancel
            },
            {
                text: app.params.modalButtonOk,
                bold: true
            }
        ],
        onClick: function (modal, index) {
            var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
            if (index === 0 && callbackCancel) callbackCancel(password);
            if (index === 1 && callbackOk) callbackOk(password);
        }
    });
};
app.showPreloader = function (title) {
    return app.modal({
        title: title || app.params.modalPreloaderTitle,
        text: '<div class="preloader">' + (app.params.material ? app.params.materialPreloaderHtml : '') + '</div>',
        cssClass: 'modal-preloader'
    });
};
app.hidePreloader = function () {
    app.closeModal('.modal-preloader');
};
app.showIndicator = function () {
    if ($('.preloader-indicator-overlay').length > 0) return;
    app.root.append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white">' + (app.params.material ? app.params.materialPreloaderHtml : '') + '</span></div>');
};
app.hideIndicator = function () {
    $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
};
// Action Sheet
app.actions = function (target, params, animated) {
    var toPopover = false, modal, groupSelector, buttonSelector;
    if (arguments.length === 1 || arguments.length === 2 && typeof arguments[1] === 'boolean') {
        // Actions
        params = arguments[0];
        animated = arguments[1];
    }
    else {
        // Popover
        if (app.device.ios) {
            if (app.device.ipad) toPopover = true;
        }
        else {
            if (app.width >= 768) toPopover = true;
        }
    }
    if (typeof animated === 'undefined') animated = true;

    params = params || [];

    if (params.length > 0 && !Array.isArray(params[0])) {
        params = [params];
    }
    var modalHTML;
    if (toPopover) {
        var actionsToPopoverTemplate = app.params.modalActionsToPopoverTemplate ||
            '<div class="popover actions-popover">' +
              '<div class="popover-inner">' +
                '{{#each this}}' +
                '<div class="list-block">' +
                  '<ul>' +
                    '{{#each this}}' +
                    '{{#if label}}' +
                    '<li class="actions-popover-label {{#if color}}color-{{color}}{{/if}} {{#if bold}}actions-popover-bold{{/if}}">{{text}}</li>' +
                    '{{else}}' +
                    '<li><a href="#" class="item-link list-button {{#if color}}color-{{color}}{{/if}} {{#if bg}}bg-{{bg}}{{/if}} {{#if bold}}actions-popover-bold{{/if}} {{#if disabled}}disabled{{/if}}">{{text}}</a></li>' +
                    '{{/if}}' +
                    '{{/each}}' +
                  '</ul>' +
                '</div>' +
                '{{/each}}' +
              '</div>' +
            '</div>';
        if (!app._compiledTemplates.actionsToPopover) {
            app._compiledTemplates.actionsToPopover = t7.compile(actionsToPopoverTemplate);
        }
        var popoverHTML = app._compiledTemplates.actionsToPopover(params);
        modal = $(app.popover(popoverHTML, target, true, animated));
        groupSelector = '.list-block ul';
        buttonSelector = '.list-button';
    }
    else {
        if (app.params.modalActionsTemplate) {
            if (!app._compiledTemplates.actions) app._compiledTemplates.actions = t7.compile(app.params.modalActionsTemplate);
            modalHTML = app._compiledTemplates.actions(params);
        }
        else {
            var buttonsHTML = '';
            for (var i = 0; i < params.length; i++) {
                for (var j = 0; j < params[i].length; j++) {
                    if (j === 0) buttonsHTML += '<div class="actions-modal-group">';
                    var button = params[i][j];
                    var buttonClass = button.label ? 'actions-modal-label' : 'actions-modal-button';
                    if (button.bold) buttonClass += ' actions-modal-button-bold';
                    if (button.color) buttonClass += ' color-' + button.color;
                    if (button.bg) buttonClass += ' bg-' + button.bg;
                    if (button.disabled) buttonClass += ' disabled';
                    buttonsHTML += '<div class="' + buttonClass + '">' + button.text + '</div>';
                    if (j === params[i].length - 1) buttonsHTML += '</div>';
                }
            }
            modalHTML = '<div class="actions-modal">' + buttonsHTML + '</div>';
        }
        _modalTemplateTempDiv.innerHTML = modalHTML;
        modal = $(_modalTemplateTempDiv).children();
        app.root.append(modal[0]);
        groupSelector = '.actions-modal-group';
        buttonSelector = '.actions-modal-button';
    }

    var groups = modal.find(groupSelector);
    groups.each(function (index, el) {
        var groupIndex = index;
        $(el).children().each(function (index, el) {
            var buttonIndex = index;
            var buttonParams = params[groupIndex][buttonIndex];
            var clickTarget;
            if (!toPopover && $(el).is(buttonSelector)) clickTarget = $(el);
            if (toPopover && $(el).find(buttonSelector).length > 0) clickTarget = $(el).find(buttonSelector);

            if (clickTarget) {
                clickTarget.on('click', function (e) {
                    if (buttonParams.close !== false) app.closeModal(modal);
                    if (buttonParams.onClick) buttonParams.onClick(modal, e);
                });
            }
        });
    });
    if (!toPopover) app.openModal(modal, animated);
    return modal[0];
};
app.popover = function (modal, target, removeOnClose, animated, closeByOutside) {
    if (typeof removeOnClose === 'undefined') removeOnClose = true;
    if (typeof closeByOutside === 'undefined') closeByOutside = true;
    if (typeof animated === 'undefined') animated = true;
    if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
        var _modal = document.createElement('div');
        _modal.innerHTML = modal.trim();
        if (_modal.childNodes.length > 0) {
            modal = _modal.childNodes[0];
            if (removeOnClose) modal.classList.add('remove-on-close');
            if (!closeByOutside) modal.classList.add('ignore-close-by-outside');
            app.root.append(modal);
        }
        else return false; //nothing found
    }
    modal = $(modal);
    target = $(target);
    if (modal.length === 0 || target.length === 0) return false;
    if (modal.parents('body').length === 0) {
        if (removeOnClose) modal.addClass('remove-on-close');
        if (!closeByOutside) modal.addClass.add('ignore-close-by-outside');
        app.root.append(modal[0]);
    }
    if (modal.find('.popover-angle').length === 0 && !app.params.material) {
        modal.append('<div class="popover-angle"></div>');
    }
    modal.show();

    var material = app.params.material;

    function sizePopover() {
        modal.css({left: '', top: ''});
        var modalWidth =  modal.width();
        var modalHeight =  modal.height(); // 13 - height of angle
        var modalAngle, modalAngleSize = 0, modalAngleLeft, modalAngleTop;
        if (!material) {
            modalAngle = modal.find('.popover-angle');
            modalAngleSize = modalAngle.width() / 2;
            modalAngle.removeClass('on-left on-right on-top on-bottom').css({left: '', top: ''});
        }
        else {
            modal.removeClass('popover-on-left popover-on-right popover-on-top popover-on-bottom').css({left: '', top: ''});
        }

        var targetWidth = target.outerWidth();
        var targetHeight = target.outerHeight();
        var targetOffset = target.offset();
        var targetOffsetLeft = targetOffset.left - app.left;
        var targetOffsetTop = targetOffset.top - app.top;
        var targetParentPage = target.parents('.page');
        if (targetParentPage.length > 0) {
            targetOffsetTop = targetOffsetTop - targetParentPage[0].scrollTop;
        }

        var modalTop = 0;
        var modalLeft = 0;
        var diff = 0;
        // Top Position
        var modalPosition = material ? 'bottom' : 'top';
        if (material) {
            if (modalHeight < app.height - targetOffsetTop - targetHeight) {
                // On bottom
                modalPosition = 'bottom';
                modalTop = targetOffsetTop;
            }
            else if (modalHeight < targetOffsetTop) {
                // On top
                modalTop = targetOffsetTop - modalHeight + targetHeight;
                modalPosition = 'top';
            }
            else {
                // On middle
                modalPosition = 'bottom';
                modalTop = targetOffsetTop;
            }

            if (modalTop <= 0) {
                modalTop = 8;
            }
            else if (modalTop + modalHeight >= app.height) {
                modalTop = app.height - modalHeight - 8;
            }

            // Horizontal Position
            modalLeft = targetOffsetLeft;
            if (modalLeft + modalWidth >= app.width - 8) {
                modalLeft = targetOffsetLeft + targetWidth - modalWidth - 8;
            }
            if (modalLeft < 8) {
                modalLeft = 8;
            }
            if (modalPosition === 'top') {
                modal.addClass('popover-on-top');
            }
            if (modalPosition === 'bottom') {
                modal.addClass('popover-on-bottom');
            }
            if (target.hasClass('floating-button-to-popover') && !modal.hasClass('modal-in')) {
                modal.addClass('popover-floating-button');
                var diffX = (modalLeft + modalWidth / 2) - (targetOffsetLeft + targetWidth / 2),
                    diffY = (modalTop + modalHeight / 2) - (targetOffsetTop + targetHeight / 2);
                target
                    .addClass('floating-button-to-popover-in')
                    .transform('translate3d(' + diffX + 'px, ' + diffY + 'px,0)')
                    .transitionEnd(function (e) {
                        if (!target.hasClass('floating-button-to-popover-in')) return;
                        target
                            .addClass('floating-button-to-popover-scale')
                            .transform('translate3d(' + diffX + 'px, ' + diffY + 'px,0) scale(' + (modalWidth/targetWidth) + ', ' + (modalHeight/targetHeight) + ')');
                    });

                modal.once('popover:close', function () {
                    target
                        .removeClass('floating-button-to-popover-in floating-button-to-popover-scale')
                        .addClass('floating-button-to-popover-out')
                        .transform('')
                        .transitionEnd(function (e) {
                            target.removeClass('floating-button-to-popover-out');
                        });
                });
                modal.once('popover:closed', function () {
                    modal.removeClass('popover-floating-button');
                });
            }
            else if (target.hasClass('floating-button-to-popover') && modal.hasClass('modal-in')) {
                modalLeft = targetOffsetLeft;
                modalTop = targetOffsetTop;
            }

        }
        else {
            if ((modalHeight + modalAngleSize) < targetOffsetTop) {
                // On top
                modalTop = targetOffsetTop - modalHeight - modalAngleSize;
            }
            else if ((modalHeight + modalAngleSize) < app.height - targetOffsetTop - targetHeight) {
                // On bottom
                modalPosition = 'bottom';
                modalTop = targetOffsetTop + targetHeight + modalAngleSize;
            }
            else {
                // On middle
                modalPosition = 'middle';
                modalTop = targetHeight / 2 + targetOffsetTop - modalHeight / 2;
                diff = modalTop;
                if (modalTop <= 0) {
                    modalTop = 5;
                }
                else if (modalTop + modalHeight >= app.height) {
                    modalTop = app.height - modalHeight - 5;
                }
                diff = diff - modalTop;
            }

            // Horizontal Position
            if (modalPosition === 'top' || modalPosition === 'bottom') {
                modalLeft = targetWidth / 2 + targetOffsetLeft - modalWidth / 2;
                diff = modalLeft;
                if (modalLeft < 5) modalLeft = 5;
                if (modalLeft + modalWidth > app.width) modalLeft = app.width - modalWidth - 5;
                if (modalPosition === 'top') {
                    modalAngle.addClass('on-bottom');
                }
                if (modalPosition === 'bottom') {
                    modalAngle.addClass('on-top');
                }
                diff = diff - modalLeft;
                modalAngleLeft = (modalWidth / 2 - modalAngleSize + diff);
                modalAngleLeft = Math.max(Math.min(modalAngleLeft, modalWidth - modalAngleSize * 2 - 13), 13);
                modalAngle.css({left: modalAngleLeft + 'px'});

            }
            else if (modalPosition === 'middle') {
                modalLeft = targetOffsetLeft - modalWidth - modalAngleSize;
                modalAngle.addClass('on-right');
                if (modalLeft < 5 || (modalLeft + modalWidth > app.width)) {
                    if (modalLeft < 5) modalLeft = targetOffsetLeft + targetWidth + modalAngleSize;
                    if (modalLeft + modalWidth > app.width) modalLeft = app.width - modalWidth - 5;
                    modalAngle.removeClass('on-right').addClass('on-left');
                }
                modalAngleTop = (modalHeight / 2 - modalAngleSize + diff);
                modalAngleTop = Math.max(Math.min(modalAngleTop, modalHeight - modalAngleSize * 2 - 13), 13);
                modalAngle.css({top: modalAngleTop + 'px'});
            }
        }


        // Apply Styles
        modal.css({top: modalTop + 'px', left: modalLeft + 'px'});
    }

    sizePopover();

    app.onResize(sizePopover);

    modal.on('popover:close', function () {
        app.offResize(sizePopover);
    });

    app.openModal(modal, animated);
    return modal[0];
};
app.popup = function (modal, removeOnClose, animated) {
    if (typeof removeOnClose === 'undefined') removeOnClose = true;
    if (typeof animated === 'undefined') animated = true;
    if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
        var _modal = document.createElement('div');
        _modal.innerHTML = modal.trim();
        if (_modal.childNodes.length > 0) {
            modal = _modal.childNodes[0];
            if (removeOnClose) modal.classList.add('remove-on-close');
            app.root.append(modal);
        }
        else return false; //nothing found
    }
    modal = $(modal);
    if (modal.length === 0) return false;
    if (modal.parents('body').length === 0) {
        if (removeOnClose) modal.addClass('remove-on-close');
        app.root.append(modal[0]);
    }
    modal.show();

    app.openModal(modal, animated);
    return modal[0];
};
app.pickerModal = function (modal, removeOnClose, animated) {
    if (typeof removeOnClose === 'undefined') removeOnClose = true;
    if (typeof animated === 'undefined') animated = true;
    if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
        modal = $(modal);
        if (modal.length > 0) {
            if (removeOnClose) modal.addClass('remove-on-close');
            app.root.append(modal[0]);
        }
        else return false; //nothing found
    }
    modal = $(modal);
    if (modal.length === 0) return false;
    if (modal.parents('body').length === 0) {
        if (removeOnClose) modal.addClass('remove-on-close');
        app.root.append(modal[0]);
    }
    if ($('.picker-modal.modal-in:not(.modal-out)').length > 0 && !modal.hasClass('modal-in')) {
        app.closeModal('.picker-modal.modal-in:not(.modal-out)');
    }
    modal.show();
    app.openModal(modal, animated);
    return modal[0];
};
app.loginScreen = function (modal, animated) {
    if (!modal) modal = '.login-screen';
    if (typeof animated === 'undefined') animated = true;
    modal = $(modal);
    if (modal.length === 0) return false;
    if ($('.login-screen.modal-in:not(.modal-out)').length > 0 && !modal.hasClass('modal-in')) {
        app.closeModal('.login-screen.modal-in:not(.modal-out)');
    }
    modal.show();

    app.openModal(modal, animated);
    return modal[0];
};
app.openModal = function (modal, animated) {
    if (typeof animated === 'undefined') animated = true;
    modal = $(modal);
    modal[animated ? 'removeClass' : 'addClass']('not-animated');

    var isModal = modal.hasClass('modal');
    var isPopover = modal.hasClass('popover');
    var isPopup = modal.hasClass('popup');
    var isLoginScreen = modal.hasClass('login-screen');
    var isPickerModal = modal.hasClass('picker-modal');
    var isActions = modal.hasClass('actions-modal');

    // Modal Event Prefix
    var modalType = 'modal';
    if (isPopover) modalType = 'popover';
    if (isPopup) modalType = 'popup';
    if (isLoginScreen) modalType = 'loginscreen';
    if (isPickerModal) modalType = 'picker';
    if (isActions) modalType = 'actions';

    if ($('.modal.modal-in:not(.modal-out)').length && app.params.modalStack && isModal) {
        app.modalStack.push(function () {
            app.openModal(modal);
        });
        return;
    }

    // do nothing if this modal already shown
    if (true === modal.data('f7-modal-shown')) {
        return;
    }
    modal.data('f7-modal-shown', true);

    // Move modal
    var modalParent = modal.parent();
    if (app.params.modalsMoveToRoot && !modalParent.is(app.root)) {
        app.root.append(modal);
        modal.once(modalType + ':closed', function() {
           modalParent.append(modal);
        });
    }

    modal.once(modalType + ':close', function() {
       modal.removeData('f7-modal-shown');
    });

    if (isModal) {
        modal.show();
        modal.css({
            marginTop: - Math.round(modal.outerHeight() / 2) + 'px'
        });
    }

    var overlay;
    if (!isLoginScreen && !isPickerModal) {
        if ($('.modal-overlay').length === 0 && !isPopup) {
            app.root.append('<div class="modal-overlay"></div>');
        }
        if ($('.popup-overlay').length === 0 && isPopup) {
            app.root.append('<div class="popup-overlay"></div>');
        }
        overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
    }
    if (app.params.material && isPickerModal) {
        if (modal.hasClass('picker-calendar')) {
            if ($('.picker-modal-overlay').length === 0 && !isPopup) {
                app.root.append('<div class="picker-modal-overlay"></div>');
            }
            overlay = $('.picker-modal-overlay');
        }
    }
    if (overlay) {
        overlay[animated ? 'removeClass' : 'addClass']('not-animated');
    }

    //Make sure that styles are applied, trigger relayout;
    var clientLeft = modal[0].clientLeft;

    // Trugger open event
    modal.trigger('open ' + modalType + ':open');

    // Picker modal body class
    if (isPickerModal) {
        $('body').addClass('with-picker-modal');
    }

    // Init Pages and Navbars in modal
    if (modal.find('.' + app.params.viewClass).length > 0) {
        modal.find('.page').each(function () {
            app.initPageWithCallback(this);
        });
        modal.find('.navbar').each(function () {
            app.initNavbarWithCallback(this);
        });
    }

    // Classes for transition in
    if (!isLoginScreen && !isPickerModal) overlay.addClass('modal-overlay-visible');
    if (app.params.material && isPickerModal && overlay) overlay.addClass('modal-overlay-visible');
    if (animated) {
        modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
            if (modal.hasClass('modal-out')) modal.trigger('closed ' + modalType + ':closed');
            else modal.trigger('opened ' + modalType + ':opened');
        });
    }
    else {
        modal.removeClass('modal-out').addClass('modal-in');
        modal.trigger('opened ' + modalType + ':opened');
    }
    return true;
};
app.closeModal = function (modal, animated) {
    if (typeof animated === 'undefined') animated = true;
    modal = $(modal || '.modal-in');
    if (typeof modal !== 'undefined' && modal.length === 0) {
        return;
    }
    modal[animated ? 'removeClass' : 'addClass']('not-animated');
    var isModal = modal.hasClass('modal');
    var isPopover = modal.hasClass('popover');
    var isPopup = modal.hasClass('popup');
    var isLoginScreen = modal.hasClass('login-screen');
    var isPickerModal = modal.hasClass('picker-modal');
    var isActions = modal.hasClass('actions-modal');

    // Modal Event Prefix
    var modalType = 'modal';
    if (isPopover) modalType = 'popover';
    if (isPopup) modalType = 'popup';
    if (isLoginScreen) modalType = 'loginscreen';
    if (isPickerModal) modalType = 'picker';
    if (isActions) modalType = 'actions';

    var removeOnClose = modal.hasClass('remove-on-close');
    
    // ignore close popover
    if (isPopover && modal.hasClass('ignore-close-by-outside')) {
        return;
    }

    // For Actions
    var keepOnClose = modal.hasClass('keep-on-close');

    var overlay;

    if (isPopup) overlay = $('.popup-overlay');
    else {
        if (isPickerModal && app.params.material) overlay = $('.picker-modal-overlay');
        else if (!isPickerModal) overlay = $('.modal-overlay');
    }

    if (isPopup){
        if (modal.length === $('.popup.modal-in').length) {
            overlay.removeClass('modal-overlay-visible');
        }
    }
    else if (overlay && overlay.length > 0) {
        overlay.removeClass('modal-overlay-visible');
    }
    if (overlay) overlay[animated ? 'removeClass' : 'addClass']('not-animated');

    modal.trigger('close ' + modalType + ':close');

    // Picker modal body class
    if (isPickerModal) {
        $('body').removeClass('with-picker-modal');
        $('body').addClass('picker-modal-closing');
    }

    if (!(isPopover && !app.params.material)) {
        if (animated) {
            modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
                if (modal.hasClass('modal-out')) modal.trigger('closed ' + modalType + ':closed');
                else {
                    modal.trigger('opened ' + modalType + ':opened');
                    if (isPopover) return;
                }

                if (isPickerModal) {
                    $('body').removeClass('picker-modal-closing');
                }
                if (isPopup || isLoginScreen || isPickerModal || isPopover) {
                    modal.removeClass('modal-out').hide();
                    if (removeOnClose && modal.length > 0) {
                        modal.remove();
                    }
                }
                else if (!keepOnClose) {
                    modal.remove();
                }
            });
        }
        else {
            modal.trigger('closed ' + modalType + ':closed');
            modal.removeClass('modal-in modal-out');
            if (isPickerModal) {
                $('body').removeClass('picker-modal-closing');
            }
            if (isPopup || isLoginScreen || isPickerModal || isPopover) {
                modal.hide();
                if (removeOnClose && modal.length > 0) {
                    modal.remove();
                }
            }
            else if (!keepOnClose) {
                modal.remove();
            }
        }
        if (isModal && app.params.modalStack) {
            app.modalStackClearQueue();
        }
    }
    else {
        modal.removeClass('modal-in modal-out not-animated').trigger('closed ' + modalType + ':closed').hide();
        if (removeOnClose) {
            modal.remove();
        }
    }
    return true;
};
