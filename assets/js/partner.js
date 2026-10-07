/**
 * PIOS BizGrowth Engine | Partner Dashboard Interaction Logic (partner.js)
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Mobile Fullscreen Menu Toggle ---
    const mobileMenuToggleBtn = document.getElementById('mobileMenuToggleBtn');
    const fullscreenMenu = document.getElementById('fullscreenMenu');
    const fsMenuCloseBtn = document.getElementById('fsMenuCloseBtn');

    function openFullscreenMenu() {
        if (fullscreenMenu) {
            fullscreenMenu.classList.add('active');
            fullscreenMenu.classList.add('open');
            fullscreenMenu.setAttribute('aria-hidden', 'false');
            if (mobileMenuToggleBtn) mobileMenuToggleBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeFullscreenMenu() {
        if (fullscreenMenu) {
            fullscreenMenu.classList.remove('active');
            fullscreenMenu.classList.remove('open');
            fullscreenMenu.setAttribute('aria-hidden', 'true');
            if (mobileMenuToggleBtn) mobileMenuToggleBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    if (mobileMenuToggleBtn) {
        mobileMenuToggleBtn.addEventListener('click', () => {
            if (fullscreenMenu && (fullscreenMenu.classList.contains('active') || fullscreenMenu.classList.contains('open'))) {
                closeFullscreenMenu();
            } else {
                openFullscreenMenu();
            }
        });
    }

    if (fsMenuCloseBtn) {
        fsMenuCloseBtn.addEventListener('click', closeFullscreenMenu);
    }

    // Close when clicking navigation items
    const fsNavLinks = document.querySelectorAll('.fullscreen-menu .fs-nav-item');
    fsNavLinks.forEach(link => {
        link.addEventListener('click', closeFullscreenMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fullscreenMenu && (fullscreenMenu.classList.contains('active') || fullscreenMenu.classList.contains('open'))) {
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
        if (desktopThemeToggleBtn) {
            desktopThemeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
            desktopThemeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        }
        try {
            localStorage.setItem('pios_partner_theme', isDark ? 'dark' : 'light');
        } catch (err) {
            // Local storage fallback
        }
    }

    if (fsDarkModeToggle) {
        fsDarkModeToggle.addEventListener('change', (e) => {
            setDarkMode(e.target.checked);
        });
    }

    const fsDarkmodeLabel = document.querySelector('.fs-darkmode-label');
    if (fsDarkmodeLabel && fsDarkModeToggle) {
        fsDarkmodeLabel.addEventListener('click', () => {
            fsDarkModeToggle.checked = !fsDarkModeToggle.checked;
            setDarkMode(fsDarkModeToggle.checked);
        });
    }

    if (desktopThemeToggleBtn) {
        desktopThemeToggleBtn.addEventListener('click', () => {
            const isCurrentlyDark = document.body.classList.contains('dark-mode-active');
            setDarkMode(!isCurrentlyDark);
        });
    }

    // Load stored preference (default to dark for partner)
    try {
        const savedTheme = localStorage.getItem('pios_partner_theme');
        if (savedTheme === 'light') {
            setDarkMode(false);
        } else {
            setDarkMode(true);
        }
    } catch (err) {
        setDarkMode(true);
    }

    // --- 3. Dynamic Date in Header / Topbar ---
    const dateElem = document.getElementById('currentDateText');
    if (dateElem) {
        const now = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        dateElem.textContent = now.toLocaleDateString('en-US', options);
    }

    // --- 4. Notification Bell Interaction ---
    const notifBtns = document.querySelectorAll('.partner-notif-btn, .notif-bell-btn');
    notifBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Partner Notifications: 2 new business owner registrations and 1 pending fee report.');
        });
    });

    // --- 5. Business Owner Management Logic (Only on business-owner-management.html) ---
    const boTable = document.getElementById('businessOwnerTable');
    if (boTable) {
        // Initial Dataset
        let businessOwners = [
            { id: 'BO-001', name: 'Sarah Chen', email: 's.chen@chendigital.com', phone: '+60 12-345 6789', biz: 'Chen Digital Agency', vip: 12, customers: 142, revenue: 'RM 8,400', status: 'Active', joined: 'Aug 12, 2026' },
            { id: 'BO-002', name: 'Marcus Williams', email: 'm.williams@wcg.com', phone: '+60 19-876 5432', biz: 'Williams Consulting Group', vip: 9, customers: 89, revenue: 'RM 5,200', status: 'Active', joined: 'Aug 14, 2026' },
            { id: 'BO-003', name: 'Priya Nair', email: 'p.nair@nairassoc.com', phone: '+60 11-2345 6789', biz: 'Nair & Associates', vip: 5, customers: 67, revenue: 'RM 3,900', status: 'Active', joined: 'Aug 15, 2026' },
            { id: 'BO-004', name: 'James Oduya', email: 'j.oduya@oduyaent.com', phone: '+60 14-555 4321', biz: 'Oduya Enterprises', vip: 3, customers: 203, revenue: 'RM 12,100', status: 'Active', joined: 'Aug 16, 2026' },
            { id: 'BO-005', name: 'Linda Marchetti', email: 'l.marchetti@marchetti.com', phone: '+60 17-888 9900', biz: 'Marchetti & Sons', vip: 0, customers: 54, revenue: 'RM 2,800', status: 'Active', joined: 'Aug 16, 2026' },
            { id: 'BO-006', name: 'Kevin Torres', email: 'k.torres@torreslog.com', phone: '+60 13-444 3322', biz: 'Torres Logistics', vip: 7, customers: 38, revenue: 'RM 2,100', status: 'Overdue', joined: 'Aug 17, 2026' },
            { id: 'BO-007', name: 'Rachel Foster', email: 'r.foster@fostercreative.com', phone: '+60 16-777 8899', biz: 'Foster Creative LLC', vip: 8, customers: 91, revenue: 'RM 5,600', status: 'Active', joined: 'Aug 18, 2026' },
            { id: 'BO-008', name: 'David Osei', email: 'd.osei@oseifin.com', phone: '+60 18-999 0011', biz: 'Osei Financial Services', vip: 2, customers: 127, revenue: 'RM 7,800', status: 'Active', joined: 'Aug 19, 2026' },
            { id: 'BO-009', name: 'Amina Hassan', email: 'a.hassan@hassanglobal.com', phone: '+60 12-222 3344', biz: 'Hassan Global Trade', vip: 6, customers: 44, revenue: 'RM 2,600', status: 'Pending Setup', joined: 'Aug 20, 2026' },
            { id: 'BO-010', name: 'Tom Yuen', email: 't.yuen@yuentech.com', phone: '+60 17-333 4455', biz: 'Yuen Tech Partners', vip: 1, customers: 76, revenue: 'RM 4,700', status: 'Active', joined: 'Aug 21, 2026' }
        ];

        let currentFilter = 'all';
        let currentSearchQuery = '';

        const boTableBody = document.getElementById('boTableBody');
        const boMobileContainer = document.getElementById('boMobileListContainer');
        const boTableFooter = document.getElementById('boTableFooter');
        const boMobileFooter = document.getElementById('boMobileFooter');
        const searchInput = document.getElementById('boSearchInput');
        const filterPills = document.querySelectorAll('#boFilterPills .bo-pill');

        // Status pill helper
        function getStatusClass(status) {
            switch (status) {
                case 'Active': return 'status-active';
                case 'Overdue': return 'status-overdue';
                case 'Pending Setup': return 'status-pending';
                case 'Suspended': return 'status-suspended';
                default: return 'status-active';
            }
        }

        // Render Desktop Table
        function renderTable(data) {
            if (!boTableBody) return;
            boTableBody.innerHTML = '';

            if (data.length === 0) {
                boTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 36px; color: #64748B;">No business owners found matching your criteria.</td></tr>`;
                return;
            }

            data.forEach(item => {
                const tr = document.createElement('tr');
                tr.setAttribute('data-id', item.id);
                const vipDisplay = item.vip > 0 
                    ? `<span class="bo-vip-badge"><span class="star-icon">★</span> ${item.vip}</span>` 
                    : `<span class="bo-vip-none">—</span>`;

                tr.innerHTML = `
                    <td class="bo-col-id">${item.id}</td>
                    <td>
                        <div class="bo-owner-cell">
                            <span class="bo-owner-name">${item.name}</span>
                            <span class="bo-owner-email">${item.email}</span>
                        </div>
                    </td>
                    <td class="bo-business-name">${item.biz}</td>
                    <td>${vipDisplay}</td>
                    <td class="bo-customers-val">${item.customers}</td>
                    <td class="bo-rev-val">${item.revenue}</td>
                    <td>
                        <span class="bo-status-pill ${getStatusClass(item.status)}">${item.status}</span>
                    </td>
                    <td style="text-align: right;">
                        <button type="button" class="btn-view-bo" data-id="${item.id}">View</button>
                    </td>
                `;
                boTableBody.appendChild(tr);
            });

            // Bind view buttons
            boTableBody.querySelectorAll('.btn-view-bo').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = e.currentTarget.getAttribute('data-id');
                    openDetailModal(id);
                });
            });
        }

        // Render Mobile Cards (Matches Screenshot 2)
        function renderMobileList(data) {
            if (!boMobileContainer) return;
            boMobileContainer.innerHTML = '';

            if (data.length === 0) {
                boMobileContainer.innerHTML = `<div style="text-align:center; padding: 32px; color: #64748B;">No business owners found.</div>`;
                return;
            }

            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'bo-mobile-item';
                div.setAttribute('data-id', item.id);

                div.innerHTML = `
                    <div class="bo-m-row-top">
                        <span class="bo-m-id">${item.id}</span>
                        <span class="bo-m-rev">${item.revenue}</span>
                    </div>
                    <div class="bo-m-row-name">
                        <span class="bo-m-name">${item.name}</span>
                        <span class="bo-status-pill ${getStatusClass(item.status)}">${item.status}</span>
                    </div>
                    <div class="bo-m-biz">${item.biz}</div>
                    <div class="bo-m-details">
                        <span>${item.customers} customers</span>
                        <span>·</span>
                        <span class="m-vip">★ ${item.vip > 0 ? item.vip + ' VIP' : 'None'}</span>
                    </div>
                `;

                div.addEventListener('click', () => {
                    openDetailModal(item.id);
                });

                boMobileContainer.appendChild(div);
            });
        }

        // Update KPI Summary Metrics
        function updateKPIs() {
            const total = businessOwners.length;
            const active = businessOwners.filter(b => b.status === 'Active').length;
            const pending = businessOwners.filter(b => b.status === 'Pending Setup').length;
            const overdue = businessOwners.filter(b => b.status === 'Overdue' || b.status === 'Suspended').length;

            const elTotal = document.getElementById('kpiTotalBO');
            const elActive = document.getElementById('kpiActiveBO');
            const elPending = document.getElementById('kpiPendingBO');
            const elOverdue = document.getElementById('kpiOverdueBO');

            if (elTotal) elTotal.textContent = total;
            if (elActive) elActive.textContent = active;
            if (elPending) elPending.textContent = pending;
            if (elOverdue) elOverdue.textContent = overdue;
        }

        // Filter and Search Handler
        function applyFilterAndSearch() {
            let filtered = businessOwners.filter(item => {
                // Filter tab
                if (currentFilter !== 'all') {
                    if (currentFilter === 'active' && item.status !== 'Active') return false;
                    if (currentFilter === 'overdue' && item.status !== 'Overdue') return false;
                    if (currentFilter === 'pending' && item.status !== 'Pending Setup') return false;
                    if (currentFilter === 'suspended' && item.status !== 'Suspended') return false;
                }

                // Search query
                if (currentSearchQuery.trim()) {
                    const q = currentSearchQuery.toLowerCase().trim();
                    const matchName = item.name.toLowerCase().includes(q);
                    const matchEmail = item.email.toLowerCase().includes(q);
                    const matchBiz = item.biz.toLowerCase().includes(q);
                    const matchId = item.id.toLowerCase().includes(q);
                    const matchPhone = item.phone.toLowerCase().includes(q);
                    if (!matchName && !matchEmail && !matchBiz && !matchId && !matchPhone) {
                        return false;
                    }
                }

                return true;
            });

            renderTable(filtered);
            renderMobileList(filtered);

            const countText = `Showing ${filtered.length} of ${businessOwners.length} business owners`;
            if (boTableFooter) boTableFooter.textContent = countText;
            if (boMobileFooter) boMobileFooter.textContent = countText;
        }

        // Search Input Event
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearchQuery = e.target.value;
                applyFilterAndSearch();
            });
        }

        // Filter Pills Click Events
        filterPills.forEach(pill => {
            pill.addEventListener('click', () => {
                filterPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                currentFilter = pill.getAttribute('data-filter') || 'all';
                applyFilterAndSearch();
            });
        });

        // Detail Modal Logic
        const viewModal = document.getElementById('viewBODetailModal');
        const closeDetailBtn = document.getElementById('closeDetailModalBtn');
        const closeDetailActionBtn = document.getElementById('closeDetailActionBtn');

        function openDetailModal(id) {
            const item = businessOwners.find(b => b.id === id);
            if (!item || !viewModal) return;

            document.getElementById('viewModalOwnerName').textContent = item.name;
            document.getElementById('viewModalBOID').textContent = item.id;
            document.getElementById('viewDetailBizName').textContent = item.biz;
            document.getElementById('viewDetailEmail').textContent = item.email;
            document.getElementById('viewDetailPhone').textContent = item.phone;
            document.getElementById('viewDetailVIP').innerHTML = item.vip > 0 ? `<span style="color: #F59E0B;">★ ${item.vip}</span>` : '—';
            document.getElementById('viewDetailCustomers').textContent = item.customers;
            document.getElementById('viewDetailRevenue').textContent = item.revenue;
            
            const statusEl = document.getElementById('viewDetailStatus');
            if (statusEl) {
                statusEl.innerHTML = `<span class="bo-status-pill ${getStatusClass(item.status)}">${item.status}</span>`;
            }

            const waLink = document.getElementById('viewContactWABtn');
            if (waLink) {
                const cleanPhone = item.phone.replace(/[^0-9]/g, '');
                waLink.href = `https://wa.me/${cleanPhone}`;
            }

            viewModal.classList.add('active');
            viewModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeDetailModal() {
            if (viewModal) {
                viewModal.classList.remove('active');
                viewModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        }

        if (closeDetailBtn) closeDetailBtn.addEventListener('click', closeDetailModal);
        if (closeDetailActionBtn) closeDetailActionBtn.addEventListener('click', closeDetailModal);
        if (viewModal) {
            viewModal.addEventListener('click', (e) => {
                if (e.target === viewModal) closeDetailModal();
            });
        }

        // Register Modal Logic
        const regModal = document.getElementById('registerBOModal');
        const openRegBtn = document.getElementById('btnRegisterBO');
        const openRegFab = document.getElementById('mobileFabRegister');
        const closeRegBtn = document.getElementById('closeRegisterModalBtn');
        const cancelRegBtn = document.getElementById('cancelRegisterModalBtn');
        const regForm = document.getElementById('registerBOForm');

        function openRegisterModal() {
            if (regModal) {
                regModal.classList.add('active');
                regModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeRegisterModal() {
            if (regModal) {
                regModal.classList.remove('active');
                regModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                if (regForm) regForm.reset();
            }
        }

        if (openRegBtn) openRegBtn.addEventListener('click', openRegisterModal);
        if (openRegFab) openRegFab.addEventListener('click', openRegisterModal);
        if (closeRegBtn) closeRegBtn.addEventListener('click', closeRegisterModal);
        if (cancelRegBtn) cancelRegBtn.addEventListener('click', closeRegisterModal);
        if (regModal) {
            regModal.addEventListener('click', (e) => {
                if (e.target === regModal) closeRegisterModal();
            });
        }

        // Form Submit
        if (regForm) {
            regForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('regOwnerName').value.trim();
                const email = document.getElementById('regOwnerEmail').value.trim();
                const phone = document.getElementById('regOwnerPhone').value.trim() || '+60 12-000 0000';
                const biz = document.getElementById('regBizName').value.trim();
                const status = document.getElementById('regStatus').value;
                const vip = parseInt(document.getElementById('regVIPCount').value, 10) || 0;
                const customers = parseInt(document.getElementById('regCustCount').value, 10) || 0;
                const revNum = parseInt(document.getElementById('regRevMTD').value, 10) || 0;
                const revenue = `RM ${revNum.toLocaleString()}`;

                const nextNum = businessOwners.length + 1;
                const newId = `BO-${String(nextNum).padStart(3, '0')}`;

                const newBO = {
                    id: newId,
                    name,
                    email,
                    phone,
                    biz,
                    vip,
                    customers,
                    revenue,
                    status,
                    joined: 'Today'
                };

                businessOwners.unshift(newBO);
                updateKPIs();
                applyFilterAndSearch();
                closeRegisterModal();
                alert(`Successfully registered ${name} (${biz}) as ${newId}!`);
            });
        }

        // Close modals on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeDetailModal();
                closeRegisterModal();
            }
        });

        // Responsive search placeholder
        function updateSearchPlaceholder() {
            if (searchInput) {
                if (window.innerWidth < 992) {
                    searchInput.placeholder = 'Search...';
                } else {
                    searchInput.placeholder = 'Search partners by name or contact...';
                }
            }
        }
        window.addEventListener('resize', updateSearchPlaceholder);
        updateSearchPlaceholder();

        // Initialize display
        updateKPIs();
        applyFilterAndSearch();
    }

});

