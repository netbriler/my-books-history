import {Grid} from "@nextui-org/react";
import React, {useContext, useEffect, useState} from "react";
import Bookshelf from "../components/bookshelf";
import SearchBooks from "../components/search-books";
import Sidebar from "../components/sidebar";
import DefaultLayout from "../layouts/default"
import {selectAuth} from "../store/reducers/authSlice";
import {useAppSelector} from "../store/store";
import {IBookshelf} from "../types/book";
import {SearchContext} from "./_app";

const Index = () => {
    const {user} = useAppSelector(selectAuth);
    const bookshelves = user !== null ? user.bookshelves : [];

    const [selectedBookshelf, setSelectedBookshelf] = useState<IBookshelf | null>(null)
    const [enableSearch, setEnableSearch] = useState<boolean>(false)

    const {SearchValue, setSearch} = useContext(SearchContext);

    useEffect(() => {
        setEnableSearch(SearchValue.value.trim() !== '')
    }, [SearchValue.value])

    useEffect(() => {
        if (bookshelves.length) {
            setSelectedBookshelf(bookshelves[0]);
        }
    }, [user])

    const onSetTab = (tab) => {
        setSearch({value: SearchValue.value, isLoading: false})
        setEnableSearch(false);
        setSelectedBookshelf(tab);
    }

    return (
        <DefaultLayout>
            <Grid.Container gap={2}>
                <Grid xs={2}>
                    <Sidebar selectedTab={selectedBookshelf ? selectedBookshelf.id : -1} tabs={bookshelves}
                             setTab={onSetTab}/>
                </Grid>
                <Grid xs={10} direction={'column'}>
                    {selectedBookshelf && !enableSearch ?
                        <Bookshelf bookshelf={selectedBookshelf}/> :
                        selectedBookshelf && <SearchBooks value={SearchValue.value}/>
                    }
                </Grid>
            </Grid.Container>

        </DefaultLayout>
    );
};

export default Index;
