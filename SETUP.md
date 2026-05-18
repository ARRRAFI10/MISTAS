# MISTAS — MIST Alumni Society Website

## Frontend Setup Guide

---

## 📁 Project Structure

```
mistas/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── pages/
    │   ├── HomePage.jsx          ← Full Home page
    │   ├── AboutPage.jsx         ← About, Mission, History, Council
    │   └── DirectoryPage.jsx     ← Alumni Directory with search/filter
    └── components/
        ├── layout/
        │   ├── Layout.jsx        ← Page wrapper
        │   ├── Navbar.jsx        ← Sticky navbar with dropdown
        │   └── Footer.jsx        ← Full footer
        ├── home/
        │   ├── HeroBanner.jsx    ← Hero with split layout
        │   ├── WelcomeMessage.jsx
        │   ├── StatsDashboard.jsx
        │   ├── QuickLinks.jsx
        │   ├── NewsEvents.jsx
        │   └── AlumniSpotlight.jsx
        └── ui/
            └── index.jsx         ← Shared UI primitives
```

---

## ⚙️ Prerequisites

- **Node.js** v18+ (LTS recommended)
- **npm** v9+ or **yarn** v1.22+

Verify with:

```bash
node --version
npm --version
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd mistas
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Visit: **http://localhost:5173**

### 3. Build for Production

```bash
npm run build
```

Output goes to `dist/` folder. Deploy this to any static host.

---

## 🌐 Pages Included

| Route        | Page             | Sections Covered                                                                        |
| ------------ | ---------------- | --------------------------------------------------------------------------------------- |
| `/`          | Home             | Hero, Welcome, Stats Dashboard, Quick Links, News, Spotlight, Social, CTA               |
| `/about`     | About MISTAS     | Association info, Mission & Vision, Objectives, History Timeline, Council, Constitution |
| `/directory` | Alumni Directory | Search, Filters (dept/batch/country), Grid, Notable Alumni, Achievements                |

---

## 🎨 Design System

### Color Palette (Forest Green)

```
forest-50    #f0f7f0   (backgrounds)
forest-200   #b3dbb3   (borders)
forest-500   #2d7d2d   (labels, accents)
forest-600   #1e6b1e   (primary buttons)
forest-700   #155515   (hover states)
forest-800   #0f3f0f   (dark cards)
forest-900   #0a2d0a   (deep backgrounds)
forest-950   #051805   (hero/dark sections)
```

### Typography

- **Display / Headings:** Playfair Display (serif, editorial)
- **Body text:** Source Serif 4 (readable serif)
- **Labels / Mono:** JetBrains Mono (tracking, badges)
- **UI / Sans:** DM Sans (buttons, nav, UI text)

### Unique Design Elements

- `clip-corner` — cut corner motif on cards, buttons, avatars
- Grid/dot patterns on dark sections
- Horizontal line + label header pattern
- Green top-bar hover reveal on cards
- Animated count-up stats with IntersectionObserver
- Split diagonal hero layout

---

## 📦 Dependencies Used

| Package                     | Purpose                                 |
| --------------------------- | --------------------------------------- |
| react-router-dom            | Client-side routing                     |
| lucide-react                | Icon library                            |
| framer-motion               | (installed, ready for page transitions) |
| react-countup               | (installed, alternative counter)        |
| react-intersection-observer | (installed, for scroll animations)      |
| tailwindcss                 | Utility-first CSS                       |

---

## 🔧 Extending the Project

### Adding a New Page

1. Create `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`:

```jsx
<Route path="new-page" element={<NewPage />} />
```

3. Add link in `Navbar.jsx` navItems array

### Adding a New Section to Home

1. Create `src/components/home/NewSection.jsx`
2. Import and add to `src/pages/HomePage.jsx`

### Connecting to a Backend / API

Replace mock data arrays (in each page/component) with `fetch()` or `axios` calls:

```jsx
useEffect(() => {
  fetch("/api/alumni")
    .then((r) => r.json())
    .then((data) => setAlumni(data));
}, []);
```

---

## 🌍 Deployment Options

| Platform     | Command                        | Notes                          |
| ------------ | ------------------------------ | ------------------------------ |
| Vercel       | `vercel deploy`                | Auto-detects Vite              |
| Netlify      | Drag `dist/` folder            | Set build cmd: `npm run build` |
| GitHub Pages | Use `vite-plugin-github-pages` | Set `base` in vite.config      |
| cPanel       | Upload `dist/` contents        | Set root to public_html        |

---

## 📋 Remaining Pages to Build

The following pages are structured/routed but need content:

- `/engagement` — Mentorship, Career Guidance, Webinars
- `/careers` — Job Portal, Internships, Resources
- `/news` — News list, Events, Photo/Video Gallery
- `/community` — Batch Groups, Regional Chapters, Forum
- `/contact` — Map, Help Desk, Feedback Form
- `/login` `/register` — Auth forms

All pages follow the same pattern: import `Layout`, use `Section` + `SectionHeader` components from `src/components/ui/index.jsx`.

---

_Built with React 18 + Vite 5 + Tailwind CSS 3_
