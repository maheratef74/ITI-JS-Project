// ========== COURSE DATA ==========
let coursesData = [];
let displayedCourses = Infinity; // Show all courses
let currentSort = "default";
let cart = [];

// fetch courses data from api
function fetchCourses() {
  // Show loading state
  const grid = document.getElementById("coursesGrid");
  if (!grid) {
    console.error("coursesGrid element not found!");
    return;
  }

  grid.innerHTML = '<div class="loading" style="grid-column: 1/-1;"></div>';

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      try {
        coursesData = JSON.parse(xmlhttp.responseText);
        console.log("Courses loaded:", coursesData);
        console.log("Number of courses:", coursesData.length);

        // Add a small delay to show the loading animation
        setTimeout(() => {
          renderCourses();
        }, 500);
      } catch (error) {
        console.error("Error parsing courses data:", error);
        grid.innerHTML =
          '<p style="text-align: center; color: red; grid-column: 1/-1; padding: 40px; font-size: 18px;">⚠️ Error loading courses data.</p>';
      }
    } else if (xmlhttp.readyState == 4) {
      console.error("Failed to load courses! Status:", xmlhttp.status);
      grid.innerHTML =
        '<p style="text-align: center; color: red; grid-column: 1/-1; padding: 40px; font-size: 18px;">⚠️ Failed to load courses. Please try again later.</p>';
    }
  };

  xmlhttp.open(
    "GET",
    "https://my-json-server.typicode.com/Mahmoudshar0/courses-mock-data/courses",
    true
  );
  xmlhttp.send();
}

function loadCart() {
  const savedCart = sessionStorage.getItem("edunityCart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
  }
}

function saveCart() {
  sessionStorage.setItem("edunityCart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement) {
    cartCountElement.textContent = cart.length;
  }
}

function showToast(message, type) {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }
}

function addToCart(courseId) {
  const course = coursesData.find((c) => c.id === courseId);

  if (!cart.find((item) => item.id === courseId)) {
    cart.push(course);
    saveCart();
    showToast(`"${course.title}" has been added to your cart!`, "success");
  } else showToast("This course is already in your cart!", "error");
}

