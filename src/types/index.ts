import { z } from "astro:schema"

const imageSchema = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number()
})

const featuredImagesSchema = z.object({
    thumbnail: imageSchema,
    medium: imageSchema,
    medium_large: imageSchema,
    large: imageSchema,
    full: imageSchema
})

export const BaseWPSchema = z.object({
    id: z.number(),
    title: z.object({
        rendered: z.string()
    }),
    content: z.object({
        rendered: z.string()
    }),
    featured_images: featuredImagesSchema,
    acf: z.object({
        subtitle: z.string()
    }).catchall(z.any()) // Allow any additional properties
})

const processSchema = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
})

export const ProcessPageSchema = BaseWPSchema.extend({
    acf: z.object({
        subtitle: z.string()
    }).catchall(processSchema)
})