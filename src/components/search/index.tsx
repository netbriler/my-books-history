import {Input, Loading} from "@nextui-org/react";
import React, {FC, useContext, useEffect, useState} from "react";
import useDebounce from "../../hooks/useDebounce";
import {SearchContext} from "../../pages/_app";


interface SearchProps {
}

const Search: FC<SearchProps> = () => {
    const {SearchValue, setSearch} = useContext(SearchContext);

    const [value, setValue] = useState('')
    const debouncedSearchTerm = useDebounce(value, 500);

    useEffect(() => {
        setSearch({isLoading: SearchValue.isLoading, value: value});
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
                contentRight={SearchValue.isLoading ? <Loading color="secondary" size="xs"/> : ''}
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