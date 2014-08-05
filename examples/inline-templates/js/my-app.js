// Initialize your app
var myApp = new Framework7({preloadPreviousPage: false, pushState: true});

// Export selectors engine
var $$ = Framework7.$;

window.mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true,
    domCache: true
});

window.mainView = mainView;

$$(document).on("click", ".item-link-services", function() {
  return mainView.switchPage("services");
});

$$(document).on("click", ".item-link-about", function() {
  return mainView.switchPage("about");
});

$$(document).on("click", ".item-link-more-services", function() {
  return mainView.switchPage("more-services");
});
