import {NextUIProvider} from "@nextui-org/react"
import {ThemeProvider} from "next-themes";
import {AppProps} from "next/app";
import NextNProgress from "nextjs-progressbar";
import React, {FC} from "react";
import {Provider} from "react-redux";
import {store} from "../store/store";
import "../styles/global.css"
import {darkTheme, lightTheme} from "../theme/shared";


const MyApp: FC<AppProps> = ({Component, pageProps}) => {
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
                    <Component {...pageProps} />
                </Provider>
            </NextUIProvider>
        </ThemeProvider>
    );
}

export default MyApp;