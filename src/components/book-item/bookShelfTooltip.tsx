import {Checkbox, Grid} from "@nextui-org/react";
import React from "react";
import styles from "./BookItem.module.css";

const BookShelfTooltip = () => {
    return (
        <Grid.Container className={styles.tooltip_container}>
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