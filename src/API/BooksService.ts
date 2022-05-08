import $api from "../http";
import {IBook} from "../types/book";

interface BooksSearchResponse {
    totalItems: number;
    items: IBook[]
}

export default class BooksService {
    static _apiBase = process.env.BASE_URL

    static async search(query: string) {
        return await $api.get<BooksSearchResponse>(this._apiBase + '/api/v1/books/search', {
            params: {
                q: query,
                printType: 'books',
                maxResults: 16,
                projection: 'lite'
            }
        });
    }

}