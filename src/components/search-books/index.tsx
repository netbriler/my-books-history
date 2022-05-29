import {FC, useContext, useEffect} from "react";
import {SearchContext} from "../../pages/_app";
import {bookAPI} from "../../services/BookService";
import BookList from "../book-list";


interface SearchBooksProps {
    value: string
}


const SearchBooks: FC<SearchBooksProps> = ({value}) => {
    const {data: booksData, isFetching, isLoading, isUninitialized } = bookAPI.useSearchBooksQuery(value);
    const books = booksData !== undefined ? booksData.items : [];

    const {setSearch} = useContext(SearchContext);

    useEffect(() => {
        setSearch({isLoading: isFetching, value: value});
    }, [isFetching])

    return (
        <BookList books={books} title={'Search'} isLoading={isLoading || isUninitialized }/>
    );
};

export default SearchBooks;
