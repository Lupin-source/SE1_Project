const products = [
    { 
        id: 1, 
        name: 'AMD Ryzen 9 7950X', 
        price: 39999, // Price in PHP
        category: 'components', 
        image: 'https://placehold.co/600x400?text=AMD+Ryzen+9+7950X' 
    },
    { 
        id: 2, 
        name: 'NVIDIA RTX 4090', 
        price: 89999, // Price in PHP
        category: 'components', 
        image: 'https://placehold.co/600x400?text=NVIDIA+RTX+4090' 
    },
    { 
        id: 3, 
        name: 'Corsair 32GB DDR5 RAM', 
        price: 10999, // Price in PHP
        category: 'components', 
        image: 'https://placehold.co/600x400?text=Corsair+32GB+DDR5+RAM' 
    },
    { 
        id: 4, 
        name: 'ASUS ROG Crosshair X670E', 
        price: 34999, // Price in PHP
        category: 'components', 
        image: 'https://placehold.co/600x400?text=ASUS+ROG+Crosshair+X670E' 
    },
    { 
        id: 5, 
        name: 'Noctua NH-D15 Chromax', 
        price: 5999, // Price in PHP
        category: 'components', 
        image: 'https://placehold.co/600x400?text=Noctua+NH-D15+Chromax' 
    },
    { 
        id: 6, 
        name: 'Logitech MX Master 3S', 
        price: 5999, // Price in PHP
        category: 'peripherals', 
        image: 'https://placehold.co/600x400?text=Logitech+MX+Master+3S' 
    },
    { 
        id: 7, 
        name: 'Keychron K8 Pro Keyboard', 
        price: 7999, // Price in PHP
        category: 'peripherals', 
        image: 'https://placehold.co/600x400?text=Keychron+K8+Pro' 
    },
    { 
        id: 8, 
        name: 'Samsung Odyssey G9 Monitor', 
        price: 69999, // Price in PHP
        category: 'peripherals', 
        image: 'https://placehold.co/600x400?text=Samsung+Odyssey+G9' 
    },
    { 
        id: 9, 
        name: 'Bose QuietComfort 45', 
        price: 17999, // Price in PHP
        category: 'peripherals', 
        image: 'https://placehold.co/600x400?text=Bose+QuietComfort+45' 
    },
    { 
        id: 10, 
        name: 'Blue Yeti X Microphone', 
        price: 8999, // Price in PHP
        category: 'peripherals', 
        image: 'https://placehold.co/600x400?text=Blue+Yeti+X' 
    },
    { 
        id: 11, 
        name: 'Samsung 990 Pro 2TB', 
        price: 9999, // Price in PHP
        category: 'storage', 
        image: 'https://placehold.co/600x400?text=Samsung+990+Pro+2TB' 
    },
    { 
        id: 12, 
        name: 'WD Black SN850X 4TB', 
        price: 15999, // Price in PHP
        category: 'storage', 
        image: 'https://placehold.co/600x400?text=WD+Black+SN850X+4TB' 
    },
    { 
        id: 13, 
        name: 'Seagate IronWolf 12TB HDD', 
        price: 13999, // Price in PHP
        category: 'storage', 
        image: 'https://placehold.co/600x400?text=Seagate+IronWolf+12TB' 
    },
    { 
        id: 14, 
        name: 'SanDisk Extreme Portable SSD', 
        price: 6999, // Price in PHP
        category: 'storage', 
        image: 'https://placehold.co/600x400?text=SanDisk+Extreme+Portable' 
    },
    { 
        id: 15, 
        name: 'Crucial P5 Plus 1TB', 
        price: 4999, // Price in PHP
        category: 'storage', 
        image: 'https://placehold.co/600x400?text=Crucial+P5+Plus+1TB' 
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartSidebar = document.getElementById("cart-sidebar");
const cartOverlay = document.getElementById("cart-overlay");

function init() {
    renderProducts();
    updateCartUI();
    setupEventListeners();
}

// Render products dynamically
function renderProducts(productsToShow = products) {
    const container = document.getElementById("products-container");
    container.innerHTML = productsToShow
        .map(
            (product) => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p class="product-category">${product.category.toUpperCase()}</p>
            <p class="product-price">₱${product.price.toLocaleString()}</p>
            <button class="btn primary-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `
        )
        .join("");
}

// Update cart UI in the sidebar
function updateCartUI() {
    const cartCounter = document.querySelector(".cart-counter");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    // Update cart counter
    cartCounter.textContent = cart.length;

    // Update cart items
    cartItems.innerHTML = cart.length
        ? cart
              .map(
                  (item) => `
        <div class="cart-item">
            <div class="item-details">
                <span class="item-name">${item.name}</span>
                <span class="item-price">₱${item.price.toLocaleString()}</span>
            </div>
            <button class="btn danger-btn" onclick="removeFromCart(${item.id})">&times;</button>
        </div>
    `
              )
              .join("")
        : '<p class="empty-cart">Your cart is empty.</p>';

    // Update total price
    cartTotal.textContent = cart
        .reduce((sum, item) => sum + item.price, 0)
        .toLocaleString();

    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add a product to the cart
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    cart.push({ ...product });
    updateCartUI();

    // Show notification
    showNotification(`${product.name} added to cart.`);
}

// Remove a product from the cart
function removeFromCart(productId) {
    const index = cart.findIndex((item) => item.id === productId);
    if (index > -1) {
        const removedProduct = cart[index];
        cart.splice(index, 1);
        updateCartUI();

        // Show notification
        showNotification(`${removedProduct.name} removed from cart.`);
    }
}

// Show or hide the cart sidebar
function toggleCart() {
    const isVisible = cartSidebar.classList.toggle("cart-visible");
    cartOverlay.style.display = isVisible ? "block" : "none";
}

// Display a notification
function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("fade-out");
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

// Setup event listeners
function setupEventListeners() {
    // Category filtering
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const category = link.dataset.category;

            document
                .querySelectorAll(".nav-link")
                .forEach((l) => l.classList.remove("active"));
            link.classList.add("active");

            const filteredProducts =
                category === "all"
                    ? products
                    : products.filter((p) => p.category === category);

            renderProducts(filteredProducts);
        });
    });

    // Cart sidebar events
    document.getElementById("cart-btn").addEventListener("click", toggleCart);
    document.querySelector(".close-cart").addEventListener("click", toggleCart);
    cartOverlay.addEventListener("click", toggleCart);

    // Checkout button
    document.getElementById("checkout-btn").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert("Redirecting to checkout...");
        cart = [];
        updateCartUI();
        closeCart();
    });
}

// Initialize app
init();
