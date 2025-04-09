<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "pos";

$conn = new mysqli($servername, $username, $password, $database);

$result = $conn->query("SELECT DISTINCT category FROM stock");

while ($row = $result->fetch_assoc()) {
  echo "<li class='category-item'>{$row['category']}</li>";
}

$conn->close();
?>
