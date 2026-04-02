---
name: skill-bootstrap5
description: Bootstrap 5.3 comprehensive reference guide. Use when the user asks about Bootstrap classes, components, utilities, grid, forms, helpers, layout, or SASS customization. Triggers on "bootstrap help", "bs5 reference", "bootstrap classes", "what bootstrap class", "how to use bootstrap", or any Bootstrap 5.3 usage question.
argument-hint: <topic> [sub-topic] — e.g. "grid", "navbar", "spacing utilities", "form validation"
---

# Bootstrap 5.3.3 — Complete Reference Skill

You are a Bootstrap 5.3 expert. When invoked, look up the relevant Bootstrap documentation and provide accurate, production-ready guidance with code examples.

## How to Use This Skill

1. User asks about a Bootstrap topic → match it to a section below
2. Fetch the official docs page for the most accurate, up-to-date info
3. Provide concise examples adapted to the user's project conventions (check CLAUDE.md)

**Always adapt examples to the project's stack** (Nunjucks, SCSS, jQuery, BEM naming).

---

## REFERENCE NAVIGATION INDEX

Use this index to find the right docs page. When answering, fetch the relevant URL for the latest details.

---

### 1. GETTING STARTED

| Topic | URL | When to reference |
|:------|:----|:------------------|
| Introduction | `https://getbootstrap.com/docs/5.3/getting-started/introduction/` | Setup, CDN links, starter template |
| Download | `https://getbootstrap.com/docs/5.3/getting-started/download/` | Package manager install, compiled vs source |
| Contents | `https://getbootstrap.com/docs/5.3/getting-started/contents/` | What's included in Bootstrap package |
| Browsers & devices | `https://getbootstrap.com/docs/5.3/getting-started/browsers-devices/` | Browser support, mobile rendering |
| JavaScript | `https://getbootstrap.com/docs/5.3/getting-started/javascript/` | JS plugin usage, data attributes, jQuery |
| Webpack | `https://getbootstrap.com/docs/5.3/getting-started/webpack/` | Webpack bundling setup |
| Parcel | `https://getbootstrap.com/docs/5.3/getting-started/parcel/` | Parcel bundling setup |
| Vite | `https://getbootstrap.com/docs/5.3/getting-started/vite/` | Vite bundling setup |
| Accessibility | `https://getbootstrap.com/docs/5.3/getting-started/accessibility/` | ARIA, screen readers, focus management |
| RFS | `https://getbootstrap.com/docs/5.3/getting-started/rfs/` | Responsive font sizing engine |
| RTL | `https://getbootstrap.com/docs/5.3/getting-started/rtl/` | Right-to-left language support |
| Contribute | `https://getbootstrap.com/docs/5.3/getting-started/contribute/` | Contributing to Bootstrap |

---

### 2. CUSTOMIZE

| Topic | URL | When to reference |
|:------|:----|:------------------|
| Overview | `https://getbootstrap.com/docs/5.3/customize/overview/` | Customization strategies |
| Sass | `https://getbootstrap.com/docs/5.3/customize/sass/` | Sass variables, maps, mixins, file structure |
| Options | `https://getbootstrap.com/docs/5.3/customize/options/` | `$enable-*` feature toggles |
| Color | `https://getbootstrap.com/docs/5.3/customize/color/` | Color system, theme colors, tints/shades |
| Color modes | `https://getbootstrap.com/docs/5.3/customize/color-modes/` | Dark mode, `data-bs-theme`, custom modes |
| Components | `https://getbootstrap.com/docs/5.3/customize/components/` | Component customization via Sass/CSS vars |
| CSS variables | `https://getbootstrap.com/docs/5.3/customize/css-variables/` | Root vars, component vars, overriding |
| Optimize | `https://getbootstrap.com/docs/5.3/customize/optimize/` | Tree-shaking, lean imports, production |

**Quick Sass reference:**
```scss
// Override BEFORE importing Bootstrap
$primary: #0065F2;
$grid-gutter-width: 48px;
$container-max-widths: (sm: 540px, md: 720px, lg: 960px, xl: 1180px, xxl: 1356px);

@import "bootstrap/scss/bootstrap";
```

---

### 3. LAYOUT

