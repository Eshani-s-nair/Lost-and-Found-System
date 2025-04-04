<?php
// Database connection
$host = "localhost";
$user = "root";
$password = ""; // your actual password
$database = "found_items_db";

$conn = new mysqli($host, $user, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get item ID from URL
$item_id = isset($_GET['id']) ? intval($_GET['id']) : 0;

// Query to get contact number and found date
$sql = "SELECT contact_number, date_found FROM found_items WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $item_id);
$stmt->execute();
$result = $stmt->get_result();

$contact_number = "Not found";
$last_date = "Unknown";

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $contact_number = $row['contact_number'];

    // Get today's date and add 10 days
    $date_found = new DateTime($row['date_found']);
    $last_date_obj = new DateTime(); // current date
    $last_date_obj->modify('+10 days');
    $last_date = $last_date_obj->format('Y-m-d');
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Claim Item</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f9f9f9;
            padding: 30px;
        }
        .box {
            max-width: 500px;
            margin: auto;
            background: white;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border-radius: 10px;
            text-align: center;
        }
        .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 25px;
            background-color: #3498db;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        .btn:hover {
            background-color: #2980b9;
        }
    </style>
</head>
<body>
    <div class="box">
        <h2>Claim Information</h2>
        <p>Contact the person at: <strong><?php echo htmlspecialchars($contact_number); ?></strong></p>
        <p>Please bring a valid copy of your identity proof when claiming the item.</p>
        <p><strong>Last Date to Claim:</strong> <?php echo $last_date; ?></p>
        <a class="btn" href="found.html">Back to Found Items</a>
    </div>
</body>
</html>
