# PIOS BizGrowth Engine — Design System & Component Guidelines

> **Official Standard Design Specification**  
> Gunakan dokumen ini sebagai rujukan wajib bagi setiap reka bentuk dan pembangunan skrin baharu dalam sistem PIOS BizGrowth Engine. Dokumen ini memastikan penyeragaman 100% dari segi saiz, jarak (gap), warna tema, tipografi, dan komponen interaktif antara semua modul (Dashboard, Customer, Products, Transaction, Fees, dsb.).

---

## 🎨 1. Theme Color Palette & Design Tokens

Semua warna ditakrifkan secara rasmi melalui pembolehubah CSS `:root`:

| Token / Pembolehubah | Nilai Hex / RGB | Kegunaan & Standard |
| :--- | :--- | :--- |
| **`--color-primary-teal`** | `#134C49` | **Tema Utama Business Owner (BO)**: Sidebar Desktop, Header Mobile, Fullscreen Mobile Menu. |
| **`--color-primary-hover`** | `#0E3B38` | Warna hover/active untuk elemen Forest Teal. |
| **`--color-teal`** | **`#0D9488`** | **Standard Semua Butang Tindakan Utama**: Butang `+ Add Customer`, `+ New Product`, `Save Changes`, Sticky Mobile CTA. |
| **`--color-teal-hover`** | **`#0F766E`** | Warna hover bagi semua butang tindakan utama Teal (`#0D9488`). |
| **`--dash-desk-bg`** | `#F1F5F9` | Latar belakang kanvas skrin Desktop & Mobile. |
| **`--dash-card-bg`** | `#FFFFFF` | Latar belakang kad, modal, borang, dan kotak carian. |
| **`--dash-card-border`** | `#E2E8F0` | Garisan sempadan standard kad, jadual, dan kotak carian. |
| **`--text-dark` / Heading** | `#0F172A` | Warna tajuk utama, teks tebal, dan nilai angka. |
| **`--text-body`** | `#1E293B` | Warna teks biasa dan perenggan. |
| **`--text-slate` / Muted** | `#64748B` | Warna teks kapsyen, label, tarikh, dan placeholder input. |
| **`--text-white`** | `#FFFFFF` | Teks putih pada butang dan header teal. |
| **`--color-blue`** | `#2563EB` | Badge Prospek, titik notifikasi bell. |
| **`--color-green`** | `#16A34A` | Butang WhatsApp Blast, badge System Active / Active. |
| **`--color-yellow` / Amber** | `#D97706` | Badge VIP, penunjuk amaran baki stok. |

---

## 🔤 2. Typography Standards

| Elemen | Font Family | Saiz | Ketebalan (Weight) | Jarak Bawah (Margin) |
| :--- | :--- | :--- | :--- | :--- |
| **H1 Tajuk Halaman (Desktop)** | `'Poppins', sans-serif` | **`1.85rem`** (29.6px) | `700` (Bold) | `margin-bottom: 4px; line-height: 1.2;` |
| **Subtajuk Halaman** | `'Inter', sans-serif` | **`0.92rem`** | `400` / `500` | Warna `#64748B` |
| **Tajuk Header Mobile** | `'Poppins', sans-serif` | **`1.25rem`** (20px) | `600` (SemiBold) | `margin: 0; line-height: 1.2; color: #FFF;` |
| **Tajuk Modal** | `'Poppins', sans-serif` | **`1.25rem`** (20px) | `700` (Bold) | `color: #0F172A;` |
| **Tajuk Seksyen Borang** | `'Inter', sans-serif` | **`0.98rem`** | `700` (Bold) | `color: #0F172A;` |
| **Teks Butang Utama** | `'Inter', sans-serif` | **`0.95rem`** | `600` (SemiBold) | `color: #FFFFFF;` |
| **Teks Input & Carian** | `'Inter', sans-serif` | **`0.95rem`** | `400` (Regular) | `color: #0F172A;` |
| **Label Borang** | `'Inter', sans-serif` | **`0.82rem` - `0.84rem`** | `600` (SemiBold) | `color: #475569;` |

---

## 📐 3. Desktop Topbar & Layout Standards

