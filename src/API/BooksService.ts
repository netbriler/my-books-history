import axios from "axios";
import {IBook} from "../types/book";

export default class BooksService {
    static _apiBase = process.env.BASE_URL

    static async search(query: string) {
        return await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: query,
                printType: 'books',
                maxResults: 16,
                projection: 'lite'
            }
        }).then((response) => {
            const books = response.data.items.map(b => <IBook>{
                    id: b.id,
                    title: b.volumeInfo.title,
                    authors: b.volumeInfo.authors,
                    image: b.volumeInfo.readingModes.image ? b.volumeInfo.imageLinks.thumbnail : null,
                }
            )

            return {
                totalItems: response.data.totalItems,
                items: books,
            }
        })
    }

}