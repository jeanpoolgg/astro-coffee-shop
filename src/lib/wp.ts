import { BaseWPSchema, ProcessPageSchema, PostsSchema, PostSchema, CategoriesSlugSchema } from "@/types"

const baseUrl = import.meta.env.WP_API_URL


export const getPageNosotros = async () => {
    const response = await fetch(`${baseUrl}/pages?slug=nosotros`)
    if (!response.ok) throw new Error("Failed to fetch page about us")
    const [data] = await response.json()
    const dataAboutUs = BaseWPSchema.parse(data)
    const { title: { rendered: pageTitle }, acf: { subtitle }, featured_images: { medium_large: image }, content: { rendered: content } } = dataAboutUs
    return { pageTitle, subtitle, image, content }
}


export const getPageProceso = async () => {
    const response = await fetch(`${baseUrl}/pages?slug=proceso`)
    if (!response.ok) throw new Error("Failed to fetch page process")
    const [data] = await response.json()
    const dataProcess = ProcessPageSchema.parse(data)
    const { title: { rendered: pageTitle }, acf, featured_images: { medium_large: image }, content: { rendered: content } } = dataProcess
    return { pageTitle, acf, image, content }
}



export const getPageBlog = async () => {
    const response = await fetch(`${baseUrl}/pages?slug=blog`)
    if (!response.ok) throw new Error("Failed to fetch page blog")
    const [data] = await response.json()
    const dataAboutUs = BaseWPSchema.parse(data)
    const { title: { rendered: pageTitle }, acf: { subtitle }, featured_images: { medium_large: image }, content: { rendered: content } } = dataAboutUs
    return { pageTitle, subtitle, image, content }
}


export const getPosts = async () => {
    const response = await fetch(`${baseUrl}/posts`)
    if (!response.ok) throw new Error("Failed to fetch posts")
    const data = await response.json()
    const posts = PostsSchema.parse(data)
    return posts
}

export const getPost = async (slug?: string) => {
    const response = await fetch(`${baseUrl}/posts?slug=${slug}`)
    if (!response.ok) throw new Error("Failed to fetch post")
    const [json] = await response.json()
    const post = PostSchema.safeParse(json)
    return post
}

export const getCategories = async() => {
    const response = await fetch(`${baseUrl}/categories?_fields=slug`)
    const json = await response.json()
    const categories = CategoriesSlugSchema.parse(json)
    return categories
}