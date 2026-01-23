# Luminous Void Theme for Astro Starlight

A dark-first documentation theme with beautiful orange/cyan accents. Inspired by [renner.dev](https://renner.dev).

## Features

- Dark and light modes with WCAG-compliant contrast
- Custom typography: Satoshi (headings), Inter (body), Fira Code (code)
- Minimal setup - just one line in your config
- Easy updates via npm

## Installation

```bash
npm install starlight-theme-luminous-void
```

## Usage

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import luminousVoid from "starlight-theme-luminous-void";

export default defineConfig({
  integrations: [
    starlight({
      title: "My Docs",
      plugins: [luminousVoid()],
    }),
  ],
});
```

## Documentation

See the [full documentation](https://rennerdo30.github.io/docs-template/) for customization options and deployment guides.

## Color Palette

### Dark Mode (Default)
- Background: `#0a0a0f`
- Primary Accent: `#f97316` (orange)
- Secondary Accent: `#22d3ee` (cyan)
- Text: `#fafafa`

### Light Mode
- Background: `#fafafa`
- Primary Accent: `#ea580c` (orange)
- Secondary Accent: `#0891b2` (cyan)
- Text: `#18181b`

## License

MIT
