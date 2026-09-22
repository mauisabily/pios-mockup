/**
 * PIOS BizGrowth Engine - Business Transactions Script
 * Handles real-time search, status filtering, transaction flow filtering,
 * modal details popup, mobile menu, and Dark/Light mode theme switching.
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const searchInput = document.getElementById('txSearchInput');
    const paymentFilterSelect = document.getElementById('paymentFilterSelect');
    const tableBody = document.getElementById('transactionTableBody');
    const tableRows = tableBody ? tableBody.querySelectorAll('.tx-row') : [];
    const mobileList = document.getElementById('txMobileList');
    const mobileCards = mobileList ? mobileList.querySelectorAll('.tx-card') : [];
    const txCountText = document.getElementById('txCountText');
    const flowSteps = document.querySelectorAll('.tx-flow-step');

    // Modal Elements
    const txModal = document.getElementById('txModal');
    const closeTxModalBtn = document.getElementById('closeTxModalBtn');
    const cancelTxModalBtn = document.getElementById('cancelTxModalBtn');
    const printReceiptBtn = document.getElementById('printReceiptBtn');
    const modalOrderNo = document.getElementById('modalOrderNo');
    const modalStatusBadge = document.getElementById('modalStatusBadge');
    const modalCustomerName = document.getElementById('modalCustomerName');
    const modalProductName = document.getElementById('modalProductName');
    const modalOrderDate = document.getElementById('modalOrderDate');
    const modalTotalAmount = document.getElementById('modalTotalAmount');
    const modalPaymentStatus = document.getElementById('modalPaymentStatus');

    // Toast
    const toastNotification = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');

    // Mobile Menu
    const mobileMenuToggleBtn = document.getElementById('mobileMenuToggleBtn');
    const fsMenuCloseBtn = document.getElementById('fsMenuCloseBtn');
    const fullscreenMenu = document.getElementById('fullscreenMenu');
    const fsDarkModeToggle = document.getElementById('fsDarkModeToggle');
    const desktopThemeToggleBtn = document.getElementById('desktopThemeToggleBtn');

    // State
    let currentSearchQuery = '';
    let currentStatusFilter = 'all';

    // --- Helper: Toast ---
    function showToast(msg) {
        if (!toastNotification) return;
        toastMessage.textContent = msg;
        toastNotification.classList.add('show');
        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 2800);
    }

    // --- 1. Filtering Functionality ---
    function applyFilters() {
        let visibleCount = 0;

        // Filter desktop table rows
        tableRows.forEach(row => {
            const order = (row.getAttribute('data-order') || '').toLowerCase();
            const customer = (row.getAttribute('data-customer') || '').toLowerCase();
            const product = (row.getAttribute('data-product') || '').toLowerCase();
            const status = row.getAttribute('data-status') || '';

            const matchesSearch = !currentSearchQuery || 
                order.includes(currentSearchQuery) || 
                customer.includes(currentSearchQuery) || 
                product.includes(currentSearchQuery);

            const matchesStatus = currentStatusFilter === 'all' || 
                status.toLowerCase() === currentStatusFilter.toLowerCase();

            if (matchesSearch && matchesStatus) {
                row.style.display = '';
                visibleCount++;
            } else {
                row.style.display = 'none';
            }
        });

        // Filter mobile cards
        mobileCards.forEach(card => {
            const order = (card.getAttribute('data-order') || '').toLowerCase();
            const customer = (card.getAttribute('data-customer') || '').toLowerCase();
            const product = (card.getAttribute('data-product') || '').toLowerCase();
            const status = card.getAttribute('data-status') || '';

            const matchesSearch = !currentSearchQuery || 
                order.includes(currentSearchQuery) || 
                customer.includes(currentSearchQuery) || 
                product.includes(currentSearchQuery);

            const matchesStatus = currentStatusFilter === 'all' || 
                status.toLowerCase() === currentStatusFilter.toLowerCase();

            if (matchesSearch && matchesStatus) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });

        // Update count text
        if (txCountText) {
            txCountText.textContent = `Showing ${visibleCount} of ${tableRows.length} transactions`;
        }
    }

    // Search Input Event
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value.toLowerCase().trim();
            applyFilters();
        });
    }

    // Dropdown Select Event
    if (paymentFilterSelect) {
        paymentFilterSelect.addEventListener('change', (e) => {
            currentStatusFilter = e.target.value;
            // Update active state in flow steps if applicable
            flowSteps.forEach(s => {
                if (s.getAttribute('data-status').toLowerCase() === currentStatusFilter.toLowerCase()) {
                    s.classList.add('active-filter');
                } else {
                    s.classList.remove('active-filter');
                }
            });
            applyFilters();
        });
    }

    // Flow Step Click Event
    flowSteps.forEach(step => {
        step.addEventListener('click', () => {
            const stepStatus = step.getAttribute('data-status');
            
            if (currentStatusFilter.toLowerCase() === stepStatus.toLowerCase()) {
                // Deselect
                currentStatusFilter = 'all';
                step.classList.remove('active-filter');
                if (paymentFilterSelect) paymentFilterSelect.value = 'all';
            } else {
                // Select
                flowSteps.forEach(s => s.classList.remove('active-filter'));
                step.classList.add('active-filter');
                currentStatusFilter = stepStatus;
                if (paymentFilterSelect) paymentFilterSelect.value = stepStatus;
            }
            applyFilters();
        });
    });

    // --- 2. Modal View Details ---
    function openTxModal(data) {
        if (!txModal) return;

        if (modalOrderNo) modalOrderNo.textContent = data.order;
        if (modalCustomerName) modalCustomerName.textContent = data.customer;
        if (modalProductName) modalProductName.textContent = data.product;
        if (modalOrderDate) modalOrderDate.textContent = data.date;
        if (modalTotalAmount) modalTotalAmount.textContent = `RM ${Number(data.amount).toLocaleString('en-US')}.00`;
        
        if (modalStatusBadge) {
            modalStatusBadge.textContent = data.status;
            modalStatusBadge.className = `badge-status badge-${data.status.toLowerCase()}`;
        }

        if (modalPaymentStatus) {
            if (data.status === 'Complete') {
                modalPaymentStatus.textContent = 'Settled via Online Banking';
            } else if (data.status === 'Payment') {
                modalPaymentStatus.textContent = 'Awaiting payment confirmation';
            } else if (data.status === 'Delivery') {
                modalPaymentStatus.textContent = 'Order in transit to customer';
            } else if (data.status === 'Invoice') {
                modalPaymentStatus.textContent = 'Invoice issued to client';
            } else {
                modalPaymentStatus.textContent = `Status: ${data.status}`;
            }
        }

        txModal.classList.add('active');
        txModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeTxModal() {
        if (!txModal) return;
        txModal.classList.remove('active');
        txModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Attach click to Desktop "View" buttons
    tableRows.forEach(row => {
        const viewBtn = row.querySelector('.btn-tx-view');
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openTxModal({
                    order: row.getAttribute('data-order'),
                    customer: row.getAttribute('data-customer'),
                    product: row.getAttribute('data-product'),
                    status: row.getAttribute('data-status'),
                    amount: row.getAttribute('data-amount'),
                    date: row.getAttribute('data-date')
                });
            });
        }
    });

    // Attach click to Mobile Cards
    mobileCards.forEach(card => {
        card.addEventListener('click', () => {
            openTxModal({
                order: card.getAttribute('data-order'),
                customer: card.getAttribute('data-customer'),
                product: card.getAttribute('data-product'),
                status: card.getAttribute('data-status'),
                amount: card.getAttribute('data-amount'),
                date: card.getAttribute('data-date')
            });
        });
    });

    if (closeTxModalBtn) closeTxModalBtn.addEventListener('click', closeTxModal);
    if (cancelTxModalBtn) cancelTxModalBtn.addEventListener('click', closeTxModal);
    if (txModal) {
        txModal.addEventListener('click', (e) => {
            if (e.target === txModal) closeTxModal();
        });
    }

    // Print Receipt Simulation
    if (printReceiptBtn) {
        printReceiptBtn.addEventListener('click', () => {
            closeTxModal();
            showToast('Receipt generated and ready for print!');
        });
    }

    // --- 3. Fullscreen Mobile Navigation ---
    function openMobileMenu() {
        if (fullscreenMenu) {
            fullscreenMenu.classList.add('open');
            fullscreenMenu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeMobileMenu() {
        if (fullscreenMenu) {
            fullscreenMenu.classList.remove('open');
            fullscreenMenu.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuToggleBtn) mobileMenuToggleBtn.addEventListener('click', openMobileMenu);
    if (fsMenuCloseBtn) fsMenuCloseBtn.addEventListener('click', closeMobileMenu);

    // --- 4. Dark / Light Mode Toggle with LocalStorage ---
    function applyTheme(isDark) {
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

    // Read stored preference
    const savedTheme = localStorage.getItem('pios_theme');
    if (savedTheme === 'dark') {
        applyTheme(true);
    }

    if (desktopThemeToggleBtn) {
        desktopThemeToggleBtn.addEventListener('click', () => {
            const isDarkNow = document.body.classList.contains('dark-mode-active');
            const newTheme = !isDarkNow;
            applyTheme(newTheme);
            localStorage.setItem('pios_theme', newTheme ? 'dark' : 'light');
        });
    }

    if (fsDarkModeToggle) {
        fsDarkModeToggle.addEventListener('change', (e) => {
            const newTheme = e.target.checked;
            applyTheme(newTheme);
            localStorage.setItem('pios_theme', newTheme ? 'dark' : 'light');
        });
    }

    // --- 5. Dynamic Date Sync ---
    const dateElements = document.querySelectorAll('.topbar-date');
    if (dateElements.length > 0) {
        const today = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        const formattedDate = today.toLocaleDateString('en-US', options);
        dateElements.forEach(el => el.textContent = formattedDate);
    }
});
