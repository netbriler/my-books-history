import {Grid} from "@nextui-org/react";
import {useEffect, useState} from "react";
import BookshelvesService from "../API/BookshelvesService";
import BooksService from "../API/BooksService";
import BookList from "../components/book-list";
import Sidebar from "../components/sidebar";
import {useFetching} from "../hooks/useFetching";
import DefaultLayout from "../layouts/default"
import {IBook, IBookshelf} from "../types/book";

const Index = () => {
    const [enableSearch, setEnableSearch] = useState<boolean>(false)
    const [books, setBooks] = useState<IBook[]>([])
    const [bookshelves, setBookshelves] = useState<IBookshelf[]>([])
    const [selectedBookshelf, setSelectedBookshelf] = useState<IBookshelf>({id: -1, title: '', volumeCount: 0})

    const [fetchBooks, isBooksLoading, booksError] = useFetching(async (value, fromBookshelves = false) => {
        let response;
        if (fromBookshelves) {
            setEnableSearch(false);
            response = await BookshelvesService.getBookshelfBooks(value).then(r => r.data);
        } else {
            if (value.trim() === '') {
                return setBooks([])
            }
            response = await BooksService.search(value);
        }
        setBooks(response.totalItems ? response.items : [])
    })

    useEffect(() => {
        const getBookshelves = async () => {
            const bookshelves = await BookshelvesService.getBookshelves().then(r => r.data);
            if (bookshelves) {
                setBookshelves(bookshelves);
            }
        }

        getBookshelves();
    }, [])

    useEffect(() => {
        fetchBooks(selectedBookshelf.id, true)
    }, [selectedBookshelf])

    const onSearchChange = (value: string) => {
        setEnableSearch(value.trim() !== '')
        fetchBooks(value)
    }

    return (
        <DefaultLayout onSearchChange={onSearchChange} isSearchLoading={enableSearch && isBooksLoading}>
            <Grid.Container gap={2}>
                <Grid xs={2}>
                    <Sidebar selectedTab={selectedBookshelf.id} tabs={bookshelves} setTab={setSelectedBookshelf}/>
                </Grid>
                <Grid xs={10} direction={'column'}>
                    <BookList books={books} title={enableSearch ? 'Search' : selectedBookshelf.title}
                              isLoading={isBooksLoading} bookshelves={bookshelves}/>
                </Grid>
            </Grid.Container>

        </DefaultLayout>
    );
};

export default Index;
