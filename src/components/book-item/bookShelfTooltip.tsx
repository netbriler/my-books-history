import {Checkbox, Grid} from "@nextui-org/react";
import React, {FC} from "react";
import {IBookshelf} from "../../types/book";
import styles from "./BookItem.module.css";


interface BookShelfTooltipProps {
    defaultValue: string[];
    bookshelves: IBookshelf[];
    onChange: (bookshelves: string[]) => void;
}

const BookShelfTooltip: FC<BookShelfTooltipProps> = ({bookshelves, defaultValue, onChange}) => {

    return (
        <Grid.Container className={styles.tooltip_container}>
            <Checkbox.Group
                color="gradient"
                label="Add to"
                aria-label="Add to"
                size="sm"
                defaultValue={defaultValue}
                onChange={onChange}
            >
                {bookshelves.map(bookshelf =>
                    <Checkbox value={bookshelf.id.toString()} key={bookshelf.id}>{bookshelf.title}</Checkbox>
                )}
            </Checkbox.Group>
        </Grid.Container>
    );
};

export default BookShelfTooltip;