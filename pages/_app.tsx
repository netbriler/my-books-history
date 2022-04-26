import "../styles/global.css"
import NextNProgress from "nextjs-progressbar";
import {createTheme, NextUIProvider, Text} from "@nextui-org/react"

const theme = createTheme({
    type: "light",
})

function MyApp({Component, pageProps}) {
    return (
        <NextUIProvider theme={theme}>
            <NextNProgress
                color='#29D'
                startPosition={0.3}
                height={3}
                showOnShallow={true}
            />
            <Component {...pageProps} />
        </NextUIProvider>
    );
}

export default MyApp;