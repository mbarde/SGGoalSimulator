function setIsBallOnSpot(isBallOnSpot) {
	$.post("php/set_is_ball_on_spot.php", { isBallOnSpot: isBallOnSpot },
		function(response) {
			getIsBallOnSpot();
		}
	);		
}

function getIsBallOnSpot() {
	$.post("php/get_is_ball_on_spot.php",
		function(response) {
			$('#btnSetBallOnSpot').attr('isBallOnSpot', response);
			if (response == 1) {
				$('#btnSetBallOnSpot').text('Set ball away from spot');
			} else {
				$('#btnSetBallOnSpot').text('Set ball on spot');
			}
		}
	);
}

$(document).ready( function() {
	
	getIsBallOnSpot();

	$('#imgGoal').click( function(event) {		
		var offset = $(this).offset();
    	var posX = (event.pageX - offset.left) / $(this).width();
    	var posY = 1 - ((event.pageY - offset.top) / $(this).height());

		posX = Math.round(posX * 100) / 100;
		posY = Math.round(posY * 100) / 100;

		$.post("php/insert_goal.php", { posX: posX, posY: posY },
			function(response) {
				$('#spanLog').html(response);				
				setIsBallOnSpot(false);
			}
		);
	});
	
	$('#btnMiss').click( function() {
		$.post("php/insert_goal.php", { posX: -0.01, posY: -0.01 },
			function(response) {
				$('#spanLog').html(response);
			}
		);
	});
	
	$('#btnSetBallOnSpot').click( function() {
		if ($('#btnSetBallOnSpot').attr('isBallOnSpot') == 1) {			
			setIsBallOnSpot( false );
		} else {
			setIsBallOnSpot( true );		
		}
	});
});
