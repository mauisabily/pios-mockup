# PIOS BizGrowth Engine — Frontend Mockup & Laravel Blade Integration Guide

> **Production-Ready Responsive UI Mockup for Laravel Web Application**  
> Single-codebase responsive architecture supporting **Desktop (Wide Full)** and **Mobile** with unified **Forest Teal (`#134C49`)** theme, crafted strictly according to official Figma specifications (`node-id=343-3227` & `BO_dashboard`).

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [Quick Reference & Demo Pages](#-quick-reference--demo-pages)
3. [Laravel Architecture & Migration Guide](#-laravel-architecture--migration-guide)
   - [Folder Mapping](#1-folder-mapping)
   - [Blade Layouts & Component Breakdown](#2-blade-layouts--component-breakdown)
   - [Routes Configuration (`routes/web.php`)](#3-routes-configuration-routeswebphp)
   - [Controller Data Passing Example](#4-controller-data-passing-example)
4. [File Structure & Repository Layout](#-file-structure--repository-layout)
5. [Design System & Color Tokens](#-design-system--color-tokens)
6. [Interactive Features](#-interactive-features)
7. [Running Locally](#-running-locally)
8. [Documentation & System Owner Verification](#-documentation--system-owner-verification)

---

## 🌟 Project Overview

**PIOS BizGrowth Engine** is a modern business growth and operations dashboard tailored for Business Owners. This repository serves as the official frontend mockup designed to be plugged directly into a **Laravel 10 / 11** backend system.

### Key Highlights:
- **1 Single Codebase per Screen**: No separate sub-domains or duplicate templates (`mobile.html` is deprecated and automatically redirects to unified `index.html`).
- **Wide Full Desktop (100% Width)**: Main dashboard layout fluidly fills the entire viewport with zero dead space/gaps on wide screens (1080p, 1440p, 4K).
- **Unified Forest Teal Theme (`#134C49`)**: Desktop and Mobile share the same cohesive brand colors with clean `#FFFFFF` cards over soft `#F1F5F9` background.
- **100% Fullscreen Mobile Navigation**: Mobile drawer upgraded to a full-screen interactive overlay matching Figma frame `3.0_nav_dashboard`.
- **Pure HTML5 / Vanilla CSS / Vanilla JS**: Zero dependencies, no Tailwind or Bootstrap bloat, ensuring effortless porting into Laravel Blade.

---

## 🚀 Quick Reference & Demo Pages

| Page | Description | Source File | Demo Endpoint |
| :--- | :--- | :--- | :--- |
| **Login Screen** | Responsive Desktop 2-column & Mobile Teal with show/hide password | [`index.html`](index.html) | `http://localhost:3000/index.html` |
| **Business Owner Dashboard** | Wide Full 6 KPI cards, Customer Pipeline, Recent Activity & Theme toggle | [`dashboard.html`](dashboard.html) | `http://localhost:3000/dashboard.html` |
| **Owner Documentation** | Interactive dev log, test credentials, timestamps & visual gallery | [`docs/index.html`](docs/index.html) | `http://localhost:3000/docs/index.html` |

### Demo Credentials for Testing
- **PIOS ID**: `PIO-8823`
- **Password**: `secret123`

---

## 🛠 Laravel Architecture & Migration Guide

This mockup is structured for immediate conversion into a **Laravel Blade-based Application**. Follow this guide to migrate files into your Laravel project.

### 1. Folder Mapping

```
Mockup Folder                          Laravel Target Location
├── assets/
│   ├── css/style.css            ───>  public/assets/css/style.css (or resources/css/style.css)
│   ├── css/dashboard.css        ───>  public/assets/css/dashboard.css
│   ├── js/script.js             ───>  public/assets/js/script.js (or resources/js/script.js)
│   ├── js/dashboard.js          ───>  public/assets/js/dashboard.js
│   └── images/*                 ───>  public/assets/images/*
│
├── index.html                   ───>  resources/views/auth/login.blade.php
└── dashboard.html               ───>  resources/views/dashboard.blade.php
```

---

### 2. Blade Layouts & Component Breakdown

To maintain clean and DRY code, break down [`dashboard.html`](dashboard.html) into reusable Blade components:

#### A. Master Layout: `resources/views/layouts/app.blade.php`
```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? config('app.name', 'PIOS') }}</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
    
    <!-- Stylesheet -->
    <link rel="stylesheet" href="{{ asset('assets/css/dashboard.css') }}">
    @stack('styles')
</head>
<body class="dashboard-body">

    <!-- Mobile Header Component -->
    <x-mobile-header :title="$headerTitle ?? 'Dashboard'" />

    <!-- Fullscreen Menu Component -->
    <x-fullscreen-menu />

    <div class="dash-layout">
        <!-- Desktop Sidebar Component -->
        <x-sidebar />

        <!-- Main Content Slot -->
        <main class="dash-main">
            {{ $slot }}
        </main>
    </div>

    <!-- Scripts -->
    <script src="{{ asset('assets/js/dashboard.js') }}"></script>
    @stack('scripts')
</body>
</html>
```

#### B. Component Decomposition

1. **`<x-sidebar />`** (`resources/views/components/sidebar.blade.php`):
   - Contains Desktop Forest Teal sidebar, PIOS logo, navigation links with `request()->routeIs(...)` active states, and user profile (Lenny Muller / Auth User).
2. **`<x-mobile-header />`** (`resources/views/components/mobile-header.blade.php`):
   - Sticky mobile teal bar with back arrow and hamburger trigger button.
3. **`<x-fullscreen-menu />`** (`resources/views/components/fullscreen-menu.blade.php`):
   - 100% overlay with logo, close button (`X`), navigation items, Dark Mode toggle, and Laravel logout form (`POST /logout`).
4. **`<x-kpi-card />`** (`resources/views/components/kpi-card.blade.php`):
   - Reusable card component taking props: `title`, `value`, `subtitle`, `badge`, `color`, and `iconSlot`.

---

### 3. Routes Configuration (`routes/web.php`)

```php
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

// Public Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('/', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.submit');
});

// Authenticated Business Owner Routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});
```

---

### 4. Controller Data Passing Example

#### `app/Http/Controllers/DashboardController.php`
```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // Dynamic KPI data fetched from Eloquent Models
        $kpiData = [
            'total_customers' => [
                'value' => 203,
                'growth' => '+8 this month',
                'color' => 'teal',
            ],
            'prospects' => [
                'value' => 38,
                'pct' => '19% of pipeline',
                'color' => 'blue',
            ],
            'vip_customers' => [
                'value' => 24,
                'pct' => '11.8% of total',
                'color' => 'yellow',
            ],
            'products' => [
                'value' => 31,
                'growth' => '3 added this month',
                'color' => 'purple',
            ],
            'active_promotions' => [
                'value' => 12,
                'alert' => '4 expiring soon',
                'color' => 'green',
            ],
            'open_orders' => [
                'value' => 18,
                'alert' => '5 awaiting payment',
                'color' => 'orange',
            ],
        ];

        // Customer Pipeline breakdown
        $pipeline = [
            ['stage' => 'Contact',  'count' => 52, 'pct' => 25.6, 'color' => 'slate'],
            ['stage' => 'Prospect', 'count' => 38, 'pct' => 18.7, 'color' => 'blue'],
            ['stage' => 'Customer', 'count' => 89, 'pct' => 43.8, 'color' => 'teal'],
            ['stage' => 'VIP',      'count' => 24, 'pct' => 11.8, 'color' => 'yellow'],
        ];

        // Recent Activities feed
        $recentActivities = [
            [
                'time' => '10:22 AM',
                'title' => 'New order received',
                'desc' => 'Carmen Reyes — Premium Wellness Pack',
                'badge' => 'Order',
                'badge_class' => 'badge-order',
            ],
            [
                'time' => '09:58 AM',
                'title' => 'Payment confirmed',
                'desc' => 'Nathan Buckley — $480',
                'badge' => 'Paid',
                'badge_class' => 'badge-paid',
            ],
            // ... more activities
        ];

        return view('dashboard', compact('kpiData', 'pipeline', 'recentActivities'));
    }
}
```

---

## 📁 File Structure & Repository Layout

```
pios-mockup/
├── assets/
│   ├── css/
│   │   ├── dashboard.css             # Wide-full responsive dashboard styles (desktop & mobile)
│   │   ├── style.css                 # Login page responsive styles (desktop 2-col & mobile teal)
│   │   └── mobile.css                # Standalone mobile styles (kept for reference)
│   ├── images/
│   │   ├── header_logo.png           # Transparent PIOS header logo
│   │   ├── desktop_center_logo.png   # Transparent mascot logo for desktop login
│   │   ├── center_logo.png           # Transparent mascot logo for mobile login
│   │   ├── hero_card.png             # Metallic orange wave graphic for login desktop
│   │   └── lenny_avatar.png          # High-resolution avatar of Lenny Muller
│   └── js/
│       ├── dashboard.js              # Fullscreen menu, theme switcher & date logic
│       └── script.js                 # Password toggle, form validation & loading animation
│
├── dashboard.html                    # Unified Business Owner Dashboard (Wide Full Desktop + Mobile)
├── index.html                        # Unified Login Screen (Desktop + Mobile in 1 file)
├── mobile.html                       # Auto-redirects to index.html (deprecated)
│
├── docs/                             # Interactive documentation for System Owner & Developers
│   ├── index.html                    # Official developer & owner report
│   ├── walkthrough.html              # Redirects to docs/index.html
│   └── images/*                      # Verification screenshots
│
└── README.md                         # This file
```

---

## 🎨 Design System & Color Tokens

All design tokens are defined in Vanilla CSS `:root` variables:

| Variable Token | Color Value | Description |
| :--- | :--- | :--- |
| `--dash-sidebar-bg` | `#134C49` | Deep Forest Teal (Desktop Sidebar & Mobile Header) |
| `--dash-sidebar-active` | `#1B5853` | Active navigation item background |
| `--dash-desk-bg` | `#F1F5F9` | Clean soft slate grey body background |
| `--dash-card-bg` | `#FFFFFF` | Pure white card surfaces |
| `--dash-card-border` | `#E2E8F0` | Subtle clean card borders |
| `--text-dark` | `#0F172A` | Crisp primary heading and title text |
| `--text-muted` | `#64748B` | Secondary and label text |
| `--color-teal` | `#0D9488` | Customers / Customer pipeline progress |
| `--color-blue` | `#2563EB` | Prospects metric & badges |
| `--color-yellow` | `#D97706` | VIP metric & badges |
| `--color-purple` | `#9333EA` | Products metric & badges |
| `--color-green` | `#059669` | Active Promotions metric & badges |
| `--color-orange` | `#EA580C` | Open Orders metric & badges |

---

## ⚡ Interactive Features

1. **Wide Full Desktop Fluid Grid**:
   - Zero side gaps on wide monitors (1387px, 1920px, etc.).
   - `.dash-main` is unrestricted (`width: 100%`, `min-width: 0`), allowing KPI cards and pipeline tables to adapt smoothly.
2. **100% Fullscreen Mobile Navigation Menu**:
   - Click the hamburger button (`≡`) to open the full-screen overlay matching Figma `3.0_nav_dashboard`.
   - Includes sub-item *Register Customer*, Dark mode toggle, and Lenny Muller user profile with logout.
3. **Dark / Light Theme Switcher**:
   - Desktop topbar sun/moon button (`#desktopThemeToggleBtn`) and mobile menu switch (`#fsDarkModeToggle`) dynamically toggle `.dark-mode-active` on `body.dashboard-body`.
   - Remembers user preference in `localStorage` (`pios_theme`).
4. **Password Toggle & Live Validation**:
   - Eye icon toggles password visibility between plaintext and masked bullets.
   - Form validates mandatory credentials and renders smooth loading feedback.

---

## 💻 Running Locally

### Option 1: Direct File Opening
Double-click [`dashboard.html`](dashboard.html) or [`index.html`](index.html) to open directly in any modern browser (Chrome, Edge, Safari, Firefox).

### Option 2: Using Node.js Local Server
```bash
# Serve the repository on port 3000
npx -y serve . -p 3000
```
Then visit:
- **Dashboard**: `http://localhost:3000/dashboard.html`
- **Login**: `http://localhost:3000/index.html`
- **Documentation**: `http://localhost:3000/docs/index.html`

### Option 3: In a Laravel Environment
Once copied into `resources/views/`:
```bash
php artisan serve
# Application is live at http://127.0.0.1:8000/
```

---

## 📖 Documentation & System Owner Verification

A dedicated documentation portal for the System Owner is available at [`docs/index.html`](docs/index.html). It includes:
- Development start timestamp (**21 September 2026, 16:15 MYT**)
- Quick-copy test credentials
- Complete scope evolution table (Before vs. After)
- Verification gallery with actual screenshots across viewports

---

## 👨‍💻 Maintainer & Credit
- **Project**: PIOS BizGrowth Engine
- **Figma Reference**: Prototypes `343-3227`, `3.1_dashboard`, `3.0_nav_dashboard`, and `BO_dashboard`
- **Architecture**: Responsive Single-Codebase HTML/CSS/JS for Laravel Blade Integration
- **License**: Private & Confidential / Proprietary to PIOS
