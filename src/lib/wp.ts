import { BaseWPSchema, ProcessPageSchema } from "@/types"

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

