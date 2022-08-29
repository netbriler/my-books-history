import {Col, Container, Row, useTheme} from "@nextui-org/react"
import Head from "next/head";
import React, {FC} from "react";
import CustomNavbar from "../components/custom-navbar";
import styles from "./Default.module.css";

interface PublicLayoutProps {
    title?: string;
    children?: React.ReactNode;
}

const PublicLayout: FC<PublicLayoutProps> = ({children, title}) => {
    const {isDark} = useTheme();

    return (
        <>
            <Head>
                <title>{title || 'My Books History'}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <CustomNavbar isDark={isDark} showLinks={true}/>
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

export default PublicLayout;