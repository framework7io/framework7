/*===============================================================================
************   Resizable textarea   ************
===============================================================================*/
app.resizeTextarea = function (textarea) {
    textarea = $(textarea);
    if (!textarea.hasClass('resizable')) {
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
app.resizableTextarea = function (textarea) {
    textarea = $(textarea);
    if (textarea.length === 0) return;
    var textareaTimeout;
    function handleTextarea() {
        clearTimeout(textareaTimeout);
        textareaTimeout = setTimeout(function () {
            app.resizeTextarea(textarea);
        }, 0);
    }
    textarea[0].f7DestroyResizableTextarea = function () {
        textarea.off('change keydown keypress keyup paste cut', handleTextarea);
    };
    return textarea.on('change keydown keypress keyup paste cut', handleTextarea);
};
app.destroyResizableTextarea = function (pageContainer) {
    pageContainer = $(pageContainer);
    if (pageContainer.length > 0 && pageContainer.is('textarea') && pageContainer[0].f7DestroyResizableTextarea) {
        pageContainer[0].f7DestroyResizableTextarea();
    }
    else if (pageContainer.length > 0) {
        pageContainer.find('textarea.resiable').each(function () {
            var textarea = this;
            if (textarea.f7DestroyResizableTextarea) {
                textarea.f7DestroyResizableTextarea ();
            }
        });
    }
};
app.initPageResizableTextarea = function (pageContainer) {
    pageContainer = $(pageContainer);
    var textareas = pageContainer.find('textarea.resizable');
    textareas.each(function () {
        app.resizableTextarea(this);
    });
};