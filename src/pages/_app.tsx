import {NextUIProvider} from "@nextui-org/react"
import {ThemeProvider} from "next-themes";
import {AppProps} from "next/app";
import NextNProgress from "nextjs-progressbar";
import React, {createContext, FC, useMemo, useState} from "react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import "../styles/global.css"
import {darkTheme, lightTheme} from "../theme/shared";


export const SearchContext = createContext({
    SearchValue: {value: '', isLoading: false},
    setSearch: ({value: string, isLoading: boolean}) => {
    },
})


const MyApp: FC<AppProps> = ({Component, pageProps}) => {
    const [SearchValue, setSearch] = useState({value: '', isLoading: false});
    const searchData = useMemo(
        () => ({SearchValue, setSearch}),
        [SearchValue]
    );

    return (// @ts-ignore
        <ThemeProvider
            defaultTheme="system"
            attribute="class"
            value={{
                light: lightTheme.className,
                dark: darkTheme.className
            }}
        >
            <NextUIProvider>
                <NextNProgress
                    color={lightTheme.colors.gradient.value}
                    startPosition={0.3}
                    height={3}
                    showOnShallow={true}
                    stopDelayMs={200}
                />
                <Provider store={store}>
                    <SearchContext.Provider value={searchData}>
                        <Component {...pageProps} />
                    </SearchContext.Provider>
                </Provider>
            </NextUIProvider>
        </ThemeProvider>
    );
}

export default MyApp;