function log(text) {
	var date = new Date();
	var timeStr = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

	$('#divLog').append('[' + timeStr + '] ' + text + '<br/>');
}

function clearLog() {
	$('#divLog').html('');
}

function setIsBallOnSpot(isBallOnSpot) {
	$.post('php/set_is_ball_on_spot.php', { isBallOnSpot: isBallOnSpot },
		function(response) {
			log(response);
		}
	);
}

function getIsBallOnSpot() {
	$.post('php/get_is_ball_on_spot.php',
		function(response) {
			return response;
		}
	);
}

function insertGoal(posX, posY, callback) {
	$.post('php/insert_goal.php', { posX: posX, posY: posY },
		function(response) {
			log(response);
			callback();
		}
	);
}

function performShot() {
	insertGoal(0.5, 0.5, function() {
		//setIsBallOnSpot(false);
	});
}

$(document).ready( function() {

	var timeouts = [];

	$('#btnRun').click( function() {
			clearLog();

			var interval = $('#inInterval').val();
			var intMShalf = interval * 500;
			var count = $('#inCount').val();

			log('Start simulating ' + count + ' shots with interval of ' + interval + ' seconds');

			var timer = 0;
			timeouts = [];
			for (var i = 0; i < count; i++) {
				timer += intMShalf;
				timeouts.push( setTimeout( function() { setIsBallOnSpot(true); } , timer ) );

				timer += intMShalf;
				timeouts.push( setTimeout( performShot, timer ) );
			}
	});

	$('#btnStop').click( function() {
		if (timeouts.length === 0) return;
		for (var i = 0; i  < timeouts.length; i++) {
			clearTimeout(timeouts[i]);
		}
		timeouts = [];
		log('Test stopped');
	});

});
