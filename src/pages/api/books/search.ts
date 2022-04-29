import {NextApiRequest, NextApiResponse} from 'next'
import axios from "axios";
import {IBook} from "../../../types/book";

interface SearchNextApiRequest extends NextApiRequest {
    query: {
        q: string,
        printType?: 'all' | 'books' | 'magazines',
        projection?: 'full' | 'lite',
        startIndex?: string
        maxResults?: string
    }
}

export default async function echo(req: SearchNextApiRequest, res: NextApiResponse) {
    const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
            q: req.query.q,
            startIndex: req.query.startIndex ? req.query.startIndex : 0,
            maxResults: req.query.maxResults ? req.query.maxResults : 16,
            printType: req.query.printType ? req.query.printType : 'books',
            projection: req.query.projection ? req.query.projection : 'lite'
        }
    }).then(function (response) {
        const books = response.data.items.map(b => <IBook>{
                id: b.id,
                title: b.volumeInfo.title,
                authors: b.volumeInfo.authors,
                publishedDate: b.volumeInfo.publishedDate,
                image: b.volumeInfo.readingModes.image ? b.volumeInfo.imageLinks.thumbnail : null,
                description: b.volumeInfo.readingModes.text ? b.volumeInfo.description : null,
            }
        )

        res.status(200).json({
            totalItems: response.data.totalItems,
            items: books,
        })
    }).catch(error => {
        if (error.response) {
            res.status(error.response.status).json(error.response.data)
        } else {
            res.status(500).json(error)
        }
    });

}