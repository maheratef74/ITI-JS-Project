// ========== REGISTRATION FORM VALIDATION ==========

// Initialize form validation when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Initialize validation with the form selector and submit button ID
  initializeFormValidation(".auth-form", "signupBtn");

  // Get form and handle submission
  const form = document.querySelector(".auth-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const formData = {
        fullName: document.getElementById("fullName").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        confirmPassword: document.getElementById("confirmPassword").value,
      };

      // Validate the form
      const validation = validateRegistrationForm(formData);

      if (validation.isValid) {
        // Save to session storage
        sessionStorage.setItem("email", formData.email);
        sessionStorage.setItem("password", formData.password);

        // Redirect to login page
        window.location.href = "login.html";
      } else {
        // Show all validation errors
        Object.keys(validation.errors).forEach((fieldId) => {
          showFieldError(fieldId, validation.errors[fieldId]);
        });
      }
    });
  }
});
