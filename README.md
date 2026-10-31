# Ultimate Sports Nutrition Website

WEDE5020 student website project. This is a static HTML, CSS, and JavaScript demonstration for browsing a sports nutrition catalogue, keeping a browser-based cart, and validating customer forms.

## Pages

- `index.html` — home page and featured products.
- `about.html` — company information with tabbed content.
- `product.html` — dynamic product catalogue with search, category filters, sorting, and image lightbox.
- `enquiry.html` — product, service, sponsorship, and volunteer enquiry form.
- `contact.html` — general message form and company contact details.
- `basket.html` — editable cart with quantity controls and calculated total.
- `checkout.html` — customer and delivery form with a live cart total.

## Run locally

Open `index.html` in a browser. The cart uses browser local storage, so it is retained in that browser. For hosting, publish this folder with GitHub Pages or another static hosting provider. The project repository is `https://github.com/Sya79/USN`; confirm that GitHub Pages is enabled for the repository before sharing the public website URL.

## Forms and checkout

The forms use HTML constraints and JavaScript client-side validation. Enquiry responses are demonstrated in the page. Contact messages can open a prefilled email in the visitor's email application. The optional asynchronous form code uses `fetch()` when a trusted form-service endpoint is configured on a form with `data-endpoint="https://your-service-endpoint"`; because no backend or endpoint was supplied with the project, no message is transmitted by default. When using a third-party endpoint, configure its domain in the Content Security Policy `connect-src` directive and review its privacy and data-handling terms.

Checkout is a front-end demonstration. It does not accept card details, process payments, store orders, or submit customer details to a server. Do not use it for real transactions without a secure server-side order and payment integration.

## SEO and deployment notes

The pages include descriptive titles, descriptions, semantic headings, responsive layouts, image alt text, and internal navigation. `robots.txt` and `sitemap.xml` use the GitHub Pages URL for the `Sya79/USN` repository. If the site is deployed at another domain or URL, update both files before publishing. Product images are stored in `Images/`; shared styles and behavior are in `CSS/style.css` and `app.js`.

## Changelog

### Part 3 — Functionality and SEO (22 October 2026)

- Corrected inconsistent stylesheet paths, broken/missing navigation destinations, invalid document structure, and unavailable product image references.
- Standardised all seven pages with responsive shared navigation, semantic page structure, accessible labels and focus styles, and page-specific titles and descriptions.
- Added a searchable, category-filterable and sortable catalogue generated from JavaScript product data; added product image lightbox and About page tabs.
- Implemented local-storage cart behavior with add/remove controls, quantity changes, item count, and calculated basket/checkout totals.
- Added client-side form validation, enquiry-topic responses, contact email composition, and optional asynchronous submission through a configurable endpoint.
- Added `robots.txt`, `sitemap.xml`, and a restrictive Content Security Policy meta tag. Cart and checkout are excluded from crawler indexing.
- Documented static hosting and clarified that live forms, order storage, payment processing, and deployment configuration require external services/settings.
