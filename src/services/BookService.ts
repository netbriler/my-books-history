import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {IBook} from "../types/book";
import {baseQueryWithReauth} from "./BaseService";

interface IBookshelfBooksResponse {
    totalItems: number;
    items: IBook[];
}

export const bookAPI = createApi({
    reducerPath: 'bookAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Book'],
    endpoints: (build) => ({
        getBookshelfBooks: build.query<IBookshelfBooksResponse, string>({
            query: (q: string) => ({
                url: `/api/v1/books/search`,
                params: {
                    q: q,
                    printType: 'books',
                    maxResults: 16,
                    projection: 'lite'
                }
            })
        }),
    })
})
