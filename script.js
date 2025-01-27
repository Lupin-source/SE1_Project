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

function init() {
    renderProducts();
    updateCartUI();
    setupEventListeners();
}

// Render products dynamically
function renderProducts(productsToShow = products) {
    const container = document.querySelector("#products-container .row");
    container.innerHTML = productsToShow
        .map(
            (product) => `
        <div class="col-md-4">
            <div class="card shadow-sm">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="text-muted">${product.category.toUpperCase()}</p>
                    <p class="text-danger">₱${product.price.toLocaleString()}</p>
                    <div class="button-container">
                        <button class="cartBtn" onclick="addToCart(${product.id})">
                            <svg class="cart" fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                            </svg>
                            ADD TO CART
                        </button>
                        <button class="buyNowBtn" onclick="buyNow(${product.id})">
                            <svg class="cart" fill="white" viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"></path>
                            </svg>
                            BUY NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
        )
        .join("");
}




// Add product to cart
function addToCart(productId) {
    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product exists
    } else {
        const product = products.find((p) => p.id === productId);
        cart.push({ ...product, quantity: 1 }); // Add product with quantity 1
    }

    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    const cartItems = document.getElementById("cart-items");
    const cartCounter = document.querySelector(".cart-counter");
    const cartTotal = document.getElementById("cart-total");

    cartCounter.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="text-center">Your cart is empty.</p>`;
    } else {
        cartItems.innerHTML = cart
            .map(
                (item) => `
                <div class="cart-item d-flex justify-content-between align-items-center py-2">
                    <div class="cart-item-details">
                        <h6 class="cart-item-name">${item.name}</h6>
                        <small class="cart-item-price">₱${item.price.toLocaleString()} x${item.quantity}</small>
                    </div>
                    <div class="cart-item-actions">
                        <button class="btn btn-sm btn-outline-success" onclick="increaseQuantity(${item.id})">+</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="decreaseQuantity(${item.id})">-</button>
                        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">&times;</button>
                    </div>
                </div>
            `
            )
            .join("");
    }

    cartTotal.textContent = cart
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toLocaleString();

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
function addToCart(productId) {
    const existingProduct = cart.find((item) => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if the product exists
    } else {
        const product = products.find((p) => p.id === productId);
        cart.push({ ...product, quantity: 1 }); // Add product with initial quantity
    }

    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    const cartItems = document.getElementById("cart-items");
    const cartCounter = document.querySelector(".cart-counter");
    const cartTotal = document.getElementById("cart-total");

    // Update cart counter
    cartCounter.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="text-center">Your cart is empty.</p>`;
    } else {
        cartItems.innerHTML = cart
            .map(
                (item) => `
                <div class="cart-item">
                    <div class="cart-item-details">
                        <h6 class="cart-item-name">${item.name}</h6>
                        <small class="cart-item-price">₱${item.price.toLocaleString()} x${item.quantity}</small>
                    </div>
                    <div class="cart-item-actions">
                        <button onclick="increaseQuantity(${item.id})">+</button>
                        <button onclick="decreaseQuantity(${item.id})">-</button>
                        <button onclick="removeFromCart(${item.id})">&times;</button>
                    </div>
                </div>
            `
            )
            .join("");
    }

    // Update total price
    cartTotal.textContent = `₱${cart
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toLocaleString()}`;

    localStorage.setItem("cart", JSON.stringify(cart));
}

// Increase quantity
function increaseQuantity(productId) {
    const product = cart.find((item) => item.id === productId);
    if (product) product.quantity += 1;
    updateCartUI();
}

// Decrease quantity
function decreaseQuantity(productId) {
    const product = cart.find((item) => item.id === productId);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
    } else {
        removeFromCart(productId);
    }
    updateCartUI();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCartUI();
}

// Show the cart when clicked
document.getElementById("cart-btn").addEventListener("click", () => {
    const offcanvas = new bootstrap.Offcanvas(cartSidebar);
    offcanvas.show();
});



function setupEventListeners() {
    document.getElementById("cart-btn").addEventListener("click", () => {
        const offcanvas = new bootstrap.Offcanvas(cartSidebar);
        offcanvas.show();
    });
}

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("DOMContentLoaded", () => {
    const collectionCarousel = document.getElementById("collection-carousel");
    const leftBtn = document.getElementById("collection-left-btn");
    const rightBtn = document.getElementById("collection-right-btn");

    leftBtn.addEventListener("click", () => {
        collectionCarousel.scrollBy({
            left: -150, // Adjust scroll distance as needed
            behavior: "smooth",
        });
    });

    rightBtn.addEventListener("click", () => {
        collectionCarousel.scrollBy({
            left: 150, // Adjust scroll distance as needed
            behavior: "smooth",
        });
    });
});
