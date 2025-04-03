<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "found_items_db"; // Change if your database name is different

// Create MySQL connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Debugging: Print received form data
echo "<pre>";
print_r($_POST);
print_r($_FILES);
echo "</pre>";

// Check if form data is received
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $category = $_POST['category'];
    $date_found = $_POST['date_found'];
    $location = $_POST['location'];
    $description = $_POST['description'];
    $name = $_POST['name'];
    $contact_number = $_POST['contact_number'];
    $pickup_location = $_POST['pickup_location'];

    // Handle Image Upload
    $image_path = null;
    if (!empty($_FILES['image']['name'])) {
        $target_dir = "uploads/";
        $image_path = $target_dir . basename($_FILES["image"]["name"]);

        if (move_uploaded_file($_FILES["image"]["tmp_name"], $image_path)) {
            echo "✅ Image uploaded successfully!";
        } else {
            echo "❌ Image upload failed!";
            $image_path = null;
        }
    }

    // Insert data into MySQL table
    $sql = "INSERT INTO found_items (image_path, category, date_found, location, description, name, contact_number, pickup_location) 
            VALUES ('$image_path', '$category', '$date_found', '$location', '$description', '$name', '$contact_number', '$pickup_location')";

    if ($conn->query($sql) === TRUE) {
        session_start();
$_SESSION['success_message'] = "✅ Image uploaded successfully! ✅ Data successfully inserted!";

// Redirect to success page
header("Location: success.php");
exit();

    } else {
        echo "❌ Error: " . $conn->error;
    }
}

// Close connection
$conn->close();
?>
