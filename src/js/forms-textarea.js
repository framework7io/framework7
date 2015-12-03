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
    return textarea.on('change keydown keypress keyup paste cut', handleTextarea);
};
app.initPageResizableTextarea = function (pageContainer) {
    pageContainer = $(pageContainer);
    var textareas = pageContainer.find('textarea.resizable');
    textareas.each(function () {
        app.resizableTextarea(this);
    });
};