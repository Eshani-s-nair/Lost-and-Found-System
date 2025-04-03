document.addEventListener("DOMContentLoaded", function () {
    console.log("Loading found items...");

    fetch("fetch_found_items.php")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Data received:", data);
            if (!Array.isArray(data)) {
                throw new Error("Invalid data format received");
            }
            displayItems(data);
        })
        .catch(error => console.error("Error fetching items:", error));

    // Search functionality
    const searchBox = document.getElementById("searchBox");
    searchBox.addEventListener("input", function () {
        const query = searchBox.value.trim();
        if (query.length > 0) {
            fetch(`search_items.php?query=${query}`)
                .then(response => response.json())
                .then(results => {
                    const suggestionBox = document.getElementById("itemSuggestions");
                    suggestionBox.innerHTML = "";
                    results.forEach(item => {
                        const suggestion = document.createElement("div");
                        suggestion.classList.add("suggestion-item");
                        suggestion.textContent = item.name;
                        suggestion.addEventListener("click", () => {
                            window.location.href = `item.html?id=${item.id}`;
                        });
                        suggestionBox.appendChild(suggestion);
                    });
                })
                .catch(error => console.error("Error fetching search results:", error));
        }
    });
});

function displayItems(items) {
    const container = document.querySelector(".found"); // Ensure correct container selection
    container.innerHTML = ""; // Clear previous items

    items.forEach(item => {
        const box = document.createElement("div");
        box.classList.add("box");

        // Ensure proper image path handling
        let imagePath = item.image_path ? item.image_path : "uploads/default.png";

        // Create image element
        const img = document.createElement("img");
        img.src = imagePath;
        img.alt = "Item Image";
        img.onerror = function () {
            this.src = "uploads/default.png"; // Fallback for broken images
        };

        // Create details div
        const details = document.createElement("div");
        details.classList.add("details");
        details.innerHTML = `
            <h3>${item.category || "Unknown Category"}</h3>
            <p><strong>Description:</strong> ${item.description}</p>
 
            <p><strong>Date Found:</strong> ${item.date_found || "N/A"}</p>
            <p><strong>Location:</strong> ${item.location || "Unknown"}</p>
            <a href="item.html?id=${item.id}" class="details-btn">View Details</a>
        `;

        // Append elements to box
        box.appendChild(img);
        box.appendChild(details);

        // Append box to container
        container.appendChild(box);
    });
}

