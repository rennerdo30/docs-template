import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import mermaid from "astro-mermaid";
import luminousVoid from "starlight-theme-luminous-void";

export default defineConfig({
  site: "https://rennerdo30.github.io/docs-template",
  base: "/docs-template",
  integrations: [
    // Must be listed before starlight: astro-mermaid registers the remark
    // plugin that has to see ```mermaid fences before Starlight processes
    // the markdown.
    mermaid({
      // Follows Starlight's light/dark toggle via the data-theme attribute.
      autoTheme: true,
    }),
    starlight({
      title: "Luminous Void Docs",
      description: "Documentation template with the Luminous Void theme",
      plugins: [luminousVoid()],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/rennerdo30/docs-template",
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "index" },
            { label: "Installation", slug: "getting-started/installation" },
            { label: "Configuration", slug: "getting-started/configuration" },
          ],
        },
        {
          label: "Guides",
          items: [
            { label: "Customization", slug: "guides/customization" },
            { label: "Deployment", slug: "guides/deployment" },
            { label: "Diagrams", slug: "guides/diagrams" },
          ],
        },
      ],
    }),
  ],
});
