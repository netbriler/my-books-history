import {useRouter} from "next/router";
import React from "react";
import PublicLayout from "../layouts/public";
import {userAPI} from "../services/UserService";
import {Button, Grid, Text} from "@nextui-org/react";
import LandingImage from "../../public/landing-image.svg";
import styles from "../styles/Index.module.css";
import cn from "classnames";
import {submitHandler} from "../components/auth-modal";


const Index = () => {
    const router = useRouter()

    const {data: user} = userAPI.useGetMeQuery(null)

    if (user !== undefined) {
        router.push('dashboard')
    }

    return (
        <PublicLayout>
            <div className={cn(styles.container)}>
                <div className={styles.row}>
                    <Text h1 className={styles.title}>Let’s make your<br/><span>reading</span> enjoyable.</Text>
                    <Text className={styles.description}>Search books via google books api and add them to your bookshelves synchronized with google library.</Text>
                    <Button color="gradient" auto css={{marginTop: 30}} onClick={submitHandler}>
                        Continue with Google
                    </Button>
                </div>
                <div className={styles.row_image}>
                    <LandingImage css={{width: 1000}}/>
                </div>
            </div>
        </PublicLayout>
    );
};

export default Index;
