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

const gallerySchema = z.object({
    large: imageSchema,
    full: imageSchema
})



export const GalleryPageSchema = BaseWPSchema.extend({
    gallery: z.array(gallerySchema)
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

export const CategorySchema = z.object({
    id: z.number(),
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

const MenuItemSchema = BaseWPSchema.pick({
    title: true,
    featured_images: true
}).extend({
    acf: z.object({
        description: z.string(),
        price: z.coerce.number()
    })
})

export const MenuItemsSchema = z.array(MenuItemSchema)


export type Post = z.infer<typeof PostSchema>
export type Gallery = z.infer<typeof gallerySchema>
export type FeatureImages = z.infer<typeof featuredImagesSchema>