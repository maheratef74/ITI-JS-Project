// ==================== CONSTANTS AND CONFIGURATION ====================
const CONFIG = {
  API_URL:
    "https://my-json-server.typicode.com/Mahmoudshar0/courses-mock-data/courses",
  TESTIMONIALS_URL: "../../TESTIMONIALS.json",
  COURSES_LIMIT: 6,
  CAROUSEL_AUTO_PLAY_INTERVAL: 5000,
  STORAGE_KEYS: {
    CART: "edunityCart",
    USER_EMAIL: "email",
    USER_PASSWORD: "password",
  },
};

// ==================== UTILITY FUNCTIONS ====================
class DOMHelper {
  static select(selector) {
    return document.querySelector(selector);
  }

  static selectAll(selector) {
    return document.querySelectorAll(selector);
  }

  static createElement(tag, className = "", content = "") {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
  }

  static toggleClass(element, className) {
    element.classList.toggle(className);
  }

  static addClass(element, className) {
    element.classList.add(className);
  }

  static removeClass(element, className) {
    element.classList.remove(className);
  }
}

class StorageHelper {
  static get(key) {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return sessionStorage.getItem(key);
    }
  }

  static set(key, value) {
    const data = typeof value === "string" ? value : JSON.stringify(value);
    sessionStorage.setItem(key, data);
  }

  static remove(key) {
    sessionStorage.removeItem(key);
  }
}

class NotificationService {
  static show(message, type = "success") {
    const toast = DOMHelper.select("#toast");
    toast.textContent = message;
    toast.className = `toast ${type}`;
    DOMHelper.addClass(toast, "show");

    setTimeout(() => {
      DOMHelper.removeClass(toast, "show");
    }, 3000);
  }
}

// ==================== AUTHENTICATION SERVICE ====================
class AuthService {
  static isAuthenticated() {
    const email = StorageHelper.get(CONFIG.STORAGE_KEYS.USER_EMAIL);
    const password = StorageHelper.get(CONFIG.STORAGE_KEYS.USER_PASSWORD);
    return email && password;
  }

  static updateAuthUI() {
    const authButtons = DOMHelper.select("#authButtons");
    if (authButtons && this.isAuthenticated()) {
      authButtons.style.display = "none";
    }
  }
}

// ==================== CART SERVICE ====================
class CartService {
  static getCart() {
    return StorageHelper.get(CONFIG.STORAGE_KEYS.CART) || [];
  }

  static saveCart(cart) {
    StorageHelper.set(CONFIG.STORAGE_KEYS.CART, cart);
  }

  static addItem(course) {
    const cart = this.getCart();
    const existingItem = cart.find((item) => item.id === course.id);

    if (existingItem) {
      NotificationService.show("Course already in cart!", "error");
      return false;
    }

    cart.push({
      id: course.id,
      title: course.title,
      price: course.price,
      image: course.image,
    });

    this.saveCart(cart);
    this.updateCartCount();
    NotificationService.show("Course added to cart!", "success");
    return true;
  }

  static removeItem(courseId) {
    let cart = this.getCart();
    cart = cart.filter((item) => item.id !== courseId);
    this.saveCart(cart);
    this.updateCartCount();
    this.renderCart();
  }

  static clearCart() {
    StorageHelper.set(CONFIG.STORAGE_KEYS.CART, []);
    this.updateCartCount();
    this.renderCart();
    NotificationService.show("Cart cleared!", "success");
  }

  static updateCartCount() {
    const cart = this.getCart();
    const cartCount = DOMHelper.select("#cartCount");
    if (cartCount) {
      cartCount.textContent = cart.length;
    }
  }

