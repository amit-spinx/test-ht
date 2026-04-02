---
name: sd-fe-workflow
description: End-to-end front-end development workflow for the agency — Figma to production-ready HTML5/SCSS/JS/Bootstrap 5. Includes Bootstrap 5.3 complete reference. Use when user says "fe workflow", "frontend workflow", "start project", "dev workflow", "sd workflow", "bootstrap help", "bs5 reference", "bootstrap classes", "what bootstrap class", or "how to use bootstrap". Covers development, review, and delivery. Internal use only.
---

# SD Front-End Development Workflow

> Internal agency skill — Figma-to-Code pipeline.
> Stack: HTML5 + Nunjucks, Bootstrap 5.3, SCSS, jQuery, Gulp 4

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PIPELINE OVERVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

```
Phase 1 → Design Review & Setup
Phase 2 → HTML Structure
Phase 3 → SCSS Styling
Phase 4 → JavaScript Interactions
Phase 5 → Responsive Adjustments
Phase 6 → Review / QA / Audit
Phase 7 → Delivery
```

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PHASE 1 — DESIGN REVIEW & SETUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### What you receive
- Figma design file (URL with fileKey + nodeId)
- Dev handoff doc (Google Doc) — contains animation notes, special requirements
- Assets shared in Figma (fonts, images, icons)

### Step 1.1 — Review the Figma Design

Build a mental model of the full design before touching code:

- [ ] Count and name every section (top to bottom)
- [ ] Identify repeating patterns across pages (these become `cmn-*` components)
- [ ] Spot shared components that can be reused on other pages
- [ ] Note all interactive states (hover, active, focus, open, disabled)
- [ ] Check for animation/motion notes in the design or handoff doc
- [ ] Identify breakpoints present (desktop / tablet / mobile frames)

### Step 1.2 — Extract & Map ALL Figma Styles

Map **every** Figma style — not just what's used on the current page.

**Colors → `_variables.scss`**
```
Extract every color from Figma color styles →
  Map to existing $variable OR add new variable with descriptive name
  Never leave a hex value unmapped
```

**Typography → `_custom.scss` mixins**
```
Extract every text style from Figma →
  Map to existing mixin (display-font, font-xl, font-lg, etc.)
  OR create new mixin if no match exists
  Never use raw px for font sizes
```

**Spacing → exact Figma pixel values**
```
Extract padding, margin, gap values as-is from Figma.
Use exact pixel values — do NOT round to Bootstrap spacing scale.
Add comment: // Figma: [section/element name]
```

### Step 1.3 — Export Assets from Figma

- Fonts: export and place in `assets/fonts/`
- Images: export optimized (WebP preferred, fallback JPG/PNG) to `assets/img/`
- Icons: export as SVG, add to symbol definitions in `layout.html`
- Follow existing naming conventions in the project

### Step 1.4 — Determine File Targets

**New page:**
```
→ app/pages/[pagename].html
→ assets/sass/pages/[pagename].scss
→ assets/js/pages/[pagename].js
→ project.json (add appTemplate entry)
→ app/data/sitemap.json (add page entry)
```

**Shared component (reusable across pages):**
```
→ assets/sass/components/_cmn-[name].scss
→ @import in main.scss under components section
→ HTML as Nunjucks macro or partial in app/templates/partials/
```

**Section on existing page:**
```
→ assets/sass/pages/[pagename].scss (add section block)
→ app/pages/[pagename].html (add section markup)
```

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PHASE 2 — HTML STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Build Order
```
1. Header (nav macro)
2. Sections — one by one, top to bottom (matching Figma layer order)
3. Footer (include partial)
```

Do NOT build the full skeleton first. Complete each section's HTML before moving to the next.

### Page Template Structure
```html
{% extends "layout.html" %}
{% from "partials/header.html" import nav %}

{% block style %}
<link rel="stylesheet" href="css/[pagename].css">
{% endblock %}

{% block content %}
{{ nav() }}
<main role="main">

  <section class="[pagename]-[sectionname]">
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-6">
          ...
        </div>
      </div>
    </div>
  </section>

</main>
{% include "partials/footer.html" %}
{% endblock %}

{% block script %}
<script src="js/[pagename].min.js"></script>
{% endblock %}
```

