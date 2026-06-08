// Product Data with Cloudinary Images
const products = [
    {
        id: 1,
        name: "Diamond Pendant Necklace",
        category: "Necklace",
        price: 3250.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780834872/1000011762_hylaws.jpg",
        description: "Exquisite pure 22K gold necklace adorned with brilliant diamonds. Crafted from finest pure 22K gold only."
    },
    {
        id: 2,
        name: "Ruby Engagement Ring",
        category: "Ring",
        price: 3280.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780846361/IMG-20260607-WA0129_dvoxg5.jpg",
        description: "Stunning pure 22K gold ring featuring a premium ruby stone. 100% pure 22K gold construction."
    },
    {
        id: 3,
        name: "Emerald Bracelet",
        category: "Bracelet",
        price: 3290.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780847344/IMG-20260607-WA0126_qmo7vv.jpg",
        description: "Elegant pure 22K gold bracelet with luxurious emerald stones. Solid 22K gold throughout."
    },
    {
        id: 4,
        name: "Sapphire Earrings",
        category: "Earrings",
        price: 3400.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780848298/IMG-20260607-WA0113_nhf3da.jpg",
        description: "Radiant pure 22K gold earrings featuring deep blue sapphires. Made from pure 22K gold only."
    },
    {
        id: 5,
        name: "Pearl Choker Set",
        category: "Choker Set",
        price: 3500.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780848623/IMG-20260607-WA0096_jb2ne9.jpg",
        description: "Luxurious pure 22K gold choker with authentic pearls. Crafted entirely in 22K pure gold."
    },
    {
        id: 6,
        name: "Golden Locket",
        category: "Locket",
        price: 3600.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780849519/IMG-20260607-WA0147_qpyojf.jpg",
        description: "Precious pure 22K gold locket perfect for keeping memories. Solid 22K gold construction."
    },
    {
        id: 7,
        name: "Kundan Tiara",
        category: "Tiara",
        price: 3700.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780849481/IMG-20260607-WA0142_nobrbv.jpg",
        description: "Spectacular pure 22K gold tiara adorned with kundan stones. Made from pure 22K gold only."
    },
    {
        id: 8,
        name: "Antique Brooch",
        category: "Brooch",
        price: 3750.00,
        weight: "5g",
        material: "PURE 22K GOLD",
        image: "https://res.cloudinary.com/dkexwxnjc/image/upload/v1780834872/1000011762_hylaws.jpg",
        description: "Magnificent pure 22K gold brooch with antique finishing. Solid 22K gold throughout."
    }
];

let currentProductIndex = 0;
let cart = JSON.parse(localStorage.getItem('mucoki_cart')) || [];

// Display current product
function displayProduct() {
    const product = products[currentProductIndex];
    document.getElementById('productImage').src = product.image;
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productCategory').textContent = product.category;
    document.getElementById('productWeight').textContent = product.weight;
    document.getElementById('productMaterial').textContent = product.material;
    document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productCounter').textContent = `${currentProductIndex + 1} of ${products.length}`;
}

// Navigate products
function nextProduct() {
    currentProductIndex = (currentProductIndex + 1) % products.length;
    displayProduct();
}

function previousProduct() {
    currentProductIndex = (currentProductIndex - 1 + products.length) % products.length;
    displayProduct();
}

// Page navigation
function navigatePage(pageName) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageName).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
    
    if (pageName === 'collection') {
        displayProduct();
    }
    if (pageName === 'cart') {
        renderCartItems();
    }
}

// Cart functions - Single Product Checkout
function addToCart(productId) {
    const product = products[productId];
    
    // Clear existing cart (only one product at a time)
    cart = [];
    
    // Add single product with quantity 1
    cart.push({ ...product, quantity: 1 });
    
    saveCart();
    updateCartCount();
    alert(`${product.name} ready for checkout!`);
}

function saveCart() {
    localStorage.setItem('mucoki_cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.length > 0 ? 1 : 0;
    document.getElementById('cartCount').textContent = count;
}

function renderCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-message">Your cart is empty</p>';
        if (document.getElementById('cartSummary')) {
            document.getElementById('cartSummary').style.display = 'none';
        }
        return;
    }
    
    cartItemsDiv.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div class="cart-item-qty">
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        </div>
    `).join('');
    
    if (document.getElementById('cartSummary')) {
        document.getElementById('cartSummary').style.display = 'block';
    }
    updateCartTotals();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    renderCartItems();
}

function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.00;
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
}

function updateCartTotals() {
    const { subtotal, tax, total } = calculateTotals();
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${total.toFixed(2)}`;
}

function showCheckout() {
    if (cart.length === 0) {
        alert('Please select a product first');
        return;
    }
    renderCheckoutItems();
    document.getElementById('checkoutModal').classList.add('show');
}

function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('show');
}

function renderCheckoutItems() {
    const checkoutItemsDiv = document.getElementById('checkoutItems');
    checkoutItemsDiv.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
}

const checkoutForm = document.getElementById('checkoutForm');
if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (cart.length === 0) {
            alert('Your cart is empty');
            return;
        }
        
        const { subtotal, tax, total } = calculateTotals();
        
        const orderData = {
            orderId: `MK-${Date.now()}`,
            customer: {
                name: e.target.elements[0].value,
                email: e.target.elements[1].value,
                phone: e.target.elements[2].value,
                address: e.target.elements[3].value,
                city: e.target.elements[4].value,
                postalCode: e.target.elements[5].value
            },
            items: cart,
            subtotal,
            tax,
            total
        };
        
        const orders = JSON.parse(localStorage.getItem('mucoki_orders')) || [];
        orders.push(orderData);
        localStorage.setItem('mucoki_orders', JSON.stringify(orders));
        
        document.getElementById('checkoutModal').classList.remove('show');
        document.getElementById('successMessage').innerHTML = `
            <strong>Order ID: ${orderData.orderId}</strong><br><br>
            Product: ${orderData.items[0].name}<br>
            Total: $${total.toFixed(2)}<br>
            Confirmation sent to: ${orderData.customer.email}<br>
            Also notified: contactmucoki@gmail.com
        `;
        document.getElementById('successModal').classList.add('show');
        
        cart = [];
        saveCart();
        updateCartCount();
    });
}

function closeSuccess() {
    document.getElementById('successModal').classList.remove('show');
    navigatePage('home');
}

// Initialize
updateCartCount();
