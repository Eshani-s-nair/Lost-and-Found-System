document.addEventListener("DOMContentLoaded", function () {
    console.log("lost.js is loaded!");

    // Sample Found Items Data
    const lostItems = [
        { id: "rolex-watch", name: "Rolex Watch", image: "watch.webp", location: "Near Nedumbasherry" },
        { id: "leather-bag", name: "Leather Bag", image: "bag.webp", location: "Bus Stand"}
    ];

    const container = document.querySelector(".lost");
    const searchBox = document.getElementById("searchBox");
    const suggestionsBox = document.getElementById("itemSuggestions");

    // Function to create item card
    function createLostCard(item1) {
        let card = document.createElement("div");
        card.classList.add("box");
        card.innerHTML = `
            <img src="${item1.image}" width="180px" height="200px" alt="${item1.name}">
            <h4>${item1.name}</h4>
             <p>Location: ${item1.location}</p>
            <a href="item1.html?id=${item1.id}">Check details</a>
        `;
        container.appendChild(card);
    }

    // Load all found items
    function displayItems() {
        container.innerHTML = "";
        lostItems.forEach(item1 => createLostCard(item1));
    }

    // Search function
    searchBox.addEventListener("input", function () {
        let query = searchBox.value.toLowerCase();
        let filteredItems = lostItems.filter(item1 => item1.name.toLowerCase().includes(query));
        
        suggestionsBox.innerHTML = "";
        filteredItems.forEach(item1 => {
            let suggestion = document.createElement("div");
            suggestion.classList.add("suggestion-item");
            suggestion.textContent = item1.name;
            suggestion.addEventListener("click", function () {
                window.location.href = `item1.html?id=${item1.id}`;
            });
            suggestionsBox.appendChild(suggestion);
        });

        suggestionsBox.style.display = filteredItems.length ? "block" : "none";
    });

    // Initialize items on page load
    displayItems();
});


//search bar suggession function change the item set to database items
document.addEventListener("DOMContentLoaded", function () {
    let searchBox = document.getElementById("searchBox");
    let suggestionBox = document.getElementById("itemSuggestions");

    let items = [
        "Black Wallet",
        "Blue Water Bottle",
        "iPhone 12",
        "Car Keys",
        "Red Backpack",
        "Samsung Galaxy S21",
        "Laptop Bag",
        "Apple AirPods",
        "Waterproof Jacket",
        "Wrist Watch"
    ];

    function showItemSuggestions() {
        let input = searchBox.value.toLowerCase();
        suggestionBox.innerHTML = "";

        if (input === "") {
            return;
        }

        let filteredResults = items.filter(item => item.toLowerCase().includes(input));

        filteredResults.forEach(item => {
            let div = document.createElement("div");
            div.textContent = item;
            div.classList.add("suggestion-item");
            div.onclick = function () {
                searchBox.value = item;
                suggestionBox.innerHTML = "";
            };
            suggestionBox.appendChild(div);
        });
    }

    searchBox.addEventListener("keyup", showItemSuggestions);

    document.addEventListener("click", function (event) {
        if (!searchBox.contains(event.target) && !suggestionBox.contains(event.target)) {
            suggestionBox.innerHTML = ""; // Hide suggestions when clicking outside
        }
    });
});
