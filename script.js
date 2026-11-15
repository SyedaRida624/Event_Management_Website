
document.addEventListener("DOMContentLoaded", function () {

  // =================================
  // 1. MOBILE NAVIGATION
  // =================================

  const menuToggle = document.querySelector(".menu-toggle");
  const navbar = document.querySelector(".navbar");

  if (menuToggle && navbar) {
    menuToggle.addEventListener("click", function () {
      navbar.classList.toggle("show");
    });

    navbar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", function () {
        navbar.classList.remove("show");
      });
    });
  }


  // =================================
  // 2. AUTOMATIC COPYRIGHT YEAR
  // =================================

  document.querySelectorAll(".year").forEach(element => {
    element.textContent = new Date().getFullYear();
  });


  // =================================
  // 3. GALLERY FILTER
  // =================================

  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach(button => {

    button.addEventListener("click", function () {

      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });

      this.classList.add("active");

      const selectedCategory = this.dataset.filter;

      galleryItems.forEach(item => {

        if (
          selectedCategory === "all" ||
          item.dataset.category === selectedCategory
        ) {
          item.classList.remove("hide");
        } else {
          item.classList.add("hide");
        }

      });

    });

  });


  // =================================
  // 4. GALLERY IMAGE PREVIEW
  // =================================

  const galleryImages = document.querySelectorAll(".gallery-item img");

  const lightbox = document.createElement("div");

  lightbox.className = "gallery-lightbox";

  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
    <img src="" alt="Gallery preview">
    <button class="lightbox-next" aria-label="Next image">&#10095;</button>
  `;

  document.body.appendChild(lightbox);

  const previewImage = lightbox.querySelector("img");

  const lightboxStyle = document.createElement("style");

  lightboxStyle.textContent = `
    .gallery-lightbox {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(5, 10, 20, 0.94);
      z-index: 2000;
      align-items: center;
      justify-content: center;
      padding: 50px;
    }

    .gallery-lightbox.show {
      display: flex;
    }

    .gallery-lightbox img {
      max-width: 90%;
      max-height: 85vh;
      object-fit: contain;
      border-radius: 10px;
    }

    .gallery-lightbox button {
      position: absolute;
      border: none;
      background: rgba(255,255,255,0.15);
      color: white;
      width: 43px;
      height: 43px;
      border-radius: 50%;
      font-size: 25px;
      cursor: pointer;
    }

    .lightbox-close {
      top: 20px;
      right: 25px;
    }

    .lightbox-prev {
      left: 20px;
    }

    .lightbox-next {
      right: 20px;
    }

    @media(max-width: 600px) {
      .gallery-lightbox {
        padding: 15px;
      }

      .gallery-lightbox img {
        max-width: 95%;
      }
    }
  `;

  document.head.appendChild(lightboxStyle);

  let currentImage = 0;

  function getVisibleImages() {
    return [...galleryImages].filter(img =>
      !img.closest(".gallery-item").classList.contains("hide")
    );
  }

  function openPreview(image) {
    const visibleImages = getVisibleImages();

    currentImage = visibleImages.indexOf(image);

    previewImage.src = image.src;
    previewImage.alt = image.alt;

    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function changePreview(direction) {
    const visibleImages = getVisibleImages();

    if (!visibleImages.length) return;

    currentImage =
      (currentImage + direction + visibleImages.length)
      % visibleImages.length;

    previewImage.src = visibleImages[currentImage].src;
    previewImage.alt = visibleImages[currentImage].alt;
  }

  galleryImages.forEach(image => {
    image.addEventListener("click", function () {
      openPreview(this);
    });
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", closePreview);

  lightbox.querySelector(".lightbox-prev").addEventListener("click", function () {
    changePreview(-1);
  });

  lightbox.querySelector(".lightbox-next").addEventListener("click", function () {
    changePreview(1);
  });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closePreview();
    }
  });

  function closePreview() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "";
  }

  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("show")) return;

    if (event.key === "Escape") closePreview();
    if (event.key === "ArrowLeft") changePreview(-1);
    if (event.key === "ArrowRight") changePreview(1);
  });


  // =================================
  // 5. GET A QUOTE POPUP
  // =================================

  const quoteModal = document.createElement("div");

  quoteModal.className = "quote-modal";

  quoteModal.innerHTML = `
    <div class="quote-box">

      <button class="quote-close" aria-label="Close popup">
        &times;
      </button>

      <h2>Get a Quote</h2>

      <p>Let's create something extraordinary together.</p>

      <form class="quote-form">

        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          required
        >

        <input
          type="email"
          name="email"
          placeholder="Your Email Address"
          required
        >

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
        >

        <select name="event" required>
          <option value="">Select Event Type</option>
          <option>Wedding</option>
          <option>Corporate Event</option>
          <option>Birthday</option>
          <option>Concert</option>
          <option>Conference</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          name="date"
        >

        <textarea
          name="message"
          rows="3"
          placeholder="Tell us about your event..."
        ></textarea>

        <button type="submit">
          Request My Quote →
        </button>

        <p class="quote-feedback" aria-live="polite"></p>

      </form>

    </div>
  `;

  document.body.appendChild(quoteModal);

  const quoteButtons = document.querySelectorAll("[data-quote]");

  quoteButtons.forEach(button => {

    button.addEventListener("click", function () {
      quoteModal.classList.add("show");
      document.body.style.overflow = "hidden";
    });

  });

  function closeQuote() {
    quoteModal.classList.remove("show");
    document.body.style.overflow = "";
  }

  quoteModal.querySelector(".quote-close")
    .addEventListener("click", closeQuote);

  quoteModal.addEventListener("click", function (event) {
    if (event.target === quoteModal) {
      closeQuote();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeQuote();
    }
  });


  // =================================
  // 6. QUOTE FORM SUBMISSION
  // =================================

  const quoteForm = quoteModal.querySelector(".quote-form");

  quoteForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (!quoteForm.reportValidity()) return;

    const customerName = quoteForm.elements.name.value.trim();

    quoteModal.querySelector(".quote-feedback").textContent =
      `Thank you, ${customerName}! Your quote request has been prepared.`;

    quoteForm.reset();

  });


  // =================================
  // 7. CONTACT FORM SUBMISSION
  // =================================

  const contactForm = document.querySelector("#contactForm");

  if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

      event.preventDefault();

      if (!contactForm.reportValidity()) return;

      const customerName =
        contactForm.elements.name.value.trim();

      document.querySelector("#formMessage").textContent =
        `Thank you, ${customerName}! Your message has been prepared.`;

      contactForm.reset();

    });

  }

});