  static getTotalPrice() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.price, 0);
  }

  static renderCart() {
    const cartItems = DOMHelper.select("#cartItems");
    const cartTotal = DOMHelper.select("#cartTotal");
    const cartActions = DOMHelper.select("#cartActions");
    const cart = this.getCart();

    if (!cartItems) return;

    if (cart.length === 0) {
      cartItems.innerHTML =
        '<p style="text-align: center; padding: 40px; color: #666;">Your cart is empty</p>';
      cartTotal.style.display = "none";
      cartActions.style.display = "none";
      return;
    }

    cartTotal.style.display = "block";
    cartActions.style.display = "flex";

    cartItems.innerHTML = cart
      .map(
        (item) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${
          item.title
        }" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <button class="cart-item-remove" onclick="CartService.removeItem(${
                      item.id
                    })">Remove</button>
                </div>
            </div>
        `
      )
      .join("");

    const cartTotalAmount = DOMHelper.select("#cartTotalAmount");
    if (cartTotalAmount) {
      cartTotalAmount.textContent = `$${this.getTotalPrice().toFixed(2)}`;
    }
  }
}

// ==================== COURSES SERVICE ====================
class CoursesService {
  static async fetchCourses() {
    try {
      const response = await fetch(CONFIG.API_URL);
      if (!response.ok) throw new Error("Failed to fetch courses");
      const courses = await response.json();
      return courses.slice(0, CONFIG.COURSES_LIMIT);
    } catch (error) {
      console.error("Error fetching courses:", error);
      NotificationService.show("Failed to load courses", "error");
      return [];
    }
  }

  static generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = "★".repeat(fullStars);
    if (hasHalfStar) stars += "☆";
    stars += "☆".repeat(5 - Math.ceil(rating));
    return stars;
  }

  static createCourseCard(course) {
    const stars = this.generateStars(course.rating);

    return `
            <div class="course-card">
                <a href="courseDetails.html?id=${
                  course.id
                }" class="course-card-link"></a>
                <div class="course-image">
                    <img src="${course.image}" alt="${course.title}">
                    <div class="course-category">${course.category}</div>
                </div>
                <div class="course-content">
                    <div class="course-header">
                        <div class="course-rating">
                            <span class="stars">${stars}</span>
                            <span class="rating-count">${course.rating} (${
      course.ratingCount
    })</span>
                        </div>
                        <div class="course-price">$${course.price.toFixed(
                          2
                        )}</div>
                    </div>
                    <h3 class="course-title">${course.title}</h3>
                    <div class="course-meta">
                        <div class="meta-item">📚 ${course.lessons} Lesson</div>
                        <div class="meta-item">⏱️ ${course.duration}</div>
                        <div class="meta-item">👥 ${course.students}+</div>
                    </div>
                    <div class="course-footer">
                        <div class="instructor">
                            <img src="https://i.pravatar.cc/70?u=${
                              course.instructor
                            }" alt="${
      course.instructor
    }" class="instructor-avatar">
                            <span class="instructor-name">${
                              course.instructor
                            }</span>
                        </div>
                        <div class="course-actions">
                            <button class="btn-cart" onclick="event.preventDefault(); event.stopPropagation(); CartService.addItem(${JSON.stringify(
                              course
                            ).replace(/"/g, "&quot;")})">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }

  static async renderCourses() {
    const coursesGrid = DOMHelper.select("#coursesGrid");
    if (!coursesGrid) return;

    coursesGrid.innerHTML =
      '<p style="text-align: center; padding: 40px;">Loading courses...</p>';

    const courses = await this.fetchCourses();

    if (courses.length === 0) {
      coursesGrid.innerHTML =
        '<p style="text-align: center; padding: 40px;">No courses available</p>';
      return;
    }

    coursesGrid.innerHTML = courses
      .map((course) => this.createCourseCard(course))
      .join("");
  }
}

// ==================== TESTIMONIALS SERVICE ====================
class TestimonialsService {
  static async fetchTestimonials() {
    try {
      const response = await fetch(CONFIG.TESTIMONIALS_URL);
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      const data = await response.json();
      return data.testimonials || [];
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      NotificationService.show("Failed to load testimonials", "error");
      return [];
    }
  }

  static generateStars(rating) {
    return "★".repeat(rating);
  }

  static createTestimonialCard(testimonial) {
    const stars = this.generateStars(testimonial.rating);

    return `
      <div class="testimonial-card">
        <div class="testimonial-stars">${stars}</div>
        <p class="testimonial-text">"${testimonial.text}"</p>
        <div class="testimonial-author">
          <img
            src="${testimonial.avatar}"
            alt="${testimonial.name}"
            class="testimonial-avatar"
          />
          <div class="testimonial-info">
            <h4 class="testimonial-name">${testimonial.name}</h4>
            <p class="testimonial-role">${testimonial.role}</p>
          </div>
        </div>
      </div>
    `;
  }

