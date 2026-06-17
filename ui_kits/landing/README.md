# Landing — UI kit

The commercial landing page for BoxForge — the page the box manufacturer would publish to sell the self-service configurator to its customers.

## Files
- `index.html` — the full page, single self-contained file (inline CSS, DS tokens). Above-the-fold: nav · hero with a **live interactive 3D box** · trust line. Below: a metrics strip · a 3-feature "por qué BoxForge" section · footer.

## Notes
- Reuses the real `<box-viewer>` (`viewer/box-viewer.js`) + `BoxForgePacking` (`viewer/packing.js`) so the hero box is the same engine as the product, not a static image.
- Feature icons are inline Lucide SVGs (1.75 stroke) to match the brand icon language; the page does not depend on the component bundle for icons.
- "Probar la calculadora" links to `../configurator/index.html`.
- Copy follows the content rules in the root `readme.md`: Spanish, *tú*, sentence case, no hype.
