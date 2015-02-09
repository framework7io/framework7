// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

//Push Notifications 
/*$$(this).on('load', function () {
	myApp.addNotification({
		title: 'Spilt Milk',
		message: 'This is a simple notification message with custom icon and subtitle',
		media: '<i class="fa fa-cloud fa-2x" style="color: orange;"></i>'
	});
});*/

//Remove Items 
$$(".fa-times").on('click', function () {
	$$(this).parent().remove();
});
	
//Hides notification bubble
$$(".empty-message").hide();

//Interaction for the list items
$$(".checkbox").click(function(){
	if ($$(".checkbox").is(":checked")) {
		$$("#item").remove();
	} else {
		$$("#item").show();
	}
});