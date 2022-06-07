import {Card, Col, Grid, Text, Tooltip} from "@nextui-org/react";
import React, {FC, useEffect, useState} from "react";
import useDebounce from "../../hooks/useDebounce";
import {bookAPI} from "../../services/BookService";
import {IBook, IBookshelf} from "../../types/book";
import styles from "./BookItem.module.css";
import BookShelfTooltip from "./bookShelfTooltip";

interface BookItemProps {
    book: IBook;
    bookshelves: IBookshelf[];
}

const BookItem: FC<BookItemProps> = ({book, bookshelves}) => {
    const defaultValue = (book.bookshelves !== undefined) ? book.bookshelves.map(i => i.toString()) : [];

    const [selected, setSelected] = useState<string[]>(defaultValue)
    const debouncedTerm = useDebounce(selected, 500);

    const [updatePost] = bookAPI.useSetBookBookshelvesMutation()

    useEffect(() => {
        if (JSON.stringify(defaultValue.sort()) !== JSON.stringify(selected.sort())) {
            updatePost({id: book.google_id, bookshelves: selected})
        }
    }, [debouncedTerm])

    return (
        <Grid className={'flasher'} justify={'center'}>
            <Tooltip trigger="click" content={<BookShelfTooltip bookshelves={bookshelves} defaultValue={defaultValue}
                                                                onChange={setSelected}/>}
                     placement="bottomStart">
                <Card isPressable isHoverable variant="bordered">
                    {book.image ? '' :
                        <Card.Header className={styles.card_header}>
                            <Col>
                                <Text size={10} weight="bold" transform="uppercase" color="#ffffffAA">
                                    {book.title}
                                </Text>

                                {book.authors ?
                                    <Text h5 color="white">
                                        {book.authors[0]}
                                    </Text> : ''}
                            </Col>
                        </Card.Header>
                    }
                    <Card.Image
                        src={book.image ? book.image : '/book-placeholder.jpg'}
                        height={200}
                        width={130}
                        alt={book.title}
                        objectFit="cover"
                    />
                </Card>
            </Tooltip>
        </Grid>
    );
};


export default BookItem;