import axios from "axios";

export default class BooksService {
    static async search(query: string) {
        return await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: query,
                printType: 'books',
                maxResults: 35
            }
        });
    }

}