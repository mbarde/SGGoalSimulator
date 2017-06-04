<?php
$servername = "localhost";
$username = "matze";
$password = "password";
$dbname = "soccer_game";

$isBallOnSpot = false;

if (isset($_POST["isBallOnSpot"])) {
	$isBallOnSpot = $_POST["isBallOnSpot"];
}

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE configurations SET is_ball_on_spot = " . $isBallOnSpot . " WHERE active = 1";

if ($conn->query($sql) === TRUE) {
    echo "Set is_ball_on_spot successfully to " . $isBallOnSpot;
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
