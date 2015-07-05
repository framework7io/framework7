/*======================================================
************   Material Text Inputs   ************
======================================================*/
app.initPageMaterialInputs = function (pageContainer) {
    pageContainer = $(pageContainer);
    var textareas = pageContainer.find('textarea.resizable');
    pageContainer.find('.item-input').each(function () {
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