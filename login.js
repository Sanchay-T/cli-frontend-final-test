// Login page functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Clear previous error message
        errorMessage.textContent = '';

        // Basic validation
        if (!email || !password) {
            errorMessage.textContent = 'Please fill in all fields';
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errorMessage.textContent = 'Please enter a valid email address';
            return;
        }

        // Password validation (minimum 6 characters for demo)
        if (password.length < 6) {
            errorMessage.textContent = 'Password must be at least 6 characters';
            return;
        }

        // Simulate login (in a real app, this would be an API call)
        // For demo purposes, any valid email and password >= 6 chars will work
        performLogin(email, password);
    });

    function performLogin(email, password) {
        // Show loading state
        const submitBtn = loginForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;

        // Simulate API call delay
        setTimeout(function() {
            // Store login state and user info
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);

            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        }, 1000);
    }
});
