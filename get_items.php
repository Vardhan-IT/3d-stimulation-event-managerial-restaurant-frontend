<?php
$servername = "127.0.0.1";
$username = "root";
$password = "";
$database = "pos";

$conn = new mysqli($servername, $username, $password, $database);

$category = $_POST['category'] ?? '';

if ($category === '') {
  $query = "SELECT * FROM stock";
  $stmt = $conn->prepare($query);
} else {
  $query = "SELECT * FROM stock WHERE category = ?";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("s", $category);
}

$stmt->execute();
$result = $stmt->get_result();

while ($row = $result->fetch_assoc()) {
  echo "<div class='item-card' data-name='{$row['name']}' data-price='{$row['price']}'>
          <img src='{$row['image_path']}' alt='Image'><br>
          <strong>{$row['name']}</strong><br>
          ₹{$row['price']}
        </div>";
}

$conn->close();
?>
