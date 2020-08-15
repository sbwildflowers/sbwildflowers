//var dict = [[-119.644, 34.5158],[-119.636, 34.5112]];

$(document).ready(function() {
	$('.hamburglar').click(function() {
		$('.menu,.hamburglar').toggleClass('active');
	});

	$('.trail-list ul li span').click(function() {
	    $(this).siblings('ul').toggle();
	    $(this).toggleClass('closed');
	});
});
