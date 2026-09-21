/**
 * PIOS BizGrowth Engine | Dashboard Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Fullscreen Menu Toggle (Figma 3.0_nav_dashboard) ---
    const mobileMenuToggleBtn = document.getElementById('mobileMenuToggleBtn');
    const fullscreenMenu = document.getElementById('fullscreenMenu');
    const fsMenuCloseBtn = document.getElementById('fsMenuCloseBtn');

    function openFullscreenMenu() {
        if (fullscreenMenu) {
            fullscreenMenu.classList.add('active');
            fullscreenMenu.setAttribute('aria-hidden', 'false');
            if (mobileMenuToggleBtn) mobileMenuToggleBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeFullscreenMenu() {
        if (fullscreenMenu) {
            fullscreenMenu.classList.remove('active');
            fullscreenMenu.setAttribute('aria-hidden', 'true');
            if (mobileMenuToggleBtn) mobileMenuToggleBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuToggleBtn) {
        mobileMenuToggleBtn.addEventListener('click', () => {
            if (fullscreenMenu && fullscreenMenu.classList.contains('active')) {
                closeFullscreenMenu();
            } else {
                openFullscreenMenu();
            }
        });
    }

    if (fsMenuCloseBtn) {
        fsMenuCloseBtn.addEventListener('click', closeFullscreenMenu);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullscreenMenu && fullscreenMenu.classList.contains('active')) {
            closeFullscreenMenu();
        }
    });

    // --- 2. Dark / Light Mode Switch Toggle ---
    const fsDarkModeToggle = document.getElementById('fsDarkModeToggle');
    const desktopThemeToggleBtn = document.getElementById('desktopThemeToggleBtn');

    function setDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode-active');
            if (fsDarkModeToggle) fsDarkModeToggle.checked = true;
        } else {
            document.body.classList.remove('dark-mode-active');
            if (fsDarkModeToggle) fsDarkModeToggle.checked = false;
        }
        try {
            localStorage.setItem('pios_theme', isDark ? 'dark' : 'light');
        } catch (err) {
            // Local storage fallback
        }
    }

    if (fsDarkModeToggle) {
        fsDarkModeToggle.addEventListener('change', (e) => {
            setDarkMode(e.target.checked);
        });
    }

    if (desktopThemeToggleBtn) {
        desktopThemeToggleBtn.addEventListener('click', () => {
            const isCurrentlyDark = document.body.classList.contains('dark-mode-active');
            setDarkMode(!isCurrentlyDark);
        });
    }

    // Load stored preference if set
    try {
        const savedTheme = localStorage.getItem('pios_theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
        }
    } catch (err) {}

    // --- 3. Dynamic Date in Desktop Topbar ---
    const dateElement = document.querySelector('.topbar-date');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }

    // --- 4. Notification Bell Interaction ---
    const notifBtn = document.querySelector('.notif-bell-btn');
    if (notifBtn) {
        notifBtn.addEventListener('click', () => {
            alert('Notifications: 3 new system updates and 1 pending invoice approval.');
        });
    }
});
