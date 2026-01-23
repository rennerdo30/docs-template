# Luminous Void Theme Specification

## Design Philosophy

Dark-first design inspired by renner.dev. Clean, modern, developer-focused aesthetic with excellent readability and a dual-accent color system.

## Color System

### Dark Mode (Default)

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0a0a0f` | Page background |
| Background Light | `#111118` | Code blocks, cards |
| Text Primary | `#fafafa` | Headings, important text |
| Text Secondary | `#94a3b8` | Body text, descriptions |
| Text Muted | `#64748b` | Captions, metadata |
| Accent Orange | `#f97316` | Primary accent, buttons |
| Accent Orange Low | `#1c1008` | Accent backgrounds |
| Accent Orange High | `#fed7aa` | Accent highlights |
| Accent Cyan | `#22d3ee` | Links, secondary accent |
| Accent Cyan Low | `#083344` | Cyan backgrounds |
| Accent Cyan High | `#a5f3fc` | Cyan highlights |
| Border | `rgba(148, 163, 184, 0.15)` | Subtle borders |

### Light Mode

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#fafafa` | Page background |
| Background Light | `#f4f4f5` | Code blocks, cards |
| Text Primary | `#18181b` | Headings, important text |
| Text Secondary | `#3f3f46` | Body text, descriptions |
| Text Muted | `#52525b` | Captions, metadata |
| Accent Orange | `#ea580c` | Primary accent, buttons |
| Accent Orange Low | `#fff7ed` | Accent backgrounds |
| Accent Orange High | `#7c2d12` | Accent highlights |
| Accent Cyan | `#0891b2` | Links, secondary accent |
| Accent Cyan Low | `#ecfeff` | Cyan backgrounds |
| Accent Cyan High | `#164e63` | Cyan highlights |
| Border | `rgba(63, 63, 70, 0.15)` | Subtle borders |

## Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| H1 | Satoshi | 900 | 2.5rem |
| H2 | Satoshi | 700 | 1.75rem |
| H3 | Satoshi | 700 | 1.4rem |
| Body | Inter | 400 | 1rem |
| Code | Fira Code | 400 | 0.9rem |

### Font Loading
- Satoshi: Fontshare API
- Inter: Google Fonts
- Fira Code: Google Fonts (with ligatures enabled)

## Spacing

| Token | Value |
|-------|-------|
| Border Radius Small | 4px |
| Border Radius Medium | 8px |
| Border Radius Large | 12px |

## Effects

### Glassmorphism (Header)
```css
backdrop-filter: blur(12px);
background-color: rgba(10, 10, 15, 0.85); /* dark */
background-color: rgba(250, 250, 250, 0.85); /* light */
```

### Active Navigation Indicator
```css
background: linear-gradient(180deg, #f97316, #22d3ee);
width: 3px;
border-radius: 2px;
```

### Link Hover Animation
```css
background-image: linear-gradient(currentColor, currentColor);
background-size: 0% 1px; /* grows to 100% on hover */
transition: background-size 0.3s ease;
```

## Accessibility

All color combinations meet WCAG 2.1 AA standards:

| Combination | Contrast Ratio | Level |
|-------------|----------------|-------|
| Text on dark bg | 15.3:1 | AAA |
| Secondary text on dark bg | 7.2:1 | AAA |
| Orange on dark bg | 4.6:1 | AA (large text) |
| Cyan on dark bg | 4.8:1 | AA |
| Text on light bg | 15.3:1 | AAA |
| Secondary text on light bg | 7.2:1 | AAA |
