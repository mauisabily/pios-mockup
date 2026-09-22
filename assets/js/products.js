/**
 * PIOS BizGrowth Engine - Products Management Script
 * Handles real-time search, Add/Edit modals, WhatsApp Blast modal, Share toast, and Mobile drawer
 * Matches Desktop 2-column modal and Mobile card sheet form design 1:1
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const searchInput = document.getElementById('productSearchInput');
    const productGrid = document.getElementById('productGrid');
    const cards = productGrid ? productGrid.querySelectorAll('.prod-card') : [];

    // Modals
    const productModal = document.getElementById('productModal');
    const productForm = document.getElementById('productForm');
    const productModalTitle = document.getElementById('productModalTitle');
    const mobileModalTitle = document.getElementById('mobileModalTitle');
    const openNewProductBtnDesktop = document.getElementById('openNewProductBtnDesktop');
    const openNewProductBtnMobile = document.getElementById('openNewProductBtnMobile');
    const closeProductModalBtn = document.getElementById('closeProductModalBtn');
    const cancelProductBtn = document.getElementById('cancelProductBtn');
    const mobileModalBackBtn = document.getElementById('mobileModalBackBtn');
    const saveProductBtn = document.getElementById('saveProductBtn');

    // Media Dropzone & File Input
    const mediaDropzone = document.getElementById('mediaDropzone');
    const browseTriggerBtn = document.getElementById('browseTriggerBtn');
    const prodFileInput = document.getElementById('prodFileInput');

    // Blast Modal
    const blastModal = document.getElementById('blastModal');
    const closeBlastModalBtn = document.getElementById('closeBlastModalBtn');
    const cancelBlastBtn = document.getElementById('cancelBlastBtn');
    const sendBlastBtn = document.getElementById('sendBlastBtn');
    const blastProductName = document.getElementById('blastProductName');
    const blastProductPrice = document.getElementById('blastProductPrice');

    // Toast
    const toastNotification = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');

    // Mobile Menu
    const mobileMenuToggleBtn = document.getElementById('mobileMenuToggleBtn');
    const fsMenuCloseBtn = document.getElementById('fsMenuCloseBtn');
    const fullscreenMenu = document.getElementById('fullscreenMenu');

    let currentEditingCard = null;

    // Helper: Toast
    function showToast(msg) {
        if (!toastNotification) return;
        toastMessage.textContent = msg;
        toastNotification.classList.add('show');
        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 2800);
    }

    // --- 1. Real-time Search Filtering ---
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const currentCards = productGrid.querySelectorAll('.prod-card');

            currentCards.forEach(card => {
                const name = (card.getAttribute('data-name') || '').toLowerCase();
                const category = (card.getAttribute('data-category') || '').toLowerCase();
                const price = (card.getAttribute('data-price') || '').toLowerCase();
                
                if (name.includes(query) || category.includes(query) || price.includes(query)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // --- 2. Add / Edit Product Modal ---
    function openProductModal(isEdit = false, cardData = null, cardElement = null) {
        if (!productModal) return;
        currentEditingCard = cardElement;

        const titleText = isEdit ? 'Edit Product' : 'Add Product';
        if (productModalTitle) productModalTitle.textContent = titleText;
        if (mobileModalTitle) mobileModalTitle.textContent = titleText;
        if (saveProductBtn) saveProductBtn.textContent = isEdit ? 'Save Changes' : 'Save Product';
        
        if (isEdit && cardData) {
            document.getElementById('prodNameInput').value = cardData.name || 'Beauty of Joseon Relief Sun SPF50+';
            document.getElementById('prodCategoryInput').value = cardData.category || 'Health Product';
            document.getElementById('prodPriceInput').value = cardData.price || '168.99';
            document.getElementById('prodStockInput').value = cardData.stock || '156';
            document.getElementById('prodStatusInput').value = cardData.status || 'Active';
            document.getElementById('prodDescInput').value = cardData.desc || 'Pelindung matahari organik yang mengandungi 30% ekstrak beras dan ekstrak probiotik bijirin untuk menenangkan kulit dan mencerahkan wajah.';
        } else {
            productForm.reset();
            document.getElementById('prodPriceInput').value = '';
            document.getElementById('prodStockInput').value = '';
            document.getElementById('prodNameInput').value = '';
            document.getElementById('prodDescInput').value = '';
            resetDropzone();
        }

        productModal.classList.add('active');
        productModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeProductModal() {
        if (!productModal) return;
        productModal.classList.remove('active');
        productModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        currentEditingCard = null;
    }

    if (openNewProductBtnDesktop) {
        openNewProductBtnDesktop.addEventListener('click', () => openProductModal(false));
    }
    if (openNewProductBtnMobile) {
        openNewProductBtnMobile.addEventListener('click', () => openProductModal(false));
    }
    if (closeProductModalBtn) {
        closeProductModalBtn.addEventListener('click', closeProductModal);
    }
    if (cancelProductBtn) {
        cancelProductBtn.addEventListener('click', closeProductModal);
    }
    if (mobileModalBackBtn) {
        mobileModalBackBtn.addEventListener('click', closeProductModal);
    }

    // Close on overlay click (Desktop only)
    if (productModal) {
        productModal.addEventListener('click', (e) => {
            if (e.target === productModal && window.innerWidth >= 992) {
                closeProductModal();
            }
        });
    }

    // File Dropzone Interaction
    function resetDropzone() {
        if (!mediaDropzone) return;
        const label = mediaDropzone.querySelector('.dropzone-label');
        if (label) {
            label.innerHTML = `Drag &amp; Drop your files or <button type="button" class="browse-trigger" id="browseTriggerBtn">Browse</button>`;
            const newTrigger = mediaDropzone.querySelector('#browseTriggerBtn');
            if (newTrigger) {
                newTrigger.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (prodFileInput) prodFileInput.click();
                });
            }
        }
    }

    if (browseTriggerBtn && prodFileInput) {
        browseTriggerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prodFileInput.click();
        });
    }

    if (mediaDropzone && prodFileInput) {
        mediaDropzone.addEventListener('click', () => {
            prodFileInput.click();
        });

        prodFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files.length > 0) {
                const fileName = e.target.files[0].name;
                const label = mediaDropzone.querySelector('.dropzone-label');
                if (label) {
                    label.innerHTML = `Selected: <strong>${fileName}</strong> (<button type="button" class="browse-trigger" id="changeFileBtn">Change</button>)`;
                    const changeBtn = mediaDropzone.querySelector('#changeFileBtn');
                    if (changeBtn) {
                        changeBtn.addEventListener('click', (ev) => {
                            ev.stopPropagation();
                            prodFileInput.click();
                        });
                    }
                }
            }
        });
    }

    // Submit form (Add or Edit)
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('prodNameInput').value.trim();
            let rawPrice = document.getElementById('prodPriceInput').value.replace(/[^0-9.]/g, '');
            const price = parseFloat(rawPrice || '0').toFixed(2);
            const stock = document.getElementById('prodStockInput').value.trim() || '0';
            const category = document.getElementById('prodCategoryInput').value;
            const status = document.getElementById('prodStatusInput').value;
            const desc = document.getElementById('prodDescInput').value.trim();

            if (currentEditingCard) {
                // Update existing card
                currentEditingCard.setAttribute('data-name', name);
                currentEditingCard.setAttribute('data-category', category);
                currentEditingCard.setAttribute('data-price', price);
                currentEditingCard.setAttribute('data-stock', stock);

                const titleEl = currentEditingCard.querySelector('.prod-title');
                const catEl = currentEditingCard.querySelector('.prod-category-tag');
                const priceEl = currentEditingCard.querySelector('.prod-price');
                const descEl = currentEditingCard.querySelector('.prod-desc');
                const stockQtyEl = currentEditingCard.querySelector('.stock-qty');
                const badgeEl = currentEditingCard.querySelector('.badge-active');

                if (titleEl) titleEl.textContent = name;
                if (catEl) catEl.textContent = category;
                if (priceEl) priceEl.textContent = `RM ${price}`;
                if (descEl) descEl.textContent = desc;
                if (stockQtyEl) stockQtyEl.textContent = stock;
                if (badgeEl) {
                    badgeEl.textContent = status;
                    badgeEl.style.backgroundColor = status === 'Active' ? 'var(--color-active-badge)' : '#94A3B8';
                }

                closeProductModal();
                showToast(`Product "${name}" updated successfully!`);
            } else {
                // Create new card element
                const newCard = document.createElement('article');
                newCard.className = 'prod-card';
                newCard.setAttribute('data-name', name);
                newCard.setAttribute('data-category', category);
                newCard.setAttribute('data-price', price);
                newCard.setAttribute('data-stock', stock);
                newCard.setAttribute('data-sold', '0');

                newCard.innerHTML = `
                    <div class="prod-card-thumb">
                        <img src="./assets/images/products/prod_1.jpg" alt="${name}" class="prod-img">
                        <span class="badge-active" style="background-color: ${status === 'Active' ? 'var(--color-active-badge)' : '#94A3B8'};">${status}</span>
                    </div>
                    <div class="prod-card-body">
                        <h3 class="prod-title">${name}</h3>
                        <div class="prod-category-tag">${category}</div>
                        <div class="prod-price">RM ${price}</div>
                        <p class="prod-desc">${desc || 'Premium quality product from PIOS catalogue.'}</p>
                        <div class="prod-inventory">
                            <span class="stock-info">Stock: <strong class="stock-qty">${stock}</strong></span>
                            <span class="sold-info">0 sold</span>
                        </div>
                    </div>
                    <div class="prod-card-actions">
                        <button class="btn-prod-action btn-share" data-action="share" title="Share Product">
                            <svg class="action-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                            </svg>
                            <span class="btn-text">Share</span>
                        </button>
                        <button class="btn-prod-action btn-blast" data-action="blast" title="Blast to WhatsApp">
                            <svg class="action-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.301-.15-1.782-.879-2.057-.98-.276-.1-.476-.15-.677.15-.201.3-.777.98-.953 1.18-.175.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.787-1.677-2.088-.175-.3-.019-.463.132-.613.136-.135.301-.351.452-.527.15-.175.201-.3.301-.501.101-.2.05-.376-.025-.526-.075-.15-.677-1.632-.928-2.235-.245-.587-.493-.508-.677-.517-.175-.01-.376-.01-.577-.01-.201 0-.527.075-.803.376-.276.3-1.054 1.03-1.054 2.511 0 1.482 1.079 2.911 1.23 3.112.15.2 2.124 3.243 5.145 4.548.719.311 1.28.497 1.718.636.722.23 1.379.197 1.9-.12.57-.348 1.782-.728 2.033-1.431.25-.703.25-1.306.175-1.431-.075-.125-.276-.2-.577-.35zM12 2a10 10 0 0 0-8.59 15.11L2 22l4.98-1.31A10 10 0 1 0 12 2z"></path>
                            </svg>
                            <span class="btn-text">Blast</span>
                        </button>
                        <button class="btn-prod-action btn-edit" data-action="edit" title="Edit Product">
                            <svg class="action-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            <span class="btn-text">Edit</span>
                        </button>
                    </div>
                `;

                productGrid.prepend(newCard);
                attachCardActions(newCard);
                closeProductModal();
                showToast(`Product "${name}" successfully added!`);
            }
        });
    }

    // --- 3. Blast Modal ---
    function openBlastModal(prodName, prodPrice) {
        if (!blastModal) return;
        blastProductName.textContent = prodName;
        blastProductPrice.textContent = `Price: RM ${prodPrice}`;
        blastModal.classList.add('active');
        blastModal.setAttribute('aria-hidden', 'false');
    }

    function closeBlastModal() {
        if (!blastModal) return;
        blastModal.classList.remove('active');
        blastModal.setAttribute('aria-hidden', 'true');
    }

    if (closeBlastModalBtn) closeBlastModalBtn.addEventListener('click', closeBlastModal);
    if (cancelBlastBtn) cancelBlastBtn.addEventListener('click', closeBlastModal);
    if (blastModal) {
        blastModal.addEventListener('click', (e) => {
            if (e.target === blastModal) closeBlastModal();
        });
    }
    if (sendBlastBtn) {
        sendBlastBtn.addEventListener('click', () => {
            closeBlastModal();
            showToast('WhatsApp promotional blast broadcasted successfully!');
        });
    }

    // --- 4. Card Actions (Share, Blast, Edit) ---
    function attachCardActions(card) {
        const shareBtn = card.querySelector('.btn-share');
        const blastBtn = card.querySelector('.btn-blast');
        const editBtn = card.querySelector('.btn-edit');

        if (shareBtn) {
            shareBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const title = card.getAttribute('data-name') || 'Product';
                navigator.clipboard?.writeText(window.location.origin + '/products.html?item=' + encodeURIComponent(title));
                showToast(`Product link copied to clipboard!`);
            });
        }

        if (blastBtn) {
            blastBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const name = card.getAttribute('data-name') || 'Product';
                const price = card.getAttribute('data-price') || '0.00';
                openBlastModal(name, price);
            });
        }

        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const cardData = {
                    name: card.getAttribute('data-name') || 'Beauty of Joseon Relief Sun SPF50+',
                    category: card.getAttribute('data-category') || 'Health Product',
                    price: card.getAttribute('data-price') || '168.99',
                    stock: card.getAttribute('data-stock') || '156',
                    status: 'Active',
                    desc: card.querySelector('.prod-desc')?.textContent || 'Pelindung matahari organik yang mengandungi 30% ekstrak beras dan ekstrak probiotik bijirin untuk menenangkan kulit dan mencerahkan wajah.'
                };
                openProductModal(true, cardData, card);
            });
        }
    }

    // Attach to existing cards
    cards.forEach(card => attachCardActions(card));

    // --- 5. Fullscreen Mobile Navigation ---
    const mobileModalHamburgerBtn = document.getElementById('mobileModalHamburgerBtn');

    function openMobileMenu() {
        if (!fullscreenMenu) return;
        fullscreenMenu.classList.add('open');
        fullscreenMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    if (mobileMenuToggleBtn) {
        mobileMenuToggleBtn.addEventListener('click', openMobileMenu);
    }
    if (mobileModalHamburgerBtn) {
        mobileModalHamburgerBtn.addEventListener('click', openMobileMenu);
    }

    if (fsMenuCloseBtn && fullscreenMenu) {
        fsMenuCloseBtn.addEventListener('click', () => {
            fullscreenMenu.classList.remove('open');
            fullscreenMenu.setAttribute('aria-hidden', 'true');
            if (!productModal || !productModal.classList.contains('active')) {
                document.body.style.overflow = '';
            }
        });
    }

    // --- Dark / Light Mode Switch Toggle ---
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

    // --- Dynamic Date in Desktop Topbar ---
    const dateElement = document.querySelector('.topbar-date');
    if (dateElement) {
        const now = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }

    // --- Notification Bell Interaction ---
    const notifBtn = document.querySelector('.notif-bell-btn');
    if (notifBtn) {
        notifBtn.addEventListener('click', () => {
            alert('Notifications: 3 new system updates and 1 pending product review.');
        });
    }
});
