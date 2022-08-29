import {useRouter} from "next/router";
import React from "react";
import PublicLayout from "../layouts/public";
import {userAPI} from "../services/UserService";

const Index = () => {
    const router = useRouter()

    const {data: user} = userAPI.useGetMeQuery(null)

    if (user !== undefined) {
        router.push('dashboard')
    }

    return (
        <PublicLayout>
            Main page
        </PublicLayout>
    );
};

export default Index;
