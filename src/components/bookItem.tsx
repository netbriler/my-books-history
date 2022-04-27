import React, {useEffect} from "react";
import {Card, Col, Grid, Text} from "@nextui-org/react";

//TODO Book interface
const BookList = ({book}) => {
    return (
        <Grid className={'flasher'}>
            <Card cover hoverable clickable bordered>
                {book.volumeInfo.imageLinks ? '' :
                    <Card.Header css={{position: "absolute", zIndex: 1, top: 5}}>
                        <Col>
                            <Text size={10} weight="bold" transform="uppercase" color="#ffffffAA">
                                {book.volumeInfo.title}
                            </Text>

                            {book.volumeInfo.authors ?
                                <Text h5 color="white">
                                    {book.volumeInfo.authors[0]}
                                </Text> : ''}
                        </Col>
                    </Card.Header>
                }
                <Card.Image
                    src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "/book-placeholder.jpg"}
                    height={200}
                    width={130}
                    alt={book.volumeInfo.title}
                />

            </Card>
        </Grid>
    );
};


export default BookList;