### HTML Rules
- Wrap full page in `<div class="page-wrapper">`
- Every Figma frame/section → one `<section class="[pagename]-[sectionname]">`
- Bootstrap grid for ALL layout — no CSS floats, no custom grid
- Desktop column classes: `col-12 col-lg-6`, `col-12 col-lg-4`, etc.
- Images: `<img src="assets/img/0.gif" data-src="[real.jpg]" alt="[desc]">`
- Icons: `<svg><use xlink:href="#iconName"></use></svg>`
- JS hooks: `data-action="[name]"` — never bind to CSS classes
- ARIA: `aria-label`, `aria-expanded`, `aria-controls` on all interactive elements
- No inline styles — ever
- Semantic tags: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<aside>`

### Component Decision Rule
```
Will this block appear on other pages? →
  YES → create as cmn-* shared component
  NO  → page-specific section class
```

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PHASE 3 — SCSS STYLING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Approach: Desktop-First
Style the desktop layout first (matching Figma's desktop frame), then adjust for smaller breakpoints.

### File Structure
```scss
// assets/sass/pages/[pagename].scss

@import '../main';

.[pagename] {

  &-[sectionname] {
    padding: 100px 0; // Figma: [section] vertical padding

    &__title    { @include font-xl; color: $primary-color; }
    &__subtitle { @include font-md; color: $gray-color-10; }
    &__body     { @include text-18; }

    &__cta {
      &:hover { color: $green-color; }
    }

    // Responsive — adjust from desktop down
    @include media-breakpoint-down(lg) {
      padding: 60px 0;
    }
  }

}
```

### SCSS Rules
- ALL styles scoped under `.[pagename]` — no global selectors
- BEM naming: `&__element`, `&--modifier` inside parent
- `@include` for ALL font sizes — never raw px for typography
- `$variable` for ALL colors — never hardcoded hex
- Spacing: exact Figma pixel values with comment `// Figma: [element name]`
- Responsive: `@include media-breakpoint-down(lg)` / `media-breakpoint-down(md)`
- No `!important` — except in `_overrides.scss` with an explanatory comment
- No page-specific styles in `_layout.scss`
- New shared component → `_cmn-[name].scss` + import in `main.scss`

### Spacing Reference (exact Figma values)
```
Do NOT round to Bootstrap scale.
Use the exact pixel value from Figma.
Always comment the source:
  padding: 72px 0; // Figma: hero section padding
  margin-bottom: 36px; // Figma: title to subtitle gap
  gap: 28px; // Figma: card grid gap
```

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PHASE 4 — JAVASCRIPT INTERACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Common Interactions
Build these as needed per design:

| Interaction | Library/Approach |
|-------------|-----------------|
| Sliders/Carousels | Slick / Swiper |
| Accordions | Bootstrap Collapse or custom toggle |
| Scroll reveal animations | WOW.js / AOS / custom IntersectionObserver |
| Modals | Bootstrap Modal |
| Tabs | Bootstrap Tabs |
| Sticky headers | Custom scroll listener |
| Form validation | jQuery Validate or custom |
| Counters | Custom with IntersectionObserver trigger |
| Toggles | Custom class toggle (`is-active`, `is-open`) |

### File Structure
```javascript
// assets/js/pages/[pagename].js

$(document).ready(function () {

  // Hero — slider initialization
  function initHeroSlider() {
    $('.[pagename]-hero__slider').slick({
      dots: true,
      arrows: false,
      slidesToShow: 1
    });
  }

  // FAQ — accordion toggle
  function initAccordion() {
    $('[data-action="accordion-toggle"]').on('click', function () {
      $(this).closest('.cmn-accordion__item').toggleClass('is-open');
    });
  }

  initHeroSlider();
  initAccordion();

});
```

### JS Rules
- ALL code inside `$(document).ready` — no exceptions
- Named functions, one responsibility each
- Event binding: `.on('event', ...)` — never `onclick=""`
- JS hooks via `data-action="[name]"` — never target CSS class names
- Shared utilities → `web.js`
- Page-specific logic → `assets/js/pages/[pagename].js`
- Register in `project.json` under `appTemplate`
- Never modify vendor files in `assets/js/library/`

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PHASE 5 — RESPONSIVE ADJUSTMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Approach: Desktop-first, adjust downward

