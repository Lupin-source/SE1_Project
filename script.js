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
                    <p class="text-danger fw-bold">₱${product.price.toLocaleString()}</p>
                    <button class="btn btn-primary w-100" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `
        )
        .join("");
}

// Update cart UI
function updateCartUI() {
    const cartItems = document.getElementById("cart-items");
    const cartCounter = document.querySelector(".cart-counter");
    const cartTotal = document.getElementById("cart-total");

    cartCounter.textContent = cart.length;
    cartItems.innerHTML = cart.length
        ? cart
              .map(
                  (item) => `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <span>${item.name}</span>
            <span>₱${item.price.toLocaleString()}</span>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">&times;</button>
        </div>
    `
              )
              .join("")
        : `<p class="text-center">Your cart is empty.</p>`;

    cartTotal.textContent = cart.reduce((sum, item) => sum + item.price, 0).toLocaleString();
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add product to cart
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    cart.push(product);
    updateCartUI();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCartUI();
}

function setupEventListeners() {
    document.getElementById("cart-btn").addEventListener("click", () => {
        const offcanvas = new bootstrap.Offcanvas(cartSidebar);
        offcanvas.show();
    });
}

document.addEventListener("DOMContentLoaded", init);
