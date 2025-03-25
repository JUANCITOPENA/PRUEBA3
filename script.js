// script.js

// Variables globales
let products = [];
let cart = [];
let selectedProduct = null;

// Referencias a elementos del DOM
const productContainer = document.getElementById('productContainer');
const searchInput = document.getElementById('searchInput');
const cartCount = document.getElementById('cartCount');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalDisplay = document.getElementById('cartTotal');
const quantityModal = new bootstrap.Modal(document.getElementById('quantityModal'));
const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));

// Función para actualizar el contador del carrito
function updateCartCount() {
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Función para actualizar el contenido del carrito en el modal
function updateCartModal() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach(item => {
    total += item.product.price * item.quantity;
    const div = document.createElement('div');
    div.className = "d-flex justify-content-between align-items-center mb-2 border-bottom pb-2";
    div.innerHTML = `
      <div>
        <h6>${item.product.title}</h6>
        <p class="mb-0">$${item.product.price} x ${item.quantity}</p>
      </div>
      <div>
        <span>$${(item.product.price * item.quantity).toFixed(2)}</span>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });
  cartTotalDisplay.textContent = total.toFixed(2);
}

// Función para crear tarjetas de producto
function createProductCard(product) {
  const col = document.createElement('div');
  col.className = "col-md-4 mb-4";

  const card = document.createElement('div');
  card.className = "card h-100";

  card.innerHTML = `
    <img src="${product.image}" class="card-img-top" alt="${product.title}">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">${product.title}</h5>
      <p class="card-text">$${product.price}</p>
      <button class="btn btn-add mt-auto" data-product-id="${product.id}">
        <i class="fas fa-cart-plus"></i> Añadir al carrito
      </button>
    </div>
  `;
  col.appendChild(card);
  return col;
}

// Función para cargar productos desde la FakeStore API
async function loadProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    products = await res.json();
    displayProducts(products);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}

// Función para mostrar productos en la sección
function displayProducts(productsList) {
  productContainer.innerHTML = "";
  productsList.forEach(product => {
    productContainer.appendChild(createProductCard(product));
  });
  // Asignar evento a los botones "Añadir al carrito"
  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = e.currentTarget.getAttribute('data-product-id');
      selectedProduct = products.find(p => p.id == productId);
      // Mostrar modal para seleccionar cantidad
      document.getElementById('productQuantity').value = 1;
      quantityModal.show();
    });
  });
}

// Evento para confirmar cantidad y agregar producto al carrito
document.getElementById('confirmQuantity').addEventListener('click', () => {
  const quantity = parseInt(document.getElementById('productQuantity').value);
  if (selectedProduct && quantity > 0) {
    // Si el producto ya existe en el carrito, actualizar cantidad
    const existItem = cart.find(item => item.product.id === selectedProduct.id);
    if (existItem) {
      existItem.quantity += quantity;
    } else {
      cart.push({ product: selectedProduct, quantity });
    }
    updateCartCount();
    quantityModal.hide();
  }
});

// Buscador dinámico
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );
  displayProducts(filteredProducts);
});

// Evento para abrir el carrito al hacer clic en el icono
document.getElementById('openCartModal').addEventListener('click', () => {
  updateCartModal();
  const cartModalEl = document.getElementById('cartModal');
  const modal = new bootstrap.Modal(cartModalEl);
  modal.show();
});

// Evento de formulario de pago y generación de factura en PDF
document.getElementById('paymentForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // Recoger datos del formulario
  const payerName = document.getElementById('payerName').value;
  const cardNumber = document.getElementById('cardNumber').value;
  const expiry = document.getElementById('expiry').value;
  const cvv = document.getElementById('cvv').value;

  // Generar PDF con jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;

  doc.setFontSize(16);
  doc.text("Factura de Compra", 10, y);
  y += 10;

  doc.setFontSize(12);
  doc.text(`Nombre: ${payerName}`, 10, y);
  y += 10;
  doc.text(`Tarjeta: ${cardNumber}`, 10, y);
  y += 10;
  doc.text(`Expiración: ${expiry}  CVV: ${cvv}`, 10, y);
  y += 10;
  doc.text("Detalle de Productos:", 10, y);
  y += 10;

  cart.forEach(item => {
    const line = `${item.product.title} x ${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`;
    doc.text(line, 10, y);
    y += 10;
  });
  doc.text(`Total: $${cartTotalDisplay.textContent}`, 10, y+10);
  
  // Descargar PDF
  doc.save("factura.pdf");

  // Reiniciar carrito y formularios
  cart = [];
  updateCartCount();
  document.getElementById('paymentForm').reset();
  paymentModal.hide();
});

// Cargar productos al iniciar
loadProducts();
