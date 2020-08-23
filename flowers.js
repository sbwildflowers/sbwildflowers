function buttonFilter () {
	var reString = '';
	$('button.active').each(function() {
		reString += '(?=.*' + $(this).val().toLowerCase() + ')';
	});
	reString += '.*';
	var re = new RegExp(reString);
	$('.specie .flags').each(function() {
		var info = $(this).text().toLowerCase();
		if (info.search(re) !== -1) {
			$(this).parent('.specie').addClass('shown').removeClass('hide');
		} else {
			$(this).parent('.specie').addClass('hide').removeClass('shown');
		}
	});
	if ("ga" in window) {
	    tracker = ga.getAll()[0];
	    if (tracker)
	        tracker.send("event", "Test", "Test GA");
	}
	detectNoRresults();
}

function detectNoRresults() {
	if ($('.input-shown:not(.hide)').length == 0 && $('.shown:not(.input-hide)').length == 0) {
		$('.no-results').addClass('active');
		var buttonString = '';
		$('button.active').each(function() {
			buttonString += $(this).val() + ' ';
		});
		buttonString = buttonString.substring(0, buttonString.length - 1);
		$('.no-results span.active-buttons').text(buttonString);
		$('.no-results span.input-value').text($('input').val());
	} else {
		$('.no-results').removeClass('active');
	}
}

function lazyLoad() {
	var t0 = performance.now();
	productive = $('div:not(.hide) > .lazy');
	$.each(productive,function() {
		if ($(this).parent().offset().top < (window.innerHeight + window.pageYOffset)) {
			$(this).attr('src',$(this).attr('data-src'));
			$(this).removeClass('lazy');
		}
	});
	var t1 = performance.now();
	console.log("Call to lazyLoad took " + (t1 - t0) + " milliseconds.");
}

$(document).ready(function() {
	document.addEventListener('scroll', lazyLoad);
	window.addEventListener('resize', lazyLoad);
	window.addEventListener('orientationChange', lazyLoad);

	$('input').keyup(function() {
		var t0 = performance.now();
		var re = $(this).val().toLowerCase();
		$('.specie').each(function() {
			var info = $(this).find('.name').text().toLowerCase() + ' ' + $(this).find('.common-name').text().toLowerCase();
			if (info.search(re) !== -1) {
				$(this).addClass('input-shown').removeClass('input-hide');
			} else {
				$(this).addClass('input-hide').removeClass('input-shown');
			}
		});
		var t1 = performance.now();
		console.log("Call to input took " + (t1 - t0) + " milliseconds.");
		detectNoRresults();
		lazyLoad();
	});

	$('input.name').blur(function() {
		console.log('blurred');
		value = $('input.name').val();
		ga('send', 'event', 'Search', 'Latin or Common Name', 'test');
	});

	$('button').click(function(e) {
		e.preventDefault();
		$(this).addClass('clicked');
		$(this).parent('.filter-group').find('button:not(.clicked)').each(function() {
			$(this).removeClass('active');
		});
		$(this).toggleClass('active').removeClass('clicked');
		var t0 = performance.now();
		buttonFilter();
		var t1 = performance.now();
		console.log("Call to button took " + (t1 - t0) + " milliseconds.");
		lazyLoad();
	});

	$('.filter-icon').click(function() {
		$('div.buttons').slideToggle(500);
	});
});