Layout Desktop PIOS menggunakan grid 2-kolum cecair (Fluid Wide-Full 100%):
- **Sidebar**: Lebar tetap `260px`, `height: 100vh`, `position: sticky; top: 0;`, latar `linear-gradient(180deg, #134C49 0%, #0E3B38 100%)`.
  - **Profil Pengguna Bahagian Bawah Sidebar (`.sidebar-footer`)**:
    - **Struktur**: Garisan sempadan atas (`border-top: 1px solid rgba(255, 255, 255, 0.12); padding-top: 20px;`), susunan flex mendatar (`display: flex; justify-content: space-between; align-items: center;`). Tiada latar belakang kad gelap berasingan.
    - **Profil Kiri (`.sidebar-user`)**:
      - Avatar: `./assets/images/lenny_avatar.png` (bukan fail lain), saiz `38x38px`, `border-radius: 50%`, `border: 2px solid rgba(255, 255, 255, 0.35)`.
      - Nama: `.user-name-text`, font-size `0.92rem`, font-weight `600`, warna `#FFFFFF`.
    - **Butang Log Keluar Kanan (`.sidebar-logout-btn`)**:
      - Ikon Log Keluar standard `[→` (SVG `log-out`), pautan ke `./index.html`.
      - Warna: `rgba(255, 255, 255, 0.7)`, hover: warna merah `#EF4444` dan latar `rgba(255, 255, 255, 0.08)`.
      - *Perhatian: Dilarang menggunakan kad berlatar gelap bertutup atau butang ikon pautan luar `↗`.*
- **Kawasan Utama (`.prod-main` / `.dash-main` / `.cust-main` / `.fees-main` / `.reports-main`)**: `padding: 32px 36px 60px; width: 100%; min-width: 0; box-sizing: border-box;`.
- **Topbar (`.prod-topbar` / `.cust-topbar` / `.dash-topbar`)**:
  - `display: flex; align-items: flex-start; justify-content: space-between;`
  - **Jarak Standard ke Kotak Carian (`margin-bottom`)**: **`24px !important;`**
  - Kanan Topbar: Tarikh (`#64748B`, `0.88rem`), Badge Status (`rgba(20, 184, 166, 0.12)`, padding `6px 14px`, border-radius `9999px`), Butang Theme Toggle (`38x38px`, bucu `10px`), Butang Notifikasi (`38x38px`, bucu `10px`).

---

## 🔍 4. Standard Kotak Carian (Search Bar) & Butang Tindakan

Spesifikasi ini **WAJIB** sama persis di antara skrin **Customer**, **Products**, dan mana-mana skrin baharu seterusnya:

### A. Bekas Bar Tindakan (`.cust-action-bar` / `.prod-action-bar`)
```css
display: flex;
align-items: center;
justify-content: space-between;
gap: 16px;             /* Jarak antara search input dan butang */
margin-bottom: 24px;   /* Jarak ke kandungan jadual / kad grid */
```

### B. Kotak Carian (`.cust-search-input` / `.prod-search-input`)
```css
width: 100%;
background: #FFFFFF;
border: 1px solid #E2E8F0;
border-radius: 12px;                  /* Bucu 12px standard */
padding: 12px 16px 12px 46px;        /* Padding 46px di kiri untuk ikon kaca pembesar */
font-family: 'Inter', sans-serif;
font-size: 0.95rem;                   /* Saiz teks 0.95rem */
color: #0F172A;
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
outline: none;
transition: all 0.2s ease;
/* Ketinggian terhitung (computed height) = ~47px */
```

### C. Keadaan Fokus Kotak Carian (Focus State)
```css
border-color: #0D9488;
box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
```

### D. Ikon Kaca Pembesar (`.search-icon` / `.cust-search-icon`)
```css
position: absolute;
left: 16px;
top: 50%;
transform: translateY(-50%);
color: #64748B;
pointer-events: none;
```

