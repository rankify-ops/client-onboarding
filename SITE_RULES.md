# Rankify Website Generation Specification

This is the COMPLETE design and build specification for auto-generated client websites. Follow every rule exactly. The output must look like a $3,000–$5,000 custom-built site, not a free template.

---

## Stack & Constraints

- Plain HTML, CSS, JavaScript ONLY — NO frameworks, NO build tools
- NO external CSS frameworks (Bootstrap, Tailwind CDN, Bulma, etc.)
- NO CDN dependencies except Google Fonts via `<link>` tag
- All assets inline or relative — hosted on GitHub Pages
- One shared `style.css`, one shared `script.js`
- CSS custom properties (variables) for ALL colors, fonts, spacing, border-radius
- Inline SVG favicon using brand colors via `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,...">`

---

## File Structure

```
index.html        — Home (hero + highlights + CTA)
about.html        — About the business
services.html     — All services on one page
contact.html      — Multi-step enquiry form + map + contact info
gallery.html      — Work showcase grid (if requested)
testimonials.html — Reviews & social proof (if requested)
faq.html          — Accordion FAQ (if requested)
locations.html    — Service area page for SEO (if requested)
style.css         — Shared stylesheet (ALL styles here, zero inline styles)
script.js         — Shared JS (mobile menu, form logic, scroll animations, FAQ accordion)
```

---

## CSS Variables (set in :root)

Define ALL of these — they make the site consistent:

