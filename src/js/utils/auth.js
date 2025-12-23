// ========== AUTHENTICATION UTILITY ==========

/**
 * Checks if user is authenticated by verifying session storage
 * Redirects to login page if not authenticated
 * @param {string} redirectUrl - Optional custom redirect URL (default: ./login.html)
 */
function checkAuthentication(redirectUrl = "./login.html") {
  const email = sessionStorage.getItem("email");
  const password = sessionStorage.getItem("password");
  const token = sessionStorage.getItem("token");

  if (!email || !password || !token) {
    // User is not logged in, redirect to login page
    window.location.href = redirectUrl;
  }
}

/**
 * Checks if user is authenticated (returns boolean instead of redirecting)
 * @returns {boolean} - True if authenticated, false otherwise
 */
function isAuthenticated() {
  const email = sessionStorage.getItem("email");
  const password = sessionStorage.getItem("password");
  return !!(email && password);
}

/**
 * Logs out the user by clearing session storage
 * @param {string} redirectUrl - Optional redirect URL after logout (default: ./login.html)
 */
function logout(redirectUrl = "./login.html") {
  sessionStorage.removeItem("email");
  sessionStorage.removeItem("password");
  sessionStorage.removeItem("token");
  window.location.href = redirectUrl;
}

/**
 * Gets current user information from session storage
 * @returns {object|null} - User object or null if not authenticated
 */
function getCurrentUser() {
  const email = sessionStorage.getItem("email");
  const password = sessionStorage.getItem("password");

  if (email && password) {
    return {
      email,
      password,
    };
  }

  return null;
}
