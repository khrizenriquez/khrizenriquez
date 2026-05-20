import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    featured: z.boolean().default(false),
    order: z.number().int().positive(),
    language: z.enum(["es", "en"]).default("es"),
    type: z.string(),
    stack: z.array(z.string()).min(1),
    cover: z.string(),
    coverAlt: z.string(),
    repo: z.url().optional(),
    demo: z.url().optional(),
    cta: z.string(),
    summary: z.string(),
  }),
});

export const collections = { projects };
