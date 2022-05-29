import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {IBook} from "../types/book";
import {baseQueryWithReauth} from "./BaseService";

interface IBookshelfBooksResponse {
    totalItems: number;
    items: IBook[];
}

export const bookshelfAPI = createApi({
    reducerPath: 'bookshelfAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Bookshelf'],
    endpoints: (build) => ({
        getBookshelfBooks: build.query<IBookshelfBooksResponse, number>({
            query: (id: number) => ({
                url: `/api/v1/bookshelves/${id}/`,
            })
        }),
    })
})
