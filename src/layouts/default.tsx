import {Col, Container, Loading, Row, useTheme} from "@nextui-org/react"
import Head from "next/head";
import React, {FC, useEffect} from "react";
import AuthModal from "../components/auth-modal";
import Navbar from "../components/navbar";
import {userAPI} from "../services/UserService";
import {selectAuth, setUser} from "../store/reducers/authSlice";
import {useAppDispatch, useAppSelector} from "../store/store";
import styles from "./Default.module.css";

interface DefaultLayoutProps {
    title?: string;
    children?: React.ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({children, title}) => {
    const {isDark} = useTheme();
    const {data: user, isLoading} = userAPI.useGetMeQuery(null)

    const dispatch = useAppDispatch();
    const {user: authUser} = useAppSelector(selectAuth);

    useEffect(() => {
        if (isLoading) {
            return
        }

        if (user !== undefined) {
            dispatch(setUser({user: user}))
        }
    }, [isLoading])

    return (
        <>
            <Head>
                <title>{title || 'My Books History'}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Navbar isDark={isDark}/>
            <Container lg={true}>
                <Row>
                    <Col className={styles.layout_content}>
                        {!isLoading && authUser && children}
                        {isLoading && <Col css={{display: 'flex', justifyContent: 'center'}}>
                            <Loading type="gradient" color={'secondary'} size={'xl'}/>
                        </Col>}
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
                    <AuthModal visible={!isLoading && !authUser}/>
                </Row>
            </Container>
        </>
    );
};

export default DefaultLayout;