<?php
// Connect to the database
require 'db.php'; // Ensure this correctly sets up $pdo

header("Content-Type: application/json");

if (isset($_GET['query'])) {
    $query = "%" . $_GET['query'] . "%"; // SQL wildcard search

    try {
        $stmt = $pdo->prepare("SELECT id, name, image FROM items WHERE name LIKE ?");
        $stmt->execute([$query]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // If no results, return an empty array
        echo json_encode($results ?: []);
    } catch (PDOException $e) {
        // Log error to a file instead of displaying it
        error_log("Database error: " . $e->getMessage(), 3, "error_log.txt");
        echo json_encode(["error" => "Database error occurred"]);
    }
} else {
    echo json_encode(["error" => "No search query provided"]);
}
?>


