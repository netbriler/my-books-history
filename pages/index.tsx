import {Container} from "@nextui-org/react";
import Search from "../components/search";
import {useDeferredValue, useEffect, useMemo, useState} from "react";
import BooksService from "../API/BooksService";
import {useFetching} from "../hooks/useFetching";
import BookList from "../components/bookList";

const Index = () => {
    const [value, setValue] = useState('')
    const [books, setBooks] = useState([])
    const defferedValue = useDeferredValue(value)

    const [fetchBooks, isBooksLoading, booksError] = useFetching(async (value) => {
        if(value.trim() === ''){
            return setBooks([])
        }
        const response = await BooksService.search(value);
        setBooks(response.data.totalItems ? ([...response.data.items]) : [])
    })

    useEffect(() => {
        // @ts-ignore
        fetchBooks(value)
    }, [defferedValue])

    return (
        <Container>
            <Search value={value} onChange={e => setValue(e.target.value)} isLoading={isBooksLoading}/>
            <BookList books={books}/>
        </Container>
    );
};

export default Index;
