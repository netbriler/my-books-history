import {Input, Loading} from "@nextui-org/react";
import React, {FC, useEffect, useState} from "react";
import useDebounce from "../../hooks/useDebounce";


interface SearchProps {
    isLoading: boolean;
    onChange: (e) => Promise<void>
}

const Search: FC<SearchProps> = ({onChange, isLoading}) => {
    const [value, setValue] = useState('')
    const debouncedSearchTerm = useDebounce(value, 500);

    useEffect(() => {
        onChange(value)
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
                contentRight={isLoading ? <Loading size="xs"/> : ''}
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