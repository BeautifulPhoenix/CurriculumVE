import { z, defineCollection } from 'astro:content';

const educationCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    institution: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    degree: z.string().optional(),
  }),
});

export default educationCollection;