### E. Butang Utama Tindakan Desktop (`.btn-add-customer` / `.btn-new-product-desktop`)
```css
display: inline-flex;
align-items: center;
gap: 8px;
background-color: #0D9488;            /* Warna Teal Standard */
color: #FFFFFF;
font-family: 'Inter', sans-serif;
font-size: 0.95rem;
font-weight: 600;
padding: 12px 22px;                   /* Ketinggian terhitung = ~47px (sepadan dengan search bar) */
border-radius: 12px;                  /* Bucu 12px standard */
border: none;
cursor: pointer;
box-shadow: 0 2px 8px rgba(13, 148, 136, 0.3);
white-space: nowrap;
transition: all 0.2s ease;
```

### F. Keadaan Hover Butang Utama:
```css
background-color: #0F766E;
transform: translateY(-1px);
box-shadow: 0 4px 12px rgba(13, 148, 136, 0.4);
```

---

## 📱 5. Standard Header Mobile (Benchmark Dashboard)

Semua header mobile (Dashboard, Customer, Products, serta Modal Tambah/Edit) **MESTI** mematuhi ukuran piksel Dashboard 1:1:

| Elemen / Sifat | Nilai Standard Dashboard | Spesifikasi Teknikal CSS |
| :--- | :--- | :--- |
| **Ketinggian Bar (Height)** | **`60px`** | `height: 60px !important; min-height: 60px; max-height: 60px; box-sizing: border-box;` |
| **Latar Belakang** | Forest Teal **`#134C49`** | `background-color: #134C49 !important;` |
| **Warna Teks & Ikon** | Putih Tulen **`#FFFFFF`** | `color: #FFFFFF !important;` |
| **Padding Sisi** | **`0 16px`** | `padding: 0 16px !important;` |
| **Susun Atur** | Flexbox, center | `display: flex !important; align-items: center; justify-content: space-between;` |
| **Posisi** | Sticky top | `position: sticky; top: 0; z-index: 99; box-shadow: 0 2px 8px rgba(0,0,0,0.1);` |
| **Jarak Arrow & Tajuk**| **`14px`** | `display: flex; align-items: center; gap: 14px;` |
| **Tajuk Mobile** | **`Poppins 600, 1.25rem`** | `font-family: 'Poppins', sans-serif !important; font-size: 1.25rem !important; font-weight: 600 !important; line-height: 1.2 !important; margin: 0;` |
| **Butang Back** | **`36x36px`** | `width: 36px; height: 36px; padding: 6px; border: none; background: transparent; color: #FFF;` |
| **SVG Back Arrow** | **`22x22px`, stroke `2.2`** | `<svg width="22" height="22" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">` |
| **Butang Hamburger** | **`36x36px`** | `width: 36px; height: 36px; padding: 6px; border: none; background: transparent; color: #FFF;` |
| **SVG Hamburger** | **`26x26px`, stroke `2.2`** | `<svg width="26" height="26" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">` |

> [!IMPORTANT]
> **Peraturan Sifar Percanggahan (Zero Discrepancy Rule)**: Modal mobile sheet (seperti `Add Product` atau `Register Customer`) wajib menggunakan class `.mobile-modal-header` dengan ketinggian tepat `60px`, `z-index: 100`, tajuk `1.25rem` Poppins 600, dan stroke SVG `2.2`.

---

## 🪟 6. Standard Modal & Borang (Light Mode)

Kedua-dua modal desktop dan mobile borang pendaftaran mestilah menggunakan tema **Light Mode**:
- **Kad Modal (`.modal-card` / `.prod-modal-card`)**: Latar belakang `#FFFFFF`, sempadan `#E2E8F0`, bucu bulat `16px`, bayang `0 20px 50px rgba(15, 23, 42, 0.18)`.
- **Seksyen Borang (`.form-section-card`)**: Latar belakang `#F8FAFC`, sempadan `#E2E8F0`, bucu bulat `12px`, padding `18px 20px`.
- **Medan Input & Dropdown**: Latar belakang `#FFFFFF`, sempadan `#CBD5E1`, bucu `8px`, teks `#0F172A`, label `#475569` (`0.82rem`, font-weight 600).
- **Butang Simpan (`.btn-submit` / `.btn-modal-submit`)**:
  - Latar belakang: **`#0D9488`**
  - Hover: **`#0F766E`**
  - Border-radius: **`12px`**
  - Teks: Putih `#FFFFFF`
  - Bayang: `0 2px 8px rgba(13, 148, 136, 0.3)`
