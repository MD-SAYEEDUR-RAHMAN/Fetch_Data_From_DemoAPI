document.addEventListener('DOMContentLoaded', function() {
    // Fetch products from the DummyJSON API
    fetch('https://dummyjson.com/products?limit=30')
        .then(response => response.json())
        .then(data => {
            let products = data.products; // Store the fetched products
            const productList = document.getElementById('productList');
            const sortSelect = document.getElementById('sortSelect');

            // Function to display products
            function displayProducts(products) {
                productList.innerHTML = ''; // Clear existing products
                products.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product');

                    productDiv.innerHTML = `
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <p class="price">$${product.price}</p>
                        <p><strong>Category:</strong> ${product.category}</p>
                        <p><strong>Stock:</strong> ${product.stock}</p>
                        <p><strong>Rating:</strong> ${product.rating}</p>
                        <a href="product.html?id=${product.id}" class="view-details">View Details</a>
                    `;

                    productList.appendChild(productDiv);
                });
            }

            // Initial display of products
            displayProducts(products);

            // Sort products based on the selected criteria
            sortSelect.addEventListener('change', function() {
                const selectedOption = sortSelect.value;

                if (selectedOption === 'priceAsc') {
                    products.sort((a, b) => a.price - b.price);
                } else if (selectedOption === 'priceDesc') {
                    products.sort((a, b) => b.price - a.price);
                } else if (selectedOption === 'ratingAsc') {
                    products.sort((a, b) => a.rating - b.rating);
                } else if (selectedOption === 'ratingDesc') {
                    products.sort((a, b) => b.rating - a.rating);
                } else if (selectedOption === 'stockAsc') {
                    products.sort((a, b) => a.stock - b.stock);
                } else if (selectedOption === 'stockDesc') {
                    products.sort((a, b) => b.stock - a.stock);
                }

                // Display the sorted products
                displayProducts(products);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            const productList = document.getElementById('productList');
            productList.innerHTML = '<p>Failed to fetch products. Please try again later.</p>';
        });
});