After desktop styling is complete, test and adjust at each breakpoint:

```
1440px → Desktop (primary design frame)
1200px → Large desktop adjustments
 992px → Tablet landscape (primary mobile switch — most critical)
 768px → Tablet portrait
 576px → Large mobile
 375px → Mobile (secondary design frame)
```

### Key Breakpoint: 992px (`media-breakpoint-down(lg)`)
This is the primary switch where most layouts collapse:
- Multi-column → single column
- Horizontal nav → hamburger menu
- Side-by-side → stacked
- Desktop padding → reduced mobile padding

### Common Responsive Patterns
```scss
// Section padding
padding: 100px 0;                          // desktop
@include media-breakpoint-down(lg) {
  padding: 60px 0;                          // mobile
}

// Column reorder
.order-2.order-lg-1                         // image first on mobile, text first on desktop

// Hide/show
.d-none.d-lg-block                          // desktop only
.d-block.d-lg-none                          // mobile only

// Typography scale reduction
// No action needed — fluid() mixins handle this automatically

// Images
.img-fluid.w-100                            // full width on mobile
```

### Responsive Checklist
- [ ] All columns stack properly below 992px
- [ ] No horizontal scroll at any breakpoint
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Text readable without zooming on 375px
- [ ] Images scale proportionally
- [ ] Spacing reduces appropriately on mobile
- [ ] Nav collapses to hamburger/offcanvas

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PHASE 6 — REVIEW / QA / AUDIT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 6.1 — Visual Match (Figma Comparison)
- [ ] Layout matches Figma at 1440px desktop
- [ ] Layout matches Figma at 375px mobile
- [ ] All spacing (padding, margin, gap) matches exact Figma values
- [ ] All alignment matches (left, center, right, baseline)
- [ ] All colors match using `$variables` — no bare hex
- [ ] All font sizes use `@include` mixins — no raw px
- [ ] All font families correct (Graphik weights)
- [ ] Hover / active / focus states implemented per design
- [ ] Animations match dev handoff doc notes

### 6.2 — Responsive Testing
- [ ] Chrome — desktop, tablet, mobile
- [ ] Safari — desktop, tablet, mobile (iOS)
- [ ] Firefox — desktop, tablet, mobile
- [ ] Edge — desktop, tablet, mobile
- [ ] No layout breaks at any viewport between 375px–1440px

### 6.3 — Code Quality & Minimization
- [ ] No inline styles
- [ ] No hardcoded colors or font sizes
- [ ] No `!important` outside `_overrides.scss`
- [ ] SCSS fully scoped under `.[pagename]`
- [ ] JS wrapped in `$(document).ready`
- [ ] No unused CSS selectors
- [ ] No duplicate styles — reuse `cmn-*` components
- [ ] `project.json` updated (new pages)
- [ ] `sitemap.json` updated (new pages)
- [ ] New shared components imported in `main.scss`

### 6.4 — Accessibility (WCAG AA)
- [ ] All images have meaningful `alt` text
- [ ] Color contrast ratio meets AA (4.5:1 normal text, 3:1 large text)
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus indicators visible
- [ ] `aria-label` on interactive elements without visible text
- [ ] `aria-expanded` / `aria-controls` on toggles, accordions, dropdowns
- [ ] Form inputs have associated `<label for="id">`
- [ ] Skip navigation link present
- [ ] Heading hierarchy is logical (h1 → h2 → h3, no skipping)
- [ ] No content conveyed by color alone

### 6.5 — SEO Standards
- [ ] Single `<h1>` per page
- [ ] Semantic HTML structure (`<main>`, `<section>`, `<nav>`, `<article>`)
- [ ] Meta title and description present
- [ ] `alt` text on all images (descriptive, not decorative)
- [ ] Clean URL structure
- [ ] No broken links

### 6.6 — Performance
**Targets:**
| Device | Lighthouse Score |
|--------|-----------------|
| Mobile | 60+ |
| Desktop | 80+ |