// render cart items from the session storage
function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartActions = document.getElementById("cartActions");
  const cartTotalAmount = document.getElementById("cartTotalAmount");

  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="cart-empty">Your cart is empty!</div>';
    cartTotal.style.display = "none";
    cartActions.style.display = "none";
  } else {
    let total = 0;
    cartItems.innerHTML = cart
      .map((item, index) => {
        total += item.price;
        return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${
          item.title
        }" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">$${item.price.toFixed(
                          2
                        )}</div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${
                      item.id
                    })">Remove</button>
                </div>
            `;
      })
      .join("");

    cartTotalAmount.textContent = `$${total.toFixed(2)}`;
    cartTotal.style.display = "block";
    cartActions.style.display = "flex";
  }
}

function removeFromCart(courseId) {
  cart = cart.filter((item) => item.id !== courseId);
  saveCart();
  renderCart();
  showToast("Course removed from cart!", "success");
}

// clear cart
const clearCartBtn = document.getElementById("clearCartBtn");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      cart = [];
      saveCart();
      renderCart();
      showToast("Cart cleared!", "success");
    }
  });
}

// view cart
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const cartModalClose = document.getElementById("cartModalClose");

if (cartBtn && cartModal) {
  cartBtn.addEventListener("click", () => {
    renderCart();
    cartModal.classList.add("active");
  });
}

// close cart modal
if (cartModalClose && cartModal) {
  cartModalClose.addEventListener("click", () => {
    cartModal.classList.remove("active");
  });

  cartModal.addEventListener("click", (e) => {
    if (e.target.id === "cartModal") {
      cartModal.classList.remove("active");
    }
  });
}

function sortCourses(sortType) {
  let sorted = [...coursesData];

  switch (sortType) {
    case "price-low":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return sorted;
}

// render courses - مع التعديل لجعل الكارد كلها clickable
function renderCourses() {
  console.log("renderCourses called");
  console.log("coursesData:", coursesData);
  console.log("coursesData.length:", coursesData.length);

  const sortedCourses = sortCourses(currentSort);
  const coursesToShow = sortedCourses.slice(0, displayedCourses);
  const grid = document.getElementById("coursesGrid");

  if (!grid) {
    console.error("coursesGrid element not found in renderCourses!");
    return;
  }

  console.log("Rendering", coursesToShow.length, "courses");

  grid.innerHTML = coursesToShow
    .map(
      (course) => `
        <div class="course-card">
          
          <a href="./courseDetails.html?id=${
            course.id
          }" class="course-card-link" aria-label="View details of ${
        course.title
      }"></a>
          <div class="course-image">
            <img src="${course.image}" alt="${course.title}">
            <div class="course-category">${course.category}</div>
          </div>
          <div class="course-content">
            <div class="course-header">
              <div class="course-rating">
                <span class="stars">${"★".repeat(
                  Math.floor(course.rating)
                )}${"☆".repeat(5 - Math.floor(course.rating))}</span>
                <span class="rating-count">${course.rating} (${
        course.ratingCount
      })</span>
              </div>
              <div class="course-price">$${course.price.toFixed(2)}</div>
            </div>
            <h3 class="course-title">${course.title}</h3>
            <div class="course-meta">
              <div class="meta-item">📚 ${course.lessons} Lesson</div>
              <div class="meta-item">⏱️ ${course.duration}</div>
              <div class="meta-item">👥 ${course.students}+</div>
            </div>
            <div class="course-footer">
              <div class="instructor">
                <img src="https://i.pravatar.cc/70?img=${course.id}" alt="${
        course.instructor
      }" class="instructor-avatar">
                <span class="instructor-name">${course.instructor}</span>
              </div>
              <div class="course-actions">
                <button class="btn btn-cart" onclick="event.stopPropagation(); event.preventDefault(); addToCart(${
                  course.id
                })">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      `
    )
    .join("");

  // Hide Load More button if all courses are displayed
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    if (displayedCourses >= coursesData.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }
  }
}

// load more courses
const loadMoreBtn = document.getElementById("loadMoreBtn");
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    displayedCourses += 3;
    renderCourses();
  });
}

// sort buttons
document.querySelectorAll(".sort-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document
      .querySelectorAll(".sort-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");
    currentSort = this.dataset.sort;
    displayedCourses = 6;
    renderCourses();
  });
});

// nav-bar dropdowns
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
  const link = item.querySelector(".nav-link[data-dropdown]");
  if (link) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });
      item.classList.toggle("active");
    });
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".nav-item")) {
    navItems.forEach((item) => {
      item.classList.remove("active");
    });
  }
});

//  hamburger menu
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// search
const searchBtn = document.getElementById("searchBtn");
const searchOverlay = document.getElementById("searchOverlay");
const searchClose = document.getElementById("searchClose");

if (searchBtn && searchOverlay) {
  searchBtn.addEventListener("click", () => {
    searchOverlay.classList.add("active");
    const searchInput = document.querySelector(".search-input");
    if (searchInput) searchInput.focus();
  });
}

if (searchClose && searchOverlay) {
  searchClose.addEventListener("click", () => {
    searchOverlay.classList.remove("active");
  });

  searchOverlay.addEventListener("click", (e) => {
    if (e.target === searchOverlay) {
      searchOverlay.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
      searchOverlay.classList.remove("active");
    }
  });
}

// smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
      });
      if (navMenu) navMenu.classList.remove("active");
      if (hamburger) hamburger.classList.remove("active");
    }
  });
});

// newsletter subscription
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = e.target.querySelector(".newsletter-input");
    const message = document.getElementById("newsletterMessage");

    if (input && input.value && message) {
      message.classList.add("show");
      input.value = "";

      setTimeout(() => {
        message.classList.remove("show");
      }, 3000);
    }
  });
}

// startup
loadCart();
fetchCourses();
