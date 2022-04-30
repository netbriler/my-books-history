import {Col, Container, Row, useTheme} from "@nextui-org/react"
import Head from "next/head";
import React, {FC} from "react";
import Navbar from "../components/navbar";
import styles from "./Default.module.css";

interface DefaultLayoutProps {
    title?: string;
    children?: React.ReactNode;
    isSearchLoading: boolean;
    onSearchChange: (e) => Promise<void>
}

const DefaultLayout: FC<DefaultLayoutProps> = ({
                                                   children,
                                                   isSearchLoading, onSearchChange, title
                                               }) => {
    const {isDark} = useTheme();

    return (
        <>
            <Head>
                <title>{title || 'My Books History'}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Navbar isSearchLoading={isSearchLoading} onSearchChange={onSearchChange} isDark={isDark}/>
            <Container lg={true}>
                <Row>
                    <Col className={styles.layout_content}>
                        {children}
                    </Col>
                    {isDark && <>
                        <img
                            className={styles.layout__gradient_blue}
                            src="/gradient-left-dark.svg"
                            alt="gradient blue background"
                        />
                        <img
                            className={styles.layout_gradient_violet}
                            src="/gradient-right-dark.svg"
                            alt="gradient violet background"
                        />
                    </>}
                </Row>
            </Container>
        </>
    );
};

export default DefaultLayout;