**Checklist:**
- [ ] Images optimized (WebP, compressed, correct dimensions)
- [ ] Lazy loading on below-fold images (`0.gif` placeholder + `data-src`)
- [ ] CSS minified (Gulp handles this)
- [ ] JS minified (Gulp handles this)
- [ ] No render-blocking resources
- [ ] Fonts preloaded or font-display: swap
- [ ] No unnecessary vendor libraries loaded

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PHASE 7 — DELIVERY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### Final Deliverables
```
1. Production build:           npm run build → /dist
2. HTML validation:            npm run w3cjs → fix all errors
3. All Phase 6 checklists:     green across all sections
4. File manifest:              list of all new/modified files
5. Token mapping table:        Figma value → project $variable / @include
```

### Delivery Checklist
- [ ] `npm run build` succeeds without errors
- [ ] `npm run w3cjs` passes HTML validation
- [ ] All Phase 6 checklists completed
- [ ] Code committed with descriptive message
- [ ] No console errors in any browser
- [ ] No 404s for assets (fonts, images, scripts)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## APPENDIX A — BOOTSTRAP 5.3.3 COMPLETE REFERENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> Quick-lookup reference for all Bootstrap 5.3 classes, components, utilities, and SASS customization.
> Always adapt examples to the project stack (Nunjucks, SCSS, jQuery, BEM naming).

---

### A.1 — LAYOUT

**Breakpoints:**
```
xs:  0       (default — mobile first)
sm:  ≥576px   col-sm-*    @include media-breakpoint-up(sm)
md:  ≥768px   col-md-*    @include media-breakpoint-up(md)
lg:  ≥992px   col-lg-*    @include media-breakpoint-up(lg)
xl:  ≥1200px  col-xl-*    @include media-breakpoint-up(xl)
xxl: ≥1400px  col-xxl-*   @include media-breakpoint-up(xxl)
```

**Containers:**
```
.container      → sm:540 md:720 lg:960 xl:1140 xxl:1320
.container-fluid → 100% at all breakpoints
.container-{bp}  → 100% until breakpoint, then fixed
```

**Grid patterns:**
```html
<!-- Equal columns -->
<div class="row">
  <div class="col-12 col-md-6 col-lg-4">1</div>
  <div class="col-12 col-md-6 col-lg-4">2</div>
  <div class="col-12 col-md-12 col-lg-4">3</div>
</div>

<!-- Sidebar + content -->
<div class="row">
  <div class="col-12 col-lg-4">Sidebar</div>
  <div class="col-12 col-lg-8">Content</div>
</div>

<!-- Offset -->
<div class="row">
  <div class="col-lg-6 offset-lg-3">Centered</div>
</div>

<!-- Ordering -->
<div class="row">
  <div class="col-12 col-lg-6 order-2 order-lg-1">Text (first on desktop)</div>
  <div class="col-12 col-lg-6 order-1 order-lg-2">Image (first on mobile)</div>
</div>
```

**Gutters:** `.g-{0-5}`, `.gx-{0-5}` (horizontal), `.gy-{0-5}` (vertical)

---

### A.2 — TYPOGRAPHY

**Heading classes:**
```
h1–h6            → Heading sizes (or .h1–.h6 on any element)
.display-1 to -6 → Large display headings
.lead            → Larger intro paragraph
.fs-1 to .fs-6  → Font size utilities
```

**Font weight:** `.fw-bold` (700), `.fw-semibold` (600), `.fw-medium` (500), `.fw-normal` (400), `.fw-light` (300)

**Text utilities:**
```
.fst-italic                    → Italic
.text-decoration-underline/line-through/none
.text-lowercase/uppercase/capitalize
.lh-1/sm/base/lg              → Line height
.text-truncate                 → Ellipsis overflow
.text-break                    → Word break
.text-wrap / .text-nowrap
```

---

### A.3 — SPACING

```
Scale:
0 → 0        m-0, p-0
1 → 0.25rem  (4px)   m-1, p-1, gap-1
2 → 0.5rem   (8px)   m-2, p-2, gap-2
3 → 1rem     (16px)  m-3, p-3, gap-3
4 → 1.5rem   (24px)  m-4, p-4, gap-4
5 → 3rem     (48px)  m-5, p-5, gap-5

Sides: t(top) b(bottom) s(start/left) e(end/right) x(horizontal) y(vertical)
Examples: mt-3, pb-4, px-2, my-5, ms-auto
```

---

