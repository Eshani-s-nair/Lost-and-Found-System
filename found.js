document.addEventListener("DOMContentLoaded", function () {
    console.log("found.js is loaded!");

    // Sample Found Items Data
    const foundItems = [
        { id: "rolex-watch", name: "Rolex Watch", image: "watch.webp", location: "Near Nedumbasherry" },
        { id: "leather-bag", name: "Leather Bag", image: "bag.webp", location: "Bus Stand" }
    ];

    const container = document.querySelector(".found");
    const searchBox = document.getElementById("searchBox");
    const suggestionsBox = document.getElementById("itemSuggestions");

    // Function to create item card
    function createFoundCard(item) {
        let card = document.createElement("div");
        card.classList.add("box");
        card.innerHTML = `
            <img src="${item.image}" width="180px" height="200px" alt="${item.name}">
            <h4>${item.name}</h4>
            <p>Location: ${item.location}</p>
            <a href="item.html?id=${item.id}">Check details</a>
        `;
        container.appendChild(card);
    }

    // Load all found items
    function displayItems() {
        container.innerHTML = "";
        foundItems.forEach(item => createFoundCard(item));
    }

    // Search function
    searchBox.addEventListener("input", function () {
        let query = searchBox.value.toLowerCase();
        let filteredItems = foundItems.filter(item => item.name.toLowerCase().includes(query));
        
        suggestionsBox.innerHTML = "";
        filteredItems.forEach(item => {
            let suggestion = document.createElement("div");
            suggestion.classList.add("suggestion-item");
            suggestion.textContent = item.name;
            suggestion.addEventListener("click", function () {
                window.location.href = `item.html?id=${item.id}`;
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


