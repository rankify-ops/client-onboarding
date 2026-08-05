# Rankify Site Generation Rules

## Stack
- Plain HTML, CSS, JavaScript only — NO frameworks (no React, Next.js, Tailwind CDN, etc.)
- Hosted on GitHub Pages
- All assets inline or relative — no CDN dependencies
- Google Fonts via `<link>` tag is OK

## File Structure
```
index.html          — Home page
about.html          — About page
services.html       — Services overview
services/{slug}.html — Individual service pages
contact.html        — Contact page with form
locations/{slug}.html — Location/suburb pages (for SEO)
gallery.html        — Gallery/portfolio (if requested)
faq.html            — FAQ page (if requested)
testimonials.html   — Testimonials (if requested)
assets/             — Images, logo, favicon
style.css           — Shared stylesheet
```

## Design Rules
1. Modern, clean, professional — NOT generic template looking
2. Use the client's brand colors from onboarding data
3. Dark themes are fine if brand notes suggest it, otherwise default to light
4. Mobile-first responsive design using CSS Grid and Flexbox
5. No hamburger menu — use a clean horizontal nav that stacks on mobile
6. Hero section on home page with tagline, CTA button, and a relevant background
7. Each page gets a consistent header (logo + nav) and footer (contact info, socials, copyright)
8. Use CSS custom properties (variables) for colors, fonts, spacing
9. Subtle animations — fade-in on scroll, hover effects on buttons/cards
10. Google Fonts — pick 2 fonts max that match the brand vibe

## Content Rules
1. Write real, specific copy using the client's onboarding description, services, and audience
2. DO NOT use generic placeholder text like "Welcome to our website" or "Lorem ipsum"
3. Every heading should be benefit-driven, not feature-driven
4. Include the client's phone number, email, and address in the header/footer
5. Add click-to-call links on mobile for phone numbers
6. If they provided a tagline, use it. If not, create one that's specific to their business
7. Service pages should have: description, benefits, process/steps, CTA
8. Location pages should mention the suburb/city by name multiple times (SEO)
9. Contact page must include a working HTML form (action can be mailto: or formspree placeholder)

## SEO Rules
1. Every page gets a unique `<title>` tag: "{Page} | {Business Name} — {Location}"
2. Every page gets a `<meta name="description">` with a unique 150-char summary
3. Use semantic HTML: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
4. Use proper heading hierarchy: one `<h1>` per page, then `<h2>`, `<h3>`
5. Add `<meta name="viewport">` for responsive
6. Add Open Graph tags for social sharing
7. Add structured data (JSON-LD) for LocalBusiness schema

## What NOT to do
- No JavaScript frameworks or build tools
- No external CSS frameworks (Bootstrap, Tailwind CDN, etc.)
- No placeholder images from unsplash/pexels — use solid color blocks or CSS gradients as image placeholders
- No fake testimonials — only include if the client mentioned reviews
- No Lorem Ipsum anywhere
- No "Click Here" links — use descriptive link text
- No auto-playing videos or audio
