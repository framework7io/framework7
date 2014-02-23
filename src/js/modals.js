/*======================================================
************   Modals   ************
======================================================*/
app._modalTemlateTempDiv = document.createElement('div');
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
            onClick: function(){},
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
    app._modalTemlateTempDiv.innerHTML = modalHTML;

    var modal = $(app._modalTemlateTempDiv).children();

    $('body').append(modal[0]);
    
    // Add events on buttons
    modal.find('.modal-button').each(function (index, el) {
        $(el).tap(function (e) {
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
app.confirm = function(text, callbackOk, callbackCancel) {
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
            {text: app.params.modalButtonCancel, onClick: function(modal){
                if (callbackCancel) callbackCancel($(modal).find('.modal-prompt-input').val());
            }},
            {text: app.params.modalButtonOk, bold:true, onClick: function(modal){
                if (callbackOk) callbackOk($(modal).find('.modal-prompt-input').val());
            }}
        ]
    });
};
app.showAjaxLoader = function () {
    return app.modal({
        text: 'Loading...',
        afterText: '<span class="ajax-loader"></span>'
    });
};
app.hideAjaxLoader = function () {
    app.closeModal();
};
// Action Sheet
app.actions = function(params) {
    params = params || [];
    /*Example of @params
    [
        [
            {
                text: 'Button 1',
                red: false,
                bold: false,
                onClick: function() { ... }
            },
            {
                text: '<a href="#" class="open-panel">Open panel</a>',
                red: false,
                bold: false,
                onClick: function() { ... }  
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
            var buttonClass = 'actions-modal-button';
            if (button.bold) buttonClass += ' actions-modal-button-bold';
            if (button.red) buttonClass += ' actions-modal-button-red';
            buttonsHTML += '<span class="' + buttonClass + '">' + button.text + '</span>';
            if (j === params[i].length - 1) buttonsHTML += '</div>';
        }
    }
    var modalHTML = actionsTemplate.replace(/{{buttons}}/g, buttonsHTML);

    app._modalTemlateTempDiv.innerHTML = modalHTML;
    var modal = $(app._modalTemlateTempDiv).children();
    $('body').append(modal[0]);

    var groups = modal.find('.actions-modal-group');
    groups.each(function (index, el) {
        var groupIndex = index;
        $(el).find('.actions-modal-button').each(function (index, el) {
            var buttonIndex = index;
            var buttonParams = params[groupIndex][buttonIndex];
            $(el).tap(function (e) {
                if (buttonParams.close !== false) app.closeModal(modal);
                if (buttonParams.onClick) buttonParams.onClick(modal, e);
            });
        });
    });
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
    if (!modal.hasClass('actions-modal')) modal.css({marginTop: -modal.outerHeight() / 2 + 'px'});
    //Make sure that styles are applied, trigger relayout;
    var clientLeft = modal[0].clientLeft;

    // Classes for transition in
    $('.modal-overlay').addClass('modal-overlay-visible');
    $(modal).addClass('modal-in');
    return true;
};
app.closeModal = function (modal) {
    modal = $(modal || '.modal-in');
    $('.modal-overlay').removeClass('modal-overlay-visible');
    modal.trigger('close');
    modal.toggleClass('modal-in modal-out').transitionEnd(function (e) {
        modal.trigger('closed');
        modal.remove();
    });
    return true;
};