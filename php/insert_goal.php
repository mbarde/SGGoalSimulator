<?php
$servername = "localhost";
$username = "matze";
$password = "password";
$dbname = "soccer_game";

$posX = rand(0, 100);
$posY = rand(0, 100);

if ( isset($_POST["posX"]) and isset($_POST["posY"]) ) {
        $posX = htmlspecialchars($_POST["posX"]) * 100;
        $posY = htmlspecialchars($_POST["posY"]) * 100;
} 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO shots (timestamp, pos_x, pos_y) VALUES ('" . time() . "', '" . $posX . "', '" . $posY ."')";

if ($conn->query($sql) === TRUE) {
    echo "New shot created successfully (" . $posX . ":" . $posY . ")";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
