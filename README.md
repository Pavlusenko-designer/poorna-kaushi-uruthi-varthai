# Poorna & Kaushi · Uruthi Varthai

A mobile-first, animated invitation in English and Tamil for **20 November 2026, 7–9 AM IST**, at Annapurna Arunya Hall, Coimbatore.

## Development

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run build
```

The static website is generated in `dist/`. It requires no environment variables, accounts, or backend.

## Netlify continuous deployment

Import this GitHub repository into Netlify and use `main` as the production branch. The included `netlify.toml` configures:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: `22`

Once the repository is connected, pushes to `main` trigger Netlify builds and production deployments.

## Content and assets

- Invitation details and map location: `src/content.js`
- English and Tamil text: `src/translations.js`
- Page structure and scroll animation: `src/main.js`
- Styles: `src/style.css`, `src/opening.css`, `src/venue.css`, `src/responsive.css`, and `src/language.css`
- Current source portraits: `Poorna-c.png` and `Kaushi-c.png`
- Optimized portraits and messenger preview: `public/images/`
- Bundled typefaces and licenses: `public/fonts/`

The language switcher remembers the guest's choice. Add `?lang=ta` to open the Tamil invitation directly. The map is requested only when a guest opens it. Reduced-motion preferences show a static version of the opening.

Run `node scripts/prepare-assets.mjs` when regenerating portraits, the sharing image, and English fonts. Run `node scripts/prepare-tamil-fonts.mjs` to regenerate Tamil fonts. These scripts need internet access to fetch fonts; ordinary builds use the included local assets.

After choosing the production domain, set absolute `og:url` and `og:image` URLs in `index.html` for the broadest messenger compatibility.
