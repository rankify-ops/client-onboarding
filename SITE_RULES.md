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

### Favicon & Logo from Client Data
- If `faviconUrl` is provided and non-empty: use `<link rel="icon" href="{faviconUrl}">` (the URL points to Vercel Blob storage, publicly accessible)
- If `faviconUrl` is empty: generate an inline SVG favicon using brand colors: `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,...">`
- If `logoUrl` is provided and non-empty: use `<img src="{logoUrl}" alt="{company}" class="logo-img">` in the header (max-height 40px, auto width)
- If `logoUrl` is empty: use a text wordmark in the header (company name styled with heading font, weight 800)

### Client Photos
- If `photoUrls[]` is provided and non-empty: use these real images throughout the site
  - Gallery page: use actual photos instead of CSS gradient placeholder blocks
  - Hero section: can use as background image if high quality
  - About page: use as team/workspace imagery
  - Services page: use relevant photos for service sections
  - Always add descriptive `alt` text, `loading="lazy"`, `max-width: 100%; height: auto`
  - Wrap in `<div>` with `border-radius: var(--radius-lg); overflow: hidden` for consistent styling
- If `photoUrls[]` is empty: use CSS gradient blocks with brand colors as visual placeholders (already specified in gallery section)

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

### CRITICAL: No "Home" Link
- Modern websites do NOT have a "Home" link in the navigation — the logo IS the home link
- DO NOT add "Home" to desktop nav links, mobile menu links, or footer quick links
- The logo/wordmark in the header links to `index.html` — that's how users get home
- Breadcrumbs on interior pages CAN start with "Home" (that's standard breadcrumb convention)

### Desktop (>768px)
- `position: fixed; top: 0; left: 0; right: 0; z-index: 100` (fixed, not sticky)
- **Frosted glass** background: `background: rgba(255,255,255,0.65)`, `backdrop-filter: blur(20px) saturate(1.5)`, `border-bottom: 1px solid rgba(255,255,255,0.5)`
- Add neumorphic shadow: `box-shadow: 0 4px 30px rgba(0,0,0,0.06), var(--glass-inset)`
- Layout: `display: flex; align-items: center; justify-content: space-between`
- Logo left: if `logoUrl` provided, use `<img>` (max-height 40px). If not, text wordmark (`font-weight: 800`, `font-size: 1.2rem`). Logo ALWAYS links to `index.html`.
- Nav links center: `font-size: 0.875rem`, `font-weight: 600`, `gap: 32px`, no underlines. Start with About, NOT Home.
- Nav link hover: color shifts to primary, with `::after` underline that slides in from left (`width: 0` → `width: 100%` on hover, `transition: width 0.25s`)
- Active page: primary color text + underline visible
- Right side: phone number (with inline SVG phone icon) + CTA button (primary color, pill `border-radius: var(--radius-full)`, `padding: 10px 24px`)
- Header height: `height: 72px`, content vertically centered
- Add `padding-top: 72px` to `<main>` on every page to offset fixed header
- Transition between states: `transition: all 0.3s ease`

### Header Scroll Effect (REQUIRED)
Add scroll-aware header behaviour in script.js:
```javascript
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});
```
CSS: `.site-header.scrolled` gets `box-shadow: 0 4px 30px rgba(BRAND_RGB, 0.12)` and optionally slightly more opaque background (`rgba(255,255,255,0.85)`). This makes the header feel alive, not static.

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
  - NO "Home" link — starts with About
  - Stagger entrance: each link delayed by 50ms (`transition-delay: 0ms, 50ms, 100ms...`)
- **Bottom of mobile menu**: phone number + primary CTA button, both full-width, stacked
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

## Home Page Section Order (RECOMMENDED)

Follow this order for maximum conversion flow. Every section builds on the last:

1. **Hero** — tagline + CTAs + floating stat cards (90vh)
2. **Trust Badge Bar** — accreditations, licenses, certifications (if applicable)
3. **Service Highlights** — 3-6 card grid linking to services page
4. **"How It Works"** — 3-4 numbered steps
5. **Dark Rhythm Breaker / "Us vs Them"** — comparison section on dark background
6. **Mid-page CTA** — colored banner with headline + button
7. **Review Marquee** — auto-scrolling Google review cards
8. **Founder Quote** — personal quote on dark background (can combine with rhythm breaker)
9. **Service Area Pills** — location coverage display
10. **Bottom CTA** — final call to action before footer
11. **Footer**

Not every site needs every section. Skip what doesn't apply. But sections 1, 3, 4, 5, 7, 10, 11 should always be present.

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
- **Card icons: use inline SVGs, NEVER emoji.** Emoji render differently on every OS and look unprofessional. Use simple path-based SVGs (24x24 viewBox) with `fill: var(--color-primary)` or `fill: currentColor`. Build icons for the industry (e.g. for electrical: lightning bolt, house, sun, plug, shield, wrench, etc.). The icon container can have a gradient background but the icon itself must be SVG.
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
- Form submission: use `https://formspree.io/f/xpwzgkqd` as the action URL with `method="POST"`. This is the Rankify catch-all form endpoint. Include a hidden field `<input type="hidden" name="_subject" value="New enquiry from {company website}">` so submissions are identifiable. DO NOT use `mailto:` — it's unreliable and janky. The form should POST JSON via fetch in JavaScript, show the success state on 200, and show an error message on failure.

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

### "How It Works" Process Section (REQUIRED on home page)
Every site MUST have a numbered "How It Works" section. This is on EVERY premium site — NPA (3 steps), Prime (4 steps), EVO Solar (6 steps), Tintek (8 steps), Coldflows (3 steps), Feedbird (3 steps), SoftRiver (3 steps). Pick 3-4 steps for most businesses.

Structure:
- Section label: "How it works"
- Heading: "Getting started is simple" or similar (benefit-focused, not generic)
- Steps in a horizontal row (desktop), stacked (mobile)
- Each step:
  - **Numbered circle**: `width: 48px; height: 48px; border-radius: 50%; background: var(--color-primary); color: white; font-weight: 800; font-size: 1.25rem; display: flex; align-items: center; justify-content: center`
  - **Step title**: `font-weight: 700; font-size: var(--font-size-xl)`
  - **Step description**: 1-2 sentences, `color: var(--color-text-muted)`
- Connecting line between steps on desktop: use `::after` pseudo-element on each step container (except last): `content: ''; position: absolute; top: 24px; left: 100%; width: 100%; height: 2px; background: linear-gradient(90deg, var(--color-primary), var(--color-border))`
- Steps should be specific to the client's business, not generic ("Get in touch" → "Request your free solar quote")
- Grid: `display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-xl)`

### Review Marquee/Carousel (REQUIRED on home page if client has reviews)
Auto-scrolling horizontal review ticker — used on Prime, EVO Solar, Tintek. Much more engaging than a static grid.

Structure:
- Section with `overflow: hidden` container
- Google badge at top: Google icon SVG + stars + rating number + "Google Reviews" text, linking to their Google business page
- Two-row marquee: `.marquee-row` contains `.marquee-track` with duplicated review cards for infinite scroll
- Each review card (`.rcard`):
  - `min-width: 350px; max-width: 400px; padding: var(--space-xl); background: var(--color-surface); border-radius: var(--radius-lg); border: 1px solid var(--color-border)`
  - Star rating row: `★★★★★` in `color: #f59e0b` (amber)
  - Quote text: `font-size: var(--font-size-base); line-height: 1.6; color: var(--color-text-muted)`
  - Author row: circle initial avatar (`width: 40px; height: 40px; border-radius: 50%; background: var(--color-primary); color: white; font-weight: 700; display: flex; align-items: center; justify-content: center`) + name + location
- CSS animation for infinite scroll:
```css
.marquee-track {
  display: flex; gap: var(--space-lg);
  animation: marquee 40s linear infinite;
  width: max-content;
}
@keyframes marquee { to { transform: translateX(-50%); } }
.marquee-row:hover .marquee-track { animation-play-state: paused; }
```
- Duplicate ALL review cards inside `.marquee-track` for seamless loop
- If client has NO specific review text: skip the marquee, just show aggregate rating badge with CTA to Google Reviews

### "Us vs Them" Comparison Section (REQUIRED on home page)
Every premium conversion site uses this — Coldflows, Prime, SoftRiver, Feedbird all have comparison tables. This is the strongest conversion pattern across all researched sites.

Structure:
- Section label: "Why choose us" or "The better way"
- Heading: "{Business} vs the alternative" or "Why {Business} is different"
- Two-column comparison:
  - **Left column (others)**: header with competitor/generic label (e.g., "Other Electricians", "DIY", "Other Companies"), list of ✕ items with `color: #ef4444` (red) cross icon
  - **Right column (client)**: header with client business name, list of ✓ items with `color: #22c55e` (green) check icon, highlighted with `background: rgba(PRIMARY_RGB, 0.04); border: 2px solid var(--color-primary)`
- Each item: `padding: var(--space-sm) var(--space-md); font-size: var(--font-size-base)`
- Use `border-radius: var(--radius-lg)` on both columns
- Make comparisons SPECIFIC to the industry, not generic ("Hidden call-out fees" vs "Fixed pricing, no surprises")
- On mobile: stack vertically, "others" first then client

### Trust & Accreditation Badge Bar (if applicable)
If the client mentions licenses, certifications, partnerships, or accreditations, add a badge bar. Used on EVO Solar (CEC, SAA, Tesla), Prime (Registered Builder, NDIS), NPA (NDIS Registered, PBS Practitioner).

Structure:
- Horizontal strip below the hero or after intro section
- `background: var(--color-surface); padding: var(--space-lg) 0; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border)`
- Flex row, centered, wrapping: `display: flex; justify-content: center; align-items: center; flex-wrap: wrap; gap: var(--space-xl)`
- Each badge: inline SVG icon (shield, check, certificate) + text label
- `font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text-muted); display: flex; align-items: center; gap: var(--space-xs)`
- Icon: `width: 20px; height: 20px; color: var(--color-primary)`
- Pull accreditations from client's `description`, `brandNotes`, or `services` data

### Founder / Owner Section (on About page, preview on Home)
Every premium site has a personal touch — NPA (Nadia), Prime (Nick's quote), EVO (Cameron), SoftRiver (team section). People buy from people, not businesses.

Structure on Home Page (short version):
- Dark background section (can be the rhythm breaker)
- Large decorative quote mark: `font-size: 8rem; line-height: 1; color: rgba(255,255,255,0.08); font-family: Georgia, serif`
- Blockquote: `font-size: clamp(1.5rem, 3vw, 2.2rem); font-weight: 300; color: white; line-height: 1.45; font-style: italic; font-family: Georgia, serif`
- Name and title below: `font-weight: 700; color: white` + `font-size: 0.82rem; color: var(--color-text-muted)`
- Quote should be crafted from the client's `description` and `brandNotes` — what drives them

Structure on About Page (full version):
- Two-column: photo left (if `photoUrls` available), bio content right
- If no photo: use a styled initial avatar or skip the photo column
- Bio content: name, title, 2-3 paragraphs about their background, qualifications, why they started
- Credentials list with check icons (license numbers, years experience, qualifications)

### Service Area Location Pills (on Home Page and Locations Page)
Used on Prime (32 locations), EVO Solar (40+ locations), Tintek (17 locations). Pills are better than a plain list — they look modern and are scannable.

Structure:
- Section or subsection with label "Service Areas" or "Where we work"
- Flex wrap container: `display: flex; flex-wrap: wrap; gap: var(--space-xs); justify-content: center`
- Each pill: `padding: 6px 16px; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-full); font-size: var(--font-size-sm); font-weight: 500; color: var(--color-text-muted)`
- Pill hover: `background: rgba(PRIMARY_RGB, 0.08); border-color: var(--color-primary); color: var(--color-primary)`
- On the Locations page: pills link to the corresponding location card section (`href="#suburb-slug"`)
- Generate pills from the client's `serviceAreas` array

### Guarantee / Risk Reversal Badge (if applicable)
Used by Feedbird (14-day money-back), SoftRiver (100% money-back), Coldflows (30-day guarantee). Reduces friction massively.

Structure:
- Appears near pricing, CTAs, or form sections
- Centered badge: `display: inline-flex; align-items: center; gap: var(--space-sm); padding: var(--space-sm) var(--space-lg); background: rgba(34,197,94,0.06); border: 1px solid rgba(34,197,94,0.2); border-radius: var(--radius-full)`
- Shield/check icon in green + text (e.g., "100% satisfaction guarantee" or "Free quotes, no obligation")
- `font-size: var(--font-size-sm); font-weight: 600; color: #15803d`
- Not every business has a money-back guarantee — adapt to what's relevant: "Licensed & insured", "Fixed pricing — no surprises", "Free quotes, no obligation", "Satisfaction guaranteed"

### Hero Stat Cards (floating glass cards in hero)
Used on Prime (4 cards: 15+ years, 5.0 Google, Registered, 24/7). These add credibility above the fold without cluttering the hero text.

Structure:
- 3-4 small cards floating on the right side of the hero (desktop) or in a row below hero text (mobile)
- Each card: `background: var(--glass-bg); backdrop-filter: var(--glass-blur); border: 1px solid var(--glass-border); border-radius: var(--radius-md); padding: var(--space-sm) var(--space-md); box-shadow: var(--glass-inset)`
- Content: small SVG icon + large value (`font-weight: 800; font-size: var(--font-size-xl)`) + label (`font-size: var(--font-size-sm); color: rgba(255,255,255,0.7)`)
- Pull stats from client data: years experience, review count/rating, license status, response time
- On dark hero backgrounds: use white text. On light backgrounds: use dark text with `var(--glass-bg-light)`
- On mobile: horizontal scroll row or 2x2 grid

### Cost Comparison Table (for service businesses)
Used by Feedbird — extremely effective for price-conscious buyers. Only add if the client's service can be compared to alternatives.

Structure:
- Table or card grid comparing cost of alternatives
- Columns: "DIY", "Hire someone else", "Use {client}" — or whatever comparison makes sense
- Each column: price/cost + brief pro/con tagline
- Client's column highlighted: `background: rgba(PRIMARY_RGB, 0.04); border: 2px solid var(--color-primary); border-radius: var(--radius-lg)`
- "Most popular" or "Best value" badge on client's column: `position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--color-primary); color: white; padding: 4px 16px; border-radius: var(--radius-full); font-size: var(--font-size-sm); font-weight: 700`

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
- **Column 2**: Quick Links (About, Services, Gallery, etc. — NO "Home" link, the logo handles that)
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

## Copywriting Rules

The copy on these sites needs to sound like a real business, not a template fill-in-the-blank. This is critical — bad copy makes even great design look cheap.

### Tone & Voice
- Write like a premium local business, not a corporate brochure
- Use the client's actual language from their `description` and `brandNotes` — mirror their vocabulary
- Short, punchy sentences. Long paragraphs lose people.
- Lead every section with a benefit, not a feature ("Cut your power bills" not "We install solar panels")
- Use the client's location names naturally throughout copy — this helps SEO AND feels local
- If the client mentions years in business, reviews, licenses — weave these into copy naturally, don't just list them

### What NEVER to Write
- "Welcome to our website" — nobody cares
- "We are a leading provider of..." — generic corporate garbage
- "Contact us today for more information" — weak CTA
- "Our team of experienced professionals" — says nothing
- "We pride ourselves on..." — cliché
- "Look no further" — cringe
- "Your one-stop shop" — dated
- "State-of-the-art" — meaningless
- Any sentence that could apply to literally any business in any industry

### What TO Write
- Specific, concrete claims: "15 years in Geelong", "180+ five-star reviews", "same-day callouts"
- Benefit-first headings: "Sleep Easy Knowing Your Wiring Is Safe" not "Residential Electrical Services"
- Conversational CTAs: "Get Your Free Quote" not "Submit Enquiry Form"
- Location-rich content: mention suburbs, landmarks, regions naturally
- Social proof woven in: "Join 180+ Geelong homeowners who trust us" not just a star rating

---

## Page Content Guidelines

### About Page
- Tell the brand STORY — how they started, what drives them, what makes them different
- Use the client's `description` as the foundation but expand it into narrative sections
- Include a "Why Choose Us" section with 3-4 specific differentiators (not generic cards)
- Include credentials: license numbers, insurance, qualifications from client data
- End with a CTA section driving to contact

### Services Page
- Each service gets its OWN section on the page — not just a grid of cards repeating the home page
- Each service section: heading, 2-3 paragraphs of real content explaining what's included, who it's for, why they need it
- Alternate layout between sections (text-left/visual-right, then flip)
- Include pricing hints if available ("starting from...", "free quotes")
- Each service section has its own CTA button ("Get a Quote for Solar" not just "Contact Us")
- At the bottom: a general CTA section

### Gallery Page
- If `photoUrls[]` has images: use them in a proper grid with hover overlays showing project description
- If no photos: use styled CSS gradient blocks labeled with project types relevant to the business
- Each gallery item should have a category label (e.g., "Switchboard Upgrade", "Solar Install")
- Include a CTA at the bottom: "Want to see your project here?"

### Testimonials Page
- Show aggregate rating prominently (large number + stars + review count)
- If client provided specific reviews, display them in styled cards
- DO NOT fabricate individual reviews with fake names — only use what's provided
- If no specific reviews: show the aggregate data and a prominent link to their Google Reviews page
- Add a CTA: "See All Reviews on Google" linking to their Google business page

### FAQ Page
- Generate 8-12 relevant FAQs based on the business type and services
- Questions should be what real customers ask: pricing, process, timing, service areas, emergency availability
- Answers should be specific to THIS business using their actual data (locations, services, contact info)
- Include a "Still have questions?" CTA at the bottom with phone + email

### Locations / Service Area Page
- Each location gets a card with the suburb name, brief text about servicing that area, and a CTA
- Mention the suburb name 2-3 times per card for local SEO
- Include a Google Maps embed centered on the business address
- If they serve many areas, group by region (e.g., "Geelong CBD", "Bellarine Peninsula", "Surf Coast")

---

## Conversion Elements (REQUIRED on every site)

These make the difference between a brochure and a lead generator:

1. **Sticky header CTA** — "Get a Free Quote" button always visible in the header
2. **Phone number in header** — with phone icon, click-to-call
3. **Hero CTA** — two buttons above the fold, primary action + secondary
4. **Hero stat cards** — 3-4 floating glass cards with key stats (years, reviews, certifications) for instant credibility
5. **Trust badge bar** — license numbers, insurance, years in business, accreditations — below hero or after intro
6. **"How It Works" section** — 3-4 numbered steps showing how simple it is to get started
7. **Mid-page CTA section** — a colored banner between content sections with headline + button
8. **"Us vs Them" comparison** — two-column comparison showing why THIS business beats alternatives
9. **Review marquee** — auto-scrolling review cards with Google badge (if client has reviews)
10. **Founder quote** — personal quote in a dark section to humanize the brand
11. **Service area pills** — clickable location tags showing coverage breadth
12. **Risk reversal badge** — guarantee, free quote, or no-obligation statement near CTAs
13. **Bottom CTA section** — just before the footer, strong call to action
14. **Contact form is the star** — multi-step, not buried, prominent on contact page
15. **Footer contact info** — phone, email, address, all clickable/mappable
16. **Google Reviews badge** — if they have reviews, show rating + count prominently on home + testimonials page
17. **Service area mentions** — suburb names appear naturally in content for local SEO

---

## What NOT To Do

- NO Lorem Ipsum or placeholder text of any kind
- NO generic copy ("Welcome to our website", "We are a leading provider", "Contact us today for more information")
- NO external images from stock sites (unsplash, pexels) — use client's uploaded photos (`photoUrls`) or CSS gradients/patterns
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
- NO "Home" link in the navigation — the logo IS the home link (this is modern web convention)
- NO emoji as card/feature icons — use inline SVGs, emoji look unprofessional and render inconsistently
- NO `mailto:` form actions — use the Formspree endpoint or fetch-based submission
- NO repeating the same card grid on the services page as the home page — services page needs expanded per-service sections
- NO ignoring client-uploaded assets — if `logoUrl`, `faviconUrl`, or `photoUrls` are provided, USE THEM
- NO static header — must have scroll-aware shadow/opacity change via JS
- NO identical copy across pages — each page needs unique, purposeful content
- NO services page that's just a list of names — each service needs 2-3 paragraphs of real content
- NO home page without a "How It Works" process section — every premium site has one
- NO generic "How It Works" steps like "Step 1: Contact Us" — make them specific to the business
- NO home page without a comparison/differentiation section — show why THIS business is better
- NO review section that's just static cards in a grid — use a marquee/carousel for dynamism
- NO about page without a personal founder/owner element — people buy from people
- NO service areas listed as a plain comma-separated paragraph — use location pill tags
- NO hero without floating stat cards — they add instant credibility above the fold

---

## Pre-Delivery Quality Checklist

Before marking a site as complete, verify ALL of these:

### Core Technical
1. Every page loads with no console errors
2. Every page has unique `<title>` and `<meta description>`
3. JSON-LD LocalBusiness schema on home page
4. `<html lang="en-AU">`, viewport meta, OG tags on every page
5. All phone numbers are clickable `tel:` links
6. No inline styles — everything in style.css
7. No raw hex colors in HTML — CSS variables only

### Header & Navigation
8. Header is fixed, frosted glass, hamburger on mobile, scroll shadow effect active
9. NO "Home" link in nav — logo links to index.html instead
10. Phone number + CTA button visible in header on desktop
11. Mobile menu is full-screen overlay with stagger animation, not wrapping nav links

### Hero & Above the Fold
12. Hero is at least 80vh with tagline, CTAs, and trust badges
13. Hero has 3-4 floating glass stat cards (years, reviews, certifications)
14. Trust/accreditation badge bar below hero (if client has licenses/certs)

### Conversion Sections (Home Page)
15. "How It Works" numbered process section exists (3-4 steps)
16. "Us vs Them" comparison section exists with specific industry comparisons
17. Review marquee carousel exists (if client has reviews) with Google badge
18. Founder/owner quote section exists in a dark background block
19. Service area location pills section exists
20. Risk reversal / guarantee badge near CTAs
21. At least 2 CTA sections (mid-page + above footer)
22. At least one dark "rhythm breaker" section exists

### Design Quality
23. Page background is warm gray, not white
24. Shadows use brand-tinted colors, not generic black
25. Card/feature icons are inline SVGs, NOT emoji
26. All cards have hover lift effects
27. Scroll reveal animations work on sections and cards
28. No single orphan words in headings (`text-wrap: balance`)
29. No mismatched button sizes in pairs
30. Sticky mobile CTA bar appears on mobile viewport

### Content Quality
31. Services page has expanded per-service sections (not just a card grid)
32. About page tells the brand story with founder bio section
33. Copy sounds like a real business — no generic filler sentences
34. FAQ page has 8-12 relevant, business-specific questions and answers
35. Each page has unique, purposeful content (not copy-pasted between pages)

### Client Assets
36. If client provided logoUrl: logo image is used in header
37. If client provided faviconUrl: custom favicon is used
38. If client provided photoUrls: real photos appear on site (gallery, about, services)

### Footer
39. Footer has 4 columns with "Website by Rankify" credit
40. No "Home" in quick links — logo handles that