| Topic | URL | When to reference |
|:------|:----|:------------------|
| Breakpoints | `https://getbootstrap.com/docs/5.3/layout/breakpoints/` | Responsive breakpoints, media queries |
| Containers | `https://getbootstrap.com/docs/5.3/layout/containers/` | `.container`, `.container-fluid`, `.container-{bp}` |
| Grid | `https://getbootstrap.com/docs/5.3/layout/grid/` | 12-column grid, `.row`, `.col-*` |
| Columns | `https://getbootstrap.com/docs/5.3/layout/columns/` | Column alignment, ordering, offsetting |
| Gutters | `https://getbootstrap.com/docs/5.3/layout/gutters/` | `.g-*`, `.gx-*`, `.gy-*`, no gutters |
| Utilities | `https://getbootstrap.com/docs/5.3/layout/utilities/` | Layout utility classes |
| Z-index | `https://getbootstrap.com/docs/5.3/layout/z-index/` | Stacking context, z-index scale |
| CSS Grid | `https://getbootstrap.com/docs/5.3/layout/css-grid/` | Native CSS Grid with Bootstrap |

**Breakpoint quick reference:**
```
xs:  0       (default — mobile first)
sm:  ≥576px   col-sm-*    @include media-breakpoint-up(sm)
md:  ≥768px   col-md-*    @include media-breakpoint-up(md)
lg:  ≥992px   col-lg-*    @include media-breakpoint-up(lg)
xl:  ≥1200px  col-xl-*    @include media-breakpoint-up(xl)
xxl: ≥1400px  col-xxl-*   @include media-breakpoint-up(xxl)
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

**Container sizes:**
```
.container      → sm:540 md:720 lg:960 xl:1140 xxl:1320
.container-fluid → 100% at all breakpoints
.container-{bp}  → 100% until breakpoint, then fixed
```

---

### 4. CONTENT

| Topic | URL | When to reference |
|:------|:----|:------------------|
| Reboot | `https://getbootstrap.com/docs/5.3/content/reboot/` | CSS reset, base element styles |
| Typography | `https://getbootstrap.com/docs/5.3/content/typography/` | Headings, display, lead, lists, text |
| Images | `https://getbootstrap.com/docs/5.3/content/images/` | `.img-fluid`, `.img-thumbnail`, `<picture>` |
| Tables | `https://getbootstrap.com/docs/5.3/content/tables/` | `.table`, striped, bordered, responsive |
| Figures | `https://getbootstrap.com/docs/5.3/content/figures/` | `<figure>`, `<figcaption>` |

**Typography classes:**
```
h1–h6            → Heading sizes (or .h1–.h6 on any element)
.display-1 to -6 → Large display headings
.lead            → Larger intro paragraph
.fs-1 to .fs-6  → Font size utilities
.fw-bold/semibold/medium/normal/light → Font weight
.fst-italic      → Italic
.text-decoration-underline/line-through/none
.text-lowercase/uppercase/capitalize
.lh-1/sm/base/lg → Line height
```

---

### 5. FORMS

| Topic | URL | When to reference |
|:------|:----|:------------------|
| Overview | `https://getbootstrap.com/docs/5.3/forms/overview/` | Form structure, `.mb-3` groups |
| Form control | `https://getbootstrap.com/docs/5.3/forms/form-control/` | `.form-control`, sizing, readonly, plaintext |
| Select | `https://getbootstrap.com/docs/5.3/forms/select/` | `.form-select`, sizing, multiple |
| Checks & radios | `https://getbootstrap.com/docs/5.3/forms/checks-radios/` | `.form-check`, switches, inline, toggle buttons |
| Range | `https://getbootstrap.com/docs/5.3/forms/range/` | `.form-range`, min/max/steps |
| Input group | `https://getbootstrap.com/docs/5.3/forms/input-group/` | `.input-group`, addons, buttons |
| Floating labels | `https://getbootstrap.com/docs/5.3/forms/floating-labels/` | `.form-floating` |
| Layout | `https://getbootstrap.com/docs/5.3/forms/layout/` | Form grid, horizontal forms, auto-sizing |
| Validation | `https://getbootstrap.com/docs/5.3/forms/validation/` | `.was-validated`, custom feedback |

**Form patterns:**
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

---

### 6. COMPONENTS

