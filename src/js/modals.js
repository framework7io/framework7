/*======================================================
 ************   Modals   ************
 ======================================================*/
var _modalTemplateTempDiv = document.createElement('div');
app.modal = function (params) {
    var buttonsHTML, i, modalTemplate, modalHTML, modal;
    params = params || {};
    /* @params example
     {
     title: 'Modal title',
     text: 'Modal text',
     afterText: 'Custom content after text',
     buttons: [{
     text:'Cancel',
     bold: true,
     onClick: function (){},
     close:false
     }]
     }
     */
    buttonsHTML = '';
    if (params.buttons && params.buttons.length > 0) {
        for (i = 0; i < params.buttons.length; i++) {
            buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
        }
    }
    modalTemplate = app.params.modalTemplate;
    if (!params.title) {
        modalTemplate = modalTemplate.split('{{if title}}')[0] + modalTemplate.split('{{/if title}}')[1];
    }
    else {
        modalTemplate = modalTemplate.replace(/{{if\ title}}/g, '').replace(/{{\/if\ title}}/g, '');
    }
    modalHTML = modalTemplate
        .replace(/{{title}}/g, params.title || '')
        .replace(/{{text}}/g, params.text || '')
        .replace(/{{afterText}}/g, params.afterText || '')
        .replace(/{{buttons}}/g, buttonsHTML)
        .replace(/{{noButtons}}/g, !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '');
    _modalTemplateTempDiv.innerHTML = modalHTML;

    modal = $(_modalTemplateTempDiv).children();

    $('body').append(modal[0]);

    // Add events on buttons
    modal.find('.modal-button').each(function (index, el) {
        $(el).on('click', function (e) {
            if (params.buttons[index].close !== false) {
                app.closeModal(modal);
            }
            if (params.buttons[index].onClick) {
                params.buttons[index].onClick(modal, e);
            }
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
        buttons: [
            {text: app.params.modalButtonOk, bold: true, onClick: callbackOk}
        ]
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
        afterText: '<input type="text" class="modal-prompt-input">',
        buttons: [
            {text: app.params.modalButtonCancel, onClick: function (modal) {
                if (callbackCancel) callbackCancel($(modal).find('.modal-prompt-input').val());
            }},
            {text: app.params.modalButtonOk, bold: true, onClick: function (modal) {
                if (callbackOk) callbackOk($(modal).find('.modal-prompt-input').val());
            }}
        ]
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
app.actions = function (params) {
    var actionsTemplate, buttonsHTML, i, j, button, buttonClass, modalHTML, modal, groups;
    params = params || [];

    if (params.length > 0 && !$.isArray(params[0])) {
        params = [params];
    }

    actionsTemplate = app.params.modalActionsTemplate;
    buttonsHTML = '';
    for (i = 0; i < params.length; i++) {
        for (j = 0; j < params[i].length; j++) {
            if (j === 0) {
                buttonsHTML += '<div class="actions-modal-group">';
            }
            button = params[i][j];
            buttonClass = button.label ? 'actions-modal-label' : 'actions-modal-button';
            if (button.bold) {
                buttonClass += ' actions-modal-button-bold';
            }
            if (button.red) {
                buttonClass += ' actions-modal-button-red';
            }
            buttonsHTML += '<span class="' + buttonClass + '">' + button.text + '</span>';
            if (j === params[i].length - 1) {
                buttonsHTML += '</div>';
            }
        }
    }
    modalHTML = actionsTemplate.replace(/{{buttons}}/g, buttonsHTML);

    _modalTemplateTempDiv.innerHTML = modalHTML;
    modal = $(_modalTemplateTempDiv).children();
    $('body').append(modal[0]);

    groups = modal.find('.actions-modal-group');
    groups.each(function (index, el) {
        var groupIndex = index;
        $(el).children().each(function (index, el) {
            var buttonIndex = index,
                buttonParams = params[groupIndex][buttonIndex];
            if ($(el).hasClass('actions-modal-button')) {
                $(el).on('click', function (e) {
                    if (buttonParams.close !== false) {
                        app.closeModal(modal);
                    }
                    if (buttonParams.onClick) {
                        buttonParams.onClick(modal, e);
                    }
                });
            }
        });
    });
    app.openModal(modal);
    return modal[0];
};
app.popover = function (modal, target, removeOnClose) {
    var _modal;
    if (typeof removeOnClose === 'undefined') {
        removeOnClose = true;
    }
    if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
        _modal = document.createElement('div');
        _modal.innerHTML = $.trim(modal);
        if (_modal.childNodes.length > 0) {
            modal = _modal.childNodes[0];
            if (removeOnClose) {
                modal.classList.add('remove-on-close');
            }
            $('body').append(modal);
        }
        else {
            return false;
        } //nothing found
    }
    modal = $(modal);
    target = $(target);
    if (modal.length === 0 || target.length === 0) {
        return false;
    }
    if (modal.find('.popover-angle').length === 0) {
        modal.append('<div class="popover-angle"></div>');
    }
    modal.show();

    function sizePopover() {
        var modalWidth, modalHeight, modalAngle, modalAngleSize,
            targetWidth, targetHeight, targetOffset, targetParentPage,
            windowHeight, windowWidth, modalTop, modalLeft, diff, modalPosition;

        modal.css({left: '', top: ''});
        modalWidth = modal.width();
        modalHeight = modal.height(); // 13 - height of angle
        modalAngle = modal.find('.popover-angle');
        modalAngleSize = modalAngle.width() / 2;
        modalAngle.removeClass('on-left on-right on-top on-bottom').css({left: '', top: ''});

        targetWidth = target.outerWidth();
        targetHeight = target.outerHeight();
        targetOffset = target.offset();
        targetParentPage = target.parents('.page');
        if (targetParentPage.length > 0) {
            targetOffset.top = targetOffset.top - targetParentPage[0].scrollTop;
        }

        windowHeight = $(window).height();
        windowWidth = $(window).width();

        modalTop = 0;
        modalLeft = 0;
        diff = 0;
        // Top Position
        modalPosition = 'top';

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
            if (modalLeft < 5) {
                modalLeft = 5;
            }
            if (modalLeft + modalWidth > windowWidth) {
                modalLeft = windowWidth - modalWidth - 5;
            }
            if (modalPosition === 'top') {
                modalAngle.addClass('on-bottom');
            }
            if (modalPosition === 'bottom') {
                modalAngle.addClass('on-top');
            }
            diff = diff - modalLeft;
            modalAngle.css({left: (modalWidth / 2 - modalAngleSize + diff) + 'px'});
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
            modalAngle.css({top: (modalHeight / 2 - modalAngleSize + diff) + 'px'});
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
    var _modal;
    if (typeof removeOnClose === 'undefined') {
        removeOnClose = true;
    }
    if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
        _modal = document.createElement('div');
        _modal.innerHTML = $.trim(modal);
        if (_modal.childNodes.length > 0) {
            modal = _modal.childNodes[0];
            if (removeOnClose) {
                modal.classList.add('remove-on-close');
            }
            $('body').append(modal);
        }
        else {
            return false;
        }//nothing found
    }
    modal = $(modal);
    if (modal.length === 0) {
        return false;
    }
    modal.show();
    if (modal.find('.' + app.params.viewClass).length > 0) {
        app.sizeNavbars(modal.find('.' + app.params.viewClass)[0]);
    }
    app.openModal(modal);
    return modal[0];
};
app.openModal = function (modal) {
    var isPopover, isPopup,
        overlay, clientLeft;

    modal = $(modal);

    isPopover = modal.hasClass('popover');
    isPopup = modal.hasClass('popup');
    if (!isPopover && !isPopup) {
        modal.css({marginTop: -Math.round(modal.outerHeight() / 2) + 'px'});
    }

    if ($('.modal-overlay').length === 0 && !isPopup) {
        $('body').append('<div class="modal-overlay"></div>');
    }
    if ($('.popup-overlay').length === 0 && isPopup) {
        $('body').append('<div class="popup-overlay"></div>');
    }
    overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');


    //Make sure that styles are applied, trigger relayout;
    clientLeft = modal[0].clientLeft;

    // Trugger open event
    modal.trigger('open');

    // Classes for transition in
    overlay.addClass('modal-overlay-visible');
    modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
        if (modal.hasClass('modal-out')) {
            modal.trigger('closed');
        }
        else {
            modal.trigger('opened');
        }
    });
    return true;
};
app.closeModal = function (modal) {
    var isPopover,
        isPopup,
        removeOnClose,
        overlay;

    modal = $(modal || '.modal-in');
    isPopover = modal.hasClass('popover');
    isPopup = modal.hasClass('popup');
    removeOnClose = modal.hasClass('remove-on-close');

    overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
    overlay.removeClass('modal-overlay-visible');

    modal.trigger('close');


    if (!isPopover) {
        modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
            if (modal.hasClass('modal-out')) {
                modal.trigger('closed');
            }
            else {
                modal.trigger('opened');
            }
            if (!isPopup) {
                modal.remove();
            }
            if (isPopup) {
                modal.removeClass('modal-out').hide();
            }
            if (removeOnClose) {
                modal.remove();
            }
        });
    }
    else {
        modal.removeClass('modal-in modal-out').trigger('closed').hide();
        if (removeOnClose) {
            modal.remove();
        }
    }
    return true;
};
