<?php
$servername = "localhost";
$username = "matze";
$password = "password";
$dbname = "soccer_game";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT is_ball_on_spot FROM configurations WHERE active = 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo $row["is_ball_on_spot"];
    }
}

$conn->close();
?>
