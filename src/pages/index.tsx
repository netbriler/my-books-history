import {useRouter} from "next/router";
import React from "react";
import PublicLayout from "../layouts/public";
import {userAPI} from "../services/UserService";
import {Button, Grid, Text, useTheme} from "@nextui-org/react";
import LandingImage from "../../public/landing-image.svg";
import LandingImageDark from "../../public/landing-image-dark.svg";
import ContinueWithGoogle from "../../public/continue-with-google.svg";
import ContinueWithGoogleDark from "../../public/continue-with-google-dark.svg";
import styles from "../styles/Index.module.css";
import cn from "classnames";
import {submitHandler} from "../components/auth-modal";


const Index = () => {
    const router = useRouter()

    const {data: user} = userAPI.useGetMeQuery(null)

    if (user !== undefined) {
        router.push('dashboard')
    }

    const {isDark} = useTheme();

    return (
        <PublicLayout>
            <div className={cn(styles.container)}>
                <div className={styles.row}>
                    <Text h1 className={styles.title}>Let’s make your<br/><span>reading</span> enjoyable.</Text>
                    <Text className={styles.description}
                          css={{color: isDark ? 'rgba(255, 255, 255, .6)' : 'rgba(0, 0 , 0, .6)'}}>Search books via
                        google books api and add them to your
                        bookshelves synchronized with google library.</Text>
                    <Button auto css={{
                        marginTop: 32,
                        backgroundColor: isDark ? '#fff' : '#000',
                        color: isDark ? '#000' : '#fff',
                        padding: '16px 32px',
                        height: 48
                    }} onClick={submitHandler}>
                        {isDark ? <ContinueWithGoogleDark css={{height: 16}}/> :
                            <ContinueWithGoogle css={{height: 16}}/>}
                    </Button>
                </div>
                <div className={styles.row_image}>
                    {isDark ? <LandingImageDark css={{width: 1000, height: '100%', maxHeight: 730}}/> :
                        <LandingImage css={{width: 1000, height: '100%', maxHeight: 730}}/>}
                </div>
            </div>
        </PublicLayout>
    );
};

export default Index;
