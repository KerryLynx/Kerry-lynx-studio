"use strict";

/* ================================
   UTILITIES
================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ================================
   LOADER
================================= */

window.addEventListener("load", () => {
  const loader = $("#loader");
  if (loader) {
    loader.style.display = "none";
  }
});

/* ================================
   BOOKING FORM VALIDATION
================================= */

const bookingForm = $(".booking-form");

if (bookingForm) {

  bookingForm.addEventListener("submit", (e) => {

    const name = bookingForm.querySelector("input[name='name']");
    const email = bookingForm.querySelector("input[name='email']");
    const message = bookingForm.querySelector("textarea[name='message']");

    if (!name?.value || !email?.value || !message?.value) {
      e.preventDefault();
      alert("Please fill in all required fields.");
      return;
    }

    // Auto-fill hidden fields if they exist
    const params = new URLSearchParams(window.location.search);

    const planField = $("#plan-field");
    const dateField = $("#date-field");
    const timeField = $("#time-field");

    if (planField) planField.value = params.get("plan") || "";

    const dateInput = $("input[type='date']");
    if (dateField && dateInput) dateField.value = dateInput.value;

    const selectedTime = $("input[name='time']:checked");
    if (timeField) timeField.value = selectedTime ? selectedTime.value : "";

  });
}

/* ================================
   DATE MINIMUM (NO PAST DATES)
================================= */

const dateInput = $("input[type='date']");

if (dateInput) {
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);
}

/* ================================
   TIME SELECTION UI
================================= */

const timeCards = $$(".time-card");

timeCards.forEach(card => {
  const input = card.querySelector("input");

  if (!input) return;

  input.addEventListener("change", () => {
    timeCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
  });
});

/* ================================
   PORTFOLIO FILTER SYSTEM
================================= */

const filterButtons = $$(".filter-btn");
const projects = $$(".project-card");

filterButtons.forEach(button => {

  button.addEventListener("click", () => {

    filterButtons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");

    const filter = button.textContent.toLowerCase();

    projects.forEach(project => {

      const category = project.dataset.category?.toLowerCase() || "";

      if (filter === "all") {
        project.style.display = "block";
      } else if (category.includes(filter)) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }

    });

  });

});

/* ================================
   MODAL SYSTEM
================================= */

const modal = $("#projectModal");
const modalImg = $("#modalImg");
const modalTitle = $("#modalTitle");
const modalDesc = $("#modalDesc");
const closeModal = $("#closeModal");

if (modal) {

  $$(".project-card").forEach(card => {

    card.addEventListener("click", () => {

      const img = card.querySelector("img")?.src;
      const title = card.querySelector("h3")?.textContent || "Project";
      const desc = card.querySelector("p")?.textContent || "";

      if (modalImg) modalImg.src = img || "";
      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;

      modal.style.display = "flex";

    });

  });

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

}

/* ================================
   SERVICE → BOOKING CONNECTION
================================= */

const urlParams = new URLSearchParams(window.location.search);
const service = urlParams.get("service");

if (service) {
  const serviceInput = $("input[name='service']");
  if (serviceInput) {
    serviceInput.value = service;
  }
}

/* ================================
   ORDER BUTTON (PORTFOLIO → BOOKING)
================================= */

const orderBtn = $("#orderBtn");

let selectedService = "";

$$(".project-card").forEach(card => {

  card.addEventListener("click", () => {

    selectedService = card.dataset.service || "";

  });

});

if (orderBtn) {
  orderBtn.addEventListener("click", () => {

    if (!selectedService) return;

    window.location.href =
      `booking.html?service=${encodeURIComponent(selectedService)}`;

  });
}

// GET PLAN FROM URL AND AUTO-FILL FORM
const urlParams = new URLSearchParams(window.location.search);
const plan = urlParams.get("plan");

if (plan) {
  const planField = document.getElementById("plan-field");
  const serviceSelect = document.querySelector("select[name='service']");

  if (planField) planField.value = plan;

  if (serviceSelect) {
    serviceSelect.value = plan;
  }
}