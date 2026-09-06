// Copy this file to your project root and customize

import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import mermaid from "astro-mermaid";
import luminousVoid from "starlight-theme-luminous-void";

export default defineConfig({
  // Update these for your project
  site: "https://USERNAME.github.io",
  base: "/REPO-NAME",

  integrations: [
    // Must stay before starlight: astro-mermaid registers the remark plugin
    // that has to see ```mermaid fences before Starlight processes the markdown.
    mermaid({
      // Follows Starlight's light/dark toggle via the data-theme attribute.
      autoTheme: true,
    }),
    starlight({
      title: "My Documentation",
      plugins: [luminousVoid()],

      // Add your social links
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/USERNAME/REPO-NAME",
        },
      ],

      // Configure your sidebar
      sidebar: [
        { label: "Home", slug: "index" },
        {
          label: "Getting Started",
          items: [
            { label: "Installation", slug: "getting-started/installation" },
          ],
        },
      ],
    }),
  ],
});
