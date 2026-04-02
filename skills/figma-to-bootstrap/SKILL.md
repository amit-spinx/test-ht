---
name: figma-to-bootstrap
description: Convert Figma designs into production-ready HTML5/Bootstrap 5.3/SCSS pages with pixel-perfect fidelity. Triggers when the user shares a Figma URL, mentions "implement design", "figma to code", "build from figma", "convert design", or asks to create pages/components from a Figma file. Also use when the user says "bootstrap53", "/bootstrap53", or asks to audit HTML for Bootstrap 5.3 compliance.
argument-hint: <figma-url> [page-name]
---

# Figma to Bootstrap 5.3 Skill

You are an expert frontend architect converting Figma designs into an HTML5 / Bootstrap 5.3 / SCSS project. You have access to the Figma MCP server.

---

## STEP 1 — EXTRACT FROM FIGMA

Parse the Figma URL to get `fileKey` and `nodeId`:

```
figma.com/design/:fileKey/:name?node-id=:nodeId
```

Convert nodeId dashes to colons: `123-456` → `123:456`

Call MCP tools in this order:

1. `get_design_context(fileKey, nodeId)` — primary: returns code + screenshot + hints
2. `get_screenshot(fileKey, nodeId)` — visual reference for comparison

Before writing any code, document:
- Section/component names from Figma layer names
- Every color used (will map to project `$variables`)
- Every font size (will map to project typography mixins)
- Spacing values (padding, margin, gap)
- Breakpoints visible (desktop / tablet / mobile frames)
- Interactive states (hover, active, focus, open, disabled)
- Any Code Connect mappings returned — use those components directly

---

## STEP 2 — EXPLORE THE PROJECT

Before writing a single line of code, read the project to understand its conventions:

1. **CLAUDE.md** at the project root — contains all project-specific rules, tokens, file structure
2. **_variables.scss** — all color and spacing design tokens
3. **_custom.scss** — typography mixins (these replace raw px values)
4. **_mixins.scss** — utility mixins (fluid, gradient, transform)
5. **main.scss** — see what components/sections are already imported
6. **Existing pages** in `app/pages/` — match the template structure exactly
7. **Existing components** in `assets/sass/components/` — reuse before creating new ones
8. **layout.html** — understand the block structure (style, content, script)
9. **header.html / footer.html** — understand nav macro and footer partial usage

This step is critical. Every project has its own token system, naming conventions, and architecture. Adapt to the project — never impose generic patterns.

---

## STEP 3 — MAP FIGMA TOKENS TO PROJECT TOKENS

Resolve every Figma value to a project token before writing code.

### Colors

Find the closest match in `_variables.scss`. Common patterns:

| Figma hex | Typical variable |
|:----------|:-----------------|
| Dark brand color | `$primary-color` or `$orange-950` etc. |
| White `#FFFFFF` | `$white` or `$white-color` |
| Grays | `$gray-color-10` through `$gray-color-100` |
| Accent colors | `$green-color`, `$blue-color`, etc. |

If no match exists, add a new variable to `_variables.scss` with a descriptive name, then use it.

### Typography

Map Figma font sizes to the project's typography mixins. Never output raw `px` values:

| Figma size | Typical mixin |
|:-----------|:-------------|
| 60-90px display | `@include display-font` or `@include display-xxl` |
| 40-60px heading | `@include font-xl` or `@include display-xl` |
| 38-48px heading | `@include font-lg` or `@include display-l` |
| 30-38px heading | `@include font-md` or `@include display-s` |
| 24-30px heading | `@include font-sm` or `@include display-xs` |
| 20-24px body | `@include font-xs` or `@include body-xl` |
| 18-20px body | `@include font-xxs` or `@include body-l` |
| 16px body | `@include text-16` or `@include body-m` |
| 14px body | `@include text-14` or `@include body-s` |
| 12px caption | `@include body-xs` |

Read the project's `_custom.scss` to confirm exact mixin names — they vary per project.

### Spacing

Prefer Bootstrap utilities, fall back to SCSS with a Figma comment:

| Figma px | Bootstrap utility |
|:---------|:-----------------|
| 4px | `gap-1` / `m-1` / `p-1` |
| 8px | `gap-2` / `m-2` / `p-2` |
| 16px | `gap-3` / `m-3` / `p-3` |
| 24px | `gap-4` / `m-4` / `p-4` |
| 48px | `gap-5` / `m-5` / `p-5` |
| Custom | Use px in SCSS with comment: `// Figma: [node name] 40px` |

### Layout

