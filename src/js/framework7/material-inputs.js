/*======================================================
************   Material Text Inputs   ************
======================================================*/
app.initPageMaterialInputs = function (pageContainer) {
    pageContainer = $(pageContainer);
    var textareas = pageContainer.find('textarea.resizable');
    pageContainer.find('.item-input').each(function () {
        var itemInput = $(this);
        var notInputs = ['checkbox', 'button', 'submit', 'range', 'radio', 'image'];
        itemInput.find('input, select, textarea').each(function () {
            var input = $(this);
            if (notInputs.indexOf(input.attr('type')) < 0) {
                itemInput.addClass('item-input-field');
                if (input.val().trim() !== '') {
                    input.parents('.item-input, .input-field').add(input.parents('.item-inner')).addClass('not-empty-state');
                }
            }
        });
        if (itemInput.parents('.input-item, .inputs-list').length > 0) return;
        itemInput.parents('.list-block').eq(0).addClass('inputs-list');
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
    function watchChangeState(e) {
        /*jshint validthis:true*/
        var input = $(this),
            value = input.val();
        var type = input.attr('type');
        if (notInputs.indexOf(type) >= 0) return;
        var els = input.add(input.parents('.item-input, .input-field')).add(input.parents('.item-inner').eq(0));
        if (els.length === 0) return;
        if (value && (typeof value === 'string' && value.trim() !== '') || (Array.isArray(value) && value.length > 0)) {
            els.addClass('not-empty-state');
        }
        else {
            els.removeClass('not-empty-state');
        }
    }
    $(document).on('change', 'input, textarea, select', watchChangeState, true);
    $(document).on('focus', 'input, textarea, select', addFocusState, true);
    $(document).on('blur', 'input, textarea, select', removeFocusState, true);
};