```css
:root {
  /* Brand colors from client data */
  --color-primary: /* client brand color 1 */;
  --color-secondary: /* client brand color 2 */;
  --color-primary-light: /* 10% lighter variant */;
  --color-primary-dark: /* 10% darker variant */;

  /* Neutrals — IMPORTANT: page background must be warm gray (#f0f2f5
     or #f5f5f5), NEVER pure white. This gives frosted glass elements
     contrast and depth. Pure white pages look flat and cheap. */
  --color-bg: #f0f2f5;  /* warm gray, adjust to complement brand */
  --color-surface: /* card/section background, slightly lighter than bg */;
  --color-surface-elevated: /* raised cards, dropdowns */;
  --color-text: /* primary text */;
  --color-text-muted: /* secondary/body text */;
  --color-text-on-primary: /* text on primary color buttons */;
  --color-border: /* subtle borders */;

  /* Typography */
  --font-heading: /* Google Font for headings */;
  --font-body: /* Google Font for body */;
  --font-size-base: 1rem;          /* 16px */
  --font-size-sm: 0.875rem;        /* 14px */
  --font-size-lg: 1.125rem;        /* 18px */
  --font-size-xl: 1.25rem;         /* 20px */
  --font-size-2xl: 1.5rem;         /* 24px */
  --font-size-3xl: 2rem;           /* 32px */
  --font-size-4xl: 2.5rem;         /* 40px */
  --font-size-hero: clamp(2.5rem, 5vw, 4rem);
  --line-height-tight: 1.15;
  --line-height-normal: 1.6;
  --letter-spacing-tight: -0.02em;

  /* Spacing scale (use these EVERYWHERE, never magic numbers) */
  --space-xs: 0.5rem;    /* 8px */
  --space-sm: 0.75rem;   /* 12px */
  --space-md: 1rem;       /* 16px */
  --space-lg: 1.5rem;     /* 24px */
  --space-xl: 2rem;       /* 32px */
  --space-2xl: 3rem;      /* 48px */
  --space-3xl: 4rem;      /* 64px */
  --space-4xl: 6rem;      /* 96px */
  --section-padding: var(--space-4xl) 0;

  /* Layout */
  --container-max: 1200px;
  --container-padding: var(--space-lg);
  --grid-gap: var(--space-xl);
  --card-gap: var(--space-lg);

  /* Effects — IMPORTANT: use brand-tinted shadows, NOT generic black.
     Replace 0,0,0 below with the secondary brand color's RGB values.
     e.g. if secondary is #1e293b, use rgba(30,41,59,...) for all shadows.
     This makes shadows feel cohesive, not like a template. */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
  --shadow-sm: 0 1px 3px rgba(BRAND_RGB, 0.06);
  --shadow-md: 0 4px 12px rgba(BRAND_RGB, 0.08);
  --shadow-lg: 0 8px 30px rgba(BRAND_RGB, 0.1);
  --shadow-xl: 0 20px 60px rgba(BRAND_RGB, 0.14);
  --shadow-glow: 0 6px 20px rgba(PRIMARY_RGB, 0.25);

  /* Frosted glass — the signature Rankify look.
     Always pair blur with saturate. Use on: nav, mobile menu, hero stat
     cards, dark-section cards, sticky mobile CTA, form containers. */
  --glass-bg: rgba(255,255,255,0.06);
  --glass-bg-light: rgba(255,255,255,0.55);
  --glass-border: rgba(255,255,255,0.1);
  --glass-border-light: rgba(255,255,255,0.7);
  --glass-blur: blur(20px) saturate(1.5);

  /* Neumorphic inset highlight — apply to ALL glass surfaces.
     Top edge catch light + bottom edge shadow = 3D glass illusion. */
  --glass-inset: inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.02);

  /* Transitions — use custom easing, not default ease */
  --transition-fast: 150ms ease;
  --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 400ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-spring: 600ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## Typography Rules

- Apply `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale` on `body`
- Google Fonts: pick exactly 2 fonts that match the brand notes
  - Heading font: bold/strong (e.g., Poppins, Plus Jakarta Sans, DM Sans, Outfit, Inter)
  - Body font: readable (e.g., DM Sans, Inter, Source Sans 3, Arimo, Nunito Sans)
- Headings: `font-weight: 700–800`, `line-height: var(--line-height-tight)`, `letter-spacing: var(--letter-spacing-tight)`
- Body text: `font-weight: 400`, `line-height: var(--line-height-normal)`, `font-size: var(--font-size-lg)` (18px, not 16)
- NEVER let a single word orphan onto the next line in headings — use `text-wrap: balance` on all `h1, h2, h3`
- Max content width for body text: `max-width: 65ch` (readable line length)
- Subheadings/labels above section headings: small, uppercase, letter-spaced, primary color, `font-size: var(--font-size-sm)`, `font-weight: 600`, `text-transform: uppercase`, `letter-spacing: 0.1em`

---

## Layout & Spacing

- Container: `max-width: var(--container-max)`, `margin: 0 auto`, `padding: 0 var(--container-padding)`
- EVERY section: `padding: var(--section-padding)` (96px top/bottom minimum on desktop)
- Between sections: alternate background colors (bg / surface / bg / surface)
- Cards in a grid: use `gap: var(--grid-gap)` — NEVER margin hacks
- Service/feature grids: 3 columns on desktop, 2 on tablet, 1 on mobile
- Two-column layouts (text + visual): use CSS Grid `grid-template-columns: 1fr 1fr` with `gap: var(--space-3xl)`, stack on mobile
- NEVER use `float`. Use Flexbox or CSS Grid for everything.
- Padding inside cards: `padding: var(--space-xl)` minimum (32px)
- White space is a feature, not a bug — generous padding makes things look premium

---

## Header / Navigation

### Desktop (>768px)
- `position: fixed; top: 0; left: 0; right: 0; z-index: 100` (fixed, not sticky)
- **Frosted glass** background: `background: rgba(255,255,255,0.65)`, `backdrop-filter: blur(20px) saturate(1.5)`, `border-bottom: 1px solid rgba(255,255,255,0.5)`
- Add neumorphic shadow: `box-shadow: 0 4px 30px rgba(0,0,0,0.06), var(--glass-inset)`
- Layout: `display: flex; align-items: center; justify-content: space-between`
- Logo left (text/wordmark, `font-weight: 800`, `font-size: 1.2rem`)
- Nav links center: `font-size: 0.875rem`, `font-weight: 600`, `gap: 32px`, no underlines
- Nav link hover: color shifts to primary, with `::after` underline that slides in from left (`width: 0` → `width: 100%` on hover, `transition: width 0.25s`)
- Active page: primary color text + underline visible
- Right side: phone number (with inline SVG phone icon) + CTA button (primary color, pill `border-radius: var(--radius-full)`, `padding: 10px 24px`)
- Header height: `height: 72px`, content vertically centered
- Add `padding-top: 72px` to `<main>` on every page to offset fixed header
- Transition between states: `transition: all 0.3s ease`

### Mobile (<768px)
- Same frosted glass header, but shorter: `height: 60px`
- Logo left, hamburger button right
- **Hamburger icon**: 3 horizontal lines using `<span>` elements inside a button
  - Container: `width: 44px; height: 44px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 5px; background: none; border: none; cursor: pointer`
  - Each span: `display: block; width: 22px; height: 2px; background: var(--color-text); border-radius: 2px; transition: all 0.3s ease`
  - When open: top span rotates 45deg, middle hides, bottom rotates -45deg to form an X
- **Mobile menu overlay**: `position: fixed; inset: 0; z-index: 99`
  - Background: `background: rgba(SECONDARY_RGB, 0.95)` (dark brand color at 95% opacity)
  - `backdrop-filter: blur(20px) saturate(1.5)`
  - Entrance: `transform: translateX(100%)` → `translateX(0)`, `transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)`
  - Close button: top-right, 44x44px, X icon, `hover: rotate(90deg)`
- **Menu items**: `font-size: 1.25rem`, `font-weight: 600`, color white, `padding: 16px 0`, centered
  - Stagger entrance: each link delayed by 50ms (`transition-delay: 0ms, 50ms, 100ms...`)
- **Bottom of mobile menu**: phone number + "Get a Free Quote" button, both full-width, stacked
- When menu open: `body.menu-open { overflow: hidden }` — prevent background scrolling
- DO NOT just let nav links wrap onto multiple lines — that looks broken

---

## Buttons

### Sizes
- **Large** (hero/CTA): `padding: var(--space-md) var(--space-2xl)`, `font-size: var(--font-size-lg)`, `min-height: 56px`
- **Medium** (cards/sections): `padding: var(--space-sm) var(--space-xl)`, `font-size: var(--font-size-base)`, `min-height: 48px`
- **Small** (inline): `padding: var(--space-xs) var(--space-lg)`, `font-size: var(--font-size-sm)`, `min-height: 40px`

### Styles
- Primary: `background: var(--color-primary)`, `color: var(--color-text-on-primary)`, `border: none`
- Secondary/outline: `background: transparent`, `border: 2px solid var(--color-primary)`, `color: var(--color-primary)`
- All buttons: `border-radius: var(--radius-full)` (pill shape), `font-weight: 600`, `cursor: pointer`, `text-decoration: none`, `display: inline-flex; align-items: center; justify-content: center`
- Hover: slight scale `transform: translateY(-2px)`, `box-shadow: var(--shadow-md)`, slight color shift
- Transition: `transition: all var(--transition-base)`
- NEVER use `display: block` on buttons unless they need to be full-width on mobile

### Button Pairs (two buttons side by side)
- Wrap in a flex container: `display: flex; gap: var(--space-md); align-items: center; flex-wrap: wrap`
- Both buttons MUST be the same height — use the same size class
- On mobile: buttons stack vertically, each `width: 100%`
- Primary button first (left), secondary/outline button second (right)
- NEVER have mismatched button sizes next to each other

---

## Hero Section (Home Page)

- Full viewport height or near it: `min-height: 90vh` on desktop, `min-height: 80vh` on mobile
- Background: CSS gradient using brand colors (e.g., `linear-gradient(135deg, var(--color-secondary) 0%, darken 60%, var(--color-primary) 100%)`) — NO external images
- Optional: subtle geometric pattern or grid overlay using CSS (repeating-linear-gradient or SVG pattern)
- Content layout: text left (60%), visual/stat right (40%) on desktop — stack on mobile
- Tagline: `font-size: var(--font-size-hero)` (clamp for responsive), `font-weight: 800`, `line-height: var(--line-height-tight)`
- Subtext below tagline: `font-size: var(--font-size-lg)`, `color: var(--color-text-muted)`, `max-width: 50ch`
- Two CTA buttons below subtext (primary + secondary/outline), using the button pair pattern
- Trust indicators below buttons: small badges/pills showing key USPs (e.g., "Licensed & Insured", "Same-Day Service", "Fixed Pricing")
- If client has Google reviews: show a floating review badge card with star rating, review count — use glassmorphism card style

---

## Cards

- Background: `var(--color-surface)` or glassmorphism (`var(--glass-bg)` with `backdrop-filter`)
- Border: `1px solid var(--color-border)` or `var(--glass-border)` for glass cards
- Border-radius: `var(--radius-lg)` (16px)
- Padding: `var(--space-xl)` (32px) minimum
- Shadow: `var(--shadow-sm)` default, `var(--shadow-md)` on hover
- Hover: `transform: translateY(-4px)`, shadow increases, `transition: all var(--transition-base)`
- Icon at top of card: use an inline SVG or emoji, `font-size: 2rem`, `margin-bottom: var(--space-md)`
- Card title: `font-size: var(--font-size-xl)`, `font-weight: 700`
- Card description: `font-size: var(--font-size-base)`, `color: var(--color-text-muted)`
- Equal height cards in a row: use CSS Grid with `grid-template-rows: subgrid` or flexbox with `align-items: stretch`

---

## Forms (Contact / Enquiry)

### Multi-Step Form (REQUIRED for contact page)
The contact form MUST be a multi-step form, not a single long form. This is a conversion optimization.

**Step 1 — Service Selection**
- Large clickable cards/tiles for each service type (not a dropdown)
- Each card: icon + service name, `padding: var(--space-lg)`, hover effect
- Grid layout: 2–3 columns
- Selected state: primary color border, subtle background tint
- "Other" option with text input that appears on selection

**Step 2 — Project Details**
- Textarea for describing the project
- Optional: urgency selector (tiles: "Not Urgent", "Within a Week", "Emergency")
- Property type if relevant (tiles: "House", "Unit/Apartment", "Commercial", "New Build")

**Step 3 — Contact Info**
- Name, email, phone fields
- Suburb/location field
- "Preferred contact method" toggle (Phone / Email)

**Step navigation:**
- Progress indicator at top: step dots or bar showing 1/2/3
- "Next" button (primary, right-aligned) and "Back" link (text link, left-aligned)
- Validate current step before allowing next
- Final step: "Send Enquiry" button (primary, full-width on mobile)
- On submit: show success state (check icon + "We'll be in touch within 24 hours" message)
- Form action: `mailto:` or Formspree placeholder URL

### Form Field Styling
- Inputs: `padding: var(--space-sm) var(--space-md)`, `border: 2px solid var(--color-border)`, `border-radius: var(--radius-md)`, `font-size: var(--font-size-base)`, `background: var(--color-surface)`
- Focus state: `border-color: var(--color-primary)`, `outline: none`, `box-shadow: 0 0 0 3px rgba(primary, 0.15)`
- Labels: above the input, `font-weight: 600`, `font-size: var(--font-size-sm)`, `margin-bottom: var(--space-xs)`
- Field spacing: `margin-bottom: var(--space-lg)` between fields
- Full-width inputs by default

---

## Section Patterns

### Stats/Numbers Row
- 3 or 4 stats in a row (e.g., "15+ Years", "180+ Reviews", "4.9 Stars", "Same-Day Service")
- Large number: `font-size: var(--font-size-3xl)`, `font-weight: 800`, primary color
- Label below: `font-size: var(--font-size-sm)`, muted color
- Centered in each column
- Dividers between stats: `border-right: 1px solid var(--color-border)` (not on last)
- On mobile: 2x2 grid

### Section Labels (above every section title)
- Small tag/label text above the section heading
- `font-size: 0.72rem`, `text-transform: uppercase`, `letter-spacing: 3px`, `font-weight: 700`, `color: var(--color-primary)`
- Optional: decorative lines either side using `::before` and `::after` pseudo-elements (40px wide, 2px tall bars in primary color)
- `margin-bottom: var(--space-md)` between label and heading

### Section Dividers
- Between sections, use a subtle CSS gradient line: `height: 1px; background: linear-gradient(90deg, transparent, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.06) 80%, transparent)`
- This is more refined than a solid `border-bottom`

### Service Highlights (Home Page)
- Grid of 3–6 cards, each with: icon, title, short description (2 lines max), "Learn more →" link
- Icon: `width: 64px; height: 64px`, centered in a rounded square (`border-radius: 14px`) with gradient background using `linear-gradient(135deg, var(--color-primary-light), #fff)`
- Icon hover: gradient flips to solid primary, icon goes white, `transform: scale(1.05) rotate(-3deg)` — playful tilt
- Card hover: `transform: translateY(-4px)`, border shifts to primary color, shadow increases
- On click/link: goes to services.html

### Dark "Rhythm Breaker" Section
- One section (usually "Why Choose Us" or expertise) should use a dark background (`var(--color-secondary)` or darkest brand shade) with light text
- This BREAKS the visual rhythm and re-captures attention — don't make every section the same
- Cards in dark sections: use frosted glass (`background: rgba(255,255,255,0.04)`, `backdrop-filter: blur(10px)`, `border: 1px solid rgba(255,255,255,0.08)`)
- Optional: subtle radial gradient pseudo-element for ambient glow behind cards

### CTA Sections
- Between content sections, add a CTA strip/banner
- Full-width background in primary color or dark color
- Text centered: bold heading + subtext + button(s)
- `padding: var(--space-3xl) 0`
- Button in CTA section: inverted colors (white button on colored bg)
- Add at least 2 CTA sections per site — one mid-page, one above footer

### FAQ Accordion
- Clean accordion with `+` / `−` toggle icon (right side)
- Question: `font-size: var(--font-size-lg)`, `font-weight: 600`, full clickable row
- Answer: slides open with `max-height` transition, `padding: var(--space-md) 0`, body text styling
- Subtle top border between items: `border-top: 1px solid var(--color-border)`
- Only one open at a time

### Gallery / Work Grid
- CSS Grid: 3 columns desktop, 2 tablet, 1 mobile
- Cards with placeholder blocks: CSS gradient backgrounds in brand colors, labeled with project type
- `aspect-ratio: 4/3` on each card for consistent sizing
- `border-radius: var(--radius-lg)`, `overflow: hidden`
- Hover: subtle scale `transform: scale(1.02)` and overlay with project info

### Testimonials / Reviews
- DO NOT fabricate individual review quotes attributed to named people
- Show aggregate rating prominently: large "4.9" + filled stars + "180+ Google Reviews"
- Link to Google reviews page
- If real testimonials are provided in client data, show them in cards with name/initial avatar
- Review cards: large quote marks (decorative), italic text, name below

### Locations / Service Area
- Grid or list of location cards, each mentioning the suburb 3+ times for SEO
- Each card: suburb name as heading, brief text about service in that area, CTA link
- Include a Google Maps embed: `<iframe src="https://www.google.com/maps/embed?pb=..." width="100%" height="400" style="border:0; border-radius: var(--radius-lg)" loading="lazy"></iframe>`
- Map centered on the business address

---

## Animations & Transitions

### Scroll Reveal (REQUIRED)
Every section and card should fade in on scroll. Implement in script.js:
```javascript
// Add .fade class to sections, cards, headings etc
const fades = document.querySelectorAll('.fade');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
fades.forEach(el => observer.observe(el));
```
CSS:
```css
.fade { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
.fade.visible { opacity: 1; transform: translateY(0); }
```
- Stagger children: apply `transition-delay` in increments of 100ms
- Add `.fade` to: every `<section>`, every card, stat items, CTA blocks

### Hover Effects
- **Buttons**: `transform: translateY(-2px)`, `box-shadow` increases, `transition: all var(--transition-base)`
- **Cards**: `transform: translateY(-4px)`, shadow deepens, border color shifts to primary
- **Service icon squares**: `transform: scale(1.05) rotate(-3deg)` — playful tilt micro-interaction
- **Nav links**: `::after` underline slides in from left (`width: 0` → `100%`)
- **Social icons**: `transform: translateY(-2px)`, background fills with primary color
- **Gallery items**: image `transform: scale(1.08)` inside `overflow: hidden` container, overlay fades in

### Other Animations
- **FAQ accordion**: `max-height: 0` → `max-height: 500px`, `transition: max-height 0.35s ease`, toggle icon rotates 45deg
- **Mobile menu entrance**: `transform: translateX(100%)` → `translateX(0)`, menu items stagger-fade in
- **Form step transitions**: `opacity: 0; transform: translateY(10px)` → visible, 0.3s, applied when advancing steps
- **NO jarring motion** — everything 250-700ms with custom cubic-bezier easing
- **Reduced motion**: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`

---

## Footer

- Dark background: `var(--color-secondary)` or darkest brand shade, `color: rgba(255,255,255,0.7)`
- `padding: 64px 0 24px`
- Grid: `grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 40px` on desktop
- On mobile (`<768px`): `grid-template-columns: 1fr 1fr; gap: 32px`, then single column on small mobile
- **Column 1**: Logo (white version / light text wordmark) + one-liner description + social icons row
- **Column 2**: Quick Links (Home, About, Services, etc.)
- **Column 3**: Services list (linking to services.html)
- **Column 4**: Contact info (phone, email, address — each with inline SVG icon, all clickable)
- Social icons: `width: 36px; height: 36px` circles, `background: rgba(255,255,255,0.06)`, `border: 1px solid rgba(255,255,255,0.1)`, `border-radius: 50%`, inline SVG centered inside
- Social icon hover: `background: var(--color-primary)`, `transform: translateY(-2px)`, `transition: all 0.25s`
- Link color in footer: `rgba(255,255,255,0.6)`, hover: `color: var(--color-primary)`
- Column headings: `font-weight: 700`, `color: #fff`, `margin-bottom: var(--space-lg)`
- **Bottom bar**: `border-top: 1px solid rgba(255,255,255,0.08)`, `padding-top: 24px`, `margin-top: 48px`
- Bottom bar text: `font-size: 0.78rem`, `color: rgba(255,255,255,0.4)`
- Bottom bar content: `© {YEAR} {Business Name}. ABN {abn}. {license info}.` left, `Website by <a href="https://rankify.com.au" style="color:var(--color-primary)">Rankify</a>` right

---

## Mobile Responsive Rules

### Breakpoints
```css
/* Tablet */
@media (max-width: 1024px) { }
/* Mobile */
@media (max-width: 768px) { }
/* Small mobile */
@media (max-width: 480px) { }
```

### Mobile-Specific
- Container padding increases on mobile: `padding: 0 var(--space-xl)` (so content doesn't touch edges)
- Hero font size: controlled by `clamp()`, never below 2rem
- All grids collapse: 3col → 2col → 1col
- Buttons: `width: 100%` on mobile when in a stacked pair
- Touch targets: minimum `44px` height/width on all interactive elements
- Phone numbers: always wrapped in `<a href="tel:+61...">` — clickable
- No hover-dependent functionality — everything accessible by tap
- Images/placeholders: `max-width: 100%; height: auto`
- Tables: horizontal scroll wrapper if present

### Sticky Mobile CTA Bar (REQUIRED)
On mobile only (`@media (max-width: 768px)`), add a sticky bottom bar:
- `position: fixed; bottom: 14px; left: 14px; right: 14px; z-index: 99`
- Frosted glass: `background: rgba(255,255,255,0.55)`, `backdrop-filter: blur(24px) saturate(1.6)`
- `border: 1px solid rgba(255,255,255,0.5)`, `border-radius: var(--radius-full)`, `box-shadow: 0 8px 32px rgba(BRAND_RGB, 0.18)`
- Two buttons side by side inside: Call (outline/glass style) + Get Quote (solid primary), both pill-shaped
- `padding: 8px` inside the bar, `display: flex; gap: 8px`
- This stays visible as the user scrolls — maximum conversion opportunity

---

## SEO (Every Page)

- Unique `<title>`: `{Page Name} | {Business Name} — {Primary Location}`
- Unique `<meta name="description">`: 150 characters, specific to that page's content
- `<meta name="viewport" content="width=device-width, initial-scale=1">`
- Semantic HTML everywhere: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- One `<h1>` per page — the rest `<h2>`, `<h3>` in proper hierarchy
- Open Graph tags: `og:title`, `og:description`, `og:type`, `og:url`
- JSON-LD structured data on home page (LocalBusiness schema with name, address, phone, url, openingHours, geo, aggregateRating if reviews mentioned)
- All images/placeholders: `alt` text
- Internal links between pages with descriptive text (not "Click Here")
- `<html lang="en-AU">` for Australian businesses

---

## Conversion Elements (REQUIRED on every site)

These make the difference between a brochure and a lead generator:

1. **Sticky header CTA** — "Get a Free Quote" button always visible in the header
2. **Phone number in header** — with phone icon, click-to-call
3. **Hero CTA** — two buttons above the fold, primary action + secondary
4. **Trust badges** — license numbers, insurance, years in business, review count — visible near CTAs
5. **Mid-page CTA section** — a colored banner between content sections with headline + button
6. **Bottom CTA section** — just before the footer, strong call to action
7. **Contact form is the star** — multi-step, not buried, prominent on contact page
8. **Footer contact info** — phone, email, address, all clickable/mappable
9. **Google Reviews badge** — if they have reviews, show rating + count prominently on home + testimonials page
10. **Service area mentions** — suburb names appear naturally in content for local SEO

---

## What NOT To Do

- NO Lorem Ipsum or placeholder text of any kind
- NO generic copy ("Welcome to our website", "We are a leading provider", "Contact us today for more information")
- NO external images (unsplash, pexels, stock photos) — use CSS gradients, patterns, or solid color blocks
- NO fabricated testimonials with fake names — only use real review data the client provided
- NO `display: block` buttons that stretch edge-to-edge with no padding around them
- NO single words wrapping onto a new line in headings (use `text-wrap: balance`)
- NO inline styles — everything in style.css
- NO nav links wrapping onto multiple lines on desktop — use hamburger on mobile
- NO mismatched button sizes when two buttons are side by side
- NO tiny text on mobile (minimum 16px body text)
- NO sections with less than 48px padding on mobile or 96px on desktop
- NO cards with less than 24px internal padding
- NO JavaScript frameworks, npm packages, or build tools
- NO auto-playing media
- NO horizontal scrolling on any viewport
- NO raw hex colors in HTML — use CSS variables for everything
- NO pure white (#fff) page background — always use warm gray (#f0f2f5 or similar) for glass contrast
- NO generic black shadows — tint shadows with the brand's secondary color RGB values
- NO default `ease` timing on card/button hover — use `cubic-bezier(0.4, 0, 0.2, 1)`
- NO nav links just wrapping/stacking on mobile — MUST use hamburger menu with overlay
- NO floating/disconnected elements — everything snaps to the spacing scale grid
- NO page without a "Website by Rankify" credit in the footer bottom bar
- NO page without at least 2 CTA opportunities (header + mid/bottom CTA section)

---

## Pre-Delivery Quality Checklist

Before marking a site as complete, verify ALL of these:

1. Every page loads with no console errors
2. Every page has unique `<title>` and `<meta description>`
3. Header is fixed, frosted glass, hamburger on mobile
4. Hero is at least 80vh with tagline, CTAs, and trust badges
5. All phone numbers are clickable `tel:` links
6. Contact form is multi-step (not one long form)
7. At least one dark "rhythm breaker" section exists
8. At least 2 CTA sections (mid-page + above footer)
9. Footer has 4 columns with "Website by Rankify" credit
10. Sticky mobile CTA bar appears on mobile viewport
11. All cards have hover lift effects
12. Scroll reveal animations work on sections and cards
13. No single orphan words in headings
14. No mismatched button sizes in pairs
15. Page background is warm gray, not white
16. Shadows use brand-tinted colors, not generic black
