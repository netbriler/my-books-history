import axios from "axios";

export default class BooksService {
    static async search(query: string) {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: query,
                printType: 'books',
                maxResults: 35
            }
        })
        return response;
    }

}