// Product data
const products = [
    {
        name: 'Classic White Shirt',
        category: ['men', 'summer', 'sale'],
        price: 49.99,
        size: 'M',
        img: 'https://images.unsplash.com/photo-1525171254930-643fc83d4b27?auto=format&fit=crop&w=500&q=60',
        images: [
            { src: 'https://images.unsplash.com/photo-1525171254930-643fc83d4b27?auto=format&fit=crop&w=200&q=60', alt: 'Classic White Shirt Angle 1' },
            { src: 'https://images.unsplash.com/photo-1604001592634-7c98029d5c34?auto=format&fit=crop&w=200&q=60', alt: 'Classic White Shirt Angle 2' },
            { src: 'https://images.unsplash.com/photo-1598033129183-81c9eb1c25f0?auto=format&fit=crop&w=200&q=60', alt: 'Classic White Shirt Angle 3' }
        ],
        description: 'A timeless addition to your wardrobe, this classic white shirt is crafted from premium cotton.'
    },
    {
        name: 'Denim Jacket',
        category: ['men', 'urban'],
        price: 89.99,
        size: 'L',
        img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=500&q=60',
        images: [
            { src: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=200&q=60', alt: 'Denim Jacket Angle 1' },
            { src: 'https://images.unsplash.com/photo-1584865288642-42078c15fd33?auto=format&fit=crop&w=200&q=60', alt: 'Denim Jacket Angle 2' },
            { src: 'https://images.unsplash.com/photo-1601352750159-5c69f9e32b41?auto=format&fit=crop&w=200&q=60', alt: 'Denim Jacket Angle 3' }
        ],
        description: 'Elevate your casual style with this rugged denim jacket.'
    },
    {
        name: 'Floral Dress',
        category: ['women', 'festive'],
        price: 69.99,
        size: 'S',
        img: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=500&q=60',
        images: [
            { src: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=200&q=60', alt: 'Floral Dress Angle 1' },
            { src: 'https://images.unsplash.com/photo-1562302087-2db48e3e62e2?auto=format&fit=crop&w=200&q=60', alt: 'Floral Dress Angle 2' },
            { src: 'https://images.unsplash.com/photo-1591360238940-2b64ca6a7e22?auto=format&fit=crop&w=200&q=60', alt: 'Floral Dress Angle 3' }
        ],
        description: 'Make a statement with this vibrant floral dress.'
    },
    {
        name: 'Chinos',
        category: ['men', 'urban', 'sale'],
        price: 59.99,
        size: 'XL',
        img: 'https://images.unsplash.com/photo-1605515382736-96e5e8284d86?auto=format&fit=crop&w=500&q=60',
        images: [
            { src: 'https://images.unsplash.com/photo-1605515382736-96e5e8284d86?auto=format&fit=crop&w=200&q=60', alt: 'Chinos Angle 1' },
            { src: 'https://images.unsplash.com/photo-1598559093452-21478e6bf04d?auto=format&fit=crop&w=200&q=60', alt: 'Chinos Angle 2' },
            { src: 'https://images.unsplash.com/photo-1618355772224-4a0ea5be10f4?auto=format&fit=crop&w=200&q=60', alt: 'Chinos Angle 3' }
        ],
        description: 'Versatile chinos with a slim fit and stretch fabric.'
    }
];

// Cart functionality
let cart = [];
let cartCount = 0;

function addToCart(name, price) {
    const size = document.getElementById('size') ? document.getElementById('size').value : products.find(p => p.name === name).size;
    const quantity = document.getElementById('quantity') ? parseInt(document.getElementById('quantity').value) : 1;
    if (quantity < 1) {
        alert('Please select a valid quantity.');
        return;
    }
    for (let i = 0; i < quantity; i++) {
        cart.push({ name, price, size });
        cartCount++;
    }
    document.querySelector('.cart-count').textContent = cartCount;
    updateOrderSummary();
    alert(`${quantity} x ${name} (Size: ${size}) added to cart!`);
}

function addToCartDynamic() {
    const productName = new URLSearchParams(window.location.search).get('name');
    const product = products.find(p => p.name === productName);
    if (product) {
        addToCart(product.name, product.price);
    } else {
        alert('Product not found.');
    }
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
                <span>${item.name} (Size: ${item.size})</span>
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

// Main page carousel functionality
let currentSlide = 0;
const carousel = document.getElementById('carousel');
const slides = carousel ? document.querySelectorAll('.carousel-item') : [];
const totalSlides = slides.length;
const dots = document.querySelectorAll('.pagination-dot');

function updateCarousel() {
    if (!carousel) return;
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

if (carousel) setInterval(nextSlide, 5000);

// Related products carousel functionality
let currentRelatedSlide = 0;
const relatedCarousel = document.getElementById('related-carousel');
const relatedSlides = relatedCarousel ? document.querySelectorAll('#related-carousel .carousel-item') : [];
const totalRelatedSlides = relatedSlides.length;
const relatedDots = document.querySelectorAll('.pagination-dot-related');

function updateRelatedCarousel() {
    if (!relatedCarousel) return;
    const offset = -currentRelatedSlide * (100 / (window.innerWidth >= 768 ? 3 : 1));
    relatedCarousel.style.transform = `translateX(${offset}%)`;
    relatedDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentRelatedSlide);
    });
}

function nextRelatedSlide() {
    currentRelatedSlide = (currentRelatedSlide + 1) % window.totalRelatedSlides;
    updateRelatedCarousel();
}

function prevRelatedSlide() {
    currentRelatedSlide = (currentRelatedSlide - 1 + window.totalRelatedSlides) % window.totalRelatedSlides;
    updateRelatedCarousel();
}

function goToRelatedSlide(index) {
    currentRelatedSlide = index;
    updateRelatedCarousel();
}

if (relatedCarousel) setInterval(nextRelatedSlide, 5000);

// Product filter functionality
function filterProducts() {
    const category = document.getElementById('category-filter') ? document.getElementById('category-filter').value : 'all';
    const productGrid = document.getElementById('product-grid');

    if (!productGrid) return;

    const filteredProducts = products.filter(product => {
        return category === 'all' || product.category.includes(category);
    });

    productGrid.innerHTML = filteredProducts.length > 0 ? filteredProducts.map(product => `
        <div class="product-card bg-white rounded-xl shadow-lg overflow-hidden" data-tilt data-tilt-max="10" data-tilt-speed="400" data-tilt-perspective="1000" data-category="${product.category.join(',')}">
            <img src="${product.img}" onerror="this.src='https://via.placeholder.com/500x500?text=Image+Not+Found'" alt="${product.name}" class="w-full h-64 object-cover">
            <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                <p class="text-gray-600">$${product.price.toFixed(2)}</p>
                <div class="flex space-x-2 mt-4">
                    <button class="w-1/2 btn-gradient text-white py-2 rounded-lg font-medium hover:shadow-lg" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                    <a href="product.html?name=${encodeURIComponent(product.name)}" class="w-1/2 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 text-center">View Product</a>
                </div>
            </div>
        </div>
    `).join('') : '<p class="text-center col-span-full text-gray-600">No products found.</p>';

    VanillaTilt.init(document.querySelectorAll('.product-card'), {
        max: 10,
        speed: 400,
        perspective: 1000
    });
}

// Apply category filter
function applyCategoryFilter(category) {
    const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
    if (isIndexPage) {
        window.location.href = `products.html#${category}`;
    } else {
        if (document.getElementById('category-filter')) {
            document.getElementById('category-filter').value = category;
            filterProducts();
            document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
        }
        if (window.innerWidth < 768) {
            toggleMenu();
        }
    }
}

// Search functionality
function searchProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const productGrid = document.getElementById('product-grid');

    if (!productGrid) return;

    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));

    productGrid.innerHTML = filteredProducts.length > 0 ? filteredProducts.map(product => `
        <div class="product-card bg-white rounded-xl shadow-lg overflow-hidden" data-tilt data-tilt-max="10" data-tilt-speed="400" data-tilt-perspective="1000" data-category="${product.category.join(',')}">
            <img src="${product.img}" onerror="this.src='https://via.placeholder.com/500x500?text=Image+Not+Found'" alt="${product.name}" class="w-full h-64 object-cover">
            <div class="p-5">
                <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                <p class="text-gray-600">$${product.price.toFixed(2)}</p>
                <div class="flex space-x-2 mt-4">
                    <button class="w-1/2 btn-gradient text-white py-2 rounded-lg font-medium hover:shadow-lg" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                    <a href="product.html?name=${encodeURIComponent(product.name)}" class="w-1/2 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium hover:bg-gray-300 text-center">View Product</a>
                </div>
            </div>
        </div>
    `).join('') : '<p class="text-center col-span-full text-gray-600">No products found.</p>';

    VanillaTilt.init(document.querySelectorAll('.product-card'), {
        max: 10,
        speed: 400,
        perspective: 1000
    });
}

