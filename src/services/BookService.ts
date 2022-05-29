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
        getBookshelfBooks: build.query<IBookshelfBooksResponse, number>({
            query: (id: number) => ({
                url: `/api/v1/bookshelves/${id}/`,
            }),
            providesTags: () => {
                return ['Book']
            }
        }),
        searchBooks: build.query<IBookshelfBooksResponse, string>({
            query: (q: string) => ({
                url: `/api/v1/books/search`,
                params: {
                    q: q,
                    printType: 'books',
                    maxResults: 16,
                    projection: 'lite'
                }
            }),
            providesTags: result => {
                return ['Book']
            }
        }),
        setBookBookshelves: build.mutation<IBook, IBook>({
            query: (book) => {
                const urlencoded = new URLSearchParams();
                book.bookshelves.map((i) => {
                    urlencoded.append('bookshelves', i.toString());
                })

                return ({
                    url: `/api/v1/books/${book.google_id}/setBookshelves`,
                    method: 'POST',
                    body: urlencoded
                })
            },
            invalidatesTags: ['Book']
        }),
    })
})
