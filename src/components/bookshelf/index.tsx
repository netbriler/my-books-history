import {FC} from "react";
import {bookshelfAPI} from "../../services/BookshelfService";
import {IBookshelf} from "../../types/book";
import BookList from "../book-list";


interface BookshelfProps {
    bookshelf: IBookshelf
}

const Bookshelf: FC<BookshelfProps> = ({bookshelf}) => {
    const {data: booksData, error, isFetching, isUninitialized } = bookshelfAPI.useGetBookshelfBooksQuery(bookshelf.id);
    const books = booksData !== undefined ? booksData.items : [];

    return (
        <BookList books={books} title={bookshelf.title} isLoading={isFetching || isUninitialized }/>
    );
};

export default Bookshelf;
