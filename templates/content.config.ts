// Copy this file to src/content.config.ts in your project.
//
// Astro 7 removed implicit content-directory collections, so the loader has to be
// declared explicitly. Without it the build fails with
// 'The collection "docs" does not exist or is empty' and every sidebar slug errors.

import { defineCollection } from "astro:content";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
};
