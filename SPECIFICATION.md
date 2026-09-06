# Luminous Void Theme Specification

## Design Philosophy

Dark-first design inspired by renner.dev. Clean, modern, developer-focused aesthetic with excellent readability and a dual-accent color system.

Everything is expressed as custom properties in `styles.css`: Starlight's `--sl-color-*` palette plus a small `--lv-*` token layer for radii, motion, elevation and accent-derived values. Rules further down the stylesheet only reference tokens, so retuning the theme means editing the token blocks.

## Color System

### Dark Mode (Default)

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0a0a0f` | Page background |
| Surface | `#111118` | Cards, code blocks (`--lv-surface`) |
| Text Primary | `#fafafa` | Headings, important text |
| Text Secondary | `#94a3b8` | Body text, descriptions |
| Text Muted | `#7c8da8` | Captions, metadata |
| Accent Orange | `#f97316` | Primary accent, buttons |
| Accent Orange Low | `#1c1008` | Accent backgrounds |
| Accent Orange High | `#fed7aa` | Accent highlights |
| Accent Cyan | `#22d3ee` | Links, secondary accent |
| Accent Cyan Low | `#083344` | Cyan backgrounds |
| Accent Cyan High | `#a5f3fc` | Cyan highlights |
| Border | `rgba(148, 163, 184, 0.15)` | Subtle borders |

### Light Mode

Light-mode accents are darker than their dark-mode counterparts so that both
accent-colored text and text drawn on top of an accent fill clear 4.5:1.

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#fafafa` | Page background |
| Surface | `#ffffff` | Cards, raised panels (`--lv-surface`) |
| Text Primary | `#18181b` | Headings, important text |
| Text Secondary | `#52525b` | Body text, descriptions |
| Text Muted | `#71717a` | Captions, metadata |
| Accent Orange | `#c2410c` | Primary accent, buttons |
| Accent Orange Low | `#fff7ed` | Accent backgrounds |
| Accent Orange High | `#7c2d12` | Accent highlights |
| Accent Cyan | `#0e7490` | Links, secondary accent |
| Accent Cyan Low | `#ecfeff` | Cyan backgrounds |
| Accent Cyan High | `#164e63` | Cyan highlights |
| Border | `rgba(63, 63, 70, 0.15)` | Subtle borders |

### Cascade requirement

Starlight declares its own light palette on `:root[data-theme='light']`. The
theme's light block must use the same selector shape (`:root[data-theme="light"]`)
or it loses on specificity and light mode silently falls back to Starlight's
defaults.

### Accent-derived tokens

Mixed from `--sl-color-accent` at use time, so overriding the accent — directly
or through the plugin's `accentColor` option — carries through:

| Token | Purpose |
|-------|---------|
| `--lv-accent-gradient` | Primary button fill |
| `--lv-accent-gradient-hover` | Primary button hover fill |
| `--lv-accent-tint` | Active sidebar item background |
| `--lv-accent-glow` | Primary button hover shadow |
| `--lv-selection-bg` | Text selection |
| `--lv-on-accent` | Text drawn on an accent fill (set per mode) |

## Typography

| Element | Font | Weight |
|---------|------|--------|
| H1 | Satoshi | 900 |
| H2 / H3 | Satoshi | 700 |
| H4–H6 | Satoshi | inherited from Starlight |
| Body | Inter | 400 |
| Code | Fira Code | 400 |

Sizes come from Starlight's fluid `--sl-text-*` scale; the theme only sets the
families, weights and tighter heading letter-spacing. Headings use
`text-wrap: balance`, prose uses `text-wrap: pretty`.

### Font Loading
- Satoshi: Fontshare API
- Inter: Google Fonts
- Fira Code: Google Fonts (with ligatures enabled)

## Radii and motion

| Token | Value | Applied to |
|-------|-------|------------|
| `--lv-radius-sm` | `0.25rem` | Inline code, sidebar items |
| `--lv-radius-md` | `0.5rem` | Buttons, code frames, asides, search |
| `--lv-radius-lg` | `0.75rem` | Cards |
| `--lv-duration-fast` | `120ms` | Navigation hover |
| `--lv-duration-base` | `200ms` | Everything else |
| `--lv-easing` | `cubic-bezier(0.4, 0, 0.2, 1)` | All transitions |

Transitions are scoped to the elements that actually change (theme switch,
hover) rather than applied with a universal selector. All animation and movement
is disabled under `prefers-reduced-motion: reduce`.

## Effects

### Glassmorphism (Header)
```css
backdrop-filter: blur(var(--lv-header-blur)); /* 12px */
background-color: var(--lv-bg-glass);
```

### Active Navigation Indicator
```css
/* 3px rail inside the active sidebar item, plus an accent tint behind it */
background: linear-gradient(180deg, var(--sl-color-accent), var(--lv-accent-cyan));
```

### Link Hover Animation
```css
background-image: linear-gradient(currentColor, currentColor);
background-size: 0% 1px; /* grows to 100% on hover or keyboard focus */
transition: background-size var(--lv-duration-base) var(--lv-easing);
```

### Focus ring
```css
outline: var(--lv-focus-width) solid var(--sl-color-accent);
outline-offset: var(--lv-focus-offset);
```

## Accessibility

Measured with the WCAG 2.1 relative-luminance formula against the page
background of the respective mode:

| Combination | Contrast Ratio | Level |
|-------------|----------------|-------|
| Body text on background (dark) | 18.9:1 | AAA |
| Secondary text on background (dark) | 7.7:1 | AAA |
| Muted text on background (dark) | 5.9:1 | AA |
| Orange accent on background (dark) | 7.0:1 | AAA |
| Cyan accent on background (dark) | 10.9:1 | AAA |
| Button label on orange fill (dark) | 7.0:1 | AAA |
| Body text on background (light) | 17.0:1 | AAA |
| Secondary text on background (light) | 7.4:1 | AAA |
| Muted text on background (light) | 4.6:1 | AA |
| Orange accent on background (light) | 5.0:1 | AA |
| Cyan accent on background (light) | 5.1:1 | AA |
| Button label on orange fill (light) | 5.2:1 | AA |

Custom accent colors are not checked for you — the plugin injects them as-is.
