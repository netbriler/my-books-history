import {Grid} from "@nextui-org/react";
import React, {useEffect, useState} from "react";
import Bookshelf from "../components/bookshelf";
import SearchBooks from "../components/search-books";
import Sidebar from "../components/sidebar";
import {useIsMobile} from "../hooks/useMediaQuery";
import DefaultLayout from "../layouts/default"
import {selectAuth} from "../store/reducers/authSlice";
import {selectSearchEnable, setEnable} from "../store/reducers/searchSlice";
import {useAppDispatch, useAppSelector} from "../store/store";
import {IBookshelf} from "../types/book";

const Index = () => {
    const dispatch = useAppDispatch();

    const {user} = useAppSelector(selectAuth);
    const bookshelves = user !== null ? user.bookshelves : [];

    const isMobile = useIsMobile();

    const enableSearch = useAppSelector(selectSearchEnable);
    const [selectedBookshelf, setSelectedBookshelf] = useState<IBookshelf | null>(null)

    useEffect(() => {
        if (bookshelves.length) {
            setSelectedBookshelf(bookshelves[0]);
        }
    }, [user])

    const onSetTab = (tab) => {
        dispatch(setEnable(false))
        setSelectedBookshelf(tab);
    }

    return (
        <DefaultLayout>
            <Grid.Container gap={2} direction={isMobile ? 'column' : 'row'}>
                <Grid xs={isMobile ? 12 : 3} sm={3} lg={2}>
                    <Sidebar selectedTab={selectedBookshelf ? selectedBookshelf.id : -1} tabs={bookshelves}
                             setTab={onSetTab}/>
                </Grid>
                <Grid xs={isMobile ? 12 : 9} sm={9} lg={10} direction={'column'}>
                    {selectedBookshelf && !enableSearch ?
                        <Bookshelf bookshelf={selectedBookshelf}/> :
                        selectedBookshelf && <SearchBooks/>
                    }
                </Grid>
            </Grid.Container>

        </DefaultLayout>
    );
};

export default Index;
