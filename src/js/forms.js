/*===============================================================================
************   Resizeable textarea   ************
===============================================================================*/
app.resizeTextarea = function (textarea) {
    textarea = $(textarea);
    if (!textarea.hasClass('resizeable')) {
        return;
    }
    textarea.css({'height': ''});
    var height = textarea[0].offsetHeight;
    var diff = height - textarea[0].clientHeight;
    var scrollHeight = textarea[0].scrollHeight;

    if (scrollHeight + diff > height) {
        var newAreaHeight = scrollHeight + diff;
        textarea.css('height', newAreaHeight + 'px');
    }
};
app.resizeableTextarea = function (textarea) {
    textarea = $(textarea);
    if (textarea.length === 0) return;
    var textareaTimeout;
    function handleTextarea() {
        clearTimeout(textareaTimeout);
        textareaTimeout = setTimeout(function () {
            app.resizeTextarea(textarea);
        }, 0);
    }
    return textarea.on('change keydown keypress keyup paste cut', handleTextarea);
};
app.initPageResizeableTextareas = function (pageContainer) {
    var textareas = $(pageContainer).find('textarea.resizeable');
    textareas.each(function () {
        app.resizeableTextarea(this);
    });
};
/*======================================================
************   Material Text Inputs   ************
======================================================*/
app.initPageMaterialInputs = function (pageContainer) {
    $(pageContainer).find('.item-input').each(function () {
        var i = $(this);
        var notInputs = ['checkbox', 'button', 'submit', 'range', 'radio', 'image'];
        i.find('input, select, textarea').each(function () {
            if (notInputs.indexOf($(this).attr('type')) < 0) {
                i.addClass('item-input-field');
            }
        });
        if (i.parents('.input-item, .inputs-list').length > 0) return;
        i.parents('.list-block').eq(0).addClass('inputs-list');
    });
};
/*======================================================
************   Material Focus Inputs   ************
======================================================*/
app.initMaterialWatchInputs = function () {
    var notInputs = ['checkbox', 'button', 'submit', 'range', 'radio', 'image'];
    function addFocusState(e) {
        /*jshint validthis:true*/
        var i = $(this);
        var type = i.attr('type');
        if (notInputs.indexOf(type) >= 0) return;
        var els = i.add(i.parents('.item-input, .input-field')).add(i.parents('.item-inner').eq(0));
        els.addClass('focus-state');
    }
    function removeFocusState(e) {
        /*jshint validthis:true*/
        var i = $(this), value = i.val();
        var type = i.attr('type');
        if (notInputs.indexOf(type) >= 0) return;
        var els = i.add(i.parents('.item-input, .input-field')).add(i.parents('.item-inner').eq(0));
        els.removeClass('focus-state');
        if (value && value.trim() !== '') {
            els.addClass('not-empty-state');
        }
        else {
            els.removeClass('not-empty-state');
        }
    }
    $(document).on('focus', '.item-input input, .item-input select, .item-input textarea, input, textarea, select', addFocusState, true);
    $(document).on('blur', '.item-input input, .item-input select, .item-input textarea, input, textarea, select', removeFocusState, true);
};