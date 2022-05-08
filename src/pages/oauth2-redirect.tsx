import {useEffect} from "react";
import AuthService from "../API/AuthService";

const AuthRedirect = () => {
    useEffect(() => {
        // @ts-ignore
        const url = new URL(document.location);

        const fetchData = async () => {
            const response = await AuthService.sendCode(url.searchParams.get('code'), url.origin + url.pathname);
            localStorage.setItem('token', response.data.accessToken);
            window.close();
        }

        fetchData()
    }, [])
    return (
        <>
        </>
    );
};

export default AuthRedirect;
