document.addEventListener("DOMContentLoaded", function () {
    console.log("Loading item details...");

    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get("id");

    if (!itemId) {
        document.body.innerHTML = "<h2>Item Not Found</h2>";
        return;
    }

    fetch(`fetch_item.php?id=${itemId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(item => {
            console.log("Item Data:", item);
            if (!item || Object.keys(item).length === 0) {
                document.body.innerHTML = "<h2>Item Not Found</h2>";
                return;
            }

            document.getElementById("item-name").innerText = item.name;
            document.getElementById("item-image").src = item.image_path || "default.png"; // Default image if empty
            document.getElementById("item-details").innerHTML = `
                <p><strong>Date Found:</strong> ${item.date_found}</p>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Description:</strong> ${item.description}</p>
                <h3>Reported by:</h3>
                <p><strong>Name:</strong> ${item.name}</p>
                <p><strong>Contact No:</strong> ${item.contact_number}</p>
                <p><strong>Pickup Location:</strong> ${item.pickup_location}</p>
            `;
        })
        .catch(error => console.error("Error fetching item details:", error));
});
