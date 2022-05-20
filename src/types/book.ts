export interface IBook {
    id: string,
    title: string,
    authors: string[],
    image: string | null,
    bookshelves: number[]
}

export interface IBookshelf {
    id: number,
    title: string,
    volumeCount: number,
}