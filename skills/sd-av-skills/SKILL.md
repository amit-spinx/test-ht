---
name: sd-av-skills
description: Complete front-end development skill — Figma-to-Code pipeline with Bootstrap 5.3 reference. Handles design analysis, token mapping, semantic HTML generation, SCSS styling, JS interactions, responsive optimization, accessibility, and QA. Internal agency use.
argument-hint: <figma-url> or <bootstrap-topic> — e.g. "figma.com/design/...", "grid", "navbar", "spacing utilities"
---

# SD-AV Front-End Development Skill

> Internal agency skill — Figma-to-Code + Bootstrap 5.3 reference.
> Stack: HTML5 + Nunjucks, Bootstrap 5.3.3, SCSS, jQuery 3.7.1, Gulp 4

---

## MODE DETECTION

This skill operates in two modes based on input:

**MODE A — Figma-to-Code Pipeline**
Triggered when: user provides a Figma URL, says "implement design", "new page", "build from figma"
→ Execute the full pipeline (Parts 1–7)

**MODE B — Bootstrap Reference**
Triggered when: user asks about Bootstrap classes, components, utilities, SASS
→ Jump to Part 3 (Bootstrap 5.3 Reference)

---

## PIPELINE OVERVIEW

```
Part 1 → Analyze Figma & Extract Layout          (Input)
Part 2 → Map Tokens & Convert to Bootstrap Grid   (Planning)
Part 3 → Bootstrap 5.3 Technical Reference         (Foundation for Parts 4–6)
Part 4 → Generate Semantic HTML + Bootstrap        (Code Gen)
Part 5 → SCSS Styling + JS Interactions            (Code Gen)
Part 6 → Responsive Optimization                   (Code Gen)
Part 7 → Review / QA / Delivery                    (Output)
```

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 1 — ANALYZE FIGMA & EXTRACT LAYOUT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 1.1 — Parse the Figma URL

```
figma.com/design/:fileKey/:name?node-id=:nodeId
Convert nodeId dashes to colons: "123-456" → "123:456"
```

### 1.2 — Call MCP Tools

```
1. get_design_context(fileKey, nodeId)   ← primary: code + screenshot + hints
2. get_screenshot(fileKey, nodeId)       ← visual reference for comparison
```

### 1.3 — Explore the Project

Before writing code, read the project to understand its conventions:

1. **CLAUDE.md** — project-specific rules, tokens, file structure
2. **_variables.scss** — all color and spacing design tokens
3. **_custom.scss** — typography mixins (replace raw px values)
4. **_mixins.scss** — utility mixins (fluid, gradient, transform)
5. **main.scss** — what components/sections are already imported
6. **Existing pages** in `app/pages/` — match template structure exactly
7. **Existing components** in `assets/sass/components/` — reuse before creating new
8. **layout.html** — block structure (style, content, script)
9. **header.html / footer.html** — nav macro and footer partial usage

### 1.4 — Build Mental Model

Before touching code, document:

- [ ] Count and name every section (top to bottom)
- [ ] Identify repeating patterns → these become `cmn-*` components
- [ ] Spot shared components reusable on other pages
- [ ] Note all interactive states (hover, active, focus, open, disabled)
- [ ] Check for animation/motion notes in the design or handoff doc (Google Doc)
- [ ] Identify breakpoints present (desktop 1440 / tablet 768 / mobile 375)

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 2 — MAP TOKENS & CONVERT TO BOOTSTRAP GRID
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 2.1 — Map ALL Figma Styles to Project Tokens

Map **every** Figma style — not just what's used on the current page.

**Colors → `_variables.scss`**

Find the closest match. If no match exists, add a new variable.

| Figma hex | Typical variable |
|:----------|:-----------------|
| Dark brand color | `$primary-color` or `$orange-950` etc. |
| White #FFFFFF | `$white` or `$white-color` |
| Grays | `$gray-color-10` through `$gray-color-100` |
| Accent colors | `$green-color`, `$blue-color`, etc. |

Never leave a hex value unmapped. Never hardcode hex in SCSS.

**Typography → `_custom.scss` mixins**

Never output raw `px` for font sizes. Map to project mixins:

| Figma size | Typical mixin |
|:-----------|:-------------|
| 60–162px display | `@include display-xxl` or `@include display-xl` |
| 38–50px heading | `@include display-l` or `@include display-m` |
| 24–32px heading | `@include display-s` or `@include display-xs` |
| 20px body | `@include body-xl` |
| 18px body | `@include body-l` |
| 16px body | `@include body-m` |
| 14px body | `@include body-s` |
| 12px caption | `@include body-xs` |

