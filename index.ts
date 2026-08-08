/** Path Starlight resolves the theme stylesheet from. */
const THEME_STYLESHEET = "starlight-theme-luminous-void/styles.css";

/** Custom properties the plugin options map onto. */
const ACCENT_PROPERTY = "--sl-color-accent";
const SECONDARY_ACCENT_PROPERTIES = [
  "--lv-accent-cyan",
  "--sl-color-text-accent",
];

/**
 * Starlight renders `head` entries before the `customCss` stylesheet links, so
 * an override written as plain `:root` would lose to the theme's own palette
 * blocks, which come later in the cascade. Those blocks are selected with two
 * classes' worth of specificity (`:root[data-theme="dark"]`,
 * `:root[data-theme="light"]`), so the injected rule needs three to outrank
 * them in either color mode.
 */
const OVERRIDE_SELECTOR = ":root:root:root";

/**
 * Minimal shape of the Starlight plugin API used here, so the package does not
 * have to import Starlight's internal modules to build.
 */
interface StarlightHeadEntry {
  tag: string;
  attrs?: Record<string, string | boolean | undefined>;
  content?: string;
}

interface StarlightThemeConfig {
  customCss?: string[];
  head?: StarlightHeadEntry[];
}

interface StarlightPlugin {
  name: string;
  hooks: {
    setup: (context: {
      config: StarlightThemeConfig;
      updateConfig: (config: StarlightThemeConfig) => void;
    }) => void;
  };
}

export interface LuminousVoidOptions {
  /** Override the primary accent color. Defaults to orange (#f97316). */
  accentColor?: string;
  /** Override the secondary accent color. Defaults to cyan (#22d3ee). */
  secondaryAccentColor?: string;
}

/**
 * Builds a `:root` declaration block for the given overrides, or `undefined`
 * when there is nothing to override.
 *
 * Overrides apply to both color modes: the theme cannot derive a light-mode
 * counterpart for an arbitrary color, so pick one with enough contrast on both
 * backgrounds — or override the properties per mode in your own stylesheet.
 */
function buildOverrideCss(options: LuminousVoidOptions): string | undefined {
  const declarations: string[] = [];

  if (options.accentColor) {
    declarations.push(`${ACCENT_PROPERTY}: ${options.accentColor};`);
  }

  if (options.secondaryAccentColor) {
    for (const property of SECONDARY_ACCENT_PROPERTIES) {
      declarations.push(`${property}: ${options.secondaryAccentColor};`);
    }
  }

  if (declarations.length === 0) return undefined;

  return `${OVERRIDE_SELECTOR} { ${declarations.join(" ")} }`;
}

export default function luminousVoid(
  options: LuminousVoidOptions = {}
): StarlightPlugin {
  return {
    name: "starlight-theme-luminous-void",
    hooks: {
      setup({ config, updateConfig }) {
        const customCss = config.customCss ?? [];
        const overrideCss = buildOverrideCss(options);

        const update: StarlightThemeConfig = {
          // Theme first, so a project's own stylesheets still win over it.
          customCss: [THEME_STYLESHEET, ...customCss],
        };

        // Only touch `head` when there is something to inject, so an existing
        // head configuration is never replaced.
        if (overrideCss) {
          update.head = [
            ...(config.head ?? []),
            // Appended last so the overrides win over the theme stylesheet.
            { tag: "style", content: overrideCss },
          ];
        }

        updateConfig(update);
      },
    },
  };
}
