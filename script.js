// Product data
const products = [
    { name: 'Classic White Shirt', category: 'men', price: 49.99, size: 'M', img: 'https://images.unsplash.com/photo-1583743814966-8936f970b74b?auto=format&fit=crop&w=500&q=60' },
    { name: 'Denim Jacket', category: 'men', price: 89.99, size: 'L', img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=60' },
    { name: 'Floral Dress', category: 'women', price: 69.99, size: 'S', img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=500&q=60' },
    { name: 'Chinos', category: 'men', price: 59.99, size: 'XL', img: 'https://images.unsplash.com/photo-1618371518539-e2601d1a3b7d?auto=format&fit=crop&w=500&q=60' }
];

// Cart functionality
let cart = [];
let cartCount = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    cartCount++;
    document.querySelector('.cart-count').textContent = cartCount;
    updateOrderSummary();
    alert(`${name} added to cart!`);
}

function updateOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    const totalAmount = document.getElementById('total-amount');
    if (cart.length === 0) {
        orderSummary.innerHTML = '<p class="text-gray-600">Your cart is empty.</p>';
        totalAmount.textContent = '$0.00';
    } else {
        orderSummary.innerHTML = cart.map(item => `
            <div class="flex justify-between text-gray-700">
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
            </div>
        `).join('');
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        totalAmount.textContent = `$${total.toFixed(2)}`;
    }
}

// Toggle mobile menu
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
    menu.classList.toggle('active');
}

// Carousel functionality
let currentSlide = 0;
const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;
const dots = document.querySelectorAll('.pagination-dot');

function updateCarousel() {
    const offset = -currentSlide * (100 / (window.innerWidth >= 768 ? 3 : 1));
    carousel.style.transform = `translateX(${offset}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

setInterval(nextSlide, 5000);

// Product filter functionality
function filterProducts() {
    const category = document.getElementById('category-filter').value;
    const price = document.getElementById('price-filter').value;
    const size = document.getElementById('size-filter').value;
    const productGrid = document.getElementById('product-grid');

    const filteredProducts = products.filter(product => {
        const categoryMatch = category === 'all' || product.category === category;
        let priceMatch = true;
        if (price !== 'all') {
            if (price === '0-50') priceMatch = product.price <= 50;
            else if (price === '50-100') priceMatch = product.price > 50 && product.price <= 100;
            else if (price === '100+') priceMatch = product.price > 100;
        }
        const sizeMatch = size === 'all' || product.size === size;
        return categoryMatch && priceMatch && sizeMatch;
    });

    productGrid.innerHTML = filteredProducts.length > 0 ? filteredProducts.map(product => `
        <div class="product-card bg-white rounded-xl shadow-lg overflow-hidden" data-tilt data-tilt-max="10" data-tilt-speed="400" data-tilt-perspective="1000" data-category="${product.category}" data-price="${product.price}" data-size="${product.size}">
            <img src="${product.img}" onerror="this.src='https://via.placeholder.com/500x500?text=Image+Not+Found'" alt="${product.name}" class="w-full h-64 object-cover">
            <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                <p class="text-gray-600">$${product.price.toFixed(2)}</p>
                <button class="mt-4 w-full btn-gradient text-white py-2 rounded-lg font-medium hover:shadow-lg" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            </div>
        </div>
    `).join('') : '<p class="text-center col-span-full text-gray-600">No products found.</p>';

    // Reapply Vanilla Tilt to new product cards
    VanillaTilt.init(document.querySelectorAll('.product-card'), {
        max: 10,
        speed: 400,
        perspective: 1000
    });
}

// Search functionality
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const productGrid = document.getElementById('product-grid');

    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));

    productGrid.innerHTML = filteredProducts.length > 0 ? filteredProducts.map(product => `
        <div class="product-card bg-white rounded-xl shadow-lg overflow-hidden" data-tilt data-tilt-max="10" data-tilt-speed="400" data-tilt-perspective="1000" data-category="${product.category}" data-price="${product.price}" data-size="${product.size}">
            <img src="${product.img}" onerror="this.src='https://via.placeholder.com/500x500?text=Image+Not+Found'" alt="${product.name}" class="w-full h-64 object-cover">
            <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                <p class="text-gray-600">$${product.price.toFixed(2)}</p>
                <button class="mt-4 w-full btn-gradient text-white py-2 rounded-lg font-medium hover:shadow-lg" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            </div>
        </div>
    `).join('') : '<p class="text-center col-span-full text-gray-600">No products found.</p>';

    // Reapply Vanilla Tilt to new product cards
    VanillaTilt.init(document.querySelectorAll('.product-card'), {
        max: 10,
        speed: 400,
        perspective: 1000
    });
}

// Checkout navigation
document.querySelector('a[href="#cart"]').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
    document.getElementById('checkout').classList.remove('hidden');
});

// Place order functionality
function placeOrder() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    if (!name || !email || !address) {
        alert('Please fill in all required fields.');
        return;
    }

    alert('Order placed successfully!');
    cart = [];
    cartCount = 0;
    document.querySelector('.cart-count').textContent = cartCount;
    updateOrderSummary();
    document.getElementById('checkout').classList.add('hidden');
    document.getElementById('shop').classList.remove('hidden');
}

// Initialize Vanilla Tilt for product cards
document.addEventListener('DOMContentLoaded', () => {
    VanillaTilt.init(document.querySelectorAll('.product-card'), {
        max: 10,
        speed: 400,
        perspective: 1000
    });
    updateCarousel();
    dots[0].classList.add('active');
});