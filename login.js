// Login page functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const forgotPasswordTrigger = document.getElementById('forgotPasswordTrigger');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const forgotPasswordClose = document.getElementById('forgotPasswordClose');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const forgotPasswordEmail = document.getElementById('forgotPasswordEmail');
    const forgotPasswordError = document.getElementById('forgotPasswordError');
    const forgotPasswordSuccess = document.getElementById('forgotPasswordSuccess');
    const forgotPasswordSubmit = document.getElementById('forgotPasswordSubmit');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'dashboard.html';
        return;
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            if (errorMessage) {
                errorMessage.textContent = '';
            }

            if (!email || !password) {
                if (errorMessage) {
                    errorMessage.textContent = 'Please fill in all fields';
                }
                return;
            }

            if (!emailRegex.test(email)) {
                if (errorMessage) {
                    errorMessage.textContent = 'Please enter a valid email address';
                }
                return;
            }

            if (password.length < 6) {
                if (errorMessage) {
                    errorMessage.textContent = 'Password must be at least 6 characters';
                }
                return;
            }

            performLogin(email);
        });
    }

    function performLogin(email) {
        const submitBtn = loginForm ? loginForm.querySelector('.submit-btn') : null;
        if (!submitBtn) {
            return;
        }

        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;

        setTimeout(function() {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            window.location.href = 'dashboard.html';

            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    }

    if (
        forgotPasswordTrigger &&
        forgotPasswordModal &&
        forgotPasswordClose &&
        forgotPasswordForm &&
        forgotPasswordEmail &&
        forgotPasswordError &&
        forgotPasswordSuccess &&
        forgotPasswordSubmit
    ) {
        const submitDefaultText = forgotPasswordSubmit.textContent;
        let pendingTimeout = null;

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                closeForgotPasswordModal();
            }
        };

        function resetForgotPasswordModal() {
            if (pendingTimeout) {
                clearTimeout(pendingTimeout);
                pendingTimeout = null;
            }

            forgotPasswordForm.reset();
            forgotPasswordForm.hidden = false;

            forgotPasswordEmail.setAttribute('aria-invalid', 'false');

            forgotPasswordError.textContent = '';

            forgotPasswordSubmit.disabled = false;
            forgotPasswordSubmit.textContent = submitDefaultText;

            forgotPasswordSuccess.hidden = true;
            forgotPasswordSuccess.classList.remove('active');
        }

        function openForgotPasswordModal() {
            resetForgotPasswordModal();

            forgotPasswordModal.classList.add('active');
            forgotPasswordModal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');

            document.addEventListener('keydown', handleEscapeKey);

            requestAnimationFrame(() => {
                forgotPasswordEmail.focus();
            });
        }

        function closeForgotPasswordModal() {
            resetForgotPasswordModal();

            forgotPasswordModal.classList.remove('active');
            forgotPasswordModal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');

            document.removeEventListener('keydown', handleEscapeKey);
        }

        forgotPasswordTrigger.addEventListener('click', openForgotPasswordModal);
        forgotPasswordClose.addEventListener('click', closeForgotPasswordModal);

        forgotPasswordModal.addEventListener('click', (event) => {
            if (event.target === forgotPasswordModal) {
                closeForgotPasswordModal();
            }
        });

        forgotPasswordForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const emailValue = forgotPasswordEmail.value.trim();

            forgotPasswordError.textContent = '';

            if (!emailRegex.test(emailValue)) {
                forgotPasswordError.textContent = 'Please enter a valid email address';
                forgotPasswordEmail.setAttribute('aria-invalid', 'true');
                forgotPasswordEmail.focus();
                return;
            }

            forgotPasswordEmail.setAttribute('aria-invalid', 'false');

            forgotPasswordSubmit.disabled = true;
            forgotPasswordSubmit.textContent = 'Sending...';

            pendingTimeout = setTimeout(() => {
                forgotPasswordSubmit.disabled = false;
                forgotPasswordSubmit.textContent = submitDefaultText;

                forgotPasswordForm.hidden = true;
                forgotPasswordSuccess.hidden = false;

                requestAnimationFrame(() => {
                    forgotPasswordSuccess.classList.add('active');
                });

                pendingTimeout = null;
            }, 1000);
        });
    }
});
