import {Col, Link, Navbar, Row} from "@nextui-org/react";
import cn from "classnames";
import NextLink from "next/link";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import Logo from "../logo";
import Search from "../search";
import ThemeToggle from "../theme-toggle"
import styles from "./CustomNavbar.module.css";

export interface Props {
    isDark: boolean;
    showLinks?: boolean;
}

const CustomNavbar: React.FC<Props> = ({isDark, showLinks = false}) => {
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
    const router = useRouter()

    return (
        <div className={cn(styles.navbar, {[`${styles.navbar_blur}`]: showBlur})}>
            <Navbar variant={'floating'} disableShadow={true}>
                <Navbar.Brand>
                    <NextLink href="/dashboard">
                        <Link href="/">
                            <Logo auto dark={isDark}/>
                        </Link>
                    </NextLink>
                </Navbar.Brand>
                {!showLinks && <Col>
                    <Row justify={'center'}>
                        <Search/>
                    </Row>
                </Col>}

                {showLinks &&
                    <Navbar.Content hideIn="xs" variant="highlight">
                        <Navbar.Link onPress={() => router.push('dashboard')}>Dashboard</Navbar.Link>
                        <Navbar.Link onPress={() => router.push('privacy')}
                                     isActive={router.pathname == '/privacy'}>Privacy</Navbar.Link>
                    </Navbar.Content>}

                <Navbar.Content>
                    <Navbar.Item>
                        <ThemeToggle/>
                    </Navbar.Item>
                </Navbar.Content>
            </Navbar>
        </div>
    )
};

export default CustomNavbar;
