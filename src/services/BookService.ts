import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {IBook, IBookEdit, IBooksResponse} from "../types/book";
import {baseQueryWithReauth} from "./BaseService";


export interface IBookListQueryParams {
    maxResults: number;
    startIndex: number;
}

export interface IBooksSearchParams {
    q: string;
    params: IBookListQueryParams;
}

export interface IBookshelfBooksParams {
    id: number;
    params: IBookListQueryParams;
}

export const bookAPI = createApi({
    reducerPath: 'bookAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Book'],
    refetchOnFocus: true,
    endpoints: (build) => ({
        getBookshelfBooks: build.query<IBooksResponse, IBookshelfBooksParams>({
            query: (props) => ({
                url: `/api/v1/bookshelves/${props.id}/`,
                params: {
                    maxResults: 21,
                    startIndex: 0,
                    ...props.params
                }
            }),
            providesTags: (result) =>
                result ?
                    [...result.items.map(({google_id: id}) => ({type: 'Book', id} as const)),
                        {type: 'Book', id: 'LIST'},
                    ] : [{type: 'Book', id: 'LIST'}],
        }),
        searchBooks: build.query<IBooksResponse, IBooksSearchParams>({
            query: (props) => ({
                url: `/api/v1/books/search`,
                params: {
                    q: props.q,
                    printType: 'books',
                    maxResults: 21,
                    projection: 'lite',
                    startIndex: 0,
                    ...props.params
                }
            }),
            providesTags: (result) =>
                result ?
                    [...result.items.map(({google_id: id}) => ({type: 'Book', id} as const)),
                        {type: 'Book', id: 'LIST'},
                    ] : [{type: 'Book', id: 'LIST'}],
        }),
        setBookBookshelves: build.mutation<IBook, IBookEdit>({
            query: (book) => {
                const urlencoded = new URLSearchParams();
                book.bookshelves.map((i) => {
                    urlencoded.append('bookshelves', i.toString());
                })

                return ({
                    url: `/api/v1/books/${book.id}/setBookshelves`,
                    method: 'POST',
                    body: urlencoded
                })
            },
            invalidatesTags: (result, error, book) =>
                [{type: 'Book', 'id': book.id}, {type: 'Book', 'id': 'LIST'}]
        }),
    })
})
