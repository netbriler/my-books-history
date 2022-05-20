import {Grid, Loading, Text} from "@nextui-org/react";
import React, {FC} from "react";
import {IBook, IBookshelf} from "../../types/book";
import BookItem from "../book-item/bookItem";

interface BookListProps {
    books: IBook[];
    title?: string;
    isLoading?: boolean;
    bookshelves: IBookshelf[]
}

const BookList: FC<BookListProps> = ({books, title = '', isLoading = false, bookshelves}) => {

    if (!books.length) {
        return (
            <Text h1 size={60} css={{textGradient: '45deg, $blue500 -20%, $pink500 50%'}} weight="bold">
                Books not found!
            </Text>
        )
    }

    return (
        <>
            {title && <Text
                h2
                size={50}
                weight="bold"
            >
                {title}
            </Text>}
            {isLoading ? <Loading type="gradient" color={'secondary'} size={'xl'}/> :
                <Grid.Container gap={2} justify="flex-start">
                    {books.map((book, index) =>
                        <BookItem book={book} key={index} bookshelves={bookshelves}/>
                    )}
                </Grid.Container>
            }
        </>
    );
};


export default BookList;