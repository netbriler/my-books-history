import {Col, Container, Link, Row} from "@nextui-org/react";
import cn from "classnames";
import NextLink from "next/link";
import React, {useEffect, useState} from "react";
import Logo from "../logo";
import Search from "../search";
import ThemeToggle from "../theme-toggle"
import styles from "./Navbar.module.css";

export interface Props {
    isDark: boolean;
    showBackButton?: boolean;
}

const Navbar: React.FC<Props> = ({isDark, showBackButton = false}) => {
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
                            <Link href="/">
                                <Logo auto dark={isDark}/>
                            </Link>
                        </NextLink>
                    </Row>
                </Col>
                <Col>
                    <Row justify={'center'}>
                        {showBackButton ? <NextLink href="/">
                            <Link color="text">
                                Back
                            </Link>
                        </NextLink> : <Search/>}
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
