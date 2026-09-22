/**
 * PIOS BizGrowth Engine | Customer Management Logic (customer.js)
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

    // --- 2. Dark / Light Mode Switcher with Persistence ---
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
        if (desktopThemeToggleBtn) {
            desktopThemeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
            desktopThemeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        }
        try {
            localStorage.setItem('pios_theme', isDark ? 'dark' : 'light');
        } catch (e) {}
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

    // Load stored theme
    try {
        const savedTheme = localStorage.getItem('pios_theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
        }
    } catch (e) {}

    // --- 3. Synchronized Live Search Filtering & Pagination (Max 10 per page) ---
    const PAGE_SIZE = 10;
    let currentPage = 1;
    let activeFilterQuery = '';

    const desktopSearchInput = document.getElementById('desktopSearchInput');
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    const desktopTableCount = document.getElementById('desktopTableCount');
    const tablePaginationControls = document.getElementById('tablePaginationControls');
    const mobileTableCount = document.getElementById('mobileTableCount');
    const mobilePaginationControls = document.getElementById('mobilePaginationControls');

    function getMatchingRows(query) {
        const q = (query || '').toLowerCase().trim();
        const allRows = Array.from(document.querySelectorAll('#customerTableBody tr'));
        if (!q) return allRows;

        return allRows.filter(row => {
            const name = (row.getAttribute('data-name') || '').toLowerCase();
            const phone = (row.getAttribute('data-phone') || '').toLowerCase();
            const email = (row.getAttribute('data-email') || '').toLowerCase();
            const status = (row.getAttribute('data-status') || '').toLowerCase();
            return name.includes(q) || phone.includes(q) || email.includes(q) || status.includes(q);
        });
    }

    function getMatchingCards(query) {
        const q = (query || '').toLowerCase().trim();
        const allCards = Array.from(document.querySelectorAll('.mobile-cust-card'));
        if (!q) return allCards;

        return allCards.filter(card => {
            const name = (card.getAttribute('data-name') || '').toLowerCase();
            const phone = (card.getAttribute('data-phone') || '').toLowerCase();
            const email = (card.getAttribute('data-email') || '').toLowerCase();
            const status = (card.getAttribute('data-status') || '').toLowerCase();
            return name.includes(q) || phone.includes(q) || email.includes(q) || status.includes(q);
        });
    }

    function renderPagination() {
        const matchedRows = getMatchingRows(activeFilterQuery);
        const matchedCards = getMatchingCards(activeFilterQuery);

        const totalItems = matchedRows.length;
        const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        const startIdx = (currentPage - 1) * PAGE_SIZE;
        const endIdx = Math.min(startIdx + PAGE_SIZE, totalItems);

        // Hide all rows, display current page slice
        const allRows = document.querySelectorAll('#customerTableBody tr');
        allRows.forEach(row => row.style.display = 'none');

        for (let i = startIdx; i < endIdx; i++) {
            if (matchedRows[i]) {
                matchedRows[i].style.display = '';
            }
        }

        // Hide all cards, display current page slice
        const allCards = document.querySelectorAll('.mobile-cust-card');
        allCards.forEach(card => card.style.display = 'none');

        for (let i = startIdx; i < endIdx; i++) {
            if (matchedCards[i]) {
                matchedCards[i].style.display = 'flex';
            }
        }

        // Update Desktop Counter Info
        if (desktopTableCount) {
            if (totalItems === 0) {
                desktopTableCount.textContent = 'Showing 0 of 0 customers';
            } else {
                desktopTableCount.textContent = `Showing ${startIdx + 1} to ${endIdx} of ${totalItems} customers`;
            }
        }

        // Update Mobile Counter Info
        if (mobileTableCount) {
            if (totalItems === 0) {
                mobileTableCount.textContent = 'Showing 0 of 0 customers';
            } else {
                mobileTableCount.textContent = `Showing ${startIdx + 1} to ${endIdx} of ${totalItems} customers`;
            }
        }

        // Render Pagination Button Controls
        renderControls(tablePaginationControls, totalPages);
        renderControls(mobilePaginationControls, totalPages);
    }

    function renderControls(container, totalPages) {
        if (!container) return;
        container.innerHTML = '';

        if (totalPages <= 1) return;

        // Prev Button
        const prevBtn = document.createElement('button');
        prevBtn.type = 'button';
        prevBtn.className = 'pagination-btn';
        prevBtn.innerHTML = `&lsaquo; Prev`;
        prevBtn.disabled = (currentPage === 1);
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderPagination();
            }
        });
        container.appendChild(prevBtn);

        // Page Number Buttons
        for (let p = 1; p <= totalPages; p++) {
            const pageBtn = document.createElement('button');
            pageBtn.type = 'button';
            pageBtn.className = `pagination-btn ${p === currentPage ? 'active' : ''}`;
            pageBtn.textContent = p;
            pageBtn.addEventListener('click', () => {
                currentPage = p;
                renderPagination();
            });
            container.appendChild(pageBtn);
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'pagination-btn';
        nextBtn.innerHTML = `Next &rsaquo;`;
        nextBtn.disabled = (currentPage === totalPages);
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderPagination();
            }
        });
        container.appendChild(nextBtn);
    }

    function performSearch(query) {
        activeFilterQuery = query;
        currentPage = 1;
        renderPagination();
    }

    if (desktopSearchInput) {
        desktopSearchInput.addEventListener('input', (e) => {
            if (mobileSearchInput) mobileSearchInput.value = e.target.value;
            performSearch(e.target.value);
        });
    }

    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
            if (desktopSearchInput) desktopSearchInput.value = e.target.value;
            performSearch(e.target.value);
        });
    }

    // Initial render of pagination (showing first 10)
    renderPagination();

    // --- 4. Modals (Add Customer & View Details) ---
    const addCustomerModal = document.getElementById('addCustomerModal');
    const btnAddCustomer = document.getElementById('btnAddCustomer');
    const closeAddModalBtn = document.getElementById('closeAddModalBtn');
    const cancelAddModalBtn = document.getElementById('cancelAddModalBtn');
    const addCustomerForm = document.getElementById('addCustomerForm');
    const mobileRegisterCustomerBtn = document.getElementById('mobileRegisterCustomerBtn');

    function openAddModal() {
        if (addCustomerModal) {
            addCustomerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeAddModal() {
        if (addCustomerModal) {
            addCustomerModal.classList.remove('active');
            document.body.style.overflow = '';
            if (addCustomerForm) addCustomerForm.reset();
        }
    }

    const mobileBtnAddCustomer = document.getElementById('mobileBtnAddCustomer');
    const mobileRegBackBtn = document.getElementById('mobileRegBackBtn');
    const mobileRegMenuBtn = document.getElementById('mobileRegMenuBtn');
    const desktopRegisterCustomerBtn = document.getElementById('desktopRegisterCustomerBtn');

    if (btnAddCustomer) btnAddCustomer.addEventListener('click', openAddModal);
    if (mobileBtnAddCustomer) mobileBtnAddCustomer.addEventListener('click', openAddModal);
    if (desktopRegisterCustomerBtn) {
        desktopRegisterCustomerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openAddModal();
        });
    }
    if (closeAddModalBtn) closeAddModalBtn.addEventListener('click', closeAddModal);
    if (cancelAddModalBtn) cancelAddModalBtn.addEventListener('click', closeAddModal);
    if (mobileRegBackBtn) mobileRegBackBtn.addEventListener('click', closeAddModal);
    if (mobileRegMenuBtn) mobileRegMenuBtn.addEventListener('click', openFullscreenMenu);

    if (mobileRegisterCustomerBtn) {
        mobileRegisterCustomerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeFullscreenMenu();
            openAddModal();
        });
    }

    // Auto-open Register Customer modal if URL contains #register
    if (window.location.hash === '#register' || window.location.hash === '#register-customer' || window.location.search.includes('register')) {
        setTimeout(openAddModal, 80);
    }
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#register' || window.location.hash === '#register-customer') {
            openAddModal();
        }
    });

    if (addCustomerForm) {
        addCustomerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = (document.getElementById('regCustName')?.value || '').trim();
            const contactPerson = (document.getElementById('regContactPerson')?.value || '').trim();
            const email = (document.getElementById('regEmail')?.value || '').trim();
            const phone = (document.getElementById('regPhone')?.value || '').trim();
            const addr1 = (document.getElementById('regAddress1')?.value || '').trim();
            const addr2 = (document.getElementById('regAddress2')?.value || '').trim();
            const addr3 = (document.getElementById('regAddress3')?.value || '').trim();
            const postcode = (document.getElementById('regPostcode')?.value || '').trim();
            const city = (document.getElementById('regCity')?.value || '').trim();
            const state = (document.getElementById('regState')?.value || '').trim();

            if (!name) return;

            const status = 'New';
            const fullAddress = [addr1, addr2, addr3, postcode, city, state].filter(Boolean).join(', ');

            // Generate initials
            const parts = name.split(' ');
            const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();

            // Append to desktop table
            const tbody = document.getElementById('customerTableBody');
            if (tbody) {
                const tr = document.createElement('tr');
                tr.setAttribute('data-name', name);
                tr.setAttribute('data-phone', phone);
                tr.setAttribute('data-email', email);
                tr.setAttribute('data-status', status);
                tr.setAttribute('data-contact', contactPerson);
                tr.setAttribute('data-address', fullAddress);

                tr.innerHTML = `
                    <td>
                        <div class="customer-name-cell">
                            <div class="cust-avatar avatar-cust">${initials}</div>
                            <div class="customer-details">
                                <span class="customer-primary-name">${name}</span>
                                <span class="followup-subtext followup-scheduled">Contact: ${contactPerson || 'Direct'}</span>
                            </div>
                        </div>
                    </td>
                    <td>${phone}</td>
                    <td>${email}</td>
                    <td><span class="status-pill customer">${status}</span></td>
                    <td>
                        <div class="action-buttons-group">
                            <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" target="_blank" class="btn-action-wa" title="WhatsApp">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                                </svg>
                                <span>WA</span>
                            </a>
                            <a href="tel:${phone}" class="btn-action-call" title="Call">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                </svg>
                                <span>Call</span>
                            </a>
                            <button class="btn-action-view" onclick="openViewModal('${name.replace(/'/g, "\\'")}', '${phone.replace(/'/g, "\\'")}', '${email.replace(/'/g, "\\'")}', '${status}', '${contactPerson.replace(/'/g, "\\'")}', '${fullAddress.replace(/'/g, "\\'")}')">View</button>
                            <button class="btn-action-more">•••</button>
                        </div>
                    </td>
                `;
                tbody.insertBefore(tr, tbody.firstChild);
            }

            // Append to mobile list
            const mobileList = document.getElementById('mobileCustomerList');
            if (mobileList) {
                const card = document.createElement('div');
                card.className = 'mobile-cust-card';
                card.setAttribute('data-name', name);
                card.setAttribute('data-phone', phone);
                card.setAttribute('data-email', email);
                card.setAttribute('data-status', status);

                card.innerHTML = `
                    <div class="mobile-card-top">
                        <div class="mobile-user-profile">
                            <div class="mobile-avatar avatar-cust">${initials}</div>
                            <div class="mobile-user-text">
                                <div class="mobile-cust-name">${name}</div>
                                <div class="mobile-cust-phone">${phone}</div>
                            </div>
                        </div>
                        <span class="status-pill customer">${status}</span>
                    </div>
                    <div class="mobile-cust-email">${email}</div>
                    <div class="mobile-actions-grid">
                        <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" target="_blank" class="mobile-btn mobile-btn-wa">Whatsapp</a>
                        <a href="tel:${phone}" class="mobile-btn mobile-btn-call">Call</a>
                        <button class="mobile-btn mobile-btn-view" onclick="openViewModal('${name.replace(/'/g, "\\'")}', '${phone.replace(/'/g, "\\'")}', '${email.replace(/'/g, "\\'")}', '${status}', '${contactPerson.replace(/'/g, "\\'")}', '${fullAddress.replace(/'/g, "\\'")}')">View</button>
                    </div>
                `;
                mobileList.insertBefore(card, mobileList.firstChild);
            }

            // Re-render pagination with new customer on page 1
            currentPage = 1;
            renderPagination();

            // Show Toast Notification
            showToastNotification(`Customer "${name}" has been registered successfully!`);
            closeAddModal();
        });
    }

    // Keyboard ESC listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeFullscreenMenu();
            closeAddModal();
            closeViewModal();
        }
    });

    // Dynamic Topbar Date
    const dateElement = document.querySelector('.topbar-date');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
});

// --- View Customer Modal Global Function ---
function openViewModal(name, phone, email, status, contactPerson = '', address = '') {
    const modal = document.getElementById('viewCustomerModal');
    if (!modal) return;

    const nameElem = document.getElementById('viewModalName');
    const phoneElem = document.getElementById('viewModalPhone');
    const emailElem = document.getElementById('viewModalEmail');
    const badgeElem = document.getElementById('viewModalStatusBadge');
    const avatarElem = document.getElementById('viewModalAvatar');

    if (nameElem) nameElem.textContent = name;
    if (phoneElem) phoneElem.textContent = phone;
    if (emailElem) emailElem.textContent = email;

    if (badgeElem) {
        badgeElem.textContent = status;
        badgeElem.className = `status-pill ${(status || 'customer').toLowerCase()}`;
    }

    if (avatarElem) {
        const parts = name.split(' ');
        const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();
        avatarElem.textContent = initials;
        const badgeClass = (status || 'customer').toLowerCase();
        avatarElem.className = `cust-avatar avatar-${badgeClass === 'customer' ? 'cust' : badgeClass}`;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const closeBtn = document.getElementById('closeViewModalBtn');
    const closeBtn2 = document.getElementById('closeViewModalBtn2');

    if (closeBtn) closeBtn.onclick = closeViewModal;
    if (closeBtn2) closeBtn2.onclick = closeViewModal;
}

function closeViewModal() {
    const modal = document.getElementById('viewCustomerModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// --- Toast Notification Utility ---
function showToastNotification(message) {
    let toast = document.getElementById('custToastNotification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'custToastNotification';
        toast.style.cssText = `
            position: fixed;
            bottom: 28px;
            right: 28px;
            background: #009688;
            color: #FFFFFF;
            padding: 14px 22px;
            border-radius: 12px;
            font-family: var(--font-sans, sans-serif);
            font-size: 0.92rem;
            font-weight: 600;
            box-shadow: 0 10px 25px rgba(0, 150, 136, 0.4);
            z-index: 999999;
            display: flex;
            align-items: center;
            gap: 10px;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
        `;
        document.body.appendChild(toast);
    }

    toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${message}</span>
    `;

    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
    }, 3500);
}