### A.4 — DISPLAY & FLEX

**Display:**
```html
<div class="d-none d-md-block">Hidden on mobile, visible md+</div>
<div class="d-block d-lg-none">Visible below lg, hidden lg+</div>
<div class="d-none d-md-flex">Flex container from md+</div>
```

**Flex patterns:**
```html
<!-- Center both axes -->
<div class="d-flex justify-content-center align-items-center">Centered</div>

<!-- Space between -->
<div class="d-flex justify-content-between align-items-center">
  <span>Left</span><span>Right</span>
</div>

<!-- Column on mobile, row on desktop -->
<div class="d-flex flex-column flex-lg-row gap-3">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Push item to end -->
<div class="d-flex">
  <span>Left</span>
  <span class="ms-auto">Pushed right</span>
</div>
```

**Flex classes:** `.flex-row/column`, `.flex-wrap/nowrap`, `.justify-content-{start/end/center/between/around/evenly}`, `.align-items-{start/end/center/baseline/stretch}`, `.flex-grow-{0/1}`, `.flex-shrink-{0/1}`, `.order-{0-5}`

---

### A.5 — COLORS & BACKGROUNDS

**Text colors:** `.text-{primary/secondary/success/danger/warning/info/light/dark/body/muted/white}`, `.text-opacity-{25/50/75}`

**Backgrounds:** `.bg-{primary/secondary/success/danger/warning/info/light/dark/body/transparent/white}`, `.bg-opacity-{10/25/50/75}`, `.bg-gradient`

**Combined:** `.text-bg-{color}` (sets both text + bg with proper contrast)

---

### A.6 — BORDERS & ROUNDED

```
.border, .border-{top/end/bottom/start}
.border-0, .border-{top/end/bottom/start}-0
.border-{color}
.border-{1/2/3/4/5}              → Border width
.rounded, .rounded-{0/1/2/3/4/5/circle/pill}
.rounded-{top/end/bottom/start}
```

---

### A.7 — SIZING

```
.w-{25/50/75/100/auto}          → Width
.h-{25/50/75/100/auto}          → Height
.mw-100                         → Max-width 100%
.mh-100                         → Max-height 100%
.min-vw-100, .min-vh-100        → Viewport min
.vw-100, .vh-100                → Viewport full
```

---

### A.8 — POSITION

```
.position-{static/relative/absolute/fixed/sticky}
.top-{0/50/100}, .start-{0/50/100}, .bottom-{0/50/100}, .end-{0/50/100}
.translate-middle, .translate-middle-x, .translate-middle-y
.fixed-top, .fixed-bottom, .sticky-top, .sticky-bottom
.z-{n1/0/1/2/3}
```

---

### A.9 — SHADOWS & OPACITY

```
.shadow-none, .shadow-sm, .shadow, .shadow-lg
.opacity-{0/25/50/75/100}
```

---

### A.10 — COMPONENTS — NAVBAR

```html
<nav class="navbar navbar-expand-xl fixed-top" role="banner">
  <div class="container">
    <a class="navbar-brand p-0" href="/"><img src="logo.svg" alt="Logo" class="img-fluid"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
      data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-end" id="mainNav" tabindex="-1">
      <div class="offcanvas-header">
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav ms-auto align-items-xl-center">
          <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
          <li class="nav-item"><a class="btn btn-primary" href="#">CTA</a></li>
        </ul>
      </div>
    </div>
  </div>
</nav>
```

---

### A.11 — COMPONENTS — CARDS

```html
<div class="card h-100">
  <img src="image.webp" class="card-img-top" alt="Description">
  <div class="card-body d-flex flex-column">
    <h5 class="card-title">Title</h5>
    <p class="card-text">Description text.</p>
    <a href="#" class="btn btn-primary mt-auto">Action</a>
  </div>
</div>
```

---

### A.12 — COMPONENTS — ACCORDION

```html
<div class="accordion" id="faqAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button"
        data-bs-toggle="collapse" data-bs-target="#faq1"
        aria-expanded="false" aria-controls="faq1">
        Question?
      </button>
    </h2>
    <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body">Answer.</div>
    </div>
  </div>
</div>
```

---

### A.13 — COMPONENTS — MODAL

```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Open Modal
</button>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">Content</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
```

