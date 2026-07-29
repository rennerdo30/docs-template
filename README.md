# Luminous Void Theme for Astro Starlight

A dark-first documentation theme for [Astro Starlight](https://starlight.astro.build) — near-black background, orange primary accent, cyan secondary accent. Inspired by [renner.dev](https://renner.dev).

It ships as a tiny Starlight plugin whose only job is to add `styles.css` to Starlight's `customCss`. All of the theme lives in that one stylesheet, overriding Starlight's `--sl-color-*` custom properties.

## Features

- Dark mode by default, with a light mode whose accents are darkened for readable contrast
- Custom typography: Satoshi (headings), Inter (body), Fira Code (code)
- One line in your Starlight config
- No runtime dependencies — one plugin file and one stylesheet

## Status

Not published to npm yet: `.github/workflows/publish.yml` publishes `starlight-theme-luminous-void` when a GitHub release is created, and there are no releases so far. Use one of the local options below in the meantime.

## Usage

### Option A: stylesheet only (no build step)

Copy `styles.css` into your Starlight project and reference it directly:

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "My Docs",
      customCss: ["./src/styles/luminous-void.css"],
    }),
  ],
});
```

This is all the plugin does, so the result is identical.

### Option B: as a local plugin package

```bash
git clone https://github.com/rennerdo30/docs-template.git
cd docs-template
npm install
npm run build          # tsc -> dist/
```

Then depend on it from your docs project by path — this is exactly how the example site in `docs/` consumes it (`"starlight-theme-luminous-void": "file:.."`):

```json
{
  "dependencies": {
    "starlight-theme-luminous-void": "file:../docs-template"
  }
}
```

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

Once the package is on npm, `npm install starlight-theme-luminous-void` replaces the clone-and-build step and the config above stays the same.

## Requirements

- `@astrojs/starlight` >= 0.30 (developed against 0.32)
- Astro 5
- TypeScript 5.7+ if you build the plugin yourself

## Customization

Override the custom properties after the theme's stylesheet — they are ordinary CSS variables:

```css
:root,
[data-theme="dark"] {
  --sl-color-accent: #a855f7; /* primary accent */
  --lv-accent-cyan: #34d399;  /* secondary accent */
}
```

`luminousVoid()` accepts an options object typed as `LuminousVoidOptions` (`accentColor`, `secondaryAccentColor`), but those values are currently ignored — the CSS override above is the way to recolor the theme today.

## Color Palette

### Dark Mode (Default)

| Role | Value |
| --- | --- |
| Background | `#0a0a0f` |
| Text | `#fafafa` |
| Primary accent | `#f97316` (orange) |
| Secondary accent | `#22d3ee` (cyan) |
| Code block background | `#111118` |

### Light Mode

| Role | Value |
| --- | --- |
| Background | `#fafafa` |
| Text | `#18181b` |
| Primary accent | `#ea580c` (orange) |
| Secondary accent | `#0891b2` (cyan) |
| Code block background | `#f4f4f5` |

## Typography

Fonts are pulled from CDNs by `@import` inside `styles.css`: Satoshi from Fontshare, Inter and Fira Code from Google Fonts. If you need self-hosted fonts or zero third-party requests, replace those three `@import` lines and the `--sl-font` / `--sl-font-mono` / `--lv-font-heading` values.

## Repository layout

```
index.ts        # the Starlight plugin (injects styles.css)
styles.css      # the entire theme
docs/           # example Starlight site used as the theme's own documentation
templates/      # starter astro.config.mjs, package.json and Pages deploy workflow to copy
```

The `docs/` site is the source for the project documentation. Its Pages deployment is not currently live, so read the pages under `docs/src/content/` in the repository instead.

## License

MIT — see [LICENSE](LICENSE).
