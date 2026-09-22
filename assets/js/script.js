/**
 * PIOS - BizGrowth Engine | Unified Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Password Visibility Toggle ---
    const passwordInput = document.getElementById('password');
    const passwordToggleBtn = document.getElementById('passwordToggleBtn');
    const eyeShow = passwordToggleBtn ? passwordToggleBtn.querySelector('.eye-show') : null;
    const eyeHide = passwordToggleBtn ? passwordToggleBtn.querySelector('.eye-hide') : null;

    if (passwordToggleBtn && passwordInput) {
        passwordToggleBtn.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

            if (eyeShow && eyeHide) {
                if (isPassword) {
                    eyeShow.style.display = 'none';
                    eyeHide.style.display = 'block';
                    passwordToggleBtn.setAttribute('aria-label', 'Hide password');
                } else {
                    eyeShow.style.display = 'block';
                    eyeHide.style.display = 'none';
                    passwordToggleBtn.setAttribute('aria-label', 'Show password');
                }
            }
        });
    }

    // --- 2. Mobile Drawer Navigation Toggle ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');

    function openDrawer() {
        if (mobileDrawer && drawerOverlay) {
            mobileDrawer.classList.add('active');
            drawerOverlay.classList.add('active');
            hamburgerBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeDrawer() {
        if (mobileDrawer && drawerOverlay) {
            mobileDrawer.classList.remove('active');
            drawerOverlay.classList.remove('active');
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openDrawer);
    }

    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', closeDrawer);
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeDrawer);
    }

    // Close drawer on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
            closeDrawer();
        }
    });

    // --- 3. Form Validation & Submission ---
    const loginForm = document.getElementById('loginForm');
    const piosIdInput = document.getElementById('piosId');
    const piosIdError = document.getElementById('piosIdError');
    const passwordError = document.getElementById('passwordError');
    const loginSubmitBtn = document.getElementById('loginSubmitBtn');
    const loginFeedback = document.getElementById('loginFeedback');

    function clearErrors() {
        if (piosIdInput) piosIdInput.classList.remove('has-error');
        if (passwordInput) passwordInput.classList.remove('has-error');
        if (piosIdError) piosIdError.classList.remove('active');
        if (passwordError) passwordError.classList.remove('active');
        if (loginFeedback) {
            loginFeedback.className = 'login-feedback';
            loginFeedback.style.display = 'none';
            loginFeedback.textContent = '';
        }
    }

    if (piosIdInput) {
        piosIdInput.addEventListener('input', () => {
            if (piosIdInput.value.trim()) {
                piosIdInput.classList.remove('has-error');
                if (piosIdError) piosIdError.classList.remove('active');
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            if (passwordInput.value) {
                passwordInput.classList.remove('has-error');
                if (passwordError) passwordError.classList.remove('active');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            clearErrors();

            const piosIdVal = piosIdInput ? piosIdInput.value.trim() : '';
            const passwordVal = passwordInput ? passwordInput.value : '';
            let hasError = false;

            if (!piosIdVal) {
                if (piosIdInput) piosIdInput.classList.add('has-error');
                if (piosIdError) piosIdError.classList.add('active');
                hasError = true;
            }

            if (!passwordVal) {
                if (passwordInput) passwordInput.classList.add('has-error');
                if (passwordError) passwordError.classList.add('active');
                hasError = true;
            }

            if (hasError) return;

            // Simulate loading state
            if (loginSubmitBtn) {
                loginSubmitBtn.classList.add('loading');
                loginSubmitBtn.disabled = true;
            }

            setTimeout(() => {
                if (loginSubmitBtn) {
                    loginSubmitBtn.classList.remove('loading');
                    loginSubmitBtn.disabled = false;
                }

                if (loginFeedback) {
                    loginFeedback.textContent = `Welcome back, ${piosIdVal}! Redirecting to Dashboard...`;
                    loginFeedback.className = 'login-feedback success';
                    loginFeedback.style.display = 'block';
                }

                setTimeout(() => {
                    window.location.href = './dashboard.html';
                }, 800);
            }, 1000);
        });
    }

    // --- 4. Dark Mode Toggle Interaction ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    function setIndexDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode-active');
            if (darkModeToggle) darkModeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-mode-active');
            if (darkModeToggle) darkModeToggle.checked = false;
        }
        try {
            localStorage.setItem('pios_theme', isDark ? 'dark' : 'light');
        } catch (err) {}
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', (e) => {
            setIndexDarkMode(e.target.checked);
        });
    }

    try {
        const savedTheme = localStorage.getItem('pios_theme');
        if (savedTheme === 'dark') {
            setIndexDarkMode(true);
        }
    } catch (err) {}
});
