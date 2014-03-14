/*======================================================
************   Messages   ************
======================================================*/
app.initMessages = function (pageContainer) {
    var page = $(pageContainer);
    var messages = page.find('.messages');
    if (messages.length === 0) return;
    var pageContent = page.find('.page-content');
    pageContent[0].scrollTop = messages.height() - pageContent.height();
    app.updateMessagesAngles(messages);
};
app.updateMessagesAngles = function (messages) {
    messages.find('.message-sent').each(function () {
        var message = $(this);
        if (!message.next().hasClass('message-sent') && !message.hasClass('message-pic')) {
            message.addClass('message-last');
        }
        else message.removeClass('message-last');
    });
    messages.find('.message-received').each(function () {
        var message = $(this);
        if (!message.next().hasClass('message-received') && !message.hasClass('message-pic')) {
            message.addClass('message-last');
        }
        else message.removeClass('message-last');
    });
};