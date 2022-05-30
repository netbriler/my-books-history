import {Grid, Loading, Pagination, Text} from "@nextui-org/react";
import React, {FC} from "react";
import {useIsMobile} from "../../hooks/useMediaQuery";
import {selectAuth} from "../../store/reducers/authSlice";
import {useAppSelector} from "../../store/store";
import {IBooksResponse} from "../../types/book";
import BookItem from "../book-item/bookItem";
import styles from "./BookList.module.css";

interface BookListProps {
    booksData: IBooksResponse;
    title?: string;
    isLoading: boolean;
    page: number;
    onPageChange: (page: number) => void;
    total: number;
}

const BookList: FC<BookListProps> = ({booksData, title = '', isLoading = false, onPageChange, page, total}) => {
    const {user} = useAppSelector(selectAuth);
    const isMobile = useIsMobile();

    if (page > 1 && page > total) {
        onPageChange(total)
    }

    if (isLoading || booksData === undefined) {
        return (
            <>
                {title && <Text h2 size={50} weight="bold">
                    {title}
                </Text>}
                <Loading type="gradient" color={'secondary'} size={'xl'}/>
            </>
        )
    }

    if (!booksData.items.length) {
        return (
            <Text h1 size={60} css={{textGradient: '45deg, $blue500 -20%, $pink500 50%'}} weight="bold">
                Books not found!
            </Text>
        )
    }

    const bookshelves = user !== null ? user.bookshelves : [];

    return (
        <>
            {title && <Text h2 size={50} weight="bold">
                {title}
            </Text>}
            <Grid.Container gap={1.9} justify="flex-start">
                {booksData.items.map((book) =>
                    <BookItem book={book} key={book.google_id} bookshelves={bookshelves}/>
                )}
            </Grid.Container>
            {total > 1 &&
                <div className={styles.pagination_container}>
                    <Pagination siblings={isMobile ? 1 : 2} shadow loop
                                total={total} page={page} onChange={onPageChange}/>
                </div>
            }
        </>
    );
};


export default BookList;