<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php'; // Ensure this file exists!

$query = "SELECT * FROM found_items ORDER BY date_found DESC";

$result = mysqli_query($conn, $query);

if (!$result) {
    die("Query failed: " . mysqli_error($conn));
}

$items = array();
while ($row = mysqli_fetch_assoc($result)) {
    $items[] = $row;
}

header("Content-Type: application/json");
echo json_encode($items);

?>

