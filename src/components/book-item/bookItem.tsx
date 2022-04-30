import {Card, Col, Grid, Text, Tooltip} from "@nextui-org/react";
import React, {FC} from "react";
import {IBook} from "../../types/book";
import styles from "./BookItem.module.css";
import BookShelfTooltip from "./bookShelfTooltip";

interface BookItemProps {
    book: IBook;
}

const BookItem: FC<BookItemProps> = ({book}) => {
    return (
        <Grid className={'flasher'} justify={'center'}>
            <Tooltip trigger="click" content={<BookShelfTooltip/>} placement="bottomStart">
                <Card cover hoverable clickable bordered>
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
                    />
                </Card>
            </Tooltip>
        </Grid>
    );
};


export default BookItem;