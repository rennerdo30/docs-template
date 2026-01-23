import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import luminousVoid from "starlight-theme-luminous-void";

export default defineConfig({
  site: "https://rennerdo30.github.io/docs-template",
  base: "/docs-template",
  integrations: [
    starlight({
      title: "Luminous Void Docs",
      description: "Documentation template with the Luminous Void theme",
      plugins: [luminousVoid()],
      social: {
        github: "https://github.com/rennerdo30/docs-template",
      },
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
          ],
        },
      ],
    }),
  ],
});
