// ========== FORM VALIDATION UTILITY ==========

/**
 * Validates a full name
 * @param {string} name - The full name to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
function validateFullName(name) {
  if (!name || name.trim().length === 0) {
    return { isValid: false, message: "Full name is required" };
  }
  if (name.trim().length < 3) {
    return { isValid: false, message: "Name must be at least 3 characters" };
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return {
      isValid: false,
      message: "Name can only contain letters and spaces",
    };
  }
  return { isValid: true, message: "" };
}

/**
 * Validates a phone number
 * @param {string} phone - The phone number to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
function validatePhone(phone) {
  if (!phone || phone.trim().length === 0) {
    return { isValid: false, message: "Phone number is required" };
  }
  // Allow various formats: 0123456789, +1234567890, etc.
  const phoneRegex =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
    return { isValid: false, message: "Please enter a valid phone number" };
  }
  return { isValid: true, message: "" };
}

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
function validateEmail(email) {
  if (!email || email.trim().length === 0) {
    return { isValid: false, message: "Email is required" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address" };
  }
  return { isValid: true, message: "" };
}

/**
 * Validates a password
 * @param {string} password - The password to validate
 * @returns {object} - { isValid: boolean, message: string }
 */
function validatePassword(password) {
  if (!password || password.length === 0) {
    return { isValid: false, message: "Password is required" };
  }
  if (password.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters",
    };
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter",
    };
  }
  if (!/(?=.*[A-Z])/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter",
    };
  }
  if (!/(?=.*\d)/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one number",
    };
  }
  return { isValid: true, message: "" };
}

/**
 * Validates the entire registration form
 * @param {object} formData - Object containing form field values
 * @returns {object} - { isValid: boolean, errors: object }
 */
function validateRegistrationForm(formData) {
  const errors = {};
  let isValid = true;

  // Validate full name
  const nameValidation = validateFullName(formData.fullName);
  if (!nameValidation.isValid) {
    errors.fullName = nameValidation.message;
    isValid = false;
  }

  // Validate phone
  const phoneValidation = validatePhone(formData.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.message;
    isValid = false;
  }

  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
    isValid = false;
  }

  // Validate password
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
    isValid = false;
  }

  // Validate confirm password
  if (!formData.confirmPassword || formData.confirmPassword.length === 0) {
    errors.confirmPassword = "Please confirm your password";
    isValid = false;
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
    isValid = false;
  }

  return { isValid, errors };
}

/**
 * Shows validation error for a specific field
 * @param {string} fieldId - The ID of the input field
 * @param {string} message - The error message to display
 */
function showFieldError(fieldId, message) {
  const inputElement = document.getElementById(fieldId);
  if (!inputElement) return;

  const formGroup = inputElement.closest(".form-group");
  if (!formGroup) return;

  // Remove existing error if present
  const existingError = formGroup.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Add error styling to input
  inputElement.classList.add("error");

  // Create and add error message
  if (message) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
  }
}

/**
 * Clears validation error for a specific field
 * @param {string} fieldId - The ID of the input field
 */
function clearFieldError(fieldId) {
  const inputElement = document.getElementById(fieldId);
  if (!inputElement) return;

  const formGroup = inputElement.closest(".form-group");
  if (!formGroup) return;

  // Remove error styling
  inputElement.classList.remove("error");

  // Remove error message
  const existingError = formGroup.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }
}

/**
 * Initializes real-time validation for a form
 * @param {string} formSelector - CSS selector for the form
 * @param {string} submitButtonId - ID of the submit button
 */
function initializeFormValidation(formSelector, submitButtonId) {
  const form = document.querySelector(formSelector);
  const submitButton = document.getElementById(submitButtonId);

  if (!form || !submitButton) {
    console.error("Form or submit button not found");
    return;
  }

  // Disable submit button initially
  submitButton.disabled = true;
  submitButton.style.opacity = "0.5";
  submitButton.style.cursor = "not-allowed";

  // Get all required inputs
  const inputs = form.querySelectorAll("input[required]");

  // Validation function
  function validateForm() {
    const formData = {
      fullName: document.getElementById("fullName")?.value || "",
      phone: document.getElementById("phone")?.value || "",
      email: document.getElementById("email")?.value || "",
      password: document.getElementById("password")?.value || "",
      confirmPassword: document.getElementById("confirmPassword")?.value || "",
    };

    const validation = validateRegistrationForm(formData);

    // Check if terms checkbox is checked
    const termsCheckbox = document.getElementById("termsCheckbox");
    const isTermsChecked = termsCheckbox ? termsCheckbox.checked : false;

    // Update submit button state - must pass validation AND checkbox must be checked
    if (validation.isValid && isTermsChecked) {
      submitButton.disabled = false;
      submitButton.style.opacity = "1";
      submitButton.style.cursor = "pointer";
    } else {
      submitButton.disabled = true;
      submitButton.style.opacity = "0.5";
      submitButton.style.cursor = "not-allowed";
    }

    return validation;
  }

  // Add checkbox event listener
  const termsCheckbox = document.getElementById("termsCheckbox");
  if (termsCheckbox) {
    termsCheckbox.addEventListener("change", () => {
      validateForm();
    });
  }

  // Add input event listeners for real-time validation
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateForm();
      // Clear error when user starts typing
      clearFieldError(input.id);
    });

    input.addEventListener("blur", () => {
      const formData = {
        fullName: document.getElementById("fullName")?.value || "",
        phone: document.getElementById("phone")?.value || "",
        email: document.getElementById("email")?.value || "",
        password: document.getElementById("password")?.value || "",
        confirmPassword:
          document.getElementById("confirmPassword")?.value || "",
      };

      // Validate individual field on blur
      if (input.id === "fullName") {
        const result = validateFullName(formData.fullName);
        if (!result.isValid) showFieldError(input.id, result.message);
      } else if (input.id === "phone") {
        const result = validatePhone(formData.phone);
        if (!result.isValid) showFieldError(input.id, result.message);
      } else if (input.id === "email") {
        const result = validateEmail(formData.email);
        if (!result.isValid) showFieldError(input.id, result.message);
      } else if (input.id === "password") {
        const result = validatePassword(formData.password);
        if (!result.isValid) showFieldError(input.id, result.message);
      } else if (input.id === "confirmPassword") {
        if (formData.password !== formData.confirmPassword) {
          showFieldError(input.id, "Passwords do not match");
        }
      }
    });
  });

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const validation = validateForm();

    if (!validation.isValid) {
      // Show all errors
      Object.keys(validation.errors).forEach((fieldId) => {
        showFieldError(fieldId, validation.errors[fieldId]);
      });
      return false;
    }

    return true;
  });
}