| Component | URL | Key classes |
|:----------|:----|:-----------|
| Accordion | `https://getbootstrap.com/docs/5.3/components/accordion/` | `.accordion`, `.accordion-item`, `.accordion-button`, `data-bs-toggle="collapse"` |
| Alerts | `https://getbootstrap.com/docs/5.3/components/alerts/` | `.alert`, `.alert-{color}`, `.alert-dismissible` |
| Badge | `https://getbootstrap.com/docs/5.3/components/badge/` | `.badge`, `.text-bg-{color}`, `.rounded-pill` |
| Breadcrumb | `https://getbootstrap.com/docs/5.3/components/breadcrumb/` | `.breadcrumb`, `.breadcrumb-item`, `.active` |
| Buttons | `https://getbootstrap.com/docs/5.3/components/buttons/` | `.btn`, `.btn-{color}`, `.btn-outline-{color}`, `.btn-sm/lg` |
| Button group | `https://getbootstrap.com/docs/5.3/components/button-group/` | `.btn-group`, `.btn-toolbar`, `role="group"` |
| Card | `https://getbootstrap.com/docs/5.3/components/card/` | `.card`, `.card-body`, `.card-title`, `.card-img-top` |
| Carousel | `https://getbootstrap.com/docs/5.3/components/carousel/` | `.carousel`, `.carousel-inner`, `.carousel-item`, `data-bs-ride` |
| Close button | `https://getbootstrap.com/docs/5.3/components/close-button/` | `.btn-close`, `data-bs-dismiss` |
| Collapse | `https://getbootstrap.com/docs/5.3/components/collapse/` | `.collapse`, `data-bs-toggle="collapse"`, `data-bs-target` |
| Dropdowns | `https://getbootstrap.com/docs/5.3/components/dropdowns/` | `.dropdown`, `.dropdown-toggle`, `.dropdown-menu`, `.dropdown-item` |
| List group | `https://getbootstrap.com/docs/5.3/components/list-group/` | `.list-group`, `.list-group-item`, `.list-group-item-action` |
| Modal | `https://getbootstrap.com/docs/5.3/components/modal/` | `.modal`, `.modal-dialog`, `.modal-content`, `data-bs-toggle="modal"` |
| Navbar | `https://getbootstrap.com/docs/5.3/components/navbar/` | `.navbar`, `.navbar-expand-{bp}`, `.navbar-brand`, `.navbar-nav` |
| Navs & tabs | `https://getbootstrap.com/docs/5.3/components/navs-tabs/` | `.nav`, `.nav-tabs`, `.nav-pills`, `.nav-link`, `data-bs-toggle="tab"` |
| Offcanvas | `https://getbootstrap.com/docs/5.3/components/offcanvas/` | `.offcanvas`, `.offcanvas-{start/end/top/bottom}`, `data-bs-toggle="offcanvas"` |
| Pagination | `https://getbootstrap.com/docs/5.3/components/pagination/` | `.pagination`, `.page-item`, `.page-link` |
| Placeholders | `https://getbootstrap.com/docs/5.3/components/placeholders/` | `.placeholder`, `.placeholder-glow`, `.placeholder-wave` |
| Popovers | `https://getbootstrap.com/docs/5.3/components/popovers/` | `data-bs-toggle="popover"`, `data-bs-content` |
| Progress | `https://getbootstrap.com/docs/5.3/components/progress/` | `.progress`, `.progress-bar`, `role="progressbar"` |
| Scrollspy | `https://getbootstrap.com/docs/5.3/components/scrollspy/` | `data-bs-spy="scroll"`, `data-bs-target` |
| Spinners | `https://getbootstrap.com/docs/5.3/components/spinners/` | `.spinner-border`, `.spinner-grow`, `.spinner-border-sm` |
| Toasts | `https://getbootstrap.com/docs/5.3/components/toasts/` | `.toast`, `.toast-container`, `data-bs-autohide` |
| Tooltips | `https://getbootstrap.com/docs/5.3/components/tooltips/` | `data-bs-toggle="tooltip"`, `data-bs-title` |

**Most-used component patterns:**

