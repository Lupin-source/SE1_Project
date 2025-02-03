const products = [
    // Processor
    { id: 1, name: 'AMD Ryzen 5 5600X', price: 14999, category: 'processor', image: 'https://placehold.co/600x400?text=Ryzen+5+5600X', description: 'A powerful 6-core processor with high efficiency for gaming and productivity.' },
    { id: 2, name: 'Intel Core i7-12700K', price: 21999, category: 'processor', image: 'https://placehold.co/600x400?text=Intel+i7-12700K', description: 'A high-performance 12th Gen Intel processor with great multitasking capabilities.' },
    { id: 3, name: 'AMD Ryzen 9 7950X', price: 39999, category: 'processor', image: 'https://placehold.co/600x400?text=Ryzen+9+7950X', description: 'Top-tier AMD processor with 16 cores, designed for extreme workloads and gaming.' },

    // Motherboard
    { id: 4, name: 'ASUS ROG Strix X570', price: 17999, category: 'motherboard', image: 'https://placehold.co/600x400?text=ASUS+X570', description: 'A premium gaming motherboard with PCIe 4.0 and robust cooling solutions.' },
    { id: 5, name: 'MSI MAG B550', price: 13999, category: 'motherboard', image: 'https://placehold.co/600x400?text=MSI+B550', description: 'A reliable and durable B550 chipset motherboard for Ryzen processors.' },
    { id: 6, name: 'Gigabyte AORUS B450', price: 9999, category: 'motherboard', image: 'https://placehold.co/600x400?text=Gigabyte+B450', description: 'An affordable yet feature-rich motherboard for gaming and overclocking.' },

    // Graphics Card
    { id: 7, name: 'NVIDIA RTX 3060', price: 32999, category: 'graphics-card', image: 'https://placehold.co/600x400?text=RTX+3060', description: 'A mid-range gaming GPU with ray tracing and DLSS support.' },
    { id: 8, name: 'NVIDIA RTX 3080', price: 59999, category: 'graphics-card', image: 'https://placehold.co/600x400?text=RTX+3080', description: 'A high-performance graphics card for 4K gaming and content creation.' },
    { id: 9, name: 'AMD Radeon RX 6700XT', price: 47999, category: 'graphics-card', image: 'https://placehold.co/600x400?text=RX+6700XT', description: 'A powerful AMD GPU for smooth gaming at 1440p resolution.' },

    // Memory
    { id: 10, name: 'Corsair 16GB DDR4 RAM', price: 4999, category: 'memory', image: 'https://placehold.co/600x400?text=Corsair+16GB+DDR4', description: 'High-speed DDR4 RAM for fast and responsive multitasking.' },
    { id: 11, name: 'G.Skill Trident Z 32GB DDR5', price: 12999, category: 'memory', image: 'https://placehold.co/600x400?text=GSkill+32GB+DDR5', description: 'Next-gen DDR5 RAM optimized for extreme performance.' },
    { id: 12, name: 'Kingston Fury Beast 64GB DDR4', price: 19999, category: 'memory', image: 'https://placehold.co/600x400?text=Kingston+64GB', description: 'High-capacity RAM for intensive workloads and gaming.' },

    // Power Supply
    { id: 13, name: 'EVGA 750W Gold', price: 7999, category: 'power-supply', image: 'https://placehold.co/600x400?text=EVGA+750W', description: 'A reliable 750W power supply with 80 Plus Gold efficiency.' },
    { id: 14, name: 'Corsair RM850X', price: 9999, category: 'power-supply', image: 'https://placehold.co/600x400?text=Corsair+RM850X', description: 'Fully modular 850W PSU for high-performance builds.' },
    { id: 15, name: 'Seasonic Focus 1000W', price: 12999, category: 'power-supply', image: 'https://placehold.co/600x400?text=Seasonic+1000W', description: 'A powerful and stable PSU designed for overclocking and extreme performance.' },

    // PC Case
    { id: 16, name: 'Lian Li PC-O11 Dynamic', price: 12999, category: 'pc-case', image: 'https://placehold.co/600x400?text=LianLi+O11', description: 'A premium PC case with tempered glass and excellent airflow.' },
    { id: 17, name: 'NZXT H710', price: 10999, category: 'pc-case', image: 'https://placehold.co/600x400?text=NZXT+H710', description: 'A stylish case with spacious interior and great cooling support.' },
    { id: 18, name: 'Cooler Master TD500', price: 6999, category: 'pc-case', image: 'https://placehold.co/600x400?text=CM+TD500', description: 'A mid-tower case with mesh front panel for enhanced airflow.' },

    // Laptops
    { id: 19, name: 'MacBook Air M2', price: 69999, category: 'laptops', image: 'https://placehold.co/600x400?text=MacBook+Air+M2', description: 'An ultra-light laptop with Apple’s M2 chip for performance and efficiency.' },
    { id: 20, name: 'ASUS ROG Strix G17', price: 89999, category: 'laptops', image: 'https://placehold.co/600x400?text=ROG+Strix+G17', description: 'A high-performance gaming laptop with AMD Ryzen and RTX graphics.' },
    { id: 21, name: 'Lenovo Legion 5', price: 74999, category: 'laptops', image: 'https://placehold.co/600x400?text=Legion+5', description: 'A gaming laptop with a powerful GPU and cooling system.' },

    // Monitor
    { id: 16, name: 'Samsung Odyssey G9', price: 69999, category: 'monitor', image: 'https://placehold.co/600x400?text=Odyssey+G9', description: 'A curved ultra-wide gaming monitor with a 240Hz refresh rate for smooth gameplay.' },
    { id: 17, name: 'ASUS TUF VG27AQ', price: 32999, category: 'monitor', image: 'https://placehold.co/600x400?text=ASUS+VG27AQ', description: 'A high-performance 27-inch gaming monitor with 165Hz refresh rate and G-Sync compatibility.' },
    { id: 18, name: 'LG UltraGear 32-inch', price: 49999, category: 'monitor', image: 'https://placehold.co/600x400?text=LG+UltraGear', description: 'A large 32-inch gaming monitor with fast response times and stunning visuals.' },

    // Keyboard
    { id: 19, name: 'Keychron K6 Wireless', price: 6999, category: 'keyboard', image: 'https://placehold.co/600x400?text=Keychron+K6', description: 'A compact mechanical keyboard with Bluetooth connectivity and hot-swappable switches.' },
    { id: 20, name: 'Razer Huntsman Mini', price: 8999, category: 'keyboard', image: 'https://placehold.co/600x400?text=Razer+Huntsman', description: 'A 60% gaming keyboard with ultra-fast optical switches for precision gaming.' },
    { id: 21, name: 'SteelSeries Apex Pro', price: 11999, category: 'keyboard', image: 'https://placehold.co/600x400?text=Apex+Pro', description: 'A premium gaming keyboard with adjustable actuation switches and customizable RGB.' },

    // Mouse
    { id: 22, name: 'Logitech G Pro Wireless', price: 7999, category: 'mouse', image: 'https://placehold.co/600x400?text=Logitech+G+Pro', description: 'A lightweight wireless gaming mouse designed for esports professionals.' },
    { id: 23, name: 'Razer DeathAdder V2', price: 5999, category: 'mouse', image: 'https://placehold.co/600x400?text=DeathAdder+V2', description: 'An ergonomic gaming mouse with high-precision optical sensor and ultra-fast response time.' },
    { id: 24, name: 'Corsair M65 RGB Elite', price: 4999, category: 'mouse', image: 'https://placehold.co/600x400?text=Corsair+M65', description: 'A durable gaming mouse with customizable weight and sniper button for FPS games.' },


    // Headset
    { id: 22, name: 'HyperX Cloud II', price: 7999, category: 'headset', image: 'https://placehold.co/600x400?text=HyperX+Cloud+II', description: 'A comfortable gaming headset with 7.1 surround sound.' },
    { id: 23, name: 'SteelSeries Arctis Pro', price: 12999, category: 'headset', image: 'https://placehold.co/600x400?text=Arctis+Pro', description: 'High-fidelity gaming headset with a premium audio experience.' },
    { id: 24, name: 'Razer BlackShark V2', price: 8999, category: 'headset', image: 'https://placehold.co/600x400?text=BlackShark+V2', description: 'A lightweight headset with advanced noise cancellation.' },

    // Speaker
    { id: 10, name: 'Logitech Z906 5.1', price: 19999, category: 'speaker', image: 'https://placehold.co/600x400?text=Logitech+Z906', description: 'A 5.1 surround sound speaker system for immersive audio.' },
    { id: 11, name: 'Bose Companion 2', price: 7999, category: 'speaker', image: 'https://placehold.co/600x400?text=Bose+Companion+2', description: 'Compact, high-quality speakers with rich stereo sound.' },
    { id: 12, name: 'JBL Quantum Duo', price: 9999, category: 'speaker', image: 'https://placehold.co/600x400?text=JBL+Quantum', description: 'Gaming speakers with customizable lighting and deep bass.' },

    // Network Devices
    { id: 13, name: 'TP-Link Archer AX6000', price: 9999, category: 'network-devices', image: 'https://placehold.co/600x400?text=Archer+AX6000', description: 'A high-speed WiFi 6 router with ultra-fast connectivity.' },
    { id: 14, name: 'Netgear Nighthawk AX12', price: 14999, category: 'network-devices', image: 'https://placehold.co/600x400?text=Nighthawk+AX12', description: 'A premium router for gaming and 4K streaming with high performance.' },
    { id: 15, name: 'ASUS RT-AX86U', price: 12999, category: 'network-devices', image: 'https://placehold.co/600x400?text=ASUS+RT-AX86U', description: 'A dual-band WiFi 6 router with excellent range and speed.' }
];



