// Product class
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// ShoppingCartItem class
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// ShoppingCart class
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push(new ShoppingCartItem(product, 1));
        }
        this.displayCart();
    }

    removeItem(productId) {
        const itemIndex = this.items.findIndex(item => item.product.id === productId);
        if (itemIndex > -1) {
            if (this.items[itemIndex].quantity > 1) {
                this.items[itemIndex].quantity--;
            } else {
                this.items.splice(itemIndex, 1);
            }
        }
        this.displayCart();
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    displayCart() {
        const cartElement = document.getElementById('cart');
        cartElement.innerHTML = '';

        if (this.items.length === 0) {
            cartElement.innerHTML = '<p>The cart is empty.</p>';
            return;
        }

        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <span>${item.product.name} (x${item.quantity}) - $${item.getTotalPrice().toFixed(2)}</span>
                <button onclick="cart.removeItem(${item.product.id})">Remove</button>
            `;
            cartElement.appendChild(itemElement);
        });
    }
}

// Initializing products and cart
const products = [
    new Product(1, 'Product A', 10.99),
    new Product(2, 'Product B', 14.99),
    new Product(3, 'Product C', 7.99)
];

const cart = new ShoppingCart();

// Display products
const productListElement = document.getElementById('product-list');
products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button onclick="cart.addItem(products.find(p => p.id === ${product.id}))">Add to Cart</button>
    `;
    productListElement.appendChild(productElement);
});
