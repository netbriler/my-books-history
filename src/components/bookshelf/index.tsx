import {FC, useState} from "react";
import {useMediaQuery} from "../../hooks/useMediaQuery";
import {bookAPI} from "../../services/BookService";
import {IBookshelf} from "../../types/book";
import BookList from "../book-list";


interface BookshelfProps {
    bookshelf: IBookshelf
}

const Bookshelf: FC<BookshelfProps> = ({bookshelf}) => {
    const isLg = useMediaQuery(1400);
    const maxResults = isLg ? 24 : 21;

    const [page, setPage] = useState(1)
    const {data: booksData, isLoading, isUninitialized} = bookAPI.useGetBookshelfBooksQuery({
        id: bookshelf.id,
        params: {
            maxResults,
            startIndex: maxResults * (page - 1),
        }
    });

    return (
        <BookList booksData={booksData} title={bookshelf.title} isLoading={isLoading || isUninitialized}
                  onPageChange={setPage} page={page}
                  total={booksData !== undefined ? Math.ceil(booksData.totalItems / maxResults) : 1}/>
    );
};

export default Bookshelf;