Read the project's `_custom.scss` to confirm exact mixin names — they vary per project.

**Spacing → exact Figma pixel values**

```
Do NOT round to Bootstrap scale.
Use the exact pixel value from Figma.
Always comment the source:
  padding: 72px 0; // Figma: hero section padding
  margin-bottom: 36px; // Figma: title to subtitle gap
  gap: 28px; // Figma: card grid gap
```

### 2.2 — Convert Layout to Bootstrap Grid

| Figma layout | Bootstrap pattern |
|:-------------|:-----------------|
| Max content width | `.container` (uses project's container-max-widths) |
| Full-bleed background | `<section>` background with `.container` inside |
| Side-by-side columns | `.row` + `.col-12 .col-lg-6` |
| 3-column grid | `.row` + `.col-12 .col-md-6 .col-lg-4` |
| 4-column grid | `.row` + `.col-12 .col-sm-6 .col-lg-4 .col-xl-3` |
| Offset content | `.col-lg-6 .offset-lg-3` |
| Reordered columns | `.order-2 .order-lg-1` |

### 2.3 — Determine File Targets

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
## PART 3 — BOOTSTRAP 5.3.3 TECHNICAL REFERENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> Technical foundation for Parts 4 (HTML), 5 (SCSS/JS), and 6 (Responsive).
> Adapt all examples to project stack (Nunjucks, SCSS, jQuery, BEM).

---

### 3.1 — LAYOUT: Breakpoints, Containers & Grid

**Breakpoints:**
```
xs:  0        col-*      (default — mobile first)
sm:  ≥576px   col-sm-*   @include media-breakpoint-up(sm)
md:  ≥768px   col-md-*   @include media-breakpoint-up(md)
lg:  ≥992px   col-lg-*   @include media-breakpoint-up(lg)
xl:  ≥1200px  col-xl-*   @include media-breakpoint-up(xl)
xxl: ≥1400px  col-xxl-*  @include media-breakpoint-up(xxl)
```

**Containers:**
```
.container       → sm:540 md:720 lg:960 xl:1140 xxl:1320
.container-fluid → 100% at all breakpoints
.container-{bp}  → 100% until breakpoint, then fixed
```

**Grid:**
```html
<div class="row">
  <div class="col-12 col-md-6 col-lg-4">Equal cols</div>
</div>
<div class="row">
  <div class="col-12 col-lg-4">Sidebar</div>
  <div class="col-12 col-lg-8">Content</div>
</div>
<div class="row">
  <div class="col-lg-6 offset-lg-3">Centered</div>
</div>
<div class="row">
  <div class="col-12 col-lg-6 order-2 order-lg-1">Desktop first</div>
  <div class="col-12 col-lg-6 order-1 order-lg-2">Mobile first</div>
</div>
```

**Gutters:** `.g-{0-5}`, `.gx-{0-5}` (horizontal), `.gy-{0-5}` (vertical)

---

### 3.2 — SPACING

```
0 → 0         m-0, p-0
1 → 0.25rem   (4px)    m-1, p-1, gap-1
2 → 0.5rem    (8px)    m-2, p-2, gap-2
3 → 1rem      (16px)   m-3, p-3, gap-3
4 → 1.5rem    (24px)   m-4, p-4, gap-4
5 → 3rem      (48px)   m-5, p-5, gap-5

Sides: t(top) b(bottom) s(start) e(end) x(horizontal) y(vertical)
Examples: mt-3, pb-4, px-2, my-5, ms-auto
```

---

### 3.3 — DISPLAY & FLEX

```html
<!-- Responsive display -->
<div class="d-none d-md-block">Hidden mobile, visible md+</div>
<div class="d-block d-lg-none">Visible below lg</div>
<div class="d-none d-md-flex">Flex from md+</div>

<!-- Center -->
<div class="d-flex justify-content-center align-items-center">Centered</div>

<!-- Space between -->
<div class="d-flex justify-content-between align-items-center">
  <span>Left</span><span>Right</span>
</div>

<!-- Stack on mobile, row on desktop -->
<div class="d-flex flex-column flex-lg-row gap-3">...</div>

<!-- Push to end -->
<div class="d-flex">
  <span>Left</span>
  <span class="ms-auto">Right</span>
</div>
```

**All flex classes:** `.flex-row/column`, `.flex-wrap/nowrap`, `.justify-content-{start/end/center/between/around/evenly}`, `.align-items-{start/end/center/baseline/stretch}`, `.flex-grow-{0/1}`, `.flex-shrink-{0/1}`, `.order-{0-5}`, `.align-self-{start/end/center/baseline/stretch}`

---

### 3.4 — TYPOGRAPHY

```
h1–h6 / .h1–.h6         → Heading sizes
.display-1 to .display-6 → Large display headings
.lead                    → Larger intro paragraph
.fs-1 to .fs-6          → Font size utilities
.fw-bold/semibold/medium/normal/light → Weight
.fst-italic              → Italic
.text-decoration-underline/line-through/none
.text-lowercase/uppercase/capitalize
.lh-1/sm/base/lg        → Line height
.text-truncate           → Ellipsis overflow
.text-break              → Word break
.text-wrap / .text-nowrap
```

---

### 3.5 — COLORS & BACKGROUNDS

```
Text:   .text-{primary/secondary/success/danger/warning/info/light/dark/body/muted/white}
        .text-opacity-{25/50/75}
BG:     .bg-{primary/secondary/success/danger/warning/info/light/dark/body/transparent/white}
        .bg-opacity-{10/25/50/75}  .bg-gradient
Both:   .text-bg-{color}  (sets text + bg with contrast)
```

---

### 3.6 — BORDERS, SIZING & POSITION

**Borders & Rounded:**
```
.border  .border-{top/end/bottom/start}  .border-0  .border-{color}  .border-{1-5}
.rounded  .rounded-{0-5/circle/pill}  .rounded-{top/end/bottom/start}
```

**Sizing:**
```
.w-{25/50/75/100/auto}    .h-{25/50/75/100/auto}
.mw-100  .mh-100          .vw-100  .vh-100  .min-vw-100  .min-vh-100
```

**Position & Z-index:**
```
.position-{static/relative/absolute/fixed/sticky}
.top-{0/50/100}  .start-{0/50/100}  .bottom-{0/50/100}  .end-{0/50/100}
.translate-middle  .translate-middle-x  .translate-middle-y
.fixed-top  .fixed-bottom  .sticky-top  .sticky-bottom
.z-{n1/0/1/2/3}
```

**Shadows & Opacity:**
```
.shadow-none  .shadow-sm  .shadow  .shadow-lg
.opacity-{0/25/50/75/100}
.overflow-{auto/hidden/visible/scroll}  .overflow-x-*  .overflow-y-*
```

---

### 3.7 — COMPONENTS QUICK REFERENCE

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
| Navs/Tabs | `.nav`, `.nav-tabs`, `.nav-pills`, `.nav-link` | `data-bs-toggle="tab"` |
| Offcanvas | `.offcanvas`, `.offcanvas-{direction}` | `data-bs-toggle="offcanvas"` |
| Pagination | `.pagination`, `.page-item`, `.page-link` | — |
| Progress | `.progress`, `.progress-bar` | `role="progressbar"` |
| Spinner | `.spinner-border`, `.spinner-grow` | — |
| Toast | `.toast`, `.toast-container` | `data-bs-autohide` |
| Tooltip | — | `data-bs-toggle="tooltip"`, `data-bs-title` |
| Popover | — | `data-bs-toggle="popover"`, `data-bs-content` |

---

### 3.8 — COMPONENT CODE PATTERNS

**Navbar + Offcanvas:**
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

**Card:**
```html
<div class="card h-100">
  <img src="image.webp" class="card-img-top" alt="Description">
  <div class="card-body d-flex flex-column">
    <h5 class="card-title">Title</h5>
    <p class="card-text">Description.</p>
    <a href="#" class="btn btn-primary mt-auto">Action</a>
  </div>
</div>
```

**Accordion:**
```html
<div class="accordion" id="faqAccordion">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button"
        data-bs-toggle="collapse" data-bs-target="#faq1"
        aria-expanded="false" aria-controls="faq1">Question?</button>
    </h2>
    <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
      <div class="accordion-body">Answer.</div>
    </div>
  </div>
</div>
```

**Modal:**
```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal1">Open</button>
<div class="modal fade" id="modal1" tabindex="-1" aria-labelledby="modal1Label" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modal1Label">Title</h5>
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

**Carousel:**
```html
<div id="heroCarousel" class="carousel slide" data-bs-ride="carousel"
  role="region" aria-roledescription="carousel" aria-label="Hero slides">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0"
      class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"
      aria-label="Slide 2"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active" role="group" aria-label="Slide 1 of 2">
      <img src="slide1.webp" class="d-block w-100" alt="Slide 1">
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

**Tabs:**
```html
<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab"
      data-bs-target="#tab1" type="button" role="tab"
      aria-controls="tab1" aria-selected="true">Tab 1</button>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
    Content
  </div>
</div>
```

---

### 3.9 — FORMS

```html
<!-- Standard -->
<div class="mb-3">
  <label for="email" class="form-label">Email</label>
  <input type="email" class="form-control" id="email">
</div>

<!-- Floating label -->
<div class="form-floating mb-3">
  <input type="email" class="form-control" id="floatingEmail" placeholder="email">
  <label for="floatingEmail">Email</label>
</div>

<!-- Select -->
<select class="form-select" aria-label="Select">
  <option selected>Choose...</option>
</select>

<!-- Switch -->
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="sw1">
  <label class="form-check-label" for="sw1">Toggle</label>
</div>

<!-- Input group -->
<div class="input-group mb-3">
  <span class="input-group-text">$</span>
  <input type="text" class="form-control" aria-label="Amount">
</div>
```

**Validation:** `.was-validated`, `.is-valid`, `.is-invalid`, `.valid-feedback`, `.invalid-feedback`

---

### 3.10 — HELPERS

```
Stacks:         .vstack  .hstack  .gap-{0-5}
Stretched link: .stretched-link
Ratio:          .ratio  .ratio-{16x9/4x3/1x1/21x9}
Visually hidden: .visually-hidden  .visually-hidden-focusable
Vertical rule:  .vr
Text truncate:  .text-truncate
Clearfix:       .clearfix
Icon link:      .icon-link  .icon-link-hover
Focus ring:     .focus-ring
```

---

### 3.11 — SASS CUSTOMIZATION

```scss
// Override BEFORE importing Bootstrap
$primary: #D35B04;
$grid-gutter-width: 48px;
$container-max-widths: (sm: 540px, md: 720px, lg: 960px, xl: 1180px, xxl: 1356px);

@import "bootstrap/scss/bootstrap";
```

**Key mixins:**
```scss
@include media-breakpoint-up(md)   { ... }  // min-width: 768px
@include media-breakpoint-down(lg) { ... }  // max-width: 991.98px
@include media-breakpoint-between(md, xl) { ... }
@include media-breakpoint-only(lg) { ... }
@include make-col(6);
@include make-col-offset(3);
@include visually-hidden();
@include text-truncate();
```

---

### 3.12 — DOCS QUICK LINKS

| Category | URL |
|:---------|:----|
| Getting Started | `https://getbootstrap.com/docs/5.3/getting-started/introduction/` |
| Sass Customize | `https://getbootstrap.com/docs/5.3/customize/sass/` |
| Grid | `https://getbootstrap.com/docs/5.3/layout/grid/` |
| Breakpoints | `https://getbootstrap.com/docs/5.3/layout/breakpoints/` |
| Typography | `https://getbootstrap.com/docs/5.3/content/typography/` |
| Forms | `https://getbootstrap.com/docs/5.3/forms/overview/` |
| Components | `https://getbootstrap.com/docs/5.3/components/accordion/` |
| Helpers | `https://getbootstrap.com/docs/5.3/helpers/clearfix/` |
| Spacing | `https://getbootstrap.com/docs/5.3/utilities/spacing/` |
| Flex | `https://getbootstrap.com/docs/5.3/utilities/flex/` |
| Display | `https://getbootstrap.com/docs/5.3/utilities/display/` |
| Utility API | `https://getbootstrap.com/docs/5.3/utilities/api/` |
| Accessibility | `https://getbootstrap.com/docs/5.3/getting-started/accessibility/` |

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 4 — GENERATE SEMANTIC HTML + BOOTSTRAP CLASSES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> Use Part 3 reference for: grid classes (3.1), display/flex (3.3), component patterns (3.8), forms (3.9)

### 4.1 — Build Order

```
1. Header (nav macro)
2. Sections — one by one, top to bottom (matching Figma layer order)
3. Footer (include partial)
```

Do NOT build the full skeleton first. Complete each section's HTML before moving to the next.

### 4.2 — Page Template

```html
{% extends "layout.html" %}
{% from "partials/header.html" import nav %}

{% block style %}
<link rel="stylesheet" href="css/[pagename].css">
{% endblock %}

{% block content %}
{{ nav() }}
<main role="main">

  <section class="[pagename]-[sectionname]" aria-label="[description]">
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

### 4.3 — HTML Rules

- Wrap full page in `<div class="page-wrapper">`
- Every Figma frame/section → one `<section class="[pagename]-[sectionname]">`
- Semantic tags: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<aside>`, `<article>`
- Bootstrap grid for ALL layout — no CSS floats, no custom grid (see **3.1**)
- Column classes: `col-12 col-lg-6`, `col-12 col-lg-4`, etc.
- Images: `<img src="assets/img/0.gif" data-src="[real.jpg]" alt="[desc]">` (lazy-load)
- Icons: `<svg><use xlink:href="#iconName"></use></svg>`
- Buttons: `<a href="#" class="btn btn-primary">` or project's button classes (see **3.7**)
- JS hooks: `data-action="[name]"` — never bind to CSS classes
- **No inline styles — ever**
- **No inline onclick — ever**

### 4.4 — Accessibility (WCAG AA — required)

- `aria-label` on all interactive and landmark elements
- `aria-expanded` + `aria-controls` on toggles/accordions/dropdowns
- `role="region"` + `aria-roledescription="carousel"` on carousels
- `role="group"` + `aria-label="Slide N of N"` on carousel slides
- `type="button"` on all `<button>` elements
- Decorative images: `alt=""` + `aria-hidden="true"`
- `<nav aria-label="...">` for navigation — not bare `<div>`
- Form inputs: `<label for="id">` always paired with `<input id="id">`
- Heading hierarchy: h1 → h2 → h3 (no skipping)
- Single `<h1>` per page
- Color contrast: 4.5:1 normal text, 3:1 large text
- Touch targets: minimum 44x44px on mobile
- Focus indicators visible on all interactive elements

### 4.5 — Component Decision Rule

```
Will this block appear on other pages?
  YES → create as cmn-* shared component
  NO  → page-specific section class
```

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 5 — SCSS STYLING + JS INTERACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> Use Part 3 reference for: spacing utilities (3.2), SASS mixins (3.11), responsive breakpoints (3.1)

### 5.1 — SCSS (Desktop-First)

Style the desktop layout first (matching Figma's 1440px frame), then adjust down.

```scss
// assets/sass/pages/[pagename].scss
@import '../main';

.[pagename] {

  &-[sectionname] {
    padding: 100px 0; // Figma: [section] vertical padding

    &__title    { @include display-xl; color: $orange-700; }
    &__subtitle { @include display-s; color: $orange-900; }
    &__body     { @include body-l; }

    &__cta {
      &:hover { color: $green-600; }
    }

    @include media-breakpoint-down(lg) {
      padding: 60px 0;
    }
  }

}
```

**SCSS Rules:**
- First line: `@import '../main';`
- ALL styles scoped under `.[pagename]` — no global selectors
- BEM naming: `&__element`, `&--modifier` inside parent
- `@include` for ALL font sizes — never raw px for typography
- `$variable` for ALL colors — never hardcoded hex
- Spacing: exact Figma pixel values with `// Figma: [element name]` comment
- Responsive: `@include media-breakpoint-down(lg)` / `media-breakpoint-down(md)` (see **3.11**)
- No `!important` outside `_overrides.scss`
- No page-specific styles in `_layout.scss`
- New shared component → `_cmn-[name].scss` + import in `main.scss`

### 5.2 — JavaScript

```javascript
// assets/js/pages/[pagename].js
$(document).ready(function () {

  // [Section] — [what it does]
  function initFeatureName() {
    $('[data-action="toggle"]').on('click', function () {
      $(this).closest('.item').toggleClass('is-open');
    });
  }

  initFeatureName();

});
```

**Common Interactions:**

| Interaction | Library/Approach |
|:------------|:----------------|
| Sliders/Carousels | Slick / Swiper |
| Accordions | Bootstrap Collapse or custom toggle (see **3.8**) |
| Scroll reveal | WOW.js / AOS / custom IntersectionObserver |
| Modals | Bootstrap Modal (see **3.8**) |
| Tabs | Bootstrap Tabs (see **3.8**) |
| Sticky headers | Custom scroll listener |
| Form validation | jQuery Validate or custom |
| Counters | Custom with IntersectionObserver trigger |
| Toggles | Custom class toggle (`is-active`, `is-open`) |

**JS Rules:**
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
## PART 6 — RESPONSIVE OPTIMIZATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

> Use Part 3 reference for: breakpoints (3.1), display/flex responsive (3.3), spacing (3.2)

### Approach: Desktop-first, adjust downward

After desktop styling is complete, test and adjust at each breakpoint:

```
1440px → Desktop (primary design frame)
1200px → Large desktop adjustments
 992px → Tablet landscape (PRIMARY MOBILE SWITCH)
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
```

```html
<!-- Column reorder (see 3.1 Grid) -->
<div class="col-12 col-lg-6 order-2 order-lg-1">Text (first on desktop)</div>

<!-- Hide/show (see 3.3 Display) -->
<div class="d-none d-lg-block">Desktop only</div>
<div class="d-block d-lg-none">Mobile only</div>

<!-- Stack direction (see 3.3 Flex) -->
<div class="d-flex flex-column flex-lg-row gap-3">...</div>

<!-- Images -->
<img class="img-fluid w-100" />
```

### Responsive Checklist

- [ ] All columns stack properly below 992px
- [ ] No horizontal scroll at any breakpoint
- [ ] Touch targets minimum 44x44px on mobile
- [ ] Text readable without zooming at 375px
- [ ] Images scale proportionally
- [ ] Spacing reduces appropriately on mobile
- [ ] Nav collapses to hamburger/offcanvas
- [ ] Typography scales via fluid() mixins automatically

---

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## PART 7 — REVIEW / QA / DELIVERY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

### 7.1 — Visual Match (Figma Comparison)

- [ ] Layout matches Figma at 1440px desktop
- [ ] Layout matches Figma at 375px mobile
- [ ] All spacing (padding, margin, gap) matches exact Figma values
- [ ] All alignment matches (left, center, right, baseline)
- [ ] All colors match using `$variables` — no bare hex
- [ ] All font sizes use `@include` mixins — no raw px
- [ ] All font families correct
- [ ] Hover / active / focus states implemented per design
- [ ] Animations match dev handoff doc notes

### 7.2 — Browser Testing

- [ ] Chrome — desktop, tablet, mobile
- [ ] Safari — desktop, tablet, mobile (iOS)
- [ ] Firefox — desktop, tablet, mobile
- [ ] Edge — desktop, tablet, mobile
- [ ] No layout breaks at any viewport 375px–1440px

### 7.3 — Code Quality

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

### 7.4 — Accessibility (WCAG AA)

- [ ] All images have meaningful `alt` text
- [ ] Color contrast ratio meets AA (4.5:1 normal, 3:1 large)
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus indicators visible
- [ ] `aria-label` on interactive elements without visible text
- [ ] `aria-expanded` / `aria-controls` on toggles, accordions, dropdowns
- [ ] Form inputs have associated `<label for="id">`
- [ ] Skip navigation link present
- [ ] Heading hierarchy logical (h1 → h2 → h3, no skipping)
- [ ] No content conveyed by color alone

### 7.5 — SEO Standards

- [ ] Single `<h1>` per page
- [ ] Semantic HTML structure (`<main>`, `<section>`, `<nav>`, `<article>`)
- [ ] Meta title and description present
- [ ] `alt` text on all images
- [ ] Clean URL structure
- [ ] No broken links

### 7.6 — Performance

| Device | Lighthouse Target |
|:-------|:-----------------|
| Mobile | 60+ |
| Desktop | 80+ |

- [ ] Images optimized (WebP, compressed, correct dimensions)
- [ ] Lazy loading on below-fold images (`0.gif` + `data-src`)
- [ ] CSS/JS minified (Gulp handles)
- [ ] No render-blocking resources
- [ ] Fonts preloaded or `font-display: swap`
- [ ] No unnecessary vendor libraries

### 7.7 — Delivery

```
1. npm run build    → /dist (no errors)
2. npm run w3cjs    → HTML validation passes
3. All 7.1–7.6 checklists green
4. Code committed with descriptive message
5. No console errors in any browser
6. No 404s for assets
```

### Deliverables (output in this order)

1. **Token mapping table** — Figma value → project `$variable` / `@include`
2. **File manifest** — new files / modified files
3. **_variables.scss additions** (if any)
4. **HTML** — complete Nunjucks template
5. **SCSS** — complete page styles
6. **JS** — complete interactions
7. **Component SCSS** — if new shared component
8. **Config updates** — project.json + sitemap.json
