/* ================
Custom JS to handling cart feature, product search and news letter functionality part 
 ================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* ---------- 1. Cart counter ---------- */
  const cartButtons = document.querySelectorAll(".sn-cart-button");
  const cartBadges = document.querySelectorAll(".sn-cart-count");
  const addButtons = document.querySelectorAll(".sn-add-button");
  let cartCount = 0;

  // Updates every cart badge (mobile + desktop) and the accessible label
  const updateCart = () => {
    const label = `Shopping cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`;

    cartBadges.forEach((badge) => {
      badge.textContent = cartCount;
    });
    cartButtons.forEach((button) => {
      button.setAttribute("aria-label", label);
    });
  };

  addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cartCount += 1;
      updateCart();
    });
  });

  /* ---------- 2. Product search ---------- */
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("productSearch");
  const productsSection = document.getElementById("products");
  const searchEmpty = document.getElementById("searchEmpty");
  const productColumns = document.querySelectorAll(".sn-product-column");

  // Shows only the cards whose name or category contains the search text
  const filterProducts = () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    productColumns.forEach((column) => {
      const card = column.querySelector(".sn-product-card");
      const { name = "", category = "" } = card ? card.dataset : {};
      const isMatch = `${name} ${category}`.toLowerCase().includes(query);

      column.hidden = !isMatch;
      if (isMatch) {
        visibleCount += 1;
      }
    });

    if (searchEmpty) {
      searchEmpty.hidden = visibleCount !== 0;
    }
  };

  if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
  }

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault(); // stay on the page
      filterProducts();
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  /* ---------- 3. Newsletter form ---------- */
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterEmail = document.getElementById("newsletterEmail");
  const newsletterMessage = document.getElementById("newsletterMessage");

  if (newsletterForm && newsletterEmail && newsletterMessage) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      newsletterMessage.classList.remove("sn-success-message", "sn-error-message");

      const isValid = newsletterEmail.value.trim() !== "" && newsletterEmail.checkValidity();

      if (isValid) {
        newsletterMessage.textContent = "Thank you for subscribing! Check your inbox for your ₹300 offer.";
        newsletterMessage.classList.add("sn-success-message");
        newsletterForm.reset();
      } else {
        newsletterMessage.textContent = "Please enter a valid email address.";
        newsletterMessage.classList.add("sn-error-message");
      }
    });
  }
});