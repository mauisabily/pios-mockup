/**
 * PIOS BizGrowth Engine | Reports Interactive Script (reports.js)
 * Supports Mobile Menu Toggle, Theme Toggle (Sync with localStorage & Section 8 Standard),
 * Dynamic Date, and Interactive Chart Data Exploration.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Theme Toggle (Sync with localStorage across all pages & Section 8 Standard)
       ========================================================================== */
    const desktopThemeToggleBtn = document.getElementById('desktopThemeToggleBtn');
    const fsDarkModeToggle = document.getElementById('fsDarkModeToggle');

    function applyTheme(theme) {
        const isDark = (theme === 'dark');
        if (isDark) {
            document.body.classList.add('dark-mode-active');
            if (fsDarkModeToggle) fsDarkModeToggle.checked = true;
            if (desktopThemeToggleBtn) {
                desktopThemeToggleBtn.setAttribute('title', 'Switch to Light Mode');
                desktopThemeToggleBtn.setAttribute('aria-label', 'Switch to Light Mode');
            }
        } else {
            document.body.classList.remove('dark-mode-active');
            if (fsDarkModeToggle) fsDarkModeToggle.checked = false;
            if (desktopThemeToggleBtn) {
                desktopThemeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
                desktopThemeToggleBtn.setAttribute('aria-label', 'Switch to Dark Mode');
            }
        }
    }

    // Initialize from storage or default
    try {
        const savedTheme = localStorage.getItem('pios_theme');
        if (savedTheme) {
            applyTheme(savedTheme);
        }
    } catch (e) {}

    function toggleTheme() {
        const isDark = document.body.classList.contains('dark-mode-active');
        const newTheme = isDark ? 'light' : 'dark';
        applyTheme(newTheme);
        try {
            localStorage.setItem('pios_theme', newTheme);
        } catch (e) {}
    }

    if (desktopThemeToggleBtn) {
        desktopThemeToggleBtn.addEventListener('click', toggleTheme);
    }
    if (fsDarkModeToggle) {
        fsDarkModeToggle.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'dark' : 'light';
            applyTheme(newTheme);
            try {
                localStorage.setItem('pios_theme', newTheme);
            } catch (err) {}
        });
    }


    /* ==========================================================================
       2. Fullscreen Mobile Navigation Menu
       ========================================================================== */
    const mobileMenuToggleBtn = document.getElementById('mobileMenuToggleBtn');
    const fsMenuCloseBtn = document.getElementById('fsMenuCloseBtn');
    const fullscreenMenu = document.getElementById('fullscreenMenu');

    if (mobileMenuToggleBtn && fullscreenMenu) {
        mobileMenuToggleBtn.addEventListener('click', () => {
            fullscreenMenu.classList.add('open');
            fullscreenMenu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    }

    if (fsMenuCloseBtn && fullscreenMenu) {
        fsMenuCloseBtn.addEventListener('click', () => {
            fullscreenMenu.classList.remove('open');
            fullscreenMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    }


    /* ==========================================================================
       3. Dynamic Date in Desktop Topbar
       ========================================================================== */
    const dateElements = document.querySelectorAll('.topbar-date');
    if (dateElements.length > 0) {
        const today = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = today.toLocaleDateString('en-US', options);
        dateElements.forEach(el => el.textContent = formattedDate);
    }


    /* ==========================================================================
       4. Interactive Bar Chart Exploration (Hover / Click Tooltip)
       ========================================================================== */
    const chartCols = document.querySelectorAll('.chart-col');
    const ctdMonth = document.getElementById('ctdMonth');
    const ctdVal = document.getElementById('ctdVal');
    const ctdOrders = document.getElementById('ctdOrders');

    chartCols.forEach(col => {
        function activateColumn() {
            chartCols.forEach(c => {
                c.classList.remove('active');
                const bar = c.querySelector('.chart-bar');
                if (bar) bar.classList.remove('active-bar');
            });

            col.classList.add('active');
            const bar = col.querySelector('.chart-bar');
            if (bar) bar.classList.add('active-bar');

            const month = col.getAttribute('data-month');
            const val = col.getAttribute('data-val');
            const orders = col.getAttribute('data-orders');

            if (ctdMonth) ctdMonth.textContent = month;
            if (ctdVal) ctdVal.textContent = val;
            if (ctdOrders) ctdOrders.textContent = `(${orders} orders)`;
        }

        col.addEventListener('mouseenter', activateColumn);
        col.addEventListener('click', activateColumn);
    });

});
