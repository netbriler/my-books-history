import {Input, Loading} from "@nextui-org/react";
import React, {FC, useEffect, useState} from "react";
import useDebounce from "../../hooks/useDebounce";
import {selectSearch, setQuery} from "../../store/reducers/searchSlice";
import {useAppDispatch, useAppSelector} from "../../store/store";


interface SearchProps {
}

const Search: FC<SearchProps> = () => {
    const dispatch = useAppDispatch();

    const [value, setValue] = useState('')
    const debouncedSearchTerm = useDebounce(value, 500);

    const {isLoading} = useAppSelector(selectSearch);

    useEffect(() => {
        dispatch(setQuery(value))
    }, [debouncedSearchTerm])

    return (
        <>
            <Input
                value={value}
                onChange={e => setValue(e.target.value)}
                clearable
                bordered
                color="secondary"
                placeholder="Search..."
                aria-label="Search..."
                contentRight={isLoading ? <Loading color="secondary" size="xs"/> : ''}
                css={{
                    width: '100%',
                    '@smMax': {
                        width: '56vw'
                    },
                }}
            />
        </>
    );
};

export default Search;