- **Butang Batal (`.btn-cancel` / `.btn-modal-cancel`)**: Latar `#FFFFFF`, sempadan `#CBD5E1`, teks `#475569`, hover `#F1F5F9`.

---

## 📲 7. Standard Butang Mobile Sticky CTA

Pada paparan mudah alih (< 992px), butang tindakan pantas diletakkan di bahagian bawah skrin:
```css
.mobile-sticky-footer {
    display: block !important;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, rgba(241, 245, 249, 0) 0%, rgba(241, 245, 249, 0.92) 25%, #F1F5F9 100%);
    padding: 12px 16px 18px 16px;
    z-index: 90;
}

.btn-mobile-cta {
    width: 100%;
    height: 48px;
    background-color: #0D9488;
    color: #FFFFFF;
    font-size: 0.95rem;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(13, 148, 136, 0.35);
    transition: background-color 0.2s ease, transform 0.15s ease;
}

.btn-mobile-cta:active {
    transform: scale(0.98);
    background-color: #0F766E;
}
```

---

## 🌓 8. Standard Tema Light / Dark Mode & Penukaran Ikon (Sun / Moon Toggle)

Sistem PIOS BizGrowth Engine menyokong peralihan tema dwimod (**Light Mode** dan **Dark Mode**) yang lancar, konsisten, dan terselaras di seluruh modul.

### A. Palet Warna Rasmi Mod Gelap (Dark Mode Palette)

Apabila kelas `.dark-mode-active` diaktifkan pada elemen `<body>`:

| Elemen UI | Warna Mod Gelap | Standard CSS / Hex |
| :--- | :--- | :--- |
| **Kanvas Utama (Canvas BG)** | Deep Navy Slate | `#0E1624` (atau `#0B131F`) |
| **Permukaan Kad, Jadual & Modal** | Dark Slate Card | `#111C2D` (atau `#141E2D`) |
| **Sempadan Kad & Garisan Pembahagi** | Subtle Border | `rgba(255, 255, 255, 0.08)` / `#1E2D44` |
| **Sidebar Desktop (BO Theme)** | Deep Dark Forest | `#0B1320` |
| **Teks Tajuk, Nilai & Nombor** | Pure / Off-White | `#FFFFFF` / `#F8FAFC` |
| **Teks Kapsyen & Subtajuk** | Slate Muted | `#94A3B8` |
| **Hover Baris Jadual / Kad** | Subtle Dark Overlay | `rgba(255, 255, 255, 0.03)` / `#17253D` |
| **Badge Outstanding / Amaran** | Dark Orange Alert | Background: `#3D2314`, Teks: `#FB923C`, Border: `#7C2D12` |
| **Badge Paid / Active** | Dark Emerald Green | Background: `#064E3B`, Teks: `#34D399`, Border: `#065F46` |

---

### B. Prinsip Pertukaran Ikon Matahari / Bulan (Zero Confusion Rule)

Semua butang toggle tema **WAJIB** menukar ikon mengikut keadaan semasa tema:

1. **Mod Cerah (Light Mode)**:
   - Paparkan ikon **Bulan (🌙)** pada butang toggle topbar dan label menu drawer mudah alih.
   - Menyampaikan isyarat visual kepada pengguna: *"Klik untuk bertukar ke Mod Gelap"*.
2. **Mod Gelap (Dark Mode)**:
   - Paparkan ikon **Matahari (☀️)** pada butang toggle topbar dan label menu drawer mudah alih.
   - Menyampaikan isyarat visual kepada pengguna: *"Klik untuk bertukar ke Mod Cerah"*.

---

### C. Struktur HTML Standard Butang Toggle

Kedua-dua SVG Bulan dan Matahari dimasukkan ke dalam elemen secara serentak, dan paparan dikawal secara reaktif melalui CSS:

