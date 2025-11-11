// Login Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'dashboard.html';
    }

    // Handle form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Clear previous error message
        errorMessage.textContent = '';

        // Basic validation
        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }

        // Email validation
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address');
            return;
        }

        // Demo authentication - In production, this would be an API call
        if (email === 'test@example.com' && password === 'password123') {
            // Store login status and user email
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            // Show success and redirect
            showSuccess('Login successful! Redirecting...');
            
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        } else {
            showError('Invalid email or password');
        }
    });

    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Helper function to show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.color = '#e74c3c';
    }

    // Helper function to show success message
    function showSuccess(message) {
        errorMessage.textContent = message;
        errorMessage.style.color = '#27ae60';
    }
});
