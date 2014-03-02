var myApp = new Framework7({
    onPageInit: function(page) {
        // Do something on page init
        // console.log(page);
    },
    onPageAfterAnimation: function(page) {
        // Do something on page before animation start
        // console.log(page);
    },
    onPageBeforeAnimation: function(page) {
        // Do something on page ready(centered)
        // console.log(page);
    }
});
// Expose Internal DOM library
var $$ = myApp.$;
// Add main view
var mainView = myApp.addView('.view-main', {
    // Enable Dynamic Navbar for this view
    dynamicNavbar:true
});
// Add another view, which is in right panel
var rightView = myApp.addView('.view-right',{
    // Enable Dynamic Navbar for this view
    dynamicNavbar:true
});
// Required for demo modals
$$(document).tap('.demo-alert', function(){
    myApp.alert('Hello!');
});
$$(document).tap('.demo-confirm', function(){
    myApp.confirm('Are you feel good today?', function(){
        myApp.alert('Great!');
    });
});
$$(document).tap('.demo-prompt', function(){
    myApp.prompt('What is your name?', function(data){
        // @data contains input value
        myApp.confirm('Are you sure that your name is '+data+'?', function(){
            myApp.alert('Ok, your name is '+data+' ;)');
        });
    });
});
$$(document).tap('.demo-actions', function(){
    myApp.actions([
        // First buttons group
        [
            // First button
            {
                text: 'Alert',
                onClick: function(){
                    myApp.alert('He Hoou!');
                }
            },
            // Another red button
            {
                text: 'Nice Red Button ',
                red: true,
                onClick: function(){
                    myApp.alert('You have clicked red button!');
                }
            },
        ],
        // Second group
        [
            {
                text:'Cancel',
                bold: true
            }
        ]
    ]);
});