import React from "react";
import {Checkbox, Grid} from "@nextui-org/react";

const BookShelfTooltip = () => {
    return (
        <Grid.Container
            css={{borderRadius: '14px', padding: '0.75rem', maxWidth: '330px', fontSize: '10px'}}
        >

            <Checkbox.Group
                color="gradient"
                label="Add to"
                size="sm"
            >
                <Checkbox value="1">Want to read</Checkbox>
                <Checkbox value="2">Read now</Checkbox>
                <Checkbox value="3">Have read</Checkbox>
            </Checkbox.Group>
        </Grid.Container>
    );
};

export default BookShelfTooltip;