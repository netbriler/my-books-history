import axios from "axios";
import {IBook} from "../types/book";

interface BooksSearchResponse {
    totalItems: number;
    items: IBook[]
}

export default class BooksService {
    static async search(query: string) {
        return await axios.get<BooksSearchResponse>('/api/books/search', {
            params: {
                q: query,
                printType: 'books',
                maxResults: 16,
                projection: 'lite'
            }
        });
    }

}