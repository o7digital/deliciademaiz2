// Shared behavior for the static site.
// - Slider + product carousel only run on pages that contain the expected DOM.
// - Mobile menu toggle runs everywhere.

(function () {
  // ===== Slider hero (index.html) =====
  const slidesEl = document.getElementById('slides');
  const dots = document.querySelectorAll('.slider-dot');

  if (slidesEl && dots.length > 0) {
    let currentIndex = 0;
    const totalSlides = dots.length;

    function updateSlider() {
      slidesEl.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }

    function moveSlide(direction) {
      currentIndex += direction;
      if (currentIndex < 0) currentIndex = totalSlides - 1;
      if (currentIndex >= totalSlides) currentIndex = 0;
      updateSlider();
    }

    function currentSlide(index) {
      currentIndex = index;
      updateSlider();
    }

    // Needed because the HTML uses inline `onclick="..."` handlers.
    window.moveSlide = moveSlide;
    window.currentSlide = currentSlide;

    setInterval(() => {
      moveSlide(1);
    }, 5000);
  }

  // ===== Product carousel (index.html) =====
  let productCarouselIndex = 0;

  function moveProductCarousel(direction) {
    const carousel = document.getElementById('productCarousel');
    if (!carousel) return;

    const items = carousel.querySelectorAll('.item');
    const totalItems = items.length;
    if (totalItems === 0) return;

    const itemsPerView = window.innerWidth <= 640 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
    const maxIndex = Math.max(0, totalItems - itemsPerView);

    productCarouselIndex += direction;

    if (productCarouselIndex < 0) {
      productCarouselIndex = maxIndex;
    } else if (productCarouselIndex > maxIndex) {
      productCarouselIndex = 0;
    }

    const itemWidth = items[0].offsetWidth;
    const gap = 40;
    const offset = productCarouselIndex * (itemWidth + gap);
    carousel.style.transform = `translateX(-${offset}px)`;
  }

  // Needed because the HTML uses inline `onclick="..."` handlers.
  window.moveProductCarousel = moveProductCarousel;

  // ===== Mobile menu toggle (all pages) =====
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');

  if (menuToggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
      const clickInside = nav.contains(event.target) || menuToggle.contains(event.target);
      if (!clickInside && nav.classList.contains('open')) {
        closeMenu();
      }
    });
  }
})();

