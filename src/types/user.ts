import {IBookshelf} from "./book";


export interface IUser {
    id: string,
    google_id: string,
    email: string;
    bookshelves: IBookshelf[]
}