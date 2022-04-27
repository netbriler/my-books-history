import React, {useEffect, useState} from "react";
import {Input, Loading, Spacer} from "@nextui-org/react";
import useDebounce from "../hooks/useDebounce";


interface SearchProps {
    isLoading: boolean;
    onChange: (e) => Promise<void>
}

const Search: React.FC<SearchProps> = ({onChange, isLoading}) => {
    const [value, setValue] = useState('')
    const debouncedSearchTerm = useDebounce(value, 500);

    useEffect(() => {
        onChange(value)
    }, [debouncedSearchTerm])

    return (
        <>
            <Spacer y={2}/>
            <Input
                value={value}
                onChange={e => setValue(e.target.value)}
                clearable
                bordered
                color="primary"
                labelPlaceholder="Search"
                contentRight={isLoading ? <Loading size="xs"/> : ''}
                css={{
                    width: '100%'
                }}
            />
        </>
    );
};

export default Search;