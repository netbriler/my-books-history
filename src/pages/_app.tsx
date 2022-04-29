import "../styles/global.css"
import NextNProgress from "nextjs-progressbar";
import {NextUIProvider} from "@nextui-org/react"
import {ThemeProvider} from 'next-themes';
import {darkTheme, lightTheme} from "../theme/shared";
import {FC} from "react";
import {AppProps} from "next/app";

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
                color='#29D'
                startPosition={0.3}
                height={3}
                showOnShallow={true}
                stopDelayMs={200}
            />
            <Component {...pageProps} />
        </NextUIProvider>
    </ThemeProvider>
);

export default MyApp;