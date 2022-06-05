import {IBookshelf} from "./book";


export interface IUser {
    id: string;
    google_id: string;
    email: string;
    name: string;
    picture: string;
    locale: string;
    bookshelves: IBookshelf[];
}