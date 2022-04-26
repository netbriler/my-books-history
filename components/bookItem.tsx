import React, {useEffect} from "react";
import {Card, Col, Grid, Text} from "@nextui-org/react";

const BookList = ({book}) => {
    useEffect(() => {
        return () => console.log('unmount')
    }, [])

    return (

        <Grid className={'flasher'}>
            <Card cover hoverable clickable>
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
                    src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "http://www.proedsolutions.com/wp-content/themes/micron/images/placeholders/placeholder_small_dark.jpg"}
                    height={200}
                    width={130}
                    alt={book.volumeInfo.title}
                />

            </Card>
        </Grid>
    );
};


export default BookList;