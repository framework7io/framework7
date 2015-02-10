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
        var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical' : '';
        modalHTML = '<div class="modal ' + noButtons + '"><div class="modal-inner">' + (titleHTML + textHTML + afterTextHTML) + '</div><div class="modal-buttons ' + verticalButtons + '">' + buttonsHTML + '</div></div>';
    }
    
    _modalTemplateTempDiv.innerHTML = modalHTML;

    var modal = $(_modalTemplateTempDiv).children();

    $('body').append(modal[0]);
    
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
        afterText: '<input type="text" class="modal-text-input">',
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
        afterText: '<input type="text" name="modal-username" placeholder="' + app.params.modalUsernamePlaceholder + '" class="modal-text-input modal-text-input-double"><input type="password" name="modal-password" placeholder="' + app.params.modalPasswordPlaceholder + '" class="modal-text-input modal-text-input-double">',
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
        afterText: '<input type="password" name="modal-password" placeholder="' + app.params.modalPasswordPlaceholder + '" class="modal-text-input">',
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
        text: '<div class="preloader"></div>'
    });
};
app.hidePreloader = function () {
    app.closeModal('.modal.modal-in');
};
app.showIndicator = function () {
    $('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>');
};
app.hideIndicator = function () {
    $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
};
// Action Sheet
app.actions = function (target, params) {
    var toPopover = false, modal, groupSelector, buttonSelector;
    if (arguments.length === 1) {
        // Actions
        params = target;
    } 
    else {
        // Popover
        if (app.device.ios) {
            if (app.device.ipad) toPopover = true;
        }
        else {
            if ($(window).width() >= 768) toPopover = true;
        }
    }
    params = params || [];
    
    if (params.length > 0 && !$.isArray(params[0])) {
        params = [params];
    }
    var modalHTML;
    if (toPopover) {
        var actionsPopoverTemplate = 
            '<div class="popover actions-popover">' +
              '<div class="popover-inner">' +
                '{{#each this}}' +
                '<div class="list-block">' +
                  '<ul>' +
                    '{{#each this}}' +
                    '{{#if label}}' +
                    '<li class="actions-popover-label {{#if color}}color-{{color}}{{/if}} {{#if bold}}actions-popover-bold{{/if}}">{{text}}</li>' +
                    '{{else}}' +
                    '<li><a href="#" class="item-link list-button {{#if color}}color-{{color}}{{/if}} {{#if bg}}bg-{{bg}}{{/if}} {{#if bold}}actions-popover-bold{{/if}}">{{text}}</a></li>' +
                    '{{/if}}' +
                    '{{/each}}' +
                  '</ul>' +
                '</div>' +
                '{{/each}}' +
              '</div>' +
            '</div>';
        if (!app._compiledTemplates.actionsPopover) {
            app._compiledTemplates.actionsPopover = t7.compile(actionsPopoverTemplate);
        }
        var popoverHTML = app._compiledTemplates.actionsPopover(params);
        modal = $(app.popover(popoverHTML, target, true));
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
                    buttonsHTML += '<span class="' + buttonClass + '">' + button.text + '</span>';
                    if (j === params[i].length - 1) buttonsHTML += '</div>';
                }
            }
            modalHTML = '<div class="actions-modal">' + buttonsHTML + '</div>';
        }
        _modalTemplateTempDiv.innerHTML = modalHTML;
        modal = $(_modalTemplateTempDiv).children();
        $('body').append(modal[0]);
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
    if (!toPopover) app.openModal(modal);
    return modal[0];
};
app.popover = function (modal, target, removeOnClose) {
    if (typeof removeOnClose === 'undefined') removeOnClose = true;
    if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
        var _modal = document.createElement('div');
        _modal.innerHTML = modal.trim();
        if (_modal.childNodes.length > 0) {
            modal = _modal.childNodes[0];
            if (removeOnClose) modal.classList.add('remove-on-close');
            $('body').append(modal);
        }
        else return false; //nothing found
    }
    modal = $(modal);
    target = $(target);
    if (modal.length === 0 || target.length === 0) return false;
    if (modal.find('.popover-angle').length === 0) {
        modal.append('<div class="popover-angle"></div>');
    }
    modal.show();

    function sizePopover() {
        modal.css({left: '', top: ''});
        var modalWidth =  modal.width();
        var modalHeight =  modal.height(); // 13 - height of angle
        var modalAngle = modal.find('.popover-angle');
        var modalAngleSize = modalAngle.width() / 2;
        var modalAngleLeft, modalAngleTop;
        modalAngle.removeClass('on-left on-right on-top on-bottom').css({left: '', top: ''});

        var targetWidth = target.outerWidth();
        var targetHeight = target.outerHeight();
        var targetOffset = target.offset();
        var targetParentPage = target.parents('.page');
        if (targetParentPage.length > 0) {
            targetOffset.top = targetOffset.top - targetParentPage[0].scrollTop;
        }

        var windowHeight = $(window).height();
        var windowWidth = $(window).width();

        var modalTop = 0;
        var modalLeft = 0;
        var diff = 0;
        // Top Position
        var modalPosition = 'top';

        if ((modalHeight + modalAngleSize) < targetOffset.top) {
            // On top
            modalTop = targetOffset.top - modalHeight - modalAngleSize;
        }
        else if ((modalHeight + modalAngleSize) < windowHeight - targetOffset.top - targetHeight) {
            // On bottom
            modalPosition = 'bottom';
            modalTop = targetOffset.top + targetHeight + modalAngleSize;
        }
        else {
            // On middle
            modalPosition = 'middle';
            modalTop = targetHeight / 2 + targetOffset.top - modalHeight / 2;
            diff = modalTop;
            if (modalTop < 0) {
                modalTop = 5;
            }
            else if (modalTop + modalHeight > windowHeight) {
                modalTop = windowHeight - modalHeight - 5;
            }
            diff = diff - modalTop;
        }
        // Horizontal Position
        if (modalPosition === 'top' || modalPosition === 'bottom') {
            modalLeft = targetWidth / 2 + targetOffset.left - modalWidth / 2;
            diff = modalLeft;
            if (modalLeft < 5) modalLeft = 5;
            if (modalLeft + modalWidth > windowWidth) modalLeft = windowWidth - modalWidth - 5;
            if (modalPosition === 'top') modalAngle.addClass('on-bottom');
            if (modalPosition === 'bottom') modalAngle.addClass('on-top');
            diff = diff - modalLeft;
            modalAngleLeft = (modalWidth / 2 - modalAngleSize + diff);
            modalAngleLeft = Math.max(Math.min(modalAngleLeft, modalWidth - modalAngleSize * 2 - 6), 6);
            modalAngle.css({left: modalAngleLeft + 'px'});
        }
        else if (modalPosition === 'middle') {
            modalLeft = targetOffset.left - modalWidth - modalAngleSize;
            modalAngle.addClass('on-right');
            if (modalLeft < 5) {
                modalLeft = targetOffset.left + targetWidth + modalAngleSize;
                modalAngle.removeClass('on-right').addClass('on-left');
            }
            if (modalLeft + modalWidth > windowWidth) {
                modalLeft = windowWidth - modalWidth - 5;
                modalAngle.removeClass('on-right').addClass('on-left');
            }
            modalAngleTop = (modalHeight / 2 - modalAngleSize + diff);
            modalAngleTop = Math.max(Math.min(modalAngleTop, modalHeight - modalAngleSize * 2 - 6), 6);
            modalAngle.css({top: modalAngleTop + 'px'});
        }

        // Apply Styles
        modal.css({top: modalTop + 'px', left: modalLeft + 'px'});
    }
    sizePopover();

    $(window).on('resize', sizePopover);
    modal.on('close', function () {
        $(window).off('resize', sizePopover);
    });
    
    if (modal.find('.' + app.params.viewClass).length > 0) {
        app.sizeNavbars(modal.find('.' + app.params.viewClass)[0]);
    }

    app.openModal(modal);
    return modal[0];
};
app.popup = function (modal, removeOnClose) {
    if (typeof removeOnClose === 'undefined') removeOnClose = true;
    if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
        var _modal = document.createElement('div');
        _modal.innerHTML = modal.trim();
        if (_modal.childNodes.length > 0) {
            modal = _modal.childNodes[0];
            if (removeOnClose) modal.classList.add('remove-on-close');
            $('body').append(modal);
        }
        else return false; //nothing found
    }
    modal = $(modal);
    if (modal.length === 0) return false;
    modal.show();
    if (modal.find('.' + app.params.viewClass).length > 0) {
        app.sizeNavbars(modal.find('.' + app.params.viewClass)[0]);
    }
    app.openModal(modal);
    return modal[0];
};
app.pickerModal = function (pickerModal, removeOnClose) {
    if (typeof removeOnClose === 'undefined') removeOnClose = true;
    if (typeof pickerModal === 'string' && pickerModal.indexOf('<') >= 0) {
        pickerModal = $(pickerModal);
        if (pickerModal.length > 0) {
            if (removeOnClose) pickerModal.addClass('remove-on-close');
            $('body').append(pickerModal[0]);
        }
        else return false; //nothing found
    }
    pickerModal = $(pickerModal);
    if (pickerModal.length === 0) return false;
    pickerModal.show();
    app.openModal(pickerModal);
    return pickerModal[0];
};
app.loginScreen = function (modal) {
    if (!modal) modal = '.login-screen';
    modal = $(modal);
    if (modal.length === 0) return false;
    modal.show();
    if (modal.find('.' + app.params.viewClass).length > 0) {
        app.sizeNavbars(modal.find('.' + app.params.viewClass)[0]);
    }
    app.openModal(modal);
    return modal[0];
};
app.openModal = function (modal) {
    modal = $(modal);
    var isModal = modal.hasClass('modal');
    if ($('.modal.modal-in:not(.modal-out)').length && app.params.modalStack && isModal) {
        app.modalStack.push(function () {
            app.openModal(modal);
        });
        return;
    }
    var isPopover = modal.hasClass('popover');
    var isPopup = modal.hasClass('popup');
    var isLoginScreen = modal.hasClass('login-screen');
    var isPickerModal = modal.hasClass('picker-modal');
    if (isModal) {
        modal.show();
        modal.css({
            marginTop: - Math.round(modal.outerHeight() / 2) + 'px'
        });
    }

    var overlay;
    if (!isLoginScreen && !isPickerModal) {
        if ($('.modal-overlay').length === 0 && !isPopup) {
            $('body').append('<div class="modal-overlay"></div>');
        }
        if ($('.popup-overlay').length === 0 && isPopup) {
            $('body').append('<div class="popup-overlay"></div>');
        }
        overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
    }

    //Make sure that styles are applied, trigger relayout;
    var clientLeft = modal[0].clientLeft;

    // Trugger open event
    modal.trigger('open');

    // Picker modal body class
    if (isPickerModal) {
        $('body').addClass('with-picker-modal');
    }

    // Classes for transition in
    if (!isLoginScreen && !isPickerModal) overlay.addClass('modal-overlay-visible');
    modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
        if (modal.hasClass('modal-out')) modal.trigger('closed');
        else modal.trigger('opened');
    });
    return true;
};
app.closeModal = function (modal) {
    modal = $(modal || '.modal-in');
    if (typeof modal !== 'undefined' && modal.length === 0) {
        return;
    }
    var isModal = modal.hasClass('modal');
    var isPopover = modal.hasClass('popover');
    var isPopup = modal.hasClass('popup');
    var isLoginScreen = modal.hasClass('login-screen');
    var isPickerModal = modal.hasClass('picker-modal');

    var removeOnClose = modal.hasClass('remove-on-close');

    var overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
    if (isPopup){
        if (modal.length === $('.popup.modal-in').length) {
            overlay.removeClass('modal-overlay-visible');    
        }  
    }
    else if (!isPickerModal) {
        overlay.removeClass('modal-overlay-visible');
    }

    modal.trigger('close');
    
    // Picker modal body class
    if (isPickerModal) {
        $('body').removeClass('with-picker-modal');
        $('body').addClass('picker-modal-closing');
    }

    if (!isPopover) {
        modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
            if (modal.hasClass('modal-out')) modal.trigger('closed');
            else modal.trigger('opened');
            
            if (isPickerModal) {
                $('body').removeClass('picker-modal-closing');
            }
            if (isPopup || isLoginScreen || isPickerModal) {
                modal.removeClass('modal-out').hide();
                if (removeOnClose && modal.length > 0) {
                    modal.remove();
                }
            }
            else {
                modal.remove();
            }
        });
        if (isModal && app.params.modalStack) {
            app.modalStackClearQueue();
        }
    }
    else {
        modal.removeClass('modal-in modal-out').trigger('closed').hide();
        if (removeOnClose) {
            modal.remove();
        }
    }
    return true;
};
