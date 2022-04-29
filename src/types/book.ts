export interface IBook {
    id: string,
    title: string,
    authors: string[],
    publishedDate: string,
    image: string | null,
    description: string | null,
}