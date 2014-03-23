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
app.addMessage = function (props) {
    props = props || {};
    /*
    {
        text : 'Message text',
        day : 'Mon',
        time : '14:42',
        type : 'sent' // or 'received'
    }
    */
    props.type = props.type || 'sent';
    if (!props.text || props.length === 0) return false;
    var messagesContent = $('.messages-content');
    if (messagesContent.length === 0) return false;
    var messages = messagesContent.find('.messages');

    var html = '';
    if (props.day) {
        html += '<div class="messages-date">' + props.day + (props.time ? ',' : '') + (props.time ? ' <span>' + props.time + '</span>' : '') + '</div>';
    }
    var isPic = props.text.indexOf('<img') >= 0;
    var messageClass = 'message' + ' message-' + props.type + (isPic ? ' message-pic' : '') + ' message-appear';
    html += '<div class="' + messageClass + '">' + props.text + '</div>';
    messages.append(html);
    app.updateMessagesAngles(messages);
    app.scrollMessagesContainer(messagesContent);
};
app.updateMessagesAngles = function (messages) {
    messages.find('.message-sent').each(function () {
        var message = $(this);
        if (!message.next().hasClass('message-sent')) {
            message.addClass('message-last');
        }
        else message.removeClass('message-last');
    });
    messages.find('.message-received').each(function () {
        var message = $(this);
        if (!message.next().hasClass('message-received')) {
            message.addClass('message-last');
        }
        else message.removeClass('message-last');
    });
};
app.scrollMessagesContainer = function (messagesContent) {
    messagesContent = $(messagesContent || '.messages-content');
    if (messagesContent.length === 0) return;
    var messages = messagesContent.find('.messages');
    var currentScroll = messagesContent[0].scrollTop;
    var newScroll = messages.height() - messagesContent.height();
    var step = (newScroll - currentScroll) / 12;
    function animScroll() {
        if (messagesContent[0].scrollTop < newScroll) {
            messagesContent[0].scrollTop = messagesContent[0].scrollTop + Math.floor(step);
            app._animFrame(animScroll);
        }
        else {
            messagesContent[0].scrollTop = newScroll;
        }
    }
    app._animFrame(animScroll);
};