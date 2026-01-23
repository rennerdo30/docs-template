// Copy this file to your project root and customize

import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import luminousVoid from "starlight-theme-luminous-void";

export default defineConfig({
  // Update these for your project
  site: "https://USERNAME.github.io",
  base: "/REPO-NAME",

  integrations: [
    starlight({
      title: "My Documentation",
      plugins: [luminousVoid()],

      // Add your social links
      social: {
        github: "https://github.com/USERNAME/REPO-NAME",
      },

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
