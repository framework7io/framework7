/*======================================================
************   Messages   ************
======================================================*/
app.initMessages = function (pageContainer) {
    var page = $(pageContainer);
    var messages = page.find('.messages');
    if (messages.length === 0) return;
    var pageContent = page.find('.page-content');
    if (messages.hasClass('messages-auto-layout')) app.updateMessagesLayout(messages);
    if (!messages.hasClass('new-messages-first')) pageContent[0].scrollTop = pageContent[0].scrollHeight - pageContent[0].offsetHeight;
};
app.addMessage = function (props, messagesContent, addToTop) {
    props = props || {};
    props.type = props.type || 'sent';
    if (!props.text || props.length === 0) return false;
    messagesContent = $(messagesContent || '.messages-content');
    if (messagesContent.length === 0) return false;
    var messages = messagesContent.find('.messages');
    var newOnTop = messages.hasClass('new-messages-first');

    if (typeof addToTop === 'undefined') {
        addToTop = newOnTop ? true : false;
    }
    var method = addToTop ? 'prepend' : 'append';

    var html = '';
    if (props.day) {
        html += '<div class="messages-date">' + props.day + (props.time ? ',' : '') + (props.time ? ' <span>' + props.time + '</span>' : '') + '</div>';
    }
    var isPic = props.text.indexOf('<img') >= 0 ? 'message-pic' : '';
    var withAvatar = props.avatar ? 'message-with-avatar' : '';
    var messageClass = 'message' + ' message-' + props.type + ' ' + isPic  + ' ' + withAvatar + ' message-appear-from-' + (method === 'append' ? 'bottom' : 'top');
    html += '<div class="' + messageClass + '">' +
                (props.name ? '<div class="message-name">' + props.name + '</div>' : '') +
                '<div class="message-text">' + props.text + '</div>' +
                (props.avatar ? '<div class="message-avatar" style="background-image:url(' + props.avatar + ')"></div>' : '') +
                (props.label ? '<div class="message-label">' + props.label + '</div>' : '') +
            '</div>';
    messages[method](html);
    if (messages.hasClass('messages-auto-layout')) app.updateMessagesLayout(messages);
    if ((method === 'append' && !newOnTop) || (method === 'prepend' && newOnTop)) {
        app.scrollMessagesContainer(messagesContent);
    }
};
app.updateMessagesLayout = function (messages) {
    messages.find('.message').each(function () {
        var message = $(this);
        if (message.find('.message-text img').length > 0) message.addClass('message-pic');
        if (message.find('.message-avatar').length > 0) message.addClass('message-with-avatar');
    });
    messages.find('.message-sent').each(function () {
        var message = $(this);
        var next = message.next('.message-sent');
        var prev = message.prev('.message-sent');
        if (next.length === 0) {
            message.addClass('message-last message-with-tail');
        }
        else message.removeClass('message-last message-with-tail');

        if (prev.length === 0) {
            message.addClass('message-first');
        }
        else message.removeClass('message-first');
        // Search for changed names
        if (prev.length > 0 && prev.find('.message-name').length > 0 && message.find('.message-name').length > 0) {
            if (prev.find('.message-name').text() !== message.find('.message-name').text()) {
                prev.addClass('message-last message-with-tail');
                message.addClass('message-first');
            }
        }
    });
    messages.find('.message-received').each(function () {
        var message = $(this);
        var next = message.next('.message-received');
        var prev = message.prev('.message-received');
        if (next.length === 0) {
            message.addClass('message-last message-with-tail');
        }
        else message.removeClass('message-last message-with-tail');

        if (prev.length === 0) {
            message.addClass('message-first');
        }
        else message.removeClass('message-first');

        // Search for changed names
        if (prev.length > 0 && prev.find('.message-name').length > 0 && message.find('.message-name').length > 0) {
            if (prev.find('.message-name').text() !== message.find('.message-name').text()) {
                prev.addClass('message-last message-with-tail');
                message.addClass('message-first');
            }
        }
    });
};
app.scrollMessagesContainer = function (messagesContent) {
    messagesContent = $(messagesContent || '.messages-content');
    if (messagesContent.length === 0) return;
    var messages = messagesContent.find('.messages');
    var newOnTop = messages.hasClass('new-messages-first');
    var currentScroll = messagesContent[0].scrollTop;
    var newScroll = newOnTop ? 0 : messagesContent[0].scrollHeight - messagesContent[0].offsetHeight;
    if (newScroll === currentScroll) return;
    messagesContent.scrollTop(newScroll, 400);
};