#### 1. Desktop Topbar Button:
```html
<button class="theme-toggle-btn" id="desktopThemeToggleBtn" aria-label="Toggle Dark / Light Theme" title="Toggle Dark / Light Theme">
    <!-- Ikon Bulan (Aktif dalam Light Mode) -->
    <svg class="theme-icon-moon moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
    <!-- Ikon Matahari (Aktif dalam Dark Mode) -->
    <svg class="theme-icon-sun sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
</button>
```

#### 2. Mobile Fullscreen Menu Row:
```html
<div class="fs-darkmode-row">
    <div class="fs-darkmode-label">
        <svg class="fs-icon-moon moon-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
        <svg class="fs-icon-sun sun-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
        <span>Dark mode</span>
    </div>
    <label class="fs-switch">
        <input type="checkbox" id="fsDarkModeToggle">
        <span class="fs-slider"></span>
    </label>
</div>
```

---

### D. Spesifikasi CSS Standard Pertukaran Ikon

Peraturan ini wajib disertakan dalam setiap helaian gaya modul:
```css
/* Keadaan Asal: Mod Cerah (Light Mode) */
.theme-toggle-btn .moon-icon,
.theme-toggle-btn .theme-icon-moon,
.fs-darkmode-label .moon-icon,
.fs-darkmode-label .fs-icon-moon {
    display: block;
}

.theme-toggle-btn .sun-icon,
.theme-toggle-btn .theme-icon-sun,
.fs-darkmode-label .sun-icon,
.fs-darkmode-label .fs-icon-sun {
    display: none;
}

/* Keadaan Aktif: Mod Gelap (Dark Mode) */
body.dark-mode-active .theme-toggle-btn .moon-icon,
body.dark-mode-active .theme-toggle-btn .theme-icon-moon,
body.dark-mode-active .fs-darkmode-label .moon-icon,
body.dark-mode-active .fs-darkmode-label .fs-icon-moon {
    display: none !important;
}

body.dark-mode-active .theme-toggle-btn .sun-icon,
body.dark-mode-active .theme-toggle-btn .theme-icon-sun,
body.dark-mode-active .fs-darkmode-label .sun-icon,
body.dark-mode-active .fs-darkmode-label .fs-icon-sun {
    display: block !important;
}
```

---

### E. Penyelarasan JavaScript & Storan `localStorage`

Semua halaman menggunakan satu fungsi seragam untuk memastikan status suis, butang, dan kelas tema sentiasa seiring:
```javascript
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

// Semak simpanan keutamaan tema semasa halaman dimuatkan
try {
    const savedTheme = localStorage.getItem('pios_theme');
    if (savedTheme === 'dark') {
        setDarkMode(true);
    }
} catch (e) {}
```

---

## 📋 9. Checklist Verifikasi Reka Bentuk Baru

Sebelum melancarkan sebarang skrin atau komponen baharu, pastikan semakan berikut lulus:
- [ ] Jarak Topbar ke Action Bar / Kandungan Utama tepat **`24px`**.
- [ ] Kotak Carian mempunyai `border-radius: 12px`, `padding: 12px 16px 12px 46px`, dan `font-size: 0.95rem`.
- [ ] Ikon carian berkedudukan tepat di tengah paksi Y (`top: 50%; transform: translateY(-50%)`).
- [ ] Butang tindakan utama desktop menggunakan `#0D9488` dengan `border-radius: 12px` dan `padding: 12px 22px` (ketinggian sepadan ~47px dengan search input).
- [ ] Jarak antara kotak carian dan butang tindakan adalah **`16px`**.
- [ ] Header Mobile sentiasa tepat **`60px`**, latar belakang Forest Teal `#134C49`, tajuk Poppins 600 `1.25rem`, dan stroke SVG `2.2`.
- [ ] Butang toggle tema di Desktop Topbar mengandungi kedua-dua ikon Bulan (🌙) dan Matahari (☀️), dan bertukar mengikut mod semasa.
- [ ] Suis tema di Mobile Fullscreen Menu bertukar ikon Bulan dan Matahari dengan sepadan serta mematuhi `fsDarkModeToggle`.
- [ ] Tema Light/Dark diselaraskan dengan storan tempatan `localStorage.getItem('pios_theme')`.
- [ ] Modal menggunakan tema Light Mode (`#FFFFFF` & `#F8FAFC`).
