import {Col, Container, Row, useTheme} from "@nextui-org/react"
import Head from "next/head";
import React, {FC, useContext, useEffect, useState} from "react";
import AuthModal from "../components/auth-modal";
import Navbar from "../components/navbar";
import {Context} from "../pages/_app";
import {IBook} from "../types/book";
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
    const {store} = useContext(Context);
    const [showAuthModal, setAuthModal] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            await store.checkAuth();
            setAuthModal(!store.isAuth)
        }
        checkAuth()
    }, [])

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
                    <AuthModal visible={showAuthModal}/>
                </Row>
            </Container>
        </>
    );
};

export default DefaultLayout;