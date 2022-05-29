import {FC} from "react";
import {bookAPI} from "../../services/BookService";
import {IBookshelf} from "../../types/book";
import BookList from "../book-list";


interface BookshelfProps {
    bookshelf: IBookshelf
}

const Bookshelf: FC<BookshelfProps> = ({bookshelf}) => {
    const {data: booksData, isLoading, isUninitialized} = bookAPI.useGetBookshelfBooksQuery(bookshelf.id);
    const books = booksData !== undefined ? booksData.items : [];

    return (
        <BookList books={books} title={bookshelf.title} isLoading={isLoading || isUninitialized}/>
    );
};

export default Bookshelf;
