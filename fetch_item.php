<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db.php'; // Ensure this file correctly sets up $conn

if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    echo json_encode(["error" => "Invalid ID"]);
    exit;
}

$item_id = intval($_GET['id']);

$query = "SELECT * FROM found_items WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $item_id);
$stmt->execute();
$result = $stmt->get_result();

$item = $result->fetch_assoc();

if ($item) {
    echo json_encode($item);
} else {
    echo json_encode(["error" => "Item not found"]);
}

$stmt->close();
$conn->close();

?>

