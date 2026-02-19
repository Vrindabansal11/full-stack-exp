const products = [
    {
        name: "Wireless Headphones",
        price: 129.99,
        image: "headphones.jpg",   // your image file
        inStock: true
    },
    {
        name: "Mechanical Keyboard",
        price: 89.99,
        image: "keyboard.jpg",     // your image file
        inStock: false
    },
    {
        name: "Smart Watch",
        price: 199.99,
        image: "watch.jpg",        // your image file
        inStock: true
    }
];

const container = document.getElementById("productContainer");

products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="product-img">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <h2>${product.name}</h2>
        <div class="price">$${product.price}</div>
        <div class="status ${product.inStock ? 'in-stock' : 'out-stock'}">
            ${product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
    `;

    container.appendChild(card);
});
