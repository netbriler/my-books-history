import {Grid, Loading, Text} from "@nextui-org/react";
import React, {FC} from "react";
import {selectAuth} from "../../store/reducers/authSlice";
import {useAppSelector} from "../../store/store";
import {IBook} from "../../types/book";
import BookItem from "../book-item/bookItem";

interface BookListProps {
    books: IBook[];
    title?: string;
    isLoading?: boolean;
}

const BookList: FC<BookListProps> = ({books, title = '', isLoading = false}) => {

    const {user} = useAppSelector(selectAuth);

    if (!books.length && !isLoading) {
        return (
            <Text h1 size={60} css={{textGradient: '45deg, $blue500 -20%, $pink500 50%'}} weight="bold">
                Books not found!
            </Text>
        )
    }

    const bookshelves = user !== null ? user.bookshelves : [];

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
                    {books.map((book) =>
                        <BookItem book={book} key={book.google_id} bookshelves={bookshelves}/>
                    )}
                </Grid.Container>
            }
        </>
    );
};


export default BookList;