  static async renderTestimonials() {
    const testimonialsContainer = DOMHelper.select("#testimonialsContainer");
    if (!testimonialsContainer) return;

    testimonialsContainer.innerHTML =
      '<p style="text-align: center; padding: 40px;">Loading testimonials...</p>';

    const testimonials = await this.fetchTestimonials();

    if (testimonials.length === 0) {
      testimonialsContainer.innerHTML =
        '<p style="text-align: center; padding: 40px;">No testimonials available</p>';
      return;
    }

    testimonialsContainer.innerHTML = testimonials
      .map((testimonial) => this.createTestimonialCard(testimonial))
      .join("");

    return testimonials.length;
  }
}

// ==================== CAROUSEL SERVICE ====================
class CarouselService {
  constructor(containerId, dotsId, prevBtnId, nextBtnId) {
    this.container = DOMHelper.select(containerId);
    this.dotsContainer = DOMHelper.select(dotsId);
    this.prevBtn = DOMHelper.select(prevBtnId);
    this.nextBtn = DOMHelper.select(nextBtnId);

    if (!this.container) return;

    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.cardsPerView = this.getCardsPerView();

    // Use a small delay to ensure DOM is ready
    setTimeout(() => {
      this.cards = Array.from(this.container.children);
      if (this.cards.length > 0) {
        this.init();
      }
    }, 100);
  }

  getCardsPerView() {
    const width = window.innerWidth;
    if (width <= 768) return 1;
    if (width <= 1024) return 2;
    return 3;
  }

  init() {
    this.createDots();
    this.attachEventListeners();
    this.updateCarousel();
    this.startAutoPlay();
    this.handleResize();
  }

  createDots() {
    if (!this.dotsContainer) return;

    // Calculate how many slides we can show (total cards - cards per view + 1)
    const totalSlides = Math.max(1, this.cards.length - this.cardsPerView + 1);
    this.dotsContainer.innerHTML = "";

    for (let i = 0; i < totalSlides; i++) {
      const dot = DOMHelper.createElement("button", "carousel-dot");
      dot.addEventListener("click", () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }

    this.updateDots();
  }

  updateDots() {
    if (!this.dotsContainer) return;

    const dots = this.dotsContainer.children;
    Array.from(dots).forEach((dot, index) => {
      if (index === this.currentIndex) {
        DOMHelper.addClass(dot, "active");
      } else {
        DOMHelper.removeClass(dot, "active");
      }
    });
  }

  attachEventListeners() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.prev());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.next());
    }

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    this.container.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    this.container.addEventListener("touchend", (e) => {
      endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) this.next();
      if (endX - startX > 50) this.prev();
    });
  }

  handleResize() {
    window.addEventListener("resize", () => {
      const newCardsPerView = this.getCardsPerView();
      if (newCardsPerView !== this.cardsPerView) {
        this.cardsPerView = newCardsPerView;
        this.currentIndex = 0;
        this.cards = Array.from(this.container.children);
        this.createDots();
        this.updateCarousel();
      }
    });
  }

  updateCarousel() {
    if (!this.cards || this.cards.length === 0) return;

    // Calculate the width of one card including the gap
    const cardWidth = this.cards[0].offsetWidth;
    const gap = 30;

    // Move by card width + gap for each slide
    const offset = -this.currentIndex * (cardWidth + gap);

    this.container.style.transform = `translateX(${offset}px)`;
    this.container.style.transition = "transform 0.3s ease-in-out";
    this.updateDots();
  }

  next() {
    const maxIndex = this.cards.length - this.cardsPerView;
    this.currentIndex =
      this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1;
    this.updateCarousel();
    this.resetAutoPlay();
  }

  prev() {
    const maxIndex = this.cards.length - this.cardsPerView;
    this.currentIndex =
      this.currentIndex <= 0 ? maxIndex : this.currentIndex - 1;
    this.updateCarousel();
    this.resetAutoPlay();
  }

  goToSlide(index) {
    // Ensure index is within valid bounds
    const maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
    this.currentIndex = Math.max(0, Math.min(index, maxIndex));
    this.updateCarousel();
    this.resetAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, CONFIG.CAROUSEL_AUTO_PLAY_INTERVAL);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}

