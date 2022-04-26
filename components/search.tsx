import React from "react";
import {Input, Loading, Spacer} from "@nextui-org/react";

const Search = ({value, isLoading, onChange}) => {
    return (
        <>
            <Spacer y={2} />
            <Input
                value={value}
                onChange={onChange}
                clearable
                bordered
                color="primary"
                labelPlaceholder="Search"
                contentRight={isLoading ? <Loading size="xs" /> : ''}
                css={{
                    width: '100%'
                }}
            />
        </>
    );
};

export default Search;