// Create an object class for the product
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// Create an object class for the shopping cart item
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    // Method to calculate the total price of the item
    totalPrice() {
        return this.product.price * this.quantity;
    }
}

// Create another object class for the shopping cart
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Method to get the total number of items inside the cart
    totalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Method to add items to the cart
    addItem(product, quantity) {
        this.items.push(new ShoppingCartItem(product, quantity));
        this.displayCart();
    }

    // Method to remove items from the cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCart();
    }

    // Method to display cart items
    displayCart() {
        const cartItemsDiv = document.getElementById('cart-items');
        cartItemsDiv.innerHTML = '';
        this.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.textContent = `Product: ${item.product.name}, Quantity: ${item.quantity}, Total Price: ${item.totalPrice()}`;
            cartItemsDiv.appendChild(itemDiv);
        });
    }
}

// Create a shopping cart instance
const cart = new ShoppingCart();

// Function to add items to the cart
function addItem(id, name, price, quantity) {
    const product = new Product(id, name, price);
    cart.addItem(product, quantity);
}

// Function to remove items from the cart
function removeItem(id) {
    cart.removeItem(id);
}