---

### A.14 — COMPONENTS — CAROUSEL

```html
<div id="heroCarousel" class="carousel slide" data-bs-ride="carousel"
  role="region" aria-roledescription="carousel" aria-label="Hero slides">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" role="group" aria-label="Slide 1 of 2">
      <img src="slide1.webp" class="d-block w-100" alt="Slide 1">
    </div>
    <div class="carousel-item" role="group" aria-label="Slide 2 of 2">
      <img src="slide2.webp" class="d-block w-100" alt="Slide 2">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
```

---

### A.15 — COMPONENTS — TABS & NAVS

```html
<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab"
      data-bs-target="#tab1" type="button" role="tab"
      aria-controls="tab1" aria-selected="true">Tab 1</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="tab2-tab" data-bs-toggle="tab"
      data-bs-target="#tab2" type="button" role="tab"
      aria-controls="tab2" aria-selected="false">Tab 2</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
    Tab 1 content
  </div>
  <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
    Tab 2 content
  </div>
</div>
```

**Nav variants:** `.nav-tabs`, `.nav-pills`, `.nav-underline`, `.nav-fill`, `.nav-justified`

---

### A.16 — COMPONENTS — OFFCANVAS

```html
<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
  data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
  Open
</button>
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample"
  aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Title</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">Content</div>
</div>
```

**Directions:** `.offcanvas-start` (left), `.offcanvas-end` (right), `.offcanvas-top`, `.offcanvas-bottom`

---

### A.17 — COMPONENTS — QUICK REFERENCE TABLE

| Component | Key classes | Data attributes |
|:----------|:-----------|:---------------|
| Accordion | `.accordion`, `.accordion-item`, `.accordion-button` | `data-bs-toggle="collapse"`, `data-bs-parent` |
| Alert | `.alert`, `.alert-{color}`, `.alert-dismissible` | `data-bs-dismiss="alert"` |
| Badge | `.badge`, `.text-bg-{color}`, `.rounded-pill` | — |
| Breadcrumb | `.breadcrumb`, `.breadcrumb-item` | — |
| Button | `.btn`, `.btn-{color}`, `.btn-outline-{color}`, `.btn-sm/lg` | — |
| Button group | `.btn-group`, `role="group"` | — |
| Card | `.card`, `.card-body`, `.card-title`, `.card-img-top` | — |
| Carousel | `.carousel`, `.carousel-inner`, `.carousel-item` | `data-bs-ride`, `data-bs-slide` |
| Collapse | `.collapse` | `data-bs-toggle="collapse"`, `data-bs-target` |
| Dropdown | `.dropdown`, `.dropdown-toggle`, `.dropdown-menu` | `data-bs-toggle="dropdown"` |
| List group | `.list-group`, `.list-group-item` | — |
| Modal | `.modal`, `.modal-dialog`, `.modal-content` | `data-bs-toggle="modal"`, `data-bs-target` |
| Navbar | `.navbar`, `.navbar-expand-{bp}`, `.navbar-nav` | — |
| Offcanvas | `.offcanvas`, `.offcanvas-{direction}` | `data-bs-toggle="offcanvas"` |
| Pagination | `.pagination`, `.page-item`, `.page-link` | — |
| Popover | — | `data-bs-toggle="popover"`, `data-bs-content` |
| Progress | `.progress`, `.progress-bar` | `role="progressbar"` |
| Scrollspy | — | `data-bs-spy="scroll"`, `data-bs-target` |
| Spinner | `.spinner-border`, `.spinner-grow` | — |
| Toast | `.toast`, `.toast-container` | `data-bs-autohide` |
| Tooltip | — | `data-bs-toggle="tooltip"`, `data-bs-title` |

---

### A.18 — FORMS

```html
<!-- Standard form group -->
<div class="mb-3">
  <label for="email" class="form-label">Email</label>
  <input type="email" class="form-control" id="email" placeholder="name@example.com">
</div>

<!-- Floating label -->
<div class="form-floating mb-3">
  <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com">
  <label for="floatingEmail">Email address</label>
</div>

<!-- Select -->
<select class="form-select" aria-label="Select example">
  <option selected>Choose...</option>
  <option value="1">One</option>
</select>

<!-- Switch -->
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitch">
  <label class="form-check-label" for="flexSwitch">Toggle</label>
</div>

<!-- Input group -->
<div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="text" class="form-control" aria-label="Amount">
</div>

<!-- Inline form with grid -->
<form class="row g-3">
  <div class="col-auto">
    <input type="text" class="form-control" placeholder="Name">
  </div>
  <div class="col-auto">
    <button type="submit" class="btn btn-primary">Submit</button>
  </div>
</form>
```

