import {useState} from "react";
import BooksService from "../API/BooksService";
import BookList from "../components/book-list";
import {useFetching} from "../hooks/useFetching";
import DefaultLayout from "../layouts/default"
import {IBook} from "../types/book";

const Index = () => {
    const [books, setBooks] = useState<IBook[]>([])

    const [fetchBooks, isBooksLoading, booksError] = useFetching(async (value) => {
        if (value.trim() === '') {
            return setBooks([])
        }
        const response = await BooksService.search(value);
        setBooks(response.totalItems ? response.items : [])
    })

    return (
        <DefaultLayout onSearchChange={fetchBooks} isSearchLoading={isBooksLoading}>
            <BookList books={books}/>
            {/*<BookList books={books}/>*/}
            {/*<BookList books={books}/>*/}
            {/*<BookList books={books}/>*/}
            {/*<BookList books={books}/>*/}
            {/*<BookList books={books}/>*/}
            {/*<BookList books={books}/>*/}
            {/*<BookList books={books}/>*/}
            {/*<BookList books={books}/>*/}
            {/*<BookList books={books}/>*/}
            {/*<BookList books={books}/>*/}
            {/*<BookList books={books}/>*/}
        </DefaultLayout>
    );
};

export default Index;
