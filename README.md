# Luminous Void Theme for Astro Starlight

A dark-first documentation theme for [Astro Starlight](https://starlight.astro.build) — near-black background, orange primary accent, cyan secondary accent. Inspired by [renner.dev](https://renner.dev).

It ships as a tiny Starlight plugin whose only job is to add `styles.css` to Starlight's `customCss`. All of the theme lives in that one stylesheet, overriding Starlight's `--sl-color-*` custom properties.

## Features

- Dark mode by default, with a light mode whose accents are darkened for readable contrast
- Custom typography: Satoshi (headings), Inter (body), Fira Code (code)
- Every text/background pair in both modes measured at WCAG AA or better (see [SPECIFICATION.md](SPECIFICATION.md))
- A `--lv-*` token layer for radii, motion, elevation and accents — recolor the theme by setting one property
- Visible keyboard focus rings, hover/active states, and no motion at all under `prefers-reduced-motion`
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

### Plugin options

`luminousVoid()` takes an options object typed as `LuminousVoidOptions`:

| Option | Type | Default | Sets |
| --- | --- | --- | --- |
| `accentColor` | `string` | `#f97316` | `--sl-color-accent` |
| `secondaryAccentColor` | `string` | `#22d3ee` | `--lv-accent-cyan`, `--sl-color-text-accent` |

```js
starlight({
  plugins: [luminousVoid({ accentColor: "#a855f7" })],
});
```

Buttons, tints, focus rings, the active-navigation rail and text selection are all mixed from `--sl-color-accent`, so setting that one value carries through. Both options apply to dark and light mode alike, so choose colors with enough contrast on a near-black *and* a near-white background.

### Custom properties

For per-mode control, override the properties in a stylesheet loaded after the theme:

```css
:root,
:root[data-theme="dark"] {
  --sl-color-accent: #a855f7; /* primary accent */
  --lv-accent-cyan: #34d399;  /* secondary accent */
  --lv-on-accent: #0a0a0f;    /* text on top of an accent fill */
}

:root[data-theme="light"] {
  --sl-color-accent: #7e22ce;
  --lv-accent-cyan: #047857;
  --lv-on-accent: #ffffff;
}
```

Use `:root[data-theme="light"]`, not `[data-theme="light"]`: Starlight declares its own light palette on `:root[data-theme='light']`, which outranks the shorter selector and would silently win.

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
| Primary accent | `#c2410c` (orange) |
| Secondary accent | `#0e7490` (cyan) |
| Code block background | `#f4f4f5` |

The light accents are darker than the dark-mode ones so accent-colored text and
white-on-accent buttons both stay above 4.5:1.

## Typography

Fonts are pulled from CDNs by `@import` inside `styles.css`: Satoshi from Fontshare, Inter and Fira Code from Google Fonts. If you need self-hosted fonts or zero third-party requests, replace those three `@import` lines and the `--sl-font` / `--sl-font-mono` / `--lv-font-heading` values.

## Repository layout

```
index.ts           # the Starlight plugin (injects styles.css, applies the options)
styles.css         # the entire theme: tokens, palettes, component styles
SPECIFICATION.md   # token reference and measured contrast ratios
docs/              # example Starlight site used as the theme's own documentation
templates/         # starter astro.config.mjs, package.json and Pages deploy workflow to copy
```

The `docs/` site is the source for the project documentation. Its Pages deployment is not currently live, so read the pages under `docs/src/content/` in the repository instead.

## License

MIT — see [LICENSE](LICENSE).
