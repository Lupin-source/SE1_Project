const products = [
    // Components
    { id: 1, name: 'AMD Ryzen 9 7950X', price: 699, category: 'components', image: 'https://example.com/cpu.jpg' },
    { id: 2, name: 'NVIDIA RTX 4090', price: 1599, category: 'components', image: 'https://example.com/gpu.jpg' },
    { id: 3, name: 'Corsair 32GB DDR5 RAM', price: 199, category: 'components', image: 'https://example.com/ram.jpg' },
    { id: 4, name: 'ASUS ROG Crosshair X670E', price: 649, category: 'components', image: 'https://example.com/mobo.jpg' },
    { id: 5, name: 'Noctua NH-D15 Chromax', price: 109, category: 'components', image: 'https://example.com/cooler.jpg' },
    
    // Peripherals
    { id: 6, name: 'Logitech MX Master 3S', price: 99, category: 'peripherals', image: 'https://example.com/mouse.jpg' },
    { id: 7, name: 'Keychron K8 Pro', price: 149, category: 'peripherals', image: 'https://example.com/keyboard.jpg' },
    { id: 8, name: 'Samsung Odyssey G9', price: 1299, category: 'peripherals', image: 'https://example.com/monitor.jpg' },
    { id: 9, name: 'Bose QuietComfort 45', price: 329, category: 'peripherals', image: 'https://example.com/headphones.jpg' },
    { id: 10, name: 'Blue Yeti X', price: 169, category: 'peripherals', image: 'https://example.com/mic.jpg' },
    
    // Storage
    { id: 11, name: 'Samsung 990 Pro 2TB', price: 179, category: 'storage', image: 'https://example.com/ssd.jpg' },
    { id: 12, name: 'WD Black SN850X 4TB', price: 299, category: 'storage', image: 'https://example.com/ssd2.jpg' },
    { id: 13, name: 'Seagate IronWolf 12TB', price: 249, category: 'storage', image: 'https://example.com/hdd.jpg' },
    { id: 14, name: 'SanDisk Extreme Portable', price: 129, category: 'storage', image: 'https://example.com/portable-ssd.jpg' },
    { id: 15, name: 'Crucial P5 Plus 1TB', price: 89, category: 'storage', image: 'https://example.com/ssd3.jpg' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');

// Initialize application
function init() {
    renderProducts();
    updateCartUI();
    setupEventListeners();
}

// Render products with filtering
function renderProducts(productsToShow = products) {
    const container = document.getElementById('products-container');
    container.innerHTML = productsToShow.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p class="product-category">${product.category.toUpperCase()}</p>
            <p class="product-price">$${product.price}</p>
            <button class="btn primary-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
}

// Cart functionality
function updateCartUI() {
    document.querySelector('.cart-counter').textContent = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart));
    
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>$${item.price}</span>
            <button class="btn danger-btn" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');

    document.getElementById('cart-total').textContent = 
        cart.reduce((sum, item) => sum + item.price, 0);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push({...product});
    updateCartUI();
    
    // Add pulse animation
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.classList.add('added');
    setTimeout(() => cartIcon.classList.remove('added'), 500);
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart.splice(index, 1);
        updateCartUI();
    }
}

// Navigation filtering
function setupEventListeners() {
    // Category filtering
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const filteredProducts = category === 'all' 
                ? products 
                : products.filter(p => p.category === category);
            
            renderProducts(filteredProducts);
        });
    });

    // Cart functionality
    document.getElementById('cart-btn').addEventListener('click', toggleCart);
    document.querySelector('.close-cart').addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    // Checkout
    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Redirecting to checkout...');
        cart = [];
        updateCartUI();
        closeCart();
    });
}

function toggleCart() {
    cartSidebar.classList.toggle('cart-visible');
    cartOverlay.style.display = cartSidebar.classList.contains('cart-visible') ? 'block' : 'none';
}

function closeCart() {
    cartSidebar.classList.remove('cart-visible');
    cartOverlay.style.display = 'none';
}

// Initialize app
init();