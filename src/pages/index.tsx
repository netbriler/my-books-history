import Search from "../components/search";
import {useState} from "react";
import BooksService from "../API/BooksService";
import {useFetching} from "../hooks/useFetching";
import BookList from "../components/bookList";
import DefaultLayout from "../layouts/default"
import {IBook} from "../types/book";

const Index = () => {
    const [books, setBooks] = useState<IBook[]>([])

    const [fetchBooks, isBooksLoading, booksError] = useFetching(async (value) => {
        if (value.trim() === '') {
            return setBooks([])
        }
        const response = await BooksService.search(value);
        setBooks(response.data.totalItems ? response.data.items : [])
    })

    return (
        <DefaultLayout>
            <Search onChange={fetchBooks} isLoading={isBooksLoading}/>
            <BookList books={books}/>
        </DefaultLayout>
    );
};

export default Index;
