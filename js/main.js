$(document).ready( function() {

	$('#imgGoal').click( function(event) {
		var offset = $(this).offset();
    	var posX = (event.pageX - offset.left) / $(this).width();
    	var posY = 1 - ((event.pageY - offset.top) / $(this).height());

		posX = Math.round(posX * 100) / 100;
		posY = Math.round(posY * 100) / 100;

		$.post("php/insert_goal.php", { posX: posX, posY: posY },
			function(response) {
				$('#spanLog').html(response);
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

});
