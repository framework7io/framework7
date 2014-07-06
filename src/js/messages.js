/*======================================================
************   Messages   ************
======================================================*/
app.initMessages = function (pageContainer) {
    var page = $(pageContainer);
    var messages = page.find('.messages');
    if (messages.length === 0) return;
    var pageContent = page.find('.page-content');
    if (!messages.hasClass('new-messages-first')) pageContent[0].scrollTop = messages.height() - pageContent.height();
    app.updateMessagesAngles(messages);
};
app.addMessage = function (props) {
    props = props || {};
    props.type = props.type || 'sent';
    if (!props.text || props.length === 0) return false;
    var messagesContent = $('.messages-content');
    if (messagesContent.length === 0) return false;
    var messages = messagesContent.find('.messages');
    var newOnTop = messages.hasClass('new-messages-first');
    var html = '';
    if (props.day) {
        html += '<div class="messages-date">' + props.day + (props.time ? ',' : '') + (props.time ? ' <span>' + props.time + '</span>' : '') + '</div>';
    }
    var isPic = props.text.indexOf('<img') >= 0 ? 'message-pic' : '';
    var withAvatar = props.avatar ? 'message-with-avatar' : '';
    var messageClass = 'message' + ' message-' + props.type + isPic  + ' ' + withAvatar + ' message-appear';
    html += '<div class="' + messageClass + '">' +
                (props.name ? '<div class="message-name">' + props.name + '</div>' : '') +
                '<div class="message-text">' + props.text + '</div>' +
                (props.avatar ? '<div class="message-avatar" style="background-image:url(' + props.avatar + ')"></div>' : '') +
            '</div>';
    if (newOnTop) messages.prepend(html);
    else messages.append(html);
    app.updateMessagesAngles(messages);
    app.scrollMessagesContainer(messagesContent);
};
app.updateMessagesAngles = function (messages) {
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
            message.addClass('message-last');
        }
        else message.removeClass('message-last');

        if (prev.length === 0) {
            message.addClass('message-first');
        }
        else message.removeClass('message-first');
        // Search for changed names
        if (prev.length > 0 && prev.find('.message-name').length > 0 && message.find('.message-name').length > 0) {
            if (prev.find('.message-name').text() !== message.find('.message-name').text()) {
                prev.addClass('message-last');
                message.addClass('message-first');
            }
        }
    });
    messages.find('.message-received').each(function () {
        var message = $(this);
        var next = message.next('.message-received');
        var prev = message.prev('.message-received');
        if (next.length === 0) {
            message.addClass('message-last');
        }
        else message.removeClass('message-last');

        if (prev.length === 0) {
            message.addClass('message-first');
        }
        else message.removeClass('message-first');
        // Search for changed names
        if (prev.length > 0 && prev.find('.message-name').length > 0 && message.find('.message-name').length > 0) {
            if (prev.find('.message-name').text() !== message.find('.message-name').text()) {
                prev.addClass('message-last');
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
    var newScroll = newOnTop ? 0 : messages.height() - messagesContent.height();
    if (newScroll === currentScroll) return;
    messagesContent.scrollTop(newScroll, 300);
};
