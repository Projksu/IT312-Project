localStorage.clear();
function addProduct(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form values
    const name = document.getElementById('name').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const category = document.getElementById('category').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const description = document.getElementById('description').value.trim();
    const image = document.getElementById('image').files[0]; // Get the uploaded file

    // Validation
    if (!name || /^\d/.test(name) || !category || !description || isNaN(price) || price < 0 || isNaN(quantity) || quantity < 1) {
        let errorMessage = "Please fill all fields correctly.";
        
        if (!name) {
            errorMessage += "\n- Name is required.";
        }
        if (/^\d/.test(name)) {
            errorMessage += "\n- The name cannot start with a number.";
        }
        if (!category) {
            errorMessage += "\n- Category is required.";
        }
        if (!description) {
            errorMessage += "\n- Description is required.";
        }
        if (isNaN(price) || price < 0) {
            errorMessage += "\n- Price must be a valid number and cannot be negative.";
        }
        if (isNaN(quantity) || quantity < 1) {
            errorMessage += "\n- Quantity must be a valid number greater than zero.";
        }
        if (!image) { 
        errorMessage += ("\n- Please upload an image!");
		}
		
        alert(errorMessage);
        return;
    }


    // Create product object
    const product = {
        name: name,
        price: price,
        category: category,
        quantity: quantity,
        description: description,
        image: image.name // Store the image file name
    };

    // Get existing products from local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product); // Add new product to the array
    localStorage.setItem('products', JSON.stringify(products)); // Save back to local storage

    // Alert success and reset the form
    alert(`Product "${name}" has been added successfully!`);
    document.getElementById('productForm').reset();
}
// Function to display products on the dashboard
function displayProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const sellerDashboard = document.getElementById('sellerDashboard');

  // Check if there are no products
  if (products.length === 0) {
    sellerDashboard.innerHTML = '<p>No products available. Please add products.</p>';
  } else {
    // Create product cards dynamically
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}<br>${product.price} SAR</p>
      `;
      sellerDashboard.appendChild(productCard);
    });
  }
}

// Initialize the appropriate functionality based on the page
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('productForm')) {
    // Add product form event listener
    document.getElementById('productForm').addEventListener('submit', addProduct);
  } else if (document.getElementById('sellerDashboard')) {
    // Display products on the seller dashboard
    displayProducts(); 
  }
});