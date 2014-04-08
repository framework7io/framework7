/*======================================================
************   Modals   ************
======================================================*/
var _modalTemplateTempDiv = document.createElement('div');
app.modal = function (params) {
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
    var buttonsHTML = '';
    if (params.buttons && params.buttons.length > 0) {
        for (var i = 0; i < params.buttons.length; i++) {
            buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
        }
    }
    var modalTemplate = app.params.modalTemplate;
    if (!params.title) {
        modalTemplate = modalTemplate.split('{{if title}}')[0] + modalTemplate.split('{{/if title}}')[1];
    }
    else {
        modalTemplate = modalTemplate.replace(/{{if\ title}}/g, '').replace(/{{\/if\ title}}/g, '');
    }
    var modalHTML = modalTemplate
                    .replace(/{{title}}/g, params.title || '')
                    .replace(/{{text}}/g, params.text || '')
                    .replace(/{{afterText}}/g, params.afterText || '')
                    .replace(/{{buttons}}/g, buttonsHTML)
                    .replace(/{{noButtons}}/g, !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '');
    _modalTemplateTempDiv.innerHTML = modalHTML;

    var modal = $(_modalTemplateTempDiv).children();

    $('body').append(modal[0]);
    
    // Add events on buttons
    modal.find('.modal-button').each(function (index, el) {
        $(el).on('click', function (e) {
            if (params.buttons[index].close !== false) app.closeModal(modal);
            if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
        });
    });
    app.openModal(modal);
    return modal[0];
};
app.alert = function (text, title) {
    return app.modal({
        text: text || '',
        title: title || app.params.modalTitle,
        buttons: [ {text: app.params.modalButtonOk, bold: true} ]
    });
};
app.confirm = function (text, callbackOk, callbackCancel) {
    return app.modal({
        text: text || '',
        title: app.params.modalTitle || '',
        buttons: [
            {text: app.params.modalButtonCancel, onClick: callbackCancel},
            {text: app.params.modalButtonOk, bold: true, onClick: callbackOk}
        ]
    });
};
app.prompt = function (text, callbackOk, callbackCancel) {
    return app.modal({
        text: text || '',
        title: app.params.modalTitle || '',
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
    app.closeModal();
};
app.showIndicator = function () {
    $('body').append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white"></span></div>');
};
app.hideIndicator = function () {
    $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
};
// Action Sheet
app.actions = function (params) {
    params = params || [];
    /*Example of @params
    [
        [
            {
                text: 'Button 1',
                red: false,
                bold: false,
                onClick: function () { ... },
                label: false // or true
            },
            {
                text: '<a href="#" class="open-panel">Open panel</a>',
                red: false,
                bold: false,
                onClick: function () { ... }  
                label: false // or true
            }
            ... more buttons in this group
        ],
        ... more groups
    ]
    */
    if (params.length > 0 && !$.isArray(params[0])) {
        params = [params];
    }

    var actionsTemplate = app.params.modalActionsTemplate;
    var buttonsHTML = '';
    for (var i = 0; i < params.length; i++) {
        for (var j = 0; j < params[i].length; j++) {
            if (j === 0) buttonsHTML += '<div class="actions-modal-group">';
            var button = params[i][j];
            var buttonClass = button.label ? 'actions-modal-label' : 'actions-modal-button';
            if (button.bold) buttonClass += ' actions-modal-button-bold';
            if (button.red) buttonClass += ' actions-modal-button-red';
            buttonsHTML += '<span class="' + buttonClass + '">' + button.text + '</span>';
            if (j === params[i].length - 1) buttonsHTML += '</div>';
        }
    }
    var modalHTML = actionsTemplate.replace(/{{buttons}}/g, buttonsHTML);

    _modalTemplateTempDiv.innerHTML = modalHTML;
    var modal = $(_modalTemplateTempDiv).children();
    $('body').append(modal[0]);

    var groups = modal.find('.actions-modal-group');
    groups.each(function (index, el) {
        var groupIndex = index;
        $(el).children().each(function (index, el) {
            var buttonIndex = index;
            var buttonParams = params[groupIndex][buttonIndex];
            if ($(el).hasClass('actions-modal-button')) {
                $(el).on('click', function (e) {
                    if (buttonParams.close !== false) app.closeModal(modal);
                    if (buttonParams.onClick) buttonParams.onClick(modal, e);
                });
            }
        });
    });
    app.openModal(modal);
    return modal[0];
};
app.popover = function (modal, target, removeOnClose) {
    if (typeof removeOnClose === 'undefined') removeOnClose = true;
    if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
        var _modal = document.createElement('div');
        _modal.innerHTML = modal;
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

    app.openModal(modal);
    return modal[0];
};
app.popup = function (modal, removeOnClose) {
    if (typeof removeOnClose === 'undefined') removeOnClose = true;
    if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
        var _modal = document.createElement('div');
        _modal.innerHTML = modal;
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
    if (modal.find('.view').length > 0) {
        app.sizeNavbars(modal.find('.view')[0]);
    }
    app.openModal(modal);
    return modal[0];
};
app.openModal = function (modal) {
    modal = $(modal);
    if ($('.modal-overlay').length === 0) {
        var overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        $('body').append(overlay);
    }
    var isPopover = modal.hasClass('popover');
    var isPopup = modal.hasClass('popup');
    if (!isPopover && !isPopup) modal.css({marginTop: -modal.outerHeight() / 2 + 'px'});
    
    //Make sure that styles are applied, trigger relayout;
    var clientLeft = modal[0].clientLeft;

    // Trugger open event
    modal.trigger('open');

    // Classes for transition in
    $('.modal-overlay').addClass('modal-overlay-visible');
    $(modal).addClass('modal-in');
    return true;
};
app.closeModal = function (modal) {
    modal = $(modal || '.modal-in');
    $('.modal-overlay').removeClass('modal-overlay-visible');
    modal.trigger('close');
    var isPopover = modal.hasClass('popover');
    var isPopup = modal.hasClass('popup');
    var removeOnClose = modal.hasClass('remove-on-close');
    if (!isPopover) {
        modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
            modal.trigger('closed');
            if (!isPopup) modal.remove();
            if (isPopup) modal.removeClass('modal-out').hide();
            if (removeOnClose) modal.remove();
        });
    }
    else {
        modal.removeClass('modal-in modal-out').trigger('closed').hide();
        if (removeOnClose) modal.remove();
    }
    return true;
};