document.addEventListener("DOMContentLoaded", function () {
    console.log("item1.js is loaded!");

    // Get item ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get("id");

    // Sample Found Items Data (same as found.js)
    const lostItems = [
        { id: "rolex-watch", name: "Rolex Watch", image: "watch.webp", date: "20-03-2025", location: "Near Nedumbasherry", description: "Brown color Rolex watch", reportedBy: "Eshani", contact: "9995511782", pickup: "Kochi" },
        { id: "leather-bag", name: "Leather Bag", image: "bag.webp", date: "25-03-2025", location : "Bus Stand", description: "Black leather bag with documents", reportedBy: "Rahul", contact: "9876543210", pickup: "Ernakulam" }
    ];

    // Find the item by ID
    const item1 = lostItems.find(i => i.id === itemId);
    
    if (!item1) {
        document.body.innerHTML = "<h2>Item Not Found</h2>";
        return;
    }

    // Update the HTML with item details
    document.getElementById("item-name").innerText = item1.name;
    document.getElementById("item-image").src = item1.image;
    document.getElementById("item-details").innerHTML = `
        <p>Date Lost: ${item1.date}</p>
        <p>Location: ${item1.location}</p>
        <p>Location: ${item1.location}</p>
        <p>Location: ${item1.location}</p>
        <p>Description: ${item1.description}</p>
        <h3>Reported by:</h3>
        <p>Name: ${item1.reportedBy}</p>
        <p>Contact No: ${item1.contact}</p>
        <p>Pickup Location: ${item1.pickup}</p>
    `;

    console.log("Item details updated:", item1.name);
});
