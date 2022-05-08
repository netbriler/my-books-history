import {NextUIProvider} from "@nextui-org/react"
import {ThemeProvider} from "next-themes";
import {AppProps} from "next/app";
import NextNProgress from "nextjs-progressbar";
import React, {createContext, FC} from "react";
import Store from "../store/store";
import "../styles/global.css"
import {darkTheme, lightTheme} from "../theme/shared";

interface State {
    store: Store,
}

export const store = new Store();

export const Context = createContext<State>({
    store,
})

const MyApp: FC<AppProps> = ({Component, pageProps}) => (// @ts-ignore
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
            <Context.Provider value={{
                store
            }}>
                <Component {...pageProps} />
            </Context.Provider>
        </NextUIProvider>
    </ThemeProvider>
);

export default MyApp;