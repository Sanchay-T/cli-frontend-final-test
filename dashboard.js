// Dashboard Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    const userEmailElement = document.getElementById('userEmail');
    const navItems = document.querySelectorAll('.nav-item');

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        // Redirect to login page if not logged in
        window.location.href = 'index.html';
        return;
    }

    // Display user email
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail && userEmailElement) {
        userEmailElement.textContent = userEmail;
    }

    // Handle logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Clear login status
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            
            // Redirect to login page
            window.location.href = 'index.html';
        });
    }

    // Handle navigation item clicks
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
});
