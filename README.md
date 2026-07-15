# Duncan House — Proof of Concept Rebuild

This is a static rebuild of [duncansmillshouse.com](https://duncansmillshouse.com), a small brochure site for Duncan House, a historic (circa 1880) vacation rental in Duncans Mills, CA on the Russian River. It exists to demonstrate what a lightweight, framework-free static rebuild could look like: same content, same pages, same navigation and functionality — completely different visual design.

**This is a proof of concept, not the live site.** It is blocked from search indexing (see below) and should not be treated as a replacement for duncansmillshouse.com without addressing the parity gaps listed further down.

## How it was built

- Plain, semantic HTML5 — one file per page, no templating, no build step.
- A single hand-written CSS file (`assets/css/style.css`). No CSS framework.
- Minimal vanilla JavaScript (`assets/js/main.js`) for the mobile nav toggle and a stubbed contact form. No third-party scripts, no analytics, no tracking.
- Google Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces) (display serif) and [Karla](https://fonts.google.com/specimen/Karla) (body sans), loaded via `<link>` tags.
- Content (page copy, room names, reservation policies, contact details, terms & privacy text) was copied verbatim from the live site with permission, since this project is being built for Duncan House's own consultant.
- No WordPress markup, `wp-content` paths, plugin scripts, or page-builder divs were reused. The design — split hero, card-based room gallery, warm clay/forest/gold palette — is intentionally different from the original's grey header, full-bleed slider, and blue-grey footer.

### Pages

| Page | File | Notes |
|---|---|---|
| Home | `index.html` | Split hero + photo strip, matches live homepage copy |
| Accommodation | `accommodation.html` | 9-room gallery + full reservation policy list |
| Local Shops | `local-shops.html` | Live URL is actually `/local-shops-wine-tasting-restaurants-more/` |
| Health & Wellness | `health-wellness.html` | Yoga with Kelliann listing |
| Outdoors | `outdoors.html` | Sonoma County outdoor activities |
| Contact | `contact.html` | Address, email, phone, map, **added** contact form (see gaps below) |
| Terms & Privacy | `terms-privacy.html` | Live URL is `/terms-privacy/` |

Navigation matches the live site's hamburger menu order (Home, Accommodation, Local Shops, Health & Wellness, Outdoors, Contact), plus a footer row (Accommodation, Reservations, Contact) and a Terms & Privacy link — same as the original. On mobile the nav collapses behind a hamburger button; on desktop it's a plain top bar (the original uses a hamburger at all sizes).

**On "Reservations":** the live site does not have a `/reservations` page — that URL 404s. The footer's "RESERVATIONS" link actually points to `/contact`, and the real booking information lives on the Accommodation page (reservation policies + a "Contact Karen" button that also links to `/contact`). This rebuild reproduces that exact behavior rather than inventing a page that doesn't exist on the live site.

## Parity gaps vs. the live site

1. **Photography.** The live site's real photos could not be downloaded in this build environment — the sandbox this was built in only has network access to a small allowlist of domains (it could not reach duncansmillshouse.com directly for file downloads, and the available browser-relay method could not move image-sized data). In place of the real photos, this rebuild uses generated placeholder images (warm gradient blocks labeled with the room/scene name, e.g. "Upstairs Bedroom – Ophelia") sized correctly for each slot. **Before this goes anywhere near production, swap the files in `assets/img/` for the real photography** — filenames are descriptive and map 1:1 to what's shown on each page. The outdoors gallery was also trimmed from the live site's 12 photos down to 6 representative ones for the POC.
2. **Contact form.** The live `/contact` page has no form — just an address, email link, phone number, and an embedded map. This rebuild adds a contact form per the project brief. Submission is stubbed: it's intercepted client-side (see `assets/js/main.js`) and shows a message telling the visitor to email or call directly instead. **Production option:** point the form's `action` at a [Formspree](https://formspree.io) endpoint and remove the JS `preventDefault()` handler — noted in a code comment in both `contact.html` and `main.js`.
3. **Reservations / booking.** There is no live booking widget or third-party reservation system on the source site — reservations are handled by contacting Karen directly (email/phone), which this rebuild preserves as-is (see "On Reservations" above).
4. **Search indexing.** Every page has `<meta name="robots" content="noindex, nofollow">` and the repo includes a `robots.txt` with `Disallow: /`, so this proof of concept won't compete with the live site in search results.
5. **Footer credit.** The live site's "Site by Webhelper.com" credit is replaced with "Proof of concept rebuild — not the live site."

## Running it locally

No build step, no dependencies. From the repo root:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/` in a browser. Every internal link and image is a relative path, so it also works by opening `index.html` directly in most browsers (a couple of browsers restrict local file access for the Google Maps iframe on the Contact page — the local server avoids that).

## License / usage note

Text and layout are original to Duncan House / Karen Webb and are used here with the site owner's consultant's authorization for this proof-of-concept exercise. This repository is private and is not intended for public distribution.
