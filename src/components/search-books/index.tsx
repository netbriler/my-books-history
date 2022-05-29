import {FC, useContext, useEffect} from "react";
import {SearchContext} from "../../pages/_app";
import {bookAPI} from "../../services/BookService";
import BookList from "../book-list";


interface SearchBooksProps {
    value: string
}


const SearchBooks: FC<SearchBooksProps> = ({value}) => {
    const {data: booksData, error, isFetching, isUninitialized } = bookAPI.useGetBookshelfBooksQuery(value);
    const books = booksData !== undefined ? booksData.items : [];

    const {setSearch} = useContext(SearchContext);

    useEffect(() => {
        setSearch({isLoading: isFetching, value: value});
    }, [isFetching])

    return (
        <BookList books={books} title={'Search'} isLoading={isFetching || isUninitialized }/>
    );
};

export default SearchBooks;
