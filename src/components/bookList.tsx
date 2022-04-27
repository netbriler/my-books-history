import React from "react";
import {Grid, Text} from "@nextui-org/react";
import BookItem from "./bookItem";

//TODO Books interface
const BookList = ({books}) => {

    if (!books.length) {
        return (
            <Text
                h1
                size={60}
                css={{
                    textGradient: '45deg, $blue500 -20%, $pink500 50%'
                }}
                weight="bold"
            >
                Books not found!
            </Text>
        )
    }

    return (
        <Grid.Container gap={2} justify="center">
            {books.map((book, index) =>
                <BookItem book={book} key={index}/>
            )}
        </Grid.Container>
    );
};


export default BookList;