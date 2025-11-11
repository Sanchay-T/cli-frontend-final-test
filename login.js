// Login page functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeModal = document.getElementById('closeModal');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const modalErrorMessage = document.getElementById('modalErrorMessage');
    const successContainer = document.getElementById('successContainer');
    const closeSuccessBtn = document.getElementById('closeSuccessBtn');

    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
    }

    // Forgot Password Modal Handlers
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        openModal();
    });

    closeModal.addEventListener('click', function() {
        closeModalHandler();
    });

    closeSuccessBtn.addEventListener('click', function() {
        closeModalHandler();
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === forgotPasswordModal) {
            closeModalHandler();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && forgotPasswordModal.classList.contains('show')) {
            closeModalHandler();
        }
    });

    function openModal() {
        forgotPasswordModal.classList.add('show');
        modalErrorMessage.textContent = '';
        document.getElementById('resetEmail').value = '';
        forgotPasswordForm.style.display = 'block';
        successContainer.classList.remove('show');
    }

    function closeModalHandler() {
        forgotPasswordModal.classList.remove('show');
        // Reset form after animation completes
        setTimeout(function() {
            forgotPasswordForm.reset();
            modalErrorMessage.textContent = '';
            forgotPasswordForm.style.display = 'block';
            successContainer.classList.remove('show');
        }, 300);
    }

    // Forgot Password Form Submission
    forgotPasswordForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const resetEmail = document.getElementById('resetEmail').value.trim();
        modalErrorMessage.textContent = '';

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!resetEmail) {
            modalErrorMessage.textContent = 'Please enter your email address';
            return;
        }

        if (!emailRegex.test(resetEmail)) {
            modalErrorMessage.textContent = 'Please enter a valid email address';
            return;
        }

        // Show loading state
        const submitBtn = forgotPasswordForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate API call to send reset email
        setTimeout(function() {
            // Hide form and show success animation
            forgotPasswordForm.style.display = 'none';
            successContainer.classList.add('show');

            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Optional: Store email for demonstration purposes
            console.log('Password reset link sent to:', resetEmail);
        }, 1500);
    });

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
