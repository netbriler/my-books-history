export interface IBook {
    google_id: string;
    title: string;
    authors: string[];
    image: string | null;
    bookshelves: number[];
}

export interface IBookEdit {
    id: string;
    bookshelves: number[] | string[];
}

export interface IBookshelf {
    id: number;
    title: string;
    volumeCount: number;
}

export interface IBooksResponse {
    totalItems: number;
    items: IBook[];
}