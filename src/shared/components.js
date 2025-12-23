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

  static async init() {
    await this.loadHeader();
    await this.loadFooter();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => ComponentLoader.init());
} else {
  ComponentLoader.init();
}

window.ComponentLoader = ComponentLoader;