- Max content width → `.container` (uses project's container-max-widths)
- Full-bleed backgrounds → `<section>` background with `.container` inside
- Columns → `.row` + `.col-[breakpoint]-[1-12]`

---

## STEP 4 — DETERMINE FILE TARGETS

Check the project's CLAUDE.md or file structure for rules. Typical targets:

**New page:**
- `app/pages/[pagename].html` — Nunjucks template
- `assets/sass/pages/[pagename].scss` — page styles
- `assets/js/pages/[pagename].js` — page interactions
- `project.json` — register the page
- `app/data/sitemap.json` — add page entry

**New shared component** (appears on 2+ pages):
- `assets/sass/components/_cmn-[name].scss` — styles
- `@import` in `main.scss` under components section
- HTML as Nunjucks macro or partial in `app/templates/partials/`

**Section on existing page:**
- Add markup to existing `.html` file
- Add styles to existing `.scss` file

---

## STEP 5 — WRITE THE HTML

Follow the project's template pattern. Typical Nunjucks structure:

```html
{% extends "layout.html" %}
{% from "partials/header.html" import nav %}

{% block style %}
<link rel="stylesheet" href="css/[pagename].css">
{% endblock %}

{% block content %}
{{ nav('dark') }}

<main role="main">
  <section class="[pagename]-[sectionname]" aria-label="[description]">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-6">
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

- **Semantic elements**: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<article>`
- Each Figma frame/section → `<section class="[pagename]-[name]">`
- **Bootstrap grid** for all columnar layout — never CSS floats or custom grids
- **Mobile-first** columns: `col-12 col-md-6 col-lg-4`
- Images: `<img src="assets/img/0.gif" data-src="[real.jpg]" alt="[desc]">` (lazy-load)
- Icons: `<svg><use xlink:href="#iconName"></use></svg>` (project's symbol system)
- Buttons: `<a href="#" class="btn btn-primary">` or project's button classes
- **JS hooks**: `data-action="[name]"` on interactive elements — never target CSS classes
- **No inline styles** — ever
- **No inline onclick** — use `.on('click', ...)` in JS

### Accessibility (required on every element that needs it)

- `aria-label` on all interactive and landmark elements
- `aria-expanded` + `aria-controls` on toggles/accordions
- `role="region"` + `aria-roledescription="carousel"` on carousels
- `role="group"` + `aria-label="Slide N of N"` on carousel slides
- `type="button"` on all `<button>` elements
- Decorative images: `alt=""` + `aria-hidden="true"`
- Decorative containers: `aria-hidden="true"`
- `<nav aria-label="...">` instead of `<div>` for navigation
- Add `<h1 class="visually-hidden">` if the visible headline is purely decorative

---

## STEP 6 — WRITE THE SCSS

```scss
@import '../main';

.[pagename] {

  &-[sectionname] {
    padding: 70px 0;

    @include media-breakpoint-down(md) {
      padding: 40px 0;
    }

    &__title    { @include font-xl; color: $primary-color; }
    &__subtitle { @include font-md; color: $gray-color-10; }
    &__body     { @include text-18; }

    &__cta {
      &:hover { color: $green-color; }
    }
  }
}
```

### SCSS Rules

- First line: `@import '../main';`
- **All styles scoped** under `.[pagename]` — no global selectors
- **BEM naming**: `&__element`, `&--modifier` inside parent
- `@include` for ALL font sizes — never raw `px`
- `$variable` for ALL colors — never hardcoded hex
- Responsive via `@include media-breakpoint-down(md)` / `media-breakpoint-up(lg)`
- Transitions: `@include transition(all 0.3s ease)` (if project has the mixin)
- No `!important` outside `_overrides.scss`
- New shared component → `_cmn-[name].scss` + import in `main.scss`

---

## STEP 7 — WRITE THE JAVASCRIPT

```javascript
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

### JS Rules

- All code inside `$(document).ready` — no exceptions
- Named functions, one responsibility each — no anonymous soup
- Event binding: `.on('event', ...)` — never `onclick=""`
- JS hooks via `data-action="[name]"` — never target CSS class names
- Shared utilities → project's global JS file
- Never modify vendor libraries

---

## STEP 8 — BOOTSTRAP 5.3 AUDIT MODE

When invoked as `/bootstrap53` or user says "update HTML" / "fix for bootstrap":

### Grid Compliance
- [ ] All columnar layouts use `row` / `col-*` — no custom flex grids
- [ ] Mobile-first: `col-12` base, then `col-md-*`, `col-lg-*`
- [ ] Content wrapped in `.container` or `.container-fluid`
- [ ] Replace custom `max-width` + padding with `container`

### Utility Usage
- [ ] Spacing uses BS utilities where possible (`gap-*`, `m-*`, `p-*`)
- [ ] Display/flex uses BS utilities (`d-flex`, `flex-column`, `justify-content-between`)
- [ ] Responsive visibility: `d-none d-md-block`, `d-lg-none` etc.
- [ ] Text alignment: `text-center`, `text-md-start` etc.
- [ ] `flex-shrink-0`, `flex-grow-1`, `align-self-stretch` where needed

### Semantics & Accessibility
- [ ] Semantic elements: `<main>`, `<section>`, `<nav>`, `<article>`, `<footer>`
- [ ] `aria-label` on all landmarks and interactive elements
- [ ] `aria-expanded` + `aria-controls` on all toggles
- [ ] `role="region"` + `aria-roledescription="carousel"` on carousels
- [ ] `type="button"` on all `<button>` elements
- [ ] Decorative images: `alt=""` + `aria-hidden="true"`
- [ ] `<nav aria-label="...">` for navigation — not bare `<div>`

### Code Quality
- [ ] No inline `style=""` attributes
- [ ] No hardcoded colors or font sizes
- [ ] `data-action` for JS hooks, not class names
- [ ] SCSS scoped under page/component name

---

## DELIVERABLES

Output in this exact order:

1. **Token mapping table** — Figma value → project `$variable` or `@include mixin`
2. **File manifest** — new files created / existing files modified
3. **_variables.scss additions** (if any new tokens needed)
4. **HTML** — complete Nunjucks template
5. **SCSS** — complete page/component styles
6. **JS** — complete interactions (if any)
7. **Component SCSS** — only if new shared component created
8. **Config updates** — `project.json` + `sitemap.json` diffs (new pages only)

---

## VALIDATION

Before delivering, verify against Figma screenshot:

- [ ] Layout matches at 1440px desktop
- [ ] Layout matches at 768px tablet
- [ ] Layout matches at 375px mobile
- [ ] All colors from `$variables` — no bare hex
- [ ] All font sizes via mixins — no raw px
- [ ] Spacing matches Figma (BS utilities or commented values)
- [ ] Hover/active/focus states implemented
- [ ] Images have alt text and lazy-load placeholder
