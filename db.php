<?php

$host = "localhost";
$username = "root";
$password = "";  // If you have a MySQL password, enter it here
$database = "found_items_db";  // REPLACE with your correct database name

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

?>

