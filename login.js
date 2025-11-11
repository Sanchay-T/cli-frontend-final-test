document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("login-form");
  const errorMessage = document.getElementById("login-error");

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    if (!email || !password) {
      showError("Please provide both email and password.");
      return;
    }

    if (!isValidEmail(email)) {
      showError("Enter a valid email address to continue.");
      return;
    }

    hideError();
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", email);

    window.location.href = "dashboard.html";
  });

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
  }

  function hideError() {
    errorMessage.hidden = true;
    errorMessage.textContent = "";
  }
});
