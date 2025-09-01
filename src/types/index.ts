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
    })
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

const CategorySchema = z.object({
    name: z.string(),
    slug: z.string()
})

export const CategoriesSlugSchema = z.array(CategorySchema.pick({
    slug: true
}))

const CategoriesSchema = z.array(CategorySchema)

export const PostSchema = BaseWPSchema.omit({
    acf: true
}).extend({
    slug: z.string(),
    date: z.string(),
    category_details: CategoriesSchema
})

export const PostsSchema = z.array(PostSchema)

export type Post = z.infer<typeof PostSchema>