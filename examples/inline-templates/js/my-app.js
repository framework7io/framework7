// Initialize your app
var myApp = new Framework7({preloadPreviousPage: false});

// Export selectors engine
var $$ = Framework7.$;

var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    domCache: true
});

window.mainView = mainView;

$$(document).on("click", ".item-link-services", function() {
  return mainView.switchContent(".services");
});

$$(document).on("click", ".item-link-about", function() {
  return mainView.switchContent(".about");
});