```html
<!-- Navbar with offcanvas mobile -->
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

<!-- Card -->
<div class="card h-100">
  <img src="image.webp" class="card-img-top" alt="Description">
  <div class="card-body d-flex flex-column">
    <h5 class="card-title">Title</h5>
    <p class="card-text">Description text.</p>
    <a href="#" class="btn btn-primary mt-auto">Action</a>
  </div>
</div>

<!-- Accordion -->
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

<!-- Modal -->
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

<!-- Carousel -->
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

### 7. HELPERS

| Helper | URL | Key classes |
|:-------|:----|:-----------|
| Clearfix | `https://getbootstrap.com/docs/5.3/helpers/clearfix/` | `.clearfix` |
| Color & background | `https://getbootstrap.com/docs/5.3/helpers/color-background/` | `.text-bg-{color}` (sets both text + bg) |
| Colored links | `https://getbootstrap.com/docs/5.3/helpers/colored-links/` | `.link-{color}`, `.link-opacity-*` |
| Focus ring | `https://getbootstrap.com/docs/5.3/helpers/focus-ring/` | `.focus-ring`, `--bs-focus-ring-*` |
| Icon link | `https://getbootstrap.com/docs/5.3/helpers/icon-link/` | `.icon-link`, `.icon-link-hover` |
| Position | `https://getbootstrap.com/docs/5.3/helpers/position/` | `.fixed-top`, `.fixed-bottom`, `.sticky-top`, `.sticky-bottom` |
| Ratio | `https://getbootstrap.com/docs/5.3/helpers/ratio/` | `.ratio`, `.ratio-16x9`, `.ratio-4x3`, `.ratio-1x1` |
| Stacks | `https://getbootstrap.com/docs/5.3/helpers/stacks/` | `.vstack`, `.hstack`, `.gap-*` |
| Stretched link | `https://getbootstrap.com/docs/5.3/helpers/stretched-link/` | `.stretched-link` (makes parent clickable) |
| Text truncation | `https://getbootstrap.com/docs/5.3/helpers/text-truncation/` | `.text-truncate` |
| Vertical rule | `https://getbootstrap.com/docs/5.3/helpers/vertical-rule/` | `.vr` |
| Visually hidden | `https://getbootstrap.com/docs/5.3/helpers/visually-hidden/` | `.visually-hidden`, `.visually-hidden-focusable` |

**Stacks (modern flexbox shorthand):**
```html
<!-- Vertical stack with gap -->
<div class="vstack gap-3">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Horizontal stack -->
<div class="hstack gap-3">
  <div>Item 1</div>
  <div class="vr"></div>
  <div>Item 2</div>
  <div class="ms-auto">Item 3 (right-aligned)</div>
</div>
```

---

### 8. UTILITIES

| Utility | URL | Key classes |
|:--------|:----|:-----------|
| API | `https://getbootstrap.com/docs/5.3/utilities/api/` | Custom utility generation via Sass maps |
| Background | `https://getbootstrap.com/docs/5.3/utilities/background/` | `.bg-{color}`, `.bg-opacity-*`, `.bg-gradient` |
| Borders | `https://getbootstrap.com/docs/5.3/utilities/borders/` | `.border`, `.border-{side}`, `.border-{color}`, `.rounded`, `.rounded-{size}` |
| Colors | `https://getbootstrap.com/docs/5.3/utilities/colors/` | `.text-{color}`, `.text-opacity-*` |
| Display | `https://getbootstrap.com/docs/5.3/utilities/display/` | `.d-{value}`, `.d-{bp}-{value}` (none, block, flex, grid, inline, etc.) |
| Flex | `https://getbootstrap.com/docs/5.3/utilities/flex/` | `.d-flex`, `.flex-row/column`, `.justify-content-*`, `.align-items-*`, `.flex-wrap`, `.flex-grow/shrink-*`, `.order-*` |
| Float | `https://getbootstrap.com/docs/5.3/utilities/float/` | `.float-start/end/none`, `.float-{bp}-*` |
| Interactions | `https://getbootstrap.com/docs/5.3/utilities/interactions/` | `.user-select-all/auto/none`, `.pe-none/auto` |
| Link | `https://getbootstrap.com/docs/5.3/utilities/link/` | `.link-offset-*`, `.link-underline-*`, `.link-opacity-*` |
| Object fit | `https://getbootstrap.com/docs/5.3/utilities/object-fit/` | `.object-fit-contain/cover/fill/scale/none` |
| Opacity | `https://getbootstrap.com/docs/5.3/utilities/opacity/` | `.opacity-{0/25/50/75/100}` |
| Overflow | `https://getbootstrap.com/docs/5.3/utilities/overflow/` | `.overflow-auto/hidden/visible/scroll`, `.overflow-x-*`, `.overflow-y-*` |
| Position | `https://getbootstrap.com/docs/5.3/utilities/position/` | `.position-static/relative/absolute/fixed/sticky`, `.top/start/bottom/end-{0/50/100}`, `.translate-middle` |
| Shadows | `https://getbootstrap.com/docs/5.3/utilities/shadows/` | `.shadow`, `.shadow-sm/lg/none` |
| Sizing | `https://getbootstrap.com/docs/5.3/utilities/sizing/` | `.w-{25/50/75/100/auto}`, `.h-{value}`, `.mw-100`, `.mh-100`, `.min-vw-100`, `.min-vh-100` |
| Spacing | `https://getbootstrap.com/docs/5.3/utilities/spacing/` | `.m{side}-{size}`, `.p{side}-{size}`, `.gap-{size}` |
| Text | `https://getbootstrap.com/docs/5.3/utilities/text/` | `.text-start/center/end`, `.text-wrap/nowrap`, `.text-break`, `.text-{bp}-*` |
| Vertical align | `https://getbootstrap.com/docs/5.3/utilities/vertical-align/` | `.align-baseline/top/middle/bottom/text-top/text-bottom` |
| Visibility | `https://getbootstrap.com/docs/5.3/utilities/visibility/` | `.visible`, `.invisible` |
| Z-index | `https://getbootstrap.com/docs/5.3/utilities/z-index/` | `.z-n1/0/1/2/3` |

