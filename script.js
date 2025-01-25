// Sample products data
const products = [
    { id: 1, name: 'RTX 4090 GPU', price: 1599, image: 'https://example.com/gpu.jpg' },
    { id: 2, name: 'Ryzen 9 7950X', price: 699, image: 'https://example.com/cpu.jpg' },
    { id: 3, name: '32GB DDR5 RAM', price: 199, image: 'https://example.com/ram.jpg' },
    { id: 4, name: '1TB NVMe SSD', price: 129, image: 'https://example.com/ssd.jpg' },
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');

// Initialize products
function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
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
}

function removeFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart.splice(index, 1);
        updateCartUI();
    }
}

// Cart visibility functions
function toggleCart() {
    cartSidebar.classList.toggle('cart-visible');
    cartOverlay.style.display = cartSidebar.classList.contains('cart-visible') ? 'block' : 'none';
}

function closeCart() {
    cartSidebar.classList.remove('cart-visible');
    cartOverlay.style.display = 'none';
}

// Event listeners
document.getElementById('cart-btn').addEventListener('click', toggleCart);
document.querySelector('.close-cart').addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Proceeding to checkout...');
});

// Initial render
renderProducts();
updateCartUI();