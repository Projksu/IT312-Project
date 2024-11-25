document.addEventListener("DOMContentLoaded", () => {
      const orders = {
          "84378474": {
              id: "92873631",
              name: "Luxury Skin Care Set",
              delivered: "Sunday 3rd Jul, 12:31PM",
              totalPrice: "190.00SR",
              products: [
                  { name: "Black cotton top", image: "shirt.jpeg" },
                  { name: "High waisted Casual denim pants", image: "denim.jpeg" },
              ],
          },
          "84378475": {
              id: "84378473",
              name: "Serea Organic Aloe Vera Super Set",
              delivered: "Wednesday 3rd Jun, 9:22PM",
              totalPrice: "160.99SR",
              products: [
                  { name: "Organic aloe vera super cream", image: "cream.jpeg" },
                  { name: "Organic aloe vera super Serum", image: "serum.jpeg" },
                  { name: "Organic aloe vera super Toner", image: "toner.jpeg" },
              ],
          },
          "84378476": {
              id: "77874661",
              name: "Complete Hair Care Pack",
              delivered: "Tuesday 14th May, 7:45AM",
              totalPrice: "136.99SR",
              products: [
                  { name: "Gray cotton Sweater", image: "sweater.jpeg" },
                  { name: "Solid Drawstring Waist Slant Pocket black Sweatpants", image: "black.jpeg" },
              ],
          },
      };
  
      const orderDropdown = document.querySelector("#orderSelect");
      const productDropdown = document.querySelector("#productSelect");
      const displayContainer = document.querySelector(".eval-container");
      const submitButton = document.querySelector(".submit-btn");
      const ratingContainer = document.querySelector(".eval-rating");
      const feedbackInput = document.querySelector(".eval-feedback");
      let selectedRating = 0;
  
      // Set up rating stars
      const stars = ratingContainer.querySelectorAll("span");
      stars.forEach((star, index) => {
          star.addEventListener("mouseover", () => {
              stars.forEach((s, i) => {
                  s.style.color = i <= index ? "#f39c12" : "#ccc";
              });
          });
  
          ratingContainer.addEventListener("mouseleave", () => {
              stars.forEach((s, i) => {
                  s.style.color = i < selectedRating ? "#f39c12" : "#ccc";
              });
          });
  
          star.addEventListener("click", () => {
              selectedRating = index + 1;
              stars.forEach((s, i) => {
                  s.style.color = i < selectedRating ? "#f39c12" : "#ccc";
              });
          });
      });
  
      // Submit button functionality
      submitButton.addEventListener("click", (event) => {
          event.preventDefault();
  
          const selectedOrder = orderDropdown.value;
          const selectedProduct = productDropdown.value;
          const feedback = feedbackInput.value.trim();
  
          if (!selectedOrder || selectedOrder === "Select a previous order") {
              alert("Please select an order.");
              return;
          }
  
          if (!selectedProduct || selectedProduct === "Select a previous product") {
              alert("Please select a product.");
              return;
          }
  
          if (selectedRating === 0) {
              alert("Please select a rating.");
              return;
          }
  
          if (feedback === "") {
              alert("Please provide feedback in the text field.");
              return;
          }
  
          alert(
              `Thank you for your feedback!\nYour rating for product "${selectedProduct}" is ${selectedRating}.`
          );
  
          window.location.href = "HomePage.html";
      });
  
      const renderAllOrders = () => {
          displayContainer.innerHTML = Object.values(orders)
              .map(
                  (order) => `
                  <div class="order">
                      <h2>Order ID #${order.id}</h2>
                      ${order.products
                          .map(
                              (product, index) => `
                          <div class="item">
                              <img src="${product.image}" alt="Item ${index + 1}" style="width:100px;height:100px;"/>
                              <p>${product.name}</p>
                          </div>
                      `
                          )
                          .join("")}
                      <p>Delivered on ${order.delivered}</p>
                      <p><strong>Total Price: ${order.totalPrice}</strong></p>
                  </div>
                  <hr/>
              `
              )
              .join("");
      };
  
      renderAllOrders();
  
      orderDropdown.addEventListener("change", () => {
          const selectedOrderValue = orderDropdown.value;
  
          if (selectedOrderValue === "Select a previous order") {
              productDropdown.disabled = true;
              productDropdown.innerHTML = `<option>Select a previous product</option>`;
              renderAllOrders();
              return;
          }
  
          const selectedOrder = orders[selectedOrderValue];
          productDropdown.disabled = false;
          productDropdown.innerHTML = `
              <option>Select a previous product</option>
              ${selectedOrder.products
                  .map(
                      (product) => `
                  <option value="${product.name}">${product.name}</option>
              `
                  )
                  .join("")}
          `;
  
          displayContainer.innerHTML = `
              <div class="order">
                  <h2>Order ID #${selectedOrder.id}</h2>
                  ${selectedOrder.products
                      .map(
                          (product, index) => `
                      <div class="item">
                          <img src="${product.image}" alt="Item ${index + 1}" style="width:100px;height:100px;"/>
                          <p>${product.name}</p>
                      </div>
                  `
                      )
                      .join("")}
                  <p>Delivered on ${selectedOrder.delivered}</p>
                  <p><strong>Total Price: ${selectedOrder.totalPrice}</strong></p>
              </div>
          `;
      });
  
      productDropdown.addEventListener("change", () => {
          const selectedOrderValue = orderDropdown.value;
          const selectedProductValue = productDropdown.value;
  
          if (!selectedProductValue || selectedProductValue === "Select a previous product") {
              return;
          }
  
          const selectedOrder = orders[selectedOrderValue];
          const selectedProduct = selectedOrder.products.find(
              (product) => product.name === selectedProductValue
          );
  
          displayContainer.innerHTML = `
              <div class="product-details">
                  <h2>${selectedProduct.name}</h2>
                  <img src="${selectedProduct.image}" alt="${selectedProduct.name}" style="width:200px;height:200px;"/>
                  <p>Delivered on ${selectedOrder.delivered}</p>
              </div>
          `;
      });
  });