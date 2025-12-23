class ComponentLoader {
  static async loadComponent(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to load: ${url}`);
      return await response.text();
    } catch (error) {
      console.error("Component loading error:", error);
      return "";
    }
  }

  static insertComponent(selector, html, position = "afterbegin") {
    const target = document.querySelector(selector);
    if (target) {
      target.insertAdjacentHTML(position, html);
    }
  }

  static async loadHeader() {
    const headerHTML = await this.loadComponent("../shared/header.html");
    if (headerHTML) {
      this.insertComponent("body", headerHTML, "afterbegin");
      this.highlightActivePage();
    }
  }

  static async loadFooter() {
    const footerHTML = await this.loadComponent("../shared/footer.html");
    if (footerHTML) {
      this.insertComponent("body", footerHTML, "beforeend");
    }
  }

  static highlightActivePage() {
    const currentPage = window.location.pathname.split("/").pop().split(".")[0];
    document.querySelectorAll(".nav-link[data-page]").forEach((link) => {
      const linkPage = link.getAttribute("data-page");
      link.classList.toggle("active", linkPage === currentPage);
    });
  }

  static generateBreadcrumb() {
    const currentPage = window.location.pathname.split("/").pop();
    const breadcrumbContainer = document.getElementById("breadcrumbContainer");
    const breadcrumb = document.getElementById("breadcrumb");

    if (!breadcrumb) return;

    // Page mapping for breadcrumb
    const pageMap = {
      "home.html": { name: "Home" },
      "courses.html": { name: "Courses" },
      "courseDetails.html": { name: "Course Details" },
      "aboutUs.html": { name: "About Us" },
      "cart.html": { name: "Cart" },
      "login.html": { name: "Login" },
      "registeration.html": { name: "Registration" },
    };

    // Hide breadcrumb on home page
    if (currentPage === "home.html" || currentPage === "") {
      if (breadcrumbContainer) {
        breadcrumbContainer.classList.add("hide");
      }
      return;
    }

    // Show breadcrumb on other pages
    if (breadcrumbContainer) {
      breadcrumbContainer.classList.remove("hide");
    }

    // Always start with Home
    let breadcrumbHTML = `
      <li class="breadcrumb-item">
        <a href="./home.html" class="breadcrumb-link">Home</a>
      </li>
    `;

    // Add current page
    if (pageMap[currentPage]) {
      breadcrumbHTML += `
        <li class="breadcrumb-item">
          <span class="breadcrumb-separator">//</span>
        </li>
        <li class="breadcrumb-item">
          <span class="breadcrumb-current">${pageMap[currentPage].name}</span>
        </li>
      `;
    }

    breadcrumb.innerHTML = breadcrumbHTML;
  }

  static async init() {
    await this.loadHeader();
    await this.loadFooter();
    this.generateBreadcrumb();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => ComponentLoader.init());
} else {
  ComponentLoader.init();
}

window.ComponentLoader = ComponentLoader;
