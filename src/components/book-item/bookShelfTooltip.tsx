import {Checkbox, Grid} from "@nextui-org/react";
import React, {FC} from "react";
import {IBook, IBookshelf} from "../../types/book";
import styles from "./BookItem.module.css";


interface BookShelfTooltipProps {
    book: IBook;
    bookshelves: IBookshelf[]
}

const BookShelfTooltip: FC<BookShelfTooltipProps> = ({bookshelves, book}) => {
    const defaultValue = (book.bookshelves !== undefined) ? book.bookshelves.map(i => i.toString()) : [];

    return (
        <Grid.Container className={styles.tooltip_container}>
            <Checkbox.Group
                color="gradient"
                label="Add to"
                aria-label="Add to"
                size="sm"
                defaultValue={defaultValue}
            >
                {bookshelves.map(bookshelf =>
                    <Checkbox value={bookshelf.id.toString()} key={bookshelf.id}>{bookshelf.title}</Checkbox>
                )}
            </Checkbox.Group>
        </Grid.Container>
    );
};

export default BookShelfTooltip;