/// Function to render selected category products while keeping original styling
function renderProductsByCategory(category) {
    const container = document.querySelector("#products-container .row");
    const filteredProducts = products.filter(product => product.category === category).slice(0, 3);

    if (filteredProducts.length > 0) {
        container.innerHTML = filteredProducts.map(product => `
            <div class="col-md-4">
                <div class="card shadow-sm">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="text-muted">${product.category.toUpperCase()}</p>
                        <p class="text-danger fw-bold">₱${product.price.toLocaleString()}</p>
                        <p class="product-description">${product.description}</p>
                        <div class="button-container">
                            <button class="cartBtn" onclick="addToCart(${product.id})">ADD TO CART</button>
                            <button class="buyNowBtn" onclick="buyNow(${product.id})">BUY NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        `).join("");
    }
}


// Event listener for collection card clicks
document.querySelectorAll(".collection-card").forEach(card => {
    card.addEventListener("click", function() {
        const selectedCategory = this.getAttribute("data-category");
        renderProductsByCategory(selectedCategory);
    });
});

// Render default products when the page loads (optional)
document.addEventListener("DOMContentLoaded", () => {
    renderProductsByCategory("processor"); // Default category
});



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
// Function to check if user is logged in and update navbar
function checkAuthentication() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        window.location.href = "login.html"; // Redirect if not logged in
    } else {
        document.getElementById("username-display").textContent = `Welcome, ${loggedInUser.username}`;
    }
}

// Function to logout user
document.getElementById("logout-btn").addEventListener("click", function() {
    localStorage.removeItem("loggedInUser"); // Remove session data
    window.location.href = "login.html"; // Redirect to login
});

// Run authentication check when the page loads
document.addEventListener("DOMContentLoaded", checkAuthentication);

// Logout Function
document.getElementById("logout-btn").addEventListener("click", function() {
    localStorage.removeItem("user"); // Remove user from localStorage
    window.location.href = "login.html"; // Redirect to login page
});