// Show checkout section
function showCheckout() {
    document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
    document.getElementById('checkout').classList.remove('hidden');
    document.getElementById('checkout').scrollIntoView({ behavior: 'smooth' });
    if (window.innerWidth < 768) {
        toggleMenu();
    }
}

// Place order functionality
function placeOrder() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    if (!name || !email || !address) {
        alert('Please fill in all required fields.');
        return;
    }

    alert('Order placed successfully! Thank you for shopping with YourBrand.');
    cart = [];
    cartCount = 0;
    document.querySelector('.cart-count').textContent = cartCount;
    updateOrderSummary();
    document.getElementById('checkout').classList.add('hidden');
    if (window.location.pathname.includes('products.html')) {
        document.getElementById('shop').classList.remove('hidden');
        document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
    } else {
        window.location.href = 'index.html';
    }
}

// Footer page navigation (placeholder)
function showPage(page) {
    alert(`Navigating to ${page} page (placeholder).`);
}

// Product image switching
function changeImage(src, alt) {
    const mainImage = document.getElementById('main-image');
    mainImage.src = src.replace('w=200', 'w=800');
    mainImage.alt = alt;
    document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
    document.querySelector(`img[src="${src}"]`).classList.add('active');
}

// Load product details dynamically
function loadProductDetails() {
    const productName = new URLSearchParams(window.location.search).get('name');
    const product = products.find(p => p.name === productName);

    if (!product) {
        document.getElementById('product-details').innerHTML = '<p class="text-center text-gray-600">Product not found.</p>';
        return;
    }

    document.getElementById('page-title').textContent = `${product.name} - YourBrand`;
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('breadcrumb-product').textContent = product.name;
    document.getElementById('main-image').src = product.img.replace('w=500', 'w=800');
    document.getElementById('main-image').alt = product.name;
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-description').textContent = product.description;

    const sizeSelect = document.getElementById('size');
    sizeSelect.value = product.size;

    const thumbnails = document.getElementById('thumbnails');
    thumbnails.innerHTML = product.images.map((img, index) => `
        <img src="${img.src}" onerror="this.src='https://via.placeholder.com/200x200?text=Image+Not+Found'" alt="${img.alt}" class="w-24 h-24 object-cover rounded-lg cursor-pointer thumbnail ${index === 0 ? 'active' : ''}" onclick="changeImage('${img.src}', '${img.alt}')">
    `).join('');

    const relatedProducts = products.filter(p => p.name !== productName);
    const relatedCarousel = document.getElementById('related-carousel');
    relatedCarousel.innerHTML = relatedProducts.map(p => `
        <div class="carousel-item flex-shrink-0 w-full md:w-1/3 px-3">
            <div class="product-card bg-white rounded-xl shadow-lg overflow-hidden" data-tilt data-tilt-max="10" data-tilt-speed="400" data-tilt-perspective="1000">
                <img src="${p.img}" onerror="this.src='https://via.placeholder.com/500x500?text=Image+Not+Found'" alt="${p.name}" class="w-full h-64 object-cover">
                <div class="p-5">
                    <h3 class="text-lg font-semibold text-gray-800">${p.name}</h3>
                    <p class="text-gray-600">$${p.price.toFixed(2)}</p>
                    <a href="product.html?name=${encodeURIComponent(p.name)}" class="mt-4 w-full btn-gradient text-white py-2 rounded-lg font-medium hover:shadow-lg text-center">View Product</a>
                </div>
            </div>
        </div>
    `).join('');

    const relatedDots = document.getElementById('related-dots');
    relatedDots.innerHTML = relatedProducts.map((_, index) => `
        <div class="pagination-dot-related ${index === 0 ? 'active' : ''}" onclick="goToRelatedSlide(${index})"></div>
    `).join('');

    window.totalRelatedSlides = relatedProducts.length;

    VanillaTilt.init(document.querySelectorAll('.product-card, [data-tilt]'), {
        max: 10,
        speed: 400,
        perspective: 1000
    });

    updateRelatedCarousel();
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    VanillaTilt.init(document.querySelectorAll('.product-card, [data-tilt]'), {
        max: 10,
        speed: 400,
        perspective: 1000
    });
    if (carousel) updateCarousel();
    if (relatedCarousel) loadProductDetails();
    if (document.getElementById('product-grid')) {
        const category = window.location.hash.substring(1);
        if (category && document.getElementById('category-filter')) {
            document.getElementById('category-filter').value = category;
        }
        filterProducts();
    }
    if (dots[0]) dots[0].classList.add('active');
});