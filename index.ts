/**
 * Starlight Plugin type (minimal definition to avoid importing Starlight's internal modules)
 */
interface StarlightPlugin {
  name: string;
  hooks: {
    setup: (context: {
      config: { customCss?: string[] };
      updateConfig: (config: { customCss?: string[] }) => void;
    }) => void;
  };
}

export interface LuminousVoidOptions {
  /** Override the default accent color. Defaults to orange (#f97316) */
  accentColor?: string;
  /** Override the secondary accent color. Defaults to cyan (#22d3ee) */
  secondaryAccentColor?: string;
}

export default function luminousVoid(
  _options: LuminousVoidOptions = {}
): StarlightPlugin {
  return {
    name: "starlight-theme-luminous-void",
    hooks: {
      setup({ config, updateConfig }) {
        // Inject the theme CSS
        const customCss = config.customCss ?? [];
        updateConfig({
          customCss: [
            "starlight-theme-luminous-void/styles.css",
            ...customCss,
          ],
        });
      },
    },
  };
}
