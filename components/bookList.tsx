import React from "react";
import {Grid} from "@nextui-org/react";
import BookItem from "./bookItem";

const BookList = ({books}) => {

    if (!books.length) {
        return (
            <h1>
                Books not found!
            </h1>
        )
    }

    return (
        <Grid.Container gap={2} justify="center">
            {books.map((book, index) =>
                <BookItem book={book} key={index + '-' + Date.now()}/>
            )}
        </Grid.Container>
    );
};


export default BookList;