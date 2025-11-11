document.addEventListener("DOMContentLoaded", () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated !== "true") {
    window.location.replace("index.html");
    return;
  }

  const email = localStorage.getItem("userEmail") || "Guest";
  const emailTarget = document.getElementById("user-email");

  if (emailTarget) {
    emailTarget.textContent = email;
  }

  const logoutButton = document.getElementById("logout-button");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userEmail");
      window.location.href = "index.html";
    });
  }
});