**Spacing scale:**
```
0 → 0        m-0, p-0
1 → 0.25rem  (4px)   m-1, p-1, gap-1
2 → 0.5rem   (8px)   m-2, p-2, gap-2
3 → 1rem     (16px)  m-3, p-3, gap-3
4 → 1.5rem   (24px)  m-4, p-4, gap-4
5 → 3rem     (48px)  m-5, p-5, gap-5

Sides: t(top) b(bottom) s(start/left) e(end/right) x(horizontal) y(vertical)
Examples: mt-3, pb-4, px-2, my-5, ms-auto
```

**Display responsive patterns:**
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

---

### 9. EXTEND

| Topic | URL | When to reference |
|:------|:----|:------------------|
| Approach | `https://getbootstrap.com/docs/5.3/extend/approach/` | Design principles, methodology |
| Icons | `https://getbootstrap.com/docs/5.3/extend/icons/` | Bootstrap Icons library, SVG usage |

---

### 10. SASS CUSTOMIZATION

| Topic | URL | When to reference |
|:------|:----|:------------------|
| Sass overview | `https://getbootstrap.com/docs/5.3/customize/sass/` | File structure, importing, compiling |
| Variables | `https://getbootstrap.com/docs/5.3/customize/sass/#variable-defaults` | Override with `!default` pattern |
| Maps | `https://getbootstrap.com/docs/5.3/customize/sass/#maps-and-loops` | `$theme-colors`, `$spacers`, `$grid-breakpoints` |
| Mixins | `https://getbootstrap.com/docs/5.3/customize/sass/#mixins` | `media-breakpoint-up/down`, `make-col`, etc. |
| CSS variables | `https://getbootstrap.com/docs/5.3/customize/css-variables/` | `--bs-*` custom properties |
| Utility API | `https://getbootstrap.com/docs/5.3/utilities/api/` | Generate custom utilities via Sass maps |

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
@include make-col(6);          // 6-column width
@include make-col-auto();
@include make-col-offset(3);

// Visually hidden
@include visually-hidden();
@include visually-hidden-focusable();

// Color contrast
color: color-contrast($bg-color);  // auto black/white text

// Truncate text
@include text-truncate();
```

**Adding custom utilities:**
```scss
$utilities: map-merge(
  $utilities,
  (
    "custom-property": (
      property: custom-property,
      class: custom,
      values: (
        1: value-1,
        2: value-2,
      )
    ),
  )
);
```

---

### 11. ABOUT / MIGRATION

| Topic | URL |
|:------|:----|
| Overview | `https://getbootstrap.com/docs/5.3/about/overview/` |
| Brand | `https://getbootstrap.com/docs/5.3/about/brand/` |
| License | `https://getbootstrap.com/docs/5.3/about/license/` |
| Translations | `https://getbootstrap.com/docs/5.3/about/translations/` |
| Migration | `https://getbootstrap.com/docs/5.3/migration/` |

---

## HOW TO ANSWER QUESTIONS

When the user asks about a Bootstrap topic:

1. **Identify the category** from the index above
2. **Fetch the official docs page** using `WebFetch` for the most current info
3. **Provide a concise answer** with:
   - The correct class names
   - A minimal working HTML example
   - SCSS customization if relevant
   - Responsive considerations
   - Accessibility attributes required
4. **Adapt to the project** — check CLAUDE.md for project-specific conventions

### Response format:

```
**Topic:** [Component/Utility name]
**Docs:** [URL]

[Concise explanation]

**Classes:** `.class-1`, `.class-2`, `.class-{variant}`

**Example:**
[HTML code block]

**SCSS customization:**
[SCSS code block if relevant]

**Responsive:**
[Breakpoint-specific notes]

**Accessibility:**
[Required ARIA attributes]
```

---

## DEEP DIVE MODE

When the user says "explain [topic] in detail" or "deep dive [topic]":

1. Fetch the full docs page with `WebFetch`
2. Cover ALL variants, modifiers, and options
3. Include Sass variable overrides
4. Show responsive behavior at each breakpoint
5. List all CSS custom properties (`--bs-*`)
6. Provide multiple real-world code examples