**Validation:** `.was-validated`, `.is-valid`, `.is-invalid`, `.valid-feedback`, `.invalid-feedback`

---

### A.19 — HELPERS

| Helper | Classes |
|:-------|:--------|
| Clearfix | `.clearfix` |
| Color + bg | `.text-bg-{color}` |
| Colored links | `.link-{color}`, `.link-opacity-*` |
| Focus ring | `.focus-ring` |
| Icon link | `.icon-link`, `.icon-link-hover` |
| Position | `.fixed-top`, `.fixed-bottom`, `.sticky-top`, `.sticky-bottom` |
| Ratio | `.ratio`, `.ratio-16x9`, `.ratio-4x3`, `.ratio-1x1` |
| Stacks | `.vstack`, `.hstack`, `.gap-*` |
| Stretched link | `.stretched-link` |
| Text truncation | `.text-truncate` |
| Vertical rule | `.vr` |
| Visually hidden | `.visually-hidden`, `.visually-hidden-focusable` |

**Stacks:**
```html
<!-- Vertical stack -->
<div class="vstack gap-3">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Horizontal stack -->
<div class="hstack gap-3">
  <div>Item 1</div>
  <div class="vr"></div>
  <div>Item 2</div>
  <div class="ms-auto">Right-aligned</div>
</div>
```

---

### A.20 — SASS CUSTOMIZATION

**Override variables BEFORE importing Bootstrap:**
```scss
$primary: #0065F2;
$grid-gutter-width: 48px;
$container-max-widths: (sm: 540px, md: 720px, lg: 960px, xl: 1180px, xxl: 1356px);

@import "bootstrap/scss/bootstrap";
```

**Key Sass mixins:**
```scss
// Responsive breakpoints
@include media-breakpoint-up(md)   { ... }  // min-width: 768px
@include media-breakpoint-down(lg) { ... }  // max-width: 991.98px
@include media-breakpoint-between(md, xl) { ... }
@include media-breakpoint-only(lg) { ... }

// Grid
@include make-container();
@include make-row();
@include make-col(6);
@include make-col-offset(3);

// Visually hidden
@include visually-hidden();
@include visually-hidden-focusable();

// Truncate text
@include text-truncate();

// Color contrast
color: color-contrast($bg-color);
```

**Adding custom utilities:**
```scss
$utilities: map-merge(
  $utilities,
  (
    "custom-property": (
      property: custom-property,
      class: custom,
      values: (1: value-1, 2: value-2)
    ),
  )
);
```

---

### A.21 — DOCS REFERENCE URLS

| Category | URL |
|:---------|:----|
| Getting Started | `https://getbootstrap.com/docs/5.3/getting-started/introduction/` |
| Customize / Sass | `https://getbootstrap.com/docs/5.3/customize/sass/` |
| Layout / Grid | `https://getbootstrap.com/docs/5.3/layout/grid/` |
| Layout / Breakpoints | `https://getbootstrap.com/docs/5.3/layout/breakpoints/` |
| Content / Typography | `https://getbootstrap.com/docs/5.3/content/typography/` |
| Forms | `https://getbootstrap.com/docs/5.3/forms/overview/` |
| Components | `https://getbootstrap.com/docs/5.3/components/accordion/` |
| Helpers | `https://getbootstrap.com/docs/5.3/helpers/clearfix/` |
| Utilities / Spacing | `https://getbootstrap.com/docs/5.3/utilities/spacing/` |
| Utilities / Flex | `https://getbootstrap.com/docs/5.3/utilities/flex/` |
| Utilities / Display | `https://getbootstrap.com/docs/5.3/utilities/display/` |
| Utilities API | `https://getbootstrap.com/docs/5.3/utilities/api/` |
| Migration | `https://getbootstrap.com/docs/5.3/migration/` |
