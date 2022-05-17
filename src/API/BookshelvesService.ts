import $api from "../http";
import {IBook, IBookshelf} from "../types/book";


interface IBookshelfBooksResponse {
    totalItems: number;
    items: IBook[];
}

export default class BookshelvesService {
    static _apiBase = process.env.BASE_URL

    static async getBookshelves() {
        return await $api.get<IBookshelf[]>(this._apiBase + '/api/v1/bookshelves/')
    }

    static async getBookshelfBooks(id: number) {
        return await $api.get<IBookshelfBooksResponse>(this._apiBase + `/api/v1/bookshelves/${id}/`,{
            params: {
                maxResults: 40,
            }
        })
    }

}