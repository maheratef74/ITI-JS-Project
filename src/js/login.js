// ========== LOGIN FORM HANDLING ==========

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".auth-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      // Check if account exists
      if (!sessionStorage.getItem("email")) {
        alert("No account found. Please register first.");
        return;
      }

      // Validate credentials
      if (email !== sessionStorage.getItem("email")) {
        alert("Invalid credentials");
        return;
      }
      if (password !== sessionStorage.getItem("password")) {
        alert("Invalid credentials");
        return;
      }

      // Save credentials again to persist them
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
      sessionStorage.setItem("token", Math.random() * 1000000);

      alert("Login successful!");
      window.location.href = "courses.html";
    });
  }
});
