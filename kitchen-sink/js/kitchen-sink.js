var myApp = new Framework7({
    onPageInit: function (page) {
        // Do something on page init
        // console.log(page);
    },
    onPageAfterAnimation: function (page) {
        // Do something on page before animation start
        // console.log(page);
    },
    onPageBeforeAnimation: function (page) {
        // Do something on page ready(centered)
        // console.log(page);
    }
});
// Expose Internal DOM library
var $$ = myApp.$;
// Add main view
var mainView = myApp.addView('.view-main', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true
});
// Add another view, which is in right panel
var rightView = myApp.addView('.view-right', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar: true
});
// Required for demo modals
$$(document).tap('.demo-alert', function () {
    myApp.alert('Hello!');
});
$$(document).tap('.demo-confirm', function () {
    myApp.confirm('Are you feel good today?', function () {
        myApp.alert('Great!');
    });
});
$$(document).tap('.demo-prompt', function () {
    myApp.prompt('What is your name?', function (data) {
        // @data contains input value
        myApp.confirm('Are you sure that your name is ' + data + '?', function () {
            myApp.alert('Ok, your name is ' + data + ' ;)');
        });
    });
});
$$(document).tap('.demo-actions', function () {
    myApp.actions([
        // First buttons group
        [
            // Group Label
            {
                text: 'Here comes some optional description or warning for actions below',
                label: true
            },
            // First button
            {
                text: 'Alert',
                onClick: function () {
                    myApp.alert('He Hoou!');
                }
            },
            // Another red button
            {
                text: 'Nice Red Button ',
                red: true,
                onClick: function () {
                    myApp.alert('You have clicked red button!');
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel',
                bold: true
            }
        ]
    ]);
});
// Required for demo popover
$$('.popover a').tap(function () {
    myApp.closeModal('.popover');
});

// Preloader Demo
$$(document).tap('.demo-indicator', function () {
    myApp.showIndicator();
    setTimeout(function () {
        myApp.hideIndicator();
    }, 2000);
});
$$(document).tap('.demo-preloader', function () {
    myApp.showPreloader();
    setTimeout(function () {
        myApp.hidePreloader();
    }, 2000);
});
$$(document).tap('.demo-preloader-custom', function () {
    myApp.showPreloader('My text...');
    setTimeout(function () {
        myApp.hidePreloader();
    }, 2000);
});

// Swipeouts delete callback
$$(document).on('deleted', '.demo-remove-callback', function () {
    myApp.alert('Thanks, item removed!');
});

// Send Message
var conversationStarted = false;
var answers = [
    'Yes!',
    'No',
    'Hm...',
    'I am not sure',
    'And what about you?',
    'May be ;)',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus tincidunt erat, a convallis leo rhoncus vitae.'
];
var answerTimeout;
$$(document).on('submit', '.ks-messages-form', function (e) {
    e.preventDefault();
    var input = $$(this).find('.ks-messages-input');
    var messageText = input.val();
    if (messageText.length === 0) return;
    // Empty input
    input.val('');
    // Add Message
    myApp.addMessage({
        text: messageText,
        type: 'sent',
        day: !conversationStarted ? 'Today' : false,
        time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
    });
    conversationStarted = true;
    // Add answer after timeout
    if (answerTimeout) clearTimeout(answerTimeout);
    answerTimeout = setTimeout(function () {
        myApp.addMessage({
            text: answers[Math.floor(Math.random() * answers.length)],
            type: 'received'
        });
    }, 2000);
});
$$(document).tap('.ks-send-message', function () {
    $$('.ks-messages-form').trigger('submit');
});

// Change statusbar bg when panel opened/closed
$$('.panel-left').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-left');
});
$$('.panel-right').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-right');
});
$$('.panel-left, .panel-right').on('close', function () {
    $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});