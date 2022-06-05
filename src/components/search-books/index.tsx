import {FC, useContext, useEffect, useState} from "react";
import {useMediaQuery} from "../../hooks/useMediaQuery";
import {SearchContext} from "../../pages/_app";
import {bookAPI} from "../../services/BookService";
import BookList from "../book-list";


interface SearchBooksProps {
    value: string;
}


const SearchBooks: FC<SearchBooksProps> = ({value}) => {
    const isLg = useMediaQuery(1400);
    const maxResults = isLg ? 24 : 21;

    const [page, setPage] = useState(1)
    const {data: booksData, isFetching, isLoading, isUninitialized} = bookAPI.useSearchBooksQuery({
        q: value,
        params: {
            maxResults,
            startIndex: maxResults * (page - 1),
        }
    }, {
        skip: value.trim() === ''
    });


    const {setSearch} = useContext(SearchContext);

    useEffect(() => {
        setSearch({isLoading: isFetching, value: value});
    }, [isFetching])

    return (
        <BookList booksData={booksData} title={'Search'} isLoading={isLoading || isUninitialized}
                  onPageChange={setPage} page={page}
                  total={booksData !== undefined ? Math.ceil(booksData.totalItems / maxResults) : 1}/>
    );
};

export default SearchBooks;
