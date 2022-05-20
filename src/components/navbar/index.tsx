import {Col, Container, Link, Row} from "@nextui-org/react";
import cn from "classnames";
import NextLink from "next/link";
import React, {useEffect, useState} from "react";
import Logo from "../logo";
import Search from "../search";
import ThemeToggle from "../theme-toggle"
import styles from "./Navbar.module.css";

export interface Props {
    isSearchLoading: boolean;
    onSearchChange: (value: string) => void;
    isDark: boolean
}

const Navbar: React.FC<Props> = ({isSearchLoading, onSearchChange, isDark}) => {
    const [scrollPosition, setScrollPosition] = useState(
        (typeof window !== 'undefined' && window.scrollY) || 0
    );
    useEffect(() => {
        window.addEventListener('scroll', onScroll.bind(this));
        return () => {
            window.removeEventListener('scroll', onScroll.bind(this));
        };
    }, []);

    const onScroll = () => {
        requestAnimationFrame(() => {
            setScrollPosition(window.scrollY);
        });
    };

    const showBlur = scrollPosition > 0;

    return (
        <div className={cn(styles.navbar, {[`${styles.navbar_blur}`]: showBlur})}>
            <Container lg={true} as="nav" display="flex" wrap="nowrap" alignItems="center" justify={"flex-end"}>
                <Col>
                    <Row justify="flex-start" align="center">
                        <NextLink href="/">
                            <Link href="/src/pages">
                                <Logo auto dark={isDark}/>
                            </Link>
                        </NextLink>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Search isLoading={isSearchLoading} onChange={onSearchChange}/>
                    </Row>
                </Col>
                <Col className={styles.navbar_icons_container}>
                    <ThemeToggle/>
                </Col>
            </Container>
        </div>
    );
};

export default Navbar;