// ==================== NAVIGATION SERVICE ====================
class NavigationService {
  static init() {
    this.initDropdowns();
    this.initMobileMenu();
    this.initSearchOverlay();
    this.initCartModal();
    this.initNewsletterForm();
  }

  static initDropdowns() {
    const navLinks = DOMHelper.selectAll(".nav-link[data-dropdown]");

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const parent = link.parentElement;

        // Close other dropdowns
        DOMHelper.selectAll(".nav-item").forEach((item) => {
          if (item !== parent) {
            DOMHelper.removeClass(item, "active");
          }
        });

        DOMHelper.toggleClass(parent, "active");
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-item")) {
        DOMHelper.selectAll(".nav-item").forEach((item) => {
          DOMHelper.removeClass(item, "active");
        });
      }
    });
  }

  static initMobileMenu() {
    const hamburger = DOMHelper.select("#hamburger");
    const navMenu = DOMHelper.select("#navMenu");

    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        DOMHelper.toggleClass(hamburger, "active");
        DOMHelper.toggleClass(navMenu, "active");
      });
    }
  }

  static initSearchOverlay() {
    const searchBtn = DOMHelper.select("#searchBtn");
    const searchOverlay = DOMHelper.select("#searchOverlay");
    const searchClose = DOMHelper.select("#searchClose");

    if (searchBtn && searchOverlay) {
      searchBtn.addEventListener("click", () => {
        DOMHelper.addClass(searchOverlay, "active");
        DOMHelper.select(".search-input")?.focus();
      });
    }

    if (searchClose && searchOverlay) {
      searchClose.addEventListener("click", () => {
        DOMHelper.removeClass(searchOverlay, "active");
      });
    }

    if (searchOverlay) {
      searchOverlay.addEventListener("click", (e) => {
        if (e.target === searchOverlay) {
          DOMHelper.removeClass(searchOverlay, "active");
        }
      });
    }
  }

  static initCartModal() {
    const cartBtn = DOMHelper.select("#cartBtn");
    const cartModal = DOMHelper.select("#cartModal");
    const cartModalClose = DOMHelper.select("#cartModalClose");
    const clearCartBtn = DOMHelper.select("#clearCartBtn");

    if (cartBtn && cartModal) {
      cartBtn.addEventListener("click", () => {
        DOMHelper.addClass(cartModal, "active");
        CartService.renderCart();
      });
    }

    if (cartModalClose && cartModal) {
      cartModalClose.addEventListener("click", () => {
        DOMHelper.removeClass(cartModal, "active");
      });
    }

    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear your cart?")) {
          CartService.clearCart();
        }
      });
    }

    // Close cart modal when clicking outside
    if (cartModal) {
      document.addEventListener("click", (e) => {
        if (
          cartModal.classList.contains("active") &&
          !e.target.closest(".cart-content") &&
          !e.target.closest("#cartBtn")
        ) {
          DOMHelper.removeClass(cartModal, "active");
        }
      });
    }
  }

  static initNewsletterForm() {
    const newsletterForm = DOMHelper.select("#newsletterForm");
    const newsletterMessage = DOMHelper.select("#newsletterMessage");

    if (newsletterForm && newsletterMessage) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault();
        DOMHelper.addClass(newsletterMessage, "show");
        newsletterForm.reset();

        setTimeout(() => {
          DOMHelper.removeClass(newsletterMessage, "show");
        }, 3000);
      });
    }
  }
}

// ==================== MAIN APPLICATION ====================
class HomePageApp {
  static async init() {
    // Initialize authentication UI
    AuthService.updateAuthUI();

    // Initialize cart count
    CartService.updateCartCount();

    // Initialize navigation
    NavigationService.init();

    // Load and render courses
    await CoursesService.renderCourses();

    // Load and render testimonials
    await TestimonialsService.renderTestimonials();

    // Initialize testimonials carousel (after testimonials are loaded)
    new CarouselService(
      "#testimonialsContainer",
      "#carouselDots",
      "#carouselPrev",
      "#carouselNext"
    );

    // Add smooth scroll behavior
    this.initSmoothScroll();
  }

  static initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#" || !href) return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
}

// ==================== INITIALIZE APP ====================
document.addEventListener("DOMContentLoaded", () => {
  HomePageApp.init();
});

// Make CartService available globally for inline onclick handlers
window.CartService = CartService;
