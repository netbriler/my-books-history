import {FC, useEffect} from "react";
import {useMediaQuery} from "../../hooks/useMediaQuery";
import {bookAPI} from "../../services/BookService";
import {selectSearch, setIsLoading, setPage} from "../../store/reducers/searchSlice";
import {useAppDispatch, useAppSelector} from "../../store/store";
import BookList from "../book-list";


interface SearchBooksProps {
}


const SearchBooks: FC<SearchBooksProps> = () => {
    const dispatch = useAppDispatch();

    const isLg = useMediaQuery(1400);
    const maxResults = isLg ? 24 : 21;

    const {query, page} = useAppSelector(selectSearch);

    const {data: booksData, isFetching, isLoading, isUninitialized} = bookAPI.useSearchBooksQuery({
        q: query,
        params: {
            maxResults,
            startIndex: maxResults * (page - 1),
        }
    }, {
        skip: query.trim() === ''
    });

    useEffect(() => {
        dispatch(setIsLoading(isFetching))
    }, [isFetching])

    return (
        <BookList booksData={booksData} title={'Search'} isLoading={isLoading || isUninitialized}
                  onPageChange={page => dispatch(setPage(page))} page={page}
                  total={booksData !== undefined ? Math.ceil(booksData.totalItems / maxResults) : 1}/>
    );
};

export default SearchBooks;
